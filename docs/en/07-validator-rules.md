🇻🇳 [Bản gốc tiếng Việt](../07-validator-rules.md) — translated from the Vietnamese original, which is authoritative if they differ.

# 07 — Validator & the rule set

Role: **stop mistakes before the user ever sees them**, and serve as the system's authority on "the standards". The LLM proposes — code verifies. Never trust the model's spatial reasoning anywhere mathematics can check it.

## Four severity levels

| Level | Meaning | Consequence |
|---|---|---|
| `block` | Geometric nonsense (a door outside its wall…) | **Transaction cancelled** — can never exist in the model |
| `error` | Serious standards violation | Can be written (the user has the right to draw it wrong), but **blocks documentation export** + shows red in the editor |
| `warn` | Should be fixed | Shows yellow, listed in the panel |
| `info` | Suggestion (Lỗ Ban, comfort) | Shows grey, can be hidden |

Why `error` does not cancel the transaction: mid-drag, intermediate states can be temporarily "off-standard"; hard-blocking would make the editor unusable. Only `block` (broken topology) cancels.

## Rules are DATA, not code scattered around

```
packages/core/rules/
├── geo.json        # topology — intrinsic figures
├── std-vn.json     # Vietnamese dimensional standards
├── loban.json      # Lỗ Ban ruler (advisory)
└── pln.json        # zoning (P4)
```

Each rule:

```jsonc
{ "id": "STD-06a", "title": "Cao bậc thang trong khoảng cho phép",  // ("Stair riser within the allowed range")
  "severity": "error", "params": { "min": 150, "max": 190 },
  "source": { "vanBan": "TCVN 4451:2012", "dieu": "—", "verified": false },
  "message": "Bậc thang {stair} cao {riser}mm — ngoài khoảng {min}–{max}mm." }
  // ("Stair {stair} riser is {riser}mm — outside the {min}–{max}mm range.")
```

**Data policy:** every figure below is a draft drawn from Vietnamese residential design practice; any figure not yet checked against the original legal text carries the flag `verified:false` (marked ⚠). **Phase 1 has a dedicated task: look up the original texts, settle each figure, flip `verified:true`.** As long as ⚠ rules remain, exported drawings print the note "standards data is at reference level". The `standards_lookup` tool reads directly from these files — Claude's answers to "why" always come with the source.

> ✅ **The standards-verification task ran on 2026-07-13.** The correct standards for tube houses are **TCVN 13967:2024 (detached houses)** + TCVN 9411:2012 (row houses) — *not* TCVN 4451:2012 (which applies only to apartment buildings/dormitories). The SETTLED figures live in `packages/core/rules/*.json` (the source of truth, with article/section + verified flags); the tables below are kept as the original draft record — when they disagree, the rules JSON wins.

## GEO — geometry / topology (mostly `block`)

| ID | Level | Check |
|---|---|---|
| GEO-01 | block | Opening lies fully within the wall's length (`offset ≥ 0`, `offset+width ≤ length`) |
| GEO-02 | block | Two openings on the same wall do not overlap |
| GEO-03 | error | Two parallel walls lying on top of each other (centerline gap < sum of half-thicknesses) |
| GEO-04 | error | Furniture overlapping furniture / walls (OBB footprint intersection > 10mm) |
| GEO-05 | block | A polygon (room, lot boundary, slab) self-intersects or fails to close |
| GEO-06 | warn | Door swing arc obstructed by a wall/furniture |
| GEO-07 | warn | Stair flight not inside the upper floor's slab hole (v2 upgrades to error + headroom check) |
| GEO-08 | error | Wall beyond the lot boundary; warn when violating setbacks declared in the brief |

## STD — Vietnamese residential dimensional standards

