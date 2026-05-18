# Suricato Web

## Pré-requisitos

- Node.js 20+
- npm 10+
- Docker e Docker Compose

## Dependências principais

| Dependência      | Versão |
|---|---|
| React            | 19     |
| Vite             | 6      |
| Tailwind CSS     | 4      |
| React Router DOM | 7      |
| Axios            | —      |

## Como executar

### Com Docker

Estando na raiz do repositório onde o `docker-compose.yml` está localizado, execute:

```bash
docker compose up -d suricato-frontend-app
```

A aplicação ficará disponível em `http://localhost:5173`.

### Sem Docker (desenvolvimento local)

Execute os seguintes comandos estando na raiz do repositório:

```bash
cd frontend
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.