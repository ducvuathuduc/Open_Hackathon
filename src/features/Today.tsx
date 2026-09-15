import { useJourney } from "../context/JourneyContext";
import { useNav } from "../context/NavContext";
import { Scroll } from "../components/shell";
import { Card, ProgressRing, Button, Badge, SectionHeader, OfflineBanner, Skeleton, ErrorState, EmptyState, Notice } from "../components/ui";
import { COUNTRIES } from "../data/countries";

export default function Today() {
  const { journey, pair, forced, savedTasks, toggleTask } = useJourney();
  const nav = useNav();
  const host = COUNTRIES[journey.host];

  if (forced === "loading")
    return (
      <Scroll className="px-5 py-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="mt-4 h-40 w-full" />
        <Skeleton className="mt-4 h-24 w-full" />
      </Scroll>
    );
  if (forced === "error") return <Scroll className="px-5"><ErrorState /></Scroll>;

  const bankDone = savedTasks[journey.primaryTask.id];

  return (
    <Scroll className="px-5 pb-6 pt-1">
      {forced === "offline" && <div className="mb-4"><OfflineBanner /></div>}
      {forced === "stale" && <div className="mb-4"><Notice tone="warning" icon="🕓" title="Working from saved data" body="Some cards may be out of date until we can refresh from official sources." /></div>}

      {/* Greeting */}
      <div className="mb-4">
        <p className="text-[14px] text-muted">Good morning,</p>
        <h1 className="text-[26px] font-extrabold tracking-tight text-ink">{journey.name} 👋</h1>
        <div className="mt-1.5 flex items-center gap-2 text-[13px] font-medium text-muted">
          <span>{COUNTRIES[journey.home].flag} → {host.flag} {host.name}</span>
          <span className="text-line">·</span>
          <span>Day {journey.dayCount} of {journey.totalDays}</span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-5 grid grid-cols-4 gap-2">
        {[
          { icon: "🔍", label: "Scan", onClick: () => nav.setTab("lens") },
          { icon: "💬", label: "Ask", onClick: () => nav.push("study") },
          { icon: "👥", label: "Message", onClick: () => nav.setTab("connect") },
          { icon: "🎭", label: "Practice", onClick: () => nav.push("sim") },
        ].map((a) => (
          <button key={a.label} onClick={a.onClick} className="flex flex-col items-center gap-1.5 rounded-[16px] bg-surface py-3 shadow-card active:scale-95">
            <span className="text-[22px]">{a.icon}</span>
            <span className="text-[11px] font-semibold text-ink">{a.label}</span>
          </button>
        ))}
      </div>

      {/* Primary task */}
      <SectionHeader title="Your focus today" />
      <Card className="mb-4 overflow-hidden">
        <div className="flex items-start gap-3 p-4">
          <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-primary-soft text-[20px]">🏦</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Badge tone="primary">{journey.primaryTask.phase}</Badge>
              {bankDone && <Badge tone="success">Done ✓</Badge>}
            </div>
            <h3 className="mt-1.5 text-[16px] font-bold text-ink">{journey.primaryTask.title}</h3>
            <p className="mt-0.5 text-[13px] text-muted">{journey.primaryTask.meta}</p>
          </div>
        </div>
        <div className="flex gap-2 border-t border-line px-4 py-3">
          <Button size="sm" variant="soft" onClick={() => nav.push("passportSection", { sectionId: "money" })}>Open guide</Button>
          <Button size="sm" variant={bankDone ? "outline" : "primary"} onClick={() => toggleTask(journey.primaryTask.id)}>
            {bankDone ? "Mark undone" : "Mark done"}
          </Button>
        </div>
      </Card>

      {/* Practice mission */}
      <SectionHeader title="Today's practice" action="All" onAction={() => nav.push("sim")} />
      <Card className="mb-4 bg-gradient-to-br from-[#3157D5] to-[#2544ad] p-4 text-white" onClick={() => nav.push("sim")}>
        <div className="flex items-center gap-2 text-[12px] font-semibold text-white/80">🎭 AI roleplay · 3 min</div>
        <h3 className="mt-1.5 text-[16px] font-bold leading-snug">{journey.practiceMission.title}</h3>
        <p className="mt-1 text-[12px] leading-relaxed text-white/80">{journey.practiceMission.reason}</p>
        <div className="mt-3"><span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-semibold">Start practice →</span></div>
      </Card>

      {/* Adaptation snapshot */}
      <SectionHeader title="Your adaptation map" action="Details" onAction={() => nav.push("profile")} />
      <Card className="mb-4 flex items-center gap-4 p-4" onClick={() => nav.push("profile")}>
        <ProgressRing value={pair.readiness} size={58} />
        <div className="flex-1">
          <p className="text-[13px] font-bold text-ink">{pair.readiness}% ready</p>
          <p className="mt-0.5 text-[12px] text-muted">Biggest gap: <span className="font-semibold text-ink">{pair.biggestGaps[0].label}</span></p>
          <p className="text-[12px] text-muted">Strongest transfer: <span className="font-semibold text-success">{pair.strongestTransfer.label}</span></p>
        </div>
      </Card>

      {/* Reminder + culture tip */}
      <SectionHeader title="Coming up" />
      <Card className="mb-3 flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-amber-soft text-[18px]">📅</div>
        <div className="flex-1">
          <p className="text-[14px] font-semibold text-ink">{journey.reminder.title}</p>
          <p className="text-[12px] text-muted">{journey.reminder.when}</p>
        </div>
      </Card>

      <Notice tone="primary" icon="💡" title={journey.cultureTip.title} body={journey.cultureTip.body} />

      {forced === "empty" && (
        <div className="mt-4"><EmptyState icon="✅" title="All caught up!" body="No tasks left for today. Explore your Passport or connect with a local." /></div>
      )}
    </Scroll>
  );
}
