type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...base}>
      {children}
    </svg>
  );
}

export const Icons = {
  card: (p: IconProps) => (
    <Svg {...p}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19M6 15h3" />
    </Svg>
  ),
  till: (p: IconProps) => (
    <Svg {...p}>
      <rect x="3" y="9" width="18" height="11" rx="2" />
      <path d="M7 9V5.5A1.5 1.5 0 0 1 8.5 4h7A1.5 1.5 0 0 1 17 5.5V9M7.5 13h3m3 0h3m-9 3.5h9" />
    </Svg>
  ),
  bolt: (p: IconProps) => (
    <Svg {...p}>
      <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8Z" />
    </Svg>
  ),
  signal: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 19v.01M8.6 15.6a4.8 4.8 0 0 1 6.8 0M5.2 12.2a9.6 9.6 0 0 1 13.6 0M2 8.8a14.4 14.4 0 0 1 20 0" />
    </Svg>
  ),
  bank: (p: IconProps) => (
    <Svg {...p}>
      <path d="M3 9.5 12 4l9 5.5M5 10v8m4-8v8m6-8v8m4-8v8M3 20.5h18" />
    </Svg>
  ),
  shield: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 3 5 5.8v5.4c0 4.3 2.9 8.1 7 9.3 4.1-1.2 7-5 7-9.3V5.8L12 3Z" />
      <path d="m9.3 12 1.9 1.9 3.6-3.6" />
    </Svg>
  ),
  coins: (p: IconProps) => (
    <Svg {...p}>
      <ellipse cx="9" cy="7" rx="5.5" ry="2.6" />
      <path d="M3.5 7v4.2c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6V7" />
      <path d="M9.2 14v2.8c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6V12" />
      <ellipse cx="14.7" cy="12" rx="5.5" ry="2.6" />
    </Svg>
  ),
  doc: (p: IconProps) => (
    <Svg {...p}>
      <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L13.5 3Z" />
      <path d="M13.5 3v5.5H19M8.5 13h7m-7 3.5h4.5" />
    </Svg>
  ),
  calendar: (p: IconProps) => (
    <Svg {...p}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4m8-4v4" />
    </Svg>
  ),
  arrowRight: (p: IconProps) => (
    <Svg {...p}>
      <path d="M4 12h15m0 0-6-6m6 6-6 6" />
    </Svg>
  ),
  chevronDown: (p: IconProps) => (
    <Svg {...p}>
      <path d="m6 9.5 6 6 6-6" />
    </Svg>
  ),
  check: (p: IconProps) => (
    <Svg {...p}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Svg>
  ),
  phone: (p: IconProps) => (
    <Svg {...p}>
      <path d="M6.3 3.5h2.9l1.5 3.7-2 1.3a11.5 11.5 0 0 0 5 5l1.3-2 3.7 1.5v2.9a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.3 5.7a2 2 0 0 1 2-2.2Z" />
    </Svg>
  ),
  mail: (p: IconProps) => (
    <Svg {...p}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Svg>
  ),
  factory: (p: IconProps) => (
    <Svg {...p}>
      <path d="M3 20.5h18M4.5 20.5V10l5 3V10l5 3V6.5h5v14" />
      <path d="M17 11h1.5M17 15h1.5" />
    </Svg>
  ),
  clock: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  ),
  lock: (p: IconProps) => (
    <Svg {...p}>
      <rect x="4.5" y="10" width="15" height="10.5" rx="2.5" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
    </Svg>
  ),
  building: (p: IconProps) => (
    <Svg {...p}>
      <path d="M5 20.5V4.5h9v16M14 9.5h5v11M3.5 20.5h17M8 8h3M8 11.5h3M8 15h3" />
    </Svg>
  ),
  users: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0M16 5.2a3.2 3.2 0 0 1 0 5.6m1.5 3.1a5.5 5.5 0 0 1 3 4.6" />
    </Svg>
  ),
  upload: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M4 16.5v1.5a2.5 2.5 0 0 0 2.5 2.5h11a2.5 2.5 0 0 0 2.5-2.5v-1.5" />
    </Svg>
  ),
  alert: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5m0 3.5v.01" />
    </Svg>
  ),
};

export type IconName = keyof typeof Icons;
