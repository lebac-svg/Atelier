import {
  add, areaM2, furnitureObb, getAsset, getLevel, levelAbove, obbCorners, openingSpan,
  floorSlabOf, pointOnWall, rotate, scale as vscale, stairLayout, sub,
  wallBand, wallDir, wallLength, wallNormal, type Furniture, type Level, type Opening,
  type Point, type Project, type Wall,
} from "@atelier/core";
import { dimTick, drawSheetFrame } from "./frame.js";
import { LAYERS, W, type LayerName, type Prim, type Scene2D, type SceneItem } from "./scene.js";
import { planTransform, type Bounds, type PlanTransform } from "./transform.js";

export type PlanBuild = {
  items: Scene2D;
  tf: PlanTransform;
  meta: { levelName: string; scaleLabel: string; projectName: string };
};

export type PlanOptions = {
  date?: string;
  designer?: string;
  scale?: number;
  layers?: string[];
  /** Số hiệu tờ trong bộ hồ sơ (P4) — mặc định KT-01. */
  sheetNo?: string;
  /**
   * Underlay đồ lại (server nạp sẵn qua loadUnderlay) — vẽ MỜ dưới cùng và
   * nới bounds cho thấy trọn bản cũ. Chỉ truyền ở plan live/render_plan;
   * bộ tờ hồ sơ (sheets) KHÔNG truyền — giàn giáo không vào bản vẽ bàn giao.
   */
  underlay?: PlanUnderlay;
};

export type PlanUnderlay = {
  polylines: Point[][];
  image?: { href: string; wpx: number; hpx: number; origin: Point; scale: number; rot: number };
  opacity: number;
  level?: string;
};

export function buildPlanScene(p: Project, levelId: string, opts: PlanOptions = {}): PlanBuild {
  const level = getLevel(p, levelId);
  if (!level) {
    const known = p.levels.map((l) => l.id).join(", ");
    throw new Error(`Không có level "${levelId}" — các level hiện có: ${known}.`);
  }

  const items: Scene2D = [];
  const keep = opts.layers?.length
    ? new Set([...opts.layers.map((l) => l.toUpperCase()), "KHUNG"]) // khung tên luôn giữ
    : null;
  const push = (layer: LayerName, prim: Prim, dataId?: string, space?: "model" | "paper") => {
    if (keep && !keep.has(layer)) return;
    items.push({ layer, prim, ...(dataId ? { dataId } : {}), ...(space ? { space } : {}) });
  };

  const walls = p.walls.filter((w) => w.level === levelId);
  const underlay = opts.underlay && (!opts.underlay.level || opts.underlay.level === levelId)
    ? opts.underlay
    : undefined;
  const bounds = computeBounds(p, walls, underlay);
  const tf = planTransform(bounds, opts.scale);
  const S = tf.scale;
  const mm = (paperMm: number): number => paperMm * S; // mm giấy → mm model

  // vector model sao cho trên giấy dịch (dx,dy) mm — phục vụ xếp chữ nhiều dòng
  const paperVec = (dx: number, dy: number): Point =>
    tf.rotated ? [dy * S, dx * S] : [dx * S, -dy * S];

  if (underlay) drawUnderlay(underlay, items);
  drawSite(p, push);
  drawAxes(p, bounds, mm, push);
  drawWallsAndOpenings(p, walls, mm, push);
  drawSlabHoles(p, levelId, push);
  drawStairs(p, levelId, mm, push);
  drawFurniture(p, levelId, push);
  drawDims(p, walls, bounds, mm, push);
  drawRoomDims(p, levelId, mm, push);
  drawSectionMark(p, levelId, bounds, mm, push);
  drawRoomLabels(p, level, tf, paperVec, push);
  drawSheetFrame(push, {
    projectName: p.meta.name,
    app: p.meta.app,
    title: `MẶT BẰNG ${level.name}`,
    sheetNo: opts.sheetNo ?? "KT-01",
    scaleLabel: `1:${S}`,
    ...(opts.date ? { date: opts.date } : {}),
    ...(opts.designer ? { designer: opts.designer } : {}),
    northPaperDir: norm(tf.dirToPaper(rotate([0, 1], p.site.north))),
  });

  return {
    items,
    tf,
    meta: { levelName: level.name, scaleLabel: `1:${S}`, projectName: p.meta.name },
  };
}

function computeBounds(p: Project, walls: Wall[], underlay?: PlanUnderlay): Bounds {
  const pts: Point[] = [...p.site.boundary];
  for (const w of walls) pts.push(...wallBand(w));
  if (underlay) pts.push(...underlayCorners(underlay));
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of pts) {
    minX = Math.min(minX, x); minY = Math.min(minY, y);
    maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
  }
  return { minX, minY, maxX, maxY };
}

