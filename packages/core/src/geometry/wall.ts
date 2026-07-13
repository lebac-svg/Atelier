import type { Opening, Point, Polygon, Wall } from "../types.js";
import { add, dist, normalize, perp, scale, sub } from "./vec.js";

export const wallLength = (w: Wall): number => dist(w.from, w.to);

/** Vector đơn vị dọc tường (from → to). */
export const wallDir = (w: Wall): Point => normalize(sub(w.to, w.from));

/** Pháp tuyến trái của tường (bên trái khi đi from→to). */
export const wallNormal = (w: Wall): Point => perp(wallDir(w));

/** Điểm trên tim tường tại khoảng cách s từ `from` (mm). */
export function pointOnWall(w: Wall, s: number): Point {
  return add(w.from, scale(wallDir(w), s));
}

/** Dải tường: polygon 4 đỉnh từ tim ± thickness/2, đầu mút vuông. */
export function wallBand(w: Wall): Polygon {
  const n = scale(wallNormal(w), w.thickness / 2);
  return [add(w.from, n), add(w.to, n), sub(w.to, n), sub(w.from, n)];
}

/** Đoạn [start,end] của opening dọc tường (từ from). */
export function openingSpan(o: Opening): [number, number] {
  return [o.offset, o.offset + o.width];
}

/** Polygon ô chờ của opening trong dải tường (thế giới). */
export function openingRect(w: Wall, o: Opening): Polygon {
  const n = scale(wallNormal(w), w.thickness / 2);
  const a = pointOnWall(w, o.offset);
  const b = pointOnWall(w, o.offset + o.width);
  return [add(a, n), add(b, n), sub(b, n), sub(a, n)];
}

/** Trung điểm ô chờ trên tim tường. */
export function openingMid(w: Wall, o: Opening): Point {
  return pointOnWall(w, o.offset + o.width / 2);
}

/**
 * Hai điểm mẫu hai bên opening, cách mặt tường `gap` mm —
 * dùng hỏi "cửa này thông phòng nào với phòng nào".
 * Trả [bên trái tường (pháp tuyến +), bên phải].
 */
export function openingSidePoints(w: Wall, o: Opening, gap = 150): [Point, Point] {
  const mid = openingMid(w, o);
  const n = scale(wallNormal(w), w.thickness / 2 + gap);
  return [add(mid, n), sub(mid, n)];
}

/** Hai tường có song song không (sai số góc nhỏ). */
export function wallsParallel(a: Wall, b: Wall, epsDeg = 0.5): boolean {
  const da = wallDir(a);
  const db = wallDir(b);
  const crossAbs = Math.abs(da[0] * db[1] - da[1] * db[0]);
  return crossAbs < Math.sin((epsDeg * Math.PI) / 180);
}
