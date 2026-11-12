"use client";

import { Glyph } from "@/artwork/glyph";
import CommandButton from "@/components/kokonutui/command-button";
import { useTerminal } from "@/terminal/terminal-root";
import { useTranslations } from "next-intl";

/** `>_` entry point to the terminal; the keycaps show the shortcut from md up (FR-012a). */
export function TerminalButton() {
  const t = useTranslations("header");
  const { open } = useTerminal();

  return (
    <CommandButton
      shortcut="mod+k"
      onClick={open}
      aria-label={t("openTerminal")}
      aria-haspopup="dialog"
      className="min-w-11 justify-center px-2.5 md:px-3"
      keycapsClassName="hidden md:flex"
    >
      <Glyph id="terminal" size={20} decorative className="text-lavender" />
    </CommandButton>
  );
}
