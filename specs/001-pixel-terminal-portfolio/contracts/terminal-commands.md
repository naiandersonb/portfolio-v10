# Contract: Terminal interativo e atalhos

## Abertura e fechamento

| Ação | Gatilho |
|------|---------|
| Abrir | Botão `>_` no header (sempre visível), `Ctrl/⌘ + K`, tecla `/`. Não usar `` ` ``: no teclado ABNT2 ela é tecla morta de acento. Comparar por `event.key`, não por `event.code`, para funcionar em qualquer layout |
| Fechar | `Esc`, botão `×`, comando `exit`, clique fora (desktop) |
| Foco | Ao abrir → campo de entrada; ao fechar → volta ao gatilho |

Atalhos globais **não disparam** quando o foco está em `input`, `textarea`, `select` ou `[contenteditable]` (exceto `Esc` dentro do terminal).

## Gramática

```text
input    := WS* command (WS+ argument)? WS*
command  := [a-z-]+ | "?" | "~"   ; comparado sem diferenciar maiúsculas
argument := [^\s]+
```

Todo `name` e `alias` do registro é **um único token** que casa com `command`. Comandos que aceitam "subcomando" (ex.: `sudo hire-me`) são registrados pelo primeiro token (`sudo`) e tratam o resto como `argument`.

Resolução: `name` exato → `alias` exato → erro. Prefixo único aceito só pelo autocomplete (Tab), nunca ao executar.

## Comandos

| name | aliases | args | atalho | resultado |
|------|---------|------|--------|-----------|
| `help` | `ajuda`, `?` | – | – | Lista comandos + atalhos no idioma ativo |
| `home` | `inicio`, `~` | – | `g h` | Navega para `/{locale}` |
| `about` | `sobre`, `whoami` | – | `g a` | `/{locale}#about` |
| `contact` | `contato` | – | `g c` | `/{locale}#contact` |
| `email` | – | – | – | Copia o e-mail; mostra sucesso/erro |
| `cv` | `resume`, `curriculo` | – | – | Baixa o PDF do CV no idioma ativo (fallback no outro idioma) |
| `lang` | `idioma` | `pt` \| `en` | – | Troca locale mantendo a rota; sem arg → mostra o atual |
| `clear` | `limpar` | – | – | Limpa a saída |
| `exit` | `sair` | – | – | Fecha o terminal |

`projects` (`projetos`, `ls`, atalho `g p`) e `open <slug>` (`abrir`, `cat`) estão **adiados** com a US3/US3b e voltam na fase futura. Até lá, digitá-los dá `command not found`.

## Comandos ocultos (easter eggs, FR-012f)

Não aparecem no `help`. O `help` termina com: `psst… there are hidden commands.` / `psst… existem comandos secretos.`

| name | resultado |
|------|-----------|
| `sudo` (arg `hire-me`) | Com `hire-me`: saída bem-humorada de "permissão concedida" e oferta de copiar o e-mail ou baixar o CV. Sem argumento ou com outro: `nice try ;)` |
| `neofetch` | Logo + resumo (nome, papel, local, stack, idiomas) ao estilo neofetch |
| `coffee` | Xícara em ASCII + mensagem |
| `matrix` | Efeito curto de "chuva" na saída do terminal (desligado com reduced-motion; aí só imprime uma frase) |

Máximo de 5. Nenhum desses comandos navega para fora do portfólio.

## Saídas

| Caso | Saída (exemplo EN / PT) |
|------|-------------------------|
| Sucesso de navegação | `→ about` / `→ sobre` e fecha o terminal |
| Comando desconhecido | `command not found: xyz — type help` / `comando não encontrado: xyz — digite help` |
| Argumento inválido | `lang: unknown language 'xyz'. try: pt, en` / `lang: idioma desconhecido 'xyz'. tente: pt, en` |
| E-mail copiado | `✓ email copied` / `✓ email copiado` |
| Falha ao copiar | `✗ couldn't copy — email: …` (e-mail visível e selecionável) |

## Teclado dentro do terminal

`Enter` executa · `↑/↓` histórico · `Tab` autocompleta · `Esc` fecha.

## Garantias

- Todo destino de navegação também está no menu ou é um link visível (SC-011).
- Saídas são anunciadas por região `aria-live="polite"`.
- Em telas < 768px, abre em tela cheia, acima do teclado virtual.
