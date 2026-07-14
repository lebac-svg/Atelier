🇬🇧 [English translation](en/12-typology-expansion.md)

# 12 — Mở rộng đa typology & đa vùng (P6–P9)

> **Quyết định 14/07/2026** (feedback chủ dự án): Atelier là dự án phát triển **cộng đồng** — không dừng ở nhà ống Việt Nam. Mục tiêu: **mọi loại nhà, mọi loại đất** (kể cả địa hình không bằng phẳng), nhiều vùng/chuẩn khác nhau, qua kiến trúc **rule-pack cắm được**. Quyết định này **thay thế Q6** (doc 11 — "template v1 chỉ nhà ống"): Q6 đúng cho v1 và đã hoàn thành sứ mệnh "sâu trước rộng"; giờ là lúc rộng.

## Hiện trạng: "nhà ống" đang bám ở đâu (khảo sát 14/07/2026)

Năm điểm nghẽn, xếp theo độ nặng:

| # | Nghẽn | Bằng chứng | Độ khó gỡ |
|---|---|---|---|
| N1 | **Rule engine đơn chuẩn, nạp tĩnh, áp vô điều kiện** — `ALL_RULES` import cứng geo+std-vn+loban+pln, chạy cho mọi model; không có trục typology/region/standard | `core/src/validate/rules.ts:2-29`, `engine.ts:52-70` | Refactor kiến trúc — nặng nhất |
| N2 | **Thư viện typology rỗng** — 1 fixture + 1 template `nha-ong-4x16-2t`; `blankProject()` cũng mặc định lô 4×16 | `server/src/store.ts:26-28,305` | Code dễ, nội dung + golden test là khối lượng chính |
| N3 | **Mái chỉ có mái bằng BTCT** — `Slab.kind` không có mái dốc/mái ngói; kéo theo estimate, renderer 2D/mặt cắt, 3D, IFC/GLB | `core/src/types.ts:87` | Refactor xuyên tầng |
| N4 | **Một mặt tiền, trục trước–sau** — `Site.front` là index MỘT cạnh; PLN suy "cạnh sau" từ đó; không tả được nhà góc/biệt thự 4 mặt thoáng | `types.ts:46`, `evaluators-pln.ts:25-41` | Refactor nhẹ |
| N5 | **VN-first bện xuyên hệ** — TCVN trong mọi rule, Lỗ Ban, vĩ độ mặc định 10.8, đơn giá VND | `loban.json`, `types.ts:170`, `rules/don-gia.json` | Từng mảnh đều dễ (đa số optional/gated sẵn) nhưng cần abstraction region để nhất quán |

Điểm sáng đã có sẵn: `Site.boundary` là polygon tự do (đất méo biểu diễn được ngay), `Level[]` không ép tầng lặp, `stair.ts` thuần hình học, Lỗ Ban đã gate theo brief (`phong_thuy.lo_ban`), rules đã là data (ADR-09). Nền móng mở rộng là có thật — cái thiếu là trục phân loại và nội dung.

## Nguyên tắc bất di bất dịch

1. **Model JSON vẫn là nguồn sự thật duy nhất** — mở rộng schema, không mở đường vẽ tay.
2. **Rules là data** (ADR-09) → rule-pack là bước tiến hoá tự nhiên: pack = JSON rules + evaluators đăng ký theo pack.
3. **mm số nguyên giữ nguyên** (ADR-04) — ft-in chỉ là tầng hiển thị/nhập liệu cho vùng imperial.
4. **Không phá project cũ**: file nhà ống hiện có mở bằng bản mới phải chạy y hệt (migrate tự động nếu buộc phải đổi schema).
5. **Sâu-rồi-rộng vẫn đúng ở mức từng typology**: template mới nào cũng phải có fixture + golden test như nhà ống đã có, không nhận "mẫu 80%".

## P6 — Kiến trúc rule-pack

Tách khái niệm **RulePack**: metadata `{ id, title, region?, standard?, typologies?, locale }` + rules JSON + evaluators đăng ký theo pack id.

