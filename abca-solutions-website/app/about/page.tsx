import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { PartnerMarquee } from "@/components/sections/PartnerMarquee";
import { Icons } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About ABCA Solutions",
  description:
    "ABCA Solutions Ltd is a UK business cost consultancy. We audit overheads, disclose our commission in pounds and hold your renewal dates. Company no. 14554940.",
  path: "/about",
});

const facts = [
  { label: "Registered name", value: site.legalName },
  { label: "Company number", value: site.companyNumber },
  { label: "Incorporated in", value: site.incorporatedIn },
  { label: "Data protection", value: site.ico.reference ? `ICO registered · ${site.ico.reference}` : "ICO registered data controller" },
  { label: "FCA authorisation", value: "None held. Introducer only on insurance and finance." },
  { label: "Report turnaround", value: `${site.turnaroundDays} working days` },
];

const notWhat = [
  {
    title: "We are not a comparison site",
    body: "A comparison site returns quotes based on what you type into a form. We read what you are actually billed and work out your real effective cost first.",
  },
  {
    title: "We are not authorised by the FCA",
    body: "We do not advise on, arrange or recommend insurance or credit. Where those come up in an audit we introduce you to authorised firms and say so on the report.",
  },
  {
    title: "We are not a supplier",
    body: "We do not sell energy, card processing or connectivity. We are paid a commission by suppliers when you choose to move, and we publish what that is.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A cost consultancy that shows its own margin."
        lead="ABCA Solutions Ltd audits what UK businesses pay for the overheads they can actually change — and publishes what it earns from every recommendation it makes."
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Why this exists</p>
            <h2 className="text-h2">
              The information gap is the product.
            </h2>
            <div className="mt-6 space-y-5 text-[1.0625rem] leading-relaxed">
              <p>
                A small business signs a card processing agreement, an energy contract and a telecoms account in
                its first year, usually under time pressure and usually from whoever called first. Nobody reads
                them again. Three years later the introductory rate has lifted, the energy contract has rolled
                onto out-of-contract rates and there are two lines on the phone bill for services that were
                switched off in 2022.
              </p>
              <p>
                None of that is anybody behaving badly. It is what happens when the party with the information
                is paid by the outcome and the party paying the bill has a business to run. The gap is
                structural, and it is where the money sits.
              </p>
              <p>
                The obvious response is a comparison form. We think the useful response is a document: read the
                bills, work out the real numbers, write them down, and hand them over whether or not anything
                changes. If the report says you are already on a good rate, that is a good report — it just
                earns us nothing.
              </p>
              <p>
                The commission disclosure follows from the same logic. A recommendation you cannot audit is not
                worth much. So every line of our report carries the pound figure we would earn from it, before
                you decide anything.
              </p>
            </div>
          </div>

          <div>
            <div className="rounded-card border border-line bg-sand p-7">
              <h2 className="text-[0.75rem] font-semibold tracking-[0.14em] text-muted uppercase">
                Company facts
              </h2>
              <dl className="mt-5 space-y-4">
                {facts.map((f) => (
                  <div key={f.label} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <dt className="text-[0.8125rem] text-muted">{f.label}</dt>
                    <dd className="mt-0.5 text-[0.9375rem] font-medium text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-4 rounded-card border border-line bg-white p-7">
              <Icons.phone className="h-5 w-5 text-teal-600" />
              <p className="mt-4 text-[0.9375rem] leading-relaxed">
                Questions before you send anything? Call {site.phone.display} — {site.hours}.
              </p>
              <a
                href={site.phone.href}
                className="mt-4 inline-flex text-[0.9375rem] font-medium text-teal-600 underline underline-offset-4"
              >
                {site.phone.display}
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeader
          eyebrow="Being clear"
          title="Three things we are not."
          lead="Stated plainly, because in this market the boundaries matter more than the marketing."
        />
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {notWhat.map((n) => (
            <li key={n.title} className="rounded-card border border-line bg-white p-7">
              <h3 className="text-h3">{n.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed">{n.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <PartnerMarquee
        heading="Our panel"
        lead="Card payments audits are quoted across every acquirer we hold an agreement with, not a preferred one."
      />
      <CtaBand />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
