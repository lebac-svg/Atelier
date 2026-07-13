import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadNhaOng4x16 } from "@atelier/core";
import { renderPlanSvg } from "../render/render.js";
import { detectWalls } from "./detect.js";
import { parseDxf, placePoint } from "./dxf.js";
import { imageSize } from "./image-size.js";
import { loadUnderlay } from "./underlay.js";

/** DXF tối thiểu nhưng đủ mặt entity: header $INSUNITS mm + 5 loại nét + INSERT bị bỏ. */
const DXF = [
  "0", "SECTION", "2", "HEADER",
  "9", "$INSUNITS", "70", "4",
  "0", "ENDSEC",
  "0", "SECTION", "2", "ENTITIES",
  "0", "LINE", "8", "TUONG", "10", "0", "20", "0", "11", "4000", "21", "0",
  "0", "LWPOLYLINE", "8", "TUONG", "90", "4", "70", "1",
  "10", "0", "20", "0", "10", "4000", "20", "0", "10", "4000", "20", "3000", "10", "0", "20", "3000",
  "0", "CIRCLE", "8", "COT", "10", "1000", "20", "1000", "40", "150",
  "0", "ARC", "8", "COT", "10", "2000", "20", "2000", "40", "300", "50", "0", "51", "90",
  "0", "POLYLINE", "8", "TUONG", "66", "1", "70", "0",
  "0", "VERTEX", "8", "TUONG", "10", "100", "20", "100",
  "0", "VERTEX", "8", "TUONG", "10", "200", "20", "100",
  "0", "SEQEND",
  "0", "INSERT", "8", "BLOCKS", "2", "CHAIR", "10", "500", "20", "500",
  "0", "ENDSEC",
  "0", "EOF",
].join("\n");

// PNG 1×1 hợp lệ (trắng) — đủ cho imageSize + data URI
const PNG_1PX = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

describe("parseDxf — đọc nét + đơn vị", () => {
  const d = parseDxf(DXF);

  it("đọc đủ 5 loại entity, POLYLINE bỏ base point giả, LWPOLYLINE closed khép vòng", () => {
    expect(d.counts).toEqual({ LINE: 1, LWPOLYLINE: 1, CIRCLE: 1, ARC: 1, POLYLINE: 1 });
    expect(d.polylines).toHaveLength(5);
    const lw = d.polylines[1]!;
    expect(lw).toHaveLength(5); // 4 đỉnh + điểm khép
    expect(lw[0]).toEqual(lw[4]);
    const pl = d.polylines[4]!;
    expect(pl).toEqual([[100, 100], [200, 100]]); // KHÔNG dính (0,0) của POLYLINE
  });

  it("INSERT bị bỏ nhưng ĐƯỢC ĐẾM để báo người dùng; $INSUNITS=4 → 1mm/unit", () => {
    expect(d.skipped).toEqual({ INSERT: 1 });
    expect(d.insunits).toBe(4);
    expect(d.mmPerUnit).toBe(1);
  });

  it("bounds phủ mọi nét; ARC xấp xỉ đúng phần tư cung", () => {
    expect(d.bounds).toMatchObject({ minX: 0, minY: 0, maxX: 4000, maxY: 3000 });
    const arc = d.polylines[3]!;
    expect(arc[0]![0]).toBeCloseTo(2300, 0); // 0° → (cx+r, cy)
    expect(arc[arc.length - 1]![1]).toBeCloseTo(2300, 0); // 90° → (cx, cy+r)
  });

  it("placePoint: scale → xoay CCW → tịnh tiến", () => {
    expect(placePoint([100, 0], [1000, 2000], 2, 0)).toEqual([1200, 2000]);
    const r = placePoint([100, 0], [0, 0], 1, 90);
    expect(r[0]).toBeCloseTo(0, 6);
    expect(r[1]).toBeCloseTo(100, 6);
  });
});

describe("imageSize — header PNG/JPEG thuần", () => {
  it("PNG 1×1 đọc đúng; rác thì báo lỗi rõ", () => {
    expect(imageSize(PNG_1PX)).toEqual({ width: 1, height: 1, mime: "image/png" });
    expect(() => imageSize(Buffer.from("not an image at all, really"))).toThrow(/PNG\/JPEG/);
  });

  it("JPEG đọc kích thước từ SOF0", () => {
    // JPEG tổng hợp: SOI + APP0 rỗng + SOF0 640×480
    const jpg = Buffer.from([
      0xff, 0xd8, // SOI
      0xff, 0xe0, 0x00, 0x04, 0x00, 0x00, // APP0 len 4
      0xff, 0xc0, 0x00, 0x0b, 0x08, 0x01, 0xe0, 0x02, 0x80, 0x01, 0x01, 0x11, 0x00, // SOF0: h=480 w=640
    ]);
    expect(imageSize(jpg)).toEqual({ width: 640, height: 480, mime: "image/jpeg" });
  });
});

