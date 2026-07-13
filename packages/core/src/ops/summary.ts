import type { EntityKind, Project } from "../types.js";
import type { Op } from "./ops.js";

const LABEL: Record<EntityKind, string> = {
  level: "tầng",
  wall: "tường",
  opening: "cửa",
  slab: "sàn",
  stair: "thang",
  room: "phòng",
  furniture: "nội thất",
  axis: "trục",
  style: "kiểu cửa",
  finish: "vật liệu",
  underlay: "underlay đồ lại",
};

const LIST_KEY: Partial<Record<EntityKind, keyof Project>> = {
  level: "levels",
  wall: "walls",
  opening: "openings",
  slab: "slabs",
  stair: "stairs",
  room: "rooms",
  furniture: "furniture",
};

/** Giá trị gọn một dòng cho tóm tắt: số giữ nguyên, mảng/chuỗi nén lại. */
function short(v: unknown): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v) || (typeof v === "object" && v !== null)) return JSON.stringify(v);
  return String(v);
}

function findBefore(before: Project, entity: EntityKind, id: string): Record<string, unknown> | null {
  const key = LIST_KEY[entity];
  if (key) {
    const hit = (before[key] as Array<{ id: string }>).find((e) => e.id === id);
    return (hit as Record<string, unknown>) ?? null;
  }
  if (entity === "axis") {
    return [...before.axes.x, ...before.axes.y].find((a) => a.id === id) ?? null;
  }
  if (entity === "style") return (before.styles.openings[id] as Record<string, unknown>) ?? null;
  if (entity === "finish") return (before.finishes[id] as Record<string, unknown>) ?? null;
  if (entity === "underlay") return before.underlay?.id === id ? (before.underlay as Record<string, unknown>) : null;
  return null;
}

function opText(op: Op, before?: Project): string {
  const label = LABEL[op.entity] ?? op.entity;
  if (op.op === "add") {
    const id = String(op.data.id ?? "?");
    const extra = op.entity === "opening" && op.data.kind === "window" ? "cửa sổ" : label;
    return `thêm ${extra} ${id}`;
  }
  if (op.op === "update") {
    const fields = Object.keys(op.data).filter((k) => k !== "id");
    const prev = before ? findBefore(before, op.entity, op.id) : null;
    // có bản cũ → ghi old → new để người đọc journal (nhất là Claude qua get_changes_since)
    // thấy ngay chuyện gì xảy ra, khỏi lật lại model
    const detail = fields
      .map((k) => {
        const next = short((op.data as Record<string, unknown>)[k]);
        if (!prev || !(k in prev)) return `${k}: ${next}`;
        const old = short(prev[k]);
        return old === next ? `${k}: ${next} (không đổi)` : `${k}: ${old} → ${next}`;
      })
      .join(", ");
    return `sửa ${label} ${op.id} (${detail})`;
  }
  return `xóa ${label} ${op.id}`;
}

/**
 * Tóm tắt chữ một batch ops — nuôi get_changes_since + journal + toast.
 * Truyền `before` (model TRƯỚC khi áp) để update ghi được giá trị cũ → mới.
 */
export function summarizeOps(ops: Op[], before?: Project): string {
  return ops.map((op) => opText(op, before)).join("; ");
}
