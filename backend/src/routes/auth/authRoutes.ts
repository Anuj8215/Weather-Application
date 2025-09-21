//SECTION - This code is written to create authentication routes for an Express application, including user registration, login, profile retrieval, and token refresh functionalities.
import { Router } from 'express';
import { AuthController } from '../../controllers/auth/AuthController.js';
import { validateLogin, validateRegistration } from '../../middleware/validation/validationMiddleware.js';
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
