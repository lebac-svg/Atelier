import type { Level, Point, Polygon, Roof } from "../types.js";
import { polygonBounds } from "./polygon.js";

/**
 * Hình học mái dốc (P7) — MỘT nguồn cho mọi renderer, cùng triết lý stair.ts:
 * mặt bằng (outline + nét gãy), mặt cắt (profile qua zAt), 3D (faces),
 * estimate (areaM2 thật theo độ dốc) đều dẫn xuất từ đây.
 *
 * Quy ước (types.ts Roof): outline = mép ngoài đã gồm đua; đáy diềm ở
 * z = level.elevation + level.height; pitch tính bằng ĐỘ.
 * Hip v1 dựng mặt trên BBOX outline — outline nên là chữ nhật (4 đỉnh).
 */

export type Vec3 = [number, number, number];

export type RoofGeometry = {
  baseZ: number;
  ridgeZ: number;
  /** Nét gãy chiếu bằng (nóc + hông) — mặt bằng mái vẽ outline + creases. */
  creases: Array<[Point, Point]>;
  /** Các mặt phẳng mái, polygon 3D — nuôi 3D mesh + mặt đứng (chiếu cạnh). */
  faces: Vec3[][];
  /** Cao độ mặt mái tại điểm bất kỳ (kẹp [baseZ, ridgeZ]) — nuôi mặt cắt. */
  zAt: (pt: Point) => number;
  /** Diện tích MẶT mái thật (m², đã theo độ dốc) — nuôi estimate. */
  areaM2: number;
};

const deg2rad = (d: number): number => (d * Math.PI) / 180;

export function roofGeometry(roof: Roof, level: Level): RoofGeometry {
  const baseZ = level.elevation + level.height;
  const tan = Math.tan(deg2rad(roof.pitch));
  const b = polygonBounds(roof.outline);
  const spanX = b.maxX - b.minX;
  const spanY = b.maxY - b.minY;
  const axis: "x" | "y" = roof.ridgeAxis ?? (spanX >= spanY ? "x" : "y");

  if (roof.kind === "shed") return shed(roof, baseZ, tan, axis, b);
  if (roof.kind === "hip") return hip(roof, baseZ, tan, axis, b);
  return gable(roof, baseZ, tan, axis, b);
}

type Bounds = ReturnType<typeof polygonBounds>;

/** Diện tích polygon 3D (Newell) — m². */
function faceAreaM2(face: Vec3[]): number {
  let nx = 0, ny = 0, nz = 0;
  for (let i = 0; i < face.length; i++) {
    const [ax, ay, az] = face[i]!;
    const [bx, by, bz] = face[(i + 1) % face.length]!;
    nx += (ay - by) * (az + bz);
    ny += (az - bz) * (ax + bx);
    nz += (ax - bx) * (ay + by);
  }
  return Math.hypot(nx, ny, nz) / 2 / 1e6;
}

const sumAreaM2 = (faces: Vec3[][]): number =>
  Math.round(faces.reduce((s, f) => s + faceAreaM2(f), 0) * 10) / 10;

const lift = (poly: Polygon, z: (pt: Point) => number): Vec3[] =>
  poly.map((pt) => [pt[0], pt[1], z(pt)] as Vec3);

/** Cắt polygon bằng nửa mặt phẳng keep(pt) ≥ 0 (Sutherland–Hodgman). */
function clipHalfPlane(poly: Polygon, side: (pt: Point) => number): Polygon {
  const out: Polygon = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]!;
    const c = poly[(i + 1) % poly.length]!;
    const da = side(a);
    const dc = side(c);
    if (da >= 0) out.push(a);
    if ((da >= 0) !== (dc >= 0)) {
      const t = da / (da - dc);
      out.push([a[0] + (c[0] - a[0]) * t, a[1] + (c[1] - a[1]) * t]);
    }
  }
  return out;
}

