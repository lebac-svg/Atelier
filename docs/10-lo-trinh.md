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

> ✅ **P1 hoàn thành 13/07/2026.** DoD đủ: fixture `nha-ong-4x16.json` → `render_plan` ra SVG/PNG đúng ký hiệu + dim; 22 rules chạy có test (mỗi rule 1 phạm + 1 đạt, số liệu đối chiếu TCVN 13967:2024); MCP tools 1–7 hoạt động (demo `packages/server/scripts/demo-p1.ts`); tổng 71 tests. Điều chỉnh so với spec: chuẩn áp dụng là TCVN 13967:2024 + 9411:2012 (4451 chỉ áp chung cư); `project_new` nhận thêm `brief` để chốt pha A.

> ✅ **P5 hoàn thành 13/07/2026 — demo 60 giây của doc 01 chạy trọn vẹn** (`pnpm demo:p5`: dựng live → kéo W13 gõ 4200 → Claude điều chỉnh 2 phòng + kê lại đồ → đi bộ WASD xuyên nhà có nội thất → sun study 16h). DoD: **catalog 106 asset chuẩn hóa** (kích thước mm thật, tên VN, khe hở nuôi STD-11, `mountHeight` cho đồ treo, `license-manifest.json` phủ từng asset). *Điều chỉnh so spec:* asset là **hình học THAM SỐ tự sinh** (builder 3D theo category + ký hiệu 2D trong renderer — CC0 by construction, một nguồn glyph cho mặt bằng/thumbnail/contact-sheet); glTF CC0 tải về (Poly Haven…) lùi P5+ cùng render photoreal — manifest ghi sẵn chỗ thay, footprint là hợp đồng kích thước nên thay model không đổi id. **Vật liệu hoàn thiện**: finishes có `color`, sàn 3D tô theo `room.finish.floor`. **Đi bộ WASD**: pointer-lock, mắt +1600, Shift chạy, Esc thoát (tự xử lý — headless không có lock vẫn đi được). **Sun study**: slider giờ+tháng, mặt trời tính từ vĩ độ brief (`dat.vi_do`, mặc định 10.8) + `site.north` (cơ học thiên văn rút gọn Cooper/NOAA, unit test), bóng đổ shadow-map. Editor: tool 5 mở panel catalog (tìm + click đặt liên tiếp, snap lưới), R xoay 90°. MCP thêm `assets_search` (lọc query/category/maxFootprint, trả contact-sheet PNG). 145 tests, e2e 13 kịch bản.

> ✅ **P4 hoàn thành 13/07/2026.** DoD đủ: dim engine hoàn chỉnh (3 chuỗi ngoài + dim thông thủy 2 chiều trong từng phòng, chữ né nhãn tên phòng); khung tên tách module dùng chung, đánh số tờ KT-01… tự động; **mặt đứng chính** (chiếu cạnh `site.front`, cửa/cao độ ▽/dim đứng/trục, không bao giờ xoay ngang); **mặt cắt A-A qua thang** (vết dọc xuyên tâm vế 1 — mũi tên hướng nhìn −x khớp hình; tường cắt poché hở đúng lỗ cửa, sàn cắt trừ đúng lỗ thang/giếng trời, profile bậc vế cắt đậm — vế thấy mảnh, chiếu nghỉ, tường thấy + cửa nét mảnh); **thống kê phòng + cửa** (gộp nhóm theo kiểu/kích thước); xuất **PDF A3** một file nhiều trang (Chromium print) + **DXF** (writer TS thuần từ cùng SceneGraph — chốt ADR-08, không sidecar Python; mm thật, layer 1-1, HATCH solid cho poché, TEXT UTF-8) + SVG từng tờ. MCP thêm 2 tools: `export` (pdf/svg/dxf, lọc `sheets`, giữ đúng số KT khi xuất lẻ) và `render_view` (elevation/section trả PNG để Claude tự soi — điều chỉnh so spec: doc 05 chỉ có render_plan). IFC lùi backlog đúng kế hoạch. Demo `pnpm demo:p4` — bộ PDF 5 tờ một căn hoàn chỉnh; 131 tests.

