import { useEffect, useState } from "react";
import { useJourney } from "../context/JourneyContext";
import { useNav } from "../context/NavContext";
import { Scroll } from "../components/shell";
import { Card, Button, Segmented, RiskBadge, ConfidenceBadge, Badge, Notice, Toast } from "../components/ui";
import { LENS_SAMPLES, type ReplyTone } from "../data/lens";
import { COUNTRIES } from "../data/countries";
import { interpretLens, type LensResult as GatewayLensResult } from "../lib/ai-contracts/lens";

type Mode = "text" | "screenshot" | "camera" | "voice" | "conversation";
type Phase = "input" | "scanning" | "result" | "error";

const SCAN_STEPS = ["Processing input", "Detecting language", "Retrieving local sources", "Interpreting context", "Generating"];

export default function Lens() {
  const { journey, forced } = useJourney();
  const nav = useNav();
  const [mode, setMode] = useState<Mode>("screenshot");
  const [phase, setPhase] = useState<Phase>("input");
  const [scanStep, setScanStep] = useState(0);
  const [text, setText] = useState("");
  const [result, setResult] = useState<GatewayLensResult | null>(null);
  const [error, setError] = useState("");
  const lowConf = forced === "lowconf";

  useEffect(() => { if (phase !== "scanning") return; const iv = setInterval(() => setScanStep((s) => (s < SCAN_STEPS.length - 1 ? s + 1 : s)), 700); return () => clearInterval(iv); }, [phase]);
  const run = async () => {
    setError(""); setScanStep(0); setPhase("scanning");
    try { setResult(await interpretLens({ inputType: "text", text, contextKey: "social", journey: { home: journey.home, host: journey.host, city: journey.city, university: journey.university } })); setPhase("result"); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "YapLens is unavailable."); setPhase("error"); }
  };

  if (phase === "scanning") return <Scanning step={scanStep} mode={mode} />;
  if (phase === "result" && result) return <LensResult result={result} onReset={() => { setPhase("input"); setResult(null); }} lowConf={lowConf} />;
  if (phase === "error") return <div className="flex h-full flex-col justify-center px-5"><Notice tone="error" icon="⚠️" title="YapLens unavailable" body={error} /><div className="mt-4"><Button full onClick={() => setPhase("input")}>Try again</Button></div></div>;

  /* ------------------------------- Input state ------------------------------ */
  if (forced === "permission" && (mode === "camera" || mode === "voice"))
    return (
      <div className="flex h-full flex-col">
        <LensTopBar mode={mode} setMode={setMode} />
        <Scroll className="px-5 py-6">
          <Notice tone="warning" icon="🎥" title={`${mode === "camera" ? "Camera" : "Microphone"} access needed`} body={`Allow ${mode} access to use this input. In the prototype this is simulated — tap below to continue.`} />
          <div className="mt-4"><Button full onClick={() => setPhase("scanning")}>Continue (simulate)</Button></div>
        </Scroll>
      </div>
    );

  return (
    <div className="flex h-full flex-col">
      <LensTopBar mode={mode} setMode={setMode} />
      <Scroll className="px-5 pb-6 pt-3">
        <p className="mb-3 text-[13px] text-muted">
          Understand what someone <span className="font-semibold text-ink">really means</span> in {COUNTRIES[journey.host].name} — with local context.
        </p>

        {mode === "text" && (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste a message, sentence or phrase…"
            className="h-40 w-full resize-none rounded-[18px] border border-line bg-surface p-4 text-[15px] outline-none focus:border-primary"
          />
        )}

        {(mode === "screenshot" || mode === "camera") && (
          <button onClick={() => setPhase(mode === "camera" && forced === "permission" ? "input" : "scanning")} className="flex h-56 w-full flex-col items-center justify-center gap-3 rounded-[18px] border-2 border-dashed border-line bg-surface active:scale-[.99]">
            <span className="text-4xl">{mode === "camera" ? "📷" : "🖼"}</span>
            <span className="text-[14px] font-semibold text-ink">{mode === "camera" ? "Tap to capture" : "Upload a screenshot"}</span>
            <span className="text-[12px] text-muted">e.g. a teammate's group-chat message</span>
          </button>
        )}

        {mode === "voice" && (
          <div className="flex h-56 flex-col items-center justify-center gap-4 rounded-[18px] bg-surface">
            <button onClick={() => setPhase("scanning")} className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white active:scale-95">
              <div className="yy-ring absolute inset-0" /> 🎙
            </button>
            <span className="text-[13px] font-medium text-muted">Tap and speak — we'll transcribe & interpret</span>
          </div>
        )}

        {mode === "conversation" && (
          <div className="flex h-56 flex-col items-center justify-center gap-3 rounded-[18px] bg-surface text-center">
            <span className="text-4xl">💬</span>
            <p className="max-w-[240px] text-[13px] text-muted">Live two-person interpretation. Each speaker's turn is translated and explained in real time.</p>
            <Button variant="soft" onClick={() => setPhase("scanning")}>Start conversation</Button>
          </div>
        )}

        {mode === "text" && (
          <div className="mt-4">
            <Button size="lg" full disabled={!text.trim()} onClick={run}>Interpret</Button>
            <button className="mt-3 w-full text-[13px] font-medium text-primary" onClick={() => { setText(LENS_SAMPLES[journey.host].original); }}>Use sample</button>
          </div>
        )}
      </Scroll>
    </div>
  );
}

