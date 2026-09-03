import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icons, type IconName } from "@/components/ui/Icon";
import { CtaBand } from "@/components/sections/CtaBand";
import { PartnerMarquee } from "@/components/sections/PartnerMarquee";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "What we audit — seven business overheads",
  description:
    "Card payments, EPOS, business energy, telecoms, banking, insurance and finance — what we check on each, where businesses commonly overpay, and what you receive.",
  path: "/what-we-audit",
});

const iconFor: Record<string, IconName> = {
  "card-payments": "card",
  epos: "till",
  "business-energy": "bolt",
  telecoms: "signal",
  "business-banking": "bank",
  "business-insurance": "shield",
  "business-finance": "coins",
};

export default function WhatWeAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="What we audit"
        title="Seven overheads. One document."
        lead="These are the costs a UK business can realistically change. Everything else on your P&L is rent, wages and stock."
        crumbs={[{ name: "What we audit", path: "/what-we-audit" }]}
      />

      <Section tone="white">
        <ul className="grid gap-4 lg:grid-cols-2">
          {services.map((s, i) => {
            const Icon = Icons[iconFor[s.slug] ?? "doc"];
            return (
              <Reveal as="li" key={s.slug} delay={i * 45}>
                <Link
                  href={`/what-we-audit/${s.slug}`}
                  className="group flex h-full flex-col rounded-card border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-raise sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-[10px] bg-teal-100 text-teal-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    {s.introducerOnly && (
                      <span className="rounded-pill border border-line bg-sand px-2.5 py-1 text-[0.6875rem] font-medium tracking-wide text-muted uppercase">
                        Introduction only
                      </span>
                    )}
                  </div>
                  <h2 className="mt-5 text-h3">{s.name}</h2>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed">{s.intro}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-teal-600">
                    What we check
                    <Icons.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <PartnerMarquee />
      <CtaBand />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "What we audit", path: "/what-we-audit" },
        ])}
      />
    </>
  );
}
