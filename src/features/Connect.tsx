import { useMemo, useState } from "react";
import { useJourney } from "../context/JourneyContext";
import { useNav } from "../context/NavContext";
import { Scroll, ScreenHeader } from "../components/shell";
import { Card, Button, Badge, Chip, Avatar, EmptyState, Notice, Segmented, BottomSheet } from "../components/ui";
import { Icon } from "../components/icons";
import { peopleFor, ASK_A_LOCAL_SAMPLE, type Person, type ConnectRole } from "../data/people";
import { circlesFor, CIRCLE_FILTERS } from "../data/circles";
import { COUNTRIES } from "../data/countries";

const ROLE_TABS: { key: ConnectRole | "All"; label: string }[] = [
  { key: "All", label: "All" },
  { key: "Local", label: "Local" },
  { key: "Current Exchange", label: "Exchange" },
  { key: "Incoming", label: "Incoming" },
  { key: "Returned", label: "Returned" },
];

export function ConnectHome() {
  const { journey, forced } = useJourney();
  const nav = useNav();
  const [role, setRole] = useState<ConnectRole | "All">("All");
  const [tab, setTab] = useState<"people" | "circles">("people");
  const people = useMemo(() => peopleFor(journey.host, journey.home), [journey.host, journey.home]);
  const filtered = role === "All" ? people : people.filter((p) => p.role === role);

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pt-2">
        <h1 className="mb-3 text-[22px] font-extrabold tracking-tight text-ink">Connect</h1>
        <Segmented value={tab} onChange={setTab} options={[{ value: "people" as const, label: "People" }, { value: "circles" as const, label: "Country Circles" }]} />
      </div>

      {tab === "people" ? (
        <>
          <div className="mt-3 flex gap-2 overflow-x-auto scroll-area px-5 pb-2">
            {ROLE_TABS.map((r) => (
              <Chip key={r.key} tone="primary" active={role === r.key} onClick={() => setRole(r.key)}>{r.label}</Chip>
            ))}
          </div>
          <Scroll className="px-5 pb-6">
            <p className="mb-3 text-[12px] text-muted">Matched on city, university, major, interests, languages & cross-country experience.</p>
            {forced === "empty" || filtered.length === 0 ? (
              <EmptyState icon="🔎" title="No matches yet" body="Try a different filter or widen your interests." />
            ) : (
              <div className="space-y-3">
                {filtered.map((p) => <StudentCard key={p.id} person={p} onOpen={() => nav.push("matchProfile", { person: p })} />)}
              </div>
            )}
          </Scroll>
        </>
      ) : (
        <Circles />
      )}
    </div>
  );
}

function StudentCard({ person, onOpen }: { person: Person; onOpen: () => void }) {
  return (
    <Card className="p-4" onClick={onOpen}>
      <div className="flex items-start gap-3">
        <Avatar initials={person.initials} color={person.color} size={48} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-bold text-ink">{person.name} {person.flag}</h3>
            {person.verified && <Badge tone="success">✓ Local helper</Badge>}
          </div>
          <p className="text-[12px] text-muted">{person.university} · {person.major}</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {person.interests.slice(0, 3).map((i) => <Badge key={i} tone="muted">{i}</Badge>)}
          </div>
        </div>
        <div className="text-right">
          <p className="text-[16px] font-extrabold text-primary">{person.matchScore}%</p>
          <p className="text-[10px] font-semibold text-muted">match</p>
        </div>
      </div>
    </Card>
  );
}

export function MatchProfile({ person, onBack }: { person: Person; onBack: () => void }) {
  const nav = useNav();
  return (
    <div className="flex h-full flex-col bg-canvas">
      <ScreenHeader title={person.name} onBack={onBack} />
      <Scroll className="px-5 py-4">
        <div className="flex flex-col items-center text-center">
          <Avatar initials={person.initials} color={person.color} size={72} />
          <h2 className="mt-3 text-[20px] font-bold text-ink">{person.name}, {person.age} {person.flag}</h2>
          <p className="text-[13px] text-muted">{person.university} · {person.major}</p>
          <div className="mt-2 flex items-center gap-2">
            <Badge tone="primary">{person.role}</Badge>
            {person.verified && <Badge tone="success">✓ Verified · replies {person.repliesIn}</Badge>}
          </div>
        </div>

        <Card className="mt-5 p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[13px] font-bold text-ink">Why YapYep matched you</p>
            <span className="text-[16px] font-extrabold text-primary">{person.matchScore}%</span>
          </div>
          <div className="space-y-1.5">
            {person.matchReasons.map((r) => (
              <div key={r} className="flex items-start gap-2 text-[13px] text-ink"><span className="text-success">✓</span> {r}</div>
            ))}
          </div>
        </Card>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {person.interests.map((i) => <Badge key={i} tone="amber">{i}</Badge>)}
          {person.languages.map((l) => <Badge key={l} tone="muted">🗣 {l}</Badge>)}
        </div>

        <div className="mt-6 flex gap-2">
          <Button variant="primary" full onClick={() => nav.push("chat", { person })}>Say hi</Button>
          <Button variant="outline" full onClick={() => nav.push("chat", { person })}>Ask about here</Button>
        </div>
      </Scroll>
    </div>
  );
}

