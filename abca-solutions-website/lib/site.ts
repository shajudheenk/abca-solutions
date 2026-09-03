/**
 * Single source of truth for company facts, contact details and navigation.
 * Everything a non-developer might need to change lives here.
 */

export const site = {
  name: "ABCA Solutions",
  legalName: "ABCA Solutions Ltd",
  tagline: "The business cost audit",
  description:
    "ABCA audits what your business pays for card processing, energy, telecoms, banking and connectivity — line by line, with our commission disclosed in pounds. The report is yours whether you switch or not.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.abcasolutions.co.uk",
  companyNumber: "14554940",
  incorporatedIn: "England & Wales",
  /**
   * ICO (Information Commissioner's Office) data-protection registration.
   * `reference` renders in the footer and trust row as soon as it is set.
   * Leave null until the certificate is to hand — the badge still shows.
   */
  ico: {
    registered: true,
    reference: process.env.NEXT_PUBLIC_ICO_REFERENCE ?? null,
  },
  phone: {
    display: "+44 7988 474189",
    href: "tel:+447988474189",
    whatsapp: "https://wa.me/447988474189",
  },
  email: {
    general: "hello@abcasolutions.co.uk",
    audits: "audits@abcasolutions.co.uk",
  },
  hours: "Mon–Fri, 9:00–18:00",
  responsePromise: "Replies within 2 working hours",
  turnaroundDays: 7,
  address: {
    // Registered office. Update when the trading address differs.
    lines: ["Registered in England & Wales", "Company no. 14554940"],
  },
  offers: {
    referralBonus: 100,
    bundleServices: 3,
  },
} as const;

export type NavChild = { label: string; href: string; blurb?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const primaryNav: NavItem[] = [
  {
    label: "What we audit",
    href: "/what-we-audit",
    children: [
      { label: "Card payments", href: "/what-we-audit/card-payments", blurb: "Terminals, rates, gateways" },
      { label: "EPOS & tills", href: "/what-we-audit/epos", blurb: "Hardware, licences, support" },
      { label: "Business energy", href: "/what-we-audit/business-energy", blurb: "Gas, electricity, water" },
      { label: "Telecoms & broadband", href: "/what-we-audit/telecoms", blurb: "Lines, VoIP, mobile, leased" },
      { label: "Business banking", href: "/what-we-audit/business-banking", blurb: "Fees, cash handling, FX" },
      { label: "Business insurance", href: "/what-we-audit/business-insurance", blurb: "Introduction only" },
      { label: "Business finance", href: "/what-we-audit/business-finance", blurb: "Introduction only" },
    ],
  },
  {
    label: "Sectors",
    href: "/sectors",
  },
  { label: "How it works", href: "/how-it-works" },
  { label: "Our fees", href: "/our-fees" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
];

export const footerNav = [
  {
    title: "What we audit",
    links: [
      { label: "Card payments", href: "/what-we-audit/card-payments" },
      { label: "EPOS & tills", href: "/what-we-audit/epos" },
      { label: "Business energy", href: "/what-we-audit/business-energy" },
      { label: "Telecoms & broadband", href: "/what-we-audit/telecoms" },
      { label: "Business banking", href: "/what-we-audit/business-banking" },
      { label: "Business insurance", href: "/what-we-audit/business-insurance" },
      { label: "Business finance", href: "/what-we-audit/business-finance" },
    ],
  },
  {
    title: "Sectors",
    links: [
      { label: "Industrial units", href: "/sectors/industrial-units" },
      { label: "Restaurants & takeaways", href: "/sectors/restaurants-takeaways" },
      { label: "Convenience & retail", href: "/sectors/convenience-retail" },
      { label: "Pubs & bars", href: "/sectors/pubs-bars" },
      { label: "Garages & MOT centres", href: "/sectors/garages-mot" },
      { label: "Care homes", href: "/sectors/care-homes" },
      { label: "All sectors", href: "/sectors" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Our fees", href: "/our-fees" },
      { label: "About ABCA", href: "/about" },
      { label: "Partner programme", href: "/partners" },
      { label: "Contact", href: "/contact" },
      { label: "Get your audit", href: "/get-audit" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy notice", href: "/legal/privacy" },
      { label: "Cookie notice", href: "/legal/cookies" },
      { label: "Terms of use", href: "/legal/terms" },
      { label: "Complaints", href: "/legal/complaints" },
    ],
  },
] as const;
