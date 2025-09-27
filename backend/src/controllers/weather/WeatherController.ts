//
import { Request, Response } from 'express';
import { WeatherService } from '../../services/weather/WeatherService.js';
import { getWeatherDescription } from '../../utils/weatherCodes.js';

export class WeatherController {
  private weatherService: WeatherService;

  constructor() {
    this.weatherService = new WeatherService();
  }

  getCurrentWeather = async (req: Request, res: Response): Promise<void> => {
    try {
      const { latitude, longitude } = req.query;

      // Validate coordinates
      const lat = parseFloat(latitude as string);
      const lon = parseFloat(longitude as string);

      if (isNaN(lat) || isNaN(lon)) {
        res.status(400).json({
          success: false,
          message: 'Valid latitude and longitude parameters are required'
        });
        return;
      }

      if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        res.status(400).json({
          success: false,
          message:
            'Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180'
        });
        return;
      }

      const weatherData = await this.weatherService.getCurrentWeather(lat, lon);

      // Add weather description
      const weatherDescription = getWeatherDescription(
        weatherData.current.weatherCode
      );

      // Set cache control headers for live data
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0'
      });

      res.status(200).json({
        success: true,
        data: {
          ...weatherData,
          current: {
            ...weatherData.current,
            description: weatherDescription.description,
            icon: weatherDescription.icon
          }
        }
      });
    } catch (error) {
      console.error('getCurrentWeather error:', error);
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to fetch weather data'
      });
    }
  };

  getWeatherForecast = async (req: Request, res: Response): Promise<void> => {
    try {
      const { latitude, longitude, days } = req.query;

      // Validate coordinates
      const lat = parseFloat(latitude as string);
      const lon = parseFloat(longitude as string);

      if (isNaN(lat) || isNaN(lon)) {
        res.status(400).json({
          success: false,
          message: 'Valid latitude and longitude parameters are required'
        });
        return;
      }

      if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        res.status(400).json({
          success: false,
          message:
            'Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180'
        });
        return;
      }

      const forecastDays = days ? parseInt(days as string, 10) : 10;

      if (forecastDays < 1 || forecastDays > 16) {
        res.status(400).json({
          success: false,
          message: 'Days parameter must be between 1 and 16'
        });
        return;
      }

      const forecastData = await this.weatherService.getWeatherForecast(
        lat,
        lon,
        forecastDays
      );

      // Add weather descriptions to current and daily data
      const currentDescription = getWeatherDescription(
        forecastData.current.weatherCode
      );

      const enhancedData = {
        ...forecastData,
        current: {
          ...forecastData.current,
          description: currentDescription.description,
          icon: currentDescription.icon
        },
        daily: forecastData.daily
          ? {
            ...forecastData.daily,
            descriptions: forecastData.daily.weatherCode.map((code) =>
              getWeatherDescription(code)
            )
          }
          : undefined
      };

      // Set cache control headers for forecast data (can be cached longer than current weather)
      res.set({
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      });

      res.status(200).json({
        success: true,
        data: enhancedData
      });
    } catch (error) {
      console.error('getWeatherForecast error:', error);
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to fetch forecast data'
      });
    }
  };

  searchLocations = async (req: Request, res: Response): Promise<void> => {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string' || q.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Search query parameter "q" is required'
        });
        return;
      }

      const locations = await this.weatherService.searchLocation(q.trim());

      res.status(200).json({
        success: true,
        data: locations
      });
    } catch (error) {
      console.error('searchLocations error:', error);
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : 'Failed to search locations'
      });
    }
  };
}
