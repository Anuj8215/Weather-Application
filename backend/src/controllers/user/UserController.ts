//SECTION - This code is written to create a user controller for an Express application that manages user profiles, favorite locations, and account deletion.
import { Response } from 'express';
import { User } from '../../models/user/User.js';
import { AuthenticatedRequest } from '../../middleware/auth/authMiddleware.js';

export class UserController {
  updateProfile = async (
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
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
          notifications:
            preferences.notifications !== undefined
              ? preferences.notifications
              : true,
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

  updateFavoriteLocations = async (
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
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

  deleteAccount = async (
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
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
