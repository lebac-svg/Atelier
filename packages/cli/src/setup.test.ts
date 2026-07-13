import { mkdirSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { cursorConfigPath, desktopConfigPath, upsertMcpJson } from "./setup.js";

describe("atelier-mcp setup — phần thuần", () => {
  it("upsertMcpJson: thêm atelier, GIỮ NGUYÊN server khác, chạy lại thì đè sạch", () => {
    const existing = JSON.stringify({
      mcpServers: { haido: { command: "haido", args: ["serve"] } },
      globalShortcut: "Ctrl+Space",
    });
    const out = JSON.parse(upsertMcpJson(existing, "C:\\nha"));
    expect(out.mcpServers.haido.command).toBe("haido"); // không nghiền server khác
    expect(out.globalShortcut).toBe("Ctrl+Space"); // không nghiền field lạ
    expect(out.mcpServers.atelier).toEqual({
      command: "npx",
      args: ["-y", "atelier-mcp"],
      env: { ATELIER_DIR: "C:\\nha" },
    });
    const again = JSON.parse(upsertMcpJson(JSON.stringify(out), "D:\\nha-khac"));
    expect(again.mcpServers.atelier.env.ATELIER_DIR).toBe("D:\\nha-khac");
  });

  it("upsertMcpJson: file trống/chưa có → config mới; JSON hỏng → throw (không ghi đè mù)", () => {
    const fresh = JSON.parse(upsertMcpJson(null, "/home/me/nha"));
    expect(fresh.mcpServers.atelier.command).toBe("npx");
    expect(() => upsertMcpJson("{ hỏng", "/x")).toThrow();
  });

  it("desktopConfigPath/cursorConfigPath: chỉ trả đường dẫn khi app CÓ trên máy", () => {
    const fake = mkdtempSync(path.join(tmpdir(), "atelier-setup-"));
    expect(desktopConfigPath("win32", { APPDATA: fake })).toBeNull(); // chưa có thư mục Claude
    mkdirSync(path.join(fake, "Claude"));
    expect(desktopConfigPath("win32", { APPDATA: fake })).toBe(path.join(fake, "Claude", "claude_desktop_config.json"));
    expect(desktopConfigPath("linux", { HOME: fake })).toBeNull();

    expect(cursorConfigPath({ HOME: fake })).toBeNull();
    mkdirSync(path.join(fake, ".cursor"));
    expect(cursorConfigPath({ HOME: fake })).toBe(path.join(fake, ".cursor", "mcp.json"));
    expect(cursorConfigPath({})).toBeNull();
  });
});
