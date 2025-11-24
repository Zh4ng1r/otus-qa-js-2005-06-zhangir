import { test, expect } from '@playwright/test';
import { BookStorePage } from '../src/page-objects/bookstore.page';

test.describe('Book Store UI Tests (POM, classes)', () => {
  test('Таблица книг должна загружаться и отображать данные', async ({ page }) => {
    const bookstore = new BookStorePage(page);
    await bookstore.open();
    await bookstore.waitForTableLoaded();

    const dataRows = await bookstore.getDataRows();
    expect(await dataRows.count()).toBeGreaterThanOrEqual(1);
  });

  test('Поиск по названию книги должен фильтровать результаты', async ({ page }) => {
    const bookstore = new BookStorePage(page);
    await bookstore.open();
    await bookstore.waitForTableLoaded();

    const searchTerm = 'JavaScript';
    await bookstore.searchBook(searchTerm);

    const dataRows = await bookstore.getDataRows();
    const rowCount = await dataRows.count();

    if (rowCount > 0) {
      const firstBookText = await bookstore.getFirstBookTitleInTable();
      expect(firstBookText).toContain(searchTerm);
    }

    console.log(`Поиск по "${searchTerm}" вернул ${rowCount} результатов`);
  });

  test('Клик на книгу должен открыть детальную информацию', async ({ page }) => {
    const bookstore = new BookStorePage(page);
    await bookstore.open();

    const bookTitle = await bookstore.openFirstBookDetails();
    const hasAddButton = await bookstore.isAddToCollectionButtonVisible();

    expect(hasAddButton).toBe(true);
    console.log(`Информация о книге: "${bookTitle}"`);
  });

  test('Пагинация должна работать корректно', async ({ page }) => {
    const bookstore = new BookStorePage(page);
    await bookstore.open();
    await bookstore.waitForTableLoaded();

    const firstPageFirstBook = await bookstore.getFirstBookTitleInTable();
    const moved = await bookstore.goToNextPageIfPossible();

    if (!moved) {
      console.log('Кнопка для перехода на следующую страницу недоступна или отсутствует');
      test.skip();
    }

    const secondPageFirstBook = await bookstore.getFirstBookTitleInTable();
    expect(secondPageFirstBook).not.toBe(firstPageFirstBook);
    console.log('Пагинация работает: данные изменились при переходе на следующую страницу');
  });

  test('Сортировка по столбцам должна работать корректно', async ({ page }) => {
    const bookstore = new BookStorePage(page);
    await bookstore.open();
    await bookstore.waitForTableLoaded();

    const firstBookBefore = await bookstore.getFirstBookTitleInTable();
    await bookstore.sortByFirstColumn();
    const firstBookAfter = await bookstore.getFirstBookTitleInTable();

    expect(firstBookAfter).not.toBe(firstBookBefore);
    console.log('Сортировка работает');
  });
});
