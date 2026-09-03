import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, InlineArrowLink } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { CtaBand } from "@/components/sections/CtaBand";
import { services, serviceBySlug } from "@/content/services";
import { sectors } from "@/content/sectors";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/what-we-audit/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const related = sectors.filter((s) => s.services.includes(service.slug)).slice(0, 5);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow="What we audit"
        title={service.name}
        lead={service.intro}
        crumbs={[
          { name: "What we audit", path: "/what-we-audit" },
          { name: service.name, path: `/what-we-audit/${service.slug}` },
        ]}
        aside={
          <div className="rounded-card border border-line-dark bg-ink-2/60 p-6 lg:w-[19rem]">
            <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-white/60 uppercase">
              What we need from you
            </p>
            <ul className="mt-4 space-y-2.5">
              {service.documents.map((d) => (
                <li key={d} className="flex gap-2.5 text-[0.875rem] text-white/75">
                  <Icons.doc className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  {d}
                </li>
              ))}
            </ul>
            <Button href="/get-audit" className="mt-6 w-full" size="sm">
              Start this audit
              <Icons.arrowRight className="h-4 w-4" />
            </Button>
          </div>
        }
      >
        {service.introducerOnly && (
          <p className="flex max-w-xl items-start gap-3 rounded-card border border-line-dark bg-ink-2/60 p-4 text-[0.8125rem] leading-relaxed text-white/70">
            <Icons.alert className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
            <span>
              ABCA Solutions Ltd is not authorised or regulated by the Financial Conduct Authority. We do not
              advise on, arrange or recommend {service.name.toLowerCase()}. We act as an introducer to
              authorised firms, who deal with you directly.
            </span>
          </p>
        )}
      </PageHero>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeader
            eyebrow="What we check"
            title="Everything on this list, on every audit."
            lead="Not a sample. If a line does not apply to your business, the report says so and why."
          />
          <ul className="space-y-px overflow-hidden rounded-card border border-line bg-line">
            {service.checks.map((c, i) => (
              <li key={c} className="flex gap-4 bg-white px-6 py-4">
                <span className="mt-0.5 font-[family-name:var(--font-display)] text-[0.8125rem] font-semibold text-teal-600 tnum">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem] leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeader
          eyebrow="Where the money goes"
          title="The four ways this line quietly gets more expensive."
          lead="None of these involve anyone doing anything wrong. They are how the contracts are built."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {service.leaks.map((l, i) => (
            <Reveal as="li" key={l.title} delay={i * 60}>
              <div className="h-full rounded-card border border-line bg-white p-7">
                <Icons.alert className="h-5 w-5 text-coral" />
                <h3 className="mt-4 text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">{l.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed">{l.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="ink">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <SectionHeader eyebrow="What you receive" tone="dark" title="This line, on your report." />
          <p className="text-lead text-white/70">{service.deliverable}</p>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="white">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Sector notes"
              title={`How ${service.name.toLowerCase()} behaves by sector`}
              lead="The same line costs differently depending on what the business does. These are the sectors where it matters most."
            />
            <InlineArrowLink href="/sectors">All sectors</InlineArrowLink>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/sectors/${s.slug}`}
                  className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-raise"
                >
                  <span className="text-[1rem] font-semibold text-ink">{s.name}</span>
                  <span className="mt-1.5 text-[0.875rem] leading-relaxed">{s.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="sand">
        <SectionHeader eyebrow="Other lines" title="The rest of the audit." />
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/what-we-audit/${s.slug}`}
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
        data={[
          serviceSchema(service.slug)!,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "What we audit", path: "/what-we-audit" },
            { name: service.name, path: `/what-we-audit/${service.slug}` },
          ]),
        ]}
      />
    </>
  );
}
