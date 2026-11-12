import { EXPERIENCE } from "@/content/experience";
import { pick } from "@/content/localize";
import type { Locale, YearMonth } from "@/content/types";
import { getLocale, getTranslations } from "next-intl/server";
import { accent, SectionHeading } from "./section-heading";

const ordinal = (index: number) => String(index + 1).padStart(2, "0");

/** "ago 2024" / "Aug 2024": short month without the trailing dot pt-BR adds. */
function formatYearMonth(value: YearMonth, locale: Locale): string {
  const [year, month] = value.split("-").map(Number);
  const monthName = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, 1)))
    .replace(".", "");
  return `${monthName} ${year}`;
}

export async function ExperienceSection() {
  const [t, locale] = await Promise.all([getTranslations("experience"), getLocale() as Promise<Locale>]);

  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-6 pt-24 md:pt-section">
      <div className="mx-auto flex w-full max-w-page flex-col gap-16 px-6 lg:px-12">
        <SectionHeading id="experience-title" label={t("label")}>
          {t.rich("title", { accent })}
        </SectionHeading>

        <div className="flex flex-col border-b border-line">
          {EXPERIENCE.map((job, index) => {
            const titleId = `experience-${job.organization.toLowerCase()}`;
            const period = `${formatYearMonth(job.start, locale)} — ${job.end ? formatYearMonth(job.end, locale) : t("present")}`;
            return (
              <article
                key={job.organization}
                aria-labelledby={titleId}
                className="grid grid-cols-1 gap-x-20 gap-y-10 border-t border-line-strong pt-10 pb-12 sm:pt-14 sm:pb-16 min-[961px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
              >
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span aria-hidden="true" className="font-mono text-[32px] leading-none tracking-[-0.02em] text-muted sm:text-[40px]">
                      {ordinal(index)}
                    </span>
                    <span className="caps">{period}</span>
                    {job.end === null && (
                      <span className="caps inline-flex items-center gap-2 text-lavender before:size-2 before:flex-none before:bg-lavender">
                        {t("current")}
                      </span>
                    )}
                  </div>
                  <h3 id={titleId} className="display pt-2 text-[clamp(22px,6.8vw,26px)] [overflow-wrap:anywhere] md:text-[clamp(26px,2.75vw,40px)]">
                    {job.organization}
                  </h3>
                  <p className="text-[22px] leading-[1.3]">{pick(job.role, locale)}</p>
                  <p className="leading-[1.6] text-muted">{pick(job.summary, locale)}</p>
                  <ul aria-label={t("stackLabel")} className="mt-2 flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <li
                        key={tech}
                        className="inline-flex min-h-7 items-center rounded-full border border-line px-3 font-mono text-[11px] leading-none font-medium tracking-[0.1em] text-muted uppercase"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <ol
                  aria-label={t("deliverablesLabel", { organization: job.organization })}
                  className="grid grid-cols-1 content-start gap-7 sm:grid-cols-2 sm:gap-10 min-[961px]:pt-3"
                >
                  {job.deliverables.map((deliverable, deliverableIndex) => (
                    <li
                      key={deliverable.title.en}
                      className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-t border-line pt-5"
                    >
                      <span aria-hidden="true" className="font-mono text-[13px] leading-[1.6] font-medium text-lavender">
                        {ordinal(deliverableIndex)}
                      </span>
                      <span className="flex flex-col gap-1.5">
                        <span className="text-lg leading-[1.4] font-medium">{pick(deliverable.title, locale)}</span>
                        <span className="text-[15px] leading-[1.55] text-muted">{pick(deliverable.description, locale)}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
