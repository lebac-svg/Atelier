🇻🇳 [Bản gốc tiếng Việt](../11-quyet-dinh-mo.md) — translated from the Vietnamese original, which is authoritative if they differ.

# 11 — Architecture decisions (ADRs) & open questions

## Decisions settled in the spec (ADRs)

| # | Decision | Main rationale | Accepted consequence |
|---|---|---|---|
| ADR-01 | **Own renderer + Three.js in the browser**, not built on the existing Blender/SketchUp MCPs | The two-way live editor is the core value — those tools can't provide it, and they drag in heavy installs | More code to write ourselves; Blender remains only an *optional* pretty-render pipeline (P5+) |
| ADR-02 | **One Node process** serving both MCP (stdio) and HTTP/WebSocket | A single source of state, no cross-synchronization | If the server dies, both faces die — acceptable for a local app |
| ADR-03 | **TypeScript monorepo** (core/server/web/assets) | Geometry + ops shared between server ↔ browser in the literal sense; matches the stack you already use | DXF/IFC might need a Python sidecar later |
| ADR-04 | **mm, integers** for all dimensions | Construction-industry convention; no accumulating float errors | Scaled coordinates exist only in the render layer |
| ADR-05 | **Openings anchored relative to their wall** | "A door is always on a wall" becomes true-by-construction; move the wall and the door follows for free | Corner/two-wall openings can't be represented (rare, accepted) |
| ADR-06 | **Room = declared polygon** (v1), auto-traced from walls in v2 | Simple, deterministic, enough for the validator + room labels | Editing walls means updating room polygons too (Claude/editor's job) |
| ADR-07 | **`apply_ops` is the single mutation gate** + optimistic revisions + no "replace whole model" op | Transactions, validation and broadcast in one place; hand edits can never be steamrolled | Large operations = many ops in 1 transaction |
| ADR-08 | **SVG-first**; PDF via Chromium; DXF/IFC deferred to P4. *Settled in P4 (2026-07-13): DXF written in **pure TS** from the same SceneGraph — no Python `ezdxf` sidecar; IFC stays on the backlog* | Value ships early; SVG is testable/diffable/clickable; one primitive source means SVG/DXF can never diverge; no extra runtime dependency | DXF is minimal AC1021 (opens and measures in CAD; no native linetypes/dimstyles yet); IFC users must wait |
| ADR-09 | **Rules are data** (`rules/*.json`) with a `source` + `verified` flag | Change numbers without changing code; citable sources; unverified numbers auto-caption the drawings | Requires a serious standards-research task in P1 |
| ADR-10 | **Schema keys in English, labels/UI in Vietnamese** | LLMs and the tool ecosystem work best with EN keys; users only ever see Vietnamese | Lightweight bilingual schema docs |

To revisit any ADR, note it directly in this table during review.

## Open questions — ✅ all settled (2026-07-13)

| # | Question | Decision |
|---|---|---|
| Q1 | **Project name?** | ✅ **Atelier** — "design workshop" (2026-07-13) |
| Q2 | **Priority v1 user:** homeowners exploring on their own, or architects making concepts? (drives UI tone + documentation depth) | ✅ **Homeowners** — a wide market with thin competition; architects benefit along the way |
| Q3 | **Confirm the non-goal:** no legal/structural/MEP documents in v1; positioning as a "concept + visualization assistant"? | ✅ Confirmed — legally safe, matches actual capability |
| Q4 | **Lỗ Ban ruler:** ask on/off during the interview phase, always on, or off by default? | ✅ **Ask in phase A** — those who care about feng shui will treasure it; those who don't get zero noise |
| Q5 | **First demo typology?** | ✅ **4×16m tube house, 2 floors, 3 bedrooms** — the most common in Vietnam |
| Q6 | **v1 templates:** tube house only (one type done deeply) or also single-storey houses? | ✅ **Tube house** only — depth over breadth. **→ Superseded 14 Jul 2026:** multi-typology/multi-region expansion, see [doc 12](12-typology-expansion.md) |
| Q7 | **Open-source the code?** | ✅ Private while building; consider open-sourcing after P3. **Settled 2026-07-13 (after P5 + 3 backlog items): OPEN-SOURCE** — MIT at [github.com/lebac-svg/Atelier](https://github.com/lebac-svg/Atelier); fonts OFL 1.1, catalog CC0, standards data cites a source per rule |
| Q8 | **After approval:** `git init` + commit the docs set, then go straight to P1? | ✅ Yes — each completed phase is a commit milestone |

## How to review this spec

1. Minimum reading: `01` (positioning) → `02` (process) → `04` (schema) → `09` (editor). The remaining docs are technical detail — skim if you trust them.
2. Mark each doc: OK / what needs changing.
3. Answer Q1–Q8 (a single combined message is enough).
4. Once approved → start **P1: Engine + static drawings**.

> ✅ **Review completed 2026-07-13.** Q1–Q8 answered (table above) — P0 closed, moving to P1.
