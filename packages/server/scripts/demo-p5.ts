/**
 * Demo P5 — DoD tối thượng: "demo 60 giây" của doc 01 chạy trọn vẹn.
 *
 *   Mô tả nhà → mặt bằng 2 tầng hiện dần trên trình duyệt → người dùng kéo
 *   tường, gõ 4200 → dim tự cập nhật, Claude nhận ra và điều chỉnh phòng bên
 *   cạnh → bật 3D, ĐI BỘ (WASD) xuyên nhà có nội thất → ngắm nắng chiều.
 *
 * "Người dùng" = chromium do Playwright điều khiển. Mặc định chạy headed để
 * xem tận mắt; ATELIER_DEMO_NO_BROWSER=1 chạy headless kiểm thử.
 *
 * Chạy từ repo root:  pnpm demo:p5
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Page } from "playwright";
import { loadNhaOng4x16, validateProject, type Op, type Point } from "@atelier/core";
import { LiveServer } from "../src/live.js";
import { ProjectStore } from "../src/store.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const DIR = path.join(ROOT, "sandbox", "demo-p5");
const HEADLESS = process.env.ATELIER_DEMO_NO_BROWSER === "1";
const NHIP_MS = HEADLESS ? 60 : 650;

const t0 = Date.now();
const giây = (): string => `${((Date.now() - t0) / 1000).toFixed(1)}s`;
const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
const nói = (dòng: string): void => console.log(`[${giây().padStart(6)}] ${dòng}`);

function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

/** Điểm client chạm được trên entity + đích sau khi dịch model — như e2e. */
async function pointOn(page: Page, id: string, dModel: [number, number]): Promise<{ from: { x: number; y: number }; to: { x: number; y: number } }> {
  return page.evaluate(
    ({ id, dModel }) => {
      const svg = document.querySelector("#paper svg") as SVGSVGElement;
      const els = [...svg.querySelectorAll(`[data-id="${id}"]`)] as SVGGraphicsElement[];
      const ctm = svg.getScreenCTM()!;
      let cPaper: DOMPoint | null = null;
      outer: for (const el of els) {
        const bb = el.getBBox();
        if (bb.width < 0.5 && bb.height < 0.5) continue;
        for (const t of [0.5, 0.35, 0.65, 0.2, 0.8, 0.27, 0.73]) {
          const cand = bb.width >= bb.height
            ? new DOMPoint(bb.x + bb.width * t, bb.y + bb.height / 2)
            : new DOMPoint(bb.x + bb.width / 2, bb.y + bb.height * t);
          const client = cand.matrixTransform(ctm);
          const hit = document.elementFromPoint(client.x, client.y)?.closest("[data-id]")?.getAttribute("data-id");
          if (hit === id) {
            cPaper = cand;
            break outer;
          }
        }
      }
      if (!cPaper) throw new Error(`${id} bị đè kín`);
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

console.log('🎬 Atelier — demo 60 giây (doc 01): "nhà ống 4×16m, 2 tầng, 3 phòng ngủ, để được 2 xe máy"\n');
rmSync(DIR, { recursive: true, force: true });
mkdirSync(DIR, { recursive: true });

const store = new ProjectStore(DIR);
const live = new LiveServer(store, { lockReleaseMs: HEADLESS ? 400 : 5000 });
const url = await live.start();

const browser = await chromium.launch({ headless: HEADLESS, args: HEADLESS ? [] : ["--window-size=1500,960"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
store.newProject("Nhà anh Ba", undefined, loadNhaOng4x16().site.boundary, loadNhaOng4x16().brief);
await page.goto(url);
await page.waitForSelector("#paper", { timeout: 15_000 });
nói("Trình duyệt đã mở editor — Claude bắt đầu dựng, làm đến đâu mọc đến đó.");

// ── 1) Claude dựng nhà TỪNG NHỊP (như demo P2, nén nhịp) ─────────
const f = loadNhaOng4x16();
const batches: Array<{ note: string; ops: Op[] }> = [];
batches.push({
  note: "Khung tầng",
  ops: f.levels.map((l) =>
    l.id === "L1"
      ? ({ op: "update", entity: "level", id: "L1", data: { name: l.name, elevation: l.elevation, height: l.height } } as Op)
      : ({ op: "add", entity: "level", data: { ...l } } as Op)),
});
batches.push({
  note: "Style cửa + trục + vật liệu",
  ops: [
    ...Object.entries(f.styles.openings).map(([id, s]) => ({ op: "add", entity: "style", data: { id, ...s } }) as Op),
    ...Object.entries(f.finishes).map(([id, s]) => ({ op: "add", entity: "finish", data: { id, ...s } }) as Op),
    ...f.axes.x.map((a) => ({ op: "add", entity: "axis", data: { ...a, dir: "x" } }) as Op),
    ...f.axes.y.map((a) => ({ op: "add", entity: "axis", data: { ...a, dir: "y" } }) as Op),
  ],
});
for (const level of [...f.levels].sort((a, b) => a.elevation - b.elevation)) {
  const walls = f.walls.filter((w) => w.level === level.id);
  for (const [i, group] of chunk(walls, 6).entries()) {
    batches.push({ note: `${level.name} — tường (${i + 1})`, ops: group.map((w) => ({ op: "add", entity: "wall", data: { ...w } }) as Op) });
  }
  const wallIds = new Set(walls.map((w) => w.id));
  const opens = f.openings.filter((o) => wallIds.has(o.wall));
  if (opens.length) batches.push({ note: `${level.name} — cửa`, ops: opens.map((o) => ({ op: "add", entity: "opening", data: { ...o } }) as Op) });
  const rest: Op[] = [
    ...f.slabs.filter((s) => s.level === level.id).map((s) => ({ op: "add", entity: "slab", data: { ...s } }) as Op),
    ...f.stairs.filter((s) => s.level === level.id).map((s) => ({ op: "add", entity: "stair", data: { ...s } }) as Op),
    ...f.rooms.filter((r) => r.level === level.id).map((r) => ({ op: "add", entity: "room", data: { ...r } }) as Op),
  ];
  if (rest.length) batches.push({ note: `${level.name} — sàn + thang + phòng`, ops: rest });
  const furn = f.furniture.filter((x) => x.level === level.id);
  for (const [i, group] of chunk(furn, 10).entries()) {
    batches.push({ note: `${level.name} — nội thất (${i + 1})`, ops: group.map((x) => ({ op: "add", entity: "furniture", data: { ...x } }) as Op) });
  }
}
let rev = 0;
for (const b of batches) {
  const r = store.apply(rev, b.ops, b.note);
  if (!r.ok) {
    console.error(`⛔ "${b.note}": ${r.errors.map((e) => e.message).join("; ")}`);
    process.exit(1);
  }
  rev = r.revision;
  await sleep(NHIP_MS);
}
nói(`Nhà 2 tầng + ${f.furniture.length} món nội thất đã mọc xong trên màn hình (r${rev}).`);

// ── 2) Người dùng kéo tường W13 (L2), gõ 4200 ────────────────────
await page.click('#level-tabs .level-btn:text-is("L2")');
await page.waitForFunction(() => !!document.querySelector('#paper svg [data-id="W13"]'), undefined, { timeout: 10_000 });
nói("NGƯỜI DÙNG lên tầng 2, nắm tường W13 kéo — HUD hiện khoảng cách sống…");
const pts = await pointOn(page, "W13", [0, 300]);
await page.mouse.move(pts.from.x, pts.from.y);
await page.mouse.down();
await page.mouse.move(pts.to.x, pts.to.y, { steps: 8 });
await sleep(HEADLESS ? 150 : 700);
nói('NGƯỜI DÙNG gõ "4200 ⏎" — chốt phòng ngủ chính đúng 4200mm, dim tự cập nhật.');
await page.keyboard.type("4200");
await page.keyboard.press("Enter");
await page.mouse.up();
await page.waitForFunction((r) => document.getElementById("rev-seal")?.textContent === `r ${r}`, rev + 1, { timeout: 10_000 });
rev += 1;

// ── 3) Claude nhận ra và điều chỉnh phòng bên cạnh ───────────────
const thayĐổi = store.changesSince(rev - 1);
nói(`CLAUDE get_changes_since: "${thayĐổi.entries[0]!.summary}" — điều chỉnh 2 phòng bên cạnh theo.`);
const w13 = store.current.walls.find((w) => w.id === "W13")!;
const nửaDày = w13.thickness / 2;
const yMới = w13.from[1];
const dịch = (poly: Point[], yGần: number, yThành: number): Point[] =>
  poly.map(([x, y]) => (Math.abs(y - yGần) <= 1 ? [x, yThành] : [x, y]) as Point);
const r8 = store.current.rooms.find((r) => r.id === "R8")!;
const r9 = store.current.rooms.find((r) => r.id === "R9")!;
const ops: Op[] = [
  { op: "update", entity: "room", id: "R8", data: { polygon: dịch(r8.polygon, 5000 - nửaDày, yMới - nửaDày) } },
  { op: "update", entity: "room", id: "R9", data: { polygon: dịch(r9.polygon, 5000 + nửaDày, yMới + nửaDày) } },
];
// nội thất kẹt lại trong tường mới? đẩy theo luôn (như demo P3)
for (const i of validateProject(store.current).filter((x) => x.rule === "GEO-04" && x.entities.includes("W13"))) {
  const fid = i.entities.find((e) => e !== "W13");
  const fu = store.current.furniture.find((x) => x.id === fid);
  const đè = Number(/\((\d+)mm\)/.exec(i.message)?.[1] ?? 0);
  if (fu) ops.push({ op: "update", entity: "furniture", id: fu.id, data: { at: [fu.at[0], fu.at[1] + (fu.at[1] < yMới ? -1 : 1) * (đè + 30)] } });
}
const rAdj = store.apply(rev, ops, "Bạn thu phòng ngủ còn 4200 — tôi cập nhật ranh phòng + kê lại đồ");
if (!rAdj.ok) {
  console.error(`⛔ Claude điều chỉnh thất bại: ${rAdj.errors.map((e) => e.message).join("; ")}`);
  process.exit(1);
}
rev = rAdj.revision;
await sleep(NHIP_MS);

// ── 4) Bật 3D — đi bộ WASD xuyên nhà có nội thất ─────────────────
nói("Bật 3D — NGƯỜI DÙNG đi bộ (WASD) xuyên nhà, cao mắt 1600mm…");
await page.click('#level-tabs .level-btn:text-is("L1")');
await page.click('[data-view-btn="3d"]');
await page.click("#walk3d");
const shots: string[] = [];
shots.push(await live.capture("3d"));
await page.keyboard.down("w");
await sleep(HEADLESS ? 900 : 2600); // đi từ phòng khách vào bếp
await page.keyboard.up("w");
shots.push(await live.capture("3d"));
await page.keyboard.down("d");
await sleep(HEADLESS ? 400 : 1200);
await page.keyboard.up("d");
await page.keyboard.down("w");
await sleep(HEADLESS ? 700 : 2000);
await page.keyboard.up("w");
shots.push(await live.capture("3d"));
await page.keyboard.press("Escape");
nói("Đi bộ xong — 3 khung hình đã chụp dọc đường.");

// ── 5) Sun study — nắng chiều tháng 6 rọi vào đâu? ───────────────
await page.click("#sun3d");
await page.$eval("#sun-hour", (el) => {
  (el as HTMLInputElement).value = "16";
  el.dispatchEvent(new Event("input", { bubbles: true }));
});
await sleep(HEADLESS ? 300 : 1200);
shots.push(await live.capture("3d"));
nói("Sun study: 16:00 tháng 6 — bóng đổ thật theo hướng nhà + vĩ độ trong brief.");

const issues = validateProject(store.current);
mkdirSync(store.exportDir, { recursive: true });
shots.forEach((png, i) => writeFileSync(path.join(store.exportDir, `demo-p5-${i + 1}.png`), Buffer.from(png, "base64")));
console.log(`\n✔ Demo 60 giây hoàn tất trong ${giây()} — validator: ${issues.length === 0 ? "sạch" : `${issues.length} vấn đề`}.`);
console.log(`📷 4 khung hình → ${store.exportDir}\\demo-p5-*.png`);

if (HEADLESS) {
  await browser.close();
  await live.stop();
  process.exit(issues.length === 0 ? 0 : 1);
}
console.log("\nBrowser vẫn mở — tự đi bộ tiếp bằng WASD hoặc kéo nắng theo giờ. Ctrl+C để dừng.");
await new Promise(() => {});
