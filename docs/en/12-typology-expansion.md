🇻🇳 [Bản gốc tiếng Việt](../12-mo-rong-typology.md) — translated from the Vietnamese original, which is authoritative if they differ.

# 12 — Multi-typology & multi-region expansion (P6–P9)

> **Decision 14 Jul 2026** (project owner feedback): Atelier is a **community** project — it must not stop at the Vietnamese tube house. Goal: **every house type, every lot type** (including uneven terrain), multiple regions/standards, via a pluggable **rule-pack** architecture. This decision **supersedes Q6** (doc 11 — "v1 templates: tube house only"): Q6 was right for v1 and its depth-before-breadth mission is complete; now comes breadth.

## Where "tube house" is baked in today (survey, 14 Jul 2026)

Five bottlenecks, heaviest first:

| # | Bottleneck | Evidence | Effort |
|---|---|---|---|
| N1 | **Single-standard rule engine, statically loaded, applied unconditionally** — `ALL_RULES` hard-imports geo+std-vn+loban+pln and runs against every model; no typology/region/standard axis | `core/src/validate/rules.ts:2-29`, `engine.ts:52-70` | Architectural refactor — heaviest |
| N2 | **Empty typology library** — 1 fixture + 1 template `nha-ong-4x16-2t`; `blankProject()` also defaults to a 4×16 lot | `server/src/store.ts:26-28,305` | Code is easy; content + golden tests are the real volume |
| N3 | **Flat concrete roof only** — `Slab.kind` has no pitched/tiled roof; drags estimate, 2D/section renderer, 3D, IFC/GLB along | `core/src/types.ts:87` | Cross-layer refactor |
| N4 | **Single frontage, front–back axis** — `Site.front` is the index of ONE edge; PLN derives the "rear" edge from it; corner lots / villas open on four sides can't be modeled | `types.ts:46`, `evaluators-pln.ts:25-41` | Light refactor |
| N5 | **VN-first woven throughout** — TCVN in every rule, Lỗ Ban, default latitude 10.8, VND unit costs | `loban.json`, `types.ts:170`, `rules/don-gia.json` | Each piece easy (mostly optional/gated already) but needs a region abstraction to stay coherent |

Existing bright spots: `Site.boundary` is an arbitrary polygon (irregular lots already representable), `Level[]` doesn't force repeated floors, `stair.ts` is pure geometry, Lỗ Ban is already brief-gated (`phong_thuy.lo_ban`), rules are already data (ADR-09). The foundation for expansion is real — what's missing is a classification axis and content.

## Non-negotiable principles

1. **The model JSON stays the single source of truth** — extend the schema, never open a hand-drawing side door.
2. **Rules are data** (ADR-09) → rule packs are the natural evolution: pack = rules JSON + evaluators registered per pack.
3. **Integer millimetres stay** (ADR-04) — ft-in is a display/input layer for imperial regions only.
4. **Never break existing projects**: today's tube-house files must open and behave identically on the new version (auto-migrate if a schema change is unavoidable).
5. **Depth-before-breadth still applies per typology**: every new template ships with a fixture + golden tests like the tube house did — no "80% done" samples.

## P6 — Rule-pack architecture

Introduce **RulePack**: metadata `{ id, title, region?, standard?, typologies?, locale }` + rules JSON + evaluators registered under the pack id.

- `geo` is **core** — geometry that's true everywhere, always on, not a pack.
- `std-vn`, `pln`, `loban` become the first three packs; loban keeps its brief gate.
- `Project`/`Brief` gain pack selection (default inferred from region + typology; legacy projects with nothing declared → the full VN set, as today).
- Static `ALL_RULES` → a registry loading the selected packs; the engine additionally filters rules by their `typologies` tag.
- Remove the "tube house" leakage from generic rule copy (`std-vn.json:148` STD-09, STD-06 note).
- **Contributor docs**: "Writing a rule pack" — pack schema, `source`/`verified` conventions, the one-failing + one-passing test rule.

**DoD**: legacy projects validate **identically** to pre-refactor (golden diff); a project can select other packs / no packs; contributor doc exists plus one minimal sample pack outside the VN set.

> ✅ **P6 done 14 Jul 2026.** Packs are data: each `rules/*.json` carries a `pack` header `{id,title,kind,region,standard}`; `geo` is `core` (always on), `std-vn`/`loban`/`pln` are region `vn` packs. `rules.ts` has a registry (`BUILTIN_PACKS` + `registerPack`/`getPack`/`listPacks`), `packsFor(project)` selects packs from `Project.config.{region,typology,packs}`, `activeRules(p?)` filters by selected packs + each rule's `typologies`; the engine uses `activeRules(p)` and an `evaluator` field lets a pack reuse a built-in check (e.g. STD-03) with no code. A project with no `config` → the full VN set in the old order (golden byte-identical). Sample non-VN pack: `rules/std-generic.json` (region `generic`, GEN-CEIL-01 borrows the STD-03 evaluator). "Tube house" copy removed from STD-09. Contributor doc: [doc 13](13-writing-a-rule-pack.md). Tests: +6 P6 cases (region selection, empty config.packs leaves only geo, typology filter, sample pack fires only when selected) — **206 tests green, typecheck clean**. *Adjustment vs spec:* added the `evaluator` field (reuse a built-in evaluator) — unplanned but in the spirit of "mainstream, easy to use" (Annex A4); `blankProject()` dropping the 4×16 default deferred to P8; dynamic pack loading from the project directory deferred to P9.

