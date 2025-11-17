import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/framework/pages/LoginPage';
import { InventoryPage } from '../src/framework/pages/InventoryPage';
import { CartPage } from '../src/framework/pages/CartPage';
import { CheckoutYourInfoPage, CheckoutOverviewPage } from '../src/framework/pages/CheckoutPages';

test.describe('HW13 — Page Object tests (saucedemo)', () => {
  test('1) Успешный логин и выход (login -> inventory -> logout)', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    expect(await inventory.isVisible()).toBe(true);

    await inventory.logout();
    expect(await page.locator('#login-button').isVisible()).toBe(true);
  });

  test('2) Ошибка при входе для locked_out_user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');

    const err = await login.getError();
    expect(err).toBeTruthy();
    expect(err?.toLowerCase()).toContain('sorry');
  });

  test('3) Добавление товара в корзину', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await inventory.addToCartByIndex(0);
    const count = await inventory.cartCount();
    expect(count).toBe('1');

    await inventory.openCart();
    expect(await cart.itemCount()).toBe(1);
  });

  test('4) Удаление товара из корзины', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await inventory.addToCartByIndex(0);
    await inventory.openCart();

    expect(await cart.itemCount()).toBe(1);
    await cart.removeAll();
    expect(await cart.itemCount()).toBe(0);
  });

  test('5) Полный чек-аут (add -> cart -> checkout -> finish)', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkoutInfo = new CheckoutYourInfoPage(page);
    const overview = new CheckoutOverviewPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    // добавить товар
    await inventory.addToCartByIndex(0);
    await inventory.openCart();

    await cart.checkout();
    await checkoutInfo.fillInfo('Ivan', 'Ivanov', '12345');

    await overview.finish();
    const complete = await overview.orderCompleteText();
    expect(complete).toBeTruthy();
    expect(complete?.toLowerCase()).toContain('thank you');
  });
});
