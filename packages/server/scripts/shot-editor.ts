/**
 * Chụp toàn trang editor đang chạy thành PNG (đồ nghề dev/docs).
 * Dùng:  tsx packages/server/scripts/shot-editor.ts [file-ra.png]
 * Env:   ATELIER_URL (mặc định http://localhost:4823)
 */
import { chromium } from "playwright";

const url = process.env.ATELIER_URL ?? "http://localhost:4823";
const out = process.argv[2] ?? "editor-full.png";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 950 } });
await page.goto(url);
await page.waitForSelector("#paper svg", { timeout: 15_000 });
await page.waitForTimeout(1500); // chờ 3D render + fit camera
await page.screenshot({ path: out });
await browser.close();
console.log(`✔ ${out}`);
