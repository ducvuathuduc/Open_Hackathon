# 02 — UI / UX Specification

> **Direction update (2026-09-15):** `docs/adr/ADR-003-monochrome-ui-and-reference-shift.md`
> is now the binding visual/interaction direction. It demotes Qiao to an
> IA-only reference, freezes per-area references (Speak, Praktika, Duolingo,
> HelloTalk, Unibuddy, Airbnb-like map/card), replaces the token set below
> with the monochrome palette, and replaces the centered-phone-shell desktop
> MVP with real responsive layout. Where this document still shows the old
> tokens/geometry, the ADR wins. The normative current values also live in
> `config/project-decisions.yaml` (`design_tokens`, `layout`, `ui_hard_rules`).

## 1. UX strategy

Qiao is the **information-architecture reference only** (phased journey,
checklist, country utility) — not the visual reference.

Per-area interaction references (patterns only, never branding — see ADR-003):
- Today / learning home: **Speak** — clean hierarchy, lesson cards,
  personalized Learn → Practice → Apply loop, low noise.
- YapSim: **Praktika + Duolingo** — immersive conversation, contextual
  suggestions, correction, transcript, retry, score delta.
- Connect chat: **HelloTalk** — chat-centric UX, in-thread
  translate/correct, voice.
- Matching: **Unibuddy** — match cards, shared attributes, AI icebreaker,
  safety (block/report).
- Progress: Duolingo mechanics (score delta, mastery, repetition) without
  hearts/shop/cartoon clutter.
- Explore: Airbnb-like map + bottom sheet + place context (card↔marker sync).

Do not copy logos, mascots, proprietary art, exact branded assets, or copyrighted screen reproductions.

## 2. Platform

- Mobile-first web/PWA
- Primary viewport: 390×844
- Real responsive, breakpoints follow content (not device models):
  - 360–599 mobile: bottom nav, single column, 16px gutters, sticky primary
    CTA, sheets instead of side panels
  - 600–1023 tablet / narrow laptop: compact navigation rail, 2-column only
    when meaningful
  - 1024+ desktop: left navigation rail ~220px, main working column
    680–800px, optional context panel 280–320px; Lens/Chat/Sim must use the
    space properly
- Do not render a desktop page as a tiny centered phone in empty space.
- Native app is not in hackathon scope

## 3. Primary navigation

Bottom nav:
- Today
- Passport
- Lens
- Explore
- Connect

Profile/avatar opens:
- ASEAN Passport
- MyDNA
- Skills
- Saved
- Settings

YapSim appears contextually from Today/Lens/Study.

## 4. Visual tokens — monochrome student product

- Background `#F7F7F5`
- Surface `#FFFFFF`
- Primary text `#111111`
- Secondary text `#6B6B68`
- Border `#E5E5E1`
- Black CTA `#111111`
- Accent cobalt `#3157D5` — only when truly needed
- Accent soft `#EEF2FF`
- Success `#1F7A45`
- Warning `#B7791F`
- Danger `#C43B3B`
- Country flags are the primary source of color; the rest of the UI stays
  restrained.

Typography:
- Geist preferred
- Inter/system fallback

Spacing:
`4 / 8 / 12 / 16 / 24 / 32 / 48`

Geometry:
- Cards/surfaces: 10–14px radius, 1px border, no default card shadow
- Buttons: 10–14px radius (sticky primary CTA on mobile)
- Page horizontal padding: ~16px gutters on mobile
- Touch target: 44px minimum (Apple HIG, binding); 48px best practice
  (web.dev); WCAG 2.2 AA 24px floor with spacing/equivalent/inline
  exceptions

Hard rules (binding):
- NO purple AI gradient, glowing orb, glassmorphism, 28–32px radius
  everywhere, default shadow on every card, rainbow dashboard, fake AI
  metrics, decorative emojis as icons, five competing CTAs on one screen,
  "everything is a card", lorem ipsum, or desktop page rendered as a tiny
  centered phone in empty space.
- Shadows only on overlays/floating sheets.

