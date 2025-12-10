/* global inject */
/* eslint-disable no-undef */

const { I } = inject();

class CheckoutPage {
  constructor() {
    this.firstName = '[data-test="firstName"]';
    this.lastName = '[data-test="lastName"]';
    this.postalCode = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.finishButton = '[data-test="finish"]';
    this.completeHeader = '.complete-header';
  }

  fillCustomerInfo(first, last, zip) {
    I.fillField(this.firstName, first);
    I.fillField(this.lastName, last);
    I.fillField(this.postalCode, zip);
    I.click(this.continueButton);
  }

  finishOrder() {
    I.click(this.finishButton);
  }

  seeSuccess() {
    I.see('Thank you for your order!', this.completeHeader);
  }
}

module.exports = new CheckoutPage();
