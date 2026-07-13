import * as THREE from "three";
import type { Asset } from "@atelier/core";

/**
 * Dựng 3D THAM SỐ cho nội thất theo category (P5) — thay khối hộp trơn của P2.
 * Hệ LOCAL: gốc = TÂM footprint tại mặt sàn; x dọc bề ngang w, y dọc bề sâu d
 * (lưng ở -d/2 — kê sát tường), z lên. Đơn vị: MÉT (đã nhân MM).
 * Vẫn là maquette — đúng kích thước thật, đọc được hình dáng; glTF photoreal P5+.
 */

const MM = 1 / 1000;

/** Tông màu theo hậu tố id biến thể (…-go-soi, …-trang) — đè màu category. */
const SUFFIX_COLOR: Array<[string, number]> = [
  ["-go-oc-cho", 0x6d4c33],
  ["-go-soi", 0xc9a06e],
  ["-trang", 0xf2efe9],
  ["-da-nau", 0x7a4b32],
  ["-xam", 0x8f959c],
  ["-den", 0x3a3d42],
  ["-xanh-reu", 0x5c6b4f],
  ["-da", 0xd8d5cd],
];

const CATEGORY_COLOR: Record<string, number> = {
  giuong: 0x8fa3bf, "giuong-tang": 0x8fa3bf, "tu-dau-giuong": 0xa98963,
  "tu-ao": 0xa98963, "ban-trang-diem": 0xb59a72,
  sofa: 0x7f94ad, "ban-tra": 0xb59a72, "ke-tv": 0xa98963,
  "ban-an": 0xb59a72, "ghe-an": 0x9c8464, "ban-lam-viec": 0xb59a72, "ghe-xoay": 0x5a5f66,
  "ke-sach": 0xa98963, "tu-giay": 0xa98963,
  "tu-bep-duoi": 0x96876f, "tu-bep-tren": 0xa89a82, "tu-lanh": 0xd4d9de,
  "bon-cau": 0xe9e9e6, lavabo: 0xe9e9e6, "voi-sen": 0xc9d6dc, "bon-tam": 0xe9e9e6,
  guong: 0xbfd4d9, "binh-nong-lanh": 0xdedede, "may-giat": 0xd0d3d6,
  "may-lanh": 0xe8eaec, "quat-cay": 0x9aa0a6, "den-cay": 0xc9b98a, "cay-canh": 0x5f7d4f,
  "xe-may": 0x9a5a4a, "xe-dap": 0x4f6b8a, "o-to": 0x7d8894, "ban-tho": 0x8a5a3a,
};

export function furnitureColor(assetId: string, category: string): number {
  for (const [suffix, color] of SUFFIX_COLOR) if (assetId.endsWith(suffix)) return color;
  return CATEGORY_COLOR[category] ?? 0xb0aa9c;
}

const mat = (color: number, opts: Partial<THREE.MeshLambertMaterialParameters> = {}): THREE.MeshLambertMaterial =>
  new THREE.MeshLambertMaterial({ color, ...opts });

/** Trộn sáng/tối một màu (k>0 sáng hơn, k<0 tối hơn). */
function shade(color: number, k: number): number {
  const c = new THREE.Color(color);
  const target = k > 0 ? new THREE.Color(0xffffff) : new THREE.Color(0x000000);
  return c.lerp(target, Math.abs(k)).getHex();
}

type Ctx = {
  g: THREE.Group;
  color: number;
  w: number; // mét
  d: number;
  h: number;
};

/** Hộp (kích thước mm) đặt TÂM tại (x,y) mm, đáy tại z0 mm. */
function box(ctx: Ctx, wMm: number, dMm: number, hMm: number, x = 0, y = 0, z0 = 0, color = ctx.color): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(wMm * MM, dMm * MM, hMm * MM), mat(color));
  mesh.position.set(x * MM, y * MM, (z0 + hMm / 2) * MM);
  ctx.g.add(mesh);
  return mesh;
}

/** Trụ đứng (trục z), kích thước mm. */
function cyl(ctx: Ctx, rMm: number, hMm: number, x = 0, y = 0, z0 = 0, color = ctx.color): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rMm * MM, rMm * MM, hMm * MM, 20), mat(color));
  mesh.rotation.x = Math.PI / 2;
  mesh.position.set(x * MM, y * MM, (z0 + hMm / 2) * MM);
  ctx.g.add(mesh);
  return mesh;
}

