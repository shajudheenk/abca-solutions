import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="dark-surface bg-ink">
      <Container className="py-20 sm:py-28">
        <p className="eyebrow">404</p>
        <h1 className="mt-5 max-w-2xl text-[2.25rem] leading-[1.06] font-semibold tracking-[-0.033em] text-white sm:text-display-2">
          That page has moved, or never existed.
        </h1>
        <p className="mt-5 max-w-lg text-lead text-white/65">
          Nothing is broken on your end. Try one of the pages below, or start an audit and skip the browsing.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/get-audit" size="lg">
            Get your free audit
            <Icons.arrowRight className="h-4 w-4" />
          </Button>
          <Button href="/" variant="onDark" size="lg">
            Back to the homepage
          </Button>
        </div>

        <div className="mt-16 grid gap-10 border-t border-line-dark pt-10 sm:grid-cols-2">
          <div>
            <h2 className="text-[0.75rem] font-semibold tracking-[0.14em] text-white/60 uppercase">
              What we audit
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/what-we-audit/${s.slug}`}
                    className="inline-flex rounded-pill border border-line-dark px-3.5 py-1.5 text-[0.8125rem] text-white/70 transition-colors hover:border-teal hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[0.75rem] font-semibold tracking-[0.14em] text-white/60 uppercase">Sectors</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/sectors/${s.slug}`}
                    className="inline-flex rounded-pill border border-line-dark px-3.5 py-1.5 text-[0.8125rem] text-white/70 transition-colors hover:border-teal hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
