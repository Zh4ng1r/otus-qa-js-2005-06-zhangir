import config from '../src/framework/config';
import {
  generateBookstoreToken,
  createBook,
  updateBook,
  getBook,
  deleteBook,
} from '../src/framework/services/bookService';
import { testIsbn, newIsbn } from '../src/fixtures/bookData';

let token: string;
let userId: string;

beforeAll(async () => {
  token = await generateBookstoreToken(
    config.bookstoreUser.username,
    config.bookstoreUser.password,
  );

  const res = await fetch(`${config.bookstoreURL}/Account/v1/User`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config.bookstoreUser),
  });
  const json = await res.json();
  userId = json.userID;
});

describe('Тесты на API Bookstore', () => {
  test('Создание книги', async () => {
    const res = await createBook(userId, testIsbn, token);
    expect(res.books[0].isbn).toBe(testIsbn);
  });

  test('Обновление книги', async () => {
    const res = await updateBook(testIsbn, newIsbn, userId, token);
    expect(res.isbn).toBe(newIsbn);
  });

  test.each([[testIsbn], [newIsbn]])('Получение информации о книге %s', async (isbn) => {
    const book = await getBook(isbn);
    expect(book.isbn).toBe(isbn);
    expect(book).toHaveProperty('title');
  });

  test('Удаление книги', async () => {
    const res = await deleteBook(newIsbn, userId, token);
    expect(res.status).toBe(204);
  });
});
