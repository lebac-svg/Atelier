# 10 — Lộ trình

Mỗi giai đoạn có **Definition of Done (DoD)** và một **kịch bản demo** chạy được — không có "xong 80%".

| GĐ | Tên | Cỡ | DoD — demo chạy được |
|---|---|---|---|
| **P0** | Spec | — | Bộ docs này được duyệt, 8 câu hỏi mở (doc 11) có đáp án |
| **P1** | Engine + bản vẽ tĩnh | M | Từ fixture `nha-ong-4x16.json`: `render_plan` ra mặt bằng SVG/PNG đúng ký hiệu + dim cơ bản; ≥ 20 rules chạy có test; task **tra chuẩn TCVN** chốt số liệu ⚠; MCP tools 1–7 hoạt động — *demo: Claude Code phỏng vấn → brief → dựng model → đưa ảnh mặt bằng ngay trong chat* |
| **P2** | Live một chiều | M | `editor_open` mở browser; Claude `apply_ops` đến đâu 2D + 3D thô (orbit) mọc đến đó; `capture_view` trả ảnh browser cho Claude — *demo: "làm đến đâu dựng đến đó"* |
| **P3** | Chỉnh sửa tay | L | Chọn/kéo tường-cửa-nội thất, HUD gõ số, snap, undo, soft-lock, `get_changes_since` — *demo: người dùng kéo tường gõ `4200`, Claude nhận ra và tự điều chỉnh phòng bên cạnh* |
| **P4** | Hồ sơ bản vẽ | L | Dim engine 3 chuỗi hoàn chỉnh, khung tên, mặt đứng + mặt cắt qua thang, thống kê phòng/cửa, xuất PDF A3 + DXF (+ IFC nếu kịp) — *demo: bộ PDF một căn nhà hoàn chỉnh* |
| **P5** | Nội thất & trải nghiệm | M | Catalog ≥ 100 asset CC0 chuẩn hóa, vật liệu hoàn thiện, đi bộ WASD, sun study — *demo 60 giây ở doc 01 chạy trọn vẹn* |

Cỡ M/L là tương đối giữa các giai đoạn — ước lượng thô, chốt lại sau P1. Thứ tự P4 ↔ P5 **đảo được** tùy bạn muốn "hồ sơ chuẩn" trước hay "3D lung linh" trước.

## Pipeline asset nội thất (P5, chuẩn bị dần từ P2)

1. Nguồn **CC0**: Poly Haven (model + texture), ambientCG (texture), Sketchfab bộ lọc CC0.
2. Chuẩn hóa: scale về mm thật, pivot đáy-giữa, tối ưu poly, tên file = asset id.
3. Sinh metadata: `{ id, tên VN, category, footprint (rộng×sâu×cao), khe hở khuyến nghị, thumbnail }` — footprint nuôi validator GEO-04/STD-11, thumbnail nuôi panel catalog và `assets_search`.
4. `license-manifest.json` ghi nguồn từng asset — sạch bản quyền từ ngày 1.
5. Danh mục tối thiểu: giường (3 cỡ), tủ áo, bàn ghế ăn, sofa, kệ TV, tủ bếp dưới/trên, bồn cầu, lavabo, vòi sen, máy giặt, xe máy (để tính chỗ để xe!), bàn thờ, bàn làm việc.

## Backlog có chủ đích (đề xuất thêm — đã định vị, chưa cam kết)

| Hạng mục | Ghi chú | Khi nào |
|---|---|---|
| Dự toán sơ bộ | m² sàn, khối lượng ước lệ × bảng đơn giá (file người dùng sửa được) → `estimate_cost` | v2 |
| So sánh phương án A/B | 2 revision/branch cạnh nhau trên editor | v2 |
| Link chia sẻ chỉ-xem | token + read-only client (giao thức đã sẵn) | v2 |
| Rule pack quy hoạch địa phương | PLN — khoảng lùi/mật độ/tầng cao nhập theo dự án | P4 |
| Xuất IFC | bàn giao KTS thật (IfcOpenShell sidecar nếu cần) | P4+ |
| Render photoreal | glTF → Blender pipeline, chạy nền | P5+ |
| Import DXF/ảnh mặt bằng cũ | bài toán nhận dạng riêng, khó | xa |
| Kết cấu/MEP | ngoài phạm vi sản phẩm hiện tại | xa |

## Rủi ro chính & cách giảm

| Rủi ro | Giảm nhẹ |
|---|---|
| Dim engine xấu/chồng chữ — chỗ dễ "nhìn phát biết nghiệp dư" | Golden test so pixel với mẫu duyệt tay; tham khảo bản vẽ thật; dồn cỡ L cho P4 |
| Số liệu chuẩn sai (TCVN/QCVN/Lỗ Ban) | Rules là data + cờ `verified`; task tra văn bản gốc ở P1; chú thích trên bản vẽ khi chưa verify |
| CSG cắt lỗ cửa chậm/lỗi | `three-bvh-csg`, quy mô nhà phố nhỏ; fallback: tách tường thành mảnh quanh opening (không CSG) |
| Hai client ghi đè nhau | Revision + soft-lock + user-wins (06); e2e Playwright 2 client song song |
| Scope creep | Checkpoint duyệt từng giai đoạn; backlog có chủ đích ở trên; non-goals ở 01 |

## Chiến lược test

- **Unit (Vitest):** geometry core, validator từng rule (1 case phạm + 1 đạt).
- **Property-based (fast-check):** bất biến — sau chuỗi ops ngẫu nhiên hợp lệ, opening luôn trong tường, revision đơn điệu tăng, undo(redo(x)) = x.
- **Golden SVG:** fixture nhà mẫu → snapshot từng layer; đổi renderer phải diff có chủ đích.
- **E2E (Playwright):** hai client (giả lập agent + browser) cùng sửa — kiểm soft-lock, reject, replay khi reconnect.
