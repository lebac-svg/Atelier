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

describe("MCP server — tools 1–9 (DoD P1 + P2)", () => {
  it("liệt kê đúng 9 tools", async () => {
    const { client } = await connect();
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name).sort();
    expect(names).toEqual([
      "apply_ops", "capture_view", "editor_open", "get_changes_since",
      "model_query", "project_new", "project_open", "render_plan", "validate",
    ].sort());
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
