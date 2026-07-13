import type { Point } from "../types.js";
import { cross, dot, sub } from "./vec.js";

/** Hai đoạn [a,b] và [c,d] có cắt nhau không (kể cả chạm đầu mút). */
export function segmentsIntersect(a: Point, b: Point, c: Point, d: Point): boolean {
  const d1 = cross(sub(b, a), sub(c, a));
  const d2 = cross(sub(b, a), sub(d, a));
  const d3 = cross(sub(d, c), sub(a, c));
  const d4 = cross(sub(d, c), sub(b, c));
  if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) {
    return true;
  }
  if (d1 === 0 && onSegment(a, b, c)) return true;
  if (d2 === 0 && onSegment(a, b, d)) return true;
  if (d3 === 0 && onSegment(c, d, a)) return true;
  if (d4 === 0 && onSegment(c, d, b)) return true;
  return false;
}

/** p thẳng hàng với [a,b] — có nằm trong đoạn không. */
function onSegment(a: Point, b: Point, p: Point): boolean {
  return (
    Math.min(a[0], b[0]) <= p[0] && p[0] <= Math.max(a[0], b[0]) &&
    Math.min(a[1], b[1]) <= p[1] && p[1] <= Math.max(a[1], b[1])
  );
}

/** Khoảng cách từ điểm tới đoạn thẳng. */
export function distPointToSegment(p: Point, a: Point, b: Point): number {
  const ab = sub(b, a);
  const ap = sub(p, a);
  const abLen2 = dot(ab, ab);
  if (abLen2 === 0) return Math.hypot(ap[0], ap[1]);
  const t = Math.max(0, Math.min(1, dot(ap, ab) / abLen2));
  const proj: Point = [a[0] + ab[0] * t, a[1] + ab[1] * t];
  return Math.hypot(p[0] - proj[0], p[1] - proj[1]);
}

/** Hình chiếu vô hướng của p lên trục (gốc a, hướng đơn vị u). */
export function projectOnto(p: Point, a: Point, u: Point): number {
  return dot(sub(p, a), u);
}
