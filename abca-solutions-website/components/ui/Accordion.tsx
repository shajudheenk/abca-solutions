"use client";

import { useId, useState } from "react";
import { Icons } from "./Icon";
import { clsx } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

export function Accordion({ items, tone = "light" }: { items: AccordionItem[]; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={clsx("divide-y", tone === "dark" ? "divide-line-dark" : "divide-line")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={clsx(
                  "flex w-full items-start justify-between gap-6 py-5 text-left transition-colors",
                  tone === "dark" ? "text-white hover:text-teal" : "text-ink hover:text-teal-600",
                )}
              >
                <span className="text-[1.0625rem] font-medium tracking-[-0.01em]">{item.q}</span>
                <Icons.chevronDown
                  className={clsx(
                    "mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300",
                    isOpen && "rotate-180",
                    tone === "dark" ? "text-white/60" : "text-muted",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={clsx(
                "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={clsx(
                    "max-w-2xl pr-10 pb-6 text-[0.9375rem] leading-relaxed",
                    tone === "dark" ? "text-white/65" : "text-body",
                  )}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
