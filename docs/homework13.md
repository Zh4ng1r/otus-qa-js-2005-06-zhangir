# Домашнее задание №13 — UI тесты (Page Object)

Добавлены Page Object и 5 функциональных сценариев для сайта https://www.saucedemo.com

Файлы:

- `src/framework/pages/LoginPage.ts` — логика страницы логина
- `src/framework/pages/InventoryPage.ts` — список товаров, добавление в корзину, логаут
- `src/framework/pages/CartPage.ts` — корзина, удаление товаров, переход в checkout
- `src/framework/pages/CheckoutPages.ts` — страницы checkout (info / overview)
- `specs/homework13-ui.test.ts` — 5 тестов, использующих Page Object

Как запустить локально:

1. Убедитесь, что зависимости установлены:

```bash
npm install
```

2. Запустить тесты Playwright (chromium):

```bash
npx playwright test specs/homework13-ui.test.ts -g "HW13" --project=chromium
```

Или просто запустить все UI тесты:

```bash
npx playwright test
```

Примечания:
- Тесты используют общедоступный demo-сайт `saucedemo` и стандартные тестовые учётные данные.
- Если нужно, могу добавить более подробные проверки, ожидания или дополнительные Page Object методы.
