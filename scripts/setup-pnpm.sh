#!/usr/bin/env bash
set -euo pipefail

PNPM_VERSION="${PNPM_VERSION:-9.12.3}"
REGISTRY="${COREPACK_NPM_REGISTRY:-${NPM_CONFIG_REGISTRY:-${NPM_REGISTRY:-}}}"

if [[ -n "${REGISTRY}" ]]; then
  export COREPACK_NPM_REGISTRY="${REGISTRY}"
  npm config set registry "${REGISTRY}"
fi

if command -v corepack >/dev/null 2>&1; then
  corepack enable
  if ! corepack prepare "pnpm@${PNPM_VERSION}" --activate; then
    if [[ "${USE_NPM_FALLBACK:-0}" == "1" ]]; then
      echo "Corepack prepare failed; falling back to npm install -g pnpm@${PNPM_VERSION}." >&2
      npm install -g "pnpm@${PNPM_VERSION}"
    else
      echo "Corepack prepare failed. Set USE_NPM_FALLBACK=1 to allow npm fallback." >&2
      exit 1
    fi
  fi
else
  if [[ "${USE_NPM_FALLBACK:-0}" == "1" ]]; then
    echo "Corepack not available; falling back to npm install -g pnpm@${PNPM_VERSION}." >&2
    npm install -g "pnpm@${PNPM_VERSION}"
  else
    echo "Corepack not available. Set USE_NPM_FALLBACK=1 to allow npm fallback." >&2
    exit 1
  fi
fi

pnpm --version
