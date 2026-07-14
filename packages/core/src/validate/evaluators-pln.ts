import { distPointToSegment } from "../geometry/segment.js";
import { area, pointInPolygon } from "../geometry/polygon.js";
import { roofGeometry } from "../geometry/roof.js";
import { wallBand } from "../geometry/wall.js";
import { floorSlabOf, getLevel, groundAt, levelsSorted, roofsOf } from "../model.js";
import type { Point, Project } from "../types.js";
import type { Finding } from "./finding.js";

/**
 * PLN — quy hoạch địa phương (doc 07): params lấy từ brief.dat.quy_hoach do
 * NGƯỜI DÙNG khai ở pha A, không hardcode. Mục nào không khai → rule đó im lặng.
 *
 * Quy ước cạnh: cạnh TRƯỚC = site.front (index cạnh boundary); cạnh SAU = cạnh
 * có trung điểm XA cạnh trước nhất (đúng cho nhà ống/lô méo thông thường).
 * P7: khai site.edges thì "mặt thoáng" = mọi cạnh street/alley (lô góc);
 * setback theo từng cạnh do PLN-07 kiểm.
 */

function edge(p: Project, index: number): [Point, Point] {
  const b = p.site.boundary;
  return [b[index % b.length]!, b[(index + 1) % b.length]!];
}

function frontEdge(p: Project): [Point, Point] {
  return edge(p, p.site.front);
}

/** Index các cạnh MẶT THOÁNG: site.edges khai street/alley, không thì cạnh front. */
function openEdgeIndexes(p: Project): number[] {
  const edges = p.site.edges;
  if (edges?.some((e) => e?.kind)) {
    const out: number[] = [];
    for (let i = 0; i < p.site.boundary.length; i++) {
      const k = edges[i]?.kind;
      if (k === "street" || k === "alley") out.push(i);
    }
    if (out.length > 0) return out;
  }
  return [p.site.front % p.site.boundary.length];
}

