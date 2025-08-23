import Joi from 'joi';
import { TypingResultModel } from '../models/index.js';
const submitResultSchema = Joi.object({
    bookId: Joi.number().integer().min(1).required(),
    chapterId: Joi.number().integer().min(1).required(),
    pageIndex: Joi.number().integer().min(0).required(),
    wpm: Joi.number().min(0).required(),
    accuracy: Joi.number().min(0).max(100).required(),
    duration: Joi.number().integer().min(0).required(),
    errorsCount: Joi.number().integer().min(0).required()
});
export const submitTypingResult = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const { error, value } = submitResultSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const resultData = value;
        const typingResult = TypingResultModel.create({
            userId: req.user.id,
            ...resultData
        });
        res.status(201).json({
            message: 'Typing result saved successfully',
            result: typingResult
        });
    }
    catch (error) {
        console.error('Submit typing result error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getTypingHistory = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const results = TypingResultModel.findByUserId(req.user.id);
        res.json({
            results,
            total: results.length
        });
    }
    catch (error) {
        console.error('Get typing history error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getTypingStats = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const stats = TypingResultModel.getStatsByUserId(req.user.id);
        res.json(stats);
    }
    catch (error) {
        console.error('Get typing stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
