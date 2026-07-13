import type {
  CaptureRequestMsg, ClientMessage, PatchMsg, RejectMsg, ServerMessage, SnapshotMsg, ValidationMsg,
} from "@atelier/core";
import type { ConnState } from "./state.js";

export type WsHandlers = {
  onConn(state: ConnState): void;
  onSnapshot(m: SnapshotMsg): void;
  onPatch(m: PatchMsg): void;
  onValidation(m: ValidationMsg): void;
  onCapture(m: CaptureRequestMsg): void;
  onReject(m: RejectMsg): void;
};

/** WS client browser: hello + lastRevision/session khi nối lại, backoff, resync chủ động (doc 06). */
export class WsClient {
  private sock: WebSocket | null = null;
  private lastRevision: number | null = null;
  /** Token phiên từ snapshot — server đổi dự án thì token đổi, mirror cũ không được replay nhầm. */
  private session: string | null = null;
  private retry = 0;
  private reconnectTimer: number | null = null;

  constructor(private readonly handlers: WsHandlers) {}

  connect(): void {
    this.handlers.onConn(this.retry === 0 ? "connecting" : "off");
    const proto = location.protocol === "https:" ? "wss" : "ws";
    const sock = new WebSocket(`${proto}://${location.host}/ws`);
    this.sock = sock;

    sock.onopen = () => {
      this.retry = 0;
      this.handlers.onConn("on");
      this.send({
        type: "hello",
        clientKind: "browser",
        ...(this.lastRevision != null ? { lastRevision: this.lastRevision } : {}),
        ...(this.session ? { session: this.session } : {}),
      });
    };
    sock.onmessage = (ev) => {
      let msg: ServerMessage;
      try {
        msg = JSON.parse(String(ev.data)) as ServerMessage;
      } catch {
        return;
      }
      switch (msg.type) {
        case "snapshot":
          this.lastRevision = msg.revision;
          if (msg.session) this.session = msg.session;
          return this.handlers.onSnapshot(msg);
        case "patch":
          this.lastRevision = msg.revision;
          return this.handlers.onPatch(msg);
        case "validation":
          return this.handlers.onValidation(msg);
        case "capture_request":
          return this.handlers.onCapture(msg);
        case "reject":
          return this.handlers.onReject(msg);
        default:
          return; // presence peers: chưa hiển thị ở P3
      }
    };
    sock.onclose = () => {
      if (this.sock !== sock) return; // đã bị thay bởi kết nối mới
      this.sock = null;
      this.handlers.onConn("off");
      const delay = Math.min(1000 * 2 ** this.retry, 8000);
      this.retry += 1;
      this.reconnectTimer = window.setTimeout(() => this.connect(), delay);
    };
    sock.onerror = () => sock.close();
  }

  send(m: ClientMessage): void {
    if (this.sock?.readyState === WebSocket.OPEN) this.sock.send(JSON.stringify(m));
  }

  /** Mirror lệch — quên lastRevision rồi nối lại để nhận snapshot tươi. */
  resync(): void {
    this.lastRevision = null;
    if (this.reconnectTimer != null) clearTimeout(this.reconnectTimer);
    this.sock?.close();
  }
}
