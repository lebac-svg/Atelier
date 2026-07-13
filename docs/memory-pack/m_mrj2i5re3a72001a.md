---
id: m_mrj2i5re3a72001a
type: gotcha
status: fresh
anchors:
  - { kind: file, path: 'packages/core/rules/loban.json', hash: '85f0c93e863f83d5e8f28ad9c5273aa7257b7030' }
  - { kind: file, path: 'packages/core/rules/std-vn.json', hash: 'ff6360d640b6307297ffeee1b2bb7cad53136ba4' }
created: 2026-07-13
author: agent:mcp
---

# Lỗ Ban verified: chu kỳ 520 (không 522), bàn thờ dùng thước 38.8 (LBB-04) — hết cờ ⚠ trên bản vẽ

Đối chiếu 3+ nguồn 13/07/2026: thước 52.2cm chu kỳ 520mm × 8 cung 65mm (cung 5 Nhân Lộc/Phúc Lộc); 42.9 = khối xây (bệ/tủ bếp); bàn thờ đo bằng 38.8/39cm Đinh Lan 10 cung × 39mm (tốt: Đinh, Vượng, Nghĩa, Quan, Hưng, Tài) → rule LBB-04 riêng. QCXDVN 05:2008: lan can thang ≥900, vị trí khác ≥1100, lô gia/sân thượng từ tầng 9 ≥1400, khe không lọt cầu ⌀100, rào bộ phận mở được ≥900 (nguồn cho STD-08 sill 900). TCVN 13967 KHÔNG quy định bề rộng phòng (STD-02 2100) và cửa phòng/WC (STD-05 700/600) — đó là khuyến nghị thực hành, verified với provenance ghi rõ. Mọi rule verified → renderer tự bỏ dòng "⚠ số liệu tham khảo" khỏi khung tên.

**Why:** Nguồn Lỗ Ban trên mạng mâu thuẫn nhau (520/522, Nhân Lộc/Phúc Lộc, bàn thờ 42.9 hay 38.8) — ai chỉnh loban.json mà không biết lịch sử đối chiếu sẽ đổi nhầm theo một nguồn lẻ
