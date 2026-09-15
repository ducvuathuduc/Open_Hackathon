# 03 — Technical Architecture

## 1. Frozen hackathon architecture

### Frontend
- Vite
- React
- TypeScript strict
- Tailwind CSS
- shadcn/ui
- Motion
- TanStack Query
- Zod
- PWA plugin/service worker

**Do not migrate to Next.js during the hackathon.**

Reason: current implementation is already Vite-based and building successfully. A framework migration adds risk without improving the winning demo.

### Backend
Appwrite:
- Auth
- TablesDB
- Storage
- Realtime
- Functions
- Sites / web deployment as appropriate

### AI
- `gemini-3.7-flash` — pinned core multimodal reasoning
- `gemini-3.1-flash-live-preview` — optional realtime voice P1
- `gemini-embedding-2` — vector retrieval when justified/post-P0

### Maps
- MapLibre GL JS
- OpenStreetMap-compatible tiles/source with required attribution
- map remains P1, not a blocker for P0

## 2. Current free-tier-aware deployment model

Appwrite Free currently documents:
- 1 database
- 1 bucket
- 2 functions per project
- 5GB bandwidth
- 2GB storage
- 750K executions
- 75K MAU

If Appwrite Education is confirmed for the account, each project is Pro-equivalent (with the current Education project limit documented separately). Do not assume Education until the project/account shows it.

### Function consolidation on Free

Function 1: `ai-gateway`
Routes:
- lens
- tone-check
- reply
- sim
- study
- optional embedding

Function 2: `data-worker`
Routes/jobs:
- ingest source
- extract facts
- recheck freshness
- seed/update data

## 3. High-level architecture

```text
Mobile Browser / PWA
        |
        | Appwrite Web SDK
        v
Appwrite Auth + TablesDB + Storage + Realtime
        |
        | Server-side secret boundary
        v
Appwrite Function: ai-gateway
        |
        +--> Gemini 3.7 Flash
        +--> optional Gemini Live
        |
        v
Structured JSON validated by schema
        |
        v
UI + persistence

Source Registry
   |
data-worker
   |
structured knowledge facts
   |
TablesDB filters (P0)
   |
optional embeddings/VectorsDB (later)
```

## 4. Why TablesDB retrieval first

For hackathon corpus sizes (hundreds to low thousands of structured facts), use metadata-first retrieval:
- host country
- city
- university
- context
- category
- authority tier

Return 10–25 relevant facts to the model.

This avoids adding a vector system as a critical demo dependency.

VectorsDB can be introduced after P0 or when Education/dedicated database availability is confirmed.

## 5. AI request pattern

Browser never holds model API secret.

Browser:
1. upload temporary image if needed,
2. call Appwrite Function,
3. function retrieves current user/journey and relevant facts,
4. function calls Gemini,
5. validates structured output,
6. returns safe result,
7. persists only allowed derived fields.

## 6. Media privacy

Default screenshot/audio lifecycle:
- temporary upload or inline request,
- process,
- derived insight persisted,
- original deleted/expired unless user explicitly saves.

Use short-lived storage permissions and cleanup job when practical.

## 7. Realtime social

Appwrite Realtime:
- conversation messages
- match/request updates
- local verification updates

Permissions:
- conversation members only
- public profile fields explicitly separated from private fields
- report/block rows private to reporter + moderation/admin

## 8. Scalability strategy

### Hackathon
- single Appwrite project
- single logical TablesDB database
- consolidated functions
- seed corpus
- client caching
- PWA static assets

### Post-hackathon
- dedicated/vector database if needed
- ingestion queue
- source monitoring
- richer university indexing
- CDN/static country content
- background jobs
- analytics/observability
- institution tenant separation

## 9. Performance targets

P0 targets, not hard SLA:
- initial mobile shell meaningful paint: fast enough on 4G
- Today/Passport cached/navigation: near-instant
- YapLens text target: ~3–7s, gracefully show staged processing
- screenshot target: ~5–12s depending on API
- no blocking data crawl during interactive request
- all AI routes have timeout and user-readable retry

## 10. Dependency policy

Allowed new dependencies only when:
- materially reduce implementation risk,
- maintained,
- compatible with current stack,
- do not introduce a second competing framework.

No Docker/WSL dependency for local development.
