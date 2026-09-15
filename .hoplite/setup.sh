#!/usr/bin/env bash
# Durable fresh-sandbox setup for YapYep (Vite + React + TS, pnpm).
set -euo pipefail
cd "$(dirname "$0")/.."
# Install exactly what the lockfile pins; keeps vite/tsc available for preview and verification.
pnpm install --frozen-lockfile
