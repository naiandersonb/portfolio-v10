"use client";

import { Glyph } from "@/artwork/glyph";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useTranslations } from "next-intl";

/** E-mail always visible and selectable, a copy button and a terminal-style status line (FR-016). */
export function CopyEmailButton({ email }: { email: string }) {
  const t = useTranslations("contact");
  const { status, copyToClipboard } = useCopyToClipboard();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-mono text-base break-all select-all">{email}</span>
        <button
          type="button"
          onClick={() => copyToClipboard(email)}
          aria-label={t("copyLabel")}
          className="btn btn-solid min-h-11 px-4"
        >
          {t("copy")}
          <Glyph id="copy" size={16} decorative />
        </button>
      </div>
      <p role="status" className="min-h-5 font-mono text-[13px] leading-5">
        {status === "copied" && <span className="text-lavender">{t("copied")}</span>}
        {status === "failed" && <span className="text-muted">{t("copyFailed")}</span>}
      </p>
    </div>
  );
}
