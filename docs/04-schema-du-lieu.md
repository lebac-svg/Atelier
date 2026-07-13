# 04 — Schema dữ liệu (model tham số)

Model là **một file JSON** (`atelier.project.json`). Mọi thứ khác — bản vẽ, 3D, dim, thống kê — đều dẫn xuất từ nó.

## Quy ước chung

- **Đơn vị: mm, số nguyên.** Không bao giờ dùng float cho kích thước (tránh lỗi cộng dồn).
- **Hệ tọa độ:** mặt bằng dùng (x, y) — y+ hướng ra sau lô đất; z+ hướng lên. Gốc (0,0) = góc trước-trái ranh đất. Hướng bắc thật lưu ở `site.north` (độ, đo từ trục y+).
- **Góc xoay:** độ, ngược chiều kim đồng hồ.
- **ID:** tiền tố loại + chuỗi ngắn (`W12`, `D3`, `R2`, `F15`, `ST1`, `L1`). Client tạo ID (cả Claude lẫn browser), server từ chối nếu trùng. Dễ đọc cho người và LLM ("dời tường W12").
- **Giá trị dẫn xuất không lưu trong file:** diện tích phòng, chiều cao cổ bậc thang (riser)… được tính khi cần (`model_query` với `computed: true`). Một nguồn sự thật, không có số cũ mồ côi.
- **Trường lạ được giữ nguyên** khi đọc/ghi (forward-compatible).

## Các thực thể

```ts
type Project = {
  meta: { id: string; name: string; revision: number; unit: "mm"; app: "atelier/0.x" };
  brief: Brief;                    // xem 02-quy-trinh-thiet-ke.md
  site: Site;
  axes: { x: Axis[]; y: Axis[] };  // hệ trục 1,2,3… / A,B,C…
  levels: Level[];
  walls: Wall[];
  openings: Opening[];             // cửa đi + cửa sổ
  slabs: Slab[];                   // sàn, mái bằng — có lỗ (thang, giếng trời)
  stairs: Stair[];
  rooms: Room[];
  furniture: Furniture[];
  styles: { openings: Record<string, OpeningStyle> };  // "D1", "S1"…
  finishes: Record<string, Finish>;                    // vật liệu hoàn thiện
};

type Site = {
  boundary: [number, number][];    // polygon — chấp nhận đất méo
  north: number;                    // độ lệch bắc so với y+
  front: number;                    // cạnh nào là mặt tiền (index cạnh của boundary)
  setbacks?: { front?: number; back?: number; left?: number; right?: number };
};

type Axis  = { id: string; offset: number; label?: string };
type Level = { id: string; name: string; elevation: number; height: number };
         // height = cao độ sàn-tới-sàn; thông thủy = dẫn xuất (trừ chiều dày sàn)

type Wall = {
  id: string; level: string;
  from: [number, number]; to: [number, number];   // TIM tường (centerline)
  thickness: 110 | 220 | number;                   // gạch đơn/đôi VN
  kind: "gach" | "btct" | "vach-nhe" | "kinh";
  height?: number;                                 // mặc định = level.height
};

type Opening = {
  id: string; wall: string;                        // NEO VÀO TƯỜNG — bất biến quan trọng nhất
  kind: "door" | "window";
  style: string;                                   // tham chiếu styles.openings ("D1"…)
  offset: number;                                  // mm từ đầu `from` của tường đến MÉP TRÁI ô chờ
  width: number; height: number;
  sill: number;                                    // cao bậu; cửa đi = 0
  swing?: "in-L" | "in-R" | "out-L" | "out-R" | "slide" | "none";
};

type Slab = {
  id: string; level: string; kind: "floor" | "roof-flat" | "canopy";
  outline: [number, number][];
  holes?: [number, number][][];                    // lỗ thang, giếng trời
  thickness: number;                               // mặc định 120
};

type Stair = {
  id: string; level: string;                       // tầng chân thang
  type: "1-ve" | "2-ve-U" | "chu-L";
  origin: [number, number]; rotation: number;
  width: number;                                    // bề rộng vế
  steps: number;                                    // tổng số bậc lên tầng trên
  tread: number;                                    // rộng mặt bậc
  landing?: number;                                 // sâu chiếu nghỉ (loại U/L)
};
// riser (cao bậc) KHÔNG lưu — dẫn xuất = level.height / steps, validator kiểm khoảng cho phép

type Room = {
  id: string; level: string; name: string;
  polygon: [number, number][];                     // v1: khai báo tường bao quanh; v2: tự dò từ tường
  use: "khach" | "bep-an" | "ngu" | "wc" | "tho" | "lam-viec" | "gara" |
       "hanh-lang" | "cau-thang" | "san" | "gieng-troi" | "kho" | "ban-cong";
  finish?: { floor?: string; wall?: string; ceiling?: string };  // tham chiếu finishes
};

type Furniture = {
  id: string; level: string;
  asset: string;                                   // id trong catalog (kèm footprint, glTF)
  at: [number, number]; rotation: number;
  elevation?: number;                              // đồ treo (tủ bếp trên…)
};

type OpeningStyle = { label: string; kind: "door" | "window";
                     leaf: "1-canh" | "2-canh" | "truot" | "xep";
                     material?: string; note?: string };
```

