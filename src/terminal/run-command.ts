import { pick } from "@/content/localize";
import { TERMINAL_COPY as COPY } from "@/content/terminal-copy";
import type { Locale, TerminalCommand } from "@/content/types";
import { parseCommand } from "./parse-command";

export type Tone = "text" | "muted" | "accent";

export type OutputLine =
  | { kind: "text"; segments: { text: string; tone: Tone }[] }
  | { kind: "neofetch"; rows: [key: string, value: string][] };

/** Side effects the terminal UI performs after printing the lines. */
export type TerminalEffect =
  | { type: "navigate"; hash: string }
  | { type: "setLocale"; locale: Locale }
  | { type: "copyEmail" }
  | { type: "downloadCv" }
  | { type: "clear" }
  | { type: "close" };

export type RunResult = { lines: OutputLine[]; effects: TerminalEffect[] };

export type RunContext = {
  locale: Locale;
  registry: readonly TerminalCommand[];
  reducedMotion: boolean;
  /** CV file the active locale gets, and whether it is the other locale's fallback (FR-010a). */
  cv: { fileName: string; isFallback: boolean };
};

export function line(text: string, tone: Tone = "text"): OutputLine {
  return { kind: "text", segments: [{ text, tone }] };
}

export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

export function promptEcho(input: string): OutputLine {
  return {
    kind: "text",
    segments: [
      { text: "~ $ ", tone: "accent" },
      { text: input.trim(), tone: "text" },
    ],
  };
}

/** Lines of `help`: visible commands with their aliases, ending with the hidden-commands hint (FR-012f). */
export function helpLines(registry: readonly TerminalCommand[], locale: Locale): OutputLine[] {
  const visible = registry.filter((command) => !command.hidden);
  const rows: OutputLine[] = visible.map((command) => ({
    kind: "text",
    segments: [
      { text: `  ${command.name.padEnd(10)}`, tone: "accent" },
      { text: pick(command.description, locale), tone: "text" },
      { text: command.aliases?.length ? `  (${command.aliases.join(", ")})` : "", tone: "muted" },
    ],
  }));
  return [line(pick(COPY.helpTitle, locale), "muted"), ...rows, line(pick(COPY.secretHint, locale), "muted")];
}

function parseLocaleArgument(argument: string): Locale | null {
  const value = argument.toLowerCase();
  if (value === "pt" || value === "pt-br") return "pt-BR";
  if (value === "en") return "en";
  return null;
}

function runEffect(id: string, argument: string | null, context: RunContext): OutputLine[] {
  const { locale, reducedMotion } = context;
  switch (id) {
    case "sudo":
      return argument?.toLowerCase() === "hire-me"
        ? pick(COPY.hireMe, locale).map((text, index) => line(text, index === 0 ? "muted" : index === 1 ? "accent" : "text"))
        : [line(pick(COPY.niceTry, locale), "accent")];
    case "neofetch":
      return [{ kind: "neofetch", rows: pick(COPY.neofetch, locale) }];
    case "matrix": {
      const phrase = line(pick(COPY.matrixPhrase, locale));
      return reducedMotion ? [phrase] : [...COPY.matrixRain.map((text) => line(text, "accent")), phrase];
    }
    default:
      return [];
  }
}

/** Pure: turns one input into output lines and the effects the UI must perform. */
export function runCommand(input: string, context: RunContext): RunResult {
  const { locale, registry, cv } = context;
  const echo = promptEcho(input);
  const parsed = parseCommand(input, registry);

  if (!parsed.ok) {
    if (parsed.reason === "empty") return { lines: [echo], effects: [] };
    return { lines: [echo, line(fill(pick(COPY.notFound, locale), { command: parsed.input }), "muted")], effects: [] };
  }

  const { command, argument } = parsed;
  const { action } = command;

  switch (action.kind) {
    case "help":
      return { lines: [echo, ...helpLines(registry, locale)], effects: [] };
    case "navigate": {
      const destination = COPY.destinations[action.path];
      const label = destination ? pick(destination, locale) : action.path;
      return {
        lines: [echo, line(fill(pick(COPY.navigated, locale), { destination: label }), "accent")],
        effects: [{ type: "navigate", hash: action.path }, { type: "close" }],
      };
    }
    case "setLocale": {
      if (!argument) return { lines: [echo, line(pick(COPY.langCurrent, locale), "muted")], effects: [] };
      const next = parseLocaleArgument(argument);
      if (!next) return { lines: [echo, line(pick(COPY.langUsage, locale), "muted")], effects: [] };
      return {
        lines: [echo, line(fill(pick(COPY.langSet, next), { locale: next }), "accent")],
        effects: [{ type: "setLocale", locale: next }],
      };
    }
    case "copyEmail":
      return { lines: [echo], effects: [{ type: "copyEmail" }] };
    case "downloadCv": {
      const note = cv.isFallback ? pick(COPY.cvFallbackNote, locale) : "";
      const text = fill(pick(COPY.cvDownloading, locale), { file: cv.fileName }) + note;
      return { lines: [echo, line(text, "accent")], effects: [{ type: "downloadCv" }] };
    }
    case "print":
      return { lines: [echo, ...pick(action.lines, locale).map((text) => line(text, "accent"))], effects: [] };
    case "effect":
      return { lines: [echo, ...runEffect(action.id, argument, context)], effects: [] };
    case "clear":
      return { lines: [], effects: [{ type: "clear" }] };
    case "close":
      return { lines: [echo], effects: [{ type: "close" }] };
  }
}
