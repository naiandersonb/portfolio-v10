import { getTranslations } from "next-intl/server";
import { cacheLife } from "next/cache";

/** Read once and cached: the site is static, so the year is the one of the last build. */
async function getCopyrightYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const [t, year] = await Promise.all([getTranslations("footer"), getCopyrightYear()]);

  return (
    <footer className="mt-section">
      <div className="mx-auto w-full max-w-page px-6 lg:px-12">
        <p className="border-t border-line pt-6 pb-8 text-sm text-muted">
          © {year} {t("name")} · {t("role")}
        </p>
      </div>
    </footer>
  );
}
