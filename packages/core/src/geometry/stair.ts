import type { Level, Point, Polygon, Stair } from "../types.js";
import { add, rotate } from "./vec.js";

/**
 * Khai triển hình học thang theo quy ước trong types.ts:
 * - local: origin = góc TRÁI-DƯỚI VẾ 1, +y = chiều đi lên vế 1.
 * - "1-ve":   vế x∈[0,w].
 * - "2-ve-U": vế 2 x∈[-w,0] (rẽ TRÁI khi đi lên), chiếu nghỉ cuối vế 1.
 * - "chu-L":  chiếu nghỉ vuông cuối vế 1, vế 2 rẽ TRÁI đi -x.
 */

export type StairFlight = {
  /** Số mặt bậc của vế. */
  treads: number;
  /** Chỉ số bậc toàn cục của mặt bậc đầu vế (1-based). */
  firstStep: number;
  /** Hình chữ nhật vế (polygon 4 đỉnh, thế giới). */
  rect: Polygon;
  /** Điểm giữa mép BẬC 1 của vế và hướng đi lên (đơn vị). */
  start: Point;
  dir: Point;
};

export type StairLayout = {
  riser: number;
  treadsTotal: number;
  flights: StairFlight[];
  landing?: Polygon;
  /** Bao ngoài toàn khối thang (thế giới). */
  footprint: Polygon;
  /** Điểm bước ra ở tầng trên + hướng bước ra. */
  topExit: { at: Point; dir: Point };
};

export function stairLayout(st: Stair, level: Level): StairLayout {
  const w = st.width;
  const t = st.tread;
  const treadsTotal = st.steps - 1; // bậc cuối = mép sàn tầng trên
  const riser = level.height / st.steps;
  const toWorld = (p: Point): Point => add(st.origin, rotate(p, st.rotation));
  const rectW = (x0: number, y0: number, x1: number, y1: number): Polygon =>
    [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map((p) => toWorld(p as Point));

  if (st.type === "1-ve") {
    const run = treadsTotal * t;
    return {
      riser,
      treadsTotal,
      flights: [
        {
          treads: treadsTotal,
          firstStep: 1,
          rect: rectW(0, 0, w, run),
          start: toWorld([w / 2, 0]),
          dir: rotate([0, 1], st.rotation),
        },
      ],
      footprint: rectW(0, 0, w, run),
      topExit: { at: toWorld([w / 2, run]), dir: rotate([0, 1], st.rotation) },
    };
  }

  const landing = st.landing ?? w;
  const f1 = Math.ceil(treadsTotal / 2);
  const f2 = treadsTotal - f1;
  const run1 = f1 * t;
  const run2 = f2 * t;

  if (st.type === "2-ve-U") {
    return {
      riser,
      treadsTotal,
      flights: [
        {
          treads: f1,
          firstStep: 1,
          rect: rectW(0, 0, w, run1),
          start: toWorld([w / 2, 0]),
          dir: rotate([0, 1], st.rotation),
        },
        {
          treads: f2,
          firstStep: f1 + 1,
          rect: rectW(-w, run1 - run2, 0, run1),
          start: toWorld([-w / 2, run1]),
          dir: rotate([0, -1], st.rotation),
        },
      ],
      landing: rectW(-w, run1, w, run1 + landing),
      footprint: rectW(-w, Math.min(0, run1 - run2), w, run1 + landing),
      topExit: { at: toWorld([-w / 2, run1 - run2]), dir: rotate([0, -1], st.rotation) },
    };
  }

  // chu-L: vế 2 rẽ trái, chiếu nghỉ vuông w×landing tại cuối vế 1
  return {
    riser,
    treadsTotal,
    flights: [
      {
        treads: f1,
        firstStep: 1,
        rect: rectW(0, 0, w, run1),
        start: toWorld([w / 2, 0]),
        dir: rotate([0, 1], st.rotation),
      },
      {
        treads: f2,
        firstStep: f1 + 1,
        rect: rectW(-run2, run1, 0, run1 + landing),
        start: toWorld([0, run1 + landing / 2]),
        dir: rotate([-1, 0], st.rotation),
      },
    ],
    landing: rectW(0, run1, w, run1 + landing),
    footprint: rectW(-run2, 0, w, run1 + landing),
    topExit: { at: toWorld([-run2, run1 + landing / 2]), dir: rotate([-1, 0], st.rotation) },
  };
}
