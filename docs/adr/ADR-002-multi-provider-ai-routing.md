# ADR-002: Multi-provider AI routing for `ai-gateway`

- **Status:** Accepted
- **Date:** 2026-09-15
- **Decision owner:** Product owner (approved directly, superseding the
  single-provider assumption in `docs/03_TECH_ARCHITECTURE.md` §"AI")

## Context

The frozen spec pinned Gemini as the only AI provider. For hackathon cost and
latency reasons, the product owner approved routing different `ai-gateway`
responsibilities to different free-tier providers, keeping Gemini as the
primary multimodal/reasoning engine and adding fast text-only and emergency
fallback providers.

This does not change any P0 feature contract in `docs/05_AI_CONTRACTS.md` or
`docs/07_API_CONTRACTS.md` — `lens.interpret`, `reply.rewrite`, `sim.*`, and
`study.*` still return the same schemas. It changes only which upstream model
`ai-gateway` calls per responsibility, entirely server-side.

## Decision

| Responsibility | Provider / model | Rationale |
|---|---|---|
| Screenshot / image / PDF / Lens multimodal | `gemini-3.8-flash` | strongest free multimodal option evaluated |
| Complex cultural/context reasoning | `gemini-3.8-flash` | 1M context, structured output, tool calling |
| Text-only Lens / tone / reply | Groq `gpt-oss-120b` | very fast, large model, free tier |
| Structured JSON extraction | Groq `gpt-oss-120b` | strict JSON-schema mode |
| Cheap text fallback | Groq `qwen3-27b` (as scoped: "Qwen 3.8 27B") | fast, tool use |
| Speech-to-text | Groq `whisper-large-v3-turbo` | fastest STT evaluated |
| Realtime natural voice conversation | `gemini-3.1-flash-live-preview` | audio↔audio realtime, matches existing P1 pin |
| Emergency free fallback | Cloudflare Workers AI | 10k free neurons/day |
| Last-resort router | OpenRouter (free-tier models) | broad model coverage when all above fail |

Fallback order per request, applied inside `ai-gateway` only:

1. Try the primary provider for the responsibility above.
2. On timeout/error/invalid schema, retry once against the same provider.
3. On repeated failure, fall back down the table (e.g. Groq → Cloudflare →
   OpenRouter) while preserving the same response schema.
4. If every provider fails, return the standard error envelope from
   `docs/07_API_CONTRACTS.md` (`AI_TIMEOUT` / `SCHEMA_INVALID`) — never a
   silent fabricated answer.

All provider API keys are server-only (`ai-gateway` Appwrite Function
environment). No provider key is ever sent to the browser or committed to
this repository. `.env.example` documents the required variable names without
values.

## Consequences

- `ai-gateway` needs a small internal router keyed by responsibility, not one
  hardcoded model call. This is an implementation detail of the function,
  not a client-facing contract change.
- Every provider's structured output must still pass the same Zod/JSON
  schema validation in `schemas/` before reaching the client — provider
  identity is invisible to the frontend.
- `config/project-decisions.yaml` `ai_primary`/`ai_primary_fallback` remain
  the Gemini values from ADR-001; this ADR adds the secondary-provider
  routing table without replacing that decision.
- Because free-tier keys were shared for local testing through this thread's
  chat, they must be treated as already exposed: rotate/regenerate them in
  each provider's dashboard after testing, and never re-paste raw keys into
  chat, PR descriptions, or committed files.
