import donGiaJson from "../rules/don-gia.json" with { type: "json" };
import { areaM2 } from "./geometry/polygon.js";
import { roofGeometry } from "./geometry/roof.js";
import { wallLength } from "./geometry/wall.js";
import { roofsOf } from "./model.js";
import type { Project } from "./types.js";

/**
 * Dự toán sơ bộ (backlog doc 10, tool #14 doc 05): khối lượng ước lệ từ model
 * × bảng đơn giá `rules/don-gia.json` (data, người dùng sửa được — ADR-09).
 *
 * Cách tính phổ thông nhà phố VN: TỔNG DIỆN TÍCH QUY ĐỔI (sàn 100%, móng ~40%,
 * mái BTCT ~50%, ô trống lớn phần vượt ngưỡng tính nửa) × đơn giá phần thô,
 * cộng DIỆN TÍCH SÀN THỰC × đơn giá hoàn thiện theo mức trong brief.
 * Đây là ước tính concept ±15–20%%, KHÔNG thay báo giá thầu.
 */

export type DonGia = {
  version: string;
  ghi_chu: string;
  tham_khao: boolean;
  /** Tiền tệ của bảng — bỏ trống = VND (bảng VN gốc). Bảng cộng đồng khai rõ. */
  currency?: { code: string; symbol: string; locale: string };
  don_gia_m2: {
    xay_tho: { label: string; vnd: number };
    hoan_thien: Record<string, { label: string; vnd: number }>;
  };
  he_so_quy_doi: Record<string, { label: string; he_so: number; nguong_m2?: number }>;
};

const DON_GIA_GOC: DonGia = donGiaJson as DonGia;

/** Bảng đơn giá ĐANG DÙNG — mặc định bảng đóng gói; setDonGia đè bằng bảng địa phương. */
export const DON_GIA: DonGia = structuredClone(DON_GIA_GOC);

/**
 * Áp bảng đơn giá địa phương (bản đóng gói đọc từ <dự án>/rules/don-gia.json) —
 * null = về bảng gốc. Shallow-merge TRÊN bảng gốc để file thiếu mục không làm
 * gãy estimate; mutate tại chỗ để mọi nơi đã import DON_GIA cùng thấy.
 */
export function setDonGia(d: Partial<DonGia> | null): void {
  for (const k of Object.keys(DON_GIA)) delete (DON_GIA as unknown as Record<string, unknown>)[k];
  Object.assign(DON_GIA, structuredClone(DON_GIA_GOC), d ? structuredClone(d) : {});
}

/**
 * Bảng đơn giá cho một region (P9): bảng đóng gói là giá VN — chỉ áp cho
 * region "vn" (hoặc project chưa khai region). Region khác chưa có bảng →
 * null: estimate chỉ trả KHỐI LƯỢNG, không nhân tiền (không VND lạc region).
 * Bảng đè từ thư mục dự án (setDonGia) coi như bảng của region dự án đó.
 */
export function donGiaFor(region: string | undefined): DonGia | null {
  return region == null || region === "vn" ? DON_GIA : null;
}

export type FinishLevel = "co-ban" | "trung-binh-kha" | "cao-cap";

export type AreaLine = {
  label: string;
  dien_tich_m2: number;
  he_so: number;
  quy_doi_m2: number;
  /** Ước lệ thêm vào vì model thiếu dữ liệu (vd chưa vẽ mái). */
  uoc_le?: boolean;
};

export type QuantityReport = {
  dien_tich: AreaLine[];
  tong_quy_doi_m2: number;
  /** Sàn THỰC (đã trừ hết ô trống) — cơ sở tính hoàn thiện. */
  san_thuc_m2: number;
  tuong_xay_m2: number;
  cua_bo: number;
  cua_m2: number;
  bac_thang: number;
  ghi_chu: string[];
};

const r1 = (v: number): number => Math.round(v * 10) / 10;

