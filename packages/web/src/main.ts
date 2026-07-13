import type { EntityKind, Op } from "@atelier/core";
import { AppState } from "./state.js";
import { Plan2D } from "./plan2d.js";
import { Scene3D } from "./three3d.js";
import { UI } from "./ui.js";
import { WsClient } from "./ws.js";
import { invertOps, UndoStack, type UndoEntry } from "./undo.js";

const state = new AppState();
const undoStack = new UndoStack();

/**
 * Hàng đợi op ĐANG BAY của chính mình: gửi xong chờ server phán.
 * - patch origin "user" khớp ops → xác nhận (đẩy undo stack đúng hướng)
 * - reject → hoàn preview + toast lý do (optimistic UI, doc 09)
 */
type Pending = { ops: Op[]; entry: UndoEntry | null; kind: "edit" | "undo" | "redo" };
const pending: Pending[] = [];

function sendOps(ops: Op[], label: string, kind: Pending["kind"]): void {
  if (!state.model) return;
  let entry: UndoEntry | null = null;
  if (kind === "edit") {
    const inv = invertOps(state.model, ops);
    entry = inv ? { undo: inv, redo: structuredClone(ops), label } : null;
  }
  pending.push({ ops, entry, kind });
  ws.send({ type: "ops", baseRevision: state.revision, ops, note: label });
}

function syncUndoButtons(): void {
  ui.setUndoState(undoStack.canUndo && pending.length === 0, undoStack.canRedo && pending.length === 0);
}

function doUndo(): void {
  if (pending.length > 0) return; // chờ op trước hạ cánh — tránh base đuổi nhau
  const entry = undoStack.peekUndo();
  if (!entry) return;
  sendOps(structuredClone(entry.undo), `hoàn tác: ${entry.label}`, "undo");
  syncUndoButtons();
}

function doRedo(): void {
  if (pending.length > 0) return;
  const entry = undoStack.peekRedo();
  if (!entry) return;
  sendOps(structuredClone(entry.redo), `làm lại: ${entry.label}`, "redo");
  syncUndoButtons();
}

function deleteSelection(): void {
  const id = state.selection;
  if (!id || !state.model) return;
  const found = state.findEntity(id);
  if (!found) return;
  if (!["wall", "opening", "furniture", "room"].includes(found.entity)) {
    ui.toast("reject", `Chưa hỗ trợ xóa ${found.kind.toLowerCase()} từ editor.`);
    return;
  }
  sendOps([{ op: "delete", entity: found.entity, id }], `xóa ${id}`, "edit");
  state.select(null);
}

const ui = new UI({
  onLevel: (id) => state.setLevel(id),
  onView: (v) => state.setView(v),
  onIssueClick: (entities) => {
    plan.flash(entities);
    scene3d.flash(entities);
    const first = entities[0];
    if (first) state.select(first);
  },
  onFit2d: () => plan.fit(),
  onReset3d: () => scene3d.resetView(),
  onPropEdit: (entity: EntityKind, id: string, field: string, value: unknown) => {
    sendOps([{ op: "update", entity, id, data: { [field]: value } }], `sửa ${id}.${field}`, "edit");
  },
  onUndo: doUndo,
  onRedo: doRedo,
});

const plan = new Plan2D(document.getElementById("paper-viewport")!, document.getElementById("paper")!, {
  onSelect: (id) => state.select(id),
  getModel: () => state.model,
  getGrid: () => ui.snapGrid(),
  onDragIds: (ids) => ws.send({ type: "presence", draggingIds: ids, tool: "V" }),
  onCommit: (op, label) => sendOps([op], label, "edit"),
});

const scene3d = new Scene3D(document.getElementById("canvas3d") as HTMLCanvasElement);

