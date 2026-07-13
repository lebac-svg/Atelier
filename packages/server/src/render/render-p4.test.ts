import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadNhaOng4x16 } from "@atelier/core";
import { buildElevationScene } from "./elevation-scene.js";
import { buildSectionScene, cutIntervals } from "./section-scene.js";
import { buildScheduleScene } from "./schedule-scene.js";
import { buildPlanScene, sectionCutX } from "./plan-scene.js";
import { sceneToDxf } from "./dxf-writer.js";
import { buildSheetSet, sheetDxf, sheetSvg } from "./sheets.js";
import { renderElevationSvg, renderScheduleSvg, renderSectionSvg } from "./render.js";

const p = loadNhaOng4x16();

describe("P4 — mặt đứng", () => {
  it("chiếu đúng mặt tiền: silhouette + cửa D1/S1/S3 + cao độ + trục", () => {
    const b = buildElevationScene(p);
    const ids = new Set(b.items.map((i) => i.dataId).filter(Boolean));
    expect(ids.has("D1")).toBe(true);
    expect(ids.has("S1")).toBe(true);
    expect(ids.has("S3")).toBe(true); // cửa sổ tầng 2 trên tường mặt tiền
    expect(ids.has("D2")).toBe(false); // cửa trong nhà không thuộc mặt đứng
    const texts = b.items.filter((i) => i.prim.kind === "text").map((i) => (i.prim as { text: string }).text);
    expect(texts).toContain("±0.000");
    expect(texts).toContain("+3.600");
    expect(texts).toContain("+7.000");
    expect(b.tf.rotated).toBe(false); // trục đứng là trọng lực — không bao giờ xoay
  });

  it("không có tường mặt tiền → lỗi chỉ đường site.front", () => {
    const empty = structuredClone(p);
    empty.walls = empty.walls.filter((w) => w.id !== "W1" && w.id !== "W9");
    expect(() => buildElevationScene(empty)).toThrow(/site\.front/);
  });

  it("golden SVG mặt đứng", async () => {
    const svg = renderElevationSvg(p, { embedFont: false, date: "13/07/2026" }).svg;
    await expect(svg).toMatchFileSnapshot("__snapshots__/mat-dung.svg");
  });
});

describe("P4 — mặt cắt A-A", () => {
  it("cutIntervals: chữ nhật và trừ lỗ", () => {
    const rect: Array<[number, number]> = [[0, 0], [4000, 0], [4000, 16000], [0, 16000]];
    expect(cutIntervals(rect, 2000)).toEqual([[0, 16000]]);
    expect(cutIntervals(rect, 5000)).toEqual([]);
  });

  it("vết cắt xuyên tâm vế 1 thang; sàn L2 hở đúng lỗ thang; có profile bậc", () => {
    const cutX = sectionCutX(p)!;
    expect(cutX).toBeGreaterThan(2830); // vế 1 của ST1 nằm x∈[2830,3780]
    expect(cutX).toBeLessThan(3780);

    const b = buildSectionScene(p);
    const stairItems = b.items.filter((i) => i.layer === "THANG");
    expect(stairItems.length).toBeGreaterThan(2); // 2 vế + bản thang

    // sàn L2 bị lỗ thang: phải có >= 2 dải sàn tại z quanh 3600
    const bands = b.items.filter(
      (i) => i.prim.kind === "polygon" && i.dataId === "SL2",
    );
    expect(bands.length).toBeGreaterThanOrEqual(2);
    // tường mặt tiền W1 cắt qua cửa D1 → 1 mảnh lanh tô (không kín từ 0)
    const w1 = b.items.filter((i) => i.dataId === "W1" && i.prim.kind === "polygon");
    expect(w1.length).toBe(1);
    const zs = (w1[0]!.prim as { pts: Array<[number, number]> }).pts.map((pt) => pt[1]);
    expect(Math.min(...zs)).toBeGreaterThan(2000); // chỉ còn lanh tô trên cửa cao 2360
  });

  it("model không thang → lỗi nêu quy ước", () => {
    const noStair = structuredClone(p);
    noStair.stairs = [];
    expect(() => buildSectionScene(noStair)).toThrow(/thang/);
  });

  it("golden SVG mặt cắt", async () => {
    const svg = renderSectionSvg(p, { embedFont: false, date: "13/07/2026" }).svg;
    await expect(svg).toMatchFileSnapshot("__snapshots__/mat-cat-a-a.svg");
  });
});

describe("P4 — bảng thống kê", () => {
  it("đủ số phòng + tổng diện tích + gộp nhóm cửa", () => {
    const b = buildScheduleScene(p);
    const texts = b.items.filter((i) => i.prim.kind === "text").map((i) => (i.prim as { text: string }).text);
    expect(texts.filter((t) => /^R\d+$/.test(t)).length).toBe(p.rooms.length);
    expect(texts).toContain("TỔNG DIỆN TÍCH PHÒNG");
    expect(texts).toContain("D2, D5"); // hai cửa WC cùng kích thước gộp một nhóm
    expect(texts).toContain(String(p.openings.length)); // tổng SL cửa
    // mọi item đều paper-space
    expect(b.items.every((i) => i.space === "paper")).toBe(true);
  });

  it("golden SVG thống kê", async () => {
    const svg = renderScheduleSvg(p, { embedFont: false, date: "13/07/2026" }).svg;
    await expect(svg).toMatchFileSnapshot("__snapshots__/thong-ke.svg");
  });
});

