import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icons } from "@/components/ui/Icon";

const points = [
  {
    icon: Icons.doc,
    title: "You get a document, not a callback",
    body: "Comparison sites take your details and return a phone call. We read your bills and hand you a written audit you can take to anyone — including another broker.",
  },
  {
    icon: Icons.coins,
    title: "Our commission is on the page",
    body: "Every recommendation carries the pound figure we would earn from it. Not a percentage, not a range, and not on request. It is printed next to the saving.",
  },
  {
    icon: Icons.calendar,
    title: "We hold your renewal dates",
    body: "Most overpayment happens because a contract quietly rolled over. Every end date we find goes in the diary, and we come back 90 days before it — the only window where moving is realistic.",
  },
  {
    icon: Icons.factory,
    title: "We work from your sector's profile",
    body: "A takeaway and an industrial unit are audited differently because their costs behave differently. We start from the load and transaction profile, not a generic checklist.",
  },
];

export function WhyAbca() {
  return (
    <Section tone="white">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <SectionHeader
          eyebrow="Why ABCA"
          title="Four things a comparison site will not do."
          lead="We are not trying to be a faster quote form. We are trying to be the only party in the transaction that shows you its own margin."
        />
        <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal as="li" key={p.title} delay={i * 60} className="bg-white p-7">
                <Icon className="h-5 w-5 text-teal-600" />
                <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed">{p.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
