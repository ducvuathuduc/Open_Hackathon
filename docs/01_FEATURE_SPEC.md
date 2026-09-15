# 01 — Feature Specification

This document defines what every feature means, how users use it, expected data, and acceptance criteria. Agents must not silently change behavior.

## 1. Journey Setup — P0

### User goal
Tell YapYep who I am and where I am going.

### Inputs
- home country
- host country
- host city
- university
- exchange start/end
- languages + self-rated levels
- goals/concerns/interests
- role: incoming/current/local/returned when relevant

### Behavior
- host cannot equal home in exchange journey
- all 11 ASEAN countries available
- saves current journey
- current journey drives Passport, Today, Lens retrieval, Connect filters

### Acceptance
- switching VN→SG to SG→VN changes PairDNA and host content
- refresh preserves journey after auth/session persistence

---

## 2. MyDNA — P0

### User goal
Describe my actual communication preferences instead of being stereotyped by nationality.

### Flow
10–15 situational questions such as disagreement, formality, professor interaction, deadlines, conflict, participation.

### Canonical dimensions
- communication explicitness
- formality preference
- hierarchy sensitivity
- conflict openness
- relationship orientation
- time structure
- participation confidence
- uncertainty tolerance

### Output
0–100 score per dimension + short explanation.

### Rule
Nationality never directly sets MyDNA.

### Acceptance
Two users with same nationality can get different MyDNA.

---

## 3. CountryDNA — P0 data layer

Not a personality score. It is structured country knowledge.

Eight packs:
1. Language
2. Communication
3. Academic
4. Social
5. Daily Life
6. Systems
7. Culture
8. Student Life

Every fact stores source/freshness/confidence.

---

## 4. ContextDNA — P0 concept

Situation-specific context:
- classroom
- professor
- group project
- presentation
- roommate
- local friend
- student club
- bank
- hospital
- transport
- food
- government/official setting

Used to narrow retrieval and avoid country-wide overgeneralization.

---

## 5. UniversityDNA — P1/P0 for seeded demo universities

Contains:
- international office
- orientation
- academic calendar
- facilities
- student clubs
- campus transport
- exchange procedures
- emergency/support
- institution-specific terminology

Only official university sources may create factual institution guidance.

---

## 6. PairDNA — P0

### Definition
Directional adaptation layer generated from:

`Home CountryDNA + Host CountryDNA + MyDNA + UniversityDNA + ContextDNA`

### User sees
- strongest transfer areas
- likely friction areas
- recommended scenarios
- language/context challenges
- suggested missions

### Rule
PairDNA is directional. Reverse direction must not reuse the same output.

---

## 7. Today — P0

### Purpose
Daily adaptation dashboard, not a chatbot.

### Content
- current journey
- day/stage of exchange
- one priority task
- one recommended practice
- quick actions: scan/ask/message/practice
- current weakest skill
- context/culture card
- upcoming item
- journey progress

### Personalization
Uses journey stage + recent Lens/Sim events + unfinished Passport tasks.

---

## 8. Country Passport — P0

### Purpose
Personalized student handbook for current host.

### Sections
- Before Arrival
- First 24 Hours
- First Week
- First Month
- Study
- Communication
- Language
- Money & Payments
- Banking
- SIM/Connectivity
- Transport
- Health & Safety
- Culture
- Student Life
- Explore
- People

### Card fields
- title
- summary
- actionable steps
- source badge
- verification status
- last reviewed
- save/complete state

### Critical rule
Administrative requirements are not generated without authoritative evidence.

---

## 9. YapLens — P0 HERO

### Inputs
P0:
- text
- screenshot/image

P1:
- camera
- voice
- live conversation
- document

### User flow
Input → choose/auto-detect situation → process → result → reply/tone → Practice this.

### Canonical output
- what was said / literal meaning
- detected language
- likely intent(s)
- contextual explanation
- what may be expected next
- misunderstanding risk
- recommended action
- suggested replies
- confidence
- sources
- caveat about individual variation when culturally relevant

### Tone modes
- Casual
- Neutral
- Academic
- Very Respectful

