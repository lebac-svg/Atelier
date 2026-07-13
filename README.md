# Atelier 📐

**Kiến trúc sư AI trong Claude Code** — từ mô tả bằng lời đến bản vẽ nhà đúng chuẩn ký hiệu và mô hình 3D có nội thất, với bản live trên trình duyệt cho phép chỉnh sửa trực tiếp bằng tay.

> **Atelier** /a-tơ-li-ê/ — "xưởng thiết kế". Tên chốt ngày 13/07/2026 (tên làm việc cũ: Thợ Cả).

## Ý tưởng cốt lõi

**Một model tham số (JSON) là nguồn sự thật duy nhất.** Claude sửa model qua MCP tools; con người sửa trực tiếp trên web editor (kéo thả, gõ số); hai bên đồng bộ realtime qua WebSocket. Renderer deterministic sinh ra bản vẽ 2D đúng ký hiệu và mô hình 3D nội thất từ cùng một nguồn — nên 2D và 3D không bao giờ lệch nhau, và ký hiệu luôn chuẩn vì không do AI vẽ.

```
Claude Code ──MCP──► Server (model + validator + renderer) ◄──WebSocket──► Trình duyệt (live editor)
```

## Trạng thái

✅ **Giai đoạn 1 — Engine + bản vẽ tĩnh: hoàn thành 13/07/2026** (71 tests xanh).
Từ fixture nhà ống 4×16m: validator 22 rules (số liệu đối chiếu **TCVN 13967:2024**), renderer mặt bằng SVG/PNG đúng ký hiệu + dim 3 chuỗi, MCP server 7 tools, skill `thiet-ke-nha`, demo trọn nhịp *phỏng vấn → brief → model → ảnh trong chat* (`packages/server/scripts/demo-p1.ts`).
✅ **Giai đoạn 2 — Live một chiều: hoàn thành 13/07/2026.**
`editor_open` mở web editor (Vite + Three.js) cùng process với MCP; mỗi `apply_ops` mọc NGAY trên màn hình — 2D là SVG do server render (ký hiệu chuẩn tuyệt đối), 3D maquette orbit (tường tách mảnh quanh cửa, chưa CSG) — kèm toast + flash 1.5s; `capture_view` trả về đúng khung người dùng đang thấy, fallback mặt bằng server khi chưa mở browser. Demo: `pnpm demo:p2`. Build editor: `pnpm build:web`.
✅ **Giai đoạn 3 — Chỉnh sửa tay: hoàn thành 13/07/2026.**
Chọn/kéo tường-cửa-nội thất ngay trên mặt bằng (tường neo khoảng cách tới tường song song gần nhất, cửa hiện khoảng cách hai đầu, nội thất hít mặt tường); **HUD gõ số** cạnh con trỏ — đang kéo gõ `4200 ⏎` là chốt đúng 4200mm; snap lưới đổi được; undo/redo per-origin (Ctrl+Z/Y — chỉ hoàn tác thao tác của mình); soft-lock "người dùng luôn thắng" (`LOCK-01`, khóa nguội 5s); panel thuộc tính thành ô nhập; `get_changes_since` tóm tắt cũ → mới cho Claude bắt kịp. Demo vòng lặp cộng tác người ↔ Claude: `pnpm demo:p3`.
✅ **Giai đoạn 4 — Hồ sơ bản vẽ: hoàn thành 13/07/2026.**
Bộ hồ sơ concept trọn vẹn đánh số KT-01…: mặt bằng từng tầng (thêm dim thông thủy trong phòng + vết cắt A-A), **mặt đứng chính**, **mặt cắt A-A qua thang** (poché, lỗ cửa, profile bậc, chiếu nghỉ), **bảng thống kê phòng & cửa**; xuất **PDF A3 một file nhiều trang**, **DXF** (TS thuần, mm thật — mở CAD đo được) và SVG. Tools mới: `export`, `render_view`. Demo: `pnpm demo:p4`.
🔜 **Giai đoạn 5 — Nội thất & trải nghiệm:** catalog ≥100 asset CC0, vật liệu, đi bộ WASD, sun study.

## Bộ tài liệu

| # | Tài liệu | Nội dung |
|---|---|---|
| 01 | [Tầm nhìn & định vị](docs/01-tam-nhin.md) | Người dùng, non-goals, cạnh tranh, điểm khác biệt |
| 02 | [Quy trình thiết kế](docs/02-quy-trinh-thiet-ke.md) | Phỏng vấn → brief → 5 pha có checkpoint duyệt |
| 03 | [Kiến trúc hệ thống](docs/03-kien-truc-he-thong.md) | Dual-client, một process, luồng dữ liệu |
| 04 | [Schema dữ liệu](docs/04-schema-du-lieu.md) | Model tham số: tường, cửa, phòng, thang, nội thất |
| 05 | [MCP tools](docs/05-mcp-tools.md) | ~14 tools + bộ từ vựng ops |
| 06 | [Giao thức sync](docs/06-giao-thuc-sync.md) | WebSocket, revision, xung đột, undo |
| 07 | [Validator & rules](docs/07-validator-rules.md) | Bộ rule TCVN + hình học + thước Lỗ Ban |
| 08 | [Renderer 2D](docs/08-renderer-2d.md) | Layer, nét, ký hiệu, dim, khung tên, SVG/PDF |
| 09 | [Web editor](docs/09-web-editor.md) | UX chỉnh sửa tay: kéo thả, gõ số, 3D, walkthrough |
| 10 | [Lộ trình](docs/10-lo-trinh.md) | 6 giai đoạn với Definition of Done + backlog |
| 11 | [Quyết định & câu hỏi mở](docs/11-quyet-dinh-mo.md) | 10 ADR + 8 câu hỏi cần bạn chốt |

## Stack dự kiến

TypeScript monorepo — Node.js (MCP server + WebSocket), Three.js (3D), SVG (bản vẽ 2D), Vite (web editor), Vitest + Playwright (test). Chi tiết và lý do: `03-kien-truc-he-thong.md`.

## Môi trường dev

Repo đã tích hợp **[haido](https://github.com/lebac-svg/haido)** (v0.2.3) — memory layer neo vào code, làm bộ nhớ dự án cho chính quá trình phát triển Atelier:

- `.mcp.json` → MCP server `haido serve` (tools: recall / remember / related / overview / stale / reanchor)
- `.claude/settings.json` → hooks tự nạp tri thức vào phiên Claude Code (SessionStart / PostToolUse / Stop)
- DB local ở `.haido/` (đã gitignore); tri thức chia sẻ qua **memory pack** `docs/memory-pack/` (commit được)
- Mở Claude Code tại thư mục repo này (restart nếu đang mở) và chấp thuận MCP server ở lần đầu

Hai memory nền tảng đã seed: 5 nguyên tắc bất di bất dịch (neo `README.md`) và trạng thái P0 chờ duyệt Q2–Q8 (neo `docs/11-quyet-dinh-mo.md`).

## 5 nguyên tắc bất di bất dịch

1. **Claude không bao giờ vẽ trực tiếp** — chỉ sửa model tham số; renderer mới là thứ vẽ.
2. **Ký hiệu chuẩn nằm trong renderer** — encode một lần theo TCVN, đúng 100% mọi lúc.
3. **Mọi mutation đi qua một cổng duy nhất** (`apply_ops`) — transaction, validate, broadcast.
4. **Người dùng luôn thắng** — chỉnh sửa tay không bao giờ bị Claude ghi đè.
5. **Claude phải tự nhìn trước khi mời người dùng xem** — validate + render + capture sau mỗi thay đổi lớn.
