import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

/**
 * Smoke test bản ĐÓNG GÓI trước khi publish — chạy đúng bin trong một bản cài
 * thật (npm pack + npm i tgz) như người dùng cuối:
 *
 *   npm pack --pack-destination /tmp/t && cd /tmp/t && npm init -y && npm i ./atelier-mcp-*.tgz
 *   npx tsx smoke.mts /tmp/t/node_modules/atelier-mcp
 */

const pkgRoot = process.argv[2];
if (!pkgRoot) {
  console.error("Cách dùng: npx tsx smoke.mts <đường dẫn node_modules/atelier-mcp của bản cài thử>");
  process.exit(1);
}
const BIN = path.join(pkgRoot, "bin", "atelier-mcp.mjs");
const HOUSE = mkdtempSync(path.join(tmpdir(), "atelier-smoke-"));

const ok = (cond: boolean, label: string): void => {
  console.log(cond ? `✔ ${label}` : `✘ ${label}`);
  if (!cond) process.exitCode = 1;
};
const textOf = (r: { content?: unknown }): string =>
  ((r.content ?? []) as Array<{ type: string; text?: string }>).filter((c) => c.type === "text").map((c) => c.text).join("\n");

const transport = new StdioClientTransport({
  command: process.execPath,
  args: [BIN],
  env: { ...(process.env as Record<string, string>), ATELIER_DIR: HOUSE, ATELIER_PORT: "4991" },
  stderr: "pipe",
});
const client = new Client({ name: "smoke", version: "0.0.0" });
await client.connect(transport);

const { tools } = await client.listTools();
ok(tools.length === 18, `listTools: ${tools.length} tools`);

const created = await client.callTool({ name: "project_new", arguments: { name: "Nhà thử gói", template: "nha-ong-4x16-2t" } });
ok(textOf(created).includes("✅"), "project_new từ template");

const plan = await client.callTool({ name: "render_plan", arguments: { level: "L1" } });
const hasImage = ((plan.content ?? []) as Array<{ type: string }>).some((c) => c.type === "image");
ok(hasImage, `render_plan trả PNG${hasImage ? "" : ` — ${textOf(plan).slice(0, 120)}`}`);

const est1 = await client.callTool({ name: "estimate_cost", arguments: {} });
ok(textOf(est1).includes("➤ TỔNG:"), "estimate_cost bảng đóng gói");

// bảng đơn giá địa phương trong THƯ MỤC DỰ ÁN đè bảng gói
mkdirSync(path.join(HOUSE, "rules"), { recursive: true });
writeFileSync(path.join(HOUSE, "rules", "don-gia.json"), JSON.stringify({ version: "dia-phuong-test-2026" }), "utf8");
const est2 = await client.callTool({ name: "estimate_cost", arguments: {} });
ok(textOf(est2).includes("dia-phuong-test-2026"), "don-gia.json dự án đè bảng gói");

const editor = await client.callTool({ name: "editor_open", arguments: { openBrowser: false } });
const url = textOf(editor).match(/http:\/\/localhost:\d+/)?.[0];
ok(!!url, `editor_open URL: ${url}`);
if (url) {
  const html = await (await fetch(url)).text();
  ok(html.includes("<script") && !html.includes("chưa được build"), "web editor đóng gói được serve");
  const svg = await (await fetch(`${url}/plan/L1.svg`)).text();
  ok(svg.includes("Be Vietnam Pro") && svg.includes("data:font/ttf"), "font Việt nhúng từ assets trong gói");
}

await client.close();
console.log(`— smoke xong (nhà thử: ${HOUSE}) —`);
