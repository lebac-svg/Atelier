---
id: m_mrj1ptsk60d66ee1
type: decision
status: fresh
anchors:
  - { kind: file, path: 'docs/10-lo-trinh.md', hash: 'bd552a45bd19dc15b906ed5add5389bfb3d74947' }
  - { kind: file, path: 'packages/server/src/mcp.ts', hash: 'cb1116d17737212c4025b4c710e7816089fa7b41' }
created: 2026-07-13
author: agent:mcp
---

# P1 hoàn thành 13/07/2026 — demo live cần restart session để nạp MCP atelier

DoD P1 đạt đủ: core (schema/geometry/ops/validator 22 rules) + server (renderer SVG-PNG, MCP 7 tools, store+journal) + skill thiet-ke-nha + demo end-to-end qua tầng MCP (scripts/demo-p1.ts), 71 tests. Server atelier đã đăng ký .mcp.json (node --import tsx packages/server/src/mcp.ts, ATELIER_DIR=sandbox/demo) — phiên hiện tại KHÔNG có tools này, restart Claude Code mới nạp. P2 kế tiếp: editor_open + HTTP/WS + browser 2D/3D mọc theo apply_ops + capture_view (doc 06/09).

**Why:** Mốc giai đoạn theo Q8; người tiếp theo cần biết demo live chạy thế nào và vì sao tools atelier chưa thấy trong phiên cũ
