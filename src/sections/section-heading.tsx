import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  label: string;
  children: ReactNode;
};

/** "■ LABEL" over a Michroma h2; `id` names the section via aria-labelledby. */
export function SectionHeading({ id, label, children }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-8">
      <span className="section-label">{label}</span>
      <h2 id={id} className="display text-[clamp(24px,7vw,28px)] text-balance md:text-[clamp(28px,2.9vw,42px)]">
        {children}
      </h2>
    </div>
  );
}

/** Rich-text tag for the lavender word in section titles: `<accent>dura</accent>`. */
export const accent = (chunks: ReactNode) => <span className="text-lavender">{chunks}</span>;