describe("detectWalls — cặp nét song song thành tường tim", () => {
  it("gap 110 thành tường dày 110; gap 500 không phải tường; nét vụn được gộp", () => {
    const walls = detectWalls([
      [[0, 0], [2000, 0]], [[2010, 0], [4000, 0]], // nét dưới bị cắt vụn (gap 10 < tol)
      [[0, 110], [4000, 110]],
      [[0, 0], [0, 3000]], [[110, 0], [110, 3000]],
      [[0, 2500], [4000, 2500]], [[0, 3000], [4000, 3000]], // gap 500 — không phải tường
    ]);
    expect(walls).toHaveLength(2);
    const h = walls.find((w) => w.from[1] === w.to[1])!;
    expect(h.thickness).toBe(110);
    expect(h.from[1]).toBe(55); // đường tim
    expect(h.to[0] - h.from[0]).toBe(4000);
    const v = walls.find((w) => w.from[0] === w.to[0])!;
    expect(v.from[0]).toBe(55);
  });

  it("chồng lấp dưới minOverlap bị loại", () => {
    const walls = detectWalls(
      [[[0, 0], [500, 0]], [[0, 110], [500, 110]]],
      { minOverlap: 600 },
    );
    expect(walls).toHaveLength(0);
  });
});

describe("loadUnderlay + render — nền mờ dưới mặt bằng", () => {
  const makeDir = (): string => {
    const dir = mkdtempSync(path.join(tmpdir(), "atelier-underlay-"));
    mkdirSync(path.join(dir, ".atelier", "underlay"), { recursive: true });
    return dir;
  };

  it("DXF: polyline đặt đúng scale/origin, SVG có layer UNDERLAY nét xanh mờ, bộ tờ KHÔNG có", () => {
    const dir = makeDir();
    writeFileSync(path.join(dir, ".atelier", "underlay", "cu.dxf"), DXF, "utf8");
    const p = loadNhaOng4x16();
    p.underlay = { id: "U1", kind: "dxf", source: "cu.dxf", origin: [0, 0], scale: 1, opacity: 0.4 };

    const u = loadUnderlay(p, dir);
    expect(u).not.toBeNull();
    expect(u!.polylines).toHaveLength(5);

    const withU = renderPlanSvg(p, "L1", { underlay: u!, embedFont: false }).svg;
    expect(withU).toContain('data-layer="UNDERLAY"');
    expect(withU).toContain("#3a6ea5");
    expect(withU).toContain('opacity="0.4"');
    // không truyền underlay (đường đi của bộ tờ hồ sơ) → không có lớp nền
    const without = renderPlanSvg(p, "L1", { embedFont: false }).svg;
    expect(without).not.toContain('data-layer="UNDERLAY"');
  });

  it("underlay khóa theo tầng chỉ hiện ở tầng đó", () => {
    const dir = makeDir();
    writeFileSync(path.join(dir, ".atelier", "underlay", "cu.dxf"), DXF, "utf8");
    const p = loadNhaOng4x16();
    p.underlay = { id: "U1", kind: "dxf", source: "cu.dxf", origin: [0, 0], scale: 1, level: "L1" };
    const u = loadUnderlay(p, dir)!;
    expect(renderPlanSvg(p, "L1", { underlay: u, embedFont: false }).svg).toContain('data-layer="UNDERLAY"');
    expect(renderPlanSvg(p, "L2", { underlay: u, embedFont: false }).svg).not.toContain('data-layer="UNDERLAY"');
  });

  it("ảnh PNG: nhúng data URI + đặt theo mm/pixel; file mất → null (render không gãy)", () => {
    const dir = makeDir();
    writeFileSync(path.join(dir, ".atelier", "underlay", "anh.png"), PNG_1PX);
    const p = loadNhaOng4x16();
    p.underlay = { id: "U1", kind: "image", source: "anh.png", origin: [0, 0], scale: 4000 };
    const u = loadUnderlay(p, dir);
    expect(u?.image?.href.startsWith("data:image/png;base64,")).toBe(true);
    const svg = renderPlanSvg(p, "L1", { underlay: u!, embedFont: false }).svg;
    expect(svg).toContain("<image");
    expect(svg).toContain("preserveAspectRatio");

    p.underlay = { id: "U1", kind: "image", source: "khong-co.png", origin: [0, 0], scale: 1 };
    expect(loadUnderlay(p, dir)).toBeNull();
  });
});
