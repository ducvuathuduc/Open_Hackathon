# 04 — Data, Evidence, RAG and Trust Specification

## 1. Principle

YapYep separates:
1. **Factual system/admin knowledge**
2. **Research-backed contextual knowledge**
3. **Community/local experience**
4. **AI interpretation**

AI interpretation must never masquerade as official administrative fact.

## 2. Authority tiers

### Tier A — Primary authority
- ASEAN official documents
- government/immigration
- central bank/official payment authority
- transport authority
- official university/international office

### Tier B — Institutional/research authority
- UNESCO
- peer-reviewed research
- recognized regional education bodies
- embassy/official education agencies

### Tier C — Verified local/student experience
- opt-in local/current/returned students
- manually reviewed community contributions

### Tier D — Unverified community
Useful for discovery only. Not a source for high-stakes instructions.

## 3. Knowledge fact model

Every extracted fact must include:
- country
- city optional
- university optional
- category
- context
- claim
- actionable_advice optional
- source_url
- source_title
- source_type
- authority_level
- published_at optional
- checked_at
- valid_until optional
- source_language
- confidence
- verification_status

## 4. Categories

- language
- communication
- academic
- social
- daily-life
- systems
- culture
- student-life
- banking/payments
- sim/connectivity
- transport
- health/safety
- emergency
- university
- place

## 5. P0 retrieval

Metadata-first:
1. exact host country
2. exact university/city if present
3. exact context
4. relevant category
5. authority Tier A/B first
6. newest valid facts first

Select 10–25 concise facts and pass to model.

## 6. Vector retrieval

Use only when:
- P0 is green,
- corpus size/semantic recall needs it,
- Appwrite/VectorsDB availability is confirmed.

Recommended embedding:
- `gemini-embedding-2`
- recommended 768 dimensions for cost/size balance
- supports 100+ languages and multimodal content per official Gemini docs

## 7. Freshness

Default review policy:
- immigration/student pass/admin: daily to weekly during active demo development
- university procedures: weekly
- bank/SIM/transport operational facts: weekly
- culture/research: monthly/quarterly
- places: weekly/community verified

Never invent a `valid_until`; use null when unknown.

## 8. Response rules

### Administrative question
If no current Tier A/B evidence:
- do not guess,
- state that the requirement could not be verified,
- show official source if available,
- optionally invite Ask a Local only for experiential context, not legal verification.

### Cultural interpretation
Return:
- likely interpretation(s),
- why,
- evidence/context,
- confidence,
- explicit individual-variation caveat where useful.

## 9. Source registry policy

`config/source-registry.yaml` is a registry of seed domains/endpoints.

Each registry entry has a verification status:
- `verified_official`
- `candidate_verify_before_ingest`

Agents must not assume candidate domains are authoritative until validated.

## 10. People data

Never crawl people profiles from social media for Connect.

People must opt in and choose role:
- Local
- Current Exchange
- Incoming
- Returned

## 11. Places

Base geography may use OSM-compatible data.
Enrichment may use:
- official university POIs,
- official transport/health sources,
- opt-in student recommendations.

A “student recommended” place is not automatically “official verified”.
