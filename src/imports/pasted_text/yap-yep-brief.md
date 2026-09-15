YapYep — ASEAN Student Adaptation Network
Context
The project is a blank Vite + React 19 + Tailwind v4 scaffold (src/App.tsx renders an empty div). The brief asks for the complete mobile-first product UX for YapYep, a web-first PWA that helps exchange/international students adapt when moving between any of the 11 ASEAN member states. This is a demo/prototype (no backend — Appwrite/Gemini are production aspirations only; per the spec, camera/mic/voice states are simulated in the prototype).

The core product equation: MyDNA × HomeCountryDNA × HostCountryDNA × City/University × Situation × Real People → PairDNA

Design target: 390×844 mobile viewport, centered app shell (max-width: 430px) on larger screens. Bottom nav: Today · Passport · Lens · Explore · Connect. Must feel like a calm, card-based student mobile product (Qiao-style shell), NOT a desktop SaaS dashboard and NOT generic AI-purple.

Non-negotiables from the brief:

All 11 ASEAN countries switchable as both origin AND destination (ASEAN Compass). VN→SG and SG→VN must produce different directional contexts.
MyDNA derived from answers, never nationality.
Deeply polished VN→SG journey + believable seeded journeys: ID→TH, TH→PH, MY→VN, SG→VN.
Reusable components/variants, not duplicated static screens.
Full state matrix: Default, Loading, Success, Error, Offline, Permission Denied, Low Confidence, Stale Data, Empty.
1. Information Architecture
App Shell (mobile frame, top header + bottom nav)
│
├── Onboarding (pre-auth, no bottom nav)
│     Splash → Welcome → Sign in → ASEAN Compass (home+host)
│     → City/University → Exchange dates → Languages/levels
│     → Goals & concerns → Interests → MyDNA assessment (10 Q)
│     → MyDNA results → PairDNA gap → Passport generated
│
├── Today        (personalized daily home)
├── Passport     (Country Passport → Section → Card/Checklist detail)
│     └── ASEAN Passport (achievements) reached from Today/Profile
├── Lens         (YapLens input → scanning → result → reply builder)
│     └── → YapSim (practice) launched from any Lens result
├── Explore      (student map → place detail)
├── Connect      (YapMatch → match profile → chat → Ask a Local; Country Circles)
│
├── Study Copilot (modal/route launched from Today & Passport quick actions)
└── Profile/Settings (avatar in top header → MyDNA, Skills, ASEAN Passport, Saved, Settings)
Global state: a JourneyContext holds the active user (home country, host country, city, university, dates, languages, MyDNA scores). A demo country switcher (in Compass + Profile) swaps the active seeded journey live during a demo.

2. Screen Inventory (~48 states from ~12 templates)
Onboarding (13): Splash, Welcome, Sign in, ASEAN Compass, City/Uni, Dates, Language levels, Goals/concerns, Interests, MyDNA questions, MyDNA results, PairDNA gap, Passport generated.
Today (1 + states): dashboard.
Passport (6): Country Passport home, Section list, Task/Card detail, Bank-account checklist flow, Culture guide card, Language pack.
Lens (5): Input (Text/Screenshot/Camera/Voice/Conversation), Scanning, Result, Reply Builder, Low-confidence result.
YapSim (5): Scenario setup, Voice conversation, Live transcript, Feedback/scores, Retry + before/after.
Study Copilot (6): Study home, Lecture Assist, Slide Explain, Assignment Decoder, Professor Mode, Group Project, Academic Vocabulary.
Explore (2): Map + category filters, Place detail.
Connect (5): Connect home (4 user types), Match profile, Chat, Ask a Local, Country Circles.
Profile (5): MyDNA, Skills, ASEAN Passport, Saved, Settings.
3. Component System (src/components/)
Reusable primitives + variants (props drive Default/Loading/Empty/etc.):

AppShell, TopHeader, BottomNavigation, Avatar, CountryPairChip, ProgressRing, TaskCard, QuickActionCard, PassportSectionCard, ChecklistItem, SourceBadge, FreshnessBadge, ConfidenceBadge, CultureGapMeter, DnaBar, LensInput, LensResultCard, ReplyOption, ScenarioCard, VoiceOrb, ScoreBar, PlaceCard, MapMarker, StudentCard, MatchReasonChip, ChatBubble, LocalVerifyCard, CircleRow, AchievementCard, FlagChip, SectionHeader, plus shared StatefulView wrapper rendering EmptyState / ErrorState / Skeleton / OfflineBanner / PermissionSheet / LowConfidenceNotice / StaleDataNotice, and BottomSheet / Toast / Segmented / Chip / Button.

Icons: lightweight inline SVG set (avoid heavy deps); flag chips as emoji or small SVG.

4. Data Requirements (src/data/)
All static/seeded (typed in TS). Key shapes mirror the spec:

