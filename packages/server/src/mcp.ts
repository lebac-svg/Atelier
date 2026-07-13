import { mkdirSync } from "node:fs";
import path from "node:path";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ProjectStore } from "./store.js";
import { createAtelierServer } from "./tools.js";

/**
 * Entry MCP stdio — một process duy nhất (ADR-02).
 * ATELIER_DIR = thư mục chứa atelier.project.json (mặc định: cwd —
 * tức repo dự án nhà của người dùng). KHÔNG được ghi ra stdout.
 */
const baseDir = path.resolve(process.env.ATELIER_DIR ?? ".");
mkdirSync(baseDir, { recursive: true });

const store = new ProjectStore(baseDir);
try {
  store.openProject();
  console.error(`[atelier] đã tự mở dự án có sẵn tại ${store.filePath}`);
} catch {
  console.error(`[atelier] chưa có dự án tại ${baseDir} — chờ project_new/project_open`);
}

const server = createAtelierServer(store);
await server.connect(new StdioServerTransport());
console.error("[atelier] MCP server sẵn sàng (stdio)");
