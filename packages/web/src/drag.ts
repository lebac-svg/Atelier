import {
  add, dot, getAsset, obbCorners, scale, sub,
  wallDir, wallLength, wallNormal, wallsParallel,
  type Furniture, type Op, type Opening, type Point, type Project, type Wall,
} from "@atelier/core";

/**
 * Ngữ nghĩa kéo-thả P3 (doc 09) — THUẦN, không DOM. Trong lúc kéo chỉ sinh
 * preview (delta model) + nội dung HUD; thả chuột/Enter mới có 1 op duy nhất.
 *
 * - Tường: trượt dọc pháp tuyến; HUD = khoảng cách tim→tim tới tường song song
 *   gần nhất (neo chọn lúc bắt đầu kéo, giữ nguyên suốt phiên) — gõ số là chốt
 *   đúng khoảng cách đó. Không có tường neo → HUD = Δ dịch chuyển.
 * - Cửa/cửa sổ: trượt dọc tường; HUD hiện khoảng cách hai đầu tường, gõ số áp
 *   cho đầu GẦN hơn.
 * - Nội thất: kéo tự do, snap lưới + hít mặt tường; gõ số = khe hở tới tường.
 */

export type SnapOpts = {
  /** Bước lưới mm (0 = tắt lưới). */
  grid: number;
  /** Ngưỡng hít (mm model, quy đổi từ ~8px theo zoom). */
  tol: number;
  /** Alt đang giữ — bỏ mọi snap. */
  noSnap: boolean;
};

export type HudInfo = {
  /** Chuỗi hiển thị khi KHÔNG gõ, vd "→ W2 · 4 200". */
  text: string;
  /** Gõ số có nghĩa ở phiên kéo này không. */
  typable: boolean;
};

export type DragState = {
  /** Tịnh tiến preview trong model (mm, chưa round). */
  delta: Point;
  hud: HudInfo | null;
  /** Op gửi khi chốt — null nếu chưa dịch chuyển gì đáng kể. */
  op: Op | null;
  /** Tường vừa được align tới (đổ guide/highlight). */
  alignWith?: string;
};

export type DragSession = {
  /** Id gửi trong presence.draggingIds (soft-lock). */
  ids: string[];
  /** Id các phần tử SVG cần tịnh tiến khi preview (tường kéo theo cửa trên nó). */
  previewIds: string[];
  update(cursor: Point, opts: SnapOpts): DragState;
  /** Chốt bằng số gõ tay — null nếu số không áp được (âm, quá dài tường…). */
  typed(value: number, opts: SnapOpts): DragState | null;
};

const fmt = (v: number): string => Math.round(v).toLocaleString("vi-VN");
const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));
const roundPt = ([x, y]: Point): Point => [Math.round(x), Math.round(y)];

/* ── Tường ─────────────────────────────────────────────────── */

