# Data Model: Portfólio Terminal Editorial Dark Tech

**Spec**: [spec.md](./spec.md) · **Research**: [research.md](./research.md) (R5, R6, R7)

Todo o conteúdo é estático, versionado no repositório e validado em tempo de build (type-check + teste de conteúdo). Não há persistência em servidor. O único estado do visitante é a preferência de idioma (cookie) e o histórico do terminal (memória da sessão).

## Tipos base

| Tipo | Definição | Regra |
|------|-----------|-------|
| `Locale` | `"pt-BR" \| "en"` | Fonte: `i18n/routing.ts` |
| `Localized<T>` | `{ "pt-BR": T; en: T }` | Ambas as chaves obrigatórias (FR-017); campo vazio permitido só como rascunho e cai no fallback (FR-017c) |
| `Slug` | `string` | `^[a-z0-9]+(-[a-z0-9]+)*$`, único por coleção, igual nos dois idiomas |
| `Url` | `string` | `https://` absoluto ou `mailto:` |
| `GlyphId` | chave do catálogo `Glyph` | Deve existir no catálogo de glifos |
| `IllustrationId` | chave do catálogo `Illustration` | Deve existir no catálogo de ilustrações |

## Entidades

### Profile (1)

| Campo | Tipo | Obrig. | Notas |
|-------|------|--------|-------|
| name / fullName | string | ✓ | "Naianderson Bruno" (migrado de `resume.ts`) |
| role | Localized<string> | ✓ | Hero e metadata |
| promptCommand | string | ✓ | Comando digitado após `~ $` no hero (hoje `whoami`); substitui `tagline`/`headlines` desde a v2 |
| bio | Localized<string> | ✓ | Seção `whoami` |
| location | string | – | |
| email | string | ✓ | Ação copiar (FR-015) |
| resumePath | Localized<path \| null> | ✓ | PDF do CV por idioma (FR-010a); `null` → usa o do outro idioma |
| stack | string[] | ✓ | Stack atual (Sobre) |
| heroImage | { src; alt: Localized<string> } | ✓ | Ilustração raster do hero (R7) |
| stats | { value: string; label: Localized<string> }[] | ✓ | Linha de números do hero; só dados reais (hoje "4+ anos em produção", "2 empresas") |

### Project (N) — ADIADO (US3)

> Adiado em 2026-11-12 junto com a US3/US3b. O modelo fica registrado para a fase futura e não é implementado agora.

| Campo | Tipo | Obrig. | Notas |
|-------|------|--------|-------|
| slug | Slug | ✓ | Endereço `/{locale}/projects/{slug}`; nome no terminal (`open {slug}`) |
| kind | `"own" \| "private"` | ✓ | `private` = projeto de empregador confidencial (FR-010c) |
| organization | string | – | Ex.: "TheMembers" |
| title | Localized<string> | ✓ | |
| summary | Localized<string> | ✓ | ≤ 160 caracteres (card + meta description) |
| tags | string[] | ✓ | ≥1; termos técnicos não traduzidos |
| cover | IllustrationId \| asset path | – | Projetos `private` só usam `IllustrationId`; ausente → glifo `folder` (edge case) |
| demoUrl / codeUrl | Url | – | Botão oculto quando ausente |
| featured | boolean | ✓ | Destaque na grade |
| order | number | ✓ | Único; define ordem e anterior/próximo |
| caseStudy | CaseStudy | – | Ausente → card não leva a página interna (US3b-3) |

### CaseStudy (0..1 por Project) — ADIADO (US3b)

| Campo | Tipo | Obrig. |
|-------|------|--------|
| overview | Localized<string> | ✓ |
| problem | Localized<string> | ✓ |
| role | Localized<string> | ✓ |
| process | Localized<string[]> (decisões, uma por item) | ✓ |
| stack | string[] | ✓ |
| gallery | { src; alt: Localized<string> }[] | – |
| outcome | Localized<string> | ✓ |

**Regra `private`**: quando `kind = "private"`, `demoUrl`, `codeUrl` e imagens reais são proibidos. `cover` e `gallery` só podem usar `IllustrationId` (ilustrações esquemáticas do catálogo), e um teste de conteúdo valida isso.

Navegação anterior/próximo é **derivada** (projetos com `caseStudy`, ordenados por `order`), não armazenada.

### Service (3) — "O que eu faço"

| Campo | Tipo | Obrig. |
|-------|------|--------|
| key | string | ✓ (único) |
| title | Localized<string> | ✓ |
| summary | Localized<string> | ✓ |
| items | Localized<string[]> | ✓ (≥1) |

