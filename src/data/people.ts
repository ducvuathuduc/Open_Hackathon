import type { CountryCode } from "./countries";

export type ConnectRole = "Local" | "Current Exchange" | "Incoming" | "Returned";

export interface Person {
  id: string;
  name: string;
  flag: string;
  age: number;
  role: ConnectRole;
  university: string;
  major: string;
  interests: string[];
  languages: string[];
  color: string;
  initials: string;
  verified?: boolean;
  repliesIn: string;
  matchScore: number;
  matchReasons: string[];
  icebreakers: string[];
}

/** People are keyed by host country (where the connection is happening). */
export const PEOPLE: Record<CountryCode, Person[]> = {
  SG: [
    { id: "kai", name: "Kai", flag: "🇸🇬", age: 21, role: "Local", university: "NUS", major: "Computer Science", interests: ["AI", "Gaming", "Coffee"], languages: ["English", "Mandarin"], color: "#3157D5", initials: "K", verified: true, repliesIn: "~2h", matchScore: 94, matchReasons: ["Same major", "Both into AI", "Kai previously studied in Ho Chi Minh City", "At your host university"], icebreakers: ["Hey Kai! I'm also in CS at NUS — I heard you studied in HCMC, how was it?", "Any tips for surviving the first CS group project here?", "Best coffee spot near campus for a fellow caffeine addict?"] },
    { id: "sara", name: "Sara", flag: "🇻🇳", age: 20, role: "Current Exchange", university: "NUS", major: "Business", interests: ["Photography", "Food", "Travel"], languages: ["Vietnamese", "English"], color: "#E5484D", initials: "S", repliesIn: "~1h", matchScore: 88, matchReasons: ["Both from Vietnam", "Currently on exchange here", "Loves photography"], icebreakers: ["Chào Sara! Also from VN on exchange — how are you settling in?", "Found any good Vietnamese food near campus yet?"] },
    { id: "wei2", name: "Wei Ling", flag: "🇸🇬", age: 22, role: "Local", university: "NTU", major: "Economics", interests: ["Startups", "Running"], languages: ["English", "Mandarin"], color: "#169B62", initials: "W", verified: true, repliesIn: "~4h", matchScore: 79, matchReasons: ["Local helper", "Interested in startups"], icebreakers: ["Hi Wei Ling! Keen to learn about the startup scene here — any student events?"] },
    { id: "arjun", name: "Arjun", flag: "🇸🇬", age: 21, role: "Returned", university: "NUS", major: "Engineering", interests: ["Football", "Music"], languages: ["English", "Tamil"], color: "#F59E0B", initials: "A", repliesIn: "~3h", matchScore: 74, matchReasons: ["Returned from exchange in Vietnam", "Loves football"], icebreakers: ["Hey Arjun! I saw you did an exchange in VN — any culture-shock tips in reverse? 😄"] },
  ],
  VN: [
    { id: "linh", name: "Linh", flag: "🇻🇳", age: 20, role: "Local", university: "VNU", major: "Economics", interests: ["Cafés", "K-pop", "Travel"], languages: ["Vietnamese", "English"], color: "#E5484D", initials: "L", verified: true, repliesIn: "~1h", matchScore: 92, matchReasons: ["Local helper", "Loves cafés", "Wants to practice English"], icebreakers: ["Xin chào! I'd love to show you the best cà phê spots near campus ☕", "Want to join our study café group this week?"] },
    { id: "minh2", name: "Minh Anh", flag: "🇲🇾", age: 21, role: "Current Exchange", university: "VNU", major: "Business", interests: ["Fashion", "Food"], languages: ["Malay", "English"], color: "#169B62", initials: "M", repliesIn: "~2h", matchScore: 85, matchReasons: ["Also from Malaysia", "On exchange here now", "Knows halal spots"], icebreakers: ["Hi! Fellow Malaysian on exchange — I've mapped the halal places, want them?"] },
    { id: "duc", name: "Đức", flag: "🇻🇳", age: 22, role: "Local", university: "FTU", major: "Business Analytics", interests: ["Startups", "Coffee"], languages: ["Vietnamese", "English"], color: "#3157D5", initials: "Đ", verified: true, repliesIn: "~5h", matchScore: 80, matchReasons: ["Same major", "Startup interest"], icebreakers: ["Chào! Same major — want to swap notes on analytics tools?"] },
  ],
  TH: [
    { id: "ploy2", name: "Ploy", flag: "🇹🇭", age: 21, role: "Local", university: "Chula", major: "Marketing", interests: ["K-pop", "Street food", "Muay Thai"], languages: ["Thai", "English"], color: "#3157D5", initials: "P", verified: true, repliesIn: "~2h", matchScore: 90, matchReasons: ["Local helper", "Shared love of street food", "Can teach Thai basics"], icebreakers: ["สวัสดี! I can teach you survival Thai over street food — deal? 😋"] },
    { id: "budi", name: "Budi", flag: "🇮🇩", age: 22, role: "Current Exchange", university: "Chula", major: "Business", interests: ["Marketing", "Football"], languages: ["Bahasa Indonesia", "English"], color: "#E5484D", initials: "B", repliesIn: "~3h", matchScore: 83, matchReasons: ["Also from Indonesia", "On exchange here now"], icebreakers: ["Halo! Fellow Indonesian in Bangkok — how's kreng jai treating you? 😅"] },
  ],
  PH: [
    { id: "miguel2", name: "Miguel", flag: "🇵🇭", age: 20, role: "Local", university: "Ateneo", major: "Communication", interests: ["Film", "Basketball", "Podcasts"], languages: ["Filipino", "English"], color: "#3157D5", initials: "M", verified: true, repliesIn: "~1h", matchScore: 91, matchReasons: ["Same major", "Loves film", "Can help with Taglish"], icebreakers: ["Kumusta! Same major — want to join our film org this sem?", "I can help you pick up Taglish fast, promise! 😄"] },
    { id: "nan", name: "Nan", flag: "🇹🇭", age: 21, role: "Current Exchange", university: "Ateneo", major: "Communication", interests: ["Coffee", "Podcasts"], languages: ["Thai", "English"], color: "#F59E0B", initials: "N", repliesIn: "~4h", matchScore: 82, matchReasons: ["Also from Thailand", "On exchange here now"], icebreakers: ["Hi! Also from Thailand here — the fast English was hard at first, DM me!"] },
  ],
  ID: [{ id: "rian2", name: "Rian", flag: "🇮🇩", age: 21, role: "Local", university: "UI", major: "Business", interests: ["Music", "Football"], languages: ["Bahasa Indonesia", "English"], color: "#E5484D", initials: "R", verified: true, repliesIn: "~2h", matchScore: 88, matchReasons: ["Local helper", "Can teach Bahasa"], icebreakers: ["Halo! Want to practice Bahasa over coffee?"] }],
  MY: [{ id: "farah2", name: "Farah", flag: "🇲🇾", age: 21, role: "Local", university: "UM", major: "Economics", interests: ["Cafés", "Fashion"], languages: ["Malay", "English"], color: "#169B62", initials: "F", verified: true, repliesIn: "~2h", matchScore: 89, matchReasons: ["Local helper", "Knows the best mamak spots"], icebreakers: ["Hi! Let's do a mamak session — best way to meet people here 🫖"] }],
  BN: [{ id: "hakim2", name: "Hakim", flag: "🇧🇳", age: 22, role: "Local", university: "UBD", major: "Business", interests: ["Reading", "Football"], languages: ["Malay", "English"], color: "#F0C419", initials: "H", verified: true, repliesIn: "~3h", matchScore: 84, matchReasons: ["Local helper"], icebreakers: ["Salam! Happy to show you around campus 😊"] }],
  KH: [{ id: "sokha2", name: "Sokha", flag: "🇰🇭", age: 20, role: "Local", university: "RUPP", major: "IT", interests: ["Coding", "Coffee"], languages: ["Khmer", "English"], color: "#3157D5", initials: "S", verified: true, repliesIn: "~3h", matchScore: 82, matchReasons: ["Local helper", "Can teach Khmer"], icebreakers: ["Sok sabai! Want to grab coffee and I'll teach you some Khmer?"] }],
  LA: [{ id: "noy2", name: "Noy", flag: "🇱🇦", age: 21, role: "Local", university: "NUOL", major: "Tourism", interests: ["Travel", "Cafés"], languages: ["Lao", "English"], color: "#C0392B", initials: "N", verified: true, repliesIn: "~4h", matchScore: 80, matchReasons: ["Local helper"], icebreakers: ["Sabaidee! Let me show you the riverside cafés 🌅"] }],
  MM: [{ id: "aung2", name: "Aung", flag: "🇲🇲", age: 22, role: "Local", university: "YU", major: "Engineering", interests: ["Tea shops", "Books"], languages: ["Burmese", "English"], color: "#F59E0B", initials: "A", verified: true, repliesIn: "~4h", matchScore: 79, matchReasons: ["Local helper"], icebreakers: ["Mingalaba! Tea shop chat? Best way to learn the city 🍵"] }],
  TL: [{ id: "jose2", name: "Jose", flag: "🇹🇱", age: 20, role: "Local", university: "UNTL", major: "Economics", interests: ["Football", "Music"], languages: ["Tetum", "Portuguese", "English"], color: "#E5484D", initials: "J", verified: true, repliesIn: "~5h", matchScore: 78, matchReasons: ["Local helper"], icebreakers: ["Bondia! Happy to introduce you to friends on campus ⚽"] }],
};

