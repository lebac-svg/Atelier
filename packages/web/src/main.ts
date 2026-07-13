import { AppState } from "./state.js";
import { Plan2D } from "./plan2d.js";
import { Scene3D } from "./three3d.js";
import { UI } from "./ui.js";
import { WsClient } from "./ws.js";

const state = new AppState();

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
});

const plan = new Plan2D(
  document.getElementById("paper-viewport")!,
  document.getElementById("paper")!,
  (id) => state.select(id),
);

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
});

state.on("snapshot", ({ model }) => {
  ui.setProject(model.meta.name);
  ui.setRevision(model.meta.revision, false);
  ui.setLevels(model.levels, state.activeLevel);
  scene3d.setModel(model);
  if (state.activeLevel) void plan.show(state.activeLevel, model.meta.revision);
});

state.on("patch", ({ revision, ops, origin, note, summary, changedIds }) => {
  ui.setRevision(revision, true);
  if (!state.model) return;
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
  if (id) {
    plan.flash([id]);
    scene3d.flash([id]);
  }
});

state.on("resync", () => ws.resync());

ws.connect();
