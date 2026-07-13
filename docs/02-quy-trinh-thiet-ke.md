# 02 — Quy trình thiết kế (từ prompt đến hồ sơ)

Trả lời câu hỏi trung tâm: **"chỉ mô tả prompt có ổn không?"** — Không, nếu one-shot. Có, nếu prompt là *kênh nhập ý định* trong một quy trình nhiều pha có checkpoint. Độ chính xác đến từ quy trình + validator + 3 kênh nhập, không đến từ prompt dài.

## Ba kênh nhập — ba mức chính xác

| Kênh | Dùng cho | Ví dụ |
|---|---|---|
| **Prompt** (Claude Code) | Ý định, bố cục, phong cách | "thêm phòng ngủ ~12m² cạnh bếp, cửa mở ra hành lang" |
| **Kéo thả** (web editor) | Vị trí tương đối, tinh chỉnh bố cục | dời tủ vào góc, kéo tường sang trái |
| **Gõ số** (HUD trên editor) | Con số chính xác tuyệt đối | đang kéo tường, gõ `3200` ⏎ → đúng 3200mm |

Không bắt kênh này gánh việc của kênh kia. Prompt không dùng để nêu số đo chính xác từng mm — trừ khi người dùng chủ động nói số, khi đó số được tôn trọng tuyệt đối.

## Năm pha, năm checkpoint

```
A. Phỏng vấn ──► BRIEF ──duyệt──► B. Mặt bằng ──duyệt──► C. 3D thô + thang/mái
──duyệt──► D. Nội thất + vật liệu ──duyệt──► E. Hồ sơ bản vẽ ──duyệt──► xuất PDF/DXF
```

Quy tắc: **không nhảy pha khi checkpoint chưa duyệt** (trừ khi người dùng bảo bỏ qua). Mỗi pha Claude phải tự `validate()` + render + `capture_view` soi lại **trước khi** mời người dùng xem.

### Pha A — Phỏng vấn có cấu trúc → Brief

Claude không nhận một prompt rồi đoán. Claude hỏi như kiến trúc sư thật, theo checklist:

1. **Đất:** kích thước (tứ cận — chấp nhận đất méo, nhập polygon), hướng, tiếp giáp (đường/hẻm rộng bao nhiêu, nhà hàng xóm), quy hoạch nếu biết (khoảng lùi, tầng cao tối đa).
2. **Gia đình:** ai ở, mấy thế hệ, thói quen (nấu nướng, khách, làm việc ở nhà).
3. **Nhu cầu phòng:** số phòng ngủ/WC, phòng thờ, gara (xe máy? ô tô?), kinh doanh tầng trệt, sân phơi, giếng trời, ban công.
4. **Ngân sách & mức hoàn thiện.**
5. **Gu thẩm mỹ:** phong cách, ảnh tham chiếu, màu chủ đạo.
6. **Ưu tiên xếp hạng:** thông thoáng / rẻ / nhiều phòng / dễ dọn… (khi xung đột thì lấy gì bỏ gì).

Kết quả là **brief** — lưu ngay trong model, ví dụ:

```yaml
brief:
  dat:
    ranh_gioi: [[0,0],[4000,0],[4100,16000],[0,15800]]   # mm — đất méo OK
    huong_truoc: "Đông Nam"
    tiep_giap: { truoc: "hẻm 5m", sau: "nhà", trai: "nhà", phai: "nhà" }
    quy_hoach: { khoang_lui_truoc: 0, tang_max: 4 }
  gia_dinh: "vợ chồng + 2 con nhỏ + bà nội"
  nhu_cau: { phong_ngu: 3, wc: 3, phong_tho: true, xe_may: 2, o_to: false,
             gieng_troi: true, san_phoi: true, bep: "liền phòng ăn" }
  ngan_sach: { muc: "~1.8 tỷ", hoan_thien: "trung bình khá" }
  gu: { phong_cach: "hiện đại tối giản", mau: "trắng - gỗ sáng" }
  uu_tien: ["thông thoáng", "bà nội ngủ tầng trệt", "dễ dọn"]
```

**Checkpoint 1:** người dùng duyệt brief (trên chat hoặc editor). Brief đã duyệt là "hợp đồng" — mọi pha sau đối chiếu về nó.

### Pha B — Mặt bằng (làm 2 bước để giảm sửa đi sửa lại)

1. **Block diagram trước:** các phòng là khối chữ nhật đặt trên mặt bằng, chưa có tường chi tiết → người dùng duyệt *bố cục* (phòng nào ở đâu, giao thông đi lối nào).
2. **Dựng tường chi tiết sau:** từ block đã duyệt → tường có độ dày thật, cửa đi, cửa sổ, thang đúng vị trí. Validator chạy toàn bộ rule kích thước.

**Checkpoint 2:** duyệt mặt bằng từng tầng trên live editor (người dùng có thể tự kéo chỉnh trước khi gật đầu).

### Pha C — 3D thô

Extrude tường, sàn, thang, mái (v1: mái bằng), giếng trời. Người dùng orbit/đi bộ kiểm tra không gian, độ thoáng, tầm nhìn. **Checkpoint 3.**

### Pha D — Nội thất + vật liệu

Đặt nội thất từ catalog (giường, tủ, bếp, sofa, thiết bị WC…), gán vật liệu hoàn thiện (sàn gạch/gỗ, sơn, ốp). Validator kiểm va chạm, lối đi tối thiểu quanh giường/bếp. Sun study xem nắng buổi sáng/chiều. **Checkpoint 4.**

### Pha E — Hồ sơ bản vẽ

Sinh bộ bản vẽ: mặt bằng các tầng đầy đủ dim 3 lớp + ký hiệu, mặt đứng chính, 1–2 mặt cắt (qua thang), bảng thống kê phòng-diện tích, bảng thống kê cửa. Xuất PDF (khổ A3) / SVG / DXF. **Checkpoint 5** → bàn giao.

## Đóng gói quy trình thành skill

Toàn bộ quy trình này sẽ được viết thành **skill trong repo** (`.claude/skills/thiet-ke-nha/`) để Claude Code luôn chạy đúng trình tự: hỏi checklist pha A → ghi brief → làm việc theo pha → tự validate trước checkpoint. Nhờ vậy hành vi ổn định giữa các phiên, không phụ thuộc "trí nhớ" hội thoại.

## Vì sao quy trình này đạt độ chính xác cao nhất

- **Sai sót ý định** bị chặn ở pha A (brief duyệt trước khi vẽ).
- **Sai sót bố cục** bị chặn ở block diagram (sửa khối rẻ hơn sửa tường).
- **Sai sót hình học/tiêu chuẩn** bị validator chặn tự động, Claude tự sửa trước khi người dùng thấy.
- **Sai sót chi tiết cuối** người dùng tự xử bằng tay trên editor — kênh chính xác nhất.
