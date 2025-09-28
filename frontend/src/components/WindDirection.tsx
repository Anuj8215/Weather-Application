import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface WindDirectionProps {
    direction: number; // degrees
    speed: number;
    gust?: number;
}

const WindDirection: React.FC<WindDirectionProps> = ({ direction, speed, gust }) => {
    const { isDark } = useTheme();

    const getDirectionName = (degrees: number): string => {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index] ?? 'N';
    };

    const arrowRotation = direction;

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#1c1c1e' : '#ffffff' }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: isDark ? '#8e8e93' : '#636366' }]}>
                    Wind
                </Text>
                <Text style={[styles.direction, { color: isDark ? '#ffffff' : '#000000' }]}>
                    {getDirectionName(direction)}
                </Text>
            </View>

            <View style={styles.content}>
                <View style={styles.windInfo}>
                    <Text style={[styles.speed, { color: isDark ? '#ffffff' : '#000000' }]}>
                        {Math.round(speed)}
                    </Text>
                    <Text style={[styles.unit, { color: isDark ? '#8e8e93' : '#636366' }]}>
                        km/h
                    </Text>
                </View>

                <View style={styles.compass}>
                    <View style={[styles.arrow, { transform: [{ rotate: `${arrowRotation}deg` }] }]}>
                        <Text style={styles.arrowIcon}>↑</Text>
                    </View>
                </View>
            </View>

            {gust != null && (
                <Text style={[styles.gust, { color: isDark ? '#8e8e93' : '#636366' }]}>
                    Gusts up to {Math.round(gust)} km/h
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    arrow: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowIcon: {
        color: '#007AFF',
        fontSize: 24,
    },
    compass: {
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 30,
        height: 60,
        justifyContent: 'center',
        width: 60,
    },
    container: {
        borderRadius: 12,
        elevation: 3,
        marginBottom: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    content: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    direction: {
        fontSize: 16,
        fontWeight: '600',
    },
    gust: {
        fontSize: 14,
        textAlign: 'center',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    speed: {
        fontSize: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
    },
    unit: {
        fontSize: 16,
        marginLeft: 4,
    },
    windInfo: {
        alignItems: 'baseline',
        flexDirection: 'row',
    },
});

export default WindDirection;