# Research: Portfólio Terminal Editorial Dark Tech

**Feature**: [spec.md](./spec.md) · **Plan**: [plan.md](./plan.md) · **Date**: 2026-11-10

Base analisada: portfólio atual em `~/Documentos/meus-projetos/front-end/portfolio-nb` (Next.js 16.4.3, React 19.3, next-intl 4.14.9, Tailwind CSS 4, TypeScript 5; sem testes; tema claro/escuro; PT-BR/EN com prefixo de locale; conteúdo em `app/_content/resume.ts` + `messages/*.json`).

---

## R1. Ferramenta e fluxo do protótipo (prioridade do usuário)

- **Decision**: Fazer o protótipo visual primeiro, como um **Design Artifact** no Claude (o Claude Design agora vive dentro do Claude; o claude.ai/design standalone encerra em 14/12/2026). O protótipo é aprovado pelo usuário **antes** de qualquer código de produção (gate G-P).
- **Rationale**: A feature é dirigida por direção artística (moodboard + logo). Validar paleta, tipografia, arte e o terminal num canvas é muito mais barato que iterar em componentes React. O protótipo também vira a fonte dos tokens (cores, espaçamentos, fontes) e da logo, dos glifos e das ilustrações.
- **Escopo do protótipo** (telas/frames):
  1. Folha de marca: logo raio (128/64/32/16 px), paleta e tokens, tipografia.
  2. Folha de glifos de contorno, selo verificado, padrões decorativos e galeria de ilustrações.
  3. Home desktop e mobile **v2** (FR-000), escolhida em 2026-11-12: hero com ilustração, nome em Michroma e números; sobre; o que eu faço; experiência com entregas; formação; contato. Menu em linha com sublinhado no item ativo. A home v1 (hero A tipográfico) fica no canvas como histórico.
  4. Terminal interativo aberto (desktop e mobile), incluindo `help` (com a dica de segredos), `command not found` e a saída do `neofetch`.
  5. *(Adiado com a US3)* Projetos (grade de cards, card sem imagem, lista vazia) e estudo de caso. As pranchetas v1 ficam como histórico.
  7. Contato (copiar e-mail + toast).
  8. 404 estilo terminal; prévia de compartilhamento (OG 1200×630).
- **Alternatives considered**: Figma (fora do fluxo do usuário); prototipar direto em código (mais lento para explorar estética, mistura decisão visual com engenharia).

## R2. Base de código: novo projeto vs. evoluir `portfolio-nb`

- **Decision**: Implementar em **`portfolio-v10`** (este repositório) como projeto novo, **reaproveitando a stack e o conteúdo** do `portfolio-nb`: mesma versão de Next/React/next-intl/Tailwind, mesma configuração de i18n (`i18n/routing.ts`, `request.ts`, `proxy.ts`, movidos para `src/` porque o Next exige o proxy no mesmo nível de `app/`), e migração dos dados de `resume.ts` e `messages/*.json`.
- **Rationale**: A identidade visual muda por completo (só tema escuro, Editorial Dark Tech, terminal); quase nenhum componente visual sobrevive. A parte reutilizável (i18n, conteúdo, `TypedHeadline` com `prefers-reduced-motion`) é pequena e bem isolada. O `portfolio-nb` continua funcionando até o v10 ir ao ar.
- **Alternatives considered**: Refatorar `portfolio-nb` in-place — diffs enormes misturando remoção de tema claro, redesign e novas rotas; histórico confuso.
- **Removido intencionalmente**: `theme-toggle.tsx`, `theme.ts`, `THEME_INIT_SCRIPT`, variantes `[data-theme]` (spec: só dark).

## R3. Stack técnica

- **Decision**: Next.js 16.4.3 (App Router, `cacheComponents`), React 19.3, TypeScript 5 strict, Tailwind CSS 4 (tokens via `@theme inline`), next-intl 4.14.9. Saída 100% estática (SSG) via `generateStaticParams` para os locales.
- **Rationale**: Stack que o usuário já domina e já usa; o `AGENTS.md` do projeto atual alerta que esta versão do Next tem breaking changes — consultar `node_modules/next/dist/docs/` antes de escrever código.
- **Alternatives considered**: Astro (ótimo para estático, mas troca de stack sem ganho real dado que o terminal é interativo).

