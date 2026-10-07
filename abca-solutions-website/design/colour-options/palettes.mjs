/**
 * Colour options for client approval. Each palette maps onto the existing
 * @theme tokens in app/globals.css, so adopting one is a token swap: the
 * token names (ink, teal, coral …) stay, only the values change.
 *
 *   ink / ink-2 / ink-3   dark surfaces (hero, footer, CTA band)
 *   teal                  accent on dark surfaces
 *   teal-600              accent text on white — must clear 4.5:1
 *   teal-100 / teal-50    tinted chips and panels
 *   coral / coral-600     primary action button and its hover
 *   ctaText               text colour on the primary button
 *   sand / sand-2 / line  light section grounds and hairlines
 */
export const palettes = [
  {
    id: "current",
    name: "Current — Ink & Coral",
    mood: "What the client has seen. Included for comparison only.",
    tokens: {
      ink: "#0b1f26", "ink-2": "#12333d", "ink-3": "#1c4652",
      teal: "#12a594", "teal-600": "#08766a", "teal-100": "#d6f2ee", "teal-50": "#eefaf8",
      coral: "#cc4526", "coral-600": "#b53a1e", "coral-bright": "#ff6b4a",
      sand: "#f8f6f2", "sand-2": "#f1ede5", line: "#e6e1d8", "line-dark": "#21454f",
      body: "#46555a", muted: "#5e6d72",
    },
    ctaText: "#ffffff",
  },
  {
    id: "sterling",
    name: "Sterling — Navy & Gold",
    mood: "Classic British finance. Reads as established, careful and premium — a firm you trust with your bills.",
    tokens: {
      ink: "#0c1a33", "ink-2": "#13264a", "ink-3": "#1d3560",
      teal: "#e0b45a", "teal-600": "#8a6414", "teal-100": "#f6ead0", "teal-50": "#fbf6ea",
      coral: "#e0b45a", "coral-600": "#cfa045", "coral-bright": "#f2cf86",
      sand: "#f8f6f1", "sand-2": "#f0ebe0", line: "#e6e0d3", "line-dark": "#24365a",
      body: "#46506a", muted: "#5d6780",
    },
    ctaText: "#0c1a33",
  },
  {
    id: "evergreen",
    name: "Evergreen — Forest & Lime",
    mood: "Money-green and fresh. Says ‘savings’ at a glance, modern without feeling like a start-up.",
    tokens: {
      ink: "#0d2b22", "ink-2": "#143a2e", "ink-3": "#1e4d3e",
      teal: "#5fd39b", "teal-600": "#1c7a4f", "teal-100": "#d8f2e4", "teal-50": "#eef9f3",
      coral: "#b6e86f", "coral-600": "#a3d95a", "coral-bright": "#c9f28d",
      sand: "#f6f8f4", "sand-2": "#edf1e8", line: "#e0e6dc", "line-dark": "#24493c",
      body: "#45544d", muted: "#5b6a63",
    },
    ctaText: "#0d2b22",
  },
  {
    id: "clarity",
    name: "Clarity — Midnight & Blue",
    mood: "Clean corporate blue, close to a bank or fintech. The safest, most familiar choice.",
    tokens: {
      ink: "#0a1931", "ink-2": "#102544", "ink-3": "#183559",
      teal: "#6cb2ff", "teal-600": "#1d5fd1", "teal-100": "#dbe8fd", "teal-50": "#eff5ff",
      coral: "#2563eb", "coral-600": "#1d4ed8", "coral-bright": "#60a5fa",
      sand: "#f5f7fb", "sand-2": "#eceff5", line: "#e2e6ee", "line-dark": "#23395c",
      body: "#475467", muted: "#5d6b82",
    },
    ctaText: "#ffffff",
  },
  {
    id: "signal",
    name: "Signal — Charcoal & Orange",
    mood: "Bold and direct. High contrast, energetic, built to get the audit button clicked.",
    tokens: {
      ink: "#17171a", "ink-2": "#222226", "ink-3": "#2e2e33",
      teal: "#ff8a3d", "teal-600": "#c2410c", "teal-100": "#ffe6d5", "teal-50": "#fff5ee",
      coral: "#c2410c", "coral-600": "#9a3412", "coral-bright": "#ff8a3d",
      sand: "#f7f6f4", "sand-2": "#efedea", line: "#e7e5e2", "line-dark": "#36363c",
      body: "#4a4a50", muted: "#66666d",
    },
    ctaText: "#ffffff",
  },
  {
    id: "regal",
    name: "Regal — Aubergine & Rose",
    mood: "Distinctive and warm. Stands apart from every blue-and-green comparison site in the sector.",
    tokens: {
      ink: "#1f1430", "ink-2": "#2c1d45", "ink-3": "#3b2a5c",
      teal: "#c9a8ff", "teal-600": "#6b3fc2", "teal-100": "#ece3fc", "teal-50": "#f7f2ff",
      coral: "#c92a62", "coral-600": "#a81f50", "coral-bright": "#ff6f9c",
      sand: "#faf7f5", "sand-2": "#f2ece8", line: "#ebe3de", "line-dark": "#3d2d58",
      body: "#4d4558", muted: "#665e72",
    },
    ctaText: "#ffffff",
  },
];
