import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

export async function connectToDatabase() {
  const connection = await mysql.createConnection(dbConfig);
  return {db: connection}
}