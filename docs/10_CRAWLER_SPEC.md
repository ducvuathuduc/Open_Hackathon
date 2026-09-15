# 10 — Crawler / Ingestion Specification

## 1. Goal

Create a controlled evidence pipeline, not a broad web scraper.

The worker ingests only approved registry sources and approved discovered pages.

## 2. Rules

- honor robots.txt and site terms
- do not bypass login/paywall/CAPTCHA
- do not scrape personal social profiles
- rate limit politely
- identify duplicates by canonical URL + content hash
- preserve source URL/title/date/language
- never let model-generated text become a source

## 3. Pipeline

Source registry
→ discover allowed pages
→ fetch HTML/PDF
→ extract main content
→ detect language
→ normalize
→ content hash
→ chunk by semantic section
→ structured fact extraction
→ evidence validation
→ store source/facts
→ optional embeddings
→ mark checked_at

## 4. Fact extraction prompt requirements

For each candidate claim:
- exact source section context
- country/city/university
- category/context
- concise claim
- actionable advice only when directly supported
- effective/published date if visible
- uncertainty
- whether it is administrative
- whether it may expire/change

Reject:
- promotional fluff
- unsupported cultural generalization
- outdated superseded requirement
- user comments as official facts

## 5. Change detection

If content hash changes:
- re-extract affected facts
- mark previous versions superseded
- do not delete historical record immediately if needed for audit
- update reviewed timestamp only after successful validation

## 6. PDF handling

Prefer text extraction.
Use visual processing only when layout/table meaning cannot be recovered from text.

## 7. Crawl scope for hackathon

Deep sources:
- Viet Nam
- Singapore
- Thailand
- Indonesia
- Malaysia
- Philippines

Baseline:
- Brunei
- Cambodia
- Lao PDR
- Myanmar
- Timor-Leste

The app selector supports all 11 regardless of depth.

## 8. Output quality gate

A source is not “ingested” until:
- official/candidate status known
- checked_at set
- at least one source record stored
- facts reference source_id
- admin claims have Tier A/B evidence
