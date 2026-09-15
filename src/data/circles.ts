import type { CountryCode } from "./countries";
import { COUNTRIES } from "./countries";

export interface CircleGroup {
  label: string;
  count: number;
  online?: number;
}

export function circlesFor(host: CountryCode, home: CountryCode): CircleGroup[] {
  const h = COUNTRIES[host].name;
  const from = COUNTRIES[home].name;
  return [
    { label: `Local students`, count: 1240, online: 124 },
    { label: `International students in ${h}`, count: 890, online: 89 },
    { label: `${from} students in ${h}`, count: 372, online: 37 },
    { label: `Going to ${h}`, count: 618, online: 62 },
    { label: `Returned from ${h}`, count: 410, online: 41 },
  ];
}

export const CIRCLE_FILTERS = [
  "My university",
  "My city",
  "My major",
  "My language",
  "My interests",
  "My semester",
];
