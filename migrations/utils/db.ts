import { MongoClient, Db } from 'mongodb';
import { CONFIGURATION } from './loadDotenv';

let db: Db;

export const getDb = async () => {
  if (db) {
    return db;
  }
  const client: MongoClient = await MongoClient.connect(CONFIGURATION.DB_URI);
  db = client.db();
  return db;
};
