import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiErrorType, ApiResponse, AppError } from "../../types/api";

// Local backend URL
const BASE_URL = "http://localhost:3000/api";

class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    // Create axios instance for local development
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Setup interceptors
    this.setupInterceptors();

    // Load token from storage on app start
    this.loadTokenFromStorage();
  }

  private setupInterceptors() {
    // Request interceptor - Add JWT token
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add auth token if available
        if (this.token && config.headers) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }

        // Development logging
        console.log(`API ${config.method?.toUpperCase()} ${config.url}`);
        if (config.data) {
          console.log("Request Data:", config.data);
        }

        return config;
      },
      (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle responses
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`API ${response.status} - ${response.config.url}`);
        console.log("Response:", response.data);
        return response;
      },
      async (error: AxiosError) => {
        console.error("API Error:", error.response?.status, error.message);

        // Handle authentication errors
        if (error.response?.status === 401) {
          console.log("Auth Token expired, clearing storage");
          await this.clearToken();
        }

        return Promise.reject(this.transformError(error));
      }
    );
  }

  private async loadTokenFromStorage() {
    try {
      const storedToken = await AsyncStorage.getItem("weather_app_token");
      if (storedToken) {
        this.token = storedToken;
        console.log("Auth Token loaded from storage");
      }
    } catch (error) {
      console.error("Error loading token:", error);
    }
  }

  // Set JWT token
  async setToken(token: string) {
    this.token = token;
    try {
      await AsyncStorage.setItem("weather_app_token", token);
      console.log("Auth Token saved to storage");
    } catch (error) {
      console.error("Error saving token:", error);
    }
  }

  // Clear JWT token (logout)
  async clearToken() {
    this.token = null;
    try {
      await AsyncStorage.removeItem("weather_app_token");
      console.log("Auth Token cleared from storage");
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  }

  // Get current token
  getToken(): string | null {
    return this.token;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Transform errors for user-friendly messages
  private transformError(error: AxiosError): AppError {
    // No network connection
    if (!error.response) {
      return {
        type: "network",
        message:
          "Cannot connect to server. Make sure your backend is running on http://localhost:5000",
        code: 0,
      };
    }

    const { status } = error.response;
    const responseData = error.response.data as any;

    let errorType: ApiErrorType = "unknown";
    let message = "Something went wrong";

    switch (status) {
      case 400:
        errorType = "validation";
        message = responseData?.message || "Invalid data provided";
        break;
      case 401:
        errorType = "auth";
        message = responseData?.message || "Please login again";
        break;
      case 404:
        errorType = "server";
        message = "Endpoint not found. Check your backend routes.";
        break;
      case 429:
        errorType = "server";
        message = "Too many requests. Please wait a moment.";
        break;
      case 500:
        errorType = "server";
        message = "Backend server error. Check your Node.js console.";
        break;
      default:
        errorType = "unknown";
        message = responseData?.message || `Server returned ${status}`;
    }

    return {
      type: errorType,
      message,
      code: status,
    };
  }

  // API Methods (matching your backend responses)
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
