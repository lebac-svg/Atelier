import {
  pointOnWall, stairLayout, wallDir, wallLength,
  type Point, type Polygon, type Project, type Wall,
} from "@atelier/core";

/**
 * Model → IFC4 (STEP/SPF) thuần TS — backlog "bàn giao KTS thật" (doc 10).
 * Mức CONCEPT: tường/cửa sổ-cửa đi (kèm lỗ IfcOpeningElement đúng quan hệ
 * voids/fills), sàn có LỖ thật (IfcArbitraryProfileDefWithVoids), vế thang
 * hộp + chiếu nghỉ, phòng thành IfcSpace, tầng IfcBuildingStorey.
 * Đơn vị: MILLIMETRE. Tọa độ tuyệt đối theo model (placement thế giới).
 * Đã nhắm mở được trong BIM viewer (IFC.js/BlenderBIM/Solibri) — chưa phải
 * hồ sơ thi công; ai cần sâu hơn nối IfcOpenShell từ file này.
 */

const GUID_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$";

/** GlobalId 22 ký tự, deterministic theo seed — chạy lại cùng model ra cùng file (diff được). */
export function ifcGuid(seed: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < seed.length; i++) {
    h1 = Math.imul(h1 ^ seed.charCodeAt(i), 0x01000193) >>> 0;
    h2 = Math.imul(h2 + seed.charCodeAt(i), 0x85ebca6b) >>> 0;
  }
  let out = "";
  let a = h1;
  let b = h2;
  for (let i = 0; i < 22; i++) {
    out += GUID_ALPHABET[((a ^ b) >>> 0) % 64];
    a = Math.imul(a, 0x01000193) + i + 1;
    a >>>= 0;
    b = (b >>> 5) | ((b & 31) << 27);
  }
  return out;
}

const real = (v: number): string => {
  const r = Math.round(v * 100) / 100;
  return Number.isInteger(r) ? `${r}.` : String(r);
};

const str = (s: string): string => `'${s.replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;

class Spf {
  private lines: string[] = [];
  private n = 0;

  e(type: string, args: string[]): string {
    this.n += 1;
    const id = `#${this.n}`;
    this.lines.push(`${id}=${type}(${args.join(",")});`);
    return id;
  }

  body(): string {
    return this.lines.join("\n");
  }
}

