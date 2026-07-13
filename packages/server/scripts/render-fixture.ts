import { loadNhaOng4x16 } from "@atelier/core";
import { closePngRenderer } from "../src/render/png.js";
import { renderPlanFiles } from "../src/render/render.js";

const outDir = process.argv[2] ?? ".atelier/exports";
const p = loadNhaOng4x16();
for (const lv of ["L1", "L2"]) {
  const r = await renderPlanFiles(p, lv, outDir, { date: "13/07/2026", designer: "anh Ba" });
  console.log(`${lv}: svg=${r.svgPath} png=${r.pngPath ?? "(lỗi)"} ${r.pngError ?? ""}`);
}
await closePngRenderer();
