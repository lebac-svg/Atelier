import type { EntityKind, Issue, Level } from "@atelier/core";
import type { ConnState, FoundEntity, ViewMode } from "./state.js";

const SEVERITY_ORDER: Record<string, number> = { block: 0, error: 1, warn: 2, info: 3 };
const MM_KEYS = new Set([
  "thickness", "width", "height", "offset", "sill", "elevation", "tread", "landing", "rotation",
]);

/** Field sửa được trong panel thuộc tính (doc 09: "mọi kích thước là ô nhập"). */
type FieldSpec = { key: string; kind: "num" | "point" | "text" };
const EDITABLE: Partial<Record<EntityKind, FieldSpec[]>> = {
  wall: [
    { key: "from", kind: "point" }, { key: "to", kind: "point" },
    { key: "thickness", kind: "num" }, { key: "height", kind: "num" },
  ],
  opening: [
    { key: "offset", kind: "num" }, { key: "width", kind: "num" },
    { key: "height", kind: "num" }, { key: "sill", kind: "num" },
  ],
  furniture: [
    { key: "at", kind: "point" }, { key: "rotation", kind: "num" }, { key: "elevation", kind: "num" },
  ],
  room: [{ key: "name", kind: "text" }],
  level: [{ key: "name", kind: "text" }, { key: "height", kind: "num" }],
};

export type UICallbacks = {
  onLevel(id: string): void;
  onView(v: ViewMode): void;
  onIssueClick(entities: string[]): void;
  onFit2d(): void;
  onReset3d(): void;
  /** Sửa số trong panel thuộc tính — value đã parse xong (number | [x,y] | string). */
  onPropEdit(entity: EntityKind, id: string, field: string, value: unknown): void;
  onUndo(): void;
  onRedo(): void;
};

const $ = <T extends HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Thiếu #${id} trong index.html`);
  return el as T;
};

export class UI {
  private readonly projectName = $("project-name");
  private readonly levelTabs = $("level-tabs");
  private readonly revSeal = $("rev-seal");
  private readonly connDot = $("conn-dot");
  private readonly connText = $("conn-text");
  private readonly claudeCell = $("claude-note");
  private readonly issuesBody = $("issues-body");
  private readonly issuesCount = $("issues-count");
  private readonly propsBody = $("props-body");
  private readonly toasts = $("toasts");
  private readonly empty2d = $("empty2d");
  private readonly snapInput = $<HTMLInputElement>("snap-input");
  private readonly btnUndo = $<HTMLButtonElement>("btn-undo");
  private readonly btnRedo = $<HTMLButtonElement>("btn-redo");
  private claudeTimer: number | null = null;

  constructor(private readonly cb: UICallbacks) {
    for (const btn of document.querySelectorAll<HTMLButtonElement>("[data-view-btn]")) {
      btn.addEventListener("click", () => {
        for (const b of document.querySelectorAll("[data-view-btn]")) b.classList.remove("is-active");
        btn.classList.add("is-active");
        const v = btn.dataset.viewBtn as ViewMode;
        document.body.dataset.view = v;
        cb.onView(v);
      });
    }
    $("fit2d").addEventListener("click", () => cb.onFit2d());
    $("reset3d").addEventListener("click", () => cb.onReset3d());
    this.btnUndo.addEventListener("click", () => cb.onUndo());
    this.btnRedo.addEventListener("click", () => cb.onRedo());
  }

  /** Bước lưới snap hiện tại từ ô nhập ở khung tên (mm; 0 = tắt). */
  snapGrid(): number {
    const v = Number(this.snapInput.value);
    return Number.isFinite(v) && v >= 0 ? Math.round(v) : 50;
  }

  setUndoState(canUndo: boolean, canRedo: boolean): void {
    this.btnUndo.disabled = !canUndo;
    this.btnRedo.disabled = !canRedo;
  }

  /** Panel thuộc tính có đang được gõ dở không — tránh vẽ đè khi patch về. */
  get propsBusy(): boolean {
    return this.propsBody.contains(document.activeElement);
  }

  setProject(name: string): void {
    this.projectName.textContent = name;
    document.title = `${name} — Atelier`;
    this.empty2d.hidden = true;
  }

