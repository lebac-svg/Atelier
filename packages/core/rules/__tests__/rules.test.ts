import { describe, expect, it } from "vitest";
import { registerAsset } from "../../src/catalog.js";
import { loadNhaOng4x16 } from "../../src/fixture.js";
import type { Issue, Severity } from "../../src/issues.js";
import type { Project } from "../../src/types.js";
import { validateProject } from "../../src/validate/engine.js";
import { activeRules, unverifiedRules } from "../../src/validate/rules.js";
import { cungAt, nearestGood } from "../../src/validate/loban.js";
import { RULERS } from "../../src/validate/rules.js";

/** Mutation → validate; kiểm rule nổ đúng chỗ phạm và im ở fixture chuẩn. */
function violate(mutate: (p: Project) => void): Issue[] {
  const p = loadNhaOng4x16();
  mutate(p);
  return validateProject(p);
}

function expectRule(issues: Issue[], rule: string, severity?: Severity): Issue {
  const found = issues.find((i) => i.rule === rule && (severity === undefined || i.severity === severity));
  expect(found, `kỳ vọng ${rule}${severity ? `/${severity}` : ""} trong: ${issues.map((i) => `${i.rule}/${i.severity}`).join(", ") || "(rỗng)"}`).toBeDefined();
  return found!;
}

describe("bộ rule — tổng quan", () => {
  it("≥ 20 rules active, DoD P1", () => {
    expect(activeRules().length).toBeGreaterThanOrEqual(20);
  });

  it("fixture chuẩn hoàn toàn sạch (0 issue) — golden", () => {
    expect(validateProject(loadNhaOng4x16())).toEqual([]);
  });

  it("toàn bộ rule đã đối chiếu nguồn (verified) — hết cờ ⚠ từ 13/07/2026", () => {
    expect(unverifiedRules()).toEqual([]);
  });
});

describe("GEO — hình học/topology (case phạm; case đạt = fixture golden)", () => {
  it("GEO-01: cửa trượt ra ngoài tường", () => {
    const issues = violate((p) => { p.openings.find((o) => o.id === "D1")!.offset = 3000; });
    const i = expectRule(issues, "GEO-01", "block");
    expect(i.message).toContain("D1");
  });

  it("GEO-02: hai opening chồng nhau trên một tường", () => {
    const issues = violate((p) => {
      p.openings.push({ id: "D99", wall: "W1", kind: "door", style: "DP", offset: 1000, width: 1200, height: 2100, sill: 0 });
    });
    expectRule(issues, "GEO-02", "block");
  });

  it("GEO-03: hai tường song song đè nhau", () => {
    const issues = violate((p) => {
      p.walls.push({ id: "W99", level: "L1", from: [0, 150], to: [4000, 150], thickness: 220, kind: "gach" });
    });
    expectRule(issues, "GEO-03", "error");
  });

  it("GEO-04: nội thất đè nhau", () => {
    const issues = violate((p) => {
      p.furniture.push({ id: "F99", level: "L1", asset: "sofa-3s-01", at: [700, 3350], rotation: 90 });
    });
    expectRule(issues, "GEO-04", "error");
  });

  it("GEO-05: polygon tự cắt", () => {
    const issues = violate((p) => {
      p.rooms.find((r) => r.id === "R1")!.polygon = [[0, 0], [1000, 1000], [1000, 0], [0, 1000]];
    });
    expectRule(issues, "GEO-05", "block");
  });

  it("GEO-06: cung mở cửa vướng nội thất", () => {
    const issues = violate((p) => {
      p.furniture.push({ id: "F99", level: "L1", asset: "tu-ao-1m", at: [720, 13200], rotation: 0 });
    });
    const i = expectRule(issues, "GEO-06", "warn");
    expect(i.entities).toContain("D3");
  });

  it("GEO-07: xóa lỗ thang trên sàn L2", () => {
    const issues = violate((p) => { p.slabs.find((s) => s.id === "SL2")!.holes = []; });
    expectRule(issues, "GEO-07", "warn");
  });

  it("GEO-08: tường vượt ranh đất (error) + phạm khoảng lùi brief (warn)", () => {
    const out = violate((p) => {
      p.walls.push({ id: "W99", level: "L1", from: [3890, 15000], to: [4400, 15000], thickness: 110, kind: "gach" });
    });
    expectRule(out, "GEO-08", "error");
    const lui = violate((p) => { p.brief.dat!.quy_hoach!.khoang_lui_truoc = 500; });
    expectRule(lui, "GEO-08", "warn");
  });
});

