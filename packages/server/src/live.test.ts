import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import WebSocket from "ws";
import type {
  PatchMsg, RejectMsg, ServerMessage, SnapshotMsg, ValidationMsg,
} from "@atelier/core";
import { LiveServer, type LiveOptions } from "./live.js";
import { ProjectStore } from "./store.js";

const cleanups: Array<() => Promise<void> | void> = [];
afterEach(async () => {
  while (cleanups.length) await cleanups.pop()!();
});

async function boot(opts: LiveOptions = {}): Promise<{ store: ProjectStore; live: LiveServer; url: string }> {
  const store = new ProjectStore(mkdtempSync(path.join(tmpdir(), "atelier-live-")));
  store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
  const live = new LiveServer(store, { port: 0, ...opts });
  const url = await live.start();
  cleanups.push(() => live.stop());
  return { store, live, url };
}

/** WS client thử nghiệm: giữ history + chờ message theo type. */
class TestClient {
  readonly history: ServerMessage[] = [];
  private readonly queue: ServerMessage[] = [];
  private readonly waiters: Array<{ type: string; resolve: (m: ServerMessage) => void }> = [];
  readonly sock: WebSocket;

  private constructor(wsUrl: string) {
    this.sock = new WebSocket(wsUrl);
    this.sock.on("message", (d) => {
      const m = JSON.parse(d.toString()) as ServerMessage;
      this.history.push(m);
      const idx = this.waiters.findIndex((w) => w.type === m.type);
      if (idx >= 0) this.waiters.splice(idx, 1)[0]!.resolve(m);
      else this.queue.push(m);
    });
  }

  static async connect(httpUrl: string, query = ""): Promise<TestClient> {
    const c = new TestClient(httpUrl.replace(/^http/, "ws") + "/ws" + query);
    await new Promise<void>((res, rej) => {
      c.sock.once("open", () => res());
      c.sock.once("error", rej);
    });
    cleanups.push(() => c.sock.close());
    return c;
  }

  hello(lastRevision?: number, session?: string): void {
    this.send({
      type: "hello", clientKind: "browser",
      ...(lastRevision != null ? { lastRevision } : {}),
      ...(session ? { session } : {}),
    });
  }

  send(m: object): void {
    this.sock.send(JSON.stringify(m));
  }

