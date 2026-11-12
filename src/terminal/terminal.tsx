"use client";

import { useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { type FormEvent, type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { Glyph } from "@/artwork/glyph";
import { LogoMark } from "@/artwork/logo-mark";
import { cn } from "@/components/class-names";
import { COMMANDS } from "@/content/commands";
import { pick } from "@/content/localize";
import { profile } from "@/content/profile";
import { getResumeHref } from "@/content/resume-link";
import { TERMINAL_COPY } from "@/content/terminal-copy";
import type { Locale } from "@/content/types";
import { completeCommand } from "./parse-command";
import { line, type OutputLine, runCommand, type TerminalEffect, type Tone } from "./run-command";

type TerminalProps = {
  open: boolean;
  onClose: () => void;
  performEffect: (effect: TerminalEffect) => Promise<OutputLine | null>;
};

const TONE_CLASS: Record<Tone, string> = { text: "text-white", muted: "text-muted", accent: "text-lavender" };
const SWATCHES = ["bg-bg", "bg-card", "bg-muted", "bg-lavender", "bg-purple", "bg-violet", "bg-white"];

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-[4px] border border-line-strong px-1.5 font-mono text-[12px] leading-none text-white">
      {children}
    </kbd>
  );
}

function NeofetchBlock({ rows }: { rows: [string, string][] }) {
  return (
    <div className="my-2 flex flex-wrap items-start gap-6">
      <LogoMark size={96} />
      <div className="flex flex-col">
        {rows.map(([key, value]) => (
          <p key={key}>
            <span className="text-lavender">{key}</span>
            <span className="text-muted">: </span>
            {value}
          </p>
        ))}
        <span aria-hidden="true" className="mt-2 flex gap-1">
          {SWATCHES.map((swatch) => (
            <span key={swatch} className={cn("size-4 border border-line", swatch)} />
          ))}
        </span>
      </div>
    </div>
  );
}

function OutputRow({ entry }: { entry: OutputLine }) {
  if (entry.kind === "neofetch") return <NeofetchBlock rows={entry.rows} />;
  return (
    <p className="min-h-[1.6em] break-words whitespace-pre-wrap">
      {entry.segments.map((segment, index) => (
        <span key={index} className={TONE_CLASS[segment.tone]}>
          {segment.text}
        </span>
      ))}
    </p>
  );
}

function resumeFile(locale: Locale) {
  const href = getResumeHref(locale);
  return { fileName: href.split("/").pop() ?? href, isFallback: profile.resumePath[locale] === null };
}

/** Full-screen command dialog (FR-012, R4): native <dialog> gives the focus trap, Escape and focus return. */
export function Terminal({ open, onClose, performEffect }: TerminalProps) {
  const t = useTranslations("terminal");
  const locale = useLocale() as Locale;
  const reducedMotion = useReducedMotion() ?? false;
  const inputId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [lines, setLines] = useState<OutputLine[]>(() => [line(pick(TERMINAL_COPY.welcome, locale), "muted")]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // On phones the on-screen keyboard shrinks the visual viewport, not the layout one: follow it so the input stays visible.
  useEffect(() => {
    const viewport = window.visualViewport;
    const dialog = dialogRef.current;
    if (!open || !viewport || !dialog) return;
    const fitToViewport = () => {
      dialog.style.height = `${viewport.height}px`;
    };
    fitToViewport();
    viewport.addEventListener("resize", fitToViewport);
    return () => {
      viewport.removeEventListener("resize", fitToViewport);
      dialog.style.height = "";
    };
  }, [open]);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [lines]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const input = value;
    setValue("");
    setHistoryIndex(null);
    if (input.trim()) setHistory((entries) => [...entries, input.trim()]);

    const result = runCommand(input, { locale, registry: COMMANDS, reducedMotion, cv: resumeFile(locale) });
    setLines((current) => [...current, ...result.lines]);

    for (const effect of result.effects) {
      if (effect.type === "clear") {
        setLines([]);
        continue;
      }
      const reply = await performEffect(effect);
      if (reply) setLines((current) => [...current, reply]);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab") {
      if (value.trim().includes(" ")) return;
      event.preventDefault();
      const completion = completeCommand(value, COMMANDS);
      if (completion) setValue(`${completion} `);
      return;
    }
    if (event.key === "ArrowUp" && history.length > 0) {
      event.preventDefault();
      const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setValue(history[index]);
      return;
    }
    if (event.key === "ArrowDown" && historyIndex !== null) {
      event.preventDefault();
      const index = historyIndex + 1;
      setHistoryIndex(index < history.length ? index : null);
      setValue(index < history.length ? history[index] : "");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={t("dialogLabel")}
      onClose={onClose}
      className="m-0 h-dvh max-h-none w-full max-w-none flex-col bg-bg p-0 text-white backdrop:bg-bg open:flex"
    >
      <header className="flex min-h-20 shrink-0 items-center gap-4 border-b border-line px-6 lg:px-12">
        <Glyph id="terminal" size={24} decorative className="text-lavender" />
        <h2 className="display text-[14px]">{t("title")}</h2>
        <span className="hidden font-mono text-[13px] text-muted sm:inline">{t("path")}</span>
        <span className="ml-auto hidden sm:inline-flex">
          <Kbd>ESC</Kbd>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="ml-auto inline-flex size-11 items-center justify-center rounded-button border border-line-strong text-white transition-colors hover:border-white sm:ml-0"
        >
          <Glyph id="close" size={20} decorative />
        </button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-6 lg:px-12">
        <div
          ref={outputRef}
          aria-live="polite"
          className="mx-auto w-full max-w-[960px] flex-1 overflow-y-auto py-6 font-mono text-[15px] leading-[1.6]"
        >
          {lines.map((entry, index) => (
            <OutputRow key={index} entry={entry} />
          ))}
        </div>

        <form onSubmit={submit} className="mx-auto w-full max-w-[960px] shrink-0 pb-4">
          <label
            htmlFor={inputId}
            className="flex min-h-14 items-center gap-3 rounded-button border border-line-control px-4 font-mono text-[15px] focus-within:border-white"
          >
            <span className="sr-only">{t("inputLabel")}</span>
            <span aria-hidden="true" className="text-lavender">
              ~ $
            </span>
            <input
              ref={inputRef}
              id={inputId}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("placeholder")}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
              className="min-w-0 flex-1 bg-transparent text-white placeholder:text-muted focus:outline-none"
            />
          </label>
        </form>
      </div>

      <footer
        aria-label={t("hintsLabel")}
        className="hidden shrink-0 flex-wrap items-center gap-x-6 gap-y-2 border-t border-line px-6 py-4 font-mono text-[12px] text-muted md:flex lg:px-12"
      >
        <span className="flex items-center gap-2">
          <Kbd>ENTER</Kbd> {t("run")}
        </span>
        <span className="flex items-center gap-2">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd> {t("history")}
        </span>
        <span className="flex items-center gap-2">
          <Kbd>TAB</Kbd> {t("complete")}
        </span>
        <span className="flex items-center gap-2">
          <Kbd>ESC</Kbd> {t("closeHint")}
        </span>
        <span className="ml-auto flex items-center gap-2">
          <Kbd>Ctrl/⌘ K</Kbd>/<Kbd>/</Kbd> {t("openHint")}
        </span>
        <span className="flex items-center gap-2">
          <Kbd>g h</Kbd>
          <Kbd>g a</Kbd>
          <Kbd>g c</Kbd>
        </span>
      </footer>
    </dialog>
  );
}
