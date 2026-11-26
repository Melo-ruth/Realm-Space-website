// Usage: node scripts/screenshots.mjs [baseUrl] [outDir]
// Takes full-page screenshots of the main pages at 390, 768 and 1440 px.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3] ?? "screenshots";
const pages = (process.env.PAGES ?? "/,/land,/land/kira-hillside-plot,/apartments,/stays/munyonyo-lakeside-villa,/owners,/about,/contact").split(",");
const widths = (process.env.WIDTHS ?? "390,768,1440").split(",").map(Number);
mkdirSync(out, { recursive: true });

let browser;
try {
  browser = await chromium.launch();
} catch {
  browser = await chromium.launch({ channel: "chrome" });
}
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "networkidle" });
    // Reveal all fade-up blocks and let lazy images load
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
      document.querySelectorAll("img").forEach(img => { img.loading = "eager"; });
      await Promise.all([...document.images].map(img => img.complete ? null : new Promise(r => { img.onload = img.onerror = r; setTimeout(r, 8000); })));
      window.scrollTo(0, 0);
      document.querySelectorAll(".fade-up").forEach(el => el.classList.add("is-visible"));
    });
    await page.waitForTimeout(500);
    const name = (p === "/" ? "home" : p.slice(1).replace(/\//g, "_")) + `-${w}.png`;
    await page.screenshot({ path: `${out}/${name}`, fullPage: process.env.FULL !== "0" });
    console.log("saved", name);
  }
  await ctx.close();
}
await browser.close();
