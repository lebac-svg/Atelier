import type { Project } from "./types.js";
import nhaOng4x16Json from "../fixtures/nha-ong-4x16.json" with { type: "json" };
import bietThuDocJson from "../fixtures/biet-thu-doc.json" with { type: "json" };

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