/* ---------------- underlay đồ lại ---------------- */

function underlayCorners(u: PlanUnderlay): Point[] {
  const pts: Point[] = u.polylines.flat();
  if (u.image) {
    const { origin, scale, rot, wpx, hpx } = u.image;
    for (const [cx, cy] of [[0, 0], [wpx, 0], [wpx, hpx], [0, hpx]] as Point[]) {
      pts.push(add(origin, rotate([cx * scale, cy * scale], rot)));
    }
  }
  return pts;
}

function drawUnderlay(u: PlanUnderlay, items: Scene2D): void {
  // đẩy thẳng vào items (không qua push/keep) — lọc layers không được giấu giàn giáo đồ lại
  if (u.image) {
    items.push({ layer: "UNDERLAY", prim: { kind: "image", ...u.image }, opacity: u.opacity });
  }
  for (const pts of u.polylines) {
    if (pts.length < 2) continue;
    items.push({
      layer: "UNDERLAY",
      prim: { kind: "polyline", pts, weight: W.thin, color: "#3a6ea5" },
      opacity: u.opacity,
    });
  }
}

/* ---------------- ranh đất ---------------- */

function drawSite(p: Project, push: Push): void {
  push("TUONG-THAY", { kind: "polyline", pts: p.site.boundary, close: true, weight: W.hair, dash: "3 1.2 0.6 1.2" }, "site");
}

/* ---------------- trục ---------------- */

type Push = (layer: LayerName, prim: Prim, dataId?: string, space?: "model" | "paper") => void;

function drawAxes(p: Project, b: Bounds, mm: (v: number) => number, push: Push): void {
  const ext = mm(26); // bubble nằm ngoài 3 chuỗi dim
  const rBub = mm(4); // ⌀8mm giấy
  for (const a of p.axes.x) {
    const y0 = b.minY - ext, y1 = b.maxY + ext;
    push("TRUC", { kind: "line", a: [a.offset, y0 + rBub], b: [a.offset, y1 - rBub], weight: W.hair, dash: "6 1.5 1 1.5" }, a.id);
    for (const y of [y0, y1]) {
      push("TRUC", { kind: "circle", c: [a.offset, y], r: rBub, weight: W.mid }, a.id);
      push("TRUC", { kind: "text", at: [a.offset, y], text: a.label ?? a.id, size: 3.2, anchor: "middle" }, a.id);
    }
  }
  for (const a of p.axes.y) {
    const x0 = b.minX - ext, x1 = b.maxX + ext;
    push("TRUC", { kind: "line", a: [x0 + rBub, a.offset], b: [x1 - rBub, a.offset], weight: W.hair, dash: "6 1.5 1 1.5" }, a.id);
    for (const x of [x0, x1]) {
      push("TRUC", { kind: "circle", c: [x, a.offset], r: rBub, weight: W.mid }, a.id);
      push("TRUC", { kind: "text", at: [x, a.offset], text: a.label ?? a.id, size: 3.2, anchor: "middle" }, a.id);
    }
  }
}

/* ---------------- tường + cửa ---------------- */

const WALL_FILL: Record<string, string | undefined> = {
  gach: "#1f1f1f",
  btct: "#000000",
  "vach-nhe": "#8a8a8a",
  kinh: undefined,
};

function drawWallsAndOpenings(p: Project, walls: Wall[], mm: (v: number) => number, push: Push): void {
  for (const w of walls) {
    const len = wallLength(w);
    const n = wallNormal(w);
    const half = vscale(n, w.thickness / 2);
    const spans = p.openings
      .filter((o) => o.wall === w.id)
      .map((o) => openingSpan(o))
      .sort((a, b) => a[0] - b[0]);

    // các mảng tường đặc giữa những ô chờ
    let cursor = 0;
    const segs: Array<[number, number]> = [];
    for (const [s0, s1] of spans) {
      if (s0 > cursor) segs.push([cursor, s0]);
      cursor = Math.max(cursor, s1);
    }
    if (cursor < len) segs.push([cursor, len]);

    for (const [s0, s1] of segs) {
      const a = pointOnWall(w, s0);
      const b = pointOnWall(w, s1);
      if (w.kind === "kinh") {
        const off = vscale(n, w.thickness / 4);
        push("TUONG-CAT", { kind: "line", a: add(a, off), b: add(b, off), weight: W.mid }, w.id);
        push("TUONG-CAT", { kind: "line", a: sub(a, off), b: sub(b, off), weight: W.mid }, w.id);
      } else {
        push("TUONG-CAT", {
          kind: "polygon",
          pts: [add(a, half), add(b, half), sub(b, half), sub(a, half)],
          fill: WALL_FILL[w.kind],
          weight: W.cut,
        }, w.id);
      }
    }
  }

  for (const o of p.openings) {
    const w = walls.find((x) => x.id === o.wall);
    if (!w) continue;
    drawOpening(p, w, o, mm, push);
  }
}

