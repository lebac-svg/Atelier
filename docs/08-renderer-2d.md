# 08 — Renderer 2D (bản vẽ)

Renderer là **người gác chuẩn**: ký hiệu, nét, dim theo quy ước bản vẽ xây dựng được encode một lần ở đây — Claude và người dùng không bao giờ vẽ ký hiệu bằng tay, nên không bao giờ sai.

## Nguyên tắc paper-space

Hình học vẽ theo mm thật (model-space); **chữ, ký hiệu, độ dày nét tính theo mm trên giấy** (paper-space) rồi nhân tỷ lệ. Ví dụ text dim 2.5mm giấy → ở 1:50 là 125mm model. Nhờ vậy in ra ở đúng tỷ lệ, bản vẽ đọc chuẩn như vẽ tay nghề.

- Tỷ lệ mặc định: **1:50** cho mặt bằng nhà phố trên khổ **A3 ngang**; tự hạ 1:100 nếu không vừa.
- Bộ nét (mm giấy): `0.13 / 0.18 / 0.25 / 0.35 / 0.50 / 0.70`.

## Layers & nét

| Layer | Nội dung | Nét |
|---|---|---|
| `TRUC` | Đường trục + bubble tròn đánh số (1,2… / A,B…) | 0.13 chấm gạch |
| `TUONG-CAT` | Tường bị mặt phẳng cắt (cao cắt quy ước +1200) | **0.50–0.70** + poché/hatch |
| `TUONG-THAY` | Cạnh thấy dưới mặt phẳng cắt (bậu cửa sổ, bậc…) | 0.25 |
| `CUA` | Ký hiệu cửa đi/cửa sổ | 0.25 / cánh 0.35 |
| `THANG` | Bậc, mũi tên hướng lên, đường cắt zigzag | 0.25 |
| `NOI-THAT` | Nội thất + thiết bị vệ sinh (footprint 2D từ catalog) | 0.13–0.18 |
| `DIM` | 3 chuỗi kích thước + dim trong | 0.13, tick chéo |
| `TEXT` | Tên phòng + diện tích, cao độ, ghi chú | 0.13 |
| `HATCH` | Ký hiệu vật liệu mặt cắt | 0.13 |
| `KHUNG` | Khung bản vẽ + khung tên | 0.35/0.70 |

## Thư viện ký hiệu (đúc sẵn, tham số hóa)

- **Cửa đi 1 cánh:** nét cánh vuông góc tường + cung 1/4 thể hiện chiều mở (theo `swing`); 2 cánh: hai cung đối xứng; **trượt:** nét cánh song song tường + mũi tên.
- **Cửa sổ:** cắt tường, 3 nét song song trong bề dày tường (2 nét với vách nhẹ); bậu thể hiện ở `TUONG-THAY`.
- **Thang:** vạch bậc theo `tread` thật, mũi tên từ bậc 1 ghi "LÊN", số bậc, đường cắt zigzag ở giữa vế (quy ước mặt bằng cắt qua thang).
- **Trục:** bubble ⌀8mm giấy ở hai đầu, số trong bubble.
- **Cao độ:** ký hiệu ▽ + giá trị `±0.000`, `+3.600`…
- **Hướng bắc:** góc bản vẽ, xoay theo `site.north`.
- **Vết cắt A-A:** hai đầu mũi tên đậm (xuất hiện từ P4 khi có mặt cắt).
- **Hatch vật liệu cắt:** gạch = chéo đôi 45°; BTCT = ký hiệu bê tông; ⚠ mẫu hatch đối chiếu TCVN ký hiệu vật liệu ở task tra chuẩn P1.
- **Ký hiệu cửa kèm nhãn:** `D1`, `S2`… đặt cạnh ký hiệu — khớp bảng thống kê cửa.

## Dim engine — phần khó nhất, đầu tư nhất

Kiểu kiến trúc VN: **tick chéo 45°** (không phải mũi tên cơ khí), số đặt trên đường dim, đơn vị mm không ghi hậu tố.

Ba chuỗi dim mỗi cạnh nhà (từ trong ra ngoài):

1. **Chuỗi chi tiết:** mảng tường – ô chờ cửa – mảng tường (đủ để thợ đặt cửa đúng chỗ);
2. **Chuỗi trục:** khoảng cách trục–trục;
3. **Chuỗi tổng:** toàn chiều.

Thuật toán: chiếu các điểm sự kiện (đầu tường, mép opening, trục) lên cạnh → gom khoảng < 1mm → sinh chuỗi; **né chồng chữ**: số không đủ chỗ thì đẩy ra ngoài kèm nét dẫn. Dim trong nhà: bề rộng thông thủy phòng chính + tên phòng và diện tích (`PHÒNG KHÁCH / 18.2m²`). Golden test bằng ảnh chụp so khớp từng pixel với mẫu đã duyệt bằng mắt.

## Chữ & font

- Font **Be Vietnam Pro** (Google Fonts, đủ dấu tiếng Việt, đóng gói local — không tải mạng runtime).
- Cỡ chữ giấy: dim 2.5mm, tên phòng 3.5mm, tiêu đề bản vẽ 5mm.
- Tên phòng viết HOA có dấu.

## Khung tên (A3 ngang)

Ô: tên dự án / hạng mục / tên bản vẽ / tỷ lệ / ngày / số hiệu (`KT-01`…) / "Thiết kế: Atelier AI + <tên người dùng>" / ô trống "Kiểm" (dành cho KTS thật nếu có). Kèm ghi chú cố định: *"Bản vẽ concept — không thay thế hồ sơ thiết kế có chữ ký KTS hành nghề"* + chú thích ⚠ nếu còn rule `verified:false`.

## Định dạng ra

| Định dạng | Cách làm | Giai đoạn |
|---|---|---|
| **SVG** | Sinh trực tiếp; mỗi layer một `<g id>`; mỗi entity `data-id` → editor click chọn được, test diff được | P1 |
| **PNG** | Chromium headless (Playwright) chụp SVG — trả cho Claude "nhìn" | P1 |
| **PDF** | Sheet = khung tên + viewport đặt đúng tỷ lệ; Playwright print đúng khổ | P4 |
| **DXF** | Map layer/polyline/text 1-1 từ cùng scene graph; lib TS hoặc sidecar Python `ezdxf` (ADR-08, quyết ở P4) | P4 |
| **Mặt đứng / mặt cắt** | Sinh từ model: mặt đứng chiếu cạnh trước; mặt cắt bắt buộc một vết qua thang | P4 |

## Kiến trúc code

```
model → (geometry core) → SceneGraph2D trung gian {layer, primitive, dataId}
      → svg-writer (P1) / dxf-writer (P4) / sheet-composer → PDF
```

SceneGraph trung gian để SVG và DXF **không bao giờ lệch nhau** — cùng một nguồn primitive.
