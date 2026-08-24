import { chromium } from 'playwright';
const browser = await chromium.launch();

for (const width of [320, 414]) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);

  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(600);

  const info = await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll('.bg-navy'));
    const header = headers[0];
    const children = Array.from(header.children).map(c => ({
      tag: c.tagName,
      cls: c.className,
      opacity: getComputedStyle(c).opacity,
      maxHeight: getComputedStyle(c).maxHeight,
      height: c.getBoundingClientRect().height
    }));
    return {
      matchCount: headers.length,
      headerChildCount: header.children.length,
      children,
      windowScrollY: window.scrollY
    };
  });
  console.log(`width=${width}`, JSON.stringify(info, null, 2));
  await ctx.close();
}

await browser.close();