  setConn(state: ConnState): void {
    this.connDot.className = `dot ${state === "on" ? "on" : state === "off" ? "off" : ""}`;
    this.connText.textContent =
      state === "on" ? "trực tiếp" : state === "connecting" ? "đang nối…" : "mất kết nối — tự nối lại…";
  }

  setRevision(rev: number, pulse: boolean): void {
    this.revSeal.textContent = `r ${rev}`;
    if (pulse) {
      this.revSeal.classList.remove("pulse");
      void this.revSeal.getBoundingClientRect();
      this.revSeal.classList.add("pulse");
    }
  }

  setLevels(levels: Level[], active: string | null): void {
    this.levelTabs.textContent = "";
    for (const l of [...levels].sort((a, b) => a.elevation - b.elevation)) {
      const btn = document.createElement("button");
      btn.className = `level-btn${l.id === active ? " is-active" : ""}`;
      btn.textContent = l.id;
      btn.title = l.name;
      btn.addEventListener("click", () => this.cb.onLevel(l.id));
      this.levelTabs.appendChild(btn);
    }
  }

  setActiveLevel(id: string): void {
    for (const btn of this.levelTabs.querySelectorAll(".level-btn")) {
      btn.classList.toggle("is-active", btn.textContent === id);
    }
  }

  setIssues(issues: Issue[]): void {
    this.issuesCount.hidden = issues.length === 0;
    this.issuesCount.textContent = String(issues.length);
    this.issuesBody.textContent = "";
    if (issues.length === 0) {
      const p = document.createElement("p");
      p.className = "issue-ok";
      p.textContent = "Bản vẽ sạch — không có vấn đề nào.";
      this.issuesBody.appendChild(p);
      return;
    }
    const sorted = [...issues].sort(
      (a, b) => (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9),
    );
    for (const issue of sorted) {
      const btn = document.createElement("button");
      btn.className = `issue issue--${issue.severity}`;
      const rule = document.createElement("span");
      rule.className = "issue-rule";
      rule.textContent = issue.rule;
      btn.appendChild(rule);
      btn.appendChild(document.createTextNode(issue.message));
      if (issue.entities.length) btn.addEventListener("click", () => this.cb.onIssueClick(issue.entities));
      this.issuesBody.appendChild(btn);
    }
  }

  toast(kind: "claude" | "user" | "reject", body: string, rev?: number): void {
    while (this.toasts.children.length >= 4) this.toasts.firstElementChild?.remove();
    const el = document.createElement("div");
    el.className = `toast${kind === "user" ? " toast--user" : kind === "reject" ? " toast--reject" : ""}`;
    const head = document.createElement("div");
    head.className = "toast-head";
    const who = document.createElement("span");
    who.className = "toast-who";
    who.textContent = kind === "claude" ? "Claude" : kind === "user" ? "Bạn" : "Bị từ chối";
    head.appendChild(who);
    if (rev != null) {
      const r = document.createElement("span");
      r.className = "toast-rev";
      r.textContent = `r ${rev}`;
      head.appendChild(r);
    }
    el.appendChild(head);
    const b = document.createElement("div");
    b.className = "toast-body";
    b.textContent = body;
    el.appendChild(b);
    this.toasts.appendChild(el);
    setTimeout(() => {
      el.classList.add("leaving");
      setTimeout(() => el.remove(), 260);
    }, 6000);
  }

  /** Ô "Claude" trong khung tên — hiện việc vừa làm, tự mờ sau 8s. */
  claudeNote(text: string): void {
    this.claudeCell.textContent = `✎ ${text}`;
    this.claudeCell.classList.add("active");
    if (this.claudeTimer != null) clearTimeout(this.claudeTimer);
    this.claudeTimer = window.setTimeout(() => {
      this.claudeCell.textContent = "—";
      this.claudeCell.classList.remove("active");
    }, 8000);
  }