## R4. i18n bilíngue (FR-017, 017a–c)

- **Decision**: Manter `locales: ["pt-BR", "en"]`, `localePrefix: "always"`, `defaultLocale: "pt-BR"`. Detecção pelo cabeçalho `Accept-Language` na primeira visita e cookie de locale lembrando a escolha manual (comportamento padrão do middleware do next-intl — `localeDetection`, existente em `next-intl/dist/types/routing/config.d.ts`). Seletor troca para o **mesmo pathname** no outro locale (hoje o switcher atual sempre volta para `/` — corrigir). Fallback de mensagem ausente com `getMessageFallback` (existe em next-intl 4.14.9) retornando o texto do outro locale. `alternates.languages` (hreflang) no `generateMetadata`.
- **Ajuste à spec**: a spec diz "inglês nos demais casos" na primeira visita; com `defaultLocale: "pt-BR"` o fallback seria PT. **Decisão**: `defaultLocale: "en"` para cumprir FR-017a (navegador não-PT → EN), mantendo `pt-BR` detectado para quem tem PT no navegador.
- **Alternatives considered**: i18n sem prefixo (pior para SEO/compartilhamento, viola FR-017b).

## R5. Conteúdo e estudos de caso (FR-010, FR-014, FR-016, SC-009)

- **Decision**: Conteúdo em **módulos TypeScript tipados** em `src/content/` (perfil, áreas de atuação, experiência com entregas, formação, links, comandos), com campos traduzíveis no formato `{ "pt-BR": string; en: string }`. Strings de UI continuam em `messages/*.json`. Entregas são listas estruturadas dentro de cada experiência, não MDX.
- **Rationale**: Um único lugar para atualizar (FR-016), type-check garante que todo projeto tem os campos obrigatórios e as duas línguas, zero dependência nova. O texto é curto e estruturado, então markdown livre não traz ganho.
- **Alternatives considered**: MDX (mais flexível para texto longo, mas exige pipeline e validação extra); CMS headless (fora do escopo — spec diz sem área administrativa).
- **Conteúdo inicial (revisto em 2026-11-12)**: os antigos projetos do `portfolio-nb` viram **entregas** dentro da experiência de cada empresa. AcheiConsulta: landing page e painel do profissional. TheMembers: Dashboard Admin & White Label, comunidade interativa, player de vídeo (Plyr) e dashboard de pós-venda, sem capturas de tela nem links. Formação (5 cursos, ver spec) e o CV (`/naianderson-bruno-front-end.pdf`, hoje só um arquivo) também são migrados; é preciso criar a versão do CV no outro idioma, e até ela existir vale o fallback do FR-010a. Do antigo `stats`, só entram no hero os números reais "4+ anos em produção" e "2 empresas". Projetos e estudos de caso ficam para a fase futura.

## R6. Terminal interativo e atalhos (FR-012a–e)

