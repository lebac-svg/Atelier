import { cpSync, existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

/**
 * Đóng gói atelier-mcp: bundle server (core + hono + ws + zod + MCP SDK…) thành
 * MỘT file dist/main.mjs, rồi copy web editor đã build + font vào package.
 * playwright để external (dependency thường) — nặng và có binary riêng.
 * Chạy: pnpm build:cli (root — tự build web trước).
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const webDist = path.join(here, "..", "web", "dist");
const fonts = path.join(here, "..", "server", "assets", "fonts");

if (!existsSync(webDist)) {
  console.error("Thiếu packages/web/dist — chạy `pnpm build:web` trước (hoặc dùng `pnpm build:cli` từ root).");
  process.exit(1);
}

for (const d of ["dist", "web", "assets"]) rmSync(path.join(here, d), { recursive: true, force: true });

await build({
  entryPoints: [path.join(here, "src", "main.ts")],
  outfile: path.join(here, "dist", "main.mjs"),
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  external: ["playwright"],
  // vài dep CJS gọi require() động — cấp shim cho output ESM
  banner: { js: "import { createRequire as __cr } from 'node:module'; const require = __cr(import.meta.url);" },
  logLevel: "info",
});

cpSync(webDist, path.join(here, "web"), { recursive: true });
cpSync(fonts, path.join(here, "assets", "fonts"), { recursive: true });
console.log("✔ atelier-mcp: dist/main.mjs + web/ + assets/fonts/");
