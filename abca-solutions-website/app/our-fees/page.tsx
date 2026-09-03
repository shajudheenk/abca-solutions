import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FeeTable } from "@/components/sections/FeeTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { Icons } from "@/components/ui/Icon";
import { feePrinciples } from "@/content/fees";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Our fees and commission disclosure",
  description:
    "You never pay ABCA. Suppliers do. Here is exactly how we are paid on each category, and why the pound figure appears on every line of your report.",
  path: "/our-fees",
});

export default function FeesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our fees"
        title="We are paid by suppliers. Here is how much, and when."
        lead="Every broker in this market is paid this way. The difference is that we tell you the number before you decide, not after — and not only if you ask."
        crumbs={[{ name: "Our fees", path: "/our-fees" }]}
      />

      <Section tone="white">
        <SectionHeader
          eyebrow="The principle"
          title="A recommendation you cannot check is not a recommendation."
          lead="If you do not know what a broker earns from an option, you cannot tell whether it was recommended because it is best for you or best for them. That is the entire problem with the model, and it is solvable with one column."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {feePrinciples.map((p) => (
            <li key={p.title} className="bg-white p-7">
              <Icons.check className="h-5 w-5 text-teal-600" />
              <h3 className="mt-4 text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">{p.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed">{p.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      <FeeTable compact />

      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <SectionHeader
            eyebrow="Two things worth knowing"
            title="Where broker commission usually hides."
          />
          <div className="space-y-6">
            <div className="rounded-card border border-line bg-white p-7">
              <h3 className="text-h3">In energy, it is inside the unit rate</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed">
                Energy brokers are almost always paid an uplift in pence per kWh, added to the rate the supplier
                offers and billed to you as part of your unit rate. It does not appear as a fee anywhere. Over a
                three-year contract on a decent-sized meter this is a material number, and it is the single most
                common reason a &ldquo;great deal&rdquo; is not one. We state ours in pounds per year on the report.
              </p>
            </div>
            <div className="rounded-card border border-line bg-white p-7">
              <h3 className="text-h3">In card payments, it is a share of margin</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed">
                Acquirers pay introducers a share of the margin they make above interchange and scheme fees. The
                higher your rate, the more the introducer earns — which is precisely why the rate you are quoted
                and the commission attached to it should be visible on the same page.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Ask us what we would earn. Before you send anything."
        lead="It is a fair question and it should have a fast answer. Call and ask what our commission looks like on your kind of business."
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our fees", path: "/our-fees" },
        ])}
      />
    </>
  );
}
