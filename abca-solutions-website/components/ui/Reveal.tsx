"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "@/lib/utils";

/**
 * Scroll reveal. Renders content immediately (no CLS, no hidden content for
 * crawlers or reduced-motion users) and only animates opacity/transform.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: As = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // prefers-reduced-motion is handled entirely in CSS (globals.css), which
    // neutralises .reveal regardless of this flag.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <As
      ref={ref as never}
      className={clsx("reveal", className)}
      data-shown={shown}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </As>
  );
}
