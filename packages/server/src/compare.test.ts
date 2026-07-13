import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { applyOps, loadNhaOng4x16 } from "@atelier/core";
import { compareHtml, compareProjects } from "./compare.js";
import { ProjectStore } from "./store.js";

function freshStore(): ProjectStore {
  const store = new ProjectStore(mkdtempSync(path.join(tmpdir(), "atelier-variant-")));
  store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
  return store;
}

describe("phương án A/B — store", () => {
  it("save/list/read: cùng tên đè, list theo thời gian, file hỏng không gãy", () => {
    const store = freshStore();
    const { slug } = store.saveVariant("Phương án A — thang giữa");
    expect(slug).toBe("phuong-an-a-thang-giua");
    store.saveVariant("Phương án B");
    expect(store.listVariants().map((v) => v.slug)).toEqual(["phuong-an-a-thang-giua", "phuong-an-b"]);

    // cùng tên → cập nhật đè, không nhân bản
    store.apply(0, [{ op: "update", entity: "level", id: "L2", data: { height: 3500 } }]);
    store.saveVariant("Phương án A — thang giữa");
    expect(store.listVariants()).toHaveLength(2);
    expect(store.readVariant(slug).model.levels.find((l) => l.id === "L2")!.height).toBe(3500);

    expect(() => store.readVariant("khong-co")).toThrow(/hiện có/);
  });

  it("openVariant = checkout: revision tiếp tục tăng, journal ghi system, model đổi", () => {
    const store = freshStore();
    store.saveVariant("Gốc");
    store.apply(0, [{ op: "update", entity: "level", id: "L2", data: { height: 3500 } }]); // r1
    const p = store.openVariant("goc"); // quay về bố trí gốc nhưng revision phải > 1
    expect(p.meta.revision).toBe(2);
    expect(p.levels.find((l) => l.id === "L2")!.height).toBe(3400); // state của phương án gốc
    const last = store.changesSince(1).entries.at(-1)!;
    expect(last.origin).toBe("system");
    expect(last.summary).toContain("chuyển sang phương án");
  });
});

describe("phương án A/B — compare engine", () => {
  it("bắt được phòng đổi diện tích + chênh dự toán, tính bằng thứ gia chủ hiểu", () => {
    const a = loadNhaOng4x16();
    const b = structuredClone(a);
    // phương án B: thu phòng ngủ chính (dời W13 4310 như demo) — sửa polygon R8
    const r8 = b.rooms.find((r) => r.id === "R8")!;
    r8.polygon = r8.polygon.map(([x, y]) => (Math.abs(y - 4945) <= 1 ? [x, 4255] : [x, y]));
    b.rooms = b.rooms.filter((r) => r.id !== "R12"); // bỏ giếng trời sau

    const report = compareProjects({ label: "Gốc", model: a }, { label: "Thu ngủ chính", model: b });
    expect(report.highlights.some((h) => h.includes("Ngủ chính") && h.includes("−") === false)).toBe(true);
    expect(report.highlights.some((h) => h.includes("chỉ có ở Gốc"))).toBe(true);
    const r8diff = report.rooms.find((r) => r.id === "R8")!;
    expect(r8diff.a_m2).toBeGreaterThan(r8diff.b_m2!);
    expect(report.a.duToan_vnd).toBeGreaterThan(0);
  });

  it("compareHtml: 2 SVG cạnh nhau + bảng tổng + dự toán", () => {
    const a = loadNhaOng4x16();
    const b = structuredClone(a);
    const r = applyOps(b, b.meta.revision, [{ op: "delete", entity: "furniture", id: "F1" }]);
    const html = compareHtml(
      { label: "Gốc", model: a },
      { label: "Bớt đồ", model: r.ok ? r.project : b },
      "L1",
      "Nhà anh Ba",
    );
    expect(html.split("<svg").length - 1).toBe(2);
    expect(html).toContain("SO SÁNH PHƯƠNG ÁN");
    expect(html).toContain("TỔNG DIỆN TÍCH PHÒNG");
    expect(html).toContain("DỰ TOÁN SƠ BỘ");
    expect(html).toContain("Nội thất: 19 → 18 món");
  });
});
