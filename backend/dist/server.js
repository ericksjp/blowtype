import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initDatabase } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import typingRoutes from './routes/typingRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// Initialize database
initDatabase();
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/typing', typingRoutes);
app.use('/api/books', bookRoutes);
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(PORT, () => {
    console.log(`server running port ${PORT}`);
});
export default app;
