import { getTranslations } from "next-intl/server";
import { LogoMark } from "@/artwork/logo-mark";
import { Link } from "@/i18n/navigation";

export async function Logo() {
  const t = await getTranslations("header");

  return (
    <Link
      href="/"
      aria-label={t("logoLabel")}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-button"
    >
      <LogoMark size={36} />
    </Link>
  );
}
