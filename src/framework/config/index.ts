import 'dotenv/config';

export default {
  baseURL: process.env.BASE_URL || 'https://reqres.in/api',
  bookstoreURL: process.env.BOOKSTORE_URL || 'https://bookstore.demoqa.com',
  reqresUser: {
    email: process.env.USER_EMAIL || 'eve.holt@reqres.in',
    password: process.env.USER_PASSWORD || 'cityslicka',
  },
  bookstoreUser: {
    username: process.env.BOOKSTORE_USER || 'TestUser123',
    password: process.env.BOOKSTORE_PASSWORD || 'Pass@123',
  },
};
