---
name: yapyep-gemini
description: Gemini model routing and structured output rules.
---
# Gemini
Pinned core model: gemini-3.7-flash.
Optional live model: gemini-3.1-flash-live-preview.
Optional embeddings: gemini-embedding-2.
All model calls with secrets go server-side.
Validate structured output using Zod/JSON schema.
On invalid output retry once, then safe fallback.
Do not silently change model IDs.
