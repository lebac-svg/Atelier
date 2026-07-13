import type {
  CaptureRequestMsg, ClientMessage, PatchMsg, ServerMessage, SnapshotMsg, ValidationMsg,
} from "@atelier/core";
import type { ConnState } from "./state.js";

export type WsHandlers = {
  onConn(state: ConnState): void;
  onSnapshot(m: SnapshotMsg): void;
  onPatch(m: PatchMsg): void;
  onValidation(m: ValidationMsg): void;
  onCapture(m: CaptureRequestMsg): void;
};

/** WS client browser: hello + lastRevision khi nối lại, backoff, resync chủ động (doc 06). */
export class WsClient {
  private sock: WebSocket | null = null;
  private lastRevision: number | null = null;
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
          return this.handlers.onSnapshot(msg);
        case "patch":
          this.lastRevision = msg.revision;
          return this.handlers.onPatch(msg);
        case "validation":
          return this.handlers.onValidation(msg);
        case "capture_request":
          return this.handlers.onCapture(msg);
        default:
          return; // reject/presence: browser P2 không gửi ops nên chưa cần xử lý
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
