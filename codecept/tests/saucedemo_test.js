/* eslint-env node */
/* global Feature, Scenario, Before */
/* eslint-disable no-undef */

const loginPage = require('../pageobjects/loginPage');
const inventoryPage = require('../pageobjects/inventoryPage');
const cartPage = require('../pageobjects/cartPage');
const checkoutPage = require('../pageobjects/checkoutPage');

Feature('Saucedemo - UI tests with PageObject');

Before(() => {
  loginPage.open();
});

Scenario('Успешный логин стандартного пользователя', ({ I }) => {
  loginPage.login('standard_user', 'secret_sauce');
  inventoryPage.isLoaded();
  I.see('Products');
}).tag('login');

Scenario('Неуспешный логин заблокированного пользователя', ({ I }) => {
  loginPage.login('locked_out_user', 'secret_sauce');
  loginPage.seeError('Sorry, this user has been locked out.');
})
  .tag('login')
  .tag('negative');

Scenario('Добавление товара в корзину и проверка бейджа', ({ I }) => {
  loginPage.login('standard_user', 'secret_sauce');
  inventoryPage.isLoaded();

  inventoryPage.addFirstItem();

  inventoryPage.seeItemsCountInCart(1);

  inventoryPage.openCart();
  cartPage.seeItem('Sauce Labs');
}).tag('cart');

Scenario('Сортировка товаров по цене по возрастанию', async ({ I }) => {
  loginPage.login('standard_user', 'secret_sauce');
  inventoryPage.isLoaded();

  inventoryPage.sortBy('lohi');

  const prices = await inventoryPage.grabPrices();
  const sorted = [...prices].sort((a, b) => a - b);
  I.assertDeepEqual(prices, sorted);
}).tag('sorting');

Scenario('Полный путь покупки товара', ({ I }) => {
  loginPage.login('standard_user', 'secret_sauce');
  inventoryPage.isLoaded();

  inventoryPage.addItemByName('Sauce Labs Backpack');
  inventoryPage.openCart();

  cartPage.seeItem('Sauce Labs Backpack');
  cartPage.proceedToCheckout();

  checkoutPage.fillCustomerInfo('John', 'Doe', '12345');
  checkoutPage.finishOrder();

  checkoutPage.seeSuccess();
}).tag('checkout');
