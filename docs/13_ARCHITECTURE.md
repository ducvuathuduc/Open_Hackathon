# 13 — Repository Architecture Map (current vs. target)

This document is generated from a full file-by-file read of `src/` as it
exists in this checkout, cross-referenced against the frozen spec
(`AGENTS.md`, `config/project-decisions.yaml`, `docs/03_TECH_ARCHITECTURE.md`,
`docs/06_APPWRITE_SCHEMA.md`). It does not override any spec document; it
records facts about the code and proposes the smallest incremental structure
to reach "production, not prototype" per `docs/08_IMPLEMENTATION_PLAN.md`.

## 1. Current tree (verified, ~3,950 LOC across `src/`)

```
figma-make-app/
├── index.html                    Vite HTML shell, mounts #root
├── vite.config.ts                React + Tailwind v4 + Figma Make plugins, @ → src, PORT env
├── package.json                  react/react-dom only; no state/data/backend libs yet
├── tsconfig.json
├── .mise.toml                    Node/pnpm toolchain pin
├── plans/
│   └── background-i-just-breezy-canyon.md   Original Figma Make plan (screen inventory, IA)
└── src/
    ├── main.tsx                  Entry: imports index.css, mounts <App/>
    ├── App.tsx                   Root composition: providers, tab switch, overlay stack (nav.push/pop)
    ├── index.css                 Tailwind v4 import + design tokens (fonts, colors)
    ├── vite-env.d.ts
    ├── lib/
    │   └── appwrite/
    │       ├── client.ts         Browser SDK initialization from public VITE_APPWRITE_* identifiers
    │       └── session.ts        Anonymous-session bootstrap with safe user-readable failure handling
    ├── context/
    │   ├── JourneyContext.tsx    Global state: active Journey, computed PairDNA, forced UI state,
    │   │                         saved items, task completion — all in-memory (useState), no persistence
    │   └── NavContext.tsx        Custom stack-based navigator (tab + push/pop overlay frames),
    │                             replaces a router; no URL sync
    ├── components/
    │   ├── shell.tsx             AppShell (390×844 frame), TopHeader, BottomNavigation, ScreenHeader, Scroll
    │   ├── ui.tsx                ~30 design-system primitives (Button, Card, Badge, ProgressRing,
    │   │                         DnaBar, EmptyState, ErrorState, OfflineBanner, BottomSheet, Toast, …)
    │   └── icons.tsx             Inline icon set (no external icon library)
    ├── features/                 One file per product surface; each owns its own local UI state
    │   ├── Onboarding.tsx        13-step flow → calls onComplete(home, host, city, university, myDna)
    │   ├── Today.tsx             Dashboard: focus task, practice suggestions, adaptation map, agenda
    │   ├── Passport.tsx          PassportHome, PassportSection, PassportCardDetail
    │   ├── BankFlow.tsx          Bank-account checklist (Passport sub-flow)
    │   ├── Lens.tsx              Input mode select → staged "scanning" → result → tone reply builder
    │   ├── YapSim.tsx            Roleplay scenario → transcript → scored feedback
    │   ├── Study.tsx             6 study modes (Lecture/Slide/Assignment/Professor/Group/Vocab)
    │   ├── Explore.tsx           Place list/category filter + PlaceDetail
    │   ├── Connect.tsx           ConnectHome, MatchProfile, Chat (client-only), AskALocal
    │   └── Profile.tsx           Profile, Settings, Compass (journey switcher), dev state-matrix toggle
    └── data/                     Pure TS modules: typed seed data + derivation functions, no I/O
        ├── countries.ts          11 ASEAN countries: code, name, flag, languages, accent color
        ├── dna.ts                8 CountryDNA packs per country (language/comm/academic/social/
        │                         daily/systems/culture/student) + HOST_CONTEXT
        ├── pairDNA.ts            computePairDNA(home, host, myDna) — directional gap meters, verdicts
        ├── assessment.ts         MyDNA quiz definition + scoring → DnaScores
        ├── journeys.ts           5 seeded personas (minh VN→SG, dewi ID→TH, kevin TH→PH,
        │                         aisyah MY→VN, wei SG→VN)
        ├── passports.ts          Passport sections/cards incl. officialSource/lastReviewed/
        │                         verificationStatus fields (already schema-shaped for Tier A/B sourcing)
        ├── lens.ts               Seeded Lens interpretation samples (literal/intent/context/risk/
        │                         confidence/sources/replies) — this is what a real ai-gateway
        │                         Function + gemini-3.7-flash call must eventually replace
        ├── sim.ts                Scenario personas + scoring dimensions + before/after deltas
        ├── study.ts              Sample content per study mode
        ├── places.ts             SG place set + genericPlaces(city) generator, 11 categories
        ├── people.ts             Connect match seed profiles (Local/Exchange/Incoming/Returned)
        ├── circles.ts            Country-circle counts/filters
        └── achievements.ts       ASEAN Passport progress (countries, quests, skills)
```