function drawOpening(p: Project, w: Wall, o: Opening, mm: (v: number) => number, push: Push): void {
  const n = wallNormal(w);
  const half = vscale(n, w.thickness / 2);
  const jambL = pointOnWall(w, o.offset);
  const jambR = pointOnWall(w, o.offset + o.width);

  // nét má ô chờ (thấy)
  for (const j of [jambL, jambR]) {
    push("TUONG-THAY", { kind: "line", a: add(j, half), b: sub(j, half), weight: W.mid }, o.id);
  }

  if (o.kind === "window") {
    // 3 nét song song trong bề dày tường + bậu là 2 nét mép
    for (const k of [-0.5, 0, 0.5]) {
      const off = vscale(n, w.thickness * k);
      push("CUA", { kind: "line", a: add(jambL, off), b: add(jambR, off), weight: W.mid }, o.id);
    }
    const labelAt = add(midOf(jambL, jambR), vscale(n, w.thickness / 2 + mm(2.2)));
    push("CUA", { kind: "text", at: labelAt, text: o.id, size: 2.2, anchor: "middle" }, o.id);
    return;
  }

  // cửa đi
  const style = p.styles.openings[o.style];
  const swing = o.swing ?? "in-L";
  if (swing === "slide" || style?.leaf === "truot" || style?.leaf === "xep") {
    const d = wallDir(w);
    const mid = midOf(jambL, jambR);
    const a = add(mid, vscale(d, -o.width * 0.45));
    const b = add(mid, vscale(d, o.width * 0.45));
    push("CUA", { kind: "line", a, b, weight: W.strong }, o.id);
    push("CUA", { kind: "line", a: add(a, vscale(n, mm(0.9))), b: add(b, vscale(n, mm(0.9))), weight: W.thin }, o.id);
  } else if (swing !== "none") {
    const side = swing.startsWith("in") ? 1 : -1;
    const leaves: Array<[Point, Point, number]> =
      style?.leaf === "2-canh"
        ? [[jambL, jambR, o.width / 2], [jambR, jambL, o.width / 2]]
        : [swing.endsWith("-L") ? [jambL, jambR, o.width] : [jambR, jambL, o.width]];
    for (const [hinge, other, r] of leaves) {
      const open = vscale(n, side * r);
      push("CUA", { kind: "line", a: hinge, b: add(hinge, open), weight: W.strong }, o.id);
      const closedDir = sub(other, hinge);
      const a0 = deg(Math.atan2(closedDir[1], closedDir[0]));
      const a1 = deg(Math.atan2(side * n[1], side * n[0]));
      push("CUA", { kind: "arc", c: hinge, r, a0, a1, weight: W.thin }, o.id);
    }
  }
  const labelSide = swing.startsWith("out") ? -1 : 1;
  const labelAt = add(midOf(jambL, jambR), vscale(n, labelSide * (w.thickness / 2 + mm(2.2))));
  push("CUA", { kind: "text", at: labelAt, text: o.id, size: 2.2, anchor: "middle" }, o.id);
}

const midOf = (a: Point, b: Point): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const deg = (rad: number): number => (rad * 180) / Math.PI;

/* ---------------- lỗ sàn (giếng trời, thông tầng) ---------------- */

function drawSlabHoles(p: Project, levelId: string, push: Push): void {
  const slab = floorSlabOf(p, levelId);
  for (const hole of slab?.holes ?? []) {
    push("TUONG-THAY", { kind: "polyline", pts: hole, close: true, weight: W.thin, dash: "2.5 1.2" }, slab!.id);
  }
}

/* ---------------- thang ---------------- */

