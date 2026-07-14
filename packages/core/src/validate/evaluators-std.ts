import { getAsset } from "../catalog.js";
import { convexOverlapDepth, furnitureObb, obbCorners, type Obb } from "../geometry/obb.js";
import { area, areaM2, minPolygonWidth, pointInPolygon } from "../geometry/polygon.js";
// (area vẫn dùng cho STD-12)
import { stairLayout } from "../geometry/stair.js";
import { openingSidePoints, wallBand } from "../geometry/wall.js";
import { clearHeight, floorSlabOf, getLevel, getWall, levelAbove, levelsSorted, roomsAdjacent, roomsAtPoint, roomsOfLevel } from "../model.js";
import type { Point, Polygon, Project, Room } from "../types.js";
import { add, rotate } from "../geometry/vec.js";
import type { Finding } from "./finding.js";
import type { RuleDef } from "./rules.js";

const round1 = (v: number): number => Math.round(v * 10) / 10;

export function std01(p: Project, def: RuleDef): Finding[] {
  const prm = def.params!;
  const out: Finding[] = [];

  // TCVN 13967:2024 Bảng 1 — phòng ngủ phân loại theo giường đang kê trong phòng
  const hasDoubleBed = (r: Room): boolean =>
    p.furniture.some((f) => {
      if (f.level !== r.level) return false;
      const asset = getAsset(f.asset);
      return asset?.category === "giuong" && asset.footprint.w >= 1400 && pointInPolygon(f.at, r.polygon);
    });

  for (const r of p.rooms.filter((x) => x.use === "ngu")) {
    const doi = hasDoubleBed(r);
    const min = doi ? prm.ngu_doi! : prm.ngu_don!;
    const a = areaM2(r.polygon);
    if (a < min) {
      out.push({ entities: [r.id], values: { ten: r.name, room: r.id, area: a, min, loai: doi ? "ngủ giường đôi" : "ngủ giường đơn" } });
    }
  }
  const simple: Array<[Room["use"], number, string]> = [
    ["bep-an", prm.bep_an!, "bếp + ăn"],
    ["wc", prm.wc!, "vệ sinh"],
    ["khach", prm.khach!, "tiếp khách"],
    ["kho", prm.kho!, "chứa đồ"],
  ];
  for (const [use, min, loai] of simple) {
    for (const r of p.rooms.filter((x) => x.use === use)) {
      const a = areaM2(r.polygon);
      if (a < min) {
        out.push({ entities: [r.id], values: { ten: r.name, room: r.id, area: a, min, loai } });
      }
    }
  }
  return out;
}

const PHONG_O = new Set<Room["use"]>(["khach", "ngu", "bep-an", "lam-viec"]);

export function std02(p: Project, def: RuleDef): Finding[] {
  const min = def.params!.min!;
  const out: Finding[] = [];
  for (const r of p.rooms) {
    if (!PHONG_O.has(r.use)) continue;
    const w = Math.round(minPolygonWidth(r.polygon));
    if (w < min) out.push({ entities: [r.id], values: { ten: r.name, room: r.id, width: w, min } });
  }
  return out;
}

export function std03(p: Project, def: RuleDef): Finding[] {
  const out: Finding[] = [];
  const O = new Set<Room["use"]>(["khach", "ngu", "lam-viec", "tho"]);
  for (const r of p.rooms) {
    const min = O.has(r.use)
      ? def.params!.phong_o!
      : r.use === "bep-an"
        ? def.params!.bep_an!
        : r.use === "wc"
          ? def.params!.wc!
          : r.use === "kho"
            ? def.params!.kho!
            : null;
    if (min == null) continue;
    const clear = Math.round(clearHeight(p, r.level));
    if (clear > 0 && clear < min) {
      out.push({ entities: [r.id, r.level], values: { ten: r.name, room: r.id, level: getLevel(p, r.level)?.name ?? r.level, clear, min } });
    }
  }
  return out;
}

