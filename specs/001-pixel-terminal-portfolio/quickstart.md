# Quickstart: validar o Portfólio Terminal Editorial Dark Tech

**Referências**: [routes](./contracts/routes.md) · [terminal](./contracts/terminal-commands.md) · [data-model](./data-model.md)

## Fase P — Protótipo (antes de qualquer código)

1. Abrir o Design Artifact do protótipo no Claude.
2. Conferir que existem as pranchetas "Home v2" e "Mobile v2" e os demais frames listados em [research.md R1](./research.md#r1-ferramenta-e-fluxo-do-protótipo-prioridade-do-usuário).
3. Checar a logo em 16 e 32 px (SC-008) e a paleta contra os valores de contraste de R9.
4. **Gate G-P** (aprovado em 2026-11-12, ver design/README.md): o usuário aprova o protótipo explicitamente. Tokens, fontes, logo, glifos e ilustrações aprovados viram a fonte para a implementação.

## Pré-requisitos (implementação)

- Node.js 20+ e npm
- Navegadores do Playwright: `npx playwright install`

## Rodar

```bash
npm install
```

```bash
npm run dev
```

Abrir `http://localhost:3000` → deve redirecionar para `/pt-BR` ou `/en` conforme o idioma do navegador.

## Gates automáticos

```bash
npm run lint && npx tsc --noEmit && npm run build
```

```bash
npm test
```

(Vitest: parser do terminal, invariantes de conteúdo, fallback de tradução.)

```bash
npm run test:e2e
```

(Playwright + axe: cenários abaixo.)

## Cenários de validação ponta a ponta

| # | Cenário | Esperado | Spec |
|---|---------|----------|------|
| 1 | Abrir `/en` em 1280×800 | Logo, nome, papel, tagline e CTA visíveis sem rolar | US1-1 |
| 2 | Emular `prefers-reduced-motion: reduce` | Tagline aparece completa, sem digitação nem cursor piscando | US1-3, FR-019 |
| 3 | Navegar só com Tab/Enter por todo o menu | Todos os itens alcançáveis, foco visível | US2-2, SC-006 |
| 4 | `Ctrl+K` → `sobre` → Enter | Vai para `#about`, terminal fecha | US2-4 |
| 5 | Terminal → `help`; → `xyz` | Lista de comandos; `command not found` e terminal continua aberto | US2-5/6 |
| 6 | Rolar a home de `/pt-BR` | Seções na ordem Início, Sobre, O que eu faço, Experiência, Formação, Contato; cada experiência com stack e entregas; formação do curso mais novo ao mais antigo | FR-010, FR-010d, US4 |
| 7 | Em `/pt-BR#contact`, trocar para EN | Vai para `/en#contact` | FR-017b, SC-012 |
| 8 | Contato → copiar e-mail | Clipboard contém o e-mail, toast `✓` | US5-1 |
| 9 | Abrir `/en/nao-existe` | 404 estilo terminal com link de volta | FR-013 |
| 10 | Viewport 320px e 2560px | Sem rolagem horizontal | SC-005 |
| 11 | axe em todas as rotas | 0 violações sérias/críticas; contraste ok | FR-018, SC-004 |
| 12 | Lighthouse mobile na home | LCP < 2 s (4G simulado) | SC-003 |
| 13a | Terminal → `help`, depois `neofetch` | `help` não lista o `neofetch` e mostra a dica de segredos; `neofetch` mostra a logo e o resumo | FR-012f |
| 13b | Terminal → `cv` em `/en` | Baixa o PDF em EN (ou em PT, se não houver EN) | FR-010a |
| 13c | Hero em 1280×800 e 375×812 | Ilustração com texto alternativo, nome sem quebra no meio da palavra, números "4+" e "2", sem número de projetos | FR-000 |
| 13 | Adicionar uma entrega em `src/content/experience.ts` e rebuild | Aparece na experiência sem mexer em layout | SC-009 |

## Validação manual (com pessoas)

SC-001, SC-007 e SC-008: teste rápido com 5 pessoas usando o protótipo aprovado (Fase P) e, depois, o site publicado.
