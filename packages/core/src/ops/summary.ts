import type { EntityKind } from "../types.js";
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
};

function opText(op: Op): string {
  const label = LABEL[op.entity] ?? op.entity;
  if (op.op === "add") {
    const id = String(op.data.id ?? "?");
    const extra = op.entity === "opening" && op.data.kind === "window" ? "cửa sổ" : label;
    return `thêm ${extra} ${id}`;
  }
  if (op.op === "update") {
    const fields = Object.keys(op.data).filter((k) => k !== "id");
    return `sửa ${label} ${op.id} (${fields.join(", ")})`;
  }
  return `xóa ${label} ${op.id}`;
}

/** Tóm tắt chữ một batch ops — nuôi get_changes_since + journal. */
export function summarizeOps(ops: Op[]): string {
  return ops.map(opText).join("; ");
}
