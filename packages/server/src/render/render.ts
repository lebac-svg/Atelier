import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Project } from "@atelier/core";
import { buildElevationScene, type ElevationOptions } from "./elevation-scene.js";
import { buildPlanScene, type PlanOptions } from "./plan-scene.js";
import { buildScheduleScene, type ScheduleOptions } from "./schedule-scene.js";
import { buildSectionScene, type SectionOptions } from "./section-scene.js";
import { sceneToSvg } from "./svg-writer.js";

const FONT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "assets", "fonts");

let cachedFontCss: string | null = null;

/** @font-face nhúng data URI — SVG tự chứa, mở ở đâu chữ Việt cũng đúng. */
export function fontCss(): string {
  if (cachedFontCss != null) return cachedFontCss;
  try {
    const face = (file: string, weight: number): string => {
      const b64 = readFileSync(path.join(FONT_DIR, file)).toString("base64");
      return `@font-face{font-family:'Be Vietnam Pro';font-weight:${weight};src:url(data:font/ttf;base64,${b64}) format('truetype')}`;
    };
    cachedFontCss = face("BeVietnamPro-Regular.ttf", 400) + "\n" + face("BeVietnamPro-Bold.ttf", 700);
  } catch {
    cachedFontCss = ""; // thiếu font → dùng font hệ thống (Segoe UI có đủ dấu Việt)
  }
  return cachedFontCss;
}

export type RenderPlanOptions = PlanOptions & { embedFont?: boolean };

export type RenderedPlan = {
  svg: string;
  levelName: string;
  scaleLabel: string;
};

export function renderPlanSvg(p: Project, levelId: string, opts: RenderPlanOptions = {}): RenderedPlan {
  const { items, tf, meta } = buildPlanScene(p, levelId, opts);
  const svg = sceneToSvg(items, tf, { fontCss: opts.embedFont === false ? "" : fontCss() });
  return { svg, levelName: meta.levelName, scaleLabel: meta.scaleLabel };
}

export type RenderedSheet = { svg: string; title: string; scaleLabel: string };

/** Mặt đứng chính (P4). */
export function renderElevationSvg(p: Project, opts: ElevationOptions & { embedFont?: boolean } = {}): RenderedSheet {
  const { items, tf, meta } = buildElevationScene(p, opts);
  const svg = sceneToSvg(items, tf, { fontCss: opts.embedFont === false ? "" : fontCss() });
  return { svg, title: meta.title, scaleLabel: meta.scaleLabel };
}

/** Mặt cắt A-A qua thang (P4). */
export function renderSectionSvg(p: Project, opts: SectionOptions & { embedFont?: boolean } = {}): RenderedSheet {
  const { items, tf, meta } = buildSectionScene(p, opts);
  const svg = sceneToSvg(items, tf, { fontCss: opts.embedFont === false ? "" : fontCss() });
  return { svg, title: meta.title, scaleLabel: meta.scaleLabel };
}

/** Tờ thống kê phòng + cửa (P4). */
export function renderScheduleSvg(p: Project, opts: ScheduleOptions & { embedFont?: boolean } = {}): RenderedSheet {
  const { items, tf, meta } = buildScheduleScene(p, opts);
  const svg = sceneToSvg(items, tf, { fontCss: opts.embedFont === false ? "" : fontCss() });
  return { svg, title: meta.title, scaleLabel: meta.scaleLabel };
}

export type RenderedFiles = RenderedPlan & {
  svgPath: string;
  pngPath: string | null;
  pngError?: string;
};

/** Render ra file trong <dir> (mặc định .atelier/exports). PNG best-effort qua Chromium. */
export async function renderPlanFiles(
  p: Project,
  levelId: string,
  dir: string,
  opts: RenderPlanOptions = {},
): Promise<RenderedFiles> {
  const plan = renderPlanSvg(p, levelId, opts);
  mkdirSync(dir, { recursive: true });
  const base = `mat-bang-${levelId.toLowerCase()}`;
  const svgPath = path.join(dir, `${base}.svg`);
  writeFileSync(svgPath, plan.svg, "utf8");
  let pngPath: string | null = path.join(dir, `${base}.png`);
  let pngError: string | undefined;
  try {
    const { svgToPng } = await import("./png.js");
    await svgToPng(plan.svg, pngPath);
  } catch (e) {
    pngPath = null;
    pngError = e instanceof Error ? e.message : String(e);
  }
  return { ...plan, svgPath, pngPath, ...(pngError ? { pngError } : {}) };
}