export function std04(p: Project, def: RuleDef): Finding[] {
  const min = def.params!.min!;
  const out: Finding[] = [];
  for (const r of p.rooms.filter((x) => x.use === "hanh-lang")) {
    const w = Math.round(minPolygonWidth(r.polygon));
    if (w < min) out.push({ entities: [r.id], values: { ten: r.name, room: r.id, width: w, min } });
  }
  return out;
}

/**
 * Điểm "ngoài trời" (P7/P9): ngoài ranh đất (hẻm/đường), HOẶC trong lô nhưng
 * không thuộc phòng nào và ngoài sàn (sân/vườn của nhà lùi ranh). Dùng chung
 * cho STD-05 (phân loại cửa chính) và STD-09 (lấy sáng).
 */
function isOutdoorPoint(p: Project, levelId: string, pt: Point): boolean {
  if (!pointInPolygon(pt, p.site.boundary)) return true;
  if (roomsAtPoint(p, levelId, pt).length > 0) return false;
  const slab = floorSlabOf(p, levelId);
  return !slab || !pointInPolygon(pt, slab.outline);
}

export function std05(p: Project, def: RuleDef): Finding[] {
  const prm = def.params!;
  const out: Finding[] = [];
  for (const o of p.openings) {
    if (o.kind !== "door") continue;
    const w = getWall(p, o.wall);
    if (!w) continue;
    const [pa, pb] = openingSidePoints(w, o);
    const roomsA = roomsAtPoint(p, w.level, pa);
    const roomsB = roomsAtPoint(p, w.level, pb);
    const isWc = [...roomsA, ...roomsB].some((r) => r.use === "wc");
    const isExterior = isOutdoorPoint(p, w.level, pa) || isOutdoorPoint(p, w.level, pb);
    const [min, loai] = isWc
      ? [prm.wc!, "cửa WC"]
      : isExterior
        ? [prm.chinh!, "cửa chính"]
        : [prm.phong!, "cửa phòng"];
    if (o.width < min) {
      out.push({ entities: [o.id, w.id], values: { opening: o.id, width: o.width, min, loai } });
    } else if (!isWc && isExterior && o.width < prm.chinh_khuyen!) {
      out.push({
        entities: [o.id, w.id],
        severity: "info",
        values: { opening: o.id, width: o.width, min: prm.chinh_khuyen!, loai: "cửa chính — mức khuyến nghị" },
      });
    }
  }
  return out;
}

export function std06(p: Project, def: RuleDef): Finding[] {
  const prm = def.params!;
  const out: Finding[] = [];
  for (const st of p.stairs) {
    const level = getLevel(p, st.level);
    if (!level) continue;
    const { riser } = stairLayout(st, level);
    const push = (detail: string, severity?: Finding["severity"]) =>
      out.push({ entities: [st.id], values: { stair: st.id, detail }, ...(severity ? { severity } : {}) });

    if (riser < prm.riser_min! || riser > prm.riser_max!) {
      push(`cao bậc ${round1(riser)}mm ngoài khoảng ${prm.riser_min}–${prm.riser_max}mm (height ${level.height} / ${st.steps} bậc)`);
    } else if (riser > prm.riser_khuyen!) {
      push(`cao bậc ${round1(riser)}mm > ${prm.riser_khuyen}mm — 13967 khuyến khích ≤${prm.riser_khuyen}mm`, "warn");
    }
    if (st.tread < prm.tread_min!) push(`mặt bậc ${st.tread}mm < ${prm.tread_min}mm`);
    if (st.width < prm.ve_min!) {
      push(`vế rộng ${st.width}mm < ${prm.ve_min}mm`);
    } else if (st.width < prm.ve_khuyen!) {
      push(`vế rộng ${st.width}mm < ${prm.ve_khuyen}mm (mức thang thoát nạn nhà liên kế — TCVN 9411)`, "warn");
    }
    if (st.landing != null && st.landing < st.width) {
      push(`chiếu nghỉ ${st.landing}mm < bề rộng vế ${st.width}mm`);
    }
    const buoc = 2 * riser + st.tread;
    if (buoc < prm.buoc_min! || buoc > prm.buoc_max!) {
      push(`nhịp bước 2×riser+tread = ${round1(buoc)}mm ngoài ${prm.buoc_min}–${prm.buoc_max}mm`);
    }
  }
  return out;
}

