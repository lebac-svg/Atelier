import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import type { Server as HttpServer } from "node:http";
import type { AddressInfo } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createAdaptorServer } from "@hono/node-server";
import { Hono } from "hono";
import { WebSocketServer, type WebSocket as WsSocket } from "ws";
import {
  parseClientMessage, validateProject,
  type CaptureCamera, type CaptureTarget, type ClientKind, type ServerMessage, type ValidationMsg,
} from "@atelier/core";
import { renderPlanSvg } from "./render/render.js";
import type { ProjectStore, StoreEvent } from "./store.js";

/** dist của web editor — build bằng `pnpm --filter @atelier/web build`. */
export const DEFAULT_WEB_DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "web", "dist");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".map": "application/json",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".glb": "model/gltf-binary",
};

const NO_DIST_PAGE = `<!doctype html><meta charset="utf-8"><title>Atelier</title>
<body style="font-family:system-ui;display:grid;place-items:center;min-height:100vh;margin:0;background:#111;color:#eee">
<div style="max-width:34rem;line-height:1.6"><h1 style="font-weight:600">📐 Atelier — editor chưa được build</h1>
<p>Chạy lệnh sau rồi tải lại trang:</p>
<pre style="background:#000;padding:.8rem 1rem;border-radius:8px">pnpm --filter @atelier/web build</pre></div>`;

export type LiveOptions = {
  /** Cổng ưa thích (mặc định env ATELIER_PORT hoặc 4823); bận thì tự thử +1…+9. 0 = hệ điều hành tự cấp. */
  port?: number;
  host?: string;
  webDist?: string;
  /** Timeout chờ browser trả ảnh capture (ms). */
  captureTimeoutMs?: number;
};

type Peer = {
  sock: WsSocket;
  kind: ClientKind;
  alive: boolean;
  selection?: string[];
  draggingIds?: string[];
};

type PendingCapture = {
  resolve: (pngBase64: string) => void;
  reject: (e: Error) => void;
  timer: NodeJS.Timeout;
};

/**
 * HTTP + WebSocket cùng process với MCP (doc 03: một process, một nguồn state).
 * - GET /               → web editor tĩnh (packages/web/dist)
 * - GET /plan/:level.svg → mặt bằng SVG render tươi từ model hiện tại
 * - WS  /ws             → giao thức doc 06: hello→snapshot|replay, patch/validation broadcast, capture
 */
export class LiveServer {
  private http: HttpServer | null = null;
  private wss: WebSocketServer | null = null;
  private readonly peers = new Set<Peer>();
  private readonly pending = new Map<string, PendingCapture>();
  private heartbeat: NodeJS.Timeout | null = null;
  private unsubscribe: (() => void) | null = null;
  url: string | null = null;

  constructor(
    private readonly store: ProjectStore,
    private readonly opts: LiveOptions = {},
  ) {}

  get running(): boolean {
    return this.http != null;
  }

  get port(): number | null {
    const addr = this.http?.address();
    return addr && typeof addr === "object" ? (addr as AddressInfo).port : null;
  }

  get browserCount(): number {
    return [...this.peers].filter((p) => p.kind === "browser" && p.sock.readyState === p.sock.OPEN).length;
  }

  /** Khởi động (idempotent) — trả URL editor. */
  async start(): Promise<string> {
    if (this.url) return this.url;
    const host = this.opts.host ?? "127.0.0.1";
    const prefer = this.opts.port ?? Number(process.env.ATELIER_PORT ?? 4823);
    let lastErr: unknown = null;
    for (let i = 0; i < 10; i++) {
      try {
        this.http = await this.listen(host, prefer === 0 ? 0 : prefer + i);
        break;
      } catch (e) {
        lastErr = e;
        this.http = null;
        if (prefer === 0) break;
      }
    }
    if (!this.http) {
      throw new Error(`Không mở được cổng ${prefer}…${prefer + 9}: ${lastErr instanceof Error ? lastErr.message : String(lastErr)}`);
    }
    this.url = `http://localhost:${this.port}`;

    this.wss = new WebSocketServer({ server: this.http, path: "/ws" });
    this.wss.on("connection", (sock) => this.onConnection(sock));

    this.heartbeat = setInterval(() => this.pingPeers(), 15_000);
    this.heartbeat.unref?.();
    this.unsubscribe = this.store.subscribe((e) => this.onStoreEvent(e));
    return this.url;
  }

