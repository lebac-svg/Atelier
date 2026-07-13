🇬🇧 [English translation](en/06-sync-protocol.md)

# 06 — Giao thức đồng bộ (WebSocket)

Linh hồn của trải nghiệm "làm đến đâu dựng đến đó" và "chỉnh tay được". Hai loại client — **agent** (Claude qua MCP) và **browser** (người dùng) — cùng sửa một model qua cùng bộ từ vựng ops.

## Revision — đồng hồ duy nhất

- `revision` là số nguyên tăng dần, **mỗi transaction áp thành công +1**.
- Mọi lệnh ghi mang theo `baseRevision`. Server chỉ áp khi `baseRevision == revision hiện tại`, ngược lại từ chối kèm revision mới → client đọc lại rồi thử lại. (Optimistic concurrency — đơn giản, đủ cho 2 client.)
- Journal append-only `.atelier/history.jsonl`, mỗi dòng:
  ```jsonc
  { "rev": 43, "ts": "2026-07-13T10:21:04Z", "origin": "agent" | "user",
    "ops": [...], "note": "Ngăn phòng ngủ 2" }
  ```
  Phục vụ `get_changes_since`, undo, restore, và audit "ai đã sửa gì".

## Thông điệp

**Client → Server**

| Type | Nội dung | Ghi chú |
|---|---|---|
| `hello` | `{ clientKind: "browser", lastRevision? }` | Kết nối/kết nối lại |
| `ops` | `{ baseRevision, ops[], note? }` | Cùng shape với `apply_ops` |
| `presence` | `{ selection?, draggingIds?, tool? }` | Đang chọn gì, kéo gì |
| `capture_result` | `{ requestId, png (base64) }` | Trả ảnh cho `capture_view` |

**Server → Client**

| Type | Nội dung | Ghi chú |
|---|---|---|
| `snapshot` | `{ model, revision }` | Khi mới nối, hoặc gap quá lớn |
| `patch` | `{ revision, ops[], origin, note? }` | Nhịp cập nhật realtime |
| `reject` | `{ yourBase, currentRevision, errors[] }` | Ghi thất bại |
| `validation` | `{ revision, issues[] }` | Kết quả validator sau mỗi patch |
| `capture_request` | `{ requestId, target, camera? }` | Nhờ browser chụp canvas |
| `presence` | `{ peers: [...] }` | Cho hiển thị "Claude đang sửa…" |

## Xung đột — "người dùng luôn thắng"

Cơ chế ba tầng, từ cứng đến mềm:

1. **Soft-lock khi đang kéo:** browser gửi `presence.draggingIds`; mọi op của agent chạm entity đang bị kéo → `reject` mã `locked` ("W12 đang được người dùng chỉnh"). Lock tự nhả 5 giây sau khi thả chuột.
2. **Stale-write bị từ chối:** agent ghi với `baseRevision` cũ (vì người dùng vừa sửa) → reject → agent buộc phải `get_changes_since` (thấy người dùng đã đổi gì) rồi mới quyết định lại. Không bao giờ "ghi đè mù".
3. **Quy ước hành vi trong skill/tool description:** Claude được dặn — thay đổi của người dùng là quyết định thiết kế, phải tôn trọng và thích nghi (chỉnh phòng bên cạnh theo), không được "sửa lại cho đúng ý mình" trừ khi vi phạm rule, khi đó **nói** với người dùng chứ không tự đổi.

Browser thao tác liên tục (kéo 60fps) thì sao? — Trong lúc kéo chỉ cập nhật **local + presence** (preview); khi **thả chuột** mới gửi một op `update` duy nhất. Server không bao giờ thấy 60 ops/giây.

## Undo / Redo

- **Browser:** stack undo cục bộ = nghịch đảo các op **do chính mình** tạo (per-origin undo). Ctrl+Z gửi op nghịch đảo như một op thường (vẫn qua validate + revision). Không undo được thao tác của Claude — tránh hai bên giật qua giật lại.
- **Claude:** không có tool undo. Muốn quay lui → `history_restore(revision)` và **chỉ khi người dùng yêu cầu** ("quay lại như lúc nãy đi").
- Mỗi checkpoint duyệt (pha A–E) nên kèm một git commit file model — tầng undo thô nhưng chắc chắn nhất.

## Kết nối lại & nhiều tab

- Browser reconnect gửi `hello{lastRevision}`; server replay ops từ journal nếu gap nhỏ, ngược lại gửi `snapshot`.
- Nhiều tab/nhiều browser: đều là client `browser` bình đẳng — giao thức không đổi (đây cũng chính là nền cho tính năng "gửi link cho vợ/chồng xem" ở v2).
- Heartbeat ping/pong 15s; server không giữ state riêng cho client chết.

## Trình tự minh họa — người dùng kéo tường, Claude phản ứng

```
browser: (thả chuột) ops{base:43, [{update wall W4 to:[4000,5600]}]}
server : áp → rev 44 → patch{44, origin:"user"} → validation{44, [STD-01 warn: "Bếp còn 4.6m²"]}
claude : (lượt sau) get_changes_since(43)
         → "rev44 (user): dời tường W4 từ y=5200 → y=5600 (phòng khách +0.4m sâu, bếp -0.4m)"
claude : "Bạn nới phòng khách ra 5.6m — bếp hơi chật lại (4.6m²). Tôi dời cửa S1 theo và
          đẩy bàn ăn sát tường nhé?" → apply_ops(44, [...])
```

Đây chính là vòng lặp cộng tác người–AI mà chưa đối thủ nào có.
