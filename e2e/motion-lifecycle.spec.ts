import { test, expect } from '@playwright/test';

test('starfield suspends offscreen and resumes after visibility and route changes', async ({
  page,
}) => {
  await page.goto('/');
  const canvas = page.locator('canvas[data-starfield]');
  await expect(canvas).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  const frame = () => canvas.evaluate((node) => (node as HTMLCanvasElement).toDataURL());
  const first = await frame();
  await expect.poll(frame).not.toBe(first);
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(canvas).not.toBeInViewport();
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
  const offscreen = await frame();
  await page.waitForTimeout(250);
  expect(await frame()).toBe(offscreen);
  await page.locator('main h1').scrollIntoViewIfNeeded();
  await expect(canvas).toBeInViewport();
  await expect.poll(frame).not.toBe(offscreen);
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Services' })
    .click();
  await expect(canvas).toHaveCount(0);
  await page.goBack();
  await expect(canvas).toBeVisible();
  const returned = await frame();
  await expect.poll(frame).not.toBe(returned);
});
