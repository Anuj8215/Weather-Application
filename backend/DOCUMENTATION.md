---

## File contents

Below are the files with full contents. Each file is labeled and ready for copy/paste.

### `.gitignore`

```
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production build
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Uploads
uploads/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Database
*.db
*.sqlite

# Package manager
package-lock.json
```

### `.prettierignore`

```
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Build outputs
dist/
build/
*.tsbuildinfo
```

### `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "embeddedLanguageFormatting": "auto",
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "vueIndentScriptAndStyle": false,
  "experimentalTernaries": false,
  "overrides": [
```

### `.env.example`

```
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/weather-app
MONGODB_TEST_URI=mongodb://localhost:27017/weather-app-test

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Weather API Configuration
OPENWEATHER_API_KEY=your-openweather-api-key
WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:19006
```

### `tsconfig.json`

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@/controllers/*": ["src/controllers/*"],
      "@/models/*": ["src/models/*"],
      "@/routes/*": ["src/routes/*"],
      "@/middleware/*": ["src/middleware/*"],
      "@/services/*": ["src/services/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"],
      "@/config/*": ["src/config/*"],
    },
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"],
}
```

### `eslint.config.js`

```javascript
import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        AbortController: 'readonly',
        AbortSignal: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        Headers: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // TypeScript recommended rules
      ...tseslint.configs.recommended.rules,

      // Custom rules for better code quality
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off', // Allow implicit return types for cleaner code
      '@typescript-eslint/no-non-null-assertion': 'warn', // Warn instead of error for flexibility
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/no-var-requires': 'error',

      // General code quality rules
      'no-console': 'off', // Allow console in Node.js applications
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'prefer-const': 'error',
      'no-var': 'off', // Allow var in TypeScript declarations
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',

      // Import rules
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      ...eslint.configs.recommended.rules,
    },
  },
];
```

### `package.json`

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "scripts": {
    "test": "jest",
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test:watch": "jest --watch",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "engines": {
    "node": ">=22.0.0"
  },
  "dependencies": {
    "@types/express-rate-limit": "^5.1.3",
    "axios": "^1.7.7",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^5.1.0",
    "express-rate-limit": "^8.1.0",
    "express-validator": "^7.2.0",
    "helmet": "^8.0.0",
    "joi": "^17.13.3",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.19.0",
    "mongoose": "^8.18.1",
    "validator": "^13.15.15"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.13",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/node": "^22.7.5",
    "@types/supertest": "^6.0.2",
    "@types/validator": "^13.15.3",
    "@typescript-eslint/eslint-plugin": "^8.8.1",
    "@typescript-eslint/parser": "^8.8.1",
    "eslint": "^9.12.0",
    "jest": "^29.7.0",
    "nodemon": "^3.1.7",
    "prettier": "^3.3.3",
    "supertest": "^7.0.0",
    "tsx": "^4.19.1",
    "typescript": "^5.5.4"
  }
}
```

### `src/index.ts`

```typescript
//SECTION - THIS CODE IS WRITTEN FOR SERVER ENTRY POINT

import app from './app.js';
import { connectDB } from './config/database.js';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
      console.log(`📱 Health check: http://localhost:${PORT}/health`);
      console.log(`🌤️ API endpoint: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
```

### `src/app.ts`

```typescript
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
      deleteAccount: 'DELETE /api/user/account',
    },
  });
});

//NOTE - Global error handler
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
});

//NOTE -  404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

export default app;
```

### `src/env.ts`

```typescript
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
export const MONGO_URI = process.env.MONGODB_URI;
```

### `src/config/database.ts`

```typescript
import { MONGO_URI } from '@/env.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const options = {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };
    const connection = await mongoose.connect(String(MONGO_URI), options);
    console.log(`MongoDB connected: ${connection.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected successfully');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
  }
};
```

### `src/controllers/auth/AuthController.ts`

```typescript
//SECTION - This code is written to create an authentication controller for an Express application using JWT (JSON Web Tokens).
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user/User.js';
import { AuthenticatedRequest } from '../../middleware/auth/authMiddleware.js';

