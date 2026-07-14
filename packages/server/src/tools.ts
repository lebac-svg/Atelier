import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  areaM2, ASSET_CATEGORIES, DON_GIA, estimateCost, formatVnd, getLevel, searchAssets,
  stairLayout, validateProject,
  type AssetCategory, type CaptureCamera, type FinishLevel, type Issue, type Op, type Project,
} from "@atelier/core";
import { buildAssetsSheetSvg, SHEET_CAPACITY } from "./render/assets-sheet.js";
import { compareHtml, compareProjects } from "./compare.js";
import { DEFAULT_WEB_DIST, LiveServer, openInBrowser } from "./live.js";
import { renderElevationSvg, renderPlanFiles, renderSectionSvg } from "./render/render.js";
import { buildSheetSet, sheetDxf, sheetSvg } from "./render/sheets.js";
import { modelToGlb } from "./render/gltf-writer.js";
import { modelToIfc } from "./render/ifc-writer.js";
import { detectWalls } from "./import/detect.js";
import { parseDxf } from "./import/dxf.js";
import { imageSize } from "./import/image-size.js";
import { loadUnderlay, placedPolylines, underlayDir } from "./import/underlay.js";
import { ProjectStore, TEMPLATES } from "./store.js";

const ENTITY = z.enum([
  "level", "wall", "opening", "slab", "roof", "stair", "room", "furniture", "axis", "style", "finish", "underlay",
]);

const OP = z.discriminatedUnion("op", [
  z.object({ op: z.literal("add"), entity: ENTITY, data: z.record(z.unknown()) }),
  z.object({ op: z.literal("update"), entity: ENTITY, id: z.string(), data: z.record(z.unknown()) }),
  z.object({ op: z.literal("delete"), entity: ENTITY, id: z.string() }),
]);

type ToolResult = {
  content: Array<
    | { type: "text"; text: string }
    | { type: "image"; data: string; mimeType: string }
  >;
  isError?: boolean;
};

const text = (t: string): ToolResult => ({ content: [{ type: "text", text: t }] });
const fail = (e: unknown): ToolResult => ({
  content: [{ type: "text", text: `❌ ${e instanceof Error ? e.message : String(e)}` }],
  isError: true,
});

function issueLines(issues: Issue[]): string {
  if (issues.length === 0) return "0 vấn đề — sạch.";
  return issues
    .map((i) => `[${i.rule}/${i.severity}] ${i.message}${i.entities.length ? ` (${i.entities.join(", ")})` : ""}`)
    .join("\n");
}

function projectBrief(p: Project): string {
  const perLevel = p.levels
    .map((l) => {
      const rooms = p.rooms.filter((r) => r.level === l.id).length;
      const walls = p.walls.filter((w) => w.level === l.id).length;
      return `${l.id} "${l.name}": ${walls} tường, ${rooms} phòng`;
    })
    .join("; ");
  return `"${p.meta.name}" (revision ${p.meta.revision}) — ${p.levels.length} tầng: ${perLevel}. Openings: ${p.openings.length}, nội thất: ${p.furniture.length}.`;
}