function drawStairs(p: Project, levelId: string, mm: (v: number) => number, push: Push): void {
  for (const st of p.stairs) {
    const base = getLevel(p, st.level);
    if (!base) continue;
    const isHere = st.level === levelId;
    const isAbove = levelAbove(p, st.level)?.id === levelId;
    if (!isHere && !isAbove) continue;

    const lay = stairLayout(st, base);
    for (const f of lay.flights) {
      push("THANG", { kind: "polyline", pts: f.rect, close: true, weight: W.mid }, st.id);
      const across = vscale(rotate(f.dir, 90), st.width / 2);
      for (let i = 1; i <= f.treads; i++) {
        const c = add(f.start, vscale(f.dir, i * st.tread));
        push("THANG", { kind: "line", a: add(c, across), b: sub(c, across), weight: W.mid }, st.id);
      }
    }
    if (lay.landing) push("THANG", { kind: "polyline", pts: lay.landing, close: true, weight: W.mid }, st.id);

    // mũi tên đi lên: chân vế 1 → giữa chiếu nghỉ → lối ra
    const f1 = lay.flights[0]!;
    const f2 = lay.flights[lay.flights.length - 1]!;
    const pts: Point[] = [f1.start];
    if (lay.landing) {
      const lc = centroidOf(lay.landing);
      pts.push(add(f1.start, vscale(f1.dir, f1.treads * st.tread + (st.landing ?? st.width) / 2)), lc);
    }
    pts.push(lay.topExit.at);
    push("THANG", { kind: "polyline", pts, weight: W.thin }, st.id);
    const tip = lay.topExit.at;
    const d = lay.topExit.dir;
    const back = vscale(d, -mm(2.2));
    const side = vscale(rotate(d, 90), mm(0.8));
    push("THANG", { kind: "polygon", pts: [tip, add(add(tip, back), side), sub(add(tip, back), side)], fill: "#000" }, st.id);
    // nhãn chạy dọc vế 1, lệch khỏi đường mũi tên nửa vế
    const labelAt = add(
      add(f1.start, vscale(f1.dir, f1.treads * st.tread * 0.45)),
      vscale(rotate(f1.dir, 90), st.width * 0.24),
    );
    push("THANG", {
      kind: "text", at: labelAt, text: `LÊN ${st.steps} BẬC`, size: 2.2, anchor: "middle",
      along: { from: f1.start, to: add(f1.start, f1.dir) },
    }, st.id);

    // đường cắt zigzag trên vế 1 — chỉ ở mặt bằng tầng chân thang
    if (isHere) {
      const cutAt = add(f1.start, vscale(f1.dir, f1.treads * st.tread * 0.55));
      const a = add(cutAt, vscale(rotate(f1.dir, 90), st.width * 0.75));
      const b = sub(cutAt, vscale(rotate(f1.dir, 90), st.width * 0.75));
      const zig = zigzag(a, b, mm(1.2));
      push("THANG", { kind: "polyline", pts: zig, weight: W.mid }, st.id);
    }
  }
}

function centroidOf(poly: Point[]): Point {
  let x = 0, y = 0;
  for (const p of poly) { x += p[0]; y += p[1]; }
  return [x / poly.length, y / poly.length];
}

function zigzag(a: Point, b: Point, amp: number): Point[] {
  const d = sub(b, a);
  const n = vscale(rotate([d[0], d[1]], 90), amp / Math.hypot(d[0], d[1]));
  const at = (t: number): Point => [a[0] + d[0] * t, a[1] + d[1] * t];
  return [a, at(0.35), add(at(0.45), n), sub(at(0.55), n), at(0.65), b];
}

/* ---------------- nội thất ---------------- */

function drawFurniture(p: Project, levelId: string, push: Push): void {
  for (const f of p.furniture) {
    if (f.level !== levelId) continue;
    const asset = getAsset(f.asset);
    if (!asset) continue;
    const corners = obbCorners(furnitureObb(f, asset));
    // đồ treo (tủ bếp trên, máy lạnh…) — nét đứt theo quy ước "trên cao"
    const hung = asset.mountHeight != null || (f.elevation ?? 0) > 0;
    push("NOI-THAT", { kind: "polyline", pts: corners, close: true, weight: W.thin, ...(hung ? { dash: "2 1" } : {}) }, f.id);
    for (const prim of furnitureGlyphPrims(asset.category, asset.footprint)) {
      push("NOI-THAT", transformPrim(prim, f.at, f.rotation), f.id);
    }
  }
}

/** Dời prim local (tâm footprint, rotation 0) ra thế giới — nuôi cả plan lẫn thumbnail. */
export function transformPrim(prim: Prim, at: Point, rotation: number): Prim {
  const T = (pt: Point): Point => add(at, rotate(pt, rotation));
  switch (prim.kind) {
    case "line":
      return { ...prim, a: T(prim.a), b: T(prim.b) };
    case "polyline":
    case "polygon":
      return { ...prim, pts: prim.pts.map(T) };
    case "circle":
      return { ...prim, c: T(prim.c) };
    case "ellipse":
      return { ...prim, c: T(prim.c), rot: prim.rot + rotation };
    case "arc":
      return { ...prim, c: T(prim.c), a0: prim.a0 + rotation, a1: prim.a1 + rotation };
    case "text":
      return { ...prim, at: T(prim.at) };
    default:
      return prim;
  }
}

