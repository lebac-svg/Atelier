import type { Level, Point, Project, Roof, Room, Slab, Wall } from "./types.js";
import { pointInPolygon } from "./geometry/polygon.js";

/**
 * Cao độ mặt đất khi CHƯA khai terrain: đúng z=0 như renderer vẽ từ trước —
 * giữ golden snapshot bất động. Muốn nền cao hơn đất (thềm) thì khai terrain.
 */
export const GROUND_DEFAULT = 0;

export function getLevel(p: Project, id: string): Level | undefined {
  return p.levels.find((l) => l.id === id);
}

export function getWall(p: Project, id: string): Wall | undefined {
  return p.walls.find((w) => w.id === id);
}

export function wallsOfLevel(p: Project, levelId: string): Wall[] {
  return p.walls.filter((w) => w.level === levelId);
}

export function roomsOfLevel(p: Project, levelId: string): Room[] {
  return p.rooms.filter((r) => r.level === levelId);
}

/** Các level xếp theo cao độ tăng dần. */
export function levelsSorted(p: Project): Level[] {
  return [...p.levels].sort((a, b) => a.elevation - b.elevation);
}

/** Level ngay trên level đã cho (theo cao độ), nếu có. */
export function levelAbove(p: Project, levelId: string): Level | undefined {
  const sorted = levelsSorted(p);
  const i = sorted.findIndex((l) => l.id === levelId);
  return i >= 0 ? sorted[i + 1] : undefined;
}

/** Sàn (kind floor) của một level. */
export function floorSlabOf(p: Project, levelId: string): Slab | undefined {
  return p.slabs.find((s) => s.level === levelId && s.kind === "floor");
}

/** Mái dốc của model — file cũ thiếu mảng roofs thì trả []. */
export function roofsOf(p: Project): Roof[] {
  return p.roofs ?? [];
}

export function roofsOfLevel(p: Project, levelId: string): Roof[] {
  return roofsOf(p).filter((r) => r.level === levelId);
}

/**
 * Cao độ MẶT ĐẤT tại một điểm (mm so với cốt ±0.000).
 * - Có terrain: nội suy IDW (mũ 2) từ cao độ các đỉnh boundary — mượt, không
 *   cần tam giác hóa, đủ cho render mặt cắt/3D concept.
 * - Không terrain: mặt phẳng GROUND_DEFAULT.
 */
export function groundAt(p: Project, pt: Point): number {
  const elevations = p.site.terrain?.elevations;
  if (!elevations || elevations.length === 0) return GROUND_DEFAULT;
  const b = p.site.boundary;
  let num = 0;
  let den = 0;
  for (let i = 0; i < b.length; i++) {
    const z = elevations[i] ?? elevations[elevations.length - 1]!;
    const d2 = (pt[0] - b[i]![0]) ** 2 + (pt[1] - b[i]![1]) ** 2;
    if (d2 < 1) return z; // trùng đỉnh
    const w = 1 / d2;
    num += w * z;
    den += w;
  }
  return num / den;
}

/**
 * Cao thông thủy của level = height − dày sàn của level TRÊN
 * (không có level trên → trừ mặc định 120 nếu có mái, v1 lấy nguyên height).
 */
export function clearHeight(p: Project, levelId: string): number {
  const level = getLevel(p, levelId);
  if (!level) return 0;
  const above = levelAbove(p, levelId);
  if (!above) return level.height;
  const slab = floorSlabOf(p, above.id);
  return level.height - (slab?.thickness ?? 120);
}

/** Các phòng của level chứa điểm p. */
export function roomsAtPoint(p: Project, levelId: string, pt: Point): Room[] {
  return roomsOfLevel(p, levelId).filter((r) => pointInPolygon(pt, r.polygon));
}

/** Hai phòng có cạnh chung/chạm nhau không (xấp xỉ: đỉnh cách cạnh < tol). */
export function roomsAdjacent(a: Room, b: Room, tol = 250): boolean {
  // đủ tốt cho v1: có cặp cạnh song song đối diện cách nhau < tol và chồng đoạn
  const ap = a.polygon, bp = b.polygon;
  for (let i = 0; i < ap.length; i++) {
    const a1 = ap[i]!, a2 = ap[(i + 1) % ap.length]!;
    for (let j = 0; j < bp.length; j++) {
      const b1 = bp[j]!, b2 = bp[(j + 1) % bp.length]!;
      if (edgesNearAndOverlap(a1, a2, b1, b2, tol)) return true;
    }
  }
  return false;
}

function edgesNearAndOverlap(a1: Point, a2: Point, b1: Point, b2: Point, tol: number): boolean {
  const dax = a2[0] - a1[0], day = a2[1] - a1[1];
  const la = Math.hypot(dax, day);
  if (la === 0) return false;
  const ux = dax / la, uy = day / la;
  // b phải gần song song với a
  const dbx = b2[0] - b1[0], dby = b2[1] - b1[1];
  const lb = Math.hypot(dbx, dby);
  if (lb === 0) return false;
  const crossAbs = Math.abs(ux * (dby / lb) - uy * (dbx / lb));
  if (crossAbs > 0.02) return false;
  // khoảng cách vuông góc giữa hai đường
  const nx = -uy, ny = ux;
  const d1 = Math.abs((b1[0] - a1[0]) * nx + (b1[1] - a1[1]) * ny);
  if (d1 > tol) return false;
  // chồng đoạn theo phương dọc
  const s = (p: Point) => (p[0] - a1[0]) * ux + (p[1] - a1[1]) * uy;
  const aMin = Math.min(0, la), aMax = Math.max(0, la);
  const sb1 = s(b1), sb2 = s(b2);
  const bMin = Math.min(sb1, sb2), bMax = Math.max(sb1, sb2);
  return Math.min(aMax, bMax) - Math.max(aMin, bMin) > 100; // chồng ≥100mm mới tính
}