export function wallDragSession(model: Project, wall: Wall, start: Point): DragSession {
  const n = wallNormal(wall);
  const pos0 = dot(wall.from, n);
  const siblings = model.walls
    .filter((w) => w.id !== wall.id && w.level === wall.level && wallsParallel(w, wall))
    .map((w) => ({ id: w.id, pos: dot(w.from, n) }));
  // neo HUD: tường song song gần nhất nhưng KHÔNG cùng tim (collinear thì không phải kích thước phòng)
  const anchor = siblings
    .filter((s) => Math.abs(s.pos - pos0) > wall.thickness)
    .reduce<{ id: string; pos: number } | null>(
      (best, s) => (!best || Math.abs(s.pos - pos0) < Math.abs(best.pos - pos0) ? s : best),
      null,
    );
  let lastT = 0;

  const stateAt = (t: number, alignWith?: string): DragState => {
    lastT = t;
    const delta = scale(n, t);
    const moved = Math.abs(t) >= 0.5;
    const op: Op | null = moved
      ? {
          op: "update", entity: "wall", id: wall.id,
          data: { from: roundPt(add(wall.from, delta)), to: roundPt(add(wall.to, delta)) },
        }
      : null;
    const hud: HudInfo = anchor
      ? { text: `→ ${anchor.id} · ${fmt(Math.abs(pos0 + t - anchor.pos))}`, typable: true }
      : { text: `Δ ${fmt(t)}`, typable: true };
    return { delta, hud, op, ...(alignWith ? { alignWith } : {}) };
  };

  return {
    ids: [wall.id],
    previewIds: [wall.id, ...model.openings.filter((x) => x.wall === wall.id).map((x) => x.id)],
    update(cursor, opts) {
      let t = dot(sub(cursor, start), n);
      let alignWith: string | undefined;
      if (!opts.noSnap) {
        const pos = pos0 + t;
        let best: { id: string; pos: number } | null = null;
        for (const s of siblings) {
          if (Math.abs(pos - s.pos) <= opts.tol && (!best || Math.abs(pos - s.pos) < Math.abs(pos - best.pos))) best = s;
        }
        if (best) {
          t = best.pos - pos0;
          alignWith = best.id;
        } else if (opts.grid > 0) {
          t = Math.round(pos / opts.grid) * opts.grid - pos0;
        }
      }
      return stateAt(t, alignWith);
    },
    typed(value) {
      if (!Number.isFinite(value) || value < 0) return null;
      if (anchor) {
        const side = Math.sign(pos0 + lastT - anchor.pos) || Math.sign(pos0 - anchor.pos) || 1;
        return stateAt(anchor.pos + side * value - pos0);
      }
      return stateAt((Math.sign(lastT) || 1) * value);
    },
  };
}

/* ── Cửa / cửa sổ ──────────────────────────────────────────── */

export function openingDragSession(_model: Project, wall: Wall, o: Opening, start: Point): DragSession {
  const d = wallDir(wall);
  const len = wallLength(wall);
  const freedom = Math.max(0, len - o.width);
  // điểm nắm trong ô chờ — giữ nguyên để cửa không "nhảy" về con trỏ
  const grab = clamp(dot(sub(start, wall.from), d) - o.offset, 0, o.width);
  let lastOff = o.offset;

  const stateAt = (off: number): DragState => {
    lastOff = off;
    const L = off;
    const R = freedom - off;
    const moved = Math.abs(off - o.offset) >= 0.5;
    return {
      delta: scale(d, off - o.offset),
      hud: { text: `◁ ${fmt(L)} · ${fmt(R)} ▷`, typable: true },
      op: moved ? { op: "update", entity: "opening", id: o.id, data: { offset: Math.round(off) } } : null,
    };
  };

  return {
    ids: [o.id],
    previewIds: [o.id],
    update(cursor, opts) {
      const u = dot(sub(cursor, wall.from), d);
      let off = clamp(u - grab, 0, freedom);
      if (!opts.noSnap && opts.grid > 0 && freedom > 0) {
        // hai mốc cạnh tranh: khoảng cách đầu trái / đầu phải tròn lưới — lấy mốc gần con trỏ hơn
        const byL = clamp(Math.round(off / opts.grid) * opts.grid, 0, freedom);
        const byR = clamp(freedom - Math.round((freedom - off) / opts.grid) * opts.grid, 0, freedom);
        off = Math.abs(byL - off) <= Math.abs(byR - off) ? byL : byR;
      }
      return stateAt(off);
    },
    typed(value) {
      if (!Number.isFinite(value) || value < 0 || value > freedom) return null;
      // số gõ áp cho đầu GẦN hơn ở vị trí hiện tại
      const nearLeft = lastOff <= freedom - lastOff;
      return stateAt(nearLeft ? value : freedom - value);
    },
  };
}

/* ── Nội thất ──────────────────────────────────────────────── */

/** Trong tầm này (mm) thì HUD hiện khe hở tới tường + gõ số được. */
const NEAR_WALL = 600;

type WallAnchor = { wallId: string; face: number; out: Point; n: Point };

