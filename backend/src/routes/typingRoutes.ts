import { Router } from 'express';
import { submitTypingResult, getTypingHistory, getTypingStats } from '../controllers/typingController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/submit', authMiddleware, submitTypingResult);
router.get('/history', authMiddleware, getTypingHistory);
router.get('/stats', authMiddleware, getTypingStats);

export default router;
