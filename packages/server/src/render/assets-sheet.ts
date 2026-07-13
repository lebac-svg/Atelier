import type { Asset, Point } from "@atelier/core";
import { furnitureGlyphPrims, transformPrim } from "./plan-scene.js";
import { fontCss } from "./render.js";
import { W, type Prim, type Scene2D } from "./scene.js";
import { sceneToSvg } from "./svg-writer.js";
import { PAPER, planTransform } from "./transform.js";

/**
 * Contact sheet catalog (P5) — lưới thumbnail trên khổ A3, mỗi ô: ký hiệu 2D
 * nhìn từ trên (CÙNG nguồn glyph với mặt bằng) + tên + kích thước.
 * Nuôi assets_search: Claude nhìn một ảnh là biết hình dáng + cỡ cả loạt asset.
 */

const COLS = 8;
const ROWS = 5;
export const SHEET_CAPACITY = COLS * ROWS;

const CELL_W = (PAPER.w - 20) / COLS; // 50mm
const CELL_H = (PAPER.h - 26) / ROWS; // ~54mm

/** Scale prim local (mm model, y lên) → mm giấy (y XUỐNG) quanh gốc. */
function scalePrim(prim: Prim, k: number): Prim {
  const S = (pt: Point): Point => [pt[0] * k, -pt[1] * k];
  switch (prim.kind) {
    case "line":
      return { ...prim, a: S(prim.a), b: S(prim.b) };
    case "polyline":
    case "polygon":
      return { ...prim, pts: prim.pts.map(S) };
    case "circle":
      return { ...prim, c: S(prim.c), r: prim.r * k };
    case "ellipse":
      return { ...prim, c: S(prim.c), rx: prim.rx * k, ry: prim.ry * k, rot: -prim.rot };
    case "arc":
      return { ...prim, c: S(prim.c), r: prim.r * k, a0: -prim.a1, a1: -prim.a0 };
    case "text":
      return { ...prim, at: S(prim.at) };
    default:
      return prim;
  }
}

export function buildAssetsSheetSvg(assets: Asset[], title = "CATALOG NỘI THẤT — ATELIER"): string {
  const items: Scene2D = [];
  const push = (prim: Prim): void => {
    items.push({ layer: "KHUNG", prim, space: "paper" });
  };

  push({ kind: "text", at: [10, 8], text: title, size: 4, bold: true });
  push({ kind: "text", at: [PAPER.w - 10, 8], text: `${assets.length} asset — kích thước mm thật`, size: 2.4, anchor: "end" });

  assets.slice(0, SHEET_CAPACITY).forEach((a, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x0 = 10 + col * CELL_W;
    const y0 = 13 + row * CELL_H;
    push({ kind: "polyline", pts: [[x0, y0], [x0 + CELL_W, y0], [x0 + CELL_W, y0 + CELL_H], [x0, y0 + CELL_H]], close: true, weight: W.hair });

    // hình: footprint + glyph, khớp vào vùng trên của ô
    const k = Math.min((CELL_W - 14) / a.footprint.w, (CELL_H - 22) / a.footprint.d);
    const c: Point = [x0 + CELL_W / 2, y0 + 4 + (a.footprint.d * k) / 2 + Math.max(0, (CELL_H - 22 - a.footprint.d * k) / 2)];
    const hw = (a.footprint.w * k) / 2;
    const hd = (a.footprint.d * k) / 2;
    const hung = a.mountHeight != null;
    push({
      kind: "polyline",
      pts: [[c[0] - hw, c[1] - hd], [c[0] + hw, c[1] - hd], [c[0] + hw, c[1] + hd], [c[0] - hw, c[1] + hd]],
      close: true, weight: W.thin, ...(hung ? { dash: "1.4 0.8" } : {}),
    });
    for (const prim of furnitureGlyphPrims(a.category, a.footprint)) {
      push(transformPrim(scalePrim(prim, k), c, 0));
    }

    // chữ: tên (co nhỏ khi dài) + kích thước + id
    const size = a.label.length > 26 ? 1.7 : a.label.length > 18 ? 1.9 : 2.2;
    push({ kind: "text", at: [x0 + CELL_W / 2, y0 + CELL_H - 8.2], text: a.label, size, anchor: "middle", bold: true });
    push({
      kind: "text", at: [x0 + CELL_W / 2, y0 + CELL_H - 5.2],
      text: `${a.footprint.w}×${a.footprint.d} · cao ${a.footprint.h}${a.mountHeight != null ? ` · treo ${a.mountHeight}` : ""}`,
      size: 1.9, anchor: "middle",
    });
    push({ kind: "text", at: [x0 + CELL_W / 2, y0 + CELL_H - 2.4], text: a.id, size: 1.7, anchor: "middle" });
  });

  const tf = planTransform({ minX: 0, minY: 0, maxX: 1000, maxY: 1000 }, 100, { noRotate: true });
  return sceneToSvg(items, tf, { fontCss: fontCss() });
}
