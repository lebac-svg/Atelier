import type { Project } from "@atelier/core";
import { buildElevationScene } from "./elevation-scene.js";
import { buildEstimateScene } from "./estimate-scene.js";
import { buildPlanScene } from "./plan-scene.js";
import { buildScheduleScene } from "./schedule-scene.js";
import { buildSectionScene } from "./section-scene.js";
import { sceneToDxf } from "./dxf-writer.js";
import { fontCss } from "./render.js";
import { sceneToSvg } from "./svg-writer.js";
import type { Scene2D } from "./scene.js";
import type { PlanTransform } from "./transform.js";

/**
 * Bộ tờ hồ sơ (P4, pha E doc 02): mặt bằng từng tầng → mặt đứng → mặt cắt →
 * thống kê. Đánh số KT-01… tự động. Một nguồn scene cho cả SVG lẫn DXF.
 */

export type Sheet = {
  /** id chọn lọc qua tool export: "plan-L1" | "elevation" | "section" | "schedule" | "estimate". */
  id: string;
  no: string;
  title: string;
  scaleLabel: string;
  items: Scene2D;
  tf: PlanTransform;
  /** Tờ có hình học model không (bảng thống kê thì không → bỏ qua khi xuất DXF). */
  hasModel: boolean;
  /** Tên file không đuôi, không dấu. */
  fileBase: string;
};

export type SheetSetOptions = {
  date?: string;
  designer?: string;
  /** Lọc theo id ("plan-L1", "elevation"…) — bỏ trống là trọn bộ. */
  sheets?: string[];
};

export type SheetSet = {
  sheets: Sheet[];
  /** Tờ bị bỏ vì model chưa đủ (vd chưa có thang → không có mặt cắt). */
  skipped: Array<{ id: string; reason: string }>;
};

export function buildSheetSet(p: Project, opts: SheetSetOptions = {}): SheetSet {
  const all: Sheet[] = [];
  const skipped: Array<{ id: string; reason: string }> = [];
  const common = {
    ...(opts.date ? { date: opts.date } : {}),
    ...(opts.designer ? { designer: opts.designer } : {}),
  };
  // đánh số trên TRỌN bộ trước, lọc sau — xuất lẻ một tờ vẫn giữ đúng số KT của nó
  let n = 0;
  const nextNo = (): string => `KT-${String(++n).padStart(2, "0")}`;
  const tryBuild = (id: string, fileSuffix: string, build: (no: string) => { items: Scene2D; tf: PlanTransform; title: string; scaleLabel: string }, hasModel = true): void => {
    const no = nextNo();
    try {
      const b = build(no);
      all.push({ id, no, title: b.title, scaleLabel: b.scaleLabel, items: b.items, tf: b.tf, hasModel, fileBase: `${no.toLowerCase()}-${fileSuffix}` });
    } catch (e) {
      n -= 1;
      skipped.push({ id, reason: e instanceof Error ? e.message : String(e) });
    }
  };

  for (const level of [...p.levels].sort((a, b) => a.elevation - b.elevation)) {
    tryBuild(`plan-${level.id}`, `mat-bang-${level.id.toLowerCase()}`, (no) => {
      const b = buildPlanScene(p, level.id, { ...common, sheetNo: no });
      return { items: b.items, tf: b.tf, title: `MẶT BẰNG ${b.meta.levelName.toUpperCase()}`, scaleLabel: b.meta.scaleLabel };
    });
  }
  tryBuild("elevation", "mat-dung", (no) => {
    const b = buildElevationScene(p, { ...common, sheetNo: no });
    return { items: b.items, tf: b.tf, ...b.meta };
  });
  tryBuild("section", "mat-cat-a-a", (no) => {
    const b = buildSectionScene(p, { ...common, sheetNo: no });
    return { items: b.items, tf: b.tf, ...b.meta };
  });
  tryBuild("schedule", "thong-ke", (no) => {
    const b = buildScheduleScene(p, { ...common, sheetNo: no });
    return { items: b.items, tf: b.tf, ...b.meta };
  }, false);
  tryBuild("estimate", "du-toan", (no) => {
    const b = buildEstimateScene(p, { ...common, sheetNo: no });
    return { items: b.items, tf: b.tf, ...b.meta };
  }, false);

  const want = (id: string): boolean => !opts.sheets?.length || opts.sheets.includes(id);
  return { sheets: all.filter((s) => want(s.id)), skipped: skipped.filter((s) => want(s.id)) };
}

export function sheetSvg(s: Sheet, embedFont = true): string {
  return sceneToSvg(s.items, s.tf, { fontCss: embedFont ? fontCss() : "" });
}

export function sheetDxf(s: Sheet): string {
  return sceneToDxf(s.items, { scale: s.tf.scale });
}
