# YAPYEP PRODUCTION SHIPBOARD

Updated: 2026-09-15
Base commit: 90c8e49

## P0

- [x] Appwrite resource bootstrap verified
- [ ] Guest auth persists
- [ ] Journey persists
- [ ] MyDNA persists
- [ ] user_task_progress persists after reload
- [ ] YapLens text = real AI
- [ ] YapLens image = real AI
- [ ] YapLens citations
- [ ] provider fallback
- [ ] YapSim complete round
- [ ] YapSim retry + score delta
- [ ] skill persists
- [ ] Passport verified facts
- [ ] Today reads real state
- [ ] Connect real profile
- [ ] realtime chat
- [ ] production deployment
- [ ] PWA installable
- [ ] 390px pass
- [ ] 1440px pass
- [x] no client secrets
- [ ] backup demo data
- [ ] demo account

## Quality

- [ ] No horizontal mobile overflow
- [ ] 44–48px touch controls
- [ ] keyboard usable
- [ ] loading states
- [ ] error states
- [ ] offline state
- [ ] provider 429 state
- [ ] no console errors
- [ ] Lighthouse run
- [ ] golden flows recorded

## Data

- [ ] SG deep corpus
- [ ] VN deep corpus
- [ ] TH deep corpus
- [ ] ID deep corpus
- [ ] MY deep corpus
- [ ] PH deep corpus
- [ ] remaining 5 baseline

## Current blockers

- Browser E2E still needs a full anonymous onboarding, reload, and second-user isolation run.
- Local development receives expected Appwrite 401 probes before anonymous-session creation and needs production custom-domain configuration to avoid the SDK localStorage warning.

## Next merge

- Agent A: finish browser persistence/isolation evidence before opening the Foundation PR.
