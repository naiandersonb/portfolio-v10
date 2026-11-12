# Implementation Plan: Portfólio Terminal Editorial Dark Tech

**Branch**: `001-pixel-terminal-portfolio` | **Date**: 2026-11-10 (direção revista em 2026-11-11; layout v2 em 2026-11-12) | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-pixel-terminal-portfolio/spec.md`

## Summary

Novo portfólio só em tema escuro, com voz de terminal, cores do Editorial Dark Tech e o layout minimalista v2 (títulos em Michroma caixa alta, linhas finas, marcadores quadrados lavanda). Tem home de uma página (hero com ilustração e números, sobre, o que eu faço, experiência com entregas, formação, contato), um terminal interativo opcional com atalhos e conteúdo em PT/EN. Projetos e estudos de caso ficam para uma fase futura. A logo é o raio com goivadas sobre um quadrado lavanda. O design system é o [Editorial Dark Tech](https://claude.ai/artifact/AeiLxGm9Bg3RVtRfpgSckd).

**Mudança de direção (2026-11-11)**: a direção pixel art 8-bit, o conceito v2 (linogravura) e o conceito v3 (Functional HUD) foram descartados pelo dono. Vale o conceito v4, Editorial Dark Tech, aplicado em todas as pranchetas do protótipo.

**Layout v2 (2026-11-12)**: o dono escolheu a home v2 do [canvas](https://claude.ai/artifact/KddAtAcAX75xReRb4hcq5i) (pranchetas "Home v2" e "Mobile v2") para construir o portfólio. Ela substitui o hero A tipográfico: hero com ilustração raster, Michroma no lugar da Newsreader, tudo escuro (sem superfície `paper`), números reais no hero, seção "O que eu faço" e experiência com entregas por empresa. A seção Projetos, as páginas de estudo de caso e os comandos de projeto do terminal foram adiados (US3, US3b).

**Ordem de entrega, a pedido do usuário**: primeiro o **protótipo visual como Design Artifact no Claude** (Fase P). Ele precisa ser aprovado (gate G-P) antes de qualquer código. A implementação vem depois e reaproveita a stack e o conteúdo do portfólio atual (`front-end/portfolio-nb`): Next.js 16 + next-intl + Tailwind 4, saída estática.

## Technical Context

**Language/Version**: TypeScript 5 (strict), React 19.3

**Primary Dependencies**: Next.js 16.4.3 (App Router, `cacheComponents`), next-intl 4.14.9, Tailwind CSS 4; componentes animados opcionais do registry **KokonutUI** via shadcn CLI (copiados para `src/components/kokonutui/`; `motion` só se um componente adotado exigir — R13); fontes via `next/font/google`: Michroma (títulos), Outfit (texto e interface) e JetBrains Mono (rótulos e terminal) (R8)

**Storage**: N/A. Conteúdo em módulos TS tipados no repositório (R5); preferência de idioma no cookie do next-intl

**Testing**: Vitest (unit), Playwright + @axe-core/playwright (e2e/a11y), Lighthouse CI (performance) — R11

**Target Platform**: Navegadores modernos (duas últimas versões, desktop e mobile); hospedagem estática na Vercel

**Project Type**: Web app frontend estático (SSG), sem backend

**Performance Goals**: Conteúdo principal da home visível em < 2 s no 4G (SC-003); JS do terminal carregado sob demanda

**Constraints**: Contraste ≥ 4,5:1 (calculado em R9); sem rolagem horizontal de 320 a 2560 px; `prefers-reduced-motion` respeitado; todo conteúdo acessível sem os efeitos interativos; glifos e ilustrações vetoriais nítidos até 200% de zoom

**Scale/Scope**: 1 página principal com 6 seções × 2 idiomas; ~9 comandos de terminal + 3–5 ocultos; ~22 glifos de contorno; 1 ilustração raster no hero (fornecida pelo dono) e ilustrações vetoriais para 404 e OG

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Avaliado contra a [constitution v1.2.0](../../.specify/memory/constitution.md) (ratificada em 2026-11-10; na 1.2.0, de 2026-11-11, a restrição de paleta passou a apontar para o design system Editorial Dark Tech).

| Princípio / Seção | Gate | Pré-design | Pós-design |
|-------------------|------|-----------|-----------|
| I. Design Antes do Código | Protótipo no Claude aprovado antes do código; tokens, glifos e ilustrações exportados como fonte única | ✅ Fase P é a primeira | ✅ Gate G-P (T011) + exportação (T012); Fase 1 depende de T012 |
| II. Acessibilidade e Legibilidade | Contraste ≥ 4,5:1, teclado, reduced-motion, alt text, sem JS, vetores nítidos a 200% | ✅ | ✅ Contraste calculado (R9); T041, T077, T078, T079 |
| III. Paridade Bilíngue | PT/EN completos, URL por idioma, troca mantém página, fallback | ✅ | ✅ R4; T019–T022, T025, T042, T045 |
| IV. Código Limpo e Responsabilidade Única | Pastas por domínio; parser ≠ executor ≠ UI; sem `utils/`; APIs verificadas na versão instalada; dependências justificadas | ✅ | ✅ Estrutura por domínio; APIs (`proxy.ts` em `src/`, `localeDetection`, `getMessageFallback`, `global-not-found`, `icon`/`opengraph-image`) verificadas em `node_modules`; sem cmdk, xterm, CMS, MDX ou pacote de ícones (R5–R7) |
| V. Verificação com Evidência | Teste para todo critério automatizável; gates com comando e resultado | ✅ | ✅ R11; quickstart; T081 |
| Restrições Técnicas | Stack fixa, SSG, só dark, sem analytics, < 2 s no 4G | ✅ | ✅ Technical Context; T080 |
| Fluxo de Desenvolvimento | Branch própria, Conventional Commits, gates antes de integrar | ⚠️ `portfolio-v10` ainda não é repositório git | ⚠️ Rodar `git init` e criar a branch `001-pixel-terminal-portfolio` antes da Fase 1 (T013) |

**Resultado**: PASS. Nenhuma violação de princípio; a única pendência é operacional (iniciar o repositório git antes da implementação), sem impacto no design.

## Delivery Phases

### Fase P — Protótipo no Claude (Design Artifact) · PRIMEIRO

Objetivo: fechar toda a direção visual antes do código. Frames detalhados em [research.md R1](./research.md#r1-ferramenta-e-fluxo-do-protótipo-prioridade-do-usuário).

Status em 2026-11-12: **gate G-P aprovado**. Todas as pranchetas de referência estão na v2, a revisão de contraste e encaixe foi feita e a exportação está em `design/` (ver design/README.md). As pranchetas de projetos e estudo de caso ficam como histórico.

1. **P1 · Fundamentos**: paleta e tokens (R9), tipografia (R8: Michroma, Outfit, JetBrains Mono), grid/espaçamento, raios (8/16/24) e cursor. Os padrões decorativos do design system existem, mas a v2 não usa.
2. **P2 · Logo**: raio escuro com goivadas sobre quadrado lavanda; testes em 128/64/32/16 px.
3. **P3 · Glifos e ilustrações**: catálogo de glifos de contorno arredondados (menu, skills, redes, ações), ilustração do hero (raster, do dono) e ilustrações vetoriais da 404 e da OG.
4. **P4 · Telas**: home v2 desktop e mobile (hero com ilustração e números, sobre, o que eu faço, experiência, formação, contato com toast); terminal aberto (help/erro); 404; OG 1200×630. Tudo nos dois idiomas, ao menos no hero e no terminal.
5. **P5 · Revisão**: contraste, legibilidade do texto longo, logo reconhecível em 32 px (SC-008, teste com 5 pessoas se possível).
6. **Gate G-P**: aprovação explícita do usuário (home v2 já escolhida; faltam as telas restantes no estilo v2 e o KokonutUI). Os tokens, os glifos, a logo, as ilustrações e as fontes aprovados são exportados e usados na implementação.

### Fase 1 — Fundação (depois de G-P)

Scaffold Next 16 em `portfolio-v10`; i18n portado do portfolio-nb com `defaultLocale: "en"` (R4); tokens do protótipo em `globals.css`; fontes; componentes de arte (logo, glifos, ilustrações em SVG) e a ilustração do hero otimizada (`next/image`); favicon e OG; layout base com header, menu-comando e footer; 404; tooling (ESLint, Vitest, Playwright).

### Fase 2 — P1 da spec (US1 + US2)

Hero v2 (ilustração, `~ $ whoami`, nome em Michroma, papel e local, CTAs "Fale comigo" e "Baixar cv.pdf", linha de números) com digitação e reduced-motion; menu estilo terminal (desktop e mobile) com seção ativa; terminal interativo (parser, registro, executor, diálogo, atalhos, histórico, autocomplete); seletor de idioma que mantém a rota.

### Fase 3 — P2 da spec (US4, US5)

Migração do conteúdo do `resume.ts`/`messages` para `src/content/`; sobre com stack; "O que eu faço" (três áreas); experiência por empresa com entregas e stack (as entregas vêm dos antigos projetos AcheiConsulta e TheMembers); formação; download do CV por idioma; contato com copiar e-mail; easter eggs do terminal.

### Fase futura — Projetos (US3, US3b, adiadas)

Grade de projetos, páginas `/projects/{slug}`, comandos `projects` e `open` e o atalho `g p`. Volta quando o dono tiver projetos selecionados; exige rodada própria de protótipo no estilo v2.

### Fase 4 — Polimento e verificação

Logo final (US6, se o protótipo tiver usado uma provisória); metadata/hreflang; e2e completo do quickstart; axe; Lighthouse; ajuste de performance; deploy.

## Project Structure

### Documentation (this feature)

```text
specs/001-pixel-terminal-portfolio/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── routes.md
│   └── terminal-commands.md
├── checklists/requirements.md
└── tasks.md             # /speckit-tasks
```

### Source Code (repository root)

Usa o App Router com pasta `src/`. A documentação do Next 16.4.3 (`file-conventions/proxy.md`) exige que `proxy.ts` fique no mesmo nível de `app/`, então ele vai para `src/`. `i18n/` e `messages/` também ficam em `src/` para manter tudo junto (o plugin do next-intl procura `./src/i18n/request.ts`). O código é separado por domínio:

```text
public/                   # cv pdf
src/assets/               # ilustração do hero (WebP, importada com next/image)
src/
├── proxy.ts              # middleware next-intl (mesmo nível de app/)
├── i18n/                 # routing.ts, request.ts, navigation.ts, app-config.d.ts (portados)
├── messages/             # pt-BR.json, en.json — strings de UI
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                      # home (hero, about, services, experience, education, contact)
│   │   ├── [...rest]/page.tsx            # catch-all → notFound() para rotas inexistentes
│   │   ├── not-found.tsx                 # 404 terminal
│   │   └── opengraph-image.tsx
│   ├── icon.svg
│   └── globals.css                       # tokens do protótipo
├── components/kokonutui/ # componentes do registry KokonutUI adotados (R13), restilizados com os tokens
├── content/              # profile, services, experience, education, social, commands
├── artwork/              # logo, catálogo de glifos (Glyph) e ilustrações vetoriais (Illustration: 404, OG), em SVG
├── terminal/             # parse-command.ts, command-registry.ts, run-command.ts, Terminal.tsx, use-shortcuts.ts
├── sections/             # Hero, About, Services, Experience, Education, Contact
└── layout/               # SiteHeader, CommandMenu, LanguageSwitcher, Footer
tests/
├── unit/                 # parser, conteúdo, fallback i18n, invariante menu⊇terminal
└── e2e/                  # cenários do quickstart + axe
```

**Structure Decision**: Projeto único de frontend em `portfolio-v10`. As pastas são organizadas por domínio (`terminal/`, `artwork/`, `content/`, `sections/`) e não por tipo técnico, para seguir a regra de "uma responsabilidade por unidade" e evitar pastas genéricas como `utils/`.

## Complexity Tracking

Sem violações a justificar.