- `geo` là **core** — hình học đúng ở mọi nơi, luôn chạy, không phải pack.
- `std-vn`, `pln`, `loban` thành 3 pack đầu tiên; loban giữ gate brief như cũ.
- `Project`/`Brief` thêm lựa chọn pack (mặc định suy từ region + typology; project cũ không khai → nguyên bộ VN như hiện tại).
- `ALL_RULES` tĩnh → registry nạp theo pack đã chọn; engine lọc thêm theo `typologies` của rule.
- Gỡ chữ "nhà ống" rò rỉ trong message rule chung (`std-vn.json:148` STD-09, note STD-06).
- **Tài liệu cho contributor**: "Viết một rule pack" — schema pack, quy ước `source`/`verified`, cách test 1 phạm + 1 đạt.

**DoD**: project cũ validate ra kết quả **y hệt** trước refactor (golden diff); tạo được project chọn pack khác/không pack; có doc contributor + 1 pack mẫu tối giản ngoài bộ VN.

> ✅ **P6 hoàn thành 14/07/2026.** Pack thành dữ liệu: mỗi `rules/*.json` mang header `pack` `{id,title,kind,region,standard}`; `geo` là `core` (luôn chạy), `std-vn`/`loban`/`pln` là pack region `vn`. `rules.ts` có registry (`BUILTIN_PACKS` + `registerPack`/`getPack`/`listPacks`), `packsFor(project)` chọn pack theo `Project.config.{region,typology,packs}`, `activeRules(p?)` lọc theo pack đã chọn + `typologies` của rule; engine dùng `activeRules(p)` và trường `evaluator` cho phép pack tái dùng phép kiểm builtin (vd. STD-03) không cần code. Project không khai `config` → nguyên bộ VN theo thứ tự cũ (golden byte-identical). Pack mẫu ngoài VN: `rules/std-generic.json` (region `generic`, GEN-CEIL-01 mượn evaluator STD-03). Gỡ chữ "nhà ống" ở STD-09. Doc contributor: [doc 13](13-viet-rule-pack.md). Test: +6 case P6 (chọn region, config.packs rỗng chỉ còn geo, lọc typology, pack mẫu chỉ nổ khi được chọn) — **tổng 206 tests xanh, typecheck sạch**. *Điều chỉnh so spec:* thêm trường `evaluator` (tái dùng evaluator builtin) — ngoài kế hoạch nhưng đúng tinh thần "đại trà, dễ dùng" (Phụ lục A4); `blankProject()` bỏ mặc định lô 4×16 để lại P8; nạp pack động từ thư mục dự án để lại P9.

## P7 — Hình thái & địa hình

Ba mở khoá schema mà mọi typology mới đều cần:

- **Mái dốc**: phần tử mái riêng (gable/hip/shed/lệch, độ dốc, đuôi mái) thay vì nhét vào `Slab.kind`; renderer 2D (mặt bằng mái + mặt cắt), 3D, estimate (hệ số mái theo loại), IFC/GLB đi cùng.
- **Đa mặt tiền**: `Site.front` scalar → thuộc tính theo cạnh (mặt tiền, giáp hẻm, giáp ranh); setback + PLN + mặt đứng đọc theo cạnh. Nhà góc 2 mặt tiền và biệt thự lùi 4 phía tả được.
- **Địa hình không bằng phẳng**: cao độ theo đỉnh `boundary` (nội suy trong lô), cốt nền ±0.000 từng `Level` đặt được trên cao độ khác nhau — nhà trên đất dốc, nhà có tầng bán hầm theo địa hình.

**DoD demo**: dựng một **biệt thự mái dốc, lô góc 2 mặt tiền, đất dốc** — mặt bằng/mặt đứng/mặt cắt/3D/estimate đều đúng.

