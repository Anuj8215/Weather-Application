import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface InfoCardProps {
    title: string;
    value: string | number;
    unit?: string;
    icon?: string;
    children?: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, unit, icon, children }) => {
    const { isDark } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#1c1c1e' : '#ffffff' }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: isDark ? '#8e8e93' : '#636366' }]}>
                    {title}
                </Text>
                {icon != null && <Text style={styles.icon}>{icon}</Text>}
            </View>
            <View style={styles.content}>
                <Text style={[styles.value, { color: isDark ? '#ffffff' : '#000000' }]}>
                    {value}{unit != null && <Text style={[styles.unit, { color: isDark ? '#8e8e93' : '#636366' }]}>{unit}</Text>}
                </Text>
                {children}
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
    content: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    icon: {
        fontSize: 20,
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
    },
    unit: {
        fontSize: 16,
        fontWeight: '400',
    },
    value: {
        fontSize: 24,
        fontWeight: '600',
    },
});

export default InfoCard;