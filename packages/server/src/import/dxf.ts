import type { Point, Polygon } from "@atelier/core";

/**
 * Đọc DXF (ASCII, mọi bản AC10xx) thành polyline thuần — nuôi underlay đồ lại
 * + heuristic dò tường (doc 10 backlog "import DXF/ảnh mặt bằng cũ").
 * v1 đọc: LINE, LWPOLYLINE, POLYLINE/VERTEX, CIRCLE, ARC (xấp xỉ đa giác).
 * BỎ QUA: INSERT/block, SPLINE, HATCH, TEXT — đếm lại trong `skipped` để
 * Claude báo người dùng biết phần nào của bản vẽ không hiện.
 * Tọa độ GIỮ NGUYÊN đơn vị nguồn (y+ lên, như model) — phép đặt scale/origin
 * do Underlay quyết định.
 */

export type DxfDrawing = {
  /** Mỗi phần tử một polyline (LINE = 2 điểm); closed giữ ở chỗ điểm cuối = điểm đầu. */
  polylines: Polygon[];
  /** $INSUNITS của HEADER: 0 không khai, 1 inch, 4 mm, 5 cm, 6 m… */
  insunits: number;
  /** mm trên MỘT đơn vị nguồn suy từ $INSUNITS — null nếu không khai/không biết. */
  mmPerUnit: number | null;
  bounds: { minX: number; minY: number; maxX: number; maxY: number } | null;
  /** entity đã đọc theo loại. */
  counts: Record<string, number>;
  /** entity gặp nhưng KHÔNG đọc (INSERT, SPLINE…) theo loại. */
  skipped: Record<string, number>;
};

const INSUNITS_MM: Record<number, number> = { 1: 25.4, 2: 304.8, 4: 1, 5: 10, 6: 1000 };

const ARC_SEGS = 24; // cung tròn xấp xỉ 24 cạnh/vòng — đủ mượt cho underlay mờ

type Pair = { code: number; value: string };

function* pairs(text: string): Generator<Pair> {
  const lines = text.split(/\r\n|\r|\n/);
  for (let i = 0; i + 1 < lines.length; i += 2) {
    const code = Number.parseInt(lines[i]!.trim(), 10);
    if (Number.isNaN(code)) continue;
    yield { code, value: lines[i + 1]!.trim() };
  }
}

