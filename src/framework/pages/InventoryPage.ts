import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_list');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.cartButton = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async isVisible() {
    return this.inventoryContainer.isVisible();
  }

  async addToCartByIndex(index = 0) {
    const addButtons = this.page.locator('button[id^="add-to-cart-"]');
    await addButtons.nth(index).click();
  }

  async addToCartByName(name: string) {
    const card = this.page.locator('.inventory_item').filter({ hasText: name }).first();
    await card.locator('button[id^="add-to-cart-"]').click();
  }

  async openCart() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      this.cartButton.click(),
    ]).catch(() => null);
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
    await this.page.waitForLoadState('domcontentloaded').catch(() => null);
  }

  async cartCount() {
    return this.cartBadge.textContent().catch(() => null);
  }
}