import { COUNTRIES } from "./countries";

const NAME_POOL = ["Alya", "Ren", "Maya", "Tan", "Nabil", "Chi", "Dara", "Fajar", "Lena", "Oscar", "Priya", "Suri"];
const INTEREST_POOL = [["Coffee", "Hiking"], ["Music", "Gaming"], ["Food", "Travel"], ["Startups", "Design"], ["Film", "Reading"]];
const AVATAR_COLORS = ["#3157D5", "#169B62", "#F59E0B", "#E5484D", "#7C3AED"];

function synthPerson(seed: number, host: CountryCode, from: CountryCode, role: ConnectRole): Person {
  const fromC = COUNTRIES[from];
  const hostC = COUNTRIES[host];
  const name = NAME_POOL[seed % NAME_POOL.length];
  const interests = INTEREST_POOL[seed % INTEREST_POOL.length];
  const reason: Record<ConnectRole, string[]> = {
    Local: [`Local ${hostC.name} student`, "Knows the campus + city well"],
    "Current Exchange": [`Also from ${fromC.name}`, `On exchange in ${hostC.name} right now`, "Just went through the same arrival"],
    Incoming: [`From ${fromC.name} like you`, `Arriving in ${hostC.name} soon — compare notes`],
    Returned: [`Returned from exchange in ${hostC.name}`, "Can share reverse culture tips"],
  };
  const ice: Record<ConnectRole, string[]> = {
    Local: [`Hi! Happy to show you around ${hostC.name} 😊`],
    "Current Exchange": [`Hey! Fellow ${fromC.name} student here — how's settling in?`],
    Incoming: [`Hi! I'm heading to ${hostC.name} too — want to swap prep notes?`],
    Returned: [`Hey! I did my exchange in ${hostC.name} — ask me anything 😄`],
  };
  const roleFlag = role === "Local" ? hostC.flag : fromC.flag;
  return {
    id: `${host}-${from}-${role}-${seed}`.toLowerCase(),
    name,
    flag: roleFlag,
    age: 20 + (seed % 4),
    role,
    university: hostC.name === "Singapore" ? "NUS" : `${hostC.name} University`,
    major: ["Business", "Computer Science", "Design", "Engineering"][seed % 4],
    interests,
    languages: role === "Local" ? [hostC.languages[0], "English"] : [fromC.languages[0], "English"],
    color: AVATAR_COLORS[seed % AVATAR_COLORS.length],
    initials: name[0],
    verified: role === "Local",
    repliesIn: ["~1h", "~2h", "~3h", "~5h"][seed % 4],
    matchScore: 72 + (seed % 20),
    matchReasons: reason[role],
    icebreakers: ice[role],
  };
}

