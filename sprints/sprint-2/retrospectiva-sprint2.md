## 📌 Documentação Geral - Sprint 2
**Tema:** Automatizando a Entrega com DevOps  
**Período:** 05/05/2026 - 22/05/2026  

Nesta sprint, o foco principal foi aproximar o Suricato de um fluxo real de desenvolvimento e entrega contínua. Além da evolução visual do mapa, o projeto recebeu uma API inicial para registro de ocorrências, configuração de Docker para frontend e backend, orquestração com Docker Compose e um pipeline automatizado no GitHub Actions.

A análise abaixo considera tanto o histórico de commits quanto os artefatos entregues no repositório, com atenção especial aos critérios solicitados para a Sprint 2: pipeline de CI/CD, Dockerfile, Docker Compose e documentação de métricas DORA.

### 1. Evolução da Interface e Experiência do Usuário
* **Resultado:** mapa mais funcional, com menu lateral, marcadores por categoria, localização do usuário e visualização detalhada de ocorrências.
* **Evidências:** commits `3f5c6e6`, `5696212`, `1562dc9`, `4e08934`, `d7e7d51`, `06d92ee` e `0a0522d`.
* **Análise:** A interface deixou de ser apenas uma visualização base do mapa e passou a representar melhor o fluxo central do produto: consultar ocorrências urbanas georreferenciadas.

As principais entregas no frontend foram:

| Entrega | Descrição |
| :--- | :--- |
| **DaisyUI e Lucide Icons** | Inclusão de componentes visuais e ícones para acelerar a construção da interface. |
| **Menu lateral** | Criação de uma navegação com identidade do Suricato e atalhos para novas ocorrências, minhas ocorrências e dashboard. |
| **Marcadores no mapa** | Adição de pins customizados para representar diferentes tipos de problemas urbanos. |
| **Localização do usuário** | Centralização e marcação da posição atual do usuário no mapa. |
| **Detalhe da ocorrência** | Abertura de um modal ao clicar em um marcador, exibindo título, categoria, descrição, usuário, data e apoios. |

#### 🔍 Observação sobre integração

O frontend já possui a experiência visual de consulta das ocorrências, mas os dados exibidos no mapa ainda estão mockados em `MapComponent.jsx`. A API de ocorrências já existe no backend, então um próximo passo natural é substituir os dados estáticos pelo consumo real do endpoint `/ocurrences`.

### 2. API de Registro de Ocorrências
* **Resultado:** criação da base do backend para listar e registrar ocorrências.
* **Evidências:** commits `a2b0107 - feat(occurrence): implement occurrence reporting API` e `94de85e - refactor(occurrence): apply static factory in DTOs and fix photo cascade persistence`.
* **Análise:** O backend ganhou uma primeira camada funcional para persistência de ocorrências, aproximando o sistema de um fluxo real de uso.

Foram adicionados os seguintes endpoints:

| Endpoint | Método | Finalidade |
| :--- | :--- | :--- |
| `/ocurrences` | `GET` | Listar ocorrências cadastradas. |
| `/ocurrences` | `POST` | Registrar uma nova ocorrência. |
| `/categories` | `GET` | Listar categorias ativas disponíveis. |

Além dos endpoints, a sprint incluiu DTOs de entrada e saída, tratamento global de exceções, validações de regras de negócio, serviços de domínio e uma migração Flyway com a estrutura inicial do banco.

#### 🧱 Estrutura de dados criada

A migração `V1_0_1__create_initial_schema.sql` criou tabelas para:

* cidades;
* categorias;
* usuários;
* ocorrências;
* fotos de ocorrências;
* confirmações;
* histórico de status.

Esse desenho já prepara o sistema para funcionalidades futuras, como confirmação de ocorrências por outros usuários, acompanhamento de status e registro de imagens.

