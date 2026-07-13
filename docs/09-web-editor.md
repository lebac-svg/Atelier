🇬🇧 [English translation](en/09-web-editor.md)

# 09 — Web editor (bản live trên trình duyệt)

Yêu cầu gốc: *"mở trình duyệt tạo bản live — làm đến đâu dựng đến đó — và chỉnh sửa, kéo thả, thao tác tay trực tiếp được"*. Editor này là kênh **chính xác nhất** trong 3 kênh nhập (xem 02).

## Bố cục

```
┌────────────────────────────────────────────────────────────────┐
│ Atelier — Nhà anh Ba         [Mặt bằng] [3D] [Chia đôi]   ⚙   │
├───┬────────────────────────────────────────────┬───────────────┤
│ V │                                            │ THUỘC TÍNH    │
│ 1 │                                            │  W4 · Tường   │
│ 2 │            CANVAS                          │  dày 110      │
│ 3 │   (SVG mặt bằng / Three.js 3D)             │  dài [3200 ]  │
│ 4 │                                            ├───────────────┤
│ 5 │                                            │ KIỂM TRA (3)  │
│ M │                                            │ ⚠ Bếp 4.6m²… │
├───┴────────────────────────────────────────────┴───────────────┤
│ Tầng: [1][2]  rev 44 ● đã kết nối   ⟲ ⟳   snap 50   Claude ✎  │
└────────────────────────────────────────────────────────────────┘
```

## Công cụ & phím tắt

| Phím | Công cụ | Ghi chú |
|---|---|---|
| `V` | Chọn / di chuyển | mặc định |
| `1` | Vẽ tường | click–click theo tim, orthogonal mặc định, giữ `Alt` để tự do |
| `2` / `3` | Đặt cửa đi / cửa sổ | trượt dọc tường, hiện khoảng cách hai đầu |
| `4` | Vẽ phòng | polygon bắt theo tường |
| `5` | Nội thất | mở panel catalog, kéo thả vào phòng |
| `M` | Đo | thước tạm, không ghi vào model |
| `Del` / `Ctrl+Z` / `Ctrl+Y` | Xóa / hoàn tác / làm lại | undo chỉ áp cho thao tác của mình (xem 06) |

## HUD gõ số — tính năng ăn tiền nhất

Bất kỳ lúc nào đang kéo/vẽ, một ô số nổi cạnh con trỏ:

- Kéo tường, gõ `3200 ⏎` → chốt **đúng 3200mm**, khỏi căn chuột.
- Vẽ tường, gõ chiều dài; đặt cửa, gõ khoảng cách tới đầu tường.
- Trong panel thuộc tính, mọi kích thước là ô nhập — sửa số là model đổi.

Đây là cách SketchUp/AutoCAD đạt độ chính xác — và là mảnh ghép trả lời "prompt không thể chính xác từng mm, nhưng hệ thống thì có".

## Snap & guides

Lưới 50mm (đổi được) · endpoint/midpoint tường · thẳng hàng với tường/trục khác (guide đứt nét) · vuông góc mặc định. Nội thất snap sát tường + khe hở gõ được.

## Vòng thao tác → model

Mỗi thao tác tay = **ops** như của Claude: kéo thả trong lúc kéo chỉ preview local + gửi `presence.draggingIds` (soft-lock); **thả chuột** mới gửi 1 op. Optimistic UI: áp ngay, server reject thì hoàn lại + toast lý do. Chọn đối tượng đồng bộ hai chiều 2D ↔ 3D ↔ panel thuộc tính (qua `data-id`).

## Hiện diện của Claude

- Toast mỗi patch origin `agent`: *“Claude: Ngăn phòng ngủ 2, mở cửa ra hành lang (rev 43)”*.
- Entity vừa đổi **flash highlight** 1.5s — người dùng luôn biết cái gì vừa mọc ra, "làm đến đâu thấy đến đó" theo đúng nghĩa đen.
- Panel KIỂM TRA: issue từ validator, click → zoom tới entity lỗi.

## Chế độ 3D

| Chế độ | Mô tả |
|---|---|
| **Orbit** | mặc định; extrude tường + cắt lỗ cửa (three-bvh-csg), sàn/thang/mái, nội thất glTF |
| **Đi bộ** | `WASD` + pointer-lock, cao mắt 1600mm — cảm nhận không gian thật (P5) |
| **Nắng** | slider giờ + tháng; mặt trời tính từ `site.north` + vĩ độ trong brief — xem nắng sáng/chiều rọi phòng nào (P5) |

Rebuild **incremental**: mỗi patch chỉ dựng lại mesh của entity đổi — không dựng lại cả nhà.

## Hiệu năng & phạm vi

- Quy mô mục tiêu: nhà phố < 2.000 entities — SVG re-render < 16ms, 3D 60fps trên laptop phổ thông.
- Trình duyệt: Chromium + Firefox. **Ngoài phạm vi v1:** mobile, chia sẻ link cho người xem khác (v2 — giao thức đã sẵn sàng vì browser thứ N chỉ là thêm một client), so sánh phương án A/B cạnh nhau (v2).
- Ngôn ngữ UI: tiếng Việt trước (xưng "bạn"), i18n để sẵn khung. ✅ *13/07/2026: khung i18n đã dựng — toàn bộ UI chrome + tên 106 asset song ngữ vi/en, đổi bằng nút VI/EN hoặc `?lang=en` (mặc định VẪN tiếng Việt, không auto-detect). Giới hạn v1: bản vẽ xuất ra và message validator/summary từ server giữ tiếng Việt (hồ sơ là tài liệu TCVN; message broadcast chung mọi client).*