const ws = new WsClient({
  onConn: (s) => ui.setConn(s),
  onSnapshot: (m) => state.setSnapshot(m),
  onPatch: (m) => state.applyPatch(m),
  onValidation: (m) => state.setValidation(m),
  onCapture: async (m) => {
    try {
      const png = m.target === "3d" ? scene3d.capture(m.camera) : await plan.capture();
      ws.send({ type: "capture_result", requestId: m.requestId, png });
    } catch (e) {
      ws.send({ type: "capture_result", requestId: m.requestId, error: e instanceof Error ? e.message : String(e) });
    }
  },
  onReject: (m) => {
    pending.shift(); // op của mình vừa bị từ chối (browser chỉ có một nguồn gửi)
    plan.clearPreview();
    ui.toast("reject", m.errors.map((e) => e.message).join(" · ") || "Server từ chối thay đổi.");
    syncUndoButtons();
    if (m.currentRevision > state.revision) ws.resync(); // mirror tụt hậu — xin snapshot tươi
  },
});

state.on("snapshot", ({ model }) => {
  pending.length = 0;
  undoStack.clear(); // snapshot mới = phiên/dự án mới — stack cũ vô nghĩa
  syncUndoButtons();
  ui.setProject(model.meta.name);
  ui.setRevision(model.meta.revision, false);
  ui.setLevels(model.levels, state.activeLevel);
  scene3d.setModel(model);
  if (state.activeLevel) void plan.show(state.activeLevel, model.meta.revision);
});

state.on("patch", ({ revision, ops, origin, note, summary, changedIds }) => {
  ui.setRevision(revision, true);
  if (!state.model) return;

  // op của chính mình quay về → xác nhận với undo stack
  if (origin === "user" && pending.length > 0 && JSON.stringify(pending[0]!.ops) === JSON.stringify(ops)) {
    const mine = pending.shift()!;
    if (mine.kind === "edit" && mine.entry) undoStack.push(mine.entry);
    else if (mine.kind === "undo") undoStack.confirmUndo();
    else if (mine.kind === "redo") undoStack.confirmRedo();
    syncUndoButtons();
  }

  const affected = scene3d.applyOps(state.model, ops);
  scene3d.flash(affected);
  if (state.activeLevel) {
    void plan.show(state.activeLevel, revision).then(() => plan.flash(changedIds));
  }
  // level mới xuất hiện/mất đi → làm mới tab tầng
  ui.setLevels(state.model.levels, state.activeLevel);
  if (origin === "claude") {
    const what = note ?? summary ?? "cập nhật model";
    ui.toast("claude", what, revision);
    ui.claudeNote(what);
  }
  // panel thuộc tính đang mở đúng entity vừa đổi → làm tươi (trừ khi người dùng đang gõ dở)
  if (state.selection && changedIds.includes(state.selection) && !ui.propsBusy) {
    ui.showEntity(state.findEntity(state.selection), state.selection);
  }
});

state.on("validation", ({ issues }) => ui.setIssues(issues));

state.on("level", ({ level }) => {
  ui.setActiveLevel(level);
  void plan.show(level, state.revision);
});

state.on("view", () => {
  // pane vừa hiện lại có thể chưa từng fit (bị ẩn lúc snapshot đầu)
  requestAnimationFrame(() => {
    plan.ensureFitted();
    scene3d.invalidate();
  });
});

state.on("select", ({ id }) => {
  ui.showEntity(id ? state.findEntity(id) : null, id);
  plan.setSelection(id);
  ws.send({ type: "presence", selection: id ? [id] : [] });
  if (id) {
    plan.flash([id]);
    scene3d.flash([id]);
  }
});

state.on("resync", () => ws.resync());

// ── Phím tắt toàn cục (doc 09) ─────────────────────────────────
window.addEventListener("keydown", (e) => {
  if (plan.dragging) return; // phiên kéo tự xử lý bàn phím (HUD)
  const t = e.target as HTMLElement | null;
  if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !e.shiftKey) {
    e.preventDefault();
    doUndo();
  } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === "y" || (e.key.toLowerCase() === "z" && e.shiftKey))) {
    e.preventDefault();
    doRedo();
  } else if (e.key === "Delete") {
    deleteSelection();
  } else if (e.key === "Escape") {
    state.select(null);
  }
});

ws.connect();