### 3. Dockerização da Aplicação
* **Resultado:** Dockerfiles criados para frontend e backend.
* **Evidências:** `frontend/Dockerfile`, `backend/Dockerfile`, `frontend/.dockerignore` e `backend/.dockerignore`.
* **Análise:** A aplicação passou a ter uma forma padronizada de build e execução em containers, reduzindo dependência do ambiente local de cada integrante.

| Camada | Estratégia |
| :--- | :--- |
| **Frontend** | Build com Node 20 Alpine e publicação dos arquivos estáticos via Nginx. |
| **Backend** | Build com Maven e Java 21, seguido de execução do `.jar` em imagem com JRE. |

#### ✅ Critério da sprint

O requisito "Dockerfile para a aplicação" foi atendido com Dockerfiles separados para as duas partes principais do projeto. Essa separação é coerente com a arquitetura atual, pois frontend e backend possuem ciclos de build e runtime diferentes.

### 4. Docker Compose com Aplicação e Dependências
* **Resultado:** criação de um `docker-compose.yaml` na raiz do projeto.
* **Evidências:** serviço PostgreSQL, serviço do backend e serviço do frontend declarados no Compose.
* **Análise:** O Compose organiza a execução conjunta da aplicação e da dependência principal de banco de dados.

Serviços definidos:

| Serviço | Imagem | Porta |
| :--- | :--- | :--- |
| **postgres-suricato-db** | `postgres:17` | `5432:5432` |
| **suricato-backend-app** | `kketillen/suricato-backend:1.0.0` | `8080:8080` |
| **suricato-frontend-app** | `kketillen/suricato-web:1.0.0` | `5173:80` |

#### ✅ Ajuste de configuração entre containers

Para garantir que o backend encontre o banco quando ambos estiverem rodando pelo Docker Compose, o serviço `suricato-backend-app` recebeu variáveis de ambiente apontando para o nome do serviço PostgreSQL dentro da rede Docker:

```yaml
SPRING_DATASOURCE_URL: jdbc:postgresql://postgres-suricato-db:5432/suricato_db
```

O `application.properties` também foi ajustado para aceitar variáveis de ambiente com fallback para `localhost`. Assim, o backend continua funcionando no desenvolvimento local e no GitHub Actions, mas também passa a ter uma configuração adequada para execução containerizada.

Portanto, o requisito está atendido em termos de estrutura e configuração. A validação final recomendada é executar `docker compose up` em ambiente limpo e demonstrar frontend, backend e banco subindo juntos.

### 5. Pipeline de CI/CD no GitHub Actions
* **Resultado:** criação de workflow automatizado em `.github/workflows/github-ci.yml`.
* **Análise:** O pipeline cobre build do frontend, build/testes do backend e publicação de imagens Docker, atendendo ao objetivo de automatizar parte relevante do fluxo de entrega.

O workflow é disparado em:

* `push` para a branch `main`;
* `pull_request` para a branch `main`;
* execução manual via `workflow_dispatch`.

Jobs configurados:

| Job | Responsabilidade |
| :--- | :--- |
| **Frontend - Build and Test** | Instala dependências e executa o build do frontend. |
| **Frontend - Build and Push Docker Image** | Faz login no Docker Hub, gera e publica a imagem do frontend. |
| **Backend - Build and Test** | Sobe PostgreSQL como service, compila o backend e executa testes. |
| **Backend - Build and Push Docker Image** | Faz login no Docker Hub, gera e publica a imagem do backend. |


### 6. Métricas DORA Documentadas
* **Resultado:** documentação das métricas DORA criada em `sprint-2/documentacao-dora.md`.
* **Métricas documentadas:** frequência de implantação e lead time for changes.
* **Análise:** A documentação DORA conecta o trabalho técnico da sprint com indicadores reais de entrega, permitindo avaliar o ritmo e os gargalos do processo.

Resumo das métricas registradas:

| Métrica | Resultado |
| :--- | :--- |
| **Frequência de implantação** | 4 deploys em produção, considerando merges na `main` como gatilho de entrega. |
| **Lead time for changes** | Média de 93,60 horas, calculada do primeiro commit da branch até o merge do Pull Request. |

