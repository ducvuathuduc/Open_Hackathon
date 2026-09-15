# 06 — Appwrite Logical Schema and Permissions

Use a single logical database on Free. If Education is confirmed, physical separation is optional but logical table names remain stable.

## 1. `student_profiles`

Fields:
- user_id string unique
- display_name string
- home_country_code string
- host_country_code string
- host_city string nullable
- university_id string nullable
- exchange_start datetime nullable
- exchange_end datetime nullable
- languages json
- interests json
- goals json
- concerns json
- exchange_stage enum
- created_at
- updated_at

Permissions:
- read/update: owner
- public profile data must be copied/derived into separate social profile, not expose full student profile

## 2. `my_dna_profiles`

- user_id
- explicitness int 0–100
- formality int
- hierarchy_sensitivity int
- conflict_openness int
- relationship_orientation int
- time_structure int
- participation_confidence int
- uncertainty_tolerance int
- assessment_version
- created_at
- updated_at

Owner read/write only.

## 3. `journeys`

- journey_id
- user_id
- home_country_code
- host_country_code
- city
- university_id
- start_date
- end_date
- status
- is_current

Owner read/write.

## 4. `countries`

- code
- name
- flag_emoji
- member_since
- default_languages json
- currency_code nullable
- timezone_notes nullable
- content_status
- last_reviewed_at

Public read, server/admin write.

## 5. `country_dna`

- country_code
- pack enum
- context_key
- summary
- data_json
- source_count
- confidence_label
- last_reviewed_at

Public read or authenticated read; server/admin write.

## 6. `universities`

- id
- country_code
- city
- name
- official_url
- international_office_url nullable
- verified
- last_checked_at

Public read, server/admin write.

## 7. `knowledge_sources`

- source_id
- country_code
- city nullable
- university_id nullable
- title
- url
- source_type
- authority_level
- language
- published_at nullable
- checked_at
- valid_until nullable
- content_hash
- status

Server write; read can be public for citation metadata.

## 8. `knowledge_facts`

- fact_id
- source_id
- country_code
- city nullable
- university_id nullable
- category
- context_key
- claim
- actionable_advice nullable
- authority_level
- confidence_label
- checked_at
- valid_until nullable
- verification_status

Server write. Client reads through controlled queries/function as appropriate.

## 9. `passport_tasks`

- task_id
- country_code
- city nullable
- university_id nullable
- phase
- category
- title
- description
- requirements_json
- source_ids json
- reviewed_at

Public/authenticated read; server write.

## 10. `user_task_progress`

- row_id
- user_id
- task_id
- status
- completed_at nullable
- saved boolean

Owner only.

## 11. `lens_sessions`

Persist derived information only by default:
- session_id
- user_id
- journey_id
- input_type
- context_key
- detected_language
- literal_meaning nullable
- likely_intents json
- risk_level
- recommended_action
- confidence_label
- source_ids json
- created_at

Owner only.
Do not store raw screenshot unless user explicitly saves it.

## 12. `practice_scenarios`

- scenario_id
- country_code
- context_key
- title
- persona_json
- goal
- difficulty
- source_ids json
- generated_for_user nullable

Read based on public/generated ownership.

## 13. `practice_sessions`

- session_id
- user_id
- scenario_id
- attempt_number
- transcript_summary
- score_json
- feedback_json
- duration_seconds
- completed_at

Owner only.

## 14. `skill_profiles`

- user_id
- language_clarity
- tone
- intent_recognition
- context_awareness
- adaptability
- confidence
- updated_at

Owner read/write through server logic.

## 15. `social_profiles`

Only opt-in public fields:
- user_id
- display_name
- avatar_file_id nullable
- role
- current_country
- city
- university_id nullable
- major nullable
- interests json
- languages json
- exchange_history json
- local_helper boolean
- discoverable boolean

Authenticated read for discoverable profiles; owner write.

## 16. `matches`

- id
- user_a
- user_b
- match_score
- reasons_json
- status
- created_at

Participants read; server/participants mutate status.

## 17. `conversations`

- id
- member_ids json
- created_at
- updated_at

Members only.

## 18. `messages`

- id
- conversation_id
- sender_id
- content
- translated_content nullable
- created_at
- deleted_at nullable

Conversation members only.

## 19. `local_questions`

- id
- user_id
- country_code
- city nullable
- university_id nullable
- context_key
- question
- status
- created_at

Owner + eligible helpers according to query/permissions.

## 20. `local_answers`

- id
- question_id
- user_id
- answer
- created_at
- verification_count
- needs_context_count

Authenticated appropriate users.

## 21. `reports` / `blocks`

Private.
Used to enforce social safety.

## 22. `places`

- place_id
- country_code
- city
- university_id nullable
- category
- name
- lat
- lng
- student_relevance
- amenities_json
- source_url nullable
- verified_count
- last_verified_at

Read public/authenticated, server/community controlled writes.

## 23. `reflections`

- id
- user_id
- scenario/context
- outcome
- mood
- note nullable
- guidance_helpful nullable
- created_at

Owner only.