export function furnitureDragSession(model: Project, f: Furniture, start: Point): DragSession {
  const asset = getAsset(f.asset);
  const walls = model.walls.filter((w) => w.level === f.level);
  let lastAt: Point = f.at;
  let lastAnchor: WallAnchor | null = null;

  const nearestFace = (at: Point): { a: WallAnchor; gap: number } | null => {
    if (!asset) return null;
    const corners = obbCorners({ center: at, halfW: asset.footprint.w / 2, halfD: asset.footprint.d / 2, rotation: f.rotation });
    let best: { a: WallAnchor; gap: number } | null = null;
    for (const w of walls) {
      const n = wallNormal(w);
      const d = wallDir(w);
      const s0 = dot(w.from, d);
      const s1 = dot(w.to, d);
      const [lo, hi] = [Math.min(s0, s1), Math.max(s0, s1)];
      const projD = corners.map((c) => dot(c, d));
      if (Math.max(...projD) < lo || Math.min(...projD) > hi) continue; // không đối diện tường
      const pos = dot(w.from, n);
      const projN = corners.map((c) => dot(c, n));
      const [nLo, nHi] = [Math.min(...projN), Math.max(...projN)];
      for (const side of [1, -1] as const) {
        const face = pos + (side * w.thickness) / 2;
        // khe hở từ mép footprint tới mặt tường, phía `side` của tường
        const gap = side === 1 ? nLo - face : face - nHi;
        const a: WallAnchor = { wallId: w.id, face, out: scale(n, side), n };
        if (gap > -w.thickness && (!best || Math.abs(gap) < Math.abs(best.gap))) best = { a, gap };
      }
    }
    return best;
  };

  const stateAt = (at: Point, anchor: WallAnchor | null, aligned: boolean): DragState => {
    lastAt = at;
    lastAnchor = anchor;
    const gapInfo = anchor && asset ? nearestGapTo(at) : null;
    const moved = Math.abs(at[0] - f.at[0]) >= 0.5 || Math.abs(at[1] - f.at[1]) >= 0.5;
    const hud: HudInfo = gapInfo
      ? { text: `khe → ${gapInfo.a.wallId} · ${fmt(Math.max(0, gapInfo.gap))}`, typable: true }
      : { text: `${fmt(at[0])}, ${fmt(at[1])}`, typable: false };
    return {
      delta: sub(at, f.at),
      hud,
      op: moved ? { op: "update", entity: "furniture", id: f.id, data: { at: roundPt(at) } } : null,
      ...(aligned && anchor ? { alignWith: anchor.wallId } : {}),
    };
  };

  const nearestGapTo = (at: Point): { a: WallAnchor; gap: number } | null => {
    const hit = nearestFace(at);
    return hit && hit.gap <= NEAR_WALL ? hit : null;
  };

  return {
    ids: [f.id],
    previewIds: [f.id],
    update(cursor, opts) {
      let at = add(f.at, sub(cursor, start));
      if (!opts.noSnap && opts.grid > 0) at = [Math.round(at[0] / opts.grid) * opts.grid, Math.round(at[1] / opts.grid) * opts.grid];
      let aligned = false;
      let anchor: WallAnchor | null = null;
      if (!opts.noSnap) {
        const hit = nearestFace(at);
        if (hit) {
          anchor = hit.a;
          if (Math.abs(hit.gap) <= opts.tol) {
            at = add(at, scale(hit.a.out, -hit.gap)); // hít sát mặt tường (khe = 0)
            aligned = true;
          }
        }
      }
      return stateAt(at, anchor ?? nearestGapTo(at)?.a ?? null, aligned);
    },
    typed(value) {
      if (!Number.isFinite(value) || value < 0) return null;
      const hit = nearestFace(lastAt);
      const anchor = hit ? hit.a : lastAnchor;
      if (!hit || !anchor) return null;
      // đặt khe hở ĐÚNG value dọc pháp tuyến tường, giữ vị trí dọc tường
      const at = add(lastAt, scale(anchor.out, value - hit.gap));
      return stateAt(at, anchor, true);
    },
  };
}
