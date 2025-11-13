import config from '../src/framework/config';
import { login } from '../src/framework/services/authService';

describe('Авторизация', () => {
  test('Успешный логин', async () => {
    const data = await login(config.reqresUser.email, config.reqresUser.password);
    expect(data).toHaveProperty('token');
    expect(data).toHaveProperty('user');
    expect(data.user).toHaveProperty('email', config.credentials.email);
  });

  test('Логин с неверным паролем', async () => {
    await expect(login(config.baseURL, 'wrongpass')).rejects.toThrow();
  });
});
