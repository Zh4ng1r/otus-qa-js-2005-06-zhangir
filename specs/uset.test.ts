import { getUser, deleteUser, createUser } from '../src/framework/services/userService';

describe('Операции с пользователем', () => {
  test('Получение информации о пользователе', async () => {
    const userId = 2;
    const user = await getUser(userId);
    expect(user.data).toHaveProperty('id', userId);
  });

  test('Создание пользователя', async () => {
    const name = 'John Doe';
    const job = 'QA Engineer';
    const createdUser = await createUser(name, job);
    expect(createdUser).toHaveProperty('name', name);
    expect(createdUser).toHaveProperty('job', job);
  });

  test('Удаление пользователя', async () => {
    const response = await deleteUser(2);
    expect(response.status).toBe(204);
  });
});
