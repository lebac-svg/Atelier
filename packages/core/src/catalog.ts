/**
 * Catalog nội thất chuẩn hóa (P5) — asset THAM SỐ HÓA: kích thước mm thật,
 * tên tiếng Việt, khe hở khuyến nghị. Hình 3D dựng tham số theo category
 * (web/three3d), ký hiệu 2D trong renderer (plan-scene) — CC0 by construction,
 * nguồn ghi ở assets/license-manifest.json. glTF photoreal: pipeline P5+
 * (doc 10) — footprint ở đây là hợp đồng kích thước, thay model không đổi id.
 *
 * Kích thước mm: w = ngang (local +x khi rotation 0), d = sâu (+y), h = cao.
 * "Lưng" asset ở cạnh -d/2 (kê sát tường), "mặt trước" +d/2 (xem obb.ts).
 */

export type AssetCategory =
  | "giuong"
  | "giuong-tang"
  | "tu-dau-giuong"
  | "tu-ao"
  | "ban-trang-diem"
  | "sofa"
  | "ban-tra"
  | "ke-tv"
  | "ban-an"
  | "ghe-an"
  | "ban-lam-viec"
  | "ghe-xoay"
  | "ke-sach"
  | "tu-giay"
  | "tu-bep-duoi"
  | "tu-bep-tren"
  | "tu-lanh"
  | "bon-cau"
  | "lavabo"
  | "voi-sen"
  | "bon-tam"
  | "guong"
  | "binh-nong-lanh"
  | "may-giat"
  | "may-lanh"
  | "quat-cay"
  | "den-cay"
  | "cay-canh"
  | "xe-may"
  | "xe-dap"
  | "o-to"
  | "ban-tho";

export type Asset = {
  id: string;
  label: string; // tiếng Việt, hiện trên UI/bản vẽ
  category: AssetCategory;
  footprint: { w: number; d: number; h: number };
  /** Khe hở khuyến nghị quanh asset (nuôi STD-11), theo cạnh local. */
  clearance?: { front?: number; sides?: number };
  /** Đồ treo tường — cao mặc định của mép DƯỚI so với sàn (gợi ý elevation). */
  mountHeight?: number;
};

const A = (
  id: string,
  label: string,
  category: AssetCategory,
  w: number,
  d: number,
  h: number,
  extra: Partial<Pick<Asset, "clearance" | "mountHeight">> = {},
): Asset => ({ id, label, category, footprint: { w, d, h }, ...extra });

