import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createAtelierServer, LiveServer, ProjectStore } from "@atelier/server";

/**
 * Entry bản ĐÓNG GÓI (npm: atelier-mcp) — cùng ruột với packages/server/src/mcp.ts
 * nhưng font + web editor lấy TRONG package (build.mjs copy vào assets/ + web/)
 * thay vì lần theo cây source. Người dùng đứng trong thư mục dự án nhà của họ:
 *
 *   claude mcp add atelier -- npx -y atelier-mcp
 *
 * ATELIER_DIR (mặc định: cwd) = một căn nhà. KHÔNG được ghi ra stdout — stdio là kênh MCP.
 */

// `atelier-mcp setup` — một lệnh đăng ký cho MỌI client trên máy rồi thoát
if (process.argv[2] === "setup") {
  const { runSetup } = await import("./setup.js");
  const results = runSetup(path.resolve(process.env.ATELIER_DIR ?? "."));
  process.exit(results.some((r) => r.status === "error") ? 1 : 0);
}

const pkgRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.env.ATELIER_FONT_DIR ??= path.join(pkgRoot, "assets", "fonts");

const baseDir = path.resolve(process.env.ATELIER_DIR ?? ".");
mkdirSync(baseDir, { recursive: true });

const store = new ProjectStore(baseDir);
try {
  store.openProject();
  console.error(`[atelier] đã tự mở dự án có sẵn tại ${store.filePath}`);
} catch {
  console.error(`[atelier] chưa có dự án tại ${baseDir} — chờ project_new/project_open`);
}

const live = new LiveServer(store, { webDist: process.env.ATELIER_WEB_DIST ?? path.join(pkgRoot, "web") });
const server = createAtelierServer(store, live);
await server.connect(new StdioServerTransport());
console.error("[atelier] MCP server sẵn sàng (stdio)");
