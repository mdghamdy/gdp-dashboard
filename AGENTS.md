# AGENTS

## Coding standards
- Use TypeScript `strict` mode.
- Avoid `any`; prefer explicit, narrow types.

## UX rules
- Design for a medical workstation context.
- Present information as signal → reason → action.
- Do not include PII in demos or sample data.

## Security rules
- Use one-time tokens when required.
- Enforce token expiry.
- Require idempotency keys on commands.

## Testing
- Use Vitest for core functions and ensure coverage where applicable.

## Cursor Cloud specific instructions

### Monorepo layout
- **Web** (`apps/web`, `@gdp-dashboard/web`): Vite dev server on port **5173** (default). Set `VITE_API_BASE` if the API is not on `http://localhost:3000`.
- **API** (`services/api`, `@gdp-dashboard/api`): Fastify on port **3000**. In-memory store; seeds `demo-token` (60 min TTL) on startup. `GET /health` for readiness.

### Commands (from repo root)
See `README.md` for install (`pnpm install`) and workspace scripts (`pnpm dev`, `pnpm lint`, `pnpm test`). Per-package: `pnpm --filter @gdp-dashboard/web dev` and `pnpm --filter @gdp-dashboard/api dev`.

### Running services for manual E2E
Use separate terminals (or tmux sessions), not only `pnpm dev` in one pane, when you need stable logs:
1. `pnpm --filter @gdp-dashboard/api dev`
2. `pnpm --filter @gdp-dashboard/web dev`

Dashboard-only testing needs **web only** (`http://localhost:5173/`). Token landing (`http://localhost:5173/l/demo-token`) needs **web + API**.

### API dependency note (Fastify 4)
On a clean `pnpm install` from `main`, `@fastify/cors@10` is incompatible with Fastify 4 and **`pnpm --filter @gdp-dashboard/api dev` fails** until CORS is aligned. For local/cloud dev, run once:

`pnpm --filter @gdp-dashboard/api add @fastify/cors@^9`

Then reinstall if needed. Builds (`pnpm --filter @gdp-dashboard/api build`) still succeed without this step; only the dev/runtime server registration fails.

### Lint / test caveats
- **Lint**: API ESLint may report `'process' is not defined` on `server.ts` until Node globals are configured in ESLint.
- **Web unit tests**: Vitest needs `test.globals: true` in `apps/web/vite.config.ts` (tests use `describe`/`it` without imports). Until fixed, `pnpm test` fails on web despite `vitest/globals` in tsconfig.

### Hello-world E2E checks
- Dashboard: open `/` and confirm severity-sorted signals and context bar.
- Token flow: open `/l/demo-token`, submit a check-in (requires `Idempotency-Key` on POST). Restart the API to reset in-memory `demo-token` state between runs.
