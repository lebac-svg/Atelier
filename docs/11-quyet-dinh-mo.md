# 11 — Quyết định kiến trúc (ADR) & câu hỏi mở

## Các quyết định đã chốt trong spec (ADR)

| # | Quyết định | Lý do chính | Hệ quả chấp nhận |
|---|---|---|---|
| ADR-01 | **Tự chủ renderer + Three.js browser**, không xây trên Blender/SketchUp MCP | Live editor hai chiều là giá trị cốt lõi — các tool kia không cho được; khỏi bắt người dùng cài phần mềm nặng | Tự viết nhiều hơn; Blender chỉ còn là pipeline render đẹp tùy chọn (P5+) |
| ADR-02 | **Một process Node** phục vụ cả MCP (stdio) lẫn HTTP/WebSocket | Một nguồn state duy nhất, không đồng bộ chéo | Server chết là chết cả hai mặt — chấp nhận ở app local |
| ADR-03 | **TypeScript monorepo** (core/server/web/assets) | Geometry + ops dùng chung server ↔ browser đúng nghĩa đen; khớp stack bạn quen | DXF/IFC có thể phải sidecar Python sau này |
| ADR-04 | **mm, số nguyên** cho mọi kích thước | Chuẩn ngành xây dựng; không lỗi float cộng dồn | Toạ độ chia tỷ lệ chỉ ở tầng render |
| ADR-05 | **Opening neo tương đối vào tường** | "Cửa luôn trên tường" đúng-theo-cấu-trúc; dời tường cửa đi theo miễn phí | Cửa góc/xuyên 2 tường không biểu diễn được (hiếm, chấp nhận) |
| ADR-06 | **Room = polygon khai báo** (v1), auto-dò từ tường ở v2 | Đơn giản, deterministic, đủ cho validator + tô tên phòng | Sửa tường phải sửa polygon phòng theo (Claude/editor lo) |
| ADR-07 | **`apply_ops` là cổng mutation duy nhất** + revision optimistic + không có op "thay cả model" | Transaction, validate, broadcast một chỗ; không bao giờ nghiền chỉnh sửa tay | Thao tác lớn = nhiều ops trong 1 transaction |
| ADR-08 | **SVG-first**; PDF qua Chromium; DXF/IFC lùi P4. *Chốt P4 (13/07/2026): DXF viết bằng **TS thuần** từ cùng SceneGraph — không sidecar Python `ezdxf`; IFC tiếp tục lùi backlog* | Ra giá trị sớm; SVG test/diff/click được; một nguồn primitive nên SVG/DXF không bao giờ lệch; không thêm phụ thuộc runtime | DXF là AC1021 tối thiểu (mở/đo được trong CAD, chưa có linetype/dimstyle bản địa); người cần IFC phải đợi |
| ADR-09 | **Rules là data** (`rules/*.json`) có `source` + cờ `verified` | Sửa số không sửa code; trích nguồn được; chưa verify thì bản vẽ tự chú thích | Cần task tra văn bản chuẩn nghiêm túc ở P1 |
| ADR-10 | **Schema keys tiếng Anh, nhãn/UI tiếng Việt** | LLM và hệ sinh thái tool làm việc tốt nhất với keys EN; người dùng chỉ thấy tiếng Việt | Tài liệu schema song ngữ nhẹ |

Muốn lật lại ADR nào, ghi chú thẳng vào bảng khi duyệt.

## Câu hỏi mở — ✅ đã chốt toàn bộ (13/07/2026)

| # | Câu hỏi | Quyết định |
|---|---|---|
| Q1 | **Tên dự án?** | ✅ **Atelier** — "xưởng thiết kế" (13/07/2026) |
| Q2 | **Người dùng ưu tiên v1:** gia chủ tự vọc, hay KTS làm concept? (ảnh hưởng giọng UI + độ sâu hồ sơ) | ✅ **Gia chủ** — thị trường rộng, đối thủ mỏng; KTS hưởng lợi kèm |
| Q3 | **Xác nhận non-goal:** không thay hồ sơ pháp lý/kết cấu/MEP ở v1, định vị "trợ lý concept + diễn họa"? | ✅ Xác nhận — an toàn pháp lý, đúng năng lực |
| Q4 | **Thước Lỗ Ban:** hỏi bật/tắt ở pha phỏng vấn, luôn bật, hay tắt mặc định? | ✅ **Hỏi ở pha A** — ai quan tâm phong thủy sẽ rất quý, ai không thì khỏi nhiễu |
| Q5 | **Typology demo đầu tiên?** | ✅ **Nhà ống 4×16m, 2 tầng, 3PN** — phổ biến nhất VN |
| Q6 | **Template v1** chỉ nhà ống (1 loại làm thật sâu) hay kèm nhà cấp 4? | ✅ Chỉ **nhà ống** — sâu hơn là rộng |
| Q7 | **Công khai mã nguồn?** | ✅ Private trong lúc làm; cân nhắc open-source sau P3. **Chốt 13/07/2026 (sau P5 + 3 mục backlog): OPEN-SOURCE** — MIT tại [github.com/lebac-svg/Atelier](https://github.com/lebac-svg/Atelier); font OFL 1.1, catalog CC0, số liệu chuẩn trích nguồn từng rule |
| Q8 | **Sau khi duyệt:** `git init` + commit bộ docs, rồi vào thẳng P1? | ✅ Có — mỗi giai đoạn xong là một mốc commit |

## Cách duyệt bộ spec này

1. Đọc tối thiểu: `01` (định vị) → `02` (quy trình) → `04` (schema) → `09` (editor). Các doc còn lại là chi tiết kỹ thuật, tin được thì skim.
2. Đánh dấu từng doc: OK / cần sửa gì.
3. Trả lời Q1–Q8 (trả lời gộp trong một tin nhắn là đủ).
4. Duyệt xong → bắt đầu **P1: Engine + bản vẽ tĩnh**.

> ✅ **Duyệt hoàn tất 13/07/2026.** Q1–Q8 có đáp án (bảng trên) — P0 đóng, chuyển sang P1.
