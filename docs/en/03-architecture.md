🇻🇳 [Bản gốc tiếng Việt](../03-kien-truc-he-thong.md) — translated from the Vietnamese original, which is authoritative if they differ.

# 03 — System Architecture

## Overview diagram

```
┌─────────────┐   MCP (stdio)   ┌──────────────────────────────────┐
│ Claude Code  │◄───────────────►│        atelier-server (Node)        │
│  + skill      │                │  ONE single process               │
│  thiet-ke-nha │                │  ┌─────────────────────────────┐ │
└─────────────┘                │  │ Model store (JSON + revision)│ │
                                │  │ Validator (TCVN, GEO rules)  │ │
                                │  │ 2D renderer (SVG → PNG/PDF)  │ │
                                │  │ Geometry core (shared)       │ │
                                │  │ History log (ops journal)    │ │
                                │  └─────────────────────────────┘ │
                                │        HTTP + WebSocket           │
                                └───────────────┬──────────────────┘
                                                │ ws://localhost:<port>
                                ┌───────────────▼──────────────────┐
                                │   Web editor (browser)            │
                                │   • 2D floor plan (interactive SVG)│
                                │   • Three.js 3D + walkthrough     │
                                │   • Drag-and-drop, type numbers,  │
                                │     undo                          │
                                └──────────────────────────────────┘
```

**Principle #1: one process, one source of state.** The MCP server and the web server are the same Node process — there can never be two diverging copies of the model that need "cross-syncing".

## Components

| Component | Role | Notes |
|---|---|---|
| **Model store** | Holds the JSON model + a monotonically increasing `revision`; applies ops as transactions | The single source of truth |
| **Geometry core** | Shared geometry math: wall segments, room polygons, furniture footprints, door-void cutting | A separate package that runs on both server and browser |
| **Validator** | Runs the rule set after every ops batch; GEO errors → rollback, STD → reported | See `07-validator-rules.md` |
| **2D renderer** | Model → SVG with layers/symbols/dims; SVG → PNG (for Claude to look at), → PDF (documentation set) | See `08-2d-renderer.md` |
| **History log** | Ops journal (`.atelier/history.jsonl`) backing `get_changes_since`, undo, restore | |
| **Web editor** | The user's UI; every hand edit also becomes ops sent to the server | See `09-web-editor.md` |

## Data flow

**Claude edits the model:**
```
Claude ──apply_ops(baseRev, ops)──► server: validate ─┬─ GEO error → reject; Claude reads the error and self-corrects
                                                      └─ OK → apply, rev++, write journal
                                                             ──patch──► broadcast to every open browser
```
→ "the house grows on screen as it is designed": every successful tool call is one visible update beat.

**The user drags a wall:**
```
Browser ──ops(origin:user)──► server (validate, apply, rev++) ──patch──► other browsers (if any)
Claude (next turn) ──get_changes_since(old rev)──► "the user moved wall W12 to x=4200"
```

**Claude "looks":**
```
Claude ──capture_view("3d")──► server ──capture_request──► browser screenshots the canvas ──PNG──► Claude
```
Claude sees **exactly what the user is seeing**. If no browser is open: fall back to server-side rendering (2D always available; headless 3D deferred to a later phase).

## Files on disk (inside the user's house-project repo)

```
my-house/
├── atelier.project.json    # parametric model — SOURCE OF TRUTH, committed to git
├── .atelier/
│   ├── history.jsonl     # ops journal (append-only)
│   └── exports/          # exported PDF/SVG/DXF/glTF
```

The model is a JSON file inside a repo → **git versioning for free** (each approval checkpoint = one commit), Claude Code can read the file directly when needed, and future A/B comparison is just comparing two revisions/branches.

## Stack & rationale

| Layer | Choice | Why |
|---|---|---|
| Language | TypeScript throughout (pnpm monorepo) | One language for server + web + shared geometry; matches the author's existing stack (rong-choi) |
| MCP server | `@modelcontextprotocol/sdk` (stdio) | The official standard |
| Web server | Fastify or Hono + `ws` | Lightweight, same process |
| 3D | Three.js (+ `three-bvh-csg` for door voids) | Popular, strong enough for townhouse scale |
| 2D | Hand-generated SVG (no drawing lib) | Absolute control of TCVN symbols/line weights; per-entity `data-id` for click-selection |
| PNG/PDF | Headless Chromium (Playwright) | One tool for capture, PNG and true-to-paper PDF printing |
| Testing | Vitest + golden SVG snapshots + fast-check; Playwright e2e | The renderer and geometry must have golden tests |

Monorepo layout:

```
atelier/
├── packages/
│   ├── core/      # schema, geometry, validator, ops — pure, no I/O
│   ├── server/    # MCP + HTTP/WS + renderer + journal
│   ├── web/       # editor (Vite + Three.js)
│   └── assets/    # furniture catalog + glTF normalization pipeline
├── docs/
└── .claude/skills/thiet-ke-nha/
```

## Security & runtime scope

v1 runs locally: the server binds `localhost`, no auth. Only when share links for other viewers arrive (v2) will a token + read-only mode be added.

## Why not build on the existing Blender/SketchUp MCPs

The two-way live browser editor is the core value — Blender/SketchUp cannot provide it, and they drag in heavyweight installs. Three.js in the browser + a self-owned SVG renderer gives 100% control of the experience and the drawing symbols. Blender remains only an *optional* role at P5+: exporting glTF for photorealistic rendering. (ADR-01 in `11-decisions.md`.)
