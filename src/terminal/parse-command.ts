import type { TerminalCommand } from "@/content/types";

export type ParseResult =
  | { ok: true; command: TerminalCommand; argument: string | null }
  | { ok: false; reason: "empty" | "not-found"; input: string };

const COMMAND_TOKEN = /^([a-z-]+|\?|~)$/;

/**
 * input := WS* command (WS+ argument)? WS* — resolves by exact name, then exact alias.
 * A prefix never runs a command; only `completeCommand` uses prefixes (contracts/terminal-commands.md).
 */
export function parseCommand(input: string, registry: readonly TerminalCommand[]): ParseResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, reason: "empty", input };

  const [rawCommand, rawArgument] = trimmed.split(/\s+/, 2);
  const token = rawCommand.toLowerCase();
  const notFound = { ok: false, reason: "not-found", input: rawCommand } as const;
  if (!COMMAND_TOKEN.test(token)) return notFound;

  const command =
    registry.find((candidate) => candidate.name === token) ??
    registry.find((candidate) => candidate.aliases?.includes(token));
  if (!command) return notFound;

  return { ok: true, command, argument: rawArgument ?? null };
}

/** Tab completion: the single visible name or alias that starts with `prefix`, or null when none or several match. */
export function completeCommand(prefix: string, registry: readonly TerminalCommand[]): string | null {
  const needle = prefix.trim().toLowerCase();
  if (!needle) return null;

  const candidates = registry
    .filter((command) => !command.hidden)
    .flatMap((command) => [command.name, ...(command.aliases ?? [])])
    .filter((word) => word.startsWith(needle));

  return candidates.length === 1 ? candidates[0] : null;
}
