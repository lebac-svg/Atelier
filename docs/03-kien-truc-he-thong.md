# 03 — Kiến trúc hệ thống

## Sơ đồ tổng

```
┌─────────────┐   MCP (stdio)   ┌──────────────────────────────────┐
│ Claude Code  │◄───────────────►│        atelier-server (Node)        │
│  + skill      │                │  1 process duy nhất               │
│  thiet-ke-nha │                │  ┌─────────────────────────────┐ │
└─────────────┘                │  │ Model store (JSON + revision)│ │
                                │  │ Validator (rules TCVN, GEO)  │ │
                                │  │ Renderer 2D (SVG → PNG/PDF)  │ │
                                │  │ Geometry core (shared)       │ │
                                │  │ History log (ops journal)    │ │
                                │  └─────────────────────────────┘ │
                                │        HTTP + WebSocket           │
                                └───────────────┬──────────────────┘
                                                │ ws://localhost:<port>
                                ┌───────────────▼──────────────────┐
                                │   Web editor (trình duyệt)        │
                                │   • Mặt bằng 2D (SVG tương tác)   │
                                │   • 3D Three.js + walkthrough     │
                                │   • Kéo thả, gõ số, undo          │
                                └──────────────────────────────────┘
```

**Nguyên tắc số 1: một process, một nguồn state.** MCP server và web server là cùng một process Node — không bao giờ có hai bản model lệch nhau phải "đồng bộ chéo".

## Các thành phần

| Thành phần | Vai trò | Ghi chú |
|---|---|---|
| **Model store** | Giữ model JSON + số `revision` tăng dần; áp ops như transaction | Nguồn sự thật duy nhất |
| **Geometry core** | Toán hình học dùng chung: đoạn tường, polygon phòng, footprint nội thất, phép cắt lỗ cửa | Package riêng, chạy được cả server lẫn browser |
| **Validator** | Chạy bộ rule sau mỗi batch ops; GEO error → rollback, STD → báo cáo | Xem `07-validator-rules.md` |
| **Renderer 2D** | Model → SVG theo layer/ký hiệu/dim; SVG → PNG (cho Claude nhìn), → PDF (hồ sơ) | Xem `08-renderer-2d.md` |
| **History log** | Journal ops (`.atelier/history.jsonl`) phục vụ `get_changes_since`, undo, khôi phục | |
| **Web editor** | UI người dùng; mọi thao tác tay cũng biến thành ops gửi về server | Xem `09-web-editor.md` |

## Luồng dữ liệu

**Claude sửa model:**
```
Claude ──apply_ops(baseRev, ops)──► server: validate ─┬─ lỗi GEO → reject, trả lỗi để Claude tự sửa
                                                      └─ OK → áp, rev++, ghi journal
                                                             ──patch──► broadcast mọi browser đang mở
```
→ "làm đến đâu dựng đến đó": mỗi tool call thành công là một nhịp cập nhật ngay trên màn hình.

**Người dùng kéo tường:**
```
Browser ──ops(origin:user)──► server (validate, áp, rev++) ──patch──► browser khác (nếu có)
Claude (lượt sau) ──get_changes_since(rev cũ)──► "người dùng đã dời tường W12 tới x=4200"
```

**Claude "nhìn":**
```
Claude ──capture_view("3d")──► server ──capture_request──► browser chụp canvas ──PNG──► Claude
```
Claude thấy **đúng cái người dùng đang thấy**. Nếu không có browser nào mở: fallback render phía server (2D luôn có; 3D headless để giai đoạn sau).

## File trên đĩa (trong repo dự án nhà của người dùng)

```
nha-cua-toi/
├── atelier.project.json    # model tham số — NGUỒN SỰ THẬT, commit vào git
├── .atelier/
│   ├── history.jsonl     # journal ops (append-only)
│   └── exports/          # PDF/SVG/DXF/glTF đã xuất
```

Model là file JSON trong repo → **git version hóa miễn phí** (mỗi checkpoint duyệt = một commit), Claude Code có thể đọc file trực tiếp khi cần, và so sánh phương án A/B sau này chỉ là so hai revision/branch.

## Stack & lý do

| Lớp | Chọn | Lý do |
|---|---|---|
| Ngôn ngữ | TypeScript toàn bộ (monorepo pnpm) | Một ngôn ngữ cho server + web + geometry dùng chung; khớp stack bạn đang dùng (rong-choi) |
| MCP server | `@modelcontextprotocol/sdk` (stdio) | Chuẩn chính thức |
| Web server | Fastify hoặc Hono + `ws` | Nhẹ, cùng process |
| 3D | Three.js (+ `three-bvh-csg` cắt lỗ cửa) | Phổ biến, đủ mạnh cho quy mô nhà phố |
| 2D | SVG tự sinh (không lib vẽ) | Kiểm soát tuyệt đối ký hiệu/nét theo TCVN; `data-id` từng entity để click chọn |
| PNG/PDF | Chromium headless (Playwright) | Một công cụ làm cả capture, PNG lẫn in PDF đúng khổ giấy |
| Test | Vitest + golden SVG snapshot + fast-check; Playwright e2e | Renderer và geometry phải có golden tests |

Cấu trúc monorepo:

```
atelier/
├── packages/
│   ├── core/      # schema, geometry, validator, ops — thuần, không I/O
│   ├── server/    # MCP + HTTP/WS + renderer + journal
│   ├── web/       # editor (Vite + Three.js)
│   └── assets/    # catalog nội thất + pipeline chuẩn hóa glTF
├── docs/
└── .claude/skills/thiet-ke-nha/
```

## Bảo mật & phạm vi chạy

v1 chạy local: server bind `localhost`, không auth. Khi nào cần chia sẻ link cho người khác xem (v2) mới thêm token + read-only mode.

## Quyết định "vì sao không dùng Blender/SketchUp MCP có sẵn"

Live editor hai chiều trên browser là giá trị cốt lõi — Blender/SketchUp không cho được điều đó, và kéo theo cài đặt nặng. Three.js trong browser + renderer SVG tự chủ cho phép kiểm soát 100% trải nghiệm và ký hiệu. Blender chỉ còn vai trò *tùy chọn* ở P5+: xuất glTF sang để render ảnh photoreal. (ADR-01 trong `11-quyet-dinh-mo.md`.)
