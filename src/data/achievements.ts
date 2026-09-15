import type { CountryCode } from "./countries";

export interface SkillGrowth {
  key: string;
  label: string;
  value: number;
}

export interface CultureQuest {
  id: string;
  title: string;
  done: boolean;
  reflection?: string;
}

export interface AseanPassport {
  countriesExperienced: CountryCode[];
  situationsMastered: number;
  situationsTotal: number;
  languagePractice: { language: string; minutes: number }[];
  verifiedInteractions: number;
  skills: SkillGrowth[];
  quests: CultureQuest[];
  stamps: { code: CountryCode; label: string }[];
}

export function aseanPassportFor(home: CountryCode, host: CountryCode): AseanPassport {
  return {
    countriesExperienced: [home, host],
    situationsMastered: 14,
    situationsTotal: 30,
    languagePractice: [
      { language: "Local survival", minutes: 210 },
      { language: "Academic English", minutes: 340 },
    ],
    verifiedInteractions: 9,
    skills: [
      { key: "clarity", label: "Clarity", value: 84 },
      { key: "tone", label: "Tone", value: 80 },
      { key: "intent", label: "Intent recognition", value: 76 },
      { key: "adaptability", label: "Adaptability", value: 85 },
      { key: "confidence", label: "Confidence", value: 78 },
    ],
    quests: [
      { id: "q1", title: "Ask a local how they prefer to receive feedback", done: true, reflection: "Surprised how open they were!" },
      { id: "q2", title: "Order a meal using one local expression", done: true, reflection: "Nailed it 😄" },
      { id: "q3", title: "Ask a classmate what students call lecturers here", done: false },
      { id: "q4", title: "Join one club or society event", done: false },
    ],
    stamps: [
      { code: host, label: "First month abroad" },
      { code: home, label: "Home base" },
    ],
  };
}