/** Các đoạn của đường thẳng (theo trục) nằm TRONG polygon — nóc có thể đứt đoạn (nhà chữ L). */
function insideSegments(poly: Polygon, axis: "x" | "y", value: number): Array<[Point, Point]> {
  // giao đường (axis="x": đường y=value chạy dọc x) với các cạnh polygon
  const ts: number[] = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]!;
    const c = poly[(i + 1) % poly.length]!;
    const [pa, pc] = axis === "x" ? [a[1], c[1]] : [a[0], c[0]];
    if ((pa <= value && pc > value) || (pc <= value && pa > value)) {
      const t = (value - pa) / (pc - pa);
      ts.push(axis === "x" ? a[0] + (c[0] - a[0]) * t : a[1] + (c[1] - a[1]) * t);
    }
  }
  ts.sort((u, v) => u - v);
  const out: Array<[Point, Point]> = [];
  for (let i = 0; i + 1 < ts.length; i += 2) {
    const p1: Point = axis === "x" ? [ts[i]!, value] : [value, ts[i]!];
    const p2: Point = axis === "x" ? [ts[i + 1]!, value] : [value, ts[i + 1]!];
    out.push([p1, p2]);
  }
  return out;
}

function gable(roof: Roof, baseZ: number, tan: number, axis: "x" | "y", b: Bounds): RoofGeometry {
  const mid = axis === "x" ? (b.minY + b.maxY) / 2 : (b.minX + b.maxX) / 2;
  const halfSpan = axis === "x" ? (b.maxY - b.minY) / 2 : (b.maxX - b.minX) / 2;
  const ridgeZ = baseZ + halfSpan * tan;
  const distToRidge = (pt: Point): number => Math.abs((axis === "x" ? pt[1] : pt[0]) - mid);
  const zAt = (pt: Point): number =>
    Math.min(ridgeZ, Math.max(baseZ, baseZ + (halfSpan - distToRidge(pt)) * tan));

  const sideA = clipHalfPlane(roof.outline, (pt) => (axis === "x" ? pt[1] : pt[0]) - mid);
  const sideB = clipHalfPlane(roof.outline, (pt) => mid - (axis === "x" ? pt[1] : pt[0]));
  const faces = [sideA, sideB].filter((s) => s.length >= 3).map((s) => lift(s, zAt));
  return { baseZ, ridgeZ, creases: insideSegments(roof.outline, axis, mid), faces, zAt, areaM2: sumAreaM2(faces) };
}

function shed(roof: Roof, baseZ: number, tan: number, axis: "x" | "y", b: Bounds): RoofGeometry {
  const [minP, maxP] = axis === "x" ? [b.minY, b.maxY] : [b.minX, b.maxX];
  const span = maxP - minP;
  const high = roof.highSide ?? "min";
  const ridgeZ = baseZ + span * tan;
  const zAt = (pt: Point): number => {
    const v = axis === "x" ? pt[1] : pt[0];
    const d = high === "min" ? maxP - v : v - minP; // khoảng cách từ mép THẤP
    return Math.min(ridgeZ, Math.max(baseZ, baseZ + d * tan));
  };
  const faces = [lift(roof.outline, zAt)];
  return { baseZ, ridgeZ, creases: [], faces, zAt, areaM2: sumAreaM2(faces) };
}

