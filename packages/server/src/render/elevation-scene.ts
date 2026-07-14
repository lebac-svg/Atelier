import {
  groundAt, normalize, pointOnWall, roofGeometry, roofsOf, sub, unverifiedRules,
  type Level, type Opening, type Point, type Project, type Wall,
} from "@atelier/core";
import { dimTick, drawSheetFrame } from "./frame.js";
import { W, type LayerName, type Prim, type Scene2D } from "./scene.js";
import { planTransform, type Bounds, type PlanTransform } from "./transform.js";

/**
 * Mặt đứng chính (P4, doc 08): chiếu trực giao cạnh MẶT TIỀN của lô đất.
 * Hệ tọa độ tờ: u = vị trí dọc mặt tiền (mm), z = cao độ (mm) — noRotate
 * vì trục đứng là trọng lực.
 */

export type ElevationBuild = {
  items: Scene2D;
  tf: PlanTransform;
  meta: { title: string; scaleLabel: string };
};

export type ElevationOptions = { date?: string; designer?: string; scale?: number; sheetNo?: string };

type Push = (layer: LayerName, prim: Prim, dataId?: string, space?: "model" | "paper") => void;

/** Cạnh mặt tiền: A → B theo site.front. */
function frontEdge(p: Project): { A: Point; d: Point; len: number } {
  const b = p.site.boundary;
  const A = b[p.site.front % b.length]!;
  const B = b[(p.site.front + 1) % b.length]!;
  const v = sub(B, A);
  return { A, d: normalize(v), len: Math.hypot(v[0], v[1]) };
}

/**
 * Tường "thuộc mặt tiền": song song cạnh trước, thuộc CỤM GẦN NHẤT với ranh
 * (min khoảng cách + 600mm). Nhà ống sát ranh cho kết quả y hệt quy ước cũ
 * (<600); biệt thự lùi 3m (P7) vẫn tìm được lớp tường ngoài cùng.
 */
export function facadeWalls(p: Project): Array<{ wall: Wall; level: Level }> {
  const { A, d } = frontEdge(p);
  const parallel: Array<{ wall: Wall; level: Level; dist: number }> = [];
  for (const w of p.walls) {
    const level = p.levels.find((l) => l.id === w.level);
    if (!level) continue;
    const wd = normalize(sub(w.to, w.from));
    if (Math.abs(wd[0] * d[1] - wd[1] * d[0]) > 0.02) continue; // không song song
    const mid: Point = [(w.from[0] + w.to[0]) / 2, (w.from[1] + w.to[1]) / 2];
    const rel = sub(mid, A);
    const dist = Math.abs(rel[0] * d[1] - rel[1] * d[0]); // khoảng cách tới đường mặt tiền
    parallel.push({ wall: w, level, dist });
  }
  if (parallel.length === 0) return [];
  const nearest = Math.min(...parallel.map((x) => x.dist));
  return parallel.filter((x) => x.dist < nearest + 600).map(({ wall, level }) => ({ wall, level }));
}

