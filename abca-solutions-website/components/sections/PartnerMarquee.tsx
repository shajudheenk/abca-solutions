import Image from "next/image";
import { partners } from "@/content/partners";

/**
 * Sliding provider panel. Duplicated once so the CSS translate loop is
 * seamless; the duplicate is aria-hidden so screen readers hear one list.
 */
function Wordmark({ name, logo }: { name: string; logo?: string }) {
  return (
    <div className="flex h-11 shrink-0 items-center justify-center px-8 sm:px-10">
      {logo ? (
        <Image
          src={logo}
          alt={name}
          width={140}
          height={36}
          className="h-8 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        <span className="font-[family-name:var(--font-display)] text-[1.35rem] font-semibold tracking-[-0.03em] whitespace-nowrap text-ink/40 transition-colors duration-300 hover:text-ink">
          {name}
        </span>
      )}
    </div>
  );
}

export function PartnerMarquee({
  heading = "Our partners",
  lead = "We hold agreements with the acquirers below, and quote across all of them on every card payments audit.",
}: {
  heading?: string;
  lead?: string;
}) {
  const row = [...partners, ...partners];

  return (
    <section aria-labelledby="partners-heading" className="border-b border-line bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 id="partners-heading" className="eyebrow">
            {heading}
          </h2>
          <p className="max-w-lg text-[0.875rem] text-muted">{lead}</p>
        </div>
      </div>

      <div className="marquee mask-fade-x relative mt-9 flex overflow-hidden">
        <ul className="marquee-track flex w-max items-center" style={{ ["--marquee-duration" as string]: "44s" }}>
          {row.map((p, i) => (
            <li key={`${p.id}-${i}`} aria-hidden={i >= partners.length}>
              <Wordmark name={p.name} logo={p.logo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