export class AuthController {
  private generateToken(userId: string, email: string): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    return jwt.sign({ userId, email }, secret, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, username, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
      });

      if (existingUser) {
        res.status(409).json({
          success: false,
          message:
            existingUser.email === email.toLowerCase()
              ? 'Email already registered'
              : 'Username already taken',
        });
        return;
      }

      // Create new user
      const user = new User({
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password,
        favoriteLocations: [],
        preferences: {
          temperatureUnit: 'celsius',
          theme: 'light',
          notifications: true,
        },
      });

      await user.save();

      // Generate token
      const token = this.generateToken(user.id, user.email);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            favoriteLocations: user.favoriteLocations,
            preferences: user.preferences,
            createdAt: user.createdAt,
          },
          token,
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Registration failed',
      });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
        return;
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
        return;
      }

      // Generate token
      const token = this.generateToken(user.id, user.email);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            favoriteLocations: user.favoriteLocations,
            preferences: user.preferences,
            createdAt: user.createdAt,
          },
          token,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed',
      });
    }
  };

  getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.user?.userId).select('-password');

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            favoriteLocations: user.favoriteLocations,
            preferences: user.preferences,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        },
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch profile',
      });
    }
  };

  refreshToken = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
        return;
      }

      const newToken = this.generateToken(req.user.userId, req.user.email);

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          token: newToken,
        },
      });
    } catch (error) {
      console.error('Token refresh error:', error);
      res.status(500).json({
        success: false,
        message: 'Token refresh failed',
      });
    }
  };
}
```

### `src/controllers/user/UserController.ts`

```typescript
//SECTION - This code is written to create a user controller for an Express application that manages user profiles, favorite locations, and account deletion.
import { Response } from 'express';
import { User } from '../../models/user/User.js';
import { AuthenticatedRequest } from '../../middleware/auth/authMiddleware.js';

export class UserController {
  updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { username, preferences } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
        return;
      }

      const updateData: any = {};

      if (username) {
        // Check if username is already taken by another user
        const existingUser = await User.findOne({
          username: username.toLowerCase(),
          _id: { $ne: userId },
        });

        if (existingUser) {
          res.status(409).json({
            success: false,
            message: 'Username already taken',
          });
          return;
        }

        updateData.username = username.toLowerCase();
      }

      if (preferences) {
        updateData.preferences = {
          temperatureUnit: preferences.temperatureUnit || 'celsius',
          theme: preferences.theme || 'light',
          notifications: preferences.notifications !== undefined ? preferences.notifications : true,
        };
      }

      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        select: '-password',
      });

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
            favoriteLocations: user.favoriteLocations,
            preferences: user.preferences,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        },
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update profile',
      });
    }
  };

  updateFavoriteLocations = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { locations } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
        return;
      }

      if (locations.length > 10) {
        res.status(400).json({
          success: false,
          message: 'Maximum 10 favorite locations allowed',
        });
        return;
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { favoriteLocations: locations },
        { new: true, select: '-password' },
      );

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Favorite locations updated successfully',
        data: {
          favoriteLocations: user.favoriteLocations,
        },
      });
    } catch (error) {
      console.error('Update favorite locations error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update favorite locations',
      });
    }
  };

  deleteAccount = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
        return;
      }

      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Account deleted successfully',
      });
    } catch (error) {
      console.error('Delete account error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete account',
      });
    }
  };
}
```

### `src/controllers/weather/WeatherController.ts`

```typescript
//
import { Request, Response } from 'express';
import { WeatherService } from '../../services/weather/WeatherService.js';
import { getWeatherDescription } from '../../utils/weatherCodes.js';

export class WeatherController {
  private weatherService: WeatherService;

  constructor() {
    this.weatherService = new WeatherService();
  }