export function buildElevationScene(p: Project, opts: ElevationOptions = {}): ElevationBuild {
  const { A, d, len } = frontEdge(p);
  const u = (pt: Point): number => (pt[0] - A[0]) * d[0] + (pt[1] - A[1]) * d[1];

  const facade = facadeWalls(p);
  if (facade.length === 0) {
    throw new Error("Không tìm thấy tường mặt tiền (song song cạnh site.front, cách < 600mm) — kiểm tra site.front.");
  }

  // phạm vi ngang theo tường mặt tiền, dọc theo cao các tầng có mặt tiền
  let u0 = Infinity, u1 = -Infinity, top = 0;
  for (const { wall, level } of facade) {
    u0 = Math.min(u0, u(wall.from), u(wall.to));
    u1 = Math.max(u1, u(wall.from), u(wall.to));
    top = Math.max(top, level.elevation + (wall.height ?? level.height));
  }
  u0 = Math.max(0, Math.min(u0, len));
  u1 = Math.min(len, Math.max(u1, 0));
  const wallTop = top;

  // mái dốc (P7): đỉnh hình phải kể nóc mái
  const roofGeoms = roofsOf(p)
    .map((rf) => {
      const lv = p.levels.find((l) => l.id === rf.level);
      return lv ? { rf, g: roofGeometry(rf, lv) } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x != null);
  for (const { g } of roofGeoms) top = Math.max(top, g.ridgeZ);

  // địa hình (P7): đất dốc dọc mặt tiền — không khai terrain thì y hệt cũ (z=0)
  const hasTerrain = !!p.site.terrain?.elevations?.length;
  const groundU = (uu: number): number =>
    hasTerrain ? groundAt(p, [A[0] + d[0] * uu, A[1] + d[1] * uu]) : 0;
  let minZ = 0;
  if (hasTerrain) {
    for (let uu = u0; uu <= u1; uu += Math.max(200, (u1 - u0) / 40)) minZ = Math.min(minZ, groundU(uu));
    minZ = Math.min(minZ, groundU(u1));
  }

  const bounds: Bounds = { minX: u0, minY: minZ, maxX: u1, maxY: top };
  const tf = planTransform(bounds, opts.scale, { noRotate: true });
  const S = tf.scale;
  const mm = (paperMm: number): number => paperMm * S;

  const items: Scene2D = [];
  const push: Push = (layer, prim, dataId, space) => {
    items.push({ layer, prim, ...(dataId ? { dataId } : {}), ...(space ? { space } : {}) });
  };

  // ── khối nhà ──────────────────────────────────────────────
  push("TUONG-CAT", { kind: "polyline", pts: [[u0, 0], [u1, 0], [u1, wallTop], [u0, wallTop]], close: true, weight: W.cut });

  // ── mái dốc: chiếu các mặt mái lên (u, z) ─────────────────
  for (const { rf, g } of roofGeoms) {
    for (const face of g.faces) {
      const pts: Point[] = face.map((v) => [u([v[0], v[1]]), v[2]]);
      push("MAI", { kind: "polyline", pts, close: true, weight: W.mid }, rf.id);
    }
  }

  // ── đường đất + gạch chân (đất dốc theo terrain) ──────────
  const g0 = u0 - mm(8);
  const g1 = u1 + mm(8);
  if (hasTerrain) {
    const pts: Point[] = [];
    for (let x = g0; x <= g1; x += mm(3)) pts.push([x, groundU(Math.max(u0, Math.min(u1, x)))]);
    pts.push([g1, groundU(u1)]);
    push("TUONG-CAT", { kind: "polyline", pts, weight: W.frame });
    for (const [x, z] of pts) {
      push("TUONG-THAY", { kind: "line", a: [x, z], b: [x - mm(1.6), z - mm(1.6)], weight: W.hair });
    }
  } else {
    push("TUONG-CAT", { kind: "line", a: [g0, 0], b: [g1, 0], weight: W.frame });
    for (let x = g0; x <= g1; x += mm(3)) {
      push("TUONG-THAY", { kind: "line", a: [x, 0], b: [x - mm(1.6), -mm(1.6)], weight: W.hair });
    }
  }

  // ── cửa đi / cửa sổ trên tường mặt tiền ───────────────────
  for (const { wall, level } of facade) {
    for (const o of p.openings.filter((x) => x.wall === wall.id)) {
      drawOpeningFace(o, level, u(pointOnWall(wall, o.offset)), u(pointOnWall(wall, o.offset + o.width)), p, mm, push);
    }
  }

  // ── cao độ ▽ bên phải: từng mức sàn + đỉnh ────────────────
  const levelZs = [...new Set([0, ...p.levels.map((l) => l.elevation), top])].sort((a, b) => a - b);
  for (const z of levelZs) drawLevelMark(u1 + mm(4), z, mm, push);

  // ── dim đứng bên trái: chuỗi tầng + tổng ──────────────────
  drawVerticalDims(u0, levelZs, mm, push);

  // ── trục cắt mặt tiền: bubble trên đỉnh ───────────────────
  drawFacadeAxes(p, A, d, len, top, mm, push);

  drawSheetFrame(push, {
    unverified: unverifiedRules(p).length > 0,
    projectName: p.meta.name,
    app: p.meta.app,
    title: "MẶT ĐỨNG CHÍNH",
    sheetNo: opts.sheetNo ?? "KT-03",
    scaleLabel: `1:${S}`,
    ...(opts.date ? { date: opts.date } : {}),
    ...(opts.designer ? { designer: opts.designer } : {}),
  });

  return { items, tf, meta: { title: "MẶT ĐỨNG CHÍNH", scaleLabel: `1:${S}` } };
}

function drawOpeningFace(
  o: Opening,
  level: Level,
  ua: number,
  ub: number,
  p: Project,
  mm: (v: number) => number,
  push: Push,
): void {
  const [x0, x1] = [Math.min(ua, ub), Math.max(ua, ub)];
  const z0 = level.elevation + o.sill;
  const z1 = z0 + o.height;
  push("CUA", { kind: "polyline", pts: [[x0, z0], [x1, z0], [x1, z1], [x0, z1]], close: true, weight: W.mid }, o.id);
  const inset = 50;
  push("CUA", {
    kind: "polyline",
    pts: [[x0 + inset, z0 + inset], [x1 - inset, z0 + inset], [x1 - inset, z1 - inset], [x0 + inset, z1 - inset]],
    close: true, weight: W.hair,
  }, o.id);
  const style = p.styles.openings[o.style];
  if (style?.leaf === "2-canh" || style?.leaf === "truot") {
    push("CUA", { kind: "line", a: [(x0 + x1) / 2, z0 + inset], b: [(x0 + x1) / 2, z1 - inset], weight: W.hair }, o.id);
  }
  push("CUA", { kind: "text", at: [(x0 + x1) / 2, (z0 + z1) / 2], text: o.id, size: 2.2, anchor: "middle" }, o.id);
}

/** Ký hiệu cao độ ▽ + nhãn ±0.000 (đơn vị m, quy ước bản vẽ VN). */
export function drawLevelMark(x: number, z: number, mm: (v: number) => number, push: Push): void {
  const s1: Point = [x - mm(1.4), z + mm(1.6)];
  const s2: Point = [x + mm(1.4), z + mm(1.6)];
  push("TEXT", { kind: "polyline", pts: [s1, s2, [x, z]], close: true, weight: W.thin });
  const label = z === 0 ? "±0.000" : `${z > 0 ? "+" : "−"}${(Math.abs(z) / 1000).toFixed(3)}`;
  push("TEXT", { kind: "text", at: [x + mm(1.8), z + mm(2.6)], text: label, size: 2.5 });
}

/** Chuỗi dim đứng (cao từng tầng) + chuỗi tổng — bên trái hình. */
export function drawVerticalDims(xEdge: number, zs: number[], mm: (v: number) => number, push: Push): void {
  const chains: Array<{ gap: number; events: number[] }> = [
    { gap: 8, events: zs },
    { gap: 14, events: [zs[0]!, zs[zs.length - 1]!] },
  ];
  for (const ch of chains) {
    if (ch.events.length < 2) continue;
    const x = xEdge - mm(ch.gap);
    push("DIM", { kind: "line", a: [x, ch.events[0]!], b: [x, ch.events[ch.events.length - 1]!], weight: W.hair });
    for (const z of ch.events) {
      push("DIM", { kind: "line", a: [xEdge - mm(1.5), z], b: [x - mm(1.2), z], weight: W.hair });
      dimTick(push, "DIM", [x, z], mm(1.1));
    }
    for (let i = 0; i + 1 < ch.events.length; i++) {
      const z0 = ch.events[i]!;
      const z1 = ch.events[i + 1]!;
      if (z1 - z0 < 1) continue;
      push("DIM", {
        kind: "text", at: [x - mm(1.0), (z0 + z1) / 2], text: String(Math.round(z1 - z0)), size: 2.5,
        anchor: "middle", along: { from: [x, z0], to: [x, z1] },
      });
    }
  }
}

function drawFacadeAxes(
  p: Project,
  A: Point,
  d: Point,
  len: number,
  top: number,
  mm: (v: number) => number,
  push: Push,
): void {
  const r = mm(4);
  const zBub = top + mm(10);
  const axisLines: Array<{ id: string; label?: string; horizontal: boolean; offset: number }> = [
    ...p.axes.x.map((a) => ({ id: a.id, ...(a.label ? { label: a.label } : {}), horizontal: false, offset: a.offset })),
    ...p.axes.y.map((a) => ({ id: a.id, ...(a.label ? { label: a.label } : {}), horizontal: true, offset: a.offset })),
  ];
  for (const ax of axisLines) {
    // giao đường trục (x=c dọc | y=c ngang) với cạnh mặt tiền A + t·d
    const denom = ax.horizontal ? d[1] : d[0];
    if (Math.abs(denom) < 1e-9) continue;
    const t = ((ax.offset - (ax.horizontal ? A[1] : A[0])) / denom);
    if (t < -1 || t > len + 1) continue;
    push("TRUC", { kind: "line", a: [t, top + mm(2)], b: [t, zBub - r], weight: W.hair, dash: "6 1.5 1 1.5" }, ax.id);
    push("TRUC", { kind: "circle", c: [t, zBub], r, weight: W.mid }, ax.id);
    push("TRUC", { kind: "text", at: [t, zBub], text: ax.label ?? ax.id, size: 3.2, anchor: "middle" }, ax.id);
  }
}
