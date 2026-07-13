🇻🇳 [Bản gốc tiếng Việt](../01-tam-nhin.md) — translated from the Vietnamese original, which is authoritative if they differ.

# 01 — Vision & Positioning

## One sentence

Atelier turns Claude Code into a house-design workshop: needs interview → symbol-correct floor plans → furnished 3D → a drawing set, all displayed and editable **live** in the browser.

## Target users

- **Primary (v1):** Vietnamese homeowners preparing to build a townhouse / tube house — they want to explore design variants themselves, see furnished 3D, and understand their future home before meeting an architect or builder.
- **Secondary:** architects / drafters — as a rapid concept tool, exporting IFC/DXF to professional software for further work.

(Priority to be settled — question Q2 in `11-decisions.md`.)

## The problem

- Homeowners cannot read dry technical drawings; they want to **see** the house and **try** changes, but cannot handle AutoCAD/SketchUp.
- Architects spend many hours on the first concept design, 80% of which will be revised anyway.
- Existing AI tools either generate **images** (pretty but uneditable, no real dimensions) or drive heavyweight desktop software (Revit, SketchUp, Blender) that must be installed — and **none offer a real-time hand-editing loop**.

## Non-goals (v1 — deliberately NOT doing)

| Not doing | Reason / alternative |
|---|---|
| Replacing permit documents or construction documents signed by a licensed architect | The law requires a professional license. Positioning: **concept assistant + visualization + discussion drawings**; export IFC/DXF to hand off to a real architect |
| Structural, electrical, plumbing (MEP) | Architecture + interiors only in v1 |
| Photorealistic rendering | P5+ at the earliest, via a glTF → Blender pipeline |
| Mobile editor | Desktop first |
| Recognizing old floor-plan photos → model | A hard, separate problem; distant backlog |

## Competitive landscape (surveyed 07/2026)

| Competitor | Strengths | What Atelier has that they lack |
|---|---|---|
| [Revit Public MCP (Autodesk, 6/2026)](https://www.autodesk.com/blogs/aec/2026/06/17/revit-public-mcp-server/), [Revit 2027 built-in MCP](https://blog.bimsmith.com/Revit-2027-What-the-Built-In-MCP-Server-Actually-Does-in-Practice) | Professional BIM, real data | Needs an expensive license + Windows + Revit skills; no live browser editing; no Vietnamese standards |
| [Official SketchUp MCP](https://www.engineering.com/now-sketchup-has-an-mcp-server-for-claude-based-3d-modeling/) | Builds geometry from descriptions + images | Outputs static .skp files, no two-way editing loop |
| [Blender MCP](https://3d-agent.com/mcp/claude-mcp) | Strong 3D + assets, popular | Not an architecture tool; 2D drawings essentially absent |
| [Bonsai-mcp (BIM/IFC)](https://skywork.ai/skypage/en/bonsai-bim-mcp-server-ai-engineers/1977930280347308032) | Open-source IFC | Oriented to querying/analyzing existing models rather than designing new ones |
| [architecture-mcp](https://github.com/sceneview-tools/architecture-mcp) | Closest in spirit: plans from descriptions, SVG, compliance | **Static one-way SVG** — no editor, no furnished 3D, no Vietnamese standards |

## 4 differentiators (reasons to exist)

1. **A live two-way editor synchronized with the agent** — the house grows on screen as Claude designs it; when the user drags a wall, Claude knows and reacts. Nobody has done this part properly.
2. **Vietnamese standards as first-class citizens** — drawing symbols per TCVN, dimensional rules per TCVN 4451/QCVN, and the **Lỗ Ban ruler** (feng-shui measuring ruler — no Western tool has it).
3. **Vietnamese housing typologies + irregular lots from day 1** — 4×16 and 5×18 tube houses, single-storey homes…; the lot boundary is an arbitrary polygon because irregular lots are commonplace in Vietnam.
4. **One source of truth → 2D and 3D never drift apart** — edit one wall and the floor plan, the 3D and the dims all update together.

## Measure of success (the canonical demo)

> In ~60 seconds: describe *"4×16m tube house, 2 floors, 3 bedrooms, parking for 2 motorbikes"* → a two-storey plan with correct symbols grows live in the browser → the user drags the living-room wall wider, types `4200` → dims update, Claude notices and adapts the adjacent room → switch to 3D and walk (WASD) through the furnished house.

When this demo runs smoothly, the project has proven its core value.
