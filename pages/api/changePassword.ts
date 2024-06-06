import { NextApiRequest, NextApiResponse } from 'next';
import { compare, hash } from 'bcryptjs';
import { verifyToken } from '@/utils/jwt';
import { connectToDatabase } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  //No token means that user is not logged in or session has expired
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const decoded = verifyToken(token);
    const { db } = await connectToDatabase() as { db: any };
    const result = await db.query('SELECT password FROM user WHERE id = ?', [decoded.id]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = result[0][0];
    const isMatch = await compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'La contraseña actual no es correcta' });
    }
    const isSamePassword = await compare(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({ message: 'La contraseña nueva no puede ser igual a la actual' });
    }

    const hashedPassword = await hash(newPassword, 10);
    await db.query('UPDATE user SET password = ? WHERE id = ?', [hashedPassword, decoded.id]);

    res.status(200).json({ success: true, message: 'Contraseña cambiada correctamente' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}