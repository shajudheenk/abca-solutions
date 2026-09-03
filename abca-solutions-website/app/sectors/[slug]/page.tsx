import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, InlineArrowLink } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { CtaBand } from "@/components/sections/CtaBand";
import { sectors, sectorBySlug } from "@/content/sectors";
import { serviceBySlug } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = sectorBySlug(slug);
  if (!sector) return {};
  return pageMetadata({
    title: sector.metaTitle,
    description: sector.metaDescription,
    path: `/sectors/${sector.slug}`,
  });
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = sectorBySlug(slug);
  if (!sector) notFound();

  const linked = sector.services.map(serviceBySlug).filter(Boolean);
  const otherSectors = sectors.filter((s) => s.slug !== sector.slug);

  return (
    <>
      <PageHero
        eyebrow="Sector"
        title={sector.name}
        lead={sector.intro}
        crumbs={[
          { name: "Sectors", path: "/sectors" },
          { name: sector.name, path: `/sectors/${sector.slug}` },
        ]}
        aside={
          <div className="rounded-card border border-line-dark bg-ink-2/60 p-6 lg:w-[19rem]">
            <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-white/60 uppercase">
              Audited in this order
            </p>
            <ol className="mt-4 space-y-2.5">
              {sector.priorities.slice(0, 4).map((p, i) => (
                <li key={p} className="flex gap-3 text-[0.875rem] text-white/75">
                  <span className="font-[family-name:var(--font-display)] text-[0.8125rem] font-semibold text-teal tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-snug">{p}</span>
                </li>
              ))}
            </ol>
            <Button href="/get-audit" className="mt-6 w-full" size="sm">
              Get your audit
              <Icons.arrowRight className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      <Section tone="white">
        <SectionHeader
          eyebrow="What we look for"
          title={`What tends to be wrong in ${sector.name.toLowerCase()}.`}
          lead="Specific to this sector, and drawn from how the contracts and meters actually behave rather than from a generic savings claim."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {sector.notes.map((n, i) => (
            <Reveal as="li" key={n.title} delay={i * 60}>
              <div className="h-full rounded-card border border-line bg-white p-7">
                <Icons.alert className="h-5 w-5 text-coral" />
                <h3 className="mt-4 text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">{n.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed">{n.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="sand">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Priority order"
            title="Where the audit spends its time."
            lead="We work down this list. Lines further down still get checked, they just rarely move the number."
          />
          <InlineArrowLink href="/what-we-audit">All services</InlineArrowLink>
        </div>
        <ol className="mt-10 space-y-px overflow-hidden rounded-card border border-line bg-line">
          {sector.priorities.map((p, i) => (
            <li key={p} className="flex gap-4 bg-white px-6 py-4">
              <span className="mt-0.5 font-[family-name:var(--font-display)] text-[0.8125rem] font-semibold text-teal-600 tnum">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.9375rem] leading-relaxed">{p}</span>
            </li>
          ))}
        </ol>

        {linked.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {linked.map((s) => (
              <li key={s!.slug}>
                <Link
                  href={`/what-we-audit/${s!.slug}`}
                  className="inline-flex rounded-pill border border-line bg-white px-4 py-2 text-[0.875rem] font-medium text-ink transition-colors hover:border-teal/50 hover:text-teal-600"
                >
                  {s!.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section tone="white">
        <SectionHeader eyebrow="Other sectors" title="Not quite your business?" />
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {otherSectors.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/sectors/${s.slug}`}
                className="inline-flex rounded-pill border border-line bg-white px-4 py-2 text-[0.875rem] font-medium text-ink transition-colors hover:border-teal/50 hover:text-teal-600"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Sectors", path: "/sectors" },
          { name: sector.name, path: `/sectors/${sector.slug}` },
        ])}
      />
    </>
  );
}
