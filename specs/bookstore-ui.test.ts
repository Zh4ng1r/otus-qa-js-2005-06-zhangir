import { test, expect } from '@playwright/test';

const BASE_URL = 'https://demoqa.com';

test.describe('Book Store UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/books`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => null);
    const closeButton = page.locator('[aria-label="Close"]');
    if (await closeButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await closeButton.click();
    }
  });

  test('Таблица книг должна загружаться и отображать данные', async ({ page }) => {
    await page.waitForSelector('[role="grid"]', { timeout: 5000 });

    const headers = page.locator('[role="row"] [role="columnheader"]').first();
    expect(await headers.count()).toBeGreaterThanOrEqual(1);
  });

  test('Поиск по названию книги должен фильтровать результаты', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Type to search"]');
    expect(await searchInput.isVisible()).toBe(true);

    const searchTerm = 'JavaScript';
    await searchInput.fill(searchTerm);
    await page.waitForTimeout(500);

    const bookRows = page
      .locator('[role="row"]')
      .filter({ hasNot: page.locator('[role="columnheader"]') });
    const rowCount = await bookRows.count();

    if (rowCount > 0) {
      const firstBookText = await page.locator('[role="row"]').nth(1).textContent();
      expect(firstBookText).toContain(searchTerm);
    }

    console.log(`Поиск по "${searchTerm}" вернул ${rowCount} результатов`);
  });

  test('Клик на книгу должен открыть детальную информацию', async ({ page }) => {
    await page.waitForSelector('[role="grid"]', { timeout: 10000 });

    const firstBookLink = page.locator('[role="gridcell"] a').first();
    const bookTitle = await firstBookLink.textContent();

    await Promise.all([
      firstBookLink.click(),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    const addToCollectionBtn = page.locator(
      'button:has-text("Add To Library"), button:has-text("Not in your collection")',
    );
    expect(await addToCollectionBtn.count()).toBeGreaterThan(0);

    console.log(`Информация о книге: "${bookTitle}"`);
  });

  test('Пагинация должна работать корректно', async ({ page }) => {
    await page.waitForSelector('[role="grid"]', { timeout: 5000 });

    const firstPageFirstBook = await page
      .locator('[role="row"]')
      .nth(1)
      .locator('[role="gridcell"]')
      .first()
      .textContent();

    const nextButton = page.locator('button.-next, [aria-label="Next"]');
    const isNextButtonEnabled = await nextButton.isEnabled({ timeout: 2000 }).catch(() => false);

    if (isNextButtonEnabled) {
      await nextButton.click();
      await page.waitForTimeout(1000);

      const secondPageFirstBook = await page
        .locator('[role="row"]')
        .nth(1)
        .locator('[role="gridcell"]')
        .first()
        .textContent();

      expect(secondPageFirstBook).not.toBe(firstPageFirstBook);
      console.log(`Пагинация работает: данные изменились при переходе на следующую страницу`);
    } else {
      console.log('Кнопка для перехода на следующую страницу недоступна или отсутствует');
    }
  });

  test('Сортировка по столбцам должна работать корректно', async ({ page }) => {
    await page.waitForSelector('[role="grid"]', { timeout: 5000 });

    const firstBookBefore = await page
      .locator('[role="row"]')
      .nth(1)
      .locator('[role="gridcell"]')
      .first()
      .textContent();

    const sortButton = page.locator('[role="columnheader"]').first();
    await sortButton.click();
    await page.waitForTimeout(1000);

    const firstBookAfter = await page
      .locator('[role="row"]')
      .nth(1)
      .locator('[role="gridcell"]')
      .first()
      .textContent();

    const sortHappened = firstBookBefore !== firstBookAfter;
    expect(sortHappened).toBe(true);

    console.log(`Сортировка работает`);
  });
});
