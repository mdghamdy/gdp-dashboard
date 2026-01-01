# GDP Dashboard Monorepo

This repository is a pnpm workspace containing a Vite + React + Tailwind web app and a Fastify + TypeScript API.

## Structure

- `apps/web` — React client (Vite + Tailwind)
- `services/api` — Fastify API (TypeScript)

## Getting started

```bash
pnpm install
```

## Common commands

```bash
# Run everything in watch mode
pnpm dev

# Run only the web app
pnpm --filter @gdp-dashboard/web dev

# Run only the API
pnpm --filter @gdp-dashboard/api dev

# Lint all workspaces
pnpm lint

# Run all tests
pnpm test
```
