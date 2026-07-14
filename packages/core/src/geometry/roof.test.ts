import { describe, expect, it } from "vitest";
import type { Level, Roof } from "../types.js";
import { roofGeometry, roofProfile } from "./roof.js";

const level: Level = { id: "L2", name: "Tầng 2", elevation: 3600, height: 3400 };
const BASE = 7000; // 3600 + 3400

/** Mái chữ nhật 10×6m làm chuẩn — nóc dọc x (trục dài). */
const rect = (kind: Roof["kind"], extra: Partial<Roof> = {}): Roof => ({
  id: "RF1",
  level: "L2",
  kind,
  outline: [[0, 0], [10000, 0], [10000, 6000], [0, 6000]],
  pitch: 30,
  ...extra,
});

const tan30 = Math.tan(Math.PI / 6);

describe("roofGeometry — gable (2 mái)", () => {
  const g = roofGeometry(rect("gable"), level);

  it("đáy diềm = đỉnh tường tầng; nóc = base + nửa nhịp × tan(pitch)", () => {
    expect(g.baseZ).toBe(BASE);
    expect(g.ridgeZ).toBeCloseTo(BASE + 3000 * tan30, 6);
  });

  it("nóc chạy dọc trục dài qua tâm — một đoạn xuyên suốt", () => {
    expect(g.creases).toHaveLength(1);
    const [[x1, y1], [x2, y2]] = g.creases[0]!;
    expect(y1).toBe(3000);
    expect(y2).toBe(3000);
    expect(Math.abs(x2 - x1)).toBe(10000);
  });

  it("2 mặt phẳng; mép z=base, đỉnh nóc z=ridge", () => {
    expect(g.faces).toHaveLength(2);
    expect(g.zAt([5000, 0])).toBeCloseTo(BASE, 6);
    expect(g.zAt([5000, 3000])).toBeCloseTo(g.ridgeZ, 6);
    expect(g.zAt([5000, 1500])).toBeCloseTo(BASE + 1500 * tan30, 6);
  });

  it("diện tích mặt mái thật = diện tích chiếu / cos(pitch)", () => {
    const projected = 60; // m²
    expect(g.areaM2).toBeCloseTo(projected / Math.cos(Math.PI / 6), 1);
  });

  it("ridgeAxis ghi đè được (nóc dọc y)", () => {
    const gy = roofGeometry(rect("gable", { ridgeAxis: "y" }), level);
    expect(gy.ridgeZ).toBeCloseTo(BASE + 5000 * tan30, 6);
    expect(gy.creases[0]![0][0]).toBe(5000); // x = tâm
  });
});

describe("roofGeometry — shed (1 mái)", () => {
  it("một mặt; mặc định cạnh cao phía min (y nhỏ khi nóc dọc x)", () => {
    const s = roofGeometry(rect("shed"), level);
    expect(s.faces).toHaveLength(1);
    expect(s.creases).toHaveLength(0);
    expect(s.zAt([5000, 0])).toBeCloseTo(BASE + 6000 * tan30, 6); // cạnh cao
    expect(s.zAt([5000, 6000])).toBeCloseTo(BASE, 6); // cạnh thấp
  });

  it("highSide max đảo hướng dốc", () => {
    const s = roofGeometry(rect("shed", { highSide: "max" }), level);
    expect(s.zAt([5000, 0])).toBeCloseTo(BASE, 6);
    expect(s.zAt([5000, 6000])).toBeCloseTo(BASE + 6000 * tan30, 6);
  });
});

describe("roofGeometry — hip (4 mái)", () => {
  const h = roofGeometry(rect("hip"), level);

  it("nóc ngắn lại hai đầu một nửa nhịp ngắn; 4 mặt + 5 nét gãy", () => {
    expect(h.ridgeZ).toBeCloseTo(BASE + 3000 * tan30, 6);
    expect(h.faces).toHaveLength(4);
    expect(h.creases).toHaveLength(5); // 4 hông + 1 nóc
    const ridge = h.creases[4]!;
    expect(ridge[0]).toEqual([3000, 3000]);
    expect(ridge[1]).toEqual([7000, 3000]);
  });

  it("z tại góc = base, giữa nóc = ridge, mép biên = base", () => {
    expect(h.zAt([0, 0])).toBeCloseTo(BASE, 6);
    expect(h.zAt([5000, 3000])).toBeCloseTo(h.ridgeZ, 6);
    expect(h.zAt([5000, 0])).toBeCloseTo(BASE, 6);
  });

  it("vuông → chóp: nóc suy biến, chỉ còn 4 hông", () => {
    const sq = roofGeometry(rect("hip", { outline: [[0, 0], [6000, 0], [6000, 6000], [0, 6000]] }), level);
    expect(sq.creases).toHaveLength(4);
  });
});

describe("roofProfile — vết cắt qua mái", () => {
  const roof = rect("gable");
  const g = roofGeometry(roof, level);

  it("cắt VUÔNG GÓC nóc → hình tam giác 3 điểm gãy (mép-nóc-mép)", () => {
    const lines = roofProfile(g, roof, [5000, -1000], [5000, 7000]);
    expect(lines).toHaveLength(1);
    const pts = lines[0]!;
    // s tính từ điểm a=[5000,-1000]: mép tại s=1000, nóc s=4000, mép s=7000
    expect(pts.map(([s]) => Math.round(s))).toEqual([1000, 4000, 7000]);
    expect(pts[0]![1]).toBeCloseTo(BASE, 6);
    expect(pts[1]![1]).toBeCloseTo(g.ridgeZ, 6);
    expect(pts[2]![1]).toBeCloseTo(BASE, 6);
  });

  it("cắt DỌC nóc → đường nằm ngang ở đỉnh", () => {
    const lines = roofProfile(g, roof, [-1000, 3000], [11000, 3000]);
    expect(lines).toHaveLength(1);
    for (const [, z] of lines[0]!) expect(z).toBeCloseTo(g.ridgeZ, 6);
  });

  it("cắt ngoài mái → rỗng", () => {
    expect(roofProfile(g, roof, [-1000, 9000], [11000, 9000])).toHaveLength(0);
  });

  it("mái chữ L (gable dọc x): nóc đứt đoạn vẫn ra 2 đoạn trong polygon", () => {
    const L: Roof = rect("gable", {
      // chữ L: thân 10×6 khoét góc trên-phải 4×3 → nóc y=3000 vẫn liên tục ở thân,
      // kiểm tra insideSegments không nổ với polygon 6 đỉnh
      outline: [[0, 0], [10000, 0], [10000, 3000], [6000, 3000], [6000, 6000], [0, 6000]],
      ridgeAxis: "x",
    });
    const gl = roofGeometry(L, level);
    expect(gl.faces.length).toBeGreaterThanOrEqual(2);
    expect(gl.creases.length).toBeGreaterThanOrEqual(1);
  });
});
