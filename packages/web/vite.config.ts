import { defineConfig } from "vite";

/**
 * Dev: `pnpm --filter @atelier/web dev` + live server chạy riêng (demo-p2 hoặc editor_open) —
 * proxy đẩy /ws /plan /healthz sang server thật. Prod: build ra dist, live server tự serve.
 */
const target = process.env.ATELIER_SERVER ?? "http://localhost:4823";

export default defineConfig({
  server: {
    proxy: {
      "/ws": { target, ws: true },
      "/plan": { target },
      "/healthz": { target },
    },
  },
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1200, // three.js một chunk — chấp nhận ở P2
  },
});
