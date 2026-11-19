# Template

A Bun, Turbo, and Biome monorepo with one example feature: a note. The browser talks to GraphQL, and GraphQL talks to Postgres. Webhooks only answers a health check and an example route.

## Requirements

- Bun 1.3 or newer (this lockfile was created with 1.4.5)
- Node.js 22 or newer, for Next.js, Prisma, and GraphQL Codegen
- Docker, for Postgres and the production-shaped stack

## First run

```sh
cp packages/db/.env.example packages/db/.env
cp apps/web-app/.env.example apps/web-app/.env.local
cp apps/webhooks/.env.example apps/webhooks/.env
bun install
bun run db:generate
```

## Development

Start Postgres, apply the migration, then run the apps on the host:

```sh
docker compose up postgres -d
bun run db:deploy
bun run dev
```

- Web app: http://localhost:3100
- GraphQL: http://localhost:4100/graphql
- Webhooks: http://localhost:4101/health

Create a note in the browser and reload the page. It should still be listed.

Do not run `bun run dev` at the same time as the full Compose stack. They use the same ports.

## Checks

```sh
bun run test:unit
bun run check-types
bun run lint
bun run build
bun run --filter web-app test:e2e
```

The Playwright test only checks that the form renders. It does not need Postgres.

`bun test` from the repo root does not run the Playwright file. That file is named `notes.e2e.ts`.

## Production-shaped Docker

Stop the host apps first.

```sh
docker compose up --build
```

The web image is built with `NEXT_PUBLIC_GRAPHQL_API_BASE_URI=http://localhost:4100/graphql`. GraphQL applies migrations before it listens.

## Where code goes

| Concern                                     | Package          |
| ------------------------------------------- | ---------------- |
| Colours, radius, durations                  | `@repo/tokens`   |
| Web components and `theme.css`              | `@repo/ui`       |
| Generic helpers                             | `@repo/utils`    |
| Note title rule                             | `@repo/domain`   |
| Cross-app types                             | `@repo/types`    |
| Auth, storage, router, analytics interfaces | `@repo/platform` |
| GraphQL documents and hooks                 | `@repo/api`      |
| `useNotes`                                  | `@repo/data`     |
| Database                                    | `@repo/db`       |
| Logs                                        | `@repo/logging`  |

The GraphQL schema files are the only declaration of a note. After changing them, run `bun run codegen` and commit the generated files. After changing tokens, run `bun run theme:generate`.

Add payments, email, analytics, task queues, a marketing site, or a mobile app when a product needs them. A future native component library should import `@repo/tokens` and ignore `theme.css`.

Authentication is not wired up. When you add it, implement `AuthAdapter` in the web app and put the current user on the GraphQL context.
