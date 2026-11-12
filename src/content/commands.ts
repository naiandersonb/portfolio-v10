import type { TerminalCommand } from "./types";

/** Declarative registry from contracts/terminal-commands.md. Every name and alias is a single token. */
export const COMMANDS: TerminalCommand[] = [
  {
    name: "help",
    aliases: ["ajuda", "?"],
    description: { "pt-BR": "lista os comandos", en: "list the commands" },
    action: { kind: "help" },
    hidden: false,
  },
  {
    name: "home",
    aliases: ["inicio", "~"],
    shortcut: "g h",
    description: { "pt-BR": "vai para o início", en: "go to the top" },
    action: { kind: "navigate", path: "#top" },
    hidden: false,
  },
  {
    name: "about",
    aliases: ["sobre", "whoami"],
    shortcut: "g a",
    description: { "pt-BR": "sobre mim", en: "about me" },
    action: { kind: "navigate", path: "#about" },
    hidden: false,
  },
  {
    name: "contact",
    aliases: ["contato"],
    shortcut: "g c",
    description: { "pt-BR": "formas de contato", en: "ways to reach me" },
    action: { kind: "navigate", path: "#contact" },
    hidden: false,
  },
  {
    name: "email",
    description: { "pt-BR": "copia o e-mail", en: "copy the email" },
    action: { kind: "copyEmail" },
    hidden: false,
  },
  {
    name: "cv",
    aliases: ["resume", "curriculo"],
    description: { "pt-BR": "baixa o currículo", en: "download the resume" },
    action: { kind: "downloadCv" },
    hidden: false,
  },
  {
    name: "lang",
    aliases: ["idioma"],
    description: { "pt-BR": "troca o idioma: pt | en", en: "switch language: pt | en" },
    action: { kind: "setLocale" },
    hidden: false,
  },
  {
    name: "clear",
    aliases: ["limpar"],
    description: { "pt-BR": "limpa a tela", en: "clear the screen" },
    action: { kind: "clear" },
    hidden: false,
  },
  {
    name: "exit",
    aliases: ["sair"],
    description: { "pt-BR": "fecha o terminal", en: "close the terminal" },
    action: { kind: "close" },
    hidden: false,
  },
  {
    name: "sudo",
    description: { "pt-BR": "", en: "" },
    action: { kind: "effect", id: "sudo" },
    hidden: true,
  },
  {
    name: "neofetch",
    description: { "pt-BR": "", en: "" },
    action: { kind: "effect", id: "neofetch" },
    hidden: true,
  },
  {
    name: "coffee",
    description: { "pt-BR": "", en: "" },
    action: {
      kind: "print",
      lines: {
        "pt-BR": ["   ( (", "    ) )", "  ._____.", "  |     |]", "  \\     /", "   `---'", "café passado. produtividade +10."],
        en: ["   ( (", "    ) )", "  ._____.", "  |     |]", "  \\     /", "   `---'", "fresh coffee. productivity +10."],
      },
    },
    hidden: true,
  },
  {
    name: "matrix",
    description: { "pt-BR": "", en: "" },
    action: { kind: "effect", id: "matrix" },
    hidden: true,
  },
];
