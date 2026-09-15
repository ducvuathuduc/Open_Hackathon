import assert from "node:assert/strict";
import test from "node:test";

import { P0_TABLES, privateRowPermissions } from "./schema.mjs";

test("declares every assigned P0 table exactly once", () => {
  const expected = [
    "student_profiles",
    "journeys",
    "my_dna_profiles",
    "user_task_progress",
    "skill_profiles",
    "lens_sessions",
    "practice_sessions",
    "knowledge_sources",
    "knowledge_facts",
    "passport_progress",
    "student_social_profiles",
    "conversations",
    "messages",
  ];

  assert.deepEqual(P0_TABLES.map((table) => table.id), expected);
  assert.equal(new Set(expected).size, expected.length);
});

test("passport progress retains the full aggregate required by the Passport", () => {
  const progress = P0_TABLES.find((table) => table.id === "passport_progress");
  assert.ok(progress);
  assert.deepEqual(
    progress.columns.map((column) => column.key),
    [
      "user_id",
      "countries_experienced",
      "situations_mastered",
      "situations_total",
      "language_practice",
      "verified_interactions",
      "skills",
      "quests",
      "stamps",
      "updated_at",
    ],
  );
});

test("private rows grant access only to their owner", () => {
  assert.deepEqual(privateRowPermissions("user-123"), [
    'read("user:user-123")',
    'update("user:user-123")',
    'delete("user:user-123")',
  ]);
});
