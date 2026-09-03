import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icons, type IconName } from "@/components/ui/Icon";
import { services } from "@/content/services";

const iconFor: Record<string, IconName> = {
  "card-payments": "card",
  epos: "till",
  "business-energy": "bolt",
  telecoms: "signal",
  "business-banking": "bank",
  "business-insurance": "shield",
  "business-finance": "coins",
};

export function ServiceGrid() {
  return (
    <Section id="what-we-audit" tone="sand">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          eyebrow="What we audit"
          title="Seven lines. One report."
          lead="Every overhead a UK business can realistically change, checked against the market on the same document."
        />
        <Link
          href="/what-we-audit"
          className="group inline-flex shrink-0 items-center gap-2 text-[0.9375rem] font-medium text-teal-600"
        >
          All services
          <Icons.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = Icons[iconFor[s.slug] ?? "doc"];
          return (
            <Reveal as="li" key={s.slug} delay={i * 45} className="bg-white">
              <Link href={`/what-we-audit/${s.slug}`} className="group flex h-full flex-col p-7 transition-colors hover:bg-sand">
                <span className="grid h-11 w-11 place-items-center rounded-[10px] bg-teal-100 text-teal-600 transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-h3">{s.name}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed">{s.summary}</p>
                {s.introducerOnly && (
                  <span className="mt-4 inline-flex w-fit rounded-pill border border-line bg-sand px-2.5 py-1 text-[0.6875rem] font-medium tracking-wide text-muted uppercase">
                    Introduction only
                  </span>
                )}
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-teal-600">
                  What we check
                  <Icons.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          );
        })}

        <Reveal as="li" delay={services.length * 45} className="bg-ink">
          <Link href="/get-audit" className="dark-surface group flex h-full flex-col justify-between p-7 text-white/70">
            <span className="grid h-11 w-11 place-items-center rounded-[10px] bg-white/10 text-teal">
              <Icons.doc className="h-5 w-5" />
            </span>
            <div className="mt-5">
              <h3 className="text-h3 text-white">Not sure which apply?</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed">
                Send whatever bills you have. We tell you which lines are worth auditing and which are already
                competitive.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-teal">
                Start your audit
                <Icons.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      </ul>
    </Section>
  );
}
