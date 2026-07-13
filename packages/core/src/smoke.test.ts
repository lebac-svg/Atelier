import { describe, expect, it } from "vitest";
import { CORE_VERSION } from "./index.js";

describe("toolchain", () => {
  it("chạy được test qua workspace", () => {
    expect(CORE_VERSION).toBe("0.1.0");
  });
});
