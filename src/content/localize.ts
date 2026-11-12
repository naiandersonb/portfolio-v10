import type { Locale, Localized } from "./types";

function isEmpty(value: unknown): boolean {
  return value === "" || (Array.isArray(value) && value.length === 0);
}

/** Returns the value for `locale`, or the other locale's value when that one is still empty (FR-017c). */
export function pick<T>(localized: Localized<T>, locale: Locale): T {
  const value = localized[locale];
  if (!isEmpty(value)) return value;
  const otherLocale: Locale = locale === "pt-BR" ? "en" : "pt-BR";
  return localized[otherLocale];
}
