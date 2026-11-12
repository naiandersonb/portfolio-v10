import { EDUCATION } from "@/content/education";
import { pick } from "@/content/localize";
import type { Locale } from "@/content/types";
import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "./section-heading";

export async function EducationSection() {
  const [t, locale] = await Promise.all([getTranslations("education"), getLocale() as Promise<Locale>]);

  return (
    <section id="education" aria-labelledby="education-title" className="scroll-mt-6 pt-24 md:pt-section">
      <div className="mx-auto flex w-full max-w-page flex-wrap gap-x-24 gap-y-12 px-6 lg:px-12">
        <div className="min-w-0 flex-[1_1_400px]">
          <SectionHeading id="education-title" label={t("label")}>
            {t("title")}
          </SectionHeading>
        </div>

        <ul className="min-w-0 flex-[1.4_1_520px]">
          {EDUCATION.map((course) => (
            <li
              key={course.course.en}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 border-t border-line py-5"
            >
              <span className="flex flex-col gap-1">
                <span className="text-[17px] leading-[1.3] font-medium">{pick(course.course, locale)}</span>
                <span className="font-mono text-[12px] leading-normal text-muted">
                  {[course.school, `${course.hours}h`, course.topics?.join(", ")].filter(Boolean).join(" · ")}
                </span>
              </span>
              <span className="font-mono text-[13px] text-muted">{course.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