export function std08(p: Project, def: RuleDef): Finding[] {
  const min = def.params!.sill_min!;
  const out: Finding[] = [];
  for (const o of p.openings) {
    if (o.kind !== "window" || o.sill >= min) continue;
    const w = getWall(p, o.wall);
    const level = w && getLevel(p, w.level);
    if (!level || level.elevation <= 0) continue;
    out.push({ entities: [o.id], values: { opening: o.id, sill: o.sill, min, level: level.name } });
  }
  return out;
}

export function std09(p: Project): Finding[] {
  const out: Finding[] = [];
  const WARN = new Set<Room["use"]>(["ngu", "khach"]);
  const INFO = new Set<Room["use"]>(["bep-an", "lam-viec", "tho"]);
  for (const room of p.rooms) {
    if (!WARN.has(room.use) && !INFO.has(room.use)) continue;
    if (roomHasNaturalLight(p, room)) continue;
    out.push({
      entities: [room.id],
      values: { ten: room.name, room: room.id },
      ...(INFO.has(room.use) ? { severity: "info" as const } : {}),
    });
  }
  return out;
}

function roomHasNaturalLight(p: Project, room: Room): boolean {
  // (a) có cửa sổ mở ra ngoài trời hoặc giếng trời
  for (const o of p.openings) {
    if (o.kind !== "window") continue;
    const w = getWall(p, o.wall);
    if (!w || w.level !== room.level) continue;
    const [pa, pb] = openingSidePoints(w, o);
    const aIn = pointInPolygon(pa, room.polygon);
    const bIn = pointInPolygon(pb, room.polygon);
    if (!aIn && !bIn) continue;
    const other = aIn ? pb : pa;
    if (isOutdoorPoint(p, room.level, other)) return true; // hẻm/đường hoặc sân trong lô
    if (roomsAtPoint(p, room.level, other).some((r) => r.use === "gieng-troi")) return true;
  }
  // (b) mở thông sang giếng trời (chạm cạnh thật sự, không qua tường)
  const sameLevel = roomsOfLevel(p, room.level);
  for (const gt of sameLevel.filter((r) => r.use === "gieng-troi")) {
    if (roomsAdjacent(room, gt, 30)) return true;
  }
  // (c) kề ô thang thông tầng (lỗ sàn tầng trên trùm ô thang)
  const above = levelAbove(p, room.level);
  if (above) {
    const slab = floorSlabOf(p, above.id);
    const holes = slab?.holes ?? [];
    for (const ct of sameLevel.filter((r) => r.use === "cau-thang")) {
      if (!roomsAdjacent(room, ct, 30)) continue;
      if (holes.some((h) => pointInPolygon(centroid(h), ct.polygon))) return true;
    }
  }
  return false;
}

function centroid(poly: Polygon): [number, number] {
  let x = 0, y = 0;
  for (const pt of poly) { x += pt[0]; y += pt[1]; }
  return [x / poly.length, y / poly.length];
}

export function std10(p: Project): Finding[] {
  const out: Finding[] = [];
  for (const o of p.openings) {
    if (o.kind !== "door") continue;
    const w = getWall(p, o.wall);
    if (!w) continue;
    const [pa, pb] = openingSidePoints(w, o);
    const roomsA = roomsAtPoint(p, w.level, pa);
    const roomsB = roomsAtPoint(p, w.level, pb);
    const wcSide = roomsA.some((r) => r.use === "wc") ? "A" : roomsB.some((r) => r.use === "wc") ? "B" : null;
    if (!wcSide) continue;
    const otherRooms = wcSide === "A" ? roomsB : roomsA;
    const bep = otherRooms.find((r) => r.use === "bep-an");
    if (bep) out.push({ entities: [o.id, bep.id], values: { opening: o.id, room: bep.name } });
  }
  return out;
}

