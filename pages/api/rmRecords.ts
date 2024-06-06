import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '@/utils/jwt';
import { connectToDatabase } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    try {
      const decoded = verifyToken(token);
      const { db } = await connectToDatabase() as { db: any };
      const { exerciseId, date, repetitions, kg, observations } = req.body;

      await db.query(
        'INSERT INTO rmRecords (userId, exerciseId, date, repetitions, kg, observations) VALUES (?, ?, ?, ?, ?, ?)',
        [decoded.id, exerciseId, date, repetitions, kg, observations]
      );

      res.status(200).json({ date, repetitions, kg, observations });
    } catch (error) {
      console.error('Error verifying token or saving RM data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    try {
      const decoded = verifyToken(token);
      const { db } = await connectToDatabase() as { db: any };
      const { exerciseId } = req.query;

      const [rows] = await db.query(
        'SELECT date, repetitions, kg, observations FROM rmRecords WHERE userId = ? AND exerciseId = ? ORDER BY date DESC LIMIT 1',
        [decoded.id, exerciseId]
      );

      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).json({ message: 'No RM data found' });
      }
    } catch (error) {
      console.error('Error verifying token or fetching RM data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
