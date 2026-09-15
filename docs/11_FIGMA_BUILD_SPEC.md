# 11 — Figma Make Build Spec

## 1. Goal

Figma is the interaction/design source, not the backend source of truth.

Use Figma Make Plan Mode first:
1. IA
2. screen inventory
3. components
4. user flows
5. state matrix
6. prototype links
7. then screens

## 2. Design brief

Build **YapYep — ASEAN Student Adaptation Network**, mobile-first 390×844.

It supports all 11 ASEAN countries and directional pairs.

Bottom nav:
Today / Passport / Lens / Explore / Connect.

### Product formula
MyDNA × Home CountryDNA × Host CountryDNA × City/University × Context × Real People → PairDNA.

### Primary UX reference
Qiao-like calm international-student dashboard/checklist/map/community structure.

### Interaction references
- Speak/Praktika: practice and voice session
- Country Navigator: DNA/gap/progress
- HelloTalk/Unibuddy: matching/chat

Keep visual identity original.

## 3. Must-design flows

1. Onboarding → MyDNA → PairDNA → Passport → Today
2. Screenshot/text → YapLens → reply → Practice → YapSim → feedback → skill update
3. Passport → first-week/admin task → official source → complete
4. Connect → match → icebreaker → chat
5. Change country direction and see contextual change

## 4. ASEAN sample content

Deep polished:
- Viet Nam
- Singapore
- Thailand
- Indonesia
- Malaysia
- Philippines

Visible baseline:
- Brunei
- Cambodia
- Lao PDR
- Myanmar
- Timor-Leste

Sample directional journeys:
- VN→SG
- SG→VN
- ID→TH
- TH→PH
- MY→VN

## 5. YapLens result UI

Required visible sections:
- Literal meaning
- Likely intent
- Context
- What may be expected
- Risk
- Recommended action
- Reply options
- Confidence
- Sources
- Practice this

## 6. YapSim UI

- persona
- goal
- text/voice controls
- transcript
- end session
- scores
- one prioritized feedback
- retry
- score delta

## 7. Source/trust UI

Badges:
- Official source
- University source
- Research-backed
- Community verified
- Stale
- Needs review
- Low confidence

Never hide uncertainty.

## 8. Figma Make prompt starter

> Build the complete mobile-first product UX for YapYep — ASEAN Student Adaptation Network. Use the attached references for interaction patterns, not branding. Support all 11 ASEAN countries and directional home→host journeys. Follow the frozen navigation Today, Passport, Lens, Explore, Connect. MyDNA is personal and never inferred from nationality; CountryDNA is knowledge; ContextDNA is situation-specific; PairDNA is directional. Build reusable components and realistic loading/error/offline/low-confidence/stale states. Prioritize the hero flow Lens→Practice→YapSim→Skill update. Design for 390×844 first using the specified YapYep design tokens. Before screens, output IA, screen inventory, component map, flow map and state matrix.

## 9. Handoff

Figma component names should map cleanly to React components.
Do not generate flattened screenshot-only design frames as final handoff.