  getCurrentWeather = async (req: Request, res: Response): Promise<void> => {
    try {
      const { latitude, longitude } = req.query;

      // Validate coordinates
      const lat = parseFloat(latitude as string);
      const lon = parseFloat(longitude as string);

      if (isNaN(lat) || isNaN(lon)) {
        res.status(400).json({
          success: false,
          message: 'Valid latitude and longitude parameters are required',
        });
        return;
      }

      if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        res.status(400).json({
          success: false,
          message:
            'Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180',
        });
        return;
      }

      const weatherData = await this.weatherService.getCurrentWeather(lat, lon);

      // Add weather description
      const weatherDescription = getWeatherDescription(weatherData.current.weatherCode);

      // Set cache control headers for live data
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      });

      res.status(200).json({
        success: true,
        data: {
          ...weatherData,
          current: {
            ...weatherData.current,
            description: weatherDescription.description,
            icon: weatherDescription.icon,
          },
        },
      });
    } catch (error) {
      console.error('getCurrentWeather error:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch weather data',
      });
    }
  };

  getWeatherForecast = async (req: Request, res: Response): Promise<void> => {
    try {
      const { latitude, longitude, days } = req.query;

      // Validate coordinates
      const lat = parseFloat(latitude as string);
      const lon = parseFloat(longitude as string);

      if (isNaN(lat) || isNaN(lon)) {
        res.status(400).json({
          success: false,
          message: 'Valid latitude and longitude parameters are required',
        });
        return;
      }

      if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        res.status(400).json({
          success: false,
          message:
            'Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180',
        });
        return;
      }

      const forecastDays = days ? parseInt(days as string, 10) : 10;
      if (forecastDays < 1 || forecastDays > 16) {
        res.status(400).json({
          success: false,
          message: 'Days parameter must be between 1 and 16',
        });
        return;
      }

      const forecastData = await this.weatherService.getWeatherForecast(lat, lon, forecastDays);

      // Add weather descriptions to current and daily data
      const currentDescription = getWeatherDescription(forecastData.current.weatherCode);

      const enhancedData = {
        ...forecastData,
        current: {
          ...forecastData.current,
          description: currentDescription.description,
          icon: currentDescription.icon,
        },
        daily: forecastData.daily
          ? {
              ...forecastData.daily,
              descriptions: forecastData.daily.weatherCode.map((code) =>
                getWeatherDescription(code),
              ),
            }
          : undefined,
      };

      // Set cache control headers for forecast data (can be cached longer than current weather)
      res.set({
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      });

      res.status(200).json({
        success: true,
        data: enhancedData,
      });
    } catch (error) {
      console.error('getWeatherForecast error:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch forecast data',
      });
    }
  };

  searchLocations = async (req: Request, res: Response): Promise<void> => {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string' || q.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Search query parameter "q" is required',
        });
        return;
      }

      const locations = await this.weatherService.searchLocation(q.trim());

      res.status(200).json({
        success: true,
        data: locations,
      });
    } catch (error) {
      console.error('searchLocations error:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to search locations',
      });
    }
  };
}
```

### `src/middleware/auth/authMiddleware.ts`

```typescript
//SECTION - This code is written to create authentication middleware for an Express application using JWT (JSON Web Tokens).

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/user/User.js';
import { AuthTokenPayload } from '../../types/index.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access token missing',
      });
      return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const decoded = jwt.verify(token, secret) as AuthTokenPayload;
    //NOTE - Verify if user exists
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
      });
      return;
    }
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
      return;
    }

    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication error',
    });
  }
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      next();
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      next();
      return;
    }

    const decoded = jwt.verify(token, secret) as AuthTokenPayload;
    const user = await User.findById(decoded.userId).select('-password');

    if (user) {
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
      };
    }

    next();
  } catch (_error) {
    next();
  }
};
```

### `src/middleware/validation/validationMiddleware.ts`

```typescript
//SECTION - This code is written to create authentication validation middleware for an Express application using JWT (JSON Web Tokens).

import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
  const { email, username, password } = req.body;
  const errors: string[] = [];

  //NOTE - Email validation
  if (!email || !validator.isEmail(email)) {
    errors.push('Valid email is required');
  }

  //NOTE - Username validation
  if (!username || !validator.isLength(username, { min: 3, max: 30 })) {
    errors.push('Username must be between 3 to 30 characters');
  }
  if (username && !validator.isAlphanumeric(username.trim())) {
    errors.push('Username must be alphanumeric');
  }

  //NOTE - Password validation
  if (!password || !validator.isLength(password, { min: 6 })) {
    errors.push('Password must be at least 6 characters long');
  }
  if (
    password &&
    !validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    errors.push('Password must include uppercase, lowercase, number and symbol');
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  } else {
    next();
  }
};
export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;
  const errors: string[] = [];

  //NOTE - Email validation
  if (!email || !validator.isEmail(email)) {
    errors.push('Valid email is required');
  }

  //NOTE - Password validation
  if (!password || !validator.isLength(password, { min: 6 })) {
    errors.push('Password must be at least 6 characters long');
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  } else {
    next();
  }
};
export const validateLocationUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const { locations } = req.body;

  if (!Array.isArray(locations)) {
    res.status(400).json({
      success: false,
      message: 'Locations must be an array',
    });
    return;
  }

  const errors: string[] = [];

  locations.forEach((location, index) => {
    if (!location.name || validator.isEmpty(location.name.trim())) {
      errors.push(`Location ${index + 1}: Name is required`);
    }

    if (
      typeof location.latitude !== 'number' ||
      location.latitude < -90 ||
      location.latitude > 90
    ) {
      errors.push(`Location ${index + 1}: Valid latitude (-90 to 90) is required`);
    }

    if (
      typeof location.longitude !== 'number' ||
      location.longitude < -180 ||
      location.longitude > 180
    ) {
      errors.push(`Location ${index + 1}: Valid longitude (-180 to 180) is required`);
    }
  });

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
    return;
  }

  next();
};
```

### `src/models/user/User.ts`

```typescript
// Removed conflicting import of User
import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  favoriteLocations: string[];
  preferences: {
    temperatureUnit: 'celsius' | 'fahrenheit';
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    favoriteLocations: [
      {
        type: String,
        trim: true,
      },
    ],
    preferences: {
      temperatureUnit: {
        type: String,
        enum: ['celsius', 'fahrenheit'],
        default: 'celsius',
      },
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light',
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        if (ret.password !== undefined) {
          delete ret.password;
        }
        return ret;
      } as (doc: Document, ret: Partial<IUser>) => Partial<IUser>,
    },
  },
);
//NOTE - Hash password before saving to DB

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

