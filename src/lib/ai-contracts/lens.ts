import { z } from "zod";
import { ExecutionMethod } from "appwrite";
import { functions } from "../appwrite/client";

export const lensResultSchema = z.object({
  detectedLanguage: z.string(),
  literalMeaning: z.string(),
  likelyIntents: z.array(z.object({ label: z.string(), explanation: z.string() })).min(1).max(3),
  contextExplanation: z.string(),
  expectedNextAction: z.string(),
  misunderstandingRisk: z.enum(["low", "medium", "high"]),
  recommendedAction: z.string(),
  suggestedReplies: z.array(z.object({ mode: z.enum(["casual", "neutral", "academic", "very_respectful"]), text: z.string(), why: z.string() })).min(1).max(4),
  confidence: z.object({ label: z.enum(["low", "medium", "high"]), reason: z.string() }),
  sources: z.array(z.object({ sourceId: z.string(), title: z.string(), url: z.string().url(), authorityLevel: z.enum(["A", "B", "C", "D"]) })),
  individualVariationCaveat: z.string().optional(),
});

export type LensResult = z.infer<typeof lensResultSchema>;
export type LensInput = { inputType: "text" | "image" | "pdf"; text?: string; mediaBase64?: string; mimeType?: string; contextKey: string; journey: { home: string; host: string; city?: string; university?: string } };

export async function interpretLens(input: LensInput): Promise<LensResult> {
  const execution = await functions.createExecution({ functionId: "ai-gateway", body: JSON.stringify({ action: "lens", ...input }), async: false, xpath: "/lens", method: ExecutionMethod.POST });
  const payload = JSON.parse(execution.responseBody || "{}");
  if (!payload.ok) throw new Error(payload.message || "YapLens is unavailable.");
  return lensResultSchema.parse(payload.data);
}
