import type { Point } from "@atelier/core";

/**
 * Sun study (P5, doc 09): vị trí mặt trời từ giờ + tháng + vĩ độ,
 * quy về HỆ TRỤC MODEL qua site.north. Công thức thiên văn rút gọn
 * (declination Cooper + góc giờ) — đủ đúng cho mục đích xem nắng rọi phòng nào.
 */

export type SunPos = {
  /** Vector ĐƠN VỊ hướng TỚI mặt trời trong hệ model (z lên). */
  dir: [number, number, number];
  /** Độ cao mặt trời (độ) — âm là dưới chân trời. */
  altitude: number;
  /** Phương vị từ BẮC theo chiều kim đồng hồ (độ). */
  azimuth: number;
};

const RAD = Math.PI / 180;

/** Ngày giữa tháng — đủ cho slider theo tháng. */
const MID_MONTH_DAY = [15, 45, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349];

/**
 * @param hour   giờ mặt trời địa phương (6..18, chấp nhận lẻ 13.5)
 * @param month  1..12
 * @param latDeg vĩ độ (dương = Bắc); VN ~ 8..23, mặc định nơi gọi 10.8 (TP.HCM)
 * @param northDeg site.north — độ lệch hướng bắc so với +y model, CCW
 */
export function sunPosition(hour: number, month: number, latDeg: number, northDeg: number): SunPos {
  const n = MID_MONTH_DAY[Math.min(11, Math.max(0, Math.round(month) - 1))]!;
  const decl = 23.45 * Math.sin(RAD * ((360 * (284 + n)) / 365)); // Cooper
  const hourAngle = 15 * (hour - 12); // độ, chiều theo mặt trời

  const φ = latDeg * RAD;
  const δ = decl * RAD;
  const H = hourAngle * RAD;

  const sinAlt = Math.sin(φ) * Math.sin(δ) + Math.cos(φ) * Math.cos(δ) * Math.cos(H);
  const altitude = Math.asin(Math.min(1, Math.max(-1, sinAlt)));

  // phương vị từ Bắc, quay theo chiều kim đồng hồ về Đông (công thức chuẩn NOAA rút gọn)
  const cosAz = (Math.sin(δ) - Math.sin(φ) * sinAlt) / (Math.cos(φ) * Math.cos(altitude) || 1e-9);
  let az = Math.acos(Math.min(1, Math.max(-1, cosAz))) / RAD;
  if (hourAngle > 0) az = 360 - az; // chiều: sáng Đông (az<180), chiều Tây (az>180)

  // hệ model: bắc = +y xoay northDeg CCW; đông = bắc xoay -90° (CW)
  const north: Point = [-Math.sin(northDeg * RAD), Math.cos(northDeg * RAD)];
  const east: Point = [north[1], -north[0]];
  const azR = az * RAD;
  const hx = north[0] * Math.cos(azR) + east[0] * Math.sin(azR);
  const hy = north[1] * Math.cos(azR) + east[1] * Math.sin(azR);
  const cosAlt = Math.cos(altitude);

  return {
    dir: [hx * cosAlt, hy * cosAlt, Math.sin(altitude)],
    altitude: altitude / RAD,
    azimuth: az,
  };
}
