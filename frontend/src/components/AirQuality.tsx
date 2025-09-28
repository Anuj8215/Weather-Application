import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { AirQualityData } from '../types';

interface AirQualityProps {
    airQuality: AirQualityData;
}

const AirQuality: React.FC<AirQualityProps> = ({ airQuality }) => {
    const { isDark } = useTheme();

    const getAQIInfo = (aqi: number): { level: string; color: string; description: string } => {
        if (aqi <= 50) return { level: 'Good', color: '#4CAF50', description: 'Air quality is satisfactory' };
        if (aqi <= 100) return { level: 'Moderate', color: '#FF9800', description: 'Air quality is acceptable' };
        if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: '#FF5722', description: 'Sensitive individuals should avoid outdoor activity' };
        if (aqi <= 200) return { level: 'Unhealthy', color: '#E91E63', description: 'Everyone should avoid outdoor activity' };
        if (aqi <= 300) return { level: 'Very Unhealthy', color: '#9C27B0', description: 'Health alert' };
        return { level: 'Hazardous', color: '#7B1FA2', description: 'Emergency conditions' };
    };

    const aqiInfo = getAQIInfo(airQuality.aqi);
    const barWidth = Math.min((airQuality.aqi / 500) * 100, 100); // Max AQI 500

    return (
        <View style={isDark ? styles.containerDark : styles.containerLight}>
            <View style={styles.header}>
                <Text style={isDark ? styles.titleDark : styles.titleLight}>
                    Air Quality
                </Text>
                <Text style={isDark ? styles.aqiDark : styles.aqiLight}>
                    {airQuality.aqi}
                </Text>
            </View>

            <Text style={[styles.level, { color: aqiInfo.color }]}>
                {aqiInfo.level}
            </Text>

            <Text style={isDark ? styles.descriptionDark : styles.descriptionLight}>
                {aqiInfo.description}
            </Text>

            <View style={styles.barContainer}>
                <View style={[styles.bar, { backgroundColor: '#e0e0e0' }]}>
                    <View
                        style={[
                            styles.fill,
                            { width: `${barWidth}%`, backgroundColor: aqiInfo.color }
                        ]}
                    />
                </View>
            </View>

            <View style={styles.pollutants}>
                <View style={styles.pollutant}>
                    <Text style={isDark ? styles.pollutantLabelDark : styles.pollutantLabelLight}>PM2.5</Text>
                    <Text style={isDark ? styles.pollutantValueDark : styles.pollutantValueLight}>{airQuality.pm25}</Text>
                </View>
                <View style={styles.pollutant}>
                    <Text style={isDark ? styles.pollutantLabelDark : styles.pollutantLabelLight}>PM10</Text>
                    <Text style={isDark ? styles.pollutantValueDark : styles.pollutantValueLight}>{airQuality.pm10}</Text>
                </View>
                <View style={styles.pollutant}>
                    <Text style={isDark ? styles.pollutantLabelDark : styles.pollutantLabelLight}>O₃</Text>
                    <Text style={isDark ? styles.pollutantValueDark : styles.pollutantValueLight}>{airQuality.o3}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    aqiDark: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    aqiLight: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
    },
    bar: {
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        height: 6,
        width: '100%',
    },
    barContainer: {
        marginBottom: 16,
        marginTop: 8,
    },
    containerDark: {
        backgroundColor: '#1c1c1e',
        borderRadius: 12,
        padding: 16,
    },
    containerLight: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
    },
    descriptionDark: {
        color: '#8e8e93',
        fontSize: 12,
        marginBottom: 8,
    },
    descriptionLight: {
        color: '#636366',
        fontSize: 12,
        marginBottom: 8,
    },
    fill: {
        borderRadius: 3,
        height: '100%',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    level: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    pollutant: {
        alignItems: 'center',
    },
    pollutantLabelDark: {
        color: '#8e8e93',
        fontSize: 12,
        marginBottom: 4,
    },
    pollutantLabelLight: {
        color: '#636366',
        fontSize: 12,
        marginBottom: 4,
    },
    pollutantValueDark: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    pollutantValueLight: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
    },
    pollutants: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    titleDark: {
        color: '#8e8e93',
        fontSize: 14,
        fontWeight: '500',
    },
    titleLight: {
        color: '#636366',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default AirQuality;