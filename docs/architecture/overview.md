# Architecture Overview — hello-word-B

## Scope
Fullstack proof path: PostgreSQL stores one display-text row, Go backend reads it, Next.js frontend renders it centered. No auth, editing, admin UI, analytics, animation, or extra pages.

## Stack
| Part | Choice | Reason |
|---|---|---|
| Frontend | Next.js 15 App Router, TypeScript, Tailwind v3 | Matches repository convention and one-page UI need |
| Backend | Go 1.22+ HTTP server | Small API, easy container build, existing CI checks Go |
| Database | PostgreSQL 16 | Required by SRS for persisted display text |
| Runtime | `docker compose --profile local up` from repo root | Boots DB, backend, frontend together |

## Folder layout
```text
code/backend/
  cmd/api/main.go
  internal/migrations/
  migrations/*.sql
  .env.example
code/frontend/
  app/layout.tsx
  app/page.tsx
  app/globals.css
  components/        # Dev stories add one PascalCase component here
  lib/mock/          # Mock data only until backend story replaces it
docs/architecture/
  overview.md
  erd.md
  services.md
```

## Data flow
1. Backend starts, reads `DATABASE_URL`, applies migrations from `code/backend/migrations`, then listens on `PORT`, fallback `APP_PORT`, fallback `8080`.
2. `/healthz` returns 200 only after migrations succeeded and `SELECT 1` works.
3. Future story adds frontend fetch to `GET /v1/display-text`; page must not hardcode `Hello Word`.

## Naming conventions
- Backend entry point stays `cmd/api/main.go`; Dockerfile builds `./cmd/api`.
- API routes use `/v1/...` with no `/api` prefix.
- Frontend `app/page.tsx` is composition root only; story components use `export default function ComponentName()`.
- Shared visual values live in `app/globals.css` tokens; CSS modules use tokens with no `var(..., fallback)`.

## Environment variables
| Service | Key | Purpose |
|---|---|---|
| backend | `DATABASE_URL` | PostgreSQL connection string injected by runtime |
| backend | `PORT` | HTTP listen port |
| backend | `APP_PORT` | Legacy fallback if `PORT` unset |
| frontend | `NEXT_PUBLIC_API_URL` | Browser-visible backend base URL |
| compose | `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` | Local database bootstrap |
| compose | `BACKEND_PORT`, `FRONTEND_PORT` | Optional host port overrides |

## Failure handling
- Backend errors use one JSON envelope: `{"error":{"code":"...","message":"..."}}`.
- Database/migration failure blocks healthy state; service exits or returns unhealthy rather than serving partial data.
- Frontend must not invent fallback copy when API fails; no approved error UI exists.

## Observability
- Backend logs startup, migration, and request failures to stdout/stderr for container logs.
- No metrics/tracing; add only when product grows beyond pipeline proof.

## Decisions and rejected alternatives
| Decision | Kept | Rejected | Tradeoff |
|---|---|---|---|
| Fullstack shape | FE + Go API + PostgreSQL | Static hardcoded page | More moving parts, but SRS requires DB-backed text |
| Self-migrating backend | Apply SQL on boot | Manual migration step | Slower startup, but empty runtime DB works reliably |
| Plain `net/http` | Standard library router | New router dependency | Less convenience, fewer dependencies |
| Tailwind scaffold | Tailwind + CSS tokens | Component-only CSS values | More upfront tokens, fewer review failures |
| One display row | Fixed singleton table row | Editable/list model | Meets scope, avoids admin features |

## How to run
1. Copy `.env.example` to `.env` if overriding defaults.
2. Run `docker compose --profile local up --build` from repo root.
3. Frontend: `http://localhost:3000`; backend health: `http://localhost:8080/healthz`.

## Local checks
- Backend: `cd code/backend && go build ./... && go vet ./... && go test ./...`
- Frontend: `cd code/frontend && npm ci && npm run lint && npm run build && npm test --if-present`
- CI source of truth: `.github/workflows/ci.yml` plus container workflows already committed.
