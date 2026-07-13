import { describe, expect, it } from "vitest";
import { loadNhaOng4x16, type Furniture, type Opening, type Project, type Wall } from "@atelier/core";
import { modelDeltaToPaper, modelToPaper, paperToModel, type PlanTf } from "./plan-geom.js";
import { furnitureDragSession, openingDragSession, wallDragSession, type SnapOpts } from "./drag.js";
import { invertOps, UndoStack } from "./undo.js";

/* ── plan-geom: đảo ngược transform của renderer ───────────── */

describe("plan-geom — paper ↔ model", () => {
  const flat: PlanTf = { scale: 50, rotated: false, ox: 40, oy: 35, minX: 0, minY: 0, maxX: 4000, maxY: 16000 };
  const rot: PlanTf = { ...flat, rotated: true };

  it("roundtrip không xoay", () => {
    const m: [number, number] = [1230, 4560];
    expect(paperToModel(flat, modelToPaper(flat, m)).map(Math.round)).toEqual(m);
  });

  it("roundtrip có xoay (nhà dọc)", () => {
    const m: [number, number] = [1230, 4560];
    expect(paperToModel(rot, modelToPaper(rot, m)).map(Math.round)).toEqual(m);
  });

  it("khớp công thức toPaper của server (y lật, xoay đổi trục)", () => {
    expect(modelToPaper(flat, [0, 16000])).toEqual([40, 35]); // góc trên-trái giấy
    expect(modelToPaper(rot, [0, 0])).toEqual([40, 35]);
  });

  it("delta model → delta giấy", () => {
    expect(modelDeltaToPaper(flat, [100, 200])).toEqual([2, -4]);
    expect(modelDeltaToPaper(rot, [100, 200])).toEqual([4, 2]);
  });
});

/* ── drag sessions ─────────────────────────────────────────── */

const SNAP: SnapOpts = { grid: 50, tol: 30, noSnap: false };

/** data của op update/add — test biết chắc op không phải delete. */
function opData(op: { op: string } | null | undefined): Record<string, unknown> {
  if (!op || op.op === "delete") throw new Error("op không có data");
  return (op as unknown as { data: Record<string, unknown> }).data;
}

function fixture(): Project {
  return loadNhaOng4x16();
}

function wallOf(p: Project, id: string): Wall {
  const w = p.walls.find((x) => x.id === id);
  if (!w) throw new Error(`fixture thiếu tường ${id}`);
  return w;
}

describe("wallDragSession — kéo tường dọc pháp tuyến", () => {
  it("kéo lệch vẫn chỉ trượt theo pháp tuyến, op giữ hướng tường", () => {
    const p = fixture();
    // tường ngang bất kỳ trong fixture
    const w = p.walls.find((x) => x.level === "L1" && x.from[1] === x.to[1] && x.id !== "W1")!;
    const s = wallDragSession(p, w, [w.from[0] + 500, w.from[1]]);
    const st = s.update([w.from[0] + 900, w.from[1] + 400], { ...SNAP, grid: 0, tol: 0 });
    expect(st.delta[0]).toBeCloseTo(0, 4); // không trượt dọc tường
    expect(Math.abs(st.delta[1])).toBeCloseTo(400, 4);
    const data = st.op!.op === "update" ? (st.op!.data as { from: [number, number]; to: [number, number] }) : null;
    expect(data!.from[0]).toBe(w.from[0]);
    expect(data!.to[0]).toBe(w.to[0]);
  });

  it("snap lưới 50 trên vị trí tim", () => {
    const p = fixture();
    const w = p.walls.find((x) => x.level === "L1" && x.from[1] === x.to[1] && x.id !== "W1")!;
    const s = wallDragSession(p, w, [w.from[0] + 500, w.from[1]]);
    const st = s.update([w.from[0] + 500, w.from[1] + 137], SNAP);
    expect(Math.round(w.from[1] + st.delta[1]) % 50).toBe(0);
  });

  it("gõ số chốt đúng khoảng cách tới tường neo", () => {
    const p = fixture();
    const w = p.walls.find((x) => x.level === "L1" && x.from[1] === x.to[1] && x.id !== "W1")!;
    const s = wallDragSession(p, w, [w.from[0] + 500, w.from[1]]);
    s.update([w.from[0] + 500, w.from[1] + 137], SNAP);
    const st = s.typed(4200, SNAP);
    expect(st).not.toBeNull();
    expect(st!.hud!.text).toContain("4.200");
    // op ra tọa độ nguyên
    const data = st!.op!.op === "update" ? (st!.op!.data as { from: [number, number] }) : null;
    expect(Number.isInteger(data!.from[1])).toBe(true);
  });

  it("hud hiện khoảng cách tim→tim tới tường song song gần nhất", () => {
    const p = fixture();
    const w = p.walls.find((x) => x.level === "L1" && x.from[1] === x.to[1] && x.id !== "W1")!;
    const s = wallDragSession(p, w, [w.from[0] + 500, w.from[1]]);
    const st = s.update([w.from[0] + 500, w.from[1]], { ...SNAP, noSnap: true });
    expect(st.hud!.text).toMatch(/^→ W/);
  });
});

