# 07 — Validator & bộ rules

Vai trò: **chặn sai sót trước khi người dùng nhìn thấy**, và làm chỗ dựa "chuẩn" cho toàn hệ thống. LLM đề xuất — code kiểm tra. Không tin spatial reasoning của model ở bất kỳ đâu có thể kiểm bằng toán.

## Bốn mức nghiêm trọng

| Mức | Ý nghĩa | Hệ quả |
|---|---|---|
| `block` | Vô lý hình học (cửa ngoài tường…) | **Hủy transaction** — không bao giờ tồn tại trong model |
| `error` | Sai chuẩn nghiêm trọng | Ghi được (người dùng có quyền vẽ sai), nhưng **chặn xuất hồ sơ** + hiện đỏ trên editor |
| `warn` | Nên sửa | Hiện vàng, liệt kê trong panel |
| `info` | Gợi ý (Lỗ Ban, tiện nghi) | Hiện xám, có thể ẩn |

Lý do `error` không hủy transaction: khi đang kéo dở dang, trạng thái trung gian có thể "sai chuẩn" tạm thời; chặn cứng sẽ làm editor bất khả dụng. Chỉ `block` (hỏng topology) mới hủy.

## Rules là DỮ LIỆU, không phải code rải rác

```
packages/core/rules/
├── geo.json        # topology — số liệu nội tại
├── std-vn.json     # tiêu chuẩn kích thước VN
├── loban.json      # thước Lỗ Ban (advisory)
└── pln.json        # quy hoạch (P4)
```

Mỗi rule:

```jsonc
{ "id": "STD-06a", "title": "Cao bậc thang trong khoảng cho phép",
  "severity": "error", "params": { "min": 150, "max": 190 },
  "source": { "vanBan": "TCVN 4451:2012", "dieu": "—", "verified": false },
  "message": "Bậc thang {stair} cao {riser}mm — ngoài khoảng {min}–{max}mm." }
```

**Chính sách số liệu:** mọi con số dưới đây là dự thảo từ thực hành thiết kế nhà ở VN; con số nào chưa đối chiếu văn bản gốc mang cờ `verified:false` (đánh dấu ⚠). **Giai đoạn 1 có một task riêng: tra văn bản gốc, chốt từng số, bật `verified:true`.** Chừng nào còn rule ⚠, bản vẽ xuất ra in chú thích "số liệu tiêu chuẩn đang ở mức tham khảo". Tool `standards_lookup` đọc trực tiếp từ các file này — Claude trả lời "vì sao" luôn kèm nguồn.

> ✅ **Task tra chuẩn đã chạy 13/07/2026.** Chuẩn áp dụng đúng cho nhà ống là **TCVN 13967:2024 (Nhà ở riêng lẻ)** + TCVN 9411:2012 (nhà liên kế) — *không phải* TCVN 4451:2012 (chỉ áp chung cư/ký túc xá). Số liệu ĐÃ CHỐT nằm trong `packages/core/rules/*.json` (nguồn sự thật, kèm điều/mục + cờ verified); các bảng dưới đây giữ nguyên làm tư liệu dự thảo ban đầu — đối chiếu rules JSON khi có lệch.

## GEO — hình học / topology (đa số `block`)

| ID | Mức | Kiểm tra |
|---|---|---|
| GEO-01 | block | Opening nằm trọn trong chiều dài tường (`offset ≥ 0`, `offset+width ≤ dài`) |
| GEO-02 | block | Hai opening cùng tường không chồng nhau |
| GEO-03 | error | Hai tường song song đè lên nhau (khoảng cách tim < tổng nửa dày) |
| GEO-04 | error | Nội thất đè nhau / đè tường (giao footprint OBB > 10mm) |
| GEO-05 | block | Polygon (phòng, ranh đất, sàn) tự cắt hoặc không khép |
| GEO-06 | warn | Cung mở cửa vướng tường/nội thất |
| GEO-07 | warn | Vế thang không nằm trong lỗ sàn tầng trên (v2 nâng error + kiểm headroom) |
| GEO-08 | error | Tường vượt ranh đất; warn nếu phạm khoảng lùi khai trong brief |

