---
id: m_mrixwiko668f64c6
type: invariant
status: needs_review
anchors:
  - { kind: file, path: 'README.md', hash: 'f4b524bdde026017262c2e1951c2cd983dc8108d' }
created: 2026-07-13
author: agent:claude
---

# Model JSON là nguồn sự thật duy nhất — Claude không vẽ trực tiếp

Claude chỉ sửa model tham số (atelier.project.json) qua apply_ops — một cổng mutation duy nhất: transaction + validate + broadcast, không có op thay cả model. Renderer deterministic sinh 2D/3D từ model. Xung đột: người dùng luôn thắng (soft-lock + stale-reject). Ký hiệu chuẩn TCVN encode trong renderer, không do AI vẽ. Đủ 5 nguyên tắc trong README.

**Why:** Là 5 nguyên tắc bất di bất dịch của spec P0 — mọi dòng code từ P1 trở đi phải tuân theo
