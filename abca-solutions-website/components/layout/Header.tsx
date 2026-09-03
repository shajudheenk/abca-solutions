"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { primaryNav, site } from "@/lib/site";
import { sectors } from "@/content/sectors";
import { clsx } from "@/lib/utils";
import { useScrolled } from "@/lib/hooks";
import { MobileNav } from "./MobileNav";

const sectorLinks = sectors.map((s) => ({ label: s.name, href: `/sectors/${s.slug}`, blurb: s.summary }));

export function Header() {
  const pathname = usePathname();
  // Menu state is stamped with the route it was opened on, so navigating
  // closes it during render rather than through an effect.
  const [menu, setMenu] = useState<{ path: string; open: string | null; mobile: boolean }>({
    path: pathname,
    open: null,
    mobile: false,
  });
  const current = menu.path === pathname ? menu : { path: pathname, open: null, mobile: false };
  const openMenu = current.open;
  const mobileOpen = current.mobile;
  const setOpenMenu = (open: string | null) => setMenu({ path: pathname, open, mobile: false });
  const setMobileOpen = (mobile: boolean) => setMenu({ path: pathname, open: null, mobile });

  const scrolled = useScrolled(8);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu({ path: pathname, open: null, mobile: false });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [pathname]);

  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <div className="hidden border-b border-line bg-sand lg:block">
        <div className="mx-auto flex max-w-[76rem] items-center justify-between px-8 py-2 text-[0.8125rem] text-muted">
          <p className="flex items-center gap-2">
            <Icons.clock className="h-4 w-4 text-teal-600" />
            {site.hours} · {site.responsePromise}
          </p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${site.email.general}`} className="flex items-center gap-2 transition-colors hover:text-ink">
              <Icons.mail className="h-4 w-4 text-teal-600" />
              {site.email.general}
            </a>
            <a href={site.phone.href} className="flex items-center gap-2 font-medium text-ink transition-colors hover:text-teal-600">
              <Icons.phone className="h-4 w-4 text-teal-600" />
              {site.phone.display}
            </a>
          </div>
        </div>
      </div>

      <header
        className={clsx(
          "sticky top-0 z-50 border-b bg-white/92 backdrop-blur-md transition-[border-color,box-shadow] duration-300",
          scrolled ? "border-line shadow-[0_1px_0_rgba(11,31,38,0.04),0_10px_30px_-24px_rgba(11,31,38,0.5)]" : "border-transparent",
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-[76rem] items-center justify-between gap-4 px-5 sm:px-8">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const children = item.label === "Sectors" ? sectorLinks : item.children;
                const active = isActive(item.href);
                if (!children) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={clsx(
                          "rounded-pill px-3 py-2 text-[0.9rem] transition-colors",
                          active ? "text-ink" : "text-body hover:text-ink",
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const open = openMenu === item.label;
                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenMenu(item.label);
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      className={clsx(
                        "flex items-center gap-1 rounded-pill px-3 py-2 text-[0.9rem] transition-colors",
                        active || open ? "text-ink" : "text-body hover:text-ink",
                      )}
                      aria-expanded={open}
                      aria-haspopup="true"
                      onClick={() => setOpenMenu(open ? null : item.label)}
                    >
                      {item.label}
                      <Icons.chevronDown className={clsx("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
                    </button>
                    <div
                      className={clsx(
                        "absolute top-[calc(100%+10px)] left-1/2 w-[30rem] -translate-x-1/2 origin-top rounded-card border border-line bg-white p-2 shadow-float transition-[opacity,transform] duration-200",
                        open ? "visible opacity-100" : "invisible -translate-y-1 opacity-0",
                      )}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      <ul className="grid grid-cols-2 gap-0.5">
                        {children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              tabIndex={open ? 0 : -1}
                              className="block rounded-[10px] px-3 py-2.5 transition-colors hover:bg-sand"
                            >
                              <span className="block text-[0.875rem] font-medium text-ink">{child.label}</span>
                              {child.blurb && (
                                <span className="mt-0.5 block text-[0.78rem] leading-snug text-muted">{child.blurb}</span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={item.href}
                        tabIndex={open ? 0 : -1}
                        className="mt-1 flex items-center gap-1.5 rounded-[10px] px-3 py-2.5 text-[0.8125rem] font-medium text-teal-600 transition-colors hover:bg-teal-50"
                      >
                        View all {item.label.toLowerCase()}
                        <Icons.arrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phone.href}
              className="hidden h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-sand sm:grid lg:hidden"
              aria-label={`Call ${site.phone.display}`}
            >
              <Icons.phone className="h-4 w-4 text-teal-600" />
            </a>
            <span className="hidden min-[400px]:block">
              <Button href="/get-audit" size="md" className="max-lg:h-10 max-lg:px-4 max-lg:text-[0.875rem]">
                <span className="lg:hidden">Free audit</span>
                <span className="max-lg:hidden">Get your free audit</span>
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-sand lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} sectorLinks={sectorLinks} />
    </>
  );
}