export function Chat({ person, onBack }: { person: Person; onBack: () => void }) {
  const [messages, setMessages] = useState<{ from: "me" | "them"; text: string; translated?: string }[]>([]);
  const [showIce, setShowIce] = useState(true);
  const [reported, setReported] = useState(false);
  const [sheet, setSheet] = useState(false);

  function send(text: string) {
    setMessages((m) => [...m, { from: "me", text }]);
    setShowIce(false);
    setTimeout(() => setMessages((m) => [...m, { from: "them", text: person.icebreakers.length ? "Hey! Great to hear from you 😊 happy to help — what would you like to know?" : "Hi!", translated: "Auto-translated from local language" }]), 900);
  }

  return (
    <div className="flex h-full flex-col bg-canvas">
      <ScreenHeader title={`${person.name} ${person.flag}`} onBack={onBack} right={<button onClick={() => setSheet(true)} className="text-[20px]">⋯</button>} />
      {reported ? (
        <div className="flex flex-1 items-center justify-center px-8"><EmptyState icon="🛡" title="User blocked & reported" body="You won't see messages from this person. Our team will review the report." /></div>
      ) : (
        <>
          <Scroll className="px-5 py-4">
            <Notice tone="primary" icon="🌐" title="Auto-translation on" body="Messages are translated between your languages when needed." />
            <div className="mt-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[78%]">
                    <div className={`rounded-[18px] px-3.5 py-2.5 text-[14px] leading-relaxed ${m.from === "me" ? "bg-primary text-white" : "bg-surface text-ink shadow-card"}`}>{m.text}</div>
                    {m.translated && <p className="mt-1 px-1 text-[11px] italic text-muted">🌐 {m.translated}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Scroll>

          {showIce && (
            <div className="border-t border-line bg-surface px-5 py-3">
              <p className="mb-2 text-[12px] font-semibold text-primary">✨ AI icebreakers</p>
              <div className="space-y-2">
                {person.icebreakers.map((ib) => (
                  <button key={ib} onClick={() => send(ib)} className="w-full rounded-[14px] bg-canvas px-3.5 py-2.5 text-left text-[13px] text-ink active:scale-[.99]">{ib}</button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 border-t border-line bg-surface px-4 py-3">
            <div className="flex-1 rounded-full bg-canvas px-4 py-2.5 text-[14px] text-muted">Message…</div>
            <button onClick={() => send("Hi! 👋")} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white active:scale-95"><Icon name="chevron" size={20} /></button>
          </div>
        </>
      )}

      <BottomSheet open={sheet} onClose={() => setSheet(false)} title="Options">
        <div className="space-y-2">
          <Button variant="outline" full onClick={() => setSheet(false)}>Translate whole chat</Button>
          <Button variant="outline" full onClick={() => setSheet(false)}>Verify as local helper</Button>
          <Button variant="danger" full onClick={() => { setReported(true); setSheet(false); }}>Block & report</Button>
        </div>
      </BottomSheet>
    </div>
  );
}

export function AskALocal({ onBack }: { onBack: () => void }) {
  const [asked, setAsked] = useState(false);
  const s = ASK_A_LOCAL_SAMPLE;
  return (
    <div className="flex h-full flex-col bg-canvas">
      <ScreenHeader title="Ask a Local" onBack={onBack} />
      <Scroll className="px-5 py-4">
        <Card className="p-4">
          <p className="text-[12px] font-bold uppercase tracking-wide text-muted">Your question</p>
          <p className="mt-1.5 text-[14px] text-ink">Which bank is easiest for exchange students to open an account with?</p>
        </Card>
        <div className="mt-4"><Notice tone="warning" icon="🤔" title="AI confidence: Medium" body="This can depend heavily on the university and individual branch. A local student can confirm." /></div>

        {!asked ? (
          <div className="mt-4"><Button size="lg" full onClick={() => setAsked(true)}>Ask a local student</Button></div>
        ) : (
          <>
            <Card className="mt-4 p-4">
              <div className="flex items-center gap-2">
                <span className="text-[18px]">{s.flag}</span>
                <p className="text-[14px] font-bold text-ink">{s.from}</p>
                <Badge tone="success">✓ Verified local</Badge>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-ink">{s.text}</p>
            </Card>
            <div className="mt-3"><Notice tone="primary" icon="✅" title={`Verified by ${s.verifiedBy} local students`} body={`${s.extraContext} added extra context. This is building the ASEAN Student Knowledge Graph.`} /></div>
          </>
        )}
      </Scroll>
    </div>
  );
}

function Circles() {
  const { journey } = useJourney();
  const nav = useNav();
  const groups = circlesFor(journey.host, journey.home);
  const [filters, setFilters] = useState<string[]>([]);
  return (
    <Scroll className="px-5 pb-6 pt-3">
      <p className="mb-3 text-[13px] text-muted">{COUNTRIES[journey.host].flag} {COUNTRIES[journey.host].name} Circle — find your people.</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {CIRCLE_FILTERS.map((f) => (
          <Chip key={f} active={filters.includes(f)} onClick={() => setFilters((x) => x.includes(f) ? x.filter((y) => y !== f) : [...x, f])}>{f}</Chip>
        ))}
      </div>
      <div className="space-y-3">
        {groups.map((g) => (
          <Card key={g.label} className="flex items-center gap-3 p-4" onClick={() => nav.setTab("connect")}>
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-primary-soft text-[16px]">👥</div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-ink">{g.label}</p>
              <p className="text-[12px] text-muted">{g.count.toLocaleString()} members{g.online ? ` · ${g.online} online` : ""}</p>
            </div>
            <Icon name="chevron" size={18} />
          </Card>
        ))}
      </div>
    </Scroll>
  );
}
