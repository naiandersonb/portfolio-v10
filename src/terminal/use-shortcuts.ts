"use client";

import { useEffect, useRef } from "react";
import type { TerminalCommand } from "@/content/types";

/** How long `g` waits for its second key. */
const SEQUENCE_TIMEOUT_MS = 1000;

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

/** Maps "g h" style shortcuts from the registry to their navigate destination. */
export function sequenceDestinations(registry: readonly TerminalCommand[]): Map<string, string> {
  const destinations = new Map<string, string>();
  for (const command of registry) {
    if (command.shortcut && command.action.kind === "navigate") destinations.set(command.shortcut, command.action.path);
  }
  return destinations;
}

type ShortcutHandlers = {
  enabled: boolean;
  registry: readonly TerminalCommand[];
  onOpen: () => void;
  onNavigate: (hash: string) => void;
};

/**
 * Ctrl/⌘+K and `/` open the terminal; `g` then a letter jumps to a section (FR-012a).
 * Matches on `event.key`, so ABNT2 and other layouts work, and never binds the backtick (dead key on ABNT2).
 */
export function useShortcuts({ enabled, registry, onOpen, onNavigate }: ShortcutHandlers) {
  const handlers = useRef({ onOpen, onNavigate });
  useEffect(() => {
    handlers.current = { onOpen, onNavigate };
  });

  useEffect(() => {
    if (!enabled) return;
    const destinations = sequenceDestinations(registry);
    let pendingPrefix: string | null = null;
    let prefixTimer: ReturnType<typeof setTimeout> | undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing) return;
      const key = event.key.toLowerCase();

      if ((event.ctrlKey || event.metaKey) && !event.altKey && key === "k") {
        event.preventDefault();
        handlers.current.onOpen();
        return;
      }
      if (event.ctrlKey || event.metaKey || event.altKey || isTypingTarget(event.target)) return;

      if (key === "/") {
        event.preventDefault();
        handlers.current.onOpen();
        return;
      }

      if (pendingPrefix) {
        const destination = destinations.get(`${pendingPrefix} ${key}`);
        pendingPrefix = null;
        clearTimeout(prefixTimer);
        if (destination) {
          event.preventDefault();
          handlers.current.onNavigate(destination);
        }
        return;
      }
      if (key === "g") {
        pendingPrefix = key;
        prefixTimer = setTimeout(() => (pendingPrefix = null), SEQUENCE_TIMEOUT_MS);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(prefixTimer);
    };
  }, [enabled, registry]);
}
