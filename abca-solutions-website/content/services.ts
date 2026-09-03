export type Service = {
  slug: string;
  name: string;
  navLabel: string;
  /** One line for cards and nav */
  summary: string;
  /** Page intro, 2 sentences max */
  intro: string;
  /** Regulatory framing shown on the page and in the footer where relevant */
  introducerOnly?: boolean;
  /** What the audit actually examines */
  checks: string[];
  /** Where businesses commonly overpay — specific, not generic */
  leaks: { title: string; detail: string }[];
  /** What you receive for this line of the audit */
  deliverable: string;
  /** Documents we ask for */
  documents: string[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "card-payments",
    name: "Card payments",
    navLabel: "Card payments",
    summary: "Terminal rental, blended and IC++ rates, gateway and PCI charges.",
    intro:
      "Card processing is the single most opaque line on most retail and hospitality P&Ls. We rebuild your effective rate from the statement and show you what the same volume costs elsewhere.",
    checks: [
      "Effective rate — total charges divided by total turnover, the only number that matters",
      "Blended versus Interchange++ pricing and which one suits your card mix",
      "Terminal rental and whether you are still paying for hardware you own outright",
      "PCI DSS compliance fees and non-compliance penalties",
      "Authorisation, minimum monthly service and gateway charges",
      "Contract end date, notice period and early-termination exposure",
    ],
    leaks: [
      {
        title: "Rate creep after the introductory period",
        detail:
          "Introductory pricing typically lifts at 12 or 18 months without a letter. The statement changes; nothing else does.",
      },
      {
        title: "Blended pricing hiding premium cards",
        detail:
          "On blended pricing, commercial and non-UK cards cost the acquirer more but cost you the same headline percentage — the margin is invisible.",
      },
      {
        title: "Terminal rental past the hardware's value",
        detail:
          "A £250 terminal on £29/month for four years is £1,392. Rental agreements frequently auto-renew.",
      },
      {
        title: "Duplicate PCI charges",
        detail:
          "Businesses running two acquirers often pay two annual PCI fees for one certified estate.",
      },
    ],
    deliverable:
      "Your current effective rate, benchmarked against live pricing from the acquirers on our panel, with the pound difference per year and the exact commission we would earn on each option.",
    documents: ["Your most recent merchant statement", "Terminal rental agreement, if separate"],
    metaTitle: "Card payment audit — merchant fees and terminal rates | ABCA Solutions",
    metaDescription:
      "We rebuild your effective card processing rate from your merchant statement, benchmark it against our acquirer panel and disclose our commission in pounds. Report in 7 working days.",
  },
  {
    slug: "epos",
    name: "EPOS & till systems",
    navLabel: "EPOS & tills",
    summary: "Licence fees, hardware finance, support contracts and integration.",
    intro:
      "EPOS is sold as a monthly figure and rarely revisited. We separate the software licence from the hardware finance from the support contract, because they price very differently.",
    checks: [
      "Per-till licence cost against comparable systems for your sector",
      "Hardware bought outright versus leased, and the remaining lease term",
      "Support-contract scope — what is actually covered and what is billed",
      "Whether payments are locked to the EPOS provider's acquirer",
      "Integration with accounting, stock, delivery platforms and rotas",
      "Data export rights if you leave the provider",
    ],
    leaks: [
      {
        title: "Payments locked to the till",
        detail:
          "Bundled EPOS-plus-payments deals often carry an above-market card rate that funds the 'free' hardware.",
      },
      {
        title: "Paying per till for unused terminals",
        detail: "Seasonal sites keep licences live on tills that run three months a year.",
      },
      {
        title: "Finance running past the hardware life",
        detail: "Five-year leases on hardware refreshed at year three.",
      },
    ],
    deliverable:
      "A per-till cost breakdown, the market range for equivalent systems in your sector, and whether unbundling payments from the till saves more than it costs.",
    documents: ["EPOS invoice or contract", "Hardware lease agreement, if separate"],
    metaTitle: "EPOS and till system audit — licence, hardware and support costs | ABCA",
    metaDescription:
      "An independent breakdown of what your EPOS actually costs per till, including bundled card rates, hardware finance and support contracts.",
  },
  {
    slug: "business-energy",
    name: "Business energy",
    navLabel: "Business energy",
    summary: "Gas, electricity and water — unit rates, standing charges, renewal dates.",
    intro:
      "Business energy contracts do not roll onto a capped tariff. Out-of-contract rates are the most expensive thing most small businesses ever pay, and they arrive silently.",
    checks: [
      "Unit rate (p/kWh) and daily standing charge against current market rates",
      "Contract end date, renewal window and notice requirements",
      "Whether you are on deemed or out-of-contract rates right now",
      "Third-party commission already baked into your unit rate",
      "Meter type, capacity charges and available capacity on half-hourly supplies",
      "Climate Change Levy and VAT rate — many small sites qualify for 5% and are billed at 20%",
    ],
    leaks: [
      {
        title: "Out-of-contract rates after a missed renewal",
        detail:
          "Deemed rates commonly run 40–80% above a negotiated contract. The switch happens automatically at the end date.",
      },
      {
        title: "Commission built into the unit rate",
        detail:
          "Broker uplift is usually charged as pence per kWh inside the rate you were quoted, not as a separate fee. We show ours as a pound figure instead.",
      },
      {
        title: "The wrong VAT rate",
        detail:
          "Premises using under 33 kWh of electricity or 145 kWh of gas per day may qualify for 5% VAT and reduced CCL. Suppliers do not apply it for you.",
      },
      {
        title: "Available capacity you stopped using",
        detail:
          "Half-hourly sites pay monthly for KVA capacity set years ago, often after equipment was removed.",
      },
    ],
    deliverable:
      "Your current p/kWh and standing charge, the live market range for your meter profile and consumption, your renewal date diarised, and the commission per kWh we would receive stated in pounds per year.",
    documents: ["A recent gas bill", "A recent electricity bill", "Your renewal letter, if one has arrived"],
    metaTitle: "Business energy audit — unit rates, standing charges and renewals | ABCA",
    metaDescription:
      "We check your business gas and electricity unit rates against the live market, diarise your renewal date and disclose our commission in pounds per year.",
  },
  {
    slug: "telecoms",
    name: "Telecoms & broadband",
    navLabel: "Telecoms & broadband",
    summary: "Broadband, leased lines, VoIP, mobile fleets and line rental.",
    intro:
      "Telecoms bills accumulate. Old lines, ceased services and handsets for people who left are the normal state of a business account that nobody has audited.",
    checks: [
      "Every line, circuit and number on the account, matched to something you actually use",
      "Broadband or leased-line speed against what the site can now get",
      "VoIP licence count versus headcount",
      "Mobile fleet — tariff, data pooling, out-of-bundle spend and handset upgrade cycles",
      "Contract end dates across each service, which rarely align",
      "Whether your card terminals still need a dedicated phone line",
    ],
    leaks: [
      {
        title: "Ceased services still billed",
        detail:
          "Analogue lines for alarms, lifts and fax that were replaced but never cancelled.",
      },
      {
        title: "Out-of-bundle mobile data",
        detail: "A pooled data allowance across the fleet is usually cheaper than per-handset bundles.",
      },
      {
        title: "Paying business rates for a consumer-grade line",
        detail:
          "Many sites pay a business premium for a service with no SLA, no static IP and no priority repair.",
      },
    ],
    deliverable:
      "A line-by-line inventory of the account with anything unmatched flagged, plus benchmarked pricing for the services you actually use.",
    documents: ["Your latest telecoms bill, including the itemised pages", "Mobile account summary"],
    metaTitle: "Business telecoms and broadband audit — lines, VoIP and mobile | ABCA",
    metaDescription:
      "A line-by-line audit of your business telecoms account: ceased services, out-of-bundle data, leased lines and contract end dates.",
  },
  {
    slug: "business-banking",
    name: "Business banking",
    navLabel: "Business banking",
    summary: "Account fees, cash handling, transaction charges and FX margins.",
    intro:
      "Bank charges are small, frequent and therefore invisible. For cash-heavy and importing businesses they are rarely small in aggregate.",
    checks: [
      "Monthly account fee against your transaction profile",
      "Per-item charges for credits, debits, faster payments and cheques",
      "Cash and coin handling charges per £100 banked",
      "FX margin on supplier payments — the spread, not the advertised fee",
      "Overdraft arrangement fees and utilisation",
      "Whether a second account for a specific job would cost less than the charges it removes",
    ],
    leaks: [
      {
        title: "Cash handling on a tariff meant for a card-only business",
        detail: "Charges per £100 banked vary widely and are the largest bank cost for takeaways and convenience retail.",
      },
      {
        title: "FX spread on supplier payments",
        detail:
          "A 2–3% spread on a £20,000 import run is £400–600 that never appears as a fee on the statement.",
      },
      {
        title: "Free-banking period ended",
        detail: "Start-up free banking runs 12–24 months and then switches to a standard tariff.",
      },
    ],
    deliverable:
      "Total banking cost for the period reviewed, split by charge type, with the tariffs on our panel that fit your actual transaction mix.",
    documents: ["Three months of business bank statements", "Your current tariff sheet, if you have it"],
    metaTitle: "Business banking audit — account fees, cash handling and FX | ABCA",
    metaDescription:
      "We total your real cost of banking — per-item charges, cash handling and FX spread — and compare it against tariffs matched to your transaction profile.",
  },
  {
    slug: "business-insurance",
    name: "Business insurance",
    navLabel: "Business insurance",
    summary: "Cover review and introduction to an authorised broker.",
    introducerOnly: true,
    intro:
      "We review what you pay and whether the schedule matches the business you run today. We do not arrange or advise on insurance — where cover needs changing, we introduce you to an authorised broker.",
    checks: [
      "Premium and excess against the sums insured",
      "Whether declared turnover, headcount and stock values are still accurate",
      "Gaps between the schedule and how the premises are actually used",
      "Duplicate cover across separate policies",
      "Renewal date and whether the policy auto-renews",
    ],
    leaks: [
      {
        title: "Auto-renewal at a loyalty premium",
        detail: "Commercial policies frequently rise at renewal without a corresponding change in risk.",
      },
      {
        title: "Sums insured left at the original figure",
        detail:
          "Under-insurance triggers average clauses, which reduce a claim proportionally. Over-insurance is simply wasted premium.",
      },
      {
        title: "Cover that no longer matches the operation",
        detail: "Adding delivery, a new unit, or plant on hire changes the risk. Schedules rarely follow.",
      },
    ],
    deliverable:
      "A written summary of your current premium, cover and renewal date, with any mismatch between the schedule and your operation flagged for an authorised broker to quote against.",
    documents: ["Your policy schedule", "Your latest renewal invitation"],
    metaTitle: "Business insurance review — cover, premium and renewal | ABCA Solutions",
    metaDescription:
      "An independent review of your commercial insurance schedule and premium. ABCA is not authorised by the FCA and acts as an introducer only.",
  },
  {
    slug: "business-finance",
    name: "Business finance",
    navLabel: "Business finance",
    summary: "Cost-of-borrowing review and introduction to authorised lenders.",
    introducerOnly: true,
    intro:
      "Where you already borrow, we work out what it actually costs you as an annual figure. We do not advise on or arrange credit — where refinancing looks worthwhile, we introduce you to authorised lenders and brokers.",
    checks: [
      "Total cost of existing facilities expressed as an annual figure, not a factor rate",
      "Asset finance running past the useful life of the asset",
      "Merchant cash advance cost relative to card turnover",
      "Invoice finance charges — service fee, discount rate and disbursements",
      "Personal guarantees given and what they secure",
    ],
    leaks: [
      {
        title: "Factor rates read as interest rates",
        detail:
          "A 1.3 factor rate repaid over nine months is not 30% a year. Stated as an annual cost it is considerably more.",
      },
      {
        title: "Stacked advances",
        detail: "Taking a second advance to service the first is the most expensive money in the market.",
      },
      {
        title: "Asset finance outliving the asset",
        detail: "Paying for equipment that has already been replaced or written off.",
      },
    ],
    deliverable:
      "A single table of every facility, its true annual cost and its end date — so you can see the total cost of borrowing in one place before deciding anything.",
    documents: ["Loan or facility agreements", "Asset finance schedules", "Merchant cash advance agreement"],
    metaTitle: "Business finance cost review — loans, asset finance, MCA | ABCA Solutions",
    metaDescription:
      "We express the real annual cost of your existing business borrowing in one table. ABCA is not authorised by the FCA and acts as an introducer only.",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
