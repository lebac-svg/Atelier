import { describe, expect, it } from "vitest";
import { loadNhaOng4x16 } from "@atelier/core";
import { buildPlanScene } from "./plan-scene.js";
import { sceneToSvg } from "./svg-writer.js";

/** Golden SVG (doc 10): đổi renderer phải diff có chủ đích. Font không nhúng cho snapshot gọn. */
function render(levelId: string): string {
  const { items, tf } = buildPlanScene(loadNhaOng4x16(), levelId, { date: "13/07/2026", designer: "anh Ba" });
  return sceneToSvg(items, tf);
}

describe("renderer 2D — mặt bằng", () => {
  it("golden SVG tầng 1", async () => {
    await expect(render("L1")).toMatchFileSnapshot("__snapshots__/mat-bang-L1.svg");
  });

  it("golden SVG tầng 2", async () => {
    await expect(render("L2")).toMatchFileSnapshot("__snapshots__/mat-bang-L2.svg");
  });

  it("cấu trúc bản vẽ tầng 1: layer, ký hiệu, dim, khung tên", () => {
    const svg = render("L1");
    // đủ layer chính
    for (const layer of ["TRUC", "TUONG-CAT", "TUONG-THAY", "CUA", "THANG", "NOI-THAT", "DIM", "TEXT", "KHUNG"]) {
      expect(svg, `thiếu layer ${layer}`).toContain(`id="layer-${layer}"`);
    }
    // entity click được qua data-id
    for (const id of ["W1", "D1", "S1", "ST1", "R1", "F1"]) {
      expect(svg, `thiếu data-id ${id}`).toContain(`data-id="${id}"`);
    }
    // ký hiệu cửa đi = cung mở (path A) trong layer CUA
    expect(svg).toMatch(/data-id="D1"[^>]*d="M[^"]+A/);
    // nhãn phòng HOA có dấu + diện tích dẫn xuất
    expect(svg).toContain("PHÒNG KHÁCH");
    expect(svg).toContain("13.3m²");
    // dim: chuỗi trục 3780 và tổng 4000/16000
    expect(svg).toContain(">3780<");
    expect(svg).toContain(">16000<");
    // thang: mũi tên LÊN + số bậc
    expect(svg).toContain("LÊN 21 BẬC");
    // khung tên + tỷ lệ + cờ ⚠ khi còn rule chưa verify
    expect(svg).toContain("TỶ LỆ 1:50");
    expect(svg).toContain("MẶT BẰNG TẦNG 1");
    expect(svg).toContain("⚠");
    expect(svg).toContain("Bản vẽ concept");
  });

  it("tầng 2 vẽ thang từ dưới lên (không zigzag) + giếng trời là lỗ sàn", () => {
    const svg = render("L2");
    expect(svg).toContain("MẶT BẰNG TẦNG 2");
    expect(svg).toContain(`data-id="ST1"`); // thang hiện ở mặt bằng tầng trên
    expect(svg).toContain(`data-id="SL2"`); // nét đứt lỗ sàn
    expect(svg).toContain("NGỦ CHÍNH");
    expect(svg).toContain("+3.600");
  });

  it("nhà dọc được xoay ngang trang, 1:50", () => {
    const { tf } = buildPlanScene(loadNhaOng4x16(), "L1");
    expect(tf.rotated).toBe(true);
    expect(tf.scale).toBe(50);
  });

  it("level không tồn tại → lỗi tiếng Việt chỉ đường", () => {
    expect(() => buildPlanScene(loadNhaOng4x16(), "L9")).toThrowError(/các level hiện có: L1, L2/);
  });
});
