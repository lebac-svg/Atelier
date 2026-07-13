/**
 * HUD gõ số (doc 09) — ô nổi cạnh con trỏ khi đang kéo. Không phải <input>:
 * bàn phím được gom bằng buffer ở controller để không tranh focus với pointer capture.
 */
import { t } from "./i18n.js";

export class Hud {
  private readonly el: HTMLDivElement;
  private readonly valueEl: HTMLSpanElement;
  private readonly hintEl: HTMLSpanElement;

  constructor(host: HTMLElement) {
    this.el = document.createElement("div");
    this.el.id = "hud";
    this.el.hidden = true;
    this.valueEl = document.createElement("span");
    this.valueEl.className = "hud-value";
    this.hintEl = document.createElement("span");
    this.hintEl.className = "hud-hint";
    this.el.append(this.valueEl, this.hintEl);
    host.appendChild(this.el);
  }

  /** typing ≠ null → đang gõ số, hiện buffer thay cho text đo. */
  show(clientX: number, clientY: number, text: string, typing: string | null, typable: boolean): void {
    this.el.hidden = false;
    this.el.classList.toggle("typing", typing != null);
    this.valueEl.textContent = typing != null ? `${typing || "…"} mm` : text;
    this.hintEl.textContent = typing != null ? t("hud.typing") : typable ? t("hud.typable") : "";
    this.el.style.left = `${clientX + 18}px`;
    this.el.style.top = `${clientY + 14}px`;
  }

  /** Số không áp được — lắc nhẹ. */
  shake(): void {
    this.el.classList.remove("shake");
    void this.el.getBoundingClientRect();
    this.el.classList.add("shake");
  }

  hide(): void {
    this.el.hidden = true;
    this.el.classList.remove("typing", "shake");
  }
}
