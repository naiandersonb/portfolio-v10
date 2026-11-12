import { GLYPH_PATHS, type GlyphId } from "./catalog";

type GlyphProps = {
  id: GlyphId;
  size?: number;
  className?: string;
} & (
  | { decorative: true; title?: never }
  /** Informative glyphs need a label for screen readers (FR-020). */
  | { decorative?: false; title: string }
);

export function Glyph({ id, size = 24, className, ...labelling }: GlyphProps) {
  const accessibility = labelling.decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": labelling.title } as const);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      className={className}
      {...accessibility}
    >
      <path d={GLYPH_PATHS[id]} />
    </svg>
  );
}
