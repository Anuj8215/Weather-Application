// src/app.ts
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import authRoutes from './routes/auth/authRoutes';
import userRouter from './routes/user/userRoutes';
import weatherRoutes from './routes/weather/weatherRoutes';

dotenv.config();

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:19006'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 1000,
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api', limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), uptime: process.uptime(), memory: process.memoryUsage() });
});

app.use('/api/weather', weatherRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter);


app.get('/api', (_, res) => {
  res.json({
    message: 'Weather App API Server with Authentication is running!',
    version: '1.0.0',
    endpoints: {
      currentWeather: '/api/weather/current?latitude=18.5196&longitude=73.8554',
      weatherForecast: '/api/weather/forecast?latitude=18.5196&longitude=73.8554&days=7',
      locationSearch: '/api/weather/search?q=Mumbai',

      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      profile: 'GET /api/auth/profile',
      refreshToken: 'POST /api/auth/refresh',

      updateProfile: 'PUT /api/user/profile',
      updateLocations: 'PUT /api/user/locations',
      deleteAccount: 'DELETE /api/user/account'
    }
  });
});

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, _: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ success: false, message: 'Internal server error', ...(process.env.NODE_ENV === 'development' && { error: err.message }) });
  }
);

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

export default app;
