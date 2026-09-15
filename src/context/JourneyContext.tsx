import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { CountryCode } from "../data/countries";
import { JOURNEYS, journeyById, type Journey } from "../data/journeys";
import { computePairDNA, type PairDNA } from "../data/pairDNA";
import type { DnaScores } from "../data/dna";
import { account, isAppwriteConfigured } from "../lib/appwrite/client";
import { fetchTaskProgress, setTaskProgress } from "../lib/appwrite/taskProgress";

export type ForcedState = "default" | "loading" | "empty" | "error" | "offline" | "permission" | "lowconf" | "stale";

export type SavedKind = "place" | "insight" | "phrase" | "task";
export interface SavedItem {
  id: string;
  kind: SavedKind;
  title: string;
  subtitle?: string;
  icon?: string;
}

interface JourneyCtx {
  journey: Journey;
  pair: PairDNA;
  setJourneyId: (id: string) => void;
  /** override home/host/myDna for a freshly onboarded user */
  setCustom: (patch: Partial<Journey>) => void;
  /** live-switch origin/destination while keeping the active MyDNA (ASEAN Compass) */
  setRoute: (home: CountryCode, host: CountryCode) => void;
  forced: ForcedState;
  setForced: (s: ForcedState) => void;
  savedTasks: Record<string, boolean>;
  toggleTask: (id: string) => void;
  saved: SavedItem[];
  toggleSave: (item: SavedItem) => void;
  isSaved: (id: string) => boolean;
}

const Ctx = createContext<JourneyCtx | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [journey, setJourney] = useState<Journey>(journeyById("minh"));
  const [forced, setForced] = useState<ForcedState>("default");
  const [savedTasks, setSavedTasks] = useState<Record<string, boolean>>({});
  const [saved, setSavedItems] = useState<SavedItem[]>([]);
  const userIdRef = useRef<string | null>(null);

  // Load persisted task progress once a session exists (set up during onboarding).
  useEffect(() => {
    if (!isAppwriteConfigured) return;
    let cancelled = false;
    account
      .get()
      .then(async (user) => {
        if (cancelled) return;
        userIdRef.current = user.$id;
        const persisted = await fetchTaskProgress(user.$id);
        if (!cancelled && Object.keys(persisted).length) setSavedTasks((s) => ({ ...s, ...persisted }));
      })
      .catch(() => {
        // No session yet (pre-onboarding) — task state stays local-only until one exists.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const pair = useMemo(() => computePairDNA(journey.home, journey.host, journey.myDna as DnaScores), [journey]);

  const value: JourneyCtx = {
    journey,
    pair,
    setJourneyId: (id) => setJourney(journeyById(id)),
    setCustom: (patch) => setJourney((j) => ({ ...j, ...patch })),
    setRoute: (home, host) =>
      setJourney((j) => {
        const p = computePairDNA(home, host, j.myDna as DnaScores);
        return { ...j, home, host, readiness: p.readiness };
      }),
    forced,
    setForced,
    savedTasks,
    toggleTask: (id) => {
      setSavedTasks((s) => {
        const next = !s[id];
        if (userIdRef.current) void setTaskProgress(userIdRef.current, id, next);
        return { ...s, [id]: next };
      });
    },
    saved,
    toggleSave: (item) =>
      setSavedItems((list) => (list.some((s) => s.id === item.id) ? list.filter((s) => s.id !== item.id) : [item, ...list])),
    isSaved: (id) => saved.some((s) => s.id === id),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useJourney() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useJourney must be used within JourneyProvider");
  return c;
}

export function makeCustomJourney(home: CountryCode, host: CountryCode, myDna: DnaScores): Partial<Journey> {
  const base = JOURNEYS[0];
  const pair = computePairDNA(home, host, myDna);
  return {
    home,
    host,
    myDna,
    readiness: pair.readiness,
    id: "custom",
    name: "You",
    initials: "Y",
    avatarColor: "#3157D5",
  };
}
