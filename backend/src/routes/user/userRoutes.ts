import { Router } from 'express';
import { UserController } from '../../controllers/user/UserController.js';
import { authenticateToken } from '../../middleware/auth/authMiddleware.js';
import { validateLocationUpdate } from '../../middleware/validation/validationMiddleware.js';

const router = Router();
const userController = new UserController();

// ********************************** PUT **********************************
router.put('/profile', authenticateToken, userController.updateProfile);
router.put('/locations', authenticateToken, validateLocationUpdate, userController.updateFavoriteLocations);

// ********************************** DELETE **********************************
router.delete('/account', authenticateToken, userController.deleteAccount);

export default router;