describe("P4 — DXF writer (ADR-08: TS thuần)", () => {
  const build = buildPlanScene(p, "L1");
  const dxf = sceneToDxf(build.items, { scale: build.tf.scale });

  it("cấu trúc DXF hợp lệ: header AC1021, layer TCVN, EOF", () => {
    expect(dxf.startsWith("0\nSECTION")).toBe(true);
    expect(dxf).toContain("$ACADVER");
    expect(dxf).toContain("AC1021");
    expect(dxf).toContain("TUONG-CAT");
    expect(dxf.trimEnd().endsWith("EOF")).toBe(true);
  });

  it("map 1-1 số lượng primitive model-space (doc 08: không bao giờ lệch SVG)", () => {
    const modelItems = build.items.filter((i) => i.space !== "paper");
    const count = (kind: string): number => modelItems.filter((i) => i.prim.kind === kind).length;
    // đếm ĐÚNG điểm bắt đầu entity (0\nTYPE) — "TEXT" còn xuất hiện làm tên layer ở group 8
    const occurs = (needle: string): number => dxf.split(`\n0\n${needle}\n`).length - 1;
    expect(occurs("LINE")).toBe(count("line"));
    expect(occurs("LWPOLYLINE")).toBe(count("polyline") + count("polygon"));
    expect(occurs("TEXT")).toBe(count("text"));
    expect(occurs("ARC")).toBe(count("arc"));
    // polygon có fill → kèm HATCH solid (poché tường cắt)
    const filled = modelItems.filter((i) => i.prim.kind === "polygon" && (i.prim as { fill?: string }).fill).length;
    expect(occurs("HATCH")).toBe(filled);
  });

  it("chữ tiếng Việt giữ nguyên UTF-8, cỡ chữ nhân tỷ lệ", () => {
    expect(dxf).toContain("PHÒNG KHÁCH");
    // tên phòng 3.5mm giấy × scale 50 = 175mm model
    expect(dxf).toContain(`\n40\n${3.5 * build.tf.scale}\n`);
    // paper-space (khung tên) không được lọt vào DXF
    expect(dxf).not.toContain("TỶ LỆ");
  });
});

describe("P4 — bộ tờ hồ sơ", () => {
  it("trọn bộ: KT-01..KT-05 đúng thứ tự pha E", () => {
    const set = buildSheetSet(p, { date: "13/07/2026" });
    expect(set.sheets.map((s) => `${s.no} ${s.id}`)).toEqual([
      "KT-01 plan-L1", "KT-02 plan-L2", "KT-03 elevation", "KT-04 section", "KT-05 schedule",
    ]);
    expect(set.skipped).toEqual([]);
    for (const s of set.sheets) expect(sheetSvg(s, false)).toContain(s.no);
  });

  it("lọc tờ vẫn giữ đúng số trong bộ; model không thang → section vào skipped", () => {
    const one = buildSheetSet(p, { sheets: ["section"] });
    expect(one.sheets).toHaveLength(1);
    expect(one.sheets[0]!.no).toBe("KT-04");

    const noStair = structuredClone(p);
    noStair.stairs = [];
    const set = buildSheetSet(noStair);
    expect(set.skipped.map((s) => s.id)).toContain("section");
    // thống kê dồn số lên thay chỗ mặt cắt
    expect(set.sheets.find((s) => s.id === "schedule")!.no).toBe("KT-04");
  });

  it("sheetDxf chỉ dành cho tờ có hình học model", () => {
    const set = buildSheetSet(p);
    const schedule = set.sheets.find((s) => s.id === "schedule")!;
    expect(schedule.hasModel).toBe(false);
    const plan = set.sheets.find((s) => s.id === "plan-L1")!;
    expect(sheetDxf(plan)).toContain("LWPOLYLINE");
  });
});

describe("P4 — PDF hồ sơ (Chromium print)", () => {
  it("gộp bộ tờ thành MỘT file PDF nhiều trang A3", async () => {
    const { svgsToPdf, closePdfRenderer } = await import("./pdf.js");
    const set = buildSheetSet(p, { date: "13/07/2026" });
    const out = path.join(mkdtempSync(path.join(tmpdir(), "atelier-pdf-")), "ho-so.pdf");
    try {
      await svgsToPdf(set.sheets.map((s) => sheetSvg(s)), out);
    } finally {
      await closePdfRenderer();
    }
    const buf = readFileSync(out);
    expect(buf.subarray(0, 5).toString()).toBe("%PDF-");
    expect(buf.length).toBeGreaterThan(50_000); // 5 trang có font nhúng
    // đếm trang qua marker /Type /Page (không /Pages)
    const pages = buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g)?.length ?? 0;
    expect(pages).toBe(5);
  }, 60_000);
});
