import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/utils/db';
import { verifyToken } from '@/utils/jwt';

interface WorkoutData {
  type: string;
  time: number;
  repetitions: number[];
  exercises: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { type, time, repetitions, exercises }: WorkoutData = req.body;

if (!type || !time || !repetitions || !exercises) {
  return res.status(400).json({ message: 'Falta información del entrenamiento' });
}

try {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  const decoded = verifyToken(token)
  const { db } = await connectToDatabase() as { db: any };
  const workoutResult = await db.query(`
    INSERT INTO favouriteWod (userId, minutes, type)
    VALUES (?, ?, ?)
  `, [decoded.id, time, type]);

  const workoutIdResult = await db.query('SELECT LAST_INSERT_ID();');
  const workoutId = workoutIdResult[0][0]['LAST_INSERT_ID()'];

  for (let i = 0; i < exercises.length; i++) {
    await db.query(`
      INSERT INTO exercise (favouriteWodId, name, repetitions)
      VALUES (?, ?, ?);
    `, [workoutId, exercises[i], repetitions[i]]);
  }

  return res.status(200).json({ message: 'Datos del entrenamiento guardados exitosamente' });
} catch (error) {
  console.error('Error al guardar los datos del entrenamiento:', error);
  return res.status(500).json({ message: 'Error interno del servidor' });
}
}