A análise do arquivo DORA também identificou diferenças importantes entre os Pull Requests:

* **PR #22:** melhor fluxo da sprint, com escopo menor e lead time de 25,34 horas.
* **PRs #19 e #21:** tempo intermediário, esperado para tarefas de infraestrutura e ajustes de CI/CD.
* **PR #23:** maior lead time, influenciado por escopo amplo e branch de vida mais longa.

### 7. Linha do Tempo dos Commits

| Data | Commit | Entrega |
| :--- | :--- | :--- |
| 10/05/2026 | `3f5c6e6` | Adição do DaisyUI e Lucide Icons. |
| 10/05/2026 | `5696212` | Ajuste da posição do controle de zoom. |
| 10/05/2026 | `1562dc9` | Criação do componente de menu. |
| 15/05/2026 | `4e08934` | Adição de marcadores no mapa. |
| 15/05/2026 | `d7e7d51` | Centralização na localização do usuário. |
| 16/05/2026 | `a1f4d3c` | Criação de workflows de CI/CD para frontend e backend. |
| 16/05/2026 | `7c699e6` | Ajustes no workflow com Node.js, Java e PostgreSQL. |
| 16/05/2026 | `e86c087` | Ajustes de infraestrutura. |
| 16/05/2026 | `981bf84` | Criação do workflow CI/CD Suricato. |
| 16/05/2026 | `5a4108e` | Inclusão do gatilho manual `workflow_dispatch`. |
| 16/05/2026 | `51a7523` | Remoção de workflow duplicado/antigo. |
| 16/05/2026 | `809f0d8` | Limpeza de comentários no workflow. |
| 17/05/2026 | `a2b0107` | Implementação da API de registro de ocorrências. |
| 18/05/2026 | `94de85e` | Refatoração dos DTOs e correção de persistência de fotos. |
| 18/05/2026 | `e899259` | Merge do PR de registro de ocorrências. |
| 19/05/2026 | `06d92ee` | Detalhe da ocorrência ao clicar no marcador. |
| 19/05/2026 | `0a0522d` | Ajuste textual na interface. |

### 8. Aderência aos Requisitos da Sprint

| Requisito | Status | Evidência |
| :--- | :--- | :--- |
| **Pipeline de CI/CD no GitHub Actions funcionando** | Atendido | Workflow `.github/workflows/github-ci.yml` com build, testes e publicação de imagens. A validação final deve mostrar uma execução verde no GitHub Actions. |
| **Dockerfile para a aplicação** | Atendido | Dockerfiles em `frontend/Dockerfile` e `backend/Dockerfile`. |
| **Docker Compose rodando aplicação e dependências** | Atendido com validação recomendada | `docker-compose.yaml` com PostgreSQL, backend e frontend. O backend recebe `SPRING_DATASOURCE_URL` apontando para o serviço `postgres-suricato-db`. |
| **Pelo menos 2 métricas DORA documentadas** | Atendido | `sprint-2/documentacao-dora.md` documenta frequência de implantação e lead time for changes. |

### 9. Conclusão

A Sprint 2 entregou uma base técnica importante para o Suricato. O projeto evoluiu em produto, com uma interface de mapa mais próxima da experiência final; em backend, com a criação da API inicial de ocorrências; e em infraestrutura, com Docker, Docker Compose e GitHub Actions.

O principal ganho da sprint foi sair de um protótipo visual para uma aplicação com estrutura de entrega mais profissional. O principal ponto de atenção agora é fechar a integração ponta a ponta no produto: consumir a API real no frontend e validar o Docker Compose em ambiente limpo para demonstrar frontend, backend e banco executando juntos.

Com isso, a sprint atende aos critérios centrais solicitados e deixa claro quais pontos ainda precisam de refinamento para a próxima etapa do projeto.
