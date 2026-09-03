import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/content/process";

export function Process({ tone = "white" }: { tone?: "white" | "sand" }) {
  return (
    <Section id="how-it-works" tone={tone}>
      <SectionHeader
        eyebrow="How it works"
        title="Four steps, and only one of them is yours."
        lead="No discovery call, no qualification process. You send bills; we send a document."
      />

      <ol className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 70} className="relative bg-white p-7 lg:p-8">
            <div className="flex items-center justify-between">
              <span className="text-[0.75rem] font-semibold tracking-[0.12em] text-teal-600 uppercase">
                {step.day}
              </span>
              <span className="font-[family-name:var(--font-display)] text-[2.25rem] leading-none font-semibold text-line">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-6 text-h3">{step.title}</h3>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed">{step.detail}</p>
            <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] text-muted">{step.aside}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
