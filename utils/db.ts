
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken'
require('dotenv').config();

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: 'jF1h,Z(+rMcr',
    database: process.env.DB_NAME,
  });
  await connection.connect();
  return {db: connection};
}
export const generateToken = (payload: any) => {
  if (!process.env.KEY) {
    throw new Error("Environment variable KEY is not defined");
  }
  const token = jwt.sign(payload, process.env.KEY, {expiresIn: '1h'});
  return token;
}
export const verifyToken = (token: any) => {
  if (!process.env.KEY) {
    throw new Error("Environment variable KEY is not defined");
  }
  try {
    const verifyTkn = jwt.verify(token, process.env.KEY);
    return verifyTkn;
  } catch (error) {
    return null;
  }
}