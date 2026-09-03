import { Hero } from "@/components/sections/Hero";
import { TrustRow } from "@/components/sections/TrustRow";
import { PartnerMarquee } from "@/components/sections/PartnerMarquee";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Process } from "@/components/sections/Process";
import { FeeTable } from "@/components/sections/FeeTable";
import { Calculator } from "@/components/sections/Calculator";
import { SectorGrid } from "@/components/sections/SectorGrid";
import { Guarantees } from "@/components/sections/Guarantees";
import { WhyAbca } from "@/components/sections/WhyAbca";
import { Reviews } from "@/components/sections/Reviews";
import { PartnerProgramme } from "@/components/sections/PartnerProgramme";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeader } from "@/components/ui/Section";
import { JsonLd, faqSchema } from "@/lib/schema";
import { showReviews } from "@/content/reviews";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustRow />
      <PartnerMarquee />
      <ServiceGrid />
      <Process />
      <FeeTable />

      <Section tone="sand" id="calculator">
        <SectionHeader
          eyebrow="Card fee calculator"
          title="Work out what a percentage point is costing you."
          lead="Three numbers you already have. The result is arithmetic, not a quote — but it is usually enough to decide whether the audit is worth five minutes."
        />
        <div className="mt-12">
          <Calculator />
        </div>
      </Section>

      <SectorGrid />
      <Guarantees />
      <WhyAbca />
      {showReviews && <Reviews />}
      <PartnerProgramme />
      <Faq />
      <CtaBand />
      <JsonLd data={faqSchema} />
    </>
  );
}
