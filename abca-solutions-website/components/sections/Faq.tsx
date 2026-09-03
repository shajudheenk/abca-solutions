import { Section, SectionHeader } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { faqs } from "@/content/faqs";
import { site } from "@/lib/site";

export function Faq() {
  return (
    <Section id="faqs" tone="white">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader eyebrow="Questions" title="The things people ask first." />
          <div className="mt-8 rounded-card border border-line bg-sand p-6">
            <p className="text-[0.9375rem] leading-relaxed text-ink">
              Something not covered here? Call and ask. No form first.
            </p>
            <Button href={site.phone.href} variant="ghost" className="mt-4">
              <Icons.phone className="h-4 w-4 text-teal-600" />
              {site.phone.display}
            </Button>
          </div>
        </div>
        <Accordion items={faqs} />
      </div>
    </Section>
  );
}
