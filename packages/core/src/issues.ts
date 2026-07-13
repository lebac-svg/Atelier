/**
 * Issue — kết quả validator + lỗi cấu trúc của ops (docs/05, 07).
 * `block` hủy transaction; error/warn/info ghi được nhưng báo lại.
 */
export type Severity = "block" | "error" | "warn" | "info";

export type Issue = {
  rule: string;
  severity: Severity;
  entities: string[];
  message: string;
};

export const SEVERITY_ORDER: Record<Severity, number> = {
  block: 0,
  error: 1,
  warn: 2,
  info: 3,
};

export function sortIssues(issues: Issue[]): Issue[] {
  return [...issues].sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity] || a.rule.localeCompare(b.rule),
  );
}

export const hasBlocking = (issues: Issue[]): boolean =>
  issues.some((i) => i.severity === "block");