export function std11(p: Project, def: RuleDef): Finding[] {
  const prm = def.params!;
  const out: Finding[] = [];
  const floorItems = p.furniture
    .filter((f) => (f.elevation ?? 0) < 1000)
    .map((f) => ({ f, asset: getAsset(f.asset) }))
    .filter((x) => x.asset);

  const blocked = (strip: Obb, levelId: string, selfId: string): boolean => {
    const corners = obbCorners(strip);
    for (const w of p.walls) {
      if (w.level === levelId && convexOverlapDepth(corners, wallBand(w)) > 10) return true;
    }
    for (const { f, asset } of floorItems) {
      if (f.id === selfId || f.level !== levelId) continue;
      if (convexOverlapDepth(corners, obbCorners(furnitureObb(f, asset!))) > 10) return true;
    }
    return false;
  };

  for (const { f, asset } of floorItems) {
    const half = { w: asset!.footprint.w / 2, d: asset!.footprint.d / 2 };
    if (asset!.category === "giuong") {
      const gap = prm.giuong!;
      const sideStrip = (sign: 1 | -1): Obb => ({
        center: add(f.at, rotate([sign * (half.w + gap / 2), 0], f.rotation)),
        halfW: gap / 2,
        halfD: half.d * 0.8,
        rotation: f.rotation,
      });
      if (blocked(sideStrip(1), f.level, f.id) && blocked(sideStrip(-1), f.level, f.id)) {
        out.push({ entities: [f.id], values: { item: `Giường ${f.id}`, detail: `cả hai bên hông đều không còn lối ≥ ${gap}mm` } });
      }
    }
    if (asset!.category === "tu-bep-duoi") {
      const gap = prm.bep_truoc!;
      const strip: Obb = {
        center: add(f.at, rotate([0, half.d + gap / 2], f.rotation)),
        halfW: half.w * 0.9,
        halfD: gap / 2,
        rotation: f.rotation,
      };
      if (blocked(strip, f.level, f.id)) {
        out.push({ entities: [f.id], severity: "warn", values: { item: `Tủ bếp ${f.id}`, detail: `khoảng trống trước mặt bếp < ${gap}mm` } });
      }
    }
    if (asset!.category === "bon-cau") {
      const gap = prm.bon_cau_truoc!;
      const strip: Obb = {
        center: add(f.at, rotate([0, half.d + gap / 2], f.rotation)),
        halfW: half.w * 0.9,
        halfD: gap / 2,
        rotation: f.rotation,
      };
      if (blocked(strip, f.level, f.id)) {
        out.push({ entities: [f.id], values: { item: `Bồn cầu ${f.id}`, detail: `khoảng trống trước bồn cầu < ${gap}mm` } });
      }
    }
  }
  return out;
}

export function std12(p: Project): Finding[] {
  const out: Finding[] = [];
  const qh = p.brief.dat?.quy_hoach;
  if (!qh) return out;
  if (qh.tang_max != null && p.levels.length > qh.tang_max) {
    out.push({
      entities: p.levels.map((l) => l.id),
      values: { detail: `số tầng ${p.levels.length} > tối đa ${qh.tang_max}` },
    });
  }
  if (qh.mat_do_max != null) {
    const lowest = levelsSorted(p)[0];
    const slab = lowest && floorSlabOf(p, lowest.id);
    if (slab) {
      const pct = Math.round((area(slab.outline) / area(p.site.boundary)) * 100);
      if (pct > qh.mat_do_max) {
        out.push({ entities: [slab.id], values: { detail: `mật độ xây dựng ${pct}% > tối đa ${qh.mat_do_max}%` } });
      }
    }
  }
  return out;
}
