import { Request, Response } from 'express';
import axios from 'axios';

export const processingScores = async (req: Request, res: Response) => {
  try {
    const {gameId, score} = req.body;
    const userId = req.user._id;

    if (!gameId || !score) {
      res.status(400).json({ error: 'Game ID and score are required' });
    }

    // En producción, publicarías en RabbitMQ en lugar de llamar directamente
    await axios.post(`http://score_service/scores`, { userId, gameId, score });

    res.status(200).json({ message: 'Score processed successfully' });

  } catch (err) {
    console.error('Error processing scores:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getLeaderboard = async (req: Request, res: Response) => {
  try {

    const limit = parseInt(req.query.limit as string) || 10;
    // En producción, llamarías al real-time service
    const response = await axios.get(`http://realtime_service/leaderboard?limit=${limit}`);

    const leaderboard = response.data;
    res.status(200).json(leaderboard);

  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}