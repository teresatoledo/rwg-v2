import { connectToDatabase } from "@/utils/db";
import { verifyToken } from "@/utils/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const decoded = verifyToken(token);
    const { db } = await connectToDatabase() as { db: any };

    if (req.method === 'DELETE') {
      const favouriteId = req.query.id; // Obtener el ID del favorito a eliminar desde la URL
      if (!favouriteId) {
        return res.status(400).json({ message: 'ID del favorito es requerido' });
      }
      // Primero eliminar registros relacionados en la tabla de ejercicios
      await db.query('DELETE FROM exercise WHERE favouriteWodId = ?', [favouriteId]);
      // Luego eliminar el registro de la tabla favouriteWod
      await db.query('DELETE FROM favouriteWod WHERE id = ?', [favouriteId]);
      res.status(204).end(); // Devolver respuesta 204 No Content para indicar que se ha eliminado correctamente
    } else {
      // Realizar la consulta para obtener los datos de ambas tablas
      const [rows] = await db.query(`
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

      // Procesar los resultados para agrupar los ejercicios por cada WOD favorito
      const favourites = rows.reduce((acc, row) => {
        const { id, type, minutes, exerciseId, exerciseName, repetitions } = row;
        if (!acc[id]) {
          acc[id] = {
            id, // Incluir el ID del WOD favorito
            type,
            minutes,
            exercises: []
          };
        }

        if (exerciseId) {
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
