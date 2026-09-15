# ADR-001: Adopt `gemini-3.8-flash` for core AI

- **Status:** Accepted
- **Date:** 2026-09-15
- **Decision owner:** Product owner approval captured in the Foundation Lock request

## Context

The frozen v1.0 spec named `gemini-3.7-flash` as the primary multimodal model.
Before the first AI integration has been built, `gemini-3.8-flash` is available
as a stable, production-ready Gemini API model. The change therefore has no
runtime data migration or client compatibility cost.

## Decision

- Use `gemini-3.8-flash` for core multimodal AI calls in Appwrite's
  server-side `ai-gateway` function.
- Keep `gemini-3.7-flash` as the fallback when the primary model is
  unavailable or returns an invalid structured response after the allowed retry.
- Keep `gemini-3.1-flash-live-preview` as the optional P1 realtime-voice model.
- Keep `gemini-embedding-2` optional and post-P0.

All model calls remain server-side. Browser code may never receive a Gemini API
key. Every Lens/Sim/Study structured response must be validated against its
contract before it reaches feature UI.

## Consequences

`config/project-decisions.yaml` supersedes older references to the former core
model. Historical spec-pack files remain unchanged so provenance is preserved.
No other product, data, API, or navigation decision changes.

## Evidence

Google Gemini API model documentation lists `gemini-3.8-flash` as generally
available and production-ready: <https://ai.google.dev/gemini-api/docs/models>.
