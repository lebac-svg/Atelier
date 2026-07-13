🇻🇳 [Bản gốc tiếng Việt](../05-mcp-tools.md) — translated from the Vietnamese original, which is authoritative if they differ.

# 05 — MCP tools

Principle: **few tools, each dependable**. A single mutation gate (`apply_ops`) so that every change is a transaction with validation + revision check + broadcast. All other tools read, look, or export.

Each tool's description embeds behavioural rules for Claude — e.g. `apply_ops` states *"always call `get_changes_since` first if you haven't read the model in a while; never overwrite the user's changes"* — because the tool description **is** the prompt.

## The list

| # | Tool | Signature (abridged) | Returns |
|---|---|---|---|
| 1 | `project_new` | `(name, template?, siteBoundary?)` | initial model + revision |
| 2 | `project_open` | `(path)` | meta + current revision |
| 3 | `model_query` | `(select?: {entity?, ids?, level?}, computed?)` | the slice of the model matching the filter (+ areas, statistics when `computed`) |
| 4 | `apply_ops` | `(baseRevision, ops[], note?)` | `{ok, revision, warnings}` or `{ok:false, errors}` |
| 5 | `get_changes_since` | `(revision)` | ops from that point to now + **plain-text summary** + current revision |
| 6 | `validate` | `(scope?: level \| entityIds)` | list of issues by rule (doc 07) |
| 7 | `render_plan` | `(level, {scale?, layers?})` | **PNG image** returned straight to Claude + SVG path |
| 8 | `capture_view` | `(target: "3d"\|"plan", camera?)` | **PNG image** — the open browser captures its canvas and sends it back |
| 9 | `editor_open` | `()` | URL + opens the default browser |
| 10 | `export` | `(format: "pdf"\|"svg"\|"dxf"\|"gltf"\|"ifc", sheets?)` | file paths under `.atelier/exports/` |
| 11 | `assets_search` | `(query, category?, maxFootprint?)` | ✅ P5 — asset list (id, Vietnamese name, footprint, clearances) + ONE contact-sheet thumbnail image |
| 12 | `brief_get` / `brief_set` | `() / (patch)` | the current brief |
| 13 | `standards_lookup` | `(query)` | rule + figures + cited source (so Claude can answer "why must it be ≥900?") |
| 14 | `estimate_cost` | `(muc?: "co-ban"\|"trung-binh-kha"\|"cao-cap")` | ✅ 2026-07-13 — converted areas + quantities from the model × the price table `rules/don-gia.json` (user-editable), auto-checked against the brief's budget; ships with an `estimate` sheet (KT-06) in the export set |
| 15 | `history_restore` | `(revision)` | ⚠ only when the user explicitly asks |
| 16 | `render_view` | `(kind: "elevation"\|"section", scale?)` | **PNG image** of the front elevation / section A-A — added in P4 so Claude can inspect its own work before checkpoint E |
| 17 | `variant_save` | `(name)` | ✅ 2026-07-13 — snapshots the model as a named design variant (A/B) |
| 18 | `variant_open` | `(slug)` | checks out a variant (⚠ save the current one first if you want to keep it); revision keeps increasing monotonically |
| 19 | `variant_compare` | `(a?, b?, level?)` | **PNG image** of 2 floor plans side by side + per-room m² diff + per-variant cost estimate; interactive version at `/so-sanh` |

`export` was unlocked in P4 with `pdf` (one multi-page A3 file) / `svg` / `dxf` (pure TS, see ADR-08); `gltf` waits for P5, `ifc` sits in the backlog.

## The ops vocabulary (shared by MCP and the web editor)

```ts
type Op =
  | { op: "add";    entity: EntityKind; data: object }         // data carries a client-generated id
  | { op: "update"; entity: EntityKind; id: string; data: object }  // shallow-merge patch
  | { op: "delete"; entity: EntityKind; id: string };

type EntityKind = "level" | "wall" | "opening" | "slab" | "stair"
                | "room" | "furniture" | "axis" | "style" | "finish";
```

- One `apply_ops` call = **one transaction**: all ops apply together or roll back together.
- `baseRevision` must equal the server's current revision — a mismatch is rejected (see `06-sync-protocol.md`).
- Deleting a wall → the openings anchored to it are deleted automatically (cascade, handled by the server).
- **There is no "replace the whole model" op** — so the user's hand edits can never be bulldozed. Starting over is what `project_new` is for.

## Error results (uniform shape)

```jsonc
{
  "ok": false,
  "currentRevision": 43,
  "errors": [
    { "rule": "GEO-01", "severity": "block",
      "entities": ["D2", "W7"],
      "message": "Cửa D2 (rộng 900, offset 2800) vượt ra ngoài tường W7 (dài 3400)." }
      // ("Door D2 (width 900, offset 2800) extends beyond wall W7 (length 3400).")
  ]
}
```

A `block`-level error → the transaction is cancelled; Claude reads the message, fixes it itself and resubmits. Levels `error/warn/info` do not block the write — they come back in `warnings` (see the policy in `07-validator-rules.md`).

## Example of one working beat

```jsonc
// Claude adds a bedroom: 1 partition wall + 1 door — ONE transaction
apply_ops(42, [
  { "op": "add", "entity": "wall",
    "data": { "id": "W9", "level": "L2", "from": [0,9800], "to": [4000,9800],
              "thickness": 110, "kind": "gach" } },
  { "op": "add", "entity": "opening",
    "data": { "id": "D5", "wall": "W9", "kind": "door", "style": "D2",
              "offset": 300, "width": 800, "height": 2200, "sill": 0, "swing": "in-R" } }
], "Ngăn phòng ngủ 2, mở cửa ra hành lang")  // ("Partition bedroom 2, open a door to the hallway")
// → { ok: true, revision: 43, warnings: [ { rule: "LBB-01", severity: "info",
//      message: "Thông thủy cửa D5 (760mm) chưa rơi cung đẹp thước Lỗ Ban; gần nhất: 810mm." } ] }
//      ("Door D5's clear width (760mm) does not land on an auspicious Lỗ Ban segment; nearest: 810mm.")
// → every open browser sees the wall + door appear IMMEDIATELY
```

## The companion skill (recap from doc 02)

The 5-phase process + how to use the tools is packaged in `.claude/skills/thiet-ke-nha/` — Claude Code in this repo always designs in the proper order: interview → brief → approval → blocks → walls → validate → render → invite the user to look.
