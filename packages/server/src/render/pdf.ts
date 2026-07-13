import { chromium, type Browser } from "playwright";

let browser: Browser | null = null;

/**
 * Ghép các tờ SVG A3 ngang thành MỘT file PDF nhiều trang (doc 08: Playwright
 * print đúng khổ). Mỗi SVG đã là một tờ hoàn chỉnh (khung tên, tỷ lệ) —
 * ở đây chỉ dàn trang, không đụng nội dung.
 */
export async function svgsToPdf(svgs: string[], outPath: string): Promise<void> {
  if (svgs.length === 0) throw new Error("Không có tờ nào để in.");
  if (!browser) browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    const html =
      `<!DOCTYPE html><html><head><meta charset="utf-8"><style>` +
      `@page{size:420mm 297mm;margin:0}` +
      `html,body{margin:0;padding:0}` +
      `.sheet{width:420mm;height:297mm;page-break-after:always;overflow:hidden}` +
      `.sheet:last-child{page-break-after:auto}` +
      `svg{display:block}` +
      `</style></head><body>` +
      svgs.map((s) => `<div class="sheet">${s}</div>`).join("") +
      `</body></html>`;
    await page.setContent(html, { waitUntil: "load" });
    await page.pdf({
      path: outPath,
      width: "420mm",
      height: "297mm",
      printBackground: true,
      preferCSSPageSize: true,
    });
  } finally {
    await page.close();
  }
}

export async function closePdfRenderer(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
  }
}
