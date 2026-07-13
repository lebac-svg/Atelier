/**
 * Demo P3 — vòng lặp cộng tác người ↔ Claude (DoD doc 10):
 * người dùng KÉO tường W13 trên L2, GÕ `4200 ⏎` — phòng ngủ chính sâu đúng 4200
 * tim-tim; trong lúc kéo Claude bị soft-lock chặn; thả tay xong Claude
 * get_changes_since thấy thay đổi và TỰ ĐIỀU CHỈNH hai phòng bên cạnh.
 *
 * "Người dùng" ở đây là chromium do Playwright điều khiển — chạy headed để
 * xem tận mắt, hoặc ATELIER_DEMO_NO_BROWSER=1 để chạy kiểm thử im lặng.
 *
 * Chạy từ repo root:  pnpm demo:p3
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Page } from "playwright";
import { validateProject, type Point } from "@atelier/core";
import { LiveServer } from "../src/live.js";
import { ProjectStore } from "../src/store.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const DIR = path.join(ROOT, "sandbox", "demo-p3");
const HEADLESS = process.env.ATELIER_DEMO_NO_BROWSER === "1";
const NHIP_MS = HEADLESS ? 0 : 900;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
const nói = async (dòng: string): Promise<void> => {
  console.log(dòng);
  await sleep(NHIP_MS);
};

/** Điểm client chạm được trên entity + điểm đích sau khi dịch model (dx,dy) — như e2e. */
async function pointOn(page: Page, id: string, dModel: [number, number]): Promise<{ from: { x: number; y: number }; to: { x: number; y: number } }> {
  return page.evaluate(
    ({ id, dModel }) => {
      const svg = document.querySelector("#paper svg") as SVGSVGElement;
      const el = svg.querySelector(`[data-id="${id}"]`) as SVGGraphicsElement;
      if (!el) throw new Error(`không thấy ${id}`);
      const bb = el.getBBox();
      const ctm = svg.getScreenCTM()!;
      let cPaper: DOMPoint | null = null;
      for (const t of [0.5, 0.35, 0.65, 0.25, 0.75, 0.15, 0.85]) {
        const cand = bb.width >= bb.height
          ? new DOMPoint(bb.x + bb.width * t, bb.y + bb.height / 2)
          : new DOMPoint(bb.x + bb.width / 2, bb.y + bb.height * t);
        const client = cand.matrixTransform(ctm);
        const hit = document.elementFromPoint(client.x, client.y)?.closest("[data-id]")?.getAttribute("data-id");
        if (hit === id) {
          cPaper = cand;
          break;
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

console.log("🤝 Atelier — demo P3: người dùng chỉnh tay, Claude thích nghi\n");
rmSync(DIR, { recursive: true, force: true });
mkdirSync(DIR, { recursive: true });

const store = new ProjectStore(DIR);
const live = new LiveServer(store, { lockReleaseMs: HEADLESS ? 400 : 5000 });
store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
const url = await live.start();

const browser = await chromium.launch({ headless: HEADLESS, args: HEADLESS ? [] : ["--window-size=1440,940"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url);
await page.waitForSelector("#paper svg", { timeout: 15_000 });
await nói(`Editor: ${url} — browser (Playwright đóng vai NGƯỜI DÙNG) đã nối.`);

// lên tầng 2 — tường W13 ngăn "Ngủ chính" với "Sảnh thờ + hành lang"
await page.click('#level-tabs .level-btn:text-is("L2")');
await page.waitForFunction(() => !!document.querySelector('#paper svg [data-id="W13"]'), undefined, { timeout: 10_000 });
const w13 = store.current.walls.find((w) => w.id === "W13")!;
const yCũ = w13.from[1];
await nói(`\n— Tầng 2. Tường W13 (tim y=${yCũ}) đang ngăn Ngủ chính ↔ Sảnh thờ; phòng ngủ sâu ${yCũ - 110} tim-tim so với mặt tiền W9.`);

// ── Người dùng kéo W13, giữ chuột ──────────────────────────────
await nói("— NGƯỜI DÙNG: nắm W13 kéo thử vào trong…");
const pts = await pointOn(page, "W13", [0, 300]);
await page.mouse.move(pts.from.x, pts.from.y);
await page.mouse.down();
await page.mouse.move(pts.to.x, pts.to.y, { steps: 8 });
await sleep(HEADLESS ? 200 : 600);
const hud = await page.$eval("#hud", (el) => el.textContent ?? "");
await nói(`  HUD cạnh con trỏ: "${hud.trim()}"`);

// Claude nhảy vào đúng lúc này → soft-lock chặn (doc 06 tầng 1)
const revĐangKéo = store.current.meta.revision;
const bịChặn = store.apply(revĐangKéo, [{ op: "update", entity: "wall", id: "W13", data: { thickness: 220 } }], "Claude thử sửa W13");
if (bịChặn.ok) {
  console.error("⛔ Lỗi demo: soft-lock không chặn Claude!");
  process.exit(1);
}
await nói(`— CLAUDE (đòi sửa W13 ngay lúc đó): bị từ chối [${bịChặn.errors[0]!.rule}]`);
await nói(`  "${bịChặn.errors[0]!.message}"`);

// Người dùng gõ số — chốt chính xác 4200 tim-tim tới W9
await nói('— NGƯỜI DÙNG: gõ "4200 ⏎" — khỏi căn chuột.');
await page.keyboard.type("4200");
await page.keyboard.press("Enter");
await page.mouse.up();
await page.waitForFunction((r) => document.getElementById("rev-seal")?.textContent === `r ${r}`, revĐangKéo + 1, { timeout: 10_000 });

const w13Mới = store.current.walls.find((w) => w.id === "W13")!;
const yMới = w13Mới.from[1];
if (Math.abs(yMới - 110) !== 4200) {
  console.error(`⛔ Lỗi demo: W13 tim y=${yMới}, lẽ ra cách W9 đúng 4200.`);
  process.exit(1);
}
await nói(`  ✔ W13 chốt tại tim y=${yMới} — cách W9 ĐÚNG 4200mm. Một op duy nhất, origin "user".`);

// ── Claude bắt kịp: get_changes_since rồi thích nghi ──────────
await nói("\n— CLAUDE (lượt sau): get_changes_since thấy gì?");
const thayĐổi = store.changesSince(revĐangKéo);
for (const e of thayĐổi.entries) await nói(`  r${e.revision} [${e.origin}] ${e.summary}${e.note ? ` — "${e.note}"` : ""}`);

// phòng bên cạnh: R8 Ngủ chính (mép dưới tường), R9 Sảnh thờ (mép trên) — polygon còn theo tường cũ
const nửaDày = w13Mới.thickness / 2;
const dịchĐỉnh = (poly: Point[], yGần: number, yThành: number): Point[] =>
  poly.map(([x, y]) => (Math.abs(y - yGần) <= 1 ? [x, yThành] : [x, y]) as Point);
const r8 = store.current.rooms.find((r) => r.id === "R8")!;
const r9 = store.current.rooms.find((r) => r.id === "R9")!;
const rKếtQuả = store.apply(
  thayĐổi.currentRevision,
  [
    { op: "update", entity: "room", id: "R8", data: { polygon: dịchĐỉnh(r8.polygon, yCũ - nửaDày, yMới - nửaDày) } },
    { op: "update", entity: "room", id: "R9", data: { polygon: dịchĐỉnh(r9.polygon, yCũ + nửaDày, yMới + nửaDày) } },
  ],
  "Bạn thu phòng ngủ chính còn 4200 — tôi cập nhật ranh Ngủ chính + Sảnh thờ theo tường mới",
);
if (!rKetQuaOk(rKếtQuả)) process.exit(1);
await nói(`— CLAUDE: tôn trọng quyết định của bạn, điều chỉnh 2 phòng bên cạnh (r${rKếtQuả.ok ? rKếtQuả.revision : "?"}).`);
await nói('  Toast trên editor: "Claude: Bạn thu phòng ngủ chính còn 4200 — tôi cập nhật ranh…"');

function rKetQuaOk(r: ReturnType<ProjectStore["apply"]>): boolean {
  if (!r.ok) {
    console.error("⛔ Claude điều chỉnh phòng thất bại:");
    for (const e of r.errors) console.error(`   [${e.rule}] ${e.message}`);
    return false;
  }
  return true;
}

// tự soi (nguyên tắc 5): tường dời có thể đè lên nội thất kê sát tường cũ
const đèNộiThất = validateProject(store.current).filter(
  (i) => i.rule === "GEO-04" && i.entities.includes("W13"),
);
if (đèNộiThất.length > 0) {
  await nói(`— CLAUDE (tự soi validator): ${đèNộiThất.map((i) => i.message).join(" · ")}`);
  const ops = đèNộiThất.flatMap((i) => {
    const fId = i.entities.find((e) => e !== "W13");
    const f = store.current.furniture.find((x) => x.id === fId);
    if (!f) return [];
    const đè = Number(/\((\d+)mm\)/.exec(i.message)?.[1] ?? 0);
    const hướng = f.at[1] < yMới ? -1 : 1; // đẩy sâu vào phòng, thêm 30mm khe hở
    return [{ op: "update" as const, entity: "furniture" as const, id: f.id, data: { at: [f.at[0], f.at[1] + hướng * (đè + 30)] } }];
  });
  const rNudge = store.apply(store.current.meta.revision, ops, "Đẩy nội thất sát tường mới cho hết đè");
  if (!rKetQuaOk(rNudge)) process.exit(1);
  await nói(`— CLAUDE: đẩy ${ops.map((o) => o.id).join(", ")} theo tường mới (r${rNudge.ok ? rNudge.revision : "?"}).`);
}

const issues = validateProject(store.current);
await nói(`\n✔ Vòng lặp khép kín — revision ${store.current.meta.revision}. Validator: ${issues.length === 0 ? "sạch." : `${issues.length} vấn đề (soi panel Kiểm tra).`}`);
if (issues.length > 0) {
  for (const i of issues) console.log(`   [${i.rule}/${i.severity}] ${i.message}`);
  process.exitCode = 1;
}

// lưu lại một ảnh mặt bằng đúng khung người dùng đang thấy
try {
  const png = await live.capture("plan");
  mkdirSync(store.exportDir, { recursive: true });
  const fp = path.join(store.exportDir, "demo-p3-plan-l2.png");
  writeFileSync(fp, Buffer.from(png, "base64"));
  console.log(`📷 plan → ${fp}`);
} catch (e) {
  console.log(`📷 plan: ${e instanceof Error ? e.message : String(e)}`);
}

if (HEADLESS) {
  await browser.close();
  await live.stop();
  if (process.exitCode) {
    console.error("\n⛔ Demo P3 không đạt — xem vấn đề validator ở trên.");
    process.exit(1);
  }
  console.log("\nDemo P3 đạt — mọi bước đúng kịch bản DoD.");
  process.exit(0);
}
console.log("\nBrowser vẫn mở để bạn tự kéo/gõ số/Ctrl+Z tiếp — Ctrl+C để dừng.");
await new Promise(() => {});
