# ABCA Solutions — website

Production website for **ABCA Solutions Ltd** (England & Wales, company no. 14554940):
free written business cost audits with commission disclosed in pounds.

Next.js 15 App Router · TypeScript · Tailwind CSS v4 · Zod · three.js · deployed on Vercel.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # then fill in what you have
npm run dev                    # http://localhost:3000
```

```bash
npm run build && npm start     # production build
npx tsc --noEmit               # types
npx eslint .                   # lint
```

---

## Things to fill in before launch

These are the only places the site is knowingly incomplete. Each is a data
change, not a code change.

| # | What | Where |
|---|------|-------|
| 1 | **Real Google reviews.** The review cards are labelled layout samples and the page shows an amber notice while any entry is `sample: true`. Publishing invented reviews is an offence under the DMCC Act 2024. | `content/reviews.ts` |
| 2 | **Commission ranges.** Every row currently reads "Stated in £ per year on your report". Set `range` on a row and the published figure appears. This page is the differentiator — it is worth filling in. | `content/fees.ts` |
| 3 | **ICO registration reference.** The badge shows either way; the number renders once set. | `NEXT_PUBLIC_ICO_REFERENCE` |
| 4 | **Lead delivery.** Until Resend or a webhook is configured, `/api/audit` returns 503 and the form tells the visitor to call or email. It never fakes a success. | `.env` |
| 5 | **Domain.** Set the canonical origin so metadata, sitemap and robots point at the live host. | `NEXT_PUBLIC_SITE_URL` |
| 6 | **Partner logos.** Partners render as styled wordmarks. Once a provider gives you a brand pack and written permission, drop the SVG in `public/brand/partners/` and set `logo` on that entry. | `content/partners.ts` |
| 7 | **Email addresses and hours.** | `lib/site.ts` |

---

## Architecture

```
app/                      routes (App Router, all statically rendered except the API)
  layout.tsx              fonts, metadata, header/footer, Organization + WebSite JSON-LD
  page.tsx                homepage
  what-we-audit/[slug]/   7 service pages, generateStaticParams
  sectors/[slug]/         9 sector pages, generateStaticParams
  legal/                  privacy, cookies, terms, complaints
  get-audit/              multi-step audit request form
  api/audit/route.ts      lead intake: validation, rate limit, honeypot, delivery
  sitemap.ts robots.ts    generated from the content files
  opengraph-image.tsx     generated OG card
  not-found.tsx error.tsx

components/
  ui/                     Button, Container, Section, Field, Accordion, Reveal, Icon, Logo
  layout/                 Header, MobileNav, Footer, AnnouncementBar, PageHero, LegalPage
  sections/               Hero, HeroScene, TrustRow, PartnerMarquee, ServiceGrid, Process,
                          FeeTable, Calculator, SectorGrid, Guarantees, WhyAbca, Reviews,
                          PartnerProgramme, Faq, CtaBand
  forms/AuditForm.tsx

content/                  all copy that repeats across pages, as typed data
  services.ts sectors.ts fees.ts faqs.ts process.ts partners.ts reviews.ts

lib/
  site.ts                 company facts, contact details, navigation — single source of truth
  seo.ts schema.tsx       per-page metadata helper and JSON-LD builders
  validation.ts           Zod schema shared by client and server
  hooks.ts utils.ts
```

Adding a service or a sector means adding one object to `content/services.ts` or
`content/sectors.ts`. The nav, footer, hub pages, detail page, sitemap and
cross-links all follow from it.

---

## Design system

Tokens live in `app/globals.css` under `@theme`, so Tailwind generates
utilities from them (`bg-ink`, `text-teal-600`, `rounded-card`).

**Colour** — Ink `#0b1f26` / Ink-2 `#12333d` for dark surfaces; Teal `#12a594`
with Teal-600 `#08766a` for text-weight accents; Coral `#cc4526` reserved for
primary actions only; Sand `#f8f6f2` for warm section grounds; Line `#e6e1d8`.
Every text pairing meets WCAG 2.2 AA (4.5:1) — the coral and teal text shades
were darkened specifically to clear it.

