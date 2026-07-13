import {
  add, getAsset, pointOnWall, rotate, scale as vscale, stairLayout, wallDir, wallLength,
  wallNormal, wallPieces, type Point, type Polygon, type Project,
} from "@atelier/core";

/**
 * Model → GLB (glTF 2.0 binary) — P5+ backlog "render photoreal": xuất hình học
 * tham số (cùng nguồn với maquette 3D trong editor) để đưa sang Blender/viewer.
 * - Đơn vị mét, +Y lên (chuẩn glTF): (x,y,z)model mm → (x, z, −y)/1000.
 * - Mỗi entity một node (đặt tên theo id) — sang Blender chọn/gán vật liệu theo tên.
 * - v1: hộp tham số (tường tách mảnh quanh cửa như editor, thang từng bậc,
 *   nội thất theo footprint); LỖ trên sàn chưa khoét (ear-clip outline thuần).
 */

const MM = 1 / 1000;

type Vec3 = [number, number, number];

/** Chuyển hệ model (mm, z lên) → glTF (m, y lên). */
const toGltf = ([x, y, z]: Vec3): Vec3 => [x * MM, z * MM, -y * MM];

const COLOR: Record<string, [number, number, number]> = {
  wall: [0.95, 0.93, 0.88],
  glass: [0.61, 0.78, 0.91],
  door: [0.69, 0.54, 0.41],
  slab: [0.9, 0.87, 0.81],
  stair: [0.85, 0.82, 0.74],
  furniture: [0.69, 0.67, 0.61],
  giuong: [0.56, 0.64, 0.75],
  sofa: [0.5, 0.58, 0.68],
  "tu-ao": [0.66, 0.54, 0.39],
  "ban-an": [0.71, 0.6, 0.45],
  "bon-cau": [0.91, 0.91, 0.9],
  lavabo: [0.91, 0.91, 0.9],
  "xe-may": [0.6, 0.35, 0.29],
  "o-to": [0.49, 0.53, 0.58],
  "cay-canh": [0.37, 0.49, 0.31],
};

type MeshData = {
  name: string;
  material: string;
  positions: number[];
  normals: number[];
  indices: number[];
};

function pushQuad(m: MeshData, a: Vec3, b: Vec3, c: Vec3, d: Vec3): void {
  // pháp tuyến phẳng từ 2 cạnh
  const u: Vec3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const v: Vec3 = [d[0] - a[0], d[1] - a[1], d[2] - a[2]];
  const n: Vec3 = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const len = Math.hypot(...n) || 1;
  const nn = n.map((x) => x / len) as Vec3;
  const base = m.positions.length / 3;
  for (const p of [a, b, c, d]) {
    m.positions.push(...toGltf(p));
    m.normals.push(nn[0], nn[2], -nn[1]); // pháp tuyến cũng đổi hệ trục
  }
  m.indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
}

/** Hộp theo khung tùy hướng: origin (góc) + 3 vector cạnh (mm model). */
function pushBox(m: MeshData, o: Vec3, ex: Vec3, ey: Vec3, ez: Vec3): void {
  const P = (fx: number, fy: number, fz: number): Vec3 => [
    o[0] + ex[0] * fx + ey[0] * fy + ez[0] * fz,
    o[1] + ex[1] * fx + ey[1] * fy + ez[1] * fz,
    o[2] + ex[2] * fx + ey[2] * fy + ez[2] * fz,
  ];
  const [p000, p100, p110, p010] = [P(0, 0, 0), P(1, 0, 0), P(1, 1, 0), P(0, 1, 0)];
  const [p001, p101, p111, p011] = [P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1)];
  pushQuad(m, p001, p101, p111, p011); // nắp trên
  pushQuad(m, p010, p110, p100, p000); // đáy
  pushQuad(m, p000, p100, p101, p001); // 4 mặt bên
  pushQuad(m, p100, p110, p111, p101);
  pushQuad(m, p110, p010, p011, p111);
  pushQuad(m, p010, p000, p001, p011);
}

/** Ear-clipping cho polygon đơn (không lỗ) — trả chỉ số tam giác. */
export function earClip(poly: Polygon): number[] {
  const n = poly.length;
  if (n < 3) return [];
  // đảm bảo CCW
  let area2 = 0;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = poly[i]!;
    const [x2, y2] = poly[(i + 1) % n]!;
    area2 += x1 * y2 - x2 * y1;
  }
  const idx = [...poly.keys()];
  if (area2 < 0) idx.reverse();

  const cross = (a: Point, b: Point, c: Point): number =>
    (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const inTri = (p: Point, a: Point, b: Point, c: Point): boolean =>
    cross(a, b, p) >= 0 && cross(b, c, p) >= 0 && cross(c, a, p) >= 0;

  const out: number[] = [];
  let guard = 0;
  while (idx.length > 3 && guard++ < 10_000) {
    let clipped = false;
    for (let i = 0; i < idx.length; i++) {
      const ia = idx[(i + idx.length - 1) % idx.length]!;
      const ib = idx[i]!;
      const ic = idx[(i + 1) % idx.length]!;
      const [a, b, c] = [poly[ia]!, poly[ib]!, poly[ic]!];
      if (cross(a, b, c) <= 0) continue; // đỉnh lõm
      let ear = true;
      for (const j of idx) {
        if (j === ia || j === ib || j === ic) continue;
        if (inTri(poly[j]!, a, b, c)) {
          ear = false;
          break;
        }
      }
      if (!ear) continue;
      out.push(ia, ib, ic);
      idx.splice(i, 1);
      clipped = true;
      break;
    }
    if (!clipped) break; // polygon xấu — trả những gì đã cắt được
  }
  if (idx.length === 3) out.push(idx[0]!, idx[1]!, idx[2]!);
  return out;
}

