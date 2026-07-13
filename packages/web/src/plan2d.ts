import type { Op, Point, Project } from "@atelier/core";
import { furnitureDragSession, openingDragSession, wallDragSession, type DragSession, type DragState } from "./drag.js";
import { Hud } from "./hud.js";
import { clientToPaper, modelDeltaToPaper, modelPerPixel, paperToModel, readPlanTf } from "./plan-geom.js";

export type Plan2DDeps = {
  onSelect(id: string): void;
  getModel(): Project | null;
  /** Bước lưới snap hiện tại (mm) — 0 là tắt. */
  getGrid(): number;
  /** Người dùng bắt đầu/dừng kéo — nuôi presence.draggingIds (soft-lock doc 06). */
  onDragIds(ids: string[]): void;
  /** Thả chuột/Enter — gửi MỘT op (doc 09). Preview giữ nguyên tới khi patch/reject về. */
  onCommit(op: Op, label: string): void;
  /** Click đặt nội thất khi đang ở chế độ đặt (tool 5, P5) — pt là mm model đã snap. */
  onPlace(assetId: string, pt: Point): void;
  /** Link chia sẻ chỉ-xem: chọn/pan/zoom vẫn chạy, kéo-thả thì không. */
  readonly?: boolean;
};

/** Ngưỡng hít tính theo px màn hình — quy về mm model theo zoom lúc kéo. */
const SNAP_PX = 8;
/** Quá ngưỡng này (px) thì coi là kéo, không phải click chọn. */
const DRAG_PX = 4;

/**
 * Pane mặt bằng: tờ giấy SVG do SERVER render (ký hiệu nằm trong renderer,
 * browser chỉ treo lên bàn). P3: thêm lớp thao tác — chọn, kéo tường/cửa/nội thất
 * với preview cục bộ + HUD gõ số; mỗi thao tác chỉ đẻ đúng một op khi chốt.
 */
export class Plan2D {
  private scale = 1;
  private tx = 0;
  private ty = 0;
  private currentLevel: string | null = null;
  private seq = 0;
  private fitted = false;
  private selection: string | null = null;
  private readonly hud: Hud;
  /** Đang có phiên kéo entity — phím tắt toàn cục (Del, Ctrl+Z…) phải đứng ngoài. */
  dragging = false;
  /** Chế độ đặt nội thất (tool 5): id asset đang chờ click, null = tool chọn. */
  private placing: string | null = null;

  constructor(
    private readonly viewport: HTMLElement,
    private readonly paper: HTMLElement,
    private readonly deps: Plan2DDeps,
  ) {
    this.hud = new Hud(viewport);
    viewport.addEventListener("wheel", (e) => this.onWheel(e), { passive: false });
    viewport.addEventListener("pointerdown", (e) => this.onPointerDown(e));
  }

  private get svg(): SVGSVGElement | null {
    return this.paper.querySelector("svg");
  }

  async show(level: string, revision: number): Promise<void> {
    const mySeq = ++this.seq;
    const res = await fetch(`/plan/${encodeURIComponent(level)}.svg?rev=${revision}`);
    if (!res.ok || mySeq !== this.seq) return; // có bản mới hơn đang về — bỏ bản này
    const svg = await res.text();
    if (mySeq !== this.seq) return;
    const levelChanged = this.currentLevel !== level;
    this.currentLevel = level;
    this.paper.innerHTML = svg;
    this.applySelection();
    if (!this.fitted || levelChanged) this.fit();
  }

  /** Khớp tờ giấy vào khung — gọi lại được từ nút "khớp khung". */
  fit(): void {
    this.paper.style.transform = "none";
    const r = this.paper.getBoundingClientRect();
    const vp = this.viewport.getBoundingClientRect();
    if (r.width === 0 || vp.width === 0) {
      this.apply(); // pane đang ẩn — giữ transform hiện tại, thử lại khi hiện
      return;
    }
    this.scale = Math.min(vp.width / r.width, vp.height / r.height) * 0.92;
    this.tx = (vp.width - r.width * this.scale) / 2;
    this.ty = (vp.height - r.height * this.scale) / 2;
    this.fitted = true;
    this.apply();
  }

  ensureFitted(): void {
    if (!this.fitted) this.fit();
  }

  flash(ids: string[]): void {
    for (const id of ids) {
      for (const el of this.paper.querySelectorAll(`[data-id="${CSS.escape(id)}"]`)) {
        el.classList.remove("flash-2d");
        void (el as HTMLElement).getBoundingClientRect?.(); // restart animation
        el.classList.add("flash-2d");
        setTimeout(() => el.classList.remove("flash-2d"), 1600);
      }
    }
  }

  /** Đánh dấu chọn bền (khác flash) — svg thay mới vẫn giữ nhờ applySelection(). */
  setSelection(id: string | null): void {
    this.selection = id;
    this.applySelection();
  }

  private applySelection(): void {
    for (const el of this.paper.querySelectorAll(".sel-2d")) el.classList.remove("sel-2d");
    if (!this.selection) return;
    for (const el of this.paper.querySelectorAll(`[data-id="${CSS.escape(this.selection)}"]`)) {
      el.classList.add("sel-2d");
    }
  }