  async stop(): Promise<void> {
    this.unsubscribe?.();
    this.unsubscribe = null;
    if (this.heartbeat) clearInterval(this.heartbeat);
    this.heartbeat = null;
    for (const [, p] of this.pending) {
      clearTimeout(p.timer);
      p.reject(new Error("Live server đang tắt."));
    }
    this.pending.clear();
    for (const peer of this.peers) peer.sock.terminate();
    this.peers.clear();
    await new Promise<void>((res) => (this.wss ? this.wss.close(() => res()) : res()));
    this.wss = null;
    await new Promise<void>((res, rej) => (this.http ? this.http.close((e) => (e ? rej(e) : res())) : res()));
    this.http = null;
    this.url = null;
  }

  /** Nhờ browser mới nhất chụp canvas — trả PNG base64. */
  capture(target: CaptureTarget, camera?: CaptureCamera): Promise<string> {
    const peer = [...this.peers].filter((p) => p.kind === "browser" && p.sock.readyState === p.sock.OPEN).at(-1);
    if (!peer) {
      return Promise.reject(new Error("Chưa có browser nào đang mở editor — gọi editor_open trước."));
    }
    const requestId = randomUUID();
    const timeoutMs = this.opts.captureTimeoutMs ?? 10_000;
    return new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(requestId);
        reject(new Error(`Browser không trả ảnh trong ${Math.round(timeoutMs / 1000)}s — thử tải lại trang editor.`));
      }, timeoutMs);
      this.pending.set(requestId, { resolve, reject, timer });
      this.send(peer, { type: "capture_request", requestId, target, ...(camera ? { camera } : {}) });
    });
  }

  // ── HTTP ───────────────────────────────────────────────────────

  private listen(host: string, port: number): Promise<HttpServer> {
    const app = this.buildApp();
    return new Promise((resolve, reject) => {
      const srv = createAdaptorServer({ fetch: app.fetch }) as HttpServer;
      srv.once("error", reject);
      srv.listen(port, host, () => {
        srv.off("error", reject);
        resolve(srv);
      });
    });
  }

  private buildApp(): Hono {
    const app = new Hono();

    app.get("/healthz", (c) =>
      c.json({
        ok: true,
        project: this.store.isOpen ? this.store.current.meta.name : null,
        revision: this.store.isOpen ? this.store.current.meta.revision : null,
        browsers: this.browserCount,
      }));

    app.get("/plan/:file", (c) => {
      if (!this.store.isOpen) return c.text("Chưa mở dự án — project_open trước.", 409);
      const level = c.req.param("file").replace(/\.svg$/i, "");
      const p = this.store.current;
      if (!p.levels.some((l) => l.id === level)) return c.text(`Không có tầng "${level}".`, 404);
      const { svg } = renderPlanSvg(p, level);
      return c.body(svg, 200, { "content-type": "image/svg+xml", "cache-control": "no-store" });
    });

    app.get("/*", (c) => {
      const dist = this.opts.webDist ?? DEFAULT_WEB_DIST;
      if (!existsSync(path.join(dist, "index.html"))) return c.html(NO_DIST_PAGE);
      let rel = decodeURIComponent(new URL(c.req.url).pathname);
      if (rel === "/") rel = "/index.html";
      let file = path.normalize(path.join(dist, rel));
      if (!file.startsWith(path.normalize(dist))) return c.text("Ngoài phạm vi.", 403);
      if (!existsSync(file) || !statSync(file).isFile()) {
        if (path.extname(rel) !== "") return c.text("Không có file này.", 404);
        file = path.join(dist, "index.html"); // đường dẫn không đuôi → SPA
      }
      const mime = MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream";
      return c.body(readFileSync(file), 200, { "content-type": mime });
    });

    return app;
  }

  // ── WebSocket ──────────────────────────────────────────────────

  private onConnection(sock: WsSocket): void {
    const peer: Peer = { sock, kind: "browser", alive: true };
    this.peers.add(peer);
    sock.on("pong", () => {
      peer.alive = true;
    });
    sock.on("message", (data) => {
      const msg = parseClientMessage(data.toString());
      if (msg) this.onMessage(peer, msg);
    });
    sock.on("close", () => {
      this.peers.delete(peer);
      this.broadcastPeers();
    });
    sock.on("error", () => sock.terminate());
  }

  private onMessage(peer: Peer, msg: NonNullable<ReturnType<typeof parseClientMessage>>): void {
    switch (msg.type) {
      case "hello": {
        peer.kind = msg.clientKind;
        if (this.store.isOpen) this.syncPeer(peer, msg.lastRevision);
        this.broadcastPeers();
        return;
      }
      case "ops": {
        if (!this.store.isOpen) {
          this.send(peer, {
            type: "reject", yourBase: msg.baseRevision, currentRevision: -1,
            errors: [{ rule: "REV-00", severity: "block", entities: [], message: "Chưa mở dự án nào." }],
          });
          return;
        }
        const r = this.store.apply(msg.baseRevision, msg.ops, msg.note, "user");
        if (!r.ok) {
          this.send(peer, { type: "reject", yourBase: msg.baseRevision, currentRevision: r.currentRevision, errors: r.errors });
        }
        // thành công → store event tự broadcast patch + validation cho MỌI client (kể cả người gửi)
        return;
      }
      case "presence": {
        if (msg.selection) peer.selection = msg.selection;
        if (msg.draggingIds) peer.draggingIds = msg.draggingIds;
        this.broadcastPeers();
        return;
      }
      case "capture_result": {
        const pend = this.pending.get(msg.requestId);
        if (!pend) return;
        this.pending.delete(msg.requestId);
        clearTimeout(pend.timer);
        if (msg.png) pend.resolve(msg.png);
        else pend.reject(new Error(msg.error ?? "Browser trả lỗi capture không rõ."));
        return;
      }
    }
  }

  /** Đồng bộ một client mới nối: replay ops nếu gap liền mạch, ngược lại snapshot (doc 06). */
  private syncPeer(peer: Peer, lastRevision?: number): void {
    const p = this.store.current;
    const rev = p.meta.revision;
    if (lastRevision != null && lastRevision <= rev) {
      if (lastRevision === rev) {
        this.send(peer, this.validationMsg());
        return;
      }
      const { entries } = this.store.changesSince(lastRevision);
      const contiguous =
        entries.length > 0 &&
        entries.every((e, i) => e.revision === lastRevision + 1 + i) &&
        entries[entries.length - 1]!.revision === rev;
      if (contiguous) {
        for (const e of entries) {
          this.send(peer, {
            type: "patch", revision: e.revision, ops: e.ops, origin: e.origin,
            ...(e.note ? { note: e.note } : {}), summary: e.summary,
          });
        }
        this.send(peer, this.validationMsg());
        return;
      }
    }
    this.send(peer, { type: "snapshot", model: p, revision: rev });
    this.send(peer, this.validationMsg());
  }

  private onStoreEvent(e: StoreEvent): void {
    if (e.kind === "applied") {
      this.broadcast({
        type: "patch", revision: e.revision, ops: e.ops, origin: e.origin,
        ...(e.note ? { note: e.note } : {}), summary: e.summary,
      });
      this.broadcast({ type: "validation", revision: e.revision, issues: e.issues });
      return;
    }
    if (this.store.isOpen) {
      const p = this.store.current;
      this.broadcast({ type: "snapshot", model: p, revision: p.meta.revision });
      this.broadcast(this.validationMsg());
    }
  }

  private validationMsg(): ValidationMsg {
    const p = this.store.current;
    return { type: "validation", revision: p.meta.revision, issues: validateProject(p) };
  }

  private broadcastPeers(): void {
    this.broadcast({
      type: "presence",
      peers: [...this.peers].map((p) => ({
        clientKind: p.kind,
        ...(p.selection ? { selection: p.selection } : {}),
        ...(p.draggingIds ? { draggingIds: p.draggingIds } : {}),
      })),
    });
  }

  private send(peer: Peer, msg: ServerMessage): void {
    if (peer.sock.readyState === peer.sock.OPEN) peer.sock.send(JSON.stringify(msg));
  }

  private broadcast(msg: ServerMessage): void {
    const raw = JSON.stringify(msg);
    for (const peer of this.peers) {
      if (peer.sock.readyState === peer.sock.OPEN) peer.sock.send(raw);
    }
  }

  private pingPeers(): void {
    for (const peer of this.peers) {
      if (!peer.alive) {
        peer.sock.terminate();
        this.peers.delete(peer);
        continue;
      }
      peer.alive = false;
      try {
        peer.sock.ping();
      } catch {
        peer.sock.terminate();
        this.peers.delete(peer);
      }
    }
  }
}

/** Mở URL bằng trình duyệt mặc định của hệ điều hành. */
export function openInBrowser(url: string): void {
  const [cmd, args] =
    process.platform === "win32"
      ? ["cmd", ["/c", "start", "", url]]
      : process.platform === "darwin"
        ? ["open", [url]]
        : ["xdg-open", [url]];
  spawn(cmd, args as string[], { detached: true, stdio: "ignore" }).unref();
}
