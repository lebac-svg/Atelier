import { distPointToSegment } from "../geometry/segment.js";
import { area, pointInPolygon } from "../geometry/polygon.js";
import { wallBand } from "../geometry/wall.js";
import { floorSlabOf, levelsSorted } from "../model.js";
import type { Point, Project } from "../types.js";
import type { Finding } from "./finding.js";

/**
 * PLN — quy hoạch địa phương (doc 07): params lấy từ brief.dat.quy_hoach do
 * NGƯỜI DÙNG khai ở pha A, không hardcode. Mục nào không khai → rule đó im lặng.
 *
 * Quy ước cạnh: cạnh TRƯỚC = site.front (index cạnh boundary); cạnh SAU = cạnh
 * có trung điểm XA cạnh trước nhất (đúng cho nhà ống/lô méo thông thường).
 */

function edge(p: Project, index: number): [Point, Point] {
  const b = p.site.boundary;
  return [b[index % b.length]!, b[(index + 1) % b.length]!];
}

function frontEdge(p: Project): [Point, Point] {
  return edge(p, p.site.front);
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
  return top > max ? [{ entities: topId ? [topId] : [], values: { top, max } }] : [];
}

export function pln06(p: Project): Finding[] {
  const max = p.brief.dat?.quy_hoach?.o_vang_max;
  if (max == null) return [];
  const out: Finding[] = [];
  const [fa, fb] = frontEdge(p);
  const n = p.site.boundary.length;
  for (const s of p.slabs) {
    if (s.kind === "floor") continue; // sàn ở phải nằm trong ranh (GEO lo); ô văng/mái mới được vươn
    let vuon = 0;
    for (const pt of s.outline) {
      if (pointInPolygon(pt, p.site.boundary)) continue;
      // chỉ tính điểm vươn VỀ PHÍA cạnh trước (cạnh ranh gần nhất là cạnh trước)
      const dFront = distPointToSegment(pt, fa, fb);
      let nearestIsFront = true;
      for (let i = 0; i < n && nearestIsFront; i++) {
        if (i === p.site.front % n) continue;
        const [a, b] = edge(p, i);
        if (distPointToSegment(pt, a, b) < dFront) nearestIsFront = false;
      }
      if (nearestIsFront) vuon = Math.max(vuon, dFront);
    }
    if (vuon > max + 0.5) {
      out.push({ entities: [s.id], values: { slab: s.id, vuon: Math.round(vuon), max } });
    }
  }
  return out;
}
