import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { site } from "@/lib/site";

const HeroScene = dynamic(() => import("./HeroScene"));

const points = [
  "You are never invoiced by ABCA",
  `Written report in ${site.turnaroundDays} working days`,
  "Our commission shown in pounds",
];

/** Static composition shown before the WebGL scene mounts, and in its place
 *  on small/touch screens and for prefers-reduced-motion. */
function SceneFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden">
      <div className="relative h-[clamp(18rem,34vw,26rem)] w-[clamp(13rem,25vw,19rem)]">
        <div className="absolute inset-0 -translate-x-[18%] -rotate-[9deg] rounded-[10px] border border-white/10 bg-white/[0.06]" />
        <div className="absolute inset-0 translate-x-[16%] rotate-[7deg] rounded-[10px] border border-white/10 bg-white/[0.08]" />
        <div className="absolute inset-0 overflow-hidden rounded-[10px] border border-teal/40 bg-gradient-to-br from-ink-3 to-ink shadow-float">
          <div className="flex items-center gap-2.5 px-5 pt-5">
            <span className="h-4 w-4 rounded-[3px] bg-teal" />
            <span className="text-[0.7rem] font-semibold tracking-[0.12em] text-white">COST AUDIT</span>
          </div>
          <div className="mt-6 space-y-4 px-5">
            {["CARD PAYMENTS", "ELECTRICITY", "GAS", "TELECOMS", "BANKING"].map((l, i) => (
              <div key={l} className="border-b border-white/10 pb-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[0.6rem] tracking-[0.1em] text-white/50">{l}</span>
                  <span className="h-2.5 rounded-[2px] bg-teal" style={{ width: `${34 + i * 9}px` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mx-4 mt-5 rounded-[6px] bg-teal/15 px-4 py-3">
            <p className="text-[0.6rem] tracking-[0.12em] text-white/50">IDENTIFIED PER YEAR</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">£ — — — —</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="dark-surface relative overflow-hidden bg-ink">
      {/* depth wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_78%_35%,rgba(18,165,148,0.20),transparent_62%),radial-gradient(50%_50%_at_10%_0%,rgba(255,107,74,0.10),transparent_60%)]"
      />
      <div className="relative mx-auto grid max-w-[76rem] gap-12 px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-8 lg:pt-24 lg:pb-28">
        <div className="max-w-xl">
          <p className="eyebrow">The business cost audit</p>
          <h1 className="mt-5 text-[2.6rem] leading-[1.03] font-semibold tracking-[-0.035em] text-white sm:text-display-2 lg:text-display-1">
            Most businesses overpay on five bills at once.
          </h1>
          <p className="mt-6 text-lead text-white/70">
            Send us three bills. Within {site.turnaroundDays} working days you get a written audit of what you
            pay for card processing, energy, telecoms and banking — line by line, against the market, with our
            commission disclosed in pounds on every recommendation.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/get-audit" size="lg">
              Get your free audit
              <Icons.arrowRight className="h-4 w-4" />
            </Button>
            <Button href="/how-it-works" variant="onDark" size="lg">
              See how it works
            </Button>
          </div>

          <ul className="mt-9 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-[0.875rem] text-white/60">
                <Icons.check className="h-4 w-4 shrink-0 text-teal" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative -mx-5 h-[22rem] sm:mx-0 sm:h-[26rem] lg:h-[31rem]">
          <HeroScene fallback={<SceneFallback />} />
        </div>
      </div>
    </section>
  );
}