## STD — tiêu chuẩn kích thước nhà ở VN

| ID | Mức | Kiểm tra | Số dự thảo |
|---|---|---|---|
| STD-01 | warn | Diện tích phòng tối thiểu | ngủ chính ≥ 10m², ngủ phụ ≥ 7m² ⚠, bếp ≥ 5m² ⚠, WC ≥ 2.2m², khách ≥ 12m² (info) |
| STD-02 | warn | Bề rộng thông thủy phòng ở | ≥ 2100 ⚠ |
| STD-03 | error | Cao thông thủy | phòng ở ≥ 2600 ⚠; WC/kho ≥ 2200 ⚠ |
| STD-04 | error | Hành lang | ≥ 900 ⚠ |
| STD-05 | error | Bề rộng cửa | chính ≥ 800 (info khuyên ≥ 900); phòng ≥ 700 ⚠; WC ≥ 600 ⚠ |
| STD-06 | error | Thang | riser 150–190; tread ≥ 240 ⚠; vế ≥ 800 (warn < 900); chiếu nghỉ ≥ bề rộng vế; info: 2×riser+tread ∈ 550–700 |
| STD-07 | error | Lan can | ≥ 900; ban công tầng 2+ ≥ 1100 ⚠ (QCVN 05) |
| STD-08 | warn | Cửa sổ bậu < 900 ở tầng 2+ không có lan can — an toàn trẻ em ⚠ |
| STD-09 | warn | Phòng ở không có cửa sổ/giếng trời lấy sáng — nhà ống phòng giữa → info gợi ý giếng trời |
| STD-10 | warn | Cửa WC mở thẳng vào bếp/khu nấu (vệ sinh + phong tục) |
| STD-11 | info | Lối đi quanh nội thất: quanh giường ≥ 600; trước bếp ≥ 900 (warn) ⚠; trước bồn cầu ≥ 500 ⚠ |
| STD-12 | warn | Vượt brief.quy_hoach: mật độ xây dựng, số tầng (số lấy từ brief, không hardcode) |

## LBB — thước Lỗ Ban (advisory, bật/tắt; hỏi người dùng ở pha A)

Điểm khác biệt không tool phương Tây nào có. Toán thuần: chu kỳ thước chia 8 cung, kích thước mod chu kỳ → tra cung.

| ID | Mức | Kiểm tra |
|---|---|---|
| LBB-01 | info | Thông thủy cửa (rộng, cao) theo thước **52.2cm** (8 cung × 65.25mm) — cửa chính, cửa phòng, cửa sổ |
| LBB-02 | info | Khối xây quan trọng (bệ bếp, bàn thờ) theo thước **42.9cm** (Tài–Bệnh–Ly–Nghĩa–Quan–Kiếp–Hại–Bản) ⚠ |
| LBB-03 | info | **Gợi ý số đẹp gần nhất** — không chỉ chê "phạm" mà đề xuất: "cửa 760 → nới 810 vào cung tốt, chênh 50mm" |

⚠ Tên cung và biên chính xác từng cung cần chốt theo nguồn đáng tin trước khi bật mặc định (task P1, cùng đợt tra TCVN). Cơ chế mod-cung thì chốt ngay từ giờ.

## PLN — quy hoạch địa phương (🔭 Giai đoạn 4)

Rule pack nhập theo dự án: khoảng lùi, mật độ xây dựng tối đa, cao độ/tầng cao, ô văng vươn ra hẻm. Cấu trúc giống STD nhưng `params` lấy từ `brief.quy_hoach` do người dùng khai (Atelier không tự tra quy hoạch — ngoài phạm vi).

## Hợp đồng chạy validator

- Chạy **sau mỗi transaction**, chỉ trên phạm vi bị ảnh hưởng (incremental) + full khi `validate()` gọi tay.
- Kết quả gắn `revision` → browser hiện panel issues, Claude nhận trong `warnings` của `apply_ops`.
- Mỗi issue trỏ `entities[]` → click trên editor là zoom tới chỗ sai.
- Golden tests: mỗi rule tối thiểu 1 case phạm + 1 case đạt trong `packages/core/rules/__tests__/`.
