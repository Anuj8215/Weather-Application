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
