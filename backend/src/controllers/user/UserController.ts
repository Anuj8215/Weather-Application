import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth/authMiddleware.js';
import { User } from '../../models/user/User.js';

interface Preferences {
  temperatureUnit?: 'celsius' | 'fahrenheit';
  theme?: 'light' | 'dark';
  notifications?: boolean;
}

interface IUserUpdate {
  username?: string;
  preferences?: Preferences;
}

export class UserController {
  getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) return void res.status(401).json({ success: false, message: 'User not authenticated' });

      const user = await User.findById(userId, '-password');
      if (!user) return void res.status(404).json({ success: false, message: 'User not found' });

      const responseData = {
        id: user._id, email: user.email, username: user.username,
        favoriteLocations: user.favoriteLocations, preferences: user.preferences,
        createdAt: user.createdAt, updatedAt: user.updatedAt
      };

      return void res.status(200).json({ success: true, message: 'Profile retrieved successfully', data: { user: responseData } });
    } catch (error) {
      console.error('Get profile error:', error);
      return void res.status(500).json({ success: false, message: 'Failed to get profile' });
    }
  };

  updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { username, preferences } = req.body;
      const userId = req.user?.userId;
      if (!userId) return void res.status(401).json({ success: false, message: 'User not authenticated' });

      const updateData: IUserUpdate = {};
      if (username) {
        const existingUser = await User.findOne({ username: username.toLowerCase(), _id: { $ne: userId } });
        if (existingUser) return void res.status(409).json({ success: false, message: 'Username already taken' });
        updateData.username = username.toLowerCase();
      }

      if (preferences) {
        updateData.preferences = {
          temperatureUnit: preferences.temperatureUnit || 'celsius',
          theme: preferences.theme || 'light',
          notifications: preferences.notifications !== undefined ? preferences.notifications : true
        };
      }

      const user = await User.findByIdAndUpdate(userId, updateData, { new: true, select: '-password' });
      if (!user) return void res.status(404).json({ success: false, message: 'User not found' });

      const responseData = {
        id: user._id, email: user.email, username: user.username,
        favoriteLocations: user.favoriteLocations, preferences: user.preferences,
        createdAt: user.createdAt, updatedAt: user.updatedAt
      };

      return void res.status(200).json({ success: true, message: 'Profile updated successfully', data: { user: responseData } });
    } catch (error) {
      console.error('Update profile error:', error);
      return void res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
  };

  updateFavoriteLocations = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { locations } = req.body;
      const userId = req.user?.userId;

      if (!userId) return void res.status(401).json({ success: false, message: 'User not authenticated' });
      if (locations.length > 10) return void res.status(400).json({ success: false, message: 'Maximum 10 favorite locations allowed' });

      const user = await User.findByIdAndUpdate(userId, { favoriteLocations: locations }, { new: true, select: '-password' });
      if (!user) return void res.status(404).json({ success: false, message: 'User not found' });

      return void res.status(200).json({ success: true, message: 'Favorite locations updated successfully', data: { favoriteLocations: user.favoriteLocations } });
    } catch (error) {
      console.error('Update favorite locations error:', error);
      return void res.status(500).json({ success: false, message: 'Failed to update favorite locations' });
    }
  };

  deleteAccount = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) return void res.status(401).json({ success: false, message: 'User not authenticated' });

      const user = await User.findByIdAndDelete(userId);
      if (!user) return void res.status(404).json({ success: false, message: 'User not found' });

      return void res.status(200).json({ success: true, message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Delete account error:', error);
      return void res.status(500).json({ success: false, message: 'Failed to delete account' });
    }
  };
}
