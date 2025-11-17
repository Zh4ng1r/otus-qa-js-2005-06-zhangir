import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly removeButtons: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.removeButtons = page.locator('button[id^="remove-"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async itemCount() {
    return this.cartItems.count();
  }

  async hasItemWithName(name: string) {
    return this.cartItems
      .filter({ hasText: name })
      .count()
      .then((c) => c > 0);
  }

  async removeAll() {
    const count = await this.removeButtons.count();
    for (let i = 0; i < count; i++) {
      await this.removeButtons.nth(0).click();
    }
  }

  async checkout() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      this.checkoutButton.click(),
    ]).catch(() => null);
  }
}
