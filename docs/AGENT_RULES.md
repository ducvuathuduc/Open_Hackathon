# Agent Rules — YapYep Spec Pack (full text)

This is the complete, verbatim mandatory-instructions document shipped in
`yapyep-agent-spec-pack-v1.0.zip` (`AGENTS.md` inside the pack). The
repository-root `AGENTS.md` carries a condensed version wired into the actual
Hoplite/Figma Make scaffold; this file is the full authoritative text for
anyone doing deeper backend/AI/data work. If the two ever disagree, resolve
per the precedence order in `README.md` (repo `AGENTS.md` wins for
scaffold/dev-server facts; this document and `config/project-decisions.yaml`
win for product/architecture rules).

---

# AGENTS.md — Mandatory Instructions for All YapYep Coding Agents

## 0. Non-negotiable rule

**Do not invent architecture, APIs, product scope, database fields, visual systems, model names, or user flows.**

If a requested change is not supported by this spec or existing repository behavior:
1. stop,
2. describe the conflict,
3. propose the smallest Product Decision Record,
4. wait for explicit approval before changing the frozen architecture.

## 1. Product identity

YapYep is an **ASEAN intercultural learning and adaptation product for exchange/international students**.

It must directly support Track 2 outcomes:
- **Learn**
- **Communicate**
- **Adapt**

Do not turn it into:
- a tourism super-app,
- a visa-management product,
- a scholarship search engine,
- a social network clone,
- a generic AI chat app,
- a Duolingo clone,
- a Google Translate clone.

## 2. Current architecture is frozen for hackathon

Current frontend stack:
- Vite
- React
- TypeScript
- Tailwind
- shadcn/ui
- Motion
- TanStack Query
- Zod
- PWA

Backend:
- Appwrite Auth
- Appwrite TablesDB
- Appwrite Storage
- Appwrite Realtime
- Appwrite Functions
- Appwrite Sites/static web deployment as applicable

AI:
- Primary: `gemini-3.7-flash`
- Realtime voice P1: `gemini-3.1-flash-live-preview`
- Embeddings post-P0 / when justified: `gemini-embedding-2`

**Do not migrate the frontend to Next.js during the hackathon.**

## 3. UX frozen decisions

Bottom navigation:
1. Today
2. Passport
3. Lens
4. Explore
5. Connect

Practice/YapSim is contextual and is not a permanent bottom tab.

Primary mobile viewport: **390 × 844**.
Minimum touch target: **44 × 44 px**.

Design tokens:
- Primary: `#3157D5`
- Accent: `#FFB648`
- Background: `#F6F7F3`
- Surface: `#FFFFFF`
- Text: `#172033`
- Muted: `#667085`
- Success: `#169B62`
- Warning: `#F59E0B`
- Error: `#E5484D`
- Font: Geist (fallback Inter/system)
- Card radius: 20px
- Button radius: 14–16px

## 4. Core data model

Do not collapse or rename these concepts without approval:
- `MyDNA`: personal communication profile from assessment
- `CountryDNA`: country knowledge packs; NOT personality
- `ContextDNA`: situation-specific context
- `UniversityDNA`: institution-specific context
- `PairDNA`: directional adaptation context generated from home + host + person + situation

**Vietnam→Singapore and Singapore→Vietnam must produce different directional guidance.**

## 5. ASEAN scope

Support all 11 current ASEAN members:
- Brunei Darussalam
- Cambodia
- Indonesia
- Lao PDR
- Malaysia
- Myanmar
- Philippines
- Singapore
- Thailand
- Timor-Leste
- Viet Nam

Architecture supports all 110 directional pairs. Rich demo data may be deeper for VN, SG, TH, ID, MY, PH.

## 6. AI safety and trust

Never emit cultural claims as deterministic nationality rules.

Bad:
> Singaporeans are direct.

Good:
> In some Singapore university/team contexts, more explicit feedback may be common. Individual preferences vary.

Administrative guidance:
- requires Tier A/B source,
- must show source + freshness,
- if no authoritative source exists: return `unverified` and do not invent.

Private screenshots/messages:
- process by default,
- do not persist raw media unless user explicitly saves,
- redact obvious PII before model logging where practical.

## 7. Server security

- Never expose Gemini API keys in browser/Vite public env.
- Never expose Appwrite server API keys in browser.
- Public client may only receive Appwrite endpoint/project IDs and other explicitly public identifiers.
- Model calls requiring secrets go through a server/Appwrite Function.
- Validate all AI outputs with Zod/JSON schema.
- Enforce row-level/user permissions for private data.
- Social features must include block/report paths.

## 8. Scope priorities

P0:
- Journey setup
- MyDNA
- PairDNA
- Today
- Passport
- YapLens text + screenshot
- source/confidence
- YapSim end-to-end
- skill persistence
- auth
- deployed mobile URL

P1:
- realtime voice
- Study modes beyond professor/group
- Connect realtime
- Ask a Local
- Explore map
- bank/SIM detailed flows
- Team Bridge

P2:
- culture rooms/live rooms
- events
- university admin dashboard
- full deep corpus for all 11 countries
- marketplace
- advanced recommendation ML

An agent must not start P1/P2 if a required P0 golden flow is failing.

## 9. Repository discipline

Before editing:
- inspect package manager,
- inspect current folder structure,
- inspect existing feature behavior,
- inspect current tests,
- preserve working code.

Do not:
- duplicate existing services,
- create a second state-management framework,
- introduce a new UI library,
- introduce Docker/WSL requirements,
- rewrite functioning features for style preference.

## 10. Required verification before declaring done

At minimum:
- TypeScript typecheck passes
- production build passes
- relevant unit/integration tests pass
- feature tested in browser at 390px
- loading/error/empty/permission states checked where relevant
- no console errors on golden flow
- actual persistence verified for data-changing features
- no fake button on P0 demo path
- no API secret in built JS
- evidence summary included in PR/task result

## 11. Definition of "done"

"UI exists" is not done.
"Code compiles" is not done.

A P0 feature is done only when a real user can complete the intended flow from a fresh session on the deployed or preview app and the expected persisted/backend/AI result is observable.
