/* global inject */
/* eslint-disable no-undef */

const { I } = inject();

class InventoryPage {
  constructor() {
    this.inventoryContainer = '#inventory_container';
    this.cartBadge = '.shopping_cart_badge';
    this.cartLink = '.shopping_cart_link';
    this.sortSelect = '[data-test="product_sort_container"]';
    this.inventoryItem = '.inventory_item';
    this.itemPrice = '.inventory_item_price';
  }

  isLoaded() {
    I.seeElement(this.inventoryContainer);
  }

  addItemByName(name) {
    I.click(`.inventory_item_name=${name}`);
    I.click('button[data-test^="add-to-cart"]');
  }

  addFirstItem() {
    I.click('(//button[contains(@data-test,"add-to-cart")])[1]');
  }

  openCart() {
    I.click(this.cartLink);
  }

  seeItemsCountInCart(count) {
    I.see(count.toString(), this.cartBadge);
  }

  sortBy(optionValue) {
    I.selectOption(this.sortSelect, optionValue);
  }

  async grabPrices() {
    const pricesText = await I.grabTextFromAll(this.itemPrice);
    return pricesText.map((t) => parseFloat(t.replace('$', '')));
  }
}

module.exports = new InventoryPage();
