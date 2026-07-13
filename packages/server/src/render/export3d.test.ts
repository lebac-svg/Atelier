import { describe, expect, it } from "vitest";
import { getAsset, loadNhaOng4x16, stairLayout } from "@atelier/core";
import { buildMeshes, earClip, modelToGlb } from "./gltf-writer.js";
import { ifcGuid, modelToIfc } from "./ifc-writer.js";

const P = loadNhaOng4x16();

describe("gltf-writer — GLB xuất cho Blender/viewer", () => {
  it("earClip: vuông 2 tam giác (cả CW), chữ L lõm 4 tam giác, suy biến rỗng", () => {
    expect(earClip([[0, 0], [4000, 0], [4000, 4000], [0, 4000]])).toHaveLength(6);
    expect(earClip([[0, 0], [0, 4000], [4000, 4000], [4000, 0]])).toHaveLength(6);
    expect(earClip([[0, 0], [6000, 0], [6000, 3000], [3000, 3000], [3000, 6000], [0, 6000]])).toHaveLength(12);
    expect(earClip([[0, 0], [1000, 1000]])).toHaveLength(0);
  });

  it("mỗi entity một mesh đặt tên theo id", () => {
    const meshes = buildMeshes(P);
    const names = new Set(meshes.map((m) => m.name));
    for (const w of P.walls) expect(names.has(w.id), w.id).toBe(true);
    for (const o of P.openings) expect(names.has(o.id), o.id).toBe(true);
    for (const s of P.slabs) expect(names.has(s.id), s.id).toBe(true);
    for (const st of P.stairs) expect(names.has(st.id), st.id).toBe(true);
    const placeable = P.furniture.filter((f) => getAsset(f.asset));
    for (const f of placeable) expect(names.has(f.id), f.id).toBe(true);
    expect(meshes).toHaveLength(
      P.walls.length + P.openings.length + P.slabs.length + P.stairs.length + placeable.length,
    );
  });

  it("GLB: container v2 chuẩn, JSON parse được, tọa độ mét thật", () => {
    const glb = modelToGlb(P);
    expect(glb.toString("ascii", 0, 4)).toBe("glTF");
    expect(glb.readUInt32LE(4)).toBe(2);
    expect(glb.readUInt32LE(8)).toBe(glb.length); // tổng độ dài trong header khớp buffer
    const jsonLen = glb.readUInt32LE(12);
    expect(glb.readUInt32LE(16)).toBe(0x4e4f534a); // "JSON"
    const json = JSON.parse(glb.toString("utf8", 20, 20 + jsonLen));
    expect(json.asset.version).toBe("2.0");
    expect(json.nodes).toHaveLength(json.meshes.length);
    expect(glb.readUInt32LE(20 + jsonLen + 4)).toBe(0x004e4942); // chunk BIN ngay sau JSON
    // nhà 4×16m cao ~8m — mọi bound của accessor POSITION phải nằm trong ±20m
    for (const a of json.accessors as Array<{ min?: number[]; max?: number[] }>) {
      for (const v of [...(a.min ?? []), ...(a.max ?? [])]) expect(Math.abs(v)).toBeLessThan(20);
    }
    const glass = (json.materials as Array<{ name: string; alphaMode?: string }>).find((m) => m.name === "glass");
    expect(glass?.alphaMode).toBe("BLEND");
  });
});

describe("ifc-writer — IFC4 SPF concept", () => {
  const ifc = modelToIfc(P);
  const count = (type: string): number => (ifc.match(new RegExp(`=${type}\\(`, "g")) ?? []).length;

  it("khung ISO-10303-21 + schema IFC4", () => {
    expect(ifc.startsWith("ISO-10303-21;")).toBe(true);
    expect(ifc).toContain("FILE_SCHEMA(('IFC4'));");
    expect(ifc.trimEnd().endsWith("END-ISO-10303-21;")).toBe(true);
  });

  it("số phần tử khớp model: tường, cửa + quan hệ voids/fills, phòng, tầng", () => {
    expect(count("IFCWALL")).toBe(P.walls.length);
    expect(count("IFCDOOR")).toBe(P.openings.filter((o) => o.kind === "door").length);
    expect(count("IFCWINDOW")).toBe(P.openings.filter((o) => o.kind !== "door").length);
    expect(count("IFCOPENINGELEMENT")).toBe(P.openings.length);
    expect(count("IFCRELVOIDSELEMENT")).toBe(P.openings.length);
    expect(count("IFCRELFILLSELEMENT")).toBe(P.openings.length);
    expect(count("IFCSPACE")).toBe(P.rooms.length);
    expect(count("IFCBUILDINGSTOREY")).toBe(P.levels.length);
    expect(count("IFCRELCONTAINEDINSPATIALSTRUCTURE")).toBe(P.levels.length);
    expect(count("IFCPROJECT")).toBe(1);
    expect(count("IFCSTAIR")).toBe(P.stairs.length);
    expect(count("IFCSTAIRFLIGHT")).toBeGreaterThanOrEqual(P.stairs.length);
  });

  it("sàn: lỗ thang thành profile-with-voids; chiếu nghỉ là IFCSLAB .LANDING.", () => {
    expect(P.slabs.some((s) => (s.holes ?? []).length > 0)).toBe(true); // fixture phải có lỗ thang
    expect(count("IFCARBITRARYPROFILEDEFWITHVOIDS")).toBeGreaterThanOrEqual(1);
    const landings = P.stairs.filter(
      (st) => stairLayout(st, P.levels.find((l) => l.id === st.level)!).landing,
    ).length;
    expect(count("IFCSLAB")).toBe(P.slabs.length + landings);
    if (landings > 0) expect(ifc).toContain(".LANDING.");
  });

  it("deterministic: chạy lại ra cùng nội dung (trừ dòng FILE_NAME có timestamp)", () => {
    const strip = (s: string): string => s.split("\n").filter((l) => !l.startsWith("FILE_NAME")).join("\n");
    expect(strip(modelToIfc(P))).toBe(strip(ifc));
  });

  it("ifcGuid: 22 ký tự đúng bảng chữ IFC, deterministic, seed khác ra khác", () => {
    const g = ifcGuid("W1");
    expect(g).toHaveLength(22);
    expect(/^[0-9A-Za-z_$]{22}$/.test(g)).toBe(true);
    expect(ifcGuid("W1")).toBe(g);
    expect(ifcGuid("W2")).not.toBe(g);
  });
});
