import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icons } from "@/components/ui/Icon";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dark-surface bg-ink text-white/65">
      <div className="mx-auto max-w-[76rem] px-5 pt-16 pb-10 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2.4fr)]">
          <div>
            <Logo tone="dark" showTagline />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed">
              We audit what your business pays for card processing, energy, telecoms and banking — then
              show you the market rate and our commission, in pounds, on the same page.
            </p>
            <div className="mt-7 space-y-3 text-[0.9375rem]">
              <a href={site.phone.href} className="flex items-center gap-3 text-white transition-colors hover:text-teal">
                <Icons.phone className="h-4 w-4 shrink-0 text-teal" />
                {site.phone.display}
              </a>
              <a href={`mailto:${site.email.general}`} className="flex items-center gap-3 transition-colors hover:text-white">
                <Icons.mail className="h-4 w-4 shrink-0 text-teal" />
                {site.email.general}
              </a>
              <p className="flex items-center gap-3">
                <Icons.clock className="h-4 w-4 shrink-0 text-teal" />
                {site.hours}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.75rem] font-semibold tracking-[0.14em] text-white/60 uppercase">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[0.875rem] transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-card border border-line-dark bg-ink-2/60 p-6">
          <h2 className="text-[0.75rem] font-semibold tracking-[0.14em] text-white/60 uppercase">
            Regulatory &amp; company information
          </h2>
          <div className="mt-4 grid gap-5 text-[0.8125rem] leading-relaxed sm:grid-cols-2">
            <p>
              <strong className="font-medium text-white/90">{site.legalName}</strong> is a company registered in{" "}
              {site.incorporatedIn}, company number {site.companyNumber}.
            </p>
            <p>
              Registered with the Information Commissioner&rsquo;s Office as a data controller
              {site.ico.reference ? ` (reference ${site.ico.reference})` : ""}.
            </p>
            <p>
              {site.legalName} is <strong className="font-medium text-white/90">not authorised or regulated by the
              Financial Conduct Authority</strong>. We do not advise on, arrange or recommend insurance or credit.
            </p>
            <p>
              For business insurance and business finance we act as an{" "}
              <strong className="font-medium text-white/90">introducer only</strong>, passing your details to
              authorised firms who deal with you directly.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line-dark pt-8 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/legal/privacy" className="transition-colors hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies" className="transition-colors hover:text-white">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="transition-colors hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/legal/complaints" className="transition-colors hover:text-white">
                Complaints
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
