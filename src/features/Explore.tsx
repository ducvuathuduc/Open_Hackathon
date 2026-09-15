import { useMemo, useState } from "react";
import { useJourney } from "../context/JourneyContext";
import { useNav } from "../context/NavContext";
import { Scroll, ScreenHeader } from "../components/shell";
import { Card, Button, Badge, Chip, EmptyState, Notice } from "../components/ui";
import { PLACE_CATEGORIES, placesFor, type Place, type PlaceCategory } from "../data/places";
import { COUNTRIES } from "../data/countries";

export function Explore({ initialCategory }: { initialCategory?: PlaceCategory }) {
  const { journey, forced } = useJourney();
  const nav = useNav();
  const [cat, setCat] = useState<PlaceCategory | "all">(initialCategory ?? "all");
  const places = useMemo(() => placesFor(journey.host, journey.city), [journey]);
  const filtered = cat === "all" ? places : places.filter((p) => p.category === cat);

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-[22px] font-extrabold tracking-tight text-ink">Explore</h1>
          <Badge tone="muted">📍 {journey.city}</Badge>
        </div>
        <p className="mt-0.5 text-[13px] text-muted">Student-relevant places, not just any map.</p>
      </div>

      {forced === "stale" && <div className="mx-5 mt-3"><Notice tone="warning" icon="🕓" title="Place info may be out of date" body="Opening hours and recommendations were last refreshed a while ago." /></div>}

      {/* Category chips */}
      <div className="mt-3 flex gap-2 overflow-x-auto scroll-area px-5 pb-2">
        <Chip tone="primary" active={cat === "all"} onClick={() => setCat("all")}>All</Chip>
        {PLACE_CATEGORIES.map((c) => (
          <Chip key={c.key} tone="primary" active={cat === c.key} onClick={() => setCat(c.key)}>{c.icon} {c.label}</Chip>
        ))}
      </div>

      {/* Stylized map */}
      <div className="relative mx-5 mb-3 h-44 overflow-hidden rounded-[20px] border border-line" style={{ background: "linear-gradient(135deg,#eef2ea,#e6ebf6)" }}>
        <MapGrid />
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => nav.push("placeDetail", { place: p })}
            className="absolute -translate-x-1/2 -translate-y-1/2 active:scale-90"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-[15px] shadow-pop ring-2 ring-primary/20">
              {PLACE_CATEGORIES.find((c) => c.key === p.category)?.icon}
            </span>
          </button>
        ))}
        <div className="absolute bottom-2 right-2 rounded-full bg-surface/90 px-2.5 py-1 text-[10px] font-semibold text-muted backdrop-blur">🧭 {journey.university.split(" ").slice(-1)}</div>
      </div>

      <Scroll className="px-5 pb-6">
        {forced === "empty" || filtered.length === 0 ? (
          <EmptyState icon="🗺️" title="No places here yet" body="Try another category or ask a local for recommendations." action="Ask a Local" onAction={() => nav.push("askLocal")} />
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => (
              <PlaceListCard key={p.id} place={p} onOpen={() => nav.push("placeDetail", { place: p })} />
            ))}
          </div>
        )}
      </Scroll>
    </div>
  );
}

function MapGrid() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`h${i}`} x1="0" x2="100%" y1={`${i * 20}%`} y2={`${i * 20}%`} stroke="#cdd5e0" strokeWidth="1" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`v${i}`} y1="0" y2="100%" x1={`${i * 20}%`} x2={`${i * 20}%`} stroke="#cdd5e0" strokeWidth="1" />
      ))}
      <path d="M-10 60 Q 50 40 110 70" stroke="#b9c6d8" strokeWidth="10" fill="none" opacity="0.5" />
    </svg>
  );
}

function PlaceListCard({ place, onOpen }: { place: Place; onOpen: () => void }) {
  const meta = PLACE_CATEGORIES.find((c) => c.key === place.category)!;
  return (
    <Card className="p-4" onClick={onOpen}>
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-canvas text-[20px]">{meta.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-bold text-ink">{place.name}</h3>
            {place.popular && <Badge tone="amber">⭐ Popular</Badge>}
          </div>
          <p className="mt-0.5 text-[12px] text-muted">{meta.label} · {place.distance} away · {place.recommends} students recommend</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {place.goodFor.map((g) => <Badge key={g} tone="success">✓ {g}</Badge>)}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function PlaceDetail({ place, onBack }: { place: Place; onBack: () => void }) {
  const { journey, toggleSave, isSaved } = useJourney();
  const nav = useNav();
  const meta = PLACE_CATEGORIES.find((c) => c.key === place.category)!;
  const saved = isSaved(`place-${place.id}`);
  return (
    <div className="flex h-full flex-col bg-canvas">
      <ScreenHeader title={place.name} onBack={onBack} />
      <Scroll className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-primary-soft text-[26px]">{meta.icon}</div>
          <div>
            <div className="flex items-center gap-2"><h2 className="text-[18px] font-bold text-ink">{place.name}</h2>{place.popular && <Badge tone="amber">⭐ Popular</Badge>}</div>
            <p className="text-[13px] text-muted">{meta.label} · {place.distance} away</p>
          </div>
        </div>

        <Card className="mt-4 p-4">
          <p className="text-[13px] font-bold text-ink">Why it's useful for students</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {place.goodFor.map((g) => <Badge key={g} tone="success">✓ {g}</Badge>)}
          </div>
        </Card>

        {place.phrase && (
          <div className="mt-4"><Notice tone="primary" icon="🗣" title="Useful phrase" body={`"${place.phrase}"`} /></div>
        )}

        <Card className="mt-4 p-4">
          <p className="text-[13px] text-ink"><span className="font-bold">{place.recommends} {COUNTRIES[journey.host].name} students</span> recommend this place.</p>
        </Card>

        <div className="mt-6 flex gap-2">
          <Button variant={saved ? "outline" : "soft"} full onClick={() => toggleSave({ id: `place-${place.id}`, kind: "place", title: place.name, subtitle: `${meta.label} · ${place.distance}`, icon: meta.icon })}>{saved ? "Saved ✓" : "Save"}</Button>
          <Button variant="outline" full onClick={() => nav.push("askLocal")}>Ask a Local</Button>
        </div>
      </Scroll>
    </div>
  );
}