> ✅ **P3 hoàn thành 13/07/2026.** DoD đủ: chọn/kéo tường-cửa-nội thất trên 2D (tường trượt dọc pháp tuyến neo khoảng cách tim-tim tới tường song song gần nhất; cửa trượt dọc tường hiện khoảng cách hai đầu; nội thất snap lưới + hít mặt tường, khe hở gõ được); HUD gõ số cạnh con trỏ (Enter chốt chính xác, Esc hủy, Alt bỏ snap — buffer bàn phím, không phải input nên không tranh focus với pointer capture); snap lưới đổi được ở khung tên; undo/redo per-origin bằng op nghịch đảo (Ctrl+Z/Y, xóa tường hồi cả openings cascade); soft-lock 3 tầng đúng doc 06 (khóa đặt TRONG `ProjectStore.apply` — một cổng mutation, khóa nguội 5s, `LOCK-01`); panel thuộc tính thành ô nhập; `get_changes_since` nâng cấp tóm tắt update ghi giá trị cũ → mới. Kèm theo: fix reconnect xuyên dự án bằng token phiên trên snapshot/hello (revision trùng số không lừa được tab cũ nữa; capture chỉ chọn tab đã sync); SVG root nhúng `data-tf-*` cho browser đảo ngược tọa độ giấy ↔ model. Demo `pnpm demo:p3` (Playwright đóng vai người dùng: kéo W13, Claude bị LOCK-01, gõ `4200 ⏎`, Claude `get_changes_since` rồi tự điều chỉnh 2 phòng + đẩy tủ hết đè tường); e2e 9 kịch bản chromium thật.

> ✅ **P2 hoàn thành 13/07/2026.** DoD đủ: `editor_open` mở browser — HTTP+WS cùng process MCP (Hono + ws, cổng `ATELIER_PORT`/4823, bận tự thử +1…+9); `apply_ops` đến đâu 2D + 3D mọc đến đó (2D = SVG server render qua `GET /plan/:level.svg`, đúng nguyên tắc ký hiệu trong renderer; 3D thô Three.js orbit — tường tách mảnh quanh opening theo đúng fallback không-CSG đã định ở bảng rủi ro); `capture_view` trả ảnh đúng khung người dùng (fallback plan render server khi chưa có browser). Giao thức doc 06 đủ hai chiều: browser gửi `ops` được (origin `user`, stale-reject) — nền P3 sẵn; replay journal khi reconnect gap liền mạch. Demo `pnpm demo:p2` (dựng nhà ống 18 nhịp); e2e Playwright chromium thật (skip khi chưa `pnpm build:web`).

## Pipeline asset nội thất (P5, chuẩn bị dần từ P2)

1. Nguồn **CC0**: Poly Haven (model + texture), ambientCG (texture), Sketchfab bộ lọc CC0.
2. Chuẩn hóa: scale về mm thật, pivot đáy-giữa, tối ưu poly, tên file = asset id.
3. Sinh metadata: `{ id, tên VN, category, footprint (rộng×sâu×cao), khe hở khuyến nghị, thumbnail }` — footprint nuôi validator GEO-04/STD-11, thumbnail nuôi panel catalog và `assets_search`.
4. `license-manifest.json` ghi nguồn từng asset — sạch bản quyền từ ngày 1.
5. Danh mục tối thiểu: giường (3 cỡ), tủ áo, bàn ghế ăn, sofa, kệ TV, tủ bếp dưới/trên, bồn cầu, lavabo, vòi sen, máy giặt, xe máy (để tính chỗ để xe!), bàn thờ, bàn làm việc.

## Backlog có chủ đích (đề xuất thêm — đã định vị, chưa cam kết)

| Hạng mục | Ghi chú | Khi nào |
|---|---|---|
| ~~Dự toán sơ bộ~~ | ✅ 13/07/2026 — `estimate_cost` (diện tích quy đổi móng/sàn/mái × `rules/don-gia.json`, so ngân sách brief) + tờ DỰ TOÁN SƠ BỘ KT-06 trong bộ hồ sơ | ~~v2~~ xong |
| So sánh phương án A/B | 2 revision/branch cạnh nhau trên editor | v2 |
| ~~Link chia sẻ chỉ-xem~~ | ✅ 13/07/2026 — `/xem/<token>` (token persist `.atelier/share.json`, thu hồi `POST /share/rotate`); server CƯỠNG CHẾ read-only ở WS: ops → `VIEW-01`, không soft-lock, capture không chọn tab khách; UI khách khóa công cụ nhưng vẫn live + đi bộ + nắng; nút "chia sẻ" trên editor + link kèm trong `editor_open`. LAN: `ATELIER_HOST=0.0.0.0` (mặc định loopback) | ~~v2~~ xong |
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
