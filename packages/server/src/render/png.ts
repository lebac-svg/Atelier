import { chromium, type Browser } from "playwright";

let browser: Browser | null = null;

/**
 * SVG → PNG bằng Chromium headless (doc 08: một công cụ cho capture,
 * PNG lẫn PDF sau này). Browser giữ ấm giữa các lần render.
 */
export async function svgToPng(svg: string, outPath: string): Promise<void> {
  if (!browser) browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1700, height: 1220 },
    deviceScaleFactor: 2,
  });
  try {
    await page.setContent(`<!DOCTYPE html><html><body style="margin:0;background:#fff">${svg}</body></html>`, {
      waitUntil: "load",
    });
    await page.locator("svg").screenshot({ path: outPath });
  } finally {
    await page.close();
  }
}

export async function closePngRenderer(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
  }
}
