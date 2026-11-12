"use client";

/**
 * @author: @dorianbaffier
 * @description: Command Button
 * @version: 2.0.0
 * @date: 2026-10-16
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 *
 * Adapted for this portfolio: restyled to the EDT tokens, the platform is read with
 * useSyncExternalStore instead of state set in an effect, and the page-wide listener
 * is dropped because src/terminal/use-shortcuts.ts owns every shortcut (FR-012a).
 */

import { type ComponentProps, type ReactNode, useSyncExternalStore } from "react";
import { cn } from "@/components/class-names";

type Modifier = "mod" | "ctrl" | "alt" | "shift";

interface CommandButtonProps extends ComponentProps<"button"> {
  children?: ReactNode;
  /** `+`-joined parts: `mod` (⌘ on Mac, Ctrl elsewhere), `ctrl`, `alt`, `shift` and one key. */
  shortcut?: string;
  /** Classes for the keycap group, e.g. to hide it on small screens. */
  keycapsClassName?: string;
}

const APPLE_PLATFORM = /mac|iphone|ipad|ipod/i;
const MODIFIERS = new Set<Modifier>(["mod", "ctrl", "alt", "shift"]);

const MAC_LABELS: Record<Modifier, string> = { mod: "⌘", ctrl: "⌃", alt: "⌥", shift: "⇧" };
const PC_LABELS: Record<Modifier, string> = { mod: "Ctrl", ctrl: "Ctrl", alt: "Alt", shift: "Shift" };
// aria-keyshortcuts takes KeyboardEvent.key names: Meta, not Command.
const ARIA_KEYS: Record<Modifier, [mac: string, pc: string]> = {
  mod: ["Meta", "Control"],
  ctrl: ["Control", "Control"],
  alt: ["Alt", "Alt"],
  shift: ["Shift", "Shift"],
};

function parseShortcut(shortcut: string) {
  const parts = shortcut
    .toLowerCase()
    .split("+")
    .map((part) => part.trim())
    .filter(Boolean);
  const modifiers = parts.filter((part): part is Modifier => MODIFIERS.has(part as Modifier));
  const key = parts.find((part) => !MODIFIERS.has(part as Modifier)) ?? "k";
  return { modifiers, key };
}

const keyLabel = (key: string) => (key.length === 1 ? key.toUpperCase() : key);

const subscribeToNothing = () => () => {};

function readIsMac(): boolean {
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ?? navigator.platform;
  return APPLE_PLATFORM.test(platform);
}

/** null on the server: the caps stay invisible until the platform is known, so ⌘ never swaps for Ctrl in view. */
function useIsMac(): boolean | null {
  return useSyncExternalStore(subscribeToNothing, readIsMac, () => null);
}

function Keycap({ label }: { label: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex h-6 min-w-6 items-center justify-center rounded-[4px] px-1.5 font-mono text-[12px] leading-none",
        "border border-line-strong bg-bg text-muted shadow-[0_2px_0_0_var(--line)]",
        "transition-[translate,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "group-active/command:translate-y-0.5 group-active/command:shadow-none motion-reduce:transition-none",
      )}
    >
      {label}
    </kbd>
  );
}

export default function CommandButton({
  className,
  keycapsClassName,
  children,
  shortcut = "mod+k",
  ...props
}: CommandButtonProps) {
  const isMac = useIsMac();
  const { modifiers, key } = parseShortcut(shortcut);
  const labels = isMac === false ? PC_LABELS : MAC_LABELS;
  const keyshortcuts = [...modifiers.map((m) => ARIA_KEYS[m][isMac === false ? 1 : 0]), key.toUpperCase()].join("+");

  return (
    <button
      aria-keyshortcuts={keyshortcuts}
      className={cn(
        "group/command inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-button border border-line-strong px-3 font-mono text-[13px] text-white",
        "transition-colors duration-150 ease-out hover:border-white",
        className,
      )}
      type="button"
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "flex items-center gap-1 pb-0.5 transition-opacity duration-150",
          isMac === null && "opacity-0",
          keycapsClassName,
        )}
      >
        {modifiers.map((modifier) => (
          <Keycap key={modifier} label={labels[modifier]} />
        ))}
        <Keycap label={keyLabel(key)} />
      </span>
    </button>
  );
}
