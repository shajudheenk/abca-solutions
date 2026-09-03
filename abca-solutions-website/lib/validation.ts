import { z } from "zod";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];
const sectorSlugs = ["other", ...sectors.map((s) => s.slug)] as unknown as [string, ...string[]];

/** UK landline / mobile, tolerant of spaces, +44 and (0). */
const ukPhone = /^(\+?44\s?|0)(\s?\d){9,10}$/;

export const auditRequestSchema = z.object({
  businessName: z.string().trim().min(2, "Enter your business name").max(120),
  sector: z.enum(sectorSlugs, { message: "Choose the closest sector" }),
  postcode: z
    .string()
    .trim()
    .min(5, "Enter a valid UK postcode")
    .max(9)
    .regex(/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, "Enter a valid UK postcode"),
  sites: z.enum(["1", "2-4", "5-20", "20+"]),
  servicesRequested: z
    .array(z.enum(serviceSlugs))
    .min(1, "Choose at least one service to audit"),
  monthlyCardTurnover: z.enum(["none", "under-10k", "10k-50k", "50k-150k", "150k+"]).optional(),
  contactName: z.string().trim().min(2, "Enter your name").max(120),
  email: z.email("Enter a valid email address").max(160),
  phone: z.string().trim().regex(ukPhone, "Enter a valid UK phone number"),
  notes: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { message: "Please confirm before submitting" }),
  /** Honeypot — must stay empty. */
  company: z.string().max(0).optional(),
});

export type AuditRequest = z.infer<typeof auditRequestSchema>;

export const sitesOptions = [
  { value: "1", label: "One site" },
  { value: "2-4", label: "2–4 sites" },
  { value: "5-20", label: "5–20 sites" },
  { value: "20+", label: "20+ sites" },
] as const;

export const turnoverOptions = [
  { value: "none", label: "We don't take card payments" },
  { value: "under-10k", label: "Under £10k / month" },
  { value: "10k-50k", label: "£10k–£50k / month" },
  { value: "50k-150k", label: "£50k–£150k / month" },
  { value: "150k+", label: "Over £150k / month" },
] as const;
