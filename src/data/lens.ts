import type { CountryCode } from "./countries";

export type ReplyTone = "Casual" | "Neutral" | "Academic" | "Very Respectful";

export interface ReplyOption {
  tone: ReplyTone;
  text: string;
}

export interface LensResult {
  id: string;
  host: CountryCode;
  inputType: "text" | "screenshot" | "camera" | "voice" | "conversation";
  scenario: string;
  original: string;
  detectedLanguage: string;
  literal: string;
  intent: string;
  contextual: string;
  expected: string;
  risk: number; // misunderstanding risk %
  confidence: number; // evidence confidence %
  sources: { label: string; type: string }[];
  recommendedAction: string;
  replies: ReplyOption[];
  draftWarning?: { draft: string; note: string };
}

export const LENS_SAMPLES: Record<CountryCode, LensResult> = {
  SG: {
    id: "lens-sg",
    host: "SG",
    inputType: "screenshot",
    scenario: "Group project message from a teammate",
    original: "Maybe you can revise this part first.",
    detectedLanguage: "English (Singapore)",
    literal: "Perhaps you have the option to edit this section before other things.",
    intent: "This is closer to a request than an optional suggestion.",
    contextual: "Softened phrasing (\"maybe you can\") is often used to give a direct instruction politely without sounding commanding.",
    expected: "Revise the section before the next meeting.",
    risk: 68,
    confidence: 82,
    sources: [
      { label: "NUS group-work norms", type: "University" },
      { label: "SG workplace communication guide", type: "Community" },
    ],
    recommendedAction: "Treat this as an action item. Confirm you'll revise it and give a rough timeline.",
    replies: [
      { tone: "Casual", text: "Sure! I'll fix that part tonight 👍" },
      { tone: "Neutral", text: "Got it — I'll revise this section and share it before our sync." },
      { tone: "Academic", text: "Understood. I'll revise this section and circulate an updated draft ahead of the meeting." },
      { tone: "Very Respectful", text: "Thanks for flagging this. I'll revise it carefully and send the update before we meet — let me know if you'd like anything else changed." },
    ],
    draftWarning: { draft: "No I think mine is correct.", note: "This could sound defensive. Consider acknowledging their point first." },
  },
  VN: {
    id: "lens-vn",
    host: "VN",
    inputType: "text",
    scenario: "Message from a Vietnamese classmate",
    original: "Anh xem giúp em phần này với nhé.",
    detectedLanguage: "Vietnamese",
    literal: "Older-brother, please look at this part for me.",
    intent: "A polite request for help, framed with respectful pronouns.",
    contextual: "\"Anh/em\" signals age & respect. The tone is warm and expects a friendly, willing reply.",
    expected: "You review the section and give feedback, ideally soon.",
    risk: 40,
    confidence: 78,
    sources: [
      { label: "Vietnamese address forms", type: "Language" },
      { label: "VNU peer communication", type: "Community" },
    ],
    recommendedAction: "Reply warmly and agree to help. Matching the friendly tone builds trust.",
    replies: [
      { tone: "Casual", text: "Ok em, để anh xem nhé!" },
      { tone: "Neutral", text: "Được, anh xem rồi báo lại em nhé." },
      { tone: "Academic", text: "Anh sẽ xem kỹ phần này và gửi nhận xét cho em sớm." },
      { tone: "Very Respectful", text: "Cảm ơn em đã nhờ. Anh sẽ xem cẩn thận và phản hồi em trong hôm nay nhé." },
    ],
  },
  TH: {
    id: "lens-th",
    host: "TH",
    inputType: "voice",
    scenario: "A senior classmate replies to your idea",
    original: "โอเคนะ เดี๋ยวลองดูก่อน",
    detectedLanguage: "Thai",
    literal: "Okay then, I'll try looking at it first.",
    intent: "This may be a soft, non-committal reply rather than a firm yes.",
    contextual: "\"Kreng jai\" culture means people avoid direct refusal — \"I'll see\" can politely signal hesitation.",
    expected: "Don't assume full agreement; follow up gently to confirm.",
    risk: 62,
    confidence: 74,
    sources: [
      { label: "Kreng jai & indirectness", type: "Culture" },
      { label: "Chula group-work notes", type: "Community" },
    ],
    recommendedAction: "Give them space, then check in later with a specific, easy-to-answer question.",
    replies: [
      { tone: "Casual", text: "ได้เลยพี่ ขอบคุณนะครับ/คะ 🙏" },
      { tone: "Neutral", text: "โอเคครับ/ค่ะ เดี๋ยวผม/หนูรอฟังนะ" },
      { tone: "Academic", text: "ขอบคุณครับ/ค่ะ ถ้าพี่สะดวก รบกวนช่วยดูภายในวันพรุ่งนี้ได้ไหมครับ/คะ" },
      { tone: "Very Respectful", text: "ขอบพระคุณมากครับ/ค่ะ ไม่เร่งนะครับ/คะ แล้วแต่พี่สะดวกเลย" },
    ],
  },
  PH: {
    id: "lens-ph",
    host: "PH",
    inputType: "screenshot",
    scenario: "Group chat message from a classmate",
    original: "Sige, bahala ka na sa part na 'yan ha.",
    detectedLanguage: "Filipino (Taglish)",
    literal: "Okay, it's up to you for that part, okay.",
    intent: "You're being trusted to fully own that section.",
    contextual: "\"Bahala ka na\" hands you responsibility with confidence — it's warm, not dismissive.",
    expected: "Take ownership of the part and deliver it without needing more instructions.",
    risk: 45,
    confidence: 76,
    sources: [
      { label: "Taglish expressions", type: "Language" },
      { label: "Ateneo org culture", type: "Community" },
    ],
    recommendedAction: "Accept the responsibility warmly and confirm what you'll deliver.",
    replies: [
      { tone: "Casual", text: "Sige, ako na po dito! 💪" },
      { tone: "Neutral", text: "Okay, I'll take care of that part and update the group." },
      { tone: "Academic", text: "Understood — I'll handle this section and share it with everyone by tomorrow." },
      { tone: "Very Respectful", text: "Salamat po sa tiwala! Aasikasuhin ko po ito nang maayos and I'll update you all soon." },
    ],
  },
  ID: {
    id: "lens-id",
    host: "ID",
    inputType: "text",
    scenario: "A lecturer's assistant messages you",
    original: "Nanti bisa dikumpulkan ya kalau sudah sempat.",
    detectedLanguage: "Bahasa Indonesia",
    literal: "Later it can be submitted, yes, if you already have time.",
    intent: "This is a polite but real deadline reminder.",
    contextual: "\"Kalau sudah sempat\" (when you have time) softens the request — it still expects prompt action.",
    expected: "Submit the work soon, not \"whenever\".",
    risk: 58,
    confidence: 73,
    sources: [
      { label: "Halus (refined) speech", type: "Language" },
      { label: "UI academic norms", type: "Community" },
    ],
    recommendedAction: "Treat it as due soon. Confirm a specific submission time politely.",
    replies: [
      { tone: "Casual", text: "Baik, nanti sore saya kumpulkan ya!" },
      { tone: "Neutral", text: "Terima kasih infonya, saya kumpulkan hari ini." },
      { tone: "Academic", text: "Baik, terima kasih. Akan saya kumpulkan sebelum akhir hari ini." },
      { tone: "Very Respectful", text: "Terima kasih banyak, Pak/Bu. Akan segera saya kumpulkan hari ini juga." },
    ],
  },
  MY: {
    id: "lens-my",
    host: "MY",
    inputType: "screenshot",
    scenario: "Teammate reply in a group chat",
    original: "Boleh la, tapi maybe tengok dulu ok?",
    detectedLanguage: "Malay (Manglish)",
    literal: "Can, but maybe look first ok?",
    intent: "A soft yes with a note of hesitation — they want to review before committing.",
    contextual: "Indirect phrasing keeps harmony; \"tengok dulu\" signals \"let me check first\".",
    expected: "Give them time to review, then confirm.",
    risk: 50,
    confidence: 72,
    sources: [
      { label: "Manglish & indirectness", type: "Language" },
      { label: "UM group culture", type: "Community" },
    ],
    recommendedAction: "Acknowledge and offer to wait for their review before finalizing.",
    replies: [
      { tone: "Casual", text: "Ok no problem, tengok dulu 👍" },
      { tone: "Neutral", text: "Sure, take your time to review — let me know after." },
      { tone: "Academic", text: "Noted, thanks. Please review it and I'll finalize once you confirm." },
      { tone: "Very Respectful", text: "Thanks so much! No rush at all — do review first and let me know when you're ready." },
    ],
  },
  BN: { id: "lens-bn", host: "BN", inputType: "text", scenario: "Message from a classmate", original: "InsyaAllah boleh, nanti saya beritahu.", detectedLanguage: "Malay", literal: "God willing it can, later I'll inform.", intent: "A polite, tentative yes — confirmation will follow.", contextual: "Formal, faith-inflected politeness; a firm follow-up is expected later.", expected: "Wait for the confirmation they promised.", risk: 44, confidence: 70, sources: [{ label: "Bruneian Malay etiquette", type: "Culture" }], recommendedAction: "Thank them and wait for the update.", replies: [{ tone: "Casual", text: "Ok, terima kasih!" }, { tone: "Neutral", text: "Baik, saya tunggu berita." }, { tone: "Academic", text: "Terima kasih, saya nantikan pengesahan." }, { tone: "Very Respectful", text: "Terima kasih banyak, tiada masalah — saya tunggu khabar dari awak." }] },
  KH: { id: "lens-kh", host: "KH", inputType: "text", scenario: "Message from a classmate", original: "បាទ/ចាស ខ្ញុំនឹងព្យាយាម", detectedLanguage: "Khmer", literal: "Yes, I will try.", intent: "A polite commitment softened by \"try\".", contextual: "Face-saving culture: \"try\" avoids overpromising.", expected: "They intend to help; a gentle reminder is fine.", risk: 42, confidence: 68, sources: [{ label: "Khmer politeness", type: "Culture" }], recommendedAction: "Thank them warmly and check in later.", replies: [{ tone: "Casual", text: "អរគុណ! 🙏" }, { tone: "Neutral", text: "អរគុណច្រើន, ខ្ញុំរង់ចាំ។" }, { tone: "Academic", text: "សូមអរគុណ ខ្ញុំនឹងរង់ចាំការឆ្លើយតប។" }, { tone: "Very Respectful", text: "សូមអរគុណយ៉ាងជ្រាលជ្រៅ មិនប្រញាប់ទេ។" }] },
  LA: { id: "lens-la", host: "LA", inputType: "text", scenario: "Message from a classmate", original: "ໄດ້ເດີ້ ค่อยเบิ่งกันเนาะ", detectedLanguage: "Lao", literal: "Okay, let's look at it together later.", intent: "A relaxed, friendly agreement.", contextual: "Gentle, unhurried tone typical of \"bor pen nyang\" ease.", expected: "No urgency; follow the relaxed pace.", risk: 35, confidence: 66, sources: [{ label: "Lao communication style", type: "Culture" }], recommendedAction: "Match the calm tone and agree.", replies: [{ tone: "Casual", text: "ໄດ້ເລີຍ ຂອບໃຈ!" }, { tone: "Neutral", text: "ໂອເຄ, ຄ່ອຍເບິ່ງນຳกัน." }, { tone: "Academic", text: "ຂອບໃຈ, ຂ້ອຍຈະລໍຖ້າ." }, { tone: "Very Respectful", text: "ຂອບໃຈຫຼາຍໆ ບໍ່ຟ້າວເດີ້." }] },
  MM: { id: "lens-mm", host: "MM", inputType: "text", scenario: "Message from a classmate", original: "ရပါတယ်၊ ခဏစောင့်ပေးနော်။", detectedLanguage: "Burmese", literal: "It's okay, please wait a moment.", intent: "A polite ask for a little patience.", contextual: "Deferential, patient tone; expects understanding.", expected: "Give them a moment before following up.", risk: 38, confidence: 66, sources: [{ label: "Burmese politeness", type: "Culture" }], recommendedAction: "Reply patiently and wait.", replies: [{ tone: "Casual", text: "ရပါတယ် ကျေးဇူးပါ!" }, { tone: "Neutral", text: "ဟုတ်ကဲ့၊ စောင့်နေမယ်နော်။" }, { tone: "Academic", text: "ကျေးဇူးတင်ပါတယ်၊ စောင့်ပါမယ်။" }, { tone: "Very Respectful", text: "ကျေးဇူးအများကြီးတင်ပါတယ်၊ အလျင်မလိုပါဘူး။" }] },
  TL: { id: "lens-tl", host: "TL", inputType: "text", scenario: "Message from a classmate", original: "Bele, hein — ita bele koalia depois.", detectedLanguage: "Tetum", literal: "Okay, hey — we can talk later.", intent: "A warm, open agreement to continue later.", contextual: "Relationship-first, relaxed tone.", expected: "Continue the conversation when convenient.", risk: 36, confidence: 64, sources: [{ label: "Tetum everyday speech", type: "Language" }], recommendedAction: "Agree warmly and set a loose time.", replies: [{ tone: "Casual", text: "Bele, obrigadu!" }, { tone: "Neutral", text: "Diak, ita koalia depois." }, { tone: "Academic", text: "Obrigadu, ha'u hein ita-nia resposta." }, { tone: "Very Respectful", text: "Obrigadu barak — la iha presa, hein di'ak." }] },
};
