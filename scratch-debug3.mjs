import { chromium } from 'playwright';
const outDir = String.raw`C:\Users\selin\AppData\Local\Temp\claude\d--eswatini-car\103764e4-9a5e-49de-baca-51a82a634c48\scratchpad`;
const browser = await chromium.launch();

for (const width of [320, 375, 414]) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);

  const before = await page.locator('#app-header').evaluate(el => el.getBoundingClientRect().height);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  const scrollY = await page.evaluate(() => window.scrollY);
  const afterInfo = await page.locator('#app-header').evaluate(el => {
    const cs = getComputedStyle(el);
    return { height: el.getBoundingClientRect().height, padTop: cs.paddingTop, padBottom: cs.paddingBottom };
  });
  await page.screenshot({ path: `${outDir}/d3-${width}-scrolled.png` });

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  const restored = await page.locator('#app-header').evaluate(el => el.getBoundingClientRect().height);
  await page.screenshot({ path: `${outDir}/d3-${width}-restored.png` });

  console.log(`width=${width} scrollY=${scrollY} before=${before} after=${JSON.stringify(afterInfo)} restored=${restored}`);
  await ctx.close();
}
await browser.close();
