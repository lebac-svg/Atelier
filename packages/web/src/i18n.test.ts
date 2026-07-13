import { describe, expect, it } from "vitest";
import { DICT_EN_KEYS, DICT_KEYS, LANG, t } from "./i18n.js";
import { CATALOG } from "@atelier/core";

describe("i18n editor — song ngữ vi/en", () => {
  it("hai từ điển có ĐÚNG cùng bộ key (không key mồ côi)", () => {
    expect([...DICT_EN_KEYS].sort()).toEqual([...DICT_KEYS].sort());
  });

  it("môi trường Node (không localStorage/location) mặc định tiếng Việt", () => {
    expect(LANG).toBe("vi");
    expect(t("conn.on")).toBe("trực tiếp");
  });

  it("t() thay params và fallback về key khi thiếu", () => {
    expect(t("note.place", { label: "Sofa" })).toBe("đặt Sofa");
    expect(t("khong.ton.tai")).toBe("khong.ton.tai");
  });

  it("catalog: đủ labelEn cho cả 106 asset, không trùng rỗng", () => {
    for (const a of CATALOG) {
      expect(a.labelEn, a.id).toBeTruthy();
      expect(a.labelEn.length, a.id).toBeGreaterThan(2);
      // labelEn thật sự là tiếng Anh — không dính dấu tiếng Việt
      expect(/[ăâđêôơưọảếồị]/i.test(a.labelEn), `${a.id}: ${a.labelEn}`).toBe(false);
    }
  });
});
