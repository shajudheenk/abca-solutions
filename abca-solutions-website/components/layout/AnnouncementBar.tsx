"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { useStoredString } from "@/lib/hooks";

const STORAGE_KEY = "abca.announcement.v1";

export function AnnouncementBar() {
  const dismissedInStorage = useStoredString(STORAGE_KEY, "session") === "dismissed";
  const [dismissedNow, setDismissedNow] = useState(false);

  if (dismissedInStorage || dismissedNow) return null;

  return (
    <div className="relative bg-ink-2 text-white/85">
      <div className="mx-auto flex max-w-[76rem] items-center justify-center gap-3 px-5 py-2.5 pr-12 sm:px-8 sm:pr-14">
        <p className="text-center text-[0.8125rem] leading-snug">
          <span className="font-medium text-white">
            £{site.offers.referralBonus} for every business you refer
          </span>
          <span className="mx-2 hidden text-white/30 sm:inline">/</span>
          <br className="sm:hidden" />
          <span className="text-white/70">
            Audit {site.offers.bundleServices} or more services and we prioritise your report.
          </span>{" "}
          <Link
            href="/partners"
            className="whitespace-nowrap font-medium text-teal-100 underline underline-offset-4 hover:text-white"
          >
            How referrals work
          </Link>
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          setDismissedNow(true);
          try {
            window.sessionStorage.setItem(STORAGE_KEY, "dismissed");
          } catch {
            /* storage unavailable — dismissal lasts for this page view */
          }
        }}
        className="absolute top-1/2 right-3 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white sm:right-5"
        aria-label="Dismiss announcement"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  );
}
