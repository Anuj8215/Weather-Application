// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather/weatherRoutes.js';
import authRoutes from './routes/auth/authRoutes.js';
import userRoutes from './routes/user/userRoutes.js';

//NOTE - Load environment variables
dotenv.config();

const app = express();

//NOTE -  Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

//NOTE -  Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased limit for free API
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

//NOTE -  API routes
app.use('/api/weather', weatherRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/api', (req, res) => {
  res.json({
    message: 'Weather App API Server with Authentication is running!',
    version: '1.0.0',
    endpoints: {
      // Weather endpoints
      currentWeather: '/api/weather/current?latitude=18.5196&longitude=73.8554',
      weatherForecast: '/api/weather/forecast?latitude=18.5196&longitude=73.8554&days=7',
      locationSearch: '/api/weather/search?q=Mumbai',
      
      // Auth endpoints
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      profile: 'GET /api/auth/profile',
      refreshToken: 'POST /api/auth/refresh',
      
      // User endpoints
      updateProfile: 'PUT /api/user/profile',
      updateLocations: 'PUT /api/user/locations',
      deleteAccount: 'DELETE /api/user/account'
    }
  });
});

//NOTE - Global error handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { error: err.message }),
    });
  },
);

//NOTE -  404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

export default app;

