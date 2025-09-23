// ==========================================
// BACKEND-MATCHING TYPES
// ==========================================

// Weather types
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
  description?: string;
  icon?: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  utcOffsetSeconds: number;
}

export interface HourlyWeatherData {
  time: string[];
  temperature: number[];
  rain: number[];
  humidity: number[];
  pressure: number[];
  windSpeed: number[];
  windDirection: number[];
  weatherCode: number[];
}

export interface DailyWeatherData {
  time: string[];
  sunrise: string[];
  sunset: string[];
  uvIndexMax: number[];
  daylightDuration: number[];
  sunshineDuration: number[];
  temperatureMax: number[];
  temperatureMin: number[];
  weatherCode: number[];
  precipitationSum: number[];
  descriptions?: WeatherCodeDescription[];
}

export interface Minutely15WeatherData {
  time: string[];
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
  lastUpdated?: string;
}

export interface WeatherCodeDescription {
  code: number;
  description: string;
  icon: string;
}

// User types
export interface User {
  id: string;
  email: string;
  username: string;
  favoriteLocations: string[];
  preferences: {
    temperatureUnit: "celsius" | "fahrenheit";
    theme: "light" | "dark";
    notifications: boolean;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface LocationSearchResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  admin2?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
}

// Navigation types
export type RootStackParamList = {
  // Auth Stack
  Login: undefined;
  Register: undefined;

  // Main App Stack
  MainTabs: undefined;

  // Weather Stack
  Weather: undefined;
  WeatherDetails: {
    latitude: number;
    longitude: number;
    locationName: string;
  };
  LocationSearch: undefined;

  // Profile Stack
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Weather: undefined;
  Locations: undefined;
  Profile: undefined;
};

// Redux State types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface WeatherState {
  currentWeather: WeatherResponse | null;
  forecast: WeatherResponse | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export interface LocationState {
  favoriteLocations: string[];
  searchResults: LocationSearchResult[];
  isSearching: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  weather: WeatherState;
  location: LocationState;
}

// Utility types
export type TemperatureUnit = "celsius" | "fahrenheit";
export type Theme = "light" | "dark";
export type ApiErrorType = | "network" | "auth" | "validation" | "server" | "unknown";

export interface AppError {
  type: ApiErrorType;
  message: string;
  code?: number;
}
