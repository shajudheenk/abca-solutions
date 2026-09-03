"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ActionButton } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import {
  CheckboxField,
  OptionCards,
  SelectField,
  TextField,
  TextareaField,
} from "@/components/ui/Field";
import { auditRequestSchema, sitesOptions, turnoverOptions } from "@/lib/validation";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { site } from "@/lib/site";
import { clsx } from "@/lib/utils";
import { useStoredString } from "@/lib/hooks";

const STORAGE_KEY = "abca.audit-draft.v1";

const STEPS = [
  { id: "business", label: "Your business" },
  { id: "services", label: "What to audit" },
  { id: "contact", label: "Where to send it" },
] as const;

type FieldErrors = Partial<Record<string, string[] | undefined>>;

type Draft = {
  businessName: string;
  sector: string;
  postcode: string;
  sites: string;
  servicesRequested: string[];
  monthlyCardTurnover: string;
  contactName: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;
};

const EMPTY: Draft = {
  businessName: "",
  sector: "",
  postcode: "",
  sites: "1",
  servicesRequested: [],
  monthlyCardTurnover: "under-10k",
  contactName: "",
  email: "",
  phone: "",
  notes: "",
  consent: false,
};

const sectorOptions = [
  { value: "", label: "Select your sector" },
  ...sectors.map((s) => ({ value: s.slug, label: s.name })),
  { value: "other", label: "Something else" },
];

const serviceOptions = services.map((s) => ({
  value: s.slug,
  label: s.name,
  description: s.summary,
}));

/**
 * Reads any saved draft outside the form, so the form itself can take it as an
 * initial value rather than assigning state from an effect. The key remounts
 * the form once React swaps in the client snapshot during hydration.
 */
export function AuditForm() {
  const saved = useStoredString(STORAGE_KEY);
  const initial = useMemo<Draft>(() => {
    if (!saved) return EMPTY;
    try {
      return { ...EMPTY, ...(JSON.parse(saved) as Partial<Draft>), consent: false };
    } catch {
      return EMPTY;
    }
  }, [saved]);

  return <AuditFormFields key={saved ? "restored" : "fresh"} initial={initial} />;
}

