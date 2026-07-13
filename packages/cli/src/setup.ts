import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * `atelier-mcp setup` — MỘT lệnh đăng ký cho mọi client: MCP chuẩn hóa giao
 * thức chứ không chuẩn hóa chỗ đăng ký (mỗi client một file config riêng),
 * nên ta dò client có trên máy và đăng ký giúp:
 * - CLI (claude / codex / gemini): gọi đúng lệnh `... mcp add` của nó —
 *   không đoán format file config nội bộ.
 * - GUI (Claude Desktop, Cursor): ghi thẳng JSON config, giữ nguyên server
 *   khác; ATELIER_DIR ghim vào thư mục đang đứng (GUI không có cwd).
 */

export type SetupResult = { client: string; status: "registered" | "not found" | "error"; detail: string };

const SERVER_ARGS = ["npx", "-y", "atelier-mcp"];

/** Ghi/đè entry atelier trong file JSON kiểu mcpServers — GIỮ server khác. Trả text mới. */
export function upsertMcpJson(existingText: string | null, houseDir: string): string {
  let cfg: Record<string, unknown> = {};
  if (existingText != null && existingText.trim() !== "") {
    cfg = JSON.parse(existingText) as Record<string, unknown>; // hỏng thì throw — caller báo sửa tay
  }
  const servers = (cfg.mcpServers ?? {}) as Record<string, unknown>;
  servers.atelier = {
    command: SERVER_ARGS[0],
    args: SERVER_ARGS.slice(1),
    env: { ATELIER_DIR: houseDir },
  };
  cfg.mcpServers = servers;
  return JSON.stringify(cfg, null, 2) + "\n";
}

/** Đường dẫn config Claude Desktop theo hệ điều hành — null nếu KHÔNG thấy app (không tự tạo). */
export function desktopConfigPath(platform: string, env: Record<string, string | undefined>): string | null {
  const dir =
    platform === "win32"
      ? env.APPDATA && path.join(env.APPDATA, "Claude")
      : platform === "darwin"
        ? env.HOME && path.join(env.HOME, "Library", "Application Support", "Claude")
        : env.HOME && path.join(env.HOME, ".config", "Claude");
  if (!dir || !existsSync(dir)) return null;
  return path.join(dir, "claude_desktop_config.json");
}

/** Thư mục Cursor (~/.cursor) — null nếu không thấy. */
export function cursorConfigPath(env: Record<string, string | undefined>): string | null {
  const home = env.HOME ?? env.USERPROFILE;
  if (!home) return null;
  const dir = path.join(home, ".cursor");
  return existsSync(dir) ? path.join(dir, "mcp.json") : null;
}

const CLI_CLIENTS: Array<{ name: string; bin: string; addArgs: string[] }> = [
  { name: "Claude Code", bin: "claude", addArgs: ["mcp", "add", "atelier", "--", ...SERVER_ARGS] },
  { name: "Codex CLI", bin: "codex", addArgs: ["mcp", "add", "atelier", "--", ...SERVER_ARGS] },
  { name: "Gemini CLI", bin: "gemini", addArgs: ["mcp", "add", "atelier", ...SERVER_ARGS] },
];

function tryCli(bin: string, args: string[]): { found: boolean; ok: boolean; out: string } {
  const probe = spawnSync(bin, ["--version"], { shell: true, stdio: "ignore", timeout: 20_000 });
  if (probe.status !== 0) return { found: false, ok: false, out: "" };
  const r = spawnSync(bin, args, { shell: true, encoding: "utf8", timeout: 60_000 });
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`.trim().split("\n").at(-1) ?? "";
  return { found: true, ok: r.status === 0, out };
}

export function runSetup(houseDir: string, io: { log: (s: string) => void } = { log: (s) => console.error(s) }): SetupResult[] {
  const results: SetupResult[] = [];

  for (const c of CLI_CLIENTS) {
    const r = tryCli(c.bin, c.addArgs);
    if (!r.found) {
      results.push({ client: c.name, status: "not found", detail: `'${c.bin}' is not on PATH` });
    } else if (r.ok) {
      results.push({ client: c.name, status: "registered", detail: r.out || `${c.bin} ${c.addArgs.join(" ")}` });
    } else {
      // "already exists" từ client vẫn là trạng thái tốt — báo nguyên văn cho người dùng tự thấy
      results.push({ client: c.name, status: "error", detail: r.out || "command failed" });
    }
  }

  const jsonTargets: Array<{ name: string; file: string | null }> = [
    { name: "Claude Desktop", file: desktopConfigPath(process.platform, process.env) },
    { name: "Cursor", file: cursorConfigPath(process.env) },
  ];
  for (const t of jsonTargets) {
    if (!t.file) {
      results.push({ client: t.name, status: "not found", detail: "app config folder not present" });
      continue;
    }
    try {
      const before = existsSync(t.file) ? readFileSync(t.file, "utf8") : null;
      mkdirSync(path.dirname(t.file), { recursive: true });
      writeFileSync(t.file, upsertMcpJson(before, houseDir), "utf8");
      results.push({ client: t.name, status: "registered", detail: `${t.file} (ATELIER_DIR=${houseDir}) — restart the app` });
    } catch (e) {
      results.push({ client: t.name, status: "error", detail: `${t.file}: ${e instanceof Error ? e.message : String(e)} — edit manually per README` });
    }
  }

  const icon = { registered: "✔", "not found": "·", error: "✘" } as const;
  io.log(`atelier-mcp setup — house folder: ${houseDir}`);
  for (const r of results) io.log(`${icon[r.status]} ${r.client}: ${r.status}${r.detail ? ` — ${r.detail}` : ""}`);
  const n = results.filter((r) => r.status === "registered").length;
  io.log(n > 0
    ? `Done: registered with ${n} client(s). Open your agent here and say "design me a tube house".`
    : `No MCP client found. Install one (Claude Code, Codex CLI, Gemini CLI, Claude Desktop, Cursor) or register manually — see https://github.com/lebac-svg/Atelier#install-30-seconds`);
  return results;
}
