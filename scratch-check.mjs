import { chromium } from 'playwright';
const outDir = String.raw`C:\Users\selin\AppData\Local\Temp\claude\d--eswatini-car\103764e4-9a5e-49de-baca-51a82a634c48\scratchpad`;

const browser = await chromium.launch();
const consoleErrors = [];

async function freshPage(viewport) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err) => consoleErrors.push('pageerror: ' + err.message));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600); // past loading screen
  return { ctx, page };
}

// --- AvatarBadge check (Fix 1) ---
{
  const { ctx, page } = await freshPage({ width: 480, height: 900 });
  await page.screenshot({ path: `${outDir}/f1-header-full.png` });
  const headerInitials = await page.locator('div.bg-navy span', ).first().textContent().catch(() => null);
  console.log('Header avatar initials text:', headerInitials);

  await page.click('button:has-text("Driver")');
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${outDir}/f1-driver-tab.png` });
  const driverInitials = await page.$$eval('main span', els => els.map(e => e.textContent.trim()).filter(t => /^[A-Z]{1,2}$/.test(t)));
  console.log('Driver tab initials found:', driverInitials);
  await ctx.close();
}

// --- Header collapse (Fix 2) at three widths ---
for (const width of [320, 375, 414]) {
  const { ctx, page } = await freshPage({ width, height: 800 });

  const before = await page.evaluate(() => {
    const header = document.querySelector('.sticky.top-0');
    return header.getBoundingClientRect().height;
  });
  await page.screenshot({ path: `${outDir}/f2-${width}-top.png` });

  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(500); // let the 300ms transition settle
  const after = await page.evaluate(() => {
    const header = document.querySelector('.sticky.top-0');
    return header.getBoundingClientRect().height;
  });
  await page.screenshot({ path: `${outDir}/f2-${width}-scrolled.png` });

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const restored = await page.evaluate(() => {
    const header = document.querySelector('.sticky.top-0');
    return header.getBoundingClientRect().height;
  });

  console.log(`width=${width} headerHeight before=${before} scrolled=${after} restored=${restored}`);
  await ctx.close();
}

// tab switching + whatsapp link + form still work after refactor
{
  const { ctx, page } = await freshPage({ width: 480, height: 900 });
  await page.click('button:has-text("Book")');
  await page.waitForTimeout(150);
  await page.selectOption('#serviceType', 'airport');
  const terminalVisible = await page.locator('#terminal').isVisible();
  console.log('Book tab terminal-field-on-airport still works:', terminalVisible);

  const waHref = await page.locator('a:has-text("WhatsApp")').first().getAttribute('href');
  console.log('Header WhatsApp href:', waHref);
  await ctx.close();
}

console.log('CONSOLE_ERRORS:', JSON.stringify(consoleErrors, null, 2));
await browser.close();
