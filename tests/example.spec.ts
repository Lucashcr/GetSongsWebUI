import { test, expect } from '@playwright/test';

test('open initial page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const title = await page.locator('title').textContent();
  await expect(title).toBe('GetSongs');
});
