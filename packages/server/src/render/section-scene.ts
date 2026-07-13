import {
  pointOnWall, stairLayout, wallLength,
  type Level, type Point, type Polygon, type Project, type Wall,
} from "@atelier/core";
import { drawLevelMark, drawVerticalDims } from "./elevation-scene.js";
import { drawSheetFrame } from "./frame.js";
import { W, type LayerName, type Prim, type Scene2D } from "./scene.js";
import { planTransform, type Bounds, type PlanTransform } from "./transform.js";
import { sectionCutX } from "./plan-scene.js";

/**
 * Mặt cắt A-A qua thang (P4, doc 08). Mặt phẳng cắt dọc nhà x = cutX
 * (xuyên tâm vế 1 — khớp vết A-A trên mặt bằng), HƯỚNG NHÌN −x để mặt tiền
 * nằm bên trái tờ như mặt bằng đã xoay. Hệ tọa độ tờ: u = y model, z = cao độ.
 */

export type SectionBuild = {
  items: Scene2D;
  tf: PlanTransform;
  meta: { title: string; scaleLabel: string };
};

export type SectionOptions = { date?: string; designer?: string; scale?: number; sheetNo?: string };

type Push = (layer: LayerName, prim: Prim, dataId?: string, space?: "model" | "paper") => void;

const CUT_FILL: Record<string, string | undefined> = {
  gach: "#1f1f1f",
  btct: "#000000",
  "vach-nhe": "#8a8a8a",
  kinh: undefined,
};

/** Các khoảng [y0,y1] mà đường thẳng đứng x=cut đi QUA TRONG polygon. */
export function cutIntervals(poly: Polygon, cut: number): Array<[number, number]> {
  const ys: number[] = [];
  const n = poly.length;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = poly[i]!;
    const [x1, y1] = poly[(i + 1) % n]!;
    if ((x0 - cut) * (x1 - cut) >= 0) continue; // không cắt qua (chạm đỉnh bỏ qua — đủ cho concept)
    const t = (cut - x0) / (x1 - x0);
    ys.push(y0 + t * (y1 - y0));
  }
  ys.sort((a, b) => a - b);
  const out: Array<[number, number]> = [];
  for (let i = 0; i + 1 < ys.length; i += 2) out.push([ys[i]!, ys[i + 1]!]);
  return out;
}

/** [a] trừ [b] trên trục số. */
function subtractIntervals(a: Array<[number, number]>, b: Array<[number, number]>): Array<[number, number]> {
  let cur = a;
  for (const [b0, b1] of b) {
    const next: Array<[number, number]> = [];
    for (const [a0, a1] of cur) {
      if (b1 <= a0 || b0 >= a1) {
        next.push([a0, a1]);
        continue;
      }
      if (b0 > a0) next.push([a0, b0]);
      if (b1 < a1) next.push([b1, a1]);
    }
    cur = next;
  }
  return cur;
}

