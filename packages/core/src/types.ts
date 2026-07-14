/**
 * Schema model tham số — theo docs/04-schema-du-lieu.md.
 *
 * Quy ước:
 * - Đơn vị mm, SỐ NGUYÊN. Không dùng float cho kích thước.
 * - Mặt bằng (x, y): y+ hướng ra sau lô đất, z+ hướng lên.
 *   Gốc (0,0) = góc trước-trái ranh đất.
 * - Góc xoay: độ, ngược chiều kim đồng hồ.
 * - Giá trị dẫn xuất (diện tích, riser…) KHÔNG lưu trong model.
 * - Trường lạ được giữ nguyên khi đọc/ghi (forward-compatible) —
 *   ops chỉ shallow-merge, không bao giờ dựng lại object từng field.
 */

export type Point = [number, number];
export type Polygon = Point[];

export type Project = {
  meta: ProjectMeta;
  brief: Brief;
  config?: ProjectConfig;
  site: Site;
  axes: { x: Axis[]; y: Axis[] };
  levels: Level[];
  walls: Wall[];
  openings: Opening[];
  slabs: Slab[];
  /** Mái dốc (P7). File cũ thiếu trường này — normalizeProject bù []. */
  roofs?: Roof[];
  stairs: Stair[];
  rooms: Room[];
  furniture: Furniture[];
  styles: { openings: Record<string, OpeningStyle> };
  finishes: Record<string, Finish>;
  underlay?: Underlay;
};

export type ProjectMeta = {
  id: string;
  name: string;
  revision: number;
  unit: "mm";
  app: string; // "atelier/0.x"
};

/**
 * Cấu hình region/typology của dự án (P6 — doc 12). MỌI field optional:
 * project không khai config → bộ chuẩn Việt Nam builtin, hành vi như trước.
 */
export type ProjectConfig = {
  /** Vùng áp dụng — quyết định bộ rule-pack chuẩn mặc định. Bỏ trống = "vn". */
  region?: string;
  /** Loại hình nhà (vd. "nha-ong", "biet-thu") — lọc rule gắn `typologies`. */
  typology?: string;
  /** Ghi đè tường minh danh sách pack id áp dụng (bỏ qua suy từ region). Core pack luôn chạy. */
  packs?: string[];
};

export type Site = {
  boundary: Polygon; // chấp nhận đất méo
  north: number; // độ lệch bắc so với y+
  front: number; // index CẠNH mặt tiền CHÍNH của boundary (mặt đứng chiếu cạnh này)
  setbacks?: { front?: number; back?: number; left?: number; right?: number };
  /**
   * Đa mặt tiền (P7): thuộc tính TỪNG CẠNH boundary[i]→boundary[i+1].
   * Mảng song song boundary (thiếu phần tử = cạnh không khai). Có `edges`
   * thì PLN đọc setback theo cạnh; không có → hành vi front/back cũ.
   */
  edges?: SiteEdge[];
  /**
   * Địa hình (P7): cao độ MẶT ĐẤT tại từng đỉnh boundary (mm, so với cốt
   * ±0.000 của model — âm = đất thấp hơn nền trệt). Mảng song song boundary.
   * Bỏ trống = đất phẳng ở −450 (nền trệt cao hơn đất 3 bậc thềm quen thuộc).
   * Trong lô nội suy IDW — xem groundAt() ở model.ts.
   */
  terrain?: { elevations: number[] };
};

export type SiteEdgeKind = "street" | "alley" | "neighbor";

export type SiteEdge = {
  /** Cạnh giáp gì — "street"/"alley" là mặt thoáng (được trổ cửa, vươn ô văng). */
  kind?: SiteEdgeKind;
  /** Khoảng lùi yêu cầu cho riêng cạnh này (mm) — PLN-07 kiểm. */
  setback?: number;
};

export type Axis = { id: string; offset: number; label?: string };

export type Level = {
  id: string;
  name: string;
  elevation: number;
  height: number; // sàn-tới-sàn; thông thủy = dẫn xuất (trừ dày sàn trên)
};

export type WallKind = "gach" | "btct" | "vach-nhe" | "kinh";

