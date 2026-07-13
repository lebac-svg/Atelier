/**
 * Demo DoD P4 (doc 10): "bộ PDF một căn nhà hoàn chỉnh".
 * Chạy đúng qua tầng MCP tools — Claude tự soi mặt đứng/mặt cắt bằng render_view
 * (nguyên tắc 5) rồi export trọn hồ sơ PDF + DXF.
 *
 * Chạy từ repo root:  pnpm demo:p4
 */
import { mkdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { closePngRenderer } from "../src/render/png.js";
import { closePdfRenderer } from "../src/render/pdf.js";
import { ProjectStore } from "../src/store.js";
import { createAtelierServer } from "../src/tools.js";

const dir = path.resolve(process.argv[2] ?? "sandbox/demo-p4");
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });

const store = new ProjectStore(dir);
const server = createAtelierServer(store);
const [ct, st] = InMemoryTransport.createLinkedPair();
const client = new Client({ name: "demo", version: "0" });
await Promise.all([server.connect(st), client.connect(ct)]);

type ToolContent = Array<{ type: string; text?: string; data?: string; mimeType?: string }>;
const call = async (name: string, args: Record<string, unknown>): Promise<ToolContent> => {
  const r = await client.callTool({ name, arguments: args });
  if (r.isError) throw new Error(`${name} lỗi: ${(r.content as ToolContent).map((c) => c.text).join(" ")}`);
  return r.content as ToolContent;
};
const show = (title: string, content: ToolContent): void => {
  console.log(`\n━━ ${title}`);
  for (const c of content) {
    if (c.type === "text") console.log(c.text);
    if (c.type === "image") console.log(`(ảnh PNG ${Math.round((c.data!.length * 3) / 4 / 1024)}KB đính kèm — Claude nhìn được ngay trong chat)`);
  }
};

console.log("📁 Atelier — demo P4: hồ sơ bản vẽ hoàn chỉnh (pha E)\n");

// nhà mẫu (các pha A–D đã diễn ra ở demo P1–P3)
show("Mở nhà mẫu", await call("project_new", { name: "Nhà ống 4×16m — 2 tầng 3PN", template: "nha-ong-4x16-2t" }));

// nguyên tắc 5 — tự soi từng loại tờ trước khi đóng bộ
show("validate", await call("validate", {}));
show("render_view elevation (tự soi mặt đứng)", await call("render_view", { kind: "elevation" }));
show("render_view section (tự soi mặt cắt A-A)", await call("render_view", { kind: "section" }));

// bộ hồ sơ
show("export pdf (bàn giao)", await call("export", { format: "pdf" }));
show("export dxf (mở CAD đo được)", await call("export", { format: "dxf" }));
show("export svg", await call("export", { format: "svg" }));

const pdf = path.join(store.exportDir, "ho-so", `${store.current.meta.id}-ho-so.pdf`);
console.log(`\n✔ DoD P4: bộ PDF hoàn chỉnh ${Math.round(statSync(pdf).size / 1024)}KB → ${pdf}`);

await closePngRenderer();
await closePdfRenderer();
process.exit(0);