describe("openingDragSession — trượt cửa dọc tường", () => {
  function pick(p: Project): { w: Wall; o: Opening } {
    const o = p.openings.find((x) => x.kind === "door")!;
    return { w: wallOf(p, o.wall), o };
  }

  it("kéo quá đầu tường bị chặn trong [0, dài - rộng]", () => {
    const p = fixture();
    const { w, o } = pick(p);
    const s = openingDragSession(p, w, o, [w.from[0], w.from[1]]);
    const far: [number, number] = [w.to[0] * 3 - w.from[0] * 2, w.to[1] * 3 - w.from[1] * 2];
    const st = s.update(far, { ...SNAP, noSnap: true });
    const off = st.op ? (opData(st.op) as { offset: number }).offset : o.offset;
    expect(off).toBeLessThanOrEqual(Math.round(w.from[0] === w.to[0] ? Math.abs(w.to[1] - w.from[1]) : Math.abs(w.to[0] - w.from[0])) - o.width);
    expect(off).toBeGreaterThanOrEqual(0);
  });

  it("gõ số áp cho đầu gần hơn", () => {
    const p = fixture();
    const { w, o } = pick(p);
    const s = openingDragSession(p, w, o, [w.from[0], w.from[1]]);
    // đưa cửa về gần đầu from
    s.update([w.from[0], w.from[1]], { ...SNAP, noSnap: true });
    const st = s.typed(300, SNAP);
    expect(st).not.toBeNull();
    expect((opData(st!.op) as { offset: number }).offset).toBe(300);
  });

  it("HUD hiện khoảng cách hai đầu", () => {
    const p = fixture();
    const { w, o } = pick(p);
    const s = openingDragSession(p, w, o, [w.from[0], w.from[1]]);
    const st = s.update([(w.from[0] + w.to[0]) / 2, (w.from[1] + w.to[1]) / 2], SNAP);
    expect(st.hud!.text).toMatch(/◁ .+ · .+ ▷/);
  });
});

describe("furnitureDragSession — kéo nội thất", () => {
  function pick(p: Project): Furniture {
    return p.furniture.find((x) => x.level === "L1")!;
  }

  it("snap lưới trên tâm", () => {
    const p = fixture();
    const f = pick(p);
    const s = furnitureDragSession(p, f, f.at);
    const st = s.update([f.at[0] + 123, f.at[1] + 77], { ...SNAP, tol: 0 });
    const at = (opData(st.op) as { at: [number, number] }).at;
    expect(at[0] % 50).toBe(0);
    expect(at[1] % 50).toBe(0);
  });

  it("gõ khe hở đặt đúng khoảng cách tới mặt tường", () => {
    const p = fixture();
    const f = pick(p);
    const s = furnitureDragSession(p, f, f.at);
    s.update(f.at, SNAP);
    const st = s.typed(100, SNAP);
    // fixture có tường quanh phòng — phải có neo
    expect(st).not.toBeNull();
    expect(st!.hud!.text).toContain("khe");
    expect(st!.hud!.text).toContain("100");
  });
});

/* ── undo ──────────────────────────────────────────────────── */

describe("invertOps — op nghịch đảo per-origin", () => {
  it("update → update giá trị cũ", () => {
    const p = fixture();
    const w = p.walls[0]!;
    const inv = invertOps(p, [{ op: "update", entity: "wall", id: w.id, data: { from: [0, 0], to: [1000, 0] } }]);
    expect(inv).toEqual([{ op: "update", entity: "wall", id: w.id, data: { from: w.from, to: w.to } }]);
  });

  it("delete tường → add lại tường + openings cascade", () => {
    const p = fixture();
    const o = p.openings[0]!;
    const inv = invertOps(p, [{ op: "delete", entity: "wall", id: o.wall }])!;
    expect(inv[0]!.op).toBe("add");
    expect((inv[0] as { data: { id: string } }).data.id).toBe(o.wall);
    expect(inv.some((x) => x.op === "add" && (x.data as { id?: string }).id === o.id)).toBe(true);
  });

  it("add → delete; update field lạ → null", () => {
    const p = fixture();
    expect(invertOps(p, [{ op: "add", entity: "wall", data: { id: "W99" } }])).toEqual([
      { op: "delete", entity: "wall", id: "W99" },
    ]);
    expect(invertOps(p, [{ op: "update", entity: "wall", id: p.walls[0]!.id, data: { totallyNew: 1 } }])).toBeNull();
  });

  it("stack: undo chuyển sang redo khi xác nhận", () => {
    const s = new UndoStack();
    s.push({ undo: [], redo: [], label: "a" });
    expect(s.canUndo).toBe(true);
    const e = s.peekUndo();
    s.confirmUndo();
    expect(s.canUndo).toBe(false);
    expect(s.peekRedo()).toBe(e);
  });
});
