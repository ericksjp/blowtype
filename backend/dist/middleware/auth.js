import jwt from 'jsonwebtoken';
import { UserModel } from '../models/index.js';
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'Invalid token.' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};
export const optionalAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = UserModel.findById(decoded.userId);
            if (user) {
                req.user = user;
            }
        }
        next();
    }
    catch (error) {
        // Continue without authentication
        next();
    }
};
