import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import { Database } from 'sqlite';

let db: Database;

const connectDB = async () => {
  if (!db) {
    console.log('Connecting to the database...');
    db = await open({
      filename: './src/db/database.db',
      driver: sqlite3.Database,
    });
    console.log('Database connected.');
  }

  // Ensure users table exists
  await db.exec(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, email TEXT UNIQUE, password TEXT)'
  );
  await db.exec(
    'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)'
  );

  
};

const getDB = () => {
  if (!db) {
    console.error('Database connection is not established!');
  }
  return db;
};
export { connectDB, getDB };
