/**
 * Soft-lock khi người dùng đang kéo (doc 06, tầng 1 của "người dùng luôn thắng"):
 * browser gửi presence.draggingIds → entity bị khóa với MỌI origin khác "user".
 * Thả chuột (set rỗng) không nhả ngay — khóa "nguội" thêm releaseMs (mặc định 5s)
 * để op commit của người dùng kịp đi trước op của agent.
 */
export class SoftLocks {
  /** Đổi được từ ngoài (test/e2e dùng số nhỏ). */
  releaseMs = 5_000;

  /** entity id → holder đang kéo. */
  private active = new Map<string, string>();
  /** entity id → thời điểm hết khóa nguội (epoch ms). */
  private cooling = new Map<string, number>();

  constructor(private readonly clock: () => number = Date.now) {}

  /** Cập nhật trọn bộ danh sách đang kéo của một holder (mỗi presence một lần). */
  set(holder: string, ids: string[]): void {
    const next = new Set(ids);
    const now = this.clock();
    for (const [id, h] of this.active) {
      if (h === holder && !next.has(id)) {
        this.active.delete(id);
        this.cooling.set(id, now + this.releaseMs);
      }
    }
    for (const id of next) this.active.set(id, holder);
  }

  /** Holder biến mất (đóng tab) — chuyển hết sang khóa nguội. */
  drop(holder: string): void {
    this.set(holder, []);
  }

  /** Những id trong danh sách còn đang bị khóa (kéo hoặc nguội chưa hết). */
  lockedAmong(ids: Iterable<string>): string[] {
    const now = this.clock();
    const hit: string[] = [];
    for (const id of ids) {
      if (this.active.has(id)) {
        hit.push(id);
        continue;
      }
      const until = this.cooling.get(id);
      if (until != null) {
        if (until > now) hit.push(id);
        else this.cooling.delete(id); // dọn rác tiện thể
      }
    }
    return hit;
  }
}
