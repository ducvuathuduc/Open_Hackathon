# 07 — API / Function Contracts

The browser talks to Appwrite and two consolidated server functions. Exact HTTP mechanics may follow Appwrite Function invocation style; the logical contracts below are stable.

## `ai-gateway`

### `lens.interpret`

Request:
```json
{
  "journeyId": "string",
  "inputType": "text|image",
  "text": "optional string",
  "fileId": "optional temporary storage id",
  "contextKey": "group_project|professor|social|...",
  "outputLanguage": "en|vi|..."
}
```

Response:
- must conform to `schemas/lens-result.schema.json`

Server responsibilities:
- authorize user
- resolve profile/journey/MyDNA
- retrieve evidence
- call Gemini
- validate
- delete/expire temporary media if configured
- optionally persist derived Lens session

### `reply.rewrite`

Request:
- lensSessionId or context payload
- draft
- toneMode

Response:
```json
{
  "toneAssessment": "...",
  "riskLevel": "low|medium|high",
  "suggestions": [
    {"mode":"academic","text":"...","why":"..."}
  ]
}
```

### `sim.start`

Request:
- journeyId
- sourceLensSessionId optional
- scenarioId optional
- manualGoal optional

Response:
- scenario/persona/session ID

### `sim.turn`

Request:
- sessionId
- userText or audio reference

Response:
- in-role AI turn
- optional transcript metadata

### `sim.finish`

Request:
- sessionId

Response:
- `schemas/sim-feedback.schema.json`

Server persists attempt and skill update.

### `study.professor`
### `study.group`

Use profile/journey/context. Structured response with source/confidence where factual context is used.

## `data-worker`

### `ingest.source`
Input:
- registry source id or URL already approved

Responsibilities:
- obey registry/robots/TOS rules
- fetch
- extract
- hash/dedupe
- store source snapshot metadata
- segment facts
- validate authority/freshness
- upsert knowledge facts

### `recheck.source`
- conditional fetch/hash
- update `checked_at`
- mark stale facts if source changed/expired

## Error envelope

All functions should return a predictable error shape:
```json
{
  "ok": false,
  "code": "AI_TIMEOUT|SCHEMA_INVALID|NO_AUTH_SOURCE|PERMISSION|...",
  "message": "User-readable message",
  "retryable": true
}
```

Never return internal secret/config details to client.
