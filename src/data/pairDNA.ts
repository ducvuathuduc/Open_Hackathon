import type { CountryCode } from "./countries";
import { DNA_DIMENSIONS, HOST_CONTEXT, type DnaKey, type DnaScores } from "./dna";

export interface GapMeter {
  key: DnaKey;
  label: string;
  you: number;
  host: number;
  delta: number;
  verdict: "Strong transfer" | "Small adjustment" | "Possible adjustment" | "Worth practicing";
  tone: "success" | "primary" | "warning";
}

export interface PairDNA {
  home: CountryCode;
  host: CountryCode;
  readiness: number;
  meters: GapMeter[];
  biggestGaps: GapMeter[];
  strongestTransfer: GapMeter;
  unfamiliarSituations: string[];
}

function verdictFor(delta: number): { verdict: GapMeter["verdict"]; tone: GapMeter["tone"] } {
  if (delta <= 8) return { verdict: "Strong transfer", tone: "success" };
  if (delta <= 18) return { verdict: "Small adjustment", tone: "primary" };
  if (delta <= 30) return { verdict: "Possible adjustment", tone: "warning" };
  return { verdict: "Worth practicing", tone: "warning" };
}

/** Situations phrased contextually per host — never as a stereotype of the whole country. */
const SITUATION_HINTS: Partial<Record<DnaKey, string>> = {
  directness: "Giving explicit feedback in a group",
  formality: "Matching the expected level of formality with staff",
  hierarchy: "Interacting with senior classmates and lecturers",
  conflict: "Voicing disagreement in a meeting",
  relationship: "Building rapport before getting to the task",
  time: "Keeping to precise timings and deadlines",
  participation: "Asking for clarification during class",
  uncertainty: "Acting on ambiguous instructions",
};

export function computePairDNA(home: CountryCode, host: CountryCode, myDna: DnaScores): PairDNA {
  const hostCtx = HOST_CONTEXT[host];
  const meters: GapMeter[] = DNA_DIMENSIONS.map((d) => {
    const you = myDna[d.key as DnaKey];
    const hostVal = hostCtx[d.key as DnaKey];
    const delta = Math.abs(you - hostVal);
    const { verdict, tone } = verdictFor(delta);
    return { key: d.key as DnaKey, label: d.label, you, host: hostVal, delta, verdict, tone };
  });

  const sorted = [...meters].sort((a, b) => b.delta - a.delta);
  const biggestGaps = sorted.slice(0, 3);
  const strongestTransfer = sorted[sorted.length - 1];

  const avgDelta = meters.reduce((s, m) => s + m.delta, 0) / meters.length;
  const readiness = Math.max(48, Math.min(96, Math.round(100 - avgDelta * 1.35)));

  const unfamiliarSituations = biggestGaps
    .map((m) => SITUATION_HINTS[m.key])
    .filter(Boolean) as string[];

  return { home, host, readiness, meters, biggestGaps, strongestTransfer, unfamiliarSituations };
}
