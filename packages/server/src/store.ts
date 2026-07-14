import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  applyOps, loadBietThuDoc, loadCanHo, loadDetachedUk, loadNhaCap4, loadNhaOng4x16, loadNhaVuon, setDonGia, validateProject,
  type ApplyResult, type Issue, type Op, type OpOrigin, type Point, type Project,
} from "@atelier/core";
import { SoftLocks } from "./locks.js";

export const PROJECT_FILE = "atelier.project.json";

export type JournalEntry = {
  revision: number;
  at: string;
  origin: OpOrigin;
  note?: string;
  summary: string;
  ops: Op[];
};

/** Sự kiện store — nuôi broadcast WS của live server (doc 06). */
export type StoreEvent =
  | { kind: "applied"; revision: number; ops: Op[]; origin: OpOrigin; note?: string; summary: string; issues: Issue[] }
  | { kind: "project"; reason: "created" | "opened" }; // model thay mới toàn bộ → client cần snapshot

/** Thư viện template (P8 — doc 12): mỗi typology một mẫu có fixture + golden test. */
export const TEMPLATES: Record<string, { label: string; load: () => Project }> = {
  "nha-ong-4x16-2t": { label: "Nhà ống 4×16m, 2 tầng, 3PN", load: loadNhaOng4x16 },
  "biet-thu-doc-2t": { label: "Biệt thự mái dốc — lô góc đất dốc, 2 tầng", load: loadBietThuDoc },
  "nha-cap-4": { label: "Nhà cấp 4 — 2 phòng ngủ, mái tôn, một tầng", load: loadNhaCap4 },
  "nha-vuon": { label: "Nhà vườn — 1 tầng mái ngói, lô lớn mật độ thấp", load: loadNhaVuon },
  "can-ho": { label: "Căn hộ 2PN — cải tạo trong khung có sẵn (không lô đất)", load: loadCanHo },
  "detached-uk": { label: "UK detached — 3 bed gable roof (region uk, Approved Documents)", load: loadDetachedUk },
};

/**
 * Model store: một dự án tại một thư mục (doc 03).
 * - atelier.project.json — NGUỒN SỰ THẬT, ghi atomic (tmp + rename)
 * - .atelier/history.jsonl — journal ops (append-only)
 */
export class ProjectStore {
  private project: Project | null = null;
  private listeners = new Set<(e: StoreEvent) => void>();
  /** Soft-lock entity đang được người dùng kéo (doc 06) — live server cập nhật qua presence. */
  readonly locks = new SoftLocks();

  constructor(readonly baseDir: string) {}

