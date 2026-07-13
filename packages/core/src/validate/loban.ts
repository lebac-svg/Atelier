import type { RulerDef } from "./rules.js";

/**
 * Toán thước Lỗ Ban: chu kỳ chia 8 cung đều nhau,
 * kích thước mod chu kỳ → tra cung. Cơ chế chốt từ P0;
 * tên cung + biên đối chiếu nguồn ở task tra chuẩn (⚠ verified:false).
 */

export type CungResult = { index: number; name: string; good: boolean };

export function cungAt(value: number, ruler: RulerDef): CungResult {
  const seg = ruler.cycle / ruler.cungs.length;
  const mod = ((value % ruler.cycle) + ruler.cycle) % ruler.cycle;
  const index = Math.min(ruler.cungs.length - 1, Math.floor(mod / seg));
  const cung = ruler.cungs[index]!;
  return { index, name: cung.name, good: cung.good };
}

/**
 * Kích thước đẹp gần nhất: tâm của cung tốt gần `value` nhất,
 * làm tròn bội số 5mm (tâm cách biên ≥ seg/2 ≈ 32mm nên tròn 5 vẫn trong cung).
 */
export function nearestGood(value: number, ruler: RulerDef): { suggest: number; cung: string; delta: number } {
  const seg = ruler.cycle / ruler.cungs.length;
  const baseCycle = Math.floor(value / ruler.cycle) - 1;
  let best: { suggest: number; cung: string; delta: number } | null = null;
  for (let k = baseCycle; k <= baseCycle + 3; k++) {
    if (k < 0) continue;
    for (let i = 0; i < ruler.cungs.length; i++) {
      const cung = ruler.cungs[i]!;
      if (!cung.good) continue;
      const center = k * ruler.cycle + (i + 0.5) * seg;
      if (center <= 0) continue;
      const suggest = Math.round(center / 5) * 5;
      const delta = suggest - value;
      if (!best || Math.abs(delta) < Math.abs(best.delta)) {
        best = { suggest, cung: cung.name, delta };
      }
    }
  }
  return best!;
}