/**
 * Ký hiệu 2D của asset trong hệ LOCAL (tâm footprint, rotation 0, mm) —
 * một nguồn cho mặt bằng + thumbnail catalog + contact sheet assets_search.
 */
export function furnitureGlyphPrims(category: string, fp: { w: number; d: number }, weightOverride?: number): Prim[] {
  const prims: Prim[] = [];
  const hair = weightOverride ?? W.hair;
  const line = (x0: number, y0: number, x1: number, y1: number, weight: number = hair) =>
    prims.push({ kind: "line", a: [x0, y0], b: [x1, y1], weight });
  const circle = (x: number, y: number, r: number) =>
    prims.push({ kind: "circle", c: [x, y], r, weight: hair });
  const rect = (x0: number, y0: number, x1: number, y1: number) =>
    prims.push({ kind: "polyline", pts: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], close: true, weight: hair });
  const ellipse = (x: number, y: number, rx: number, ry: number) =>
    prims.push({ kind: "ellipse", c: [x, y], rx, ry, rot: 0, weight: hair });
  const hw = fp.w / 2, hd = fp.d / 2;

  switch (category) {
    case "giuong":
    case "giuong-tang":
      rect(-hw + 70, -hd + 70, hw - 70, -hd + fp.d * 0.2); // gối
      line(-hw, -hd + fp.d * 0.32, hw, -hd + fp.d * 0.32); // mép chăn
      if (category === "giuong-tang") line(-hw, -hd, hw, hd, hair); // chéo = 2 tầng
      break;
    case "sofa":
      line(-hw, -hd + 140, hw, -hd + 140);
      line(-hw + 140, -hd + 140, -hw + 140, hd);
      line(hw - 140, -hd + 140, hw - 140, hd);
      break;
    case "ban-tra":
      rect(-hw + 50, -hd + 50, hw - 50, hd - 50);
      break;
    case "ke-tv":
      rect(-fp.w * 0.3, -45, fp.w * 0.3, 45);
      break;
    case "ban-an":
    case "ban-lam-viec":
    case "ban-trang-diem":
      rect(-hw + 60, -hd + 60, hw - 60, hd - 60);
      if (category === "ban-trang-diem") circle(0, -hd + 90, Math.min(180, fp.w * 0.18));
      break;
    case "ghe-an":
      line(-hw, -hd + 80, hw, -hd + 80); // tựa lưng
      break;
    case "ghe-xoay":
      circle(0, 0, Math.min(hw, hd) * 0.7);
      line(-hw + 60, -hd + 90, hw - 60, -hd + 90);
      break;
    case "tu-ao":
      line(0, -hd, 0, hd);
      line(-hw, -hd, 0, hd);
      break;
    case "tu-dau-giuong":
      break; // outline là đủ
    case "ke-sach": {
      const n = Math.max(2, Math.round(fp.w / 400));
      for (let i = 1; i < n; i++) line(-hw + (fp.w * i) / n, -hd, -hw + (fp.w * i) / n, hd);
      break;
    }
    case "tu-giay":
      line(-hw, -hd, hw, hd);
      break;
    case "tu-bep-duoi": {
      if (fp.w >= 1500) {
        rect(-hw + fp.w * 0.12, -170, -hw + fp.w * 0.12 + 460, 170); // chậu rửa
        circle(-hw + fp.w * 0.12 + 230, 0, 55);
      }
      if (fp.w >= 2200) {
        circle(hw - fp.w * 0.3, -105, 105); // 2 họng bếp
        circle(hw - fp.w * 0.3, 115, 105);
      }
      break;
    }
    case "tu-bep-tren":
      break; // nét đứt outline là đủ
    case "tu-lanh":
      line(-hw, -hd + fp.d * 0.33, hw, -hd + fp.d * 0.33);
      break;
    case "bon-cau":
      rect(-hw, -hd, hw, -hd + 170); // két nước
      ellipse(0, fp.d * 0.12, fp.w * 0.42, fp.d * 0.3);
      break;
    case "lavabo":
      ellipse(0, 20, hw - 60, hd - 70);
      circle(0, -hd + 60, 26);
      break;
    case "voi-sen":
      line(-hw, -hd, hw, hd);
      circle(0, 0, 52);
      break;
    case "bon-tam":
      rect(-hw + 60, -hd + 60, hw - 60, hd - 60);
      circle(-hw + 200, 0, 40); // thoát nước
      break;
    case "guong":
      line(-hw, 0, hw, 0, W.thin);
      break;
    case "binh-nong-lanh":
      circle(0, 0, Math.min(hw, hd) * 0.7);
      break;
    case "may-giat":
      circle(0, 0, Math.min(hw, hd) * 0.62);
      break;
    case "may-lanh":
      line(-hw + 40, hd - 70, hw - 40, hd - 70);
      break;
    case "quat-cay":
    case "den-cay":
      circle(0, 0, Math.min(hw, hd) * 0.55);
      line(-Math.min(hw, hd) * 0.55, 0, Math.min(hw, hd) * 0.55, 0);
      break;
    case "cay-canh":
      circle(0, 0, Math.min(hw, hd) * 0.85);
      circle(-fp.w * 0.15, -fp.d * 0.1, fp.w * 0.22);
      circle(fp.w * 0.12, fp.d * 0.15, fp.w * 0.18);
      break;
    case "xe-may":
      circle(0, -hd + 240, 95);
      circle(0, hd - 240, 95);
      line(0, -hd + 240, 0, hd - 240);
      line(-hw + 60, -hd + 430, hw - 60, -hd + 430, W.thin); // ghi đông
      break;
    case "xe-dap":
      circle(0, -hd + 320, 320);
      circle(0, hd - 320, 320);
      line(0, -hd + 320, 0, hd - 320);
      break;
    case "o-to":
      rect(-hw + 80, -hd + 80, hw - 80, hd - 80);
      line(-hw + 80, -hd + fp.d * 0.28, hw - 80, -hd + fp.d * 0.28); // kính lái
      line(-hw + 80, hd - fp.d * 0.22, hw - 80, hd - fp.d * 0.22);
      break;
    case "ban-tho":
      line(-hw, 0, hw, 0);
      circle(-fp.w / 4, -hd / 2, 55);
      circle(0, -hd / 2, 55);
      circle(fp.w / 4, -hd / 2, 55);
      break;
    default:
      break;
  }
  return prims;
}