/**
 * People to connect with, keyed by host but personalized to the traveller's home country.
 * Guarantees all four roles are represented (hand-authored entries first, synthesized to fill gaps).
 */
export function peopleFor(host: CountryCode, home: CountryCode): Person[] {
  const base = PEOPLE[host] ?? [];
  const present = new Set(base.map((p) => p.role));
  const roles: ConnectRole[] = ["Local", "Current Exchange", "Incoming", "Returned"];
  const extra: Person[] = [];
  let seed = host.charCodeAt(0) + home.charCodeAt(1);
  roles.forEach((role) => {
    // ensure at least one of each role; add a second Local/Exchange for richer lists
    const wanted = role === "Local" ? 2 : 1;
    const have = base.filter((p) => p.role === role).length;
    for (let i = have; i < wanted; i++) extra.push(synthPerson(seed++, host, home, role));
    present.add(role);
  });
  return [...base, ...extra].sort((a, b) => b.matchScore - a.matchScore);
}

export interface LocalAnswer {
  from: string;
  flag: string;
  text: string;
  verifiedBy: number;
  extraContext: number;
}

export const ASK_A_LOCAL_SAMPLE: LocalAnswer = {
  from: "Kai",
  flag: "🇸🇬",
  text: "For NUS, DBS/POSB is easiest — you can start the account in the app, then verify your Student's Pass. Bring your enrolment letter to be safe.",
  verifiedBy: 6,
  extraContext: 3,
};
