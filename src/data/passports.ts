import { COUNTRIES, type CountryCode } from "./countries";

export type VerificationStatus = "verified" | "community" | "review" | "outdated";

export interface PassportCard {
  id: string;
  title: string;
  summary: string;
  requirements?: string[];
  officialSource?: string;
  lastReviewed?: string;
  verification: VerificationStatus;
}

export interface PassportSection {
  id: string;
  icon: string;
  title: string;
  blurb: string;
  progress: number;
  cards: PassportCard[];
}

const SECTION_META: { id: string; icon: string; title: string; blurb: string }[] = [
  { id: "before", icon: "🧳", title: "Before Arrival", blurb: "Documents & prep before you fly" },
  { id: "first24", icon: "🛬", title: "First 24 Hours", blurb: "Land, connect, get to campus" },
  { id: "firstweek", icon: "📅", title: "First Week", blurb: "Registration, SIM, bank, essentials" },
  { id: "study", icon: "🎓", title: "Study", blurb: "Classroom, professors, group work" },
  { id: "culture", icon: "🍜", title: "Culture", blurb: "Norms, etiquette, sensitivities" },
  { id: "language", icon: "🗣", title: "Language", blurb: "Survival phrases & local expressions" },
  { id: "money", icon: "🏦", title: "Money & Banking", blurb: "Accounts, payments, e-wallets" },
  { id: "sim", icon: "📶", title: "SIM & Connectivity", blurb: "SIM/eSIM & campus Wi-Fi" },
  { id: "transport", icon: "🚇", title: "Transport", blurb: "Cards, student fares, etiquette" },
  { id: "health", icon: "🏥", title: "Health & Safety", blurb: "Emergencies, clinics, insurance" },
  { id: "studentlife", icon: "🎒", title: "Student Life", blurb: "Clubs, study spots, routines" },
  { id: "explore", icon: "🗺️", title: "Explore", blurb: "Food, culture & student favourites" },
];

/** Deep, hand-written Singapore cards for the polished VN→SG journey. */
const SG_CARDS: Record<string, PassportCard[]> = {
  before: [
    { id: "sg-visa", title: "Student's Pass (STP)", summary: "Apply via SOLAR after your IPA letter. Register within 30 days of arrival.", requirements: ["IPA letter", "Passport (6+ months validity)", "Passport photo", "eForm 16 & Medical (if required)"], officialSource: "ica.gov.sg", lastReviewed: "Sep 2026", verification: "verified" },
    { id: "sg-pack", title: "What to pack", summary: "Light clothing (hot & humid year-round), an umbrella, and a Type G plug adapter.", verification: "community" },
  ],
  first24: [
    { id: "sg-arrival", title: "From Changi to campus", summary: "Buy an EZ-Link/SimplyGo at the MRT, or tap a contactless card straight in. MRT to NUS is ~45 min.", officialSource: "lta.gov.sg", lastReviewed: "Aug 2026", verification: "verified" },
    { id: "sg-wifi", title: "Get online", summary: "Connect to Wireless@SGx (free public Wi-Fi) and NUS_STU on campus.", verification: "community" },
  ],
  firstweek: [
    { id: "sg-reg", title: "Student registration", summary: "Complete matriculation online, collect your student card, then register your STP with ICA.", officialSource: "nus.edu.sg", lastReviewed: "Aug 2026", verification: "verified" },
    { id: "sg-bank", title: "Open a bank account", summary: "DBS/POSB, OCBC and UOB offer student accounts. Bring the documents below.", requirements: ["Passport", "Student's Pass", "Proof of NUS enrolment", "Local address (hall/dorm)"], officialSource: "mas.gov.sg", lastReviewed: "Sep 2026", verification: "verified" },
  ],
  study: [
    { id: "sg-class", title: "Classroom etiquette", summary: "Be on time, prepared, and expect to be graded on individual contribution within group work.", verification: "community" },
    { id: "sg-prof", title: "Emailing professors", summary: "Concise subject line, greeting with title, one clear ask. Response in 1–2 working days is normal.", verification: "community" },
    { id: "sg-group", title: "Group project culture", summary: "Roles are split early; free-riding is frowned upon. Peer evaluation often affects the grade.", verification: "review" },
  ],
  culture: [
    { id: "sg-faith", title: "Multi-faith respect", summary: "Singapore is highly multicultural. Check dietary needs (halal, vegetarian) before group meals.", verification: "community" },
    { id: "sg-norms", title: "Everyday norms", summary: "Queue orderly, keep public transport quiet, and never litter — fines are enforced.", officialSource: "nea.gov.sg", lastReviewed: "Jul 2026", verification: "outdated" },
  ],
  language: [
    { id: "sg-singlish", title: "Singlish survival", summary: "\"Can\" = yes/sure. \"Lah\" adds warmth. \"Paiseh\" = embarrassed/sorry. \"Makan\" = eat.", verification: "community" },
  ],
  money: [
    { id: "sg-pay", title: "Payment landscape", summary: "PayNow (by phone number), contactless cards and e-wallets are everywhere. Carry a little cash for hawkers.", officialSource: "mas.gov.sg", lastReviewed: "Sep 2026", verification: "verified" },
    { id: "sg-bank2", title: "Opening a bank account", summary: "Student accounts have no minimum balance. Appointments recommended; some banks allow app onboarding.", requirements: ["Passport", "Student's Pass", "Proof of address", "Enrolment letter"], officialSource: "dbs.com.sg", lastReviewed: "Sep 2026", verification: "verified" },
  ],
  sim: [
    { id: "sg-sim", title: "SIM & eSIM", summary: "Singtel, StarHub and M1 offer prepaid & student plans. eSIM is widely supported.", officialSource: "imda.gov.sg", lastReviewed: "Aug 2026", verification: "verified" },
  ],
  transport: [
    { id: "sg-mrt", title: "MRT & buses", summary: "Tap in/out with SimplyGo. Concession cards available for full-time students.", officialSource: "lta.gov.sg", lastReviewed: "Aug 2026", verification: "verified" },
  ],
  health: [
    { id: "sg-emergency", title: "Emergencies", summary: "995 ambulance/fire, 999 police. Campus health centre for non-emergencies.", officialSource: "moh.gov.sg", lastReviewed: "Sep 2026", verification: "verified" },
    { id: "sg-insure", title: "Insurance", summary: "Exchange students usually need approved medical insurance — confirm coverage before arrival.", verification: "review" },
  ],
  studentlife: [
    { id: "sg-cca", title: "Clubs & CCAs", summary: "Join interest groups during orientation — the fastest way to make friends.", verification: "community" },
  ],
  explore: [
    { id: "sg-food", title: "Student favourites", summary: "Hawker centres near NUS, 24h libraries, and cheap eats along Clementi.", verification: "community" },
  ],
};

