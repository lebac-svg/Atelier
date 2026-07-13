import { describe, expect, it } from "vitest";
import { wallPieces } from "./geo3d.js";

describe("wallPieces — tách tường quanh openings (không CSG)", () => {
  it("tường đặc → một mảnh thân trọn chiều", () => {
    expect(wallPieces(4000, 3600, [])).toEqual([
      { u0: 0, u1: 4000, z0: 0, z1: 3600, part: "than" },
    ]);
  });

  it("cửa đi giữa tường → thân trái + lanh tô + thân phải", () => {
    const pieces = wallPieces(4000, 3600, [{ offset: 900, width: 800, height: 2200, sill: 0 }]);
    expect(pieces).toEqual([
      { u0: 0, u1: 900, z0: 0, z1: 3600, part: "than" },
      { u0: 900, u1: 1700, z0: 2200, z1: 3600, part: "lanh-to" },
      { u0: 1700, u1: 4000, z0: 0, z1: 3600, part: "than" },
    ]);
  });

  it("cửa sổ có bậu → thêm mảng dưới bậu", () => {
    const pieces = wallPieces(3000, 3600, [{ offset: 1000, width: 1200, height: 1400, sill: 900 }]);
    expect(pieces).toContainEqual({ u0: 1000, u1: 2200, z0: 0, z1: 900, part: "bau" });
    expect(pieces).toContainEqual({ u0: 1000, u1: 2200, z0: 2300, z1: 3600, part: "lanh-to" });
  });

  it("cửa sát mép + cao kịch trần → không sinh mảnh rỗng", () => {
    const pieces = wallPieces(2000, 2600, [{ offset: 0, width: 800, height: 2600, sill: 0 }]);
    expect(pieces).toEqual([{ u0: 800, u1: 2000, z0: 0, z1: 2600, part: "than" }]);
  });

  it("hai openings giữ đúng thứ tự, opening tràn mép bị kẹp", () => {
    const pieces = wallPieces(5000, 3000, [
      { offset: 3800, width: 2000, height: 1400, sill: 900 }, // tràn qua mép phải → kẹp 5000
      { offset: 500, width: 700, height: 2200, sill: 0 },
    ]);
    expect(pieces[0]).toEqual({ u0: 0, u1: 500, z0: 0, z1: 3000, part: "than" });
    expect(pieces.at(-1)).toEqual({ u0: 3800, u1: 5000, z0: 2300, z1: 3000, part: "lanh-to" });
    expect(pieces.some((p) => p.u0 === 1200 && p.u1 === 3800 && p.part === "than")).toBe(true);
  });

  it("opening cao vượt tường → kẹp, không lanh tô", () => {
    const pieces = wallPieces(3000, 2600, [{ offset: 1000, width: 800, height: 9000, sill: 0 }]);
    expect(pieces.every((p) => p.part === "than")).toBe(true);
    expect(pieces).toHaveLength(2);
  });
});
