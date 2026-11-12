# Feature Specification: Portfólio Terminal Editorial Dark Tech (dark mode, editorial minimalista, layout moderno)

**Feature Branch**: `001-pixel-terminal-portfolio`

**Created**: 2026-11-10

**Status**: Draft

**Input**: User description: "eu quero um portfolio darkmode, com icones no estilo 8bits, e textos e menus inspirados em terminal, mas usando um layout moderno. Minha logo eu quero que seja um raio em 8bits com um 'degradê' usando o 8bit das cores principais. A imagem é um painel semântico do conceito artístico que quero seguir. A imagem do raio é o estilo da logo que quero criar. Cores principais: purple: #BD7EF0, orange: #ED7B3F"

## Direção Artística (referência para todas as histórias)

**Layout v2 sobre o conceito v4 (Editorial Dark Tech), aprovado em 2026-11-12.** As cores continuam as do design system [Editorial Dark Tech](https://claude.ai/artifact/AeiLxGm9Bg3RVtRfpgSckd), aprovado em 2026-11-11. A home v2 do protótipo ([canvas](https://claude.ai/artifact/KddAtAcAX75xReRb4hcq5i), pranchetas "Home v2" e "Mobile v2") substitui a home v1 (hero A tipográfico) como referência de layout. A v1 fica no canvas só como histórico. O conceito v3 (Functional HUD), o v2 (linogravura) e a direção pixel art 8-bit foram descartados.

- **Atmosfera**: Dark Tech minimalista. Página toda escura, com muito respiro, hierarquia por tipografia e alinhamento, e quase nenhuma caixa.
- **Detalhes**: linhas finas (branco a 10% e 20%) como divisórias, marcadores quadrados lavanda em listas e rótulos de seção (`■ SOBRE`), cursor de terminal. Sem cards com borda pesada, sem halo e sem padrões decorativos (halftone, anéis e molduras do design system ficam disponíveis, mas a v2 não usa).
- **Terminal como voz**: textos, rótulos e menus escritos como comandos, prompts e saídas de terminal (ex.: `~ $ whoami`, cursor piscando).
- **Tipografia**: títulos em **Michroma** (grotesca extra-larga, só em caixa alta, peso único); texto corrido e interface em **Outfit**; metadados, rótulos e terminal em **JetBrains Mono**. Títulos de seção podem ter uma palavra em lavanda.
- **Layout moderno**: container de até 1344px, margem de 24px (mobile) a 48px (desktop), cerca de 144px entre seções. Botões com raio de 8px e texto em caixa alta (sólido lavanda ou contorno). Cabeçalho em linha simples com divisória embaixo; item ativo em lavanda sublinhado.
- **Paleta**: `bg` `#0B1315`, `card` `#141D20`, `white` `#FFFFFF`, `lavender` `#D3C7F3`, `purple` `#8B5CF6`, `violet` `#A78BFA` (anel de foco) e os derivados de contraste (`muted` `#9AA5A8`, bordas translúcidas). `paper` `#F2EFE9` e `ink` `#11181C` existem no design system, mas a v2 não tem nenhuma superfície clara.
- **Hero com ilustração**: ilustração em gravura preto e branco de um desenvolvedor de fones de ouvido diante de dois monitores (arte raster fornecida pelo dono), ao lado do nome.
- **Logo**: o raio com as três goivadas paralelas, em `#0B1315` sobre um quadrado lavanda de cantos arredondados, sem rotação nem textura. Sobre lavanda ou paper, só o raio.

## Clarifications

### Session 2026-11-10

- Q: O CV em PDF, as seções "Em números" e "Formação" e o destaque do produto próprio (AcheiConsulta) do portfólio atual entram no novo portfólio? → A: CV (PT/EN) e Formação entram; AcheiConsulta vira projeto em destaque com estudo de caso; "Em números" sai.
- Q: Os projetos feitos na TheMembers (painel admin/white label, COM, PLY, POS) podem aparecer em estudos de caso com telas e detalhes? → A: Sim, com estudo de caso completo em texto, mas as telas são substituídas por ilustrações pixel art ou mockups anonimizados, sem dados de clientes e sem links internos. *(Ilustrações agora em esquemas de linha no estilo HUD; ver Session 2026-11-11.)*
- Q: Qual deve ser o elemento visual principal do hero, além do texto em estilo terminal? → A: O protótipo apresenta duas propostas para comparação: (A) avatar do dono em pixel art ao lado do terminal e (B) cena pixel art de setup retrô com o texto do hero dentro do monitor CRT; a escolhida na aprovação do protótipo vai para a implementação. *(Superado: hero A escolhido no conceito v2; ver Session 2026-11-11.)*
- Q: O terminal deve ter comandos "escondidos" só por diversão (easter eggs)? → A: Sim, poucos e fixos (3 a 5, ex.: `sudo hire-me`, `neofetch`, `coffee`, `matrix`), fora do `help`, com uma dica de que existem segredos.

### Session 2026-11-11

- Q: A direção pixel art 8-bit (CRT, roxo e laranja) continua? → A: Não. O dono descartou essa direção e aprovou o conceito v2: linogravura/xilogravura digital retrô, só azul `#3352EF`, preto `#020202` e gelo `#F0F7FF`.
- Q: Qual variante do hero vai para a implementação? → A: Hero A, tipográfico (título gigante com palavras-chave em blocos azuis, faixa de números e faixa rolante de stack). A variante ilustrada (B) foi descartada.
- Q: As bordas de blocos e linhas têm efeito de entalhe (borda irregular)? → A: Não. Blocos, bordas e divisórias são sólidos. *(No conceito v3 também saem o grão e as hachuras.)*
- Q: O hero mostra selo de disponibilidade ("disponível para novos projetos" / "open to work")? → A: Não. Nada sobre disponibilidade aparece na página.
- Q: O conceito v2 (linogravura) continua? → A: Não. O dono aprovou o conceito v3, Functional HUD (neo-brutalismo tech): mesma paleta, grelha exposta, marcadores de HUD, cantos retos, ícones de contorno e ilustrações esquemáticas. O raio da logo foi mantido.
- Q: A logo muda junto com o estilo? → A: Não. O símbolo do raio com as goivadas continua; só perde a rotação, o grão e os cantos arredondados do carimbo. Uma variante com o monograma NB antigo foi testada e descartada.
- Q: O conceito v3 (Functional HUD) continua? → A: Não. O dono pediu para reformular todo o design system e aprovou o conceito v4, Editorial Dark Tech, a partir de um briefing em JSON. A paleta deixa de ser azul/preto/gelo e passa a ser escura com lavanda e roxo; o raio da logo foi mantido e recolorido.
- Q: Quais formações entram? → A: Cinco, da mais nova para a mais antiga: PHP (Rocketseat, 126h, 2026), Testes e Arquitetura no Front-end (Rocketseat, 30h, 2026), Arquitetura e Design de Aplicações React (Alura, 35h, 2025), TypeScript Avançado no Front-end (Alura, 27h, 2025) e Técnico em Desenvolvimento de Sistemas (SENAI, 1000h, 2021).
- Q: Como o dono se apresenta? → A: Como "desenvolvedor", sem destacar front-end na identidade. Cargos reais (ex.: "Desenvolvedor Front-End" na TheMembers) e nomes de cursos mantêm o termo. Na AcheiConsulta o cargo é "Sócio e Desenvolvedor".

### Session 2026-11-12

- Q: Qual layout vai para a implementação? → A: A home v2 do protótipo (desktop e mobile), minimalista e toda escura, mantendo as cores do Editorial Dark Tech. A v1 (hero A tipográfico, cards, superfície `paper`) fica só como histórico.
- Q: Qual fonte de título? → A: Michroma, em caixa alta. Newsreader sai. Outfit (texto) e JetBrains Mono (rótulos e terminal) continuam.
- Q: O hero tem imagem? → A: Sim. A ilustração em gravura preto e branco fornecida pelo dono fica ao lado do nome no desktop e acima dele no mobile. Isso substitui a decisão do hero tipográfico (variante A).
- Q: A seção "Em números" volta? → A: Não como seção. Uma linha discreta de números fica dentro do hero, só com dados reais: "4+ anos em produção" e "2 empresas". O número de projetos saiu.
- Q: A home tem seção de projetos e estudos de caso? → A: Não por enquanto. O dono ainda não tem projetos selecionados para mostrar. As histórias US3 e US3b, as páginas `/projects/{slug}` e os comandos de projeto do terminal ficam adiados para uma fase futura. O que foi feito em cada empresa aparece como lista de entregas dentro da Experiência.
- Q: Quais seções a home v2 tem? → A: Início (hero com números), Sobre, O que eu faço ("Da ideia ao deploy", três áreas de atuação), Experiência (um bloco por empresa com entregas e stack), Formação e Contato ("Vamos construir algo juntos?"), mais o rodapé. O menu mostra Início, Sobre e Contato.
- Q: O botão principal do hero leva aonde? → A: "Fale comigo", para a seção Contato. O secundário é "Baixar cv.pdf".

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Primeira impressão e identidade (Priority: P1)

Um recrutador ou potencial cliente abre o portfólio e, nos primeiros segundos, entende quem é o dono (nome, papel, especialidade) e percebe uma identidade visual marcante: fundo escuro, logo do raio sobre quadrado lavanda, a ilustração do desenvolvedor em gravura, o nome em caixa alta extra-larga, uma apresentação escrita como saída de terminal, os números da trajetória e um convite claro para entrar em contato ou baixar o CV.

**Why this priority**: É a única tela que todo visitante vê. Sem ela não há portfólio; com ela sozinha já existe um "cartão de visitas" funcional.

**Independent Test**: Abrir a página inicial em um navegador limpo e verificar que nome, papel, logo, tagline em estilo terminal e pelo menos uma chamada para ação (fale comigo / baixar CV) aparecem sem rolar.

**Acceptance Scenarios**:

1. **Given** um visitante acessando a página inicial pela primeira vez, **When** a página termina de carregar, **Then** ele vê a logo do raio, o nome do dono, seu papel profissional e uma frase de apresentação formatada como saída de terminal, tudo acima da dobra.
2. **Given** a página inicial carregada, **When** o visitante observa a apresentação, **Then** o texto aparece com efeito de digitação e cursor piscando, e o texto completo fica legível em no máximo 3 segundos.
3. **Given** um visitante com a preferência "reduzir movimento" ativa no sistema, **When** a página carrega, **Then** o texto aparece completo imediatamente, sem animação de digitação.

---

### User Story 2 - Navegação estilo terminal (Priority: P1)

O visitante navega entre as seções do portfólio usando um menu cujos itens se parecem com comandos de terminal (ex.: `> sobre`, `> contato`), com ícones de contorno, mantendo a facilidade de uso de um menu moderno.

**Why this priority**: Sem navegação o visitante não alcança o conteúdo; é também o principal ponto onde o conceito "terminal" se manifesta.

**Independent Test**: A partir da página inicial, alcançar cada seção pelo menu, com mouse, teclado e toque, e confirmar que o item ativo é sinalizado.

**Acceptance Scenarios**:

1. **Given** qualquer seção aberta, **When** o visitante clica em um item do menu, **Then** é levado à seção correspondente e o item ativo fica destacado (ex.: prompt `>` ou cursor ao lado).
2. **Given** um visitante usando apenas teclado, **When** ele navega com Tab/Enter, **Then** todos os itens do menu são alcançáveis, com foco visível no estilo do tema.
3. **Given** uma tela de celular, **When** o visitante abre o menu, **Then** o menu se apresenta em formato compacto adequado ao toque, mantendo a linguagem de terminal.
4. **Given** qualquer página, **When** o visitante abre o terminal interativo (por botão visível ou atalho de teclado) e digita um comando (ex.: `sobre`, `contato`, `cv`) + Enter, **Then** é levado ao destino correspondente — exatamente como se tivesse clicado no item do menu.
5. **Given** o terminal interativo aberto, **When** o visitante digita `help`, **Then** vê a lista de comandos e atalhos disponíveis com uma descrição curta de cada, seguida de uma dica de que existem comandos secretos (que não são listados).
6. **Given** um comando inexistente, **When** o visitante o envia, **Then** vê uma mensagem no estilo `command not found: xyz — digite help` e o terminal continua utilizável.
7. **Given** um visitante que nunca usa o terminal nem os atalhos, **When** navega apenas por clique ou toque, **Then** consegue acessar todo o conteúdo sem nenhuma desvantagem.

**Modelo de navegação (decidido)**: híbrido — o menu clicável é o caminho principal e completo; o terminal interativo e os atalhos de teclado são uma camada opcional para quem quiser usar, com a mesma cobertura de destinos.

---

### User Story 3 - Explorar projetos (Priority: P2 · ADIADA)

> **Adiada em 2026-11-12**: o dono ainda não tem projetos selecionados. A história fica registrada para uma fase futura e não entra no MVP nem nas tarefas atuais. Enquanto isso, as entregas de cada empresa aparecem na Experiência (US4).

O visitante vê a lista de projetos do dono em cards modernos — cada um com título, descrição curta, tecnologias/temas e links para ver o projeto ou o código — e consegue identificar rapidamente os trabalhos mais relevantes.

**Why this priority**: É a prova do trabalho e o principal motivo de um portfólio existir, mas depende da identidade e da navegação para ter contexto.

**Independent Test**: Abrir a seção de projetos e verificar que cada projeto exibe título, descrição, tags e links funcionais.

**Acceptance Scenarios**:

1. **Given** a seção de projetos, **When** o visitante a abre, **Then** vê os projetos em grade responsiva, com cabeçalho estilo terminal (ex.: `~/projetos $ ls`).
2. **Given** um card de projeto, **When** o visitante passa o mouse ou foca nele, **Then** o card dá retorno visual no estilo do tema (borda mais forte e anel de foco violeta, sem depender só de cor).
3. **Given** um card com link externo, **When** o visitante clica, **Then** o destino abre em nova aba.
4. **Given** um card de projeto, **When** o visitante abre o projeto, **Then** é levado a uma página de estudo de caso própria, com endereço compartilhável.

---

### User Story 3b - Estudo de caso de projeto (Priority: P2 · ADIADA)

> **Adiada em 2026-11-12**, junto com a US3, da qual depende.

O visitante abre a página de um projeto e lê um estudo de caso: o problema, o papel do dono, as decisões tomadas, as tecnologias, imagens do resultado e os links de demonstração e código — tudo apresentado com a mesma linguagem de terminal (ex.: `$ cat projeto/README.md`).

**Why this priority**: Mostra o processo e a capacidade de decisão do dono, que é o que diferencia um portfólio de uma lista de links; depende da lista de projetos existir.

**Independent Test**: Acessar diretamente o endereço de um estudo de caso e verificar que todas as partes aparecem, com navegação de volta à lista e para o próximo/anterior projeto.

**Acceptance Scenarios**:

1. **Given** um estudo de caso, **When** o visitante o abre, **Then** vê título, resumo, contexto/problema, papel do dono, processo/decisões, tecnologias, imagens e resultado, além dos links existentes.
2. **Given** um estudo de caso, **When** o visitante termina de ler, **Then** pode ir ao projeto anterior/próximo ou voltar à lista sem usar o botão "voltar" do navegador.
3. **Given** um projeto sem estudo de caso escrito, **When** listado, **Then** o card não leva a uma página vazia — mostra apenas os links externos.

---

### User Story 4 - Sobre, áreas de atuação, experiência e formação (Priority: P2)

O visitante lê quem é o dono, sua stack, o que ele faz (três áreas de atuação) e sua trajetória: em cada empresa, o cargo, o período, a stack e as entregas feitas; depois, a formação. Rótulos e microtextos mantêm a voz de terminal (ex.: `$ whoami`).

**Why this priority**: Mostra o que o dono já construiu em produção, empresa por empresa, enquanto a seção de projetos está adiada; importante para recrutadores, mas o portfólio já tem valor sem ela.

**Independent Test**: Abrir a home e verificar biografia e stack (Sobre), as três áreas de atuação, os blocos de experiência com entregas e a lista de formação.

**Acceptance Scenarios**:

1. **Given** a seção Sobre, **When** o visitante a lê, **Then** vê uma biografia curta, a stack atual e os links das redes.
2. **Given** a seção "O que eu faço", **When** o visitante a lê, **Then** vê três áreas de atuação, cada uma com título, uma frase e uma lista curta do que inclui.
3. **Given** a seção Experiência, **When** o visitante a lê, **Then** vê um bloco por empresa, do emprego mais recente para o mais antigo, com nome da empresa em destaque, cargo, período (com marcador "atual" quando for o caso), resumo, stack e a lista numerada de entregas (título e descrição).
4. **Given** a seção Formação, **When** o visitante a lê, **Then** vê os cursos do mais novo para o mais antigo, com instituição, carga horária e ano.
5. **Given** o hero ou o terminal, **When** o visitante aciona "baixar CV", **Then** recebe o PDF do CV no idioma ativo.

---

### User Story 5 - Contato (Priority: P2)

O visitante encontra formas de contato (e-mail, GitHub, LinkedIn e outras redes) com ícones de contorno e consegue copiar o e-mail ou abrir os perfis com um clique.

**Why this priority**: Converte interesse em oportunidade; sem ela o visitante não tem próximo passo.

**Independent Test**: Abrir a seção de contato e acionar cada link/ação.

**Acceptance Scenarios**:

1. **Given** a seção de contato, **When** o visitante clica em "copiar e-mail", **Then** o e-mail vai para a área de transferência e aparece uma confirmação em estilo terminal (ex.: `> email copiado ✓`).
2. **Given** um link de rede social, **When** o visitante clica, **Then** o perfil abre em nova aba.

---

### User Story 6 - Logo raio (Priority: P3)

O dono do portfólio tem uma logo própria: um raio escuro cortado por goivadas sobre um quadrado lavanda, usada no cabeçalho, como ícone da aba do navegador e em imagens de compartilhamento.

**Why this priority**: Reforça a identidade, mas o portfólio funciona com um placeholder até a logo final estar pronta.

**Independent Test**: Visualizar a logo ampliada e em tamanho de favicon e conferir forma, cores e legibilidade.

**Acceptance Scenarios**:

1. **Given** a logo ampliada, **When** inspecionada, **Then** mostra um raio diagonal escuro sobre um quadrado lavanda de cantos arredondados, com três goivadas paralelas cortando o raio.
2. **Given** a logo, **When** se observam as cores, **Then** usa só as cores da paleta (lavanda `#D3C7F3` e o fundo `#0B1315`).
3. **Given** a aba do navegador, **When** o portfólio está aberto, **Then** a logo aparece como ícone e continua reconhecível a 16×16 e 32×32 pixels.
4. **Given** um link do portfólio compartilhado em rede social ou mensageiro, **When** a prévia é gerada, **Then** ela exibe a logo, o nome do dono e uma descrição curta.

---

### Edge Cases

- *(Adiado com a US3)* **Projetos sem imagem ou sem link**: o card exibe uma ilustração esquemática genérica (ou um espaço de imagem com rótulo mono) e oculta botões cujo destino não existe, em vez de mostrar links quebrados.
- *(Adiado com a US3)* **Lista de projetos vazia**: a seção mostra uma mensagem em tom de terminal (ex.: `ls: nenhum projeto encontrado`) em vez de ficar em branco.
- **Telas muito estreitas (≤ 320px) ou muito largas (≥ 2560px)**: o layout não gera rolagem horizontal e o conteúdo não fica esticado ilegivelmente.
- **Fonte de título ou de terminal indisponível**: o texto continua legível com uma fonte alternativa, sem quebrar o layout. Como a Michroma é muito larga, o fallback e os tamanhos dos títulos não podem gerar rolagem horizontal (nomes longos como "NAIANDERSON" e "ACHEICONSULTA" têm de caber na coluna).
- **Ícones e ilustrações em telas de alta densidade ou com zoom**: permanecem nítidos (vetoriais, sem borrão) em qualquer nível de zoom do navegador até 200%.
- **Ilustração do hero não carrega**: o espaço mantém o tamanho, com fundo `card`, e o texto alternativo fica disponível; o nome e os CTAs continuam visíveis.
- **Recursos interativos indisponíveis ou com falha no navegador do visitante**: todo o conteúdo textual e os links continuam acessíveis; apenas animações deixam de funcionar.
- **Endereço inexistente**: uma página 404 no estilo terminal (ex.: `command not found`) oferece caminho de volta à página inicial.
- *(Adiado com a US3b)* **Estudo de caso inexistente** (endereço digitado errado): cai na página 404 com link para a lista de projetos.
- **Atalho de teclado conflitando com digitação**: enquanto o foco está em um campo de texto (inclusive o próprio terminal), os atalhos globais não disparam.
- **Terminal em celular**: o terminal abre em tela cheia ou painel inferior, sem ser coberto pelo teclado virtual, e pode ser fechado com um toque.
- **Copiar e-mail não permitido pelo navegador**: o e-mail fica visível e selecionável, e a mensagem de erro indica isso.

## Requirements *(mandatory)*

### Functional Requirements

**Identidade visual e tema**

- **FR-000**: O hero MUST seguir a home v2: no desktop, a ilustração do desenvolvedor (cerca de 7 de 12 colunas, cantos arredondados) ao lado de `~ $ whoami` em mono, do nome em Michroma caixa alta em duas linhas, de dois itens com marcador quadrado lavanda ("Desenvolvedor · React, Next.js e TypeScript" e "Caxias, MA · Remoto"), dos botões "Fale comigo" (sólido, leva a `#contact`) e "Baixar cv.pdf" (contorno) e de uma linha de números reais ("4+ anos em produção", "2 empresas") sem caixas, só com uma linha fina acima. No mobile, a ilustração fica acima do nome. MUST NOT exibir selo ou texto de disponibilidade nem números inventados. Em telas pequenas, nome, papel e CTA continuam na primeira tela (US1-1).

- **FR-001**: O portfólio MUST usar exclusivamente tema escuro (fundo `#0B1315`) e a paleta do design system Editorial Dark Tech: `bg` `#0B1315`, `card` `#141D20`, `paper` `#F2EFE9`, `white` `#FFFFFF`, `ink` `#11181C`, `lavender` `#D3C7F3`, `purple` `#8B5CF6`, `violet` `#A78BFA` e os derivados de contraste. A v2 não usa superfícies claras: `paper` e `ink` ficam fora da interface, e nenhuma seção tem fundo claro.
- **FR-002**: Títulos de seção, rótulos de menu, microtextos e mensagens de estado MUST ser escritos em linguagem de terminal (prompts, comandos, saídas), usando a fonte de máquina de escrever (rótulos/terminal) ou a de título.
- **FR-003**: Textos longos (biografia, áreas de atuação, entregas) MUST permanecer confortáveis de ler — tipografia legível em tamanho adequado — mesmo que títulos usem a grotesca extra-larga (Michroma). Texto corrido nunca usa a Michroma.
- **FR-004**: Todos os ícones (navegação, habilidades, redes sociais, ações) MUST ser glifos próprios de contorno (traço de 1,5px, pontas e junções arredondadas), de uma cor cada (white, muted, lavender ou violet), consistentes entre si (mesma grade-base e mesmo peso).
- **FR-005**: O layout MUST seguir padrões modernos: grid responsivo, espaçamento generoso, hierarquia clara e componentes como cards; elementos retrô não podem prejudicar a usabilidade.
- **FR-006**: A interface MUST ter os detalhes de terminal (cursor piscando, efeito de digitação) e os detalhes da v2 (linhas finas, marcadores quadrados lavanda, rótulos de seção em mono) sem prejudicar a legibilidade. Elementos decorativos ficam ocultos para leitores de tela. Os padrões do design system (halftone, anéis, molduras, halo) MAY ser usados só em telas que o protótipo aprovar; a home v2 não usa nenhum.

**Logo**

- **FR-007**: A logo MUST ser o raio diagonal com três goivadas paralelas, em `#0B1315` sobre um quadrado lavanda de cantos arredondados, sem rotação; sobre lavanda ou paper, só o raio.
- **FR-008**: A logo MUST usar só as cores da paleta (FR-001) e continuar reconhecível sem as goivadas em tamanhos pequenos.
- **FR-009**: A logo MUST existir em variações para cabeçalho, ícone da aba do navegador (legível em 16×16) e imagem de compartilhamento.

**Navegação e estrutura**

- **FR-010**: A home MUST conter, nesta ordem, as seções Início (hero com números), Sobre, O que eu faço, Experiência, Formação e Contato, mais o rodapé. A seção Projetos e as páginas de estudo de caso estão adiadas (US3, US3b). Blog e a seção separada "Em números" estão fora do escopo.
- **FR-010a**: O portfólio MUST oferecer download do CV em PDF no idioma ativo (versões PT e EN), acessível pelo hero e pelo terminal (comando `cv`); se o PDF de um idioma não existir, oferece o do outro idioma.
- **FR-010b** *(adiado com a US3)*: O produto próprio AcheiConsulta MUST aparecer como projeto em destaque na seção Projetos, com estudo de caso, e não como seção separada.
- **FR-010d**: Cada experiência MUST mostrar empresa, cargo, período, resumo, stack e a lista de entregas feitas nela (título e descrição curta). As entregas da TheMembers são descritas sem capturas de tela, nomes ou dados de clientes e sem links internos.
- **FR-010c** *(adiado com a US3b)*: Projetos feitos para empregadores (ex.: TheMembers) MUST ter estudo de caso completo em texto (problema, papel, decisões, tecnologias, resultado), mas MUST NOT exibir capturas de tela reais, nomes ou dados de clientes nem links internos; as imagens são ilustrações em estilo gravura ou mockups anonimizados, e o card e o estudo de caso indicam que é um projeto profissional confidencial, por exemplo com o rótulo `[private]`.
- **FR-011**: O menu principal MUST apresentar cada item como comando de terminal e indicar visualmente a seção ativa.
- **FR-012**: O menu MUST funcionar com mouse, teclado e toque, e adaptar-se a telas pequenas.
- **FR-012a**: O portfólio MUST oferecer um terminal interativo opcional, aberto por um botão visível e por atalho de teclado, que aceita comandos digitados para navegar (seções, troca de idioma, CV) e inclui `help` com a lista de comandos.
- **FR-012b**: O portfólio MUST oferecer atalhos de teclado para os destinos principais, listados no `help`, que não interfiram em atalhos do navegador nem de leitores de tela, nem disparem enquanto o visitante digita em um campo.
- **FR-012c**: Tudo o que for acessível pelo terminal ou por atalhos MUST também ser acessível por clique/toque no menu comum; o terminal é um atalho, nunca o único caminho.
- **FR-012d**: O terminal MUST responder a comandos desconhecidos com mensagem de erro amigável e sugestão de `help`, e MUST poder ser fechado por tecla (ex.: Esc) e por botão.
- **FR-012f**: O terminal MUST incluir de 3 a 5 comandos ocultos de diversão (ex.: `sudo hire-me`, `neofetch` com a logo e um resumo do dono, `coffee`, `matrix`), bilíngues, que não aparecem na lista do `help`; o `help` MUST terminar com uma dica de que existem segredos. Efeitos visuais desses comandos respeitam "reduzir movimento" (FR-019) e nunca navegam para fora do portfólio.
- **FR-012e** *(adiado com a US3b)*: Cada estudo de caso MUST ter endereço próprio e compartilhável, e oferecer navegação para o projeto anterior, o próximo e a lista.
- **FR-013**: O portfólio MUST oferecer uma página de erro 404 no estilo terminal com link de retorno.

**Conteúdo**

- **FR-014** *(adiado com a US3)*: Cada projeto MUST exibir título, descrição curta, tags de tecnologia/tema e, quando existirem, links para demonstração e código.
- **FR-015**: A seção de contato MUST oferecer e-mail (com ação de copiar e confirmação) e links para perfis profissionais, cada um com ícone de contorno.
- **FR-016**: O conteúdo do portfólio (textos, áreas de atuação, experiência e entregas, formação, números do hero, links) MUST poder ser atualizado pelo dono em um único local, sem alterar a estrutura visual.
- **FR-017**: Todo o conteúdo e a interface (menus, mensagens do terminal, seções da home, página 404) MUST estar disponível em português e inglês, com seletor de idioma visível em todas as páginas e também acessível por comando no terminal (ex.: `lang en`).
- **FR-017a**: Na primeira visita, o idioma MUST seguir a preferência do navegador do visitante: qualquer variante de português (`pt`, `pt-BR`, `pt-PT` etc.) leva à versão em português; qualquer outro idioma leva ao inglês; depois de uma troca manual, a escolha MUST ser lembrada nas visitas seguintes.
- **FR-017b**: Trocar de idioma MUST manter o visitante na mesma página/seção, e cada idioma MUST ter endereço próprio, compartilhável e indicado aos mecanismos de busca.
- **FR-017c**: Se um texto ainda não tiver tradução, o portfólio MUST exibir a versão no outro idioma em vez de deixar o espaço vazio.

**Acessibilidade e qualidade**

- **FR-018**: Todo texto MUST ter contraste mínimo de 4,5:1 contra o fundo (3:1 para textos grandes). O roxo `#8B5CF6` (4,44:1 no fundo) só serve a títulos ≥ 24px, ícones e decoração; texto secundário usa `#9AA5A8`; o lavanda `#D3C7F3` (11,83:1) serve a texto, marcadores e botão sólido (com texto `#0B1315`); bordas de campos usam branco a 40%, e as linhas finas de 10% e 20% são só divisórias, nunca a única pista de um controle.
- **FR-019**: Animações (digitação, cursor) MUST ser desativadas ou reduzidas quando o visitante tiver a preferência de "reduzir movimento".
- **FR-020**: Ícones informativos MUST ter texto alternativo; ícones puramente decorativos MUST ser ignorados por leitores de tela.
- **FR-021**: O portfólio MUST expor título, descrição e imagem de compartilhamento para mecanismos de busca e redes sociais.

### Key Entities

- **Perfil**: dono do portfólio — nome, papel, local, tagline, biografia curta, stack atual, e-mail, números do hero (valor e rótulo, só dados reais).
- **Projeto** *(adiado)*: identificador amigável para endereço, título, descrição curta, tags, imagem opcional, link de demonstração opcional, link de código opcional, indicador de destaque, ordem de exibição, estudo de caso opcional, tipo (próprio/pessoal ou profissional confidencial; o confidencial tem estudo de caso, mas nunca imagem real, dados de cliente nem links).
- **Estudo de caso** *(adiado)*: pertence a um projeto — resumo, contexto/problema, papel do dono, processo/decisões, tecnologias, galeria de imagens, resultado.
- **Comando do terminal**: nome, apelidos, atalho de teclado opcional, descrição (para o `help`), destino ou ação.
- **Texto traduzível**: todo texto de conteúdo e de interface existe em versão PT e EN; aplica-se a Perfil, Área de atuação, Experiência, Entrega, Formação e Comando.
- **Área de atuação**: título, frase curta e lista do que inclui (seção "O que eu faço").
- **Experiência**: cargo, organização, período (início/fim; sem fim = atual), resumo, stack e entregas.
- **Entrega**: título e descrição curta de algo construído numa experiência.
- **Formação**: curso, instituição, carga horária, ano de conclusão.
- **CV**: arquivo PDF por idioma (PT e EN).
- **Link social**: nome da rede, URL, ícone de contorno.
- **Glifo**: nome e forma vetorial de contorno — catálogo compartilhado que garante consistência visual.
- **Ilustração do hero**: imagem raster fornecida pelo dono (gravura preto e branco), com texto alternativo; não é decorativa.
- **Ilustração vetorial**: cena do catálogo para a 404 e a imagem de compartilhamento, decorativa.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em teste com 5 pessoas, ao menos 4 conseguem dizer o nome e a área de atuação do dono após ver a página inicial por 5 segundos.
- **SC-002**: Um visitante alcança qualquer seção a partir da página inicial em no máximo 2 interações.
- **SC-003**: O conteúdo principal da página inicial fica visível em menos de 2 segundos em conexão móvel 4G típica.
- **SC-004**: 100% dos pares texto/fundo atendem à razão de contraste definida em FR-018.
- **SC-005**: O portfólio é utilizável sem rolagem horizontal em larguras de 320px a 2560px.
- **SC-006**: Todas as funcionalidades interativas (menu, links, copiar e-mail) podem ser completadas usando apenas o teclado.
- **SC-007**: Em avaliação informal, ao menos 4 de 5 pessoas descrevem o visual com termos ligados a "elegante/tech/minimalista" e também consideram a navegação "fácil" ou "moderna".
- **SC-008**: A logo é reconhecida como um raio por ao menos 4 de 5 pessoas quando exibida em 32×32 pixels.
- **SC-009**: O dono consegue adicionar uma nova experiência, entrega ou formação e vê-la publicada sem editar nenhum elemento de layout.
- **SC-010**: Um visitante que conhece terminal chega a qualquer destino do menu pelo terminal em até 3 comandos, partindo de `help`.
- **SC-011**: 100% dos destinos alcançáveis pelo terminal também são alcançáveis por clique/toque.
- **SC-012**: 100% das páginas e mensagens da interface existem em PT e EN; a troca de idioma mantém o visitante na mesma página em 100% dos casos.

## Assumptions

- O portfólio é pessoal, de um único dono (desenvolvedor), voltado a recrutadores, clientes e colegas da área.
- Não há área administrativa, login de visitantes ou banco de dados; o conteúdo é mantido pelo dono diretamente.
- Não há modo claro: o tema escuro é parte da identidade, não uma preferência.
- O contato será por links diretos (e-mail e redes); um formulário de contato com envio fica fora do escopo inicial.
- Textos reais (biografia, áreas de atuação, experiência e entregas) e suas traduções serão fornecidos pelo dono; até lá, usam-se textos de exemplo nos dois idiomas.
- Os comandos do terminal são em inglês nos dois idiomas (convenção de terminal), aceitando apelidos em português (ex.: `about` e `sobre`); as respostas do terminal seguem o idioma ativo.
- Blog fica fora do escopo desta feature. A seção de projetos e os estudos de caso voltam numa feature futura, quando o dono tiver projetos selecionados.
- Os ícones, as ilustrações e a logo serão criados especificamente para o projeto (não copiados de marcas existentes); as referências servem apenas de direção de estilo.
- Suporte aos navegadores modernos atuais (duas últimas versões dos principais navegadores de desktop e celular).
- Estatísticas de acesso (analytics) ficam fora do escopo inicial.
