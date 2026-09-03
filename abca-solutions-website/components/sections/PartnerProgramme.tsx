import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { site } from "@/lib/site";

const tracks = [
  {
    icon: Icons.users,
    eyebrow: "For professional firms",
    title: "Referral partners",
    body: "Accountants, bookkeepers, IT providers and business consultants who already see their clients' overheads. You introduce; we audit; you get a report your client thanks you for.",
    points: [
      `£${site.offers.referralBonus} per introduction that becomes an audit`,
      "Your client sees the same commission disclosure they would see direct",
      "White-labelled report available on request",
      "No exclusivity, no minimum volume, no contract",
    ],
    cta: { label: "Become a referral partner", href: "/partners#referral" },
  },
  {
    icon: Icons.coins,
    eyebrow: "For self-employed agents",
    title: "Field agents",
    body: "Experienced merchant services and energy agents who want a panel to quote from and a report that opens doors. You own the relationship; we do the analysis and the paperwork.",
    points: [
      "Uncapped commission on your own book",
      "Full acquirer and supplier panel to quote across",
      "Audit reports produced for you, in your client's name",
      "Renewal diary managed centrally, leads returned to you",
    ],
    cta: { label: "Apply as an agent", href: "/partners#agents" },
  },
];

export function PartnerProgramme() {
  return (
    <Section id="partner-programme" tone="sand">
      <SectionHeader
        eyebrow="Work with us"
        title="Two ways to earn from the audit."
        lead="Both are built on the same thing: a document your client keeps, whether or not anybody switches."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {tracks.map((t, i) => {
          const Icon = t.icon;
          return (
            <Reveal key={t.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-card border border-line bg-white p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-[9px] bg-teal-100 text-teal-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="eyebrow">{t.eyebrow}</span>
                </div>
                <h3 className="mt-6 text-h3">{t.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed">{t.body}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[0.9375rem]">
                      <Icons.check className="mt-1 h-4 w-4 shrink-0 text-teal-600" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Button href={t.cta.href} variant="ghost" className="mt-8 w-fit">
                  {t.cta.label}
                  <Icons.arrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
