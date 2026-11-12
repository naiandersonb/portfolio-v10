import { useId } from "react";
import { LOGO } from "./catalog";

type LogoMarkProps = {
  size?: number;
  className?: string;
};

/** The bolt logo as an inline SVG. Decorative: the link around it carries the accessible name. */
export function LogoMark({ size = 40, className }: LogoMarkProps) {
  // Unique per instance, so two logos on one page never share a clipPath id.
  const clipId = `logo-clip-${useId()}`;
  const { square, bolt, gouges } = LOGO;

  return (
    <svg width={size} height={size} viewBox={LOGO.viewBox} aria-hidden="true" focusable="false" className={className}>
      <defs>
        <clipPath id={clipId}>
          <path d={bolt.d} />
        </clipPath>
      </defs>
      <rect x={square.x} y={square.y} width={square.size} height={square.size} rx={square.radius} fill={square.fill} />
      <path d={bolt.d} fill={bolt.fill} />
      <g clipPath={`url(#${clipId})`} stroke={gouges.stroke} strokeWidth={gouges.strokeWidth}>
        <path d={gouges.d} />
      </g>
    </svg>
  );
}