Avoid:
- neon purple AI gradients
- enterprise SaaS dashboard density
- permanently floating chatbot as the whole product
- desktop-first tables for core flows

## 5. Reusable components

AppShell
TopHeader
BottomNavigation
Avatar
CountryFlag
CountryPairChip
CountryCard
CountryDNASection
ProgressRing
JourneyProgress
TaskCard
QuickActionCard
PassportSectionCard
ChecklistItem
SourceBadge
FreshnessBadge
VerificationBadge
ConfidenceBadge
CultureGapMeter
LensComposer
InputModeSelector
LensResultCard
IntentCard
RiskIndicator
ReplyOption
ScenarioCard
PersonaCard
VoiceControls
Waveform
TranscriptBubble
SkillScore
ScoreDelta
MapMarker
PlaceCard
PlaceBottomSheet
StudentCard
StudentBadge
MatchReasonChip
IcebreakerCard
ChatBubble
TranslateAction
LocalVerifyCard
EmptyState
LoadingState
ErrorState
OfflineState
PermissionSheet
BottomSheet
Toast
Skeleton

## 6. Required state variants

Global:
- Default
- Loading
- Success
- Empty
- Error
- Offline
- Permission denied
- Stale

AI:
- Thinking
- Processing image
- Transcribing
- Retrieving sources
- Generating
- Low confidence
- No authoritative source
- Unsupported media/language

Social:
- No matches
- Request pending
- Connected
- Blocked
- Reported
- Account unavailable

Data verification:
- Official verified
- University verified
- Research backed
- Community verified
- Needs review
- Stale
- Unverified

## 7. Screen inventory

### Authentication / Onboarding
00 Splash
01 Welcome
02 Login
03 Role
04 Home Country
05 Host Country
06 Host City
07 University
08 Exchange Dates
09 Language Skills
10 Goals
11 Concerns
12 Interests
13–22 MyDNA Assessment
23 MyDNA Result
24 PairDNA
25 Passport Generated

### Today
26 Today
27 Tasks
28 Daily Practice
29 Culture Insight
30 Upcoming

### ASEAN
31 ASEAN Compass
32 Country Selector
33 Country DNA
34 Compare Country
35 PairDNA
36 Country Circle

### Passport
37 Current Passport
38 First Week
39 Study
40 Culture
41 Language
42 Money
43 Banking Task
44 SIM
45 Transport
46 Health
47 Emergency
48 Student Life

### Lens
49 Input
50 Camera
51 Screenshot
52 Voice
53 Processing
54 Result
55 Intent Detail
56 Reply Builder
57 Tone Check
58 Low Confidence
59 Ask Local

### Study
60 Study Home
61 Lecture
62 Slide
63 Assignment
64 Professor
65 Group Project
66 Vocabulary

### Practice
67 Scenario
68 Persona
69 Voice/Text Session
70 Transcript
71 Feedback
72 Retry
73 Improvement

### Explore
74 Map
75 Search
76 Category
77 Place Detail
78 Saved

### Connect
79 Connect
80 Country Circle
81 Recommended Match
82 Profile
83 Icebreaker
84 Chat
85 Translation
86 Ask Local
87 Verification
88 Block/Report

### Me
89 ASEAN Passport
90 Country Stamp
91 MyDNA
92 Skill Growth
93 Experiences
94 Reflections
95 Saved
96 Settings

These are states, not 97 unique page architectures. Reuse approximately 18 page templates.

## 8. Golden UX flows

### A — Help me now
Today → Lens → screenshot/text → processing → interpretation → reply → Practice this → YapSim → feedback → skill update.

### B — Just arrived
Today/Passport → First Week → task → official source → mark done → progress.

### C — I don't know anyone
Connect → Country Circle → match → profile → icebreaker → chat → translation.

### D — Country direction proof
Change VN→SG to SG→VN or ID→TH → observe different PairDNA, Passport, Today recommendations.

## 9. Copy principles

- clear student language
- explain uncertainty
- avoid cultural absolutes
- show actions, not long essays
- factual admin cards separate from AI cultural interpretation
- real copy in prototypes; no lorem ipsum
