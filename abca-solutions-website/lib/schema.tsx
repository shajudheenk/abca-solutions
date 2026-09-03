import { site } from "./site";
import { faqs } from "@/content/faqs";
import { services } from "@/content/services";

const ORG_ID = `${site.url}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  description: site.description,
  telephone: site.phone.display,
  email: site.email.general,
  priceRange: "Free to the client",
  areaServed: { "@type": "Country", name: "United Kingdom" },
  address: { "@type": "PostalAddress", addressCountry: "GB" },
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Companies House company number",
    value: site.companyNumber,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Business cost audits",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, description: s.summary },
      url: `${site.url}/what-we-audit/${s.slug}`,
    })),
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-GB",
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function serviceSchema(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.summary,
    url: `${site.url}/what-we-audit/${s.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United Kingdom" },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
