# suricato-api

## Pré-requisitos

- Java 21
- Maven 3.9+
- PostgreSQL 15+

## Dependências principais

| Dependência | Versão |
|---|---|
| Spring Boot | 3.3.5 |
| Spring Web | — |
| Spring Data JPA | — |
| Spring Validation | — |
| PostgreSQL Driver | — |
| Lombok | — |

## Configuração do banco

```sql
CREATE DATABASE suricato_db;
```

As credenciais padrão estão em `src/main/resources/application.properties`:

```
url: jdbc:postgresql://localhost:5432/suricato_db
username: postgres
password: postgres
```

## Como executar

```bash
cd backend
mvn spring-boot:run
```

A API ficará disponível em `http://localhost:8080`.
