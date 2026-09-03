/**
 * Commission disclosure.
 *
 * This is the page that differentiates ABCA, so it must be accurate.
 * `range` is intentionally null until the real figures are confirmed — the
 * table then states that the pound figure appears on the report instead of
 * publishing a number that cannot be substantiated. Set `range` to a string
 * such as "0.05–0.15p per kWh" and the column fills in automatically.
 */
export type FeeRow = {
  category: string;
  /** Who pays us, and on what basis. Factual, not a figure. */
  mechanism: string;
  /** Published commission range, once confirmed. */
  range: string | null;
  /** When it is paid */
  timing: string;
};

export const feeRows: FeeRow[] = [
  {
    category: "Card payments",
    mechanism: "A share of the acquirer's margin on your processed volume.",
    range: null,
    timing: "Monthly, for as long as you process",
  },
  {
    category: "Business energy",
    mechanism: "An uplift in pence per kWh, paid by the supplier and included in your unit rate.",
    range: null,
    timing: "Over the life of the contract",
  },
  {
    category: "Telecoms & broadband",
    mechanism: "A share of monthly recurring revenue, paid by the provider.",
    range: null,
    timing: "Monthly",
  },
  {
    category: "EPOS & tills",
    mechanism: "A referral fee on the hardware or licence agreement.",
    range: null,
    timing: "One-off, on installation",
  },
  {
    category: "Business banking",
    mechanism: "A referral fee where the provider operates an introducer scheme.",
    range: null,
    timing: "One-off, on account opening",
  },
  {
    category: "Business insurance",
    mechanism: "An introducer fee from the authorised broker. We give no advice and arrange nothing.",
    range: null,
    timing: "One-off, if a policy is taken",
  },
  {
    category: "Business finance",
    mechanism: "An introducer fee from the authorised lender or broker. We give no advice and arrange nothing.",
    range: null,
    timing: "One-off, on drawdown",
  },
];

export const feePrinciples = [
  {
    title: "The audit is free, and it is free whatever you do next",
    detail:
      "You never pay ABCA. We are paid by suppliers when you choose to move, and by nobody at all if you stay where you are.",
  },
  {
    title: "Every recommendation carries a pound figure",
    detail:
      "Each line of your report shows what we would earn if you acted on it, in pounds per year — not a percentage, not a range, and not on request.",
  },
  {
    title: "We show you the option that pays us nothing",
    detail:
      "Where staying put is the right answer, the report says so. Where a provider outside our panel is cheaper, we name them.",
  },
  {
    title: "No fee is ever added to your bill by us",
    detail:
      "In energy, broker uplift sits inside the unit rate. We disclose ours in pounds per year so you can compare it against any other broker's — most will not tell you.",
  },
];
