import { existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { chromium, type Browser, type Page } from "playwright";
import { LiveServer } from "./live.js";
import { ProjectStore } from "./store.js";

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "web", "dist");
const hasDist = existsSync(path.join(DIST, "index.html"));

/** Cần dist của web editor — thiếu thì skip (chạy `pnpm build:web` để bật). */
describe.skipIf(!hasDist)("E2E editor thật (chromium headless)", () => {
  let store: ProjectStore;
  let live: LiveServer;
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    store = new ProjectStore(mkdtempSync(path.join(tmpdir(), "atelier-e2e-")));
    store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
    live = new LiveServer(store, { port: 0 });
    const url = await live.start();
    browser = await chromium.launch();
    page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(url);
  }, 90_000);

  afterAll(async () => {
    await browser?.close();
    await live?.stop();
  });

  it("snapshot dựng trang: tên dự án, SVG mặt bằng, tab tầng, kết nối trực tiếp", async () => {
    await page.waitForFunction(
      () => document.getElementById("project-name")?.textContent?.includes("Nhà anh Ba"),
      undefined,
      { timeout: 15_000 },
    );
    await page.waitForSelector("#paper svg", { timeout: 15_000 });
    const levels = await page.$$eval("#level-tabs .level-btn", (els) => els.map((e) => e.textContent));
    expect(levels).toEqual(["L1", "L2"]);
    expect(await page.textContent("#conn-text")).toBe("trực tiếp");
    expect(await page.textContent("#rev-seal")).toBe("r 0");
  }, 30_000);

  it("apply_ops → rev seal nhảy, toast Claude, tường mới xuất hiện trong SVG", async () => {
    const r = store.apply(
      0,
      [{ op: "add", entity: "wall", data: { id: "W98", level: "L1", from: [220, 2500], to: [3780, 2500], thickness: 110, kind: "gach" } }],
      "thêm tường thử nghiệm",
    );
    expect(r.ok).toBe(true);

    await page.waitForFunction(() => document.getElementById("rev-seal")?.textContent === "r 1", undefined, { timeout: 10_000 });
    await page.waitForSelector(".toast", { timeout: 10_000 });
    expect(await page.textContent(".toast")).toContain("thêm tường thử nghiệm");
    await page.waitForFunction(() => !!document.querySelector('#paper [data-id="W98"]'), undefined, { timeout: 10_000 });
    expect(await page.textContent("#claude-note")).toContain("thêm tường thử nghiệm");
  }, 30_000);

  it("capture_view 3d + plan qua WS trả PNG thật", async () => {
    const png3d = Buffer.from(await live.capture("3d"), "base64");
    expect(png3d.subarray(0, 8)).toEqual(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    expect(png3d.length).toBeGreaterThan(5_000);

    const pngPlan = Buffer.from(await live.capture("plan"), "base64");
    expect(pngPlan.subarray(0, 8)).toEqual(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    expect(pngPlan.length).toBeGreaterThan(5_000);
  }, 30_000);

  it("click bản vẽ chọn entity → panel thuộc tính hiện đúng đối tượng vừa chạm", async () => {
    const wall = page.locator('#paper [data-id="W98"]').first();
    const box = await wall.boundingBox();
    expect(box).not.toBeNull();
    const pt = { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 };
    // phần tử THẬT trên đỉnh tại điểm click (nhãn phòng/nội thất có thể đè lên tường)
    const hitId = await page.evaluate(
      (p) => document.elementFromPoint(p.x, p.y)?.closest("[data-id]")?.getAttribute("data-id") ?? null,
      pt,
    );
    expect(hitId).toBeTruthy();
    await page.mouse.click(pt.x, pt.y);
    await page.waitForFunction(
      (id) => !!id && !!document.getElementById("props-body")?.textContent?.includes(id),
      hitId,
      { timeout: 5_000 },
    );
  }, 15_000);
});
