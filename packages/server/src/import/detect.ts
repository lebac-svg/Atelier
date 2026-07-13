import type { Point, Polygon } from "@atelier/core";

/**
 * Heuristic dò TƯỜNG từ nét DXF (đã đặt về mm model): hai đoạn SONG SONG
 * trục, cách nhau bằng một bề dày tường hợp lý, chồng lấp đủ dài → một
 * ứng viên tường ở đường tim. CHỈ ĐỀ XUẤT — Claude/người dùng duyệt rồi
 * mới apply_ops (nguyên tắc "người dùng luôn thắng" áp cả cho import).
 * v1: chỉ đoạn thẳng trục x/y (nhà ống); nét xiên bỏ qua.
 */

export type WallCandidate = {
  from: Point;
  to: Point;
  thickness: number;
  /** Độ dài phần chồng lấp (mm) — để xếp hạng độ tin. */
  overlap: number;
};

export type DetectOptions = {
  /** Bề dày tường chấp nhận [min, max] mm. Mặc định [80, 400]. */
  thickness?: [number, number];
  /** Chồng lấp tối thiểu (mm) để tin là tường. Mặc định 600. */
  minOverlap?: number;
  /** Sai số cho phép khi coi một đoạn là thẳng trục (mm). Mặc định 15. */
  axisTol?: number;
};

type Seg = { fixed: number; lo: number; hi: number }; // đoạn thẳng trục: tọa độ cố định + khoảng chạy

/** Tách polyline thành đoạn thẳng trục x/y. */
function axisSegments(polylines: Polygon[], tol: number): { h: Seg[]; v: Seg[] } {
  const h: Seg[] = [];
  const v: Seg[] = [];
  for (const pl of polylines) {
    for (let i = 0; i + 1 < pl.length; i++) {
      const [x1, y1] = pl[i]!;
      const [x2, y2] = pl[i + 1]!;
      if (Math.abs(y1 - y2) <= tol && Math.abs(x1 - x2) > tol) {
        h.push({ fixed: (y1 + y2) / 2, lo: Math.min(x1, x2), hi: Math.max(x1, x2) });
      } else if (Math.abs(x1 - x2) <= tol && Math.abs(y1 - y2) > tol) {
        v.push({ fixed: (x1 + x2) / 2, lo: Math.min(y1, y2), hi: Math.max(y1, y2) });
      }
    }
  }
  return { h, v };
}

/** Gộp đoạn cùng hàng (fixed xấp xỉ, khoảng chạm/chồng nhau) — nét tường hay bị cắt vụn ở giao. */
function mergeCollinear(segs: Seg[], tol: number): Seg[] {
  const sorted = [...segs].sort((a, b) => a.fixed - b.fixed || a.lo - b.lo);
  const out: Seg[] = [];
  for (const s of sorted) {
    const prev = out[out.length - 1];
    if (prev && Math.abs(prev.fixed - s.fixed) <= tol && s.lo <= prev.hi + tol) {
      prev.hi = Math.max(prev.hi, s.hi);
      prev.fixed = (prev.fixed + s.fixed) / 2;
    } else {
      out.push({ ...s });
    }
  }
  return out;
}

function pairUp(segs: Seg[], o: Required<DetectOptions>): Array<{ fixed: number; lo: number; hi: number; thickness: number; overlap: number }> {
  const out: Array<{ fixed: number; lo: number; hi: number; thickness: number; overlap: number }> = [];
  const used = new Set<number>();
  for (let i = 0; i < segs.length; i++) {
    if (used.has(i)) continue;
    // bạn ghép tốt nhất: gap hợp lệ + chồng lấp dài nhất
    let best = -1;
    let bestOverlap = 0;
    for (let j = i + 1; j < segs.length; j++) {
      if (used.has(j)) continue;
      const gap = Math.abs(segs[j]!.fixed - segs[i]!.fixed);
      if (gap < o.thickness[0] || gap > o.thickness[1]) continue;
      const overlap = Math.min(segs[i]!.hi, segs[j]!.hi) - Math.max(segs[i]!.lo, segs[j]!.lo);
      if (overlap < o.minOverlap) continue;
      if (overlap > bestOverlap) {
        best = j;
        bestOverlap = overlap;
      }
    }
    if (best < 0) continue;
    used.add(i);
    used.add(best);
    const a = segs[i]!;
    const b = segs[best]!;
    out.push({
      fixed: (a.fixed + b.fixed) / 2,
      lo: Math.max(a.lo, b.lo),
      hi: Math.min(a.hi, b.hi),
      thickness: Math.round(Math.abs(b.fixed - a.fixed) / 10) * 10,
      overlap: bestOverlap,
    });
  }
  return out;
}

export function detectWalls(polylines: Polygon[], opts: DetectOptions = {}): WallCandidate[] {
  const o: Required<DetectOptions> = {
    thickness: opts.thickness ?? [80, 400],
    minOverlap: opts.minOverlap ?? 600,
    axisTol: opts.axisTol ?? 15,
  };
  const { h, v } = axisSegments(polylines, o.axisTol);
  const round = (n: number): number => Math.round(n);
  const out: WallCandidate[] = [];
  for (const c of pairUp(mergeCollinear(h, o.axisTol), o)) {
    out.push({ from: [round(c.lo), round(c.fixed)], to: [round(c.hi), round(c.fixed)], thickness: c.thickness, overlap: c.overlap });
  }
  for (const c of pairUp(mergeCollinear(v, o.axisTol), o)) {
    out.push({ from: [round(c.fixed), round(c.lo)], to: [round(c.fixed), round(c.hi)], thickness: c.thickness, overlap: c.overlap });
  }
  return out.sort((a, b) => b.overlap - a.overlap);
}
