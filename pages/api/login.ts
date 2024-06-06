import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import { connectToDatabase, generateToken } from '@/utils/db';
import { setCookie } from 'nookies';
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
    return res.status(400).json({ message: 'Email y contraseña requeridos' });
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
    if(isValidPassword) {
      const infoToken = {
        id: result[0][0].id,
        email: result[0][0].email,
      }
      const token = generateToken(infoToken);
      setCookie({ res }, 'token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hora
        path: '/',
      });
      res.json({success: true, token: token})
    } else {
      res.json({success: false, message: 'Invalid password'})
    }
  } catch (error) {
    console.error('Error in login handler:', error);  // Logging the error
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}