**Type** — Instrument Sans (display) and Inter (body), both self-hosted
variable fonts in `app/fonts/`, loaded through `next/font/local`. No request
leaves the origin for a typeface. Scale: `display-1` 68px → `display-2` 48px →
`h2` 34px → `h3` 22px → body 16px, with `eyebrow` for the 12px tracked caps.

**Motion** — one reveal pattern (`components/ui/Reveal.tsx`, IntersectionObserver,
transform + opacity only), one marquee, one WebGL scene. Everything is disabled
by a single `prefers-reduced-motion` block in `globals.css`.

---

## The hero scene

`components/sections/HeroScene.tsx` — business bills drifting in depth around a
single audit report, drawn with three.js. Textures are generated on a 2D canvas
at runtime, so there are no image assets to ship.

It is loaded through `next/dynamic`, and it does not run at all when:

- the visitor prefers reduced motion,
- the screen is under 640px, or coarse-pointer under 900px.

In those cases the CSS composition in `Hero.tsx` renders instead. The scene also
pauses when scrolled out of view or the tab is hidden, caps DPR at 1.75, and
disposes every geometry, material and texture on unmount.

---

## Forms and lead delivery

`POST /api/audit` validates with the same Zod schema the client uses, rejects
over 5 submissions per IP per 10 minutes, and silently swallows honeypot hits.

Delivery is configuration-driven:

- `RESEND_API_KEY` + `LEAD_NOTIFICATION_EMAIL` → email notification (reply-to is the enquirer)
- `AUDIT_WEBHOOK_URL` → POST the lead JSON into a CRM

With neither set the route returns **503 with an honest message** rather than a
success the business would never see. The form surfaces it and points the
visitor at the phone number.

A part-completed form is saved to `localStorage` on every edit so a refresh does
not lose it, and cleared on success. Consent is never restored from storage.

---

## SEO

Per-page titles, descriptions and canonicals via `lib/seo.ts`; generated
`sitemap.xml` and `robots.txt`; a generated Open Graph card; and JSON-LD for
`ProfessionalService`, `WebSite`, `Service`, `FAQPage` and `BreadcrumbList`.
One `<h1>` per page, headings in order, descriptive alt text and link labels.

---

## Accessibility

WCAG 2.2 AA is the target. Skip link as the first tab stop; visible focus rings
on every interactive element; the mobile menu is a labelled dialog with a focus
trap and Escape to close; the desktop dropdown is keyboard operable and closes
on Escape; the accordion uses proper `aria-expanded`/`aria-controls`; form
errors are `role="alert"` and wired with `aria-describedby`; the form step
heading takes focus on each step change; all motion respects
`prefers-reduced-motion`.

---

## Security

`next.config.ts` sets a strict CSP (no third-party origins are allow-listed
because none are used), `X-Frame-Options: DENY`, `nosniff`, HSTS,
`Referrer-Policy`, a locked-down `Permissions-Policy` and COOP, and disables the
`X-Powered-By` header. Server-side validation never trusts the client. No secret
is exposed to the browser — only `NEXT_PUBLIC_*` values reach it.

---

## Deployment (Vercel)

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project**, import the repo. Framework is detected as
   Next.js; no build settings need changing.
3. Add the environment variables from `.env.example` under
   **Settings → Environment Variables** (Production and Preview).
4. Deploy. Then **Settings → Domains** → add `abcasolutions.co.uk` and
   `www.abcasolutions.co.uk`, and point the DNS records Vercel gives you.
5. Set `NEXT_PUBLIC_SITE_URL` to the live origin and redeploy, so canonicals,
   sitemap and Open Graph URLs are correct.
6. Submit `https://<domain>/sitemap.xml` in Google Search Console.

Every page except `/api/audit` is statically generated, so the site is served
from the edge CDN.

---

## Legal note

The regulatory copy throughout this site states that ABCA Solutions Ltd is **not
authorised by the FCA** and acts as an **introducer only** on insurance and
business finance. If that position changes, the wording appears in
`lib/site.ts`, `components/layout/Footer.tsx`, `content/services.ts`,
`content/faqs.ts` and the four pages under `app/legal/`. This is not legal
advice — have the legal pages reviewed by a qualified solicitor before launch.
