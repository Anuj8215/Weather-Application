
import apiClient from '../api/apiClient';
import { LoginCredentials, RegisterCredentials, User } from '@/types';

interface UpdateProfileData {
  username?: string;
  preferences?: {
    temperatureUnit?: 'celsius' | 'fahrenheit';
    theme?: 'light' | 'dark';
    notifications?: boolean;
  };
}

interface UpdateLocationsData {
  locations: string[]; // Array of location names
}

class UserService {
  login(credentials: LoginCredentials) {
    throw new Error('Method not implemented.');
  }
  register(credentials: RegisterCredentials) {
    throw new Error('Method not implemented.');
  }
  getProfile() {
    throw new Error('Method not implemented.');
  }
  validateToken() {
    throw new Error('Method not implemented.');
  }
  getCurrentToken(): any {
    throw new Error('Method not implemented.');
  }
  logout() {
    throw new Error('Method not implemented.');
  }
  // Update user profile
  async updateProfile(data: UpdateProfileData): Promise<User> {
    console.log('👤 [User] Updating profile');

    const response = await apiClient.put<{ user: User }>('/user/profile', data);

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to update profile');
    }

    console.log('✅ [User] Profile updated successfully');
    return response.data.user;
  }

  // Update favorite locations
  async updateFavoriteLocations(locations: string[]): Promise<string[]> {
    console.log('📍 [User] Updating favorite locations:', locations);

    const response = await apiClient.put<{ favoriteLocations: string[] }>('/user/locations', {
      locations,
    });

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to update locations');
    }

    console.log('✅ [User] Locations updated successfully');
    return response.data.favoriteLocations;
  }

  // Delete user account
  async deleteAccount(): Promise<void> {
    console.log('🗑️ [User] Deleting account');

    const response = await apiClient.delete('/user/account');

    if (!response.success) {
      throw new Error(response.message || 'Failed to delete account');
    }

    // Clear token after successful account deletion
    await apiClient.clearToken();

    console.log('✅ [User] Account deleted successfully');
  }
}

// Export singleton instance
export const userService = new UserService();
export default userService;
