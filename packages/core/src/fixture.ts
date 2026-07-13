import type { Project } from "./types.js";
import nhaOng4x16Json from "../fixtures/nha-ong-4x16.json" with { type: "json" };

/** Fixture chuẩn: nhà ống 4×16m, 2 tầng, 3PN — dùng cho golden tests + template. */
export const NHA_ONG_4X16 = nhaOng4x16Json as unknown as Project;

/** Bản sao sâu để test/mutation không làm bẩn fixture gốc. */
export function loadNhaOng4x16(): Project {
  return structuredClone(NHA_ONG_4X16);
}
