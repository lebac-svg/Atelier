import type { Point } from "@atelier/core";

export type Bounds = { minX: number; minY: number; maxX: number; maxY: number };

export type PlanTransform = {
  scale: number; // 50 | 100
  rotated: boolean; // nhà dọc (sâu > ngang) → xoay bản vẽ, mặt tiền bên trái
  paperW: number;
  paperH: number;
  /** Gốc hình trên giấy + bounds model — nhúng vào SVG cho web editor đảo ngược paper↔model. */
  ox: number;
  oy: number;
  bounds: Bounds;
  toPaper: (p: Point) => Point;
  /** Biến đổi HƯỚNG (không tịnh tiến, không scale) — mũi tên bắc, góc chữ. */
  dirToPaper: (v: Point) => Point;
};

const A3 = { w: 420, h: 297 };
/** Lề trống quanh hình cho dim + bubble trục (mm giấy). */
const PAD = 30;
/** Vùng khả dụng trong khung viền. */
const AVAIL = { w: A3.w - 14, h: A3.h - 14 };

/**
 * Chọn tỷ lệ 1:50, không vừa hạ 1:100 (doc 08); nhà sâu hơn ngang thì
 * xoay bản vẽ cho mặt tiền nằm bên trái trang (thói quen bản vẽ nhà ống).
 * Cả hai nhánh transform đều là phép ĐẲNG CỰ trên giấy (kèm y-down của SVG)
 * nên góc và ký hiệu không méo.
 *
 * noRotate: mặt đứng/mặt cắt — trục đứng là TRỌNG LỰC, không bao giờ xoay ngang.
 */
export function planTransform(b: Bounds, preferScale?: number, opts: { noRotate?: boolean } = {}): PlanTransform {
  const w = b.maxX - b.minX;
  const h = b.maxY - b.minY;
  const rotated = !opts.noRotate && h > w;
  const effW = rotated ? h : w;
  const effH = rotated ? w : h;

  const fits = (s: number): boolean =>
    effW / s + 2 * PAD <= AVAIL.w && effH / s + 2 * PAD <= AVAIL.h;

  let scale = 50;
  if (preferScale && [50, 100, 200].includes(preferScale) && fits(preferScale)) {
    scale = preferScale;
  } else {
    for (const s of [50, 100, 200]) {
      scale = s;
      if (fits(s)) break;
    }
  }

  const paperW = effW / scale + 2 * PAD;
  const paperH = effH / scale + 2 * PAD;
  const ox = (A3.w - paperW) / 2 + PAD;
  const oy = (A3.h - paperH) / 2 + PAD;

  const toPaper = rotated
    ? (p: Point): Point => [ox + (p[1] - b.minY) / scale, oy + (p[0] - b.minX) / scale]
    : (p: Point): Point => [ox + (p[0] - b.minX) / scale, oy + (b.maxY - p[1]) / scale];

  const dirToPaper = rotated
    ? (v: Point): Point => [v[1], v[0]]
    : (v: Point): Point => [v[0], -v[1]];

  return { scale, rotated, paperW, paperH, ox, oy, bounds: b, toPaper, dirToPaper };
}

export const PAPER = A3;
