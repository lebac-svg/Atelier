import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { loadNhaOng4x16 } from "../fixture.js";
import type { Issue } from "../issues.js";
import type { Project } from "../types.js";
import { wallLength } from "../geometry/wall.js";
import { applyOps } from "./apply.js";
import type { Op } from "./ops.js";

const addWall = (id: string, y = 3000): Op => ({
  op: "add",
  entity: "wall",
  data: { id, level: "L1", from: [220, y], to: [3780, y], thickness: 110, kind: "gach" },
});

describe("applyOps — transaction + revision", () => {
  it("từ chối baseRevision cũ (REV-01) và chỉ đường get_changes_since", () => {
    const p = loadNhaOng4x16();
    const r = applyOps(p, p.meta.revision - 1, [addWall("W99")]);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.currentRevision).toBe(p.meta.revision);
      expect(r.errors[0]!.rule).toBe("REV-01");
      expect(r.errors[0]!.message).toContain("get_changes_since");
    }
  });

  it("thành công: revision +1, không mutate model gốc", () => {
    const p = loadNhaOng4x16();
    const before = structuredClone(p);
    const r = applyOps(p, p.meta.revision, [addWall("W99")]);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.revision).toBe(before.meta.revision + 1);
      expect(r.project.walls.some((w) => w.id === "W99")).toBe(true);
      expect(r.summary).toContain("thêm tường W99");
    }
    expect(p).toEqual(before); // bất biến đầu vào
  });

  it("cả batch cùng hủy khi một op lỗi (transaction)", () => {
    const p = loadNhaOng4x16();
    const r = applyOps(p, p.meta.revision, [
      addWall("W99"),
      { op: "add", entity: "wall", data: { id: "W1", level: "L1", from: [0, 0], to: [100, 0], thickness: 110, kind: "gach" } }, // trùng ID
    ]);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors[0]!.rule).toBe("OPS-02");
  });

  it("xóa tường cascade xóa opening neo trên nó", () => {
    const p = loadNhaOng4x16();
    expect(p.openings.some((o) => o.wall === "W1")).toBe(true);
    const r = applyOps(p, p.meta.revision, [{ op: "delete", entity: "wall", id: "W1" }]);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.project.walls.some((w) => w.id === "W1")).toBe(false);
      expect(r.project.openings.some((o) => o.wall === "W1")).toBe(false);
    }
  });

  it("update shallow-merge GIỮ trường lạ (forward-compatible)", () => {
    const p = loadNhaOng4x16();
    const r1 = applyOps(p, p.meta.revision, [
      { op: "add", entity: "wall", data: { ...addWall("W99").data as object, ghi_chu: "tường thử nghiệm" } as never },
    ]);
    expect(r1.ok).toBe(true);
    if (!r1.ok) return;
    const r2 = applyOps(r1.project, r1.revision, [
      { op: "update", entity: "wall", id: "W99", data: { thickness: 220 } },
    ]);
    expect(r2.ok).toBe(true);
    if (r2.ok) {
      const w = r2.project.walls.find((x) => x.id === "W99") as never as { thickness: number; ghi_chu: string };
      expect(w.thickness).toBe(220);
      expect(w.ghi_chu).toBe("tường thử nghiệm");
    }
  });

  it("chặn xóa level còn thực thể, chặn đổi id, chặn style đang dùng", () => {
    const p = loadNhaOng4x16();
    const del = applyOps(p, p.meta.revision, [{ op: "delete", entity: "level", id: "L1" }]);
    expect(!del.ok && del.errors[0]!.rule).toBe("OPS-04");
    const ren = applyOps(p, p.meta.revision, [{ op: "update", entity: "wall", id: "W1", data: { id: "W100" } }]);
    expect(!ren.ok && ren.errors[0]!.rule).toBe("OPS-03");
    const style = applyOps(p, p.meta.revision, [{ op: "delete", entity: "style", id: "DC" }]);
    expect(!style.ok && style.errors[0]!.rule).toBe("OPS-05");
  });

  it("opening phải neo vào tường + style có thật (OPS-06)", () => {
    const p = loadNhaOng4x16();
    const r = applyOps(p, p.meta.revision, [
      { op: "add", entity: "opening", data: { id: "D99", wall: "W404", kind: "door", style: "DC", offset: 100, width: 800, height: 2100, sill: 0 } },
    ]);
    expect(!r.ok && r.errors[0]!.rule).toBe("OPS-06");
  });

  it("validator tiêm vào: block hủy transaction, warn cho qua kèm cảnh báo", () => {
    const p = loadNhaOng4x16();
    const blockAll = (): Issue[] => [{ rule: "GEO-01", severity: "block", entities: [], message: "chặn" }];
    const warnAll = (): Issue[] => [{ rule: "STD-01", severity: "warn", entities: [], message: "nhắc" }];
    const r1 = applyOps(p, p.meta.revision, [addWall("W99")], { validate: blockAll });
    expect(r1.ok).toBe(false);
    const r2 = applyOps(p, p.meta.revision, [addWall("W99")], { validate: warnAll });
    expect(r2.ok).toBe(true);
    if (r2.ok) expect(r2.warnings).toHaveLength(1);
  });
});