## Bất biến "đúng-theo-cấu-trúc" (không cần validator vẫn không thể sai)

1. **Cửa luôn nằm trên tường** — `Opening` neo vào `wall` bằng `offset` tương đối. Dời tường → cửa đi theo, **miễn phí**. Validator chỉ còn kiểm `offset + width ≤ chiều dài tường`.
2. **Riser thang luôn khớp chênh tầng** — vì không lưu riser, chỉ lưu `steps`; đổi chiều cao tầng thì riser tự đổi, validator chỉ kiểm khoảng 150–190.
3. **2D/3D không lệch nhau** — cùng đọc một model; không tồn tại "file 3D" riêng.
4. **Thống kê cửa/phòng luôn đúng** — bảng thống kê là dẫn xuất, không nhập tay.

## Ví dụ rút gọn — nhà ống 4×16m (trích tầng 1)

```jsonc
{
  "meta": { "id": "nha-anh-ba", "name": "Nhà anh Ba", "revision": 42, "unit": "mm", "app": "atelier/0.1" },
  "site": { "boundary": [[0,0],[4000,0],[4100,16000],[0,15800]], "north": 135, "front": 0 },
  "axes": { "x": [{"id":"1","offset":0},{"id":"2","offset":4000}],
            "y": [{"id":"A","offset":0},{"id":"B","offset":5200},{"id":"C","offset":9800},{"id":"D","offset":16000}] },
  "levels": [ { "id": "L1", "name": "Tầng 1", "elevation": 0, "height": 3600 },
              { "id": "L2", "name": "Tầng 2", "elevation": 3600, "height": 3400 } ],
  "walls": [
    { "id": "W1", "level": "L1", "from": [0,0],    "to": [4000,0],    "thickness": 220, "kind": "gach" },
    { "id": "W2", "level": "L1", "from": [0,0],    "to": [0,15800],   "thickness": 220, "kind": "gach" },
    { "id": "W3", "level": "L1", "from": [4000,0], "to": [4100,16000],"thickness": 220, "kind": "gach" },
    { "id": "W4", "level": "L1", "from": [0,5200], "to": [4000,5200], "thickness": 110, "kind": "gach" }
  ],
  "openings": [
    { "id": "D1", "wall": "W1", "kind": "door",   "style": "D1", "offset": 1450, "width": 1100, "height": 2400, "sill": 0, "swing": "in-L" },
    { "id": "S1", "wall": "W4", "kind": "window", "style": "S1", "offset": 2600, "width": 1200, "height": 1400, "sill": 900 }
  ],
  "stairs": [ { "id": "ST1", "level": "L1", "type": "2-ve-U", "origin": [2600,7000],
                "rotation": 0, "width": 900, "steps": 21, "tread": 260, "landing": 900 } ],
  "rooms": [
    { "id": "R1", "level": "L1", "name": "Phòng khách", "use": "khach",
      "polygon": [[110,110],[3890,110],[3890,5145],[110,5145]],
      "finish": { "floor": "gach-600", "wall": "son-trang" } }
  ],
  "furniture": [ { "id": "F1", "level": "L1", "asset": "sofa-3s-01", "at": [600,1800], "rotation": 90 } ],
  "styles": { "openings": {
    "D1": { "label": "Cửa chính", "kind": "door", "leaf": "2-canh", "material": "nhôm kính" },
    "S1": { "label": "Cửa sổ",    "kind": "window", "leaf": "truot" } } }
}
```

File mẫu **đầy đủ 2 tầng** (kèm nội thất, dùng làm golden test cho renderer) sẽ tạo ở Giai đoạn 1: `packages/core/fixtures/nha-ong-4x16.json`.

## Template typology (đề xuất kèm)

Thay vì thiết kế từ giấy trắng, pha B khởi đầu từ **template**: `nha-ong-4x16-2t`, `nha-ong-5x18-3t`, `nha-cap-4`, … Mỗi template là một model mẫu + tham số hóa (rộng/dài/số tầng co giãn theo đất thật). Claude chọn template gần nhất theo brief rồi biến đổi — chất lượng phương án đầu nhảy vọt so với sinh từ số 0. Template đặt tại `packages/core/templates/`.
