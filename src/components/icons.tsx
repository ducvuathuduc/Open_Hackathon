export type IconName = "today" | "passport" | "lens" | "explore" | "connect" | "back" | "close" | "chevron" | "check";

export function Icon({ name, size = 24, filled = false }: { name: IconName; size?: number; filled?: boolean }) {
  const sw = filled ? 0 : 1.9;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: filled ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "today":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 4l9 6.5" stroke="currentColor" fill="none" strokeWidth={1.9} />
          <path d="M5 9.5V20h14V9.5" fill={filled ? "currentColor" : "none"} />
        </svg>
      );
    case "passport":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2.5" fill={filled ? "currentColor" : "none"} />
          <circle cx="12" cy="10" r="3" fill="none" stroke={filled ? "#fff" : "currentColor"} strokeWidth={1.7} />
          <path d="M9 16h6" stroke={filled ? "#fff" : "currentColor"} strokeWidth={1.7} />
        </svg>
      );
    case "lens":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" fill={filled ? "currentColor" : "none"} />
          <circle cx="11" cy="11" r="2.5" fill="none" stroke={filled ? "#fff" : "currentColor"} strokeWidth={1.7} />
          <path d="m17 17 4 4" strokeWidth={2} />
        </svg>
      );
    case "explore":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" fill={filled ? "currentColor" : "none"} />
          <path d="m15 9-2 5-4 1 2-5z" fill={filled ? "#fff" : "none"} stroke={filled ? "#fff" : "currentColor"} strokeWidth={1.6} />
        </svg>
      );
    case "connect":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="3" fill={filled ? "currentColor" : "none"} />
          <circle cx="16.5" cy="11" r="2.4" fill={filled ? "currentColor" : "none"} />
          <path d="M3.5 19c.6-3 3-4.5 5.5-4.5S14 16 14.5 19M14 15.2c1.8-.3 4 .6 4.7 3" />
        </svg>
      );
    case "back":
      return (
        <svg {...common}>
          <path d="m15 5-7 7 7 7" strokeWidth={2.1} />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6 6 18" strokeWidth={2.1} />
        </svg>
      );
    case "chevron":
      return (
        <svg {...common}>
          <path d="m9 6 6 6-6 6" strokeWidth={2} />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4.5 4.5L19 7" strokeWidth={2.2} />
        </svg>
      );
  }
}
