import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import env from './config/env.js';
import errorHandler from './middlewares/error.middleware.js';
import apiLimiter from './middlewares/rateLimit.middleware.js';
import authRoutes from './modules/auth/auth.routes.js';
import interviewRoutes from './modules/interview/interview.routes.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limit protection
app.use('/api/', apiLimiter);

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);

// Root health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', time: new Date() });
});

// Global error handler
app.use(errorHandler);

export default app;
