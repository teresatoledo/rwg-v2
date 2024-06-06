import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, generateToken } from '@/utils/db';
interface LoginData {
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email }: LoginData = req.body;
    try {
    const { db } = await connectToDatabase() as { db: any };
    const result = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    const user = result[0];
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}