/** Lăng trụ đứng từ polygon (mm model), z từ z0 tới z1. */
function pushPrism(m: MeshData, poly: Polygon, z0: number, z1: number): void {
  const tris = earClip(poly);
  const baseTop = m.positions.length / 3;
  for (const [x, y] of poly) {
    m.positions.push(...toGltf([x, y, z1]));
    m.normals.push(0, 1, 0);
  }
  for (let i = 0; i < tris.length; i += 3) m.indices.push(baseTop + tris[i]!, baseTop + tris[i + 1]!, baseTop + tris[i + 2]!);
  const baseBot = m.positions.length / 3;
  for (const [x, y] of poly) {
    m.positions.push(...toGltf([x, y, z0]));
    m.normals.push(0, -1, 0);
  }
  for (let i = 0; i < tris.length; i += 3) m.indices.push(baseBot + tris[i + 2]!, baseBot + tris[i + 1]!, baseBot + tris[i]!);
  for (let i = 0; i < poly.length; i++) {
    const [ax, ay] = poly[i]!;
    const [bx, by] = poly[(i + 1) % poly.length]!;
    pushQuad(m, [ax, ay, z0], [bx, by, z0], [bx, by, z1], [ax, ay, z1]);
  }
}

/** Dựng toàn bộ mesh từ model — một MeshData mỗi entity. */
export function buildMeshes(p: Project): MeshData[] {
  const meshes: MeshData[] = [];
  const mesh = (name: string, material: string): MeshData => {
    const m: MeshData = { name, material, positions: [], normals: [], indices: [] };
    meshes.push(m);
    return m;
  };

  for (const w of p.walls) {
    const level = p.levels.find((l) => l.id === w.level);
    if (!level) continue;
    const h = w.height ?? level.height;
    const d = wallDir(w);
    const nv = wallNormal(w);
    const openings = p.openings.filter((o) => o.wall === w.id);
    const m = mesh(w.id, w.kind === "kinh" ? "glass" : "wall");
    for (const piece of wallPieces(wallLength(w), h, openings)) {
      const a = pointOnWall(w, piece.u0);
      const start = add(a, vscale(nv, -w.thickness / 2));
      pushBox(
        m,
        [start[0], start[1], level.elevation + piece.z0],
        [(piece.u1 - piece.u0) * d[0], (piece.u1 - piece.u0) * d[1], 0],
        [nv[0] * w.thickness, nv[1] * w.thickness, 0],
        [0, 0, piece.z1 - piece.z0],
      );
    }
    // cánh cửa / kính cửa sổ — cho cảnh Blender có sẵn khối
    for (const o of openings) {
      const om = mesh(o.id, o.kind === "door" ? "door" : "glass");
      const thick = o.kind === "door" ? 42 : 36;
      const a = pointOnWall(w, o.offset + (o.kind === "door" ? o.width * 0.03 : 0));
      const width = o.kind === "door" ? o.width * 0.94 : o.width;
      const start = add(a, vscale(nv, -thick / 2));
      pushBox(
        om,
        [start[0], start[1], level.elevation + o.sill],
        [width * d[0], width * d[1], 0],
        [nv[0] * thick, nv[1] * thick, 0],
        [0, 0, o.height],
      );
    }
  }

  for (const s of p.slabs) {
    const level = p.levels.find((l) => l.id === s.level);
    if (!level) continue;
    const top = s.kind === "floor" ? level.elevation : level.elevation + level.height;
    const m = mesh(s.id, "slab");
    pushPrism(m, s.outline, top - s.thickness, top); // v1: chưa khoét lỗ
  }

  for (const st of p.stairs) {
    const level = p.levels.find((l) => l.id === st.level);
    if (!level) continue;
    const lay = stairLayout(st, level);
    const m = mesh(st.id, "stair");
    for (const f of lay.flights) {
      const across = vscale(rotate(f.dir, 90), st.width / 2);
      for (let i = 0; i < f.treads; i++) {
        const c = add(f.start, vscale(f.dir, i * st.tread));
        const corner = add(c, vscale(across, -1));
        const z = level.elevation + (f.firstStep - 1 + i) * lay.riser;
        pushBox(
          m,
          [corner[0], corner[1], z],
          [f.dir[0] * st.tread, f.dir[1] * st.tread, 0],
          [across[0] * 2, across[1] * 2, 0],
          [0, 0, lay.riser],
        );
      }
    }
    if (lay.landing) {
      const f1 = lay.flights[0]!;
      const zTop = level.elevation + (f1.firstStep - 1 + f1.treads) * lay.riser;
      pushPrism(m, lay.landing, zTop - 140, zTop);
    }
  }

  for (const f of p.furniture) {
    const level = p.levels.find((l) => l.id === f.level);
    const asset = getAsset(f.asset);
    if (!level || !asset) continue;
    const { w, d, h } = asset.footprint;
    const ex = rotate([w, 0], f.rotation);
    const ey = rotate([0, d], f.rotation);
    const corner = add(f.at, rotate([-w / 2, -d / 2], f.rotation));
    const z0 = level.elevation + (f.elevation ?? asset.mountHeight ?? 0);
    const m = mesh(f.id, COLOR[asset.category] ? asset.category : "furniture");
    pushBox(m, [corner[0], corner[1], z0], [ex[0], ex[1], 0], [ey[0], ey[1], 0], [0, 0, h]);
  }

  return meshes.filter((m) => m.indices.length > 0);
}