## P7 — Form & terrain

Three schema unlocks every new typology needs:

- **Pitched roofs**: a dedicated roof element (gable/hip/shed/asymmetric, pitch, eaves) instead of stretching `Slab.kind`; 2D renderer (roof plan + sections), 3D, estimate (per-type roof factors), IFC/GLB follow.
- **Multiple frontages**: `Site.front` scalar → per-edge attributes (street-facing, alley, neighbour); setbacks + PLN + elevations read per edge. Corner lots and villas set back on all four sides become expressible.
- **Uneven terrain**: elevations on `boundary` vertices (interpolated inside the lot), per-`Level` finished-floor datum placeable on different heights — houses on slopes, split-level/semi-basement following the terrain.

**DoD demo**: model a **pitched-roof villa on a sloping corner lot with two frontages** — plan/elevation/section/3D/estimate all correct.

> ✅ **P7 done 2026-07-14.** (1) **Pitched roofs**: `Roof` entity (gable/hip/shed, pitch in degrees, outline includes overhang; conventions in types.ts + doc 04) — ONE geometry source `geometry/roof.ts` (`roofGeometry`: creases/faces/zAt/true sloped m²; `roofProfile`: (s,z) polylines for any cut) feeding the plan (MAI layer: edge + hips + ridge), elevation (projected faces), section (poché strip t/cos pitch thick), web 3D, GLB, **IFCROOF brep** (new brepSolid in the writer), estimate (TRUE SLOPED m² × new `mai_ngoi` 0.7/`mai_ton` 0.3 factors in don-gia.json; the "estimated" line disappears once a roof exists). Ops/undo/i18n/model_query/panel fully plumbed — legacy files without a `roofs` array stay valid. (2) **Multi-frontage**: `Site.edges[]` (street/alley/neighbor kind + per-edge setback) — new PLN-07 checks per-edge setbacks, PLN-06 generalises to every open edge and counts roof eaves; elevations switch to the **nearest-cluster** facade-wall rule (a villa set back 3m still gets an elevation; tube house unchanged). (3) **Terrain**: `Site.terrain.elevations` per boundary vertex + `groundAt` (IDW) — elevations/sections draw the sloping ground line, 3D gets a 32×32 terrain mesh, PLN-05 measures height from the street-front ground level and includes the ridge. STD-09 tube-house bias fixed: windows opening onto the **yard inside the lot** count as daylight. DoD fixture `biet-thu-doc.json` (corner lot with 2 street edges, 1.1m ground drop, 30° hip roof with 600 overhang) — golden 0 issues, all 3 sheets visually reviewed, template `biet-thu-doc-2t` registered. Roof/terrain branches are **no-ops when absent** → the 5 tube-house snapshots stay untouched. **234 tests green.** *Adjustments vs spec:* v1 hip builds on the bbox (rectangular outlines; straight skeleton for complex polygons is v2); the "no facade wall → error" test updated for the nearest-cluster rule.

## P8 — Typology library

Content — where the community can contribute as soon as P6+P7 land:

| Template | What it exercises | Needs |
|---|---|---|
| Single-storey house (nhà cấp 4) | Simplest, no stairs — the on-ramp sample | P6 |
| Two-storey pitched-roof villa | Roof + multi-frontage + 4-side setbacks | P7 |
| Garden house | Detached mass + large garden, low density | P7 |
| Western-style detached | Non-VN region, ft-in display, different standards pack | P9 |
| Apartment / interior renovation | No lot — floor plan inside an existing shell | P6 |

Concrete geometry for the seed models (source: Annex A):

| Template | Floor area | Storeys | Roof | Lot / open sides |
|---|---|---|---|---|
| Single-storey (nhà cấp 4) | ~60–110 m² | 1 | pitched 18–34° (6/12 common) or flat | detached, usually 4-side setback |
| Two-storey detached (villa) | ~200–230 m² (US median ~203 m²) | 2 (±basement/attic) | pitched 18–34° | large lot (~1,900 m² US sample), 4-side setback, garage |
| Semi-detached / duplex | ~95–120 m² each | 2 | pitched | one shared party wall, 3 open sides |
| Townhouse / Western rowhouse | ~93–140 m² each (US unit 1,000–3,000 sq ft) | 2–2.5 (eave ~7.6–12 m) | pitched or flat | two shared party walls (like tube house but Western code) |
| Bungalow | ~70–100 m² | 1 (sometimes +attic) | pitched | detached, common in UK/AU |
| Apartment / renovation | shell-dependent | 1 (inside a tower) | — (no own roof) | no lot |

