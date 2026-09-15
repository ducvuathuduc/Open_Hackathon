import type { CountryCode } from "./countries";

/** The 8 MyDNA dimensions — derived only from the user's assessment answers, never nationality. */
export const DNA_DIMENSIONS = [
  { key: "directness", label: "Communication explicitness", low: "Indirect", high: "Explicit" },
  { key: "formality", label: "Formality preference", low: "Casual", high: "Formal" },
  { key: "hierarchy", label: "Hierarchy sensitivity", low: "Flat", high: "Deferential" },
  { key: "conflict", label: "Conflict openness", low: "Avoidant", high: "Open" },
  { key: "relationship", label: "Relationship orientation", low: "Task-first", high: "Relationship-first" },
  { key: "time", label: "Time structure", low: "Fluid", high: "Rigid" },
  { key: "participation", label: "Participation confidence", low: "Reserved", high: "Vocal" },
  { key: "uncertainty", label: "Uncertainty tolerance", low: "Needs clarity", high: "Comfortable" },
] as const;

export type DnaKey = (typeof DNA_DIMENSIONS)[number]["key"];
export type DnaScores = Record<DnaKey, number>;

/** Host-context tendencies per country (macro starting point only — never a stereotype of individuals). */
export const HOST_CONTEXT: Record<CountryCode, DnaScores> = {
  SG: { directness: 68, formality: 59, hierarchy: 58, conflict: 55, relationship: 52, time: 78, participation: 70, uncertainty: 60 },
  VN: { directness: 46, formality: 66, hierarchy: 74, conflict: 38, relationship: 72, time: 58, participation: 48, uncertainty: 50 },
  TH: { directness: 40, formality: 70, hierarchy: 78, conflict: 30, relationship: 76, time: 52, participation: 44, uncertainty: 48 },
  PH: { directness: 55, formality: 52, hierarchy: 62, conflict: 44, relationship: 80, time: 50, participation: 66, uncertainty: 58 },
  ID: { directness: 42, formality: 64, hierarchy: 72, conflict: 34, relationship: 78, time: 48, participation: 50, uncertainty: 52 },
  MY: { directness: 48, formality: 62, hierarchy: 66, conflict: 40, relationship: 74, time: 56, participation: 54, uncertainty: 54 },
  BN: { directness: 40, formality: 74, hierarchy: 76, conflict: 30, relationship: 72, time: 54, participation: 46, uncertainty: 50 },
  KH: { directness: 42, formality: 68, hierarchy: 74, conflict: 32, relationship: 76, time: 50, participation: 44, uncertainty: 48 },
  LA: { directness: 38, formality: 68, hierarchy: 74, conflict: 28, relationship: 78, time: 46, participation: 42, uncertainty: 46 },
  MM: { directness: 40, formality: 70, hierarchy: 76, conflict: 30, relationship: 74, time: 48, participation: 44, uncertainty: 46 },
  TL: { directness: 46, formality: 60, hierarchy: 66, conflict: 38, relationship: 78, time: 46, participation: 50, uncertainty: 50 },
};

export interface DnaPack {
  key: string;
  icon: string;
  title: string;
  points: string[];
}

