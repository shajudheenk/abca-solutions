import { NextResponse } from "next/server";
import { auditRequestSchema } from "@/lib/validation";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Lead intake.
 *
 * Delivery is configuration-driven. If neither channel is configured the route
 * says so plainly (503) rather than returning a success the business would
 * never see — the form then shows the visitor how to reach us directly.
 *
 *   RESEND_API_KEY + LEAD_NOTIFICATION_EMAIL  → email notification
 *   AUDIT_WEBHOOK_URL                          → POST the lead to a CRM
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function textSummary(data: Record<string, unknown>) {
  return Object.entries(data)
    .filter(([k]) => k !== "company" && k !== "consent")
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v ?? "—")}`)
    .join("\n");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly, or call us." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = auditRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Some details need checking.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  // Honeypot: silently accept, deliver nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const lead = { ...parsed.data, company: undefined };
  delete (lead as { company?: string }).company;
  const payload = { ...lead, receivedAt: new Date().toISOString(), source: "website" };

  const resendKey = process.env.RESEND_API_KEY;
  const notify = process.env.LEAD_NOTIFICATION_EMAIL;
  const webhook = process.env.AUDIT_WEBHOOK_URL;

  if (!resendKey && !webhook) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error: `Online submissions are not switched on yet. Email ${site.email.audits} or call ${site.phone.display} and we will start your audit today.`,
      },
      { status: 503 },
    );
  }

  const deliveries: Promise<Response>[] = [];

  if (resendKey && notify) {
    deliveries.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL ?? `ABCA website <onboarding@resend.dev>`,
          to: [notify],
          reply_to: lead.email,
          subject: `Audit request — ${lead.businessName}`,
          text: textSummary(payload),
        }),
      }),
    );
  }

  if (webhook) {
    deliveries.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    );
  }

  const results = await Promise.allSettled(deliveries);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value.ok);

  if (!delivered) {
    return NextResponse.json(
      {
        ok: false,
        error: `We could not submit that just now. Please email ${site.email.audits} or call ${site.phone.display}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
