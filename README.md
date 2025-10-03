# Nest DDD TypeORM Postgres API

Small REST API demonstrating DDD layering with NestJS, TypeORM, and Postgres.

## Features
- Tables and Players CRUD
- List players assigned to a table: `GET /tables/:id/players`
- UUID IDs, uniqueness: `tables.name`, `players (name, tableId)`
- Pagination: `?limit=10&offset=0`
- Centralized env config
- Domain-driven design architecture
- TypeORM with PostgreSQL
- Docker support

## Quick start

1) Create `.env` file with the following variables:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nest_ddd

# TypeORM
TYPEORM_LOGGING=true
TYPEORM_SYNCHRONIZE=false
TYPEORM_MIGRATIONS_DIR=src/migrations
```

2) Start Postgres via Docker

```
docker compose up -d
```

3) Install dependencies

```
npm install
```

4) Run migrations

```
npm run migration:run
```

> **Note:** If you see "No migrations are pending", the database is already set up and you can skip this step.

5) Seed demo data (optional)

```
npm run seed
```

6) Start the application

```
npm run start:dev
```

Server: http://localhost:3000

## Migrations

- Generate (from current entities):
```
npm run migration:generate
```
- Run:
```
npm run migration:run
```
- Revert last:
```
npm run migration:revert
```

Ensure `TYPEORM_SYNCHRONIZE=false` when using migrations.

## Seeding (demo data)

- Seeds: creates demo tables (Blackjack, Poker, Roulette) and 20 players with unique emails, assigns players to tables round-robin.
- Run:
```
npm run seed
```

## Adminer (DB UI)

- Open: http://localhost:8080
- System: PostgreSQL
- Server: db (или localhost)
- User: postgres
- Password: postgres
- Database: nest_ddd

## API

Tables
- Create: `POST /tables` body: `{ "name": "Main" }`
- List: `GET /tables?limit=10&offset=0`
- Get: `GET /tables/:id`
- Update: `PATCH /tables/:id` body: `{ "name": "New" }`
- Delete: `DELETE /tables/:id`
- List players: `GET /tables/:id/players?limit=10&offset=0`

Players
- Create: `POST /players` body: `{ "name": "Alice", "email": "alice@example.com", "tableId": "<uuid>" }`
- List: `GET /players?limit=10&offset=0`
- Get: `GET /players/:id`
- Update: `PATCH /players/:id` body: `{ "name": "Bob" }`
- Delete: `DELETE /players/:id`

## Testing the API

After starting the application, you can test the endpoints:

```bash
# Create a table
curl -X POST http://localhost:3000/tables -H "Content-Type: application/json" -d '{"name": "Blackjack"}'

# Get all tables
curl http://localhost:3000/tables

# Create a player
curl -X POST http://localhost:3000/players -H "Content-Type: application/json" -d '{"name": "Player 1", "email": "player1@example.com", "tableId": "<table-uuid>"}'

# Get players for a specific table
curl http://localhost:3000/tables/<table-uuid>/players
```

## Project structure (DDD)

- `src/domain` — entities and repository interfaces
- `src/application` — services/use-cases and modules
- `src/infra/typeorm` — ORM entities, repositories, persistence module, data-source
- `src/interfaces/http` — controllers, DTOs, filters
- `src/config` — environment configuration
- `src/migrations` — database migrations
- `src/scripts` — utility scripts

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | - | Environment mode (development/production) |
| `PORT` | `3000` | Application port |
| `POSTGRES_HOST` | `localhost` | Database host |
| `POSTGRES_PORT` | `5432` | Database port |
| `POSTGRES_DB` | `nest_ddd` | Database name |
| `POSTGRES_USER` | `postgres` | Database user |
| `POSTGRES_PASSWORD` | `postgres` | Database password |
| `TYPEORM_LOGGING` | `false` | Enable TypeORM logging |
| `TYPEORM_SYNCHRONIZE` | `false` | Auto-sync database schema |
| `TYPEORM_MIGRATIONS_DIR` | `src/migrations` | Migrations directory |

## First-time setup

When running the application for the first time:

1. **Migrations are required** - The database schema needs to be created
2. **Seeding is optional** - Demo data helps with testing but is not required
3. **Without migrations** - The application will fail to start due to missing tables
4. **Without seeding** - You'll start with an empty database

## Notes
- For production, disable synchronize and use migrations
- All environment variables have sensible defaults
- The application will work without a `.env` file using default values
- **Always run migrations before starting the application for the first time** 