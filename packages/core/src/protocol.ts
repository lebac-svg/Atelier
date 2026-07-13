import type { Issue } from "./issues.js";
import type { Op, OpOrigin } from "./ops/ops.js";
import type { Project } from "./types.js";

/**
 * Giao thức WebSocket agent/browser ↔ server — theo docs/06-giao-thuc-sync.md.
 * Chỉ types (core thuần, không I/O). JSON một message một dòng.
 */

export type ClientKind = "browser" | "agent";

export type CaptureTarget = "3d" | "plan";

/** Camera gợi ý khi chụp 3D — mm, hệ trục model (z lên). Bỏ trống = giữ góc nhìn hiện tại của người dùng. */
export type CaptureCamera = {
  position?: [number, number, number];
  lookAt?: [number, number, number];
};

// ── Client → Server ──────────────────────────────────────────────

export type HelloMsg = {
  type: "hello";
  clientKind: ClientKind;
  /** Revision cuối client còn giữ — server replay ops nếu gap nhỏ, ngược lại gửi snapshot. */
  lastRevision?: number;
  /**
   * Token phiên nhận từ snapshot gần nhất. Server đổi dự án → token đổi;
   * lệch token thì lastRevision vô nghĩa (có thể trùng SỐ nhưng khác dự án) — server ép snapshot.
   */
  session?: string;
};

export type OpsMsg = {
  type: "ops";
  baseRevision: number;
  ops: Op[];
  note?: string;
};

export type PresenceMsg = {
  type: "presence";
  selection?: string[];
  draggingIds?: string[];
  tool?: string;
};

export type CaptureResultMsg = {
  type: "capture_result";
  requestId: string;
  /** PNG base64 (không prefix data:). Thiếu khi lỗi. */
  png?: string;
  error?: string;
};

export type ClientMessage = HelloMsg | OpsMsg | PresenceMsg | CaptureResultMsg;

// ── Server → Client ──────────────────────────────────────────────

export type SnapshotMsg = {
  type: "snapshot";
  model: Project;
  revision: number;
  /** Token phiên — client gửi lại trong hello khi reconnect để server biết mirror còn cùng dự án. */
  session?: string;
};

export type PatchMsg = {
  type: "patch";
  revision: number;
  ops: Op[];
  origin: OpOrigin;
  note?: string;
  /** Tóm tắt chữ của batch — nuôi toast "Claude: …" (doc 09). */
  summary?: string;
};

export type RejectMsg = {
  type: "reject";
  yourBase: number;
  currentRevision: number;
  errors: Issue[];
};

export type ValidationMsg = {
  type: "validation";
  revision: number;
  issues: Issue[];
};

export type CaptureRequestMsg = {
  type: "capture_request";
  requestId: string;
  target: CaptureTarget;
  camera?: CaptureCamera;
};

export type PeersMsg = {
  type: "presence";
  peers: Array<{ clientKind: ClientKind; selection?: string[]; draggingIds?: string[] }>;
};

export type ServerMessage =
  | SnapshotMsg
  | PatchMsg
  | RejectMsg
  | ValidationMsg
  | CaptureRequestMsg
  | PeersMsg;

/** Parse một dòng JSON thành ClientMessage — null nếu không phải shape hợp lệ. */
export function parseClientMessage(raw: unknown): ClientMessage | null {
  let v: unknown = raw;
  if (typeof raw === "string") {
    try {
      v = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (typeof v !== "object" || v === null || typeof (v as { type?: unknown }).type !== "string") return null;
  const m = v as Record<string, unknown>;
  switch (m.type) {
    case "hello":
      return m.clientKind === "browser" || m.clientKind === "agent" ? (m as HelloMsg) : null;
    case "ops":
      return typeof m.baseRevision === "number" && Array.isArray(m.ops) ? (m as OpsMsg) : null;
    case "presence":
      return m as PresenceMsg;
    case "capture_result":
      return typeof m.requestId === "string" ? (m as CaptureResultMsg) : null;
    default:
      return null;
  }
}
