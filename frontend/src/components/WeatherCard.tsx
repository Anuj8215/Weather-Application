import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WeatherResponse } from '../types/index';
import { useTheme } from '../theme/ThemeProvider';

interface WeatherCardProps {
    weather: WeatherResponse;
    cityName: string;
    onPress?: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, cityName, onPress }) => {
    const { isDark } = useTheme();
    const { current, daily } = weather;

    const formatTemperature = (temp: number, unit: 'celsius' | 'fahrenheit' = 'celsius'): string => {
        return unit === 'celsius' ? `${Math.round(temp)}°` : `${Math.round((temp * 9 / 5) + 32)}°`;
    };

    const highTemp = daily?.temperatureMax?.[0] ?? current.temperature;
    const lowTemp = daily?.temperatureMin?.[0] ?? current.temperature;

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: isDark ? '#1c1c1e' : '#ffffff' }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.header}>
                <Text style={[styles.cityName, { color: isDark ? '#ffffff' : '#000000' }]}>
                    {cityName}
                </Text>
                <Text style={styles.weatherIcon}>
                    {current.icon ?? '☀️'}
                </Text>
            </View>
            <View style={styles.tempContainer}>
                <Text style={[styles.temperature, { color: isDark ? '#ffffff' : '#000000' }]}>
                    {formatTemperature(current.temperature)}
                </Text>
            </View>
            <View style={styles.footer}>
                <Text style={[styles.highLow, { color: isDark ? '#8e8e93' : '#636366' }]}>
                    H:{formatTemperature(highTemp)} L:{formatTemperature(lowTemp)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cityName: {
        fontSize: 20,
        fontWeight: '600',
    },
    container: {
        borderRadius: 16,
        elevation: 4,
        marginBottom: 12,
        marginHorizontal: 16,
        padding: 16,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    footer: {
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    highLow: {
        fontSize: 16,
        fontWeight: '400',
    },
    tempContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    temperature: {
        fontSize: 52,
        fontWeight: '300',
    },
    weatherIcon: {
        fontSize: 24,
    },
});

export default WeatherCard;