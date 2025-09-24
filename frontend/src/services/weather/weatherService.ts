

import apiClient from "../api/apiClient";
import { WeatherResponse, LocationSearchResult } from "@/types";
class WeatherService {
    // Get current data
    async getCurrentWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
        console.log( `🌤️ [Weather] Getting current weather for ${latitude}, ${longitude}` );

        const response = await apiClient.get<WeatherResponse>("/weather/current", {
            params: { latitude, longitude },
        });

        if (!response.success || !response.data) {
            throw new Error(response.message || "Failed to fetch current weather");
        }

        console.log("✅ [Weather] Current weather fetched successfully");
        return response.data;
    }

    // Get weather forecast
    async getWeatherForecast(
        latitude: number,
        longitude: number,
        days: number = 7
    ): Promise<WeatherResponse> {
        console.log(
            `📅 [Weather] Getting ${days}-day forecast for ${latitude}, ${longitude}`
        );

        const response = await apiClient.get<WeatherResponse>("/weather/forecast", {
            params: { latitude, longitude, days },
        });

        if (!response.success || !response.data) {
            throw new Error(response.message || "Failed to fetch weather forecast");
        }

        console.log("✅ [Weather] Weather forecast fetched successfully");
        return response.data;
    }

    // Search locations

    async searchLocations(query: string): Promise<LocationSearchResult[]> {
        console.log(`🔍 [Weather] Searching locations for: ${query}`);

        const response = await apiClient.get<LocationSearchResult[]>(
            "/weather/search",
            {
                params: { q: query },
            }
        );

        if (!response.success || !response.data) {
            throw new Error(response.message || "Failed to search locations");
        }

        console.log(`✅ [Weather] Found ${response.data.length} locations`);
        return response.data;
    }
}

// Export singleton instance
export const weatherService = new WeatherService();
export default weatherService;
