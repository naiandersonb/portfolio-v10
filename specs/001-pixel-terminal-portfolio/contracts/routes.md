# Contract: Rotas públicas

Todas as rotas são geradas estaticamente para cada `locale ∈ {pt-BR, en}`.

| Rota | Conteúdo | Notas |
|------|----------|-------|
| `/` | Redireciona para `/{locale}` | `Accept-Language` na 1ª visita; cookie depois (FR-017a) |
| `/{locale}` | Home: hero (`#home`), sobre (`#about`), o que eu faço (`#services`), experiência (`#experience`), formação (`#education`), contato (`#contact`) | O menu leva a Início, Sobre e Contato; as outras âncoras existem para links diretos |
| `/{locale}/projects/{slug}` | *(Adiado com a US3b)* Estudo de caso | Não é gerada nesta fase; o endereço cai na 404 |
| `/{locale}/*` (não encontrado) | 404 estilo terminal | Catch-all `[locale]/[...rest]` chama `notFound()` e renderiza `[locale]/not-found.tsx`; link para a home e para `#contact` |
| `/icon.svg`, `/apple-icon.png` | Logo como favicon | 16/32/180 px legíveis |
| `/{locale}/opengraph-image` | Imagem social 1200×630 | Logo + nome + papel no idioma |

## Metadados por página

- `title`, `description` localizados.
- `alternates.languages` com as duas versões (hreflang) e `x-default` → `en`.
- `openGraph` com imagem da rota.

## Troca de idioma

`/{a}/X` → `/{b}/X` para qualquer `X` (mesma âncora). Nunca volta para a home (SC-012).
