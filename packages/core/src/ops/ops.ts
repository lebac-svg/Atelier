import type { EntityKind } from "../types.js";

/**
 * Bộ từ vựng ops (docs/05) — dùng chung cho MCP lẫn web editor.
 * KHÔNG tồn tại op "thay cả model" (ADR-07).
 */
export type Op =
  | { op: "add"; entity: EntityKind; data: Record<string, unknown> & { id?: string } }
  | { op: "update"; entity: EntityKind; id: string; data: Record<string, unknown> }
  | { op: "delete"; entity: EntityKind; id: string };

export type OpOrigin = "claude" | "user" | "system";