> ✅ **P7 hoàn thành 14/07/2026.** (1) **Mái dốc**: entity `Roof` (gable/hip/shed, pitch độ, outline gồm đua, quy ước ghi types.ts + doc 04) — MỘT nguồn hình học `geometry/roof.ts` (`roofGeometry`: creases/faces/zAt/m² mặt nghiêng; `roofProfile`: polyline (s,z) cho vết cắt bất kỳ) nuôi mặt bằng (layer MAI: mép + hông + nóc), mặt đứng (chiếu faces), mặt cắt (dải poché dày t/cos pitch), 3D web, GLB, **IFCROOF brep** (thêm brepSolid vào writer), estimate (m² MẶT NGHIÊNG × hệ số `mai_ngoi` 0.7/`mai_ton` 0.3 mới trong don-gia.json; hết dòng "ước lệ" khi có mái). Ops/undo/i18n/model_query/panel đủ mạch — file cũ thiếu mảng `roofs` vẫn hợp lệ. (2) **Đa mặt tiền**: `Site.edges[]` (kind street/alley/neighbor + setback từng cạnh) — PLN-07 mới kiểm lùi theo cạnh, PLN-06 tổng quát mọi cạnh mặt thoáng và tính cả đuôi mái; mặt đứng đổi quy ước chọn tường mặt tiền sang **CỤM gần ranh nhất** (biệt thự lùi 3m vẫn có mặt đứng, nhà ống y hệt cũ). (3) **Địa hình**: `Site.terrain.elevations` theo đỉnh ranh + `groundAt` (IDW) — mặt đứng/mặt cắt vẽ đường đất dốc, 3D đất lưới 32×32, PLN-05 đo chiều cao từ cốt đất mặt tiền và kể cả đỉnh nóc. STD-09 sửa bias nhà ống: cửa sổ mở ra **sân trong lô** được tính lấy sáng. Fixture DoD `biet-thu-doc.json` (lô góc 2 street, đất chênh 1.1m, mái hip 30° đua 600) — golden 0 issue, render 3 tờ đã duyệt bằng mắt, template `biet-thu-doc-2t` đăng ký sẵn. Nhánh mái/terrain **no-op khi model không có** → 5 snapshot nhà ống bất động. **234 tests xanh.** *Điều chỉnh so spec:* hip v1 dựng trên bbox (outline chữ nhật; straight-skeleton cho polygon phức tạp lùi v2); test "xóa tường mặt tiền → lỗi" đổi theo quy ước cụm-gần-nhất.

## P8 — Thư viện typology

Nội dung — phần cộng đồng góp được ngay khi P6+P7 xong:

| Template | Điểm thử được | Cần từ |
|---|---|---|
| Nhà cấp 4 / một tầng | Đơn giản nhất, không thang — mẫu nhập môn | P6 |
| Biệt thự 2 tầng mái dốc | Mái + đa mặt tiền + setback 4 phía | P7 |
| Nhà vườn | Khối nhà rời + sân vườn lớn, mật độ thấp | P7 |
| Detached kiểu phương Tây | Region khác VN, hiển thị ft-in, pack chuẩn khác | P9 |
| Căn hộ / cải tạo nội thất | Không có lô đất — chỉ mặt bằng trong khung có sẵn | P6 |

Thông số hình học cụ thể để dựng model mẫu (nguồn: Phụ lục A):

| Template | Diện tích sàn | Số tầng | Mái | Đất/mặt thoáng |
|---|---|---|---|---|
| Nhà cấp 4 / một tầng | ~60–110 m² | 1 | dốc 18–34° (6/12 phổ biến) hoặc bằng | rời, thường 4 mặt lùi |
| Detached 2 tầng (biệt thự) | ~200–230 m² (mẫu Mỹ ~203 m² median) | 2 (±hầm/gác mái) | dốc 18–34° | lô rộng (~1.900 m² mẫu Mỹ), lùi 4 phía, có gara |
| Semi-detached / song lập | mỗi căn ~95–120 m² | 2 | dốc | chung 1 tường biên, 3 mặt thoáng |
| Townhouse / liên kế phương Tây | mỗi căn ~93–140 m² (unit US 1.000–3.000 sq ft) | 2–2.5 (cao diềm mái ~7.6–12 m) | dốc hoặc bằng | chung 2 tường biên (như nhà ống nhưng chuẩn Tây) |
| Bungalow | ~70–100 m² | 1 (đôi khi +gác mái) | dốc | rời, phổ biến ở Anh/Úc |
| Căn hộ / cải tạo | tuỳ khung | 1 (trong nhà cao tầng) | — (không mái riêng) | không lô đất |

*Chưa chốt được bề rộng lô điển hình cho townhouse — luận điểm ~20 ft (6,1 m) đã bị bác trong verify, cần nguồn khác trước khi hardcode footprint mẫu (xem câu hỏi mở Phụ lục A).*

- `blankProject()` bỏ mặc định lô 4×16 — hình lô lấy từ phỏng vấn pha A.
- Skill `thiet-ke-nha`: pha A hỏi typology trước, chọn template theo đó; câu hỏi VN-specific (giếng trời, Lỗ Ban…) chỉ hiện khi region VN.

**DoD**: mỗi template có fixture + golden test; skill dẫn được từ phỏng vấn tới đúng template.