export function parseDxf(text: string): DxfDrawing {
  const polylines: Polygon[] = [];
  const counts: Record<string, number> = {};
  const skipped: Record<string, number> = {};
  let insunits = 0;

  let section = "";
  let entity = "";
  // buffer chung cho entity đang đọc
  let xs: number[] = [];
  let ys: number[] = [];
  let flags70 = 0;
  let cx = 0;
  let cy = 0;
  let r = 0;
  let a0 = 0;
  let a1 = 360;
  let x2 = 0;
  let y2 = 0;
  let awaitingInsunits = false;
  let inPolylineBlock = false; // POLYLINE…SEQEND (VERTEX là entity con)
  let inVertex = false; // POLYLINE có base point 10/20 giả (luôn 0) — chỉ nhận điểm từ VERTEX
  let seen70 = false; // VERTEX cũng mang code 70 — chỉ giữ cờ 70 ĐẦU TIÊN (của polyline)

  const arcPts = (full: boolean): Polygon => {
    let sweep = a1 - a0;
    if (sweep <= 0) sweep += 360; // ARC trong DXF luôn CCW
    if (full) sweep = 360;
    const n = Math.max(2, Math.ceil((ARC_SEGS * Math.abs(sweep)) / 360));
    const pts: Polygon = [];
    for (let i = 0; i <= n; i++) {
      const a = ((a0 + (sweep * i) / n) * Math.PI) / 180;
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return pts;
  };

  const flush = (): void => {
    if (!entity) return;
    switch (entity) {
      case "LINE":
        if (xs.length > 0) {
          polylines.push([[xs[0]!, ys[0] ?? 0], [x2, y2]]);
          counts.LINE = (counts.LINE ?? 0) + 1;
        }
        break;
      case "LWPOLYLINE":
      case "POLYLINE": {
        if (xs.length >= 2) {
          const pts: Polygon = xs.map((x, i) => [x, ys[i] ?? 0]);
          if ((flags70 & 1) === 1) pts.push([pts[0]![0], pts[0]![1]]); // closed
          polylines.push(pts);
          counts[entity] = (counts[entity] ?? 0) + 1;
        }
        break;
      }
      case "CIRCLE":
        polylines.push(arcPts(true));
        counts.CIRCLE = (counts.CIRCLE ?? 0) + 1;
        break;
      case "ARC":
        polylines.push(arcPts(false));
        counts.ARC = (counts.ARC ?? 0) + 1;
        break;
      default:
        if (section === "ENTITIES" && !inPolylineBlock) {
          skipped[entity] = (skipped[entity] ?? 0) + 1;
        }
    }
    entity = "";
    xs = [];
    ys = [];
    flags70 = 0;
    seen70 = false;
    inVertex = false;
    r = 0;
    a0 = 0;
    a1 = 360;
  };

  for (const { code, value } of pairs(text)) {
    if (code === 9) {
      awaitingInsunits = value === "$INSUNITS";
      continue;
    }
    if (awaitingInsunits && code === 70) {
      insunits = Number.parseInt(value, 10) || 0;
      awaitingInsunits = false;
      continue;
    }
    if (code !== 0) {
      if (section !== "ENTITIES" || !entity) {
        if (code === 2 && value === "ENTITIES") section = "ENTITIES";
        continue;
      }
      switch (code) {
        case 10:
          if (entity === "CIRCLE" || entity === "ARC") cx = Number.parseFloat(value);
          else if (entity !== "POLYLINE" || inVertex) xs.push(Number.parseFloat(value));
          break;
        case 20:
          if (entity === "CIRCLE" || entity === "ARC") cy = Number.parseFloat(value);
          else if (entity !== "POLYLINE" || inVertex) ys.push(Number.parseFloat(value));
          break;
        case 11: x2 = Number.parseFloat(value); break;
        case 21: y2 = Number.parseFloat(value); break;
        case 40: r = Number.parseFloat(value); break;
        case 50: a0 = Number.parseFloat(value); break;
        case 51: a1 = Number.parseFloat(value); break;
        case 70:
          if (!seen70) {
            flags70 = Number.parseInt(value, 10) || 0;
            seen70 = true;
          }
          break;
        default:
      }
      continue;
    }
    // code === 0: entity/section mới
    if (value === "SECTION" || value === "ENDSEC" || value === "EOF") {
      flush();
      if (value !== "SECTION") section = "";
      continue;
    }
    if (section !== "ENTITIES") continue;
    if (value === "VERTEX" && inPolylineBlock) {
      inVertex = true; // điểm VERTEX dồn vào buffer POLYLINE
      continue;
    }
    if (value === "SEQEND") {
      inPolylineBlock = false;
      flush();
      continue;
    }
    if (!inPolylineBlock) flush();
    if (value === "POLYLINE") {
      inPolylineBlock = true;
      entity = "POLYLINE";
      continue;
    }
    if (!inPolylineBlock) entity = value;
  }
  flush();

  let bounds: DxfDrawing["bounds"] = null;
  for (const pl of polylines) {
    for (const [x, y] of pl) {
      if (!bounds) bounds = { minX: x, minY: y, maxX: x, maxY: y };
      else {
        bounds.minX = Math.min(bounds.minX, x);
        bounds.minY = Math.min(bounds.minY, y);
        bounds.maxX = Math.max(bounds.maxX, x);
        bounds.maxY = Math.max(bounds.maxY, y);
      }
    }
  }

  return { polylines, insunits, mmPerUnit: INSUNITS_MM[insunits] ?? null, bounds, counts, skipped };
}

/** Áp phép đặt underlay: nguồn → mm model (scale → xoay CCW → tịnh tiến). */
export function placePoint([x, y]: Point, origin: Point, scale: number, rotationDeg: number): Point {
  const a = (rotationDeg * Math.PI) / 180;
  const sx = x * scale;
  const sy = y * scale;
  return [
    origin[0] + sx * Math.cos(a) - sy * Math.sin(a),
    origin[1] + sx * Math.sin(a) + sy * Math.cos(a),
  ];
}
