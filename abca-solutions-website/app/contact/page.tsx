import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Icons } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact ABCA Solutions",
  description: `Call ${site.phone.display}, email ${site.email.general}, or send your bills for a free written cost audit. Replies within 2 working hours, Mon–Fri.`,
  path: "/contact",
});

const channels = [
  {
    icon: Icons.phone,
    title: "Call",
    value: site.phone.display,
    href: site.phone.href,
    detail: `${site.hours}. You get a person, not a queue.`,
  },
  {
    icon: Icons.mail,
    title: "Email",
    value: site.email.general,
    href: `mailto:${site.email.general}`,
    detail: site.responsePromise + " during working hours.",
  },
  {
    icon: Icons.doc,
    title: "Send bills",
    value: site.email.audits,
    href: `mailto:${site.email.audits}`,
    detail: "Attach or photograph them — legible is enough.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ask first. Send bills later."
        lead="There is no qualification process here. If you want to know what we would earn on your kind of business before you send anything, call and ask."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <Section tone="white">
        <ul className="grid gap-4 lg:grid-cols-3">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.title}>
                <a
                  href={c.href}
                  className="group flex h-full flex-col rounded-card border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-raise"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-[10px] bg-teal-100 text-teal-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="mt-5 text-[0.75rem] font-semibold tracking-[0.14em] text-muted uppercase">
                    {c.title}
                  </span>
                  <span className="mt-1.5 text-[1.125rem] font-semibold tracking-[-0.02em] break-words text-ink">
                    {c.value}
                  </span>
                  <span className="mt-2 flex-1 text-[0.875rem] leading-relaxed">{c.detail}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 grid gap-4 rounded-card border border-line bg-sand p-7 sm:grid-cols-2 sm:p-9">
          <div>
            <SectionHeader eyebrow="Company" title="Registered details" />
            <dl className="mt-6 space-y-3 text-[0.9375rem]">
              <div>
                <dt className="text-[0.8125rem] text-muted">Registered name</dt>
                <dd className="font-medium text-ink">{site.legalName}</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] text-muted">Company number</dt>
                <dd className="font-medium text-ink tnum">{site.companyNumber}</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] text-muted">Incorporated in</dt>
                <dd className="font-medium text-ink">{site.incorporatedIn}</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] text-muted">Working hours</dt>
                <dd className="font-medium text-ink">{site.hours}</dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-[0.9375rem] leading-relaxed">
              Ready to start? The form takes about two minutes and tells us which lines to pull pricing on
              before we speak.
            </p>
            <Button href="/get-audit" className="mt-5 w-fit" size="lg">
              Get your free audit
              <Icons.arrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      <Faq />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