function hip(roof: Roof, baseZ: number, tan: number, axis: "x" | "y", b: Bounds): RoofGeometry {
  const halfShort = Math.min(b.maxX - b.minX, b.maxY - b.minY) / 2;
  const ridgeZ = baseZ + halfShort * tan;
  const zAt = (pt: Point): number => {
    const d = Math.min(pt[0] - b.minX, b.maxX - pt[0], pt[1] - b.minY, b.maxY - pt[1]);
    return Math.min(ridgeZ, Math.max(baseZ, baseZ + d * tan));
  };

  // v1: mặt dựng trên BBOX (outline nên là chữ nhật — ghi chú types.ts)
  const cy = (b.minY + b.maxY) / 2;
  const cx = (b.minX + b.maxX) / 2;
  const r1: Point = axis === "x" ? [b.minX + halfShort, cy] : [cx, b.minY + halfShort];
  const r2: Point = axis === "x" ? [b.maxX - halfShort, cy] : [cx, b.maxY - halfShort];
  const c1: Point = [b.minX, b.minY];
  const c2: Point = [b.maxX, b.minY];
  const c3: Point = [b.maxX, b.maxY];
  const c4: Point = [b.minX, b.maxY];
  const V = (pt: Point): Vec3 => [pt[0], pt[1], zAt(pt)];
  const faces: Vec3[][] =
    axis === "x"
      ? [
          [V(c1), V(c2), V(r2), V(r1)],
          [V(c3), V(c4), V(r1), V(r2)],
          [V(c2), V(c3), V(r2)],
          [V(c4), V(c1), V(r1)],
        ]
      : [
          [V(c2), V(c3), V(r2), V(r1)],
          [V(c4), V(c1), V(r1), V(r2)],
          [V(c1), V(c2), V(r1)],
          [V(c3), V(c4), V(r2)],
        ];
  const creases: Array<[Point, Point]> = [
    [c1, r1], [c4, r1], [c2, r2], [c3, r2],
    ...(Math.hypot(r2[0] - r1[0], r2[1] - r1[1]) > 1 ? [[r1, r2] as [Point, Point]] : []),
  ];
  return { baseZ, ridgeZ, creases, faces, zAt, areaM2: sumAreaM2(faces) };
}

/**
 * Profile mái dọc theo đoạn cắt a→b (mặt cắt/mặt đứng): các polyline (s, z),
 * s = mm dọc đoạn từ a. Điểm gãy chỉ nằm ở chỗ đoạn cắt giao outline/creases —
 * giữa hai điểm gãy z tuyến tính nên chỉ cần lấy mẫu tại các giao điểm.
 */
export function roofProfile(
  geom: RoofGeometry,
  roof: Roof,
  a: Point,
  b: Point,
): Array<Array<[number, number]>> {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L = Math.hypot(dx, dy);
  if (L === 0) return [];
  // breakpoint: giao với các cạnh outline + creases (tham số t theo đoạn a→b)
  const ts = new Set<number>([0, 1]);
  const addCross = (p1: Point, p2: Point): void => {
    const rx = p2[0] - p1[0];
    const ry = p2[1] - p1[1];
    const den = dx * ry - dy * rx;
    if (Math.abs(den) < 1e-9) return;
    const t = ((p1[0] - a[0]) * ry - (p1[1] - a[1]) * rx) / den;
    const u = ((p1[0] - a[0]) * dy - (p1[1] - a[1]) * dx) / den;
    if (t > 0 && t < 1 && u >= 0 && u <= 1) ts.add(t);
  };
  const o = roof.outline;
  for (let i = 0; i < o.length; i++) addCross(o[i]!, o[(i + 1) % o.length]!);
  for (const [p1, p2] of geom.creases) addCross(p1, p2);

  const sorted = [...ts].sort((u, v) => u - v);
  const at = (t: number): Point => [a[0] + dx * t, a[1] + dy * t];
  const inside = (t: number): boolean => pointInPoly(at(t), o);

  const polylines: Array<Array<[number, number]>> = [];
  let current: Array<[number, number]> | null = null;
  for (let i = 0; i + 1 < sorted.length; i++) {
    const t1 = sorted[i]!;
    const t2 = sorted[i + 1]!;
    if (!inside((t1 + t2) / 2)) {
      current = null;
      continue;
    }
    const s1: [number, number] = [t1 * L, geom.zAt(at(t1))];
    const s2: [number, number] = [t2 * L, geom.zAt(at(t2))];
    if (!current) {
      current = [s1, s2];
      polylines.push(current);
    } else {
      current.push(s2);
    }
  }
  return polylines;
}

// pointInPolygon bản cục bộ (tránh vòng import polygon→roof nếu sau này polygon cần roof)
function pointInPoly(p: Point, poly: Polygon): boolean {
  let ins = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]!;
    const [xj, yj] = poly[j]!;
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) ins = !ins;
  }
  return ins;
}
