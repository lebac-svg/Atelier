🇻🇳 [Bản gốc tiếng Việt](../06-giao-thuc-sync.md) — translated from the Vietnamese original, which is authoritative if they differ.

# 06 — Sync protocol (WebSocket)

The soul of both "the house grows on screen as it is designed" and "you can edit it by hand". Two kinds of client — **agent** (Claude via MCP) and **browser** (the user) — edit one model through the same ops vocabulary.

## Revision — the single clock

- `revision` is a monotonically increasing integer, **+1 for every successfully applied transaction**.
- Every write carries a `baseRevision`. The server applies it only when `baseRevision == current revision`; otherwise it rejects and returns the new revision → the client re-reads and retries. (Optimistic concurrency — simple, and enough for 2 clients.)
- An append-only journal `.atelier/history.jsonl`, one line per entry:
  ```jsonc
  { "rev": 43, "ts": "2026-07-13T10:21:04Z", "origin": "agent" | "user",
    "ops": [...], "note": "Ngăn phòng ngủ 2" }  // ("Partition bedroom 2")
  ```
  It feeds `get_changes_since`, undo, restore, and the "who changed what" audit trail.

## Messages

**Client → Server**

| Type | Payload | Notes |
|---|---|---|
| `hello` | `{ clientKind: "browser", lastRevision? }` | Connect / reconnect |
| `ops` | `{ baseRevision, ops[], note? }` | Same shape as `apply_ops` |
| `presence` | `{ selection?, draggingIds?, tool? }` | What is selected, what is being dragged |
| `capture_result` | `{ requestId, png (base64) }` | Returns the image for `capture_view` |

**Server → Client**

| Type | Payload | Notes |
|---|---|---|
| `snapshot` | `{ model, revision }` | On first connect, or when the gap is too large |
| `patch` | `{ revision, ops[], origin, note? }` | The realtime update beat |
| `reject` | `{ yourBase, currentRevision, errors[] }` | Write failed |
| `validation` | `{ revision, issues[] }` | Validator results after each patch |
| `capture_request` | `{ requestId, target, camera? }` | Asks the browser to capture its canvas |
| `presence` | `{ peers: [...] }` | Powers the "Claude is editing…" display |

## Conflicts — "the user always wins"

A three-layer mechanism, from hard to soft:

1. **Soft-lock while dragging:** the browser sends `presence.draggingIds`; any agent op touching an entity being dragged → `reject` with code `locked` ("W12 is being edited by the user"). The lock releases itself 5 seconds after the mouse is released.
2. **Stale writes are rejected:** the agent writes with an old `baseRevision` (because the user just edited) → reject → the agent is forced to call `get_changes_since` (seeing what the user changed) before deciding again. Never a "blind overwrite".
3. **A behavioural convention in the skill/tool descriptions:** Claude is instructed — the user's changes are design decisions, to be respected and adapted to (adjust the neighbouring room accordingly), never "corrected back" to Claude's own preference; unless a rule is violated, in which case Claude **says so** to the user instead of silently changing it.

What about continuous browser interaction (dragging at 60fps)? — While dragging, only **local preview + presence** update; a single `update` op is sent on **mouse release**. The server never sees 60 ops per second.

## Undo / Redo

- **Browser:** a local undo stack = the inverses of ops **created by this client** (per-origin undo). Ctrl+Z sends the inverse op as a regular op (still passing validation + revision). The user cannot undo Claude's operations — this prevents the two sides from yanking the model back and forth.
- **Claude:** has no undo tool. To go back → `history_restore(revision)`, and **only when the user asks for it** ("quay lại như lúc nãy đi" / "go back to how it was").
- Each approval checkpoint (phases A–E) should come with a git commit of the model file — the crudest but most dependable undo layer.

## Reconnects & multiple tabs

- A reconnecting browser sends `hello{lastRevision}`; the server replays ops from the journal when the gap is small, otherwise sends a `snapshot`.
- Multiple tabs / multiple browsers: all are equal `browser` clients — the protocol does not change (this is precisely the foundation for the v2 "send a link to your spouse" feature, since the Nth browser is just one more client).
- Ping/pong heartbeat every 15s; the server keeps no private state for dead clients.

## Illustrated sequence — the user drags a wall, Claude reacts

```
browser: (mouse release) ops{base:43, [{update wall W4 to:[4000,5600]}]}
server : applies → rev 44 → patch{44, origin:"user"} → validation{44, [STD-01 warn: "Bếp còn 4.6m²"]}
                                                        // ("Kitchen down to 4.6m²")
claude : (next turn) get_changes_since(43)
         → "rev44 (user): moved wall W4 from y=5200 → y=5600 (living room +0.4m deeper, kitchen −0.4m)"
claude : "You widened the living room to 5.6m — the kitchen got a bit tight (4.6m²). Shall I move
          door S1 along and push the dining table against the wall?" → apply_ops(44, [...])
```

This is the human–AI collaboration loop that no competitor has yet.
