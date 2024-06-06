import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export const authenticate = (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.token; // Asume que el token JWT está almacenado en una cookie llamada 'token'

  if (!token) {
    res.status(401).json({ message: 'No autorizado' });
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY as string);
    return decoded;
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
    return null;
  }
};
