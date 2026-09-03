"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { primaryNav, site } from "@/lib/site";
import { clsx } from "@/lib/utils";

type Child = { label: string; href: string; blurb?: string };

export function MobileNav({
  open,
  onClose,
  sectorLinks,
}: {
  open: boolean;
  onClose: () => void;
  sectorLinks: Child[];
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={clsx("fixed inset-0 z-[60] lg:hidden", open ? "visible" : "invisible")}
      aria-hidden={!open}
    >
      <div
        className={clsx(
          "absolute inset-0 bg-ink/45 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={clsx(
          "absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col bg-white shadow-float transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-5">
          <Logo />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-sand"
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <ul className="space-y-0.5">
            {primaryNav.map((item) => {
              const children = item.label === "Sectors" ? sectorLinks : item.children;
              if (!children) {
                return (
                  <li key={item.href}>
                    <Link href={item.href} className="block rounded-[10px] px-3 py-3 text-[1.0625rem] font-medium text-ink hover:bg-sand">
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const isOpen = expanded === item.label;
              return (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between rounded-[10px] px-3 py-3 text-[1.0625rem] font-medium text-ink hover:bg-sand"
                  >
                    {item.label}
                    <Icons.chevronDown className={clsx("h-5 w-5 text-muted transition-transform duration-200", isOpen && "rotate-180")} />
                  </button>
                  <div className={clsx("grid transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <ul className="overflow-hidden">
                      {children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            tabIndex={isOpen ? 0 : -1}
                            className="block rounded-[10px] py-2.5 pr-3 pl-6 text-[0.9375rem] text-body hover:bg-sand hover:text-ink"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={item.href}
                          tabIndex={isOpen ? 0 : -1}
                          className="block rounded-[10px] py-2.5 pr-3 pl-6 text-[0.9375rem] font-medium text-teal-600"
                        >
                          View all {item.label.toLowerCase()}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              );
            })}
            <li>
              <Link href="/contact" className="block rounded-[10px] px-3 py-3 text-[1.0625rem] font-medium text-ink hover:bg-sand">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-line bg-sand p-5">
          <Button href="/get-audit" size="lg" className="w-full">
            Get your free audit
          </Button>
          <a
            href={site.phone.href}
            className="flex items-center justify-center gap-2 rounded-pill border border-line bg-white py-3 text-[0.9375rem] font-medium text-ink"
          >
            <Icons.phone className="h-4 w-4 text-teal-600" />
            {site.phone.display}
          </a>
          <p className="text-center text-[0.75rem] text-muted">{site.hours}</p>
        </div>
      </div>
    </div>
  );
}
