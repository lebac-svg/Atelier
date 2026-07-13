import { areaM2, estimateCost, formatVnd, type Project } from "@atelier/core";
import { renderPlanSvg } from "./render/render.js";

/**
 * So sánh phương án A/B (backlog v2 → 13/07/2026): diff hai model + trang
 * HTML đặt hai mặt bằng cạnh nhau. Diff nói bằng thứ gia chủ quan tâm:
 * phòng nào rộng ra/hẹp lại bao nhiêu m², và MỖI PHƯƠNG ÁN TỐN BAO NHIÊU TIỀN.
 */

export type VariantSide = { label: string; model: Project };

export type RoomDiff = {
  id: string;
  name: string;
  level: string;
  a_m2: number | null; // null = phương án đó không có phòng này
  b_m2: number | null;
};

export type CompareReport = {
  a: { label: string; tongPhong_m2: number; walls: number; openings: number; furniture: number; duToan_vnd: number };
  b: { label: string; tongPhong_m2: number; walls: number; openings: number; furniture: number; duToan_vnd: number };
  rooms: RoomDiff[];
  /** Các dòng đáng nói nhất — nuôi text cho Claude + phần "khác biệt chính" trên trang. */
  highlights: string[];
};

const r1 = (v: number): number => Math.round(v * 10) / 10;

function sideStats(label: string, p: Project): CompareReport["a"] {
  return {
    label,
    tongPhong_m2: r1(p.rooms.reduce((s, r) => s + areaM2(r.polygon), 0)),
    walls: p.walls.length,
    openings: p.openings.length,
    furniture: p.furniture.length,
    duToan_vnd: estimateCost(p).tong_vnd,
  };
}

export function compareProjects(a: VariantSide, b: VariantSide): CompareReport {
  const rooms = new Map<string, RoomDiff>();
  for (const r of a.model.rooms) {
    rooms.set(r.id, { id: r.id, name: r.name, level: r.level, a_m2: r1(areaM2(r.polygon)), b_m2: null });
  }
  for (const r of b.model.rooms) {
    const cur = rooms.get(r.id);
    if (cur) {
      cur.b_m2 = r1(areaM2(r.polygon));
      if (!cur.name) cur.name = r.name;
    } else {
      rooms.set(r.id, { id: r.id, name: r.name, level: r.level, a_m2: null, b_m2: r1(areaM2(r.polygon)) });
    }
  }
  const numOf = (id: string): number => Number(/\d+/.exec(id)?.[0] ?? 0);
  const roomList = [...rooms.values()].sort(
    (x, y) => x.level.localeCompare(y.level) || numOf(x.id) - numOf(y.id) || x.id.localeCompare(y.id),
  );

  const sa = sideStats(a.label, a.model);
  const sb = sideStats(b.label, b.model);

  const highlights: string[] = [];
  for (const r of roomList) {
    if (r.a_m2 == null) highlights.push(`${r.name} (${r.id}, ${r.level}): chỉ có ở ${sb.label} — ${r.b_m2}m²`);
    else if (r.b_m2 == null) highlights.push(`${r.name} (${r.id}, ${r.level}): chỉ có ở ${sa.label} — ${r.a_m2}m²`);
    else if (Math.abs(r.a_m2 - r.b_m2) >= 0.3) {
      const d = r1(r.b_m2 - r.a_m2);
      highlights.push(`${r.name} (${r.id}): ${r.a_m2}m² → ${r.b_m2}m² (${d > 0 ? "+" : ""}${d}m²)`);
    }
  }
  const dTien = sb.duToan_vnd - sa.duToan_vnd;
  if (Math.abs(dTien) >= 5_000_000) {
    highlights.push(`Dự toán: ${formatVnd(sa.duToan_vnd)} → ${formatVnd(sb.duToan_vnd)} (${dTien > 0 ? "đắt hơn" : "rẻ hơn"} ~${formatVnd(Math.abs(dTien))})`);
  }
  if (sa.furniture !== sb.furniture) highlights.push(`Nội thất: ${sa.furniture} → ${sb.furniture} món`);
  if (highlights.length === 0) highlights.push("Hai phương án gần như trùng nhau về phòng ốc và chi phí.");

  return { a: sa, b: sb, rooms: roomList, highlights };
}

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Trang so sánh server-render — hai mặt bằng CẠNH NHAU + bảng diff.
 * Dùng cho browser (route /so-sanh) lẫn chụp PNG trả Claude (variant_compare).
 */
