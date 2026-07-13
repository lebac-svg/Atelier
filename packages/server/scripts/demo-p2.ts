/**
 * Demo P2 — "làm đến đâu dựng đến đó".
 * Dựng lại căn nhà ống 4×16m TỪNG NHỊP MỘT qua apply_ops; browser mở sẵn
 * thấy 2D + 3D mọc theo realtime, cuối cùng capture 2 ảnh từ chính browser.
 *
 * Chạy từ repo root:  pnpm demo:p2
 * (sandbox/demo-p2 bị xóa dựng lại mỗi lần chạy — thư mục demo dùng xong vứt)
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadNhaOng4x16, validateProject, type Op } from "@atelier/core";
import { LiveServer, openInBrowser } from "../src/live.js";
import { ProjectStore } from "../src/store.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const DIR = path.join(ROOT, "sandbox", "demo-p2");
/** ATELIER_DEMO_NO_BROWSER=1 — chạy kiểm thử im lặng: không mở browser, không nghỉ nhịp. */
const HEADLESS = process.env.ATELIER_DEMO_NO_BROWSER === "1";
const NHIP_MS = HEADLESS ? 0 : 1000;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

// ── Kịch bản: phát lại fixture theo nhịp thi công ─────────────
const f = loadNhaOng4x16();
const batches: Array<{ note: string; ops: Op[] }> = [];

batches.push({
  note: "Khung tầng — cao độ và chiều cao",
  ops: f.levels.map((l) =>
    l.id === "L1"
      ? ({ op: "update", entity: "level", id: "L1", data: { name: l.name, elevation: l.elevation, height: l.height } } as Op)
      : ({ op: "add", entity: "level", data: { ...l } } as Op)),
});

const setupOps: Op[] = [
  ...Object.entries(f.styles.openings).map(([id, s]) => ({ op: "add", entity: "style", data: { id, ...s } }) as Op),
  ...Object.entries(f.finishes).map(([id, s]) => ({ op: "add", entity: "finish", data: { id, ...s } }) as Op),
  ...f.axes.x.map((a) => ({ op: "add", entity: "axis", data: { ...a, dir: "x" } }) as Op),
  ...f.axes.y.map((a) => ({ op: "add", entity: "axis", data: { ...a, dir: "y" } }) as Op),
];
if (setupOps.length) batches.push({ note: "Bộ style cửa + hệ trục", ops: setupOps });

for (const level of [...f.levels].sort((a, b) => a.elevation - b.elevation)) {
  const walls = f.walls.filter((w) => w.level === level.id);
  for (const [i, group] of chunk(walls, 4).entries()) {
    batches.push({
      note: `${level.name} — dựng tường (nhịp ${i + 1})`,
      ops: group.map((w) => ({ op: "add", entity: "wall", data: { ...w } }) as Op),
    });
  }
  const wallIds = new Set(walls.map((w) => w.id));
  const opens = f.openings.filter((o) => wallIds.has(o.wall));
  for (const [i, group] of chunk(opens, 5).entries()) {
    batches.push({
      note: `${level.name} — mở cửa đi + cửa sổ (nhịp ${i + 1})`,
      ops: group.map((o) => ({ op: "add", entity: "opening", data: { ...o } }) as Op),
    });
  }
  const slabs = f.slabs.filter((s) => s.level === level.id);
  if (slabs.length) {
    batches.push({ note: `${level.name} — đổ sàn`, ops: slabs.map((s) => ({ op: "add", entity: "slab", data: { ...s } }) as Op) });
  }
  const stairs = f.stairs.filter((s) => s.level === level.id);
  if (stairs.length) {
    batches.push({ note: `${level.name} — lắp cầu thang`, ops: stairs.map((s) => ({ op: "add", entity: "stair", data: { ...s } }) as Op) });
  }
  const rooms = f.rooms.filter((r) => r.level === level.id);
  if (rooms.length) {
    batches.push({ note: `${level.name} — khai phòng`, ops: rooms.map((r) => ({ op: "add", entity: "room", data: { ...r } }) as Op) });
  }
  const furn = f.furniture.filter((x) => x.level === level.id);
  for (const [i, group] of chunk(furn, 6).entries()) {
    batches.push({
      note: `${level.name} — kê nội thất (nhịp ${i + 1})`,
      ops: group.map((x) => ({ op: "add", entity: "furniture", data: { ...x } }) as Op),
    });
  }
}

// ── Chạy ──────────────────────────────────────────────────────
console.log("🏗  Atelier — demo P2: làm đến đâu dựng đến đó\n");
rmSync(DIR, { recursive: true, force: true });
mkdirSync(DIR, { recursive: true });

const store = new ProjectStore(DIR);
const live = new LiveServer(store);
const url = await live.start();
console.log(`Editor: ${url}${HEADLESS ? "" : " — đang mở trình duyệt…"}\n`);
if (!HEADLESS) openInBrowser(url);

store.newProject("Nhà anh Ba", undefined, f.site.boundary, f.brief);

if (!HEADLESS) {
  for (let i = 0; i < 30 && live.browserCount === 0; i++) await sleep(500);
  console.log(
    live.browserCount > 0
      ? "Browser đã nối — bắt đầu dựng, nhìn màn hình nhé.\n"
      : "Chưa thấy browser nối — vẫn dựng tiếp, mở URL trên để xem.\n",
  );
}

let rev = 0;
for (const b of batches) {
  const r = store.apply(rev, b.ops, b.note);
  if (!r.ok) {
    console.error(`⛔ r${rev} "${b.note}" bị hủy:`);
    for (const e of r.errors) console.error(`   [${e.rule}] ${e.message}`);
    process.exit(1);
  }
  rev = r.revision;
  console.log(`  r${String(rev).padStart(2, " ")} ▸ ${b.note}${r.warnings.length ? `   ⚠ ${r.warnings.length}` : ""}`);
  await sleep(NHIP_MS);
}

const issues = validateProject(store.current);
console.log(`\n✔ Dựng xong — revision ${rev}. Validator: ${issues.length === 0 ? "sạch." : `${issues.length} vấn đề.`}`);

if (live.browserCount > 0) {
  mkdirSync(store.exportDir, { recursive: true });
  for (const target of ["3d", "plan"] as const) {
    try {
      const png = await live.capture(target);
      const fp = path.join(store.exportDir, `demo-p2-${target}.png`);
      writeFileSync(fp, Buffer.from(png, "base64"));
      console.log(`📷 ${target} → ${fp}`);
    } catch (e) {
      console.log(`📷 ${target}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
}

if (HEADLESS) {
  await live.stop();
  process.exit(0);
}
console.log("\nServer vẫn chạy để bạn xoay/vọc tiếp trong browser — Ctrl+C để dừng.");
await new Promise(() => {});
