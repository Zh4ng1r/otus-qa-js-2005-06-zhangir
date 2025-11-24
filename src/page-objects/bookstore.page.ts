// src/page-objects/bookstore.page.ts
import { Page, Locator, expect } from '@playwright/test';

export class BookStorePage {
  readonly page: Page;
  readonly baseUrl: string;
  readonly booksTable: Locator;
  readonly searchInput: Locator;
  readonly firstRow: Locator;
  readonly gridRows: Locator;
  readonly gridCells: Locator;
  readonly closeAdButton: Locator;
  readonly nextPageButton: Locator;
  readonly firstColumnHeader: Locator;

  constructor(page: Page, baseUrl: string = 'https://demoqa.com') {
    this.page = page;
    this.baseUrl = baseUrl;

    this.booksTable = page.locator('[role="grid"]');
    this.searchInput = page.locator('input[placeholder="Type to search"]');
    this.gridRows = page.locator('[role="row"]');
    this.gridCells = page.locator('[role="gridcell"]');
    this.firstRow = this.gridRows.nth(1);
    this.closeAdButton = page.locator('[aria-label="Close"]');
    this.nextPageButton = page.locator('button.-next, [aria-label="Next"]');
    this.firstColumnHeader = page.locator('[role="columnheader"]').first();
  }

  async open() {
    await this.page.goto(`${this.baseUrl}/books`, { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle').catch(() => null);
    await this.closeAdIfVisible();
  }

  async closeAdIfVisible() {
    try {
      if (await this.closeAdButton.isVisible({ timeout: 2000 })) {
        await this.closeAdButton.click();
      }
    } catch {
      console.error('Close ad button is not visible');
    }
  }

  async waitForTableLoaded() {
    await this.booksTable.waitFor({ timeout: 5000 });
  }

  async searchBook(term: string) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(term);
    await this.page.waitForTimeout(500);
  }

  async getDataRows() {
    return this.gridRows.filter({ hasNot: this.page.locator('[role="columnheader"]') });
  }

  async getFirstBookTitleInTable() {
    return this.firstRow.locator('[role="gridcell"]').first().textContent();
  }

  async openFirstBookDetails() {
    await this.waitForTableLoaded();
    const firstBookLink = this.gridCells.locator('a').first();
    const title = await firstBookLink.textContent();

    await Promise.all([
      firstBookLink.click(),
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    return title;
  }

  async isAddToCollectionButtonVisible() {
    const btn = this.page.locator(
      'button:has-text("Add To Library"), button:has-text("Not in your collection")',
    );
    return (await btn.count()) > 0;
  }

  async goToNextPageIfPossible() {
    try {
      if (await this.nextPageButton.isEnabled({ timeout: 2000 })) {
        await this.nextPageButton.click();
        await this.page.waitForTimeout(1000);
        return true;
      }
    } catch {
      console.error('Next page button is not visible');
    }
    return false;
  }

  async sortByFirstColumn() {
    await this.waitForTableLoaded();
    await this.firstColumnHeader.click();
    await this.page.waitForTimeout(1000);
  }
}
