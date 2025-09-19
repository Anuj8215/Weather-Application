//NOTE - This file contains TypeScript interfaces for various data structures used in the application.
// src/types/index.ts
export interface WeatherData {
  temperature: number;
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
}

export interface LocationData {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  utcOffsetSeconds: number;
}

export interface HourlyWeatherData {
  time: Date[];
  temperature: number[];
  rain: number[];
  humidity: number[];
  pressure: number[];
  windSpeed: number[];
  windDirection: number[];
  weatherCode: number[];
}

export interface DailyWeatherData {
  time: Date[];
  sunrise: Date[];
  sunset: Date[];
  uvIndexMax: number[];
  daylightDuration: number[];
  sunshineDuration: number[];
  temperatureMax: number[];
  temperatureMin: number[];
  weatherCode: number[];
  precipitationSum: number[];
}

export interface Minutely15WeatherData {
  time: Date[];
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
}

export interface WeatherCodeDescription {
  code: number;
  description: string;
  icon: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  favoriteLocations: Array<{
    name: string;
    latitude: number;
    longitude: number;
  }>;
  preferences: {
    temperatureUnit: 'celsius' | 'fahrenheit';
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}