export function buildSectionScene(p: Project, opts: SectionOptions = {}): SectionBuild {
  const cutX = sectionCutX(p);
  if (cutX == null) {
    throw new Error("Model chưa có thang — mặt cắt A-A quy ước phải đi qua thang (doc 08).");
  }

  // ── gom hình học bị cắt / nhìn thấy ───────────────────────
  type CutWall = { wall: Wall; level: Level; u: number; holes: Array<[number, number]> }; // holes theo z
  const cutWalls: CutWall[] = [];
  type SeenWall = { wall: Wall; level: Level; u0: number; u1: number };
  const seenWalls: SeenWall[] = [];

  for (const w of p.walls) {
    const level = p.levels.find((l) => l.id === w.level);
    if (!level) continue;
    const dx = w.to[0] - w.from[0];
    if (Math.abs(dx) < 1) {
      // song song mặt phẳng cắt — thấy nếu ở phía nhìn (−x)
      if (w.from[0] < cutX) seenWalls.push({ wall: w, level, u0: Math.min(w.from[1], w.to[1]), u1: Math.max(w.from[1], w.to[1]) });
      continue;
    }
    const t = (cutX - w.from[0]) / dx;
    if (t < 0 || t > 1) continue;
    const u = w.from[1] + t * (w.to[1] - w.from[1]);
    const s = t * wallLength(w); // trạm cắt dọc tường — soi opening
    const holes: Array<[number, number]> = [];
    for (const o of p.openings) {
      if (o.wall !== w.id) continue;
      if (s >= o.offset && s <= o.offset + o.width) {
        holes.push([level.elevation + o.sill, level.elevation + o.sill + o.height]);
      }
    }
    cutWalls.push({ wall: w, level, u, holes });
  }

  type CutBand = { u0: number; u1: number; z0: number; z1: number; id: string };
  const slabBands: CutBand[] = [];
  for (const s of p.slabs) {
    const level = p.levels.find((l) => l.id === s.level);
    if (!level) continue;
    const top = s.kind === "floor" ? level.elevation : level.elevation + level.height;
    let spans = cutIntervals(s.outline, cutX);
    for (const hole of s.holes ?? []) spans = subtractIntervals(spans, cutIntervals(hole, cutX));
    for (const [u0, u1] of spans) slabBands.push({ u0, u1, z0: top - s.thickness, z1: top, id: s.id });
  }

  // ── phạm vi ───────────────────────────────────────────────
  let minU = Infinity, maxU = -Infinity, top = 0, minZ = 0;
  for (const c of cutWalls) {
    minU = Math.min(minU, c.u - c.wall.thickness / 2);
    maxU = Math.max(maxU, c.u + c.wall.thickness / 2);
    top = Math.max(top, c.level.elevation + (c.wall.height ?? c.level.height));
  }
  for (const b of slabBands) {
    minU = Math.min(minU, b.u0);
    maxU = Math.max(maxU, b.u1);
    top = Math.max(top, b.z1);
    minZ = Math.min(minZ, b.z0);
  }
  if (!Number.isFinite(minU)) throw new Error("Mặt phẳng cắt không chạm tường/sàn nào — kiểm tra vị trí thang.");

  const bounds: Bounds = { minX: minU, minY: minZ, maxX: maxU, maxY: top };
  const tf = planTransform(bounds, opts.scale, { noRotate: true });
  const S = tf.scale;
  const mm = (paperMm: number): number => paperMm * S;

  const items: Scene2D = [];
  const push: Push = (layer, prim, dataId, space) => {
    items.push({ layer, prim, ...(dataId ? { dataId } : {}), ...(space ? { space } : {}) });
  };

  // ── tường thấy phía sau (vẽ trước cho nằm dưới) ───────────
  for (const { wall, level, u0, u1 } of seenWalls) {
    const z1 = level.elevation + (wall.height ?? level.height);
    push("TUONG-THAY", { kind: "polyline", pts: [[u0, level.elevation], [u1, level.elevation], [u1, z1], [u0, z1]], close: true, weight: W.thin }, wall.id);
    for (const o of p.openings.filter((x) => x.wall === wall.id)) {
      const ua = pointOnWall(wall, o.offset)[1];
      const ub = pointOnWall(wall, o.offset + o.width)[1];
      const oz0 = level.elevation + o.sill;
      push("CUA", {
        kind: "polyline",
        pts: [[Math.min(ua, ub), oz0], [Math.max(ua, ub), oz0], [Math.max(ua, ub), oz0 + o.height], [Math.min(ua, ub), oz0 + o.height]],
        close: true, weight: W.hair,
      }, o.id);
      push("CUA", { kind: "text", at: [(ua + ub) / 2, oz0 + o.height / 2], text: o.id, size: 2.2, anchor: "middle" }, o.id);
    }
  }

  // ── thang: vế bị cắt (đậm) + vế thấy (mảnh) + chiếu nghỉ ──
  drawStairProfile(p, cutX, mm, push);

  // ── tường bị cắt (poché + lanh tô/bậu quanh ô chờ) ────────
  for (const { wall, level, u, holes } of cutWalls) {
    const half = wall.thickness / 2;
    const z0 = level.elevation;
    const z1 = level.elevation + (wall.height ?? level.height);
    const zs = [z0, ...holes.flat().sort((a, b) => a - b), z1];
    for (let i = 0; i + 1 < zs.length; i += 2) {
      const a = zs[i]!;
      const b = zs[i + 1]!;
      if (b - a < 1) continue;
      push("TUONG-CAT", {
        kind: "polygon",
        pts: [[u - half, a], [u + half, a], [u + half, b], [u - half, b]],
        fill: CUT_FILL[wall.kind],
        weight: W.cut,
      }, wall.id);
    }
  }

  // ── sàn/mái bị cắt ────────────────────────────────────────
  for (const b of slabBands) {
    push("TUONG-CAT", {
      kind: "polygon",
      pts: [[b.u0, b.z0], [b.u1, b.z0], [b.u1, b.z1], [b.u0, b.z1]],
      fill: "#000000",
      weight: W.cut,
    }, b.id);
  }

  // ── đường đất + gạch chân ─────────────────────────────────
  const g0 = minU - mm(8);
  const g1 = maxU + mm(8);
  push("TUONG-CAT", { kind: "line", a: [g0, 0], b: [g1, 0], weight: W.frame });
  for (let x = g0; x <= g1; x += mm(3)) {
    push("TUONG-THAY", { kind: "line", a: [x, 0], b: [x - mm(1.6), -mm(1.6)], weight: W.hair });
  }

  // ── cao độ + dim đứng + trục ──────────────────────────────
  const levelZs = [...new Set([0, ...p.levels.map((l) => l.elevation), top])].sort((a, b) => a - b);
  for (const z of levelZs) drawLevelMark(maxU + mm(4), z, mm, push);
  drawVerticalDims(minU, levelZs, mm, push);

  const r = mm(4);
  const zBub = top + mm(10);
  for (const ax of p.axes.y) {
    if (ax.offset < minU - 1 || ax.offset > maxU + 1) continue;
    push("TRUC", { kind: "line", a: [ax.offset, top + mm(2)], b: [ax.offset, zBub - r], weight: W.hair, dash: "6 1.5 1 1.5" }, ax.id);
    push("TRUC", { kind: "circle", c: [ax.offset, zBub], r, weight: W.mid }, ax.id);
    push("TRUC", { kind: "text", at: [ax.offset, zBub], text: ax.label ?? ax.id, size: 3.2, anchor: "middle" }, ax.id);
  }

  drawSheetFrame(push, {
    projectName: p.meta.name,
    app: p.meta.app,
    title: "MẶT CẮT A-A",
    sheetNo: opts.sheetNo ?? "KT-04",
    scaleLabel: `1:${S}`,
    ...(opts.date ? { date: opts.date } : {}),
    ...(opts.designer ? { designer: opts.designer } : {}),
  });

  return { items, tf, meta: { title: "MẶT CẮT A-A", scaleLabel: `1:${S}` } };
}

