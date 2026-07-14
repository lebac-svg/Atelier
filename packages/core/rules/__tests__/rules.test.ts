import { describe, expect, it } from "vitest";
import { registerAsset } from "../../src/catalog.js";
import { loadBietThuDoc, loadNhaOng4x16 } from "../../src/fixture.js";
import { applyOps } from "../../src/ops/apply.js";
import type { Issue, Severity } from "../../src/issues.js";
import type { Project } from "../../src/types.js";
import { validateProject } from "../../src/validate/engine.js";
import { activeRules, unverifiedRules, packsFor, registerPack, getPack, type RulePack } from "../../src/validate/rules.js";
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

  it("GEO-08: tường vượt ranh đất (error) — khoảng lùi đã tách sang PLN-01", () => {
    const out = violate((p) => {
      p.walls.push({ id: "W99", level: "L1", from: [3890, 15000], to: [4400, 15000], thickness: 110, kind: "gach" });
    });
    expectRule(out, "GEO-08", "error");
  });
});

describe("PLN — quy hoạch địa phương (params từ brief, không khai = không kiểm)", () => {
  it("PLN-01: khoảng lùi trước — tường mặt tiền phạm; tổng quát cho cả đất méo", () => {
    const issues = violate((p) => { p.brief.dat!.quy_hoach!.khoang_lui_truoc = 500; });
    const i = expectRule(issues, "PLN-01", "error");
    expect(i.message).toContain("khoảng lùi trước 500mm");
    // lùi 100 thì W1 (tim 110, dày 220 → mép 0) vẫn phạm; nhưng nếu chỉ 0 thì im
    expect(violate((p) => { p.brief.dat!.quy_hoach!.khoang_lui_truoc = 0; }).filter((x) => x.rule === "PLN-01")).toEqual([]);
  });

  it("PLN-02: khoảng lùi sau — cạnh sau tự nhận là cạnh xa mặt tiền nhất; tường hông chạm ranh cũng phạm", () => {
    const issues = violate((p) => { p.brief.dat!.quy_hoach!.khoang_lui_sau = 400; });
    const i = expectRule(issues, "PLN-02", "error");
    expect(i.message).toContain("khoảng lùi sau 400mm"); // W4 tim y=15890 cách ranh sau 110
    expect(issues.some((x) => x.rule === "PLN-02" && x.entities.includes("W2"))).toBe(true); // tường hông chạy suốt tới ranh sau
    // nhà đã lùi thật (tường duy nhất cách ranh sau 8m) → im
    const ok = violate((p) => {
      p.brief.dat!.quy_hoach!.khoang_lui_sau = 400;
      p.openings = [];
      p.furniture = [];
      p.stairs = [];
      p.walls = [{ id: "W1", level: "L1", from: [220, 110], to: [3780, 110], thickness: 220, kind: "gach" }];
    });
    expect(ok.filter((x) => x.rule === "PLN-02")).toEqual([]);
  });

  it("PLN-03: mật độ xây dựng — fixture phủ ~100% lô nên max 80% là nổ", () => {
    const issues = violate((p) => { p.brief.dat!.quy_hoach!.mat_do_max = 80; });
    expectRule(issues, "PLN-03", "error");
    expect(violate((p) => { p.brief.dat!.quy_hoach!.mat_do_max = 100; }).filter((x) => x.rule === "PLN-03")).toEqual([]);
  });

  it("PLN-04: số tầng — fixture 2 tầng, max 1 là nổ, max 4 (fixture khai) thì im", () => {
    const issues = violate((p) => { p.brief.dat!.quy_hoach!.tang_max = 1; });
    const i = expectRule(issues, "PLN-04", "error");
    expect(i.message).toContain("2");
    expect(validateProject(loadNhaOng4x16()).filter((x) => x.rule === "PLN-04")).toEqual([]); // tang_max=4 sẵn trong fixture
  });

  it("PLN-05: chiều cao đỉnh công trình — fixture +7000", () => {
    const issues = violate((p) => { p.brief.dat!.quy_hoach!.chieu_cao_max = 6500; });
    const i = expectRule(issues, "PLN-05", "error");
    expect(i.message).toContain("7000");
    expect(violate((p) => { p.brief.dat!.quy_hoach!.chieu_cao_max = 7000; }).filter((x) => x.rule === "PLN-05")).toEqual([]);
  });

  it("PLN-06: ô văng vươn ra ranh trước quá mức khai; vươn trong mức thì im", () => {
    const canopy = (p: Project, vuon: number): void => {
      p.slabs.push({ id: "SL99", level: "L2", kind: "canopy", outline: [[220, -vuon], [3780, -vuon], [3780, 300], [220, 300]], thickness: 100 });
    };
    const issues = violate((p) => {
      p.brief.dat!.quy_hoach!.o_vang_max = 600;
      canopy(p, 1000);
    });
    const i = expectRule(issues, "PLN-06", "error");
    expect(i.message).toContain("SL99");
    expect(
      violate((p) => {
        p.brief.dat!.quy_hoach!.o_vang_max = 600;
        canopy(p, 500);
      }).filter((x) => x.rule === "PLN-06"),
    ).toEqual([]);
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

  // STD-12 cũ (tầng + mật độ) đã chuyển thành PLN-03/PLN-04 — xem describe PLN
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
    registerAsset({ id: "tu-bep-xau", label: "Tủ bếp thử", labelEn: "Test kitchen cabinet", category: "tu-bep-duoi", footprint: { w: 1000, d: 500, h: 850 } });
    const issues = violate((p) => {
      p.furniture.push({ id: "F96", level: "L1", asset: "tu-bep-xau", at: [1500, 6900], rotation: 0 });
    });
    const i = expectRule(issues, "LBB-02", "info");
    expect(i.message).toContain("42.9");
  });

  it("LBB-04: bàn thờ đo bằng thước 38.8 (Đinh Lan), cạnh xấu → info; bàn thờ catalog thì đẹp", () => {
    expect(cungAt(1070, RULERS.ban_tho)).toMatchObject({ name: "Hưng", good: true });
    expect(cungAt(610, RULERS.ban_tho)).toMatchObject({ name: "Quan", good: true });
    registerAsset({ id: "ban-tho-xau", label: "Bàn thờ thử", labelEn: "Test altar", category: "ban-tho", footprint: { w: 830, d: 460, h: 1200 } });
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

describe("P6 — kiến trúc rule-pack (doc 12)", () => {
  it("project VN (không khai config) chọn đúng bộ builtin theo thứ tự cũ", () => {
    const packs = packsFor(loadNhaOng4x16());
    expect(packs.map((p) => p.id)).toEqual(["geo", "std-vn", "loban", "pln"]);
  });

  it("golden bất biến: pack-aware default == builtin (validate fixture vẫn sạch)", () => {
    // đã có test 0-issue ở trên; ở đây chốt activeRules(project) == activeRules() cho VN.
    expect(activeRules(loadNhaOng4x16()).map((r) => r.id)).toEqual(activeRules().map((r) => r.id));
  });

  it("region ngoài VN: bỏ toàn bộ TCVN/Lỗ Ban/PLN, chỉ còn lõi geo + pack region đó", () => {
    const p = loadNhaOng4x16();
    p.config = { region: "generic" };
    const ids = activeRules(p).map((r) => r.id);
    expect(ids.some((id) => id.startsWith("GEO-"))).toBe(true); // lõi luôn chạy
    expect(ids.some((id) => id.startsWith("STD-"))).toBe(false);
    expect(ids.some((id) => id.startsWith("LBB-"))).toBe(false);
    expect(ids.some((id) => id.startsWith("PLN-"))).toBe(false);
    expect(ids).toContain("GEN-CEIL-01"); // pack mẫu region generic
  });

  it("pack mẫu tái dùng evaluator STD-03: chỉ nổ khi region generic được chọn", () => {
    // Hạ trần tầng trệt xuống dưới 2400 → GEN-CEIL-01 phải nổ; STD-03 (VN) thì không (pack không chọn).
    const p = loadNhaOng4x16();
    p.config = { region: "generic" };
    p.levels.find((l) => l.id === "L1")!.height = 2200;
    const issues = validateProject(p);
    expectRule(issues, "GEN-CEIL-01", "warn");
    expect(issues.some((i) => i.rule === "STD-03")).toBe(false);
  });

  it("config.packs = [] → chỉ còn core geo (pack chuẩn tắt hết, hình học vẫn kiểm)", () => {
    const p = loadNhaOng4x16();
    p.config = { packs: [] };
    const ids = activeRules(p).map((r) => r.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(ids.every((id) => id.startsWith("GEO-"))).toBe(true);
  });

  it("lọc theo typology: rule gắn typologies chỉ chạy khi project khai đúng typology", () => {
    const testPack: RulePack = {
      id: "test-typ",
      title: "Test typology filter",
      kind: "standard",
      region: "test", // khác "vn" nên không lọt vào default → không đụng golden
      rules: [
        {
          id: "TST-VILLA-01",
          title: "Chỉ áp cho biệt thự",
          severity: "warn",
          evaluator: "STD-03",
          typologies: ["biet-thu"],
          params: { phong_o: 2400 },
          source: { verified: false },
          message: "test {room}",
        },
      ],
    };
    registerPack(testPack);
    expect(getPack("test-typ")).toBeDefined();

    const base = loadNhaOng4x16();
    base.config = { region: "test" };
    // Không khai typology → rule gắn typologies bị lọc bỏ.
    expect(activeRules(base).some((r) => r.id === "TST-VILLA-01")).toBe(false);
    // Khai đúng typology → rule vào danh sách active.
    base.config = { region: "test", typology: "biet-thu" };
    expect(activeRules(base).some((r) => r.id === "TST-VILLA-01")).toBe(true);
  });
});

describe("P7 — mái dốc, đa mặt tiền, địa hình (doc 12)", () => {
  /** Mutation trên fixture BIỆT THỰ (lô góc 2 mặt tiền, đất dốc, mái hip). */
  function violateVilla(mutate: (p: Project) => void): Issue[] {
    const p = loadBietThuDoc();
    mutate(p);
    return validateProject(p);
  }

  it("fixture biệt thự hoàn toàn sạch (0 issue) — golden P7", () => {
    expect(validateProject(loadBietThuDoc())).toEqual([]);
  });

  it("PLN-07: tường phạm khoảng lùi cạnh #1 (mặt tiền phụ lô góc)", () => {
    // đẩy tường Đông sát ranh phải (setback cạnh 1 = 2000)
    const issues = violateVilla((p) => {
      for (const w of p.walls.filter((x) => x.from[0] === 9800 && x.to[0] === 9800)) {
        w.from = [11500, w.from[1]];
        w.to = [11500, w.to[1]];
      }
    });
    const i = expectRule(issues, "PLN-07", "error");
    expect(i.message).toContain("#1");
  });

  it("PLN-06: đuôi mái vươn quá o_vang_max về cạnh street được kiểm", () => {
    const issues = violateVilla((p) => {
      // kéo mép mái vươn 2000mm ra ngoài ranh trước (y âm) — o_vang_max 1200
      p.roofs![0]!.outline = [[2490, -2000], [10510, -2000], [10510, 12910], [2490, 12910]];
    });
    const i = expectRule(issues, "PLN-06", "error");
    expect(i.message).toContain("RF1");
  });

  it("PLN-05: đỉnh nóc mái tính vào chiều cao, đo từ cốt đất mặt tiền", () => {
    const issues = violateVilla((p) => {
      p.roofs![0]!.pitch = 50; // nóc vọt lên ~11.8m + đất −238 → vượt 12000
    });
    expectRule(issues, "PLN-05", "error");
  });

  it("GEO-05: outline mái tự cắt bị bắt", () => {
    const issues = violateVilla((p) => {
      p.roofs![0]!.outline = [[2490, 2490], [10510, 12910], [10510, 2490], [2490, 12910]];
    });
    expectRule(issues, "GEO-05");
  });

  it("STD-09 (P7): cửa sổ mở ra SÂN TRONG LÔ được tính là lấy sáng (biệt thự lùi ranh)", () => {
    // fixture sạch chứng minh điều này; đối chứng: bịt hết cửa sổ ngủ 2 → nổ
    const issues = violateVilla((p) => {
      p.openings = p.openings.filter((o) => o.id !== "S5");
    });
    const i = expectRule(issues, "STD-09", "warn");
    expect(i.message).toContain("Ngủ 2");
  });

  it("ops: add/update/delete roof đi qua apply_ops như mọi entity, undo được cấu trúc", () => {
    const p = loadBietThuDoc();
    const r1 = applyOps(p, 1, [{ op: "update", entity: "roof", id: "RF1", data: { pitch: 25 } }], { validate: validateProject });
    expect(r1.ok).toBe(true);
    if (r1.ok) {
      expect(r1.project.roofs![0]!.pitch).toBe(25);
      const r2 = applyOps(r1.project, 2, [{ op: "delete", entity: "roof", id: "RF1" }], { validate: validateProject });
      expect(r2.ok).toBe(true);
      if (r2.ok) expect(r2.project.roofs).toHaveLength(0);
    }
  });

  it("file cũ KHÔNG có mảng roofs: add roof vẫn chạy (tự khởi tạo)", () => {
    const p = loadNhaOng4x16();
    expect(p.roofs).toBeUndefined();
    const r = applyOps(p, 1, [{
      op: "add", entity: "roof",
      data: { id: "RF9", level: "L2", kind: "gable", outline: [[0, 0], [4000, 0], [4000, 8000], [0, 8000]], pitch: 20 },
    }], { validate: validateProject });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.project.roofs).toHaveLength(1);
  });
});
