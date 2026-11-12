"use client";

import TypewriterTitle from "@/components/kokonutui/type-writer";

type TypedTerminalLineProps = {
  command: string;
  className?: string;
};

/**
 * "~ $ <command>" typed once, like a shell prompt. The component already renders the full
 * text for screen readers and shows it at once under prefers-reduced-motion (FR-019).
 */
export function TypedTerminalLine({ command, className }: TypedTerminalLineProps) {
  return (
    <p className={className}>
      <span className="text-lavender" aria-hidden="true">
        ~ ${" "}
      </span>
      <TypewriterTitle
        as="span"
        sequences={[{ text: command }]}
        autoLoop={false}
        typingSpeed={90}
        startDelay={400}
        typos
      />
    </p>
  );
}