export type Wall = {
  id: string;
  level: string;
  from: Point; // TIM tường (centerline)
  to: Point;
  thickness: number; // 110 | 220 gạch đơn/đôi VN, hoặc số khác
  kind: WallKind;
  height?: number; // mặc định = level.height
};

export type SwingKind = "in-L" | "in-R" | "out-L" | "out-R" | "slide" | "none";

export type Opening = {
  id: string;
  wall: string; // NEO VÀO TƯỜNG — bất biến quan trọng nhất
  kind: "door" | "window";
  style: string; // tham chiếu styles.openings
  offset: number; // mm từ đầu `from` của tường đến MÉP TRÁI ô chờ
  width: number;
  height: number;
  sill: number; // cao bậu; cửa đi = 0
  swing?: SwingKind;
};

export type Slab = {
  id: string;
  level: string;
  kind: "floor" | "roof-flat" | "canopy";
  outline: Polygon;
  holes?: Polygon[]; // lỗ thang, giếng trời
  thickness: number; // mặc định 120
};

export type RoofKind = "gable" | "hip" | "shed";

/**
 * Quy ước hình học mái dốc (v1 — P7 doc 12), cùng tinh thần quy ước thang:
 * - `level` = tầng TRÊN CÙNG mà mái che. Đáy MÉP mái (diềm) nằm ở
 *   z = level.elevation + level.height (đỉnh tường tầng đó).
 * - `outline` = hình chiếu bằng MÉP NGOÀI mái, ĐÃ GỒM phần đua (overhang
 *   chỉ là metadata). Mái bằng BTCT tiếp tục dùng Slab kind "roof-flat".
 * - `pitch` = độ dốc (ĐỘ, không phải tỷ lệ; phổ biến 18–34°).
 * - gable: nóc chạy dọc `ridgeAxis` qua TÂM bbox outline — 2 mặt phẳng;
 *   z(pt) = base + (halfSpan − |khoảng cách tới đường nóc|) × tan(pitch).
 * - shed: MỘT mặt phẳng; cạnh CAO là cạnh bbox song song `ridgeAxis`
 *   phía `highSide` ("min" = phía tọa độ nhỏ của trục vuông góc).
 * - hip: 4 mặt từ 4 mép bbox; z = min(khoảng cách tới 4 mép) × tan, chặn
 *   tại nóc. v1 outline hip nên là CHỮ NHẬT (4 đỉnh) — polygon phức tạp
 *   cần straight skeleton, để v2.
 * - `ridgeAxis` bỏ trống = trục DÀI của bbox.
 */
export type Roof = {
  id: string;
  level: string;
  kind: RoofKind;
  outline: Polygon;
  pitch: number; // độ
  ridgeAxis?: "x" | "y";
  highSide?: "min" | "max"; // chỉ shed; mặc định "min"
  overhang?: number; // mm — metadata (outline đã gồm đua)
  thickness?: number; // dày kết cấu theo phương vuông góc mặt mái; mặc định 150
  material?: string; // "ngoi" | "ton"… — nuôi render/estimate về sau
};

export type StairType = "1-ve" | "2-ve-U" | "chu-L";

/**
 * Quy ước hình học thang (v1):
 * - Hệ local: origin = góc TRÁI-DƯỚI của VẾ 1; local +y = chiều đi lên vế 1.
 * - "1-ve": vế x∈[0,width], dài (steps-1)×tread.
 * - "2-ve-U": vế 1 x∈[0,width] đi +y; chiếu nghỉ sâu `landing` ở cuối;
 *   vế 2 x∈[-width,0] (RẼ TRÁI khi đi lên) đi ngược -y.
 *   Chirality rẽ phải = rotation 180 + đặt lại origin (v2 sẽ thêm `turn`).
 * - riser KHÔNG lưu — dẫn xuất = level.height / steps.
 */
export type Stair = {
  id: string;
  level: string; // tầng chân thang
  type: StairType;
  origin: Point;
  rotation: number;
  width: number; // bề rộng vế
  steps: number; // tổng số bậc lên tầng trên (bậc cuối = sàn trên)
  tread: number; // rộng mặt bậc
  landing?: number; // sâu chiếu nghỉ (loại U/L)
};

