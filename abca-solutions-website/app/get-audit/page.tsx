import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { AuditForm } from "@/components/forms/AuditForm";
import { Icons } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { processSteps } from "@/content/process";

export const metadata = pageMetadata({
  title: "Get your free business cost audit",
  description:
    "Tell us about your business and which overheads to review. Written audit within 7 working days, commission disclosed in pounds, no fee and no obligation.",
  path: "/get-audit",
});

export default function GetAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Free cost audit"
        title="Start your audit."
        lead={`Two minutes now, a written report within ${site.turnaroundDays} working days. You are never invoiced by ABCA, and the report is yours whether you act on it or not.`}
        crumbs={[{ name: "Get your audit", path: "/get-audit" }]}
      />

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-12">
          <AuditForm />

          <aside className="space-y-4">
            <div className="rounded-card border border-line bg-white p-7">
              <h2 className="text-[0.75rem] font-semibold tracking-[0.14em] text-muted uppercase">
                What happens next
              </h2>
              <ol className="mt-5 space-y-5">
                {processSteps.slice(0, 3).map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-100 text-[0.75rem] font-semibold text-teal-600 tnum">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-medium text-ink">{s.title}</span>
                      <span className="mt-1 block text-[0.875rem] leading-relaxed">{s.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-card border border-line bg-white p-7">
              <Icons.lock className="h-5 w-5 text-teal-600" />
              <h2 className="mt-4 text-[1rem] font-semibold text-ink">Your documents stay private</h2>
              <p className="mt-2 text-[0.875rem] leading-relaxed">
                Bills go to encrypted storage readable only by the consultant on your audit. We delete them on
                request, never sell data, and never pass anything to a supplier without your say-so.
              </p>
            </div>

            <div className="rounded-card border border-line bg-ink p-7 dark-surface">
              <Icons.phone className="h-5 w-5 text-teal" />
              <h2 className="mt-4 text-[1rem] font-semibold text-white">Rather just talk?</h2>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-white/65">
                {site.hours}. No script, no qualification questions.
              </p>
              <a href={site.phone.href} className="mt-4 inline-flex text-[1.0625rem] font-semibold text-white underline underline-offset-4">
                {site.phone.display}
              </a>
            </div>
          </aside>
        </div>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Get your audit", path: "/get-audit" },
        ])}
      />
    </>
  );
}