describe("applyOps — property-based (fast-check)", () => {
  /** Validator GEO-01 thu nhỏ: opening phải nằm trọn trong tường. */
  const geo01 = (p: Project): Issue[] => {
    const issues: Issue[] = [];
    for (const o of p.openings) {
      const w = p.walls.find((x) => x.id === o.wall);
      if (!w) continue;
      const len = wallLength(w);
      if (o.offset < 0 || o.offset + o.width > len) {
        issues.push({ rule: "GEO-01", severity: "block", entities: [o.id, w.id], message: "cửa ngoài tường" });
      }
    }
    return issues;
  };

  it("sau chuỗi ops ngẫu nhiên: revision đơn điệu, opening luôn trong tường, batch fail không đổi model", () => {
    const opArb = fc.oneof(
      fc.record({
        kind: fc.constant("wall" as const),
        n: fc.integer({ min: 100, max: 999 }),
        y: fc.integer({ min: 500, max: 15500 }),
        len: fc.integer({ min: 800, max: 3560 }),
      }),
      fc.record({
        kind: fc.constant("opening" as const),
        n: fc.integer({ min: 100, max: 999 }),
        offset: fc.integer({ min: -500, max: 5000 }),
        width: fc.integer({ min: 400, max: 2000 }),
        wallPick: fc.nat(),
      }),
    );

    fc.assert(
      fc.property(fc.array(opArb, { maxLength: 25 }), (specs) => {
        let model = loadNhaOng4x16();
        for (const s of specs) {
          const before = model;
          const op: Op =
            s.kind === "wall"
              ? { op: "add", entity: "wall", data: { id: `W${s.n}`, level: "L1", from: [220, s.y], to: [220 + s.len, s.y], thickness: 110, kind: "gach" } }
              : {
                  op: "add",
                  entity: "opening",
                  data: {
                    id: `D${s.n}`,
                    wall: before.walls[s.wallPick % before.walls.length]!.id,
                    kind: "door", style: "DP", offset: s.offset, width: s.width, height: 2100, sill: 0,
                  },
                };
          const r = applyOps(model, model.meta.revision, [op], { validate: geo01 });
          if (r.ok) {
            expect(r.revision).toBe(before.meta.revision + 1);
            model = r.project;
          } else {
            expect(model).toEqual(before); // thất bại → không suy suyển
          }
          // bất biến: model đã cam kết không bao giờ chứa cửa ngoài tường
          expect(geo01(model)).toHaveLength(0);
        }
      }),
      { numRuns: 50 },
    );
  });
});
