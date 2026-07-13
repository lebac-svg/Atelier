import { readFileSync } from "node:fs";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  areaM2, getLevel, stairLayout, validateProject,
  type Issue, type Op, type Project,
} from "@atelier/core";
import { renderPlanFiles } from "./render/render.js";
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

export function createAtelierServer(store: ProjectStore): McpServer {
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
      },
    },
    (args) => {
      try {
        const p = store.newProject(args.name, args.template, args.siteBoundary as never);
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
        "Áp một batch ops như MỘT transaction: tất cả cùng áp hoặc cùng hủy. baseRevision phải bằng revision hiện tại — nếu đã lâu không đọc model (hoặc người dùng có thể vừa sửa tay), LUÔN gọi get_changes_since trước; không bao giờ ghi đè thay đổi của người dùng. Không có op thay cả model. Lỗi mức block → transaction bị hủy, đọc message rồi tự sửa và gửi lại. warnings (error/warn/info) không chặn ghi nhưng phải xử lý trước checkpoint. ID do client tự đặt theo tiền tố: W tường, D cửa đi, S cửa sổ, R phòng, F nội thất, ST thang, SL sàn, L tầng.",
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
