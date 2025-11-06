import axios from 'axios';
import config from '../config';

export async function login(email: string, password: string) {
  const response = await axios.post(`${config.baseURL}/login`, { email, password });
  return response.data;
}
