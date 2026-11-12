import { Glyph } from "@/artwork/glyph";
import { pick } from "@/content/localize";
import { profile } from "@/content/profile";
import { SOCIAL_LINKS } from "@/content/social-links";
import type { Locale } from "@/content/types";
import { getLocale, getTranslations } from "next-intl/server";
import { accent, SectionHeading } from "./section-heading";

export async function AboutSection() {
  const [t, locale] = await Promise.all([getTranslations("about"), getLocale() as Promise<Locale>]);

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-6 pt-24 md:pt-section">
      <div className="mx-auto flex w-full max-w-page flex-wrap gap-x-24 gap-y-12 px-6 lg:px-12">
        <div className="min-w-0 flex-[1_1_480px]">
          <SectionHeading id="about-title" label={t("label")}>
            {t.rich("title", { accent })}
          </SectionHeading>
        </div>

        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-7 md:pt-11">
          <p className="text-xl leading-[1.6] font-light">{pick(profile.bio, locale)}</p>
          <p className="font-mono text-[13px] leading-normal text-muted">
            <span className="caps text-white">{t("stack")}</span> · {profile.stack.join(" · ")}
          </p>
          <ul aria-label={t("socialLabel")} className="-ml-2.5 flex flex-wrap gap-1">
            {SOCIAL_LINKS.map((link) => {
              const external = link.url.startsWith("https://");
              return (
                <li key={link.network}>
                  <a
                    href={link.url}
                    aria-label={pick(link.label, locale)}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="inline-flex size-11 items-center justify-center rounded-button text-white transition-colors hover:bg-white/5"
                  >
                    <Glyph id={link.icon} size={20} decorative />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
