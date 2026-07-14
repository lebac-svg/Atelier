/**
 * Demo VIDEO — trọn quy trình từ đầu đến cuối, QUAY LẠI thành file .webm:
 *
 *   Phỏng vấn (brief) → dựng biệt thự mái dốc trên lô góc ĐẤT DỐC từng nhịp
 *   (2D mọc dần) → bật 3D xem tầng 2 + MÁI HIP lợp lên + nền đất dốc →
 *   orbit → kê nội thất → ĐI BỘ xuyên nhà → sun study → xuất bộ hồ sơ PDF.
 *
 * "Máy quay" = Playwright recordVideo (webm, không cần cài thêm gì).
 * Chạy từ repo root:  npx tsx sandbox/demo-video.ts
 */
import { mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { loadBietThuDoc, validateProject, type Op, type Project } from "@atelier/core";
import { LiveServer } from "../src/live.js";
import { ProjectStore } from "../src/store.js";
import { buildSheetSet, sheetSvg } from "../src/render/sheets.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const DIR = path.join(ROOT, "sandbox", "demo-video");
const NHIP = 850;

const t0 = Date.now();
const giây = (): string => `${((Date.now() - t0) / 1000).toFixed(1)}s`;
const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
const nói = (dòng: string): void => console.log(`[${giây().padStart(6)}] ${dòng}`);

function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

console.log("🎬 Atelier — quay video quy trình từ đầu đến cuối");
console.log('   Gia chủ: "lô góc 12×15m hai mặt đường, đất dốc ~1.1m, muốn biệt thự 2 tầng mái ngói"\n');

// ── 0) Brief từ phỏng vấn pha A → project chỉ có ĐẤT (site + terrain), chưa có nhà ──
rmSync(DIR, { recursive: true, force: true });
mkdirSync(DIR, { recursive: true });
const villa = loadBietThuDoc();
const đấtTrống: Project = {
  ...villa,
  meta: { ...villa.meta, id: "nha-co-tu", name: "Biệt thự nhà cô Tư — lô góc đồi", revision: 0 },
  axes: { x: [], y: [] },
  walls: [], openings: [], slabs: [], roofs: [], stairs: [], rooms: [], furniture: [],
  styles: { openings: {} },
  finishes: {},
};
writeFileSync(path.join(DIR, "atelier.project.json"), JSON.stringify(đấtTrống, null, 2));

const store = new ProjectStore(DIR);
store.openProject();
const live = new LiveServer(store, { lockReleaseMs: 5000 });
const url = await live.start();

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: DIR, size: { width: 1280, height: 720 } },
});
const page = await context.newPage();
await page.goto(url);
await page.waitForSelector("#paper", { timeout: 15_000 });
nói("🔴 Máy quay chạy — editor mở, mới chỉ thấy ranh đất méo + brief pha A.");
await sleep(2200);

// ── 1) Dựng từng nhịp trên 2D — tầng 1 ──────────────────────────
const batches: Array<{ note: string; ops: Op[] }> = [];
batches.push({
  note: "Trục + kiểu cửa",
  ops: [
    ...Object.entries(villa.styles.openings).map(([id, s]) => ({ op: "add", entity: "style", data: { id, ...s } }) as Op),
    ...villa.axes.x.map((a) => ({ op: "add", entity: "axis", data: { ...a, dir: "x" } }) as Op),
    ...villa.axes.y.map((a) => ({ op: "add", entity: "axis", data: { ...a, dir: "y" } }) as Op),
  ],
});
for (const level of villa.levels) {
  const walls = villa.walls.filter((w) => w.level === level.id);
  for (const [i, g] of chunk(walls, 4).entries()) {
    batches.push({ note: `${level.name} — tường bao & ngăn (${i + 1})`, ops: g.map((w) => ({ op: "add", entity: "wall", data: { ...w } }) as Op) });
  }
  const ids = new Set(walls.map((w) => w.id));
  const opens = villa.openings.filter((o) => ids.has(o.wall));
  if (opens.length) batches.push({ note: `${level.name} — cửa đi + cửa sổ`, ops: opens.map((o) => ({ op: "add", entity: "opening", data: { ...o } }) as Op) });
  const rest: Op[] = [
    ...villa.slabs.filter((s) => s.level === level.id).map((s) => ({ op: "add", entity: "slab", data: { ...s } }) as Op),
    ...villa.stairs.filter((s) => s.level === level.id).map((s) => ({ op: "add", entity: "stair", data: { ...s } }) as Op),
    ...villa.rooms.filter((r) => r.level === level.id).map((r) => ({ op: "add", entity: "room", data: { ...r } }) as Op),
  ];
  if (rest.length) batches.push({ note: `${level.name} — sàn, thang, đặt tên phòng`, ops: rest });
}

let rev = 0;
const applyBatch = async (b: { note: string; ops: Op[] }): Promise<void> => {
  const r = store.apply(rev, b.ops, b.note);
  if (!r.ok) {
    console.error(`⛔ "${b.note}": ${r.errors.map((e) => e.message).join("; ")}`);
    process.exit(1);
  }
  rev = r.revision;
  await sleep(NHIP);
};

const l1Batches = batches.filter((b) => !b.note.startsWith("Tầng 2"));
const l2Batches = batches.filter((b) => b.note.startsWith("Tầng 2"));
nói("CLAUDE dựng tầng 1 trên mặt bằng — làm đến đâu mọc đến đó…");
for (const b of l1Batches) await applyBatch(b);
await sleep(1200);

