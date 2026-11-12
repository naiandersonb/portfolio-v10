"use client";

import { cn } from "@/components/class-names";
import { useTranslations } from "next-intl";
import { MENU_ITEMS } from "./menu-items";
import { useActiveMenuKey } from "./use-active-section";

/** Inline section menu from lg up; below that, src/layout/mobile-menu.tsx takes over (FR-011, FR-021). */
export function CommandMenu() {
  const t = useTranslations("menu");
  const tHeader = useTranslations("header");
  const activeKey = useActiveMenuKey();

  return (
    <nav aria-label={tHeader("menuLabel")} className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {MENU_ITEMS.map((item) => {
          const active = item.key === activeKey;
          return (
            <li key={item.key}>
              <a
                href={item.hash}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-chip px-1 font-mono text-[13px] tracking-[0.12em] uppercase transition-colors",
                  active
                    ? "text-lavender underline underline-offset-8"
                    : "text-muted hover:text-white",
                )}
              >
                {t(item.key)}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
