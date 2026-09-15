import { useEffect, useState } from "react";
import { useJourney } from "../context/JourneyContext";
import { ScreenHeader, Scroll } from "../components/shell";
import { Card, Button, Avatar, Badge, ScoreBarRow, Notice } from "../components/ui";
import { SIM_SCENARIOS } from "../data/sim";

type Phase = "setup" | "convo" | "feedback";

export default function YapSim({ onBack, fromLens }: { onBack: () => void; fromLens?: boolean }) {
  const { journey } = useJourney();
  const scenario = SIM_SCENARIOS[journey.host];
  const [phase, setPhase] = useState<Phase>("setup");
  const [turn, setTurn] = useState(0);
  const [retried, setRetried] = useState(false);

  useEffect(() => {
    if (phase !== "convo") return;
    setTurn(0);
    const iv = setInterval(() => setTurn((t) => (t < scenario.transcript.length ? t + 1 : t)), 900);
    const done = setTimeout(() => setPhase("feedback"), scenario.transcript.length * 900 + 700);
    return () => { clearInterval(iv); clearTimeout(done); };
  }, [phase, scenario]);

  /* --------------------------------- Setup ---------------------------------- */
  if (phase === "setup")
    return (
      <div className="flex h-full flex-col bg-canvas">
        <ScreenHeader title="YapSim · Practice" onBack={onBack} />
        <Scroll className="px-5 py-4">
          {fromLens && <div className="mb-4"><Notice tone="primary" icon="🔗" title="From your Lens result" body="We turned the situation you just scanned into a live practice scenario." /></div>}
          <Badge tone="amber">AI roleplay · voice</Badge>
          <h1 className="mt-2 text-[22px] font-extrabold tracking-tight text-ink">{scenario.title}</h1>
          <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{scenario.context}</p>

          <Card className="mt-5 p-4">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-wide text-muted">You'll speak with</p>
            <div className="flex items-center gap-3">
              <Avatar initials={scenario.persona.initials} color={scenario.persona.color} size={52} />
              <div>
                <p className="text-[16px] font-bold text-ink">{scenario.persona.name}, {scenario.persona.age}</p>
                <p className="text-[13px] text-muted">{scenario.persona.role}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {scenario.persona.traits.map((t) => <Badge key={t} tone="muted">{t}</Badge>)}
            </div>
          </Card>

          <div className="mt-6"><Button size="lg" full onClick={() => setPhase("convo")}>Start roleplay</Button></div>
        </Scroll>
      </div>
    );

  /* -------------------------------- Convo ----------------------------------- */
  if (phase === "convo")
    return (
      <div className="flex h-full flex-col bg-canvas">
        <ScreenHeader title={scenario.persona.name} onBack={onBack} right={<Badge tone="error">● Live</Badge>} />
        <Scroll className="px-5 py-4">
          <div className="space-y-3">
            {scenario.transcript.slice(0, turn).map((line, i) => (
              <div key={i} className={`yy-fade flex ${line.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[80%]">
                  <div className={`rounded-[18px] px-3.5 py-2.5 text-[14px] leading-relaxed ${line.from === "user" ? "bg-primary text-white" : "bg-surface text-ink shadow-card"}`}>
                    {line.text}
                  </div>
                  {line.note && <p className="mt-1 px-1 text-[11px] italic text-muted">{line.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </Scroll>
        <div className="flex items-center justify-center gap-4 border-t border-line bg-surface px-5 py-5">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl text-white">
            <div className="yy-ring absolute inset-0" />🎙
          </div>
          <p className="text-[13px] font-medium text-muted">Listening… speak naturally</p>
        </div>
      </div>
    );

  /* ------------------------------- Feedback --------------------------------- */
  const avgBefore = Math.round(scenario.scores.reduce((s, d) => s + d.before, 0) / scenario.scores.length);
  const avgAfter = Math.round(scenario.scores.reduce((s, d) => s + d.after, 0) / scenario.scores.length);
  return (
    <div className="flex h-full flex-col bg-canvas">
      <ScreenHeader title="Your feedback" onBack={onBack} />
      <Scroll className="px-5 py-4">
        <Card className="mb-4 flex items-center justify-between p-4">
          <div>
            <p className="text-[13px] text-muted">Overall {retried ? "after retry" : "score"}</p>
            <p className="text-[30px] font-extrabold text-ink">{retried ? avgAfter : avgBefore}</p>
          </div>
          {retried && (
            <div className="text-right">
              <p className="text-[12px] text-muted">Improvement</p>
              <p className="text-[18px] font-extrabold text-success">{avgBefore} → {avgAfter}</p>
            </div>
          )}
        </Card>

        <p className="mb-2 text-[13px] font-bold text-ink">Score dimensions</p>
        <Card className="mb-4 space-y-3 p-4">
          {scenario.scores.map((d) => (
            <ScoreBarRow key={d.key} label={d.label} value={retried ? d.after : d.before} delta={retried ? d.after - d.before : undefined} />
          ))}
        </Card>

        <p className="mb-2 text-[13px] font-bold text-ink">Actionable feedback</p>
        <Card className="mb-4 space-y-2.5 p-4">
          {scenario.feedback.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-ink"><span className="text-amber">{i + 1}.</span> {f}</div>
          ))}
        </Card>

        <Notice tone="primary" icon="🎯" title="Recommendation" body={scenario.recommendation} />

        <div className="mt-6 flex gap-2">
          {!retried ? (
            <Button size="lg" full onClick={() => { setRetried(true); setPhase("feedback"); }}>Retry & improve</Button>
          ) : (
            <Button size="lg" variant="soft" full onClick={onBack}>Save to skills & finish</Button>
          )}
        </div>
      </Scroll>
    </div>
  );
}
