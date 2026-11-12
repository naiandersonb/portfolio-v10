"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { cn } from "@/components/class-names";
import { MENU_ITEMS, type MenuItem } from "./menu-items";

/** A section counts as current once its top passes this line, just under the header. */
const ACTIVE_LINE_PX = 120;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

function readActiveKey(): MenuItem["key"] {
  let active: MenuItem["key"] = MENU_ITEMS[0].key;
  for (const item of MENU_ITEMS) {
    const section = document.getElementById(item.hash.slice(1));
    if (section && section.getBoundingClientRect().top <= ACTIVE_LINE_PX) active = item.key;
  }
  return active;
}

function useActiveMenuKey(): MenuItem["key"] {
  return useSyncExternalStore(subscribeToScroll, readActiveKey, () => MENU_ITEMS[0].key);
}

function MenuLinks({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const t = useTranslations("menu");
  const activeKey = useActiveMenuKey();

  return (
    <ul className={className}>
      {MENU_ITEMS.map((item) => {
        const active = item.key === activeKey;
        return (
          <li key={item.key}>
            <a
              href={item.hash}
              onClick={onNavigate}
              aria-current={active ? "location" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center rounded-chip px-1 font-mono text-[13px] tracking-[0.12em] uppercase transition-colors",
                active ? "text-lavender underline underline-offset-8" : "text-muted hover:text-white",
              )}
            >
              {t(item.key)}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Section menu: inline links from lg up, a "Menu" disclosure below (FR-011, FR-021). */
export function CommandMenu() {
  const t = useTranslations("header");
  const panelId = useId();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [expanded]);

  return (
    <nav aria-label={t("menuLabel")} className="contents">
      <MenuLinks className="hidden items-center gap-8 lg:flex" />

      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((open) => !open)}
          className="inline-flex min-h-11 items-center gap-2.5 rounded-button px-2 font-mono text-[13px] tracking-[0.12em] text-white uppercase"
        >
          <span aria-hidden="true" className="flex w-4 flex-col gap-1">
            <span className="h-px bg-current" />
            <span className="h-px bg-current" />
          </span>
          {expanded ? t("closeMenu") : t("menuButton")}
        </button>
        <div
          id={panelId}
          hidden={!expanded}
          className="absolute inset-x-0 top-full z-20 border-b border-line bg-bg px-6 pt-2 pb-6"
        >
          <MenuLinks onNavigate={() => setExpanded(false)} className="flex flex-col gap-1" />
        </div>
      </div>
    </nav>
  );
}