export function createAtelierServer(store: ProjectStore, live: LiveServer = new LiveServer(store)): McpServer {
  const server = new McpServer({ name: "atelier", version: "0.1.0" });

  server.registerTool(
    "project_new",
    {
      title: "Tạo dự án nhà mới",
      description:
        `Tạo model mới tại ${store.filePath}. Nếu có template thì khởi đầu từ nhà mẫu (nhanh và chất hơn vẽ từ giấy trắng) rồi biến đổi dần bằng apply_ops. Template hiện có: ${Object.keys(TEMPLATES).join(", ")}. siteBoundary = polygon ranh đất mm [[x,y],...] nếu biết ngay từ đầu.`,
      inputSchema: {
        name: z.string().min(1).describe("Tên dự án, vd 'Nhà anh Ba'"),
        template: z.string().optional().describe("ID template khởi đầu (bỏ trống = dự án trống)"),
        siteBoundary: z.array(z.tuple([z.number().int(), z.number().int()])).min(3).optional(),
        brief: z.record(z.unknown()).optional().describe("Brief pha A (schema xem docs/02): dat, gia_dinh, nhu_cau, ngan_sach, gu, uu_tien, phong_thuy.lo_ban"),
      },
    },
    (args) => {
      try {
        const p = store.newProject(args.name, args.template, args.siteBoundary as never, args.brief as never);
        return text(`✅ Đã tạo ${store.filePath}\n${projectBrief(p)}\nBước tiếp: brief (pha A) → apply_ops dựng/chỉnh model → validate → render_plan.`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "project_open",
    {
      title: "Mở dự án có sẵn",
      description: `Mở file model. Bỏ trống path để mở ${store.filePath}.`,
      inputSchema: { path: z.string().optional() },
    },
    (args) => {
      try {
        const p = store.openProject(args.path);
        return text(`✅ Đã mở.\n${projectBrief(p)}`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "model_query",
    {
      title: "Đọc model",
      description:
        "Đọc phần model theo bộ lọc. select.entity (walls|openings|slabs|stairs|rooms|furniture|levels|axes|styles|finishes|meta|brief|site), select.ids, select.level. computed=true trả kèm giá trị dẫn xuất (diện tích phòng, riser thang) — các giá trị này KHÔNG lưu trong model, đừng cố ghi chúng.",
      inputSchema: {
        select: z
          .object({
            entity: z.string().optional(),
            ids: z.array(z.string()).optional(),
            level: z.string().optional(),
          })
          .optional(),
        computed: z.boolean().optional(),
      },
    },
    (args) => {
      try {
        const p = store.current;
        const out = queryModel(p, args.select ?? {}, args.computed ?? false);
        return text(JSON.stringify(out, null, 2));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "apply_ops",
    {
      title: "Sửa model (cổng mutation duy nhất)",
      description:
        "Áp một batch ops như MỘT transaction: tất cả cùng áp hoặc cùng hủy. baseRevision phải bằng revision hiện tại — nếu đã lâu không đọc model (hoặc người dùng có thể vừa sửa tay), LUÔN gọi get_changes_since trước; không bao giờ ghi đè thay đổi của người dùng. Entity người dùng đang kéo trên editor bị khóa mềm (LOCK-01) — chờ vài giây rồi get_changes_since xem họ đổi gì, thích nghi theo thay vì 'sửa lại cho đúng ý mình'. Không có op thay cả model. Lỗi mức block → transaction bị hủy, đọc message rồi tự sửa và gửi lại. warnings (error/warn/info) không chặn ghi nhưng phải xử lý trước checkpoint. ID do client tự đặt theo tiền tố: W tường, D cửa đi, S cửa sổ, R phòng, F nội thất, ST thang, SL sàn, L tầng.",
      inputSchema: {
        baseRevision: z.number().int().nonnegative(),
        ops: z.array(OP).min(1),
        note: z.string().optional().describe("Ghi chú ngắn cho journal, vd 'Ngăn phòng ngủ 2'"),
      },
    },
    (args) => {
      try {
        const r = store.apply(args.baseRevision, args.ops as Op[], args.note);
        if (!r.ok) {
          return text(`⛔ Transaction bị hủy (revision hiện tại: ${r.currentRevision}).\n${issueLines(r.errors)}`);
        }
        const warn = r.warnings.length ? `\nCảnh báo:\n${issueLines(r.warnings)}` : "\nValidator: sạch.";
        return text(`✅ revision ${r.revision} — ${r.summary}${warn}`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "get_changes_since",
    {
      title: "Xem thay đổi từ một revision",
      description:
        "Trả các ops từ revision đó tới nay kèm tóm tắt chữ + origin (claude/user/system) — dùng để bắt kịp thay đổi tay của người dùng trước khi apply_ops.",
      inputSchema: { revision: z.number().int().nonnegative() },
    },
    (args) => {
      try {
        const { entries, currentRevision } = store.changesSince(args.revision);
        if (entries.length === 0) return text(`Không có thay đổi nào sau revision ${args.revision}. Revision hiện tại: ${currentRevision}.`);
        const lines = entries.map((e) => `r${e.revision} [${e.origin}] ${e.summary}${e.note ? ` — "${e.note}"` : ""}`);
        return text(`Revision hiện tại: ${currentRevision}\n${lines.join("\n")}\n\nChi tiết ops:\n${JSON.stringify(entries.map((e) => ({ revision: e.revision, ops: e.ops })), null, 2)}`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "validate",
    {
      title: "Chạy validator",
      description:
        "Chạy toàn bộ rule (GEO topology, STD chuẩn VN, LBB Lỗ Ban nếu brief bật) trên model. scope.level hoặc scope.entityIds để lọc kết quả. Chạy validate + render_plan tự soi TRƯỚC khi mời người dùng xem (nguyên tắc 5).",
      inputSchema: {
        scope: z
          .object({ level: z.string().optional(), entityIds: z.array(z.string()).optional() })
          .optional(),
      },
    },
    (args) => {
      try {
        const p = store.current;
        let issues = validateProject(p);
        const scope = args.scope;
        if (scope?.entityIds?.length) {
          const set = new Set(scope.entityIds);
          issues = issues.filter((i) => i.entities.some((e) => set.has(e)));
        }
        if (scope?.level) {
          const onLevel = entityIdsOfLevel(p, scope.level);
          issues = issues.filter((i) => i.entities.some((e) => onLevel.has(e)));
        }
        return text(`Validator (revision ${p.meta.revision}): ${issueLines(issues)}`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "render_plan",
    {
      title: "Render mặt bằng (PNG + SVG)",
      description:
        "Sinh bản vẽ mặt bằng một tầng đúng ký hiệu + dim từ model, trả ảnh PNG để nhìn ngay trong chat (SVG lưu ở .atelier/exports). layers để lọc (vd chỉ TUONG-CAT,DIM khi cần soi kích thước). scale 50/100 (mặc định tự chọn).",
      inputSchema: {
        level: z.string().describe("ID level, vd L1"),
        scale: z.number().int().optional(),
        layers: z.array(z.string()).optional(),
      },
    },
    async (args) => {
      try {
        const p = store.current;
        const underlay = loadUnderlay(p, store.baseDir);
        const r = await renderPlanFiles(p, args.level, store.exportDir, {
          date: new Date().toLocaleDateString("vi-VN"),
          ...(args.scale ? { scale: args.scale } : {}),
          ...(args.layers ? { layers: args.layers } : {}),
          ...(underlay ? { underlay } : {}),
        });
        const issues = validateProject(p);
        const note = `Đã render ${r.levelName} (${r.scaleLabel}) → ${r.svgPath}\nValidator: ${issues.length === 0 ? "sạch" : `${issues.length} vấn đề — chạy validate để xem`}.`;
        if (!r.pngPath) {
          return text(`${note}\n(PNG lỗi: ${r.pngError ?? "không rõ"} — xem SVG.)`);
        }
        const png = readFileSync(r.pngPath).toString("base64");
        return {
          content: [
            { type: "image" as const, data: png, mimeType: "image/png" },
            { type: "text" as const, text: note },
          ],
        };
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "editor_open",
    {
      title: "Mở live editor trên trình duyệt",
      description:
        "Khởi động web editor (một process với server) và mở bằng trình duyệt mặc định — từ đây MỌI apply_ops hiện ngay trên màn hình người dùng (2D + 3D), làm đến đâu dựng đến đó. Gọi sau khi đã project_new/project_open. openBrowser=false nếu chỉ cần URL. Sau khi mở, dùng capture_view để tự nhìn đúng cái người dùng đang thấy (nguyên tắc 5).",
      inputSchema: {
        openBrowser: z.boolean().optional().describe("Mặc định true — tự mở trình duyệt"),
      },
    },
    async (args) => {
      try {
        void store.current; // bắt lỗi "chưa mở dự án" sớm, thông điệp chỉ đường sẵn có
        const url = await live.start();
        if (args.openBrowser !== false) openInBrowser(url);
        const distNote = existsSync(DEFAULT_WEB_DIST)
          ? ""
          : "\n⚠ Web editor chưa build — trang sẽ hướng dẫn chạy: pnpm --filter @atelier/web build";
        const share = live.shareUrl();
        return text(
          `✅ Editor: ${url}${args.openBrowser !== false ? " (đã mở trình duyệt)" : ""} — browser đang nối: ${live.browserCount}.${distNote}` +
            (share
              ? `\n👁 Link chia sẻ CHỈ-XEM (gửi cho người thân cùng ngắm, không sửa được): ${share}\n   (mặc định server chỉ nghe 127.0.0.1 — muốn máy khác trong mạng LAN mở được, đặt ATELIER_HOST=0.0.0.0 rồi mở lại; thu hồi link: POST /share/rotate)`
              : ""),
        );
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "capture_view",
    {
      title: "Chụp khung nhìn editor",
      description:
        "Nhờ browser đang mở chụp ĐÚNG cái người dùng đang thấy: target '3d' (canvas Three.js) hoặc 'plan' (mặt bằng 2D). camera {position, lookAt} mm để đặt góc 3D trước khi chụp — bỏ trống là giữ góc người dùng đang xem. Chưa có browser: 'plan' fallback render server (tầng thấp nhất), '3d' cần editor_open trước. Dùng để TỰ NHÌN sau mỗi thay đổi lớn (nguyên tắc 5).",
      inputSchema: {
        target: z.enum(["3d", "plan"]),
        camera: z
          .object({
            position: z.tuple([z.number(), z.number(), z.number()]).optional(),
            lookAt: z.tuple([z.number(), z.number(), z.number()]).optional(),
          })
          .optional(),
      },
    },
    async (args) => {
      try {
        const p = store.current;
        if (live.browserCount > 0) {
          const png = await live.capture(args.target, args.camera as CaptureCamera | undefined);
          return {
            content: [
              { type: "image" as const, data: png, mimeType: "image/png" },
              { type: "text" as const, text: `Ảnh ${args.target} từ browser (revision ${p.meta.revision}).` },
            ],
          };
        }
        if (args.target === "plan") {
          const ground = [...p.levels].sort((a, b) => a.elevation - b.elevation)[0]!;
          const r = await renderPlanFiles(p, ground.id, store.exportDir, {
            date: new Date().toLocaleDateString("vi-VN"),
          });
          if (!r.pngPath) return fail(new Error(`Fallback render lỗi: ${r.pngError ?? "không rõ"}`));
          const png = readFileSync(r.pngPath).toString("base64");
          return {
            content: [
              { type: "image" as const, data: png, mimeType: "image/png" },
              { type: "text" as const, text: `Chưa có browser mở — đây là bản render server ${r.levelName} (revision ${p.meta.revision}). Muốn nhìn đúng khung người dùng: editor_open trước.` },
            ],
          };
        }
        return fail(new Error("Chưa có browser nào mở editor — gọi editor_open trước (3d chỉ chụp được từ browser)."));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "assets_search",
    {
      title: "Tìm asset nội thất trong catalog",
      description:
        `Tìm trong catalog ${"≥100"} asset chuẩn hóa (kích thước mm THẬT, tên VN, khe hở khuyến nghị) — dùng id trả về cho apply_ops add furniture. Trả kèm MỘT ảnh contact sheet để nhìn hình dáng + cỡ. maxFootprint {w,d} lọc đồ vừa chỗ trống (vd hốc 900mm). Category: ${ASSET_CATEGORIES.join(", ")}. Đồ treo tường có "treo <mm>" — đặt bằng field elevation của furniture.`,
      inputSchema: {
        query: z.string().optional().describe("Từ khóa, vd 'giường', 'sofa góc'"),
        category: z.string().optional(),
        maxFootprint: z.object({ w: z.number().optional(), d: z.number().optional() }).optional(),
      },
    },
    async (args) => {
      try {
        if (args.category && !ASSET_CATEGORIES.includes(args.category as AssetCategory)) {
          return fail(new Error(`Category "${args.category}" không tồn tại — hợp lệ: ${ASSET_CATEGORIES.join(", ")}.`));
        }
        const found = searchAssets(args.query ?? "", args.category as AssetCategory | undefined, args.maxFootprint);
        if (found.length === 0) return text("Không có asset nào khớp — thử từ khóa rộng hơn hoặc bỏ bộ lọc.");
        const lines = found.slice(0, 40).map((a) => {
          const cl = a.clearance
            ? ` — khe hở${a.clearance.front ? ` trước ${a.clearance.front}` : ""}${a.clearance.sides ? ` bên ${a.clearance.sides}` : ""}`
            : "";
          const treo = a.mountHeight != null ? ` — treo cao ${a.mountHeight}` : "";
          return `${a.id} · ${a.label} · ${a.footprint.w}×${a.footprint.d}, cao ${a.footprint.h}${cl}${treo}`;
        });
        if (found.length > 40) lines.push(`… và ${found.length - 40} asset nữa — lọc thêm bằng category/maxFootprint.`);
        const note = `${found.length} asset khớp:\n${lines.join("\n")}`;
        try {
          const svg = buildAssetsSheetSvg(
            found.slice(0, SHEET_CAPACITY),
            args.query || args.category ? `KẾT QUẢ: ${args.query ?? args.category}` : "CATALOG NỘI THẤT — ATELIER",
          );
          const { svgToPng } = await import("./render/png.js");
          const { mkdtempSync } = await import("node:fs");
          const os = await import("node:os");
          const fp = path.join(mkdtempSync(path.join(os.tmpdir(), "atelier-assets-")), "sheet.png");
          await svgToPng(svg, fp);
          const png = readFileSync(fp).toString("base64");
          return {
            content: [
              { type: "image" as const, data: png, mimeType: "image/png" },
              { type: "text" as const, text: note },
            ],
          };
        } catch {
          return text(note); // không có Chromium vẫn dùng được bằng chữ
        }
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "render_view",
    {
      title: "Render mặt đứng / mặt cắt (PNG + SVG)",
      description:
        "Sinh MẶT ĐỨNG CHÍNH (chiếu cạnh mặt tiền site.front) hoặc MẶT CẮT A-A (vết dọc qua thang — cần model có thang) từ model, trả ảnh PNG nhìn ngay trong chat. Dùng để tự soi trước checkpoint pha E (nguyên tắc 5); mặt bằng vẫn là render_plan.",
      inputSchema: {
        kind: z.enum(["elevation", "section"]),
        scale: z.number().int().optional().describe("50/100 — mặc định tự chọn"),
      },
    },
    async (args) => {
      try {
        const p = store.current;
        const opts = {
          date: new Date().toLocaleDateString("vi-VN"),
          ...(args.scale ? { scale: args.scale } : {}),
        };
        const r = args.kind === "elevation" ? renderElevationSvg(p, opts) : renderSectionSvg(p, opts);
        mkdirSync(store.exportDir, { recursive: true });
        const base = args.kind === "elevation" ? "mat-dung" : "mat-cat-a-a";
        const svgPath = path.join(store.exportDir, `${base}.svg`);
        writeFileSync(svgPath, r.svg, "utf8");
        const pngPath = path.join(store.exportDir, `${base}.png`);
        try {
          const { svgToPng } = await import("./render/png.js");
          await svgToPng(r.svg, pngPath);
        } catch (e) {
          return text(`Đã render ${r.title} (${r.scaleLabel}) → ${svgPath}\n(PNG lỗi: ${e instanceof Error ? e.message : String(e)} — xem SVG.)`);
        }
        const png = readFileSync(pngPath).toString("base64");
        return {
          content: [
            { type: "image" as const, data: png, mimeType: "image/png" },
            { type: "text" as const, text: `Đã render ${r.title} (${r.scaleLabel}) → ${svgPath}` },
          ],
        };
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "variant_save",
    {
      title: "Lưu phương án (A/B)",
      description:
        "Chụp model hiện tại thành PHƯƠNG ÁN có tên (.atelier/phuong-an/) để so sánh A/B — vd trước khi thử một bố trí khác: variant_save('Phương án A — thang giữa nhà'). Cùng tên → cập nhật đè. Xem cạnh nhau: variant_compare hoặc trang /so-sanh trên editor.",
      inputSchema: { name: z.string().min(1).describe("Tên phương án, vd 'Phương án A — bếp quay ra sau'") },
    },
    (args) => {
      try {
        const { slug, revision } = store.saveVariant(args.name);
        const all = store.listVariants().map((v) => `${v.slug} ("${v.name}", r${v.revision})`).join("; ");
        return text(`✅ Đã lưu phương án "${args.name}" (slug: ${slug}, tại revision ${revision}).\nHiện có: ${all}.`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "variant_open",
    {
      title: "Chuyển sang phương án đã lưu",
      description:
        "Checkout một phương án thành model đang làm — mọi tab editor tự nhận snapshot mới. ⚠ Model hiện tại KHÔNG tự lưu: nếu muốn giữ, variant_save trước rồi hãy mở. Revision tiếp tục tăng nên get_changes_since vẫn liền mạch.",
      inputSchema: { slug: z.string().min(1) },
    },
    (args) => {
      try {
        const p = store.openVariant(args.slug);
        return text(`✅ Đang làm việc trên phương án "${args.slug}".\n${projectBrief(p)}`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "variant_compare",
    {
      title: "So sánh 2 phương án cạnh nhau",
      description:
        "Đặt 2 mặt bằng CẠNH NHAU + bảng diff (diện tích từng phòng, số tường/cửa/nội thất, DỰ TOÁN từng bên) — trả ảnh PNG nhìn ngay trong chat. a/b là slug phương án hoặc 'hien-tai' (mặc định: a = phương án lưu gần nhất, b = model hiện tại). Người dùng xem bản tương tác tại <editor>/so-sanh?a=&b=&level=.",
      inputSchema: {
        a: z.string().optional(),
        b: z.string().optional(),
        level: z.string().optional().describe("ID tầng, mặc định tầng thấp nhất"),
      },
    },
    async (args) => {
      try {
        const side = (key: string | undefined, fallbackLatest: boolean): { label: string; model: Project } => {
          if (key && key !== "hien-tai") {
            const v = store.readVariant(key);
            return { label: v.name, model: v.model };
          }
          if (fallbackLatest) {
            const latest = store.listVariants().at(-1);
            if (latest) {
              const v = store.readVariant(latest.slug);
              return { label: v.name, model: v.model };
            }
            throw new Error("Chưa có phương án nào — variant_save trước rồi mới so sánh được.");
          }
          return { label: `HIỆN TẠI (r${store.current.meta.revision})`, model: store.current };
        };
        const a = side(args.a, true);
        const b = side(args.b, false);
        const level = args.level ?? [...a.model.levels].sort((x, y) => x.elevation - y.elevation)[0]?.id;
        if (!level) return fail(new Error("Model chưa có tầng nào."));

        store.refreshDonGia();
        const report = compareProjects(a, b);
        const lines = [
          `So sánh (${level}): A = ${report.a.label} · B = ${report.b.label}`,
          ...report.highlights.map((h) => `• ${h}`),
          `Tổng DT phòng: A ${report.a.tongPhong_m2}m² · B ${report.b.tongPhong_m2}m²; dự toán: A ~${formatVnd(report.a.duToan_vnd)} · B ~${formatVnd(report.b.duToan_vnd)}.`,
          ...(live.url ? [`Bản tương tác: ${live.url}/so-sanh${args.a ? `?a=${args.a}` : ""}`] : []),
        ];
        try {
          const html = compareHtml(a, b, level, store.current.meta.name);
          const { htmlToPng } = await import("./render/png.js");
          const { mkdtempSync } = await import("node:fs");
          const os = await import("node:os");
          const fp = path.join(mkdtempSync(path.join(os.tmpdir(), "atelier-sosanh-")), "so-sanh.png");
          await htmlToPng(html, fp);
          const png = readFileSync(fp).toString("base64");
          return {
            content: [
              { type: "image" as const, data: png, mimeType: "image/png" },
              { type: "text" as const, text: lines.join("\n") },
            ],
          };
        } catch {
          return text(lines.join("\n")); // không có Chromium vẫn có diff chữ
        }
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "estimate_cost",
    {
      title: "Dự toán chi phí sơ bộ",
      description:
        "Ước tính chi phí xây từ model: diện tích quy đổi (sàn 100%, móng ~40%, mái ~50%) × đơn giá phần thô + sàn thực × đơn giá hoàn thiện theo mức trong brief (muc để override: co-ban | trung-binh-kha | cao-cap). Tự so với ngân sách brief. Sai số ±15–20%, KHÔNG thay báo giá thầu — đơn giá là data người dùng sửa được ở packages/core/rules/don-gia.json. Tờ DỰ TOÁN SƠ BỘ cũng nằm trong bộ export (id 'estimate').",
      inputSchema: {
        muc: z.enum(["co-ban", "trung-binh-kha", "cao-cap"]).optional(),
      },
    },
    (args) => {
      try {
        const p = store.current;
        store.refreshDonGia();
        const e = estimateCost(p, args.muc as FinishLevel | undefined);
        const q = e.quantities;
        const lines: string[] = [];
        lines.push(`DỰ TOÁN SƠ BỘ — "${p.meta.name}" (revision ${p.meta.revision})`);
        lines.push("");
        lines.push("Diện tích tính phí:");
        for (const l of q.dien_tich) {
          lines.push(`  ${l.label}${l.uoc_le ? " (ước lệ)" : ""}: ${l.dien_tich_m2}m² × ${l.he_so} = ${l.quy_doi_m2}m²`);
        }
        lines.push(`  TỔNG QUY ĐỔI: ${q.tong_quy_doi_m2}m² · sàn thực ${q.san_thuc_m2}m²`);
        lines.push("");
        lines.push("Chi phí:");
        for (const i of e.items) {
          lines.push(`  ${i.label}: ${i.don_gia_vnd.toLocaleString("vi-VN")}đ/m² → ${i.thanh_tien_vnd.toLocaleString("vi-VN")}đ`);
        }
        lines.push(`  ➤ TỔNG: ${e.tong_vnd.toLocaleString("vi-VN")}đ (~${formatVnd(e.tong_vnd)})`);
        if (e.ngan_sach) {
          const ns = e.ngan_sach;
          lines.push(
            ns.vnd == null
              ? `Ngân sách brief "${ns.text}" — chưa quy được ra số.`
              : ns.chenh_lech_vnd! >= 0
                ? `Ngân sách brief ${formatVnd(ns.vnd)} → CÒN DƯ ~${formatVnd(ns.chenh_lech_vnd!)}.`
                : `Ngân sách brief ${formatVnd(ns.vnd)} → VƯỢT ~${formatVnd(-ns.chenh_lech_vnd!)} — cân nhắc giảm mức hoàn thiện hoặc diện tích.`,
          );
        }
        lines.push("");
        lines.push(`Khối lượng tham khảo: tường xây ${q.tuong_xay_m2}m², cửa ${q.cua_bo} bộ (${q.cua_m2}m²), thang ${q.bac_thang} bậc.`);
        for (const g of e.ghi_chu) lines.push(`⚠ ${g}`);
        lines.push(`(Bảng đơn giá ${DON_GIA.version} — đặt bảng địa phương tại rules/don-gia.json trong thư mục dự án.)`);
        return text(lines.join("\n"));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "export",
    {
      title: "Xuất hồ sơ bản vẽ",
      description:
        "Xuất hồ sơ vào .atelier/exports/ho-so/. format: 'pdf' = BỘ tờ KT-01… một file A3 nhiều trang (bàn giao); 'svg' = mỗi tờ một file; 'dxf' = mỗi tờ hình học một file mm thật (mở CAD đo được; tờ bảng không có DXF); 'gltf' = MỘT file .glb toàn nhà (mét, mỗi entity một node theo id — mở viewer/Blender, kèm scripts/render-photoreal.py để render đẹp); 'ifc' = IFC4 concept (tường + lỗ cửa đúng quan hệ voids/fills, sàn có lỗ, thang, IfcSpace từng phòng — bàn giao KTS/BIM, KHÔNG phải hồ sơ thi công). sheets chỉ áp cho pdf/svg/dxf: plan-<levelId> | elevation | section | schedule | estimate. LUÔN validate + tự soi render trước khi bàn giao (checkpoint 5).",
      inputSchema: {
        format: z.enum(["pdf", "svg", "dxf", "gltf", "ifc"]),
        sheets: z.array(z.string()).optional(),
      },
    },
    async (args) => {
      try {
        const p = store.current;
        if (args.format === "gltf" || args.format === "ifc") {
          const dir0 = path.join(store.exportDir, "ho-so");
          mkdirSync(dir0, { recursive: true });
          const issues0 = validateProject(p);
          const vNote = `Validator: ${issues0.length === 0 ? "sạch." : `${issues0.length} vấn đề — chạy validate soi lại trước khi bàn giao.`}`;
          if (args.format === "gltf") {
            const fp = path.join(dir0, `${p.meta.id}.glb`);
            const glb = modelToGlb(p);
            writeFileSync(fp, glb);
            return text(`✅ glTF (GLB) ${Math.round(glb.length / 1024)}KB → ${fp}
Mét thật, mỗi entity một node theo id. Render photoreal: blender -b -P scripts/render-photoreal.py -- "${fp}" out.png
${vNote}`);
          }
          const fp = path.join(dir0, `${p.meta.id}.ifc`);
          const ifc = modelToIfc(p);
          writeFileSync(fp, ifc, "utf8");
          return text(`✅ IFC4 concept → ${fp}
Tường + lỗ cửa (voids/fills), sàn có lỗ, thang, IfcSpace từng phòng — mở bằng BIM viewer/BlenderBIM; KHÔNG thay hồ sơ thi công.
${vNote}`);
        }
        store.refreshDonGia();
        const set = buildSheetSet(p, {
          date: new Date().toLocaleDateString("vi-VN"),
          ...(args.sheets?.length ? { sheets: args.sheets } : {}),
        });
        if (set.sheets.length === 0) {
          const known = ["plan-<levelId>", "elevation", "section", "schedule", "estimate"].join(" | ");
          return fail(new Error(`Không tờ nào khớp bộ lọc — id hợp lệ: ${known}.`));
        }
        const dir = path.join(store.exportDir, "ho-so");
        mkdirSync(dir, { recursive: true });
        const lines: string[] = [];
        if (args.format === "pdf") {
          const file = path.join(dir, `${p.meta.id}-ho-so.pdf`);
          const { svgsToPdf } = await import("./render/pdf.js");
          await svgsToPdf(set.sheets.map((s) => sheetSvg(s)), file);
          lines.push(`✅ PDF ${set.sheets.length} trang → ${file}`);
        } else if (args.format === "svg") {
          for (const s of set.sheets) {
            const fp = path.join(dir, `${s.fileBase}.svg`);
            writeFileSync(fp, sheetSvg(s), "utf8");
            lines.push(`  ${s.no} ${s.title} → ${fp}`);
          }
          lines.unshift(`✅ ${set.sheets.length} tờ SVG:`);
        } else {
          const withModel = set.sheets.filter((s) => s.hasModel);
          for (const s of withModel) {
            const fp = path.join(dir, `${s.fileBase}.dxf`);
            writeFileSync(fp, sheetDxf(s), "utf8");
            lines.push(`  ${s.no} ${s.title} → ${fp}`);
          }
          lines.unshift(`✅ ${withModel.length} tờ DXF (mm thật, layer TCVN):`);
        }
        lines.push(`Bộ tờ: ${set.sheets.map((s) => `${s.no} ${s.title}`).join("; ")}.`);
        for (const sk of set.skipped) lines.push(`⚠ Bỏ tờ ${sk.id}: ${sk.reason}`);
        const issues = validateProject(p);
        lines.push(`Validator: ${issues.length === 0 ? "sạch." : `${issues.length} vấn đề — chạy validate soi lại trước khi bàn giao.`}`);
        return text(lines.join("\n"));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "underlay_import",
    {
      title: "Nhập bản vẽ cũ / ảnh mặt bằng làm underlay đồ lại",
      description:
        "Đặt DXF (bản CAD cũ) hoặc ảnh PNG/JPEG (chụp/scan mặt bằng) làm lớp MỜ dưới mặt bằng để dựng model theo — underlay là giàn giáo, KHÔNG vào bản vẽ xuất. Tỷ lệ: DXF thường tự suy từ $INSUNITS; nếu không (và luôn luôn với ảnh) hỏi người dùng MỘT đoạn đã biết chiều dài thật rồi truyền calibrate {a,b,mm} — a/b theo đơn vị nguồn (DXF unit / pixel ảnh; chỉ dùng KHOẢNG CÁCH nên đo hệ trục nào cũng được). Sau import: render_plan soi vị trí, chỉnh chỗ đặt bằng apply_ops update underlay U1 (origin/rotation/scale/opacity/level; origin ảnh = góc dưới-trái), DXF thì underlay_trace để dò tường. Xóa: apply_ops delete underlay U1.",
      inputSchema: {
        path: z.string().describe("Đường dẫn file .dxf/.png/.jpg (tuyệt đối, hoặc tương đối thư mục dự án)"),
        scale: z.number().positive().optional().describe("mm model trên MỘT đơn vị nguồn (DXF unit / pixel). Bỏ trống = calibrate hoặc $INSUNITS"),
        calibrate: z
          .object({
            a: z.tuple([z.number(), z.number()]),
            b: z.tuple([z.number(), z.number()]),
            mm: z.number().positive(),
          })
          .optional()
          .describe("Hai điểm theo đơn vị NGUỒN + khoảng cách thật mm giữa chúng — tự tính scale"),
        origin: z.tuple([z.number(), z.number()]).optional().describe("Điểm model mm nơi gốc (0,0) nguồn được đặt — mặc định [0,0]"),
        rotation: z.number().optional().describe("Độ CCW quanh origin"),
        opacity: z.number().min(0.05).max(1).optional().describe("Độ hiện 0..1, mặc định 0.35"),
        level: z.string().optional().describe("Chỉ hiện ở tầng này (vd L1) — bỏ trống = mọi tầng"),
      },
    },
    (args) => {
      try {
        const p = store.current;
        const src = path.isAbsolute(args.path) ? args.path : path.resolve(store.baseDir, args.path);
        if (!existsSync(src)) return fail(new Error(`Không thấy file: ${src}`));
        const ext = path.extname(src).toLowerCase();
        const kind = ext === ".dxf" ? "dxf" : [".png", ".jpg", ".jpeg"].includes(ext) ? "image" : null;
        if (!kind) return fail(new Error(`Chỉ nhận .dxf / .png / .jpg — nhận được "${ext}". PDF thì chụp/scan ra ảnh trước.`));

        const info: string[] = [];
        let autoScale: number | null = null;
        if (kind === "dxf") {
          const d = parseDxf(readFileSync(src, "utf8"));
          if (d.polylines.length === 0) {
            return fail(new Error("DXF không có nét đọc được (LINE/LWPOLYLINE/POLYLINE/CIRCLE/ARC) — file toàn block/INSERT thì explode ra entity thường trước."));
          }
          autoScale = d.mmPerUnit;
          const nSkip = Object.entries(d.skipped).map(([k, v]) => `${k}×${v}`).join(", ");
          info.push(`Nét đọc được: ${Object.entries(d.counts).map(([k, v]) => `${k}×${v}`).join(", ")}${nSkip ? ` (bỏ qua: ${nSkip})` : ""}`);
          if (d.bounds) info.push(`Khung nguồn: ${Math.round(d.bounds.maxX - d.bounds.minX)}×${Math.round(d.bounds.maxY - d.bounds.minY)} đơn vị`);
        } else {
          const im = imageSize(readFileSync(src));
          info.push(`Ảnh ${im.width}×${im.height}px`);
        }

        let scale = args.scale ?? null;
        let scaleFrom = "khai báo";
        if (!scale && args.calibrate) {
          const { a, b, mm } = args.calibrate;
          const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
          if (d < 1e-6) return fail(new Error("calibrate: hai điểm a/b trùng nhau."));
          scale = mm / d;
          scaleFrom = `calibrate (${Math.round(d)} đơn vị = ${args.calibrate.mm}mm)`;
        }
        if (!scale && autoScale) {
          scale = autoScale;
          scaleFrom = "$INSUNITS của DXF";
        }
        if (!scale) {
          return fail(new Error(
            kind === "dxf"
              ? "DXF không khai $INSUNITS — hỏi người dùng một đoạn đã biết chiều dài thật rồi truyền calibrate {a,b,mm}, hoặc scale trực tiếp."
              : "Ảnh bắt buộc có tỷ lệ — hỏi người dùng một đoạn đã biết chiều dài thật trên ảnh (đo pixel) rồi truyền calibrate {a,b,mm}, hoặc scale = mm/pixel.",
          ));
        }

        const dir = underlayDir(store.baseDir);
        mkdirSync(dir, { recursive: true });
        const source = path.basename(src);
        const dst = path.join(dir, source);
        if (path.resolve(dst) !== path.resolve(src)) writeFileSync(dst, readFileSync(src));

        const data = {
          id: "U1",
          kind,
          source,
          origin: args.origin ?? [0, 0],
          scale,
          ...(args.rotation ? { rotation: args.rotation } : {}),
          ...(args.opacity ? { opacity: args.opacity } : {}),
          ...(args.level ? { level: args.level } : {}),
        };
        const op: Op = p.underlay
          ? { op: "update", entity: "underlay", id: "U1", data }
          : { op: "add", entity: "underlay", data };
        const r = store.apply(p.meta.revision, [op], `import underlay ${source}`);
        if (!r.ok) return fail(new Error(r.errors.map((e) => e.message).join("; ")));

        return text([
          `✅ Underlay ${kind} "${source}" (revision ${r.revision}) — tỷ lệ ${scale.toFixed(4)} mm/đơn vị (${scaleFrom}).`,
          ...info,
          `Hiện MỜ dưới mặt bằng (editor + render_plan; bản vẽ XUẤT không có). Soi bằng render_plan rồi chỉnh chỗ đặt: apply_ops update underlay U1 (origin/rotation/scale/opacity/level).`,
          ...(kind === "dxf" ? ["Dò tường từ nét DXF: underlay_trace."] : []),
        ].join("\n"));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "underlay_trace",
    {
      title: "Dò tường từ underlay DXF (đề xuất, không tự áp)",
      description:
        "Heuristic đọc nét DXF của underlay: hai nét song song trục cách nhau một bề dày tường hợp lý, chồng lấp đủ dài → ứng viên tường ở đường tim. Trả về danh sách ops ĐỀ XUẤT (không tự áp) — duyệt bằng mắt với render_plan (underlay hiện dưới), bỏ ứng viên sai (đồ nội thất vẽ hai nét, ranh sân…), rồi tự apply_ops những op giữ lại. v1 chỉ dò nét thẳng trục x/y; ảnh raster không dò được — đồ tay theo underlay.",
      inputSchema: {
        level: z.string().describe("Tầng nhận tường đề xuất, vd L1"),
        minOverlap: z.number().positive().optional().describe("Chồng lấp tối thiểu mm (mặc định 600 — tăng lên nếu ra quá nhiều rác)"),
        thickness: z.tuple([z.number(), z.number()]).optional().describe("Khoảng bề dày chấp nhận [min,max] mm, mặc định [80,400]"),
      },
    },
    (args) => {
      try {
        const p = store.current;
        const u = p.underlay;
        if (!u) return fail(new Error("Chưa có underlay — underlay_import trước."));
        if (u.kind !== "dxf") return fail(new Error("Underlay hiện là ảnh — dò tường chỉ chạy trên DXF; ảnh thì đồ tay theo nền mờ."));
        if (!p.levels.some((l) => l.id === args.level)) {
          return fail(new Error(`Không có level "${args.level}" — các level: ${p.levels.map((l) => l.id).join(", ")}.`));
        }
        const cands = detectWalls(placedPolylines(u, store.baseDir), {
          ...(args.minOverlap ? { minOverlap: args.minOverlap } : {}),
          ...(args.thickness ? { thickness: args.thickness } : {}),
        });
        if (cands.length === 0) {
          return text("Không dò được cặp nét song song nào ra dáng tường — thử hạ minOverlap, nới thickness, hoặc kiểm tra tỷ lệ underlay (bề dày tường sau scale phải rơi vào khoảng 80–400mm).");
        }
        const MAX = 40;
        const kept = cands.slice(0, MAX);
        let n = 100; // W101… tránh đụng id model hiện có lẫn nhau trong batch
        const usedIds = new Set([...p.walls.map((w) => w.id)]);
        const ops = kept.map((c) => {
          do n++; while (usedIds.has(`W${n}`));
          usedIds.add(`W${n}`);
          return {
            op: "add" as const,
            entity: "wall" as const,
            data: { id: `W${n}`, level: args.level, from: c.from, to: c.to, thickness: c.thickness, kind: "gach" },
          };
        });
        return text([
          `Dò được ${cands.length} ứng viên tường${cands.length > MAX ? ` (trả ${MAX} dài nhất — còn lại chạy lại với minOverlap cao hơn)` : ""} — ĐỀ XUẤT, chưa áp:`,
          JSON.stringify(ops, null, 2),
          `Duyệt trước khi áp: render_plan (nét underlay xanh mờ nằm dưới), bỏ op sai (nội thất hai nét, ranh sân…), chỉnh from/to nếu cần bám trục, rồi apply_ops với baseRevision ${p.meta.revision}.`,
        ].join("\n"));
      } catch (e) {
        return fail(e);
      }
    },
  );

  return server;
}

function entityIdsOfLevel(p: Project, levelId: string): Set<string> {
  const ids = new Set<string>([levelId]);
  for (const list of [p.walls, p.rooms, p.slabs, p.roofs ?? [], p.stairs, p.furniture]) {
    for (const e of list) if ((e as { level?: string }).level === levelId) ids.add(e.id);
  }
  for (const o of p.openings) {
    const w = p.walls.find((x) => x.id === o.wall);
    if (w?.level === levelId) ids.add(o.id);
  }
  return ids;
}

function queryModel(
  p: Project,
  select: { entity?: string; ids?: string[]; level?: string },
  computed: boolean,
): unknown {
  const idSet = select.ids ? new Set(select.ids) : null;
  const keepId = (e: { id: string }): boolean => !idSet || idSet.has(e.id);
  const keepLevel = (e: { level?: string }): boolean => !select.level || e.level === select.level;

  const slices: Record<string, unknown> = {
    meta: p.meta,
    brief: p.brief,
    site: p.site,
    axes: p.axes,
    levels: p.levels.filter(keepId),
    walls: p.walls.filter((e) => keepId(e) && keepLevel(e)),
    openings: p.openings.filter((o) => {
      if (!keepId(o)) return false;
      if (!select.level) return true;
      return p.walls.find((w) => w.id === o.wall)?.level === select.level;
    }),
    slabs: p.slabs.filter((e) => keepId(e) && keepLevel(e)),
    roofs: (p.roofs ?? []).filter((e) => keepId(e) && keepLevel(e)),
    stairs: p.stairs.filter((e) => keepId(e) && keepLevel(e)),
    rooms: p.rooms.filter((e) => keepId(e) && keepLevel(e)),
    furniture: p.furniture.filter((e) => keepId(e) && keepLevel(e)),
    styles: p.styles,
    finishes: p.finishes,
    underlay: p.underlay ?? "(chưa có underlay — dùng underlay_import)",
  };

  const base: Record<string, unknown> = select.entity
    ? { [select.entity]: slices[select.entity] ?? `(không có mục "${select.entity}")` }
    : { meta: p.meta, revision: p.meta.revision, ...slices };

  if (computed) {
    base.computed = {
      rooms: (slices.rooms as Project["rooms"]).map((r) => ({
        id: r.id, name: r.name, use: r.use, level: r.level, dien_tich_m2: areaM2(r.polygon),
      })),
      stairs: (slices.stairs as Project["stairs"]).map((st) => {
        const level = getLevel(p, st.level);
        return { id: st.id, riser_mm: level ? Math.round(stairLayout(st, level).riser * 10) / 10 : null };
      }),
      revision: p.meta.revision,
    };
  }
  return base;
}
