import { describe, expect, it } from "vitest";
import { detectLang, DICT_EN_KEYS, DICT_KEYS, translate } from "./i18n.js";
import { CATALOG } from "@atelier/core";

describe("i18n editor — song ngữ vi/en, tự nhận theo quốc gia", () => {
  it("hai từ điển có ĐÚNG cùng bộ key (không key mồ côi)", () => {
    expect([...DICT_EN_KEYS].sort()).toEqual([...DICT_KEYS].sort());
  });

  it("auto-detect: ở Việt Nam (múi giờ) → vi; ngoài Việt Nam → en", () => {
    expect(detectLang({ timeZone: "Asia/Ho_Chi_Minh", languages: ["en-US"] })).toBe("vi");
    expect(detectLang({ timeZone: "Asia/Saigon", languages: [] })).toBe("vi");
    expect(detectLang({ timeZone: "Europe/Paris", languages: ["fr-FR", "en"] })).toBe("en");
    expect(detectLang({ timeZone: "America/New_York", languages: ["en-US"] })).toBe("en");
  });

  it("trình duyệt tiếng Việt ở nước ngoài vẫn ra vi (người Việt xa quê)", () => {
    expect(detectLang({ timeZone: "Europe/Berlin", languages: ["vi-VN", "de-DE"] })).toBe("vi");
    expect(detectLang({ timeZone: "Australia/Sydney", languages: ["en-AU", "vi"] })).toBe("vi");
  });

  it("lựa chọn tay thắng auto: ?lang > localStorage > quốc gia", () => {
    expect(detectLang({ query: "en", saved: "vi", timeZone: "Asia/Ho_Chi_Minh" })).toBe("en");
    expect(detectLang({ saved: "en", timeZone: "Asia/Ho_Chi_Minh", languages: ["vi-VN"] })).toBe("en");
    expect(detectLang({ saved: "vi", timeZone: "Europe/Paris" })).toBe("vi");
    expect(detectLang({ query: "rác", saved: "xyz", timeZone: "Europe/Paris" })).toBe("en"); // giá trị lạ bị bỏ qua
  });

  it("translate() theo ngôn ngữ chỉ định + thay params + fallback key", () => {
    expect(translate("vi", "conn.on")).toBe("trực tiếp");
    expect(translate("en", "conn.on")).toBe("live");
    expect(translate("vi", "note.place", { label: "Sofa" })).toBe("đặt Sofa");
    expect(translate("en", "note.place", { label: "Sofa" })).toBe("place Sofa");
    expect(translate("en", "khong.ton.tai")).toBe("khong.ton.tai");
  });

  it("catalog: đủ labelEn cho cả 106 asset, đúng là tiếng Anh", () => {
    for (const a of CATALOG) {
      expect(a.labelEn, a.id).toBeTruthy();
      expect(a.labelEn.length, a.id).toBeGreaterThan(2);
      expect(/[ăâđêôơưọảếồị]/i.test(a.labelEn), `${a.id}: ${a.labelEn}`).toBe(false);
    }
  });
});
