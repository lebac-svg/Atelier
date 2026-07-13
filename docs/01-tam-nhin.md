# 01 — Tầm nhìn & Định vị

## Một câu

Atelier biến Claude Code thành xưởng thiết kế nhà: phỏng vấn nhu cầu → mặt bằng đúng chuẩn ký hiệu → 3D có nội thất → bộ bản vẽ, tất cả hiển thị và chỉnh sửa **sống** trên trình duyệt.

## Người dùng đích

- **Chính (v1):** gia chủ Việt Nam chuẩn bị xây nhà phố / nhà ống — muốn tự vọc phương án, nhìn 3D nội thất, hiểu ngôi nhà tương lai trước khi gặp kiến trúc sư hoặc thợ.
- **Phụ:** kiến trúc sư / họa viên — dùng làm công cụ dựng concept nhanh, xuất IFC/DXF về tool chuyên nghiệp làm tiếp.

(Cần chốt ưu tiên — câu hỏi Q2 trong `11-quyet-dinh-mo.md`.)

## Bài toán

- Gia chủ không đọc được bản vẽ kỹ thuật khô khan; muốn **thấy** ngôi nhà và **thử** thay đổi, nhưng không dùng nổi AutoCAD/SketchUp.
- Kiến trúc sư tốn nhiều giờ cho phương án concept đầu tiên vốn sẽ bị sửa 80%.
- Công cụ AI hiện có hoặc sinh **ảnh** (đẹp nhưng không chỉnh được, không có kích thước thật), hoặc điều khiển phần mềm nặng phải cài đặt (Revit, SketchUp, Blender) và **không có vòng chỉnh sửa tay realtime**.

## Non-goals (v1 — cố ý KHÔNG làm)

| Không làm | Lý do / thay thế |
|---|---|
| Thay hồ sơ xin phép xây dựng, hồ sơ thi công có chữ ký KTS | Pháp lý yêu cầu chứng chỉ hành nghề. Định vị: **trợ lý concept + diễn họa + bản vẽ trao đổi**; xuất IFC/DXF bàn giao cho KTS thật |
| Kết cấu, điện, nước (MEP) | Chỉ kiến trúc + nội thất ở v1 |
| Render photoreal | P5+ mới tính, qua pipeline glTF → Blender |
| Editor trên mobile | Desktop trước |
| Nhận diện ảnh mặt bằng cũ → model | Bài toán khó riêng, để backlog xa |

## Cảnh quan cạnh tranh (khảo sát 07/2026)

| Đối thủ | Điểm mạnh | Điểm thiếu so với Atelier |
|---|---|---|
| [Revit Public MCP (Autodesk, 6/2026)](https://www.autodesk.com/blogs/aec/2026/06/17/revit-public-mcp-server/), [Revit 2027 MCP tích hợp](https://blog.bimsmith.com/Revit-2027-What-the-Built-In-MCP-Server-Actually-Does-in-Practice) | BIM chuyên nghiệp, dữ liệu thật | Cần license đắt + Windows + biết Revit; không live-edit browser; không chuẩn VN |
| [SketchUp MCP chính thức](https://www.engineering.com/now-sketchup-has-an-mcp-server-for-claude-based-3d-modeling/) | Dựng hình từ mô tả + ảnh | Xuất file .skp tĩnh, không có vòng sửa hai chiều |
| [Blender MCP](https://3d-agent.com/mcp/claude-mcp) | 3D + asset mạnh, phổ biến | Không phải công cụ kiến trúc; bản vẽ 2D gần như không có |
| [Bonsai-mcp (BIM/IFC)](https://skywork.ai/skypage/en/bonsai-bim-mcp-server-ai-engineers/1977930280347308032) | IFC mã nguồn mở | Hướng query/phân tích model có sẵn hơn là thiết kế mới |
| [architecture-mcp](https://github.com/sceneview-tools/architecture-mcp) | Gần ý tưởng nhất: mặt bằng từ mô tả, SVG, compliance | **SVG tĩnh một chiều** — không editor, không 3D nội thất, không chuẩn VN |

## 4 điểm khác biệt (lý do tồn tại)

1. **Editor live hai chiều đồng bộ với agent** — Claude dựng đến đâu thấy đến đó; người dùng kéo tường thì Claude biết và phản ứng. Chưa ai làm tử tế mảnh này.
2. **Chuẩn Việt Nam là công dân hạng nhất** — ký hiệu bản vẽ theo TCVN, rule kích thước theo TCVN 4451/QCVN, và **thước Lỗ Ban** (không tool phương Tây nào có).
3. **Typology nhà Việt + lô đất méo từ ngày 1** — nhà ống 4×16, 5×18, nhà cấp 4…; ranh đất là polygon bất kỳ vì đất méo ở VN là chuyện thường.
4. **Một nguồn sự thật → 2D và 3D không bao giờ lệch nhau** — sửa một bức tường, mặt bằng lẫn 3D lẫn dim cùng cập nhật.

## Thước đo thành công (demo chuẩn)

> Trong ~60 giây: mô tả "nhà ống 4×16m, 2 tầng, 3 phòng ngủ, để được 2 xe máy" → mặt bằng 2 tầng đúng ký hiệu hiện dần trên trình duyệt → người dùng kéo bức tường phòng khách rộng thêm, gõ `4200` → dim tự cập nhật, Claude nhận ra và điều chỉnh phòng bên cạnh → bật 3D, đi bộ (WASD) xuyên nhà có nội thất.

Khi demo này chạy mượt, dự án đã chứng minh được giá trị cốt lõi.
