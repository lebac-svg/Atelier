import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { LiveServer } from "./live.js";
import { ProjectStore } from "./store.js";
import { createAtelierServer } from "./tools.js";

const lives: LiveServer[] = [];
afterEach(async () => {
  while (lives.length) await lives.pop()!.stop().catch(() => {});
});

async function connect() {
  const store = new ProjectStore(mkdtempSync(path.join(tmpdir(), "atelier-mcp-")));
  const live = new LiveServer(store, { port: 0 }); // port 0: hệ điều hành tự cấp, không đụng cổng thật
  lives.push(live);
  const server = createAtelierServer(store, live);
  const [clientT, serverT] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "test", version: "0.0.0" });
  await Promise.all([server.connect(serverT), client.connect(clientT)]);
  return { client, store, live };
}

const textOf = (r: Awaited<ReturnType<Client["callTool"]>>): string =>
  (r.content as Array<{ type: string; text?: string }>)
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("\n");

describe("MCP server — tools DoD P1 + P2 + P4", () => {
  it("liệt kê đúng 16 tools", async () => {
    const { client } = await connect();
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name).sort();
    expect(names).toEqual([
      "apply_ops", "assets_search", "capture_view", "editor_open", "estimate_cost", "export",
      "get_changes_since", "model_query", "project_new", "project_open", "render_plan",
      "render_view", "validate", "variant_compare", "variant_open", "variant_save",
    ].sort());
  });

  it("phương án A/B: save → sửa → compare thấy khác biệt → open quay lại", async () => {
    const { client, store } = await connect();
    await client.callTool({ name: "project_new", arguments: { name: "Nhà anh Ba", template: "nha-ong-4x16-2t" } });

    const saved = await client.callTool({ name: "variant_save", arguments: { name: "Phương án A — gốc" } });
    expect(textOf(saved)).toContain("phuong-an-a-goc");

    // sửa model: bỏ 2 món nội thất → phương án B (hiện tại)
    await client.callTool({
      name: "apply_ops",
      arguments: { baseRevision: 0, ops: [{ op: "delete", entity: "furniture", id: "F1" }, { op: "delete", entity: "furniture", id: "F2" }] },
    });

    const cmp = await client.callTool({ name: "variant_compare", arguments: {} });
    expect(cmp.isError).not.toBe(true);
    const msg = textOf(cmp);
    expect(msg).toContain("A = Phương án A — gốc");
    expect(msg).toContain("Nội thất: 19 → 17 món");
    expect(msg).toContain("dự toán");

    const opened = await client.callTool({ name: "variant_open", arguments: { slug: "phuong-an-a-goc" } });
    expect(textOf(opened)).toContain("✅");
    expect(store.current.furniture).toHaveLength(19); // quay về đủ đồ
    expect(store.current.meta.revision).toBe(2); // revision vẫn đơn điệu tăng

    const bad = await client.callTool({ name: "variant_open", arguments: { slug: "khong-co" } });
    expect(bad.isError).toBe(true);
  });

  it("estimate_cost: tổng tiền + so ngân sách brief + override mức hoàn thiện", async () => {
    const { client } = await connect();
    await client.callTool({ name: "project_new", arguments: { name: "Nhà anh Ba", template: "nha-ong-4x16-2t" } });
    const r = await client.callTool({ name: "estimate_cost", arguments: {} });
    const msg = textOf(r);
    expect(msg).toContain("TỔNG QUY ĐỔI");
    expect(msg).toContain("➤ TỔNG:");
    expect(msg).toContain("CÒN DƯ"); // brief fixture ~1.8 tỷ > dự toán TB khá
    expect(msg).toContain("don-gia.json");

    const sang = await client.callTool({ name: "estimate_cost", arguments: { muc: "cao-cap" } });
    expect(textOf(sang)).toContain("cao cấp");
  });

  it("assets_search: lọc theo maxFootprint, catalog ≥100, không cần mở dự án", async () => {
    const { client } = await connect();
    const r = await client.callTool({ name: "assets_search", arguments: { query: "giường", maxFootprint: { w: 1200 } } });
    const msg = textOf(r);
    expect(msg).toContain("giuong-1m2");
    expect(msg).not.toContain("giuong-1m8");
    const bad = await client.callTool({ name: "assets_search", arguments: { category: "khong-co" } });
    expect(bad.isError).toBe(true);
  });

  it("export dxf: xuất tờ hình học, bỏ tờ thống kê; ifc chưa hỗ trợ", async () => {
    const { client, store } = await connect();
    await client.callTool({ name: "project_new", arguments: { name: "Nhà anh Ba", template: "nha-ong-4x16-2t" } });

    const dxf = await client.callTool({ name: "export", arguments: { format: "dxf" } });
    const msg = textOf(dxf);
    expect(msg).toContain("4 tờ DXF");
    expect(msg).toContain("KT-01 MẶT BẰNG TẦNG 1");
    expect(msg).toContain("KT-04 MẶT CẮT A-A");
    expect(msg).not.toContain("THỐNG KÊ →"); // tờ bảng không có DXF
    const { existsSync } = await import("node:fs");
    const path = await import("node:path");
    expect(existsSync(path.join(store.exportDir, "ho-so", "kt-01-mat-bang-l1.dxf"))).toBe(true);

    const ifc = await client.callTool({ name: "export", arguments: { format: "ifc" } });
    expect(ifc.isError).toBe(true);
    expect(textOf(ifc)).toContain("chưa hỗ trợ");
  });

  it("export svg lọc theo sheets giữ đúng số KT trong bộ", async () => {
    const { client } = await connect();
    await client.callTool({ name: "project_new", arguments: { name: "Nhà anh Ba", template: "nha-ong-4x16-2t" } });
    const r = await client.callTool({ name: "export", arguments: { format: "svg", sheets: ["elevation"] } });
    const msg = textOf(r);
    expect(msg).toContain("1 tờ SVG");
    expect(msg).toContain("KT-03 MẶT ĐỨNG CHÍNH");
  });

  it("editor_open trả URL live server; capture_view 3d không browser → chỉ đường", async () => {
    const { client, live } = await connect();
    await client.callTool({
      name: "project_new",
      arguments: { name: "Nhà anh Ba", template: "nha-ong-4x16-2t" },
    });

    const opened = await client.callTool({
      name: "editor_open",
      arguments: { openBrowser: false },
    });
    expect(textOf(opened)).toContain("✅ Editor: http://localhost:");
    expect(live.running).toBe(true);
    expect(textOf(opened)).toContain(`http://localhost:${live.port}`);
    // kèm link chia sẻ chỉ-xem cho Claude đưa thẳng cho gia chủ
    expect(textOf(opened)).toContain(`/xem/${live.shareToken()}`);

    const cap = await client.callTool({ name: "capture_view", arguments: { target: "3d" } });
    expect(cap.isError).toBe(true);
    expect(textOf(cap)).toContain("editor_open");
  });

  it("nhịp làm việc: new → query → apply → changes → validate", async () => {
    const { client } = await connect();

    const created = await client.callTool({
      name: "project_new",
      arguments: { name: "Nhà anh Ba", template: "nha-ong-4x16-2t" },
    });
    expect(textOf(created)).toContain("✅");

    const q = await client.callTool({
      name: "model_query",
      arguments: { select: { entity: "rooms", level: "L1" }, computed: true },
    });
    expect(textOf(q)).toContain("Phòng khách");
    expect(textOf(q)).toContain("dien_tich_m2");

    // apply hợp lệ
    const okApply = await client.callTool({
      name: "apply_ops",
      arguments: {
        baseRevision: 0,
        ops: [{ op: "update", entity: "room", id: "R1", data: { name: "Khách + xe" } }],
        note: "đổi tên phòng khách",
      },
    });
    expect(textOf(okApply)).toContain("revision 1");

    // stale baseRevision → từ chối, chỉ đường get_changes_since
    const stale = await client.callTool({
      name: "apply_ops",
      arguments: { baseRevision: 0, ops: [{ op: "delete", entity: "furniture", id: "F1" }] },
    });
    expect(textOf(stale)).toContain("⛔");
    expect(textOf(stale)).toContain("REV-01");

    const changes = await client.callTool({ name: "get_changes_since", arguments: { revision: 0 } });
    expect(textOf(changes)).toContain("đổi tên phòng khách");

    const v = await client.callTool({ name: "validate", arguments: {} });
    expect(textOf(v)).toContain("0 vấn đề");
  });

  it("chưa mở dự án → lỗi tiếng Việt chỉ đường, isError", async () => {
    const { client } = await connect();
    const r = await client.callTool({ name: "validate", arguments: {} });
    expect(r.isError).toBe(true);
    expect(textOf(r)).toContain("project_new");
  });
});