export const CATALOG: Asset[] = [
  // ── Giường & phòng ngủ ─────────────────────────────────────
  A("giuong-1m", "Giường đơn 1m", "giuong", 1000, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-1m2", "Giường đơn 1m2", "giuong", 1200, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-1m4", "Giường đôi 1m4", "giuong", 1400, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-1m6", "Giường đôi 1m6", "giuong", 1600, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-1m8", "Giường đôi 1m8", "giuong", 1800, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-2m", "Giường king 2m", "giuong", 2000, 2200, 400, { clearance: { sides: 600 } }),
  A("giuong-tang-1m", "Giường tầng trẻ em 1m", "giuong-tang", 1000, 2000, 1600, { clearance: { sides: 600 } }),
  A("giuong-tang-1m2", "Giường tầng 1m2", "giuong-tang", 1200, 2000, 1700, { clearance: { sides: 600 } }),
  A("noi-em-be", "Nôi/cũi em bé", "giuong", 650, 1200, 900, { clearance: { sides: 500 } }),
  A("tu-dau-giuong-40", "Tủ đầu giường 40", "tu-dau-giuong", 400, 400, 450),
  A("tu-dau-giuong-50", "Tủ đầu giường 50", "tu-dau-giuong", 500, 400, 500),
  A("tu-ao-1m", "Tủ áo 1m", "tu-ao", 1000, 550, 2200, { clearance: { front: 600 } }),
  A("tu-ao-1m2", "Tủ áo 1m2", "tu-ao", 1200, 550, 2200, { clearance: { front: 600 } }),
  A("tu-ao-1m6", "Tủ áo 1m6", "tu-ao", 1600, 600, 2400, { clearance: { front: 600 } }),
  A("tu-ao-2m", "Tủ áo 2m", "tu-ao", 2000, 600, 2400, { clearance: { front: 600 } }),
  A("tu-ao-2m4", "Tủ áo 2m4 cửa lùa", "tu-ao", 2400, 650, 2400, { clearance: { front: 550 } }),
  A("ban-trang-diem", "Bàn trang điểm", "ban-trang-diem", 1000, 450, 750, { clearance: { front: 600 } }),

  // ── Phòng khách ────────────────────────────────────────────
  A("sofa-don", "Ghế sofa đơn", "sofa", 900, 850, 800),
  A("sofa-2s", "Sofa văng 2 chỗ", "sofa", 1500, 850, 800),
  A("sofa-3s-01", "Sofa văng 3 chỗ", "sofa", 1800, 850, 800),
  A("sofa-3s-22", "Sofa 3 chỗ lớn", "sofa", 2200, 900, 800),
  A("sofa-goc-l", "Sofa góc chữ L", "sofa", 2600, 1600, 800),
  A("ban-tra-vuong", "Bàn trà vuông 60", "ban-tra", 600, 600, 420),
  A("ban-tra-chu-nhat", "Bàn trà 1m1", "ban-tra", 1100, 550, 420),
  A("ban-tra-tron", "Bàn trà tròn 70", "ban-tra", 700, 700, 450),
  A("ke-tv-1200", "Kệ TV 1m2", "ke-tv", 1200, 400, 500),
  A("ke-tv-1600", "Kệ TV 1m6", "ke-tv", 1600, 450, 500),
  A("ke-tv-2000", "Kệ TV 2m", "ke-tv", 2000, 450, 500),
  A("tu-giay-800", "Tủ giày 80", "tu-giay", 800, 350, 1000),
  A("tu-giay-1200", "Tủ giày 1m2", "tu-giay", 1200, 350, 1100),

  // ── Bếp & ăn ───────────────────────────────────────────────
  A("ban-an-2", "Bàn ăn 2 chỗ", "ban-an", 800, 800, 750, { clearance: { front: 800 } }),
  A("ban-an-4", "Bàn ăn 4 chỗ", "ban-an", 1400, 800, 750, { clearance: { front: 800 } }),
  A("ban-an-6", "Bàn ăn 6 chỗ", "ban-an", 1800, 900, 750, { clearance: { front: 800 } }),
  A("ban-an-8", "Bàn ăn 8 chỗ", "ban-an", 2200, 1000, 750, { clearance: { front: 800 } }),
  A("ban-an-tron-1m", "Bàn ăn tròn 1m", "ban-an", 1000, 1000, 750, { clearance: { front: 800 } }),
  A("ghe-an", "Ghế ăn", "ghe-an", 450, 500, 900),
  A("ghe-bang-an", "Ghế băng ăn 1m4", "ghe-an", 1400, 350, 450),
  A("tu-bep-duoi-06", "Tủ bếp dưới 60 (module)", "tu-bep-duoi", 600, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-duoi-12", "Tủ bếp dưới 1m2", "tu-bep-duoi", 1200, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-duoi-18", "Tủ bếp dưới 1m8 (kèm chậu)", "tu-bep-duoi", 1800, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-duoi-24", "Tủ bếp dưới 2m4 (kèm chậu + bếp nấu)", "tu-bep-duoi", 2400, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-duoi-30", "Tủ bếp dưới 3m (kèm chậu + bếp nấu)", "tu-bep-duoi", 3000, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-goc", "Tủ bếp dưới góc L 1m8×1m8", "tu-bep-duoi", 1800, 1800, 850, { clearance: { front: 900 } }),
  A("tu-bep-tren-06", "Tủ bếp trên 60", "tu-bep-tren", 600, 350, 700, { mountHeight: 1450 }),
  A("tu-bep-tren-12", "Tủ bếp trên 1m2", "tu-bep-tren", 1200, 350, 700, { mountHeight: 1450 }),
  A("tu-bep-tren-18", "Tủ bếp trên 1m8", "tu-bep-tren", 1800, 350, 700, { mountHeight: 1450 }),
  A("tu-bep-tren-24", "Tủ bếp trên 2m4", "tu-bep-tren", 2400, 350, 700, { mountHeight: 1450 }),
  A("tu-lanh-mini", "Tủ lạnh mini", "tu-lanh", 500, 550, 850),
  A("tu-lanh", "Tủ lạnh 2 cánh", "tu-lanh", 700, 700, 1700, { clearance: { front: 700 } }),
  A("tu-lanh-sbs", "Tủ lạnh side-by-side", "tu-lanh", 900, 750, 1800, { clearance: { front: 700 } }),

  // ── Làm việc & học ─────────────────────────────────────────
  A("ban-hoc", "Bàn học/làm việc 1m", "ban-lam-viec", 1000, 500, 750, { clearance: { front: 750 } }),
  A("ban-lam-viec-1m2", "Bàn làm việc 1m2", "ban-lam-viec", 1200, 600, 750, { clearance: { front: 750 } }),
  A("ban-lam-viec-1m4", "Bàn làm việc 1m4", "ban-lam-viec", 1400, 700, 750, { clearance: { front: 750 } }),
  A("ghe-xoay", "Ghế xoay văn phòng", "ghe-xoay", 600, 600, 1000),
  A("ke-sach-600", "Kệ sách 60", "ke-sach", 600, 300, 1800),
  A("ke-sach-800", "Kệ sách 80", "ke-sach", 800, 300, 2000),
  A("ke-sach-1200", "Kệ sách 1m2", "ke-sach", 1200, 350, 2000),

  // ── Vệ sinh ────────────────────────────────────────────────
  A("bon-cau", "Bồn cầu 2 khối", "bon-cau", 400, 700, 780, { clearance: { front: 500, sides: 200 } }),
  A("bon-cau-1-khoi", "Bồn cầu 1 khối", "bon-cau", 420, 740, 700, { clearance: { front: 500, sides: 200 } }),
  A("lavabo", "Chậu rửa mặt", "lavabo", 550, 420, 850, { clearance: { front: 550 } }),
  A("lavabo-tu", "Lavabo kèm tủ 80", "lavabo", 800, 480, 850, { clearance: { front: 550 } }),
  A("lavabo-doi", "Lavabo đôi 1m2", "lavabo", 1200, 500, 850, { clearance: { front: 550 } }),
  A("voi-sen", "Khu tắm đứng vòi sen", "voi-sen", 900, 900, 2000),
  A("voi-sen-80", "Khu tắm đứng 80", "voi-sen", 800, 800, 2000),
  A("bon-tam-15", "Bồn tắm 1m5", "bon-tam", 1500, 750, 600, { clearance: { front: 600 } }),
  A("bon-tam-17", "Bồn tắm 1m7", "bon-tam", 1700, 800, 600, { clearance: { front: 600 } }),
  A("guong-wc", "Gương WC 60", "guong", 600, 50, 800, { mountHeight: 1000 }),
  A("binh-nong-lanh", "Bình nóng lạnh 20L", "binh-nong-lanh", 500, 300, 350, { mountHeight: 1900 }),
  A("may-giat", "Máy giặt cửa trước", "may-giat", 600, 600, 850, { clearance: { front: 600 } }),
  A("may-giat-cua-tren", "Máy giặt cửa trên", "may-giat", 550, 600, 950, { clearance: { front: 400 } }),
  A("may-say", "Máy sấy (chồng máy giặt)", "may-giat", 600, 600, 850),

  // ── Thiết bị & trang trí ───────────────────────────────────
  A("may-lanh-treo", "Máy lạnh treo tường", "may-lanh", 800, 250, 300, { mountHeight: 2500 }),
  A("may-lanh-dung", "Máy lạnh tủ đứng", "may-lanh", 500, 350, 1800),
  A("quat-cay", "Quạt cây", "quat-cay", 400, 400, 1300),
  A("den-cay", "Đèn cây góc", "den-cay", 350, 350, 1600),
  A("cay-canh-nho", "Cây cảnh chậu nhỏ", "cay-canh", 350, 350, 900),
  A("cay-canh-lon", "Cây cảnh chậu lớn", "cay-canh", 550, 550, 1700),
  A("guong-toan-than", "Gương toàn thân", "guong", 500, 50, 1600, { mountHeight: 200 }),

  // ── Xe (tính chỗ để xe!) ───────────────────────────────────
  A("xe-may", "Xe máy tay ga", "xe-may", 700, 1900, 1100, { clearance: { sides: 300 } }),
  A("xe-may-so", "Xe máy số", "xe-may", 650, 1850, 1050, { clearance: { sides: 300 } }),
  A("xe-dap", "Xe đạp", "xe-dap", 450, 1700, 1000),
  A("o-to-hatchback", "Ô tô hatchback (chỗ đậu)", "o-to", 1800, 4000, 1500, { clearance: { front: 600, sides: 500 } }),
  A("o-to-sedan", "Ô tô sedan (chỗ đậu)", "o-to", 1850, 4600, 1500, { clearance: { front: 600, sides: 500 } }),

  // ── Thờ (kích thước rơi cung đẹp thước 38.8 — LBB-04) ──────
  A("ban-tho", "Bàn thờ đứng 1m07", "ban-tho", 1070, 610, 1270, { clearance: { front: 900 } }),
  A("ban-tho-1m53", "Bàn thờ đứng 1m53", "ban-tho", 1530, 810, 1270, { clearance: { front: 900 } }),
  A("ban-tho-treo", "Bàn thờ treo 81", "ban-tho", 810, 480, 610, { mountHeight: 1550 }),
];

// biến thể màu/kiểu phổ biến — cùng kích thước, khác hoàn thiện (đủ ≥100 asset
// mà không bịa kích thước lạ; 3D dùng chung builder, đổi tông màu theo suffix)
const VARIANTS: Array<[string, string, string]> = [
  ["giuong-1m6", "-go-soi", " — gỗ sồi"],
  ["giuong-1m6", "-go-oc-cho", " — gỗ óc chó"],
  ["giuong-1m8", "-go-soi", " — gỗ sồi"],
  ["tu-ao-2m", "-trang", " — trắng sữa"],
  ["tu-ao-2m", "-go-oc-cho", " — gỗ óc chó"],
  ["tu-ao-1m6", "-trang", " — trắng sữa"],
  ["sofa-3s-01", "-xam", " — nỉ xám"],
  ["sofa-3s-01", "-da-nau", " — da nâu"],
  ["sofa-goc-l", "-xam", " — nỉ xám"],
  ["ban-an-4", "-go-soi", " — gỗ sồi"],
  ["ban-an-6", "-go-soi", " — gỗ sồi"],
  ["ghe-an", "-den", " — chân sắt đen"],
  ["ke-tv-1600", "-trang", " — trắng sữa"],
  ["ke-tv-2000", "-go-oc-cho", " — gỗ óc chó"],
  ["ban-lam-viec-1m2", "-trang", " — trắng sữa"],
  ["ke-sach-800", "-trang", " — trắng sữa"],
  ["tu-bep-duoi-24", "-trang", " — trắng bóng"],
  ["tu-bep-duoi-30", "-xanh-reu", " — xanh rêu"],
  ["tu-bep-tren-18", "-trang", " — trắng bóng"],
  ["ban-tra-chu-nhat", "-da", " — mặt đá"],
];
for (const [baseId, suffix, labelSuffix] of VARIANTS) {
  const base = CATALOG.find((a) => a.id === baseId);
  if (base) CATALOG.push({ ...base, id: `${baseId}${suffix}`, label: `${base.label}${labelSuffix}` });
}

const byId = new Map(CATALOG.map((a) => [a.id, a]));

export function getAsset(id: string): Asset | undefined {
  return byId.get(id);
}

/** Đăng ký asset ngoài catalog gốc (test, asset tùy biến). */
export function registerAsset(a: Asset): void {
  if (byId.has(a.id)) throw new Error(`asset ${a.id} đã tồn tại`);
  CATALOG.push(a);
  byId.set(a.id, a);
}

export function searchAssets(query: string, category?: AssetCategory, maxFootprint?: { w?: number; d?: number }): Asset[] {
  const q = query.trim().toLowerCase();
  return CATALOG.filter((a) => {
    if (category && a.category !== category) return false;
    if (maxFootprint?.w && a.footprint.w > maxFootprint.w) return false;
    if (maxFootprint?.d && a.footprint.d > maxFootprint.d) return false;
    if (!q) return true;
    return `${a.id} ${a.label} ${a.category}`.toLowerCase().includes(q);
  });
}

export const ASSET_CATEGORIES: AssetCategory[] = [...new Set(CATALOG.map((a) => a.category))];