export function compareHtml(a: VariantSide, b: VariantSide, levelId: string, projectName: string): string {
  const report = compareProjects(a, b);
  const svgA = renderPlanSvg(a.model, levelId, { embedFont: false }).svg;
  const svgB = renderPlanSvg(b.model, levelId, { embedFont: false }).svg;

  const roomRows = report.rooms
    .map((r) => {
      const d = r.a_m2 != null && r.b_m2 != null ? r1(r.b_m2 - r.a_m2) : null;
      const delta = d == null ? "—" : d === 0 ? "0" : `${d > 0 ? "+" : ""}${d}`;
      const mark = d != null && Math.abs(d) >= 0.3 ? ' class="doi"' : "";
      return `<tr${mark}><td>${esc(r.id)}</td><td>${esc(r.name)}</td><td>${esc(r.level)}</td>` +
        `<td class="so">${r.a_m2 ?? "—"}</td><td class="so">${r.b_m2 ?? "—"}</td><td class="so">${delta}</td></tr>`;
    })
    .join("");

  const tongRow =
    `<tr class="tong"><td></td><td>TỔNG DIỆN TÍCH PHÒNG</td><td></td>` +
    `<td class="so">${report.a.tongPhong_m2}</td><td class="so">${report.b.tongPhong_m2}</td>` +
    `<td class="so">${r1(report.b.tongPhong_m2 - report.a.tongPhong_m2)}</td></tr>` +
    `<tr class="tong"><td></td><td>DỰ TOÁN SƠ BỘ</td><td></td>` +
    `<td class="so">${formatVnd(report.a.duToan_vnd)}</td><td class="so">${formatVnd(report.b.duToan_vnd)}</td>` +
    `<td class="so">${formatVnd(report.b.duToan_vnd - report.a.duToan_vnd)}</td></tr>`;

  return `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<title>So sánh phương án — ${esc(projectName)}</title>
<style>
  body{margin:0;padding:16px 20px;background:#14171b;color:#e9e6df;font:13px "Be Vietnam Pro","Segoe UI",system-ui,sans-serif}
  h1{font-size:15px;font-weight:700;margin:0 0 2px}
  .sub{color:#98a1ac;font-size:11px;margin-bottom:12px}
  .cols{display:flex;gap:14px}
  .pane{flex:1;min-width:0}
  .pane h2{font-size:12px;font-weight:700;margin:0 0 6px;color:#6ea0d8;text-transform:uppercase;letter-spacing:.08em}
  .pane .khi{color:#98a1ac;font-weight:400;text-transform:none;letter-spacing:0}
  .paper{background:#fff;border-radius:6px;box-shadow:0 8px 28px rgba(0,0,0,.5);overflow:hidden}
  .paper svg{display:block;width:100%;height:auto}
  table{border-collapse:collapse;width:100%;margin-top:14px;font-size:12px}
  th,td{padding:4px 8px;text-align:left;border-bottom:1px solid #343b46}
  th{color:#98a1ac;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.1em}
  td.so,th.so{text-align:right;font-family:Consolas,ui-monospace,monospace}
  tr.doi td{color:#d9a441}
  tr.tong td{font-weight:700;border-top:2px solid #343b46}
  .hl{margin-top:12px;padding:10px 12px;border:1px solid #343b46;border-left:3px solid #6ea0d8;border-radius:6px}
  .hl b{color:#6ea0d8;font-size:11px;text-transform:uppercase;letter-spacing:.08em}
  .hl ul{margin:6px 0 0;padding-left:18px;line-height:1.55}
</style></head><body>
<h1>SO SÁNH PHƯƠNG ÁN — ${esc(projectName)}</h1>
<div class="sub">Mặt bằng ${esc(levelId)} · A = ${esc(report.a.label)} · B = ${esc(report.b.label)}</div>
<div class="cols">
  <div class="pane"><h2>A · ${esc(report.a.label)} <span class="khi">${report.a.walls} tường · ${report.a.openings} cửa · ${report.a.furniture} nội thất</span></h2><div class="paper">${svgA}</div></div>
  <div class="pane"><h2>B · ${esc(report.b.label)} <span class="khi">${report.b.walls} tường · ${report.b.openings} cửa · ${report.b.furniture} nội thất</span></h2><div class="paper">${svgB}</div></div>
</div>
<div class="hl"><b>Khác biệt chính</b><ul>${report.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>
<table>
  <tr><th>ID</th><th>Phòng</th><th>Tầng</th><th class="so">A (m²)</th><th class="so">B (m²)</th><th class="so">Δ</th></tr>
  ${roomRows}
  ${tongRow}
</table>
</body></html>`;
}
