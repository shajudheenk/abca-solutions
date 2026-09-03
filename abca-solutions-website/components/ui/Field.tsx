"use client";

import { useId } from "react";
import { clsx } from "@/lib/utils";

const inputBase =
  "w-full rounded-[10px] border bg-white px-4 py-3 text-[0.9375rem] text-ink transition-colors placeholder:text-muted/70 focus:outline-none";

function Wrapper({
  label,
  hint,
  error,
  id,
  children,
  required,
}: {
  label: string;
  hint?: string;
  error?: string;
  id: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.875rem] font-medium text-ink">
        {label}
        {!required && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[0.8125rem] font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  label,
  hint,
  error,
  required = true,
  ...props
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Wrapper label={label} hint={hint} error={error} id={id} required={required}>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={clsx(hint && `${id}-hint`, error && `${id}-error`) || undefined}
        className={clsx(inputBase, error ? "border-error focus:border-error" : "border-line focus:border-teal")}
        {...props}
      />
    </Wrapper>
  );
}

export function TextareaField({
  label,
  hint,
  error,
  required = false,
  ...props
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <Wrapper label={label} hint={hint} error={error} id={id} required={required}>
      <textarea
        id={id}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={clsx(hint && `${id}-hint`, error && `${id}-error`) || undefined}
        className={clsx(inputBase, "resize-y", error ? "border-error" : "border-line focus:border-teal")}
        {...props}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  hint,
  error,
  options,
  required = true,
  ...props
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  options: readonly { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Wrapper label={label} hint={hint} error={error} id={id} required={required}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={!!error}
          aria-describedby={clsx(hint && `${id}-hint`, error && `${id}-error`) || undefined}
          className={clsx(
            inputBase,
            "appearance-none pr-11",
            error ? "border-error" : "border-line focus:border-teal",
          )}
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="m6 9.5 6 6 6-6" />
        </svg>
      </div>
    </Wrapper>
  );
}

export function OptionCards({
  legend,
  hint,
  error,
  options,
  value,
  onChange,
  multiple = false,
  columns = 2,
}: {
  legend: string;
  hint?: string;
  error?: string;
  options: readonly { value: string; label: string; description?: string }[];
  value: string[];
  onChange: (next: string[]) => void;
  multiple?: boolean;
  columns?: 1 | 2 | 3;
}) {
  const name = useId();
  const toggle = (v: string) => {
    if (multiple) {
      onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
    } else {
      onChange([v]);
    }
  };

  return (
    <fieldset>
      <legend className="text-[0.875rem] font-medium text-ink">{legend}</legend>
      {hint && <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{hint}</p>}
      <div
        className={clsx(
          "mt-3 grid gap-2.5",
          columns === 1 && "grid-cols-1",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {options.map((o) => {
          const checked = value.includes(o.value);
          return (
            <label
              key={o.value}
              className={clsx(
                "flex cursor-pointer items-start gap-3 rounded-[10px] border p-4 transition-colors",
                checked ? "border-teal bg-teal-50" : "border-line bg-white hover:border-ink/20",
              )}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => toggle(o.value)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-teal)]"
              />
              <span className="min-w-0">
                <span className="block text-[0.9375rem] leading-snug font-medium text-ink">{o.label}</span>
                {o.description && (
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">{o.description}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-[0.8125rem] font-medium text-error">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function CheckboxField({
  label,
  error,
  ...props
}: { label: React.ReactNode; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          type="checkbox"
          aria-invalid={!!error}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-teal)]"
          {...props}
        />
        <span className="text-[0.875rem] leading-relaxed text-body">{label}</span>
      </label>
      {error && (
        <p role="alert" className="mt-2 text-[0.8125rem] font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}
