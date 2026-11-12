import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Glyph } from "@/artwork/glyph";
import { pick } from "@/content/localize";
import { profile } from "@/content/profile";
import { getResumeHref } from "@/content/resume-link";
import { TypedTerminalLine } from "./typed-terminal-line";

export async function Hero() {
  const [t, locale] = await Promise.all([getTranslations("hero"), getLocale()]);
  const [firstName, ...lastNames] = profile.name.split(" ");

  return (
    <section aria-label={t("label")}>
      <div className="mx-auto flex w-full max-w-page flex-wrap items-stretch gap-8 px-6 pt-6 md:gap-16 md:pt-10 lg:px-12">
        <div className="relative h-56 min-w-0 shrink grow basis-full overflow-hidden rounded-media bg-card sm:h-[420px] lg:h-[620px] lg:basis-[560px] lg:grow-[7]">
          <Image
            src={profile.heroImage.src}
            alt={pick(profile.heroImage.alt, locale)}
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-[30%_45%]"
          />
        </div>

        <div className="flex min-w-0 shrink grow basis-full flex-col justify-center gap-6 py-4 md:gap-8 lg:basis-[380px] lg:grow-[5]">
          <TypedTerminalLine command={profile.promptCommand} className="font-mono text-[13px] leading-normal text-muted" />

          <h1 className="display text-[clamp(24px,7.6vw,30px)] md:text-[clamp(30px,2.95vw,42px)]">
            <span className="block">{firstName}</span>
            <span className="block">{lastNames.join(" ")}</span>
          </h1>

          <ul className="tick-list text-[17px] leading-normal">
            <li>{pick(profile.role, locale)}</li>
            <li>{pick(profile.location, locale)}</li>
          </ul>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
            <a href="#contact" className="btn btn-solid">
              {t("contactCta")}
              <Glyph id="arrow" size={16} decorative />
            </a>
            <a href={getResumeHref(locale)} download className="btn btn-outline">
              {t("downloadCv")}
              <Glyph id="download" size={16} decorative />
            </a>
          </div>

          <ul aria-label={t("statsLabel")} className="flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-6">
            {profile.stats.map((stat) => (
              <li key={stat.value} className="flex flex-col gap-1.5">
                <span className="font-display text-2xl leading-none md:text-[32px]">{stat.value}</span>
                <span className="text-sm whitespace-nowrap text-muted">{pick(stat.label, locale)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
