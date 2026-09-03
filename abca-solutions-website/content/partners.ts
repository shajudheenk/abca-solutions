/**
 * Acquirer and provider panel.
 *
 * Rendered as styled wordmarks rather than each company's own logo artwork:
 * it keeps the strip visually consistent and avoids reproducing third-party
 * logo files. If a provider supplies a brand pack and written permission,
 * drop the SVG into /public/brand/partners/<id>.svg and set `logo` below —
 * the component will use it in place of the wordmark.
 */
export type Partner = {
  id: string;
  name: string;
  category: "Payments";
  /** Optional path to an approved logo asset under /public */
  logo?: string;
};

export const partners: Partner[] = [
  { id: "teya", name: "Teya", category: "Payments" },
  { id: "dojo", name: "Dojo", category: "Payments" },
  { id: "shift4", name: "Shift4", category: "Payments" },
  { id: "sumup", name: "SumUp", category: "Payments" },
  { id: "yetipay", name: "YetiPay", category: "Payments" },
  { id: "evo", name: "Evo", category: "Payments" },
  { id: "elavon", name: "Elavon", category: "Payments" },
  { id: "worldpay", name: "Worldpay", category: "Payments" },
  { id: "clover", name: "Clover", category: "Payments" },
];
