import type { Localized } from "./types";

/** Terminal output text. `{x}` placeholders are filled by the executor. */
export const TERMINAL_COPY = {
  welcome: {
    "pt-BR": "Bem-vindo ao terminal do naianderson. Digite help para ver os comandos.",
    en: "Welcome to naianderson's terminal. Type help to see the commands.",
  },
  helpTitle: { "pt-BR": "comandos:", en: "commands:" },
  secretHint: { "pt-BR": "psst… existem comandos secretos.", en: "psst… there are hidden commands." },
  notFound: {
    "pt-BR": "comando não encontrado: {command} — digite help",
    en: "command not found: {command} — type help",
  },
  navigated: { "pt-BR": "→ {destination}", en: "→ {destination}" },
  destinations: {
    "#top": { "pt-BR": "início", en: "home" },
    "#about": { "pt-BR": "sobre", en: "about" },
    "#contact": { "pt-BR": "contato", en: "contact" },
  } as Record<string, Localized<string>>,
  emailCopied: { "pt-BR": "✓ email copiado: {email}", en: "✓ email copied: {email}" },
  emailFailed: {
    "pt-BR": "✗ não foi possível copiar — email: {email}",
    en: "✗ couldn't copy — email: {email}",
  },
  cvDownloading: { "pt-BR": "↓ baixando {file}", en: "↓ downloading {file}" },
  cvFallbackNote: { "pt-BR": " (versão em inglês em breve)", en: " (English version coming soon)" },
  langCurrent: {
    "pt-BR": "idioma atual: pt-BR · use lang en",
    en: "current language: en · use lang pt",
  },
  langUsage: { "pt-BR": "uso: lang pt | en", en: "usage: lang pt | en" },
  langSet: { "pt-BR": "✓ idioma: {locale}", en: "✓ language: {locale}" },
  hireMe: {
    "pt-BR": [
      "[sudo] senha para recrutador: ********",
      "✓ permissão concedida. ótima escolha.",
      "  → email   copiar meu e-mail",
      "  → cv      baixar meu currículo",
    ],
    en: [
      "[sudo] password for recruiter: ********",
      "✓ permission granted. great choice.",
      "  → email   copy my email",
      "  → cv      download my resume",
    ],
  },
  niceTry: { "pt-BR": "nice try ;)", en: "nice try ;)" },
  neofetch: {
    "pt-BR": [
      ["user", "naianderson"],
      ["role", "Desenvolvedor"],
      ["local", "Caxias, MA · remoto"],
      ["stack", "TypeScript, React, Next.js"],
      ["uptime", "4+ anos em produção"],
      ["idiomas", "pt-BR, en"],
    ],
    en: [
      ["user", "naianderson"],
      ["role", "Developer"],
      ["location", "Caxias, MA, Brazil · remote"],
      ["stack", "TypeScript, React, Next.js"],
      ["uptime", "4+ years in production"],
      ["languages", "pt-BR, en"],
    ],
  } as Localized<[string, string][]>,
  matrixRain: ["0110 ｱ 1001 ｶ 0101 ﾅ 1100", "ﾀ 0011 ﾋ 1010 ﾑ 0110 ｲ 01", "1001 ﾅ 0101 ｴ 1101 ﾝ 0010"],
  matrixPhrase: { "pt-BR": "acorda, recrutador…", en: "wake up, recruiter…" },
} satisfies Record<string, unknown>;