> ✅ **P8 hoàn thành 14/07/2026.** Thư viện template 5 mẫu: `nha-ong-4x16-2t` (P1) + `biet-thu-doc-2t` (P7) + **3 mẫu mới**: `nha-cap-4` (một tầng 7 phòng + hành lang giữa, mái GABLE tôn 20°, không thang — bộ tờ tự bỏ mặt cắt), `nha-vuon` (lô 484m² méo + terrain nhẹ, 1 tầng mái HIP ngói 27° đua 700, mật độ 21%), `can-ho` (KHÔNG lô đất — boundary = khung căn hộ 10.5×8.2, tường bao BTCT + vách nhẹ, khách+bếp mở, không mái/thang). Mỗi mẫu có fixture JSON + golden 0-issue + case đối chứng (STD-04/09, PLN-03); mỗi fixture khai `config.typology` sẵn. `blankProject()` bỏ mặc định lô nhà ống 4×16 — lấy `brief.dat.ranh_gioi` pha A, fallback lô vuông 10×10 trung tính. Skill `thiet-ke-nha`: pha A hỏi **loại nhà TRƯỚC TIÊN** → bảng chọn template theo typology; checklist thêm đất dốc/lô góc/vật liệu mái; ghi chú Lỗ Ban là câu hỏi VN. Mặt bằng cấp 4 + căn hộ đã soi mắt. **239 tests xanh.** *Điều chỉnh so spec:* mẫu "Detached kiểu phương Tây" lùi sang P9 đúng kế hoạch (cần region + ft-in); estimate căn hộ cải tạo vẫn tính móng/mái như xây mới — chế độ "cải tạo" ghi vào backlog P9.

## P9 — Lớp region & nền tảng cộng đồng

**Region** = `{ đơn vị hiển thị, pack chuẩn mặc định, bảng đơn giá, mô-đun phong tục }`.

- VN là region đầu tiên (đóng gói lại những gì đang có); thêm 1 region quốc tế mẫu (generic-metric hoặc US-imperial) làm proof.
- `don-gia.json` thành pack theo region (cơ chế đè theo thư mục dự án đã có từ atelier-mcp).
- Phong tục là mô-đun: Lỗ Ban + ban thờ thuộc mô-đun VN; region khác có thể có mô-đun riêng.
- `CONTRIBUTING.md`: cách đóng góp pack / template / region — mỗi loại một checklist.

**DoD**: tạo project ở region khác VN thì **không thấy TCVN/Lỗ Ban/VND ở bất kỳ đâu** (rule, bản vẽ, dự toán); có ≥1 đóng góp mẫu đi trọn quy trình contributor.

## Thứ tự & lý do

P6 đi trước vì mọi thứ khác cắm vào nó — thêm typology mà không có trục phân loại rule thì mỗi template mới lại làm chuẩn VN chật thêm. P7 mở khoá hình thái mà template mới cần (mái dốc, lô góc, đất dốc). P8 là nội dung — chính là chỗ cộng đồng tham gia, càng sớm có kiến trúc càng sớm nhận đóng góp. P9 gói lại thành nền tảng đa vùng đúng nghĩa. Cỡ ước thô: P6 M, P7 L, P8 M (mỗi template S), P9 M — chốt lại sau P6 như nếp cũ.

## Phụ lục A — Nghiên cứu thị trường & chuẩn (14/07/2026)

Deep-research 5 hướng, 23 nguồn, 88 luận điểm → verify đối kháng 25 (23 xác nhận, 2 bị bác). Kết luận nuôi các quyết định trên:

**A1. Typology nào đại trà (→ chọn template P8).** Nhà thấp tầng detached/semi-detached/townhouse thống trị tồn kho ở đại đa số thị trường lớn: nhà (detached hoặc semi) là loại phổ biến nhất ở 30/40 nước OECD, flats chỉ chiếm đa số ở 10 nước; detached đứng đầu ở 20 nước (New Zealand 83%, Úc ~70%, Mỹ ~2/3); row/terraced ≥50% ở Anh, Hà Lan, Ireland; EU 2024 chia 51% nhà / 48% chung cư [OECD HM1.5; Eurostat Housing 2025]. Nhà Mỹ xây mới ~203 m² (median Q4/2025) đến 227–246 m² (mean), lô ~1.942 m² gần nửa acre [NAHB; Census/eyeonhousing]. Anh: 53% terraced/semi + 18% detached + 9% bungalow, diện tích trung bình ~95 m² [English Housing Survey]. Úc: 70% detached, 13% townhouse [ABS 2021]. Townhouse điển hình 2–2.5 tầng, mỗi căn 1.000–3.000 sq ft (~93–279 m²), cao diềm mái 25–40 ft [Missing Middle]. Độ dốc mái nhà ở phổ biến 4/12–8/12 (~18–34°), 6/12 hay gặp nhất [This Old House]. → Bảng thông số P8 ở trên. *Cảnh báo: dữ liệu nghiêng OECD/EU/Anglophone; Nam Á, ĐNA, Mỹ Latinh (courtyard house, nhà sàn) phủ yếu — cần nguồn khu vực trước khi làm template nhiệt đới.*

