import type { EntityKind, Project } from "./types.js";

/**
 * ID = tiền tố loại + chuỗi ngắn (W12, D3, R2, F15, ST1, L1) — dễ đọc cho
 * người và LLM. Client (Claude/browser) tự tạo ID; server từ chối nếu trùng.
 */
export const ID_PREFIX: Record<Exclude<EntityKind, "axis" | "style" | "finish">, string> = {
  level: "L",
  wall: "W",
  opening: "", // D cửa đi / S cửa sổ — xem idPrefixForOpening
  slab: "SL",
  roof: "RF", // R đã thuộc room
  stair: "ST",
  room: "R",
  furniture: "F",
  underlay: "U", // singleton — luôn là U1
};

export function idPrefixForOpening(kind: "door" | "window"): string {
  return kind === "door" ? "D" : "S";
}

/** Gom mọi ID đang dùng trong model (mọi loại chung một không gian tên). */
export function collectIds(p: Project): Set<string> {
  const ids = new Set<string>();
  for (const list of [p.levels, p.walls, p.openings, p.slabs, p.roofs ?? [], p.stairs, p.rooms, p.furniture]) {
    for (const e of list) ids.add(e.id);
  }
  for (const a of p.axes.x) ids.add(a.id);
  for (const a of p.axes.y) ids.add(a.id);
  for (const k of Object.keys(p.styles.openings)) ids.add(k);
  for (const k of Object.keys(p.finishes)) ids.add(k);
  if (p.underlay) ids.add(p.underlay.id);
  return ids;
}

/** Sinh ID trống kế tiếp theo tiền tố: nextId(model, "W") → "W9". */
export function nextId(p: Project, prefix: string): string {
  const ids = collectIds(p);
  let n = 1;
  while (ids.has(`${prefix}${n}`)) n++;
  return `${prefix}${n}`;
}
