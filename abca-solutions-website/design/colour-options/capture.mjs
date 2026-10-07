/**
 * Screenshots the running site in every palette from palettes.mjs.
 *
 *   npm run build && npx next start -p 3100
 *   node design/colour-options/capture.mjs [baseUrl] [outDir]
 *
 * Colours are swapped by overriding the @theme custom properties at runtime,
 * plus the few values still hard-coded in components (hero glow, button
 * shadow, logo tile), so the shots are the real pages, not redraws.
 * Reduced motion is emulated so every scroll-reveal section is visible and
 * the hero shows its static CSS composition.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { palettes } from "./palettes.mjs";

const base = process.argv[2] ?? "http://localhost:3100";
const out = process.argv[3] ?? "design/colour-options/shots";
await mkdir(out, { recursive: true });

function css({ tokens, ctaText }) {
  const vars = Object.entries(tokens).map(([k, v]) => `--color-${k}: ${v};`).join("\n");
  return `
:root { ${vars}
  --logo-tile: var(--color-ink); --logo-accent: var(--color-teal); --cta-text: ${ctaText}; }
.bg-coral { color: var(--cta-text) !important;
  box-shadow: 0 1px 0 rgb(255 255 255 / .25) inset, 0 10px 24px -12px color-mix(in srgb, var(--color-coral) 75%, transparent) !important; }
[class*="radial-gradient"] { background-image:
  radial-gradient(70% 60% at 78% 35%, color-mix(in srgb, var(--color-teal) 20%, transparent), transparent 62%),
  radial-gradient(50% 50% at 10% 0%, color-mix(in srgb, var(--color-coral-bright) 10%, transparent), transparent 60%) !important; }
::selection { background: var(--color-teal-100); }`;
}

const pages = [
  { slug: "home", path: "/" },
  { slug: "fees", path: "/our-fees" },
];
const views = [
  { slug: "desktop", viewport: { width: 1440, height: 900 } },
  { slug: "mobile", viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 },
];

const browser = await chromium.launch();
for (const view of views) {
  const ctx = await browser.newContext({
    viewport: view.viewport,
    isMobile: view.isMobile ?? false,
    deviceScaleFactor: view.deviceScaleFactor ?? 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  for (const pg of pages) {
    for (const p of palettes) {
      await page.goto(base + pg.path, { waitUntil: "networkidle" });
      await page.addStyleTag({ content: css(p) });
      await page.evaluate(() => document.fonts.ready);
      const name = `${out}/${p.id}-${pg.slug}-${view.slug}`;
      await page.screenshot({ path: `${name}-fold.jpg`, type: "jpeg", quality: 85 });
      if (view.slug === "desktop") {
        await page.screenshot({ path: `${name}-full.jpg`, type: "jpeg", quality: 72, fullPage: true });
      }
      console.log("✓", name);
    }
  }
  await ctx.close();
}
await browser.close();