**A2. Pack chuẩn đầu tiên ngoài VN = Approved Documents của Anh.** Lý do kép: (1) cấu trúc modular theo chủ đề khớp đúng kiến trúc rule-pack — mỗi tài liệu một miền định lượng: **B** cháy/thoát nạn, **K** cầu thang/chống rơi, **M** tiếp cận + bề rộng cửa, **F** thông gió; (2) TOÀN BỘ mở dưới Open Government Licence, tải/tìm kiếm được dạng PDF — trích nguồn từng rule đúng như đang làm với TCVN [gov.uk/approved-documents]. Hơn hẳn hai ứng viên còn lại: **IRC 2021 Mỹ** có số dùng ngay (trần ≥7 ft, egress ≥5.7 sq ft / cao ≥24 in / rộng ≥20 in / bậu ≤44 in) nhưng ICC **giữ bản quyền** — đọc miễn phí, phát hành lại bị hạn chế; **Nhật (Building Standard Act)** là luật khung, số liệu nằm ở Cabinet Order riêng và bản dịch tiếng Anh **không** mở/trích dẫn tự do (đã verify bác). **NCC 2025 Úc** là ứng viên kế tiếp (thị trường detached-dominant, Volume Two + Housing Provisions).

**A3. Mô-đun phong tục — chưa có bằng chứng đủ để làm.** KHÔNG luận điểm nào về vastu / phong thủy bát trạch / ken-module Nhật sống sót qua verify; chỉ thấy nguồn blog nhắc công thức āyādi của vastu (Aaya/Vyaya/Yoni trên đơn vị hasta ~72 cm) nhưng chất lượng thấp, chưa xác minh định lượng hóa được. → **Khuyến nghị: giữ Lỗ Ban là mô-đun phong tục duy nhất cho tới khi có nguồn chuẩn định lượng cho hệ khác.** Đừng vội thêm vastu/phong thủy chỉ bằng loại suy — sai số văn hoá đắt hơn lợi ích.

**A4. Nguyên tắc "đại trà, dễ dùng" (từ Sweet Home 3D, FreeCAD-library).** (1) **Định dạng trao đổi chuẩn**, không tự chế — Atelier đã xuất GLB/IFC/DXF; nên bổ sung *nhập* để nhận đóng góp. (2) **Gói kèm metadata, tự cài** — SH3F của Sweet Home 3D gói model + mô tả, cài bằng double-click; pack Atelier nên là bundle tự mô tả (rules JSON + fixture + metadata) cài bằng cách trỏ vào thư mục/URL, khớp `atelier-mcp setup` sẵn có. (3) **Phân loại thư mục theo chủ đề/họ rõ ràng** — FreeCAD-library xếp asset theo Architectural/HVAC/…; pack Atelier phân theo region + standard + typology. (4) **License mở + attribution từng mục** — FreeCAD-library CC-BY 3.0 kèm ghi công; Atelier đã trích `source` từng rule + asset CC0, mở rộng cho pack cộng đồng bằng CC-BY. (5) **Rào cản thấp**: cài một lệnh / double-click — đã đúng hướng với `atelier-mcp`.

**Câu hỏi mở còn treo** (đưa vào backlog nghiên cứu, không chặn P6): bề rộng lô townhouse điển hình (luận điểm ~20 ft bị bác); hệ phong tục nào định lượng hóa được thật; thông số typology nhiệt đới/Nam Á/ĐNA/Mỹ Latinh; schema + quy trình review đóng góp cụ thể của WikiHouse/Open Building Institute (chưa verify được, mới có FreeCAD-library + Sweet Home 3D làm mẫu).
