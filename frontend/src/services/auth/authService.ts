import apiClient from '../api/apiClient';
import { AuthResponse, User, LoginCredentials, RegisterCredentials } from '@/types';

class AuthService {
    // Login user
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        console.log('🔐 [Auth] Logging in user:', credentials.email);

        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);

        if (!response.success || !response.data) {
            throw new Error(response.message || 'Login failed');
        }

        // Store token
        await apiClient.setToken(response.data.token);

        console.log('✅ [Auth] Login successful');
        return response.data;
    }

    // Register user
    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        console.log('📝 [Auth] Registering user:', credentials.email);

        const response = await apiClient.post<AuthResponse>('/auth/register', credentials);

        if (!response.success || !response.data) {
            throw new Error(response.message || 'Registration failed');
        }

        // Store token
        await apiClient.setToken(response.data.token);

        console.log('✅ [Auth] Registration successful');
        return response.data;
    }

    // Get user profile
    async getProfile(): Promise<User> {
        console.log('👤 [Auth] Getting user profile');

        const response = await apiClient.get<{ user: User }>('/auth/profile');

        if (!response.success || !response.data) {
            throw new Error(response.message || 'Failed to get profile');
        }

        console.log('✅ [Auth] Profile retrieved successfully');
        return response.data.user;
    }

    // Validate token
    async validateToken(): Promise<boolean> {
        console.log('🔍 [Auth] Validating token');

        try {
            const response = await apiClient.get('/auth/validate');
            return response.success;
        } catch (error) {
            console.log('❌ [Auth] Token validation failed');
            return false;
        }
    }

    // Get current token
    getCurrentToken(): string | null {
        return apiClient.getToken();
    }

    // Logout user
    async logout(): Promise<void> {
        console.log('🚪 [Auth] Logging out user');

        // Clear token from client
        await apiClient.clearToken();

        console.log('✅ [Auth] Logout successful');
    }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;