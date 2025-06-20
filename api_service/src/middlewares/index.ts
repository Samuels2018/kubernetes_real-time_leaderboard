import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const response = await axios.get('http://auth_service/validate', {
      headers: { Authorization: `Bearer ${token}` }
    });
    req.user = response.data;
    next();
  } catch (err) {
    console.error('Token validation error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
}