---

description: "Task list for Portfólio Terminal Editorial Dark Tech"
---

# Tasks: Portfólio Terminal Editorial Dark Tech

**Input**: Design documents from `/specs/001-pixel-terminal-portfolio/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Incluídos. O plano define Vitest, Playwright e axe (research R11), e o [quickstart.md](./quickstart.md) lista os cenários que precisam ser automatizados.

**Layout v2 (2026-11-12)**: a home v2 do protótipo é a referência. As Phases 5 e 6 (US3 projetos e US3b estudo de caso) estão **adiadas** e não entram nesta entrega; suas tarefas ficam registradas para a fase futura.

**Organization**: A Fase 0 (protótipo no Claude) vem primeiro, a pedido do usuário. Depois as tarefas seguem por história de usuário, para que cada uma possa ser entregue e testada de forma independente.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependência de tarefa incompleta)
- **[Story]**: História da spec (US1–US6; US3b = estudo de caso; US3/US3b adiadas)

## Path Conventions

Projeto frontend único na raiz de `portfolio-v10` (ver Project Structure em [plan.md](./plan.md)): `public/` na raiz; todo o código em `src/`, incluindo `src/proxy.ts`, `src/i18n/` e `src/messages/` (o Next exige o proxy no mesmo nível de `app/`); testes em `tests/`; exportações do protótipo em `design/`.

**Fonte de referência**: o portfólio atual em `~/Documentos/meus-projetos/front-end/portfolio-nb` (stack, i18n e conteúdo). Antes de escrever código Next.js, leia `node_modules/next/dist/docs/`: a versão 16.4.3 tem breaking changes (ver `AGENTS.md` do portfolio-nb).

---

## Phase 0: Protótipo no Claude (Design Artifact) · PRIMEIRO

**Purpose**: Fechar toda a direção visual antes do código (research R1, plan "Fase P"). Nenhuma tarefa da Fase 1 em diante começa antes do gate G-P.

**Referências**: painel semântico e imagem do raio enviados pelo usuário; seção "Direção Artística" da spec; paleta e contraste em research R9; fontes em R8.

- [x] T001 Criar o Design Artifact do protótipo no Claude (https://claude.ai/artifact/KddAtAcAX75xReRb4hcq5i) e registrar o link em design/README.md (link a registrar no README em T011)
- [x] T002 Desenhar o frame de fundamentos: tokens do Editorial Dark Tech (bg `#0B1315`, card `#141D20`, paper `#F2EFE9`, white, ink `#11181C`, lavender `#D3C7F3`, purple `#8B5CF6`, violet `#A78BFA` + derivados de contraste, research R9), escala tipográfica (Outfit texto/UI, JetBrains Mono metadados/terminal; títulos trocados para Michroma na v2), grid, espaçamentos, raios e padrões no Design Artifact. Refeito no conceito v4 em 2026-11-11
- [x] T003 Desenhar a logo: raio `#0B1315` com três goivadas sobre quadrado lavanda arredondado; prancha em 260/84/36/32/16 px no Design Artifact (FR-007–009)
- [x] T004 [P] Desenhar o catálogo de glifos de contorno arredondados (menu, redes, ações, skills, `folder` como placeholder de projeto) na mesma grade-base, o selo verificado, os padrões e a galeria de ilustrações no Design Artifact (FR-004)
- [x] T005 Desenhar a home desktop e mobile. A v1 (hero A tipográfico) foi substituída em 2026-11-12 pela **home v2** (pranchetas "Home v2" e "Mobile v2"): hero com ilustração, nome em Michroma, "Fale comigo" e "Baixar cv.pdf", números "4+ anos em produção" e "2 empresas"; Sobre; O que eu faço ("Da ideia ao deploy"); Experiência com entregas e stack; Formação; Contato ("Vamos construir algo juntos?"); menu Início/Sobre/Contato; tudo escuro (FR-000, FR-010)
- [x] T006 ~~Variante B do hero~~: descartada em 2026-11-11 (hero A escolhido); boards removidos do canvas (FR-000)
- [x] T007 [P] Desenhar o terminal interativo aberto (desktop em painel, mobile em tela cheia) com as saídas de `help` + dica de segredos, `command not found`, `neofetch` e o toast de e-mail copiado no Design Artifact ([terminal-commands.md](./contracts/terminal-commands.md))
- [x] T008 [P] *(Adiada com a US3; pranchetas v1 ficam como histórico)* Desenhar a seção Projetos (grade com AcheiConsulta em destaque, card `[private]`, card sem imagem, estado vazio `ls: nenhum projeto encontrado`, hover/foco) e a página de estudo de caso, incluindo ilustração esquemática para um projeto `[private]`, no Design Artifact (FR-010b, FR-010c)
- [x] T009 [P] Desenhar Sobre (`whoami`, skills com ícones, experiência, formação, botão de CV), Contato, 404 `command not found` e a imagem OG 1200×630 no Design Artifact
- [x] T084 Alinhar à v2 as pranchetas que ainda estão no estilo v1: folha de tipografia (Michroma), terminal aberto (desktop e mobile), 404, imagem OG 1200×630 e home EN (hero e terminal em inglês), sem `paper`, sem padrões e com os botões e linhas da v2 no Design Artifact
- [x] T010 Revisar na v2 o contraste (todos os pares ≥ 4,5:1, research R9; atenção a `muted` sobre `card` e às linhas de 10%/20%), a legibilidade do texto longo, o encaixe da Michroma sem rolagem horizontal de 320 a 2560 px e o reconhecimento da logo em 32 px (SC-008) no Design Artifact
- [x] T011 **Gate G-P**: obter aprovação explícita do protótipo e registrar as decisões em design/README.md. Já decidido em 2026-11-11: cores do Editorial Dark Tech (design system https://claude.ai/artifact/AeiLxGm9Bg3RVtRfpgSckd), logo do raio mantida e recolorida. Decidido em 2026-11-12: **home v2**, fontes Michroma/Outfit/JetBrains Mono, projetos adiados. **Aprovado em 2026-11-12** com KokonutUI `type-writer`, `use-copy-to-clipboard`, `glitch-text` e `command-button` (ver design/README.md)
- [x] T012 Exportar do protótipo aprovado: tokens para design/tokens.json (fonte: `tokens.json` do design system Editorial Dark Tech; tema Tailwind 4 pronto na seção "Tailwind CSS" dele); logo, glifos e ilustrações vetoriais (404, OG) como SVG para design/artwork/{logo.svg,glyphs/*.svg,illustrations/*.svg} (só cores da paleta; ids de `<defs>` prefixados por arte); a ilustração do hero (asset `93c5a97d83895fa689afbb6e74c5a014` do canvas) em resolução original para design/artwork/hero-developer.webp

**Checkpoint**: Direção visual aprovada e exportada. A implementação pode começar.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar o projeto Next.js com a stack do portfolio-nb.

- [x] T013 Rodar `git init` em portfolio-v10 (se ainda não for repositório), criar a branch `001-pixel-terminal-portfolio` e inicializar o projeto Next.js 16.4.3 + React 19.3 + TypeScript 5 strict na raiz de portfolio-v10 com package.json espelhando as versões do portfolio-nb (`next` 16.4.3, `next-intl` ^4.14.9, `tailwindcss` ^4, `@tailwindcss/turbopack` ^4) e o alias `@/*` → `src/*` em tsconfig.json; criar components.json do shadcn (`npx shadcn@latest init`) com o alias de componentes em `src/components`, registrar `@kokonutui` → `https://kokonutui.com/r/{name}.json` e instalar o utilitário `cn` (`npx shadcn@latest add https://kokonutui.com/r/utils.json`) — só se ao menos um componente KokonutUI foi aprovado em T011 (research R13). *Feito em 2026-11-12: `components.json` escrito à mão (o `shadcn init` exige o `globals.css` da T023), com `ui` e `hooks` em `src/components/kokonutui` e o `cn` em `src/components/class-names.ts` (sem pasta `lib/utils`); `@types/node` ^24 por exigência do Vitest 5; remoto `origin` = github.com:naiandersonb/portfolio-v10*
- [x] T014 Criar next.config.ts com `createNextIntlPlugin`, `cacheComponents: true` e a regra turbopack para `*.css` com `@tailwindcss/turbopack`, portando de portfolio-nb/next.config.ts
- [x] T015 [P] Configurar o ESLint em eslint.config.mjs (copiar a base de portfolio-nb) e o .gitignore
- [x] T016 [P] Configurar o Vitest em vitest.config.ts com alias `@` e o script `"test": "vitest run"` em package.json
- [x] T017 [P] Configurar Playwright + @axe-core/playwright em playwright.config.ts (webServer `npm run build && npm start`, projetos desktop 1280×800 e mobile 375×812) e o script `"test:e2e"` em package.json
- [x] T018 [P] Criar .claude/launch.json com a configuração `dev` (`npm run dev`, porta 3000)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infra compartilhada por todas as histórias: i18n, tokens, tipos de conteúdo, componentes de arte e layout base.

**⚠️ CRITICAL**: Nenhuma história começa antes do fim desta fase.

- [x] T019 Portar a configuração de i18n de portfolio-nb para src/i18n/routing.ts (`locales: ["pt-BR", "en"]`, `localePrefix: "always"`, **`defaultLocale: "en"`**, detecção de locale ativa), src/i18n/request.ts (import das mensagens a partir de `../messages/${locale}.json`), src/i18n/navigation.ts e src/i18n/app-config.d.ts (research R4). Confirmar que `pt`, `pt-PT` e `pt-BR` no `Accept-Language` resolvem para `pt-BR`; se o matcher do next-intl não fizer isso, normalizar `pt*` → `pt-BR` antes da detecção em src/proxy.ts (FR-017a). *Verificado em 2026-11-12: o matcher do next-intl 4.15 já resolve `pt`, `pt-PT` e `pt-BR` para `pt-BR` e `de`/`en-US` para `en`; não foi preciso normalizar*
- [x] T020 Criar src/proxy.ts (mesmo nível de `src/app/`, conforme `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`) com `createMiddleware(routing)` e o matcher que ignora `api|_next|_vercel|.*\\..*`, portado de portfolio-nb/proxy.ts
- [x] T021 Configurar `getMessageFallback` em src/i18n/request.ts para devolver a mensagem do outro locale quando a chave estiver vazia ou ausente (FR-017c). *Feito com `withFallbackMessages` (src/i18n/message-fallback.ts), que completa as mensagens do locale com as do outro antes de entregá-las ao next-intl; testado em tests/unit/message-fallback.test.ts*
- [x] T022 [P] Criar src/messages/pt-BR.json e src/messages/en.json com a estrutura de chaves de UI (header, menu, terminal, hero, about, services, experience, education, contact, notFound, metadata), sem chaves de projetos ou estudo de caso. *Por ora só metadata, header, menu, footer e notFound; cada seção acrescenta suas chaves na própria fase*
- [x] T023 Criar src/app/globals.css com os tokens de design/tokens.json em `:root` mapeados via `@theme inline` do Tailwind 4, só tema escuro (sem `[data-theme]`), mais a utilidade `.cursor-blink` e o marcador quadrado lavanda dos rótulos de seção, com animações desligadas em `@media (prefers-reduced-motion: reduce)` (FR-001, FR-006, FR-019)
- [x] T024 Criar os tipos de domínio em src/content/types.ts: `Locale`, `Localized<T> = { "pt-BR": T; en: T }`, `Slug` (`^[a-z0-9]+(-[a-z0-9]+)*$`), `Url`, `GlyphId`, `IllustrationId`, `Profile` (com `stack`, `heroImage` e `stats`), `Service`, `Experience` (com `stack` e `deliverables`), `Deliverable`, `Education`, `SocialLink`, `TerminalCommand` (com `hidden: boolean`), seguindo [data-model.md](./data-model.md)
- [x] T025 Criar src/content/localize.ts com `pick(localized, locale)`, que devolve o valor do locale e, se ele estiver vazio, o do outro locale (FR-017c)
- [x] T026 Criar src/artwork/glyph.tsx: recebe `{ id: GlyphId; size; title?; decorative? }`, renderiza o SVG do catálogo com `stroke="currentColor"`, `aria-hidden` quando decorativo e `<title>` quando informativo (FR-020); e src/artwork/illustration.tsx para as cenas vetoriais da 404 e da OG (sempre decorativas). *Sem illustration.tsx: a v2 não usa cenas vetoriais (design/README.md). A logo virou src/artwork/logo-mark.tsx*
- [x] T027 Criar src/artwork/catalog.ts a partir de design/artwork/ (logo, glifos, ilustrações), com ids de `<defs>` únicos por arte
- [x] T028 [P] Teste unitário em tests/unit/artwork-catalog.test.ts: todo `GlyphId`/`IllustrationId` referenciado no conteúdo existe no catálogo e nenhuma arte usa cor fora da paleta
- [x] T029 [P] Teste unitário em tests/unit/localize.test.ts: `pick` devolve o locale pedido e cai no outro quando vazio
- [x] T030 Criar src/app/[locale]/layout.tsx: valida o locale com `hasLocale` ou `notFound()`, `generateStaticParams` para os dois locales, fontes via `next/font/google` (Michroma 400 + Outfit + JetBrains Mono; fallback da Michroma `"Eurostile", Arial, sans-serif`, research R8), `<html lang>` e body com classe base, sem script de tema
- [x] T031 Criar src/layout/site-footer.tsx com nome e papel localizados

**Checkpoint**: Fundação pronta. US1 e US2 podem começar em paralelo.

---

## Phase 3: User Story 1 - Primeira impressão e identidade (Priority: P1) 🎯 MVP

**Goal**: A home mostra logo, nome, papel, tagline digitada como terminal, a ilustração do hero aprovada e os CTAs acima da dobra.

**Independent Test**: Abrir `/en` e `/pt-BR` em 1280×800 e 375×812 e ver logo, nome, papel, tagline e CTAs sem rolar; com `prefers-reduced-motion`, a tagline aparece completa na hora (quickstart cenários 1 e 2).

- [x] T032 [P] [US1] Teste e2e em tests/e2e/hero.spec.ts: elementos do hero visíveis sem rolar no desktop e no mobile; com `reducedMotion: "reduce"`, texto completo sem animação
- [x] T033 [P] [US1] Criar src/content/profile.ts com os dados de portfolio-nb/app/_content/resume.ts e das mensagens `profile.*` (name, fullName, location, email, role, tagline, headlines ≥1, bio, stack). *Feito sem `tagline`/`headlines`: o hero v2 só digita o comando do prompt (`promptCommand: "whoami"`)*, em formato `Localized`, mais `heroImage` (alt localizado) e `stats` só com "4+ anos em produção" e "2 empresas"
- [x] T034 [P] [US1] Criar src/layout/logo.tsx: renderiza a logo de src/artwork/catalog.ts, com link para `/{locale}` e rótulo acessível
- [x] T035 [US1] Criar src/sections/typed-terminal-line.tsx (client) a partir do `@kokonutui/type-writer` se aprovado em T011 (instalado em src/components/kokonutui/), ou adaptando portfolio-nb/app/_components/typed-headline.tsx: prompt `~ $`, cursor em bloco, texto completo legível em ≤ 3 s, texto completo imediato com `prefers-reduced-motion` e texto real em `sr-only`. *Feito com `@kokonutui/type-writer` restilizado (cores e tamanhos dos tokens; o texto final com reduced-motion é derivado no render, não num efeito)*
- [x] T085 [P] [US1] Copiar design/artwork/hero-developer.webp para src/assets/hero-developer.webp (otimizado, com largura suficiente para 2× no desktop)
- [x] T036 [US1] Criar src/sections/hero.tsx com o hero v2: ilustração via `next/image` (`priority`, `sizes` responsivo, alt localizado, fundo `card` enquanto carrega), `~ $ whoami`, nome em Michroma caixa alta em duas linhas, itens com marcador quadrado lavanda (papel e local), `TypedTerminalLine`, botões "Fale comigo" (`#contact`, sólido lavanda, raio 8px) e "Baixar cv.pdf" (contorno) e a linha de números de `profile.stats` sem caixas; sem selo de disponibilidade; no mobile a ilustração fica acima e nome, papel e CTA ficam na primeira tela (FR-000)
- [x] T037 [US1] Criar src/app/[locale]/page.tsx compondo header (placeholder até US2), `Hero` e footer, com seções vazias ancoradas em `#about`, `#services`, `#experience`, `#education` e `#contact`
- [x] T038 [US1] Criar `generateMetadata` em src/app/[locale]/layout.tsx com title e description localizados

**Checkpoint**: A home já funciona como cartão de visitas.

---

## Phase 4: User Story 2 - Navegação estilo terminal (Priority: P1)

**Goal**: Menu clicável estilo comando, completo, mais o terminal interativo opcional com atalhos, `help`, erros, histórico, autocomplete e comandos secretos; seletor de idioma que mantém a rota.

**Independent Test**: Alcançar cada seção por clique, por teclado (Tab/Enter) e pelo terminal (`Ctrl+K` → `sobre`); `help` lista os comandos sem os secretos; `xyz` mostra o erro e o terminal continua aberto; trocar de idioma mantém a rota (quickstart cenários 3, 4, 5, 7 e 13a).

### Tests for User Story 2

- [x] T039 [P] [US2] Teste unitário em tests/unit/parse-command.test.ts seguindo a gramática de [terminal-commands.md](./contracts/terminal-commands.md): espaços extras, maiúsculas, nome → alias → erro, argumento, prefixo NÃO executa, aliases `?` e `~` resolvem para `help` e `home`, `sudo hire-me` resolve para `sudo` com argumento `hire-me`
- [x] T040 [P] [US2] Teste unitário em tests/unit/command-registry.test.ts: nomes, aliases e atalhos únicos; todo `name` e `alias` é um único token que casa com `[a-z-]+ | "?" | "~"`; "Entre 3 e 5 comandos com `hidden: true`"; nenhum oculto na saída do `help`; todo destino de `navigate` não oculto existe em `MENU_ITEMS` (SC-011)
- [x] T041 [P] [US2] Teste e2e em tests/e2e/navigation.spec.ts: clique, só teclado com foco visível, terminal por botão/`Ctrl+K`/`/`, Esc devolve o foco ao gatilho, atalho não dispara dentro de input, menu mobile em 375 px; no mobile, o terminal aberto ocupa a viewport dinâmica, o campo de entrada fica dentro de `window.visualViewport` depois de focado e há um botão de fechar visível (edge case "Terminal em celular")
- [x] T042 [P] [US2] Teste e2e em tests/e2e/locale.spec.ts: `Accept-Language` `pt-BR`, `pt-PT` e `pt` → `/pt-BR`; `de` e `en-US` → `/en`; troca manual grava cookie; troca em `/pt-BR#contact` vai para `/en#contact` (SC-012)

### Implementation for User Story 2

- [x] T043 [P] [US2] Criar src/layout/menu-items.ts com `MENU_ITEMS` (home, about, contact: chave i18n, âncora, `GlyphId`), fonte única para menu e invariante
- [x] T044 [US2] Criar src/layout/command-menu.tsx: itens em linha com voz de terminal, item ativo em lavanda com sublinhado via IntersectionObserver nas âncoras, versão compacta no mobile (botão + painel acessível) (FR-011, FR-012)
- [x] T045 [US2] Criar src/layout/language-switcher.tsx: links PT/EN para o **mesmo pathname e hash** no outro locale usando `getPathname` de src/i18n/navigation.ts, com `hrefLang` e `aria-current` (FR-017, FR-017b)
- [x] T046 [US2] Criar src/layout/site-header.tsx com `Logo`, `CommandMenu`, `LanguageSwitcher` e o botão `>_` que abre o terminal (base `@kokonutui/command-button` se aprovado, com reduced-motion adicionado e teclas `Ctrl` `K`); usar em src/app/[locale]/page.tsx
- [x] T047 [US2] Criar src/terminal/parse-command.ts: função pura `parseCommand(input, registry)` que devolve `{ ok: true, command, argument } | { ok: false, reason: "not-found" | "empty", input }`
- [x] T048 [US2] Criar src/content/commands.ts com o registro declarativo da tabela de [terminal-commands.md](./contracts/terminal-commands.md) (help, home, about, contact, email, cv, lang, clear, exit; `projects` e `open` adiados com a US3) mais os ocultos `sudo` (que responde a `hire-me` e devolve `nice try ;)` para qualquer outro argumento), `neofetch`, `coffee` e `matrix`, com `hidden: true` e textos `Localized`; cada `name`/`alias` é um único token
- [x] T049 [US2] Criar src/terminal/run-command.ts: executor que mapeia `action` para efeitos injetados (`navigate`, `setLocale`, `copyEmail`, `downloadCv`, `print`, `effect`, `clear`, `close`) e gera as linhas de saída do contrato; `help` lista só os não ocultos e termina com a dica de segredos (FR-012f)
- [x] T050 [US2] Criar src/terminal/use-shortcuts.ts: `Ctrl/⌘+K` e `/` abrem o terminal (comparando `event.key`, nunca `` ` ``, que é tecla morta no ABNT2), sequências `g h|a|c` (`g p` adiado com a US3); ignorar quando o foco está em `input`, `textarea`, `select` ou `[contenteditable]` (FR-012b)
- [x] T051 [US2] Criar src/terminal/terminal.tsx (client, carregado sob demanda com `next/dynamic`): `<dialog>` com `showModal()`, entrada com foco ao abrir, histórico com ↑/↓, autocomplete com Tab, saída em `aria-live="polite"`, Esc/botão/`exit` fecham e devolvem o foco, tela cheia abaixo de 768 px com altura em `100dvh` e entrada reposicionada via `visualViewport` para não ficar sob o teclado virtual, efeito `matrix` desligado com reduced-motion (FR-012a, FR-012d)
- [x] T052 [US2] Montar o terminal e o hook de atalhos em src/app/[locale]/layout.tsx via um único client island src/terminal/terminal-root.tsx

**Checkpoint**: US1 + US2 = MVP navegável e bilíngue.

**Desvios da Phase 4**:

- T044: o item ativo vem da posição de rolagem (`useSyncExternalStore` em scroll/resize/hashchange) e não de IntersectionObserver, porque `#top` é o `main` inteiro e as outras âncoras seguem vazias até US4/US5
- T045: o switcher usa o `Link` do next-intl com `locale`, que já resolve o pathname do outro locale e grava o cookie `NEXT_LOCALE`; o hash entra no link depois da hidratação (antes disso o link leva à página sem hash)
- T046: o `command-button` do KokonutUI perdeu o listener global (os atalhos são de src/terminal/use-shortcuts.ts), a plataforma é lida com `useSyncExternalStore` e o movimento das teclas respeita `motion-reduce`
- T049: `run-command.ts` é puro e devolve linhas e uma lista de efeitos; quem executa os efeitos é src/terminal/terminal-root.tsx
- T042: o Playwright define o idioma pelo `locale` do contexto, porque o navegador sobrescreve um `Accept-Language` passado como cabeçalho
- O foco global (`:focus-visible`) foi para `@layer base`, para que a entrada do terminal, que já marca o foco na borda, possa desligar o anel

---

## Phase 5: User Story 3 - Explorar projetos (Priority: P2) · ADIADA

> Adiada em 2026-11-12: o dono não tem projetos selecionados por enquanto. Não executar nesta entrega. Antes de retomar, desenhar a seção no estilo v2 e reintroduzir `projects`, `open`, `g p` e o item de menu.

**Goal**: Grade de projetos com AcheiConsulta em destaque, cards `[private]` da TheMembers, tags com ícones e links.

**Independent Test**: A seção `#projects` mostra todos os projetos com título, descrição, tags e links válidos; os cards `private` não têm links; o estado vazio aparece se a lista estiver vazia.

- [ ] T053 [P] [US3] Teste unitário em tests/unit/content-projects.test.ts: `slug` e `order` únicos; "summary ≤ 160 caracteres"; tags ≥1; `kind = "private"` ⇒ sem `demoUrl`/`codeUrl` e `cover`/`gallery` só em `public/illustrations/`; todo `Localized` com as duas chaves
- [ ] T054 [P] [US3] Criar src/content/projects.ts migrando de portfolio-nb: AcheiConsulta (LDG com link `https://acheiconsulta.com/`, PNL) como `kind: "own"`, `featured: true`; TheMembers (ADM, COM, PLY, POS) como `kind: "private"`, `organization: "TheMembers"`, com stacks e descrições de messages `experience.projects.*`
- [ ] T055 [P] [US3] Copiar as ilustrações de design/illustrations/ para public/illustrations/
- [ ] T056 [US3] Criar src/sections/project-card.tsx: título, resumo, tags, capa (`Illustration`) ou glifo `folder` como placeholder, rótulo `[private]`, botões demo/código só quando houver URL (`target="_blank" rel="noopener noreferrer"`), link interno quando houver `caseStudy`, hover/foco com elevação e contorno sólido (sem depender só de cor)
- [ ] T057 [US3] Criar src/sections/projects-section.tsx com cabeçalho `~/projects $ ls`, grade responsiva (destaques primeiro, depois por `order`) e estado vazio `ls: nenhum projeto encontrado`; montar em `#projects` em src/app/[locale]/page.tsx

---

## Phase 6: User Story 3b - Estudo de caso de projeto (Priority: P2) · ADIADA

> Adiada em 2026-11-12 junto com a US3.

**Goal**: Página `/{locale}/projects/{slug}` com as seções fixas, anterior/próximo e regras `private`.

**Independent Test**: Abrir direto `/en/projects/{slug}`: todas as seções presentes, anterior/próximo/lista funcionam, slug inexistente cai no 404, projeto `private` só tem ilustrações e nenhum link externo (quickstart cenários 6 e 13c).

- [ ] T058 [P] [US3b] Teste e2e em tests/e2e/case-study.spec.ts: seções presentes, anterior/próximo, slug inválido → 404, página `private` sem `a[target=_blank]` e com rótulo `[private]`
- [ ] T059 [P] [US3b] Criar src/content/case-studies.ts com estudos de caso de exemplo (overview, problem, role, process[], stack, gallery com `alt` `Localized`, outcome) para AcheiConsulta e os 4 projetos TheMembers, ligados aos projetos por `slug`
- [ ] T060 [US3b] Criar src/content/project-navigation.ts com `getAdjacentProjects(slug)`, derivado dos projetos com `caseStudy` ordenados por `order`
- [ ] T061 [US3b] Criar src/sections/case-study.tsx com cabeçalho `$ cat {slug}/README.md` e as seções resumo, contexto, papel, processo, stack, galeria, resultado e links (nunca para `private`)
- [ ] T062 [US3b] Criar src/app/[locale]/projects/[slug]/page.tsx com `generateStaticParams` (locales × projetos com `caseStudy`), `notFound()` para slug inválido, `generateMetadata` (title, summary) e navegação anterior/próximo/voltar à lista (FR-012e)

---

## Phase 7: User Story 4 - Sobre, áreas de atuação, experiência e formação (Priority: P2)

**Goal**: Seções `#about` (bio e stack), `#services` ("Da ideia ao deploy", três áreas), `#experience` (um bloco por empresa com entregas e stack) e `#education`, mais o download do CV por idioma.

**Independent Test**: A home mostra bio e stack, as três áreas, a experiência do emprego mais recente ao mais antigo com entregas numeradas e stack, e a formação do curso mais novo ao mais antigo; "Baixar cv.pdf" e o comando `cv` entregam o PDF do idioma ativo ou o fallback (quickstart cenários 6, 13 e 13b).

- [ ] T086 [P] [US4] Teste unitário em tests/unit/content-experience.test.ts: toda experiência tem ≥1 entrega e ≥1 item de stack, todo `Localized` tem as duas chaves, experiências em ordem decrescente de `start`, formação em ordem decrescente de `year`/`completedOn`, `profile.stats` sem número de projetos

- [ ] T063 [P] [US4] Criar src/content/services.ts (três áreas do protótipo v2: título, frase, itens) e src/content/experience.ts (`start`/`end` em `YYYY-MM`, `null` = atual; AcheiConsulta "Sócio e Desenvolvedor" com resumo, stack Astro/React/Vite/TanStack Query/Zustand/React Hook Form/Zod/MUI/Vitest e entregas landing page e painel do profissional; TheMembers "Desenvolvedor Front-End" com stack TypeScript/Next.js/Plyr e entregas Dashboard Admin & White Label, comunidade interativa, player de vídeo e dashboard de pós-venda, sem links) e src/content/education.ts (Rocketseat PHP 126h 2026-11; Rocketseat Testes e Arquitetura no Front-end 30h 2026-07; Alura React 35h 2025; Alura TypeScript 27h 2025; SENAI 1000h 2021 — mais recente primeiro) migrando de portfolio-nb (as entregas vêm das antigas mensagens `experience.projects.*`)
- [x] T064 [P] [US4] Copiar portfolio-nb/public/naianderson-bruno-front-end.pdf para public/cv/naianderson-bruno-pt-BR.pdf e definir `resumePath` em src/content/profile.ts como `{ "pt-BR": "/cv/naianderson-bruno-pt-BR.pdf", en: null }` até existir a versão EN. *Adiantada para a Phase 3 junto com a T065, porque o botão "Baixar cv.pdf" do hero precisa dela*
- [x] T065 [US4] Criar src/content/resume-link.ts com `getResumeHref(locale)`, que cai no outro idioma quando o do locale ativo for `null` (FR-010a)
- [ ] T066 [US4] Criar src/sections/about-section.tsx (rótulo `■ SOBRE`, bio, stack e redes), src/sections/services-section.tsx ("Da ideia ao deploy", três colunas), src/sections/experience-section.tsx (índice 01/02, empresa em Michroma, cargo, período com marcador "atual", resumo, chips de stack e entregas numeradas em duas colunas no desktop) e src/sections/education-section.tsx; montar em `#about`, `#services`, `#experience` e `#education` em src/app/[locale]/page.tsx e ligar o botão "Baixar cv.pdf" do hero a `getResumeHref`
- [ ] T067 [US4] Ligar a ação `downloadCv` do terminal a `getResumeHref` em src/terminal/terminal-root.tsx

---

## Phase 8: User Story 5 - Contato (Priority: P2)

**Goal**: Seção `#contact` com copiar e-mail (toast estilo terminal) e redes com ícones.

**Independent Test**: Copiar e-mail coloca o endereço no clipboard e mostra `✓ email copiado`; se falhar, o e-mail fica visível e selecionável; links de redes abrem em nova aba (quickstart cenário 8).

- [ ] T068 [P] [US5] Teste e2e em tests/e2e/contact.spec.ts com permissão de clipboard concedida e negada
- [ ] T069 [P] [US5] Criar src/content/social-links.ts (GitHub `https://github.com/naiandersonb`, LinkedIn `https://www.linkedin.com/in/naianderson-bruno`, e-mail), com `GlyphId` e `label` `Localized`
- [ ] T070 [US5] Criar src/sections/copy-email-button.tsx (client) com `navigator.clipboard.writeText` (via `@kokonutui/use-copy-to-clipboard` se o registry já estiver configurado), toast `aria-live` de sucesso ou erro e e-mail sempre visível; reaproveitar a mesma função de cópia na ação `copyEmail` do terminal via src/terminal/terminal-root.tsx
- [ ] T071 [US5] Criar src/sections/contact-section.tsx com o título "Vamos construir algo juntos?" em Michroma, rótulo `$ contact --list`, botão de copiar e links de redes (`target="_blank" rel="noopener noreferrer"`); montar em `#contact` em src/app/[locale]/page.tsx

---

## Phase 9: User Story 6 - Logo raio (Priority: P3)

**Goal**: A logo aprovada aparece como favicon, ícone da Apple e imagem social.

**Independent Test**: A aba mostra o raio em 16 e 32 px; a prévia de compartilhamento mostra logo, nome e descrição (US6 cenários 3 e 4).

- [ ] T072 [P] [US6] Gerar src/app/icon.svg a partir de design/artwork/logo.svg (versão simplificada sem goivadas para 16/32 px)
- [ ] T073 [P] [US6] Criar src/app/apple-icon.png (180×180, logo centrada sobre `#0B1315`) a partir de design/artwork/logo.svg
- [ ] T074 [US6] Criar src/app/[locale]/opengraph-image.tsx com `ImageResponse` 1200×630: logo, nome e papel no locale (seguir os docs em node_modules/next/dist/docs)

---

## Phase 10: Polish & Cross-Cutting Concerns

- [ ] T075 Criar a 404 estilo terminal em src/app/[locale]/not-found.tsx (`command not found`, com título em `@kokonutui/glitch-text` se aprovado, com link para a home e para `#contact`, nos dois idiomas) e o catch-all src/app/[locale]/[...rest]/page.tsx, que só chama `notFound()`, para que endereços inexistentes como `/en/nao-existe` cheguem a essa 404. Endereços sem idioma são redirecionados pelo proxy; se algum escapar, avaliar `src/app/global-not-found.tsx` conforme `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md` (FR-013). Cobrir em tests/e2e/navigation.spec.ts: `/en/nao-existe` e `/pt-BR/projects/xyz` (rota adiada) mostram a 404 localizada
- [ ] T076 [P] Adicionar `alternates.languages` (hreflang com `x-default` → `en`) e `openGraph` no `generateMetadata` de src/app/[locale]/layout.tsx (FR-017b, FR-021)
- [ ] T077 [P] Teste e2e de acessibilidade em tests/e2e/a11y.spec.ts: axe em home, 404 e terminal aberto nos dois locales, com 0 violações sérias ou críticas (FR-018, SC-004). Com `reducedMotion: "reduce"`, nessas mesmas páginas e depois de rodar `matrix` no terminal, `document.getAnimations()` não tem animações rodando (FR-019)
- [ ] T078 [P] Teste e2e de layout em tests/e2e/responsive.spec.ts: sem rolagem horizontal em 320, 768, 1280 e 2560 px; ícones nítidos com zoom de 200% (SC-005)
- [ ] T079 [P] Teste e2e em tests/e2e/progressive.spec.ts com `javaScriptEnabled: false`: todo o texto e os links da home continuam acessíveis
- [ ] T080 Rodar Lighthouse mobile na home (`npx lighthouse` sobre `npm start`) e ajustar até LCP < 2 s; registrar o resultado em specs/001-pixel-terminal-portfolio/quickstart.md (SC-003)
- [ ] T081 Rodar todos os gates do [quickstart.md](./quickstart.md) (`npm run lint && npx tsc --noEmit && npm run build`, `npm test`, `npm run test:e2e`) e corrigir as falhas
- [ ] T082 Teste com 5 pessoas para SC-001, SC-007 e SC-008 no site publicado; registrar os resultados em design/README.md
- [ ] T083 Deploy na Vercel e verificação dos redirecionamentos `/` → `/{locale}` em produção

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 0 (Protótipo)**: sem dependências; **bloqueia tudo** até o gate G-P (T011) e a exportação (T012)
- **Phase 1 (Setup)**: depende de T012
- **Phase 2 (Foundational)**: depende da Phase 1; bloqueia todas as histórias
- **US1 (Phase 3)** e **US2 (Phase 4)**: dependem só da Phase 2; podem rodar em paralelo
- **US3 (Phase 5)** e **US3b (Phase 6)**: adiadas; fora desta entrega
- **US4 (Phase 7)** e **US5 (Phase 8)**: dependem da Phase 2. As ligações com o terminal (T067, T070) dependem de T052
- **US6 (Phase 9)**: depende de T027 (catálogo com a logo)
- **Polish (Phase 10)**: depende das histórias desejadas

### Story Dependency Graph

```text
Protótipo (G-P) → Setup → Foundational ─┬─ US1 ─┐
                                        ├─ US2 ─┼─ (MVP)
                                        ├─ (US3 → US3b adiadas)
                                        ├─ US4 (T067 após US2)
                                        ├─ US5 (T070 após US2)
                                        └─ US6
                                                   → Polish
```

### Within Each User Story

Testes primeiro (devem falhar) → conteúdo e tipos → lógica pura → componentes → montagem na página.

---

## Parallel Examples

```text
# Phase 0, depois de T003:
T084 telas restantes na v2  →  T010 revisão  →  T011 gate  →  T012 exportação

# Phase 1:
T015 eslint  |  T016 vitest  |  T017 playwright  |  T018 launch.json

# US2, testes:
T039 parse-command  |  T040 command-registry  |  T041 navigation e2e  |  T042 locale e2e

# Depois da Phase 2, com mais de uma pessoa ou agente:
US1 (T032–T038, T085)  |  US2 (T039–T052)  |  US4 (T063–T066, T086)  |  US6 (T072–T074)
```

---

## Implementation Strategy

### MVP First

1. Phase 0 completa e aprovada (G-P)
2. Phases 1 e 2
3. US1 + US2, que juntas formam o MVP: home com identidade, navegação por menu e terminal, bilíngue
4. **Parar e validar**: quickstart cenários 1–5 e 7

### Incremental Delivery

1. MVP → deploy de preview
2. US4 + US5 (sobre, áreas, experiência, formação, CV e contato) → o portfólio pode substituir o portfolio-nb
3. US6 (favicon e OG finais) + Polish → produção
4. Fase futura: US3 + US3b (projetos e estudos de caso), quando houver projetos selecionados

---

## Notes

- Tarefas [P] mexem em arquivos diferentes e não dependem de tarefas incompletas
- Commit após cada tarefa ou grupo lógico
- Componentes KokonutUI (research R13) só entram se aprovados no gate G-P: ícones lucide são trocados pelos glifos de contorno, reduced-motion é obrigatório e o restilo usa os tokens do protótipo
- Não reaproveitar `theme-toggle.tsx`, `theme.ts` nem `stats-section.tsx` do portfolio-nb (tema só escuro; "Em números" saiu)
- Textos de exemplo (bio, áreas de atuação) devem ser trocados pelo texto real do usuário antes da produção
- IDs novos da v2 (T084–T086) foram acrescentados no fim da numeração para não renumerar as tarefas existentes