// ── 2) Chuyển 3D: tầng 2 + MÁI mọc trong không gian, trên nền đất dốc ──
nói("Bật 3D — dựng tiếp tầng 2 và LỢP MÁI ngay trước mắt, nền đất dốc thật…");
await page.click('[data-view-btn="3d"]');
await sleep(1600);
for (const b of l2Batches) await applyBatch(b);
await applyBatch({
  note: "Lợp mái HIP 30°, ngói, đua 600 — đỉnh nóc +9.315",
  ops: villa.roofs!.map((rf) => ({ op: "add", entity: "roof", data: { ...rf } }) as Op),
});
await sleep(1400);

// refresh để camera "góc chuẩn" ôm trọn nhà HOÀN CHỈNH (home chốt lúc nhà mới vài tường)
await page.reload();
await page.waitForSelector("#paper", { timeout: 15_000 });
await page.click('[data-view-btn="3d"]');
await sleep(1500);

// ── 3) Orbit một vòng ngắm khối nhà ─────────────────────────────
nói("NGƯỜI DÙNG orbit quanh nhà…");
await page.mouse.move(640, 380);
await page.mouse.down();
for (const [dx, dy] of [[60, -8], [60, -8], [60, 6], [60, 6], [50, -6], [50, -6]] as const) {
  await page.mouse.move(640 + dx, 380 + dy, { steps: 12 });
  await sleep(260);
}
await page.mouse.up();
await sleep(900);

// ── 4) Kê nội thất ──────────────────────────────────────────────
nói("Kê nội thất từ catalog — validator canh lối đi + va chạm…");
await applyBatch({
  note: "Phòng khách + bếp: sofa, kệ TV, bàn ăn",
  ops: [
    { op: "add", entity: "furniture", data: { id: "F1", level: "L1", asset: "sofa-3s-01", at: [3850, 5900], rotation: 90 } },
    { op: "add", entity: "furniture", data: { id: "F2", level: "L1", asset: "ke-tv-1600", at: [4500, 7500], rotation: 180 } },
    { op: "add", entity: "furniture", data: { id: "F3", level: "L1", asset: "ban-an-4", at: [8700, 6600], rotation: 90 } },
  ],
});
await applyBatch({
  note: "Phòng ngủ: giường đôi + tủ áo, giường đơn",
  ops: [
    { op: "add", entity: "furniture", data: { id: "F4", level: "L2", asset: "giuong-1m8", at: [5200, 4500], rotation: 0 } },
    { op: "add", entity: "furniture", data: { id: "F5", level: "L2", asset: "tu-ao-2m", at: [4400, 6700], rotation: 180 } },
    { op: "add", entity: "furniture", data: { id: "F6", level: "L2", asset: "giuong-1m2", at: [4300, 8500], rotation: 0 } },
  ],
});
await sleep(800);

// ── 5) Đi bộ xuyên nhà (WASD, mắt +1600) ────────────────────────
nói("ĐI BỘ xuyên tầng 1 — WASD, cao mắt 1600mm…");
await page.click('button:has-text("về góc chuẩn")'); // spawn đi bộ từ góc chuẩn
await sleep(900);
await page.click("#walk3d");
await sleep(900);
// đi theo NHỊP GÕ ngắt quãng: render liên tục 60fps khi giữ phím làm screencast
// headless nghẹn không phát khung — tap + nghỉ cho máy quay bắt kịp từng bước
const bước = async (phím: string, lần: number): Promise<void> => {
  for (let i = 0; i < lần; i++) {
    await page.keyboard.down(phím);
    await sleep(200);
    await page.keyboard.up(phím);
    await sleep(300);
  }
};
// spawn nhìn về mặt tiền (cửa chính + cửa sổ) — tham quan bằng lùi + dạt ngang
await sleep(1000); // đứng ngắm cửa chính
await bước("s", 5); // lùi chậm xuyên gian khách về phía bếp
await bước("d", 4); // dạt phải — lướt qua cánh bàn ăn
await bước("s", 3);
await bước("a", 4); // dạt trái về phía sofa
await bước("w", 4); // tiến lại gần cửa
await sleep(600);
await page.keyboard.press("Escape");
await sleep(700);

// ── 6) Sun study — nắng trượt từ sáng tới chiều ─────────────────
nói("Sun study: kéo nắng từ 8h sáng tới 17h chiều — bóng đổ theo vĩ độ Đà Lạt…");
await page.click('button:has-text("về góc chuẩn")'); // lùi ra toàn cảnh xem bóng mái
await sleep(900);
await page.click("#sun3d");
await sleep(700);
for (const h of ["8", "10", "12", "14", "16", "17"]) {
  await page.$eval("#sun-hour", (el, hour) => {
    (el as HTMLInputElement).value = hour;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, h);
  await sleep(650);
}
await sleep(1400);

// ── 7) Kết: validator + xuất bộ hồ sơ ───────────────────────────
const issues = validateProject(store.current);
nói(`Validator: ${issues.length === 0 ? "SẠCH — không vấn đề nào" : `${issues.length} vấn đề`}.`);
const sheets = buildSheetSet(store.current, {});
mkdirSync(store.exportDir, { recursive: true });
for (const s of sheets.sheets) {
  writeFileSync(path.join(store.exportDir, `${s.fileBase}.svg`), sheetSvg(s));
}
nói(`Bộ hồ sơ ${sheets.sheets.length} tờ (${sheets.sheets.map((s) => s.no).join(", ")}) đã xuất.`);
await sleep(1500);

// ── đóng máy quay ───────────────────────────────────────────────
const video = page.video();
await context.close();
const raw = await video!.path();
const out = path.join(DIR, "atelier-tu-dau-den-cuoi.webm");
renameSync(raw, out);
await browser.close();
await live.stop();

console.log(`\n✔ Xong trong ${giây()} — video: ${out}`);
console.log(`📄 Bộ tờ SVG: ${store.exportDir}`);
process.exit(issues.length === 0 ? 0 : 1);
