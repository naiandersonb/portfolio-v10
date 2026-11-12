import { pick } from "@/content/localize";
import { SERVICES } from "@/content/services";
import type { Locale } from "@/content/types";
import { getLocale, getTranslations } from "next-intl/server";
import { accent, SectionHeading } from "./section-heading";

const ordinal = (index: number) => String(index + 1).padStart(2, "0");

export async function ServicesSection() {
  const [t, locale] = await Promise.all([getTranslations("services"), getLocale() as Promise<Locale>]);

  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-6 pt-24 md:pt-section">
      <div className="mx-auto flex w-full max-w-page flex-col gap-16 px-6 lg:px-12">
        <SectionHeading id="services-title" label={t("label")}>
          {t.rich("title", { accent })}
        </SectionHeading>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-x-16 gap-y-12">
          {SERVICES.map((service, index) => (
            <article key={service.key} className="flex flex-col gap-4">
              <span aria-hidden="true" className="font-mono text-[13px] text-muted">
                {ordinal(index)}
              </span>
              <h3 className="display text-xl leading-tight">{pick(service.title, locale)}</h3>
              <p className="leading-[1.6] text-muted">{pick(service.summary, locale)}</p>
              <span className="caps pt-2">{t("includes")}</span>
              <ul className="flex flex-col gap-1.5 text-[15px] leading-normal text-muted">
                {pick(service.items, locale).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
