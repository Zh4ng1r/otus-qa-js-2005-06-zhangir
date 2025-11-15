import axios from 'axios';
import config from '../config';

export async function login(email: string, password: string) {
  const response = await axios.post(`${config.baseURL}/login`, { email, password });
  return response.data;
}

export async function generateToken(username: string, password: string) {
  const { data } = await axios.post(`${config.bookstoreUser}/Account/v1/GenerateToken`, {
    userName: username,
    password: password,
  });
  return data.token;
}