export function computeQuantities(p: Project): QuantityReport {
  const hs = DON_GIA.he_so_quy_doi;
  const ghiChu: string[] = [];
  const lines: AreaLine[] = [];
  const levels = [...p.levels].sort((a, b) => a.elevation - b.elevation);

  // ── sàn từng tầng + ô trống ─────────────────────────────────
  let sanThuc = 0;
  const nguong = hs.o_trong_lon?.nguong_m2 ?? 8;
  for (const lv of levels) {
    const floors = p.slabs.filter((s) => s.level === lv.id && s.kind === "floor");
    if (floors.length === 0) continue;
    let gross = 0;
    let holeAll = 0;
    let holeLonVuot = 0; // phần vượt ngưỡng của các ô trống lớn
    for (const s of floors) {
      gross += areaM2(s.outline);
      for (const h of s.holes ?? []) {
        const a = areaM2(h);
        holeAll += a;
        if (a >= nguong) holeLonVuot += a - nguong;
      }
    }
    sanThuc += gross - holeAll;
    // tính phí: ô trống nhỏ vẫn tính đủ (quy ước); ô lớn — phần vượt ngưỡng tính nửa
    const tinhPhi = gross - holeLonVuot * (1 - (hs.o_trong_lon?.he_so ?? 0.5));
    lines.push({ label: `Sàn ${lv.name}`, dien_tich_m2: r1(tinhPhi), he_so: hs.san?.he_so ?? 1, quy_doi_m2: r1(tinhPhi * (hs.san?.he_so ?? 1)) });
  }

  // ── móng: theo tầng thấp nhất ───────────────────────────────
  const ground = levels[0];
  const groundFloor = ground ? p.slabs.filter((s) => s.level === ground.id && s.kind === "floor") : [];
  const mongArea = groundFloor.reduce((s, x) => s + areaM2(x.outline), 0);
  if (mongArea > 0) {
    lines.unshift({ label: hs.mong?.label ?? "Móng", dien_tich_m2: r1(mongArea), he_so: hs.mong?.he_so ?? 0.4, quy_doi_m2: r1(mongArea * (hs.mong?.he_so ?? 0.4)) });
  }

  // ── mái dốc (P7): m² MẶT NGHIÊNG thật từ roofGeometry, hệ số theo vật liệu ──
  let maiDocArea = 0;
  for (const rf of roofsOf(p)) {
    const lv = p.levels.find((l) => l.id === rf.level);
    if (!lv) continue;
    const g = roofGeometry(rf, lv);
    const key = rf.material === "ton" ? "mai_ton" : "mai_ngoi";
    const heSo = hs[key]?.he_so ?? 0.7;
    maiDocArea += g.areaM2;
    lines.push({
      label: `${hs[key]?.label ?? "Mái dốc"} (${rf.id})`, dien_tich_m2: r1(g.areaM2),
      he_so: heSo, quy_doi_m2: r1(g.areaM2 * heSo),
    });
  }

  // ── mái bằng: roof-flat có gì tính nấy; KHÔNG mái nào cả → ước theo sàn trên cùng ──
  const roofs = p.slabs.filter((s) => s.kind === "roof-flat");
  let maiArea = roofs.reduce((s, x) => s + areaM2(x.outline), 0);
  let maiUocLe = false;
  if (maiArea === 0 && maiDocArea === 0) {
    const top = levels[levels.length - 1];
    const topFloor = top ? p.slabs.filter((s) => s.level === top.id && s.kind === "floor") : [];
    maiArea = topFloor.reduce((s, x) => s + areaM2(x.outline), 0);
    maiUocLe = maiArea > 0;
    if (maiUocLe) ghiChu.push("Model chưa vẽ mái — tạm ước diện tích mái bằng sàn tầng trên cùng.");
  }
  if (maiArea > 0) {
    lines.push({
      label: hs.mai_btct?.label ?? "Mái BTCT", dien_tich_m2: r1(maiArea),
      he_so: hs.mai_btct?.he_so ?? 0.5, quy_doi_m2: r1(maiArea * (hs.mai_btct?.he_so ?? 0.5)),
      ...(maiUocLe ? { uoc_le: true } : {}),
    });
  }

  // ── khối lượng tham khảo (đối chiếu báo giá — KHÔNG nhân giá riêng) ──
  let tuongM2 = 0;
  for (const w of p.walls) {
    if (w.kind === "kinh") continue;
    const lv = p.levels.find((l) => l.id === w.level);
    const h = w.height ?? lv?.height ?? 0;
    tuongM2 += (wallLength(w) * h) / 1e6;
  }
  let cuaM2 = 0;
  for (const o of p.openings) {
    cuaM2 += (o.width * o.height) / 1e6;
    tuongM2 -= (o.width * o.height) / 1e6;
  }
  const bacThang = p.stairs.reduce((s, st) => s + st.steps, 0);

  return {
    dien_tich: lines,
    tong_quy_doi_m2: r1(lines.reduce((s, l) => s + l.quy_doi_m2, 0)),
    san_thuc_m2: r1(sanThuc),
    tuong_xay_m2: r1(tuongM2),
    cua_bo: p.openings.length,
    cua_m2: r1(cuaM2),
    bac_thang: bacThang,
    ghi_chu: ghiChu,
  };
}

