# atelier-mcp

An AI architect that lives inside your MCP client (Claude Code, Claude Desktop, …) — for **Vietnamese tube houses**: floor plans with proper TCVN symbols, a live two-way browser editor (drag walls, type exact mm), furnished 3D walkthrough, sun study, rough cost estimate, and a numbered A3 PDF / DXF / glTF / IFC documentation set.

Bản gốc tiếng Việt + toàn bộ tài liệu thiết kế: [github.com/lebac-svg/Atelier](https://github.com/lebac-svg/Atelier)

## Install

```bash
cd my-house            # one folder = one house (the model lives here)
claude mcp add atelier -- npx -y atelier-mcp
```

That's it. Open Claude Code in that folder and say *"design me a 4×16m tube house, 2 floors, 3 bedrooms"*.

Optional, for PNG/PDF export (first time only):

```bash
npx playwright install chromium
```

Claude Desktop — add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "atelier": {
      "command": "npx",
      "args": ["-y", "atelier-mcp"],
      "env": { "ATELIER_DIR": "C:\\path\\to\\my-house" }
    }
  }
}
```

## What you get

- **18 MCP tools** — one parametric model as the single source of truth; every change is a validated transaction (geometry + Vietnamese building standards + optional Lỗ Ban + local zoning declared in the brief).
- **Live editor** — `editor_open` starts a browser editor in the same process: everything the agent builds appears in 2D (true drafting symbols) and 3D instantly; you drag walls back, type `4200 ⏎` for exact millimetres, and the agent adapts. The user always wins (soft-locks).
- **Deliverables** — numbered sheet set KT-01…: dimensioned plans, front elevation, section through the stair, schedules, cost estimate → multi-page A3 PDF, DXF (true mm, opens in CAD), SVG, GLB (Blender-ready), concept IFC4.
- **Trace old plans** — `underlay_import` places an old DXF or a photo under the plan to rebuild from; `underlay_trace` proposes walls from the linework.

Local prices: drop a `rules/don-gia.json` in your house folder to override the packaged cost table.

Concept-level design — not construction documents (no structure/MEP, no permit drawings).

## Env

| Variable | Default | Meaning |
|---|---|---|
| `ATELIER_DIR` | current folder | where `atelier.project.json` + `.atelier/` live |
| `ATELIER_PORT` | 4823 | live editor port (busy → tries +1…+9) |
| `ATELIER_HOST` | 127.0.0.1 | set `0.0.0.0` to open the editor/share links to your LAN |

MIT © [lebac-svg](https://github.com/lebac-svg/Atelier)