function AuditFormFields({ initial }: { initial: Draft }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  /**
   * Persist on edit rather than in an effect: the first client render of a
   * fresh instance must never overwrite a draft that is about to be restored.
   */
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => {
      const next = { ...d, [key]: value };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...next, consent: false }));
      } catch {
        /* storage unavailable — the form still works, it just will not resume */
      }
      return next;
    });
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const stepFields: Record<number, (keyof Draft)[]> = {
    0: ["businessName", "sector", "postcode", "sites"],
    1: ["servicesRequested", "monthlyCardTurnover"],
    2: ["contactName", "email", "phone", "consent"],
  };

  const validateStep = (index: number) => {
    const result = auditRequestSchema.safeParse({ ...draft, company: honeypot });
    if (result.success) return true;
    const flat = result.error.flatten().fieldErrors as FieldErrors;
    const relevant: FieldErrors = {};
    for (const f of stepFields[index]) if (flat[f]) relevant[f] = flat[f];
    setErrors(relevant);
    return Object.keys(relevant).length === 0;
  };

  const goTo = (next: number) => {
    setStep(next);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const onNext = () => {
    if (validateStep(step)) goTo(step + 1);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    const parsed = auditRequestSchema.safeParse({ ...draft, company: honeypot });
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      return;
    }

    setStatus("submitting");
    setMessage(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(json.error ?? "Something went wrong. Please call or email us instead.");
        if (json.fieldErrors) setErrors(json.fieldErrors);
        return;
      }
      setStatus("success");
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* storage unavailable */
      }
      requestAnimationFrame(() => headingRef.current?.focus());
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please check your connection, or call us.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-card border border-line bg-white p-8 text-center shadow-raise sm:p-12">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-100 text-teal-600">
          <Icons.check className="h-7 w-7" />
        </span>
        <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-h2 focus:outline-none">
          Request received
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed">
          We will reply within 2 working hours ({site.hours}) with a secure link for your bills. Your written
          audit follows within {site.turnaroundDays} working days of us having them.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={site.phone.href}
            className="inline-flex items-center justify-center gap-2 rounded-pill border border-line px-5 py-3 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-sand"
          >
            <Icons.phone className="h-4 w-4 text-teal-600" />
            {site.phone.display}
          </a>
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center gap-2 rounded-pill border border-line px-5 py-3 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-sand"
          >
            What happens next
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="overflow-hidden rounded-card border border-line bg-white shadow-raise">
      <ol className="flex border-b border-line bg-sand" aria-label="Progress">
        {STEPS.map((s, i) => {
          const state = i === step ? "current" : i < step ? "done" : "upcoming";
          return (
            <li key={s.id} className="flex-1">
              <button
                type="button"
                onClick={() => i < step && goTo(i)}
                disabled={i > step}
                aria-current={state === "current" ? "step" : undefined}
                className={clsx(
                  "flex w-full items-center gap-2.5 border-b-2 px-4 py-4 text-left text-[0.8125rem] font-medium transition-colors sm:px-6",
                  state === "current" && "border-teal text-ink",
                  state === "done" && "cursor-pointer border-transparent text-teal-600 hover:text-ink",
                  state === "upcoming" && "cursor-default border-transparent text-muted",
                )}
              >
                <span
                  className={clsx(
                    "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.6875rem] tnum",
                    state === "current" && "bg-teal-600 text-white",
                    state === "done" && "bg-teal-100 text-teal-600",
                    state === "upcoming" && "bg-line text-muted",
                  )}
                >
                  {state === "done" ? <Icons.check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="p-7 sm:p-9">
        <h2 ref={headingRef} tabIndex={-1} className="text-h3 focus:outline-none">
          {step === 0 && "Tell us about the business"}
          {step === 1 && "Which costs should we audit?"}
          {step === 2 && "Where should the report go?"}
        </h2>

        {step === 0 && (
          <div className="mt-7 space-y-6">
            <TextField
              label="Business name"
              value={draft.businessName}
              onChange={(e) => set("businessName", e.target.value)}
              error={errors.businessName?.[0]}
              autoComplete="organization"
              placeholder="As it appears on your bills"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <SelectField
                label="Sector"
                options={sectorOptions}
                value={draft.sector}
                onChange={(e) => set("sector", e.target.value)}
                error={errors.sector?.[0]}
              />
              <TextField
                label="Postcode"
                value={draft.postcode}
                onChange={(e) => set("postcode", e.target.value.toUpperCase())}
                error={errors.postcode?.[0]}
                autoComplete="postal-code"
                placeholder="B1 1AA"
                inputMode="text"
              />
            </div>
            <OptionCards
              legend="How many sites?"
              options={sitesOptions}
              value={[draft.sites]}
              onChange={(v) => set("sites", v[0] ?? "1")}
              error={errors.sites?.[0]}
              columns={2}
            />
          </div>
        )}

        {step === 1 && (
          <div className="mt-7 space-y-8">
            <OptionCards
              legend="Services to audit"
              hint="Pick everything you would like reviewed. Lines already on a competitive rate are reported as such — they cost you nothing to include."
              options={serviceOptions}
              value={draft.servicesRequested}
              onChange={(v) => set("servicesRequested", v)}
              error={errors.servicesRequested?.[0]}
              multiple
              columns={2}
            />
            <SelectField
              label="Monthly card turnover"
              hint="Helps us pull the right acquirer pricing before we speak."
              options={turnoverOptions}
              value={draft.monthlyCardTurnover}
              onChange={(e) => set("monthlyCardTurnover", e.target.value)}
              error={errors.monthlyCardTurnover?.[0]}
              required={false}
            />
          </div>
        )}

        {step === 2 && (
          <div className="mt-7 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Your name"
                value={draft.contactName}
                onChange={(e) => set("contactName", e.target.value)}
                error={errors.contactName?.[0]}
                autoComplete="name"
              />
              <TextField
                label="Phone"
                type="tel"
                value={draft.phone}
                onChange={(e) => set("phone", e.target.value)}
                error={errors.phone?.[0]}
                autoComplete="tel"
                placeholder="07700 900000"
              />
            </div>
            <TextField
              label="Email"
              type="email"
              value={draft.email}
              onChange={(e) => set("email", e.target.value)}
              error={errors.email?.[0]}
              autoComplete="email"
              hint="Your report and the secure upload link are sent here."
            />
            <TextareaField
              label="Anything we should know"
              value={draft.notes}
              onChange={(e) => set("notes", e.target.value)}
              error={errors.notes?.[0]}
              placeholder="Renewal dates you already know, a supplier you would rather avoid, a site that behaves differently…"
            />

            <div className="rounded-[10px] border border-line bg-sand p-5">
              <div className="flex items-start gap-3">
                <Icons.upload className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                <p className="text-[0.875rem] leading-relaxed">
                  <strong className="font-medium text-ink">Your bills come next.</strong> We reply within 2
                  working hours with a secure upload link — or you can email them to{" "}
                  <a href={`mailto:${site.email.audits}`} className="text-teal-600 underline underline-offset-2">
                    {site.email.audits}
                  </a>
                  . We never ask for card details, passwords or bank logins.
                </p>
              </div>
            </div>

            <CheckboxField
              checked={draft.consent}
              onChange={(e) => set("consent", e.target.checked)}
              error={errors.consent?.[0]}
              label={
                <>
                  I agree to ABCA Solutions contacting me about this audit request, and I have read the{" "}
                  <Link href="/legal/privacy" className="text-teal-600 underline underline-offset-2">
                    privacy notice
                  </Link>
                  .
                </>
              }
            />

            {/* Honeypot — visually and semantically hidden from real users */}
            <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
              <label htmlFor="company-website">Company website</label>
              <input
                id="company-website"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {status === "error" && message && (
              <p role="alert" className="flex items-start gap-3 rounded-[10px] border border-error/30 bg-error/5 p-4 text-[0.875rem] leading-relaxed text-ink">
                <Icons.alert className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                <span>{message}</span>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line bg-sand px-7 py-5 sm:px-9">
        {step > 0 ? (
          <ActionButton type="button" variant="ghost" onClick={() => goTo(step - 1)}>
            Back
          </ActionButton>
        ) : (
          <p className="text-[0.8125rem] text-muted">Takes about two minutes</p>
        )}

        {step < STEPS.length - 1 ? (
          <ActionButton type="button" onClick={onNext}>
            Continue
            <Icons.arrowRight className="h-4 w-4" />
          </ActionButton>
        ) : (
          <ActionButton type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Request my audit"}
            {status !== "submitting" && <Icons.arrowRight className="h-4 w-4" />}
          </ActionButton>
        )}
      </div>
    </form>
  );
}
