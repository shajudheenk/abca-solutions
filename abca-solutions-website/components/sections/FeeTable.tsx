import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { feePrinciples, feeRows } from "@/content/fees";

export function FeeTable({ compact = false }: { compact?: boolean }) {
  return (
    <Section id="our-fees" tone="ink">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="Our fees"
            tone="dark"
            title="You never pay us. Here is who does."
            lead="Brokers are paid by suppliers. That is the model, and there is nothing wrong with it — the problem is that almost nobody tells you the number. We publish how we are paid on every category, and the pound figure on every line of your report."
          />
          {!compact && (
            <div className="mt-8">
              <Button href="/our-fees" variant="onDark">
                Read the full disclosure
                <Icons.arrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-card border border-line-dark bg-ink-2/50">
            <table className="w-full text-left text-[0.875rem]">
              <caption className="sr-only">How ABCA Solutions is paid, by service category</caption>
              <thead>
                <tr className="border-b border-line-dark">
                  <th scope="col" className="px-5 py-4 text-[0.6875rem] font-semibold tracking-[0.12em] text-white/60 uppercase sm:px-6">
                    Category
                  </th>
                  <th scope="col" className="px-5 py-4 text-[0.6875rem] font-semibold tracking-[0.12em] text-white/60 uppercase sm:px-6">
                    How we are paid
                  </th>
                  <th scope="col" className="hidden px-5 py-4 text-[0.6875rem] font-semibold tracking-[0.12em] text-white/60 uppercase sm:table-cell sm:px-6">
                    When
                  </th>
                </tr>
              </thead>
              <tbody>
                {feeRows.map((row) => (
                  <tr key={row.category} className="border-b border-line-dark/60 last:border-0">
                    <th scope="row" className="px-5 py-4 align-top font-medium whitespace-nowrap text-white sm:px-6">
                      {row.category}
                    </th>
                    <td className="px-5 py-4 align-top text-white/65 sm:px-6">
                      {row.mechanism}
                      {row.range && (
                        <span className="mt-1.5 block font-medium text-teal tnum">{row.range}</span>
                      )}
                      {!row.range && (
                        <span className="mt-1.5 block text-white/55">Stated in £ per year on your report</span>
                      )}
                      <span className="mt-1.5 block text-white/55 sm:hidden">{row.timing}</span>
                    </td>
                    <td className="hidden px-5 py-4 align-top text-white/50 sm:table-cell sm:px-6">{row.timing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {feePrinciples.slice(0, compact ? 4 : 2).map((p) => (
              <li key={p.title} className="flex gap-3">
                <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <div>
                  <p className="text-[0.9375rem] font-medium text-white">{p.title}</p>
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-white/60">{p.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