- **Decision**: Componente cliente isolado (o terminal) aberto por botão no header e atalho global (`Ctrl/⌘ + K` e `/`; não usar `` ` ``, que é tecla morta no teclado ABNT2). Registro de comandos **declarativo** (`src/content/commands.ts`), parser puro (`parseCommand(input, registry) → Result`) e executor que só chama `router.push` / troca de locale / copiar e-mail. Atalhos ignorados quando o foco está em `input`, `textarea` ou `contenteditable`. Diálogo acessível (`<dialog>` nativo com `showModal()`, foco preso, Esc fecha, foco volta ao gatilho). Histórico com ↑/↓ e autocomplete com Tab.
- **Rationale**: Parser puro é testável unitariamente; o registro declarativo garante SC-011 por construção (teste que compara destinos do registro com links do menu).
- **Alternatives considered**: Biblioteca `cmdk` (estética de command palette, não de terminal; dependência extra); xterm.js (pesado, ruim para acessibilidade).

## R7. Arte: logo, glifos e ilustrações (FR-004, FR-007–009)

- **Decision**: Logo, glifos e ilustrações vetoriais em **SVG inline exportado do protótipo**, em `src/artwork/`: `Logo` (raio `#0B1315` com três goivadas sobre quadrado lavanda arredondado), `Glyph` (catálogo de glifos de contorno: traço 1,5px, pontas e junções arredondadas, `stroke="currentColor"`) e `Illustration` (cenas da 404 e da OG, decorativas, `aria-hidden`). **Exceção (2026-11-12)**: a ilustração do hero é raster, uma gravura preto e branco fornecida pelo dono; entra como WebP via `next/image` (tamanhos responsivos, `priority` por ser candidata a LCP), com texto alternativo localizado. Favicon via convenção do App Router (`app/icon.svg` + `apple-icon.png`), imagem social via `opengraph-image.tsx` (`ImageResponse`).
- **Rationale**: Vetor nítido em qualquer zoom/densidade (edge case de zoom 200%), cores tokenizadas, sem pacote de ícones e sem filtros SVG.
- **Alternatives considered**: vetorizar a gravura do hero (perde o traço fino e pesa mais que o WebP); pacotes de ícones prontos (spec exige ícones próprios).

## R8. Tipografia

- **Decision (layout v2, 2026-11-12)**: Títulos em **Michroma** (peso único 400, só caixa alta, entrelinha 1.12). Ela é cerca de 2,5× mais larga que uma condensada, então os tamanhos são limitados pela largura da coluna: títulos de seção `clamp(28px, 2.9vw, 42px)`, nome no hero `clamp(30px, 2.95vw, 42px)` no desktop e `clamp(24px, 7.6vw, 30px)` abaixo de 768px, empresa na experiência `clamp(26px, 2.75vw, 40px)` no desktop e `clamp(20px, 6.8vw, 26px)` abaixo de 768px (revisão T010: com 30px e 26px fixos, "NAIANDERSON" e "ACHEICONSULTA" estouravam a coluna de 272px em 320px), título do contato `clamp(28px, 3.6vw, 52px)`, números 32px (24px no mobile), subtítulos 20px. Texto e UI em **Outfit** 300/400/500 (16–18px / 1.6); metadados, rótulos e terminal em **JetBrains Mono** 400/500 (caixa alta, 11–12px). Via `next/font/google`, com fallback `"Eurostile", Arial, sans-serif` para a Michroma. Substitui a Newsreader do conceito v4.
- **Rationale**: FR-002 (terminal) + FR-003 (texto longo legível, por isso a Michroma nunca vai em texto corrido) + edge case de fonte indisponível e de nomes longos ("NAIANDERSON", "ACHEICONSULTA") sem rolagem horizontal.

## R9. Paleta e contraste (FR-001, FR-018, SC-004)

- **Decision (conceito v4, mantida na v2)**: paleta do briefing do dono — `bg` `#0B1315`, `card` `#141D20`, `paper` `#F2EFE9`, `white` `#FFFFFF`, `ink` `#11181C`, `lavender` `#D3C7F3`, `purple` `#8B5CF6`, `violet` `#A78BFA` (selo). Derivados criados para contraste: `purple-deep` `#6D28D9`, `muted` `#9AA5A8`, `muted-paper` `#5B6468`, bordas branco a 10%, 20% e 40%.
- **Verificação** (WCAG, calculado em 2026-11-11): white/bg 18.78:1; ink/paper 15.62:1; bg sobre lavender 11.83:1; violet/bg 6.9:1; muted/bg 7.44:1; muted-paper/paper 5.28:1; purple-deep/paper 6.19:1. Limites: purple/bg **4.44:1** e white/purple **4.23:1** (só ≥ 24px ou decoração); violet/paper **2.37:1** (proibido); borda branco 20% **1.84:1** (só em botão com rótulo; campos usam 40%, 3.81:1). Anel de foco violeta: 6.9:1 sobre bg, mas 1.71:1 encostado no botão lavanda, por isso o `outline-offset` de 2px é obrigatório. Na v2 não há superfície `paper`, então as combinações sobre `paper` não se aplicam à home.

## R10. Efeitos e movimento (FR-006, FR-019)

- **Decision (layout v2)**: Digitação + cursor (reaproveitar lógica do `TypedHeadline`); transições curtas de hover e do sublinhado do item ativo. A v2 não usa padrões decorativos (halftone, anéis, molduras, halo); se alguma tela futura usar, ficam `aria-hidden`. Animações desligadas em `@media (prefers-reduced-motion: reduce)`. Conteúdo é renderizado no servidor, efeitos são progressive enhancement (edge case "recursos interativos indisponíveis").

## R11. Testes e verificação

- **Decision**: **Vitest** (unit: parser de comandos, resolução de fallback de tradução, validação do conteúdo, invariante menu⊇terminal) + **Playwright** (e2e: navegação por clique/teclado/terminal, troca de idioma mantendo a rota, copiar e-mail, 404, mobile 320px) + **@axe-core/playwright** (acessibilidade e contraste) + **Lighthouse CI** (performance móvel, SC-003). `next build` + `eslint` + `tsc --noEmit` como gates.
- **Rationale**: O projeto atual não tem testes; a spec tem critérios verificáveis automaticamente (SC-002, 004, 005, 006, 010, 011, 012).

## R12. Hospedagem

- **Decision**: Vercel (o projeto atual já segue o template Vercel/Next). Saída estática; sem backend.

## R13. Componentes animados do KokonutUI (sugestão do usuário, 2026-11-11)

- **Decision**: Usar o **KokonutUI** como fonte **opcional, caso a caso** de componentes animados. Ele não é um pacote npm: é um registry do shadcn/ui, e cada componente é copiado para o projeto com `npx shadcn@latest add @kokonutui/<nome>`. Pede Tailwind v4 (já no plano), o helper `cn` e, em alguns componentes, `motion` e/ou `lucide-react`. Os componentes são instalados em `src/components/kokonutui/` (alias configurado no `components.json`); o código vira nosso e é restilizado com os tokens do protótipo.
- **Regras de adoção** (constitution IV — dependências justificadas; II — acessibilidade):
  1. Só entra um componente que resolve algo do plano melhor que o código próprio equivalente.
  2. Precisa respeitar `prefers-reduced-motion`. Se não respeitar, adicionar antes de usar.
  3. Ícones `lucide-react` são trocados pelos glifos de contorno do catálogo; preferir componentes sem `lucide-react`.
  4. `motion` só é adicionado se um componente adotado exigir, e o componente deve ser carregado de forma que não atrase o conteúdo principal (SC-003).
  5. Efeitos em canvas ficam fora de texto longo e pausam quando saem da tela.
- **Candidatos verificados no registry** (`https://kokonutui.com/r/<nome>.json`, em 2026-11-11):

| Componente | Uso no portfólio | Deps | Reduced-motion |
|------------|------------------|------|----------------|
| `type-writer` | Digitação do hero, com "erros de digitação" corrigidos, bem no tom de terminal; alternativa ao port do `TypedHeadline` | `motion` | ✅ |
| `glitch-text` | Título da 404 `command not found` (alinhado à voz de terminal; avaliar) | nenhuma | ✅ |
| `split-flap-text` | Títulos de seção em estilo letreiro (nunca para status de disponibilidade) | nenhuma | ✅ |
| `morphic-navbar` | Indicador animado do item ativo no menu-comando | `motion` | ✅ |
| `command-button` | Botão `>_` do terminal com o atalho em teclas (`Ctrl` `K`) | nenhuma | ❌, adicionar antes de usar |
| `use-copy-to-clipboard` | Hook do botão de copiar e-mail e do comando `email` | nenhuma | n/a |

- **Rejeitados**: `action-search-bar` (estética de command palette, não de terminal; mesma razão de rejeitar o `cmdk` em R6) e os componentes de 3D/física pesados (custo de performance sem ganho para o conceito).
- **Decisão final por componente**: tomada no protótipo (T002, efeitos), confirmada no gate G-P e registrada em design/README.md.
