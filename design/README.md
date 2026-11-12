# Design: Portfólio v2

Fonte da verdade visual para a implementação (Fase P, gate G-P).

- **Protótipo**: [canvas no Claude](https://claude.ai/artifact/KddAtAcAX75xReRb4hcq5i), versão 72 (2026-11-12)
- **Design system**: [Editorial Dark Tech](https://claude.ai/artifact/AeiLxGm9Bg3RVtRfpgSckd) (cores; a v2 usa só a parte escura)
- **Spec**: [specs/001-pixel-terminal-portfolio](../specs/001-pixel-terminal-portfolio/spec.md)

## Gate G-P (T011): aprovado em 2026-11-12

Aprovado pelo dono, depois da revisão T010.

| Decisão | Valor |
|---|---|
| Layout | Home v2 (pranchetas "Home v2", "Home v2 · EN" e "Mobile v2"), minimalista e toda escura |
| Fontes | Michroma (títulos, caixa alta), Outfit (texto e UI), JetBrains Mono (rótulos e terminal) |
| Cores | Editorial Dark Tech sem superfícies claras: `paper`, `ink`, `purple-deep`, `muted-paper` e `glow` ficam fora |
| Logo | Raio `#0B1315` com três goivadas sobre quadrado lavanda, sem mudança |
| Hero | Ilustração raster do dono (`artwork/hero-developer.webp`), números "4+ anos em produção" e "2 empresas" |
| Escopo | Projetos e estudos de caso adiados (US3, US3b); terminal sem `projects`, `open` e `g p` |
| KokonutUI | `type-writer` (hero; traz `motion`), `use-copy-to-clipboard` (copiar e-mail), `glitch-text` (título da 404), `command-button` (botão `>_`; adicionar reduced-motion antes de usar). `morphic-navbar` não entra: o sublinhado do item ativo é CSS |

Pranchetas de referência: Fundamentos v2, Marca, Glifos, Terminal (desktop e mobile), Estados v2, 404, Imagem de compartilhamento, Capa do LinkedIn, Home v2 (PT e EN) e Mobile v2. As pranchetas "Home v1 · Hero A" e os estudos de caso ficam só como histórico.

## Revisão T010 (2026-11-12)

Contraste WCAG calculado sobre os tokens:

| Par | Razão | Uso |
|---|---|---|
| white / bg | 18.78 | texto |
| white / card | 17.12 | texto |
| muted / bg | 7.44 | texto secundário, rótulos de 11–12px |
| muted / card | 6.79 | texto secundário |
| lavender / bg | 11.83 | texto, marcadores |
| bg sobre lavender | 11.83 | texto do botão sólido |
| violet / bg | 6.90 | anel de foco |
| violet / lavender | 1.71 | ⚠️ o anel encostado no botão sólido some; `outline-offset: 2px` é obrigatório |
| purple / bg | 4.44 | só texto ≥ 24px ou decoração |
| branco 40% / bg | 3.81 | borda de campo (≥ 3:1) |
| branco 20% / bg | 1.84 | só borda de botão com rótulo |
| branco 10% / bg | 1.30 | só divisória decorativa |

Encaixe da Michroma (largura medida: "NAIANDERSON" 1087px e "ACHEICONSULTA" 1212px a 100px). Em 320px a coluna útil tem 272px:

- Nome no hero a 30px fixo: 326px, **estourava**. Corrigido para `clamp(24px, 7.6vw, 30px)` abaixo de 768px (264px em 320px).
- Empresa a 26px fixo: 315px, **estourava**. Corrigido para `clamp(20px, 6.8vw, 26px)` abaixo de 768px (264px em 320px).
- Desktop: nome até 457px e empresa até 509px em 2560px, dentro das colunas.

A prancheta Mobile v2 tem 390px de largura, onde 30px ainda cabe; a regra nova vale para o código. Os tamanhos corrigidos estão em `tokens.json` e em research R8.

Não verificado: renderização real das pranchetas (a revisão foi por cálculo), teste da logo em 32px com pessoas (SC-008 fica para T082) e legibilidade com usuários.

## Exportação (T012)

| Arquivo | Origem |
|---|---|
| `tokens.json` | `tokens.json` do design system + decisões da v2 (fontes, escala da Michroma, raios, linhas, foco) |
| `artwork/logo.svg` | Componente `Art`, cena `logo` (120×120; id do clip prefixado `logo-`) |
| `artwork/glyphs/*.svg` | Componente `Glyph`: 22 glifos de contorno, 24×24, traço 1,5px, `currentColor` |
| `artwork/hero-developer.webp` | Asset `93c5a97d83895fa689afbb6e74c5a014` do canvas, 1672×941 |

Não há `artwork/illustrations/`: as cenas vetoriais antigas (capas de projeto e a da 404) não são usadas na v2. A 404 e a imagem de compartilhamento são composições de tipografia, logo e ilustração do hero.
