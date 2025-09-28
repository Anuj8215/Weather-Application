import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { WeatherResponse } from '../types/index';
import { useTheme } from '../theme/ThemeProvider';

interface ForecastCardProps {
    forecast: WeatherResponse;
    onDayPress?: (dayIndex: number) => void;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, onDayPress }) => {
    const { isDark } = useTheme();

    if (!forecast.daily) return null;

    const { daily } = forecast;

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const formatTemperature = (temp: number, unit: 'celsius' | 'fahrenheit' = 'celsius'): string => {
        return unit === 'celsius' ? `${temp.toFixed(1)}°` : `${((temp * 9 / 5) + 32).toFixed(1)}°`;
    };

    const getWeatherIcon = (code: number): string => {
        // Simple weather code to icon mapping
        if (code < 3) return '☀️';
        if (code < 50) return '⛅';
        if (code < 60) return '🌧️';
        if (code < 70) return '❄️';
        if (code < 80) return '🌫️';
        return '☁️';
    };

    return (
        <View style={[styles.container, {
            backgroundColor: isDark ? '#1e1e1e' : '#fff',
            shadowColor: isDark ? '#000' : '#000'
        }]}>
            <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>
                7-Day Forecast
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {daily.time.slice(0, 7).map((date, index) => (
                    <TouchableOpacity
                        key={date}
                        style={[styles.dayCard, { backgroundColor: isDark ? '#2a2a2a' : '#f8f9fa' }]}
                        onPress={() => onDayPress?.(index)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.dayText, { color: isDark ? '#fff' : '#333' }]}>
                            {index === 0 ? 'Today' : formatDate(date)}
                        </Text>

                        <Text style={styles.weatherIcon}>
                            {getWeatherIcon(daily.weatherCode?.[index] ?? 0)}
                        </Text>
                        <View style={styles.tempContainer}>
                            <Text style={[styles.maxTemp, { color: isDark ? '#fff' : '#333' }]}>
                                {formatTemperature(daily.temperatureMax?.[index] ?? 0)}
                            </Text>
                            <Text style={[styles.minTemp, { color: isDark ? '#ccc' : '#666' }]}>
                                {formatTemperature(daily.temperatureMin?.[index] ?? 0)}
                            </Text>
                        </View>

                        {daily.precipitationSum?.[index] !== undefined && (
                            <Text style={[styles.precipitation, { color: isDark ? '#4A90E2' : '#007AFF' }]}>
                                {(daily.precipitationSum[index] as number).toFixed(1)}mm
                            </Text>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        elevation: 3,
        marginBottom: 20,
        padding: 16,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dayCard: {
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 12,
        minWidth: 80,
        padding: 12,
    },
    dayText: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
    },
    maxTemp: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    minTemp: {
        fontSize: 14,
    },
    precipitation: {
        fontSize: 12,
        fontWeight: '500',
    },
    tempContainer: {
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    weatherIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
});

export default ForecastCard;