function backEdge(p: Project): [Point, Point] {
  const [fa, fb] = frontEdge(p);
  const n = p.site.boundary.length;
  let best = (p.site.front + 1) % n;
  let bestDist = -1;
  for (let i = 0; i < n; i++) {
    if (i === p.site.front % n) continue;
    const [a, b] = edge(p, i);
    const mid: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const d = distPointToSegment(mid, fa, fb);
    if (d > bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return edge(p, best);
}

/** Tường phạm khoảng lùi so với một cạnh ranh — dùng chung trước/sau. */
function setbackFindings(p: Project, seg: [Point, Point], lui: number): Finding[] {
  const out: Finding[] = [];
  for (const w of p.walls) {
    const d = Math.min(...wallBand(w).map((pt) => distPointToSegment(pt, seg[0], seg[1])));
    if (d < lui - 0.5) {
      out.push({ entities: [w.id], values: { wall: w.id, dist: Math.round(d), lui } });
    }
  }
  return out;
}

export function pln01(p: Project): Finding[] {
  const lui = p.brief.dat?.quy_hoach?.khoang_lui_truoc ?? p.site.setbacks?.front;
  if (lui == null || lui <= 0) return [];
  return setbackFindings(p, frontEdge(p), lui);
}

export function pln02(p: Project): Finding[] {
  const lui = p.brief.dat?.quy_hoach?.khoang_lui_sau ?? p.site.setbacks?.back;
  if (lui == null || lui <= 0) return [];
  return setbackFindings(p, backEdge(p), lui);
}

export function pln03(p: Project): Finding[] {
  const max = p.brief.dat?.quy_hoach?.mat_do_max;
  if (max == null) return [];
  const lowest = levelsSorted(p)[0];
  const slab = lowest && floorSlabOf(p, lowest.id);
  if (!slab) return [];
  const pct = Math.round((area(slab.outline) / area(p.site.boundary)) * 100);
  return pct > max ? [{ entities: [slab.id], values: { pct, max } }] : [];
}

export function pln04(p: Project): Finding[] {
  const max = p.brief.dat?.quy_hoach?.tang_max;
  if (max == null) return [];
  return p.levels.length > max
    ? [{ entities: p.levels.map((l) => l.id), values: { n: p.levels.length, max } }]
    : [];
}

export function pln05(p: Project): Finding[] {
  const max = p.brief.dat?.quy_hoach?.chieu_cao_max;
  if (max == null) return [];
  let top = 0;
  let topId = "";
  for (const l of p.levels) {
    if (l.elevation + l.height > top) {
      top = l.elevation + l.height;
      topId = l.id;
    }
  }
  // Đỉnh nóc mái dốc cao hơn đỉnh tường (P7)
  for (const rf of roofsOf(p)) {
    const lv = getLevel(p, rf.level);
    if (!lv) continue;
    const g = roofGeometry(rf, lv);
    if (g.ridgeZ > top) {
      top = Math.round(g.ridgeZ);
      topId = rf.id;
    }
  }
  // Có terrain: chiều cao đo từ CỐT ĐẤT tại trung điểm cạnh mặt tiền (vỉa hè);
  // không terrain → groundAt = 0, hành vi cũ nguyên vẹn.
  const [fa, fb] = frontEdge(p);
  const ground = p.site.terrain ? groundAt(p, [(fa[0] + fb[0]) / 2, (fa[1] + fb[1]) / 2]) : 0;
  const h = Math.round(top - ground);
  return h > max ? [{ entities: topId ? [topId] : [], values: { top: h, max } }] : [];
}

export function pln06(p: Project): Finding[] {
  const max = p.brief.dat?.quy_hoach?.o_vang_max;
  if (max == null) return [];
  const out: Finding[] = [];
  const open = new Set(openEdgeIndexes(p));
  const n = p.site.boundary.length;

  /** Mức vươn lớn nhất của outline ra ngoài ranh VỀ PHÍA cạnh mặt thoáng. */
  const overhangOf = (outline: Point[]): number => {
    let vuon = 0;
    for (const pt of outline) {
      if (pointInPolygon(pt, p.site.boundary)) continue;
      // cạnh ranh GẦN NHẤT với điểm vươn phải là cạnh mặt thoáng mới tính
      let nearest = -1;
      let nearestD = Infinity;
      for (let i = 0; i < n; i++) {
        const [a, b] = edge(p, i);
        const d = distPointToSegment(pt, a, b);
        if (d < nearestD) {
          nearestD = d;
          nearest = i;
        }
      }
      if (open.has(nearest)) vuon = Math.max(vuon, nearestD);
    }
    return vuon;
  };

  for (const s of p.slabs) {
    if (s.kind === "floor") continue; // sàn ở phải nằm trong ranh (GEO lo); ô văng/mái mới được vươn
    const vuon = overhangOf(s.outline);
    if (vuon > max + 0.5) {
      out.push({ entities: [s.id], values: { slab: s.id, vuon: Math.round(vuon), max } });
    }
  }
  for (const rf of roofsOf(p)) {
    const vuon = overhangOf(rf.outline);
    if (vuon > max + 0.5) {
      out.push({ entities: [rf.id], values: { slab: `Mái ${rf.id}`, vuon: Math.round(vuon), max } });
    }
  }
  return out;
}

/** PLN-07 (P7): khoảng lùi khai theo TỪNG cạnh trong site.edges — lô góc/biệt thự. */
export function pln07(p: Project): Finding[] {
  const edges = p.site.edges;
  if (!edges?.some((e) => e?.setback != null && e.setback > 0)) return [];
  const out: Finding[] = [];
  const n = p.site.boundary.length;
  for (let i = 0; i < Math.min(edges.length, n); i++) {
    const lui = edges[i]?.setback;
    if (lui == null || lui <= 0) continue;
    for (const f of setbackFindings(p, edge(p, i), lui)) {
      out.push({ ...f, values: { ...f.values!, edge: i } });
    }
  }
  return out;
}
