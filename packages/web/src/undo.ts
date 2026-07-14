import type { EntityKind, Op, Project } from "@atelier/core";

/**
 * Undo per-origin (doc 06): stack cục bộ = nghịch đảo các op DO CHÍNH MÌNH tạo,
 * gửi lại như op thường (vẫn qua validate + revision). Không đụng op của Claude.
 */

const LIST_KEY: Partial<Record<EntityKind, "levels" | "walls" | "openings" | "slabs" | "roofs" | "stairs" | "rooms" | "furniture">> = {
  level: "levels",
  wall: "walls",
  opening: "openings",
  slab: "slabs",
  roof: "roofs",
  stair: "stairs",
  room: "rooms",
  furniture: "furniture",
};

function findEntity(p: Project, entity: EntityKind, id: string): Record<string, unknown> | null {
  const key = LIST_KEY[entity];
  if (key) return (((p[key] ?? []) as Array<{ id: string }>).find((e) => e.id === id) as Record<string, unknown>) ?? null;
  if (entity === "axis") return ([...p.axes.x, ...p.axes.y].find((a) => a.id === id) as Record<string, unknown>) ?? null;
  if (entity === "style") return (p.styles.openings[id] as unknown as Record<string, unknown>) ?? null;
  if (entity === "finish") return (p.finishes[id] as unknown as Record<string, unknown>) ?? null;
  return null;
}

/**
 * Op nghịch đảo của một batch, tính trên model TRƯỚC khi áp.
 * null = không đảo được (field mới thêm, entity không thấy…) — thao tác đó không vào stack.
 * Lưu ý: đúng khi batch không có 2 op chạm cùng entity (UI editor chỉ gửi batch 1 op).
 */
export function invertOps(before: Project, ops: Op[]): Op[] | null {
  const out: Op[] = [];
  for (const op of [...ops].reverse()) {
    if (op.op === "add") {
      const id = op.data.id;
      if (typeof id !== "string") return null;
      out.push({ op: "delete", entity: op.entity, id });
      continue;
    }
    const prev = findEntity(before, op.entity, op.id);
    if (!prev) return null;
    if (op.op === "update") {
      const data: Record<string, unknown> = {};
      for (const k of Object.keys(op.data)) {
        if (k === "id") continue;
        if (!(k in prev)) return null; // update thêm field mới — nghịch đảo không xóa field được
        data[k] = structuredClone(prev[k]);
      }
      out.push({ op: "update", entity: op.entity, id: op.id, data });
      continue;
    }
    // delete → add lại nguyên trạng; xóa tường thì server cascade openings — phải hồi cả chúng
    out.push({ op: "add", entity: op.entity, data: structuredClone(prev) });
    if (op.entity === "wall") {
      for (const o of before.openings) {
        if (o.wall === op.id) out.push({ op: "add", entity: "opening", data: structuredClone(o) as unknown as Record<string, unknown> });
      }
    }
  }
  return out;
}

export type UndoEntry = {
  undo: Op[];
  redo: Op[];
  label: string;
};

const CAP = 100;

export class UndoStack {
  private undos: UndoEntry[] = [];
  private redos: UndoEntry[] = [];

  /** Thao tác mới của chính mình đã được server xác nhận. */
  push(entry: UndoEntry): void {
    this.undos.push(entry);
    if (this.undos.length > CAP) this.undos.shift();
    this.redos = [];
  }

  get canUndo(): boolean {
    return this.undos.length > 0;
  }

  get canRedo(): boolean {
    return this.redos.length > 0;
  }

  peekUndo(): UndoEntry | null {
    return this.undos[this.undos.length - 1] ?? null;
  }

  peekRedo(): UndoEntry | null {
    return this.redos[this.redos.length - 1] ?? null;
  }

  /** Gọi khi server XÁC NHẬN op hoàn tác — entry chuyển sang phía redo. */
  confirmUndo(): void {
    const e = this.undos.pop();
    if (e) this.redos.push(e);
  }

  confirmRedo(): void {
    const e = this.redos.pop();
    if (e) this.undos.push(e);
  }

  clear(): void {
    this.undos = [];
    this.redos = [];
  }
}
