/**
 * Catalog nội thất chuẩn hóa (P5) — asset THAM SỐ HÓA: kích thước mm thật,
 * tên tiếng Việt + tiếng Anh (labelEn, i18n editor), khe hở khuyến nghị.
 * Hình 3D dựng tham số theo category (web/three3d), ký hiệu 2D trong renderer
 * (plan-scene) — CC0 by construction, nguồn ghi ở assets/license-manifest.json.
 * glTF photoreal: pipeline P5+ (doc 10) — footprint là hợp đồng kích thước,
 * thay model không đổi id.
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
  label: string; // tiếng Việt — mặc định trên UI/bản vẽ
  labelEn: string; // tiếng Anh — editor ở chế độ ?lang=en
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
  labelEn: string,
  category: AssetCategory,
  w: number,
  d: number,
  h: number,
  extra: Partial<Pick<Asset, "clearance" | "mountHeight">> = {},
): Asset => ({ id, label, labelEn, category, footprint: { w, d, h }, ...extra });

export const CATALOG: Asset[] = [
  // ── Giường & phòng ngủ ─────────────────────────────────────
  A("giuong-1m", "Giường đơn 1m", "Single bed 1.0m", "giuong", 1000, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-1m2", "Giường đơn 1m2", "Single bed 1.2m", "giuong", 1200, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-1m4", "Giường đôi 1m4", "Double bed 1.4m", "giuong", 1400, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-1m6", "Giường đôi 1m6", "Double bed 1.6m", "giuong", 1600, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-1m8", "Giường đôi 1m8", "Double bed 1.8m", "giuong", 1800, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-2m", "Giường king 2m", "King bed 2.0m", "giuong", 2000, 2200, 400, { clearance: { sides: 600 } }),
  A("giuong-tang-1m", "Giường tầng trẻ em 1m", "Kids bunk bed 1.0m", "giuong-tang", 1000, 2000, 1600, { clearance: { sides: 600 } }),
  A("giuong-tang-1m2", "Giường tầng 1m2", "Bunk bed 1.2m", "giuong-tang", 1200, 2000, 1700, { clearance: { sides: 600 } }),
  A("noi-em-be", "Nôi/cũi em bé", "Baby crib", "giuong", 650, 1200, 900, { clearance: { sides: 500 } }),
  A("tu-dau-giuong-40", "Tủ đầu giường 40", "Nightstand 40cm", "tu-dau-giuong", 400, 400, 450),
  A("tu-dau-giuong-50", "Tủ đầu giường 50", "Nightstand 50cm", "tu-dau-giuong", 500, 400, 500),
  A("tu-ao-1m", "Tủ áo 1m", "Wardrobe 1.0m", "tu-ao", 1000, 550, 2200, { clearance: { front: 600 } }),
  A("tu-ao-1m2", "Tủ áo 1m2", "Wardrobe 1.2m", "tu-ao", 1200, 550, 2200, { clearance: { front: 600 } }),
  A("tu-ao-1m6", "Tủ áo 1m6", "Wardrobe 1.6m", "tu-ao", 1600, 600, 2400, { clearance: { front: 600 } }),
  A("tu-ao-2m", "Tủ áo 2m", "Wardrobe 2.0m", "tu-ao", 2000, 600, 2400, { clearance: { front: 600 } }),
  A("tu-ao-2m4", "Tủ áo 2m4 cửa lùa", "Sliding-door wardrobe 2.4m", "tu-ao", 2400, 650, 2400, { clearance: { front: 550 } }),
  A("ban-trang-diem", "Bàn trang điểm", "Dressing table", "ban-trang-diem", 1000, 450, 750, { clearance: { front: 600 } }),

  // ── Phòng khách ────────────────────────────────────────────
  A("sofa-don", "Ghế sofa đơn", "Armchair", "sofa", 900, 850, 800),
  A("sofa-2s", "Sofa văng 2 chỗ", "2-seat sofa", "sofa", 1500, 850, 800),
  A("sofa-3s-01", "Sofa văng 3 chỗ", "3-seat sofa", "sofa", 1800, 850, 800),
  A("sofa-3s-22", "Sofa 3 chỗ lớn", "Large 3-seat sofa", "sofa", 2200, 900, 800),
  A("sofa-goc-l", "Sofa góc chữ L", "L-shaped corner sofa", "sofa", 2600, 1600, 800),
  A("ban-tra-vuong", "Bàn trà vuông 60", "Square coffee table 60", "ban-tra", 600, 600, 420),
  A("ban-tra-chu-nhat", "Bàn trà 1m1", "Coffee table 1.1m", "ban-tra", 1100, 550, 420),
  A("ban-tra-tron", "Bàn trà tròn 70", "Round coffee table 70", "ban-tra", 700, 700, 450),
  A("ke-tv-1200", "Kệ TV 1m2", "TV stand 1.2m", "ke-tv", 1200, 400, 500),
  A("ke-tv-1600", "Kệ TV 1m6", "TV stand 1.6m", "ke-tv", 1600, 450, 500),
  A("ke-tv-2000", "Kệ TV 2m", "TV stand 2.0m", "ke-tv", 2000, 450, 500),
  A("tu-giay-800", "Tủ giày 80", "Shoe cabinet 80cm", "tu-giay", 800, 350, 1000),
  A("tu-giay-1200", "Tủ giày 1m2", "Shoe cabinet 1.2m", "tu-giay", 1200, 350, 1100),

  // ── Bếp & ăn ───────────────────────────────────────────────
  A("ban-an-2", "Bàn ăn 2 chỗ", "Dining table for 2", "ban-an", 800, 800, 750, { clearance: { front: 800 } }),
  A("ban-an-4", "Bàn ăn 4 chỗ", "Dining table for 4", "ban-an", 1400, 800, 750, { clearance: { front: 800 } }),
  A("ban-an-6", "Bàn ăn 6 chỗ", "Dining table for 6", "ban-an", 1800, 900, 750, { clearance: { front: 800 } }),
  A("ban-an-8", "Bàn ăn 8 chỗ", "Dining table for 8", "ban-an", 2200, 1000, 750, { clearance: { front: 800 } }),
  A("ban-an-tron-1m", "Bàn ăn tròn 1m", "Round dining table 1.0m", "ban-an", 1000, 1000, 750, { clearance: { front: 800 } }),
  A("ghe-an", "Ghế ăn", "Dining chair", "ghe-an", 450, 500, 900),
  A("ghe-bang-an", "Ghế băng ăn 1m4", "Dining bench 1.4m", "ghe-an", 1400, 350, 450),
  A("tu-bep-duoi-06", "Tủ bếp dưới 60 (module)", "Base kitchen cabinet 60 (module)", "tu-bep-duoi", 600, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-duoi-12", "Tủ bếp dưới 1m2", "Base kitchen run 1.2m", "tu-bep-duoi", 1200, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-duoi-18", "Tủ bếp dưới 1m8 (kèm chậu)", "Base kitchen run 1.8m (with sink)", "tu-bep-duoi", 1800, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-duoi-24", "Tủ bếp dưới 2m4 (kèm chậu + bếp nấu)", "Base kitchen run 2.4m (sink + cooktop)", "tu-bep-duoi", 2400, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-duoi-30", "Tủ bếp dưới 3m (kèm chậu + bếp nấu)", "Base kitchen run 3.0m (sink + cooktop)", "tu-bep-duoi", 3000, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-goc", "Tủ bếp dưới góc L 1m8×1m8", "L-shaped base kitchen 1.8×1.8m", "tu-bep-duoi", 1800, 1800, 850, { clearance: { front: 900 } }),
  A("tu-bep-tren-06", "Tủ bếp trên 60", "Wall kitchen cabinet 0.6m", "tu-bep-tren", 600, 350, 700, { mountHeight: 1450 }),
  A("tu-bep-tren-12", "Tủ bếp trên 1m2", "Wall kitchen cabinet 1.2m", "tu-bep-tren", 1200, 350, 700, { mountHeight: 1450 }),
  A("tu-bep-tren-18", "Tủ bếp trên 1m8", "Wall kitchen cabinet 1.8m", "tu-bep-tren", 1800, 350, 700, { mountHeight: 1450 }),
  A("tu-bep-tren-24", "Tủ bếp trên 2m4", "Wall kitchen cabinet 2.4m", "tu-bep-tren", 2400, 350, 700, { mountHeight: 1450 }),
  A("tu-lanh-mini", "Tủ lạnh mini", "Mini fridge", "tu-lanh", 500, 550, 850),
  A("tu-lanh", "Tủ lạnh 2 cánh", "Two-door fridge", "tu-lanh", 700, 700, 1700, { clearance: { front: 700 } }),
  A("tu-lanh-sbs", "Tủ lạnh side-by-side", "Side-by-side fridge", "tu-lanh", 900, 750, 1800, { clearance: { front: 700 } }),

  // ── Làm việc & học ─────────────────────────────────────────
  A("ban-hoc", "Bàn học/làm việc 1m", "Desk 1.0m", "ban-lam-viec", 1000, 500, 750, { clearance: { front: 750 } }),
  A("ban-lam-viec-1m2", "Bàn làm việc 1m2", "Desk 1.2m", "ban-lam-viec", 1200, 600, 750, { clearance: { front: 750 } }),
  A("ban-lam-viec-1m4", "Bàn làm việc 1m4", "Desk 1.4m", "ban-lam-viec", 1400, 700, 750, { clearance: { front: 750 } }),
  A("ghe-xoay", "Ghế xoay văn phòng", "Office swivel chair", "ghe-xoay", 600, 600, 1000),
  A("ke-sach-600", "Kệ sách 60", "Bookshelf 60cm", "ke-sach", 600, 300, 1800),
  A("ke-sach-800", "Kệ sách 80", "Bookshelf 80cm", "ke-sach", 800, 300, 2000),
  A("ke-sach-1200", "Kệ sách 1m2", "Bookshelf 1.2m", "ke-sach", 1200, 350, 2000),

  // ── Vệ sinh ────────────────────────────────────────────────
  A("bon-cau", "Bồn cầu 2 khối", "Two-piece toilet", "bon-cau", 400, 700, 780, { clearance: { front: 500, sides: 200 } }),
  A("bon-cau-1-khoi", "Bồn cầu 1 khối", "One-piece toilet", "bon-cau", 420, 740, 700, { clearance: { front: 500, sides: 200 } }),
  A("lavabo", "Chậu rửa mặt", "Washbasin", "lavabo", 550, 420, 850, { clearance: { front: 550 } }),
  A("lavabo-tu", "Lavabo kèm tủ 80", "Vanity basin 80cm", "lavabo", 800, 480, 850, { clearance: { front: 550 } }),
  A("lavabo-doi", "Lavabo đôi 1m2", "Double vanity 1.2m", "lavabo", 1200, 500, 850, { clearance: { front: 550 } }),
  A("voi-sen", "Khu tắm đứng vòi sen", "Walk-in shower 90", "voi-sen", 900, 900, 2000),
  A("voi-sen-80", "Khu tắm đứng 80", "Walk-in shower 80", "voi-sen", 800, 800, 2000),
  A("bon-tam-15", "Bồn tắm 1m5", "Bathtub 1.5m", "bon-tam", 1500, 750, 600, { clearance: { front: 600 } }),
  A("bon-tam-17", "Bồn tắm 1m7", "Bathtub 1.7m", "bon-tam", 1700, 800, 600, { clearance: { front: 600 } }),
  A("guong-wc", "Gương WC 60", "Bathroom mirror 60", "guong", 600, 50, 800, { mountHeight: 1000 }),
  A("binh-nong-lanh", "Bình nóng lạnh 20L", "Water heater 20L", "binh-nong-lanh", 500, 300, 350, { mountHeight: 1900 }),
  A("may-giat", "Máy giặt cửa trước", "Front-load washer", "may-giat", 600, 600, 850, { clearance: { front: 600 } }),
  A("may-giat-cua-tren", "Máy giặt cửa trên", "Top-load washer", "may-giat", 550, 600, 950, { clearance: { front: 400 } }),
  A("may-say", "Máy sấy (chồng máy giặt)", "Dryer (stacks on washer)", "may-giat", 600, 600, 850),

  // ── Thiết bị & trang trí ───────────────────────────────────
  A("may-lanh-treo", "Máy lạnh treo tường", "Wall-mounted AC unit", "may-lanh", 800, 250, 300, { mountHeight: 2500 }),
  A("may-lanh-dung", "Máy lạnh tủ đứng", "Floor-standing AC", "may-lanh", 500, 350, 1800),
  A("quat-cay", "Quạt cây", "Pedestal fan", "quat-cay", 400, 400, 1300),
  A("den-cay", "Đèn cây góc", "Floor lamp", "den-cay", 350, 350, 1600),
  A("cay-canh-nho", "Cây cảnh chậu nhỏ", "Potted plant (small)", "cay-canh", 350, 350, 900),
  A("cay-canh-lon", "Cây cảnh chậu lớn", "Potted plant (large)", "cay-canh", 550, 550, 1700),
  A("guong-toan-than", "Gương toàn thân", "Full-length mirror", "guong", 500, 50, 1600, { mountHeight: 200 }),

  // ── Xe (tính chỗ để xe!) ───────────────────────────────────
  A("xe-may", "Xe máy tay ga", "Scooter", "xe-may", 700, 1900, 1100, { clearance: { sides: 300 } }),
  A("xe-may-so", "Xe máy số", "Motorbike", "xe-may", 650, 1850, 1050, { clearance: { sides: 300 } }),
  A("xe-dap", "Xe đạp", "Bicycle", "xe-dap", 450, 1700, 1000),
  A("o-to-hatchback", "Ô tô hatchback (chỗ đậu)", "Hatchback car (parking spot)", "o-to", 1800, 4000, 1500, { clearance: { front: 600, sides: 500 } }),
  A("o-to-sedan", "Ô tô sedan (chỗ đậu)", "Sedan (parking spot)", "o-to", 1850, 4600, 1500, { clearance: { front: 600, sides: 500 } }),

  // ── Thờ (kích thước rơi cung đẹp thước 38.8 — LBB-04) ──────
  A("ban-tho", "Bàn thờ đứng 1m07", "Ancestral altar 1.07m", "ban-tho", 1070, 610, 1270, { clearance: { front: 900 } }),
  A("ban-tho-1m53", "Bàn thờ đứng 1m53", "Ancestral altar 1.53m", "ban-tho", 1530, 810, 1270, { clearance: { front: 900 } }),
  A("ban-tho-treo", "Bàn thờ treo 81", "Wall-mounted altar 81cm", "ban-tho", 810, 480, 610, { mountHeight: 1550 }),
];

// biến thể màu/kiểu phổ biến — cùng kích thước, khác hoàn thiện (đủ ≥100 asset
// mà không bịa kích thước lạ; 3D dùng chung builder, đổi tông màu theo suffix)
const VARIANTS: Array<[string, string, string, string]> = [
  ["giuong-1m6", "-go-soi", " — gỗ sồi", " — oak"],
  ["giuong-1m6", "-go-oc-cho", " — gỗ óc chó", " — walnut"],
  ["giuong-1m8", "-go-soi", " — gỗ sồi", " — oak"],
  ["tu-ao-2m", "-trang", " — trắng sữa", " — milk white"],
  ["tu-ao-2m", "-go-oc-cho", " — gỗ óc chó", " — walnut"],
  ["tu-ao-1m6", "-trang", " — trắng sữa", " — milk white"],
  ["sofa-3s-01", "-xam", " — nỉ xám", " — grey fabric"],
  ["sofa-3s-01", "-da-nau", " — da nâu", " — brown leather"],
  ["sofa-goc-l", "-xam", " — nỉ xám", " — grey fabric"],
  ["ban-an-4", "-go-soi", " — gỗ sồi", " — oak"],
  ["ban-an-6", "-go-soi", " — gỗ sồi", " — oak"],
  ["ghe-an", "-den", " — chân sắt đen", " — black steel legs"],
  ["ke-tv-1600", "-trang", " — trắng sữa", " — milk white"],
  ["ke-tv-2000", "-go-oc-cho", " — gỗ óc chó", " — walnut"],
  ["ban-lam-viec-1m2", "-trang", " — trắng sữa", " — milk white"],
  ["ke-sach-800", "-trang", " — trắng sữa", " — milk white"],
  ["tu-bep-duoi-24", "-trang", " — trắng bóng", " — gloss white"],
  ["tu-bep-duoi-30", "-xanh-reu", " — xanh rêu", " — moss green"],
  ["tu-bep-tren-18", "-trang", " — trắng bóng", " — gloss white"],
  ["ban-tra-chu-nhat", "-da", " — mặt đá", " — stone top"],
];
for (const [baseId, suffix, viSuffix, enSuffix] of VARIANTS) {
  const base = CATALOG.find((a) => a.id === baseId);
  if (base) {
    CATALOG.push({
      ...base,
      id: `${baseId}${suffix}`,
      label: `${base.label}${viSuffix}`,
      labelEn: `${base.labelEn}${enSuffix}`,
    });
  }
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
    return `${a.id} ${a.label} ${a.labelEn} ${a.category}`.toLowerCase().includes(q);
  });
}

export const ASSET_CATEGORIES: AssetCategory[] = [...new Set(CATALOG.map((a) => a.category))];
