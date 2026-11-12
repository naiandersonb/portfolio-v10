import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as readLocaleParam } from "next/root-params";
import { withFallbackMessages } from "./message-fallback";
import { routing, type AppLocale } from "./routing";

async function loadMessages(locale: AppLocale) {
  return (await import(`../messages/${locale}.json`)).default;
}

export default getRequestConfig(async ({ locale: explicitLocale }) => {
  const requestedLocale = explicitLocale ?? (await readLocaleParam());
  const locale = hasLocale(routing.locales, requestedLocale) ? requestedLocale : routing.defaultLocale;
  const otherLocale = routing.locales.find((candidate) => candidate !== locale) ?? locale;

  const [messages, fallbackMessages] = await Promise.all([loadMessages(locale), loadMessages(otherLocale)]);

  return {
    locale,
    messages: withFallbackMessages(messages, fallbackMessages),
  };
});
