import { describe, expect, it } from "vitest";
import { COMMANDS } from "@/content/commands";
import { MENU_ITEMS } from "@/layout/menu-items";
import { helpLines, runCommand, type OutputLine, type RunContext } from "@/terminal/run-command";

const SINGLE_TOKEN = /^([a-z-]+|\?|~)$/;

const context: RunContext = {
  locale: "pt-BR",
  registry: COMMANDS,
  reducedMotion: false,
  cv: { fileName: "naianderson-bruno-pt-BR.pdf", isFallback: false },
};

function text(lines: OutputLine[]) {
  return lines.map((line) => (line.kind === "text" ? line.segments.map((s) => s.text).join("") : "[neofetch]")).join("\n");
}

describe("command registry", () => {
  const words = COMMANDS.flatMap((command) => [command.name, ...(command.aliases ?? [])]);
  const shortcuts = COMMANDS.flatMap((command) => (command.shortcut ? [command.shortcut] : []));

  it("has unique names, aliases and shortcuts", () => {
    expect(new Set(words).size).toBe(words.length);
    expect(new Set(shortcuts).size).toBe(shortcuts.length);
  });

  it("uses a single grammar token for every name and alias", () => {
    for (const word of words) expect(word).toMatch(SINGLE_TOKEN);
  });

  it("has between 3 and 5 hidden commands, none listed by help", () => {
    const hidden = COMMANDS.filter((command) => command.hidden);
    expect(hidden.length).toBeGreaterThanOrEqual(3);
    expect(hidden.length).toBeLessThanOrEqual(5);

    const help = text(helpLines(COMMANDS, "pt-BR"));
    for (const command of hidden) expect(help).not.toMatch(new RegExp(`\\b${command.name}\\b`));
    expect(help).toContain("psst… existem comandos secretos.");
  });

  it("only navigates to destinations that are in the menu (SC-011)", () => {
    const menuHashes = MENU_ITEMS.map((item) => item.hash);
    const destinations = COMMANDS.filter((command) => !command.hidden).flatMap((command) =>
      command.action.kind === "navigate" ? [command.action.path] : [],
    );

    expect(destinations.length).toBeGreaterThan(0);
    for (const destination of destinations) expect(menuHashes).toContain(destination);
  });
});

describe("runCommand", () => {
  it("navigates and closes the terminal", () => {
    const result = runCommand("sobre", context);
    expect(text(result.lines)).toContain("→ sobre");
    expect(result.effects).toEqual([{ type: "navigate", hash: "#about" }, { type: "close" }]);
  });

  it("keeps the terminal open on an unknown command", () => {
    const result = runCommand("xyz", { ...context, locale: "en" });
    expect(text(result.lines)).toContain("command not found: xyz — type help");
    expect(result.effects).toEqual([]);
  });

  it("switches locale only for pt or en", () => {
    expect(runCommand("lang en", context).effects).toEqual([{ type: "setLocale", locale: "en" }]);
    expect(runCommand("idioma PT", context).effects).toEqual([{ type: "setLocale", locale: "pt-BR" }]);
    expect(text(runCommand("lang de", context).lines)).toContain("uso: lang pt | en");
    expect(text(runCommand("lang", context).lines)).toContain("idioma atual: pt-BR");
  });

  it("answers sudo only to hire-me", () => {
    expect(text(runCommand("sudo hire-me", context).lines)).toContain("permissão concedida");
    expect(text(runCommand("sudo rm", context).lines)).toContain("nice try ;)");
    expect(text(runCommand("sudo", context).lines)).toContain("nice try ;)");
  });

  it("prints only the matrix phrase under reduced motion", () => {
    const full = runCommand("matrix", context).lines;
    const reduced = runCommand("matrix", { ...context, reducedMotion: true }).lines;
    expect(reduced.length).toBeLessThan(full.length);
    expect(text(reduced)).toContain("acorda, recrutador…");
  });

  it("notes the CV fallback language", () => {
    const result = runCommand("cv", { ...context, locale: "en", cv: { fileName: "cv.pdf", isFallback: true } });
    expect(text(result.lines)).toContain("(English version coming soon)");
    expect(result.effects).toEqual([{ type: "downloadCv" }]);
  });

  it("clears without echo", () => {
    expect(runCommand("clear", context)).toEqual({ lines: [], effects: [{ type: "clear" }] });
  });
});
