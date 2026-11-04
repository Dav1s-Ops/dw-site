import { test, expect } from '@playwright/test';

const pages = ['/', '/styleguide', '/blog', '/blog/hello-world', '/blog/category/fullstack', '/blog/tags/astro', '/work', '/projects', '/contact'];
for (const path of pages) {
  test(`${path} has no horizontal scroll`, async ({ page }) => {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `page is ${overflow}px wider than the viewport`).toBeLessThanOrEqual(0);
  });

  test(`${path} header touch targets are at least 44px`, async ({ page }) => {
    await page.goto(path);
    for (const el of await page.locator('header:not(article header)').locator('a:visible, button:visible, summary:visible').all()) {
      const box = await el.boundingBox();
      expect(box!.height, await el.innerText()).toBeGreaterThanOrEqual(44);
    }
  });
}