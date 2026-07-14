import type { Issue } from "../issues.js";
import { sortIssues } from "../issues.js";
import type { Project } from "../types.js";
import type { Finding } from "./finding.js";
import { activeRules, getRule, type RuleDef } from "./rules.js";
import { geo01, geo02, geo03, geo04, geo05, geo06, geo07, geo08 } from "./evaluators-geo.js";
import { std01, std02, std03, std04, std05, std06, std08, std09, std10, std11 } from "./evaluators-std.js";
import { pln01, pln02, pln03, pln04, pln05, pln06, pln07 } from "./evaluators-pln.js";
import { lbb01, lbb02, lbb04 } from "./evaluators-lbb.js";

type Evaluator = (p: Project, def: RuleDef) => Finding[];

const EVALUATORS: Record<string, Evaluator> = {
  "GEO-01": geo01,
  "GEO-02": geo02,
  "GEO-03": geo03,
  "GEO-04": geo04,
  "GEO-05": geo05,
  "GEO-06": geo06,
  "GEO-07": geo07,
  "GEO-08": geo08,
  "STD-01": std01,
  "STD-02": std02,
  "STD-03": std03,
  "STD-04": std04,
  "STD-05": std05,
  "STD-06": std06,
  "STD-08": std08,
  "STD-09": std09,
  "STD-10": std10,
  "STD-11": std11,
  "PLN-01": pln01,
  "PLN-02": pln02,
  "PLN-03": pln03,
  "PLN-04": pln04,
  "PLN-05": pln05,
  "PLN-06": pln06,
  "PLN-07": pln07,
  "LBB-01": lbb01,
  "LBB-02": lbb02,
  "LBB-04": lbb04,
  // LBB-03 được phát từ bên trong LBB-01/02/04 (gợi ý số đẹp đi kèm phát hiện xấu)
};

export function formatMessage(tpl: string, values: Record<string, string | number>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k: string) => (k in values ? String(values[k]) : `{${k}}`));
}

/**
 * Chạy toàn bộ rule active trên model → Issues đã sắp theo mức nghiêm trọng.
 * Đây chính là hàm tiêm vào applyOps (block → hủy transaction) và tool validate.
 */
export function validateProject(p: Project): Issue[] {
  const issues: Issue[] = [];
  for (const def of activeRules(p)) {
    // def.evaluator cho phép pack cộng đồng tái dùng phép kiểm builtin (vd. STD-03).
    const evaluate = EVALUATORS[def.evaluator ?? def.id];
    if (!evaluate) continue;
    for (const f of evaluate(p, def)) {
      const ruleId = f.rule ?? def.id;
      const ruleDef = ruleId === def.id ? def : getRule(ruleId);
      if (!ruleDef) continue;
      issues.push({
        rule: ruleId,
        severity: f.severity ?? ruleDef.severity,
        entities: f.entities,
        message: formatMessage(ruleDef.message, f.values ?? {}),
      });
    }
  }
  return sortIssues(issues);
}
