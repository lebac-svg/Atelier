import type { Project } from "./types.js";
import nhaOng4x16Json from "../fixtures/nha-ong-4x16.json" with { type: "json" };
import bietThuDocJson from "../fixtures/biet-thu-doc.json" with { type: "json" };
import nhaCap4Json from "../fixtures/nha-cap-4.json" with { type: "json" };
import nhaVuonJson from "../fixtures/nha-vuon.json" with { type: "json" };
import canHoJson from "../fixtures/can-ho.json" with { type: "json" };
import detachedUkJson from "../fixtures/detached-uk.json" with { type: "json" };

/** Fixture chuẩn: nhà ống 4×16m, 2 tầng, 3PN — dùng cho golden tests + template. */
export const NHA_ONG_4X16 = nhaOng4x16Json as unknown as Project;

/** Bản sao sâu để test/mutation không làm bẩn fixture gốc. */
export function loadNhaOng4x16(): Project {
  return structuredClone(NHA_ONG_4X16);
}

/**
 * Fixture P7 (DoD doc 12): biệt thự 2 tầng MÁI HIP trên LÔ GÓC 2 mặt tiền,
 * ĐẤT DỐC ~1.1m — bài tổng hợp mái dốc + đa mặt tiền + địa hình.
 */
export const BIET_THU_DOC = bietThuDocJson as unknown as Project;

export function loadBietThuDoc(): Project {
  return structuredClone(BIET_THU_DOC);
}

/** Fixture P8: nhà cấp 4 một tầng — không thang, mái tôn gable, mẫu nhập môn. */
export const NHA_CAP_4 = nhaCap4Json as unknown as Project;

export function loadNhaCap4(): Project {
  return structuredClone(NHA_CAP_4);
}

/** Fixture P8: nhà vườn — lô lớn méo + terrain nhẹ, 1 tầng mái ngói hip, mật độ ~21%. */
export const NHA_VUON = nhaVuonJson as unknown as Project;

export function loadNhaVuon(): Project {
  return structuredClone(NHA_VUON);
}

/** Fixture P8: căn hộ cải tạo — KHÔNG lô đất, boundary = khung căn hộ có sẵn. */
export const CAN_HO = canHoJson as unknown as Project;

export function loadCanHo(): Project {
  return structuredClone(CAN_HO);
}

/**
 * Fixture P9 (DoD doc 12): detached UK 2 tầng gable — region "uk", validate
 * bằng pack Approved Documents, KHÔNG dính TCVN/Lỗ Ban/VND ở bất kỳ đâu.
 */
export const DETACHED_UK = detachedUkJson as unknown as Project;

export function loadDetachedUk(): Project {
  return structuredClone(DETACHED_UK);
}
