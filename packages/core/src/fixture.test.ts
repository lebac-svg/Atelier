import { describe, expect, it } from "vitest";
import { getAsset } from "./catalog.js";
import { loadNhaOng4x16 } from "./fixture.js";
import { collectIds } from "./ids.js";

describe("fixture nha-ong-4x16", () => {
  const p = loadNhaOng4x16();

  it("meta đúng quy ước", () => {
    expect(p.meta.unit).toBe("mm");
    expect(p.meta.revision).toBeGreaterThanOrEqual(0);
    expect(p.meta.app).toMatch(/^atelier\//);
  });

  it("ID không trùng nhau trong toàn model", () => {
    const all = [
      ...p.levels, ...p.walls, ...p.openings, ...p.slabs,
      ...p.stairs, ...p.rooms, ...p.furniture,
    ].map((e) => e.id);
    all.push(...p.axes.x.map((a) => a.id), ...p.axes.y.map((a) => a.id));
    expect(new Set(all).size).toBe(all.length);
  });

  it("mọi tham chiếu đều trỏ tới thực thể tồn tại", () => {
    const ids = collectIds(p);
    const levelIds = new Set(p.levels.map((l) => l.id));
    for (const w of p.walls) expect(levelIds.has(w.level), `wall ${w.id} → level`).toBe(true);
    for (const o of p.openings) {
      expect(ids.has(o.wall), `opening ${o.id} → wall ${o.wall}`).toBe(true);
      expect(o.style in p.styles.openings, `opening ${o.id} → style ${o.style}`).toBe(true);
    }
    for (const r of p.rooms) {
      expect(levelIds.has(r.level), `room ${r.id} → level`).toBe(true);
      for (const f of Object.values(r.finish ?? {})) {
        expect(f in p.finishes, `room ${r.id} → finish ${f}`).toBe(true);
      }
    }
    for (const f of p.furniture) {
      expect(levelIds.has(f.level), `furniture ${f.id} → level`).toBe(true);
      expect(getAsset(f.asset), `furniture ${f.id} → asset ${f.asset}`).toBeDefined();
    }
    for (const s of p.stairs) expect(levelIds.has(s.level)).toBe(true);
    for (const s of p.slabs) expect(levelIds.has(s.level)).toBe(true);
  });

  it("kích thước là mm số nguyên", () => {
    for (const w of p.walls) {
      for (const v of [...w.from, ...w.to, w.thickness]) expect(Number.isInteger(v)).toBe(true);
    }
    for (const o of p.openings) {
      for (const v of [o.offset, o.width, o.height, o.sill]) expect(Number.isInteger(v)).toBe(true);
    }
  });

  it("đủ nội dung cho demo P1: 2 tầng, 3 phòng ngủ, thang, giếng trời", () => {
    expect(p.levels).toHaveLength(2);
    expect(p.rooms.filter((r) => r.use === "ngu")).toHaveLength(3);
    expect(p.stairs).toHaveLength(1);
    expect(p.rooms.some((r) => r.use === "gieng-troi")).toBe(true);
    expect(p.brief.phong_thuy?.lo_ban).toBe(true);
  });
});