/** Templated but believable cards for any other host country. */
function genericCards(host: CountryCode, sectionId: string): PassportCard[] {
  const c = COUNTRIES[host];
  const langs = c.languages.join(", ");
  const T: Record<string, PassportCard[]> = {
    before: [
      { id: `${host}-visa`, title: "Student visa & documents", summary: `Confirm your ${c.name} student visa and keep your passport valid 6+ months.`, requirements: ["Passport", "Acceptance letter", "Passport photos", "Proof of funds"], officialSource: "official immigration portal", lastReviewed: "Aug 2026", verification: "verified" },
    ],
    first24: [
      { id: `${host}-arrival`, title: "Getting to campus", summary: `Arrange airport transfer or ride-hailing to your accommodation in ${c.name}.`, verification: "community" },
    ],
    firstweek: [
      { id: `${host}-reg`, title: "Student registration", summary: "Complete enrolment, collect your student card and register locally if required.", officialSource: "your university portal", lastReviewed: "Aug 2026", verification: "verified" },
      { id: `${host}-bank`, title: "Open a bank account", summary: `Bring the documents below to open a local student account in ${c.name}.`, requirements: ["Passport", "Student visa/pass", "Proof of enrolment", "Local address"], officialSource: "central bank portal", lastReviewed: "Sep 2026", verification: "verified" },
    ],
    study: [
      { id: `${host}-class`, title: "Classroom etiquette", summary: `Learn how lecturers are addressed and how participation works in ${c.name}.`, verification: "community" },
      { id: `${host}-group`, title: "Group project culture", summary: "Understand how roles, consensus and feedback tend to work locally.", verification: "review" },
    ],
    culture: [
      { id: `${host}-norms`, title: "Everyday norms", summary: `Key etiquette and sensitivities to respect in ${c.name}.`, verification: "community" },
    ],
    language: [
      { id: `${host}-lang`, title: "Survival phrases", summary: `Languages you'll hear: ${langs}. Start with greetings, thanks and ordering food.`, verification: "community" },
    ],
    money: [
      { id: `${host}-pay`, title: "Payments & e-wallets", summary: `How locals pay day-to-day in ${c.name}, plus opening a student account.`, officialSource: "central bank portal", lastReviewed: "Sep 2026", verification: "verified" },
    ],
    sim: [
      { id: `${host}-sim`, title: "SIM & connectivity", summary: `Prepaid SIM options and campus Wi-Fi in ${c.name}.`, officialSource: "telecom regulator", lastReviewed: "Aug 2026", verification: "verified" },
    ],
    transport: [
      { id: `${host}-transport`, title: "Getting around", summary: `Public transport, ride-hailing and student fares in ${c.name}.`, verification: "community" },
    ],
    health: [
      { id: `${host}-health`, title: "Health & emergencies", summary: `Emergency numbers, nearest clinics and insurance guidance for ${c.name}.`, officialSource: "health ministry portal", lastReviewed: "Sep 2026", verification: "verified" },
    ],
    studentlife: [
      { id: `${host}-life`, title: "Student life", summary: "Clubs, societies and study spaces to meet people fast.", verification: "community" },
    ],
    explore: [
      { id: `${host}-explore`, title: "Student favourites", summary: `Affordable food, study spots and cultural places students love in ${c.name}.`, verification: "community" },
    ],
  };
  return T[sectionId] ?? [];
}

const PROGRESS_SEED = [100, 100, 60, 25, 40, 55, 30, 100, 45, 35, 20, 15];

export function buildPassport(host: CountryCode): PassportSection[] {
  return SECTION_META.map((m, i) => ({
    ...m,
    progress: PROGRESS_SEED[i] ?? 20,
    cards: host === "SG" ? SG_CARDS[m.id] ?? genericCards(host, m.id) : genericCards(host, m.id),
  }));
}
