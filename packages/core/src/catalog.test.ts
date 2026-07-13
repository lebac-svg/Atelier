import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { ASSET_CATEGORIES, CATALOG, getAsset, searchAssets } from "./catalog.js";

const MANIFEST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "assets", "license-manifest.json");

describe("catalog P5 — ≥100 asset chuẩn hóa", () => {
  it("≥ 100 asset, id duy nhất, kích thước mm hợp lý", () => {
    expect(CATALOG.length).toBeGreaterThanOrEqual(100);
    expect(new Set(CATALOG.map((a) => a.id)).size).toBe(CATALOG.length);
    for (const a of CATALOG) {
      expect(a.label.length, a.id).toBeGreaterThan(2);
      expect(a.footprint.w, `${a.id}.w`).toBeGreaterThanOrEqual(300);
      expect(a.footprint.w, `${a.id}.w`).toBeLessThanOrEqual(5000);
      expect(a.footprint.d, `${a.id}.d`).toBeGreaterThanOrEqual(50);
      expect(a.footprint.h, `${a.id}.h`).toBeGreaterThan(0);
      expect(Number.isInteger(a.footprint.w) && Number.isInteger(a.footprint.d) && Number.isInteger(a.footprint.h), a.id).toBe(true);
    }
  });

  it("đủ danh mục tối thiểu của doc 10 (giường 3+ cỡ, bếp, WC, xe máy, bàn thờ…)", () => {
    const of = (c: string): number => CATALOG.filter((a) => a.category === c).length;
    expect(of("giuong")).toBeGreaterThanOrEqual(3);
    for (const c of [
      "tu-ao", "ban-an", "ghe-an", "sofa", "ke-tv", "tu-bep-duoi", "tu-bep-tren",
      "bon-cau", "lavabo", "voi-sen", "may-giat", "xe-may", "ban-tho", "ban-lam-viec",
    ]) {
      expect(of(c), c).toBeGreaterThanOrEqual(1);
    }
    expect(ASSET_CATEGORIES.length).toBeGreaterThanOrEqual(20);
  });

  it("license-manifest phủ đúng từng asset (sạch bản quyền từ ngày 1)", () => {
    const manifest = JSON.parse(readFileSync(MANIFEST, "utf8")) as { assets: Record<string, { license: string }> };
    for (const a of CATALOG) {
      expect(manifest.assets[a.id], `thiếu manifest cho ${a.id}`).toBeTruthy();
      expect(manifest.assets[a.id]!.license).toBe("CC0-1.0");
    }
    // không có entry mồ côi
    for (const id of Object.keys(manifest.assets)) expect(getAsset(id), `manifest thừa ${id}`).toBeTruthy();
  });

  it("đồ treo tường có mountHeight; searchAssets lọc đúng", () => {
    expect(getAsset("tu-bep-tren-18")!.mountHeight).toBeGreaterThan(1000);
    expect(getAsset("may-lanh-treo")!.mountHeight).toBeGreaterThan(2000);
    const wc = searchAssets("", "bon-cau");
    expect(wc.length).toBeGreaterThanOrEqual(2);
    const nho = searchAssets("giường", undefined, { w: 1200 });
    expect(nho.every((a) => a.footprint.w <= 1200)).toBe(true);
    expect(nho.some((a) => a.id === "giuong-1m2")).toBe(true);
  });
});
