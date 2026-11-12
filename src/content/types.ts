import type { GlyphId } from "@/artwork/catalog";
import type { AppLocale } from "@/i18n/routing";

export type Locale = AppLocale;

/** Both keys are required; an empty value is a draft and falls back to the other locale (FR-017c). */
export type Localized<T> = { "pt-BR": T; en: T };

/** Absolute https URL or mailto link. */
export type Url = `https://${string}` | `mailto:${string}`;

/** Year and month, e.g. "2024-03". */
export type YearMonth = `${number}-${number}`;

export type HeroStat = {
  value: string;
  label: Localized<string>;
};

export type Profile = {
  name: string;
  fullName: string;
  role: Localized<string>;
  location: Localized<string>;
  tagline: Localized<string>;
  headlines: Localized<string[]>;
  bio: Localized<string>;
  stack: string[];
  email: string;
  /** Path of the CV PDF per locale; null uses the other locale's file (FR-010a). */
  resumePath: Localized<string | null>;
  heroImage: { src: string; alt: Localized<string> };
  /** Real figures only; no projects count while US3 is deferred. */
  stats: HeroStat[];
};

/** One area in "O que eu faço". */
export type Service = {
  key: string;
  title: Localized<string>;
  summary: Localized<string>;
  items: Localized<string[]>;
};

export type Deliverable = {
  title: Localized<string>;
  description: Localized<string>;
};

export type Experience = {
  role: Localized<string>;
  organization: string;
  start: YearMonth;
  /** null = current job. */
  end: YearMonth | null;
  summary: Localized<string>;
  stack: string[];
  deliverables: Deliverable[];
};

export type Education = {
  course: Localized<string>;
  school: string;
  hours: number;
  year: number;
  /** Tie-breaker when two courses share a year. */
  completedOn?: YearMonth;
};

export type SocialLink = {
  network: string;
  url: Url;
  icon: GlyphId;
  label: Localized<string>;
};

export type TerminalAction =
  | { kind: "navigate"; path: string }
  | { kind: "setLocale" }
  | { kind: "copyEmail" }
  | { kind: "downloadCv" }
  | { kind: "print"; lines: Localized<string[]> }
  | { kind: "effect"; id: string }
  | { kind: "help" }
  | { kind: "clear" }
  | { kind: "close" };

export type TerminalCommand = {
  /** English, lowercase, unique, one token. */
  name: string;
  aliases?: string[];
  /** Key sequence such as "g a". */
  shortcut?: string;
  description: Localized<string>;
  action: TerminalAction;
  /** Easter egg: left out of `help` and of the menu invariant (FR-012f). */
  hidden: boolean;
};
