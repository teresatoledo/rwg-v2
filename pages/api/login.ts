import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import { connectToDatabase } from '@/utils/db';

interface LoginData {
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password }: LoginData = req.body;
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    const { db } = await connectToDatabase() as { db: any };
    const result = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (result.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = result[0];
    if (!user[0].password) {
      return res.status(500).json({ message: 'Error interno del servidor: contraseña no encontrada' });
    }
    const isValidPassword = await compare(password, user[0].password);
    console.log('Resultado de la comparación de contraseña:', isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    return res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}