/* ---------------- dim 3 chuỗi ---------------- */

type DimSide = {
  axis: "x" | "y";
  edge: number;
  out: 1 | -1; // hướng ra ngoài theo trục còn lại
};

function drawDims(p: Project, walls: Wall[], b: Bounds, mm: (v: number) => number, push: Push): void {
  const sides: DimSide[] = [
    { axis: "x", edge: b.minY, out: -1 },
    { axis: "x", edge: b.maxY, out: 1 },
    { axis: "y", edge: b.minX, out: -1 },
    { axis: "y", edge: b.maxX, out: 1 },
  ];
  const eps = 1;

  for (const side of sides) {
    const detail = new Set<number>();
    for (const w of walls) {
      const d = wallDir(w);
      const alongSide = side.axis === "x" ? Math.abs(d[1]) < 1e-6 : Math.abs(d[0]) < 1e-6;
      const band = wallBand(w);
      const perpVals = band.map((pt) => (side.axis === "x" ? pt[1] : pt[0]));
      const touches = perpVals.some((v) => Math.abs(v - side.edge) <= eps);
      if (!touches) continue;
      const proj = (pt: Point): number => (side.axis === "x" ? pt[0] : pt[1]);
      if (alongSide) {
        detail.add(proj(w.from));
        detail.add(proj(w.to));
        for (const o of p.openings.filter((x) => x.wall === w.id)) {
          detail.add(proj(pointOnWall(w, o.offset)));
          detail.add(proj(pointOnWall(w, o.offset + o.width)));
        }
      } else {
        for (const v of band.map(proj)) detail.add(v);
      }
    }
    const axes = (side.axis === "x" ? p.axes.x : p.axes.y).map((a) => a.offset);
    const lo = side.axis === "x" ? b.minX : b.minY;
    const hi = side.axis === "x" ? b.maxX : b.maxY;
    detail.add(lo);
    detail.add(hi);

    const chains: Array<{ gap: number; events: number[] }> = [
      { gap: 8, events: [...detail].sort((a, z) => a - z) },
      { gap: 14, events: axes.length >= 2 ? [...axes].sort((a, z) => a - z) : [] },
      { gap: 20, events: [lo, hi] },
    ];

    // nét gióng: từ mép nhà tới chuỗi xa nhất chứa event
    const far = new Map<number, number>();
    for (const ch of chains) for (const v of ch.events) far.set(v, Math.max(far.get(v) ?? 0, ch.gap));
    for (const [v, gap] of far) {
      const a = pt(side, v, side.edge + side.out * mm(1.5));
      const bpt = pt(side, v, side.edge + side.out * mm(gap + 1.2));
      push("DIM", { kind: "line", a, b: bpt, weight: W.hair });
    }

    for (const ch of chains) {
      if (ch.events.length < 2) continue;
      const linePos = side.edge + side.out * mm(ch.gap);
      const a = pt(side, ch.events[0]!, linePos);
      const z = pt(side, ch.events[ch.events.length - 1]!, linePos);
      push("DIM", { kind: "line", a, b: z, weight: W.hair });
      for (const v of ch.events) {
        const c = pt(side, v, linePos);
        const t = mm(1.1);
        push("DIM", { kind: "line", a: [c[0] - t, c[1] - t], b: [c[0] + t, c[1] + t], weight: W.mid });
      }
      let alt = 0;
      for (let i = 0; i + 1 < ch.events.length; i++) {
        const v0 = ch.events[i]!;
        const v1 = ch.events[i + 1]!;
        const len = Math.round(v1 - v0);
        if (len <= 0) continue;
        const narrow = len / mm(1) < String(len).length * 1.9;
        const off = narrow ? side.out * mm(2.1 + (alt++ % 2) * 2.2) : -side.out * mm(1.0);
        const at = pt(side, (v0 + v1) / 2, linePos + off);
        push("DIM", {
          kind: "text", at, text: String(len), size: 2.5, anchor: "middle",
          along: { from: pt(side, v0, linePos), to: pt(side, v1, linePos) },
        });
      }
    }
  }
}

