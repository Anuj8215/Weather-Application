import React from 'react';
import { View, StyleSheet } from 'react-native';

interface HeatBarProps {
    min: number;
    max: number;
    current?: number;
    width?: number;
    height?: number;
}

const HeatBar: React.FC<HeatBarProps> = ({ min, max, current, width = 100, height = 4 }) => {
    const range = max - min;
    const currentPosition = current != null ? ((current - min) / range) * width : 0;

    return (
        <View style={[styles.container, { width, height }]}>
            <View style={[styles.bar, { width: width, height, backgroundColor: '#e0e0e0' }]}>
                <View
                    style={[
                        styles.fill,
                        {
                            width: currentPosition,
                            height,
                            backgroundColor: getTemperatureColor(current ?? min)
                        }
                    ]}
                />
            </View>
        </View>
    );
};

const getTemperatureColor = (temp: number): string => {
    if (temp < 0) return '#4A90E2';
    if (temp < 10) return '#5DADE2';
    if (temp < 20) return '#F4D03F';
    if (temp < 30) return '#E67E22';
    return '#E74C3C';
};

const styles = StyleSheet.create({
    bar: {
        borderRadius: 2,
        overflow: 'hidden',
    },
    container: {
        justifyContent: 'center',
    },
    fill: {
        borderRadius: 2,
    },
});

export default HeatBar;