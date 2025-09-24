
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, LoginCredentials, RegisterCredentials, AppError } from '@/types';
import { authService, userService } from '../../services';

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const authData = await authService.login(credentials);
      return authData;
    } catch (error) {
      const appError = error as AppError;
      return rejectWithValue(appError.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const authData = await authService.register(credentials);
      return authData;
    } catch (error) {
      const appError = error as AppError;
      return rejectWithValue(appError.message);
    }
  }
);

export const loadUserProfile = createAsyncThunk(
  'auth/loadUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getProfile();
      return user;
    } catch (error) {
      const appError = error as AppError;
      return rejectWithValue(appError.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (
    data: { username?: string; preferences?: User['preferences'] },
    { rejectWithValue }
  ) => {
    try {
      const updatedUser = await userService.updateProfile(data);
      return updatedUser;
    } catch (error) {
      const appError = error as AppError;
      return rejectWithValue(appError.message);
    }
  }
);

export const updateFavoriteLocations = createAsyncThunk(
  'auth/updateFavoriteLocations',
  async (locations: string[], { rejectWithValue }) => {
    try {
      const updatedLocations = await userService.updateFavoriteLocations(locations);
      return updatedLocations;
    } catch (error) {
      const appError = error as AppError;
      return rejectWithValue(appError.message);
    }
  }
);

export const validateAuthToken = createAsyncThunk(
  'auth/validateToken',
  async (_, { rejectWithValue }) => {
    try {
      const isValid = await authService.validateToken();
      if (!isValid) {
        return rejectWithValue('Invalid token');
      }
      const user = await authService.getProfile();
      return { user, token: authService.getCurrentToken() };
    } catch (error) {
      const appError = error as AppError;
      return rejectWithValue(appError.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout action (synchronous)
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      // Clear token from storage
      authService.logout();
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Load user profile
    builder
      .addCase(loadUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loadUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update user profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update favorite locations
    builder
      .addCase(updateFavoriteLocations.fulfilled, (state, action) => {
        if (state.user) {
          state.user.favoriteLocations = action.payload;
        }
      });

    // Validate token
    builder
      .addCase(validateAuthToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validateAuthToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(validateAuthToken.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { logout, clearError, setLoading } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
