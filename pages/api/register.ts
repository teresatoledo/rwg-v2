import {NextApiRequest, NextApiResponse} from 'next';
import {hash} from 'bcryptjs'
import { connectToDatabase } from '@/utils/db';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Método no permitido'});
  }
  const {firstName, lastName, email, password}: RegisterData = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }
  try {
    const hashedPassword = await hash(password, 10);
    const { db } = await connectToDatabase() as { db: any };
    await db.query('INSERT INTO user (firstName, lastName, email, password) VALUES (?, ?, ?, ?)', [
      firstName,
      lastName,
      email,
      hashedPassword,
    ]);
    return res.status(201).json({message:'Usuario registrado correctamente'});
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({message: 'Error interno del servidor '})
  }
}