function LensTopBar({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div className="px-5 pt-2">
      <h1 className="mb-3 text-[22px] font-extrabold tracking-tight text-ink">YapLens</h1>
      <Segmented<Mode>
        value={mode}
        onChange={setMode}
        options={[
          { value: "text", label: "⌨️" },
          { value: "screenshot", label: "🖼" },
          { value: "camera", label: "📷" },
          { value: "voice", label: "🎙" },
          { value: "conversation", label: "💬" },
        ]}
      />
    </div>
  );
}

function Scanning({ step, mode }: { step: number; mode: Mode }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-8">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary-soft">
        <div className="yy-ring absolute inset-0" />
        <span className="yy-pulse text-4xl">{mode === "voice" ? "🎙" : mode === "conversation" ? "💬" : "🔍"}</span>
      </div>
      <div className="w-full max-w-[260px] space-y-2.5">
        {SCAN_STEPS.map((s, i) => (
          <div key={s} className={`flex items-center gap-2.5 text-[14px] transition ${i <= step ? "text-ink" : "text-muted/50"}`}>
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${i < step ? "bg-success text-white" : i === step ? "bg-primary text-white" : "bg-canvas"}`}>
              {i < step ? "✓" : i === step ? "•" : ""}
            </span>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function LensResult({ result, onReset, lowConf }: { result: GatewayLensResult; onReset: () => void; lowConf: boolean }) {
  const { journey, toggleSave, isSaved } = useJourney();
  const nav = useNav();
  const r = { scenario: "YapLens interpretation", detectedLanguage: result.detectedLanguage, original: "Your submitted message", literal: result.literalMeaning, intent: result.likelyIntents.map((x) => x.explanation).join(" "), contextual: result.contextExplanation, expected: result.expectedNextAction, risk: result.misunderstandingRisk === "high" ? 75 : result.misunderstandingRisk === "medium" ? 50 : 25, confidence: result.confidence.label === "high" ? 85 : result.confidence.label === "medium" ? 60 : 35, sources: result.sources.map((s) => ({ label: s.title, type: `Tier ${s.authorityLevel}` })), recommendedAction: result.recommendedAction, replies: result.suggestedReplies.map((x) => ({ tone: x.mode === "very_respectful" ? "Very Respectful" : x.mode[0].toUpperCase() + x.mode.slice(1) as ReplyTone, text: x.text })), draftWarning: undefined };
  const confidence = lowConf ? 38 : r.confidence;
  const [tone, setTone] = useState<ReplyTone>("Neutral");
  const [toast, setToast] = useState(false);
  const reply = r.replies.find((x) => x.tone === tone) ?? r.replies[0];
  const insightId = `insight-${journey.host}-${r.scenario}`;
  const saved = isSaved(insightId);

  return (
    <Scroll className="px-5 pb-6 pt-3">
      {toast && <Toast text="Saved to your insights" />}
      <button onClick={onReset} className="mb-3 text-[13px] font-semibold text-primary">← New scan</button>

      <Card className="mb-4 p-4">
        <div className="flex items-center justify-between">
          <Badge tone="muted">{r.scenario}</Badge>
          <span className="text-[11px] text-muted">{r.detectedLanguage}</span>
        </div>
        <p className="mt-2.5 rounded-[12px] bg-canvas px-3 py-2.5 text-[15px] font-medium text-ink">"{r.original}"</p>
      </Card>

      {lowConf && (
        <div className="mb-4"><Notice tone="warning" icon="🤔" title="Low confidence" body="I'm not certain about this interpretation — local usage varies. Consider asking a local student to confirm." /></div>
      )}

      <div className="space-y-3">
        <ResultRow label="Literal translation" body={r.literal} />
        <ResultRow label="Likely intention" body={r.intent} accent />
        <ResultRow label="Contextual interpretation" body={r.contextual} />
        <ResultRow label="What they may expect" body={r.expected} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <RiskBadge value={r.risk} />
        <ConfidenceBadge value={confidence} />
      </div>

      <Card className="mt-4 p-4">
        <p className="text-[12px] font-bold text-muted">EVIDENCE & SOURCES</p>
        <div className="mt-2 space-y-1.5">
          {r.sources.map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-[13px] text-ink"><Badge tone="primary">{s.type}</Badge> {s.label}</div>
          ))}
        </div>
      </Card>

      <Notice tone="primary" icon="🧭" title="Recommended action" body={r.recommendedAction} />

      {/* Reply builder */}
      <div className="mt-5">
        <p className="mb-2 text-[15px] font-bold text-ink">Your reply</p>
        <div className="mb-3 flex gap-2 overflow-x-auto scroll-area">
          {(["Casual", "Neutral", "Academic", "Very Respectful"] as ReplyTone[]).map((t) => (
            <button key={t} onClick={() => setTone(t)} className={`shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition ${tone === t ? "border-primary bg-primary text-white" : "border-line bg-surface text-muted"}`}>{t}</button>
          ))}
        </div>
        <Card className="p-4">
          <p className="text-[14px] leading-relaxed text-ink">{reply.text}</p>
        </Card>
      </div>

      <div className="mt-5 flex gap-2">
        <Button variant="soft" full onClick={() => { toggleSave({ id: insightId, kind: "insight", title: r.scenario, subtitle: `"${r.original}"`, icon: "✨" }); if (!saved) { setToast(true); setTimeout(() => setToast(false), 1600); } }}>{saved ? "Saved ✓" : "Save insight"}</Button>
        <Button variant="amber" full onClick={() => nav.push("sim", { fromLens: true })}>🎭 Practice this</Button>
      </div>
    </Scroll>
  );
}

function ResultRow({ label, body, accent }: { label: string; body: string; accent?: boolean }) {
  return (
    <div className={`rounded-[16px] border px-4 py-3 ${accent ? "border-primary/20 bg-primary-soft" : "border-line bg-surface"}`}>
      <p className={`text-[11px] font-bold uppercase tracking-wide ${accent ? "text-primary" : "text-muted"}`}>{label}</p>
      <p className="mt-1 text-[14px] leading-relaxed text-ink">{body}</p>
    </div>
  );
}
