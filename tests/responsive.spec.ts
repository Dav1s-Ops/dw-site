import { test, expect } from '@playwright/test';

const pages = ['/'];

for (const path of pages) {
  test(`${path} has no horizontal scroll`, async ({ page }) => {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `page is ${overflow}px wider than the viewport`).toBeLessThanOrEqual(0);
  });

  test('touch targets in the header are at least 44px', async ({ page }) => {
    await page.goto('/');
    for (const el of await page.locator('header a:visible, header button:visible, header summary:visible').all()) {
      const box = await el.boundingBox();
      expect(box!.height, await el.innerText()).toBeGreaterThanOrEqual(44);
    }
  });
}