*Typical townhouse lot width is unresolved — the ~20 ft (6.1 m) claim was refuted in verification; needs another source before hardcoding a seed footprint (see Annex A open questions).*

- `blankProject()` drops the 4×16 default — lot shape comes from the phase-A interview.
- `thiet-ke-nha` skill: phase A asks typology first and picks the template accordingly; VN-specific questions (light well, Lỗ Ban…) only appear for the VN region.

**DoD**: every template has a fixture + golden tests; the skill routes from interview to the right template.

> ✅ **P8 done 2026-07-14.** Template library of 5: `nha-ong-4x16-2t` (P1) + `biet-thu-doc-2t` (P7) + **3 new**: `nha-cap-4` (single-storey, 7 rooms + central corridor, 20° GABLE metal roof, no stairs — the sheet set auto-skips the section), `nha-vuon` (irregular 484m² lot + light terrain, single-storey 27° HIP tiled roof with 700 eaves, 21% density), `can-ho` (NO lot — boundary = the 10.5×8.2 apartment shell, concrete perimeter + light partitions, open kitchen-living, no roof/stairs). Each ships a JSON fixture + 0-issue golden + counter-cases (STD-04/09, PLN-03); every fixture declares its `config.typology`. `blankProject()` drops the 4×16 tube-house default — takes `brief.dat.ranh_gioi` from phase A, falls back to a neutral 10×10 square. The `thiet-ke-nha` skill: phase A asks the **house type FIRST** → template routing table by typology; checklist extended with sloped lots/corner lots/roof material; Lỗ Ban noted as a VN-only question. Single-storey + apartment plans visually reviewed. **239 tests green.** *Adjustments vs spec:* the "Western-style detached" template moves to P9 as planned (needs region + ft-in); the renovation estimate still prices foundations/roof as new construction — a "renovation" estimate mode goes to the P9 backlog.

## P9 — Region layer & community platform

**Region** = `{ display units, default standards pack, unit-cost table, customs module }`.

- VN is the first region (repackaging what exists); add one sample international region (generic-metric or US-imperial) as proof.
- `don-gia.json` becomes a per-region pack (the project-directory override mechanism from atelier-mcp already exists).
- Customs are modules: Lỗ Ban + ancestral altar belong to the VN module; other regions can bring their own.
- `CONTRIBUTING.md`: how to contribute a pack / template / region — one checklist each.

**DoD**: a project in a non-VN region shows **no TCVN/Lỗ Ban/VND anywhere** (rules, drawings, estimate); at least one sample contribution has gone through the full contributor flow.

> ✅ **P9 done 2026-07-14.** (1) **RegionDef registry** in core: `{id, title, units, packs (in run order), currency?}` — `registerRegion`/`getRegion`/`listRegions`; `packsFor` reads the RegionDef (unknown regions fall back to `pack.region` matching); region `vn` repackages the status quo in the exact [std-vn, loban, pln] order (goldens untouched), customs modules live inside `packs` (their `kind` is already in the pack header). (2) **First real non-VN pack: `uk-approved-docs`** (5 rules: NDSS bedroom areas, Part M corridor + doors, Part K stairs, daylight) — UK chosen per Annex A2 (documents open under OGL); ALL honestly `verified:false` (set from professional memory, not yet checked against the source PDFs — a UK contributor confirms per doc 13); the ⚠ footnote now follows the project's OWN pack set (`unverifiedRules(p)` + the title block's `unverified` option). (3) **Multi-region estimate**: `donGiaFor(region)` — vn unchanged; a region without a price table returns quantities only + a contribution note, **not one stray VND**; the estimate sheet withdraws itself from the set (the no-stair-section pattern); `DonGia.currency` ready for community tables. (4) **DoD fixture `detached-uk`** (2-storey 35° gable, straight stair with a 207.7 riser passing Part K) — validation yields only GEO+UK (0 STD/LBB/PLN), estimate has 0 VND, template `detached-uk` registered; fixed the STD-05 sibling of the P7 bias (front doors of set-back houses classify correctly — shared `isOutdoorPoint` helper for STD-05/09). (5) **CONTRIBUTING.md** at the repo root: checklists for all 3 contribution kinds (pack/template/region) + doc 13 gains a Regions section (VN+EN). **247 tests green.** *Adjustments vs spec:* the "sample contribution through the full flow" is the UK pack + detached-uk fixture themselves (dogfooding the contributor process); dynamic pack loading from the project folder deferred — the static registry suffices until a real community PR; ft-in display + a UK price table + drawing-label i18n go to the backlog.