export type RoomUse =
  | "khach"
  | "bep-an"
  | "ngu"
  | "wc"
  | "tho"
  | "lam-viec"
  | "gara"
  | "hanh-lang"
  | "cau-thang"
  | "san"
  | "gieng-troi"
  | "kho"
  | "ban-cong";

export type Room = {
  id: string;
  level: string;
  name: string;
  polygon: Polygon; // v1: khai báo; v2: tự dò từ tường
  use: RoomUse;
  finish?: { floor?: string; wall?: string; ceiling?: string };
};

export type Furniture = {
  id: string;
  level: string;
  asset: string; // id trong catalog (footprint, glTF)
  at: Point; // TÂM footprint
  rotation: number; // CCW quanh tâm; 0 = chiều rộng asset theo +x
  elevation?: number; // đồ treo (tủ bếp trên…)
};

export type OpeningStyle = {
  label: string;
  kind: "door" | "window";
  leaf: "1-canh" | "2-canh" | "truot" | "xep";
  material?: string;
  note?: string;
};

export type Finish = {
  label: string;
  scope?: "floor" | "wall" | "ceiling";
  material?: string;
  color?: string;
  note?: string;
};

/** Brief — kết quả pha A phỏng vấn (docs/02). Điền dần, mọi field optional. */
export type Brief = {
  dat?: {
    ranh_gioi?: Polygon;
    huong_truoc?: string;
    /** Vĩ độ (độ, dương = Bắc) — nuôi sun study P5; bỏ trống = 10.8 (TP.HCM). */
    vi_do?: number;
    tiep_giap?: { truoc?: string; sau?: string; trai?: string; phai?: string };
    quy_hoach?: {
      khoang_lui_truoc?: number;
      khoang_lui_sau?: number;
      tang_max?: number;
      mat_do_max?: number; // %
      /** Chiều cao đỉnh công trình tối đa (mm) — nuôi PLN-05. */
      chieu_cao_max?: number;
      /** Mức ô văng/mái được vươn ra ngoài ranh TRƯỚC tối đa (mm) — nuôi PLN-06. */
      o_vang_max?: number;
    };
  };
  gia_dinh?: string;
  nhu_cau?: {
    phong_ngu?: number;
    wc?: number;
    phong_tho?: boolean;
    xe_may?: number;
    o_to?: boolean;
    gieng_troi?: boolean;
    san_phoi?: boolean;
    bep?: string;
    kinh_doanh?: boolean;
  };
  ngan_sach?: { muc?: string; hoan_thien?: string };
  gu?: { phong_cach?: string; mau?: string; anh_tham_chieu?: string[] };
  uu_tien?: string[];
  /** Q4 (13/07/2026): hỏi bật/tắt Lỗ Ban ở pha A — lưu tại đây. */
  phong_thuy?: { lo_ban?: boolean };
};

/**
 * Underlay đồ lại — bản vẽ cũ (DXF) hoặc ảnh mặt bằng đặt MỜ dưới plan
 * để dựng model theo. SINGLETON (id luôn "U1"), đi qua ops như mọi entity.
 * Model chỉ lưu THAM CHIẾU file (đã copy vào .atelier/underlay/) + phép đặt;
 * hình học nguồn không vào model — underlay là giàn giáo, không phải nhà.
 */
export type Underlay = {
  id: string; // "U1"
  kind: "dxf" | "image";
  /** Tên file trong <dự án>/.atelier/underlay/ (server copy khi import). */
  source: string;
  /** Điểm model (mm) nơi gốc (0,0) của nguồn được đặt. Ảnh: gốc = góc DƯỚI-TRÁI. */
  origin: Point;
  /** mm model trên MỘT đơn vị nguồn (DXF unit / pixel ảnh). */
  scale: number;
  /** Độ CCW quanh origin (cùng quy ước model). */
  rotation?: number;
  /** 0..1, mặc định 0.35. */
  opacity?: number;
  /** Chỉ hiện ở tầng này; bỏ trống = mọi tầng. */
  level?: string;
};

/** Các loại thực thể đi qua ops (docs/05). */
export type EntityKind =
  | "level"
  | "wall"
  | "opening"
  | "slab"
  | "roof"
  | "stair"
  | "room"
  | "furniture"
  | "axis"
  | "style"
  | "finish"
  | "underlay";
