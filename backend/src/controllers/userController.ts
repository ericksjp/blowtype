import type { Response } from 'express';
import { UserModel, TypingResultModel } from '../models/index.js';
import type { AuthRequest } from '../types/index.js';

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const stats = TypingResultModel.getStatsByUserId(req.user.id);
    
    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
        createdAt: req.user.createdAt
      },
      stats
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
