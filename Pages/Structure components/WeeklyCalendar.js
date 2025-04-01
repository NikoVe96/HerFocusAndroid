import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Helper to get the start of the week (Monday) for a given date.
const getStartOfWeek = (date) => {
    const d = new Date(date);
    // JavaScript getDay(): 0 = Sunday, 1 = Monday, etc.
    // For a week starting on Monday, if Sunday (0) then subtract 6 days.
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(d);
    monday.setDate(d.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
};

// Helper to generate an array of 7 dates starting from startDate.
const getWeekDates = (startDate) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        dates.push(d);
    }
    return dates;
};

// Helper to calculate ISO week number.
const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
};

const dayNames = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];

const WeeklyCalendar = ({ onWeekChange }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const startOfWeek = getStartOfWeek(currentDate);
    const weekDates = getWeekDates(startOfWeek);
    const weekNumber = getWeekNumber(startOfWeek);
    const { colors } = useTheme();

    useEffect(() => {
        if (onWeekChange) {
            onWeekChange(weekDates);
        }
    }, [currentDate]);

    const goToPreviousWeek = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - 7);
            return newDate;
        });
    };

    const goToNextWeek = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + 7);
            return newDate;
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goToPreviousWeek} style={styles.arrow}>
                    <FontAwesomeIcon icon={faChevronLeft} color={colors.darkText} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.weekText, { color: colors.darkText }]}>Uge</Text>
                    <Text style={[styles.weekNumber, { color: colors.darkText }]}>{weekNumber}</Text>
                </View>
                <TouchableOpacity onPress={goToNextWeek} style={styles.arrow}>
                    <FontAwesomeIcon icon={faChevronRight} color={colors.darkText} />
                </TouchableOpacity>
            </View>
            <View style={styles.datesRow}>
                {weekDates.map((date, index) => (
                    <View key={index} style={styles.dateContainer}>
                        <Text style={[styles.dayName, { color: colors.darkText }]}>{dayNames[index]}</Text>
                        <Text style={[styles.dateNumber, { color: colors.darkText }]}>{date.getDate()}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        marginTop: '10%'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 5,
    },
    arrow: {
        padding: 10,
    },
    arrowText: {
        fontSize: 20,
        color: '#333',
    },
    weekText: {
        fontSize: 16,
        color: '#333',
    },
    weekNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    datesRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dateContainer: {
        alignItems: 'center',
        flex: 1,
    },
    dayName: {
        fontSize: 14,
        color: '#666',
    },
    dateNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default WeeklyCalendar;
