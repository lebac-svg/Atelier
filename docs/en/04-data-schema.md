🇻🇳 [Bản gốc tiếng Việt](../04-schema-du-lieu.md) — translated from the Vietnamese original, which is authoritative if they differ.

# 04 — Data Schema (the parametric model)

The model is **one JSON file** (`atelier.project.json`). Everything else — drawings, 3D, dims, schedules — is derived from it.

## Global conventions

- **Units: mm, integers.** Never use floats for dimensions (avoids accumulated rounding errors).
- **Coordinate system:** the floor plan uses (x, y) — y+ points toward the back of the lot; z+ points up. Origin (0,0) = the front-left corner of the lot boundary. True north is stored in `site.north` (degrees, measured from the y+ axis).
- **Rotation:** degrees, counter-clockwise.
- **IDs:** type prefix + short string (`W12`, `D3`, `R2`, `F15`, `ST1`, `L1`). Clients create IDs (both Claude and the browser); the server rejects duplicates. Readable for humans and LLMs alike ("move wall W12").
- **Derived values are never stored in the file:** room areas, stair riser height… are computed on demand (`model_query` with `computed: true`). One source of truth, no orphaned stale numbers.
- **Unknown fields are preserved** on read/write (forward-compatible).

## Entities

```ts
type Project = {
  meta: { id: string; name: string; revision: number; unit: "mm"; app: "atelier/0.x" };
  brief: Brief;                    // see 02-design-process.md
  config?: ProjectConfig;          // P6 (doc 12): region/typology/rule packs — empty = VN set
  site: Site;
  axes: { x: Axis[]; y: Axis[] };  // grid axes 1,2,3… / A,B,C…
  levels: Level[];
  walls: Wall[];
  openings: Opening[];             // doors + windows
  slabs: Slab[];                   // floors, flat roofs — with holes (stair, light well)
  roofs?: Roof[];                  // PITCHED roofs (P7) — legacy files without this field stay valid
  stairs: Stair[];
  rooms: Room[];
  furniture: Furniture[];
  styles: { openings: Record<string, OpeningStyle> };  // "D1", "S1"…
  finishes: Record<string, Finish>;                    // finish materials
  underlay?: Underlay;             // old drawing/photo traced under the plan (scaffolding, never exported)
};

type ProjectConfig = {             // P6 — docs 12/13
  region?: string;                 // empty = "vn" → the VN standards packs, as before
  typology?: string;               // "nha-ong" | "biet-thu"… — unlocks rules tagged with typologies
  packs?: string[];                // explicit pack list override (the geo core always runs)
};

type Site = {
  boundary: [number, number][];    // polygon — irregular lots accepted
  north: number;                    // degrees north deviates from y+
  front: number;                    // PRIMARY street-front edge (boundary edge index) — elevations project it
  setbacks?: { front?: number; back?: number; left?: number; right?: number };
  edges?: SiteEdge[];              // P7: per-edge attributes — corner lots with several frontages
  terrain?: { elevations: number[] }; // P7: GROUND level at each boundary vertex (mm vs ±0.000,
                                   // negative = ground below the ground-floor datum); empty = flat at z=0.
                                   // Interpolated inside the lot via IDW (groundAt).
};

type SiteEdge = {                  // edge boundary[i] → boundary[i+1]
  kind?: "street" | "alley" | "neighbor"; // street/alley = open side (PLN-06 allows canopy/roof overhang)
  setback?: number;                // setback for THIS edge (mm) — checked by PLN-07
};

type Axis  = { id: string; offset: number; label?: string };
type Level = { id: string; name: string; elevation: number; height: number };
         // height = floor-to-floor; clear height = derived (minus slab thickness)

type Wall = {
  id: string; level: string;
  from: [number, number]; to: [number, number];   // wall CENTERLINE
  thickness: 110 | 220 | number;                   // Vietnamese single/double brick
  kind: "gach" | "btct" | "vach-nhe" | "kinh";     // brick | reinforced concrete | light partition | glass
  height?: number;                                 // defaults to level.height
};

type Opening = {
  id: string; wall: string;                        // ANCHORED TO A WALL — the most important invariant
  kind: "door" | "window";
  style: string;                                   // references styles.openings ("D1"…)
  offset: number;                                  // mm from the wall's `from` end to the LEFT EDGE of the rough opening
  width: number; height: number;
  sill: number;                                    // sill height; doors = 0
  swing?: "in-L" | "in-R" | "out-L" | "out-R" | "slide" | "none";
};

type Slab = {
  id: string; level: string; kind: "floor" | "roof-flat" | "canopy";
  outline: [number, number][];
  holes?: [number, number][][];                    // stair holes, light wells
  thickness: number;                               // default 120
};

/**
 * PITCHED roof (P7 — doc 12). v1 conventions:
 * - level = the TOP storey the roof covers; eave underside at z = level.elevation + level.height.
 * - outline = plan projection of the OUTER roof edge, overhang INCLUDED (overhang is metadata).
 * - pitch in DEGREES (typically 18–34°). Flat concrete roofs stay Slab roof-flat.
 * - gable: ridge along ridgeAxis through the bbox centre (2 planes); shed: 1 plane, high edge
 *   on highSide; hip: 4 planes on the bbox — outline should be a RECTANGLE (straight skeleton is v2).
 * - One geometry source for every renderer: geometry/roof.ts (roofGeometry + roofProfile).
 */
type Roof = {
  id: string; level: string;
  kind: "gable" | "hip" | "shed";
  outline: [number, number][];
  pitch: number;                                   // degrees
  ridgeAxis?: "x" | "y";                           // empty = the LONG bbox axis
  highSide?: "min" | "max";                        // shed only; default "min"
  overhang?: number;                               // mm — metadata (outline already includes it)
  thickness?: number;                              // structural depth normal to the plane; default 150
  material?: string;                               // "ngoi" | "ton" — feeds estimate (mai_ngoi 0.7 / mai_ton 0.3)
};

type Stair = {
  id: string; level: string;                       // level at the foot of the stair
  type: "1-ve" | "2-ve-U" | "chu-L";               // single flight | U-shaped 2 flights | L-shaped
  origin: [number, number]; rotation: number;
  width: number;                                    // flight width
  steps: number;                                    // total steps up to the next level
  tread: number;                                    // tread depth
  landing?: number;                                 // landing depth (U/L types)
};
// riser height is NOT stored — derived = level.height / steps; the validator checks the allowed range

type Room = {
  id: string; level: string; name: string;
  polygon: [number, number][];                     // v1: declared to the surrounding walls; v2: auto-traced from walls
  use: "khach" | "bep-an" | "ngu" | "wc" | "tho" | "lam-viec" | "gara" |
       "hanh-lang" | "cau-thang" | "san" | "gieng-troi" | "kho" | "ban-cong";
       // living | kitchen-dining | bedroom | bathroom | altar | work | garage |
       // hallway | stairwell | yard | light well | storage | balcony
  finish?: { floor?: string; wall?: string; ceiling?: string };  // references finishes
};

type Furniture = {
  id: string; level: string;
  asset: string;                                   // catalog id (carries footprint, glTF)
  at: [number, number]; rotation: number;
  elevation?: number;                              // wall-mounted items (upper kitchen cabinets…)
};

type OpeningStyle = { label: string; kind: "door" | "window";
                     leaf: "1-canh" | "2-canh" | "truot" | "xep";   // 1-leaf | 2-leaf | sliding | folding
                     material?: string; note?: string };

type Underlay = {                                  // SINGLETON — id is always "U1"
  id: string; kind: "dxf" | "image";
  source: string;                                  // file in .atelier/underlay/ (copied by the server on import)
  origin: [number, number];                        // model mm where the source (0,0) lands; images: BOTTOM-LEFT corner
  scale: number;                                   // model mm per source unit (DXF unit or pixel)
  rotation?: number; opacity?: number;             // degrees CCW; visibility 0..1 (default 0.35)
  level?: string;                                  // only shown on this storey
};
```