/** GLB v2 hoàn chỉnh (JSON + BIN một file). */
export function modelToGlb(p: Project): Buffer {
  const meshes = buildMeshes(p);

  const materialNames = [...new Set(meshes.map((m) => m.material))];
  const materials = materialNames.map((name) => ({
    name,
    pbrMetallicRoughness: {
      baseColorFactor: [...(COLOR[name] ?? COLOR.furniture!), 1],
      metallicFactor: 0,
      roughnessFactor: 0.85,
    },
    ...(name === "glass" ? { alphaMode: "BLEND" } : {}),
  }));
  if (materials.find((m) => m.name === "glass")) {
    const g = materials.find((m) => m.name === "glass")!;
    g.pbrMetallicRoughness.baseColorFactor = [...COLOR.glass!, 0.45];
  }

  const bin: Buffer[] = [];
  let offset = 0;
  const bufferViews: object[] = [];
  const accessors: object[] = [];
  const gltfMeshes: object[] = [];
  const nodes: object[] = [];

  const pushView = (data: Buffer, target: number): number => {
    const pad = (4 - (offset % 4)) % 4;
    if (pad) {
      bin.push(Buffer.alloc(pad));
      offset += pad;
    }
    bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: data.length, target });
    bin.push(data);
    offset += data.length;
    return bufferViews.length - 1;
  };

  for (const m of meshes) {
    const pos = new Float32Array(m.positions);
    const nor = new Float32Array(m.normals);
    const idx = new Uint32Array(m.indices);
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < pos.length; i += 3) {
      for (let k = 0; k < 3; k++) {
        min[k] = Math.min(min[k]!, pos[i + k]!);
        max[k] = Math.max(max[k]!, pos[i + k]!);
      }
    }
    const posAcc = accessors.length;
    accessors.push({ bufferView: pushView(Buffer.from(pos.buffer), 34962), componentType: 5126, count: pos.length / 3, type: "VEC3", min, max });
    const norAcc = accessors.length;
    accessors.push({ bufferView: pushView(Buffer.from(nor.buffer), 34962), componentType: 5126, count: nor.length / 3, type: "VEC3" });
    const idxAcc = accessors.length;
    accessors.push({ bufferView: pushView(Buffer.from(idx.buffer), 34963), componentType: 5125, count: idx.length, type: "SCALAR" });
    gltfMeshes.push({
      name: m.name,
      primitives: [{ attributes: { POSITION: posAcc, NORMAL: norAcc }, indices: idxAcc, material: materialNames.indexOf(m.material) }],
    });
    nodes.push({ name: m.name, mesh: gltfMeshes.length - 1 });
  }

  const binBuf = Buffer.concat(bin);
  const json = {
    asset: { version: "2.0", generator: `atelier ${p.meta.app}` },
    scene: 0,
    scenes: [{ name: p.meta.name, nodes: nodes.map((_, i) => i) }],
    nodes,
    meshes: gltfMeshes,
    materials,
    accessors,
    bufferViews,
    buffers: [{ byteLength: binBuf.length }],
  };

  let jsonBuf = Buffer.from(JSON.stringify(json), "utf8");
  const jsonPad = (4 - (jsonBuf.length % 4)) % 4;
  if (jsonPad) jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc(jsonPad, 0x20)]);
  const binPad = (4 - (binBuf.length % 4)) % 4;
  const binChunk = binPad ? Buffer.concat([binBuf, Buffer.alloc(binPad)]) : binBuf;

  const header = Buffer.alloc(12);
  header.write("glTF", 0, "ascii");
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + jsonBuf.length + 8 + binChunk.length, 8);
  const jsonHead = Buffer.alloc(8);
  jsonHead.writeUInt32LE(jsonBuf.length, 0);
  jsonHead.writeUInt32LE(0x4e4f534a, 4); // "JSON"
  const binHead = Buffer.alloc(8);
  binHead.writeUInt32LE(binChunk.length, 0);
  binHead.writeUInt32LE(0x004e4942, 4); // "BIN\0"

  return Buffer.concat([header, jsonHead, jsonBuf, binHead, binChunk]);
}
