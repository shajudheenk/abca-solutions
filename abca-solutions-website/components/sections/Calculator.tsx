"use client";

import { useId, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { formatGBP } from "@/lib/utils";

/**
 * Card fee calculator.
 *
 * Deliberately does not invent a "market rate": the comparison rate is an
 * input the visitor controls, so every figure on screen is arithmetic on
 * numbers they entered. The default comparison rate is labelled as an
 * illustration, not a quote.
 */

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  hint?: string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.875rem] font-medium text-ink">
          {label}
        </label>
        <output htmlFor={id} className="font-[family-name:var(--font-display)] text-[1.05rem] font-semibold text-ink tnum">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-[var(--color-teal)]"
      />
      {hint && <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}

export function Calculator() {
  const [turnover, setTurnover] = useState(25_000);
  const [current, setCurrent] = useState(1.75);
  const [target, setTarget] = useState(1.2);

  const result = useMemo(() => {
    const annual = turnover * 12;
    const now = annual * (current / 100);
    const then = annual * (target / 100);
    return { annual, now, then, delta: now - then };
  }, [turnover, current, target]);

  return (
    <div className="overflow-hidden rounded-card border border-line bg-white shadow-raise">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div className="space-y-8 p-7 sm:p-9">
          <Slider
            label="Monthly card turnover"
            value={turnover}
            onChange={(v) => setTurnover(clamp(v, 1000, 500_000))}
            min={1000}
            max={250_000}
            step={1000}
            format={(v) => formatGBP(v)}
            hint="The value you process through card terminals each month, not total sales."
          />
          <Slider
            label="Your current effective rate"
            value={current}
            onChange={(v) => setCurrent(clamp(v, 0.2, 5))}
            min={0.4}
            max={4}
            step={0.01}
            format={(v) => `${v.toFixed(2)}%`}
            hint="Total charges on your last statement ÷ total turnover × 100. Not the headline rate you were quoted."
          />
          <Slider
            label="Comparison rate"
            value={target}
            onChange={(v) => setTarget(clamp(v, 0.2, 5))}
            min={0.3}
            max={3}
            step={0.01}
            format={(v) => `${v.toFixed(2)}%`}
            hint="Set this to any rate you want to test against. It is not a quote from ABCA — your audit gives you real figures from our panel."
          />
        </div>

        <div className="dark-surface flex flex-col justify-between bg-ink p-7 text-white/70 sm:p-9">
          <div className="space-y-6">
            <div>
              <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-white/60 uppercase">
                At {current.toFixed(2)}%
              </p>
              <p className="mt-1.5 font-[family-name:var(--font-display)] text-[1.75rem] leading-none font-semibold text-white tnum">
                {formatGBP(result.now)}
                <span className="ml-1.5 text-[0.875rem] font-normal text-white/60">/ year</span>
              </p>
            </div>
            <div>
              <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-white/60 uppercase">
                At {target.toFixed(2)}%
              </p>
              <p className="mt-1.5 font-[family-name:var(--font-display)] text-[1.75rem] leading-none font-semibold text-white tnum">
                {formatGBP(result.then)}
                <span className="ml-1.5 text-[0.875rem] font-normal text-white/60">/ year</span>
              </p>
            </div>
            <div className="rounded-[10px] bg-teal/15 p-5">
              <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-teal uppercase">
                {result.delta >= 0 ? "Difference per year" : "Costs more per year"}
              </p>
              <p className="mt-1.5 font-[family-name:var(--font-display)] text-[2.25rem] leading-none font-semibold text-white tnum">
                {formatGBP(Math.abs(result.delta))}
              </p>
              <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-white/55">
                On {formatGBP(result.annual)} of annual card turnover. Arithmetic only — your audit uses your
                actual statement.
              </p>
            </div>
          </div>

          <Button href="/get-audit" className="mt-8 w-full">
            Get your real numbers
            <Icons.arrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
