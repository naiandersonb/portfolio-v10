"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { cn } from "@/components/class-names";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALE_LABELS, routing } from "@/i18n/routing";

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/** The switch keeps the reader where they are: same page, same section (FR-017). */
function useLocationHash(): string {
  return useSyncExternalStore(subscribeToHash, () => window.location.hash, () => "");
}

export function LanguageSwitcher() {
  const t = useTranslations("header");
  const activeLocale = useLocale();
  const pathname = usePathname();
  const hash = useLocationHash();

  return (
    <ul aria-label={t("languageSwitcher")} className="flex items-center font-mono text-[13px] tracking-[0.12em]">
      {routing.locales.map((locale) => {
        const active = locale === activeLocale;
        return (
          <li key={locale} className="flex items-center not-first:before:text-line-strong not-first:before:content-['/']">
            <Link
              href={`${pathname}${hash}`}
              locale={locale}
              hrefLang={locale}
              lang={locale}
              aria-current={active ? "true" : undefined}
              className={cn(
                "inline-flex min-h-11 min-w-11 items-center justify-center rounded-chip transition-colors",
                active ? "text-lavender" : "text-muted hover:text-white",
              )}
            >
              {LOCALE_LABELS[locale]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
