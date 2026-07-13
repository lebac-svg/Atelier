# 05 — MCP tools

Nguyên tắc: **tool ít mà chắc**. Một cổng mutation duy nhất (`apply_ops`) để mọi thay đổi đều là transaction có validate + revision check + broadcast. Các tool còn lại là đọc, nhìn, xuất.

Mô tả (description) của từng tool sẽ nhúng luôn quy tắc hành vi cho Claude — vd. `apply_ops` ghi rõ *"luôn `get_changes_since` trước nếu lâu chưa đọc model; không bao giờ ghi đè thay đổi của người dùng"* — vì tool description chính là prompt.

## Danh sách

| # | Tool | Chữ ký (rút gọn) | Trả về |
|---|---|---|---|
| 1 | `project_new` | `(name, template?, siteBoundary?)` | model khởi tạo + revision |
| 2 | `project_open` | `(path)` | meta + revision hiện tại |
| 3 | `model_query` | `(select?: {entity?, ids?, level?}, computed?)` | phần model khớp bộ lọc (+ diện tích, thống kê nếu `computed`) |
| 4 | `apply_ops` | `(baseRevision, ops[], note?)` | `{ok, revision, warnings}` hoặc `{ok:false, errors}` |
| 5 | `get_changes_since` | `(revision)` | ops từ đó tới nay + **tóm tắt chữ** + revision hiện tại |
| 6 | `validate` | `(scope?: level \| entityIds)` | danh sách issue theo rule (07) |
| 7 | `render_plan` | `(level, {scale?, layers?})` | **ảnh PNG** trả thẳng cho Claude + đường dẫn SVG |
| 8 | `capture_view` | `(target: "3d"\|"plan", camera?)` | **ảnh PNG** — browser đang mở chụp canvas gửi về |
| 9 | `editor_open` | `()` | URL + tự mở trình duyệt mặc định |
| 10 | `export` | `(format: "pdf"\|"svg"\|"dxf"\|"gltf"\|"ifc", sheets?)` | đường dẫn file trong `.atelier/exports/` |
| 11 | `assets_search` | `(query, category?, maxFootprint?)` | danh sách asset: id, tên, kích thước footprint, ảnh thumbnail |
| 12 | `brief_get` / `brief_set` | `() / (patch)` | brief hiện tại |
| 13 | `standards_lookup` | `(query)` | rule + số liệu + nguồn trích dẫn (để Claude trả lời "vì sao phải ≥900?") |
| 14 | `estimate_cost` | `(level: "so-bo")` | 🔭 v2 — khối lượng từ model × bảng đơn giá |
| 15 | `history_restore` | `(revision)` | ⚠ chỉ khi người dùng yêu cầu rõ ràng |
| 16 | `render_view` | `(kind: "elevation"\|"section", scale?)` | **ảnh PNG** mặt đứng chính / mặt cắt A-A — bổ sung ở P4 để Claude tự soi trước checkpoint E |

`export` đã mở khóa ở P4 với `pdf` (một file A3 nhiều trang) / `svg` / `dxf` (TS thuần, xem ADR-08); `gltf` chờ P5, `ifc` ở backlog.

## Bộ từ vựng ops (dùng chung cho MCP lẫn web editor)

```ts
type Op =
  | { op: "add";    entity: EntityKind; data: object }         // data chứa id do client tạo
  | { op: "update"; entity: EntityKind; id: string; data: object }  // shallow-merge patch
  | { op: "delete"; entity: EntityKind; id: string };

type EntityKind = "level" | "wall" | "opening" | "slab" | "stair"
                | "room" | "furniture" | "axis" | "style" | "finish";
```

- Một lời gọi `apply_ops` = **một transaction**: tất cả ops cùng áp hoặc cùng rollback.
- `baseRevision` phải bằng revision hiện tại của server — lệch là bị từ chối (xem `06-giao-thuc-sync.md`).
- Xóa tường → tự động xóa openings neo trên nó (cascade, server lo).
- **Không tồn tại op "thay cả model"** — để không bao giờ nghiền nát chỉnh sửa tay của người dùng. Trường hợp làm lại từ đầu: `project_new`.

## Kết quả lỗi (shape thống nhất)

```jsonc
{
  "ok": false,
  "currentRevision": 43,
  "errors": [
    { "rule": "GEO-01", "severity": "block",
      "entities": ["D2", "W7"],
      "message": "Cửa D2 (rộng 900, offset 2800) vượt ra ngoài tường W7 (dài 3400)." }
  ]
}
```

Lỗi mức `block` → transaction bị hủy, Claude đọc message tự sửa rồi gửi lại. Mức `error/warn/info` không chặn ghi — trả về trong `warnings` (xem chính sách trong `07-validator-rules.md`).

## Ví dụ một nhịp làm việc

```jsonc
// Claude thêm phòng ngủ: 1 tường ngăn + 1 cửa — MỘT transaction
apply_ops(42, [
  { "op": "add", "entity": "wall",
    "data": { "id": "W9", "level": "L2", "from": [0,9800], "to": [4000,9800],
              "thickness": 110, "kind": "gach" } },
  { "op": "add", "entity": "opening",
    "data": { "id": "D5", "wall": "W9", "kind": "door", "style": "D2",
              "offset": 300, "width": 800, "height": 2200, "sill": 0, "swing": "in-R" } }
], "Ngăn phòng ngủ 2, mở cửa ra hành lang")
// → { ok: true, revision: 43, warnings: [ { rule: "LBB-01", severity: "info",
//      message: "Thông thủy cửa D5 (760mm) chưa rơi cung đẹp thước Lỗ Ban; gần nhất: 810mm." } ] }
// → mọi browser đang mở thấy tường + cửa mọc ra NGAY LẬP TỨC
```

## Skill đi kèm (nhắc lại từ 02)

Quy trình 5 pha + cách dùng tools được đóng gói ở `.claude/skills/thiet-ke-nha/` — Claude Code trong repo này luôn thiết kế theo đúng trình tự: phỏng vấn → brief → duyệt → block → tường → validate → render → mời xem.