/** Profile bậc thang: vế chứa mặt phẳng cắt vẽ nét cắt đậm, vế còn lại nét thấy mảnh. */
function drawStairProfile(p: Project, cutX: number, mm: (v: number) => number, push: Push): void {
  for (const st of p.stairs) {
    const level = p.levels.find((l) => l.id === st.level);
    if (!level) continue;
    const lay = stairLayout(st, level);

    for (const f of lay.flights) {
      if (Math.abs(f.dir[1]) < 0.7) continue; // vế chạy ngang x — không thể hiện trên mặt cắt dọc
      const xs = f.rect.map((pt) => pt[0]);
      const isCut = cutX >= Math.min(...xs) && cutX <= Math.max(...xs);
      const weight = isCut ? W.cut : W.thin;

      const du = f.dir[1] * st.tread;
      let u = f.start[1];
      let z = level.elevation + (f.firstStep - 1) * lay.riser;
      const pts: Point[] = [[u, z]];
      for (let i = 0; i < f.treads; i++) {
        z += lay.riser;
        pts.push([u, z]);
        u += du;
        pts.push([u, z]);
      }
      push("THANG", { kind: "polyline", pts, weight }, st.id);
      // bản thang — nét xiên nối chân với đỉnh vế, hạ xuống ~2 cổ bậc
      const drop = lay.riser * 1.6;
      push("THANG", {
        kind: "line",
        a: [f.start[1], level.elevation + (f.firstStep - 1) * lay.riser + lay.riser - drop],
        b: [u, z - drop],
        weight,
      }, st.id);
    }

    if (lay.landing) {
      const xs = lay.landing.map((pt) => pt[0]);
      if (cutX >= Math.min(...xs) && cutX <= Math.max(...xs)) {
        // mặt chiếu nghỉ = cao độ sau khi leo hết vế 1 (cùng mức mặt bậc cuối vế)
        const f1 = lay.flights[0]!;
        const zTop = level.elevation + (f1.firstStep - 1 + f1.treads) * lay.riser;
        const us = lay.landing.map((pt) => pt[1]);
        const u0 = Math.min(...us);
        const u1 = Math.max(...us);
        push("TUONG-CAT", {
          kind: "polygon",
          pts: [[u0, zTop - 140], [u1, zTop - 140], [u1, zTop], [u0, zTop]],
          fill: "#000000",
          weight: W.cut,
        }, st.id);
      }
    }
  }
}
