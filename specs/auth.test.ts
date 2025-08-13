import config from '../src/framework/config';
import { login } from '../src/framework/services/authService';

describe('Авторизация', () => {
  test('Успешный логин', async () => {
    const data = await login(config.credentials.email, config.credentials.password);
    expect(data).toHaveProperty('token');
  });

  test('Логин с неверным паролем', async () => {
    await expect(login(config.credentials.email, 'wrongpass')).rejects.toThrow();
  });
});
