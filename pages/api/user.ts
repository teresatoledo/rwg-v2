// pages/api/user.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '@/utils/jwt';
import { connectToDatabase } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const decoded = verifyToken(token);
    const { db } = await connectToDatabase() as { db: any };
    const result = await db.query('SELECT firstName, lastName, email FROM user WHERE id = ?', [decoded.id]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = result[0][0];
    res.json(user);
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
