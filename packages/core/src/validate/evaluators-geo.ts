import { getAsset } from "../catalog.js";
import { convexOverlapDepth, furnitureObb, obbCorners } from "../geometry/obb.js";
import { isSimplePolygon, pointInPolygon, polygonInsidePolygon } from "../geometry/polygon.js";
import { stairLayout } from "../geometry/stair.js";
import {
  openingSpan, pointOnWall, wallBand, wallDir, wallLength, wallNormal, wallsParallel,
} from "../geometry/wall.js";
import { floorSlabOf, getLevel, getWall, levelAbove } from "../model.js";
import type { Point, Polygon, Project } from "../types.js";
import { add, dot, rotate, scale, sub } from "../geometry/vec.js";
import type { Finding } from "./finding.js";
import type { RuleDef } from "./rules.js";

export function geo01(p: Project): Finding[] {
  const out: Finding[] = [];
  for (const o of p.openings) {
    const w = getWall(p, o.wall);
    if (!w) continue;
    const len = Math.round(wallLength(w));
    if (o.offset < 0 || o.offset + o.width > len) {
      out.push({ entities: [o.id, w.id], values: { opening: o.id, wall: w.id, width: o.width, offset: o.offset, len } });
    }
  }
  return out;
}

export function geo02(p: Project): Finding[] {
  const out: Finding[] = [];
  const byWall = new Map<string, typeof p.openings>();
  for (const o of p.openings) {
    const list = byWall.get(o.wall) ?? [];
    list.push(o);
    byWall.set(o.wall, list);
  }
  for (const [wallId, list] of byWall) {
    const sorted = [...list].sort((a, b) => a.offset - b.offset);
    for (let i = 0; i + 1 < sorted.length; i++) {
      const a = sorted[i]!;
      const b = sorted[i + 1]!;
      const [, aEnd] = openingSpan(a);
      if (b.offset < aEnd) {
        out.push({ entities: [a.id, b.id, wallId], values: { a: a.id, b: b.id, wall: wallId, overlap: Math.round(aEnd - b.offset) } });
      }
    }
  }
  return out;
}

export function geo03(p: Project): Finding[] {
  const out: Finding[] = [];
  for (let i = 0; i < p.walls.length; i++) {
    for (let j = i + 1; j < p.walls.length; j++) {
      const a = p.walls[i]!;
      const b = p.walls[j]!;
      if (a.level !== b.level || !wallsParallel(a, b)) continue;
      const n = wallNormal(a);
      const dist = Math.abs(dot(sub(b.from, a.from), n));
      const minDist = (a.thickness + b.thickness) / 2;
      if (dist >= minDist - 0.5) continue;
      // chồng dọc > 10mm mới tính (chạm đầu mút cho phép)
      const u = wallDir(a);
      const la = wallLength(a);
      const s1 = dot(sub(b.from, a.from), u);
      const s2 = dot(sub(b.to, a.from), u);
      const overlap = Math.min(la, Math.max(s1, s2)) - Math.max(0, Math.min(s1, s2));
      if (overlap > 10) {
        out.push({ entities: [a.id, b.id], values: { a: a.id, b: b.id, dist: Math.round(dist), minDist: Math.round(minDist) } });
      }
    }
  }
  return out;
}

export function geo04(p: Project, def: RuleDef): Finding[] {
  const tol = def.params?.tolerance ?? 10;
  const out: Finding[] = [];
  const items = p.furniture
    .map((f) => ({ f, asset: getAsset(f.asset) }))
    .filter((x) => x.asset)
    .map((x) => ({ f: x.f, corners: obbCorners(furnitureObb(x.f, x.asset!)) }));

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i]!;
      const b = items[j]!;
      if (a.f.level !== b.f.level) continue;
      if ((a.f.elevation ?? 0) >= 1000 !== (b.f.elevation ?? 0) >= 1000) continue; // đồ treo vs đồ sàn
      const depth = convexOverlapDepth(a.corners, b.corners);
      if (depth > tol) {
        out.push({ entities: [a.f.id, b.f.id], values: { a: a.f.id, b: b.f.id, depth: Math.round(depth) } });
      }
    }
  }
  for (const { f, corners } of items) {
    for (const w of p.walls) {
      if (w.level !== f.level) continue;
      const depth = convexOverlapDepth(corners, wallBand(w));
      if (depth > tol) {
        out.push({ entities: [f.id, w.id], values: { a: f.id, b: `tường ${w.id}`, depth: Math.round(depth) } });
      }
    }
  }
  return out;
}

export function geo05(p: Project): Finding[] {
  const out: Finding[] = [];
  const check = (poly: Polygon, entity: string) => {
    if (!isSimplePolygon(poly)) out.push({ entities: [entity], values: { entity } });
  };
  check(p.site.boundary, "site");
  for (const r of p.rooms) check(r.polygon, r.id);
  for (const s of p.slabs) {
    check(s.outline, s.id);
    (s.holes ?? []).forEach((h, i) => check(h, `${s.id}:hole${i + 1}`));
  }
  return out;
}