function pt(side: DimSide, along: number, perp: number): Point {
  return side.axis === "x" ? [along, perp] : [perp, along];
}

/* ---------------- nhãn phòng + cao độ ---------------- */

function drawRoomLabels(p: Project, level: Level, tf: PlanTransform, paperVec: (dx: number, dy: number) => Point, push: Push): void {
  const rooms = p.rooms.filter((r) => r.level === level.id);
  let biggest: { id: string; c: Point; area: number } | null = null;
  for (const r of rooms) {
    const c = centroidOf(r.polygon);
    const area = areaM2(r.polygon);
    if (!biggest || area > biggest.area) biggest = { id: r.id, c, area };
    if (r.use === "cau-thang") continue; // thang tự nói lên mình (mũi tên + LÊN n BẬC)

    const small = area < 4;
    const size1 = small ? 2.4 : 3.5;
    const size2 = small ? 2.0 : 2.5;
    const name = r.name.toUpperCase();

    // chữ mặc định nằm ngang GIẤY; phòng hẹp không đủ chỗ → xoay theo trục dài của phòng
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [x, y] of r.polygon) {
      minX = Math.min(minX, x); minY = Math.min(minY, y);
      maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
    }
    const textLen = name.length * size1 * 0.62 * tf.scale; // ước lượng mm model
    const paperXExtent = tf.rotated ? maxY - minY : maxX - minX;
    let along: { from: Point; to: Point } | undefined;
    let lineStep: Point;
    if (textLen > paperXExtent * 0.92) {
      along = maxX - minX >= maxY - minY
        ? { from: [minX, c[1]], to: [maxX, c[1]] }
        : { from: [c[0], minY], to: [c[0], maxY] };
      const dir = norm(sub(along.to, along.from));
      let perp = rotate(dir, 90);
      const onPaper = tf.dirToPaper(perp);
      if (onPaper[1] < 0 && Math.abs(onPaper[1]) >= Math.abs(onPaper[0])) perp = vscale(perp, -1);
      if (onPaper[0] < 0 && Math.abs(onPaper[0]) > Math.abs(onPaper[1])) perp = vscale(perp, -1);
      lineStep = vscale(perp, (small ? 3.4 : 4.6) * tf.scale);
    } else {
      lineStep = paperVec(0, small ? 3.4 : 4.6);
    }

    push("TEXT", { kind: "text", at: c, text: name, size: size1, anchor: "middle", ...(along ? { along } : {}) }, r.id);
    push("TEXT", { kind: "text", at: add(c, lineStep), text: `${area.toFixed(1)}m²`, size: size2, anchor: "middle", ...(along ? { along } : {}) }, r.id);
  }
  if (biggest) {
    const at = add(biggest.c, paperVec(0, 9.5));
    const e = level.elevation;
    const label = e === 0 ? "±0.000" : `${e > 0 ? "+" : "−"}${(Math.abs(e) / 1000).toFixed(3)}`;
    const s1 = paperVec(-1.4, 0), s2 = paperVec(1.4, 0), tip = paperVec(0, 1.6);
    push("TEXT", { kind: "polyline", pts: [add(at, s1), add(at, s2), add(at, tip)], close: true, weight: W.thin });
    push("TEXT", { kind: "text", at: add(at, paperVec(0, -1.2)), text: label, size: 2.5, anchor: "middle" });
  }
}

