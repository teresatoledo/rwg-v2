import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { connectToDatabase } from '@/utils/db';
import jwt from 'jsonwebtoken';
import { setCookie } from 'nookies';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { firstName, lastName, email, password }: RegisterData = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const hashedPassword = await hash(password, 10);

    if (!process.env.KEY) {
      throw new Error("Environment variable DB_KEY is not defined");
    }
    try {
      const { db } = await connectToDatabase() as { db: any };
      await db.query('INSERT INTO user (firstName, lastName, email, password) VALUES (?, ?, ?, ?)', [
        firstName,
        lastName,
        email,
        hashedPassword,
      ]);
  
      return res.status(201).json({ success: true, message: 'Usuario registrado correctamente' });
    } catch (error) {
      console.error('Error al registrar usuario en la base de datos:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
