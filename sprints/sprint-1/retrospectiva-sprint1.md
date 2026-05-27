# Retrospectiva — Sprint 1

**Período:** 07/04/2026 – 24/04/2026  
**Objetivo:** Fundação técnica do projeto — banco de dados, back-end, front-end e primeiros artefatos de documentação.

---

## Equipe

| Integrante | Papel |
|---|---|
| Kézia Ketillen Santos Lima | Engenheira de Software · Scrum Master |
| Marcus Aurelius Costa de Paiva | Engenheiro de Software · Product Owner |
| Tiago Rodrigues dos Santos | Engenheiro de Software · Project Manager |

---

## O que foi entregue

### Issues concluídas (8/8 — 100%)

| Issue | Descrição |
|---|---|
| #1 | Definição do quadro de horários e cerimônias ágeis |
| #2 | Configurar banco de dados PostgreSQL |
| #3 | Inicializar projeto Spring Boot com dependências iniciais |
| #4 | Configurar boilerplate do ReactJS com Tailwind CSS |
| #10 | Protótipo de visualização inicial (home page do cidadão e do gestor) |
| #11 | Criar modelo do banco de dados (Modelo Relacional) |
| #12 | Criar visualização inicial do mapa |
| #13 | Documentação do modelo de dados |

### Pull Requests mergeadas

| PR | Branch | Autor(es) | Data |
|---|---|---|---|
| #13 | `docs/create-db-model` | tiago-rodrigues1 | abr/2026 |
| #14 | `feat/issue-3-spring-boot-setup` | tiago-rodrigues1 + MarcusAurelius33 | abr/2026 |
| #15 | `feat/issue-4-reactjs-tailwind-setup` | Kk3tillen + MarcusAurelius33 | 20/04/2026 |
| #16 | `feat/visualizacao-mapa` | tiago-rodrigues1 | 23/04/2026 |

### Histórico de commits relevantes

**Back-end (PR #14):**
- `feat: inicializar projeto Spring Boot com dependencias iniciais` — MarcusAurelius33
- `docs: adicionar README com pre-requisitos e passos para execucao do backend` — MarcusAurelius33
- `refactor: remove model package` — tiago-rodrigues1
- `refactor: create enum package` — tiago-rodrigues1
- `chore: add Maven Wrapper (mvnw)` — tiago-rodrigues1
- `chore: create docker compose for postgres database` — tiago-rodrigues1
- `chore: add flyway` — tiago-rodrigues1
- `docs: update startup commands` — tiago-rodrigues1

**Front-end (PRs #15 e #16):**
- `feat: configurar boilerplate do ReactJS com Tailwind CSS` — Kk3tillen + MarcusAurelius33
- `chore: add leaflet e react-leaflet` — tiago-rodrigues1
- `feat: add favicon` — tiago-rodrigues1
- `chore: configura aliases` — tiago-rodrigues1
- `feat: add mapa` — tiago-rodrigues1

---

## Métricas da Sprint

| Métrica | Valor |
|---|---|
| Issues planejadas | 8 |
| Issues concluídas | 8 |
| Taxa de entrega | 100% |
| Pull Requests abertas | 4 |
| Pull Requests mergeadas | 4 |
| Revisões cruzadas realizadas | 4 (todos os PRs) |
| Pendências carregadas para Sprint 2 | 0 |

---

## Processo

As issues foram priorizadas por **dependência técnica**: banco de dados → back-end → front-end → UI. Essa ordem evitou bloqueios durante a sprint — nenhum integrante precisou esperar por uma entrega que ainda não existia para começar a sua.

O fluxo de trabalho adotado foi:

**Implementar → Comunicar (WhatsApp) → Abrir PR → Revisão cruzada → Merge**

Todos os merges passaram por revisão de pelo menos um outro integrante antes de entrar na `main`. A revisão cruzada identificou e corrigiu problemas reais antes do merge — entre eles: versão de dependência em release candidate, componente de mapa sem altura explícita e ausência de atribuição de licença nos tiles do OpenStreetMap.

---

## O que funcionou bem

**Comunicação ágil**  
O WhatsApp foi o canal principal para avisos e alinhamentos rápidos. Decisões foram tomadas sem necessidade de reuniões síncronas adicionais, mantendo o ritmo da sprint.

**Revisão cruzada real**  
A revisão não foi uma formalidade — ela funcionou como um controle de qualidade efetivo. Problemas foram encontrados e corrigidos antes do merge em todos os PRs.

**Entrega completa**  
8 de 8 issues concluídas dentro do período da sprint, sem nenhuma pendência ou bloqueio grave que comprometesse o objetivo.

**Divisão por dependência técnica**  
A priorização por ordem técnica de implementação foi acertada. Evitou ociosidade e garantiu que cada integrante sempre tivesse uma tarefa desbloqueada para trabalhar.

---

## O que precisa melhorar

**Documentação técnica**  
As decisões de arquitetura e escolhas técnicas não foram registradas de forma consistente durante a sprint. O registro aconteceu depois, de forma reativa. Na Sprint 2, decisões relevantes devem ser documentadas no momento em que são tomadas.

**Antecipação de dependências**  
Alguns bloqueios potenciais só foram percebidos no meio da sprint. O refinement do backlog antes do planning deve incluir um mapeamento explícito de dependências entre as issues.

**Consistência nas mensagens de commit**  
Houve variação no padrão de commit entre os integrantes ao longo da sprint. Na Sprint 2, todos devem seguir a convenção `tipo: descrição em minúsculas` já adotada na maioria dos commits.

---

## Ações para a Sprint 2

| Ação | Responsável |
|---|---|
| Daily assíncrona via WhatsApp (check-in diário) | Todos |
| Backlog refinement antes do sprint planning | Kézia (Scrum Master) |
| Registrar decisões técnicas durante a sprint, não depois | Todos |
| Padronizar mensagens de commit desde o primeiro commit | Todos |

---

## Próximos Passos — Sprint 2

Com a fundação estabelecida, a Sprint 2 tem foco em funcionalidade e integração:

1. **Funcionalidades core** — cadastro de usuário, autenticação, registro de ocorrência (US02) e geolocalização do reporte (US03)
2. **Integração full-stack** — front-end consumindo a API do back-end, back-end gravando no banco via Flyway migrations
3. **Quebra das histórias de usuário em subtasks** — refinement antes do planning
4. **Testes de integração iniciais** — validação das camadas integradas
