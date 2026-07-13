import type { Opening } from "@atelier/core";

/**
 * Tách tường thành mảnh hộp quanh openings — thay CSG ở P2 (doc 10:
 * "fallback: tách tường thành mảnh quanh opening (không CSG)").
 *
 * Hệ LOCAL tường: u dọc tim từ `from` (mm), z cao độ từ mặt sàn tầng.
 * Bề dày (v) do phía dựng mesh lo — mọi mảnh ăn trọn bề dày.
 */

export type WallPiece = {
  u0: number;
  u1: number;
  z0: number;
  z1: number;
  /** thân tường / mảng dưới bậu cửa sổ / lanh tô trên ô chờ */
  part: "than" | "bau" | "lanh-to";
};

type Hole = Pick<Opening, "offset" | "width" | "height" | "sill">;

export function wallPieces(length: number, wallHeight: number, openings: Hole[]): WallPiece[] {
  const pieces: WallPiece[] = [];
  const holes = openings
    .map((o) => ({
      u0: Math.max(0, o.offset),
      u1: Math.min(length, o.offset + o.width),
      sill: Math.max(0, o.sill),
      top: Math.min(wallHeight, Math.max(0, o.sill) + o.height),
    }))
    .filter((h) => h.u1 > h.u0 && h.top > h.sill)
    .sort((a, b) => a.u0 - b.u0);

  let cursor = 0;
  for (const h of holes) {
    const u0 = Math.max(cursor, h.u0);
    if (u0 >= h.u1) continue; // opening chồng lấn — validator đã chặn, đây chỉ là lưới an toàn
    if (u0 > cursor) pieces.push({ u0: cursor, u1: u0, z0: 0, z1: wallHeight, part: "than" });
    if (h.sill > 0) pieces.push({ u0, u1: h.u1, z0: 0, z1: h.sill, part: "bau" });
    if (h.top < wallHeight) pieces.push({ u0, u1: h.u1, z0: h.top, z1: wallHeight, part: "lanh-to" });
    cursor = h.u1;
  }
  if (cursor < length) pieces.push({ u0: cursor, u1: length, z0: 0, z1: wallHeight, part: "than" });
  return pieces;
}
