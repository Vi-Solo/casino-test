# Nest DDD TypeORM Postgres API

Small REST API demonstrating DDD layering with NestJS, TypeORM, and Postgres.

## Features
- Tables and Players CRUD
- List players assigned to a table: `GET /tables/:id/players`
- UUID IDs, uniqueness: `tables.name`, `players (name, tableId)`
- Pagination: `?limit=10&offset=0`
- Centralized env config

## Quick start

1) Create `.env` from example

```
PORT=3000
TYPEORM_LOGGING=false

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nest_ddd
```

2) Start Postgres via Docker

```
docker compose up -d
```

3) Install deps and run dev

```
npm install
npm run start:dev
```

Server: http://localhost:3000

## API

Tables
- Create: `POST /tables` body: `{ "name": "Main" }`
- List: `GET /tables?limit=10&offset=0`
- Get: `GET /tables/:id`
- Update: `PATCH /tables/:id` body: `{ "name": "New" }`
- Delete: `DELETE /tables/:id`
- List players: `GET /tables/:id/players?limit=10&offset=0`

Players
- Create: `POST /players` body: `{ "name": "Alice", "tableId": "<uuid>" }`
- List: `GET /players?limit=10&offset=0`
- Get: `GET /players/:id`
- Update: `PATCH /players/:id` body: `{ "name": "Bob" }`
- Delete: `DELETE /players/:id`

## Project structure (DDD)

- `src/domain` — entities and repository interfaces
- `src/application` — services/use-cases
- `src/infra/typeorm` — ORM entities, repositories, persistence module
- `src/interfaces/http` — controllers, DTOs, filters
- `src/modules` — feature modules
- `src/config` — env config

## Notes
- `synchronize: true` is enabled for test task simplicity. For production, use migrations and disable synchronize. 