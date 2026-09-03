import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PartnerProgramme } from "@/components/sections/PartnerProgramme";
import { PartnerMarquee } from "@/components/sections/PartnerMarquee";
import { CtaBand } from "@/components/sections/CtaBand";
import { Icons } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Partner programme — referrals and agents",
  description: `Accountants, bookkeepers and IT firms earn £${site.offers.referralBonus} per introduction. Self-employed agents get a full panel to quote across and audits produced for them.`,
  path: "/partners",
});

const referralSteps = [
  { title: "Introduce", detail: "Email us the business name and a contact, or copy us into a message. That is the whole process." },
  { title: "We audit", detail: "Your client sends bills to us directly. They see the same commission disclosure any client sees." },
  { title: "You get paid", detail: `£${site.offers.referralBonus} per introduction that becomes a completed audit, paid monthly. No clawbacks.` },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner programme"
        title="Your clients' overheads, audited properly."
        lead="Two ways to work with us: introduce clients and get paid per audit, or run your own book on our panel with the analysis done for you."
        crumbs={[{ name: "Partners", path: "/partners" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={`mailto:${site.email.general}?subject=Partner%20programme`} size="lg">
            Email the partner team
            <Icons.arrowRight className="h-4 w-4" />
          </Button>
          <Button href={site.phone.href} variant="onDark" size="lg">
            <Icons.phone className="h-4 w-4" />
            {site.phone.display}
          </Button>
        </div>
      </PageHero>

      <PartnerProgramme />

      <Section tone="white" id="referral">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <SectionHeader
            eyebrow="Referral partners"
            title="Three steps, and one of them is yours."
            lead="Built for firms who already have the trust and do not want a sales process attached to it."
          />
          <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
            {referralSteps.map((s, i) => (
              <li key={s.title} className="bg-white p-6">
                <span className="font-[family-name:var(--font-display)] text-[1.75rem] leading-none font-semibold text-line">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[1.0625rem] font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed">{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="sand" id="agents">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <SectionHeader
            eyebrow="Field agents"
            title="Bring the relationships. We bring the panel and the paperwork."
            lead="If you already sell merchant services or energy, the audit is a considerably easier first conversation than a rate pitch."
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Icons.coins, t: "Uncapped commission", d: "You keep your own book. Commission is paid on what you write, with no cap and no house accounts." },
              { icon: Icons.doc, t: "Audits written for you", d: "Send us the bills; we produce the report in your client's name and you present it." },
              { icon: Icons.card, t: "Full acquirer panel", d: "Quote across every acquirer we hold an agreement with rather than one preferred supplier." },
              { icon: Icons.calendar, t: "Renewals managed", d: "Every end date is diarised centrally and the lead comes back to you 90 days out." },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="rounded-card border border-line bg-white p-6">
                <Icon className="h-5 w-5 text-teal-600" />
                <h3 className="mt-4 text-[1rem] font-semibold text-ink">{t}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <PartnerMarquee
        heading="The panel you would quote across"
        lead="Card payments are quoted across every acquirer we hold an agreement with."
      />
      <CtaBand
        title="Tell us what you already sell."
        lead="A five-minute call is enough to work out whether the referral route or the agent route fits what you do."
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Partners", path: "/partners" },
        ])}
      />
    </>
  );
}
