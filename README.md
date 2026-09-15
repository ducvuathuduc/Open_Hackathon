# YapYep — ASEAN Student Adaptation Network

A mobile-first web/PWA for exchange and international university students moving between any of the 11 ASEAN Member States. Core product formula:

```
MyDNA × Home CountryDNA × Host CountryDNA × City/University Context × Current Situation × Real People → Personal PairDNA
```

Status: **hackathon prototype (frontend-only)**. See `config/current-state.yaml` for the latest verified implementation status and `docs/13_ARCHITECTURE.md` for the current-vs-target folder architecture.

## Source-of-truth order

When documents conflict, resolve in this order:

1. `AGENTS.md` (repo scaffold + condensed product rules — read first, always current)
2. `config/project-decisions.yaml`
3. `docs/00_PRODUCT_BRIEF.md`
4. `docs/01_FEATURE_SPEC.md`
5. `docs/03_TECH_ARCHITECTURE.md`
6. `docs/04_DATA_RAG_SPEC.md`
7. `docs/05_AI_CONTRACTS.md`
8. `docs/06_APPWRITE_SCHEMA.md`
9. `docs/07_API_CONTRACTS.md`
10. `docs/02_UX_UI_SPEC.md`
11. `docs/08_IMPLEMENTATION_PLAN.md`
12. `docs/09_QA_ACCEPTANCE.md`
13. `docs/10_CRAWLER_SPEC.md`
14. `docs/11_FIGMA_BUILD_SPEC.md`
15. `docs/12_RESEARCH_REFERENCES.md`
16. `docs/AGENT_RULES.md` (full verbatim mandatory-instructions text)

`config/current-state.yaml` records the implementation state as of the date inside it. **Always verify against the actual repository before trusting it — it is a report, not a live source.**

`docs/13_ARCHITECTURE.md` is the folder-structure/architecture map added for this checkout; it documents what exists today and the target layout for productionizing per the frozen spec. It does not override any document above it.

## Do not

- Migrate to Next.js, React Native, or Flutter during the hackathon.
- Add a second state-management framework or a second UI library.
- Rename or collapse `MyDNA`, `CountryDNA`, `ContextDNA`, `UniversityDNA`, `PairDNA`.
- Add a 6th bottom-nav tab (YapSim/Study are contextual overlays, not tabs).
- Invent administrative facts without a Tier A/B source; use `unverified` instead.
- Present cultural guidance as a deterministic nationality claim.

## Local development

```bash
pnpm install
pnpm dev      # vite dev server, PORT env (default 8443 in vite.config.ts; this repo's Hoplite preview pins PORT=5173)
pnpm build    # production build
pnpm preview  # preview a production build
pnpm format   # oxfmt
```

See `AGENTS.md` for repo-scaffold specifics (entrypoints, styling, code-quality rules).

## Fast start for an agent

1. Read `AGENTS.md`.
2. Read `config/project-decisions.yaml`.
3. Read `config/current-state.yaml`.
4. Read `docs/13_ARCHITECTURE.md` for where things live and where new backend/AI code should go.
5. Read the spec for the feature you own (`docs/01_FEATURE_SPEC.md` and the relevant numbered doc).
6. Inspect existing code before editing.
7. Implement the smallest complete vertical slice.
8. Run typecheck, build, tests, and browser verification.
9. Report evidence, not only code diffs.

## Pack contents

- Product brief and frozen scope (`docs/00`–`docs/02`)
- Technical architecture, data/RAG, AI contracts, Appwrite schema, API contracts (`docs/03`–`docs/07`)
- Implementation plan, QA acceptance, crawler spec, Figma build spec, research references (`docs/08`–`docs/12`)
- This checkout's architecture map (`docs/13_ARCHITECTURE.md`)
- Hoplite agent skill bundles (`hoplite-skills/`)
- Machine-readable JSON schemas for AI/data contracts (`schemas/`)
- Frozen decisions and reported state (`config/`)