  /** Vào/ra chế độ đặt nội thất — con trỏ chữ thập, click là đặt. */
  setPlacing(assetId: string | null): void {
    this.placing = assetId;
    this.viewport.classList.toggle("is-placing", assetId != null);
  }

  get placingAsset(): string | null {
    return this.placing;
  }

  /** Bỏ preview đang treo (op bị reject) — phần tử bật về chỗ cũ. */
  clearPreview(): void {
    for (const el of this.paper.querySelectorAll("[data-preview]")) {
      el.removeAttribute("transform");
      el.removeAttribute("data-preview");
    }
    this.clearAlign();
  }

  private clearAlign(): void {
    for (const el of this.paper.querySelectorAll(".align-2d")) el.classList.remove("align-2d");
  }

  /** Chụp tờ giấy hiện tại thành PNG base64 (nuôi capture_view target "plan"). */
  async capture(targetWidth = 1600): Promise<string> {
    const svg = this.svg;
    if (!svg) throw new Error("Chưa có bản vẽ để chụp.");
    const xml = new XMLSerializer().serializeToString(svg);
    const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml" }));
    try {
      const img = new Image();
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => rej(new Error("Không nạp được SVG để chụp."));
        img.src = url;
      });
      const w = img.naturalWidth || 1600;
      const h = img.naturalHeight || 1130;
      const k = targetWidth / w;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(w * k);
      canvas.height = Math.round(h * k);
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/png").split(",")[1]!;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  // ── Pan / zoom ─────────────────────────────────────────────

  private apply(): void {
    this.paper.style.transform = `translate(${this.tx}px, ${this.ty}px) scale(${this.scale})`;
  }

  private onWheel(e: WheelEvent): void {
    e.preventDefault();
    const vp = this.viewport.getBoundingClientRect();
    const factor = Math.exp(-e.deltaY * 0.0012);
    const next = Math.min(10, Math.max(0.05, this.scale * factor));
    const px = (e.clientX - vp.left - this.tx) / this.scale;
    const py = (e.clientY - vp.top - this.ty) / this.scale;
    this.tx = e.clientX - vp.left - px * next;
    this.ty = e.clientY - vp.top - py * next;
    this.scale = next;
    this.apply();
  }

  // ── Chọn / kéo ─────────────────────────────────────────────

  /** Dựng phiên kéo cho entity nếu loại đó kéo được (tường/cửa/nội thất — P3). */
  private sessionFor(id: string, startModel: Point): DragSession | null {
    if (this.deps.readonly) return null; // chỉ-xem: kéo = pan, không bao giờ thành phiên sửa
    const model = this.deps.getModel();
    if (!model) return null;
    const wall = model.walls.find((w) => w.id === id);
    if (wall) return wallDragSession(model, wall, startModel);
    const opening = model.openings.find((o) => o.id === id);
    if (opening) {
      const host = model.walls.find((w) => w.id === opening.wall);
      return host ? openingDragSession(model, host, opening, startModel) : null;
    }
    const furn = model.furniture.find((f) => f.id === id);
    if (furn) return furnitureDragSession(model, furn, startModel);
    return null;
  }

