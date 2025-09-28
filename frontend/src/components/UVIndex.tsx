import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface UVIndexProps {
    value: number;
}

const UVIndex: React.FC<UVIndexProps> = ({ value }) => {
    const { isDark } = useTheme();

    const getUVLevel = (uv: number): { level: string; color: string } => {
        if (uv <= 2) return { level: 'Low', color: '#4CAF50' };
        if (uv <= 5) return { level: 'Moderate', color: '#FF9800' };
        if (uv <= 7) return { level: 'High', color: '#FF5722' };
        if (uv <= 10) return { level: 'Very High', color: '#E91E63' };
        return { level: 'Extreme', color: '#9C27B0' };
    };

    const uvInfo = getUVLevel(value);
    const barWidth = Math.min((value / 11) * 100, 100); // Max UV 11

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#1c1c1e' : '#ffffff' }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: isDark ? '#8e8e93' : '#636366' }]}>
                    UV Index
                </Text>
                <Text style={[styles.level, { color: uvInfo.color }]}>
                    {uvInfo.level}
                </Text>
            </View>

            <View style={styles.content}>
                <Text style={[styles.value, { color: isDark ? '#ffffff' : '#000000' }]}>
                    {Math.round(value)}
                </Text>
                <View style={styles.barContainer}>
                    <View style={[styles.bar, { backgroundColor: '#e0e0e0' }]}>
                        <View
                            style={[
                                styles.fill,
                                { width: `${barWidth}%`, backgroundColor: uvInfo.color }
                            ]}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        borderRadius: 3,
        height: 6,
        overflow: 'hidden',
    },
    barContainer: {
        flex: 1,
        marginLeft: 16,
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
    },
    fill: {
        borderRadius: 3,
        height: '100%',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    level: {
        fontSize: 14,
        fontWeight: '600',
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
    },
    value: {
        fontSize: 24,
        fontWeight: '600',
    },
});

export default UVIndex;