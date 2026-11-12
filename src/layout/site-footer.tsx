import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

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