describe("STD — tiêu chuẩn kích thước VN", () => {
  it("STD-01: phòng ngủ đơn < 9m² (TCVN 13967 Bảng 1) | STD-02: bề rộng < 2100", () => {
    const issues = violate((p) => {
      p.rooms.find((r) => r.id === "R5")!.polygon = [[220, 12475], [2200, 12475], [2200, 15005], [220, 15005]];
      p.furniture = p.furniture.filter((f) => !["F8", "F9"].includes(f.id)); // dọn đồ cho khỏi nhiễu GEO
    });
    const i = expectRule(issues, "STD-01", "warn");
    expect(i.message).toContain("9m²");
    expectRule(issues, "STD-02", "warn");
  });

  it("STD-01: phòng ngủ có giường đôi đòi 12m²", () => {
    const issues = violate((p) => {
      // chuyển giường đôi 1m8 vào phòng bà (9.0m² — đủ cho giường đơn, thiếu cho giường đôi)
      p.furniture = p.furniture.filter((f) => !["F8", "F9"].includes(f.id));
      p.furniture.push({ id: "F98", level: "L1", asset: "giuong-1m8", at: [2680, 14005], rotation: 90 });
    });
    const i = expectRule(issues, "STD-01", "warn");
    expect(i.message).toContain("12m²");
    expect(i.entities).toContain("R5");
  });

  it("STD-03: hạ chiều cao tầng → cao thông thủy thiếu", () => {
    const issues = violate((p) => { p.levels.find((l) => l.id === "L1")!.height = 2600; });
    const i = expectRule(issues, "STD-03", "error");
    expect(i.message).toContain("2480");
  });

  it("STD-04: hành lang < 1000 (đường thoát nạn 13967)", () => {
    const issues = violate((p) => {
      p.rooms.find((r) => r.id === "R3")!.polygon = [[220, 7520], [920, 7520], [920, 12365], [220, 12365]];
    });
    expectRule(issues, "STD-04", "error");
  });

  it("STD-05: cửa phòng < 700 (error) + cửa chính 800–900 (info khuyến nghị)", () => {
    const err = violate((p) => { p.openings.find((o) => o.id === "D3")!.width = 650; });
    expectRule(err, "STD-05", "error");
    const info = violate((p) => { p.openings.find((o) => o.id === "D1")!.width = 850; });
    expectRule(info, "STD-05", "info");
  });

  it("STD-06: mặt bậc < 250 (error) + vế 700–900 (warn) + bậc > 190 (warn khuyến khích)", () => {
    const err = violate((p) => { p.stairs[0]!.tread = 240; });
    expectRule(err, "STD-06", "error");
    const warn = violate((p) => { p.stairs[0]!.width = 850; p.stairs[0]!.landing = 860; });
    expectRule(warn, "STD-06", "warn");
    const riser = violate((p) => { p.stairs[0]!.steps = 18; }); // 3600/18 = 200 ∈ (190, 220]
    const i = expectRule(riser, "STD-06", "warn");
    expect(i.message).toContain("khuyến khích");
  });

  it("STD-08: bậu cửa sổ thấp ở tầng 2 (warn) — tầng 1 thì không", () => {
    const warn = violate((p) => { p.openings.find((o) => o.id === "S4")!.sill = 500; });
    expectRule(warn, "STD-08", "warn");
    const ok = violate((p) => { p.openings.find((o) => o.id === "S1")!.sill = 500; });
    expect(ok.filter((i) => i.rule === "STD-08")).toEqual([]);
  });

  it("STD-09: phòng ngủ mất cửa sổ → thiếu sáng", () => {
    const issues = violate((p) => { p.openings = p.openings.filter((o) => o.id !== "S4"); });
    const i = expectRule(issues, "STD-09", "warn");
    expect(i.entities).toContain("R11");
  });

  it("STD-10: cửa WC mở thẳng vào khu bếp", () => {
    const issues = violate((p) => { p.rooms.find((r) => r.id === "R3")!.use = "bep-an"; });
    expectRule(issues, "STD-10", "warn");
  });

  it("STD-11: bàn chắn trước bếp (warn) + giường bít cả hai hông (info)", () => {
    const bep = violate((p) => {
      p.furniture.push({ id: "F99", level: "L1", asset: "ban-an-4", at: [2600, 5555], rotation: 90 });
    });
    expectRule(bep, "STD-11", "warn");
    const giuong = violate((p) => {
      p.furniture.push({ id: "F98", level: "L1", asset: "ban-hoc", at: [2780, 13445], rotation: 0 });
    });
    expectRule(giuong, "STD-11", "info");
  });

  it("STD-12: vượt số tầng + mật độ khai trong brief", () => {
    const issues = violate((p) => {
      p.brief.dat!.quy_hoach!.tang_max = 1;
      p.brief.dat!.quy_hoach!.mat_do_max = 50;
    });
    const all = issues.filter((i) => i.rule === "STD-12");
    expect(all).toHaveLength(2);
  });
});

