import 'dotenv/config';

export default {
  baseURL: process.env.BASE_URL || 'https://reqres.in/api',
  credentials: {
    email: process.env.USER_EMAIL || 'eve.holt@reqres.in',
    password: process.env.USER_PASSWORD || 'cityslicka',
  },
};
