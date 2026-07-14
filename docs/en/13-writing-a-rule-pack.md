🇻🇳 [Bản gốc tiếng Việt](../13-viet-rule-pack.md) — translated from the Vietnamese original, which is authoritative if they differ.

# 13 — Writing a rule pack

> For contributors. A rule pack is how you add a set of standards (another region, another house type) to Atelier **without touching core code** — the ADR-09 "rules are data" principle. This is the P6 piece of the [expansion roadmap, doc 12](12-typology-expansion.md).

## What a pack is

A pack = **one JSON file** in `packages/core/rules/` with:

```json
{
  "pack": { "id": "std-vn", "title": "…", "kind": "standard", "region": "vn", "standard": "TCVN 13967:2024 …" },
  "rules": [ … ],
  "rulers": { … }   // optional — only Lỗ Ban-style customs packs need it
}
```

Built-in set: `geo` (geometry core), `std-vn`, `loban`, `pln`. Sample non-VN pack: `std-generic.json` — read it as the minimal example.

### The `pack` header

| Field | Required | Meaning |
|---|---|---|
| `id` | ✓ | Unique identifier, kebab-case (`std-vn`, `uk-approved-docs`). |
| `title` | ✓ | Display name. |
| `kind` | ✓ | `core` \| `standard` \| `planning` \| `customs`. **`core` always runs** in every region (only `geo`); the rest are selected by region/config. |
| `region` | — | Applicable region (`vn`, `generic`, `uk`…). Leave empty only for `core`. |
| `standard` | — | The source standard document — shown & searchable. |

Packs sharing a `region` are selected together when a project sets `config.region` to that value.

## What a rule looks like

```json
{
  "id": "STD-03",
  "title": "Minimum clear ceiling height",
  "severity": "warn",
  "params": { "phong_o": 2700, "bep_an": 2400, "wc": 2100, "kho": 2000 },
  "source": { "vanBan": "TCVN 13967:2024", "dieu": "5.9", "verified": true },
  "message": "Room {ten} ({room}) on {level}: clear height {clear}mm < {min}mm.",
  "typologies": ["nha-ong", "biet-thu"],
  "evaluator": "STD-03"
}
```

| Field | Required | Notes |
|---|---|---|
| `id` | ✓ | Unique ACROSS the whole registry. Prefix by pack (`STD-`, `UK-`…). |
| `title` | ✓ | Short description. |
| `severity` | ✓ | `block` (aborts the transaction) \| `error` \| `warn` \| `info`. |
| `params` | — | Numbers the rule reads. **Every threshold lives here, never hardcoded in code.** |
| `source` | — | `{ vanBan, dieu, verified }`. See the sourcing convention below. |
| `message` | ✓ | String template; `{key}` is replaced by the `values` the evaluator emits. |
| `status` | — | `active` (default) \| `planned` (defined but not yet running). |
| `typologies` | — | Applies only to these typologies; **empty = all typologies**. |
| `evaluator` | — | Reuse a built-in rule's check (see below); empty = the evaluator matching `id`. |

## Sourcing convention (`source`) — required for "mainstream and trustworthy"

Atelier cites **every single number** back to its source document. No source = the drawing footnotes a ⚠.

- `verified: true` — checked against the original standard text, with `vanBan` + `dieu` stated.
- `verified: false` — a placeholder/unchecked number. The rule still runs but the renderer prints a ⚠ so the user knows it isn't final.
- **Don't mark `verified: true` unless you actually opened the source document and read it.** A wrong standard costs more than a missing rule.
- Prefer **open/downloadable** documents (like the UK Approved Documents under the Open Government Licence) so others can re-check — see [Annex A, doc 12](12-typology-expansion.md#annex-a--market--standards-research-14-jul-2026).

## Reusing a built-in evaluator (no code needed)

The `evaluator` field lets your rule borrow a built-in geometric check, swapping only `params` + `message` + `source`. The sample `std-generic` pack does exactly this:

```json
{ "id": "GEN-CEIL-01", "evaluator": "STD-03", "params": { "phong_o": 2400, … }, "message": "Room {ten} … {clear}mm < {min}mm." }
```

The `STD-03` evaluator (clear height) reads `params.phong_o|bep_an|wc|kho` and emits `values` `{ten, room, level, clear, min}` for the `message`. To see what params an evaluator reads / what values it emits, read `packages/core/src/validate/evaluators-*.ts` — each function is short and pure. A rule that needs a **new** check (none exists) must add an evaluator: write a `(p, def) => Finding[]` function and register its id in `EVALUATORS` in `engine.ts`.

## Selecting packs on a project

```jsonc
// atelier.project.json
"config": {
  "region": "generic",           // → all packs with region "generic" + the geo core
  "typology": "biet-thu",        // → unlocks rules tagged typologies:["biet-thu"]
  "packs": ["geo", "uk-approved-docs"]  // (optional) explicit override, ignores region
}
```

No `config` → the default VN built-in set, behaving like a legacy project. `core` (geo) **always** runs, even with `packs: []`.

## Registering a pack

Built-in pack: add it to `BUILTIN_PACKS` in `packages/core/src/validate/rules.ts`. Extra pack (another region/community): `registerPack(toPack(json))` — see the `std-generic` registration as a model. (Loading packs dynamically from the project directory is P9 work.)

## Tests — one failing + one passing per rule

Following `packages/core/rules/__tests__/rules.test.ts`: every rule gets **one violating case** (mutate the model wrong → the rule fires in the right place) and **one passing case** (the clean fixture). A non-VN region pack should ship its own seed-house fixture to serve as the passing case.

## Contribution checklist for a pack

- [ ] `rules/<id>.json` has a `pack` header with all required fields.
- [ ] Every rule has an honest `source`; leave unchecked numbers `verified: false`.
- [ ] `message` uses only `{key}`s the evaluator actually emits.
- [ ] Rules reuse a built-in evaluator, or ship a new evaluator + registration.
- [ ] Register the pack (built-in or `registerPack`).
- [ ] One failing + one passing test per rule; `pnpm test` green.
- [ ] No change to other regions' validation results (run the full suite).
