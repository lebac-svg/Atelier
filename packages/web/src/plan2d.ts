/**
 * Pane mặt bằng: tờ giấy SVG do SERVER render (đúng nguyên tắc 2 — ký hiệu nằm
 * trong renderer, browser chỉ treo lên bàn). Mỗi patch → fetch bản mới theo rev.
 */
export class Plan2D {
  private scale = 1;
  private tx = 0;
  private ty = 0;
  private currentLevel: string | null = null;
  private seq = 0;
  private fitted = false;

  constructor(
    private readonly viewport: HTMLElement,
    private readonly paper: HTMLElement,
    private readonly onSelect: (id: string) => void,
  ) {
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

  // ── Pan / zoom / chọn ──────────────────────────────────────

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

  private onPointerDown(e: PointerEvent): void {
    if (e.button !== 0) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const baseTx = this.tx;
    const baseTy = this.ty;
    let moved = false;
    // setPointerCapture retarget mọi event về viewport — phải giữ target thật từ pointerdown
    const downTarget = e.target as Element;
    this.viewport.setPointerCapture(e.pointerId);
    this.viewport.classList.add("is-panning");

    const onMove = (ev: PointerEvent): void => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
      if (moved) {
        this.tx = baseTx + dx;
        this.ty = baseTy + dy;
        this.apply();
      }
    };
    const onUp = (): void => {
      this.viewport.removeEventListener("pointermove", onMove);
      this.viewport.removeEventListener("pointerup", onUp);
      this.viewport.classList.remove("is-panning");
      if (!moved) {
        const id = downTarget.closest?.("[data-id]")?.getAttribute("data-id");
        if (id) this.onSelect(id);
      }
    };
    this.viewport.addEventListener("pointermove", onMove);
    this.viewport.addEventListener("pointerup", onUp);
  }
}
