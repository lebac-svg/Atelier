🇻🇳 [Bản gốc tiếng Việt](../02-quy-trinh-thiet-ke.md) — translated from the Vietnamese original, which is authoritative if they differ.

# 02 — Design Process (from prompt to documentation set)

This answers the central question: **"is describing the house in a prompt good enough?"** — No, if one-shot. Yes, if the prompt is *one input channel for intent* within a multi-phase process with checkpoints. Precision comes from process + validator + 3 input channels, not from longer prompts.

## Three input channels — three levels of precision

| Channel | Used for | Example |
|---|---|---|
| **Prompt** (Claude Code) | Intent, layout, style | "add a ~12m² bedroom next to the kitchen, door opening to the hallway" |
| **Drag-and-drop** (web editor) | Relative position, layout fine-tuning | push the wardrobe into the corner, drag a wall left |
| **Type-a-number** (HUD in the editor) | Absolutely precise numbers | while dragging a wall, type `3200` ⏎ → exactly 3200mm |

No channel is forced to do another channel's job. Prompts are not for millimetre-precise dimensions — unless the user volunteers a number, in which case that number is respected absolutely.

## Five phases, five checkpoints

```
A. Interview ──► BRIEF ──approve──► B. Floor plan ──approve──► C. Rough 3D + stair/roof
──approve──► D. Furniture + materials ──approve──► E. Documentation set ──approve──► export PDF/DXF
```

Rule: **never skip a phase while its checkpoint is unapproved** (unless the user says to skip). In every phase Claude must run `validate()` + render + `capture_view` to inspect its own work **before** inviting the user to look.

### Phase A — Structured interview → Brief

Claude does not take one prompt and guess. It interviews like a real architect, following a checklist:

1. **The lot:** dimensions (all four sides — irregular lots accepted, entered as a polygon), orientation, adjacencies (street/alley width, neighboring houses), zoning if known (setbacks, max storeys).
2. **The family:** who lives there, how many generations, habits (cooking, guests, working from home).
3. **Room needs:** bedrooms/bathrooms count, ancestral altar room, garage (motorbikes? car?), ground-floor business use, laundry yard, light well, balconies.
4. **Budget & finish level.**
5. **Aesthetic taste:** style, reference images, main colors.
6. **Ranked priorities:** airflow / cost / room count / easy cleaning… (what wins when they conflict).

The result is the **brief** — stored directly in the model, for example:

```yaml
brief:
  dat:
    ranh_gioi: [[0,0],[4000,0],[4100,16000],[0,15800]]   # mm — irregular lots OK
    huong_truoc: "Đông Nam"
    tiep_giap: { truoc: "hẻm 5m", sau: "nhà", trai: "nhà", phai: "nhà" }
    quy_hoach: { khoang_lui_truoc: 0, tang_max: 4 }
  gia_dinh: "vợ chồng + 2 con nhỏ + bà nội"
  nhu_cau: { phong_ngu: 3, wc: 3, phong_tho: true, xe_may: 2, o_to: false,
             gieng_troi: true, san_phoi: true, bep: "liền phòng ăn" }
  ngan_sach: { muc: "~1.8 tỷ", hoan_thien: "trung bình khá" }
  gu: { phong_cach: "hiện đại tối giản", mau: "trắng - gỗ sáng" }
  uu_tien: ["thông thoáng", "bà nội ngủ tầng trệt", "dễ dọn"]
```

**Checkpoint 1:** the user approves the brief (in chat or on the editor). The approved brief is the "contract" — every later phase is checked against it.

### Phase B — Floor plan (two steps, to cut down rework)

1. **Block diagram first:** rooms as rectangular blocks on the plan, no detailed walls yet → the user approves the *layout* (which room goes where, how circulation flows).
2. **Detailed walls after:** from the approved blocks → walls with real thickness, doors, windows, the stair in its right place. The validator runs the full dimensional rule set.

**Checkpoint 2:** approve each floor's plan on the live editor (the user can drag-adjust things themselves before nodding).

### Phase C — Rough 3D

Extrude walls, slabs, stair, roof (v1: flat roof), light well. The user orbits/walks to check space, airiness, sight lines. **Checkpoint 3.**

### Phase D — Furniture + materials

Place furniture from the catalog (beds, wardrobes, kitchen, sofa, bathroom fixtures…), assign finishes (tile/wood floors, paint, cladding). The validator checks collisions and minimum walking clearance around beds/kitchen. Sun study to see morning/afternoon light. **Checkpoint 4.**

### Phase E — Documentation set

Generate the drawing set: floor plans for every level with 3-chain dims + symbols, main elevation, 1–2 sections (through the stair), room-area schedule, door schedule. Export PDF (A3) / SVG / DXF. **Checkpoint 5** → handover.

## The process is packaged as a skill

This entire process is written as a **skill in the repo** (`.claude/skills/thiet-ke-nha/`) so Claude Code always follows the sequence: ask the Phase A checklist → record the brief → work phase by phase → self-validate before each checkpoint. Behavior stays stable across sessions instead of depending on conversational "memory".

## Why this process yields the highest precision

- **Intent errors** are caught in Phase A (the brief is approved before anything is drawn).
- **Layout errors** are caught at the block diagram (moving blocks is cheaper than moving walls).
- **Geometry/standards errors** are caught automatically by the validator; Claude fixes them before the user ever sees them.
- **Final detail errors** the user fixes by hand on the editor — the most precise channel of all.