## "Correct-by-construction" invariants (cannot be wrong even without the validator)

1. **A door always sits on a wall** — an `Opening` anchors to a `wall` via a relative `offset`. Move the wall → the door follows, **for free**. The validator only has to check `offset + width ≤ wall length`.
2. **Stair risers always match the storey height** — riser is never stored, only `steps`; change the storey height and the riser changes automatically; the validator only checks the 150–190 range.
3. **2D/3D can never diverge** — both read the same model; there is no separate "3D file".
4. **Door and room schedules are always correct** — schedules are derived, never typed in.

## Abridged example — a 4×16m tube house (level 1 excerpt)

```jsonc
{
  "meta": { "id": "nha-anh-ba", "name": "Nhà anh Ba", "revision": 42, "unit": "mm", "app": "atelier/0.1" },
  "site": { "boundary": [[0,0],[4000,0],[4100,16000],[0,15800]], "north": 135, "front": 0 },
  "axes": { "x": [{"id":"1","offset":0},{"id":"2","offset":4000}],
            "y": [{"id":"A","offset":0},{"id":"B","offset":5200},{"id":"C","offset":9800},{"id":"D","offset":16000}] },
  "levels": [ { "id": "L1", "name": "Tầng 1", "elevation": 0, "height": 3600 },
              { "id": "L2", "name": "Tầng 2", "elevation": 3600, "height": 3400 } ],
  "walls": [
    { "id": "W1", "level": "L1", "from": [0,0],    "to": [4000,0],    "thickness": 220, "kind": "gach" },
    { "id": "W2", "level": "L1", "from": [0,0],    "to": [0,15800],   "thickness": 220, "kind": "gach" },
    { "id": "W3", "level": "L1", "from": [4000,0], "to": [4100,16000],"thickness": 220, "kind": "gach" },
    { "id": "W4", "level": "L1", "from": [0,5200], "to": [4000,5200], "thickness": 110, "kind": "gach" }
  ],
  "openings": [
    { "id": "D1", "wall": "W1", "kind": "door",   "style": "D1", "offset": 1450, "width": 1100, "height": 2400, "sill": 0, "swing": "in-L" },
    { "id": "S1", "wall": "W4", "kind": "window", "style": "S1", "offset": 2600, "width": 1200, "height": 1400, "sill": 900 }
  ],
  "stairs": [ { "id": "ST1", "level": "L1", "type": "2-ve-U", "origin": [2600,7000],
                "rotation": 0, "width": 900, "steps": 21, "tread": 260, "landing": 900 } ],
  "rooms": [
    { "id": "R1", "level": "L1", "name": "Phòng khách", "use": "khach",
      "polygon": [[110,110],[3890,110],[3890,5145],[110,5145]],
      "finish": { "floor": "gach-600", "wall": "son-trang" } }
  ],
  "furniture": [ { "id": "F1", "level": "L1", "asset": "sofa-3s-01", "at": [600,1800], "rotation": 90 } ],
  "styles": { "openings": {
    "D1": { "label": "Cửa chính", "kind": "door", "leaf": "2-canh", "material": "nhôm kính" },
    "S1": { "label": "Cửa sổ",    "kind": "window", "leaf": "truot" } } }
}
```

The **complete two-storey** sample file (with furniture, used as the renderer's golden test) is created in Phase 1: `packages/core/fixtures/nha-ong-4x16.json`.

## Typology templates (companion proposal)

Instead of designing from a blank page, Phase B starts from a **template**: `nha-ong-4x16-2t`, `nha-ong-5x18-3t`, `nha-cap-4`, … Each template is a sample model + parameterization (width/depth/storey count stretch to the real lot). Claude picks the template closest to the brief and transforms it — the quality of the first design variant leaps compared to generating from zero. Templates live in `packages/core/templates/`.
