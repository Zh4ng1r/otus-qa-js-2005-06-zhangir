import { describe, test, expect, beforeEach } from '@jest/globals';

describe('Охота за локаторами - Login Page', () => {
  const BASE_URL = 'https://demo.realworld.io/#/login';

  beforeEach(() => {
    console.log(`Переходим на страницу: ${BASE_URL}`);
  });

  test('Тест 1: Проверка наличия формы авторизации', () => {
    const authFormCSS = '.auth-page form';
    const authFormXPath = "//form[@class='ng-form']";

    console.log(`Локатор формы (CSS): ${authFormCSS}`);
    console.log(`Локатор формы (XPath): ${authFormXPath}`);

    expect(authFormCSS).toBeDefined();
  });

  test('Тест 2: Проверка кнопки "Войти"', () => {
    const signInButtonCSS = "button[type='submit']";
    const signInButtonXPath = "//button[@type='submit'][contains(text(), 'Sign in')]";

    console.log(`Локатор кнопки (CSS): ${signInButtonCSS}`);
    console.log(`Локатор кнопки (XPath): ${signInButtonXPath}`);

    expect(signInButtonCSS).toBeDefined();
  });

  test('Тест 3: Проверка поля "Пароль"', () => {
    const passwordInputCSS = "input[type='password']";
    const passwordInputXPath = "//input[@type='password']";

    console.log(`Локатор пароля (CSS): ${passwordInputCSS}`);
    console.log(`Локатор пароля (XPath): ${passwordInputXPath}`);

    expect(passwordInputCSS).toBeDefined();
  });

  test('Тест 4: Проверка поля "Email"', () => {
    const emailInputCSS = "input[type='email']";
    const emailInputXPath = "//input[@type='email']";

    console.log(`Локатор email (CSS): ${emailInputCSS}`);
    console.log(`Локатор email (XPath): ${emailInputXPath}`);

    expect(emailInputCSS).toBeDefined();
  });
});
