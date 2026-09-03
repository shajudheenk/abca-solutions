import { PageHero } from "@/components/layout/PageHero";
import { SectorGrid } from "@/components/sections/SectorGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Sectors we audit",
  description:
    "Industrial units, restaurants, convenience retail, pubs, salons, garages, gyms, care homes and professional offices — each audited against its own cost profile.",
  path: "/sectors",
});

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sectors"
        title="We start from the cost profile, not a checklist."
        lead="Which overhead matters most, and what a good rate looks like, changes entirely with what the business does and when it draws power."
        crumbs={[{ name: "Sectors", path: "/sectors" }]}
      />
      <SectorGrid tone="white" />
      <CtaBand />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Sectors", path: "/sectors" },
        ])}
      />
    </>
  );
}
