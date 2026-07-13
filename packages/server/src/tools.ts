import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  areaM2, getLevel, stairLayout, validateProject,
  type CaptureCamera, type Issue, type Op, type Project,
} from "@atelier/core";
import { DEFAULT_WEB_DIST, LiveServer, openInBrowser } from "./live.js";
import { renderElevationSvg, renderPlanFiles, renderSectionSvg } from "./render/render.js";
import { buildSheetSet, sheetDxf, sheetSvg } from "./render/sheets.js";
import { ProjectStore, TEMPLATES } from "./store.js";

const ENTITY = z.enum([
  "level", "wall", "opening", "slab", "stair", "room", "furniture", "axis", "style", "finish",
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
        const r = await renderPlanFiles(p, args.level, store.exportDir, {
          date: new Date().toLocaleDateString("vi-VN"),
          ...(args.scale ? { scale: args.scale } : {}),
          ...(args.layers ? { layers: args.layers } : {}),
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
        return text(
          `✅ Editor: ${url}${args.openBrowser !== false ? " (đã mở trình duyệt)" : ""} — browser đang nối: ${live.browserCount}.${distNote}`,
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
    "export",
    {
      title: "Xuất hồ sơ bản vẽ",
      description:
        "Xuất BỘ hồ sơ concept vào .atelier/exports/ho-so/: mặt bằng từng tầng + mặt đứng chính + mặt cắt A-A + bảng thống kê phòng/cửa, đánh số KT-01… format: 'pdf' = MỘT file A3 ngang nhiều trang (bàn giao); 'svg' = mỗi tờ một file; 'dxf' = mỗi tờ hình học một file mm thật (mở CAD đo được; tờ thống kê không có DXF). sheets để lọc: plan-<levelId> | elevation | section | schedule. LUÔN validate + tự soi render trước khi bàn giao (checkpoint 5). gltf/ifc chưa hỗ trợ (backlog).",
      inputSchema: {
        format: z.enum(["pdf", "svg", "dxf", "gltf", "ifc"]),
        sheets: z.array(z.string()).optional(),
      },
    },
    async (args) => {
      try {
        const p = store.current;
        if (args.format === "gltf" || args.format === "ifc") {
          return fail(new Error(`Định dạng ${args.format} chưa hỗ trợ — pdf/svg/dxf đã sẵn (gltf: P5, ifc: backlog P4+).`));
        }
        const set = buildSheetSet(p, {
          date: new Date().toLocaleDateString("vi-VN"),
          ...(args.sheets?.length ? { sheets: args.sheets } : {}),
        });
        if (set.sheets.length === 0) {
          const known = ["plan-<levelId>", "elevation", "section", "schedule"].join(" | ");
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

  return server;
}

function entityIdsOfLevel(p: Project, levelId: string): Set<string> {
  const ids = new Set<string>([levelId]);
  for (const list of [p.walls, p.rooms, p.slabs, p.stairs, p.furniture]) {
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
    stairs: p.stairs.filter((e) => keepId(e) && keepLevel(e)),
    rooms: p.rooms.filter((e) => keepId(e) && keepLevel(e)),
    furniture: p.furniture.filter((e) => keepId(e) && keepLevel(e)),
    styles: p.styles,
    finishes: p.finishes,
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