  private onPointerDown(e: PointerEvent): void {
    if (e.button !== 0) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const baseTx = this.tx;
    const baseTy = this.ty;
    let moved = false;
    // setPointerCapture retarget mọi event về viewport — phải giữ target thật từ pointerdown
    const downTarget = e.target as Element;
    const hitId = downTarget.closest?.("[data-id]")?.getAttribute("data-id") ?? null;
    this.viewport.setPointerCapture(e.pointerId);

    // svg có thể bị THAY GIỮA LÚC KÉO (patch của Claude về → show() thay innerHTML)
    // nên mọi chỗ dùng đều đọc tươi, không giữ tham chiếu cũ
    const geo = (): { svg: SVGSVGElement; tf: NonNullable<ReturnType<typeof readPlanTf>> } | null => {
      const svg = this.svg;
      const tf = svg ? readPlanTf(svg) : null;
      return svg && tf ? { svg, tf } : null;
    };

    // trạng thái kéo entity (dựng lười — chỉ khi nhích quá ngưỡng)
    let session: DragSession | null = null;
    let sessionTried = false;
    let dragState: DragState | null = null;
    let typing: string | null = null;
    let committed = false;
    let lastClient: [number, number] = [startX, startY];

    const startModel = (): Point | null => {
      const g = geo();
      if (!g) return null;
      const p = clientToPaper(g.svg, startX, startY);
      return p ? paperToModel(g.tf, p) : null;
    };

    const applyPreview = (st: DragState): void => {
      const g = geo();
      if (!g || !session) return;
      const [dx, dy] = modelDeltaToPaper(g.tf, st.delta);
      for (const id of session.previewIds) {
        for (const el of this.paper.querySelectorAll(`[data-id="${CSS.escape(id)}"]`)) {
          el.setAttribute("transform", `translate(${dx} ${dy})`);
          el.setAttribute("data-preview", "1");
        }
      }
      this.clearAlign();
      if (st.alignWith) {
        for (const el of this.paper.querySelectorAll(`[data-id="${CSS.escape(st.alignWith)}"]`)) {
          el.classList.add("align-2d");
        }
      }
    };

    const snapOpts = (alt: boolean): { grid: number; tol: number; noSnap: boolean } => {
      const g = geo();
      return {
        grid: this.deps.getGrid(),
        tol: g ? SNAP_PX * modelPerPixel(g.svg, g.tf) : 40,
        noSnap: alt,
      };
    };

    const updateDrag = (ev: PointerEvent): void => {
      const g = geo();
      if (!g || !session) return;
      const paperPt = clientToPaper(g.svg, ev.clientX, ev.clientY);
      if (!paperPt) return;
      dragState = session.update(paperToModel(g.tf, paperPt), snapOpts(ev.altKey));
      applyPreview(dragState);
      this.hud.show(ev.clientX, ev.clientY, dragState.hud?.text ?? "", typing, dragState.hud?.typable ?? false);
    };

    const finish = (commitOp: Op | null, label: string): void => {
      committed = true;
      cleanup();
      if (commitOp) {
        this.deps.onCommit(commitOp, label);
        // preview giữ nguyên — patch về sẽ thay svg mới; reject thì main gọi clearPreview()
      } else {
        this.clearPreview();
      }
      this.deps.onDragIds([]);
    };

    const onKey = (ev: KeyboardEvent): void => {
      if (!session || !dragState) return;
      if (/^[0-9]$/.test(ev.key)) {
        typing = (typing ?? "") + ev.key;
      } else if (ev.key === "Backspace") {
        typing = typing ? typing.slice(0, -1) : null;
      } else if (ev.key === "Enter" && typing) {
        const st = session.typed(Number(typing), snapOpts(ev.altKey));
        if (!st) {
          this.hud.shake();
          ev.preventDefault();
          ev.stopPropagation();
          return;
        }
        applyPreview(st);
        finish(st.op, `${hitId}: gõ ${typing}`);
        ev.preventDefault();
        ev.stopPropagation();
        return;
      } else if (ev.key === "Escape") {
        if (typing != null) typing = null;
        else {
          finish(null, "");
          ev.preventDefault();
          ev.stopPropagation();
          return;
        }
      } else {
        return; // phím khác — không nuốt
      }
      ev.preventDefault();
      ev.stopPropagation();
      this.hud.show(lastClient[0], lastClient[1], dragState.hud?.text ?? "", typing, dragState.hud?.typable ?? false);
    };

    const onMove = (ev: PointerEvent): void => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      lastClient = [ev.clientX, ev.clientY];
      if (!moved && Math.abs(dx) + Math.abs(dy) > DRAG_PX) {
        moved = true;
        // chạm entity kéo được → phiên kéo; không thì pan như cũ (đang đặt nội thất: chỉ pan)
        if (hitId && !sessionTried && !this.placing) {
          sessionTried = true;
          const m = startModel();
          if (m) session = this.sessionFor(hitId, m);
          if (session) {
            this.dragging = true;
            this.deps.onSelect(hitId);
            this.deps.onDragIds(session.ids);
            window.addEventListener("keydown", onKey, true);
          }
        }
        if (session) this.viewport.classList.add("is-dragging");
        else this.viewport.classList.add("is-panning");
      }
      if (!moved) return;
      if (session) {
        updateDrag(ev);
      } else {
        this.tx = baseTx + dx;
        this.ty = baseTy + dy;
        this.apply();
      }
    };

    const cleanup = (): void => {
      this.dragging = false;
      this.viewport.removeEventListener("pointermove", onMove);
      this.viewport.removeEventListener("pointerup", onUp);
      this.viewport.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("keydown", onKey, true);
      this.viewport.classList.remove("is-panning", "is-dragging");
      this.hud.hide();
    };

    const onUp = (): void => {
      if (committed) return;
      if (session && moved) {
        finish(dragState?.op ?? null, dragState?.op ? `kéo ${hitId}` : "");
        return;
      }
      cleanup();
      if (moved) return;
      // chế độ đặt nội thất: click = đặt tại điểm model (snap lưới)
      if (this.placing) {
        const g = geo();
        if (g) {
          const paperPt = clientToPaper(g.svg, startX, startY);
          if (paperPt) {
            const m = paperToModel(g.tf, paperPt);
            const grid = this.deps.getGrid();
            const snap = (v: number): number => (grid > 0 ? Math.round(v / grid) * grid : Math.round(v));
            this.deps.onPlace(this.placing, [snap(m[0]), snap(m[1])]);
          }
        }
        return;
      }
      if (hitId) this.deps.onSelect(hitId);
    };

    const onCancel = (): void => {
      if (committed) return;
      if (session) {
        this.clearPreview();
        this.deps.onDragIds([]);
      }
      cleanup();
    };

    this.viewport.addEventListener("pointermove", onMove);
    this.viewport.addEventListener("pointerup", onUp);
    this.viewport.addEventListener("pointercancel", onCancel);
  }
}
