import { getAsset } from "../catalog.js";
import { hasBlocking, type Issue } from "../issues.js";
import type { Axis, EntityKind, Project } from "../types.js";
import type { Op } from "./ops.js";
import { summarizeOps } from "./summary.js";

export type ApplyOptions = {
  /** Validator đầy đủ (rules GEO/STD/LBB) — tiêm từ ngoài để core ops không phụ thuộc bộ rule. */
  validate?: (p: Project) => Issue[];
  note?: string;
};

export type ApplyResult =
  | { ok: true; project: Project; revision: number; warnings: Issue[]; summary: string }
  | { ok: false; currentRevision: number; errors: Issue[] };

type ArrayKind = "level" | "wall" | "opening" | "slab" | "stair" | "room" | "furniture";

const ARRAY_KEY: Record<ArrayKind, "levels" | "walls" | "openings" | "slabs" | "stairs" | "rooms" | "furniture"> = {
  level: "levels",
  wall: "walls",
  opening: "openings",
  slab: "slabs",
  stair: "stairs",
  room: "rooms",
  furniture: "furniture",
};

const issue = (rule: string, severity: Issue["severity"], entities: string[], message: string): Issue =>
  ({ rule, severity, entities, message });

/**
 * Cổng mutation duy nhất: áp cả batch như MỘT transaction trên bản sao.
 * - baseRevision lệch → từ chối (stale).
 * - Lỗi cấu trúc (OPS-*) hoặc rule mức block → hủy cả batch.
 * - Thành công: revision + 1, trả warnings (error/warn/info không chặn ghi).
 * Không bao giờ mutate `project` đầu vào.
 */
export function applyOps(project: Project, baseRevision: number, ops: Op[], options: ApplyOptions = {}): ApplyResult {
  if (baseRevision !== project.meta.revision) {
    return {
      ok: false,
      currentRevision: project.meta.revision,
      errors: [issue("REV-01", "block", [],
        `baseRevision ${baseRevision} đã cũ — revision hiện tại là ${project.meta.revision}. Gọi get_changes_since(${baseRevision}) để xem thay đổi rồi gửi lại.`)],
    };
  }
  if (ops.length === 0) {
    return { ok: false, currentRevision: project.meta.revision, errors: [issue("OPS-00", "block", [], "Batch rỗng — không có op nào để áp.")] };
  }

  const draft = structuredClone(project);
  const errors: Issue[] = [];

  for (const op of ops) {
    const err = applyOne(draft, op);
    if (err) {
      errors.push(err);
      break; // transaction: lỗi đầu tiên là đủ để hủy
    }
  }

  if (errors.length === 0 && options.validate) {
    const all = options.validate(draft);
    if (hasBlocking(all)) {
      return { ok: false, currentRevision: project.meta.revision, errors: all.filter((i) => i.severity === "block") };
    }
    draft.meta.revision = baseRevision + 1;
    return { ok: true, project: draft, revision: draft.meta.revision, warnings: all, summary: summarizeOps(ops) };
  }

  if (errors.length > 0) {
    return { ok: false, currentRevision: project.meta.revision, errors };
  }

  draft.meta.revision = baseRevision + 1;
  return { ok: true, project: draft, revision: draft.meta.revision, warnings: [], summary: summarizeOps(ops) };
}

/** Áp một op lên draft (mutate draft). Trả Issue nếu lỗi cấu trúc. */
function applyOne(draft: Project, op: Op): Issue | null {
  switch (op.entity) {
    case "style":
      return applyRecord(draft, op, "style");
    case "finish":
      return applyRecord(draft, op, "finish");
    case "axis":
      return applyAxis(draft, op);
    default:
      return applyArray(draft, op);
  }
}

function allIds(draft: Project): Set<string> {
  const ids = new Set<string>();
  for (const key of Object.values(ARRAY_KEY)) for (const e of draft[key]) ids.add(e.id);
  for (const a of draft.axes.x) ids.add(a.id);
  for (const a of draft.axes.y) ids.add(a.id);
  for (const k of Object.keys(draft.styles.openings)) ids.add(k);
  for (const k of Object.keys(draft.finishes)) ids.add(k);
  return ids;
}

