import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export function CtaBand({
  title = "Send us three bills. Keep the report either way.",
  lead = "It takes about five minutes at your end. Nothing is chargeable, nothing auto-renews, and nobody calls you unless you ask.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="dark-surface relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_80%_50%,rgba(18,165,148,0.22),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
          <div>
            <h2 className="max-w-xl text-[1.875rem] leading-[1.12] font-semibold tracking-[-0.03em] text-white sm:text-h2">
              {title}
            </h2>
            <p className="mt-5 max-w-lg text-lead text-white/65">{lead}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <Button href="/get-audit" size="lg">
              Get your free audit
              <Icons.arrowRight className="h-4 w-4" />
            </Button>
            <Button href={site.phone.href} variant="onDark" size="lg">
              <Icons.phone className="h-4 w-4" />
              {site.phone.display}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