  /** Đăng ký nghe sự kiện mutation. Trả hàm hủy đăng ký. */
  subscribe(fn: (e: StoreEvent) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit(e: StoreEvent): void {
    for (const fn of [...this.listeners]) {
      try {
        fn(e);
      } catch {
        // listener hỏng không được phép làm hỏng transaction
      }
    }
  }

  get filePath(): string {
    return path.join(this.baseDir, PROJECT_FILE);
  }

  /** Bảng đơn giá địa phương: <dự án>/rules/don-gia.json đè bảng đóng gói (ADR-09 — data người dùng sửa được). */
  refreshDonGia(): void {
    const fp = path.join(this.baseDir, "rules", "don-gia.json");
    try {
      setDonGia(existsSync(fp) ? (JSON.parse(readFileSync(fp, "utf8")) as never) : null);
    } catch {
      setDonGia(null); // file hỏng → dùng bảng gốc, đừng làm gãy estimate
    }
  }

  get exportDir(): string {
    return path.join(this.baseDir, ".atelier", "exports");
  }

  private get journalPath(): string {
    return path.join(this.baseDir, ".atelier", "history.jsonl");
  }

  get isOpen(): boolean {
    return this.project != null;
  }

  get current(): Project {
    if (!this.project) {
      throw new Error("Chưa mở dự án nào — gọi project_new (tạo mới) hoặc project_open trước.");
    }
    return this.project;
  }

  newProject(name: string, template?: string, siteBoundary?: Point[], brief?: Project["brief"]): Project {
    if (existsSync(this.filePath)) {
      throw new Error(`Đã có dự án tại ${this.filePath} — dùng project_open, hoặc xóa file nếu muốn làm lại từ đầu.`);
    }
    let p: Project;
    if (template) {
      const t = TEMPLATES[template];
      if (!t) {
        throw new Error(`Không có template "${template}" — hiện có: ${Object.keys(TEMPLATES).join(", ")}.`);
      }
      p = t.load();
    } else {
      p = blankProject(brief);
    }
    p.meta = { ...p.meta, id: slugify(name), name, revision: 0 };
    if (brief) p.brief = structuredClone(brief); // brief từ pha A phỏng vấn — nguồn đối chiếu mọi pha sau
    if (siteBoundary) {
      p.site.boundary = siteBoundary;
      p.brief.dat = { ...(p.brief.dat ?? {}), ranh_gioi: siteBoundary };
    }
    this.project = p;
    this.persist();
    this.appendJournal({
      revision: 0,
      at: new Date().toISOString(),
      origin: "system",
      summary: template ? `khởi tạo từ template ${template}` : "khởi tạo dự án trống",
      ops: [],
    });
    this.emit({ kind: "project", reason: "created" });
    return p;
  }

  openProject(file?: string): Project {
    const fp = file ? path.resolve(this.baseDir, file) : this.filePath;
    if (!existsSync(fp)) {
      throw new Error(`Không thấy ${fp} — kiểm tra đường dẫn hoặc tạo mới bằng project_new.`);
    }
    const raw = JSON.parse(readFileSync(fp, "utf8")) as Project;
    if (typeof raw?.meta?.revision !== "number" || raw.meta.unit !== "mm") {
      throw new Error(`${fp} không phải file dự án Atelier hợp lệ (thiếu meta.revision / unit mm).`);
    }
    this.project = raw;
    this.emit({ kind: "project", reason: "opened" });
    return raw;
  }

  /** Cổng mutation duy nhất — soft-lock, validate đầy đủ, block → hủy, thành công → ghi đĩa + journal. */
  apply(baseRevision: number, ops: Op[], note?: string, origin: OpOrigin = "claude"): ApplyResult {
    if (origin !== "user") {
      const hit = this.locks.lockedAmong(touchedIds(this.current, ops));
      if (hit.length > 0) {
        return {
          ok: false,
          currentRevision: this.current.meta.revision,
          errors: [{
            rule: "LOCK-01", severity: "block", entities: hit,
            message: `${hit.join(", ")} đang được người dùng chỉnh trực tiếp — khóa tự nhả ~5s sau khi họ thả tay. Chờ rồi get_changes_since để xem họ đã đổi gì trước khi thử lại.`,
          }],
        };
      }
    }
    const result = applyOps(this.current, baseRevision, ops, {
      validate: validateProject,
      ...(note ? { note } : {}),
    });
    if (result.ok) {
      this.project = result.project;
      this.persist();
      this.appendJournal({
        revision: result.revision,
        at: new Date().toISOString(),
        origin,
        ...(note ? { note } : {}),
        summary: result.summary,
        ops,
      });
      this.emit({
        kind: "applied",
        revision: result.revision,
        ops,
        origin,
        ...(note ? { note } : {}),
        summary: result.summary,
        issues: result.warnings, // validate đã chạy trong transaction — không cần chạy lại
      });
    }
    return result;
  }

  // ── Phương án A/B (backlog v2 → 13/07/2026): snapshot có tên ────
  // Journal không tái tạo được state cũ (rev 0 không lưu ops) — snapshot là
  // đường thẳng nhất, và cũng chính là ngữ nghĩa người dùng cần: "lưu bố trí này lại".

  get variantsDir(): string {
    return path.join(this.baseDir, ".atelier", "phuong-an");
  }

  /** Lưu model hiện tại thành phương án (cùng tên → cập nhật đè). Trả slug. */
  saveVariant(name: string): { slug: string; revision: number } {
    const p = this.current;
    const slug = slugify(name);
    mkdirSync(this.variantsDir, { recursive: true });
    const payload = {
      name,
      savedAt: new Date().toISOString(),
      revision: p.meta.revision,
      model: p,
    };
    writeFileSync(path.join(this.variantsDir, `${slug}.json`), JSON.stringify(payload, null, 2) + "\n", "utf8");
    return { slug, revision: p.meta.revision };
  }

  listVariants(): Array<{ slug: string; name: string; savedAt: string; revision: number }> {
    if (!existsSync(this.variantsDir)) return [];
    const out: Array<{ slug: string; name: string; savedAt: string; revision: number }> = [];
    for (const f of readdirSync(this.variantsDir)) {
      if (!f.endsWith(".json")) continue;
      try {
        const v = JSON.parse(readFileSync(path.join(this.variantsDir, f), "utf8")) as {
          name?: string; savedAt?: string; revision?: number;
        };
        out.push({
          slug: f.replace(/\.json$/, ""),
          name: v.name ?? f,
          savedAt: v.savedAt ?? "",
          revision: v.revision ?? 0,
        });
      } catch {
        // file hỏng — bỏ qua, không làm gãy list
      }
    }
    return out.sort((a, b) => a.savedAt.localeCompare(b.savedAt));
  }

  /** Đọc model của một phương án (không đổi model đang làm). */
  readVariant(slug: string): { name: string; savedAt: string; model: Project } {
    const fp = path.join(this.variantsDir, `${slug}.json`);
    if (!existsSync(fp)) {
      const known = this.listVariants().map((v) => v.slug).join(", ") || "(chưa có phương án nào)";
      throw new Error(`Không có phương án "${slug}" — hiện có: ${known}.`);
    }
    const v = JSON.parse(readFileSync(fp, "utf8")) as { name?: string; savedAt?: string; model: Project };
    return { name: v.name ?? slug, savedAt: v.savedAt ?? "", model: v.model };
  }

  /**
   * Chuyển sang làm việc trên một phương án (checkout). Model hiện tại KHÔNG
   * tự lưu — caller (tool description dặn Claude) phải saveVariant trước nếu muốn giữ.
   * Revision tiếp tục đơn điệu tăng để optimistic concurrency không gãy.
   */
  openVariant(slug: string): Project {
    const { name, model } = this.readVariant(slug);
    const next = structuredClone(model);
    next.meta.revision = this.current.meta.revision + 1;
    this.project = next;
    this.persist();
    this.appendJournal({
      revision: next.meta.revision,
      at: new Date().toISOString(),
      origin: "system",
      summary: `chuyển sang phương án "${name}" (${slug})`,
      ops: [],
    });
    this.emit({ kind: "project", reason: "opened" }); // mọi tab nhận snapshot + session token mới
    return next;
  }

  changesSince(revision: number): { entries: JournalEntry[]; currentRevision: number } {
    const entries: JournalEntry[] = [];
    if (existsSync(this.journalPath)) {
      for (const line of readFileSync(this.journalPath, "utf8").split("\n")) {
        if (!line.trim()) continue;
        const e = JSON.parse(line) as JournalEntry;
        if (e.revision > revision) entries.push(e);
      }
    }
    return { entries, currentRevision: this.current.meta.revision };
  }

  private persist(): void {
    mkdirSync(path.dirname(this.filePath), { recursive: true });
    const tmp = `${this.filePath}.tmp`;
    writeFileSync(tmp, JSON.stringify(this.current, null, 2) + "\n", "utf8");
    renameSync(tmp, this.filePath);
  }

  private appendJournal(entry: JournalEntry): void {
    mkdirSync(path.dirname(this.journalPath), { recursive: true });
    appendFileSync(this.journalPath, JSON.stringify(entry) + "\n", "utf8");
  }
}

/** Id các entity một batch ops chạm tới — kể cả openings bị cascade khi xóa tường. */
function touchedIds(p: Project, ops: Op[]): Set<string> {
  const ids = new Set<string>();
  for (const op of ops) {
    if (op.op === "add") {
      if (typeof op.data.id === "string") ids.add(op.data.id);
      continue;
    }
    ids.add(op.id);
    if (op.op === "delete" && op.entity === "wall") {
      for (const o of p.openings) if (o.wall === op.id) ids.add(o.id);
    }
  }
  return ids;
}

/**
 * Dự án trống (P8 — doc 12): hình lô lấy từ BRIEF pha A (dat.ranh_gioi),
 * không còn mặc định lô nhà ống 4×16. Chưa phỏng vấn → lô vuông 10×10
 * trung tính, chỉ là chỗ đứng tạm cho tới khi khai ranh giới thật.
 */
export function blankProject(brief?: Project["brief"]): Project {
  const boundary: Point[] = brief?.dat?.ranh_gioi ?? [[0, 0], [10000, 0], [10000, 10000], [0, 10000]];
  return {
    meta: { id: "du-an-moi", name: "Dự án mới", revision: 0, unit: "mm", app: "atelier/0.1" },
    brief: brief ? structuredClone(brief) : {},
    site: { boundary: structuredClone(boundary), north: 0, front: 0 },
    axes: { x: [], y: [] },
    levels: [{ id: "L1", name: "Tầng 1", elevation: 0, height: 3600 }],
    walls: [],
    openings: [],
    slabs: [],
    roofs: [],
    stairs: [],
    rooms: [],
    furniture: [],
    styles: { openings: {} },
    finishes: {},
  };
}

export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "du-an";
}