//NOTE -  Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export { User };
export default User;
```

### `src/routes/auth/authRoutes.ts`

```typescript
//SECTION - This code is written to create authentication routes for an Express application, including user registration, login, profile retrieval, and token refresh functionalities.
import { Router } from 'express';
import { AuthController } from '../../controllers/auth/AuthController.js';
import {
  validateLogin,
  validateRegistration,
} from '../../middleware/validation/validationMiddleware.js';
import { authenticateToken } from '../../middleware/auth/authMiddleware.js';

const router = Router();
const authController = new AuthController();

// POST /api/auth/register
router.post('/register', validateRegistration, authController.register);

// POST /api/auth/login
router.post('/login', validateLogin, authController.login);

// GET /api/auth/profile
router.get('/profile', authenticateToken, authController.getProfile);

// POST /api/auth/refresh
router.post('/refresh', authenticateToken, authController.refreshToken);

export default router;
```

### `src/routes/user/userRoutes.ts`

```typescript
//SECTION - This code is written to create user-related routes for an Express application, including profile updates, favorite location management, and account deletion.
import { Router } from 'express';
import { UserController } from '../../controllers/user/UserController.js';
import { authenticateToken } from '../../middleware/auth/authMiddleware.js';
import { validateLocationUpdate } from '../../middleware/validation/validationMiddleware.js';

const router = Router();
const userController = new UserController();

// PUT /api/user/profile
router.put('/profile', authenticateToken, userController.updateProfile);

// PUT /api/user/locations
router.put(
  '/locations',
  authenticateToken,
  validateLocationUpdate,
  userController.updateFavoriteLocations,
);

// DELETE /api/user/account
router.delete('/account', authenticateToken, userController.deleteAccount);

export default router;
```

### `src/routes/weather/weatherRoutes.ts`

```typescript
import { Router } from 'express';
import { WeatherController } from '../../controllers/weather/WeatherController.js';

const router = Router();
const weatherController = new WeatherController();

router.get('/current', weatherController.getCurrentWeather);
router.get('/forecast', weatherController.getWeatherForecast);
router.get('/search', weatherController.searchLocations);