| ID | Level | Check | Draft figures |
|---|---|---|---|
| STD-01 | warn | Minimum room areas | master bedroom ≥ 10m², secondary bedroom ≥ 7m² ⚠, kitchen ≥ 5m² ⚠, WC ≥ 2.2m², living ≥ 12m² (info) |
| STD-02 | warn | Clear width of habitable rooms | ≥ 2100 ⚠ |
| STD-03 | error | Clear height | habitable rooms ≥ 2600 ⚠; WC/storage ≥ 2200 ⚠ |
| STD-04 | error | Hallways | ≥ 900 ⚠ |
| STD-05 | error | Door widths | main ≥ 800 (info recommends ≥ 900); room ≥ 700 ⚠; WC ≥ 600 ⚠ |
| STD-06 | error | Stairs | riser 150–190; tread ≥ 240 ⚠; flight ≥ 800 (warn < 900); landing ≥ flight width; info: 2×riser+tread ∈ 550–700 |
| STD-07 | error | Railings | ≥ 900; balconies on floor 2+ ≥ 1100 ⚠ (QCVN 05) |
| STD-08 | warn | Window with sill < 900 on floor 2+ and no railing — child safety ⚠ |
| STD-09 | warn | Habitable room with no window/light well for daylight — tube-house middle rooms → info suggests a light well |
| STD-10 | warn | WC door opening straight into the kitchen/cooking zone (hygiene + custom) |
| STD-11 | info | Circulation around furniture: around beds ≥ 600; in front of the kitchen counter ≥ 900 (warn) ⚠; in front of the toilet ≥ 500 ⚠ |
| STD-12 | warn | Exceeding `brief.quy_hoach`: building density, floor count (figures come from the brief, not hardcoded) |

## LBB — the Lỗ Ban ruler (feng-shui measuring ruler; advisory, on/off; asked in phase A)

A differentiator no Western tool has. Pure arithmetic: the ruler's cycle divides into 8 segments; dimension mod cycle → look up the segment.

| ID | Level | Check |
|---|---|---|
| LBB-01 | info | Door clear dimensions (width, height) against the **52.2cm** ruler (8 segments × 65.25mm) — main door, room doors, windows |
| LBB-02 | info | Important masonry (kitchen plinth, altar) against the **42.9cm** ruler (Tài–Bệnh–Ly–Nghĩa–Quan–Kiếp–Hại–Bản) ⚠ |
| LBB-03 | info | **Suggest the nearest auspicious size** — don't just call out a violation, propose: "door 760 → widen to 810 into a good segment, a 50mm change" |

⚠ The segment names and exact segment boundaries need settling against a trustworthy source before enabling by default (a P1 task, same batch as the TCVN verification). The mod-segment mechanism itself is settled now.

> ✅ **Cross-checked against 3+ rulers in circulation (2026-07-13):** the 52.2cm ruler has a cycle of **520mm** (8 segments × 65mm — not 65.25), segment 5 named *Nhân Lộc* (some sources say *Phúc Lộc*; the same auspicious segment); 42.9cm = masonry (plinths/kitchen counters, steps); **altars are measured with the 38.8/39cm ruler (Đinh Lan, 10 segments × 39mm)** → split into its own rule **LBB-04**; auspicious: Đinh, Vượng, Nghĩa, Quan, Hưng, Tài. Exact figures in `packages/core/rules/loban.json`.

## PLN — local zoning (✅ 2026-07-13) (🔭 Phase 4)

A per-project rule pack: setbacks, maximum building density, height/floor limits, canopy projection over the alley. Same structure as STD but `params` come from `brief.quy_hoach` as declared by the user (Atelier does not look up zoning itself — out of scope).

## The validator contract

- Runs **after every transaction**, scoped to what was affected (incremental) + full when `validate()` is called explicitly.
- Results are tagged with a `revision` → the browser shows the issues panel, Claude receives them in `apply_ops`' `warnings`.
- Every issue points at `entities[]` → clicking it in the editor zooms to the offending spot.
- Golden tests: every rule has at least 1 violating case + 1 passing case in `packages/core/rules/__tests__/`.