/** The 8 CountryDNA packs = knowledge context (not a personality test of a whole nation). */
export const COUNTRY_DNA: Record<CountryCode, DnaPack[]> = {
  SG: [
    { key: "language", icon: "🗣", title: "Language", points: ["English is the working & campus language", "Mandarin, Malay & Tamil are official", "Singlish + particles (\"lah\", \"can\", \"leh\") carry tone, not grammar"] },
    { key: "communication", icon: "🧠", title: "Communication", points: ["Efficient and fairly direct in academic settings", "Softened requests can still be firm expectations", "Messaging is quick, lowercase, emoji-light"] },
    { key: "academic", icon: "🎓", title: "Academic", points: ["Punctuality and deadlines are taken seriously", "Group work is graded on individual contribution", "Emailing professors: concise, titled, purposeful"] },
    { key: "social", icon: "🤝", title: "Social", points: ["Multicultural — check religious dietary needs", "Introductions are brief and low-touch", "Splitting the bill (\"go Dutch\") is normal"] },
    { key: "daily", icon: "🧭", title: "Daily Life", points: ["EZ-Link / SimplyGo for MRT & buses", "PayNow, cards & e-wallets everywhere", "Hawker centres = affordable daily food"] },
    { key: "systems", icon: "🏦", title: "Systems", points: ["Student Pass needed for most bank accounts", "eSIM widely supported (Singtel, StarHub, M1)", "Polyclinics + campus clinic for health"] },
    { key: "culture", icon: "🍜", title: "Culture", points: ["Extremely multi-faith — respect all practices", "Queueing and cleanliness are social norms", "Ramadan, Deepavali, CNY shape the calendar"] },
    { key: "student", icon: "🎒", title: "Student Life", points: ["CCAs (clubs) are a big social entry point", "24h study spots: libraries & co-working", "Fast-paced, high-achieving peer culture"] },
  ],
  VN: [
    { key: "language", icon: "🗣", title: "Language", points: ["Vietnamese is tonal — pronouns signal respect", "English common on campus, less off-campus", "\"Anh/chị/em\" address system encodes age & rank"] },
    { key: "communication", icon: "🧠", title: "Communication", points: ["Indirect; harmony and face are protected", "Disagreement is softened or given in private", "Warm, personal tone builds trust first"] },
    { key: "academic", icon: "🎓", title: "Academic", points: ["Respect for lecturers is strongly expected", "Group cohesion valued over standing out", "Address teachers as \"thầy/cô\""] },
    { key: "social", icon: "🤝", title: "Social", points: ["Coffee culture is the core social ritual", "Invitations to eat = genuine friendship", "Group harmony over individual preference"] },
    { key: "daily", icon: "🧭", title: "Daily Life", points: ["Grab bikes & motorbikes dominate transport", "MoMo, ZaloPay & cash widely used", "Cơm & phở street food is cheap and central"] },
    { key: "systems", icon: "🏦", title: "Systems", points: ["Passport + student visa for banking", "Viettel, Mobifone, Vinaphone SIMs", "Register temporary residence locally"] },
    { key: "culture", icon: "🍜", title: "Culture", points: ["Tết reshapes the whole calendar", "Remove shoes when entering homes", "Elders are greeted first, always"] },
    { key: "student", icon: "🎒", title: "Student Life", points: ["Tight-knit class cohorts (\"lớp\")", "Karaoke & trà đá gatherings", "Motorbike day trips on weekends"] },
  ],
  TH: [
    { key: "language", icon: "🗣", title: "Language", points: ["Thai is tonal; polite particles \"khrap/kha\"", "The wai greeting matters socially", "English varies widely off-campus"] },
    { key: "communication", icon: "🧠", title: "Communication", points: ["\"Kreng jai\" — reluctance to impose or confront", "Keeping \"jai yen\" (a cool heart) is valued", "Public criticism causes loss of face"] },
    { key: "academic", icon: "🎓", title: "Academic", points: ["Strong deference to lecturers (\"ajarn\")", "Students rarely challenge openly in class", "Seniority (\"phi/nong\") shapes group work"] },
    { key: "social", icon: "🤝", title: "Social", points: ["Smiling smooths most interactions", "Feet are impolite to point; heads are sacred", "Group meals are shared, not split"] },
    { key: "daily", icon: "🧭", title: "Daily Life", points: ["BTS/MRT in Bangkok; songthaews elsewhere", "PromptPay + cash; TrueMoney wallet", "Street food is everyday, affordable food"] },
    { key: "systems", icon: "🏦", title: "Systems", points: ["Passport + visa + proof of study for banking", "AIS, TrueMove, dtac SIMs", "TM.30 residence reporting applies"] },
    { key: "culture", icon: "🍜", title: "Culture", points: ["Respect for monarchy & Buddhism is essential", "Dress modestly at temples", "Songkran & Loy Krathong festivals"] },
    { key: "student", icon: "🎒", title: "Student Life", points: ["University uniforms are common", "Cafés are the default study space", "Faculty activities build friendships"] },
  ],
  PH: [
    { key: "language", icon: "🗣", title: "Language", points: ["English is an official & academic language", "Filipino/Tagalog everyday; regional languages", "Code-switching (\"Taglish\") is normal"] },
    { key: "communication", icon: "🧠", title: "Communication", points: ["Warm, expressive and relationship-driven", "\"Pakikisama\" — getting along smoothly", "Humor defuses tension quickly"] },
    { key: "academic", icon: "🎓", title: "Academic", points: ["\"Po/opo\" and \"Sir/Ma'am\" show respect", "Group work is highly collaborative", "Fast, casual English in discussions"] },
    { key: "social", icon: "🤝", title: "Social", points: ["Hospitality is central — expect to be fed", "Family and barkada (friend group) matter", "\"Mano\" gesture respects elders"] },
    { key: "daily", icon: "🧭", title: "Daily Life", points: ["Jeepneys, tricycles, Grab", "GCash is near-universal", "Sari-sari stores for daily needs"] },
    { key: "systems", icon: "🏦", title: "Systems", points: ["Passport + ACR I-Card for banking", "Globe, Smart, DITO SIMs", "SIM registration is mandatory"] },
    { key: "culture", icon: "🍜", title: "Culture", points: ["Predominantly Catholic calendar", "Fiestas and Sunday gatherings", "Karaoke is a national pastime"] },
    { key: "student", icon: "🎒", title: "Student Life", points: ["Org life (\"orgs\") drives campus culture", "Milk tea & café study culture", "Strong barkada study groups"] },
  ],
  ID: [
    { key: "language", icon: "🗣", title: "Language", points: ["Bahasa Indonesia is the shared language", "Hundreds of regional languages", "English limited outside campus"] },
    { key: "communication", icon: "🧠", title: "Communication", points: ["Indirect; smiles may mask disagreement", "\"Halus\" (refined) speech is valued", "Saving face is essential"] },
    { key: "academic", icon: "🎓", title: "Academic", points: ["Respect lecturers (\"Bapak/Ibu\", \"Dosen\")", "Consensus (\"musyawarah\") in group work", "Students seldom interrupt lectures"] },
    { key: "social", icon: "🤝", title: "Social", points: ["Community (\"gotong royong\") mindset", "Use right hand for giving/receiving", "Modesty in dress is appreciated"] },
    { key: "daily", icon: "🧭", title: "Daily Life", points: ["Gojek & Grab for transport & food", "GoPay, OVO, DANA e-wallets", "Warungs for cheap daily meals"] },
    { key: "systems", icon: "🏦", title: "Systems", points: ["Passport + KITAS for banking", "Telkomsel, Indosat, XL SIMs", "SIM registration required"] },
    { key: "culture", icon: "🍜", title: "Culture", points: ["Muslim-majority; respect prayer times", "Ramadan reshapes daily rhythm", "Remove shoes entering homes/mosques"] },
    { key: "student", icon: "🎒", title: "Student Life", points: ["Student organizations (\"UKM\")", "Angkringan & café hangouts", "Strong regional student communities"] },
  ],
  MY: [
    { key: "language", icon: "🗣", title: "Language", points: ["Malay is national; English widely used on campus", "Mandarin & Tamil communities", "\"Manglish\" mixes freely"] },
    { key: "communication", icon: "🧠", title: "Communication", points: ["Polite and relationship-aware", "Indirect refusals to keep harmony", "Multicultural sensitivity expected"] },
    { key: "academic", icon: "🎓", title: "Academic", points: ["Respect for lecturers, moderate hierarchy", "Multi-ethnic group projects are normal", "English-medium lectures common"] },
    { key: "social", icon: "🤝", title: "Social", points: ["Mamak stalls are the social hub", "Halal awareness in dining", "Festivals across faiths shared openly"] },
    { key: "daily", icon: "🧭", title: "Daily Life", points: ["Grab, MRT/LRT in KL", "Touch 'n Go eWallet everywhere", "Kopitiams for cheap meals"] },
    { key: "systems", icon: "🏦", title: "Systems", points: ["Passport + student pass for banking", "Maxis, Celcom, Digi SIMs", "EMGS handles student matters"] },
    { key: "culture", icon: "🍜", title: "Culture", points: ["Muslim-majority; multi-faith society", "Hari Raya, CNY, Deepavali all celebrated", "Modest dress respected"] },
    { key: "student", icon: "🎒", title: "Student Life", points: ["Clubs & societies at every uni", "24h mamak study sessions", "Diverse, multicultural friend circles"] },
  ],
  BN: [
    { key: "language", icon: "🗣", title: "Language", points: ["Malay is official; English widely used", "Formal address is expected", "Arabic in religious contexts"] },
    { key: "communication", icon: "🧠", title: "Communication", points: ["Polite, reserved and formal", "Indirectness preserves harmony", "Respect for authority is high"] },
    { key: "academic", icon: "🎓", title: "Academic", points: ["Strong deference to lecturers", "Modest classroom participation", "English-medium at UBD"] },
    { key: "social", icon: "🤝", title: "Social", points: ["Conservative social norms", "Use right hand; modest dress", "Warm but formal hospitality"] },
    { key: "daily", icon: "🧭", title: "Daily Life", points: ["Cars dominate; limited public transit", "Cards & cash; some e-wallets", "Tamu markets for local food"] },
    { key: "systems", icon: "🏦", title: "Systems", points: ["Passport + student pass for banking", "DST, imagine, Progresif SIMs", "Register with immigration"] },
    { key: "culture", icon: "🍜", title: "Culture", points: ["Islam central to daily life", "No alcohol sold publicly", "Friday prayers pause activity"] },
    { key: "student", icon: "🎒", title: "Student Life", points: ["UBD student societies", "Café & mall hangouts", "Community-oriented campus life"] },
  ],
  KH: [
    { key: "language", icon: "🗣", title: "Language", points: ["Khmer is national; English on campus", "Respectful pronouns matter", "French traces in older generations"] },
    { key: "communication", icon: "🧠", title: "Communication", points: ["Indirect; face-saving is key", "Smiling avoids confrontation", "Respect for elders & monks"] },
    { key: "academic", icon: "🎓", title: "Academic", points: ["High respect for teachers (\"lok kru\")", "Reserved classroom participation", "Group harmony valued"] },
    { key: "social", icon: "🤝", title: "Social", points: ["Sampeah greeting (like a wai)", "Avoid touching heads", "Modest dress at temples"] },
    { key: "daily", icon: "🧭", title: "Daily Life", points: ["Tuk-tuks, PassApp, motos", "ABA, Wing, cash; USD widely used", "Local markets for daily food"] },
    { key: "systems", icon: "🏦", title: "Systems", points: ["Passport + visa for banking", "Cellcard, Smart, Metfone SIMs", "Register residence locally"] },
    { key: "culture", icon: "🍜", title: "Culture", points: ["Theravada Buddhism central", "Khmer New Year & Pchum Ben", "Respect monks & temples"] },
    { key: "student", icon: "🎒", title: "Student Life", points: ["Growing café study culture", "University clubs emerging", "Friendly, community-based peers"] },
  ],
  LA: [
    { key: "language", icon: "🗣", title: "Language", points: ["Lao is national; English limited", "Nop greeting (like a wai)", "Polite particles matter"] },
    { key: "communication", icon: "🧠", title: "Communication", points: ["Very indirect; calm and gentle", "\"Bor pen nyang\" — relaxed attitude", "Avoid raising your voice"] },
    { key: "academic", icon: "🎓", title: "Academic", points: ["Strong respect for teachers", "Quiet classroom participation", "Slow, relationship-first pace"] },
    { key: "social", icon: "🤝", title: "Social", points: ["Modest dress, remove shoes indoors", "Don't touch heads", "Shared meals build bonds"] },
    { key: "daily", icon: "🧭", title: "Daily Life", points: ["Tuk-tuks & motorbikes", "Cash-based; some transfers", "Morning markets for food"] },
    { key: "systems", icon: "🏦", title: "Systems", points: ["Passport + visa for banking", "Unitel, Lao Telecom, ETL SIMs", "Register residence locally"] },
    { key: "culture", icon: "🍜", title: "Culture", points: ["Theravada Buddhism central", "Boun festivals & That Luang", "Relaxed pace of life"] },
    { key: "student", icon: "🎒", title: "Student Life", points: ["Close-knit small cohorts", "Riverside cafés to gather", "Community-first social life"] },
  ],
  MM: [
    { key: "language", icon: "🗣", title: "Language", points: ["Burmese is national; English on campus", "Respectful address (\"U/Daw\")", "Many ethnic languages"] },
    { key: "communication", icon: "🧠", title: "Communication", points: ["Indirect; deep respect for elders", "Smiling and patience are valued", "Avoid confrontation"] },
    { key: "academic", icon: "🎓", title: "Academic", points: ["Teachers highly respected (\"saya\")", "Reserved classroom style", "Group harmony emphasized"] },
    { key: "social", icon: "🤝", title: "Social", points: ["Remove shoes at pagodas & homes", "Modest dress; longyi common", "Right hand for giving"] },
    { key: "daily", icon: "🧭", title: "Daily Life", points: ["Buses, taxis, Grab in Yangon", "Cash-based; KBZPay growing", "Tea shops for daily meals"] },
    { key: "systems", icon: "🏦", title: "Systems", points: ["Passport + visa for banking", "MPT, Ooredoo, Atom SIMs", "Register with authorities"] },
    { key: "culture", icon: "🍜", title: "Culture", points: ["Theravada Buddhism central", "Thingyan water festival", "Respect monks & pagodas"] },
    { key: "student", icon: "🎒", title: "Student Life", points: ["Tea-shop study culture", "Tight community bonds", "Emerging campus clubs"] },
  ],
  TL: [
    { key: "language", icon: "🗣", title: "Language", points: ["Tetum & Portuguese are official", "Indonesian & English also used", "Multilingual everyday life"] },
    { key: "communication", icon: "🧠", title: "Communication", points: ["Warm, relationship-driven", "Respect for elders & community", "Patience with pace"] },
    { key: "academic", icon: "🎓", title: "Academic", points: ["Respect for lecturers", "Collaborative group culture", "Multilingual instruction"] },
    { key: "social", icon: "🤝", title: "Social", points: ["Strong community ties", "Catholic-majority customs", "Hospitable and welcoming"] },
    { key: "daily", icon: "🧭", title: "Daily Life", points: ["Microlets & taxis in Dili", "Cash-based (USD)", "Local markets for food"] },
    { key: "systems", icon: "🏦", title: "Systems", points: ["Passport + visa for banking", "Telkomcel, Timor Telecom SIMs", "Register residence locally"] },
    { key: "culture", icon: "🍜", title: "Culture", points: ["Predominantly Catholic", "New ASEAN member (2025)", "Blend of Portuguese & Asian culture"] },
    { key: "student", icon: "🎒", title: "Student Life", points: ["Growing university scene", "Community-based gatherings", "Emerging student networks"] },
  ],
};