describe("LBB — thước Lỗ Ban (advisory, bật qua brief)", () => {
  it("toán thước: cung + gợi ý số đẹp gần nhất", () => {
    expect(cungAt(1620, RULERS.thong_thuy)).toMatchObject({ name: "Quý Nhân", good: true });
    expect(cungAt(700, RULERS.thong_thuy).good).toBe(false);
    const s = nearestGood(700, RULERS.thong_thuy);
    expect(s.suggest).toBe(750);
    expect(s.cung).toBe("Thiên Tài");
  });

  it("LBB-01 + LBB-03: cửa rơi cung xấu → info + gợi ý", () => {
    const issues = violate((p) => { p.openings.find((o) => o.id === "D3")!.width = 700; });
    expectRule(issues, "LBB-01", "info");
    const goiY = expectRule(issues, "LBB-03", "info");
    expect(goiY.message).toContain("750");
  });

  it("LBB-02: khối xây (tủ bếp) cạnh rơi cung xấu theo 42.9", () => {
    registerAsset({ id: "tu-bep-xau", label: "Tủ bếp thử", category: "tu-bep-duoi", footprint: { w: 1000, d: 500, h: 850 } });
    const issues = violate((p) => {
      p.furniture.push({ id: "F96", level: "L1", asset: "tu-bep-xau", at: [1500, 6900], rotation: 0 });
    });
    const i = expectRule(issues, "LBB-02", "info");
    expect(i.message).toContain("42.9");
  });

  it("LBB-04: bàn thờ đo bằng thước 38.8 (Đinh Lan), cạnh xấu → info; bàn thờ catalog thì đẹp", () => {
    expect(cungAt(1070, RULERS.ban_tho)).toMatchObject({ name: "Hưng", good: true });
    expect(cungAt(610, RULERS.ban_tho)).toMatchObject({ name: "Quan", good: true });
    registerAsset({ id: "ban-tho-xau", label: "Bàn thờ thử", category: "ban-tho", footprint: { w: 830, d: 460, h: 1200 } });
    const issues = violate((p) => {
      p.furniture.push({ id: "F97", level: "L2", asset: "ban-tho-xau", at: [2200, 6400], rotation: 90 });
    });
    const i = expectRule(issues, "LBB-04", "info");
    expect(i.message).toContain("38.8");
    expectRule(issues, "LBB-03", "info");
  });

  it("tắt Lỗ Ban trong brief → LBB im lặng tuyệt đối", () => {
    const issues = violate((p) => {
      p.brief.phong_thuy = { lo_ban: false };
      p.openings.find((o) => o.id === "D3")!.width = 700;
    });
    expect(issues.filter((i) => i.rule.startsWith("LBB"))).toEqual([]);
  });
});
