import { profile } from "./profile";
import type { Locale } from "./types";

/** CV for the active locale, or the other locale's file until a translation exists (FR-010a). */
export function getResumeHref(locale: Locale): string {
  const otherLocale: Locale = locale === "pt-BR" ? "en" : "pt-BR";
  const href = profile.resumePath[locale] ?? profile.resumePath[otherLocale];
  if (!href) throw new Error("profile.resumePath has no CV for either locale");
  return href;
}
