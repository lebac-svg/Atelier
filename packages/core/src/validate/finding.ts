import type { Severity } from "../issues.js";

/** Kết quả thô từ evaluator — engine ghép với RuleDef thành Issue. */
export type Finding = {
  /** Mặc định = rule đang chạy; evaluator được phép phát rule khác (vd LBB-03). */
  rule?: string;
  entities: string[];
  values?: Record<string, string | number>;
  /** Ghi đè mức nghiêm trọng của rule (vd STD-06 vế 800–900 → warn). */
  severity?: Severity;
};