  showEntity(found: FoundEntity | null, id: string | null): void {
    this.propsBody.textContent = "";
    if (!found || !id) {
      const p = document.createElement("p");
      p.className = "panel-empty";
      p.innerHTML =
        'Chạm một đối tượng trên bản vẽ để xem thông số.<br /><span class="dim">Kéo để di chuyển — đang kéo thì gõ số là chốt chính xác.</span>';
      this.propsBody.appendChild(p);
      return;
    }
    const chip = document.createElement("span");
    chip.className = "prop-id";
    chip.textContent = `${found.kind} · ${id}`;
    this.propsBody.appendChild(chip);

    const specs = new Map((EDITABLE[found.entity] ?? []).map((s) => [s.key, s]));
    const table = document.createElement("table");
    table.className = "prop-table";

    const addRow = (key: string, cell: HTMLElement | string): void => {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      th.textContent = key;
      const td = document.createElement("td");
      if (typeof cell === "string") td.textContent = cell;
      else td.appendChild(cell);
      tr.append(th, td);
      table.appendChild(tr);
    };

    // field sửa được luôn hiện (kể cả đang undefined, vd wall.height)
    const shown = new Set<string>();
    for (const spec of EDITABLE[found.entity] ?? []) {
      shown.add(spec.key);
      addRow(spec.key, this.buildEditor(found, id, spec));
    }
    for (const [key, value] of Object.entries(found.data)) {
      if (key === "id" || value == null || shown.has(key)) continue;
      const rendered = renderValue(key, value);
      if (rendered == null) continue;
      addRow(key, rendered);
    }
    this.propsBody.appendChild(table);
  }

  private buildEditor(found: FoundEntity, id: string, spec: FieldSpec): HTMLElement {
    const wrap = document.createElement("span");
    wrap.className = "prop-edit";
    const value = found.data[spec.key];

    const mkInput = (v: string, num: boolean): HTMLInputElement => {
      const input = document.createElement("input");
      input.className = "prop-input";
      if (num) {
        input.type = "number";
        input.step = "10";
      }
      input.value = v;
      return input;
    };

    const commit = (): void => {
      if (spec.kind === "point") {
        const [ix, iy] = wrap.querySelectorAll("input");
        const x = Number(ix!.value);
        const y = Number(iy!.value);
        const old = value as [number, number] | undefined;
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;
        if (old && Math.round(x) === old[0] && Math.round(y) === old[1]) return;
        this.cb.onPropEdit(found.entity, id, spec.key, [Math.round(x), Math.round(y)]);
        return;
      }
      const input = wrap.querySelector("input")!;
      if (spec.kind === "num") {
        if (input.value.trim() === "") return; // field optional bỏ trống — không đổi
        const v = Number(input.value);
        if (!Number.isFinite(v) || v === value) return;
        this.cb.onPropEdit(found.entity, id, spec.key, Math.round(v));
        return;
      }
      if (input.value !== value) this.cb.onPropEdit(found.entity, id, spec.key, input.value);
    };

    const hook = (input: HTMLInputElement): void => {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          commit();
          input.blur();
        }
        e.stopPropagation(); // không cho phím rơi vào shortcut toàn cục (Del, Ctrl+Z…)
      });
      input.addEventListener("change", commit);
    };

    if (spec.kind === "point") {
      const pt = (value as [number, number] | undefined) ?? [0, 0];
      const ix = mkInput(String(pt[0]), true);
      const iy = mkInput(String(pt[1]), true);
      hook(ix);
      hook(iy);
      wrap.append(ix, document.createTextNode(", "), iy);
    } else {
      const input = mkInput(value == null ? "" : String(value), spec.kind === "num");
      if (spec.kind === "num" && MM_KEYS.has(spec.key) && spec.key !== "rotation") input.placeholder = "mm";
      hook(input);
      wrap.appendChild(input);
    }
    return wrap;
  }
}

function renderValue(key: string, value: unknown): string | null {
  if (typeof value === "number") return MM_KEYS.has(key) && key !== "rotation" ? `${value} mm` : String(value);
  if (typeof value === "string" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 2 && value.every((v) => typeof v === "number")) return `${value[0]}, ${value[1]}`;
    return `${value.length} phần tử`;
  }
  return null; // object lồng nhau — chưa sửa trực tiếp
}
