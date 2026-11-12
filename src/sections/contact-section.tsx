import { Glyph } from "@/artwork/glyph";
import { pick } from "@/content/localize";
import { profile } from "@/content/profile";
import { SOCIAL_LINKS } from "@/content/social-links";
import type { Locale } from "@/content/types";
import { getLocale, getTranslations } from "next-intl/server";
import { CopyEmailButton } from "./copy-email-button";
import { accent } from "./section-heading";

/** Profiles open in a new tab; the e-mail has its own copy row above them. */
const PROFILE_LINKS = SOCIAL_LINKS.filter((link) => link.url.startsWith("https://"));

export async function ContactSection() {
  const [t, locale] = await Promise.all([getTranslations("contact"), getLocale() as Promise<Locale>]);

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-6 pt-24 md:pt-section">
      <div className="mx-auto w-full max-w-page px-6 lg:px-12">
        <div className="flex flex-col gap-10 border-t border-line pt-16 md:pt-24">
          <span className="section-label">{t("label")}</span>
          <h2
            id="contact-title"
            className="display max-w-[1000px] text-[clamp(24px,7vw,28px)] text-balance md:text-[clamp(28px,3.6vw,52px)]"
          >
            {t.rich("title", { accent })}
          </h2>

          <div className="flex flex-wrap items-start gap-x-10 gap-y-4">
            <CopyEmailButton email={profile.email} />
            <ul aria-label={t("linksLabel")} className="flex flex-wrap gap-x-10 gap-y-2">
              {PROFILE_LINKS.map((link) => (
                <li key={link.network}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${pick(link.label, locale)} (${t("newTab")})`}
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-button font-medium transition-colors hover:text-lavender"
                  >
                    <Glyph id={link.icon} size={18} decorative />
                    {link.display}
                    <Glyph id="external" size={14} decorative className="text-muted" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