### Acceptance
- output parses against `schemas/lens-result.schema.json`
- result shows confidence and sources
- low confidence can route to Ask a Local
- “Practice this” passes structured context to YapSim

---

## 10. Tone Check / Reply Builder — P0

User pastes or edits intended response.

Returns:
- perceived tone
- potential risk
- revised alternatives
- explanation of why each alternative may work

No claim that a recipient will definitely react in a specific way.

---

## 11. YapSim — P0 HERO

### Purpose
Rehearse real intercultural situations before the real event.

### Inputs
- source Lens incident OR manual scenario
- home/host
- university/context
- MyDNA
- language level
- previous weakness

### Session
AI persona + goal + 2–5 minute text/voice conversation.

### Scoring dimensions
- language clarity
- tone
- intent recognition
- context awareness
- adaptability
- confidence (self-report and/or derived indicator; clearly labeled)

### Result
- scores
- biggest improvement opportunity
- examples from session
- recommended retry
- score delta after retry

### Acceptance
- complete session persists
- retry creates a new attempt, not overwrite
- skill profile updates after completion

---

## 12. Study Copilot — P0/P1

### Modes
P0:
- Professor Mode
- Group Project Mode

P1:
- Lecture Assist
- Slide Explain
- Assignment Decoder
- Academic Vocabulary

### Principle
Support comprehension and communication; do not position as cheating/homework completion.

### Professor Mode
Input message/question → tone/context feedback → respectful alternatives.

### Group Project
Input chat/problem → identify likely coordination/context friction → suggest clear team message/action.

---

## 13. Realtime Translation — P1

Two-person voice conversation.
Use Live API only if stable in demo environment.
Fallback is push-to-talk transcription/translation.

Not a substitute for YapLens; realtime translation handles language, YapLens handles meaning/context.

---

## 14. Connect / Country Circles — P1

### Roles
- Local
- Current Exchange
- Incoming
- Returned

### Filters
- host country
- city
- university
- major
- interests
- languages
- exchange history

### Matching explanation
Always show `Why you matched`.

No scraped social profiles. People must opt in.

---

## 15. Ask a Local — P1

Triggered when:
- user chooses it,
- AI confidence is low,
- context is highly institution/local specific.

Question retains only minimum necessary context.
Local answer can receive verification votes/context additions.

---

## 16. Local Verify — P1

Community can mark:
- accurate
- needs context
- outdated

Verification does not convert opinion into “official fact”.
Administrative facts remain source-backed.

---

## 17. Explore — P1

Student-specific utility map, not full Google Maps clone.

Categories:
- Campus
- Study
- Affordable Food
- Banks
- Healthcare
- Pharmacy
- Transport
- Religion
- Culture
- Hangout
- Student Life

Place card:
- why useful for students
- distance
- relevant amenities
- useful phrase
- source/community verification
- save

---

## 18. Culture Quest — P1

Real-world missions:
- ask classmate feedback preference,
- use one local phrase,
- attend student club activity,
- clarify how lecturers are addressed.

Mission ends with short reflection and may update practice priorities.

---

## 19. Reflection — P1

After real interaction:
- outcome/mood
- what surprised user
- optional note
- whether guidance helped

Used for personalized learning, not mental-health diagnosis.

---

## 20. ASEAN Passport / Progress — P0

Shows:
- current journey
- countries explored
- situations mastered
- practice attempts
- skill growth
- local phrases
- quests
- verified interactions
- stamps/experience milestones

Avoid meaningless gamification. Progress must map to user activity.

---

## 21. ASEAN Compass — P1 UI / P0 architecture

Browse all 11 countries.
Compare host options and open CountryDNA.

Future recommendation feature may explain trade-offs but must never label a country as objectively “best culture fit.”

---

## 22. Team Bridge — P1/P2

Group members voluntarily complete mini MyDNA.
Output:
- team communication map
- possible friction areas
- generated working agreement

No nationality-based scoring of individual members.

---

## 23. Source/Freshness — P0

Every factual Passport/admin card and evidence-backed Lens claim may display:
- source title
- source URL
- authority tier
- last checked
- status: official / university / research / community
- freshness state

If stale/unverified, show it visibly.
