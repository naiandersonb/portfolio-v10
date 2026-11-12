"use client";

import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import { createContext, type ReactNode, use, useCallback, useMemo, useState } from "react";
import { COMMANDS } from "@/content/commands";
import { profile } from "@/content/profile";
import { getResumeHref } from "@/content/resume-link";
import { TERMINAL_COPY } from "@/content/terminal-copy";
import { pick } from "@/content/localize";
import type { Locale } from "@/content/types";
import { usePathname, useRouter } from "@/i18n/navigation";
import { fill, line, type OutputLine, type TerminalEffect } from "./run-command";
import { useShortcuts } from "./use-shortcuts";

// The dialog code loads on first open, not with the page (plan: terminal off the critical path).
const Terminal = dynamic(() => import("./terminal").then((module) => module.Terminal), { ssr: false });

type TerminalControls = { open: () => void };

const TerminalContext = createContext<TerminalControls | null>(null);

export function useTerminal(): TerminalControls {
  const controls = use(TerminalContext);
  if (!controls) throw new Error("useTerminal must be used inside <TerminalRoot>");
  return controls;
}

function scrollToHash(hash: string) {
  const target = document.getElementById(hash.slice(1));
  window.history.replaceState(null, "", hash);
  target?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

function downloadFile(href: string) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = "";
  anchor.click();
}

/** Owns the terminal's open state, its global shortcuts and the side effects its commands ask for (FR-012). */
export function TerminalRoot({ children }: { children: ReactNode }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // Stays mounted after the first open, so history and output survive closing it.
  const [hasOpened, setHasOpened] = useState(false);

  const open = useCallback(() => {
    setHasOpened(true);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useShortcuts({ enabled: !isOpen, registry: COMMANDS, onOpen: open, onNavigate: scrollToHash });

  const performEffect = useCallback(
    async (effect: TerminalEffect): Promise<OutputLine | null> => {
      switch (effect.type) {
        case "navigate":
          setIsOpen(false);
          scrollToHash(effect.hash);
          return null;
        case "setLocale":
          router.replace(`${pathname}${window.location.hash}`, { locale: effect.locale });
          return null;
        case "copyEmail":
          try {
            await navigator.clipboard.writeText(profile.email);
            return line(fill(pick(TERMINAL_COPY.emailCopied, locale), { email: profile.email }), "accent");
          } catch {
            // Clipboard denied or unavailable: the address is still printed so it can be copied by hand.
            return line(fill(pick(TERMINAL_COPY.emailFailed, locale), { email: profile.email }), "muted");
          }
        case "downloadCv":
          downloadFile(getResumeHref(locale));
          return null;
        case "close":
          setIsOpen(false);
          return null;
        case "clear":
          return null;
      }
    },
    [locale, pathname, router],
  );

  const controls = useMemo(() => ({ open }), [open]);

  return (
    <TerminalContext value={controls}>
      {children}
      {hasOpened && <Terminal open={isOpen} onClose={close} performEffect={performEffect} />}
    </TerminalContext>
  );
}
