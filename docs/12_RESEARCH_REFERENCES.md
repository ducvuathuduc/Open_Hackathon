# 12 — Research, Official Docs and Reference Registry

Verified/researched on **2026-09-15**.

## ASEAN / product rationale

- ASEAN: Timor-Leste admitted as 11th member, 26 Oct 2025  
  https://asean.org/forging-a-new-era-timor-leste-admitted-into-asean/

- ASEAN Higher Education Space 2025 Roadmap  
  https://asean.org/asean-roadmap-2025-to-realise-a-common-higher-education-space-in-southeast-asia/

- ASEAN Education key documents  
  https://asean.org/our-communities/asean-socio-cultural-community/education/key-documents/

- ASEAN People Mobility  
  https://connectivity.asean.org/strategic-area/people-mobility/

- UNESCO Intercultural Competences framework  
  https://unesdoc.unesco.org/ark:/48223/pf0000219768

- UNESCO Story Circles / intercultural competence manual  
  https://unesdoc.unesco.org/ark:/48223/pf0000370336

## Appwrite

- Docs overview  
  https://appwrite.io/docs

- TablesDB  
  https://appwrite.io/docs/products/databases/tablesdb

- VectorsDB  
  https://appwrite.io/docs/products/databases/vectorsdb

- Sites  
  https://appwrite.io/docs/products/sites

- Next.js Sites support (post-hackathon reference)  
  https://appwrite.io/docs/products/sites/quick-start/nextjs

- Pricing  
  https://appwrite.io/pricing

- Education  
  https://appwrite.io/education

- Education plan 2026 update  
  https://appwrite.io/changelog/entry/2026-04-07

## Gemini

- Gemini 3.7 Flash  
  https://ai.google.dev/gemini-api/docs/models/gemini-3.7-flash

- Gemini 3.1 Flash Live Preview  
  https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-live-preview

- Live API WebSocket  
  https://ai.google.dev/gemini-api/docs/live-api/get-started-websocket

- Embeddings / Gemini Embedding 2  
  https://ai.google.dev/gemini-api/docs/embeddings

## Platform / accessibility references (verified 2026-09-15, supporting ADR-003)

- Apple Human Interface Guidelines (layout hierarchy, grouping via spacing,
  top/leading placement, 44×44pt minimum touch targets, one font with
  limited styles, strong contrast)
  https://developer.apple.com/design/human-interface-guidelines
  https://developer.apple.com/design/human-interface-guidelines/layout

- WCAG 2.2 SC 2.5.8 Target Size Minimum, Level AA (≥24×24 CSS px; spacing /
  equivalent / inline / user-agent / essential exceptions; 44×44 best
  practice)
  https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
  https://www.w3.org/TR/WCAG22/

- web.dev accessible tap targets (~48px targets, ~8px separation,
  `any-pointer: coarse`)
  https://web.dev/articles/accessible-tap-targets
  https://web.dev/articles/accessible-responsive-design
  https://web.dev/articles/responsive-web-design-basics

- Airbnb-like map + bottom-sheet UX (full-screen map, peek/half/full
  detents, two-way card↔marker sync) — interaction pattern only; original
  branding required. Researched via web search 2026-09-15; vendor docs vary
  by SDK, so implementation must verify against the chosen map SDK.

## Hoplite

- Docs / mental model / agent skills  
  https://hoplite.sh/docs

- Pricing  
  https://hoplite.sh/pricing

- Changelog / parallel agents  
  https://hoplite.sh/changelog

- Engineering philosophy  
  https://hoplite.sh/about

## Figma Make

- Create a Figma Make file / Plan Mode  
  https://help.figma.com/hc/en-us/articles/31304485164695-Create-a-Figma-Make-file

- Explore Figma Make  
  https://help.figma.com/hc/en-us/articles/31304412302231-Explore-Figma-Make

## Competitor / UX pattern references

Per-area interaction references (frozen by ADR-003; patterns only, never
branding). Qiao is IA-only; see ADR-003 for the full reference table with
verified feature notes.

- Qiao (IA only: phased journey, checklist, country utility)
  https://qiaoguide.com/en/features

- Country Navigator
  https://www.countrynavigator.com/features

- Speak (Today / learning home: Learn → Practice → Apply, personalized lessons)

- Praktika (YapSim: personal study plan, contextual suggestions, corrections, free conversation)
  https://praktika.ai/

- HelloTalk (Connect: chat-centric UX, in-thread translate/correct, voice)
  https://www.hellotalk.com/en/features

- Unibuddy (matching: shared attributes, AI icebreaker, safety)
  https://unibuddy.com/

## Official country-source examples already verified in research

### Brunei
- Government services / immigration / student pass entry point  
  https://www.gov.bn/services/Immigration.aspx

### Cambodia
- Ministry of Education, Youth and Sport ecosystem  
  https://moeys.gov.kh/
  https://emis.moeys.gov.kh/
- Other immigration/eVisa domains must be verified before ingestion.

### Indonesia
- Ministry of Higher Education, Science and Technology  
  https://www.kemdiktisaintek.go.id/
- Directorate General of Higher Education  
  https://dikti.kemdiktisaintek.go.id/
- Immigration domain candidates must be verified before ingestion.

### Lao PDR
- Official Lao eVisa  
  https://www.laoevisa.gov.la/
- Other immigration/education domains must be verified before ingestion.

### Malaysia
- Immigration Student Pass  
  https://www.imi.gov.my/index.php/en/main-services/pass/student-pass/
- Education Malaysia / EMGS  
  https://educationmalaysia.gov.my/
- EMGS Visa portal  
  https://visa.educationmalaysia.gov.my/

### Singapore
- ICA Student's Pass  
  https://www.ica.gov.sg/reside/STP
- ICA Institutes of Higher Learning  
  https://www.ica.gov.sg/reside/STP/apply/ihl

### Timor-Leste
- Government portal  
  https://timor-leste.gov.tl/

### Other countries
Myanmar, Philippines, Thailand and Viet Nam have well-known official government/education/immigration domains, but the crawler must verify the exact live official domain/page before treating it as Tier A. See `config/source-registry.yaml`.
