import { describe, expect, it } from "vitest";
import { loadNhaOng4x16 } from "./fixture.js";
import {
  computeQuantities, DON_GIA, estimateCost, formatVnd, parseBudgetVnd, suggestFinishLevel,
} from "./estimate.js";

describe("dự toán sơ bộ — khối lượng từ fixture 4×16m", () => {
  const p = loadNhaOng4x16();
  const q = computeQuantities(p);

  it("diện tích quy đổi: móng 40% + 2 sàn + mái ước lệ 50%", () => {
    const labels = q.dien_tich.map((l) => l.label);
    expect(labels[0]).toContain("Móng");
    expect(labels).toContain("Sàn Tầng 1");
    expect(labels).toContain("Sàn Tầng 2");
    expect(labels.some((l) => l.includes("Mái"))).toBe(true);

    // lô 4×16 = 64m²/sàn; móng 64×0.4 = 25.6; mái ước 64×0.5 = 32
    const mong = q.dien_tich[0]!;
    expect(mong.dien_tich_m2).toBeCloseTo(64, 0);
    expect(mong.quy_doi_m2).toBeCloseTo(25.6, 1);
    const mai = q.dien_tich.find((l) => l.label.includes("Mái"))!;
    expect(mai.quy_doi_m2).toBeCloseTo(32, 0);
    expect(mai.uoc_le).toBe(true); // fixture chưa vẽ mái
    expect(q.ghi_chu.some((g) => g.includes("chưa vẽ mái"))).toBe(true);

    // ô trống L2 (thang ~4.5m², giếng trời ~2.4m²) đều < ngưỡng 8m² → sàn tính đủ
    const sanL2 = q.dien_tich.find((l) => l.label === "Sàn Tầng 2")!;
    expect(sanL2.quy_doi_m2).toBeCloseTo(64, 0);
    expect(q.tong_quy_doi_m2).toBeCloseTo(25.6 + 64 + 64 + 32, 0);

    // sàn thực trừ hết ô trống
    expect(q.san_thuc_m2).toBeLessThan(128);
    expect(q.san_thuc_m2).toBeGreaterThan(118);
  });

  it("khối lượng tham khảo: tường/cửa/bậc thang dương và hợp lý", () => {
    expect(q.tuong_xay_m2).toBeGreaterThan(150); // ~17 tường cao 3.4–3.6m
    expect(q.tuong_xay_m2).toBeLessThan(400);
    expect(q.cua_bo).toBe(p.openings.length);
    expect(q.cua_m2).toBeGreaterThan(10);
    expect(q.bac_thang).toBe(21);
  });
});

describe("dự toán sơ bộ — chi phí + ngân sách", () => {
  const p = loadNhaOng4x16();

  it("mức hoàn thiện suy từ brief ('trung bình khá')", () => {
    expect(suggestFinishLevel(p)).toBe("trung-binh-kha");
  });

  it("tổng = thô × quy đổi + hoàn thiện × sàn thực; so được với ngân sách brief", () => {
    const e = estimateCost(p);
    expect(e.items).toHaveLength(2);
    const tho = e.items[0]!;
    expect(tho.thanh_tien_vnd).toBe(Math.round(e.quantities.tong_quy_doi_m2 * DON_GIA.don_gia_m2.xay_tho.vnd));
    expect(e.tong_vnd).toBe(e.items[0]!.thanh_tien_vnd + e.items[1]!.thanh_tien_vnd);
    // brief fixture: "~1.8 tỷ" — nhà 2 tầng 128m² mức TB khá phải nằm trong ngân sách
    expect(e.ngan_sach?.vnd).toBe(1_800_000_000);
    expect(e.ngan_sach?.chenh_lech_vnd).toBeGreaterThan(0);
    expect(e.ghi_chu.some((g) => g.includes("don-gia.json"))).toBe(true);
  });

  it("mức override đổi đơn giá hoàn thiện", () => {
    const kha = estimateCost(p, "trung-binh-kha").tong_vnd;
    const sang = estimateCost(p, "cao-cap").tong_vnd;
    expect(sang).toBeGreaterThan(kha);
  });

  it("parseBudgetVnd: tỷ / triệu / không parse được", () => {
    expect(parseBudgetVnd("~1.8 tỷ")).toBe(1_800_000_000);
    expect(parseBudgetVnd("1,5 ty")).toBe(1_500_000_000);
    expect(parseBudgetVnd("900 triệu")).toBe(900_000_000);
    expect(parseBudgetVnd("khoảng 2 tỉ đổ lại")).toBe(2_000_000_000);
    expect(parseBudgetVnd("tùy tình hình")).toBeNull();
    expect(parseBudgetVnd(undefined)).toBeNull();
  });

  it("formatVnd đọc được", () => {
    expect(formatVnd(1_234_000_000)).toBe("1,23 tỷ");
    expect(formatVnd(850_000_000)).toBe("850 triệu");
  });
});
