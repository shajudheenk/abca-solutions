export type Sector = {
  slug: string;
  name: string;
  /** Short line for the sector grid */
  summary: string;
  /** Page intro */
  intro: string;
  /** The cost lines that matter most in this sector, in order */
  priorities: string[];
  /** Specific, sector-true observations */
  notes: { title: string; detail: string }[];
  /** Which service slugs matter most here */
  services: string[];
  metaTitle: string;
  metaDescription: string;
};

export const sectors: Sector[] = [
  {
    slug: "industrial-units",
    name: "Industrial units",
    summary: "Warehousing, light manufacturing, workshops and trade counters.",
    intro:
      "Industrial units carry a cost profile nobody else on this list has: half-hourly electricity, capacity charges, and a landlord's service charge that may already include supplies you are separately contracted for.",
    priorities: [
      "Half-hourly electricity — unit rate, capacity charge and available KVA",
      "Gas for space and process heating, and whether the meter profile still fits",
      "Leased line or dedicated broadband where a unit sits away from good coverage",
      "Water and trade effluent charges",
      "Card payments where there is a trade counter",
    ],
    notes: [
      {
        title: "Available capacity set for a previous tenant",
        detail:
          "KVA capacity is billed monthly whether or not you draw it. Units that changed use — a machine shop becoming storage, for instance — frequently carry capacity from the previous occupier. Reducing it is a form to the DNO, not a switch.",
      },
      {
        title: "Service charge overlap",
        detail:
          "On multi-let estates, part of the supply can sit inside the service charge while a separate contract runs on the same meter. We ask for the service charge schedule alongside the bills for exactly this reason.",
      },
      {
        title: "Connectivity is the constraint, not the price",
        detail:
          "Trading estates are often poorly served. The question is usually which circuit is available at the postcode, and only then what it should cost.",
      },
      {
        title: "Consumption profile beats headline rate",
        detail:
          "A single-shift unit and a two-shift unit on identical annual kWh have very different day/night splits, and therefore very different best tariffs.",
      },
    ],
    services: ["business-energy", "telecoms", "business-banking", "card-payments", "business-insurance"],
    metaTitle: "Cost audit for industrial units — energy, capacity and connectivity | ABCA",
    metaDescription:
      "Independent cost audit for warehouses, workshops and light industrial units: half-hourly electricity, KVA capacity charges, leased lines and service-charge overlap.",
  },
  {
    slug: "restaurants-takeaways",
    name: "Restaurants & takeaways",
    summary: "High card volume, heavy gas and electricity, delivery platform fees.",
    intro:
      "Card processing and energy are usually the two largest controllable costs in a food business, and both are typically set once and never revisited.",
    priorities: [
      "Card processing — effective rate across a high volume of low-value transactions",
      "Gas and electricity, which run at close to constant load through service",
      "EPOS and delivery-platform integration",
      "Telecoms, including whether the terminal still needs a line",
    ],
    notes: [
      {
        title: "Low average transaction value punishes fixed per-item fees",
        detail:
          "A 5p authorisation fee on a £9 order is 0.55% before the percentage rate is applied. On a £70 restaurant bill it is 0.07%. The right pricing structure differs completely between the two.",
      },
      {
        title: "Extraction and refrigeration set the electricity baseline",
        detail:
          "Load is high and flat rather than peaky, which changes which tariff shape suits the site.",
      },
      {
        title: "Delivery platform commission is not our lane, but it changes the arithmetic",
        detail:
          "We note it in the report because it affects which card mix you actually process — but we do not claim to renegotiate it.",
      },
    ],
    services: ["card-payments", "business-energy", "epos", "telecoms"],
    metaTitle: "Restaurant & takeaway cost audit — card rates and energy | ABCA Solutions",
    metaDescription:
      "Card processing and energy are the two largest controllable costs in a food business. We audit both, line by line, with commission disclosed.",
  },
  {
    slug: "convenience-retail",
    name: "Convenience & retail",
    summary: "Cash handling, chilled load, card mix and EPOS licences.",
    intro:
      "Convenience retail pays on both sides — card charges on the takings that come in by card, and banking charges on the takings that come in as cash.",
    priorities: [
      "Cash handling charges per £100 banked",
      "Card processing across a very low average transaction value",
      "Electricity, driven almost entirely by chilled and frozen display",
      "EPOS licences and scanning hardware",
    ],
    notes: [
      {
        title: "Cash is not free to bank",
        detail:
          "Handling charges per £100 vary several-fold between tariffs. For a shop banking £8,000 of cash a week this is one of the largest single line items in the audit.",
      },
      {
        title: "Chilled display dominates the electricity bill",
        detail:
          "Load runs 24/7 and barely varies, so the standing charge and night rate matter more than the day rate.",
      },
      {
        title: "Symbol group agreements can restrict switching",
        detail: "We check the group agreement before recommending anything on card or EPOS.",
      },
    ],
    services: ["card-payments", "business-banking", "business-energy", "epos"],
    metaTitle: "Convenience store & retail cost audit — cash, card and energy | ABCA",
    metaDescription:
      "We audit cash handling charges, card processing on low-value baskets and chilled-load electricity for convenience and independent retail.",
  },
  {
    slug: "pubs-bars",
    name: "Pubs & bars",
    summary: "Tied agreements, cellar cooling, card volume and licensing.",
    intro:
      "Tied and leased houses have less room on supply than a freehouse, so the audit concentrates on the lines the agreement does not control.",
    priorities: [
      "Whether energy is genuinely free to switch under the tie",
      "Cellar cooling and its share of the electricity bill",
      "Card processing across peak trading",
      "Telecoms, including Wi-Fi, music and sports subscriptions",
    ],
    notes: [
      {
        title: "The tie usually covers drink, not power",
        detail:
          "Many operators assume energy is tied because beer is. We check the agreement rather than assume either way.",
      },
      {
        title: "Cellar cooling runs continuously",
        detail: "It is the largest single electrical load in most pubs and never switches off.",
      },
      {
        title: "Card volume is compressed into a few hours",
        detail:
          "Terminal count and connectivity matter as much as rate. A queue at the bar costs more than 0.2% on the rate.",
      },
    ],
    services: ["business-energy", "card-payments", "telecoms", "epos"],
    metaTitle: "Pub & bar cost audit — energy, card rates and connectivity | ABCA",
    metaDescription:
      "Cost audit for pubs and bars: cellar cooling load, card processing at peak, telecoms and what the tied agreement does and does not cover.",
  },
  {
    slug: "salons-barbers",
    name: "Salons & barbers",
    summary: "Card terminals per chair, booking software, low-load energy.",
    intro:
      "Small premises, high transaction count, and a booking system that often bundles payments at a rate nobody has checked.",
    priorities: [
      "Card processing, particularly where it is bundled into booking software",
      "Booking and rota software licences per stylist",
      "Electricity — modest load but often on a very poor small-business tariff",
      "Insurance, where treatments have changed since the policy was written",
    ],
    notes: [
      {
        title: "Bundled payments inside booking software",
        detail:
          "Convenient, and frequently 0.5–1.0% above a standalone acquirer. Whether that is worth paying depends on how much of the booking flow you actually use.",
      },
      {
        title: "Chair renters change the picture",
        detail:
          "Where chairs are rented, the question is whose merchant account processes what, and who carries the terminal cost.",
      },
    ],
    services: ["card-payments", "epos", "business-energy", "business-insurance"],
    metaTitle: "Salon & barbershop cost audit — card rates and booking software | ABCA",
    metaDescription:
      "Independent audit of card processing, booking software licences and energy costs for salons, barbers and treatment rooms.",
  },
  {
    slug: "garages-mot",
    name: "Garages & MOT centres",
    summary: "Three-phase power, compressed air, parts finance and liability cover.",
    intro:
      "Workshops draw hard and intermittently, which is a different electricity problem from a shop that draws steadily all day.",
    priorities: [
      "Three-phase electricity, capacity and load profile",
      "Compressed air and ramp load",
      "Card payments across a high average transaction value",
      "Liability and motor trade insurance",
    ],
    notes: [
      {
        title: "High average transaction value rewards percentage pricing",
        detail:
          "The opposite of a takeaway. On a £480 invoice the percentage rate dominates and per-item fees barely register.",
      },
      {
        title: "Intermittent heavy load",
        detail:
          "Ramps, compressors and welding create short peaks. On half-hourly metering the profile, not the annual total, determines the best contract.",
      },
    ],
    services: ["business-energy", "card-payments", "business-insurance", "telecoms"],
    metaTitle: "Garage & MOT centre cost audit — three-phase power and card rates | ABCA",
    metaDescription:
      "Cost audit for garages and MOT centres: three-phase electricity and load profile, card processing on high-value invoices, and trade insurance.",
  },
  {
    slug: "gyms-studios",
    name: "Gyms & studios",
    summary: "Recurring billing, heating and ventilation, membership software.",
    intro:
      "Recurring membership billing has a different cost structure from point-of-sale card processing, and is often priced as if it were the same.",
    priorities: [
      "Recurring card and Direct Debit costs, including failed-payment charges",
      "Heating, ventilation and hot water — the dominant energy load",
      "Membership management software licences",
      "Broadband for class streaming and access control",
    ],
    notes: [
      {
        title: "Direct Debit versus recurring card",
        detail:
          "Per-transaction economics diverge sharply above a few hundred members, and failed-payment handling costs differ more than the headline rate.",
      },
      {
        title: "Ventilation runs whether the room is full or empty",
        detail: "Which makes the standing charge and capacity element unusually significant.",
      },
    ],
    services: ["card-payments", "business-energy", "telecoms", "business-banking"],
    metaTitle: "Gym & fitness studio cost audit — recurring billing and energy | ABCA",
    metaDescription:
      "We audit recurring membership billing costs, failed-payment charges, heating and ventilation load, and software licences for gyms and studios.",
  },
  {
    slug: "care-homes",
    name: "Care homes",
    summary: "Continuous load, laundry and catering, resilient connectivity.",
    intro:
      "A care home never switches off. That makes the energy contract the most consequential document the business signs, and resilience worth paying for on connectivity.",
    priorities: [
      "Half-hourly electricity and gas on a genuinely continuous load",
      "Laundry, catering and hot water demand",
      "Resilient connectivity for call systems and records",
      "Insurance, where the schedule must match registration",
    ],
    notes: [
      {
        title: "Continuous load makes the renewal date critical",
        detail:
          "A month on out-of-contract rates costs a care home considerably more than it costs a business that closes at six.",
      },
      {
        title: "Connectivity is a safety line, not an overhead",
        detail:
          "We look at whether there is a genuine failover path before we look at price.",
      },
    ],
    services: ["business-energy", "telecoms", "business-insurance", "business-banking"],
    metaTitle: "Care home cost audit — continuous energy load and connectivity | ABCA",
    metaDescription:
      "Cost audit for residential and nursing care homes: half-hourly energy on continuous load, resilient connectivity, and insurance matched to registration.",
  },
  {
    slug: "offices-professional",
    name: "Offices & professional",
    summary: "Connectivity, VoIP seats, banking and FX, cyber cover.",
    intro:
      "Professional offices tend to have small energy bills and large telecoms and banking bills. We spend the audit where the money is.",
    priorities: [
      "Leased line or FTTP, and the SLA you are actually paying for",
      "VoIP seat count against real headcount",
      "Banking charges and FX on overseas payments",
      "Cyber and professional indemnity cover",
    ],
    notes: [
      {
        title: "Seats for people who left",
        detail: "VoIP licences are the easiest recurring cost in a professional firm to lose track of.",
      },
      {
        title: "FX spread on international payments",
        detail:
          "For firms paying suppliers or contractors abroad this is usually larger than the entire energy bill.",
      },
    ],
    services: ["telecoms", "business-banking", "business-insurance", "business-energy"],
    metaTitle: "Office & professional services cost audit — telecoms, banking, FX | ABCA",
    metaDescription:
      "Cost audit for offices and professional firms: leased lines and SLAs, VoIP seat count, banking charges and FX spread on international payments.",
  },
];

export const sectorBySlug = (slug: string) => sectors.find((s) => s.slug === slug);
