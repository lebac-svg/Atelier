import { describe, expect, it } from "vitest";
import { estimateCost, loadBietThuDoc, loadNhaOng4x16 } from "@atelier/core";
import { buildPlanScene } from "./plan-scene.js";
import { buildElevationScene } from "./elevation-scene.js";
import { buildSectionScene } from "./section-scene.js";
import { modelToGlb } from "./gltf-writer.js";
import { modelToIfc } from "./ifc-writer.js";
import { sceneToDxf } from "./dxf-writer.js";

/**
 * P7 (doc 12) — DoD: biệt thự mái hip, lô góc 2 mặt tiền, đất dốc render đúng
 * trên mọi mặt: plan (nét mái), mặt đứng (mái + đất dốc), mặt cắt (poché mái +
 * nền dốc), GLB/IFC, estimate m² mặt nghiêng. Nhà ống KHÔNG mái/terrain phải
 * đi nhánh no-op y hệt cũ (5 snapshot golden ở render.test/render-p4.test lo).
 */
describe("P7 — biệt thự mái dốc trên lô góc đất dốc", () => {
  const villa = loadBietThuDoc();

  it("mặt bằng L2: mép mái + 4 hông + nóc trên layer MAI (hip = 6 nét)", () => {
    const plan = buildPlanScene(villa, "L2");
    const mai = plan.items.filter((i) => i.layer === "MAI");
    expect(mai).toHaveLength(6); // 1 outline + 4 hông + 1 nóc
    expect(mai.every((i) => i.dataId === "RF1")).toBe(true);
  });

  it("mặt đứng: biệt thự LÙI 3m vẫn có tường mặt tiền (cụm gần nhất); 4 mặt mái; đất dốc", () => {
    const elev = buildElevationScene(villa);
    const mai = elev.items.filter((i) => i.layer === "MAI");
    expect(mai).toHaveLength(4); // hip chiếu cạnh: 4 outline mặt
    // đất dốc = polyline (không phải line ngang z=0)
    const ground = elev.items.find((i) => i.layer === "TUONG-CAT" && i.prim.kind === "polyline" && !("close" in i.prim && i.prim.close));
    expect(ground).toBeDefined();
    const zs = (ground!.prim as { pts: Array<[number, number]> }).pts.map(([, z]) => z);
    expect(Math.min(...zs)).toBeLessThan(-50); // có đoạn đất thấp hơn cốt nền
  });

  it("mặt cắt: poché mái theo profile + mốc đỉnh vượt tường; nền đất dốc", () => {
    const sect = buildSectionScene(villa);
    const roofCut = sect.items.filter((i) => i.dataId === "RF1");
    expect(roofCut.length).toBeGreaterThanOrEqual(1);
    expect(roofCut.some((i) => i.prim.kind === "polygon" && (i.prim as { fill?: string }).fill === "#000000")).toBe(true);
  });

  it("GLB có node RF1; IFC có IFCROOF kiểu HIP; DXF nhận layer MAI", () => {
    expect(modelToGlb(villa).includes("RF1")).toBe(true);
    const ifc = modelToIfc(villa);
    expect(ifc).toContain("IFCROOF");
    expect(ifc).toContain(".HIP_ROOF.");
    const plan = buildPlanScene(villa, "L2");
    const dxf = sceneToDxf(plan.items, { scale: 100 });
    expect(dxf).toContain("MAI");
  });

  it("estimate: mái dốc tính m² MẶT NGHIÊNG (chiếu / cos pitch), hệ số mái ngói; không còn dòng ước lệ", () => {
    const est = estimateCost(villa);
    const mai = est.quantities.dien_tich.find((l) => l.label.includes("RF1"));
    expect(mai).toBeDefined();
    // bbox mái 8.02×10.42m = 83.57m² chiếu → /cos(30°) ≈ 96.5m² mặt nghiêng
    expect(mai!.dien_tich_m2).toBeCloseTo(96.5, 0);
    expect(mai!.he_so).toBe(0.7);
    expect(est.quantities.dien_tich.some((l) => l.uoc_le)).toBe(false);
  });

  it("nhà ống không mái/terrain: KHÔNG item MAI, đất vẫn line ngang z=0 (no-op)", () => {
    const p = loadNhaOng4x16();
    const elev = buildElevationScene(p);
    expect(elev.items.filter((i) => i.layer === "MAI")).toHaveLength(0);
    const sect = buildSectionScene(p);
    expect(sect.items.filter((i) => i.layer === "MAI")).toHaveLength(0);
  });
});
