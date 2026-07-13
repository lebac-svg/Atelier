import type { Furniture, Point, Polygon } from "../types.js";
import type { Asset } from "../catalog.js";
import { add, rotate } from "./vec.js";

/**
 * Hộp bao có hướng (OBB) — nội thất, footprint thang…
 * rotation độ CCW; tại rotation 0: w dọc +x, d dọc +y,
 * "lưng" asset ở cạnh local y = -d/2, "mặt trước" ở +d/2.
 */
export type Obb = {
  center: Point;
  halfW: number;
  halfD: number;
  rotation: number;
};

export function furnitureObb(f: Furniture, asset: Asset): Obb {
  return {
    center: f.at,
    halfW: asset.footprint.w / 2,
    halfD: asset.footprint.d / 2,
    rotation: f.rotation,
  };
}

export function obbCorners(o: Obb): Polygon {
  const local: Point[] = [
    [-o.halfW, -o.halfD],
    [o.halfW, -o.halfD],
    [o.halfW, o.halfD],
    [-o.halfW, o.halfD],
  ];
  return local.map((p) => add(o.center, rotate(p, o.rotation)));
}

/** Điểm giữa mặt trước OBB, đẩy ra ngoài thêm `gap`. */
export function obbFrontPoint(o: Obb, gap = 0): Point {
  return add(o.center, rotate([0, o.halfD + gap], o.rotation));
}

/** Trục đơn vị (2 trục local) của OBB. */
function obbAxes(o: Obb): [Point, Point] {
  return [rotate([1, 0], o.rotation), rotate([0, 1], o.rotation)];
}

/**
 * Độ "lấn nhau" giữa hai đa giác LỒI theo SAT: trả độ chồng nhỏ nhất
 * trên mọi trục tách (mm). ≤ 0 nghĩa là không chạm.
 */
export function convexOverlapDepth(a: Polygon, b: Polygon): number {
  let minOverlap = Infinity;
  for (const poly of [a, b]) {
    const n = poly.length;
    for (let i = 0; i < n; i++) {
      const p1 = poly[i]!;
      const p2 = poly[(i + 1) % n]!;
      const edge: Point = [p2[0] - p1[0], p2[1] - p1[1]];
      const axisLen = Math.hypot(edge[0], edge[1]);
      if (axisLen === 0) continue;
      const axis: Point = [-edge[1] / axisLen, edge[0] / axisLen];
      let minA = Infinity, maxA = -Infinity, minB = Infinity, maxB = -Infinity;
      for (const p of a) {
        const s = p[0] * axis[0] + p[1] * axis[1];
        if (s < minA) minA = s;
        if (s > maxA) maxA = s;
      }
      for (const p of b) {
        const s = p[0] * axis[0] + p[1] * axis[1];
        if (s < minB) minB = s;
        if (s > maxB) maxB = s;
      }
      const overlap = Math.min(maxA, maxB) - Math.max(minA, minB);
      if (overlap <= 0) return overlap; // trục tách — không chạm
      if (overlap < minOverlap) minOverlap = overlap;
    }
  }
  return minOverlap;
}

/** Độ lấn giữa hai OBB (mm); ≤0 = không chạm. */
export function obbOverlapDepth(a: Obb, b: Obb): number {
  return convexOverlapDepth(obbCorners(a), obbCorners(b));
}