## 2. Architecture pattern actually in use

- **State:** two hand-rolled React Context providers (`JourneyContext`, `NavContext`) — no Redux/Zustand/Jotai.
  This satisfies "do not add a second state-management framework": there is currently **zero** external
  state library, so introducing exactly one (per `docs/03`, none is mandated beyond what ships with
  Appwrite/TanStack Query later) is still a net-new addition, not a duplicate.
- **Navigation:** a custom in-memory stack (`nav.push`/`nav.pop`) inside a single `<AppShell>`, not
  react-router. There is one route (`/`); overlays are modeled as stack frames, not URLs. No deep-linking.
- **Data:** every `src/data/*.ts` file is synchronous, in-memory, hand-authored seed data plus pure
  derivation functions (`computePairDNA`, `placesFor`, `circlesFor`). There is no fetch/query layer,
  no persistence, no backend client anywhere in `src/`.
- **Styling:** Tailwind v4 utility classes directly in JSX; no CSS modules, no styled-components,
  no shadcn/ui installed yet despite being named in the frozen stack.
- **Components:** a single flat `ui.tsx`/`shell.tsx`/`icons.tsx` design-system, imported by every
  feature file. Feature files are self-contained screens, not further split into sub-components.

## 3. Gap vs. the frozen target stack

| Frozen requirement (`docs/03_TECH_ARCHITECTURE.md`, `config/project-decisions.yaml`) | Current state |
|---|---|
| shadcn/ui | Not installed; custom `ui.tsx` primitives instead |
| Motion (animation) | Not installed |
| TanStack Query | Installed for the upcoming Appwrite read/cache boundary; no query hooks until a table is provisioned |
| Zod | Installed for the upcoming Function-response validation boundary; no live AI/API response exists yet |
| PWA plugin/service worker | Not installed; no manifest/offline caching |
| Appwrite Auth | Browser SDK wired, anonymous-session entry added |
| Appwrite TablesDB / Storage | Database + temp-media bucket provisioned (IDs in `config/appwrite-resources.yaml`); `user_task_progress` table not yet created, so persistence fails closed to local-only state until it exists |
| Appwrite Functions | `ai-gateway` / `data-worker` not yet created; see `docs/adr/ADR-002-multi-provider-ai-routing.md` for the intended internal routing once built |
| `gemini-3.7-flash` / live / embeddings | Not called; Lens/Sim/Study use static seed responses |
| Real persistence for skills/tasks/saved items | In-memory `useState` only; resets on reload |

This matches `config/current-state.yaml`'s own `not_fully_verified_reported` list. **No code here is
broken** — it is a complete, working frontend-only prototype that the backend/AI phases plug into.

## 4. Target architecture (incremental — do not rewrite)

Per `docs/08_IMPLEMENTATION_PLAN.md` phases 1–4, add layers *around* the existing `src/data` and
`src/features`, do not replace them outright. Recommended landing structure once backend/AI work starts:

```
src/
├── lib/
│   ├── appwrite/
│   │   ├── client.ts            Browser SDK init (endpoint/project ID only — public-safe)
│   │   └── queries.ts           TanStack Query hooks wrapping Appwrite TablesDB reads
│   └── schemas/                 Zod schemas mirroring schemas/*.schema.json, used to validate
│                                 Appwrite Function responses (lens-result, sim-feedback, student-profile)
├── data/                        UNCHANGED: stays the seed/demo layer + pure derivation functions
│                                 (computePairDNA etc. remain client-side; they are not AI calls)
├── features/                    UNCHANGED file set; internals swap seeded lookups for
│                                 useQuery(...) + lib/schemas validation where a feature goes live
│   └── Lens.tsx                 e.g. replace LENS_SAMPLES lookup with a call to the ai-gateway
│                                 Appwrite Function, validated against schemas/lens-result.schema.json
├── context/                     UNCHANGED shape; JourneyContext gains persistence by writing
│                                 through to Appwrite TablesDB instead of only local useState
└── components/                  UNCHANGED; shadcn/ui primitives are additive, not a replacement
                                  for the existing ui.tsx unless a Product Decision Record says so

functions/                        NEW, outside src/ — Appwrite Functions (server-side, holds secrets)
├── ai-gateway/                   routes: lens, tone-check, reply, sim, study, (embedding)
└── data-worker/                  routes/jobs: ingest source, extract facts, recheck freshness
```

`config/appwrite-resources.yaml` is the companion resource manifest. It fixes
the logical table/function names but deliberately leaves resource IDs blank
until their owner provisions them in the Appwrite Console. That avoids
committing secrets or guessing a database/bucket identifier.

Rationale for keeping `src/data` as-is: it already matches the shapes the Appwrite schema and AI
schemas expect (e.g. `passports.ts` already carries `officialSource`/`lastReviewed`/`verificationStatus`
per the Tier A/B sourcing rule). The backend work is to add a persistence/AI layer *behind* the same
interfaces, not to redesign the UI or data shapes.

## 5. Approved-but-unimplemented UI direction (ADR-003, 2026-09-15)

Binding for all future UI work; code explicitly deferred until the product
owner assigns the rework:

- References: Qiao demoted to IA-only; per-area interaction references
  frozen (Speak for Today, Praktika+Duolingo for YapSim, HelloTalk for
  Connect chat, Unibuddy for matching, Duolingo mechanics without clutter
  for progress, Airbnb-like map+sheet for Explore).
- Tokens: monochrome set in config/project-decisions.yaml (#F7F7F5 /
  #FFFFFF / #111111 / #6B6B68 / #E5E5E1 / black CTA / accent cobalt
  only-when-needed / soft #EEF2FF / success #1F7A45 / warning #B7791F /
  danger #C43B3B); flags are the main color; warm amber, tinted canvas,
  and old ink/muted values retired.
- Geometry/rules: 10-14px radius, 1px borders, shadows on overlays only;
  full hard-rule list in ADR-003.
- Responsive: real mobile/tablet/desktop layout replaces the centered
  max-w-420px phone frame in src/components/shell.tsx AppShell (legacy as
  of ADR-003).
- Current code status: src/index.css theme tokens, shell.tsx phone frame,
  and feature files still use the old palette/geometry (old hex values,
  rounded-16/18/24px, shadow-card on cards, amber accents, emoji
  quick-action icons, blue-gradient practice card, centered phone frame).
  Nothing in src/ was changed by ADR-003.

## 6. Explicit non-goals (per AGENTS.md section 9 / project-decisions.yaml)
 (per `AGENTS.md` §9 / `project-decisions.yaml`)

- Do not introduce a second state-management framework (Redux, Zustand, Jotai, MobX) — Context is
  sufficient for this scope; TanStack Query (server-cache) is a different concern, not a competing
  client-state framework.
- Do not introduce a second UI library beyond the existing `ui.tsx` + (optionally) shadcn/ui as scoped
  by the frozen stack.
- Do not replace `NavContext`'s stack navigator with react-router or a file-based router.
- Do not restructure `src/data/*.ts` module boundaries without a Product Decision Record — feature
  code and the Appwrite schema both key off these shapes.