function applyArray(draft: Project, op: Op): Issue | null {
  const kind = op.entity as ArrayKind;
  const key = ARRAY_KEY[kind];
  if (!key) return issue("OPS-01", "block", [], `Loại thực thể không hợp lệ: ${String(op.entity)}.`);
  const list = draft[key] as Array<Record<string, unknown> & { id: string }>;

  if (op.op === "add") {
    const id = op.data.id;
    if (typeof id !== "string" || id.length === 0) {
      return issue("OPS-02", "block", [], `Op add ${kind} thiếu data.id (client phải tự tạo ID).`);
    }
    if (allIds(draft).has(id)) {
      return issue("OPS-02", "block", [id], `ID ${id} đã tồn tại — chọn ID khác (vd. dùng nextId).`);
    }
    const ref = checkRefs(draft, kind, op.data, id);
    if (ref) return ref;
    list.push(structuredClone(op.data) as (typeof list)[number]);
    return null;
  }

  const idx = list.findIndex((e) => e.id === op.id);
  if (idx < 0) return issue("OPS-03", "block", [op.id], `Không tìm thấy ${kind} ${op.id}.`);

  if (op.op === "update") {
    if ("id" in op.data && op.data.id !== op.id) {
      return issue("OPS-03", "block", [op.id], `Không được đổi id qua update (${op.id} → ${String(op.data.id)}).`);
    }
    const merged = { ...list[idx]!, ...structuredClone(op.data), id: op.id };
    const ref = checkRefs(draft, kind, merged, op.id);
    if (ref) return ref;
    list[idx] = merged;
    return null;
  }

  // delete
  if (kind === "level") {
    const used = [...draft.walls, ...draft.rooms, ...draft.slabs, ...draft.stairs, ...draft.furniture]
      .some((e) => (e as { level?: string }).level === op.id);
    if (used) return issue("OPS-04", "block", [op.id], `Level ${op.id} còn thực thể — xóa/di dời chúng trước.`);
  }
  if (kind === "wall") {
    // cascade: xóa openings neo trên tường (server lo — doc 05)
    draft.openings = draft.openings.filter((o) => o.wall !== op.id);
  }
  list.splice(idx, 1);
  return null;
}

/** Kiểm tham chiếu cấu trúc khi add/update. */
function checkRefs(draft: Project, kind: ArrayKind, data: Record<string, unknown>, id: string): Issue | null {
  const levelIds = new Set(draft.levels.map((l) => l.id));
  if (kind !== "level" && kind !== "opening") {
    const lv = data.level;
    if (typeof lv !== "string" || !levelIds.has(lv)) {
      return issue("OPS-05", "block", [id], `${kind} ${id} trỏ level không tồn tại: ${String(lv)}.`);
    }
  }
  if (kind === "opening") {
    const wallId = data.wall;
    if (typeof wallId !== "string" || !draft.walls.some((w) => w.id === wallId)) {
      return issue("OPS-06", "block", [id], `Opening ${id} neo vào tường không tồn tại: ${String(wallId)}.`);
    }
    const style = data.style;
    if (typeof style !== "string" || !(style in draft.styles.openings)) {
      return issue("OPS-06", "block", [id], `Opening ${id} dùng style không tồn tại: ${String(style)}.`);
    }
  }
  if (kind === "furniture") {
    const asset = data.asset;
    if (typeof asset !== "string" || !getAsset(asset)) {
      return issue("OPS-07", "block", [id], `Furniture ${id} dùng asset không có trong catalog: ${String(asset)}.`);
    }
  }
  return null;
}

function applyRecord(draft: Project, op: Op, kind: "style" | "finish"): Issue | null {
  const record: Record<string, object> = kind === "style" ? draft.styles.openings : draft.finishes;

  if (op.op === "add") {
    const { id, ...rest } = op.data;
    if (typeof id !== "string" || id.length === 0) return issue("OPS-02", "block", [], `Op add ${kind} thiếu data.id.`);
    if (allIds(draft).has(id)) return issue("OPS-02", "block", [id], `ID ${id} đã tồn tại.`);
    record[id] = structuredClone(rest);
    return null;
  }
  if (!(op.id in record)) return issue("OPS-03", "block", [op.id], `Không tìm thấy ${kind} ${op.id}.`);
  if (op.op === "update") {
    const { id: _ignored, ...rest } = op.data;
    record[op.id] = { ...record[op.id]!, ...structuredClone(rest) };
    return null;
  }
  // delete — chặn nếu còn nơi tham chiếu
  if (kind === "style" && draft.openings.some((o) => o.style === op.id)) {
    return issue("OPS-05", "block", [op.id], `Style ${op.id} đang được opening sử dụng.`);
  }
  if (kind === "finish" && draft.rooms.some((r) => Object.values(r.finish ?? {}).includes(op.id))) {
    return issue("OPS-05", "block", [op.id], `Finish ${op.id} đang được phòng sử dụng.`);
  }
  delete record[op.id];
  return null;
}

function applyAxis(draft: Project, op: Op): Issue | null {
  if (op.op === "add") {
    const { id, dir } = op.data as { id?: string; dir?: string };
    if (typeof id !== "string" || id.length === 0) return issue("OPS-02", "block", [], "Op add axis thiếu data.id.");
    if (dir !== "x" && dir !== "y") return issue("OPS-08", "block", [id], `Axis ${id} cần data.dir = "x" | "y".`);
    if (allIds(draft).has(id)) return issue("OPS-02", "block", [id], `ID ${id} đã tồn tại.`);
    draft.axes[dir].push(structuredClone(op.data) as unknown as Axis);
    return null;
  }
  for (const dir of ["x", "y"] as const) {
    const idx = draft.axes[dir].findIndex((a) => a.id === op.id);
    if (idx >= 0) {
      if (op.op === "update") {
        draft.axes[dir][idx] = { ...draft.axes[dir][idx]!, ...structuredClone(op.data), id: op.id };
      } else {
        draft.axes[dir].splice(idx, 1);
      }
      return null;
    }
  }
  return issue("OPS-03", "block", [op.id], `Không tìm thấy axis ${op.id}.`);
}
