import { describe, expect, it } from "vitest";
import type { Level, Stair, Wall } from "../types.js";
import { area, areaM2, isSimplePolygon, minPolygonWidth, pointInPolygon, polygonInsidePolygon } from "./polygon.js";
import { openingRect, openingSidePoints, wallBand, wallLength, wallsParallel } from "./wall.js";
import { convexOverlapDepth, obbCorners, obbOverlapDepth } from "./obb.js";
import { stairLayout } from "./stair.js";
import { rotate } from "./vec.js";

describe("polygon", () => {
  const rect = [[0, 0], [4000, 0], [4000, 2000], [0, 2000]] as [number, number][];

  it("diện tích shoelace", () => {
    expect(area(rect)).toBe(8_000_000);
    expect(areaM2(rect)).toBe(8);
  });

  it("polygon tự cắt bị phát hiện (GEO-05)", () => {
    const bowtie = [[0, 0], [1000, 1000], [1000, 0], [0, 1000]] as [number, number][];
    expect(isSimplePolygon(bowtie)).toBe(false);
    expect(isSimplePolygon(rect)).toBe(true);
    expect(isSimplePolygon([[0, 0], [1, 0]])).toBe(false);
  });

  it("point-in-polygon kể cả biên", () => {
    expect(pointInPolygon([2000, 1000], rect)).toBe(true);
    expect(pointInPolygon([0, 1000], rect)).toBe(true); // trên biên
    expect(pointInPolygon([-1, 1000], rect)).toBe(false);
  });

  it("polygon trong polygon, chạm biên vẫn tính là trong", () => {
    const inner = [[0, 500], [1000, 500], [1000, 1500], [0, 1500]] as [number, number][];
    expect(polygonInsidePolygon(inner, rect)).toBe(true);
    const cross = [[3500, 500], [4500, 500], [4500, 1500], [3500, 1500]] as [number, number][];
    expect(polygonInsidePolygon(cross, rect)).toBe(false);
  });

  it("bề rộng nhỏ nhất (hành lang 900)", () => {
    const corridor = [[0, 0], [900, 0], [900, 5000], [0, 5000]] as [number, number][];
    expect(minPolygonWidth(corridor)).toBeCloseTo(900, 5);
  });
});

describe("wall", () => {
  const w: Wall = { id: "W", level: "L1", from: [0, 110], to: [4000, 110], thickness: 220, kind: "gach" };

  it("band từ tim ± t/2", () => {
    expect(wallLength(w)).toBe(4000);
    expect(wallBand(w)).toEqual([[0, 220], [4000, 220], [4000, 0], [0, 0]]);
  });

  it("openingRect nằm trong band", () => {
    const rect = openingRect(w, { id: "D", wall: "W", kind: "door", style: "DC", offset: 2000, width: 1620, height: 2360, sill: 0 });
    expect(rect).toEqual([[2000, 220], [3620, 220], [3620, 0], [2000, 0]]);
  });

  it("điểm mẫu hai bên opening", () => {
    const [left, right] = openingSidePoints(w, { id: "D", wall: "W", kind: "door", style: "DC", offset: 2000, width: 1000, height: 2200, sill: 0 });
    expect(left[1]).toBeGreaterThan(220);
    expect(right[1]).toBeLessThan(0);
  });

  it("song song", () => {
    const w2: Wall = { ...w, id: "W2", from: [0, 500], to: [4000, 500], thickness: 110 };
    const w3: Wall = { ...w, id: "W3", from: [0, 0], to: [0, 3000] };
    expect(wallsParallel(w, w2)).toBe(true);
    expect(wallsParallel(w, w3)).toBe(false);
  });
});

describe("obb", () => {
  it("chồng nhau và tách nhau", () => {
    const a = { center: [1000, 1000] as [number, number], halfW: 500, halfD: 500, rotation: 0 };
    const b = { center: [1900, 1000] as [number, number], halfW: 500, halfD: 500, rotation: 0 };
    expect(obbOverlapDepth(a, b)).toBeCloseTo(100, 5);
    const c = { center: [2100, 1000] as [number, number], halfW: 500, halfD: 500, rotation: 0 };
    expect(obbOverlapDepth(a, c)).toBeLessThanOrEqual(0);
  });

  it("xoay 90° giữ đúng footprint w×d", () => {
    const o = { center: [0, 0] as [number, number], halfW: 1000, halfD: 275, rotation: 270 };
    const xs = obbCorners(o).map((p) => p[0]);
    const ys = obbCorners(o).map((p) => p[1]);
    expect(Math.max(...xs) - Math.min(...xs)).toBeCloseTo(550, 5);
    expect(Math.max(...ys) - Math.min(...ys)).toBeCloseTo(2000, 5);
  });

  it("overlap OBB với polygon lồi", () => {
    const tri = [[0, 0], [2000, 0], [0, 2000]] as [number, number][];
    const box = obbCorners({ center: [500, 500], halfW: 200, halfD: 200, rotation: 45 });
    expect(convexOverlapDepth(box, tri)).toBeGreaterThan(0);
  });
});

describe("stair 2-ve-U (quy ước rẽ trái)", () => {
  const st: Stair = { id: "ST1", level: "L1", type: "2-ve-U", origin: [2830, 7900], rotation: 0, width: 950, steps: 21, tread: 245, landing: 950 };
  const level: Level = { id: "L1", name: "Tầng 1", elevation: 0, height: 3600 };
  const layout = stairLayout(st, level);

  it("riser dẫn xuất = height / steps", () => {
    expect(layout.riser).toBeCloseTo(3600 / 21, 6);
    expect(layout.treadsTotal).toBe(20);
  });

  it("hai vế 10+10, đúng vị trí thế giới", () => {
    expect(layout.flights).toHaveLength(2);
    expect(layout.flights[0]!.rect).toEqual([[2830, 7900], [3780, 7900], [3780, 10350], [2830, 10350]]);
    expect(layout.flights[1]!.rect).toEqual([[1880, 7900], [2830, 7900], [2830, 10350], [1880, 10350]]);
    expect(layout.flights[1]!.firstStep).toBe(11);
  });

  it("chiếu nghỉ + footprint + lối ra tầng trên", () => {
    expect(layout.landing).toEqual([[1880, 10350], [3780, 10350], [3780, 11300], [1880, 11300]]);
    expect(layout.footprint).toEqual([[1880, 7900], [3780, 7900], [3780, 11300], [1880, 11300]]);
    expect(layout.topExit.at).toEqual([2355, 7900]);
    expect(layout.topExit.dir[1]).toBe(-1);
  });

  it("rotation xoay cả khối", () => {
    const rot = stairLayout({ ...st, rotation: 90, origin: [0, 0] }, level);
    const p = rot.flights[0]!.rect[1]!;
    expect(p[0]).toBeCloseTo(rotate([950, 0], 90)[0], 6);
    expect(p[1]).toBeCloseTo(rotate([950, 0], 90)[1], 6);
  });
});
