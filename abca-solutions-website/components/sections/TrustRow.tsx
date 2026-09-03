import { Icons } from "@/components/ui/Icon";
import { site } from "@/lib/site";

const items = [
  {
    icon: Icons.building,
    title: `Company no. ${site.companyNumber}`,
    detail: `Registered in ${site.incorporatedIn}`,
  },
  {
    icon: Icons.lock,
    title: "ICO registered",
    detail: site.ico.reference
      ? `Data controller · ${site.ico.reference}`
      : "Registered data controller",
  },
  {
    icon: Icons.coins,
    title: "Commission disclosed",
    detail: "In pounds, on every line",
  },
  {
    icon: Icons.clock,
    title: site.responsePromise,
    detail: site.hours,
  },
];

export function TrustRow() {
  return (
    <section aria-label="Company credentials" className="border-b border-line bg-white">
      <div className="mx-auto max-w-[76rem] sm:px-8">
        <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
        {items.map(({ icon: Icon, title, detail }) => (
          <div key={title} className="flex items-start gap-3 bg-white px-5 py-6 sm:px-6">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
            <div className="min-w-0">
              <p className="text-[0.875rem] leading-snug font-medium text-ink">{title}</p>
              <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted">{detail}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
