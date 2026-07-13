import { describe, expect, it } from "vitest";
import { sunPosition } from "./sun.js";

describe("sunPosition — sun study P5 (vĩ độ VN)", () => {
  const LAT = 10.8; // TP.HCM

  it("trưa hè: mặt trời gần thiên đỉnh, hơi lệch BẮC (declination > vĩ độ)", () => {
    const s = sunPosition(12, 6, LAT, 0);
    expect(s.altitude).toBeGreaterThan(70);
    expect(s.dir[2]).toBeGreaterThan(0.9);
    // az ~ 0/360 (bắc) → thành phần y dương (bắc = +y khi north=0)
    expect(Math.min(s.azimuth, 360 - s.azimuth)).toBeLessThan(25);
  });

  it("trưa đông: mặt trời phía NAM, thấp hơn", () => {
    const s = sunPosition(12, 12, LAT, 0);
    expect(Math.abs(s.azimuth - 180)).toBeLessThan(15);
    expect(s.altitude).toBeLessThan(60);
    expect(s.dir[1]).toBeLessThan(0); // hướng tới mặt trời = về phía nam (-y)
  });

  it("sáng ở phía ĐÔNG, chiều ở phía TÂY; đêm dưới chân trời", () => {
    const sáng = sunPosition(8, 3, LAT, 0);
    const chiều = sunPosition(16, 3, LAT, 0);
    expect(sáng.azimuth).toBeGreaterThan(0);
    expect(sáng.azimuth).toBeLessThan(180); // đông
    expect(chiều.azimuth).toBeGreaterThan(180); // tây
    expect(sáng.dir[0]).toBeGreaterThan(0); // đông = +x khi north = +y
    expect(chiều.dir[0]).toBeLessThan(0);
    expect(sunPosition(23, 3, LAT, 0).altitude).toBeLessThan(0);
  });

  it("site.north xoay cả hệ: nhà quay 90° thì nắng sáng đổi trục", () => {
    const s0 = sunPosition(8, 3, LAT, 0);
    const s90 = sunPosition(8, 3, LAT, 90);
    // xoay north 90° CCW → thành phần x cũ chuyển sang y
    expect(s90.dir[1]).toBeCloseTo(s0.dir[0], 5);
    expect(s90.dir[0]).toBeCloseTo(-s0.dir[1], 5);
    expect(s90.altitude).toBeCloseTo(s0.altitude, 6); // độ cao không đổi theo hướng nhà
  });

  it("vector đơn vị", () => {
    const s = sunPosition(10, 9, LAT, 37);
    expect(Math.hypot(...s.dir)).toBeCloseTo(1, 6);
  });
});
