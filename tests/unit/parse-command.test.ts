import { describe, expect, it } from "vitest";
import { COMMANDS } from "@/content/commands";
import { completeCommand, parseCommand } from "@/terminal/parse-command";

function resolvedName(input: string) {
  const result = parseCommand(input, COMMANDS);
  return result.ok ? result.command.name : result.reason;
}

describe("parseCommand", () => {
  it("reports empty input", () => {
    expect(parseCommand("   ", COMMANDS)).toMatchObject({ ok: false, reason: "empty" });
  });

  it("ignores surrounding spaces and letter case", () => {
    expect(resolvedName("  HELP  ")).toBe("help");
    expect(resolvedName("About")).toBe("about");
  });

  it("resolves the name first, then aliases", () => {
    expect(resolvedName("sobre")).toBe("about");
    expect(resolvedName("whoami")).toBe("about");
    expect(resolvedName("?")).toBe("help");
    expect(resolvedName("~")).toBe("home");
  });

  it("never runs a command from a prefix", () => {
    expect(resolvedName("hel")).toBe("not-found");
    expect(resolvedName("cont")).toBe("not-found");
  });

  it("keeps the deferred project commands unknown", () => {
    for (const input of ["projects", "projetos", "ls", "open", "abrir", "cat"]) {
      expect(resolvedName(input)).toBe("not-found");
    }
  });

  it("returns the first argument", () => {
    expect(parseCommand("lang en", COMMANDS)).toMatchObject({ ok: true, argument: "en" });
    expect(parseCommand("sudo hire-me", COMMANDS)).toMatchObject({
      ok: true,
      command: { name: "sudo" },
      argument: "hire-me",
    });
    expect(parseCommand("help", COMMANDS)).toMatchObject({ ok: true, argument: null });
  });

  it("rejects tokens outside the grammar", () => {
    expect(parseCommand("rm -rf /", COMMANDS)).toMatchObject({ ok: false, reason: "not-found", input: "rm" });
    expect(parseCommand("cv2", COMMANDS)).toMatchObject({ ok: false, reason: "not-found" });
  });
});

describe("completeCommand", () => {
  it("completes a unique visible prefix", () => {
    expect(completeCommand("he", COMMANDS)).toBe("help");
    expect(completeCommand("ab", COMMANDS)).toBe("about");
  });

  it("returns null when ambiguous, empty or only hidden commands match", () => {
    expect(completeCommand("c", COMMANDS)).toBeNull();
    expect(completeCommand("", COMMANDS)).toBeNull();
    expect(completeCommand("neo", COMMANDS)).toBeNull();
  });
});
