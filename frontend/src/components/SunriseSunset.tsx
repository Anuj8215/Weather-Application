import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

const { width } = Dimensions.get('window');

interface SunriseSunsetProps {
    sunrise: Date;
    sunset: Date;
    currentTime?: Date;
}

const SunriseSunset: React.FC<SunriseSunsetProps> = ({ sunrise, sunset, currentTime = new Date() }) => {
    const { isDark } = useTheme();

    // Calculate sun position
    const dayStart = new Date(sunrise);
    dayStart.setHours(6, 0, 0, 0); // Assume day starts at 6 AM

    const dayEnd = new Date(sunset);
    dayEnd.setHours(22, 0, 0, 0); // Assume day ends at 10 PM

    const totalDayDuration = dayEnd.getTime() - dayStart.getTime();
    const elapsedTime = currentTime.getTime() - dayStart.getTime();
    const progress = Math.max(0, Math.min(1, elapsedTime / totalDayDuration));

    const sunPosition = progress * (width - 80); // 80 is padding

    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#1c1c1e' : '#ffffff' }]}>
            <Text style={[styles.title, { color: isDark ? '#8e8e93' : '#636366' }]}>
                Sunrise & Sunset
            </Text>

            <View style={styles.sunContainer}>
                {/* Sun icon */}
                <View style={[styles.sun, { left: sunPosition }]}>
                    <Text style={styles.sunIcon}>☀️</Text>
                </View>

                {/* Curved path (simplified as a line for now) */}
                <View style={styles.path} />
            </View>

            <View style={styles.times}>
                <Text style={[styles.time, { color: isDark ? '#ffffff' : '#000000' }]}>
                    {formatTime(sunrise)}
                </Text>
                <Text style={[styles.time, { color: isDark ? '#ffffff' : '#000000' }]}>
                    {formatTime(sunset)}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    path: {
        backgroundColor: '#e0e0e0',
        borderRadius: 1,
        height: 2,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 20,
    },
    sun: {
        alignItems: 'center',
        height: 30,
        justifyContent: 'center',
        position: 'absolute',
        top: -10,
        width: 30,
    },
    sunContainer: {
        height: 60,
        marginBottom: 16,
        position: 'relative',
    },
    sunIcon: {
        fontSize: 24,
    },
    time: {
        fontSize: 16,
        fontWeight: '500',
    },
    times: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 16,
    },
});

export default SunriseSunset;