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
    live = new LiveServer(store, { port: 0, lockReleaseMs: 300 }); // khóa nguội ngắn cho test
    const url = await live.start();
    browser = await chromium.launch();
    page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(url);
    // chờ snapshot dựng xong — test chạy đơn lẻ (-t) cũng phải có model sẵn
    await page.waitForSelector("#paper svg", { timeout: 15_000 });
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

  /**
   * Client px của một điểm THẬT SỰ chạm được trên entity (nhãn phòng/nội thất có thể
   * đè lên tường — quét dọc trục dài tìm chỗ elementFromPoint trả đúng id)
   * + client px đích sau khi dịch model (dx,dy).
   */
  async function wallDragPoints(id: string, dModel: [number, number]): Promise<{ from: { x: number; y: number }; to: { x: number; y: number } }> {
    // patch vừa về thì svg đang được thay giữa chừng (innerHTML swap) — retry ngắn
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        return await wallDragPointsOnce(id, dModel);
      } catch {
        await page.waitForTimeout(250);
      }
    }
    return wallDragPointsOnce(id, dModel);
  }

  async function wallDragPointsOnce(id: string, dModel: [number, number]): Promise<{ from: { x: number; y: number }; to: { x: number; y: number } }> {
    return page.evaluate(
      ({ id, dModel }) => {
        const svg = document.querySelector("#paper svg") as SVGSVGElement;
        const els = [...svg.querySelectorAll(`[data-id="${id}"]`)] as SVGGraphicsElement[];
        if (els.length === 0) throw new Error(`không thấy ${id} trong SVG`);
        const ctm = svg.getScreenCTM()!;
        let cPaper: DOMPoint | null = null;
        // quét MỌI mảnh của entity, dọc trục dài, ở 3 làn (tim ± lệch) — dim/nhãn P4
        // có thể đè vài điểm nhưng không thể đè kín cả tường
        outer: for (const el of els) {
          const bb = el.getBBox();
          if (bb.width < 0.5 && bb.height < 0.5) continue;
          for (const t of [0.5, 0.35, 0.65, 0.2, 0.8, 0.27, 0.73, 0.42, 0.58, 0.12, 0.88, 0.05, 0.95]) {
            for (const lane of [0.5, 0.28, 0.72]) {
              const cand = bb.width >= bb.height
                ? new DOMPoint(bb.x + bb.width * t, bb.y + bb.height * lane)
                : new DOMPoint(bb.x + bb.width * lane, bb.y + bb.height * t);
              const client = cand.matrixTransform(ctm);
              const hit = document.elementFromPoint(client.x, client.y)?.closest("[data-id]")?.getAttribute("data-id");
              if (hit === id) {
                cPaper = cand;
                break outer;
              }
            }
          }
        }
        if (!cPaper) throw new Error(`${id} bị phần tử khác đè kín — không có chỗ chạm`);
        const s = Number(svg.getAttribute("data-tf-scale"));
        const rot = svg.getAttribute("data-tf-rotated") === "1";
        const dPaper = rot ? [dModel[1] / s, dModel[0] / s] : [dModel[0] / s, -dModel[1] / s];
        const from = cPaper.matrixTransform(ctm);
        const to = new DOMPoint(cPaper.x + dPaper[0]!, cPaper.y + dPaper[1]!).matrixTransform(ctm);
        return { from: { x: from.x, y: from.y }, to: { x: to.x, y: to.y } };
      },
      { id, dModel },
    );
  }

  it("kéo tường bằng chuột → MỘT op origin user, snap lưới 50, tường dịch đúng hướng", async () => {
    const rev0 = store.current.meta.revision;
    const y0 = store.current.walls.find((w) => w.id === "W98")!.from[1];
    const pts = await wallDragPoints("W98", [0, 400]);
    await page.mouse.move(pts.from.x, pts.from.y);
    await page.mouse.down();
    for (let i = 1; i <= 8; i++) {
      await page.mouse.move(
        pts.from.x + ((pts.to.x - pts.from.x) * i) / 8,
        pts.from.y + ((pts.to.y - pts.from.y) * i) / 8,
      );
    }
    // đọc trạng thái HUD TRƯỚC khi nhả — nhưng assert sau, để lỗi không bỏ kẹt nút chuột
    const hudHidden = await page.$eval("#hud", (el) => (el as HTMLElement).hidden);
    await page.mouse.up();
    expect(hudHidden).toBe(false); // HUD phải nổi trong lúc kéo

    await page.waitForFunction((r) => document.getElementById("rev-seal")?.textContent === `r ${r}`, rev0 + 1, { timeout: 10_000 });
    const entry = store.changesSince(rev0).entries.at(-1)!;
    expect(entry.origin).toBe("user");
    expect(entry.ops).toHaveLength(1);
    const w = store.current.walls.find((x) => x.id === "W98")!;
    expect(w.from[1]).not.toBe(y0);
    expect(w.from[1] % 50).toBe(0); // snap lưới mặc định 50
    expect(w.from[0]).toBe(220); // không trôi dọc tường
  }, 30_000);

  it("HUD gõ số ⏎ → chốt ĐÚNG khoảng cách tới tường song song neo (demo DoD: gõ 4200)", async () => {
    const rev0 = store.current.meta.revision;
    const w0 = store.current.walls.find((x) => x.id === "W98")!;
    const y0 = w0.from[1];
    // neo = tường song song (ngang, L1) gần nhất không cùng tim — như wallDragSession chọn
    const anchor = store.current.walls
      .filter((x) => x.id !== "W98" && x.level === "L1" && x.from[1] === x.to[1] && Math.abs(x.from[1] - y0) > w0.thickness)
      .reduce((a, b) => (Math.abs(a.from[1] - y0) <= Math.abs(b.from[1] - y0) ? a : b));
    const side = Math.sign(y0 - anchor.from[1]) || 1;

    // nhích về phía đang đứng — đủ lớn để vượt ngưỡng nhận drag (~4px màn hình)
    const pts = await wallDragPoints("W98", [0, side * 300]);
    await page.mouse.move(pts.from.x, pts.from.y);
    await page.mouse.down();
    await page.mouse.move(pts.to.x, pts.to.y, { steps: 5 });
    await page.keyboard.type("4200");
    await page.keyboard.press("Enter");
    await page.mouse.up(); // đã commit bằng Enter — up chỉ dọn trạng thái

    await page.waitForFunction((r) => document.getElementById("rev-seal")?.textContent === `r ${r}`, rev0 + 1, { timeout: 10_000 });
    const wNew = store.current.walls.find((x) => x.id === "W98")!;
    expect(Math.abs(wNew.from[1] - anchor.from[1])).toBe(4200);
    expect(store.changesSince(rev0).entries.at(-1)!.summary).toContain("→"); // tóm tắt old → new
  }, 30_000);

  it("Ctrl+Z hoàn tác thao tác của chính mình — op nghịch đảo origin user", async () => {
    const rev0 = store.current.meta.revision;
    const yBefore = store.current.walls.find((x) => x.id === "W98")!.from[1];
    // kéo thêm một nhịp để chắc chắn stack có entry mới nhất là của mình
    const pts = await wallDragPoints("W98", [0, 200]);
    await page.mouse.move(pts.from.x, pts.from.y);
    await page.mouse.down();
    await page.mouse.move(pts.to.x, pts.to.y, { steps: 5 });
    await page.mouse.up();
    await page.waitForFunction((r) => document.getElementById("rev-seal")?.textContent === `r ${r}`, rev0 + 1, { timeout: 10_000 });

    await page.keyboard.press("Control+z");
    await page.waitForFunction((r) => document.getElementById("rev-seal")?.textContent === `r ${r}`, rev0 + 2, { timeout: 10_000 });
    const w = store.current.walls.find((x) => x.id === "W98")!;
    expect(w.from[1]).toBe(yBefore);
    expect(store.changesSince(rev0 + 1).entries.at(-1)!.origin).toBe("user");
  }, 30_000);

  it("soft-lock: đang kéo thì op của Claude bị LOCK-01; thả tay + hết khóa nguội thì qua", async () => {
    const pts = await wallDragPoints("W98", [0, 300]);
    await page.mouse.move(pts.from.x, pts.from.y);
    await page.mouse.down();
    await page.mouse.move(pts.to.x, pts.to.y, { steps: 5 });
    // presence draggingIds đã lên server → agent phải bị chặn
    await page.waitForTimeout(150);
    const rev = store.current.meta.revision;
    const rLocked = store.apply(rev, [{ op: "update", entity: "wall", id: "W98", data: { thickness: 220 } }]);

    await page.keyboard.press("Escape"); // hủy kéo — không sinh op
    await page.mouse.up();
    expect(rLocked.ok).toBe(false);
    if (!rLocked.ok) expect(rLocked.errors[0]!.rule).toBe("LOCK-01");
    await page.waitForTimeout(500); // 300ms khóa nguội + dư
    const rFree = store.apply(store.current.meta.revision, [{ op: "update", entity: "wall", id: "W98", data: { thickness: 110 } }]);
    expect(rFree.ok).toBe(true);
  }, 30_000);

  it("panel thuộc tính: sửa số trong ô nhập → op update", async () => {
    // chọn W98 bằng click vào điểm chắc chắn chạm tường (không dính nhãn đè)
    const pt = (await wallDragPoints("W98", [0, 0])).from;
    await page.mouse.click(pt.x, pt.y);
    await page.waitForFunction(() => !!document.querySelector("#props-body .prop-input"), undefined, { timeout: 5_000 });
    expect(await page.textContent("#props-body .prop-id")).toContain("W98");

    const rev0 = store.current.meta.revision;
    const thick = page.locator("#props-body tr", { hasText: "thickness" }).locator("input");
    await thick.fill("220");
    await thick.press("Enter");
    await page.waitForFunction((r) => document.getElementById("rev-seal")?.textContent === `r ${r}`, rev0 + 1, { timeout: 10_000 });
    expect(store.current.walls.find((x) => x.id === "W98")!.thickness).toBe(220);
  }, 30_000);

  it("P5 tool 5: mở catalog, chọn xe máy, click đặt 2 lần liên tiếp → 2 op add origin user", async () => {
    const rev0 = store.current.meta.revision;
    const nBefore = store.current.furniture.length;
    await page.click("#tool-furniture");
    expect(await page.$eval("#catalog-panel", (el) => (el as HTMLElement).hidden)).toBe(false);
    await page.fill("#catalog-panel .cat-search", "xe máy tay ga");
    await page.click("#catalog-panel .cat-item");

    // hai điểm trống trong hành lang L1 (model ~[720, 8200] và [720, 9400])
    for (const [i, my] of [8200, 9400].entries()) {
      const pt = await page.evaluate((yModel) => {
        const svg = document.querySelector("#paper svg") as SVGSVGElement;
        const s = Number(svg.getAttribute("data-tf-scale"));
        const rot = svg.getAttribute("data-tf-rotated") === "1";
        const ox = Number(svg.getAttribute("data-tf-ox"));
        const oy = Number(svg.getAttribute("data-tf-oy"));
        const minX = Number(svg.getAttribute("data-tf-min-x"));
        const minY = Number(svg.getAttribute("data-tf-min-y"));
        const maxY = Number(svg.getAttribute("data-tf-max-y"));
        const m: [number, number] = [720, yModel];
        const paper = rot
          ? [ox + (m[1] - minY) / s, oy + (m[0] - minX) / s]
          : [ox + (m[0] - minX) / s, oy + (maxY - m[1]) / s];
        const client = new DOMPoint(paper[0], paper[1]).matrixTransform(svg.getScreenCTM()!);
        return { x: client.x, y: client.y };
      }, my);
      await page.mouse.click(pt.x, pt.y);
      await page.waitForFunction(
        (r) => document.getElementById("rev-seal")?.textContent === `r ${r}`,
        rev0 + i + 1,
        { timeout: 10_000 },
      );
    }
    const placed = store.current.furniture.slice(nBefore);
    expect(placed).toHaveLength(2);
    expect(placed.every((f) => f.asset === "xe-may" && f.level === "L1")).toBe(true);
    expect(placed[0]!.at[0] % 50).toBe(0); // snap lưới
    expect(store.changesSince(rev0).entries.every((e) => e.origin === "user")).toBe(true);

    // Esc thoát chế độ đặt
    await page.keyboard.press("Escape");
    expect(await page.$eval("#catalog-panel", (el) => (el as HTMLElement).hidden)).toBe(true);
  }, 40_000);

  it("P5: R xoay nội thất đang chọn 90°", async () => {
    const f = store.current.furniture.at(-1)!;
    const rev0 = store.current.meta.revision;
    const pts = await wallDragPoints(f.id, [0, 0]);
    await page.mouse.click(pts.from.x, pts.from.y);
    await page.waitForFunction(
      (id) => !!document.getElementById("props-body")?.textContent?.includes(id),
      f.id,
      { timeout: 5_000 },
    );
    await page.keyboard.press("r");
    await page.waitForFunction((r) => document.getElementById("rev-seal")?.textContent === `r ${r}`, rev0 + 1, { timeout: 10_000 });
    expect(store.current.furniture.find((x) => x.id === f.id)!.rotation).toBe(90);
  }, 30_000);

  it("P5: đi bộ WASD — vào chế độ, W tiến về phía trước, thoát bằng nút", async () => {
    try {
      await page.click('[data-view-btn="3d"]');
      await page.click("#walk3d");
      expect(await page.$eval("#walk3d", (el) => el.classList.contains("is-active"))).toBe(true);
      expect(await page.textContent("#hint3d")).toContain("WASD");

      const shot1 = await live.capture("3d");
      await page.keyboard.down("w");
      await page.waitForTimeout(600);
      await page.keyboard.up("w");
      const shot2 = await live.capture("3d");
      expect(shot2).not.toBe(shot1); // camera đã di chuyển — khung hình đổi

      // thoát bằng Esc — pointer lock đang nuốt chuột nên click nút không tới nơi (hành vi thật)
      await page.keyboard.press("Escape");
      await page.waitForFunction(
        () => !document.getElementById("walk3d")?.classList.contains("is-active"),
        undefined,
        { timeout: 5_000 },
      );
    } finally {
      // dọn sạch dù fail — không để pointer lock/chế độ đi bộ rò sang test sau
      await page.evaluate(() => {
        document.exitPointerLock?.();
        const btn = document.getElementById("walk3d");
        if (btn?.classList.contains("is-active")) (btn as HTMLButtonElement).click();
      });
      await page.click('[data-view-btn="split"]');
    }
  }, 40_000);

  it("P5: sun study — bật nắng, kéo giờ, canvas vẫn chụp được", async () => {
    try {
      await page.click('[data-view-btn="3d"]');
      await page.click("#sun3d");
      expect(await page.$eval("#sun-controls", (el) => (el as HTMLElement).hidden)).toBe(false);
      await page.$eval("#sun-hour", (el) => {
        (el as HTMLInputElement).value = "16";
        el.dispatchEvent(new Event("input", { bubbles: true }));
      });
      const png = Buffer.from(await live.capture("3d"), "base64");
      expect(png.subarray(0, 8)).toEqual(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    } finally {
      await page.evaluate(() => {
        const btn = document.getElementById("sun3d");
        if (btn?.classList.contains("is-active")) (btn as HTMLButtonElement).click();
      });
      await page.click('[data-view-btn="split"]');
    }
  }, 30_000);

  it("click bản vẽ chọn entity → panel thuộc tính hiện đúng đối tượng vừa chạm", async () => {
    // điểm hit-verified (nhãn phòng/nội thất có thể đè lên tường — phải né)
    const pt = (await wallDragPoints("W98", [0, 0])).from;
    await page.mouse.click(pt.x, pt.y);
    await page.waitForFunction(
      () => !!document.getElementById("props-body")?.textContent?.includes("W98"),
      undefined,
      { timeout: 5_000 },
    );
  }, 15_000);
});
