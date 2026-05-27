## 📊 Métricas DORA - Sprint 2
**Tema:** Automatizando a Entrega com DevOps  
**Período:** 05/05/2026 - 22/05/2026

Para avaliar como o nosso grupo se saiu com o ciclo de entrega contínua neste sprint, levantei nossas métricas DORA analisando o histórico do nosso repositório. O nosso gatilho de "produção" foi o momento exato em que conseguimos integrar e fazer o merge do código na branch main, disparando nosso empacotamento no Docker.

### 1. Frequência de Implantação (Deployment Frequency)
* **Resultado:** 4 deploys em produção.
* **Análise:** Nós conseguimos colocar código funcional no ar em quatro ocasiões diferentes dentro do sprint. Isso é uma ótima notícia, pois prova que o pipeline de CI/CD que construímos no GitHub Actions não está apenas de enfeite; ele está rodando de verdade e suportando nossas integrações sem quebrar o ambiente.

### 2. Tempo de Espera para Mudanças (Lead Time for Changes)
* **Resultado Médio:** 93.60 horas (~3,9 dias)
* **Metodologia:** O tempo foi calculado do instante do primeiro commit na branch de trabalho até o merge do Pull Request na branch `main`.

| Pull Request | Primeiro Commit (Início) | Merge na Main (Entrega) | Lead Time (Horas) |
| :--- | :--- | :--- | :--- |
| **PR #23** | 10/05/2026 17:25Z | 19/05/2026 20:30Z | 219.10 |
| **PR #22** | 17/05/2026 18:59Z | 18/05/2026 20:20Z | 25.34 |
| **PR #21** | 14/05/2026 04:08Z | 16/05/2026 21:21Z | 65.21 |
| **PR #19** | 14/05/2026 04:08Z | 16/05/2026 20:54Z | 64.75 |

#### 🔍 Análise Estratégica do Lead Time e Histórico de Commits

A média de 93,60 horas indica um ritmo condizente com a nossa dinâmica de desenvolvimento, onde o esforço ocorre de forma assíncrona. Contudo, uma auditoria no histórico de commits dos Pull Requests revela comportamentos distintos que impactaram diretamente as métricas de entrega:

* **O Cenário Ideal de Fluxo Contínuo (PR #22 - API de Ocorrências):**
  * **Lead Time:** 25.34 horas.
  * **Análise:** Representa o padrão ouro para o projeto. O histórico mostra um escopo bem delimitado: a implementação inicial no dia 17/05 (`feat: implement occurrence reporting API`), seguida por uma refatoração pontual e correção no dia seguinte (`refactor: apply static factory...`), culminando no merge. Tarefas pequenas e focadas resultam em revisões rápidas e baixo *Lead Time*.

* **O Custo do Contexto de Infraestrutura (PRs #19 e #21):**
  * **Lead Time:** ~65 horas cada.
  * **Análise:** Ambos tratam da configuração de CI/CD e Docker. Aqui houveram commits de ajuste sequenciais (ex: `ci: adjust ci pipeline`). Esse tempo de espera de quase 3 dias é esperado e natural para configurações de DevOps, que frequentemente exigem uma abordagem de tentativa e erro (commits para testar como o pipeline reage no servidor) e resolução de dependências de ambiente.

* **O Gargalo do Escopo Amplo / "Long-lived Branch" (PR #23 - Feat/suri 01):**
  * **Lead Time:** 219.10 horas (Aproximadamente 9 dias).
  * **Análise:** Este PR foi o principal ofensor da média do sprint. O desenvolvimento começou em 10/05 com a configuração de UI e ícones, teve um hiato de 5 dias, e foi retomado em 15/05 com a adição de features de mapa (marcadores e localização). Além disso, exigiu um merge reverso da `main` no dia 18/05 para resolver possíveis desatualizações antes do merge final. 

