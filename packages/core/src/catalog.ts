/**
 * Mini catalog nội thất P1 — chỉ footprint 2D + phân loại, đủ nuôi
 * validator (GEO-04, STD-11, LBB-02) và renderer layer NOI-THAT.
 * glTF thật + thumbnail vào ở P5 (packages/assets).
 * Kích thước mm: w = ngang (local +x khi rotation 0), d = sâu (+y), h = cao.
 */

export type AssetCategory =
  | "giuong"
  | "tu-ao"
  | "sofa"
  | "ke-tv"
  | "ban-an"
  | "ban-lam-viec"
  | "tu-bep-duoi"
  | "tu-bep-tren"
  | "tu-lanh"
  | "bon-cau"
  | "lavabo"
  | "voi-sen"
  | "may-giat"
  | "xe-may"
  | "ban-tho";

export type Asset = {
  id: string;
  label: string; // tiếng Việt, hiện trên UI/bản vẽ
  category: AssetCategory;
  footprint: { w: number; d: number; h: number };
  /** Khe hở khuyến nghị quanh asset (nuôi STD-11), theo cạnh local. */
  clearance?: { front?: number; sides?: number };
};

export const CATALOG: Asset[] = [
  { id: "giuong-1m2", label: "Giường đơn 1m2", category: "giuong", footprint: { w: 1200, d: 2000, h: 400 }, clearance: { sides: 600 } },
  { id: "giuong-1m6", label: "Giường đôi 1m6", category: "giuong", footprint: { w: 1600, d: 2000, h: 400 }, clearance: { sides: 600 } },
  { id: "giuong-1m8", label: "Giường đôi 1m8", category: "giuong", footprint: { w: 1800, d: 2000, h: 400 }, clearance: { sides: 600 } },
  { id: "tu-ao-1m", label: "Tủ áo 1m", category: "tu-ao", footprint: { w: 1000, d: 550, h: 2200 }, clearance: { front: 600 } },
  { id: "tu-ao-2m", label: "Tủ áo 2m", category: "tu-ao", footprint: { w: 2000, d: 600, h: 2400 }, clearance: { front: 600 } },
  { id: "sofa-3s-01", label: "Sofa văng 3 chỗ", category: "sofa", footprint: { w: 1800, d: 850, h: 800 } },
  { id: "ke-tv-1600", label: "Kệ TV 1m6", category: "ke-tv", footprint: { w: 1600, d: 450, h: 500 } },
  { id: "ban-an-4", label: "Bàn ăn 4 chỗ", category: "ban-an", footprint: { w: 1400, d: 800, h: 750 } },
  { id: "ban-hoc", label: "Bàn học/làm việc 1m", category: "ban-lam-viec", footprint: { w: 1000, d: 500, h: 750 } },
  { id: "tu-bep-duoi-24", label: "Tủ bếp dưới 2m4 (kèm chậu + bếp nấu)", category: "tu-bep-duoi", footprint: { w: 2400, d: 600, h: 850 }, clearance: { front: 900 } },
  { id: "tu-lanh", label: "Tủ lạnh", category: "tu-lanh", footprint: { w: 700, d: 700, h: 1700 } },
  { id: "bon-cau", label: "Bồn cầu", category: "bon-cau", footprint: { w: 400, d: 700, h: 400 }, clearance: { front: 500 } },
  { id: "lavabo", label: "Chậu rửa mặt", category: "lavabo", footprint: { w: 550, d: 420, h: 850 } },
  { id: "voi-sen", label: "Khu tắm đứng vòi sen", category: "voi-sen", footprint: { w: 900, d: 900, h: 2000 } },
  { id: "may-giat", label: "Máy giặt", category: "may-giat", footprint: { w: 600, d: 600, h: 850 } },
  { id: "xe-may", label: "Xe máy", category: "xe-may", footprint: { w: 700, d: 1900, h: 1100 } },
  { id: "ban-tho", label: "Bàn thờ", category: "ban-tho", footprint: { w: 1070, d: 610, h: 1270 } },
];

const byId = new Map(CATALOG.map((a) => [a.id, a]));

export function getAsset(id: string): Asset | undefined {
  return byId.get(id);
}

/** Đăng ký asset ngoài catalog gốc (test, asset tùy biến P5). */
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
