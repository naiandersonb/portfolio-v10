import type { Service } from "./types";

/** "What I do": the three areas from the v2 board, in display order. */
export const SERVICES: Service[] = [
  {
    key: "interfaces",
    title: { "pt-BR": "Interfaces em React e Next.js", en: "React and Next.js interfaces" },
    summary: {
      "pt-BR": "Telas tipadas e componentizadas, prontas para crescer com o produto.",
      en: "Typed, component-based screens, ready to grow with the product.",
    },
    items: {
      "pt-BR": ["Componentes com TypeScript", "Estado com TanStack Query e Zustand", "UI com Tailwind e shadcn/ui"],
      en: ["Components in TypeScript", "State with TanStack Query and Zustand", "UI with Tailwind and shadcn/ui"],
    },
  },
  {
    key: "architecture",
    title: { "pt-BR": "Arquitetura e testes no front", en: "Front-end architecture and testing" },
    summary: {
      "pt-BR": "Código organizado para durar, com testes que dão segurança para mudar.",
      en: "Code organized to last, with tests that make change safe.",
    },
    items: {
      "pt-BR": ["SOLID e TDD", "Testes com Vitest e Playwright", "Arquitetura de aplicações React"],
      en: ["SOLID and TDD", "Testing with Vitest and Playwright", "React application architecture"],
    },
  },
  {
    key: "products",
    title: { "pt-BR": "Landing pages e produtos SaaS", en: "Landing pages and SaaS products" },
    summary: {
      "pt-BR": "Da página de entrada ao painel do cliente, num produto só.",
      en: "From the landing page to the customer dashboard, in a single product.",
    },
    items: {
      "pt-BR": ["Landing pages com Astro", "Painéis e dashboards", "White label para vários clientes"],
      en: ["Landing pages with Astro", "Panels and dashboards", "White label for multiple clients"],
    },
  },
];
