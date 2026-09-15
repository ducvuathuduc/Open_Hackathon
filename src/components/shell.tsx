import type { ReactNode } from "react";
import { Icon, type IconName } from "./icons";
import { Avatar } from "./ui";
import { useJourney } from "../context/JourneyContext";
import { COUNTRIES } from "../data/countries";

export type TabKey = "today" | "passport" | "lens" | "explore" | "connect";

const TABS: { key: TabKey; icon: IconName; label: string }[] = [
  { key: "today", icon: "today", label: "Today" },
  { key: "passport", icon: "passport", label: "Passport" },
  { key: "lens", icon: "lens", label: "Lens" },
  { key: "explore", icon: "explore", label: "Explore" },
  { key: "connect", icon: "connect", label: "Connect" },
];

/** Centered mobile frame (390×844) on any viewport. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full items-center justify-center p-0 sm:p-6">
      <div className="relative flex h-[100dvh] w-full max-w-[420px] flex-col overflow-hidden bg-canvas sm:h-[860px] sm:rounded-[36px] sm:shadow-[0_40px_120px_rgba(23,32,51,.3)] sm:ring-1 sm:ring-black/5">
        {children}
      </div>
    </div>
  );
}

export function TopHeader({
  onAvatar,
  onCompass,
}: {
  onAvatar: () => void;
  onCompass: () => void;
}) {
  const { journey } = useJourney();
  return (
    <header className="flex items-center justify-between px-5 pb-2 pt-4">
      <button onClick={onCompass} className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 shadow-card active:scale-95">
        <span className="text-[15px]">{COUNTRIES[journey.home].flag}</span>
        <span className="text-[13px] font-semibold text-muted">→</span>
        <span className="text-[15px]">{COUNTRIES[journey.host].flag}</span>
        <span className="ml-0.5 text-[13px] font-bold text-ink">{COUNTRIES[journey.host].name.split(" ")[0]}</span>
        <Icon name="chevron" size={14} />
      </button>
      <div className="flex items-center gap-2">
        <span className="text-[15px] font-extrabold tracking-tight text-primary">
          Yap<span className="text-amber">Yep</span>
        </span>
      </div>
      <button onClick={onAvatar} className="active:scale-95">
        <Avatar initials={journey.initials} color={journey.avatarColor} size={38} />
      </button>
    </header>
  );
}

export function BottomNavigation({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  return (
    <nav className="relative z-30 flex items-stretch justify-around border-t border-line bg-surface/95 px-2 pb-5 pt-2 backdrop-blur">
      {TABS.map((t) => {
        const on = active === t.key;
        const lens = t.key === "lens";
        if (lens) {
          return (
            <button key={t.key} onClick={() => onChange(t.key)} className="flex flex-1 flex-col items-center justify-center">
              <div className={`-mt-6 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_20px_rgba(49,87,213,.4)] transition active:scale-95 ${on ? "bg-primary" : "bg-primary"}`}>
                <span className="text-white">
                  <Icon name="lens" size={26} filled />
                </span>
              </div>
              <span className={`mt-1 text-[10px] font-semibold ${on ? "text-primary" : "text-muted"}`}>{t.label}</span>
            </button>
          );
        }
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`flex min-h-[48px] flex-1 flex-col items-center justify-center gap-0.5 ${on ? "text-primary" : "text-muted"}`}
          >
            <Icon name={t.icon} size={23} filled={on} />
            <span className="text-[10px] font-semibold">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

/** Push-screen header with a back button. */
export function ScreenHeader({ title, onBack, right }: { title: string; onBack: () => void; right?: ReactNode }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-line bg-surface/90 px-4 py-3 backdrop-blur">
      <button onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full text-ink active:scale-90">
        <Icon name="back" size={22} />
      </button>
      <h1 className="flex-1 truncate text-[16px] font-bold text-ink">{title}</h1>
      {right}
    </header>
  );
}

export function Scroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`scroll-area flex-1 overflow-y-auto ${className}`}>{children}</div>;
}
