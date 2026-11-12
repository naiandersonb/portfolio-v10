import type { Experience } from "./types";

/** Most recent first. TheMembers deliverables carry no links, screenshots or client names (FR-010d). */
export const EXPERIENCE: Experience[] = [
  {
    role: { "pt-BR": "Sócio e Desenvolvedor", en: "Partner & Developer" },
    organization: "AcheiConsulta",
    start: "2024-08",
    end: null,
    summary: {
      "pt-BR": "SaaS de agenda e agendamento online 24h para profissionais de saúde.",
      en: "24/7 online scheduling and calendar SaaS for healthcare professionals.",
    },
    stack: ["Astro", "React", "Vite", "TanStack Query", "Zustand", "React Hook Form", "Zod", "MUI", "Vitest"],
    deliverables: [
      {
        title: { "pt-BR": "Landing page", en: "Landing page" },
        description: {
          "pt-BR": "Página de aquisição focada em conversão para o teste grátis.",
          en: "Acquisition page focused on converting visitors to the free trial.",
        },
      },
      {
        title: { "pt-BR": "Painel do profissional", en: "Professional dashboard" },
        description: {
          "pt-BR": "Agenda, consultas, locais de atendimento, assinatura, extratos e saques.",
          en: "Calendar, appointments, practice locations, subscription, statements and withdrawals.",
        },
      },
    ],
  },
  {
    role: { "pt-BR": "Desenvolvedor Front-End", en: "Front-End Developer" },
    organization: "TheMembers",
    start: "2022-06",
    end: null,
    summary: {
      "pt-BR": "Produtos da plataforma, com TypeScript e Next.js.",
      en: "Platform products, built with TypeScript and Next.js.",
    },
    stack: ["TypeScript", "Next.js", "Plyr"],
    deliverables: [
      {
        title: { "pt-BR": "Dashboard Admin & White Label", en: "Admin Dashboard & White Label" },
        description: {
          "pt-BR": "Dashboard de administração e plataforma white label para vários clientes.",
          en: "Admin dashboard and white-label platform for multiple clients.",
        },
      },
      {
        title: { "pt-BR": "Comunidade interativa", en: "Interactive community" },
        description: {
          "pt-BR": "Rede social interna com posts multimídia e reações dinâmicas.",
          en: "Internal social network with multimedia posts and dynamic reactions.",
        },
      },
      {
        title: { "pt-BR": "Player de vídeo", en: "Video player" },
        description: {
          "pt-BR": "Player customizado sobre o Plyr, adaptado ao consumo de conteúdo dos alunos.",
          en: "Custom player built on Plyr, tailored to how students watch content.",
        },
      },
      {
        title: { "pt-BR": "Dashboard de pós-venda", en: "After-sales dashboard" },
        description: {
          "pt-BR": "Fluxos autônomos de reembolso e cancelamento que reduziram pedidos ao suporte.",
          en: "Self-service refund and cancellation flows that reduced support requests.",
        },
      },
    ],
  },
];
