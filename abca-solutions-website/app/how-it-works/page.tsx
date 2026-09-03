import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Process } from "@/components/sections/Process";
import { Guarantees } from "@/components/sections/Guarantees";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { Icons } from "@/components/ui/Icon";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { services } from "@/content/services";

export const metadata = pageMetadata({
  title: "How the business cost audit works",
  description:
    "Send three bills, get a written audit in 7 working days: current cost against market cost, line by line, with our commission disclosed in pounds. No fee, no obligation.",
  path: "/how-it-works",
});

const documents = Array.from(new Set(services.flatMap((s) => s.documents)));

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="You send bills. We send a document."
        lead={`No discovery call and no qualification process. Everything below happens inside ${site.turnaroundDays} working days.`}
        crumbs={[{ name: "How it works", path: "/how-it-works" }]}
      />

      <Process tone="white" />

      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <SectionHeader
            eyebrow="What we ask for"
            title="One recent bill per service. That is the whole ask."
            lead="A legible photo taken on your phone is enough to start. If a document turns out to be missing something we need, we ask once — we do not send you a form."
          />
          <div>
            <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
              {documents.map((d) => (
                <li key={d} className="flex items-start gap-3 bg-white p-5">
                  <Icons.doc className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  <span className="text-[0.9375rem] leading-snug">{d}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-3 rounded-card border border-line bg-white p-5 text-[0.875rem] leading-relaxed">
              <Icons.lock className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              <span>
                Uploads go to private encrypted storage, readable only by the consultant working on your audit.
                We delete documents on request and never pass them to a supplier without your say-so.
              </span>
            </p>
          </div>
        </div>
      </Section>

      <Guarantees />

      <Section tone="white">
        <SectionHeader
          eyebrow="What the report contains"
          title="Six columns, and one of them is our commission."
          lead="The report is written to be read by someone who is not going to switch. That is the point of it."
        />
        <div className="mt-10 overflow-x-auto rounded-card border border-line">
          <table className="w-full min-w-[46rem] text-left text-[0.875rem]">
            <caption className="sr-only">Columns in an ABCA cost audit report</caption>
            <thead className="bg-sand">
              <tr>
                {["Line", "What you pay now", "Market range", "Difference / year", "Contract ends", "Our commission"].map((h) => (
                  <th key={h} scope="col" className="px-5 py-4 text-[0.6875rem] font-semibold tracking-[0.1em] text-muted uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Card payments", "Effective rate from your statement", "Live pricing across our panel", "In pounds", "Diarised", "In pounds"],
                ["Electricity", "p/kWh + standing charge", "Live rates for your meter profile", "In pounds", "Diarised", "In pounds"],
                ["Telecoms", "Per line and per service", "Equivalent service, benchmarked", "In pounds", "Diarised", "In pounds"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-line">
                  {row.map((cell, i) => (
                    <td key={i} className={i === 0 ? "px-5 py-4 font-medium text-ink" : "px-5 py-4"}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-[0.875rem] text-muted">
          Where a line is already competitive the report says so and recommends nothing. Those lines earn us
          nothing, and they are the reason the report is worth reading.
        </p>
      </Section>

      <Faq />
      <CtaBand />
      <JsonLd
        data={[
          faqSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "How it works", path: "/how-it-works" },
          ]),
        ]}
      />
    </>
  );
}
