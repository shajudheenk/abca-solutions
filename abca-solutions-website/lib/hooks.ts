"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Reads a string from browser storage without a setState-in-effect hydration
 * dance: the server snapshot is null, the client snapshot is the stored value,
 * and React swaps them during hydration.
 */
export function useStoredString(key: string, area: "local" | "session" = "local") {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      try {
        return (area === "local" ? window.localStorage : window.sessionStorage).getItem(key);
      } catch {
        return null;
      }
    },
    () => null,
  );
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 8) {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > threshold,
    () => false,
  );
}
