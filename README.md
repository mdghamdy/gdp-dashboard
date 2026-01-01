# GDP Dashboard Monorepo

This repository is a pnpm workspace containing a Vite + React + Tailwind web app and a Fastify + TypeScript API.

## Structure

- `apps/web` — React client (Vite + Tailwind)
- `services/api` — Fastify API (TypeScript)

## Tooling setup (local + CI)

We pin pnpm via Corepack. In proxy-restricted environments, Corepack can 403 when it tries to download pnpm.
Use the bootstrap script below to point Corepack (and npm fallbacks) at your registry mirror.

```bash
# Required for proxy/mirror environments
export HTTP_PROXY="http://proxy.example:8080"
export HTTPS_PROXY="http://proxy.example:8080"
export NO_PROXY="localhost,127.0.0.1"

# Required: registry mirror for Corepack/npm
export NPM_CONFIG_REGISTRY="https://registry.npmjs.org/"
# Optional alternative: export COREPACK_NPM_REGISTRY="https://registry.npmjs.org/"

./scripts/setup-pnpm.sh
pnpm install
```

### Verification

Expected output includes a pnpm version line, for example:

```
9.12.3
```

Failure modes:

- `Corepack prepare failed...` indicates registry/proxy access issues; verify `HTTP_PROXY/HTTPS_PROXY/NO_PROXY` and `NPM_CONFIG_REGISTRY`.
- `Corepack not available...` indicates Corepack is missing; enable it or set `USE_NPM_FALLBACK=1`.

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