  next<T extends ServerMessage>(type: T["type"], timeoutMs = 3000): Promise<T> {
    const idx = this.queue.findIndex((m) => m.type === type);
    if (idx >= 0) return Promise.resolve(this.queue.splice(idx, 1)[0] as T);
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Hết ${timeoutMs}ms chờ message "${type}"`)), timeoutMs);
      this.waiters.push({
        type,
        resolve: (m) => {
          clearTimeout(timer);
          resolve(m as T);
        },
      });
    });
  }

  /** Chờ tới khi có presence khớp điều kiện (broadcast presence không đánh số — phải lọc). */
  async nextPresenceWhere(pred: (m: { peers: Array<{ draggingIds?: string[] }> }) => boolean, timeoutMs = 3000): Promise<void> {
    const t0 = Date.now();
    for (;;) {
      const m = (await this.next("presence", timeoutMs - (Date.now() - t0))) as unknown as {
        peers: Array<{ draggingIds?: string[] }>;
      };
      if (pred(m)) return;
    }
  }
}

describe("LiveServer", () => {
  it("hello → snapshot + validation; /plan và /healthz sống", async () => {
    const { url } = await boot();
    const c = await TestClient.connect(url);
    c.hello();

    const snap = await c.next<SnapshotMsg>("snapshot");
    expect(snap.revision).toBe(0);
    expect(snap.model.meta.name).toBe("Nhà anh Ba");
    expect(snap.model.walls.length).toBeGreaterThan(0);
    const val = await c.next<ValidationMsg>("validation");
    expect(val.revision).toBe(0);

    const plan = await fetch(`${url}/plan/L1.svg`);
    expect(plan.status).toBe(200);
    expect(plan.headers.get("content-type")).toContain("svg");
    expect(await plan.text()).toContain("data-id=");
    expect((await fetch(`${url}/plan/L9.svg`)).status).toBe(404);

    const health = (await (await fetch(`${url}/healthz`)).json()) as { ok: boolean; browsers: number };
    expect(health.ok).toBe(true);
    expect(health.browsers).toBe(1);
  });

  it("apply → patch + validation broadcast tới mọi browser; mở lại dự án → snapshot mới", async () => {
    const { store, url } = await boot();
    const a = await TestClient.connect(url);
    const b = await TestClient.connect(url);
    a.hello();
    b.hello();
    await a.next<SnapshotMsg>("snapshot");
    await b.next<SnapshotMsg>("snapshot");
    await a.next<ValidationMsg>("validation"); // drain validation của hello
    await b.next<ValidationMsg>("validation");

    const r = store.apply(0, [
      { op: "add", entity: "wall", data: { id: "W99", level: "L1", from: [220, 3000], to: [3780, 3000], thickness: 110, kind: "gach" } },
    ], "tường thử");
    expect(r.ok).toBe(true);

    for (const c of [a, b]) {
      const patch = await c.next<PatchMsg>("patch");
      expect(patch.revision).toBe(1);
      expect(patch.origin).toBe("claude");
      expect(patch.note).toBe("tường thử");
      expect(patch.summary).toContain("W99");
      const val = await c.next<ValidationMsg>("validation");
      expect(val.revision).toBe(1);
    }

    store.openProject(); // model thay mới toàn bộ → mọi client nhận snapshot
    const snap = await a.next<SnapshotMsg>("snapshot");
    expect(snap.revision).toBe(1);
  });

  it("ops từ browser áp origin user; stale-write bị reject riêng người gửi", async () => {
    const { store, url } = await boot();
    const a = await TestClient.connect(url);
    a.hello();
    await a.next<SnapshotMsg>("snapshot");

    a.send({ type: "ops", baseRevision: 0, ops: [{ op: "update", entity: "level", id: "L2", data: { height: 3500 } }], note: "nâng tầng 2" });
    const patch = await a.next<PatchMsg>("patch");
    expect(patch.revision).toBe(1);
    expect(patch.origin).toBe("user");
    expect(store.changesSince(0).entries[0]!.origin).toBe("user");

    a.send({ type: "ops", baseRevision: 0, ops: [{ op: "update", entity: "level", id: "L2", data: { height: 3400 } }] });
    const rej = await a.next<RejectMsg>("reject");
    expect(rej.yourBase).toBe(0);
    expect(rej.currentRevision).toBe(1);
    expect(rej.errors[0]!.rule).toBe("REV-01");
  });

  it("hello lastRevision + ĐÚNG session → replay patch, KHÔNG gửi snapshot", async () => {
    const { store, url } = await boot();
    // lấy session token từ lần nối đầu
    const first = await TestClient.connect(url);
    first.hello();
    const snap0 = await first.next<SnapshotMsg>("snapshot");
    expect(snap0.session).toBeTruthy();

    store.apply(0, [{ op: "update", entity: "level", id: "L2", data: { height: 3500 } }]);
    store.apply(1, [{ op: "update", entity: "level", id: "L2", data: { height: 3400 } }], "chỉnh lại");

    const c = await TestClient.connect(url);
    c.hello(0, snap0.session);
    const p1 = await c.next<PatchMsg>("patch");
    const p2 = await c.next<PatchMsg>("patch");
    expect([p1.revision, p2.revision]).toEqual([1, 2]);
    await c.next<ValidationMsg>("validation");
    expect(c.history.some((m) => m.type === "snapshot")).toBe(false);
  });

  it("hello lastRevision nhưng LỆCH/THIẾU session → ép snapshot (tab dự án cũ không mù)", async () => {
    const { store, url } = await boot();
    store.apply(0, [{ op: "update", entity: "level", id: "L2", data: { height: 3500 } }]);

    // thiếu session (client cũ / mirror từ process trước)
    const a = await TestClient.connect(url);
    a.hello(0);
    const snapA = await a.next<SnapshotMsg>("snapshot");
    expect(snapA.revision).toBe(1);

    // lệch session (server đã đổi dự án — số revision có thể TRÙNG)
    const b = await TestClient.connect(url);
    b.hello(1, "phien-cu-khong-con");
    const snapB = await b.next<SnapshotMsg>("snapshot");
    expect(snapB.revision).toBe(1);
  });

  it("soft-lock: presence.draggingIds chặn op origin claude, op user vẫn qua, nhả theo thời gian", async () => {
    const { store, url } = await boot({ lockReleaseMs: 150 });
    const c = await TestClient.connect(url);
    c.hello();
    await c.next<SnapshotMsg>("snapshot");

    const wallId = store.current.walls[0]!.id;
    c.send({ type: "presence", draggingIds: [wallId], tool: "V" });
    // đợi ĐÚNG broadcast phản ánh draggingIds (hello cũng phát presence — không lấy nhầm)
    await c.nextPresenceWhere((m) => m.peers.some((p) => p.draggingIds?.includes(wallId)));

    // agent (MCP) đụng entity đang kéo → LOCK-01
    const rClaude = store.apply(0, [{ op: "update", entity: "wall", id: wallId, data: { thickness: 220 } }]);
    expect(rClaude.ok).toBe(false);
    if (!rClaude.ok) {
      expect(rClaude.errors[0]!.rule).toBe("LOCK-01");
      expect(rClaude.errors[0]!.message).toContain(wallId);
    }

    // op của CHÍNH người dùng vẫn qua (họ thả tay commit trong lúc khóa còn nguội)
    c.send({ type: "ops", baseRevision: 0, ops: [{ op: "update", entity: "wall", id: wallId, data: { thickness: 220 } }], note: "user sửa" });
    const patch = await c.next<PatchMsg>("patch");
    expect(patch.origin).toBe("user");

    // thả tay → khóa nguội 150ms rồi tự nhả
    c.send({ type: "presence", draggingIds: [] });
    await c.nextPresenceWhere((m) => m.peers.every((p) => !p.draggingIds?.length));
    await new Promise((r) => setTimeout(r, 250));
    const rSau = store.apply(1, [{ op: "update", entity: "wall", id: wallId, data: { thickness: 110 } }]);
    expect(rSau.ok).toBe(true);
  });

  it("link chia sẻ chỉ-xem: token persist, viewer bị VIEW-01, không soft-lock được, rotate đá viewer", async () => {
    const { store, live, url } = await boot();
    // token qua HTTP + persist qua restart LiveServer (đọc lại .atelier/share.json)
    const share = (await (await fetch(`${url}/share`)).json()) as { url: string; token: string };
    expect(share.url).toContain(`/xem/${share.token}`);
    const live2 = new LiveServer(store, { port: 0 });
    expect(live2.shareToken()).toBe(share.token);

    // trang /xem: đúng token → 200; sai token → 404
    expect((await fetch(`${url}/xem/${share.token}`)).status).toBe(200);
    expect((await fetch(`${url}/xem/sai-token`)).status).toBe(404);

    // WS sai token bị đóng ngay
    const bad = new WebSocket(url.replace(/^http/, "ws") + "/ws?token=sai");
    const closeCode = await new Promise<number>((res) => bad.on("close", (code) => res(code)));
    expect(closeCode).toBe(4001);

    // viewer: nhận snapshot như thường, nhưng ops bị VIEW-01 và draggingIds không khóa được ai
    const viewer = await TestClient.connect(url, `?token=${share.token}`);
    viewer.hello();
    const snap = await viewer.next<SnapshotMsg>("snapshot");
    expect(snap.model.meta.name).toBe("Nhà anh Ba");

    viewer.send({ type: "ops", baseRevision: 0, ops: [{ op: "update", entity: "level", id: "L2", data: { height: 3500 } }] });
    const rej = await viewer.next<RejectMsg>("reject");
    expect(rej.errors[0]!.rule).toBe("VIEW-01");
    expect(store.current.meta.revision).toBe(0);

    const wallId = store.current.walls[0]!.id;
    viewer.send({ type: "presence", draggingIds: [wallId] });
    await viewer.next("presence");
    const rClaude = store.apply(0, [{ op: "update", entity: "wall", id: wallId, data: { thickness: 220 } }]);
    expect(rClaude.ok).toBe(true); // viewer không tạo được soft-lock

    // capture không bao giờ chọn tab viewer
    await expect(live.capture("3d")).rejects.toThrow(/Chưa có browser/);

    // thu hồi: token mới, viewer cũ bị ngắt, link cũ thành 404
    const viewerClosed = new Promise<number>((res) => viewer.sock.on("close", (code) => res(code)));
    const rotated = (await (await fetch(`${url}/share/rotate`, { method: "POST" })).json()) as { token: string };
    expect(rotated.token).not.toBe(share.token);
    expect(await viewerClosed).toBe(4001);
    expect((await fetch(`${url}/xem/${share.token}`)).status).toBe(404);
  });

  it("capture: browser trả PNG; timeout khi browser im; lỗi khi không có browser", async () => {
    const { live, url } = await boot({ captureTimeoutMs: 300 });
    await expect(live.capture("3d")).rejects.toThrow(/Chưa có browser/);

    const c = await TestClient.connect(url);
    c.hello();
    await c.next<SnapshotMsg>("snapshot");

    c.sock.on("message", (d) => {
      const m = JSON.parse(d.toString()) as { type: string; requestId?: string; target?: string };
      if (m.type === "capture_request" && m.target === "3d") {
        c.send({ type: "capture_result", requestId: m.requestId, png: "iVBORfake==" });
      }
    });
    await expect(live.capture("3d")).resolves.toBe("iVBORfake==");

    // target "plan" không được client này trả → timeout
    await expect(live.capture("plan")).rejects.toThrow(/không trả ảnh/);
  });
});
