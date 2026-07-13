import {
  applyOps,
  type Issue, type Op, type PatchMsg, type Project, type SnapshotMsg, type ValidationMsg,
} from "@atelier/core";

export type ConnState = "connecting" | "on" | "off";
export type ViewMode = "plan" | "3d" | "split";

export type FoundEntity = { kind: string; data: Record<string, unknown> };

type EventMap = {
  snapshot: { model: Project };
  patch: { revision: number; ops: Op[]; origin: string; note?: string; summary?: string; changedIds: string[] };
  validation: { revision: number; issues: Issue[] };
  level: { level: string };
  view: { view: ViewMode };
  select: { id: string | null };
  /** Mirror lệch nhịp với server (gap/patch sai thứ tự) — cần snapshot mới. */
  resync: Record<string, never>;
};

type Handler<K extends keyof EventMap> = (e: EventMap[K]) => void;

/**
 * Mirror model phía browser: snapshot + patch từ server, áp lại bằng CHÍNH applyOps
 * của core (không validate — server đã validate trước khi broadcast).
 */
export class AppState {
  model: Project | null = null;
  issues: Issue[] = [];
  activeLevel: string | null = null;
  view: ViewMode = "split";
  selection: string | null = null;

  private handlers = new Map<keyof EventMap, Set<Handler<never>>>();

  on<K extends keyof EventMap>(ev: K, fn: Handler<K>): void {
    if (!this.handlers.has(ev)) this.handlers.set(ev, new Set());
    this.handlers.get(ev)!.add(fn as Handler<never>);
  }

  private emit<K extends keyof EventMap>(ev: K, payload: EventMap[K]): void {
    for (const fn of this.handlers.get(ev) ?? []) (fn as Handler<K>)(payload);
  }

  get revision(): number {
    return this.model?.meta.revision ?? -1;
  }

  setSnapshot(msg: SnapshotMsg): void {
    this.model = msg.model;
    const levels = [...msg.model.levels].sort((a, b) => a.elevation - b.elevation);
    if (!this.activeLevel || !levels.some((l) => l.id === this.activeLevel)) {
      this.activeLevel = levels[0]?.id ?? null;
    }
    this.emit("snapshot", { model: msg.model });
  }

  applyPatch(msg: PatchMsg): void {
    if (!this.model) {
      this.emit("resync", {});
      return;
    }
    const r = applyOps(this.model, msg.revision - 1, msg.ops); // không validate ở mirror
    if (!r.ok) {
      this.emit("resync", {});
      return;
    }
    this.model = r.project;
    this.emit("patch", {
      revision: msg.revision,
      ops: msg.ops,
      origin: msg.origin,
      ...(msg.note ? { note: msg.note } : {}),
      ...(msg.summary ? { summary: msg.summary } : {}),
      changedIds: collectIds(msg.ops),
    });
  }

  setValidation(msg: ValidationMsg): void {
    this.issues = msg.issues;
    this.emit("validation", { revision: msg.revision, issues: msg.issues });
  }

  setLevel(level: string): void {
    if (level === this.activeLevel) return;
    this.activeLevel = level;
    this.emit("level", { level });
  }

  setView(view: ViewMode): void {
    if (view === this.view) return;
    this.view = view;
    this.emit("view", { view });
  }

  select(id: string | null): void {
    this.selection = id;
    this.emit("select", { id });
  }

  /** Tìm entity theo id trong mọi mảng của model — nuôi panel thuộc tính. */
  findEntity(id: string): FoundEntity | null {
    const p = this.model;
    if (!p) return null;
    const lists: Array<[string, Array<{ id: string }>]> = [
      ["Tường", p.walls], ["Cửa", p.openings], ["Sàn", p.slabs], ["Thang", p.stairs],
      ["Phòng", p.rooms], ["Nội thất", p.furniture], ["Tầng", p.levels],
    ];
    for (const [kind, list] of lists) {
      const e = list.find((x) => x.id === id);
      if (e) return { kind, data: e as unknown as Record<string, unknown> };
    }
    return null;
  }
}

function collectIds(ops: Op[]): string[] {
  const ids = new Set<string>();
  for (const op of ops) {
    if (op.op === "add") {
      if (typeof op.data.id === "string") ids.add(op.data.id);
    } else {
      ids.add(op.id);
    }
  }
  return [...ids];
}
