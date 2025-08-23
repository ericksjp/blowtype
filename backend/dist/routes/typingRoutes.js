import { Router } from 'express';
import { submitTypingResult, getTypingHistory, getTypingStats } from '../controllers/typingController.js';
import { authMiddleware } from '../middleware/auth.js';
const router = Router();
// Submit results requires authentication (guests can't save progress)
router.post('/submit', authMiddleware, submitTypingResult);
// Statistics endpoints require authentication for personalized data
router.get('/history', authMiddleware, getTypingHistory);
router.get('/stats', authMiddleware, getTypingStats);
export default router;
