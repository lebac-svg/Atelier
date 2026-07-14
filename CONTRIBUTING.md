# Contributing to Atelier

Atelier is a community project: an AI architect that designs real houses through parametric models — **any house type, any lot, any region**. The Vietnamese tube house was our first typology; the architecture is built for yours. Contributions that widen coverage are the most valuable thing you can send.

*Tiếng Việt: tài liệu kỹ thuật gốc nằm ở `docs/` (bản dịch tiếng Anh trong `docs/en/`). Đóng góp bằng tiếng Việt hay tiếng Anh đều được chào đón.*

## What you can contribute

There are three shapes of contribution, each with its own checklist. All three are **data + tests first** — most need no core code at all.

### 1. A rule pack (building standards for a region or typology)

A rule pack is one JSON file of quantitative rules (minimum room sizes, stair dimensions, door widths, egress…) with a cited source for **every number**. Full guide: [docs/13 (VN)](docs/13-viet-rule-pack.md) · [docs/en/13 (EN)](docs/en/13-writing-a-rule-pack.md).

- [ ] One file `packages/core/rules/<id>.json` with a `pack` header (`id`, `title`, `kind`, `region`, `standard`).
- [ ] Every rule has an honest `source`: `verified: true` **only if you opened the source document yourself**; otherwise `verified: false` (drawings will carry a ⚠ footnote — that is by design).
- [ ] Prefer openly licensed source documents (e.g. UK Approved Documents under OGL) so reviewers can re-check you.
- [ ] Reuse a built-in evaluator via the `evaluator` field where possible (see `std-generic.json` and `uk-approved-docs.json` as examples); new checks need a small evaluator function + registration in `engine.ts`.
- [ ] One failing + one passing test per rule in `packages/core/rules/__tests__/`.
- [ ] Register the pack in `packages/core/src/validate/rules.ts` and run the FULL suite — you must not change any other region's validation results.

### 2. A template (a seed house model for a typology)

A template is a complete, valid `atelier.project.json` fixture that phase-A interviews route to. Examples: `nha-cap-4.json` (single-storey), `detached-uk.json` (UK detached).

- [ ] One fixture `packages/core/fixtures/<id>.json` — a real, coherent little house: rooms, walls, doors, windows, stairs if multi-storey, roof if pitched.
- [ ] It declares `config.typology` (and `config.region` if not VN).
- [ ] `validateProject(fixture)` returns **zero issues** under its region's packs (golden test), plus at least one counter-case proving the validator still bites.
- [ ] Loader in `packages/core/src/fixture.ts`, registered in `TEMPLATES` (`packages/server/src/store.ts`), routed in the `thiet-ke-nha` skill table.
- [ ] Render the sheet set and LOOK at it (plan/elevation/section) before submitting.

### 3. A region (units + default packs + prices + customs)

A region bundles what a locale needs: display units, default rule packs, a unit-cost table, cultural modules.

- [ ] `registerRegion` entry in `packages/core/src/validate/rules.ts`: `{ id, title, units, packs, currency? }`.
- [ ] At least one standards pack for the region (checklist 1).
- [ ] Optional price table: follow `rules/don-gia.json` shape with an explicit `currency`; without one, estimates degrade to quantities-only (never another region's currency).
- [ ] Cultural modules (like the Vietnamese Lỗ Ban ruler) are packs with `kind: "customs"` — **only add one backed by a quantitative written source**; we deliberately rejected adding vastu/feng shui by analogy (doc 12, Annex A3).
- [ ] A template fixture for the region (checklist 2) so the DoD holds: a project in your region shows nothing from any other region's standards, customs, or currency.

## Ground rules (read before coding)

- **The model JSON is the single source of truth.** Tools mutate the model; renderers draw it. Never bypass.
- **Millimetres, integers** (ADR-04). Imperial display is a rendering concern, not a model concern.
- **Rules are data** (ADR-09). Thresholds live in JSON params, never hardcoded.
- **Golden fixtures are sacred**: the tube-house SVG snapshots and every fixture's 0-issue golden must survive your change byte-identical unless the change is the point.
- `pnpm typecheck && pnpm test` green before any PR. New behavior ships with tests.

## Dev quickstart

```bash
pnpm install
pnpm test          # 247 tests
pnpm typecheck
pnpm demo:p5       # full live demo (builds a house end-to-end)
```

Docs live in `docs/` (Vietnamese originals, authoritative) and `docs/en/` (translations). Start with `01` (vision), `04` (schema), `12` (multi-typology roadmap), `13` (rule packs).

## License

MIT. Fonts OFL 1.1, catalog assets CC0, community packs CC-BY with per-rule attribution — keep license notes in your pack/template headers.