/** Quarter-disc cánh cửa quét — polygon lồi xấp xỉ mỗi 15°. */
function swingDiscs(p: Project, o: (typeof p.openings)[number]): Polygon[] {
  const w = getWall(p, o.wall);
  if (!w || o.kind !== "door" || !o.swing || o.swing === "slide" || o.swing === "none") return [];
  const style = p.styles.openings[o.style];
  const leaves = style?.leaf === "2-canh" ? 2 : 1;
  if (style?.leaf === "truot" || style?.leaf === "xep") return [];
  const side = o.swing.startsWith("in") ? 1 : -1;
  const n = scale(wallNormal(w), side);
  const jambL = pointOnWall(w, o.offset);
  const jambR = pointOnWall(w, o.offset + o.width);

  const disc = (hinge: Point, other: Point, r: number): Polygon => {
    const v0 = scale(sub(other, hinge), r / Math.hypot(...sub(other, hinge)));
    const poly: Polygon = [hinge];
    // góc quay từ v0 về phía n (0..90°); dấu quay = dấu cross(v0, n)
    const sign = Math.sign(v0[0] * n[1] - v0[1] * n[0]) || 1;
    for (let a = 0; a <= 90; a += 15) poly.push(add(hinge, rotate(v0, sign * a)));
    return poly;
  };

  if (leaves === 2) {
    return [disc(jambL, jambR, o.width / 2), disc(jambR, jambL, o.width / 2)];
  }
  const hingeAtL = o.swing.endsWith("-L");
  return [hingeAtL ? disc(jambL, jambR, o.width) : disc(jambR, jambL, o.width)];
}

export function geo06(p: Project, def: RuleDef): Finding[] {
  const tol = def.params?.tolerance ?? 10;
  const out: Finding[] = [];
  for (const o of p.openings) {
    const w = getWall(p, o.wall);
    if (!w) continue;
    const discs = swingDiscs(p, o);
    if (discs.length === 0) continue;
    const obstacles: Array<{ id: string; label: string; poly: Polygon }> = [];
    for (const other of p.walls) {
      if (other.level !== w.level || other.id === w.id) continue;
      obstacles.push({ id: other.id, label: `tường ${other.id}`, poly: wallBand(other) });
    }
    for (const f of p.furniture) {
      if (f.level !== w.level || (f.elevation ?? 0) >= 1000) continue;
      const asset = getAsset(f.asset);
      if (!asset) continue;
      obstacles.push({ id: f.id, label: `${asset.label} ${f.id}`, poly: obbCorners(furnitureObb(f, asset)) });
    }
    const hit = new Set<string>();
    for (const disc of discs) {
      for (const ob of obstacles) {
        if (hit.has(ob.id)) continue;
        if (convexOverlapDepth(disc, ob.poly) > tol) {
          hit.add(ob.id);
          out.push({ entities: [o.id, ob.id], values: { opening: o.id, obstacle: ob.label } });
        }
      }
    }
  }
  return out;
}

export function geo07(p: Project): Finding[] {
  const out: Finding[] = [];
  for (const st of p.stairs) {
    const level = getLevel(p, st.level);
    const above = level ? levelAbove(p, st.level) : undefined;
    if (!level || !above) continue;
    const slab = floorSlabOf(p, above.id);
    if (!slab) continue;
    const layout = stairLayout(st, level);
    const exposed: Polygon[] = [layout.flights[layout.flights.length - 1]!.rect];
    if (layout.landing) exposed.push(layout.landing);
    const holes = slab.holes ?? [];
    const ok = exposed.every((part) => holes.some((h) => polygonInsidePolygon(part, h)));
    if (!ok) {
      out.push({ entities: [st.id, slab.id], values: { stair: st.id, slab: slab.id } });
    }
  }
  return out;
}

export function geo08(p: Project): Finding[] {
  const out: Finding[] = [];
  const boundary = p.site.boundary;
  for (const w of p.walls) {
    const band = wallBand(w);
    const inside = band.every((pt) => pointInPolygon(pt, boundary)) && polygonInsidePolygon(band, boundary);
    if (!inside) {
      out.push({ entities: [w.id], values: { wall: w.id, detail: "vượt ra ngoài ranh đất" } });
      continue;
    }
  }
  // khoảng lùi (chỉ với ranh chữ nhật thẳng trục — v1)
  const sb = p.brief.dat?.quy_hoach;
  const lui = sb?.khoang_lui_truoc ?? p.site.setbacks?.front ?? 0;
  if (lui > 0 && isAxisAlignedRect(boundary)) {
    const frontY = Math.min(...boundary.map((pt) => pt[1]));
    for (const w of p.walls) {
      const band = wallBand(w);
      if (band.some((pt) => pt[1] < frontY + lui - 0.5)) {
        out.push({
          entities: [w.id],
          severity: "warn",
          values: { wall: w.id, detail: `phạm khoảng lùi trước ${lui}mm khai trong brief` },
        });
      }
    }
  }
  return out;
}

function isAxisAlignedRect(poly: Polygon): boolean {
  if (poly.length !== 4) return false;
  for (let i = 0; i < 4; i++) {
    const a = poly[i]!;
    const b = poly[(i + 1) % 4]!;
    if (a[0] !== b[0] && a[1] !== b[1]) return false;
  }
  return true;
}
