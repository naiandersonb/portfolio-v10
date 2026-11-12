import heroImage from "@/assets/hero-developer.webp";
import type { Profile } from "./types";

export const profile: Profile = {
  name: "Naianderson Bruno",
  fullName: "Naianderson Bruno França da Silva",
  role: {
    "pt-BR": "Desenvolvedor · React, Next.js e TypeScript",
    en: "Developer · React, Next.js and TypeScript",
  },
  location: {
    "pt-BR": "Caxias, MA · Remoto",
    en: "Caxias, MA, Brazil · Remote",
  },
  promptCommand: "whoami",
  bio: {
    "pt-BR":
      "Transformo regras de negócio complexas em interfaces claras, rápidas e fáceis de manter, do primeiro commit à produção.",
    en: "I turn complex business rules into clear, fast interfaces that are easy to maintain, from the first commit to production.",
  },
  stack: ["TypeScript", "React", "Next.js", "TanStack Query", "Zustand", "Tailwind", "shadcn/ui", "Vitest", "Astro"],
  email: "naiandersonb.dev@gmail.com",
  resumePath: {
    "pt-BR": "/cv/naianderson-bruno-pt-BR.pdf",
    en: null,
  },
  heroImage: {
    src: heroImage,
    alt: {
      "pt-BR": "Ilustração de um desenvolvedor de fones de ouvido programando em frente a dois monitores",
      en: "Illustration of a developer wearing headphones, coding in front of two monitors",
    },
  },
  stats: [
    { value: "4+", label: { "pt-BR": "anos em produção", en: "years in production" } },
    { value: "2", label: { "pt-BR": "empresas", en: "companies" } },
  ],
};
