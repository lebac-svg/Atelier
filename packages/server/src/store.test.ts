import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { Project } from "@atelier/core";
import { ProjectStore, slugify } from "./store.js";

const freshStore = (): ProjectStore => new ProjectStore(mkdtempSync(path.join(tmpdir(), "atelier-")));

describe("ProjectStore", () => {
  it("tạo từ template, revision 0, file ghi ra đĩa", () => {
    const store = freshStore();
    const p = store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
    expect(p.meta.id).toBe("nha-anh-ba");
    expect(p.meta.revision).toBe(0);
    const onDisk = JSON.parse(readFileSync(store.filePath, "utf8")) as Project;
    expect(onDisk.meta.name).toBe("Nhà anh Ba");
    expect(onDisk.walls.length).toBeGreaterThan(0);
  });

  it("không nghiền dự án đang có (project_new lần 2 bị chặn)", () => {
    const store = freshStore();
    store.newProject("Nhà 1");
    expect(() => store.newProject("Nhà 2")).toThrowError(/Đã có dự án/);
  });

  it("apply thành công → persist + journal; apply phạm block → file không đổi", () => {
    const store = freshStore();
    store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
    const ok = store.apply(0, [
      { op: "add", entity: "wall", data: { id: "W99", level: "L1", from: [220, 3000], to: [3780, 3000], thickness: 110, kind: "gach" } },
    ], "tường thử");
    expect(ok.ok).toBe(true);
    expect((JSON.parse(readFileSync(store.filePath, "utf8")) as Project).meta.revision).toBe(1);

    // cửa vượt ra ngoài tường → GEO-01 block, transaction hủy
    const bad = store.apply(1, [
      { op: "add", entity: "opening", data: { id: "D99", wall: "W99", kind: "door", style: "DP", offset: 3400, width: 800, height: 2100, sill: 0 } },
    ]);
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.errors[0]!.rule).toBe("GEO-01");
    expect((JSON.parse(readFileSync(store.filePath, "utf8")) as Project).meta.revision).toBe(1);

    const { entries, currentRevision } = store.changesSince(0);
    expect(currentRevision).toBe(1);
    expect(entries).toHaveLength(1);
    expect(entries[0]!.summary).toContain("thêm tường W99");
    expect(entries[0]!.note).toBe("tường thử");
  });

  it("đóng mở lại giữ nguyên model (openProject roundtrip)", () => {
    const store = freshStore();
    store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
    store.apply(0, [{ op: "update", entity: "level", id: "L2", data: { height: 3500 } }]);
    const reopened = new ProjectStore(store.baseDir).openProject();
    expect(reopened.meta.revision).toBe(1);
    expect(reopened.levels.find((l) => l.id === "L2")!.height).toBe(3500);
  });

  it("slugify tiếng Việt", () => {
    expect(slugify("Nhà Ống 4×16 — Anh Ba & Bà Nội")).toBe("nha-ong-4-16-anh-ba-ba-noi");
    expect(slugify("Đường Đá Đỏ")).toBe("duong-da-do");
  });
});
