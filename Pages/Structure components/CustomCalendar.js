import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomCalendar = ({
    onDayPress,
    selectedDate,
    containerStyle,
    headerStyle,
    dayCellStyle,
    dayTextStyle,
    selectedDayStyle,
    selectedDayTextStyle,
}) => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 0).getDay();
    const calendarCells = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarCells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarCells.push(new Date(currentYear, currentMonth, day));
    }
    while (calendarCells.length % 7 !== 0) {
        calendarCells.push(null);
    }

    const previousMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    return (
        <View style={[styles.container]}>
            <View style={[styles.header, headerStyle]}>
                <TouchableOpacity onPress={previousMonth}>
                    <Text style={styles.navButton}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentYear}
                </Text>
                <TouchableOpacity onPress={nextMonth}>
                    <Text style={styles.navButton}>{'>'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dayNamesContainer}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayName, index) => (
                    <Text key={index} style={styles.dayName}>
                        {dayName}
                    </Text>
                ))}
            </View>
            <View style={styles.daysContainer}>
                {calendarCells.map((day, index) => {
                    if (!day) {
                        return <View key={index} style={styles.dayCell} />;
                    }
                    const isSelected =
                        selectedDate &&
                        day.toDateString() === selectedDate.toDateString();

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dayCell,
                                dayCellStyle,
                                isSelected && styles.selectedDay,
                                isSelected && selectedDayStyle,
                            ]}
                            onPress={() => onDayPress && onDayPress(day)}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    dayTextStyle,
                                    isSelected && styles.selectedDayText,
                                    isSelected && selectedDayTextStyle,
                                ]}
                            >
                                {day.getDate()}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: '5%'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    navButton: {
        fontSize: 18,
        padding: 5,
        color: '#333',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dayNamesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
    },
    dayName: {
        width: `${100 / 7}%`,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#555',
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: `${100 / 7}%`,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
    },
    dayText: {
        fontSize: 16,
        color: '#333',
    },
    selectedDay: {
        backgroundColor: '#8C5581',
        borderRadius: 20,
    },
    selectedDayText: {
        color: '#fff',
    },
});

export default CustomCalendar;
