import type { CountryCode } from "./countries";

export type PlaceCategory =
  | "campus"
  | "study"
  | "food"
  | "banks"
  | "healthcare"
  | "pharmacy"
  | "transport"
  | "religion"
  | "culture"
  | "hangout"
  | "studentlife";

export const PLACE_CATEGORIES: { key: PlaceCategory; icon: string; label: string }[] = [
  { key: "campus", icon: "🏫", label: "Campus" },
  { key: "study", icon: "📚", label: "Study" },
  { key: "food", icon: "🍜", label: "Student Food" },
  { key: "banks", icon: "🏦", label: "Banks" },
  { key: "healthcare", icon: "🏥", label: "Healthcare" },
  { key: "pharmacy", icon: "💊", label: "Pharmacy" },
  { key: "transport", icon: "🚇", label: "Transport" },
  { key: "religion", icon: "🕌", label: "Religion" },
  { key: "culture", icon: "🎨", label: "Culture" },
  { key: "hangout", icon: "☕", label: "Hangout" },
  { key: "studentlife", icon: "🎉", label: "Student Life" },
];

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  distance: string;
  goodFor: string[];
  phrase?: string;
  recommends: number;
  popular?: boolean;
  x: number; // 0..100 map position
  y: number;
}

const SG_PLACES: Place[] = [
  { id: "sg-1", name: "NUS Central Library", category: "study", distance: "5 min", goodFor: ["Study", "Free Wi-Fi", "Quiet"], phrase: "Is there a power outlet available?", recommends: 42, popular: true, x: 40, y: 35 },
  { id: "sg-2", name: "The Deck (Hawker)", category: "food", distance: "3 min", goodFor: ["Cheap eats", "Halal options"], phrase: "One chicken rice, less oil please.", recommends: 58, popular: true, x: 55, y: 50 },
  { id: "sg-3", name: "DBS @ Kent Ridge", category: "banks", distance: "8 min", goodFor: ["Student accounts", "PayNow"], phrase: "I'd like to open a student account.", recommends: 21, x: 30, y: 60 },
  { id: "sg-4", name: "University Health Centre", category: "healthcare", distance: "6 min", goodFor: ["Clinic", "Insurance claims"], recommends: 17, x: 62, y: 30 },
  { id: "sg-5", name: "Guardian Pharmacy", category: "pharmacy", distance: "10 min", goodFor: ["Meds", "Essentials"], recommends: 12, x: 70, y: 62 },
  { id: "sg-6", name: "Kent Ridge MRT", category: "transport", distance: "4 min", goodFor: ["MRT", "SimplyGo top-up"], recommends: 30, x: 48, y: 72 },
  { id: "sg-7", name: "NUS Muslim Prayer Room", category: "religion", distance: "5 min", goodFor: ["Prayer", "Wudu"], recommends: 15, x: 35, y: 45 },
  { id: "sg-8", name: "Clementi Coffee Corner", category: "hangout", distance: "12 min", goodFor: ["Coffee", "Chill"], recommends: 26, x: 78, y: 40 },
  { id: "sg-9", name: "UTown Study Pods", category: "study", distance: "9 min", goodFor: ["24h", "Group study"], recommends: 34, popular: true, x: 58, y: 20 },
  { id: "sg-10", name: "NUS Sports Centre", category: "studentlife", distance: "7 min", goodFor: ["Gym", "CCAs"], recommends: 19, x: 24, y: 28 },
];

/** Templated believable places for other cities. */
function genericPlaces(city: string): Place[] {
  const seed = city;
  return [
    { id: `${seed}-1`, name: `${city} Main Library`, category: "study", distance: "6 min", goodFor: ["Study", "Wi-Fi", "Quiet"], phrase: "Is there a free seat here?", recommends: 33, popular: true, x: 42, y: 34 },
    { id: `${seed}-2`, name: "Campus Food Court", category: "food", distance: "3 min", goodFor: ["Cheap eats", "Fast"], phrase: "One portion to go, please.", recommends: 48, popular: true, x: 56, y: 52 },
    { id: `${seed}-3`, name: "Student Bank Branch", category: "banks", distance: "9 min", goodFor: ["Student accounts"], phrase: "I'd like to open a student account.", recommends: 18, x: 30, y: 62 },
    { id: `${seed}-4`, name: "University Clinic", category: "healthcare", distance: "7 min", goodFor: ["Clinic", "Check-ups"], recommends: 14, x: 64, y: 30 },
    { id: `${seed}-5`, name: "Corner Pharmacy", category: "pharmacy", distance: "8 min", goodFor: ["Meds"], recommends: 9, x: 72, y: 60 },
    { id: `${seed}-6`, name: `${city} Transit Hub`, category: "transport", distance: "5 min", goodFor: ["Transit", "Top-up"], recommends: 27, x: 48, y: 72 },
    { id: `${seed}-7`, name: "Campus Prayer/Quiet Room", category: "religion", distance: "6 min", goodFor: ["Prayer", "Quiet"], recommends: 12, x: 34, y: 46 },
    { id: `${seed}-8`, name: "Student Café", category: "hangout", distance: "10 min", goodFor: ["Coffee", "Chill"], recommends: 31, x: 78, y: 42 },
    { id: `${seed}-9`, name: "Cultural Centre", category: "culture", distance: "14 min", goodFor: ["Culture", "Events"], recommends: 16, x: 20, y: 55 },
    { id: `${seed}-10`, name: "Sports & Clubs Hall", category: "studentlife", distance: "8 min", goodFor: ["Clubs", "Sports"], recommends: 20, x: 26, y: 26 },
  ];
}

export function placesFor(host: CountryCode, city: string): Place[] {
  if (host === "SG") return SG_PLACES;
  return genericPlaces(city);
}
