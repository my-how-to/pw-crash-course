import { test, expect } from '@playwright/test';

test('проверка поиска на playwright.dev', async ({ page }) => {
  // 1. Переход на страницу
  await page.goto('https://playwright.dev');

  // 2. Взаимодействие с элементом (локатор по тексту)
  await page.getByRole('link', { name: 'Get started' }).click();

  // 3. Ассершн (проверка состояния)
  // expect в Playwright умеет ждать (retry), пока условие не выполнится
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});