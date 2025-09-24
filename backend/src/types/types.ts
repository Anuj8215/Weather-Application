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
}

export interface LocationData {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  utcOffsetSeconds: number;
}

export interface HourlyWeatherData {
  time: Array<Date>;
  temperature: Array<number>;
  rain: Array<number>;
  humidity: Array<number>;
  pressure: Array<number>;
  windSpeed: Array<number>;
  windDirection: Array<number>;
  weatherCode: Array<number>;
}

export interface DailyWeatherData {
  time: Array<Date>;
  sunrise: Array<Date>;
  sunset: Array<Date>;
  uvIndexMax: Array<number>;
  daylightDuration: Array<number>;
  sunshineDuration: Array<number>;
  temperatureMax: Array<number>;
  temperatureMin: Array<number>;
  weatherCode: Array<number>;
  precipitationSum: Array<number>;
}

export interface Minutely15WeatherData {
  time: Array<Date>;
  rain: Array<number>;
  sunshineDuration: Array<number>;
  visibility: Array<number>;
  dewPoint: Array<number>;
  temperature: Array<number>;
}

export interface WeatherResponse {
  location: LocationData;
  current: WeatherData;
  hourly?: HourlyWeatherData;
  daily?: DailyWeatherData;
  minutely15?: Minutely15WeatherData;
  lastUpdated: Date;
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

export interface LocationSearchResult {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  admin2?: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
}
