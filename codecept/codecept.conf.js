/* eslint-env node */
/* eslint-disable no-undef */

const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://www.saucedemo.com',
      show: false,
      browser: 'chromium',
      waitForTimeout: 5000,
    },
  },
  include: {
    I: './steps_file.js',
    loginPage: './pageobjects/loginPage.js',
    inventoryPage: './pageobjects/inventoryPage.js',
    cartPage: './pageobjects/cartPage.js',
    checkoutPage: './pageobjects/checkoutPage.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'otus',
};
