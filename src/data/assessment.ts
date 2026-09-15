import type { DnaKey } from "./dna";

export interface AssessmentOption {
  label: string;
  /** partial contribution toward dimensions, values 0..100 that get averaged */
  scores: Partial<Record<DnaKey, number>>;
}

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  options: AssessmentOption[];
}

/** 10 situational questions — MyDNA is derived ONLY from these answers, never nationality. */
export const ASSESSMENT: AssessmentQuestion[] = [
  {
    id: "q1",
    prompt: "A teammate's work has a clear mistake before a deadline. You…",
    options: [
      { label: "Point it out directly so we can fix it fast", scores: { directness: 90, conflict: 80 } },
      { label: "Mention it gently and offer to help", scores: { directness: 55, conflict: 50, relationship: 70 } },
      { label: "Hint at it and hope they notice", scores: { directness: 25, conflict: 25 } },
      { label: "Fix it quietly myself to avoid friction", scores: { directness: 15, conflict: 10, relationship: 60 } },
    ],
  },
  {
    id: "q2",
    prompt: "You're messaging a professor for the first time. Your opening is…",
    options: [
      { label: "\"Dear Professor …\" with full formality", scores: { formality: 92, hierarchy: 85 } },
      { label: "\"Hello Professor, hope you're well…\"", scores: { formality: 65, hierarchy: 60 } },
      { label: "\"Hi! Quick question —\"", scores: { formality: 30, hierarchy: 30 } },
    ],
  },
  {
    id: "q3",
    prompt: "In a group discussion, you usually…",
    options: [
      { label: "Speak up early and often", scores: { participation: 90, directness: 65 } },
      { label: "Contribute when I have something solid", scores: { participation: 55 } },
      { label: "Prefer to listen and share afterward", scores: { participation: 25 } },
    ],
  },
  {
    id: "q4",
    prompt: "A senior classmate suggests an idea you disagree with. You…",
    options: [
      { label: "Say I see it differently and explain why", scores: { hierarchy: 25, conflict: 80, directness: 75 } },
      { label: "Raise a gentle question about it", scores: { hierarchy: 55, conflict: 45 } },
      { label: "Go along to respect their seniority", scores: { hierarchy: 90, conflict: 20 } },
    ],
  },
  {
    id: "q5",
    prompt: "Plans with friends are best when they're…",
    options: [
      { label: "Scheduled and confirmed in advance", scores: { time: 90 } },
      { label: "Roughly planned, flexible on details", scores: { time: 55 } },
      { label: "Spontaneous — decide in the moment", scores: { time: 20 } },
    ],
  },
  {
    id: "q6",
    prompt: "You'd rather work with people who…",
    options: [
      { label: "Get straight to the task", scores: { relationship: 25, time: 70 } },
      { label: "Balance the task with getting to know each other", scores: { relationship: 60 } },
      { label: "Build a real friendship first", scores: { relationship: 92 } },
    ],
  },
  {
    id: "q7",
    prompt: "Instructions for an assignment are vague. You…",
    options: [
      { label: "Just start and adapt as I go", scores: { uncertainty: 90 } },
      { label: "Ask one or two clarifying questions", scores: { uncertainty: 55, participation: 55 } },
      { label: "Wait until everything is crystal clear", scores: { uncertainty: 20 } },
    ],
  },
  {
    id: "q8",
    prompt: "Someone gives you critical feedback in front of others. You feel…",
    options: [
      { label: "Fine — feedback is feedback", scores: { conflict: 85, directness: 60 } },
      { label: "A bit uncomfortable but okay", scores: { conflict: 50 } },
      { label: "Embarrassed — I'd prefer it in private", scores: { conflict: 20, relationship: 55 } },
    ],
  },
  {
    id: "q9",
    prompt: "When you enter a new social setting, you…",
    options: [
      { label: "Introduce myself to everyone", scores: { participation: 85, relationship: 60 } },
      { label: "Talk to whoever's nearby", scores: { participation: 55 } },
      { label: "Wait to be introduced", scores: { participation: 25, formality: 60 } },
    ],
  },
  {
    id: "q10",
    prompt: "Your ideal message to a new acquaintance is…",
    options: [
      { label: "Short and to the point", scores: { directness: 80, formality: 45 } },
      { label: "Friendly with a bit of small talk", scores: { relationship: 70, directness: 45 } },
      { label: "Polite and a little formal", scores: { formality: 80, hierarchy: 55 } },
    ],
  },
];

const DEFAULTS: Record<DnaKey, number> = {
  directness: 50,
  formality: 50,
  hierarchy: 50,
  conflict: 50,
  relationship: 50,
  time: 50,
  participation: 50,
  uncertainty: 50,
};

/** Average the chosen options' contributions into a full DnaScores profile. */
export function deriveMyDna(answers: Record<string, number>): Record<DnaKey, number> {
  const acc: Record<string, { sum: number; n: number }> = {};
  for (const q of ASSESSMENT) {
    const idx = answers[q.id];
    if (idx == null) continue;
    const opt = q.options[idx];
    if (!opt) continue;
    for (const [k, v] of Object.entries(opt.scores)) {
      acc[k] = acc[k] || { sum: 0, n: 0 };
      acc[k].sum += v as number;
      acc[k].n += 1;
    }
  }
  const out = { ...DEFAULTS };
  for (const [k, { sum, n }] of Object.entries(acc)) {
    out[k as DnaKey] = Math.round(sum / n);
  }
  return out;
}
