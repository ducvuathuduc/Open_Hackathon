import type { CountryCode } from "./countries";

export interface SimPersona {
  name: string;
  age: number;
  role: string;
  traits: string[];
  color: string;
  initials: string;
}

export interface TranscriptLine {
  from: "ai" | "user";
  text: string;
  note?: string;
}

export interface ScoreDimension {
  key: string;
  label: string;
  before: number;
  after: number;
}

export interface SimScenario {
  id: string;
  host: CountryCode;
  title: string;
  context: string;
  persona: SimPersona;
  transcript: TranscriptLine[];
  scores: ScoreDimension[];
  feedback: string[];
  recommendation: string;
}

export const SIM_SCENARIOS: Record<CountryCode, SimScenario> = {
  SG: {
    id: "sim-sg",
    host: "SG",
    title: "First group project meeting",
    context: "Tomorrow: kick-off with your Singapore CS teammates. You need to disagree with a scoping idea — politely but clearly.",
    persona: { name: "Kai", age: 21, role: "NUS · Computer Science", traits: ["Friendly", "Fairly direct", "Deadline-driven"], color: "#3157D5", initials: "K" },
    transcript: [
      { from: "ai", text: "Okay so I think we should build the whole thing from scratch. More impressive right?" },
      { from: "user", text: "Maybe… but I'm a bit worried about time.", note: "Your position stayed a little ambiguous here." },
      { from: "ai", text: "It's fine lah, we can just work faster." },
      { from: "user", text: "I see your point, but I think reusing a library is safer for our deadline. Can we scope it smaller?", note: "Clear position + reasoning — well done." },
      { from: "ai", text: "Ok can, that makes sense. Let's do that." },
    ],
    scores: [
      { key: "clarity", label: "Language clarity", before: 74, after: 86 },
      { key: "language", label: "Language", before: 78, after: 81 },
      { key: "intent", label: "Intent recognition", before: 60, after: 78 },
      { key: "tone", label: "Tone", before: 66, after: 80 },
      { key: "adaptability", label: "Cultural adaptability", before: 71, after: 84 },
      { key: "confidence", label: "Confidence", before: 67, after: 83 },
    ],
    feedback: [
      "Your language was clear, but you softened your disagreement so much at first that your position became ambiguous.",
      "Great recovery — giving a reason (\"safer for our deadline\") made your point land without friction.",
      "Try leading with the position, then the reason: \"I think we should reuse a library — it's safer for the deadline.\"",
    ],
    recommendation: "Practice stating a position first, then softening — not the other way around.",
  },
  VN: {
    id: "sim-vn",
    host: "VN",
    title: "Asking a lecturer for clarification",
    context: "You need to ask your Vietnamese lecturer to explain part of the assignment — respectfully.",
    persona: { name: "Cô Lan", age: 45, role: "VNU · Lecturer", traits: ["Warm", "Values respect", "Encouraging"], color: "#169B62", initials: "L" },
    transcript: [
      { from: "ai", text: "Em có câu hỏi gì không?" },
      { from: "user", text: "Cô ơi, em chưa hiểu phần yêu cầu ạ.", note: "Good — respectful pronoun and polite particle." },
      { from: "ai", text: "Phần nào em chưa rõ?" },
      { from: "user", text: "Dạ, phần nộp bài nhóm ạ. Em có thể hỏi thêm được không cô?", note: "Polite, specific, and clear." },
    ],
    scores: [
      { key: "clarity", label: "Language clarity", before: 70, after: 82 },
      { key: "language", label: "Language", before: 62, after: 79 },
      { key: "intent", label: "Intent recognition", before: 66, after: 80 },
      { key: "tone", label: "Tone", before: 72, after: 88 },
      { key: "adaptability", label: "Cultural adaptability", before: 68, after: 85 },
      { key: "confidence", label: "Confidence", before: 60, after: 77 },
    ],
    feedback: [
      "Your use of \"cô\" and \"ạ\" showed appropriate respect — this matters a lot here.",
      "Being specific about which part you didn't understand made it easy for the lecturer to help.",
      "You can add \"em cảm ơn cô ạ\" to close warmly.",
    ],
    recommendation: "Keep pairing respectful pronouns with specific questions — it works well in Vietnamese classrooms.",
  },
  TH: {
    id: "sim-th",
    host: "TH",
    title: "Disagreeing with a senior teammate",
    context: "A senior (phi) proposed an approach you disagree with. Voice it without causing loss of face.",
    persona: { name: "Ploy", age: 23, role: "Chula · Senior", traits: ["Senior", "Polite", "Indirect"], color: "#F59E0B", initials: "P" },
    transcript: [
      { from: "ai", text: "เราน่าจะทำแบบนี้นะ" },
      { from: "user", text: "ครับ/ค่ะ พี่ ผม/หนูว่าดีครับ แต่ขออีกไอเดียได้ไหมครับ", note: "Respectful framing before offering an alternative." },
      { from: "ai", text: "ได้สิ ว่ามาเลย" },
      { from: "user", text: "ถ้าเราลองแบบนี้ อาจจะเร็วกว่าครับ พี่ว่าไงครับ", note: "Suggestion + deferring to the senior — well judged." },
    ],
    scores: [
      { key: "clarity", label: "Language clarity", before: 68, after: 80 },
      { key: "language", label: "Language", before: 55, after: 72 },
      { key: "intent", label: "Intent recognition", before: 64, after: 82 },
      { key: "tone", label: "Tone", before: 70, after: 88 },
      { key: "adaptability", label: "Cultural adaptability", before: 66, after: 86 },
      { key: "confidence", label: "Confidence", before: 58, after: 76 },
    ],
    feedback: [
      "You respected seniority with \"phi\" and polite particles before disagreeing — exactly right for kreng jai culture.",
      "Framing it as a question (\"what do you think?\") let the senior save face.",
      "Avoid a flat \"no\"; your softened alternative worked much better.",
    ],
    recommendation: "Offer alternatives as questions to seniors rather than direct contradictions.",
  },
  PH: {
    id: "sim-ph",
    host: "PH",
    title: "Keeping up in a fast group chat",
    context: "Your barkada is planning fast in Taglish. Join in and contribute confidently.",
    persona: { name: "Miguel", age: 20, role: "Ateneo · Comm", traits: ["Expressive", "Fast", "Friendly"], color: "#3157D5", initials: "M" },
    transcript: [
      { from: "ai", text: "Guys, tara let's meet up mamaya to plan the report ha?" },
      { from: "user", text: "Sige, I'm in! What time po?", note: "Good — joined in quickly with a clear question." },
      { from: "ai", text: "Around 4? Sa library." },
      { from: "user", text: "Perfect, see you there! I'll bring the outline.", note: "Confident and proactive contribution." },
    ],
    scores: [
      { key: "clarity", label: "Language clarity", before: 72, after: 84 },
      { key: "language", label: "Language", before: 68, after: 80 },
      { key: "intent", label: "Intent recognition", before: 62, after: 79 },
      { key: "tone", label: "Tone", before: 74, after: 86 },
      { key: "adaptability", label: "Cultural adaptability", before: 70, after: 85 },
      { key: "confidence", label: "Confidence", before: 60, after: 82 },
    ],
    feedback: [
      "You kept pace with the Taglish and stayed warm — that's how barkada chats flow.",
      "Offering to bring the outline showed initiative, which is valued here.",
      "Don't over-formalize; a little \"po\" plus casual English is the sweet spot.",
    ],
    recommendation: "Contribute early and offer to help — pace and warmth matter more than perfect grammar.",
  },
  ID: {
    id: "sim-id",
    host: "ID",
    title: "Reaching consensus in a group",
    context: "Your Indonesian group works by musyawarah (consensus). Share your view without dominating.",
    persona: { name: "Rian", age: 21, role: "UI · Business", traits: ["Consensus-driven", "Polite", "Calm"], color: "#E5484D", initials: "R" },
    transcript: [
      { from: "ai", text: "Menurut teman-teman gimana?" },
      { from: "user", text: "Menurut saya opsi kedua bagus, tapi gimana menurut yang lain?", note: "Shared a view then invited others — good musyawarah." },
      { from: "ai", text: "Setuju, kita bahas bareng ya." },
      { from: "user", text: "Boleh, kita cari yang terbaik bareng.", note: "Emphasized the group — well aligned." },
    ],
    scores: [
      { key: "clarity", label: "Language clarity", before: 70, after: 82 },
      { key: "language", label: "Language", before: 60, after: 76 },
      { key: "intent", label: "Intent recognition", before: 64, after: 80 },
      { key: "tone", label: "Tone", before: 72, after: 86 },
      { key: "adaptability", label: "Cultural adaptability", before: 66, after: 85 },
      { key: "confidence", label: "Confidence", before: 62, after: 78 },
    ],
    feedback: [
      "You offered your view but invited others — that respects consensus culture.",
      "Framing decisions as \"together\" (bareng) aligned well with the group.",
      "Avoid pushing a single answer too hard early on.",
    ],
    recommendation: "Share, then invite — consensus-building lands better than advocating one option.",
  },
  MY: {
    id: "sim-my",
    host: "MY",
    title: "Coordinating a multicultural team",
    context: "Your Malaysian team is multi-ethnic. Suggest a plan while being culturally aware.",
    persona: { name: "Farah", age: 21, role: "UM · Economics", traits: ["Warm", "Diplomatic", "Organized"], color: "#169B62", initials: "F" },
    transcript: [
      { from: "ai", text: "So how nak start ni?" },
      { from: "user", text: "Maybe we split the tasks? What works for everyone?", note: "Inclusive framing — good." },
      { from: "ai", text: "Boleh, good idea." },
      { from: "user", text: "Let's also check timings around everyone's classes and prayers.", note: "Culturally considerate — appreciated." },
    ],
    scores: [
      { key: "clarity", label: "Language clarity", before: 72, after: 84 },
      { key: "language", label: "Language", before: 70, after: 80 },
      { key: "intent", label: "Intent recognition", before: 64, after: 80 },
      { key: "tone", label: "Tone", before: 74, after: 87 },
      { key: "adaptability", label: "Cultural adaptability", before: 68, after: 88 },
      { key: "confidence", label: "Confidence", before: 66, after: 81 },
    ],
    feedback: [
      "Checking around prayer times showed strong cultural awareness.",
      "Inclusive questions kept everyone comfortable.",
      "Keep the light Manglish — it builds rapport.",
    ],
    recommendation: "Lead with inclusive questions and cultural awareness in multi-ethnic teams.",
  },
  BN: baseSim("BN", "Communicating formally on campus", "Brunei settings value formality and respect. Practice a polite introduction.", { name: "Hakim", age: 22, role: "UBD · Student", traits: ["Formal", "Reserved", "Kind"], color: "#F0C419", initials: "H" }),
  KH: baseSim("KH", "Meeting a study group", "Practice a warm, respectful first meeting in Phnom Penh.", { name: "Sokha", age: 20, role: "RUPP · Student", traits: ["Warm", "Respectful", "Shy"], color: "#3157D5", initials: "S" }),
  LA: baseSim("LA", "Joining a relaxed study session", "Match the calm, friendly pace in Vientiane.", { name: "Noy", age: 21, role: "NUOL · Student", traits: ["Calm", "Gentle", "Friendly"], color: "#C0392B", initials: "N" }),
  MM: baseSim("MM", "Asking a senior for help", "Practice a patient, respectful request in Yangon.", { name: "Aung", age: 22, role: "YU · Senior", traits: ["Patient", "Respectful", "Helpful"], color: "#F59E0B", initials: "A" }),
  TL: baseSim("TL", "Making friends on campus", "Practice a warm, relationship-first introduction in Dili.", { name: "Jose", age: 20, role: "UNTL · Student", traits: ["Warm", "Open", "Community-minded"], color: "#E5484D", initials: "J" }),
};