/** Suy mức hoàn thiện từ brief.ngan_sach.hoan_thien (chữ tự do pha A). */
export function suggestFinishLevel(p: Project): FinishLevel {
  const t = (p.brief.ngan_sach?.hoan_thien ?? "").toLowerCase();
  if (/cao\s*cấp|cao\s*cap|sang/.test(t)) return "cao-cap";
  if (/cơ\s*bản|co\s*ban|tiết\s*kiệm|tiet\s*kiem|rẻ|re\b/.test(t)) return "co-ban";
  return "trung-binh-kha";
}

/** "~1.8 tỷ", "1,5 ty", "900 triệu" → đồng. Không parse được → null. */
export function parseBudgetVnd(text: string | undefined): number | null {
  if (!text) return null;
  // \b của JS không coi chữ có dấu là \w — dùng lookahead Unicode thay word-boundary
  const m = /(\d+(?:[.,]\d+)?)\s*(triệu|trieu|tr|tỷ|tỉ|ty|ti)(?!\p{L})/iu.exec(text.normalize("NFC"));
  if (!m) return null;
  const value = Number(m[1]!.replace(",", "."));
  if (!Number.isFinite(value)) return null;
  const unit = m[2]!.toLowerCase();
  const laTrieu = unit === "tr" || unit.startsWith("tri");
  return Math.round(value * (laTrieu ? 1e6 : 1e9));
}

export function formatVnd(vnd: number): string {
  if (Math.abs(vnd) >= 1e9) return `${(vnd / 1e9).toFixed(2).replace(".", ",")} tỷ`;
  return `${Math.round(vnd / 1e6).toLocaleString("vi-VN")} triệu`;
}

export type EstimateItem = {
  label: string;
  khoi_luong_m2: number;
  don_gia_vnd: number;
  thanh_tien_vnd: number;
};

export type Estimate = {
  quantities: QuantityReport;
  muc: FinishLevel;
  items: EstimateItem[];
  tong_vnd: number;
  ngan_sach?: { text: string; vnd: number | null; chenh_lech_vnd: number | null };
  ghi_chu: string[];
};

export function estimateCost(p: Project, muc?: FinishLevel): Estimate {
  const q = computeQuantities(p);

  // Region chưa có bảng đơn giá (P9): trả khối lượng thật, KHÔNG nhân tiền —
  // không để giá VND lạc sang dự toán region khác.
  const table = donGiaFor(p.config?.region);
  if (!table) {
    return {
      quantities: q,
      muc: muc ?? "trung-binh-kha",
      items: [],
      tong_vnd: 0,
      ghi_chu: [
        ...q.ghi_chu,
        `Chưa có bảng đơn giá cho region "${p.config?.region}" — dự toán chỉ gồm khối lượng. Đóng góp bảng giá theo docs/13 (rules/don-gia.json + currency).`,
        "Hệ số quy đổi đang dùng bảng mặc định (nếp tính thầu VN) — chỉ để tham khảo khối lượng.",
      ],
    };
  }

  const level = muc ?? suggestFinishLevel(p);
  const hoanThien = DON_GIA.don_gia_m2.hoan_thien[level] ?? DON_GIA.don_gia_m2.hoan_thien["trung-binh-kha"]!;
  const items: EstimateItem[] = [
    {
      label: `${DON_GIA.don_gia_m2.xay_tho.label} (${q.tong_quy_doi_m2}m² quy đổi)`,
      khoi_luong_m2: q.tong_quy_doi_m2,
      don_gia_vnd: DON_GIA.don_gia_m2.xay_tho.vnd,
      thanh_tien_vnd: Math.round(q.tong_quy_doi_m2 * DON_GIA.don_gia_m2.xay_tho.vnd),
    },
    {
      label: `${hoanThien.label} (${q.san_thuc_m2}m² sàn thực)`,
      khoi_luong_m2: q.san_thuc_m2,
      don_gia_vnd: hoanThien.vnd,
      thanh_tien_vnd: Math.round(q.san_thuc_m2 * hoanThien.vnd),
    },
  ];
  const tong = items.reduce((s, i) => s + i.thanh_tien_vnd, 0);

  const budgetText = p.brief.ngan_sach?.muc;
  const budgetVnd = parseBudgetVnd(budgetText);
  const ghiChu = [...q.ghi_chu];
  if (DON_GIA.tham_khao) {
    ghiChu.push(`Đơn giá ${DON_GIA.version} mức THAM KHẢO (±15–20%) — sửa rules/don-gia.json theo địa phương.`);
  }

  return {
    quantities: q,
    muc: level,
    items,
    tong_vnd: tong,
    ...(budgetText
      ? { ngan_sach: { text: budgetText, vnd: budgetVnd, chenh_lech_vnd: budgetVnd != null ? budgetVnd - tong : null } }
      : {}),
    ghi_chu: ghiChu,
  };
}
