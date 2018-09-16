import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.NODE_ENV === 'production'
  ? process.env.PROD_MONGODB_URI
  : process.env.MONGODB_URI;
const SECRET_PASSPHRASE = process.env.SECRET_PASSPHRASE;

export default {
  secret: SECRET_PASSPHRASE,
  database: MONGODB_URI,
};
