<!--
Sync Impact Report
- Version change: 1.1.1 → 1.2.0 (MINOR: restrição de paleta redefinida; nenhum princípio removido)
- Modified principles:
  - I. Design Antes do Código: estética "terminal, HUD" → "terminal, editorial"
- Modified sections: "Restrições Técnicas" — paleta azul/preto/gelo → paleta do design system
  Editorial Dark Tech (fundo #0B1315, lavanda #D3C7F3, roxo #8B5CF6, paper #F2EFE9); título
- Motivo: o dono reformulou todo o design system em 2026-11-11 (conceito v4)
- Templates requiring updates: none
- Artefatos revistos: specs/001-pixel-terminal-portfolio/{spec,plan,research,data-model,tasks,quickstart}.md,
  checklists/requirements.md
- Deferred TODOs: none

Histórico anterior:
- Version change: 1.1.0 → 1.1.1 (PATCH: só redação; nenhuma regra nova ou removida)
- Modified principles:
  - I. Design Antes do Código: estética retrô "terminal, gravura" → "terminal, HUD"
- Modified sections: título da constituição
- Motivo: o dono substituiu o conceito v2 (linogravura) pelo conceito v3 Functional HUD em 2026-11-11;
  paleta, logo e demais regras continuam as mesmas
- Templates requiring updates: none
- Artefatos revistos: specs/001-pixel-terminal-portfolio/{spec,plan,research,data-model,tasks,quickstart}.md,
  checklists/requirements.md
- Deferred TODOs: none

Histórico anterior:
- Version change: 1.0.0 → 1.1.0 (MINOR: restrição técnica de paleta redefinida e princípios I, II e IV
  ajustados à nova direção de arte; nenhum princípio removido)
- Modified principles:
  - I. Design Antes do Código: "pixel art"/"matrizes de pixel" → arte (logo, glifos, ilustrações);
    estética retrô agora "terminal e gravura"
  - II. Acessibilidade e Legibilidade Inegociáveis: "pixel art nítida" → "glifos e ilustrações nítidos"
  - IV. Código Limpo e Responsabilidade Única: exemplo de pasta `pixel-art/` → `artwork/`
- Modified sections: "Restrições Técnicas" — paleta roxo/laranja → azul #3352EF, preto #020202, gelo #F0F7FF
- Added/removed sections: none
- Motivo: o dono descartou a direção pixel art 8-bit e aprovou o conceito v2 (linogravura) em 2026-11-11
- Templates requiring updates: none (leem a constituição em tempo de execução)
- Artefatos revistos: specs/001-pixel-terminal-portfolio/{spec,plan,research,data-model,tasks,quickstart}.md,
  contracts/terminal-commands.md
- Deferred TODOs: none
-->

# Portfólio Terminal Editorial Dark Tech Constitution

## Core Principles

### I. Design Antes do Código

- Toda mudança visual relevante (nova tela, novo componente de identidade, mudança de paleta,
  tipografia, logo, glifos ou ilustrações) MUST ser prototipada no Claude (Design Artifact) e aprovada
  explicitamente pelo dono antes de virar código de produção.
- Tokens de cor, fontes, logo, glifos e ilustrações aprovados MUST ser exportados do protótipo e usados
  como fonte única; valores visuais não podem ser inventados direto no código.
- A estética (terminal, editorial) MUST NOT prejudicar a usabilidade: layout, hierarquia e
  navegação seguem padrões modernos.

**Rationale**: o projeto é guiado por direção artística. Decidir o visual num canvas é mais barato
que iterar componentes, e evita que a identidade se perca entre implementações.

### II. Acessibilidade e Legibilidade Inegociáveis

- Todo texto MUST ter contraste mínimo de 4,5:1 (3:1 para texto grande) contra o fundo.
- Toda funcionalidade MUST ser utilizável só com teclado, com foco visível.
- Animações e efeitos MUST respeitar `prefers-reduced-motion`.
- Ícones informativos MUST ter texto alternativo; decorativos MUST ficar ocultos para leitores
  de tela.
- Conteúdo e links MUST continuar acessíveis quando os recursos interativos falharem.
- Glifos e ilustrações MUST continuar nítidos em qualquer densidade de tela e com zoom de até 200%.

**Rationale**: um portfólio é avaliado por recrutadores com contextos e ferramentas diversos;
efeito visual nunca justifica excluir um visitante.

### III. Paridade Bilíngue

- Todo conteúdo e todo texto de interface MUST existir em português (pt-BR) e inglês (en).
- Cada idioma MUST ter endereço próprio e compartilhável; trocar de idioma MUST manter a página
  atual.
- Uma tradução ausente MUST cair no outro idioma, nunca em espaço vazio ou chave crua.
- Uma mudança de conteúdo só está pronta quando os dois idiomas estão atualizados.

**Rationale**: o público é nacional e internacional; um idioma de segunda classe passa descuido.

### IV. Código Limpo e Responsabilidade Única

- Cada unidade (função, componente, módulo, pasta) MUST ter uma responsabilidade descritível numa
  frase sem "e". Conteúdo, regras de domínio, lógica pura e apresentação ficam em lugares
  separados.
- Pastas MUST ser nomeadas por domínio (`terminal/`, `artwork/`, `content/`); pastas genéricas
  como `utils/`, `helpers/` ou `common/` são proibidas.
- Mudanças MUST ser cirúrgicas: o menor diff que resolve a tarefa, sem refatorações não pedidas e
  sem variantes de arquivo (`_v2`, `_new`, `_copy`). Código órfão pela mudança MUST ser removido.
- Toda API, opção ou chave de configuração usada MUST existir na versão instalada da dependência,
  verificada na documentação local (ex.: `node_modules/next/dist/docs/`), nunca de memória.
- Dependências novas MUST ser justificadas pelo que resolvem que o código existente não resolve.
- Erros MUST NOT ser engolidos; falhas esperadas são modeladas como valores.

**Rationale**: o projeto é mantido por uma pessoa e evolui com agentes de IA; código coeso e
verificável é o que mantém essa colaboração segura.

### V. Verificação com Evidência

- Todo critério de sucesso verificável automaticamente MUST ter teste: lógica pura com testes
  unitários; fluxos de usuário, acessibilidade e responsividade com testes ponta a ponta.
- Testes MUST ser determinísticos e focados em comportamento. Um teste que falha MUST NOT ser
  enfraquecido, pulado ou apagado para passar.
- Nenhuma tarefa é dada como concluída sem evidência: o comando executado e o resultado. O que não
  foi verificado MUST ser declarado.

**Rationale**: "funciona na minha máquina" não é critério de pronto; a evidência torna cada entrega
auditável.

## Restrições Técnicas

- Stack: Next.js (App Router) + React + TypeScript em modo strict + Tailwind CSS + next-intl, nas
  versões fixadas no `package.json`. Trocar de framework exige emenda a esta constituição.
- Saída estática (SSG); sem backend, banco de dados, área administrativa ou login.
- Tema exclusivamente escuro (fundo `#0B1315`); a paleta é a do design system Editorial Dark Tech
  (https://claude.ai/artifact/AeiLxGm9Bg3RVtRfpgSckd): `card` `#141D20`, `paper` `#F2EFE9`, `white`, `ink` `#11181C`,
  `lavender` `#D3C7F3`, `purple` `#8B5CF6`, `violet` `#A78BFA` e derivados criados só para contraste.
  Cores fora desse `tokens.json` exigem mudança aprovada no design system.
- Conteúdo versionado no repositório, em módulos tipados validados no build.
- Sem coleta de dados de visitantes (analytics, rastreadores) sem emenda explícita; a única
  preferência guardada é o idioma.
- Meta de performance: conteúdo principal visível em menos de 2 s em conexão móvel 4G.

## Fluxo de Desenvolvimento

- Toda feature segue o fluxo Spec Kit: `specify` → `clarify` → `plan` → `tasks` → `analyze` →
  `implement`.
- O "Constitution Check" do plano MUST passar antes da pesquisa e ser reavaliado após o design.
  Violações MUST ser justificadas em "Complexity Tracking" ou corrigidas.
- Gates obrigatórios antes de integrar uma mudança: lint, type-check, build, testes unitários e
  testes ponta a ponta.
- Todo trabalho acontece em branch própria; commits pequenos e atômicos, com mensagens no padrão
  Conventional Commits.

## Governance

- Esta constituição prevalece sobre qualquer outra prática do projeto. Em conflito, spec, plano
  ou tarefas MUST ser ajustados, não a interpretação do princípio.
- Emendas: proposta escrita com motivação e impacto, aprovação do dono do projeto, atualização
  desta versão e revisão dos artefatos afetados (specs, planos e tarefas ativos).
- Versionamento semântico: MAJOR para remoção ou redefinição incompatível de princípio; MINOR para
  princípio ou seção nova ou expansão material; PATCH para esclarecimentos e redação.
- Conformidade: todo `/speckit-plan` avalia esta constituição no Constitution Check, e todo
  `/speckit-analyze` trata violações de MUST como críticas.

**Version**: 1.2.0 | **Ratified**: 2026-11-10 | **Last Amended**: 2026-11-11
