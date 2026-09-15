import { useMemo, useState } from "react";
import { COUNTRY_LIST, COUNTRIES, type CountryCode } from "../data/countries";
import { ASSESSMENT, deriveMyDna } from "../data/assessment";
import { DNA_DIMENSIONS } from "../data/dna";
import { computePairDNA } from "../data/pairDNA";
import { Button, Card, Chip, DnaBar, CultureGapMeter, ProgressRing, Notice } from "../components/ui";
import { Icon } from "../components/icons";

type Step =
  | "welcome"
  | "signin"
  | "home"
  | "host"
  | "place"
  | "dates"
  | "languages"
  | "goals"
  | "interests"
  | "assess"
  | "mydna"
  | "gap"
  | "generate";

const GOALS = ["Speak with confidence", "Understand the culture", "Do well academically", "Make local friends", "Settle in smoothly"];
const INTERESTS = ["AI", "Coffee", "Football", "Photography", "K-pop", "Startups", "Film", "Fashion", "Food", "Travel", "Gaming", "Music"];
const LANG_LEVELS = ["A1", "A2", "B1", "B2", "C1", "Native"];

export default function Onboarding({ onComplete }: { onComplete: (data: { home: CountryCode; host: CountryCode; city: string; university: string; myDna: ReturnType<typeof deriveMyDna> }) => void }) {
  const [step, setStep] = useState<Step>("welcome");
  const [home, setHome] = useState<CountryCode | null>(null);
  const [host, setHost] = useState<CountryCode | null>(null);
  const [city, setCity] = useState("");
  const [university, setUniversity] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [langLevel, setLangLevel] = useState("B1");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [qIdx, setQIdx] = useState(0);

  const myDna = useMemo(() => deriveMyDna(answers), [answers]);
  const pair = useMemo(() => (home && host ? computePairDNA(home, host, myDna) : null), [home, host, myDna]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  function finish() {
    if (home && host) onComplete({ home, host, city: city || COUNTRIES[host].name, university: university || "Host University", myDna });
  }

  /* --------------------------------- Welcome -------------------------------- */
  if (step === "welcome")
    return (
      <div className="flex h-full flex-col bg-primary px-7 pb-9 pt-16 text-white">
        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[12px] font-semibold">
            🌏 11 ASEAN countries · 110 journeys
          </div>
          <h1 className="text-[34px] font-extrabold leading-[1.1] tracking-tight">
            Understand the culture.<br />Speak with confidence.<br /><span className="text-amber">Live like a local.</span>
          </h1>
          <p className="mt-4 max-w-[300px] text-[15px] leading-relaxed text-white/80">
            YapYep helps exchange students adapt to any ASEAN country — personalized to who you are and where you're going.
          </p>
        </div>
        <div className="space-y-3">
          <Button variant="amber" size="lg" full onClick={() => setStep("signin")}>Get started</Button>
          <button className="w-full text-[14px] font-medium text-white/80" onClick={() => setStep("signin")}>I already have an account</button>
        </div>
      </div>
    );

  /* --------------------------------- Sign in -------------------------------- */
  if (step === "signin")
    return (
      <OnbFrame title="Sign in" onBack={() => setStep("welcome")} progress={5}>
        <div className="space-y-3">
          <Button variant="outline" size="lg" full onClick={() => setStep("home")}>
            <span>🎓</span> Continue with your university
          </Button>
          <Button variant="outline" size="lg" full onClick={() => setStep("home")}>
            <span>✉️</span> Continue with email
          </Button>
          <Button variant="outline" size="lg" full onClick={() => setStep("home")}>
            <span>🔵</span> Continue with Google
          </Button>
        </div>
        <p className="mt-5 text-center text-[12px] leading-relaxed text-muted">
          Your answers shape your experience. We never assume your culture from your nationality.
        </p>
      </OnbFrame>
    );

  /* -------------------------- ASEAN Compass: home --------------------------- */
  if (step === "home")
    return (
      <OnbFrame title="Where are you from?" subtitle="Your home country" onBack={() => setStep("signin")} progress={15}>
        <CountryGrid selected={home} onSelect={setHome} />
        <StickyNext disabled={!home} onNext={() => setStep("host")} />
      </OnbFrame>
    );

  /* -------------------------- ASEAN Compass: host --------------------------- */
  if (step === "host")
    return (
      <OnbFrame title="Where are you going?" subtitle="Your host country" onBack={() => setStep("home")} progress={22}>
        {home && (
          <div className="mb-4 flex items-center justify-center gap-2 rounded-[16px] bg-primary-soft py-3 text-[14px] font-semibold text-primary">
            {COUNTRIES[home].flag} {COUNTRIES[home].name} <span className="text-muted">→</span> {host ? `${COUNTRIES[host].flag} ${COUNTRIES[host].name}` : "…"}
          </div>
        )}
        <CountryGrid selected={host} onSelect={setHost} disabled={home ?? undefined} />
        <StickyNext disabled={!host} onNext={() => setStep("place")} />
      </OnbFrame>
    );

  /* ------------------------------ City / uni -------------------------------- */
  if (step === "place")
    return (
      <OnbFrame title="Your host university" subtitle={host ? `In ${COUNTRIES[host].name}` : ""} onBack={() => setStep("host")} progress={30}>
        <label className="mb-1 block text-[13px] font-medium text-muted">City</label>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Singapore" className="mb-4 w-full rounded-[14px] border border-line bg-surface px-4 py-3 text-[15px] outline-none focus:border-primary" />
        <label className="mb-1 block text-[13px] font-medium text-muted">University</label>
        <input value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="e.g. National University of Singapore" className="w-full rounded-[14px] border border-line bg-surface px-4 py-3 text-[15px] outline-none focus:border-primary" />
        <StickyNext onNext={() => setStep("dates")} />
      </OnbFrame>
    );

  /* -------------------------------- Dates ----------------------------------- */
  if (step === "dates")
    return (
      <OnbFrame title="Your exchange period" onBack={() => setStep("place")} progress={38}>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4"><p className="text-[12px] text-muted">Arrival</p><p className="mt-1 text-[15px] font-bold text-ink">Aug 2026</p></Card>
          <Card className="p-4"><p className="text-[12px] text-muted">Departure</p><p className="mt-1 text-[15px] font-bold text-ink">Dec 2026</p></Card>
        </div>
        <Card className="mt-3 p-4">
          <p className="text-[13px] font-semibold text-ink">One semester · ~130 days</p>
          <p className="mt-1 text-[12px] text-muted">We'll phase your journey: Before Arrival → First Week → Settled.</p>
        </Card>
        <StickyNext onNext={() => setStep("languages")} />
      </OnbFrame>
    );

  /* ------------------------------ Languages --------------------------------- */
  if (step === "languages")
    return (
      <OnbFrame title="Your languages" subtitle="How's your host-language & English?" onBack={() => setStep("dates")} progress={46}>
        <p className="mb-2 text-[13px] font-medium text-ink">English level</p>
        <div className="flex flex-wrap gap-2">
          {LANG_LEVELS.map((l) => (
            <Chip key={l} tone="primary" active={langLevel === l} onClick={() => setLangLevel(l)}>{l}</Chip>
          ))}
        </div>
        {host && (
          <Notice tone="primary" icon="🗣" title={`${COUNTRIES[host].languages[0]} basics`} body={`You'll pick up survival ${COUNTRIES[host].languages[0]} through daily situations and practice.`} />
        )}
        <StickyNext onNext={() => setStep("goals")} />
      </OnbFrame>
    );

  /* -------------------------------- Goals ----------------------------------- */
  if (step === "goals")
    return (
      <OnbFrame title="What matters most?" subtitle="Pick your goals & concerns" onBack={() => setStep("languages")} progress={54}>
        <div className="flex flex-wrap gap-2">
          {GOALS.map((g) => (
            <Chip key={g} tone="primary" active={goals.includes(g)} onClick={() => toggle(goals, setGoals, g)}>{g}</Chip>
          ))}
        </div>
        <StickyNext disabled={goals.length === 0} onNext={() => setStep("interests")} />
      </OnbFrame>
    );

  /* ------------------------------ Interests --------------------------------- */
  if (step === "interests")
    return (
      <OnbFrame title="Your interests" subtitle="Helps us connect you with the right people" onBack={() => setStep("goals")} progress={62}>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((g) => (
            <Chip key={g} tone="amber" active={interests.includes(g)} onClick={() => toggle(interests, setInterests, g)}>{g}</Chip>
          ))}
        </div>
        <StickyNext disabled={interests.length === 0} onNext={() => setStep("assess")} />
      </OnbFrame>
    );

  /* ---------------------------- MyDNA assessment ---------------------------- */
  if (step === "assess") {
    const q = ASSESSMENT[qIdx];
    return (
      <OnbFrame title="Communication style" subtitle={`${qIdx + 1} of ${ASSESSMENT.length}`} onBack={() => (qIdx === 0 ? setStep("interests") : setQIdx(qIdx - 1))} progress={62 + (qIdx / ASSESSMENT.length) * 20}>
        <div className="mb-2 rounded-full bg-amber-soft px-3 py-1 text-[11px] font-semibold text-ink w-fit">Derived from your answers, not your nationality</div>
        <h2 className="mb-5 mt-2 text-[19px] font-bold leading-snug text-ink">{q.prompt}</h2>
        <div className="space-y-2.5">
          {q.options.map((o, i) => {
            const sel = answers[q.id] === i;
            return (
              <button
                key={i}
                onClick={() => {
                  setAnswers((a) => ({ ...a, [q.id]: i }));
                  setTimeout(() => {
                    if (qIdx < ASSESSMENT.length - 1) setQIdx(qIdx + 1);
                    else setStep("mydna");
                  }, 180);
                }}
                className={`flex w-full items-center gap-3 rounded-[16px] border px-4 py-3.5 text-left text-[14px] font-medium transition active:scale-[.99] ${sel ? "border-primary bg-primary-soft text-primary" : "border-line bg-surface text-ink"}`}
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${sel ? "border-primary bg-primary text-white" : "border-line"}`}>
                  {sel && <Icon name="check" size={13} />}
                </span>
                {o.label}
              </button>
            );
          })}
        </div>
      </OnbFrame>
    );
  }

  /* ------------------------------- MyDNA result ----------------------------- */
  if (step === "mydna")
    return (
      <OnbFrame title="Your MyDNA" subtitle="How you tend to communicate" onBack={() => setStep("assess")} progress={84}>
        <div className="space-y-3.5">
          {DNA_DIMENSIONS.map((d) => (
            <DnaBar key={d.key} label={d.label} value={myDna[d.key]} />
          ))}
        </div>
        <StickyNext label="See your adaptation map" onNext={() => setStep("gap")} />
      </OnbFrame>
    );

  /* ------------------------------- PairDNA gap ------------------------------ */
  if (step === "gap" && pair && home && host)
    return (
      <OnbFrame title="Your adaptation map" subtitle={`${COUNTRIES[home].flag} ${COUNTRIES[home].name} → ${COUNTRIES[host].flag} ${COUNTRIES[host].name}`} onBack={() => setStep("mydna")} progress={92}>
        <Card className="mb-4 flex items-center gap-4 p-4">
          <ProgressRing value={pair.readiness} size={64} />
          <div>
            <p className="text-[13px] font-semibold text-ink">Readiness</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-muted">Based on the gap between your MyDNA and typical {COUNTRIES[host].name} student contexts.</p>
          </div>
        </Card>
        <div className="mb-4 flex items-center justify-between text-[11px] font-semibold text-muted">
          <span>● You</span><span>○ {COUNTRIES[host].name} context</span>
        </div>
        <div className="space-y-4">
          {pair.meters.slice(0, 6).map((m) => (
            <CultureGapMeter key={m.key} label={m.label} you={m.you} host={m.host} verdict={m.verdict} tone={m.tone} />
          ))}
        </div>
        <Card className="mt-4 p-4">
          <p className="text-[13px] font-bold text-ink">3 situations that may feel unfamiliar</p>
          <ul className="mt-2 space-y-1.5">
            {pair.unfamiliarSituations.map((s) => (
              <li key={s} className="flex items-start gap-2 text-[13px] text-muted"><span className="text-amber">◆</span> {s}</li>
            ))}
          </ul>
          <p className="mt-3 text-[12px] italic leading-relaxed text-muted">
            These are contextual tendencies you may meet — not stereotypes about everyone in {COUNTRIES[host].name}.
          </p>
        </Card>
        <StickyNext label="Generate my Passport" onNext={() => setStep("generate")} />
      </OnbFrame>
    );

  /* ------------------------------- Generate --------------------------------- */
  return (
    <div className="flex h-full flex-col items-center justify-center bg-primary px-8 text-center text-white">
      <div className="relative mb-6">
        <div className="relative h-24 w-24">
          <div className="yy-ring absolute inset-0" />
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/15 text-4xl">📘</div>
        </div>
      </div>
      <h2 className="text-[24px] font-extrabold tracking-tight">Your {host ? COUNTRIES[host].name : ""} Passport is ready</h2>
      <p className="mt-2 max-w-[280px] text-[14px] leading-relaxed text-white/80">
        Personalized to your MyDNA, your journey and your city. Everything adapts around you.
      </p>
      <div className="mt-8 w-full">
        <Button variant="amber" size="lg" full onClick={finish}>Enter YapYep</Button>
      </div>
    </div>
  );
}

/* ------------------------------ Sub-components ------------------------------ */

function OnbFrame({ title, subtitle, children, onBack, progress }: { title: string; subtitle?: string; children: React.ReactNode; onBack: () => void; progress: number }) {
  return (
    <div className="flex h-full flex-col bg-canvas">
      <div className="px-5 pt-4">
        <div className="mb-4 flex items-center gap-3">
          <button onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card active:scale-90"><Icon name="back" size={20} /></button>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <h1 className="text-[24px] font-extrabold tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-0.5 text-[14px] text-muted">{subtitle}</p>}
      </div>
      <div className="scroll-area flex-1 overflow-y-auto px-5 py-5">{children}</div>
    </div>
  );
}

function CountryGrid({ selected, onSelect, disabled }: { selected: CountryCode | null; onSelect: (c: CountryCode) => void; disabled?: CountryCode }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {COUNTRY_LIST.map((c) => {
        const isDisabled = disabled === c.code;
        const sel = selected === c.code;
        return (
          <button
            key={c.code}
            disabled={isDisabled}
            onClick={() => onSelect(c.code)}
            className={`flex items-center gap-2.5 rounded-[16px] border px-3 py-3 text-left transition active:scale-[.98] disabled:opacity-30 ${sel ? "border-primary bg-primary-soft" : "border-line bg-surface"}`}
          >
            <span className="text-[22px]">{c.flag}</span>
            <span className={`text-[13px] font-semibold leading-tight ${sel ? "text-primary" : "text-ink"}`}>{c.name}</span>
          </button>
        );
      })}
    </div>
  );
}

function StickyNext({ onNext, disabled, label = "Continue" }: { onNext: () => void; disabled?: boolean; label?: string }) {
  return (
    <div className="pt-6">
      <Button size="lg" full disabled={disabled} onClick={onNext}>{label}</Button>
    </div>
  );
}