export default router;
```

### `src/services/weather/WeatherService.ts`

```typescript
import { fetchWeatherApi } from 'openmeteo';
import {
  DailyWeatherData,
  HourlyWeatherData,
  LocationData,
  LocationSearchResult,
  Minutely15WeatherData,
  WeatherData,
  WeatherResponse,
} from '../../types/index.js';
export class WeatherService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
  }

  private range(start: number, stop: number, step: number): number[] {
    return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  }

  private calculateFeelsLike(temperature: number, humidity: number, windSpeed: number): number {
    const windChill = temperature <= 10 ? temperature - windSpeed * 0.7 : temperature;
    const heatIndex = temperature >= 27 ? temperature + humidity * 0.1 : temperature;
    return Math.round((windChill + heatIndex) / 2);
  }

  async getCurrentWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
    try {
      const params = {
        latitude,
        longitude,
        current: [
          'temperature_2m',
          'is_day',
          'rain',
          'weather_code',
          'wind_speed_10m',
          'wind_direction_10m',
          'relative_humidity_2m',
          'surface_pressure',
          'visibility',
          'dew_point_2m',
        ],
        minutely_15: ['rain', 'sunshine_duration', 'visibility', 'dew_point_2m', 'temperature_2m'],
        timezone: 'auto',
      };

      const responses = await fetchWeatherApi(this.baseUrl, params);
      const response = responses[0];

      if (!response) {
        throw new Error('No response from weather API');
      }

      // Location data
      const location: LocationData = {
        latitude: response.latitude(),
        longitude: response.longitude(),
        elevation: response.elevation(),
        timezone: response.timezone() || 'UTC',
        utcOffsetSeconds: response.utcOffsetSeconds(),
      };

      // Current weather data
      const current = response.current();
      if (!current) {
        throw new Error('No current weather data');
      }
      const currentWeather: WeatherData = {
        temperature: Math.round(current.variables(0)?.value() ?? 0),
        isDay: current.variables(1)?.value() === 1,
        rain: current.variables(2)?.value() ?? 0,
        weatherCode: current.variables(3)?.value() ?? 0,
        windSpeed: current.variables(4)?.value() ?? 0,
        windDirection: current.variables(5)?.value() ?? 0,
        humidity: current.variables(6)?.value() ?? 0,
        pressure: current.variables(7)?.value() ?? 0,
        visibility: (current.variables(8)?.value() ?? 0) / 1000, // Convert to km
        dewPoint: current.variables(9)?.value() ?? 0,
        sunshineDuration: 0, // Will be filled from minutely data if available
        feelsLike: this.calculateFeelsLike(
          Math.round(current.variables(0)?.value() ?? 0),
          current.variables(6)?.value() ?? 0,
          current.variables(4)?.value() ?? 0,
        ),
      };

      // Minutely 15 data
      let minutely15Data: Minutely15WeatherData | undefined;
      const minutely15 = response.minutely15();
      if (minutely15) {
        const timeRange = this.range(
          Number(minutely15.time()),
          Number(minutely15.timeEnd()),
          minutely15.interval(),
        ).map((t) => new Date((t + location.utcOffsetSeconds) * 1000));

        const rainValues = minutely15.variables(0)?.valuesArray();
        const sunshineValues = minutely15.variables(1)?.valuesArray();
        const visibilityValues = minutely15.variables(2)?.valuesArray();
        const dewPointValues = minutely15.variables(3)?.valuesArray();
        const temperatureValues = minutely15.variables(4)?.valuesArray();

        minutely15Data = {
          time: timeRange,
          rain: rainValues ? Array.from(rainValues) : [],
          sunshineDuration: sunshineValues ? Array.from(sunshineValues) : [],
          visibility: visibilityValues ? Array.from(visibilityValues) : [],
          dewPoint: dewPointValues ? Array.from(dewPointValues) : [],
          temperature: temperatureValues ? Array.from(temperatureValues) : [],
        };
      }

      return {
        location,
        current: currentWeather,
        minutely15: minutely15Data,
        lastUpdated: new Date(),
      };
    } catch (error) {
      console.error('Open-Meteo API Error:', error);
      throw new Error(
        `Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async getWeatherForecast(
    latitude: number,
    longitude: number,
    days: number = 10,
  ): Promise<WeatherResponse> {
    try {
      const params = {
        latitude,
        longitude,
        current: [
          'temperature_2m',
          'is_day',
          'rain',
          'weather_code',
          'wind_speed_10m',
          'wind_direction_10m',
          'relative_humidity_2m',
          'surface_pressure',
        ],
        hourly: [
          'temperature_2m',
          'rain',
          'relative_humidity_2m',
          'surface_pressure',
          'wind_speed_10m',
          'wind_direction_10m',
          'weather_code',
        ],
        daily: [
          'sunrise',
          'sunset',
          'uv_index_max',
          'daylight_duration',
          'sunshine_duration',
          'temperature_2m_max',
          'temperature_2m_min',
          'weather_code',
          'precipitation_sum',
        ],
        forecast_days: days,
        timezone: 'auto',
      };

      const responses = await fetchWeatherApi(this.baseUrl, params);
      const response = responses[0];

      if (!response) {
        throw new Error('No response from weather API');
      }

      // Location data
      const location: LocationData = {
        latitude: response.latitude(),
        longitude: response.longitude(),
        elevation: response.elevation(),
        timezone: response.timezone() || 'UTC',
        utcOffsetSeconds: response.utcOffsetSeconds(),
      };

      // Current weather
      const current = response.current();
      if (!current) {
        throw new Error('No current weather data');
      }
      const currentWeather: WeatherData = {
        temperature: Math.round(current.variables(0)?.value() ?? 0),
        isDay: current.variables(1)?.value() === 1,
        rain: current.variables(2)?.value() ?? 0,
        weatherCode: current.variables(3)?.value() ?? 0,
        windSpeed: current.variables(4)?.value() ?? 0,
        windDirection: current.variables(5)?.value() ?? 0,
        humidity: current.variables(6)?.value() ?? 0,
        pressure: current.variables(7)?.value() ?? 0,
        visibility: 0,
        dewPoint: 0,
        sunshineDuration: 0,
        feelsLike: this.calculateFeelsLike(
          Math.round(current.variables(0)?.value() ?? 0),
          current.variables(6)?.value() ?? 0,
          current.variables(4)?.value() ?? 0,
        ),
      };

      // Hourly data
      const hourly = response.hourly();
      if (!hourly) {
        throw new Error('No hourly weather data');
      }
      const hourlyTimeRange = this.range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval(),
      ).map((t) => new Date((t + location.utcOffsetSeconds) * 1000));

      const hourlyData: HourlyWeatherData = {
        time: hourlyTimeRange,
        temperature: Array.from(hourly.variables(0)?.valuesArray() ?? []),
        rain: Array.from(hourly.variables(1)?.valuesArray() ?? []),
        humidity: Array.from(hourly.variables(2)?.valuesArray() ?? []),
        pressure: Array.from(hourly.variables(3)?.valuesArray() ?? []),
        windSpeed: Array.from(hourly.variables(4)?.valuesArray() ?? []),
        windDirection: Array.from(hourly.variables(5)?.valuesArray() ?? []),
        weatherCode: Array.from(hourly.variables(6)?.valuesArray() ?? []),
      };

      // Daily data
      const daily = response.daily();
      if (!daily) {
        throw new Error('No daily weather data');
      }
      const dailyTimeRange = this.range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval(),
      ).map((t) => new Date((t + location.utcOffsetSeconds) * 1000));

      // Handle Int64 values for sunrise/sunset
      const sunriseVar = daily.variables(0);
      const sunsetVar = daily.variables(1);

      const dailyData: DailyWeatherData = {
        time: dailyTimeRange,
        sunrise: sunriseVar
          ? Array.from(
              { length: sunriseVar.valuesInt64Length() },
              (_, i) =>
                new Date((Number(sunriseVar.valuesInt64(i)) + location.utcOffsetSeconds) * 1000),
            )
          : [],
        sunset: sunsetVar
          ? Array.from(
              { length: sunsetVar.valuesInt64Length() },
              (_, i) =>
                new Date((Number(sunsetVar.valuesInt64(i)) + location.utcOffsetSeconds) * 1000),
            )
          : [],
        uvIndexMax: Array.from(daily.variables(2)?.valuesArray() ?? []),
        daylightDuration: Array.from(daily.variables(3)?.valuesArray() ?? []),
        sunshineDuration: Array.from(daily.variables(4)?.valuesArray() ?? []),
        temperatureMax: Array.from(daily.variables(5)?.valuesArray() ?? []),
        temperatureMin: Array.from(daily.variables(6)?.valuesArray() ?? []),
        weatherCode: Array.from(daily.variables(7)?.valuesArray() ?? []),
        precipitationSum: Array.from(daily.variables(8)?.valuesArray() ?? []),
      };

      return {
        location,
        current: currentWeather,
        hourly: hourlyData,
        daily: dailyData,
        lastUpdated: new Date(),
      };
    } catch (error) {
      console.error('Open-Meteo Forecast API Error:', error);
      throw new Error(
        `Failed to fetch forecast data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async searchLocation(query: string): Promise<
    Array<{
      name: string;
      latitude: number;
      longitude: number;
      country: string;
    }>
  > {
    try {
      const geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';
      const response = await fetch(
        `${geocodingUrl}?name=${encodeURIComponent(query)}&count=10&language=en&format=json`,
      );

      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.results) {
        return [];
      }

      return data.results.map((result: LocationSearchResult) => ({
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude,
        country: result.country || '',
        admin1: result.admin1 || '',
        admin2: result.admin2 || '',
      }));
    } catch (error) {
      console.error('Location search error:', error);
      throw new Error(
        `Failed to search locations: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
```

### `src/types/index.ts`

```typescript
//NOTE - This file contains TypeScript interfaces for various data structures used in the application.
// src/types/index.ts
export interface WeatherData {
  temperature: number;
  feelsLike: number;
  isDay: boolean;
  rain: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  pressure: number;
  visibility: number;
  dewPoint: number;
  sunshineDuration: number;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  utcOffsetSeconds: number;
}

export interface HourlyWeatherData {
  time: Date[];
  temperature: number[];
  rain: number[];
  humidity: number[];
  pressure: number[];
  windSpeed: number[];
  windDirection: number[];
  weatherCode: number[];
}

export interface DailyWeatherData {
  time: Date[];
  sunrise: Date[];
  sunset: Date[];
  uvIndexMax: number[];
  daylightDuration: number[];
  sunshineDuration: number[];
  temperatureMax: number[];
  temperatureMin: number[];
  weatherCode: number[];
  precipitationSum: number[];
}

export interface Minutely15WeatherData {
  time: Date[];
  rain: number[];
  sunshineDuration: number[];
  visibility: number[];
  dewPoint: number[];
  temperature: number[];
}

export interface WeatherResponse {
  location: LocationData;
  current: WeatherData;
  hourly?: HourlyWeatherData;
  daily?: DailyWeatherData;
  minutely15?: Minutely15WeatherData;
  lastUpdated: Date;
}

export interface WeatherCodeDescription {
  code: number;
  description: string;
  icon: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  favoriteLocations: Array<{
    name: string;
    latitude: number;
    longitude: number;
  }>;
  preferences: {
    temperatureUnit: 'celsius' | 'fahrenheit';
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface LocationSearchResult {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  admin2?: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
}
```

### `src/utils/weatherCodes.ts`

```typescript
// src/utils/weatherCodes.ts
import { WeatherCodeDescription } from '../types/index.js';

// WMO Weather interpretation codes (WW)
export const weatherCodes: Record<number, WeatherCodeDescription> = {
  0: { code: 0, description: 'Clear sky', icon: '☀️' },
  1: { code: 1, description: 'Mainly clear', icon: '🌤️' },
  2: { code: 2, description: 'Partly cloudy', icon: '⛅' },
  3: { code: 3, description: 'Overcast', icon: '☁️' },
  45: { code: 45, description: 'Fog', icon: '🌫️' },
  48: { code: 48, description: 'Depositing rime fog', icon: '🌫️' },
  51: { code: 51, description: 'Light drizzle', icon: '🌦️' },
  53: { code: 53, description: 'Moderate drizzle', icon: '🌦️' },
  55: { code: 55, description: 'Dense drizzle', icon: '🌧️' },
  56: { code: 56, description: 'Light freezing drizzle', icon: '🌨️' },
  57: { code: 57, description: 'Dense freezing drizzle', icon: '🌨️' },
  61: { code: 61, description: 'Slight rain', icon: '🌧️' },
  63: { code: 63, description: 'Moderate rain', icon: '🌧️' },
  65: { code: 65, description: 'Heavy rain', icon: '⛈️' },
  66: { code: 66, description: 'Light freezing rain', icon: '🌨️' },
  67: { code: 67, description: 'Heavy freezing rain', icon: '🌨️' },
  71: { code: 71, description: 'Slight snow fall', icon: '❄️' },
  73: { code: 73, description: 'Moderate snow fall', icon: '❄️' },
  75: { code: 75, description: 'Heavy snow fall', icon: '❄️' },
  77: { code: 77, description: 'Snow grains', icon: '❄️' },
  80: { code: 80, description: 'Slight rain showers', icon: '🌦️' },
  81: { code: 81, description: 'Moderate rain showers', icon: '🌧️' },
  82: { code: 82, description: 'Violent rain showers', icon: '⛈️' },
  85: { code: 85, description: 'Slight snow showers', icon: '🌨️' },
  86: { code: 86, description: 'Heavy snow showers', icon: '❄️' },
  95: { code: 95, description: 'Thunderstorm', icon: '⛈️' },
  96: { code: 96, description: 'Thunderstorm with slight hail', icon: '⛈️' },
  99: { code: 99, description: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

export const getWeatherDescription = (code: number): WeatherCodeDescription => {
  return weatherCodes[code] || { code, description: 'Unknown', icon: '❓' };
};
```
