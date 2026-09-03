import Link from "next/link";
import { clsx } from "@/lib/utils";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="10" fill="var(--logo-tile, #0b1f26)" />
      <path
        d="M11 29 L20 11 L29 29"
        fill="none"
        stroke="var(--logo-stroke, #ffffff)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.4 23.4 H24.6"
        fill="none"
        stroke="var(--logo-accent, #12a594)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type LogoProps = {
  /** `dark` = for use on dark surfaces */
  tone?: "light" | "dark";
  className?: string;
  href?: string;
  showTagline?: boolean;
};

export function Logo({ tone = "light", className, href = "/", showTagline = false }: LogoProps) {
  const isDark = tone === "dark";
  return (
    <Link
      href={href}
      className={clsx("group inline-flex items-center gap-2.5", className)}
      aria-label="ABCA Solutions — home"
      style={
        isDark
          ? ({ "--logo-tile": "#ffffff", "--logo-stroke": "#0b1f26" } as React.CSSProperties)
          : undefined
      }
    >
      <LogoMark className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:-translate-y-px" />
      <span className="flex flex-col leading-none">
        <span
          className={clsx(
            "font-[family-name:var(--font-display)] text-[1.28rem] font-semibold tracking-[-0.045em]",
            isDark ? "text-white" : "text-ink",
          )}
        >
          ABCA
          <span className={isDark ? "text-teal" : "text-teal-600"}>.</span>
        </span>
        {showTagline && (
          <span
            className={clsx(
              "mt-1 text-[0.6rem] font-medium uppercase tracking-[0.16em]",
              isDark ? "text-white/55" : "text-muted",
            )}
          >
            Business cost audits
          </span>
        )}
      </span>
    </Link>
  );
}
