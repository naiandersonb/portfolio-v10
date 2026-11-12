import type { Education } from "./types";

/** Newest first: by year, then by completedOn when two courses share a year. */
export const EDUCATION: Education[] = [
  {
    course: { "pt-BR": "PHP", en: "PHP" },
    school: "Rocketseat",
    hours: 126,
    year: 2026,
    completedOn: "2026-11",
    topics: ["Laravel", "MVC", "Pest"],
  },
  {
    course: { "pt-BR": "Testes e Arquitetura no Front-end", en: "Front-end Testing and Architecture" },
    school: "Rocketseat",
    hours: 30,
    year: 2026,
    completedOn: "2026-07",
    topics: ["SOLID", "TDD", "Playwright"],
  },
  {
    course: { "pt-BR": "Arquitetura e Design de Aplicações React", en: "React Application Architecture and Design" },
    school: "Alura",
    hours: 35,
    year: 2025,
  },
  {
    course: { "pt-BR": "TypeScript Avançado no Front-end", en: "Advanced TypeScript for the Front-end" },
    school: "Alura",
    hours: 27,
    year: 2025,
  },
  {
    course: { "pt-BR": "Técnico em Desenvolvimento de Sistemas", en: "Systems Development Technician" },
    school: "SENAI",
    hours: 1000,
    year: 2021,
  },
];