function baseSim(host: CountryCode, title: string, context: string, persona: SimPersona): SimScenario {
  return {
    id: `sim-${host.toLowerCase()}`,
    host,
    title,
    context,
    persona,
    transcript: [
      { from: "ai", text: "Hi! Nice to meet you — shall we get started?" },
      { from: "user", text: "Yes! Thanks for having me.", note: "Warm and polite opener." },
      { from: "ai", text: "Great, tell me a bit about yourself." },
      { from: "user", text: "I'm an exchange student here this semester — excited to learn.", note: "Clear and friendly." },
    ],
    scores: [
      { key: "clarity", label: "Language clarity", before: 70, after: 82 },
      { key: "language", label: "Language", before: 64, after: 78 },
      { key: "intent", label: "Intent recognition", before: 62, after: 78 },
      { key: "tone", label: "Tone", before: 72, after: 85 },
      { key: "adaptability", label: "Cultural adaptability", before: 66, after: 84 },
      { key: "confidence", label: "Confidence", before: 60, after: 78 },
    ],
    feedback: [
      "Warm, respectful openers work well in relationship-first cultures.",
      "Being clear about who you are helped the other person connect.",
      "Keep matching their pace and tone.",
    ],
    recommendation: "Lead with warmth and respect, then build the conversation naturally.",
  };
}
