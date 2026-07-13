import type { Point } from "@atelier/core";

/**
 * Đảo ngược phép chiếu model → giấy của renderer (server nhúng thông số vào
 * data-tf-* trên <svg>, xem transform.ts + svg-writer.ts). Mọi hàm ở đây thuần —
 * phần chạm DOM chỉ là đọc attribute + getScreenCTM.
 */
export type PlanTf = {
  scale: number;
  rotated: boolean;
  ox: number;
  oy: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export function readPlanTf(svg: SVGSVGElement): PlanTf | null {
  const num = (name: string): number | null => {
    const v = svg.getAttribute(name);
    if (v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  const scale = num("data-tf-scale");
  const ox = num("data-tf-ox");
  const oy = num("data-tf-oy");
  const minX = num("data-tf-min-x");
  const minY = num("data-tf-min-y");
  const maxX = num("data-tf-max-x");
  const maxY = num("data-tf-max-y");
  if (scale == null || ox == null || oy == null || minX == null || minY == null || maxX == null || maxY == null) return null;
  return { scale, rotated: svg.getAttribute("data-tf-rotated") === "1", ox, oy, minX, minY, maxX, maxY };
}

/** Giấy (mm giấy, hệ viewBox) → model (mm). */
export function paperToModel(tf: PlanTf, [px, py]: Point): Point {
  if (tf.rotated) return [tf.minX + (py - tf.oy) * tf.scale, tf.minY + (px - tf.ox) * tf.scale];
  return [tf.minX + (px - tf.ox) * tf.scale, tf.maxY - (py - tf.oy) * tf.scale];
}

/** Model (mm) → giấy — nghịch đảo của paperToModel, khớp toPaper của renderer. */
export function modelToPaper(tf: PlanTf, [x, y]: Point): Point {
  if (tf.rotated) return [tf.ox + (y - tf.minY) / tf.scale, tf.oy + (x - tf.minX) / tf.scale];
  return [tf.ox + (x - tf.minX) / tf.scale, tf.oy + (tf.maxY - y) / tf.scale];
}

/** Vector dịch chuyển model → dịch chuyển trên giấy (cho preview translate). */
export function modelDeltaToPaper(tf: PlanTf, [dx, dy]: Point): Point {
  if (tf.rotated) return [dy / tf.scale, dx / tf.scale];
  return [dx / tf.scale, -dy / tf.scale];
}

/** Tọa độ client (px màn hình) → giấy, qua CTM hiện tại của svg (đã gồm pan/zoom CSS). */
export function clientToPaper(svg: SVGSVGElement, clientX: number, clientY: number): Point | null {
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const pt = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
  return [pt.x, pt.y];
}

/** Bao nhiêu mm model ứng với 1 px màn hình — quy đổi ngưỡng snap theo zoom. */
export function modelPerPixel(svg: SVGSVGElement, tf: PlanTf): number {
  const ctm = svg.getScreenCTM();
  const pxPerPaper = ctm ? Math.hypot(ctm.a, ctm.b) : 1; // đẳng cự nên 1 trục là đủ
  return tf.scale / (pxPerPaper || 1);
}
