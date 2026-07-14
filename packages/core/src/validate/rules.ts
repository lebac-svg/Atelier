import type { Severity } from "../issues.js";
import type { Project } from "../types.js";
import geoJson from "../../rules/geo.json" with { type: "json" };
import stdJson from "../../rules/std-vn.json" with { type: "json" };
import lobanJson from "../../rules/loban.json" with { type: "json" };
import plnJson from "../../rules/pln.json" with { type: "json" };
import genericJson from "../../rules/std-generic.json" with { type: "json" };

export type RuleSource = { vanBan?: string; dieu?: string; verified: boolean };

export type RuleDef = {
  id: string;
  title: string;
  severity: Severity;
  params?: Record<string, number>;
  source?: RuleSource;
  message: string;
  /** "planned" = định nghĩa sẵn nhưng chưa chạy được ở phiên bản này. */
  status?: "active" | "planned";
  note?: string;
  /** Rule chỉ áp cho các typology này; bỏ trống = mọi typology (mặc định). */
  typologies?: string[];
  /**
   * Evaluator dùng chung: id của một rule builtin có sẵn phép kiểm.
   * Bỏ trống = dùng evaluator trùng id. Cho phép pack cộng đồng tái dùng
   * phép kiểm hình học builtin (vd. STD-03 cao trần) với tham số/nguồn riêng
   * mà KHÔNG phải viết code — đúng tinh thần "rules là data" (ADR-09).
   */
  evaluator?: string;
};

export type CungDef = { name: string; good: boolean };
export type RulerDef = { label: string; cycle: number; cungs: CungDef[] };

/** Loại pack — core luôn chạy; các loại còn lại chọn theo region/config. */
export type PackKind = "core" | "standard" | "planning" | "customs";

export type PackMeta = {
  id: string;
  title: string;
  kind: PackKind;
  /** Vùng áp dụng (vd. "vn", "generic"); bỏ trống ở core (áp mọi nơi). */
  region?: string;
  /** Văn bản chuẩn gốc — hiển thị/tra cứu. */
  standard?: string;
};

export type RulePack = PackMeta & {
  rules: RuleDef[];
  rulers?: Record<string, RulerDef>;
};

type PackJson = { pack: PackMeta; rules: RuleDef[]; rulers?: Record<string, RulerDef> };

function toPack(j: PackJson): RulePack {
  return { ...j.pack, rules: j.rules, ...(j.rulers ? { rulers: j.rulers } : {}) };
}

const loban = lobanJson as PackJson & { rulers: Record<string, RulerDef> };

/**
 * Pack đóng gói sẵn = bộ chuẩn Việt Nam + lõi hình học. Thứ tự [geo, std-vn,
 * loban, pln] được GIỮ NGUYÊN để validateProject của project VN (không khai
 * config) ra kết quả byte-identical như trước khi có rule-pack.
 */
export const BUILTIN_PACKS: RulePack[] = [
  toPack(geoJson as PackJson),
  toPack(stdJson as PackJson),
  toPack(loban),
  toPack(plnJson as PackJson),
];

/** Registry = builtin + pack đăng ký thêm (cộng đồng/region khác). */
const registry = new Map<string, RulePack>(BUILTIN_PACKS.map((p) => [p.id, p]));

export function registerPack(pack: RulePack): void {
  registry.set(pack.id, pack);
}

export function getPack(id: string): RulePack | undefined {
  return registry.get(id);
}

export function listPacks(): RulePack[] {
  return [...registry.values()];
}

// Pack MẪU ngoài bộ VN — chứng minh cơ chế chọn pack (region "generic").
// Region thật (UK/US…) sẽ đăng ký y hệt qua quy trình contributor (docs/13).
registerPack(toPack(genericJson as PackJson));

export const ALL_RULES: RuleDef[] = BUILTIN_PACKS.flatMap((p) => p.rules);
export const RULERS: { thong_thuy: RulerDef; khoi_xay: RulerDef; ban_tho: RulerDef } = loban.rulers as never;

const builtinById = new Map(ALL_RULES.map((r) => [r.id, r]));

/** Tra rule theo id — builtin O(1), rồi quét pack đã đăng ký (community rule id). */
export function getRule(id: string): RuleDef | undefined {
  const b = builtinById.get(id);
  if (b) return b;
  for (const p of registry.values()) {
    const r = p.rules.find((x) => x.id === id);
    if (r) return r;
  }
  return undefined;
}

/**
 * Chọn pack áp cho một project:
 * - Core pack (geo) LUÔN chạy — hình học đúng ở mọi nơi.
 * - config.packs khai tường minh → dùng đúng danh sách đó.
 * - Ngược lại suy từ config.region (mặc định "vn") → mọi pack cùng region.
 * Project không khai config → đúng bộ VN builtin theo thứ tự cũ.
 */
export function packsFor(p: Project): RulePack[] {
  const cfg = p.config;
  const core = BUILTIN_PACKS.filter((pk) => pk.kind === "core");
  let selected: RulePack[];
  if (cfg?.packs) {
    selected = cfg.packs
      .map((id) => getPack(id))
      .filter((pk): pk is RulePack => pk != null && pk.kind !== "core");
  } else {
    const region = cfg?.region ?? "vn";
    selected = listPacks().filter((pk) => pk.kind !== "core" && pk.region === region);
  }
  const seen = new Set<string>();
  const out: RulePack[] = [];
  for (const pk of [...core, ...selected]) {
    if (seen.has(pk.id)) continue;
    seen.add(pk.id);
    out.push(pk);
  }
  return out;
}

/**
 * Rule active áp cho project (bỏ "planned", lọc theo typology).
 * Không truyền project → toàn bộ rule builtin (cho tra cứu/test/thống kê),
 * giữ nguyên hành vi cũ để `activeRules().length` và footnote không đổi.
 */
export function activeRules(p?: Project): RuleDef[] {
  const packs = p ? packsFor(p) : BUILTIN_PACKS;
  const typ = p?.config?.typology;
  const out: RuleDef[] = [];
  for (const pk of packs) {
    for (const r of pk.rules) {
      if (r.status === "planned") continue;
      // Rule gắn typologies chỉ chạy khi project khai đúng typology đó.
      if (r.typologies && (typ == null || !r.typologies.includes(typ))) continue;
      out.push(r);
    }
  }
  return out;
}

/** Rules còn ⚠ chưa đối chiếu văn bản gốc — renderer in chú thích khi > 0. */
export function unverifiedRules(): RuleDef[] {
  return activeRules().filter((r) => r.source?.verified === false);
}

/** Tra cứu rule theo từ khóa — nuôi tool standards_lookup. */
export function lookupRules(query: string): RuleDef[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_RULES;
  return ALL_RULES.filter((r) =>
    `${r.id} ${r.title} ${r.message} ${r.note ?? ""} ${r.source?.vanBan ?? ""}`.toLowerCase().includes(q),
  );
}
