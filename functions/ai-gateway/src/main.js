import { z } from "zod";

const Request = z.object({ action: z.enum(["lens", "reply", "tone-check", "transcribe", "health"]), inputType: z.enum(["text", "image", "pdf"]).optional(), text: z.string().max(12000).optional(), mediaBase64: z.string().max(14_000_000).optional(), mimeType: z.string().optional(), contextKey: z.string().optional(), journey: z.object({ home: z.string().length(2), host: z.string().length(2) }).optional() });
const Result = z.object({ detectedLanguage: z.string(), literalMeaning: z.string(), likelyIntents: z.array(z.object({ label: z.string(), explanation: z.string() })).min(1).max(3), contextExplanation: z.string(), expectedNextAction: z.string(), misunderstandingRisk: z.enum(["low", "medium", "high"]), recommendedAction: z.string(), suggestedReplies: z.array(z.object({ mode: z.enum(["casual", "neutral", "academic", "very_respectful"]), text: z.string(), why: z.string() })).min(1).max(4), confidence: z.object({ label: z.enum(["low", "medium", "high"]), reason: z.string() }), sources: z.array(z.object({ sourceId: z.string(), title: z.string(), url: z.string().url(), authorityLevel: z.enum(["A", "B", "C", "D"]) })), individualVariationCaveat: z.string().optional() });
export const redact = (s = "") => s.replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, "[redacted-email]").replace(/@\w+/g, "[redacted-user]");
const instruction = `Return JSON only. Exact shape: {"detectedLanguage":"string","literalMeaning":"string","likelyIntents":[{"label":"string","explanation":"string"}],"contextExplanation":"string","expectedNextAction":"string","misunderstandingRisk":"low","recommendedAction":"string","suggestedReplies":[{"mode":"neutral","text":"string","why":"string"}],"confidence":{"label":"low","reason":"string"},"sources":[],"individualVariationCaveat":"string"}. likelyIntents and suggestedReplies MUST contain objects, confidence MUST be an object. Use likely/may/in this context, never nationality stereotypes, never invent citations.`;
const normalize = (raw) => ({ ...raw, likelyIntents: (raw.likelyIntents || []).map((x) => typeof x === "string" ? { label: "Possible intent", explanation: x } : x), suggestedReplies: (raw.suggestedReplies || []).map((x) => typeof x === "string" ? { mode: "neutral", text: x, why: "Clear and respectful" } : x), misunderstandingRisk: ["low", "medium", "high"].includes(raw.misunderstandingRisk) ? raw.misunderstandingRisk : "medium", confidence: typeof raw.confidence === "object" ? raw.confidence : { label: "medium", reason: "Context interpretation can vary." }, sources: Array.isArray(raw.sources) ? raw.sources : [] });

async function groq(payload) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", { method: "POST", headers: { authorization: `Bearer ${process.env.GROQ_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify({ model: process.env.GROQ_TEXT_MODEL || "openai/gpt-oss-120b", response_format: { type: "json_object" }, messages: [{ role: "user", content: `${instruction}\n${redact(payload.text)}` }] }), signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw Object.assign(new Error(`groq:${response.status}`), { status: response.status });
  return JSON.parse((await response.json()).choices[0].message.content);
}
async function gemini(payload) {
  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: instruction }, { inlineData: { mimeType: payload.mimeType, data: payload.mediaBase64 } }] }], generationConfig: { responseMimeType: "application/json" } }), signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw Object.assign(new Error(`gemini:${response.status}`), { status: response.status });
  return JSON.parse((await response.json()).candidates[0].content.parts[0].text);
}
export default async ({ req, res, error }) => {
  try {
    const input = Request.parse(JSON.parse(req.bodyText || "{}"));
    if (input.action === "health") return res.json({ ok: true, providers: { groq: !!process.env.GROQ_API_KEY, gemini: !!process.env.GEMINI_API_KEY, cloudflare: !!process.env.CLOUDFLARE_API_TOKEN } });
    if (input.action === "transcribe") {
      if (!input.mediaBase64 || !input.mimeType?.startsWith("audio/")) return res.json({ ok: false, code: "INVALID_FILE", message: "Provide an audio file.", retryable: false }, 422);
      const form = new FormData(); form.append("model", process.env.GROQ_WHISPER_MODEL || "whisper-large-v3-turbo"); form.append("file", new Blob([Buffer.from(input.mediaBase64, "base64")], { type: input.mimeType }), "audio.webm");
      const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", { method: "POST", headers: { authorization: `Bearer ${process.env.GROQ_API_KEY}` }, body: form, signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw Object.assign(new Error(`groq:${response.status}`), { status: response.status });
      const transcript = (await response.json()).text?.trim(); if (!transcript) return res.json({ ok: false, code: "EMPTY_TRANSCRIPT", message: "No speech was detected.", retryable: false }, 422); return res.json({ ok: true, data: { transcript } });
    }
    if (!["lens", "reply", "tone-check"].includes(input.action)) return res.json({ ok: false, code: "NOT_FOUND", message: "Unsupported route.", retryable: false }, 404);
    input.inputType ||= "text";
    let value;
    for (let i = 0; i < 2; i += 1) { try { value = Result.parse(normalize(input.inputType === "text" ? await groq(input) : await gemini(input))); break; } catch (cause) { if (i) throw cause; } }
    return res.json({ ok: true, data: value });
  } catch (cause) { error(`ai-gateway:${cause instanceof Error ? cause.message : "unknown"}`); return res.json({ ok: false, code: cause?.status === 429 ? "RATE_LIMITED" : "AI_UNAVAILABLE", message: "YapLens is temporarily unavailable. Please try again.", retryable: true }, cause?.status === 429 ? 429 : 503); }
};
