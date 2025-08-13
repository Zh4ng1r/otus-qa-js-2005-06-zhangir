import axios from 'axios';
import config from '../config';

export async function generateBookstoreToken(username: string, password: string) {
  const { data } = await axios.post(`${config.bookstoreURL}/Account/v1/GenerateToken`, {
    userName: username,
    password: password,
  });
  return data.token;
}

export async function createBook(userId: string, isbn: string, token: string) {
  const { data } = await axios.post(
    `${config.bookstoreURL}/BookStore/v1/Books`,
    {
      userId,
      collectionOfIsbns: [{ isbn }],
    },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return data;
}

export async function updateBook(isbn: string, newIsbn: string, userId: string, token: string) {
  const { data } = await axios.put(
    `${config.bookstoreURL}/BookStore/v1/Books/${isbn}`,
    { isbn: newIsbn, userId },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return data;
}

export async function getBook(isbn: string) {
  const { data } = await axios.get(`${config.bookstoreURL}/BookStore/v1/Book?ISBN=${isbn}`);
  return data;
}

export async function deleteBook(isbn: string, userId: string, token: string) {
  return axios.delete(`${config.bookstoreURL}/BookStore/v1/Book`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { isbn, userId },
  });
}
