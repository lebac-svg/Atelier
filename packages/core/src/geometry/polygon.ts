import type { Point, Polygon } from "../types.js";
import { segmentsIntersect } from "./segment.js";
import { normalize, perp, sub } from "./vec.js";

/** Diện tích có dấu (shoelace) — dương nếu CCW. Đơn vị mm². */
export function signedArea(poly: Polygon): number {
  let s = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]!;
    const b = poly[(i + 1) % poly.length]!;
    s += a[0] * b[1] - b[0] * a[1];
  }
  return s / 2;
}

export const area = (poly: Polygon): number => Math.abs(signedArea(poly));

/** Diện tích m² (từ mm²), làm tròn 1 chữ số thập phân để hiển thị. */
export const areaM2 = (poly: Polygon): number => Math.round(area(poly) / 1e5) / 10;

/**
 * Polygon "lành mạnh": ≥3 đỉnh, không có đỉnh trùng liên tiếp, không tự cắt.
 * (GEO-05 dùng hàm này; polygon khai báo KHÔNG lặp lại đỉnh đầu ở cuối.)
 */
export function isSimplePolygon(poly: Polygon): boolean {
  const n = poly.length;
  if (n < 3) return false;
  if (Math.abs(signedArea(poly)) < 1) return false; // suy biến (thẳng hàng)
  for (let i = 0; i < n; i++) {
    const a1 = poly[i]!;
    const a2 = poly[(i + 1) % n]!;
    if (a1[0] === a2[0] && a1[1] === a2[1]) return false; // đỉnh trùng liên tiếp
    for (let j = i + 1; j < n; j++) {
      // bỏ qua cạnh kề nhau (chung đỉnh)
      if (j === i || (j + 1) % n === i || (i + 1) % n === j) continue;
      const b1 = poly[j]!;
      const b2 = poly[(j + 1) % n]!;
      if (segmentsIntersect(a1, a2, b1, b2)) return false;
    }
  }
  return true;
}

/** Ray casting — điểm nằm trên biên tính là TRONG. */
export function pointInPolygon(p: Point, poly: Polygon): boolean {
  const n = poly.length;
  let inside = false;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const [xi, yi] = poly[i]!;
    const [xj, yj] = poly[j]!;
    // trên biên?
    const minx = Math.min(xi, xj), maxx = Math.max(xi, xj);
    const miny = Math.min(yi, yj), maxy = Math.max(yi, yj);
    const crossV = (xj - xi) * (p[1] - yi) - (yj - yi) * (p[0] - xi);
    if (Math.abs(crossV) < 1e-6 && p[0] >= minx - 1e-6 && p[0] <= maxx + 1e-6 && p[1] >= miny - 1e-6 && p[1] <= maxy + 1e-6) {
      return true;
    }
    if (yi > p[1] !== yj > p[1]) {
      const x = ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi;
      if (p[0] < x) inside = !inside;
    }
  }
  return inside;
}

export function polygonBounds(poly: Polygon): { minX: number; minY: number; maxX: number; maxY: number } {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of poly) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY };
}

/** Polygon nằm trọn trong polygon khác (mọi đỉnh trong + không cạnh nào cắt nhau). */
export function polygonInsidePolygon(inner: Polygon, outer: Polygon): boolean {
  for (const p of inner) if (!pointInPolygon(p, outer)) return false;
  const n = inner.length, m = outer.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const a1 = inner[i]!, a2 = inner[(i + 1) % n]!;
      const b1 = outer[j]!, b2 = outer[(j + 1) % m]!;
      // chạm biên cho phép (mép trong = biên): chỉ coi là cắt khi cắt THỰC SỰ xuyên qua
      if (segmentsIntersectStrict(a1, a2, b1, b2)) return false;
    }
  }
  return true;
}

/** Cắt xuyên thực sự (không tính chạm đầu mút / thẳng hàng chồng cạnh). */
function segmentsIntersectStrict(a: Point, b: Point, c: Point, d: Point): boolean {
  const d1 = crossOf(c, d, a);
  const d2 = crossOf(c, d, b);
  const d3 = crossOf(a, b, c);
  const d4 = crossOf(a, b, d);
  return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
}

function crossOf(a: Point, b: Point, p: Point): number {
  return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
}

/**
 * Bề rộng nhỏ nhất của polygon theo OBB quay theo cạnh (rotating edges).
 * Đúng cho phòng chữ nhật/lồi; hình chữ L trả về bề rộng bao — chấp nhận v1
 * (ghi chú trong rule STD-02/04), v2 thay bằng trục trung tuyến.
 */
export function minPolygonWidth(poly: Polygon): number {
  let best = Infinity;
  const n = poly.length;
  for (let i = 0; i < n; i++) {
    const a = poly[i]!;
    const b = poly[(i + 1) % n]!;
    const u = normalize(sub(b, a));
    if (u[0] === 0 && u[1] === 0) continue;
    const v = perp(u);
    let min1 = Infinity, max1 = -Infinity, min2 = Infinity, max2 = -Infinity;
    for (const p of poly) {
      const s1 = p[0] * u[0] + p[1] * u[1];
      const s2 = p[0] * v[0] + p[1] * v[1];
      if (s1 < min1) min1 = s1;
      if (s1 > max1) max1 = s1;
      if (s2 < min2) min2 = s2;
      if (s2 > max2) max2 = s2;
    }
    best = Math.min(best, Math.min(max1 - min1, max2 - min2));
  }
  return best;
}
