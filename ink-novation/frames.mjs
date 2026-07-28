import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded' });
const clip = { x: 900, y: 180, width: 480, height: 620 };
const marks = [400, 900, 1500, 2400, 4000, 6000, 8000, 10500];
let prev = 0;
for (const t of marks) {
  await page.waitForTimeout(t - prev); prev = t;
  await page.screenshot({ path: `/tmp/f-${String(t).padStart(5,'0')}.png`, clip });
}
await browser.close();