countries.ts — all 11 ASEAN countries (name, flag, code, languages, accent color for chips only).
countryDNA.ts — per-country 8 DNA packs: Language, Communication, Academic, Social, Daily Life, Systems, Culture, Student Life. Seed all 11 with believable content (SG/VN/TH/PH/ID/MY deepest).
pairDNA.ts — directional pair generator: given (home, host) + MyDNA, computes gap meters, biggest gaps, strongest transfer, "situations likely to feel unfamiliar." VN→SG and SG→VN yield different output.
passports.ts — Country Passport sections (Before Arrival, First 24 Hours, First Week, Study, Culture, Language, Money & Banking, SIM, Transport, Health & Safety, Student Life, Explore) with cards carrying officialSource, lastReviewed, verificationStatus.
journeys.ts — 5 seeded personas: Minh VN→SG (deep), ID→TH, TH→PH, MY→VN, SG→VN — each with MyDNA scores, today tasks, progress.
lens.ts — sample YapLens results (literal, intent, contextual interpretation, expectation, misunderstanding risk %, confidence, sources[], recommended action, reply choices) keyed by host country + scenario.
sim.ts — personas + score dimensions (Clarity, Language, Intent recognition, Tone, Adaptability, Confidence) + before/after.
study.ts — sample content for the 6 Study modes.
places.ts — ~20 seeded student places per active city with categories (Campus, Study, Food, Banks, Healthcare, Pharmacy, Transport, Religion, Culture, Hangout, Student Life).
people.ts — Connect profiles tagged Local / Current Exchange / Incoming / Returned, with match reasons.
circles.ts — per-country Country Circles counts + filters.
passportAchievements.ts — ASEAN Passport: countries experienced, situations mastered, language practice, Culture Quests, verified interactions, skill growth.
5. User Flows
Flow A — Golden (Help me NOW): Today → Lens → screenshot a teammate message → scanning → result (intent/context/risk/confidence/sources) → Reply Builder (Casual/Neutral/Academic/Very Respectful) → tone check → Practice this → YapSim roleplay → feedback → skill score update → back on Today as a new task.
Flow B — I just arrived: Today → Passport → Money & Banking → Open Bank Account checklist → requirements + official source/freshness → Explore nearest bank → Save → mark done → Passport progress rises.
Flow C — I don't know anyone: Connect → filter (city/uni/major/interests/language/cross-country experience) → AI match → profile ("Why YapYep matched you") → AI icebreaker → chat → translation → Ask a Local.
Flow D — Onboarding: Compass (any origin/dest) → City/Uni → dates → languages → goals → interests → MyDNA (10 Q) → MyDNA results → PairDNA gap → Passport generated → Today.
Demo switch: country switcher swaps active journey (e.g., VN→SG to SG→VN) → all surfaces re-derive directional content.
6. State Matrix
Shared StatefulView + per-feature variants:

All features: Default, Loading (Skeleton), Success, Empty, Error, Offline, Permission Denied, Low Confidence, Stale Data, No Results.
Lens extra: Processing image, Listening, Transcribing, Retrieving sources, Generating, Low confidence, Unsupported language.
Connect extra: No matches, Request pending, Matched, Blocked, Reported, Offline.
Passport info states: Verified, Community verified, Needs review, Outdated (via FreshnessBadge/SourceBadge).
A dev-only State toggle (in Settings) lets the demo force any state per feature.

7. Prototype Connection Map
State-based in-app navigation (no URL router needed for a single mobile frame; a small useNavigation stack in App.tsx handles push/pop + tab switch). Deep links between features:

Every LensResultCard → ScenarioCard (Practice this) → YapSim → Skills update.
Every Passport bank card → Explore (nearest bank) and back with "mark done".
Connect match → chat → Ask a Local → Passport card verification.
Today quick actions → Lens / Study / Connect / YapSim.
Implementation Approach
Theme + fonts in src/index.css: add Geist via Google Fonts @import (first statement), then a @theme block mapping the exact brand tokens (--color-primary #3157D5, --color-amber #FFB648, --color-background #F6F7F3, surface #FFFFFF, text #172033, secondary #667085, success #169B62, warning #F59E0B, error #E5484D), radius (20px cards, 14px buttons), and base spacing. Call create_make_theme once at the start to seed guidelines/Guidelines.md, then honor the brief's fixed palette literally.
Data layer (src/data/*) — types + all seeded content, all 11 countries, 5 journeys.
Component library (src/components/*) — primitives + StatefulView.
Feature modules (src/features/{onboarding,today,passport,lens,sim,study,explore,connect,profile}/).
App shell + navigation in src/App.tsx with JourneyContext + useNavigation.
Wire the four golden flows and the live country switcher.
Files touched: src/index.css, src/App.tsx, new src/data/, src/components/, src/features/, src/context/. No dependency additions expected beyond React (map rendered as a stylized static map surface with markers, not MapLibre, to keep the prototype dependency-free — noted as production swap).

Verification
Dev server already runs on $PORT; confirm the app compiles and the 390×844 frame renders centered.
Manually walk all four golden flows in the preview.
Switch the active country (VN→SG ↔ SG→VN, plus ID→TH / TH→PH / MY→VN) and confirm Today, Passport, PairDNA gap, Lens retrieval context, and Connect all re-derive directionally.
Toggle the state matrix (Loading/Empty/Error/Offline/Permission/Low-confidence/Stale) on Lens, Passport, Connect, Explore.
Check 44px touch targets, contrast, and that no generic purple/desktop-dashboard patterns leaked in.