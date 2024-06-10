require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

export const CONFIGURATION = {
  DB_URI: process.env.MONGODB_URI || '',
};
