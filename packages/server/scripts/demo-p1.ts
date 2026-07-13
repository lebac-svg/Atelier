/**
 * Demo DoD P1 (doc 10): phỏng vấn → brief → dựng model → ảnh mặt bằng.
 * Chạy đúng qua tầng MCP tools (client ↔ server) — thứ Claude Code sẽ gọi.
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { closePngRenderer } from "../src/render/png.js";
import { ProjectStore } from "../src/store.js";
import { createAtelierServer } from "../src/tools.js";

const dir = path.resolve(process.argv[2] ?? "sandbox/demo-p1");
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
  return r.content as ToolContent;
};
const show = (title: string, content: ToolContent): void => {
  console.log(`\n━━ ${title}`);
  for (const c of content) {
    if (c.type === "text") console.log(c.text);
    if (c.type === "image") console.log(`(ảnh PNG ${Math.round((c.data!.length * 3) / 4 / 1024)}KB đính kèm)`);
  }
};

// ── PHA A: kết quả phỏng vấn (rút gọn — hội thoại thật diễn ra trong chat)
console.log(`━━ PHA A — Brief chốt sau phỏng vấn:
• Đất 4×16m, hẻm 5m phía Đông Nam, ba mặt giáp nhà. • Vợ chồng + 2 con nhỏ + bà nội.
• 3PN (bà nội ngủ trệt), 2 WC, khu thờ, 2 xe máy, giếng trời, sân phơi trên mái.
• ~1.8 tỷ, hoàn thiện trung bình khá, hiện đại tối giản, trắng - gỗ sáng.
• Có xem thước Lỗ Ban. Ưu tiên: thông thoáng > bà nội tầng trệt > dễ dọn.`);

const brief = {
  dat: {
    ranh_gioi: [[0, 0], [4000, 0], [4000, 16000], [0, 16000]],
    huong_truoc: "Đông Nam",
    tiep_giap: { truoc: "hẻm 5m", sau: "nhà", trai: "nhà", phai: "nhà" },
    quy_hoach: { khoang_lui_truoc: 0, tang_max: 4 },
  },
  gia_dinh: "vợ chồng + 2 con nhỏ + bà nội",
  nhu_cau: { phong_ngu: 3, wc: 2, phong_tho: true, xe_may: 2, o_to: false, gieng_troi: true, san_phoi: true, bep: "liền phòng ăn" },
  ngan_sach: { muc: "~1.8 tỷ", hoan_thien: "trung bình khá" },
  gu: { phong_cach: "hiện đại tối giản", mau: "trắng - gỗ sáng" },
  uu_tien: ["thông thoáng", "bà nội ngủ tầng trệt", "dễ dọn"],
  phong_thuy: { lo_ban: true },
};

// ── PHA B: template gần nhất + biến đổi theo brief
show("project_new (template nhà ống + brief)", await call("project_new", {
  name: "Nhà anh Ba",
  template: "nha-ong-4x16-2t",
  brief,
}));

show("apply_ops #1 — cửa sổ thông gió WC1 (CHỦ Ý đặt sai để xem validator chặn)", await call("apply_ops", {
  baseRevision: 0,
  ops: [{ op: "add", entity: "opening", data: { id: "S9", wall: "W7", kind: "window", style: "SW", offset: 2000, width: 800, height: 600, sill: 1500 } }],
  note: "thông gió WC1 nhìn ra ô thang",
}));

show("apply_ops #2 — đọc lỗi, tự sửa offset rồi gửi lại", await call("apply_ops", {
  baseRevision: 0,
  ops: [
    { op: "add", entity: "opening", data: { id: "S9", wall: "W7", kind: "window", style: "SW", offset: 1600, width: 800, height: 600, sill: 1500 } },
    { op: "update", entity: "room", id: "R5", data: { name: "Phòng bà nội" } },
  ],
  note: "thông gió WC1 + cá nhân hóa tên phòng theo brief",
}));

show("validate — tự soi trước khi mời xem", await call("validate", {}));
show("get_changes_since(0) — nhật ký để bắt kịp", await call("get_changes_since", { revision: 0 }));

for (const level of ["L1", "L2"]) {
  const content = await call("render_plan", { level });
  show(`render_plan ${level}`, content);
  const img = content.find((c) => c.type === "image");
  if (img?.data) writeFileSync(path.join(dir, `demo-${level}.png`), Buffer.from(img.data, "base64"));
}

console.log(`\n━━ Demo xong. Ảnh: ${dir}\\demo-L1.png / demo-L2.png`);
await closePngRenderer();
await client.close();
process.exit(0);