/* ---------------- dim thông thủy trong nhà (P4, doc 08) ---------------- */

/**
 * Mỗi phòng đủ lớn: hai dim thông thủy (ngang + dọc) theo bbox polygon —
 * đặt lệch 30% cạnh để né nhãn tên phòng ở tâm.
 */
function drawRoomDims(p: Project, levelId: string, mm: (v: number) => number, push: Push): void {
  for (const r of p.rooms) {
    if (r.level !== levelId || r.use === "cau-thang") continue;
    if (areaM2(r.polygon) < 2) continue;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [x, y] of r.polygon) {
      minX = Math.min(minX, x); minY = Math.min(minY, y);
      maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
    }
    const w = maxX - minX;
    const h = maxY - minY;
    const t = mm(1.1);

    // dim ngang — cần đủ chỗ cho chữ (≈6mm giấy)
    if (w >= mm(6) && h >= mm(5)) {
      const y = minY + h * 0.3;
      push("DIM", { kind: "line", a: [minX, y], b: [maxX, y], weight: W.hair });
      dimTick(push, "DIM", [minX, y], t);
      dimTick(push, "DIM", [maxX, y], t);
      push("DIM", {
        kind: "text", at: [(minX + maxX) / 2, y + mm(1.0)], text: String(Math.round(w)), size: 2.5,
        anchor: "middle", along: { from: [minX, y], to: [maxX, y] },
      });
    }
    if (h >= mm(6) && w >= mm(5)) {
      const x = minX + w * 0.3;
      push("DIM", { kind: "line", a: [x, minY], b: [x, maxY], weight: W.hair });
      dimTick(push, "DIM", [x, minY], t);
      dimTick(push, "DIM", [x, maxY], t);
      push("DIM", {
        // chữ đặt ở 30% chiều dim — điểm giữa là chỗ nhãn tên phòng đứng
        kind: "text", at: [x - mm(1.0), minY + h * 0.3], text: String(Math.round(h)), size: 2.5,
        anchor: "middle", along: { from: [x, minY], to: [x, maxY] },
      });
    }
  }
}

/* ---------------- vết cắt A-A qua thang (P4, doc 08) ---------------- */

/** Tâm vế 1 của thang đầu tiên — mặt cắt A-A dọc nhà phải xuyên qua đây. */
export function sectionCutX(p: Project): number | null {
  const st = p.stairs[0];
  if (!st) return null;
  const base = getLevel(p, st.level);
  if (!base) return null;
  const rect = stairLayout(st, base).flights[0]!.rect;
  return rect.reduce((s, pt) => s + pt[0], 0) / rect.length;
}

function drawSectionMark(p: Project, levelId: string, b: Bounds, mm: (v: number) => number, push: Push): void {
  const st = p.stairs[0];
  if (!st) return;
  const visible = st.level === levelId || levelAbove(p, st.level)?.id === levelId;
  if (!visible) return;
  const x = sectionCutX(p);
  if (x == null) return;

  const y0 = b.minY - mm(8);
  const y1 = b.maxY + mm(8);
  push("TEXT", { kind: "line", a: [x, y0], b: [x, y1], weight: W.hair, dash: "10 3 2 3" });
  for (const [yEnd, dirY] of [[y0, 1], [y1, -1]] as Array<[number, number]>) {
    // đoạn đậm ở đầu vết + mũi tên chỉ HƯỚNG NHÌN (−x, khớp section-scene) + chữ A
    push("TEXT", { kind: "line", a: [x, yEnd], b: [x, yEnd + dirY * mm(4)], weight: W.frame });
    const ax = x - mm(0.6);
    push("TEXT", {
      kind: "polygon",
      pts: [[ax - mm(3), yEnd], [ax, yEnd + mm(1.1)], [ax, yEnd - mm(1.1)]],
      fill: "#000",
    });
    push("TEXT", { kind: "text", at: [x + mm(2.6), yEnd], text: "A", size: 3.5, anchor: "middle", bold: true });
  }
}

function norm(v: Point): Point {
  const l = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / l, v[1] / l];
}

export { LAYERS };
