//NOTE - This service interacts with the Open-Meteo API to fetch current weather data, forecasts, and location searches.

import { fetchWeatherApi } from 'openmeteo';
import {
  WeatherResponse,
  WeatherData,
  LocationData,
  HourlyWeatherData,
  DailyWeatherData,
  Minutely15WeatherData,
} from '../../types/index.js';

// Ensure global 'console' and 'fetch' are available in environments where they may be undefined
declare var console: Console;
declare function fetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response>;

export class WeatherService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
  }

  private range(start: number, stop: number, step: number): number[] {
    return Array.from(
      { length: (stop - start) / step },
      (_, i) => start + i * step,
    );
  }

  async getCurrentWeather(
    latitude: number,
    longitude: number,
  ): Promise<WeatherResponse> {
    try {
      const params = {
        latitude,
        longitude,
        current: [
          'temperature_2m',
          'is_day',
          'rain',
          'weather_code',
          'wind_speed_10m',
          'wind_direction_10m',
          'relative_humidity_2m',
          'surface_pressure',
          'visibility',
          'dew_point_2m',
        ],
        minutely_15: [
          'rain',
          'sunshine_duration',
          'visibility',
          'dew_point_2m',
          'temperature_2m',
        ],
        timezone: 'auto',
      };

      const responses = await fetchWeatherApi(this.baseUrl, params);
      const response = responses[0];

      if (!response) {
        throw new Error('No response from weather API');
      }

      // Location data
      const location: LocationData = {
        latitude: response.latitude(),
        longitude: response.longitude(),
        elevation: response.elevation(),
        timezone: response.timezone() || 'UTC',
        utcOffsetSeconds: response.utcOffsetSeconds(),
      };

      // Current weather data
      const current = response.current();
      if (!current) {
        throw new Error('No current weather data');
      }
      const currentWeather: WeatherData = {
        temperature: Math.round(current.variables(0)?.value() ?? 0),
        isDay: current.variables(1)?.value() === 1,
        rain: current.variables(2)?.value() ?? 0,
        weatherCode: current.variables(3)?.value() ?? 0,
        windSpeed: current.variables(4)?.value() ?? 0,
        windDirection: current.variables(5)?.value() ?? 0,
        humidity: current.variables(6)?.value() ?? 0,
        pressure: current.variables(7)?.value() ?? 0,
        visibility: (current.variables(8)?.value() ?? 0) / 1000, // Convert to km
        dewPoint: current.variables(9)?.value() ?? 0,
        sunshineDuration: 0, // Will be filled from minutely data if available
      };

      // Minutely 15 data
      let minutely15Data: Minutely15WeatherData | undefined;
      const minutely15 = response.minutely15();
      if (minutely15) {
        const timeRange = this.range(
          Number(minutely15.time()),
          Number(minutely15.timeEnd()),
          minutely15.interval(),
        ).map((t) => new Date((t + location.utcOffsetSeconds) * 1000));

        minutely15Data = {
          time: timeRange,
          rain: Array.from(minutely15.variables(0)?.valuesArray() ?? []),
          sunshineDuration: Array.from(
            minutely15.variables(1)?.valuesArray() ?? [],
          ),
          visibility: Array.from(minutely15.variables(2)?.valuesArray() ?? []),
          dewPoint: Array.from(minutely15.variables(3)?.valuesArray() ?? []),
          temperature: Array.from(minutely15.variables(4)?.valuesArray() ?? []),
        };
      }

      return {
        location,
        current: currentWeather,
        minutely15: minutely15Data,
      };
    } catch (error) {
      console.error('Open-Meteo API Error:', error);
      throw new Error(
        `Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async getWeatherForecast(
    latitude: number,
    longitude: number,
    days: number = 7,
  ): Promise<WeatherResponse> {
    try {
      const params = {
        latitude,
        longitude,
        current: [
          'temperature_2m',
          'is_day',
          'rain',
          'weather_code',
          'wind_speed_10m',
          'wind_direction_10m',
          'relative_humidity_2m',
          'surface_pressure',
        ],
        hourly: [
          'temperature_2m',
          'rain',
          'relative_humidity_2m',
          'surface_pressure',
          'wind_speed_10m',
          'wind_direction_10m',
          'weather_code',
        ],
        daily: [
          'sunrise',
          'sunset',
          'uv_index_max',
          'daylight_duration',
          'sunshine_duration',
          'temperature_2m_max',
          'temperature_2m_min',
          'weather_code',
          'precipitation_sum',
        ],
        forecast_days: days,
        timezone: 'auto',
      };

      const responses = await fetchWeatherApi(this.baseUrl, params);
      const response = responses[0];

      if (!response) {
        throw new Error('No response from weather API');
      }

      // Location data
      const location: LocationData = {
        latitude: response.latitude(),
        longitude: response.longitude(),
        elevation: response.elevation(),
        timezone: response.timezone() || 'UTC',
        utcOffsetSeconds: response.utcOffsetSeconds(),
      };

      // Current weather
      const current = response.current();
      if (!current) {
        throw new Error('No current weather data');
      }
      const currentWeather: WeatherData = {
        temperature: Math.round(current.variables(0)?.value() ?? 0),
        isDay: current.variables(1)?.value() === 1,
        rain: current.variables(2)?.value() ?? 0,
        weatherCode: current.variables(3)?.value() ?? 0,
        windSpeed: current.variables(4)?.value() ?? 0,
        windDirection: current.variables(5)?.value() ?? 0,
        humidity: current.variables(6)?.value() ?? 0,
        pressure: current.variables(7)?.value() ?? 0,
        visibility: 0,
        dewPoint: 0,
        sunshineDuration: 0,
      };

      // Hourly data
      const hourly = response.hourly();
      if (!hourly) {
        throw new Error('No hourly weather data');
      }
      const hourlyTimeRange = this.range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval(),
      ).map((t) => new Date((t + location.utcOffsetSeconds) * 1000));

      const hourlyData: HourlyWeatherData = {
        time: hourlyTimeRange,
        temperature: Array.from(hourly.variables(0)?.valuesArray() ?? []),
        rain: Array.from(hourly.variables(1)?.valuesArray() ?? []),
        humidity: Array.from(hourly.variables(2)?.valuesArray() ?? []),
        pressure: Array.from(hourly.variables(3)?.valuesArray() ?? []),
        windSpeed: Array.from(hourly.variables(4)?.valuesArray() ?? []),
        windDirection: Array.from(hourly.variables(5)?.valuesArray() ?? []),
        weatherCode: Array.from(hourly.variables(6)?.valuesArray() ?? []),
      };

      // Daily data
      const daily = response.daily();
      if (!daily) {
        throw new Error('No daily weather data');
      }
      const dailyTimeRange = this.range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval(),
      ).map((t) => new Date((t + location.utcOffsetSeconds) * 1000));

      // Handle Int64 values for sunrise/sunset
      const sunriseVar = daily.variables(0);
      const sunsetVar = daily.variables(1);

      const dailyData: DailyWeatherData = {
        time: dailyTimeRange,
        sunrise: sunriseVar
          ? Array.from(
              { length: sunriseVar.valuesInt64Length() },
              (_, i) =>
                new Date(
                  (Number(sunriseVar.valuesInt64(i)) +
                    location.utcOffsetSeconds) *
                    1000,
                ),
            )
          : [],
        sunset: sunsetVar
          ? Array.from(
              { length: sunsetVar.valuesInt64Length() },
              (_, i) =>
                new Date(
                  (Number(sunsetVar.valuesInt64(i)) +
                    location.utcOffsetSeconds) *
                    1000,
                ),
            )
          : [],
        uvIndexMax: Array.from(daily.variables(2)?.valuesArray() ?? []),
        daylightDuration: Array.from(daily.variables(3)?.valuesArray() ?? []),
        sunshineDuration: Array.from(daily.variables(4)?.valuesArray() ?? []),
        temperatureMax: Array.from(daily.variables(5)?.valuesArray() ?? []),
        temperatureMin: Array.from(daily.variables(6)?.valuesArray() ?? []),
        weatherCode: Array.from(daily.variables(7)?.valuesArray() ?? []),
        precipitationSum: Array.from(daily.variables(8)?.valuesArray() ?? []),
      };

      return {
        location,
        current: currentWeather,
        hourly: hourlyData,
        daily: dailyData,
      };
    } catch (error) {
      console.error('Open-Meteo Forecast API Error:', error);
      throw new Error(
        `Failed to fetch forecast data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async searchLocation(query: string): Promise<
    Array<{
      name: string;
      latitude: number;
      longitude: number;
      country: string;
    }>
  > {
    try {
      const geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';
      const response = await fetch(
        `${geocodingUrl}?name=${encodeURIComponent(query)}&count=10&language=en&format=json`,
      );

      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.results) {
        return [];
      }

      return data.results.map(
        (result: {
          name: string;
          latitude: number;
          longitude: number;
          country?: string;
          admin1?: string;
          admin2?: string;
        }) => ({
          name: result.name,
          latitude: result.latitude,
          longitude: result.longitude,
          country: result.country || '',
          admin1: result.admin1 || '',
          admin2: result.admin2 || '',
        }),
      );
    } catch (error) {
      console.error('Location search error:', error);
      throw new Error(
        `Failed to search locations: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
