🇻🇳 [Bản gốc tiếng Việt](../08-renderer-2d.md) — translated from the Vietnamese original, which is authoritative if they differ.

# 08 — 2D renderer (drawings)

The renderer is **the keeper of the standards**: symbols, line weights and dims per construction-drawing convention are encoded once, here — Claude and the user never draw symbols by hand, so they can never be wrong.

## The paper-space principle

Geometry is drawn in real mm (model space); **text, symbols and line weights are specified in mm on paper** (paper space), then multiplied by the scale. E.g. dim text of 2.5mm on paper → 125mm in model space at 1:50. This way prints come out at true scale and drawings read like professional hand-drafted work.

- Default scale: **1:50** for a town-house floor plan on **landscape A3**; automatically drops to 1:100 when it doesn't fit.
- Line-weight set (paper mm): `0.13 / 0.18 / 0.25 / 0.35 / 0.50 / 0.70`.

## Layers & line weights

| Layer | Contents | Weight |
|---|---|---|
| `TRUC` | Grid lines + round numbered bubbles (1,2… / A,B…) | 0.13 dash-dot |
| `TUONG-CAT` | Walls cut by the section plane (conventional cut height +1200) | **0.50–0.70** + poché/hatch |
| `TUONG-THAY` | Visible edges below the cut plane (window sills, steps…) | 0.25 |
| `CUA` | Door/window symbols | 0.25 / leaf 0.35 |
| `THANG` | Steps, up arrow, zigzag break line | 0.25 |
| `NOI-THAT` | Furniture + sanitary fixtures (2D footprints from the catalog) | 0.13–0.18 |
| `DIM` | 3 dimension chains + interior dims | 0.13, 45° ticks |
| `TEXT` | Room names + areas, levels, notes | 0.13 |
| `HATCH` | Section material symbols | 0.13 |
| `KHUNG` | Drawing frame + title block | 0.35/0.70 |

## The symbol library (pre-built, parameterised)

- **Single-leaf door:** leaf line perpendicular to the wall + quarter arc showing the swing (per `swing`); double-leaf: two mirrored arcs; **sliding:** leaf line parallel to the wall + arrow.
- **Window:** cuts the wall, 3 parallel lines within the wall thickness (2 for light partitions); the sill shown on `TUONG-THAY`.
- **Stair:** step lines at true `tread` spacing, arrow from step 1 labelled "LÊN" ("UP"), step count, zigzag break line mid-flight (the convention for a plan cut through the stair).
- **Grid:** ⌀8mm-on-paper bubbles at both ends, number inside.
- **Levels:** the ▽ symbol + value `±0.000`, `+3.600`…
- **North arrow:** drawing corner, rotated by `site.north`.
- **Section mark A-A:** two bold arrow ends (appears from P4 once sections exist).
- **Cut-material hatch:** brick = double 45° diagonals; reinforced concrete = concrete symbol; ⚠ hatch patterns to be checked against the TCVN material-symbol standard in the P1 verification task.
- **Opening tags:** `D1`, `S2`… placed beside the symbol — matching the door schedule.

## The dim engine — the hardest part, the most invested

Vietnamese architectural style: **45° ticks** (not mechanical arrowheads), the number sits above the dim line, unit is mm with no suffix.

Three dimension chains per side of the house (inside → out):

1. **Detail chain:** wall segment – rough opening – wall segment (enough for a builder to place doors correctly);
2. **Grid chain:** axis-to-axis distances;
3. **Overall chain:** the full length.

Algorithm: project the event points (wall ends, opening edges, axes) onto the side → merge gaps < 1mm → generate chains; **collision avoidance**: a number that doesn't fit is pushed outside with a leader line. Interior dims: clear widths of the main rooms + room name and area (`PHÒNG KHÁCH / 18.2m²`). Golden-tested by pixel comparison against hand-approved reference images.

## Text & font

- Font **Be Vietnam Pro** (Google Fonts, full Vietnamese diacritics, bundled locally — no runtime network fetch).
- Paper text sizes: dims 2.5mm, room names 3.5mm, sheet titles 5mm.
- Room names in UPPERCASE with diacritics.

## Title block (landscape A3)

Cells: project name / category / sheet name / scale / date / sheet number (`KT-01`…) / "Thiết kế: Atelier AI + <user name>" ("Design: …") / an empty "Kiểm" ("Checked") cell (reserved for a real architect if any). Plus the fixed note: *"Bản vẽ concept — không thay thế hồ sơ thiết kế có chữ ký KTS hành nghề"* ("Concept drawing — does not replace documents signed by a licensed architect") + a ⚠ note when `verified:false` rules remain.

## Output formats

| Format | How | Phase |
|---|---|---|
| **SVG** | Generated directly; one `<g id>` per layer; `data-id` per entity → click-to-select in the editor, diffable in tests | P1 |
| **PNG** | Headless Chromium (Playwright) screenshots the SVG — returned for Claude to "see" | P1 |
| **PDF** | Sheet = title block + viewport at true scale; Playwright prints at the correct paper size | P4 |
| **DXF** | Layers/polylines/text mapped 1-1 from the same scene graph; a TS lib or a Python `ezdxf` sidecar (ADR-08, decided in P4) | P4 |
| **Elevations / sections** | Generated from the model: elevation projects the front side; the section is required to cut through the stair | P4 |

## Code architecture

```
model → (geometry core) → intermediate SceneGraph2D {layer, primitive, dataId}
      → svg-writer (P1) / dxf-writer (P4) / sheet-composer → PDF
```

The intermediate SceneGraph exists so that SVG and DXF **can never disagree** — one primitive source for both.
