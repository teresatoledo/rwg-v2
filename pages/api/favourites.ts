import { connectToDatabase } from "@/utils/db";
import { verifyToken } from "@/utils/jwt";
import { NextApiRequest, NextApiResponse } from "next";
interface Exercise {
  name: string;
  repetitions: number;
}

interface Favourite {
  id: string;
  type: string;
  minutes: number;
  exercises: Exercise[];
}

interface FavouriteRow {
  id: string;
  type: string;
  minutes: number;
  exerciseId: string | null;
  exerciseName: string | null;
  repetitions: number | null;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const decoded = verifyToken(token);
    const { db } = await connectToDatabase() as { db: any };

    if (req.method === 'DELETE') {
      const favouriteId = req.query.id; // Get ID fav from url
      if (!favouriteId) {
        return res.status(400).json({ message: 'ID del favorito es requerido' });
      }
      // First, delete from the exercises table
      await db.query('DELETE FROM exercise WHERE favouriteWodId = ?', [favouriteId]);
      // Second, delete from favourite table.
      await db.query('DELETE FROM favouriteWod WHERE id = ?', [favouriteId]);
      res.status(204).end();
    } else {
      // Same query for both tables
      const [rows]: [FavouriteRow[]] = await db.query(`
        SELECT 
          fw.id, 
          fw.type, 
          fw.minutes, 
          e.id as exerciseId, 
          e.name as exerciseName, 
          e.repetitions 
        FROM favouriteWod fw
        LEFT JOIN exercise e ON fw.id = e.favouriteWodId
        WHERE fw.userId = ?
      `, [decoded.id]);

      // Group exercises for each fav wod
      const favourites = rows.reduce<Record<string, Favourite>>((acc, row) => {
        const { id, type, minutes, exerciseId, exerciseName, repetitions } = row;
        if (!acc[id]) {
          acc[id] = {
            id, // Incluir el ID del WOD favorito
            type,
            minutes,
            exercises: []
          };
        }

        if (exerciseId && exerciseName && repetitions !== null) {
          acc[id].exercises.push({ name: exerciseName, repetitions });
        }

        return acc;
      }, {});

      // Convertir el objeto en un array
      const favouritesArray = Object.values(favourites);

      res.json(favouritesArray);
    }
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
