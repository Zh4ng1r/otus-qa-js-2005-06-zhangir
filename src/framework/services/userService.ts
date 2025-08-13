import axios from 'axios';
import config from '../config';

export async function getUser(userId: number) {
  const response = await axios.get(`${config.baseURL}/users/${userId}`);
  return response.data;
}

export async function deleteUser(userId: number) {
  return axios.delete(`${config.baseURL}/users/${userId}`);
}

export async function createUser(name: string, job: string) {
  const response = await axios.post(`${config.baseURL}/users`, { name, job });
  return response.data;
}
