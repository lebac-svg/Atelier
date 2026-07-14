🇬🇧 [English translation](en/13-writing-a-rule-pack.md)

# 13 — Viết một rule pack

> Dành cho contributor. Rule pack là cách thêm một bộ chuẩn (vùng khác, loại nhà khác) vào Atelier **mà không sửa code lõi** — đúng tinh thần ADR-09 "rules là data". Đây là mảnh P6 của [lộ trình mở rộng doc 12](12-mo-rong-typology.md).

## Pack là gì

Một pack = **một file JSON** trong `packages/core/rules/` gồm:

```json
{
  "pack": { "id": "std-vn", "title": "…", "kind": "standard", "region": "vn", "standard": "TCVN 13967:2024 …" },
  "rules": [ … ],
  "rulers": { … }   // tùy chọn — chỉ pack phong tục kiểu Lỗ Ban mới cần
}
```

Bộ đóng gói sẵn: `geo` (lõi hình học), `std-vn`, `loban`, `pln`. Pack mẫu ngoài VN: `std-generic.json` — đọc file đó như ví dụ tối giản.

### Header `pack`

| Trường | Bắt buộc | Ý nghĩa |
|---|---|---|
| `id` | ✓ | Định danh duy nhất, kebab-case (`std-vn`, `uk-approved-docs`). |
| `title` | ✓ | Tên hiển thị. |
| `kind` | ✓ | `core` \| `standard` \| `planning` \| `customs`. **`core` luôn chạy** ở mọi region (chỉ `geo`); các loại khác chọn theo region/config. |
| `region` | — | Vùng áp dụng (`vn`, `generic`, `uk`…). Bỏ trống chỉ dành cho `core`. |
| `standard` | — | Văn bản chuẩn gốc — hiển thị & tra cứu. |

Pack cùng một `region` được chọn cùng nhau khi project đặt `config.region` bằng giá trị đó.

## Một rule trông thế nào

```json
{
  "id": "STD-03",
  "title": "Chiều cao thông thủy tối thiểu",
  "severity": "warn",
  "params": { "phong_o": 2700, "bep_an": 2400, "wc": 2100, "kho": 2000 },
  "source": { "vanBan": "TCVN 13967:2024", "dieu": "5.9", "verified": true },
  "message": "Phòng {ten} ({room}) tại {level}: cao thông thủy {clear}mm < {min}mm.",
  "typologies": ["nha-ong", "biet-thu"],
  "evaluator": "STD-03"
}
```

| Trường | Bắt buộc | Ghi chú |
|---|---|---|
| `id` | ✓ | Duy nhất TRONG toàn registry. Tiền tố theo pack (`STD-`, `UK-`…). |
| `title` | ✓ | Mô tả ngắn. |
| `severity` | ✓ | `block` (hủy transaction) \| `error` \| `warn` \| `info`. |
| `params` | — | Số đo do rule đọc. **Mọi ngưỡng để ở đây, không hardcode trong code.** |
| `source` | — | `{ vanBan, dieu, verified }`. Xem quy ước nguồn bên dưới. |
| `message` | ✓ | Mẫu chuỗi, `{key}` thay bằng `values` mà evaluator phát ra. |
| `status` | — | `active` (mặc định) \| `planned` (định nghĩa sẵn, chưa chạy). |
| `typologies` | — | Chỉ áp cho các typology này; **bỏ trống = mọi typology**. |
| `evaluator` | — | Tái dùng phép kiểm của một rule builtin (xem dưới); bỏ trống = evaluator trùng `id`. |

## Quy ước nguồn (`source`) — bắt buộc để "đại trà, đáng tin"

Atelier trích **từng con số** về văn bản gốc. Không có nguồn = bản vẽ tự chú thích ⚠.

- `verified: true` — đã đối chiếu văn bản chuẩn gốc, ghi rõ `vanBan` + `dieu`.
- `verified: false` — số đặt tạm/chưa tra. Rule vẫn chạy nhưng renderer in cờ ⚠ để người dùng biết chưa chốt.
- **Đừng đánh dấu `verified: true` nếu chưa thật sự mở văn bản gốc ra đọc.** Sai số chuẩn đắt hơn thiếu rule.
- Ưu tiên văn bản **mở/tải được** (như UK Approved Documents dưới Open Government Licence) để người khác kiểm lại — xem [Phụ lục A doc 12](12-mo-rong-typology.md#phụ-lục-a--nghiên-cứu-thị-trường--chuẩn-14072026).

## Tái dùng evaluator builtin (không phải viết code)

Trường `evaluator` cho phép rule của bạn mượn phép kiểm hình học builtin, chỉ thay `params` + `message` + `source`. Pack mẫu `std-generic` dùng đúng cách này:

```json
{ "id": "GEN-CEIL-01", "evaluator": "STD-03", "params": { "phong_o": 2400, … }, "message": "Room {ten} … {clear}mm < {min}mm." }
```

Evaluator `STD-03` (cao thông thủy) đọc `params.phong_o|bep_an|wc|kho`, phát `values` `{ten, room, level, clear, min}` cho `message`. Muốn biết một evaluator đọc param gì / phát value gì, xem `packages/core/src/validate/evaluators-*.ts` — mỗi hàm ngắn và thuần. Rule cần phép kiểm **mới** (không có sẵn) thì phải thêm evaluator: viết hàm `(p, def) => Finding[]`, đăng ký id vào `EVALUATORS` trong `engine.ts`.

## Chọn pack ở project

```jsonc
// atelier.project.json
"config": {
  "region": "generic",           // → mọi pack region "generic" + lõi geo
  "typology": "biet-thu",        // → mở khóa rule gắn typologies:["biet-thu"]
  "packs": ["geo", "uk-approved-docs"]  // (tùy chọn) ghi đè tường minh, bỏ qua region
}
```

Không khai `config` → mặc định bộ VN builtin, hành vi như dự án cũ. `core` (geo) **luôn** chạy kể cả khi `packs: []`.

## Đăng ký pack

Pack builtin: thêm vào `BUILTIN_PACKS` trong `packages/core/src/validate/rules.ts`. Pack thêm (region khác/cộng đồng): `registerPack(toPack(json))` — xem dòng đăng ký `std-generic` làm mẫu. (Nạp pack động từ thư mục dự án là việc của P9.)

## Test — 1 phạm + 1 đạt mỗi rule

Theo nếp `packages/core/rules/__tests__/rules.test.ts`: mỗi rule có **một case vi phạm** (mutate model cho sai → rule nổ đúng chỗ) và **một case đạt** (fixture chuẩn sạch). Pack region khác nên có fixture nhà mẫu riêng để làm "case đạt".

## Checklist đóng góp một pack

- [ ] File `rules/<id>.json` có header `pack` đủ trường bắt buộc.
- [ ] Mỗi rule có `source` trung thực; số nào chưa tra để `verified: false`.
- [ ] `message` chỉ dùng `{key}` mà evaluator thật sự phát ra.
- [ ] Rule tái dùng evaluator builtin, hoặc kèm evaluator mới + đăng ký.
- [ ] Đăng ký pack (builtin hoặc `registerPack`).
- [ ] Test 1 phạm + 1 đạt cho mỗi rule; `pnpm test` xanh.
- [ ] Không đổi kết quả validate của project region khác (chạy full suite).
