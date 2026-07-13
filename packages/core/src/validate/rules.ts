import type { Severity } from "../issues.js";
import geoJson from "../../rules/geo.json" with { type: "json" };
import stdJson from "../../rules/std-vn.json" with { type: "json" };
import lobanJson from "../../rules/loban.json" with { type: "json" };

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
};

export type CungDef = { name: string; good: boolean };
export type RulerDef = { label: string; cycle: number; cungs: CungDef[] };

const geo = geoJson as { rules: RuleDef[] };
const std = stdJson as { rules: RuleDef[] };
const loban = lobanJson as { rulers: Record<string, RulerDef>; rules: RuleDef[] };

export const ALL_RULES: RuleDef[] = [...geo.rules, ...std.rules, ...loban.rules];
export const RULERS: { thong_thuy: RulerDef; khoi_xay: RulerDef } = loban.rulers as never;

const byId = new Map(ALL_RULES.map((r) => [r.id, r]));

export function getRule(id: string): RuleDef | undefined {
  return byId.get(id);
}

export function activeRules(): RuleDef[] {
  return ALL_RULES.filter((r) => r.status !== "planned");
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
