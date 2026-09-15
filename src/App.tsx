import { useState } from "react";
import { JourneyProvider, useJourney, makeCustomJourney } from "./context/JourneyContext";
import { NavProvider, useNav } from "./context/NavContext";
import { AppShell, TopHeader, BottomNavigation, type TabKey } from "./components/shell";
import Onboarding from "./features/Onboarding";
import Today from "./features/Today";
import { PassportHome, PassportSection, PassportCardDetail } from "./features/Passport";
import BankFlow from "./features/BankFlow";
import Lens from "./features/Lens";
import YapSim from "./features/YapSim";
import Study from "./features/Study";
import { Explore, PlaceDetail } from "./features/Explore";
import { ConnectHome, MatchProfile, Chat, AskALocal } from "./features/Connect";
import { Profile, Settings, Compass } from "./features/Profile";
import { ensureAnonymousSession } from "./lib/appwrite/session";
import type { PassportCard } from "./data/passports";
import type { Place, PlaceCategory } from "./data/places";
import type { Person } from "./data/people";

export default function App() {
  return (
    <JourneyProvider>
      <NavProvider>
        <AppShell>
          <Root />
        </AppShell>
      </NavProvider>
    </JourneyProvider>
  );
}

function Root() {
  const [onboarded, setOnboarded] = useState(false);
  const { setCustom, setJourneyId } = useJourney();
  const nav = useNav();

  if (!onboarded)
    return (
      <Onboarding
        onStart={async () => {
          const result = await ensureAnonymousSession();
          return result.ok ? { ok: true } : { ok: false, message: result.message };
        }}
        onComplete={({ home, host, city, university, myDna }) => {
          setCustom({ ...makeCustomJourney(home, host, myDna), city, university, myDna, home, host });
          setOnboarded(true);
        }}
      />
    );

  return <Main onReonboard={() => { setJourneyId("minh"); nav.reset(); setOnboarded(false); }} />;
}

function Main({ onReonboard }: { onReonboard: () => void }) {
  const nav = useNav();
  const top = nav.stack[nav.stack.length - 1];

  return (
    <div className="relative flex h-full flex-col">
      {/* Tab content */}
      <div className="flex min-h-0 flex-1 flex-col">
        <TopHeader onAvatar={() => nav.push("profile")} onCompass={() => nav.push("compass")} />
        <div className="flex min-h-0 flex-1 flex-col">
          <TabView tab={nav.tab} />
        </div>
      </div>

      <BottomNavigation active={nav.tab} onChange={(t: TabKey) => nav.setTab(t)} />

      {/* Overlay stack */}
      {top && (
        <div className="absolute inset-0 z-40 bg-canvas">
          <Overlay frame={top} onReonboard={onReonboard} />
        </div>
      )}
    </div>
  );
}

function TabView({ tab }: { tab: TabKey }) {
  switch (tab) {
    case "today":
      return <Today />;
    case "passport":
      return <PassportHome />;
    case "lens":
      return <Lens />;
    case "explore":
      return <Explore />;
    case "connect":
      return <ConnectHome />;
  }
}

function Overlay({ frame, onReonboard }: { frame: { screen: string; params?: Record<string, unknown> }; onReonboard: () => void }) {
  const nav = useNav();
  const p = frame.params ?? {};
  const back = () => nav.pop();

  switch (frame.screen) {
    case "passportSection":
      return <PassportSection sectionId={p.sectionId as string} onBack={back} />;
    case "passportCard":
      return <PassportCardDetail card={p.card as PassportCard} onBack={back} />;
    case "bankFlow":
      return <BankFlow onBack={back} />;
    case "sim":
      return <YapSim onBack={back} fromLens={p.fromLens as boolean} />;
    case "study":
      return <Study onBack={back} />;
    case "placeDetail":
      return <PlaceDetail place={p.place as Place} onBack={back} />;
    case "placeCategory":
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-3">
            <button onClick={back} className="text-[15px] font-semibold text-primary">← Back</button>
          </div>
          <Explore initialCategory={p.category as PlaceCategory} />
        </div>
      );
    case "matchProfile":
      return <MatchProfile person={p.person as Person} onBack={back} />;
    case "chat":
      return <Chat person={p.person as Person} onBack={back} />;
    case "askLocal":
      return <AskALocal onBack={back} />;
    case "profile":
      return <Profile onBack={back} />;
    case "settings":
      return <Settings onBack={back} />;
    case "compass":
      return <Compass onBack={back} onReonboard={onReonboard} />;
    default:
      return null;
  }
}
