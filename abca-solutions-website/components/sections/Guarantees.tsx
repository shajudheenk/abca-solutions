import { Icons } from "@/components/ui/Icon";
import { guarantees } from "@/content/process";

const icons = [Icons.clock, Icons.coins, Icons.doc, Icons.calendar];

export function Guarantees() {
  return (
    <section className="border-y border-line-dark bg-ink-2">
      <div className="dark-surface mx-auto grid max-w-[76rem] gap-px bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
        {guarantees.map((g, i) => {
          const Icon = icons[i];
          return (
            <div key={g.title} className="bg-ink-2 px-6 py-8 sm:px-8">
              <Icon className="h-5 w-5 text-teal" />
              <h3 className="mt-4 text-[1rem] font-semibold text-white">{g.title}</h3>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-white/60">{g.detail}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
