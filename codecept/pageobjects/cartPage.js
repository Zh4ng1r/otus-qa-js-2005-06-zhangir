/* global inject */
/* eslint-disable no-undef */

const { I } = inject();

class CartPage {
  constructor() {
    this.cartItem = '.cart_item';
    this.checkoutButton = '[data-test="checkout"]';
  }

  seeItem(name) {
    I.see(name, this.cartItem);
  }

  proceedToCheckout() {
    I.click(this.checkoutButton);
  }
}

module.exports = new CartPage();
