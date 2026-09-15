export type CountryCode =
  | "BN"
  | "KH"
  | "ID"
  | "LA"
  | "MY"
  | "MM"
  | "PH"
  | "SG"
  | "TH"
  | "TL"
  | "VN";

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  languages: string[];
  /** chip accent only — never turns the app into a rainbow */
  accent: string;
}

export const COUNTRIES: Record<CountryCode, Country> = {
  BN: { code: "BN", name: "Brunei Darussalam", flag: "🇧🇳", languages: ["Malay", "English"], accent: "#F0C419" },
  KH: { code: "KH", name: "Cambodia", flag: "🇰🇭", languages: ["Khmer", "English"], accent: "#3157D5" },
  ID: { code: "ID", name: "Indonesia", flag: "🇮🇩", languages: ["Bahasa Indonesia", "English"], accent: "#E5484D" },
  LA: { code: "LA", name: "Lao PDR", flag: "🇱🇦", languages: ["Lao", "English"], accent: "#C0392B" },
  MY: { code: "MY", name: "Malaysia", flag: "🇲🇾", languages: ["Malay", "English", "Mandarin", "Tamil"], accent: "#169B62" },
  MM: { code: "MM", name: "Myanmar", flag: "🇲🇲", languages: ["Burmese", "English"], accent: "#F59E0B" },
  PH: { code: "PH", name: "Philippines", flag: "🇵🇭", languages: ["Filipino", "English"], accent: "#3157D5" },
  SG: { code: "SG", name: "Singapore", flag: "🇸🇬", languages: ["English", "Mandarin", "Malay", "Tamil"], accent: "#E5484D" },
  TH: { code: "TH", name: "Thailand", flag: "🇹🇭", languages: ["Thai", "English"], accent: "#3157D5" },
  TL: { code: "TL", name: "Timor-Leste", flag: "🇹🇱", languages: ["Tetum", "Portuguese", "English"], accent: "#E5484D" },
  VN: { code: "VN", name: "Viet Nam", flag: "🇻🇳", languages: ["Vietnamese", "English"], accent: "#E5484D" },
};

export const COUNTRY_LIST: Country[] = Object.values(COUNTRIES);

export function country(code: CountryCode): Country {
  return COUNTRIES[code];
}