### Experience (N)

| Campo | Tipo | Obrig. | Notas |
|-------|------|--------|-------|
| role | Localized<string> | ✓ | |
| organization | string | ✓ | |
| start / end | `YYYY-MM` / `YYYY-MM \| null` | ✓ / – | `null` = atual; ordenação reversa por `start` |
| summary | Localized<string> | ✓ | Uma frase sobre a empresa ou o produto |
| stack | string[] | ✓ | ≥1; termos técnicos não traduzidos |
| deliverables | Deliverable[] | ✓ | ≥1; ordem de exibição (numeradas 01, 02…) |

**Deliverable**: `title` (Localized<string>), `description` (Localized<string>). Entregas da TheMembers não têm links, capturas de tela nem nomes de clientes (FR-010d).

### Education (N)

| Campo | Tipo | Obrig. |
|-------|------|--------|
| course | Localized<string> | ✓ |
| school | string | ✓ |
| hours | number | ✓ |
| year | number | ✓ (ordenação reversa) |
| completedOn | `YYYY-MM` | – (desempate quando o ano é igual; ex.: Rocketseat PHP 2026-11, Testes e Arquitetura 2026-07) |
| topics | string[] | – (assuntos principais, sem tradução; ex.: Laravel, MVC, Pest) |

### SocialLink (N)

`network` (string), `url` (Url), `icon` (GlyphId), `label` (Localized<string>, para leitores de tela).

### TerminalCommand (N) — ver [contracts/terminal-commands.md](./contracts/terminal-commands.md)

| Campo | Tipo | Obrig. | Notas |
|-------|------|--------|-------|
| name | string | ✓ | Inglês, minúsculo, único |
| aliases | string[] | – | Inclui o equivalente em PT; únicos no registro |
| shortcut | string | – | Ex.: `g p`; único |
| description | Localized<string> | ✓ | Linha do `help` |
| action | `navigate(path)` \| `setLocale(arg)` \| `copyEmail` \| `downloadCv` \| `print(Localized<lines>)` \| `effect(id)` \| `help` \| `clear` \| `close` | ✓ | |
| hidden | boolean | ✓ | `true` = easter egg: fora do `help` e não conta na invariante do menu (FR-012f) |

### Glyph (catálogo)

| Campo | Tipo | Regra |
|-------|------|-------|
| id | string | Único |
| viewBox | string | Grade-base comum a todos (24×24) |
| paths | string[] | Contorno com traço de 1,5px (`fill="none"`, `stroke="currentColor"`, pontas e junções arredondadas); `caret` e `play` podem ser cheios (FR-004) |
| decorative | boolean | `true` → `aria-hidden` (FR-020); senão exige rótulo |

### Illustration (catálogo) / Logo

| Campo | Tipo | Regra |
|-------|------|-------|
| id | string | Único (ex.: `logo`, `lost` (404), `og`) |
| svg | componente SVG exportado do protótipo | Só cores da paleta (FR-001); sem filtros; ids de `<defs>` prefixados por ilustração |
| decorative | boolean | Ilustrações `true` (`aria-hidden`); a logo tem rótulo acessível |

## Estado do visitante

| Estado | Onde | Transições |
|--------|------|-----------|
| Locale ativo | URL (`/{locale}/…`) + cookie de locale do next-intl | 1ª visita: `Accept-Language` → `pt-BR` se PT, senão `en` → troca manual grava cookie → visitas seguintes usam cookie |
| Terminal | Memória do cliente | `fechado` ⇄ `aberto` (botão, atalho, Esc, comando `exit`); histórico de comandos vive enquanto a aba estiver aberta |
| Toast "email copiado" | Memória do cliente | `oculto → sucesso\|erro → oculto` (timeout) |

## Invariantes validadas por teste

1. Todo `Localized` tem as duas chaves (vazias geram aviso de build e usam fallback).
2. `Service.key`, `TerminalCommand.name/aliases/shortcut` únicos; experiências ordenadas por `start` decrescente e formação por `year`/`completedOn` decrescente.
3. Entre 3 e 5 comandos com `hidden: true`; nenhum deles aparece na saída do `help`.
4. Toda experiência tem ≥1 entrega e ≥1 item de stack; `Profile.stats` não tem número de projetos enquanto a US3 estiver adiada.
5. Todo destino de `navigate` do registro existe como item do menu ou link visível (SC-011).
6. Todo `GlyphId` e `IllustrationId` referenciado existe no catálogo; nenhuma arte usa cor fora da paleta.