## Order & rationale

P6 first because everything else plugs into it — adding typologies without a rule-classification axis just makes the VN standard tighter with every new template. P7 unlocks the forms new templates need (pitched roofs, corner lots, slopes). P8 is content — exactly where the community joins, and the sooner the architecture exists the sooner contributions land. P9 wraps it into a genuinely multi-region platform. Rough sizing: P6 M, P7 L, P8 M (each template S), P9 M — revisit after P6, per house custom.

## Annex A — Market & standards research (14 Jul 2026)

Deep research across 5 angles, 23 sources, 88 claims → 25 adversarially verified (23 confirmed, 2 refuted). Conclusions feeding the decisions above:

**A1. Which typologies are mainstream (→ P8 template picks).** Low-rise detached/semi-detached/townhouse dominate the stock in most major markets: houses (detached or semi) are the most common type in 30/40 OECD countries, flats a majority in only 10; detached leads in 20 countries (New Zealand 83%, Australia ~70%, US ~2/3); row/terraced ≥50% in the UK, Netherlands, Ireland; EU 2024 splits 51% house / 48% flat [OECD HM1.5; Eurostat Housing 2025]. New US homes ~203 m² (Q4 2025 median) to 227–246 m² (mean), lot ~1,942 m² near half an acre [NAHB; Census/eyeonhousing]. England: 53% terraced/semi + 18% detached + 9% bungalow, mean ~95 m² [English Housing Survey]. Australia: 70% detached, 13% townhouse [ABS 2021]. Typical townhouse 2–2.5 storeys, 1,000–3,000 sq ft per unit (~93–279 m²), eave 25–40 ft [Missing Middle]. Common residential roof pitch 4/12–8/12 (~18–34°), 6/12 most frequent [This Old House]. → P8 spec table above. *Caveat: data skews OECD/EU/Anglophone; South Asia, SE Asia, Latin America (courtyard house, stilt house) poorly covered — need regional sources before building tropical templates.*

**A2. First non-VN standards pack = UK Approved Documents.** Two reasons: (1) its modular-by-theme structure matches the rule-pack architecture exactly — each document is one quantitative domain: **B** fire/egress, **K** stairs/falling, **M** access + door widths, **F** ventilation; (2) fully open under the Open Government Licence, downloadable/searchable PDFs — per-rule sourcing just like TCVN [gov.uk/approved-documents]. Beats the other two candidates: **US IRC 2021** has ready numbers (ceiling ≥7 ft, egress ≥5.7 sq ft / ≥24 in high / ≥20 in wide / sill ≤44 in) but ICC **holds copyright** — free to read, redistribution restricted; **Japan (Building Standard Act)** is a framework law whose numbers live in separate Cabinet Orders, with the English translation **not** freely open/citable (verified-refuted). **Australia NCC 2025** is the next candidate (detached-dominant market, Volume Two + Housing Provisions).

**A3. Customs module — insufficient evidence to build one yet.** NO claim about vastu / feng shui / Japanese ken-module survived verification; only blog-grade sources mentioning vastu's āyādi formulas (Aaya/Vyaya/Yoni on the hasta unit ~72 cm), low quality, quantifiability unproven. → **Recommendation: keep Lỗ Ban as the sole customs module until a proper quantitative source exists for another system.** Don't add vastu/feng shui on analogy alone — cultural error costs more than the benefit.

**A4. "Mainstream, easy-to-use" principles (from Sweet Home 3D, FreeCAD-library).** (1) **Standard interchange formats**, no bespoke ones — Atelier already exports GLB/IFC/DXF; add *import* to accept contributions. (2) **Self-installing, metadata-rich bundles** — Sweet Home 3D's SH3F packs model + description, installs by double-click; an Atelier pack should be a self-describing bundle (rules JSON + fixture + metadata) installed by pointing at a folder/URL, matching the existing `atelier-mcp setup`. (3) **Clear theme/family folder taxonomy** — FreeCAD-library files assets by Architectural/HVAC/…; Atelier packs file by region + standard + typology. (4) **Open license + per-item attribution** — FreeCAD-library is CC-BY 3.0 with attribution; Atelier already cites per-rule `source` + CC0 assets, extend to community packs via CC-BY. (5) **Low barrier**: one-command / double-click install — already on track with `atelier-mcp`.

**Open questions still pending** (into the research backlog, not blocking P6): typical townhouse lot width (the ~20 ft claim was refuted); which customs system is genuinely quantifiable; geometry for tropical/South-Asian/SE-Asian/Latin-American typologies; the concrete contribution schema + review process of WikiHouse/Open Building Institute (unverified so far — only FreeCAD-library + Sweet Home 3D as models).
