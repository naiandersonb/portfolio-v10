import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt-BR", "en"],
  // English is the default so that any non-Portuguese browser lands on /en (FR-017a).
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
});

export type AppLocale = (typeof routing.locales)[number];

export const LOCALE_LABELS: Record<AppLocale, string> = {
  "pt-BR": "PT",
  en: "EN",
};
