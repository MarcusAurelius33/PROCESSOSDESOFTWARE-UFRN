# Suricato API

## Pré-requisitos

- Java 21
- Maven 3.9+
- Docker e Docker Compose

## Dependências principais

| Dependência       | Versão |
| ----------------- | ------ |
| Spring Boot       | 3.3.5  |
| Spring Web        | —      |
| Spring Data JPA   | —      |
| Spring Validation | —      |
| PostgreSQL Driver | —      |
| Lombok            | —      |
| Flyway            | —      |

## Como executar

### Com Docker

Estando na raiz do repositório onde o `docker-compose.yml` está localizado, execute:

```bash
docker compose up -d postgres-suricato-db suricato-backend-app
```

A API ficará disponível em `http://localhost:8080`.

### Sem Docker (desenvolvimento local)

Suba apenas o banco via Docker:

```bash
docker compose up -d postgres-suricato-db
```

Em seguida, execute o backend:

```bash
cd backend
mvn spring-boot:run
```

ou, se não tiver o Maven instalado:

```bash
cd backend
./mvnw spring-boot:run
```

A API ficará disponível em `http://localhost:8080`.

## Configuração do banco

As credenciais padrão estão em `src/main/resources/application.properties`:

```
url: jdbc:postgresql://localhost:5432/suricato_db
username: postgres
password: postgres
```