🇻🇳 [Bản gốc tiếng Việt](../09-web-editor.md) — translated from the Vietnamese original, which is authoritative if they differ.

# 09 — Web editor (the live view in the browser)

The original requirement: *"open the browser and get a live view — the house grows on screen as it is designed — and edit it directly by hand: drag, drop, manipulate."* This editor is the **most precise** of the three input channels (see doc 02).

## Layout

```
┌────────────────────────────────────────────────────────────────┐
│ Atelier — Nhà anh Ba            [Plan] [3D] [Split]        ⚙   │
├───┬────────────────────────────────────────────┬───────────────┤
│ V │                                            │ PROPERTIES    │
│ 1 │                                            │  W4 · Wall    │
│ 2 │            CANVAS                          │  thick 110    │
│ 3 │   (2D plan SVG / Three.js 3D)              │  len [3200 ]  │
│ 4 │                                            ├───────────────┤
│ 5 │                                            │ CHECKS (3)    │
│ M │                                            │ ⚠ Kitchen 4.6m²│
├───┴────────────────────────────────────────────┴───────────────┤
│ Floor: [1][2]  rev 44 ● connected   ⟲ ⟳   snap 50   Claude ✎  │
└────────────────────────────────────────────────────────────────┘
```

## Tools & shortcuts

| Key | Tool | Notes |
|---|---|---|
| `V` | Select / move | default |
| `1` | Draw wall | click–click along the centerline, orthogonal by default, hold `Alt` for free angles |
| `2` / `3` | Place door / window | slides along the wall, shows the distance to both wall ends |
| `4` | Draw room | polygon snapping to walls |
| `5` | Furniture | opens the catalog panel, drag into a room |
| `M` | Measure | temporary tape measure, never written to the model |
| `Del` / `Ctrl+Z` / `Ctrl+Y` | Delete / undo / redo | undo applies only to your own actions (see doc 06) |

## The type-a-number HUD — the killer feature

Whenever you are dragging or drawing, a small number box floats next to the cursor:

- Drag a wall, type `3200 ⏎` → it lands at **exactly 3200mm**, no mouse-nudging.
- Drawing a wall: type its length; placing a door: type the distance to the wall end.
- In the properties panel, every dimension is an input — edit the number and the model changes.

This is how SketchUp/AutoCAD achieve precision — and it is the piece that answers *"a prompt can never be millimetre-exact, but the system can be."*

## Snap & guides

50mm grid (adjustable) · wall endpoints/midpoints · alignment with other walls/axes (dashed guides) · orthogonal by default. Furniture snaps flush against walls, with a typeable clearance gap.

## From hand action to model

Every hand action = **ops**, exactly like Claude's: while dragging, only a local preview is drawn and `presence.draggingIds` is sent (soft-lock); **releasing the mouse** sends a single op. Optimistic UI: apply immediately; if the server rejects, roll back + toast the reason. Selection is synchronized across 2D ↔ 3D ↔ properties panel (via `data-id`).

## Claude's presence

- A toast for every patch with origin `agent`: *"Claude: Ngăn phòng ngủ 2, mở cửa ra hành lang (rev 43)"* ("partitioned bedroom 2, opened a door to the hallway").
- Entities that just changed **flash-highlight** for 1.5s — the user always knows what just appeared; "the house grows on screen as it is designed", literally.
- The CHECKS panel: issues from the validator; click one → zoom to the offending entity.

## 3D modes

| Mode | Description |
|---|---|
| **Orbit** | default; extruded walls with door/window cutouts (three-bvh-csg), slabs/stairs/roof, glTF furniture |
| **Walkthrough** | `WASD` + pointer-lock, eye height 1600mm — feel the real space (P5) |
| **Sun** | hour + month sliders; sun position computed from `site.north` + the latitude in the brief — see which rooms the morning/afternoon sun reaches (P5) |

**Incremental** rebuild: each patch rebuilds only the meshes of the entities that changed — never the whole house.

## Performance & scope

- Target scale: a town house < 2,000 entities — SVG re-render < 16ms, 3D at 60fps on an ordinary laptop.
- Browsers: Chromium + Firefox. **Out of scope for v1:** mobile, share links for other viewers (v2 — the protocol is ready, since an Nth browser is just another client), side-by-side A/B design comparison (v2).
- UI language: Vietnamese first (informal "bạn" address), with an i18n skeleton in place.
