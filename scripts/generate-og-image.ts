/**
 * Screenshots the top of the home page as `public/og-image.jpg`, the preview social networks
 * show for a shared link. Needs `npm run dev` running.
 */
import { chromium } from "@playwright/test";

const URL = process.env.OG_URL ?? "http://localhost:3000/";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  colorScheme: "light"
});

await page.goto(URL);
await page.evaluate(() => document.fonts.ready);
// The dev server mounts the TanStack devtools as unclassed body-level divs
await page.addStyleTag({ content: "body > div:not([class]) { display: none; }" });
await page.screenshot({ path: "public/og-image.jpg", type: "jpeg", quality: 90 });
await browser.close();
