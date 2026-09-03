import { clsx } from "@/lib/utils";
import { Container } from "./Container";

type Tone = "white" | "sand" | "ink" | "teal";

const toneClass: Record<Tone, string> = {
  white: "bg-white",
  sand: "bg-sand",
  ink: "bg-ink text-white/75 dark-surface",
  teal: "bg-teal-50",
};

export function Section({
  id,
  tone = "white",
  className,
  children,
  width,
  bleed = false,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  width?: "default" | "narrow" | "wide";
  bleed?: boolean;
}) {
  return (
    <section id={id} className={clsx(toneClass[tone], "py-16 sm:py-20 lg:py-28", className)}>
      {bleed ? children : <Container width={width}>{children}</Container>}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  as: As = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <As
        className={clsx(
          As === "h1" ? "text-[2.5rem] leading-[1.05] sm:text-display-2 lg:text-display-1" : "text-[1.75rem] leading-[1.15] sm:text-h2",
          "font-semibold tracking-[-0.03em]",
          tone === "dark" && "text-white",
        )}
      >
        {title}
      </As>
      {lead && (
        <p
          className={clsx(
            "mt-5 text-lead",
            tone === "dark" ? "text-white/70" : "text-body",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
