import { getAsset } from "../catalog.js";
import type { Project } from "../types.js";
import type { Finding } from "./finding.js";
import { cungAt, nearestGood } from "./loban.js";
import { RULERS } from "./rules.js";

/** LBB chỉ chạy khi người dùng bật ở pha phỏng vấn (Q4 — brief.phong_thuy.lo_ban). */
const enabled = (p: Project): boolean => p.brief.phong_thuy?.lo_ban === true;

export function lbb01(p: Project): Finding[] {
  if (!enabled(p)) return [];
  const out: Finding[] = [];
  const ruler = RULERS.thong_thuy;
  for (const o of p.openings) {
    const dims: Array<[string, number]> = [["rộng", o.width]];
    if (o.kind === "door") dims.push(["cao", o.height]);
    for (const [dim, value] of dims) {
      const cung = cungAt(value, ruler);
      if (cung.good) continue;
      out.push({ entities: [o.id], values: { opening: o.id, dim, value, cung: cung.name } });
      const s = nearestGood(value, ruler);
      out.push({
        rule: "LBB-03",
        entities: [o.id],
        values: { item: `Cửa ${o.id} (${dim})`, value, suggest: s.suggest, cungTot: s.cung, delta: s.delta },
      });
    }
  }
  return out;
}

const KHOI_XAY = new Set(["ban-tho", "tu-bep-duoi"]);

export function lbb02(p: Project): Finding[] {
  if (!enabled(p)) return [];
  const out: Finding[] = [];
  const ruler = RULERS.khoi_xay;
  for (const f of p.furniture) {
    const asset = getAsset(f.asset);
    if (!asset || !KHOI_XAY.has(asset.category)) continue;
    const dims: Array<[string, number]> = [["ngang", asset.footprint.w], ["sâu", asset.footprint.d]];
    for (const [dim, value] of dims) {
      const cung = cungAt(value, ruler);
      if (cung.good) continue;
      const item = `${asset.label} ${f.id} (${dim})`;
      out.push({ entities: [f.id], values: { item, value, cung: cung.name } });
      const s = nearestGood(value, ruler);
      out.push({
        rule: "LBB-03",
        entities: [f.id],
        values: { item, value, suggest: s.suggest, cungTot: s.cung, delta: s.delta },
      });
    }
  }
  return out;
}
