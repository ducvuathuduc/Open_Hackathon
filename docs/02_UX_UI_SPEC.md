# 02 — UI / UX Specification

## 1. UX strategy

Primary shell reference: **Qiao-style international-student utility UX**:
- calm card hierarchy
- personalized home
- staged journey/checklist
- guide + map + community mental model

Interaction references:
- Country Navigator: assessment/gap visualization
- Speak/Praktika: roleplay and feedback
- HelloTalk/Unibuddy: match/chat/icebreakers

Do not copy logos, mascots, proprietary art, exact branded assets, or copyrighted screen reproductions.

## 2. Platform

- Mobile-first web/PWA
- Primary viewport: 390×844
- Breakpoints: 360, 390, 430, 768, 1280
- Desktop MVP: centered mobile-oriented shell, max content width around 480–540px
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

## 4. Visual tokens

- Primary Blue `#3157D5`
- Warm Amber `#FFB648`
- Background `#F6F7F3`
- Surface `#FFFFFF`
- Primary Text `#172033`
- Secondary Text `#667085`
- Success `#169B62`
- Warning `#F59E0B`
- Error `#E5484D`

Typography:
- Geist preferred
- Inter/system fallback

Spacing:
`4 / 8 / 12 / 16 / 24 / 32 / 48`

Geometry:
- Cards: 20px radius
- Buttons: 14–16px radius
- Page horizontal padding: ~20–24px
- Touch target: minimum 44×44px

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