export function modelToIfc(p: Project): string {
  const f = new Spf();
  const G = (seed: string): string => str(ifcGuid(`${p.meta.id}:${seed}`));

  // ── nền tảng: đơn vị, ngữ cảnh hình học ─────────────────────
  const origin = f.e("IFCCARTESIANPOINT", ["(0.,0.,0.)"]);
  const zAxis = f.e("IFCDIRECTION", ["(0.,0.,1.)"]);
  const xAxis = f.e("IFCDIRECTION", ["(1.,0.,0.)"]);
  const worldA2P = f.e("IFCAXIS2PLACEMENT3D", [origin, zAxis, xAxis]);
  const context = f.e("IFCGEOMETRICREPRESENTATIONCONTEXT", ["$", "'Model'", "3", "1.E-5", worldA2P, "$"]);
  const mm = f.e("IFCSIUNIT", ["*", ".LENGTHUNIT.", ".MILLI.", ".METRE."]);
  const m2 = f.e("IFCSIUNIT", ["*", ".AREAUNIT.", "$", ".SQUARE_METRE."]);
  const m3 = f.e("IFCSIUNIT", ["*", ".VOLUMEUNIT.", "$", ".CUBIC_METRE."]);
  const rad = f.e("IFCSIUNIT", ["*", ".PLANEANGLEUNIT.", "$", ".RADIAN."]);
  const units = f.e("IFCUNITASSIGNMENT", [`(${mm},${m2},${m3},${rad})`]);
  const worldPlacement = f.e("IFCLOCALPLACEMENT", ["$", worldA2P]);

  const project = f.e("IFCPROJECT", [G("project"), "$", str(p.meta.name), "$", "$", "$", "$", `(${context})`, units]);
  const site = f.e("IFCSITE", [G("site"), "$", "'Site'", "$", "$", worldPlacement, "$", "$", ".ELEMENT.", "$", "$", "$", "$", "$"]);
  const building = f.e("IFCBUILDING", [G("building"), "$", str(p.meta.name), "$", "$", worldPlacement, "$", "$", ".ELEMENT.", "$", "$", "$"]);
  f.e("IFCRELAGGREGATES", [G("prj-site"), "$", "$", "$", project, `(${site})`]);
  f.e("IFCRELAGGREGATES", [G("site-bld"), "$", "$", "$", site, `(${building})`]);

  // helper hình học
  const dir3 = (x: number, y: number, z: number): string => f.e("IFCDIRECTION", [`(${real(x)},${real(y)},${real(z)})`]);
  const pt3 = (x: number, y: number, z: number): string => f.e("IFCCARTESIANPOINT", [`(${real(x)},${real(y)},${real(z)})`]);
  const a2p3 = (loc: string, axis?: string, ref?: string): string =>
    f.e("IFCAXIS2PLACEMENT3D", [loc, axis ?? "$", ref ?? "$"]);
  const polyline = (poly: Polygon): string => {
    const pts = [...poly, poly[0]!].map(([x, y]) => f.e("IFCCARTESIANPOINT", [`(${real(x)},${real(y)})`]));
    return f.e("IFCPOLYLINE", [`(${pts.join(",")})`]);
  };
  const bodyRep = (solid: string): string => {
    const shape = f.e("IFCSHAPEREPRESENTATION", [context, "'Body'", "'SweptSolid'", `(${solid})`]);
    return f.e("IFCPRODUCTDEFINITIONSHAPE", ["$", "$", `(${shape})`]);
  };
  /** Hộp: profile chữ nhật đặt tâm tại (cx,cy,cz), trục X theo (dx,dy), đùn lên depth. */
  const boxSolid = (cx: number, cy: number, cz: number, xLen: number, yLen: number, depth: number, dx = 1, dy = 0): string => {
    const prof = f.e("IFCRECTANGLEPROFILEDEF", [".AREA.", "$", "$", real(xLen), real(yLen)]);
    const pos = a2p3(pt3(cx, cy, cz), zAxis, dir3(dx, dy, 0));
    return f.e("IFCEXTRUDEDAREASOLID", [prof, pos, zAxis, real(depth)]);
  };
  const prismSolid = (outline: Polygon, holes: Polygon[], z: number, depth: number): string => {
    const outer = polyline(outline);
    const prof =
      holes.length === 0
        ? f.e("IFCARBITRARYCLOSEDPROFILEDEF", [".AREA.", "$", outer])
        : f.e("IFCARBITRARYPROFILEDEFWITHVOIDS", [".AREA.", "$", outer, `(${holes.map((h) => polyline(h)).join(",")})`]);
    const pos = a2p3(pt3(0, 0, z));
    return f.e("IFCEXTRUDEDAREASOLID", [prof, pos, zAxis, real(depth)]);
  };

  // ── tầng + phần tử ──────────────────────────────────────────
  const storeys: string[] = [];
  const contained = new Map<string, string[]>();
  const spaces = new Map<string, string[]>();
  const levels = [...p.levels].sort((a, b) => a.elevation - b.elevation);
  for (const lv of levels) {
    const storey = f.e("IFCBUILDINGSTOREY", [
      G(`storey-${lv.id}`), "$", str(lv.name), "$", "$", worldPlacement, "$", "$", ".ELEMENT.", real(lv.elevation),
    ]);
    storeys.push(storey);
    contained.set(lv.id, []);
    spaces.set(lv.id, []);
  }
  const storeyOf = (levelId: string): string => storeys[levels.findIndex((l) => l.id === levelId)]!;

  const wallEnt = new Map<string, string>();
  for (const w of p.walls) {
    const lv = levels.find((l) => l.id === w.level);
    if (!lv) continue;
    const len = wallLength(w);
    const d = wallDir(w);
    const mid = pointOnWall(w, len / 2);
    const h = w.height ?? lv.height;
    const solid = boxSolid(mid[0], mid[1], lv.elevation, len, w.thickness, h, d[0], d[1]);
    const ent = f.e("IFCWALL", [G(w.id), "$", str(w.id), "$", "$", worldPlacement, bodyRep(solid), "$", "$"]);
    wallEnt.set(w.id, ent);
    contained.get(w.level)!.push(ent);
  }

  for (const o of p.openings) {
    const w = p.walls.find((x) => x.id === o.wall);
    const host = wallEnt.get(o.wall);
    const lv = w && levels.find((l) => l.id === w.level);
    if (!w || !host || !lv) continue;
    const d = wallDir(w);
    const c = pointOnWall(w, o.offset + o.width / 2);
    // lỗ chờ: dày hơn tường 20mm để cắt lọt
    const holeSolid = boxSolid(c[0], c[1], lv.elevation + o.sill, o.width, w.thickness + 20, o.height, d[0], d[1]);
    const opening = f.e("IFCOPENINGELEMENT", [G(`${o.id}-void`), "$", str(`${o.id}-void`), "$", "$", worldPlacement, bodyRep(holeSolid), "$", ".OPENING."]);
    f.e("IFCRELVOIDSELEMENT", [G(`${o.id}-voids`), "$", "$", "$", host, opening]);

    const fillThick = o.kind === "door" ? 42 : 36;
    const fillSolid = boxSolid(c[0], c[1], lv.elevation + o.sill, o.width, fillThick, o.height, d[0], d[1]);
    const fill =
      o.kind === "door"
        ? f.e("IFCDOOR", [G(o.id), "$", str(o.id), "$", "$", worldPlacement, bodyRep(fillSolid), "$", real(o.height), real(o.width), "$", "$", "$"])
        : f.e("IFCWINDOW", [G(o.id), "$", str(o.id), "$", "$", worldPlacement, bodyRep(fillSolid), "$", real(o.height), real(o.width), "$", "$", "$"]);
    f.e("IFCRELFILLSELEMENT", [G(`${o.id}-fills`), "$", "$", "$", opening, fill]);
    contained.get(w.level)!.push(fill);
  }

  for (const s of p.slabs) {
    const lv = levels.find((l) => l.id === s.level);
    if (!lv) continue;
    const top = s.kind === "floor" ? lv.elevation : lv.elevation + lv.height;
    const solid = prismSolid(s.outline, s.holes ?? [], top - s.thickness, s.thickness);
    const kind = s.kind === "floor" ? ".FLOOR." : ".ROOF.";
    const ent = f.e("IFCSLAB", [G(s.id), "$", str(s.id), "$", "$", worldPlacement, bodyRep(solid), "$", kind]);
    contained.get(s.level)!.push(ent);
  }

  for (const st of p.stairs) {
    const lv = levels.find((l) => l.id === st.level);
    if (!lv) continue;
    const lay = stairLayout(st, lv);
    const parts: string[] = [];
    for (const [i, fl] of lay.flights.entries()) {
      const run = fl.treads * st.tread;
      const c: Point = [fl.start[0] + fl.dir[0] * (run / 2), fl.start[1] + fl.dir[1] * (run / 2)];
      const z = lv.elevation + (fl.firstStep - 1) * lay.riser;
      const solid = boxSolid(c[0], c[1], z, run, st.width, fl.treads * lay.riser, fl.dir[0], fl.dir[1]);
      parts.push(
        f.e("IFCSTAIRFLIGHT", [
          G(`${st.id}-f${i}`), "$", str(`${st.id} vế ${i + 1}`), "$", "$", worldPlacement, bodyRep(solid), "$",
          String(lay.riser > 0 ? fl.treads : 0), String(fl.treads), real(lay.riser), real(st.tread), ".STRAIGHT.",
        ]),
      );
    }
    if (lay.landing) {
      const f1 = lay.flights[0]!;
      const zTop = lv.elevation + (f1.firstStep - 1 + f1.treads) * lay.riser;
      const solid = prismSolid(lay.landing, [], zTop - 140, 140);
      parts.push(f.e("IFCSLAB", [G(`${st.id}-landing`), "$", str(`${st.id} chiếu nghỉ`), "$", "$", worldPlacement, bodyRep(solid), "$", ".LANDING."]));
    }
    const stair = f.e("IFCSTAIR", [G(st.id), "$", str(st.id), "$", "$", worldPlacement, "$", "$", ".HALF_TURN_STAIR."]);
    f.e("IFCRELAGGREGATES", [G(`${st.id}-parts`), "$", "$", "$", stair, `(${parts.join(",")})`]);
    contained.get(st.level)!.push(stair);
  }

  for (const r of p.rooms) {
    const lv = levels.find((l) => l.id === r.level);
    if (!lv) continue;
    const solid = prismSolid(r.polygon, [], lv.elevation, lv.height);
    const space = f.e("IFCSPACE", [
      G(r.id), "$", str(r.id), str(r.name), "$", worldPlacement, bodyRep(solid), str(r.use), ".ELEMENT.", ".INTERNAL.", "$",
    ]);
    spaces.get(r.level)!.push(space);
  }

  // ── quan hệ chứa/phân rã ────────────────────────────────────
  f.e("IFCRELAGGREGATES", [G("bld-storeys"), "$", "$", "$", building, `(${storeys.join(",")})`]);
  for (const lv of levels) {
    const els = contained.get(lv.id)!;
    if (els.length) {
      f.e("IFCRELCONTAINEDINSPATIALSTRUCTURE", [G(`contain-${lv.id}`), "$", "$", "$", `(${els.join(",")})`, storeyOf(lv.id)]);
    }
    const sps = spaces.get(lv.id)!;
    if (sps.length) {
      f.e("IFCRELAGGREGATES", [G(`spaces-${lv.id}`), "$", "$", "$", storeyOf(lv.id), `(${sps.join(",")})`]);
    }
  }

  const now = new Date().toISOString().slice(0, 19);
  return [
    "ISO-10303-21;",
    "HEADER;",
    `FILE_DESCRIPTION(('Atelier concept model — not for construction'),'2;1');`,
    `FILE_NAME(${str(p.meta.id + ".ifc")},'${now}',(''),(''),${str(p.meta.app)},${str("atelier ifc-writer")},'');`,
    "FILE_SCHEMA(('IFC4'));",
    "ENDSEC;",
    "DATA;",
    f.body(),
    "ENDSEC;",
    "END-ISO-10303-21;",
    "",
  ].join("\n");
}
