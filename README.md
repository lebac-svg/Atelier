**English** · 🇻🇳 [Tiếng Việt](README.vi.md)

# Atelier 📐

[![CI](https://github.com/lebac-svg/Atelier/actions/workflows/ci.yml/badge.svg)](https://github.com/lebac-svg/Atelier/actions/workflows/ci.yml) [![npm](https://img.shields.io/npm/v/atelier-mcp)](https://www.npmjs.com/package/atelier-mcp)

**An AI architect that plugs into any MCP client** — Claude Code, Codex CLI, Gemini CLI, Claude Desktop, Cursor… From a spoken description to standards-compliant floor plans and a furnished 3D model, with a live browser editor you can edit by hand while the AI works.

Built for the **Vietnamese tube house** (nhà ống): TCVN drawing symbols, Vietnamese dimensional rules, Lỗ Ban feng-shui rulers, irregular lot polygons — things no Western tool ships as first-class citizens. The editor UI is bilingual and auto-detects by country: Vietnamese in Vietnam, English elsewhere (timezone + browser language — no geo-IP; the **VI/EN** button overrides and is remembered). Exported drawings stay Vietnamese by design: they are TCVN documents.

> **Atelier** /ˌætəlˈjeɪ/ — "design workshop".

| Standards-compliant plan, 3-chain dims | First-person walkthrough (WASD) | A/B design comparison |
|---|---|---|
| ![Floor plan](docs/images/mat-bang-l1.png) | ![3D walkthrough](docs/images/di-bo-3d.png) | ![A/B comparison](docs/images/so-sanh-phuong-an.png) |

## Core idea

**One parametric model (JSON) is the single source of truth.** Claude edits it through MCP tools; humans edit it directly in the web editor (drag, type exact numbers); both sync in real time over WebSocket. A deterministic renderer generates symbol-correct 2D drawings and the furnished 3D model from the same source — so 2D and 3D can never drift apart, and drawing symbols are always correct because the AI never draws them.

```
Claude Code ──MCP──► Server (model + validator + renderer) ◄──WebSocket──► Browser (live editor)
```

## Install (30 seconds)

You don't clone anything — Atelier ships as an npm package ([`atelier-mcp`](https://www.npmjs.com/package/atelier-mcp)), and it's a **standard MCP server**, so it is not tied to Claude: any MCP client can run it. The server is always the same one command — `npx -y atelier-mcp` — only the registration step differs per client.

Stand in your own house folder (one folder = one house) and register with YOUR client:

```bash
mkdir my-house && cd my-house

# Claude Code
claude mcp add atelier -- npx -y atelier-mcp

# OpenAI Codex CLI
codex mcp add atelier -- npx -y atelier-mcp

# Gemini CLI
gemini mcp add atelier npx -y atelier-mcp

npx playwright install chromium   # optional, once — PNG/PDF export
```

GUI clients (Claude Desktop, Cursor, …) have no "current folder" — point `ATELIER_DIR` at your house folder in their MCP config JSON:

```json
{ "mcpServers": { "atelier": {
    "command": "npx", "args": ["-y", "atelier-mcp"],
    "env": { "ATELIER_DIR": "C:\\path\\to\\my-house" } } } }
```

Then start your agent and say *"design me a 4×16m tube house"*. Works best with a model that reads Vietnamese well (tool descriptions and validator messages are Vietnamese-first) and a client that shows images from tool results — the agent inspects its own drawings.

## From source (contributors)

```bash
pnpm install
npx playwright install chromium   # PNG/PDF rendering + demos
pnpm build:web
pnpm demo:p5                      # the 60-second demo: live build → drag a wall,
                                  # type 4200 → walk through the house in 3D
```

The repo ships a ready `.mcp.json` — open Claude Code in this folder and it registers the `atelier` server from source. `pnpm build:cli` builds the npm package (`packages/cli`, single-file bundle + web editor + fonts; verify with `npx tsx packages/cli/smoke.mts <installed-pkg-path>`).

## What's the "60-second demo"?

The project's definition of success (doc 01), and it runs end-to-end (`pnpm demo:p5`):

> Describe *"4×16m tube house, 2 floors, 3 bedrooms, parking for 2 motorbikes"* → a two-storey plan with correct symbols grows live in the browser → the user grabs a wall, types `4200 ⏎` → dims update, Claude notices the change and adapts the adjacent rooms → switch to 3D and walk (WASD) through the furnished house.

## Status — roadmap complete

All six phases (P0–P5) plus the first three backlog items shipped:

| Phase | Delivered | Demo |
|---|---|---|
| **P1 — Engine + static drawings** | Parametric model, 22-rule validator with sources checked against **TCVN 13967:2024**, SVG/PNG plan renderer (symbols + 3-chain dims), 7 MCP tools, design-process skill | `demo:p1` |
| **P2 — One-way live** | `editor_open` launches the browser editor (Vite + Three.js) in the same process; every `apply_ops` appears instantly in 2D (server-rendered SVG) and 3D (incremental maquette); `capture_view` lets Claude see exactly what the user sees | `demo:p2` |
| **P3 — Hand editing** | Drag walls/doors/furniture with a **type-a-number HUD** (drag, type `4200 ⏎` → exactly 4200mm), snapping, per-origin undo, **soft-locks** ("the user always wins" — agent writes on a user-held entity are rejected), editable properties panel, `get_changes_since` with old → new summaries | `demo:p3` |
| **P4 — Documentation set** | Numbered sheet set KT-01…: floor plans (clear-dimension interior dims, section mark), **front elevation**, **section A-A through the stair** (poché, door voids, step profile), room & door schedules; export **multi-page A3 PDF**, **DXF** (pure TS, true mm — measurable in CAD), SVG | `demo:p4` |
| **P5 — Furniture & experience** | **106-asset catalog** (true mm sizes, clearances, CC0 parametric geometry + license manifest), per-category 3D builders, floor finishes, catalog panel in the editor, **WASD walkthrough** (pointer lock, 1600mm eye height), **sun study** (hour/month sliders, real shadows from latitude + site orientation), `assets_search` with a visual contact sheet | `demo:p5` |

**Backlog shipped:** rough **cost estimate** (`estimate_cost` + a KT-06 sheet: converted areas × an editable local price table, auto-checked against the interview budget) · **view-only share links** (`/xem/<token>`, server-enforced read-only — send it to your spouse) · **A/B design comparison** (`variant_save/open/compare`, two plans side by side with per-room m² and per-variant cost deltas) · **local zoning rule pack** (PLN-01…06: setbacks for any lot shape, density, floors, height, canopy overhang — checks only what the interview brief declares) · **IFC4 export** (`export ifc`, pure-TS STEP writer: walls with proper opening voids/fills, slabs with real holes, stairs, rooms as IfcSpace — concept-level handover, not construction documents) · **photoreal path** (`export gltf` → one GLB in true metres, one node per entity, plus `scripts/render-photoreal.py` for headless-Blender Cycles renders using the same sun model as the editor's sun study) · **legacy plan import** (`underlay_import` traces an old DXF or plan photo as a dim layer under the live plan — scale from DXF units or a 2-point calibration; `underlay_trace` proposes walls from parallel stroke pairs, always human-reviewed before applying).

**Bilingual:** English README + full English design docs (`docs/en/`) + bilingual editor UI auto-detected by country (VN → vi, elsewhere → en; asset catalog included). Out of scope by design: structure & MEP (this is a concept tool, not construction documents).

## Design docs

The full spec lives in [`docs/en/`](docs/en/) (English) with the Vietnamese originals in [`docs/`](docs/) — each file cross-links its counterpart; the Vietnamese original is authoritative if they differ:

| # | Doc | Contents |
|---|---|---|
| 01 | [Vision & positioning](docs/en/01-vision.md) | Users, non-goals, competitive landscape, differentiators |
| 02 | [Design process](docs/en/02-design-process.md) | Interview → brief → 5 phases with approval checkpoints |
| 03 | [System architecture](docs/en/03-architecture.md) | Dual-client, single process, data flow |
| 04 | [Data schema](docs/en/04-data-schema.md) | Parametric model: walls, openings, rooms, stairs, furniture |
| 05 | [MCP tools](docs/en/05-mcp-tools.md) | 19 tools + the ops vocabulary |
| 06 | [Sync protocol](docs/en/06-sync-protocol.md) | WebSocket, revisions, conflicts, undo |
| 07 | [Validator & rules](docs/en/07-validator-rules.md) | TCVN rules + geometry + Lỗ Ban rulers |
| 08 | [2D renderer](docs/en/08-2d-renderer.md) | Layers, line weights, symbols, dims, title block |
| 09 | [Web editor](docs/en/09-web-editor.md) | Hand-editing UX: drag, type numbers, 3D, walkthrough |
| 10 | [Roadmap](docs/en/10-roadmap.md) | 6 phases with Definitions of Done + backlog |
| 11 | [Decisions](docs/en/11-decisions.md) | 10 ADRs + 8 settled questions |

## Stack

TypeScript monorepo — Node.js (MCP server + WebSocket), Three.js (3D), SVG (2D drawings), Vite (web editor), Vitest + Playwright (162 tests incl. real-browser e2e). Rationale in doc 03.

## Dev environment

The repo integrates **[haido](https://github.com/lebac-svg/haido)** — a code-anchored memory layer that served as the project's own long-term memory while Atelier was being built:

- `.mcp.json` → `haido serve` MCP server (recall / remember / related / overview / stale / reanchor)
- `.claude/settings.json` → hooks that feed project knowledge into every Claude Code session
- Local DB in `.haido/` (gitignored); shared knowledge ships as a **memory pack** in `docs/memory-pack/`

## License & disclaimer

- **Code:** [MIT](LICENSE). **Font** Be Vietnam Pro: SIL OFL 1.1 (`OFL.txt` next to the font files). **Furniture catalog** (parametric): CC0-1.0 (`packages/core/assets/license-manifest.json`).
- Standards data in `rules/*.json` cites TCVN/QCVN sources per rule; the price table `rules/don-gia.json` is **reference-only** — edit it for your region.
- ⚠ **Atelier outputs are concept drawings** — for thinking, discussing and working with an architect; they do **not** replace permit/construction documents signed by a licensed architect.

## The 5 invariants

1. **Claude never draws directly** — it only edits the parametric model; the renderer draws.
2. **Standard symbols live in the renderer** — encoded once per TCVN, correct 100% of the time.
3. **Every mutation goes through one gate** (`apply_ops`) — transaction, validation, broadcast.
4. **The user always wins** — hand edits are never overwritten by the AI.
5. **Claude must look before inviting the user to look** — validate + render + capture after every significant change.
