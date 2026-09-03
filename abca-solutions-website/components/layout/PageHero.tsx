import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icons } from "@/components/ui/Icon";

export type Crumb = { name: string; path: string };

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  aside,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="dark-surface relative overflow-hidden border-b border-line-dark bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_100%_at_85%_0%,rgba(18,165,148,0.18),transparent_60%)]"
      />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="text-white/25">
                    /
                  </span>
                  {i === crumbs.length - 1 ? (
                    <span className="text-white/75" aria-current="page">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.path} className="transition-colors hover:text-white">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
          <div className="relative max-w-2xl">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h1 className="text-[2.25rem] leading-[1.06] font-semibold tracking-[-0.033em] text-white sm:text-display-2">
              {title}
            </h1>
            {lead && <p className="mt-5 text-lead text-white/68">{lead}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside ? (
            <div className="lg:justify-self-end">{aside}</div>
          ) : (
            /* Quiet ledger rules, so a hero without a panel still has a
               right-hand composition rather than an empty half. */
            <div aria-hidden="true" className="hidden lg:block lg:justify-self-end lg:pb-2">
              <div className="w-[18rem] space-y-3.5">
                {[68, 100, 84, 52, 92, 40].map((w, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="h-px flex-1 bg-white/10" />
                    <span
                      className="h-[3px] rounded-full"
                      style={{
                        width: `${w * 0.9}px`,
                        background: i === 2 ? "var(--color-teal)" : "rgba(255,255,255,0.14)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export function InlineArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-teal-600">
      {children}
      <Icons.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
