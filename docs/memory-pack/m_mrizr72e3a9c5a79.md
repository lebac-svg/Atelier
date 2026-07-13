---
id: m_mrizr72e3a9c5a79
type: convention
status: fresh
anchors:
  - { kind: file, path: 'packages/core/src/geometry/stair.ts', hash: '4bae5f3f5261402fab8bb7de8421a618b941602b' }
  - { kind: file, path: 'packages/core/src/types.ts', hash: '621fa79ce7e358dad7aa1a52652ca9cdfb55a9c9' }
created: 2026-07-13
author: agent:mcp
---

# Quy ước hình học thang U + swing cửa (v1) — doc 04 chưa định nghĩa

Thang "2-ve-U": local origin = góc TRÁI-DƯỚI vế 1, +y = chiều lên vế 1, vế 2 luôn RẼ TRÁI (x∈[-w,0]); rotation không tạo được chirality rẽ phải (cần mirror) → v2 thêm field `turn`. Swing cửa: "in-*" = mở về phía pháp tuyến TRÁI tường (perp của from→to), "out-*" = phải; L/R = bản lề ở mép offset (L) hay offset+width (R). Muốn cửa "mở vào phòng X" phải chọn chiều from→to của tường cho khớp (fixture đã đảo W6, W14 vì lý do này).

**Why:** Rotation-only không biểu diễn được mirror; swing phụ thuộc hướng vẽ tường — ai sửa renderer/validator/editor mà không biết sẽ vẽ cửa mở ngược và thang lộn vế
