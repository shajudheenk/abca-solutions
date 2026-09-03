import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icons, type IconName } from "@/components/ui/Icon";
import { sectors } from "@/content/sectors";

const iconFor: Record<string, IconName> = {
  "industrial-units": "factory",
  "restaurants-takeaways": "till",
  "convenience-retail": "card",
  "pubs-bars": "coins",
  "salons-barbers": "users",
  "garages-mot": "bolt",
  "gyms-studios": "signal",
  "care-homes": "shield",
  "offices-professional": "building",
};

export function SectorGrid({ tone = "white" }: { tone?: "white" | "sand" }) {
  return (
    <Section id="sectors" tone={tone}>
      <SectionHeader
        eyebrow="Sectors"
        title="A takeaway and an industrial unit have nothing in common on cost."
        lead="Which lines matter, and in what order, changes completely by sector. We start from the profile rather than a generic checklist."
      />

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((s, i) => {
          const Icon = Icons[iconFor[s.slug] ?? "building"];
          return (
            <Reveal as="li" key={s.slug} delay={i * 35}>
              <Link
                href={`/sectors/${s.slug}`}
                className="group flex h-full items-start gap-4 rounded-card border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-raise"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[9px] bg-sand text-ink transition-colors duration-300 group-hover:bg-teal-100 group-hover:text-teal-600">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">
                    {s.name}
                  </span>
                  <span className="mt-1 block text-[0.875rem] leading-relaxed text-body">{s.summary}</span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