/** Bánh xe: trụ nằm ngang trục x, mm. */
function wheel(ctx: Ctx, rMm: number, thickMm: number, x: number, y: number, color = 0x2e2e2e): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rMm * MM, rMm * MM, thickMm * MM, 18), mat(color));
  mesh.rotation.z = Math.PI / 2;
  mesh.position.set(x * MM, y * MM, rMm * MM);
  ctx.g.add(mesh);
  return mesh;
}

function legs4(ctx: Ctx, wMm: number, dMm: number, hMm: number, legMm = 50, color = shade(ctx.color, -0.3)): void {
  const dx = wMm / 2 - legMm;
  const dy = dMm / 2 - legMm;
  for (const [sx, sy] of [[1, 1], [1, -1], [-1, 1], [-1, -1]] as const) {
    box(ctx, legMm, legMm, hMm, sx * dx, sy * dy, 0, color);
  }
}

/** Group local hoàn chỉnh cho một asset — caller đặt vị trí/xoay/cao độ. */
export function buildFurnitureLocal(asset: Asset, assetId: string): THREE.Group {
  const g = new THREE.Group();
  const { w, d, h } = asset.footprint;
  const color = furnitureColor(assetId, asset.category);
  const ctx: Ctx = { g, color, w: w * MM, d: d * MM, h: h * MM };

  switch (asset.category) {
    case "giuong": {
      box(ctx, w, d, h * 0.5); // khung
      box(ctx, w - 100, d - 120, h * 0.45, 0, 10, h * 0.5, shade(color, 0.45)); // nệm
      box(ctx, w, 80, 900, 0, -d / 2 + 40, 0, shade(color, -0.2)); // đầu giường
      box(ctx, w * 0.6, d * 0.16, 120, 0, -d / 2 + 90 + d * 0.08, h * 0.95, 0xf4f1e8); // gối
      break;
    }
    case "giuong-tang": {
      box(ctx, w, d, 300, 0, 0, 250, shade(color, 0.3));
      box(ctx, w, d, 300, 0, 0, h - 400, shade(color, 0.3));
      for (const [sx, sy] of [[1, 1], [1, -1], [-1, 1], [-1, -1]] as const) {
        box(ctx, 60, 60, h, (sx * (w - 60)) / 2, (sy * (d - 60)) / 2, 0, shade(color, -0.2));
      }
      break;
    }
    case "sofa": {
      box(ctx, w, d, 420); // đệm ngồi
      box(ctx, w, 180, 800 - 420, 0, -d / 2 + 90, 420, shade(color, -0.12)); // tựa lưng
      box(ctx, 160, d, 620 - 420, -w / 2 + 80, 0, 420, shade(color, -0.12)); // tay trái
      box(ctx, 160, d, 620 - 420, w / 2 - 80, 0, 420, shade(color, -0.12)); // tay phải
      break;
    }
    case "ban-an":
    case "ban-tra":
    case "ban-lam-viec":
    case "ban-trang-diem": {
      box(ctx, w, d, 40, 0, 0, h - 40, shade(color, 0.15)); // mặt bàn
      legs4(ctx, w - 40, d - 40, h - 40);
      if (asset.category === "ban-trang-diem") box(ctx, w * 0.5, 30, 600, 0, -d / 2 + 15, h, 0xbfd4d9); // gương
      break;
    }
    case "ghe-an": {
      box(ctx, w, d, 40, 0, 0, 410, shade(color, 0.15));
      legs4(ctx, w - 30, d - 30, 410, 40);
      box(ctx, w, 40, h - 450, 0, -d / 2 + 20, 450, shade(color, -0.1)); // tựa
      break;
    }
    case "ghe-xoay": {
      cyl(ctx, 40, 350, 0, 0, 0, 0x3a3d42); // trục
      box(ctx, w, d, 80, 0, 0, 350, color);
      box(ctx, w, 60, h - 550, 0, -d / 2 + 30, 430, shade(color, -0.1));
      break;
    }
    case "ke-sach": {
      box(ctx, w, d, h, 0, 0, 0, shade(color, -0.15));
      const inner = shade(color, 0.4);
      const shelves = Math.max(3, Math.round(h / 400));
      for (let i = 1; i < shelves; i++) {
        box(ctx, w - 60, d - 40, 20, 0, 10, (h / shelves) * i, inner);
      }
      break;
    }
    case "tu-lanh": {
      box(ctx, w, d, h);
      box(ctx, w - 40, 20, 4, 0, d / 2, h * 0.65, shade(color, -0.35)); // chỉ chia 2 cánh
      break;
    }
    case "bon-cau": {
      box(ctx, w, 180, 780, 0, -d / 2 + 90, 0, color); // két
      cyl(ctx, w / 2 - 20, 400, 0, d * 0.12, 0, shade(color, 0.1)); // bệ
      break;
    }
    case "lavabo": {
      cyl(ctx, 90, h - 200, 0, 0, 0, shade(color, -0.08)); // chân
      cyl(ctx, Math.min(w, d) / 2 - 30, 180, 0, 0, h - 200, color); // chậu
      break;
    }
    case "voi-sen": {
      box(ctx, w, d, 60, 0, 0, 0, shade(color, 0.15)); // khay
      box(ctx, 50, 50, h - 60, -w / 2 + 40, -d / 2 + 40, 60, 0x9aa0a6); // cột sen
      break;
    }
    case "bon-tam": {
      box(ctx, w, d, h);
      box(ctx, w - 160, d - 160, 40, 0, 0, h - 38, shade(color, -0.25)); // lòng bồn
      break;
    }
    case "may-giat": {
      box(ctx, w, d, h);
      cyl(ctx, Math.min(w, h) * 0.3, 20, 0, d / 2 - 8, h * 0.45, 0x5a6570).rotation.x = 0; // cửa tròn (trục y)
      break;
    }
    case "xe-may": {
      wheel(ctx, 220, 90, 0, -d / 2 + 260);
      wheel(ctx, 220, 90, 0, d / 2 - 260);
      box(ctx, w * 0.4, d * 0.55, 260, 0, 40, 380, color); // thân + yên
      box(ctx, w - 80, 60, 40, 0, -d / 2 + 380, 900, shade(color, -0.25)); // ghi đông
      break;
    }
    case "xe-dap": {
      wheel(ctx, 330, 40, 0, -d / 2 + 340);
      wheel(ctx, 330, 40, 0, d / 2 - 340);
      box(ctx, 40, d * 0.55, 40, 0, 0, 560, color);
      break;
    }
    case "o-to": {
      box(ctx, w, d, 650, 0, 0, 250); // thân
      box(ctx, w - 250, d * 0.5, 550, 0, -d * 0.04, 900, shade(color, 0.2)); // cabin
      for (const [sx, sy] of [[1, 1], [1, -1], [-1, 1], [-1, -1]] as const) {
        wheel(ctx, 300, 210, (sx * (w - 230)) / 2, sy * (d / 2 - 750));
      }
      break;
    }
    case "ban-tho": {
      box(ctx, w, d, 60, 0, 0, h - 60, shade(color, 0.1));
      legs4(ctx, w - 60, d - 60, h - 60, 70);
      box(ctx, w, 30, 300, 0, -d / 2 + 15, h, shade(color, -0.15)); // hậu bành
      break;
    }
    case "cay-canh": {
      cyl(ctx, Math.min(w, d) * 0.32, h * 0.25, 0, 0, 0, 0x9c6b4f); // chậu
      const foliage = new THREE.Mesh(
        new THREE.SphereGeometry((Math.min(w, d) / 2) * MM, 12, 10),
        mat(color),
      );
      foliage.position.z = h * 0.62 * MM;
      foliage.scale.z = (h * 0.7) / Math.min(w, d);
      g.add(foliage);
      break;
    }
    case "den-cay": {
      cyl(ctx, 25, h - 350, 0, 0, 0, 0x6b6f75);
      const shade3d = new THREE.Mesh(new THREE.ConeGeometry(w * 0.45 * MM, 350 * MM, 16, 1, true), mat(color, { side: THREE.DoubleSide }));
      shade3d.rotation.x = Math.PI / 2;
      shade3d.position.z = (h - 175) * MM;
      g.add(shade3d);
      break;
    }
    case "quat-cay": {
      cyl(ctx, 25, h - 400, 0, 0, 0, 0x6b6f75);
      cyl(ctx, w / 2, 120, 0, 0, h - 400, shade(color, 0.2));
      break;
    }
    case "guong": {
      box(ctx, w, d, h, 0, 0, 0, 0xbfd4d9);
      break;
    }
    default: {
      // tủ áo, kệ TV, tủ bếp, máy lạnh, bình nóng lạnh, tủ giày… — khối đúng cỡ
      box(ctx, w, d, h);
      break;
    }
  }
  return g;
}
