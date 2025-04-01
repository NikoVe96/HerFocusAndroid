import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Parse from 'parse/react-native';
import { useTheme } from '@react-navigation/native';

const CustomCalendar = ({
    onDayPress,
    selectedDate,
    ID,
}) => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 0).getDay();
    const calendarCells = [];
    const [marked, setMarked] = useState({});
    const { colors } = useTheme()

    useEffect(() => {
        setMarkedDays();
    }, [currentDate]);

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

    async function getMarkedDates() {
        let taskDaysQuery = new Parse.Query('Task');
        taskDaysQuery.equalTo('user', { __type: 'Pointer', className: '_User', objectId: ID });
        taskDaysQuery.ascending('date');

        let eventDaysQuery = new Parse.Query('Events');
        eventDaysQuery.equalTo('user', { __type: 'Pointer', className: '_User', objectId: ID });
        eventDaysQuery.ascending('date');

        const routineDaysQuery = new Parse.Query('Routine');
        routineDaysQuery.equalTo('user', { __type: 'Pointer', className: '_User', objectId: ID });
        routineDaysQuery.ascending('date');

        const [taskResults, eventResults, routineResults] = await Promise.all([
            taskDaysQuery.find(),
            eventDaysQuery.find(),
            routineDaysQuery.find()
        ]);

        return { taskResults, eventResults, routineResults };
    }

    async function setMarkedDays() {
        const { taskResults, eventResults, routineResults } = await getMarkedDates();

        const newMarked = {};

        const processItems = (items) => {
            items.forEach(item => {
                const date = item.get('date');
                const color = item.get('color');
                if (!newMarked[date]) {
                    newMarked[date] = { dots: [] };
                }

                const colorObject = colorMarkings[color];
                if (!newMarked[date].dots.some(dot => dot.key === colorObject.key)) {
                    newMarked[date].dots.push(colorObject);
                }
            });
        };

        processItems(taskResults);
        processItems(eventResults);
        processItems(routineResults);

        setMarked(newMarked);
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <View style={[styles.container]}>
            <View style={[styles.header]}>
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
                    const formatted = formatDate(day);
                    const dotInfo = marked[formatted];
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dayCell,
                                isSelected && styles.selectedDay,
                                isSelected && { backgroundColor: colors.dark }
                            ]}
                            onPress={() => onDayPress && onDayPress(day)}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    isSelected && styles.selectedDayText,
                                ]}
                            >
                                {day.getDate()}
                            </Text>
                            {dotInfo && dotInfo.dots && (
                                <View style={styles.dotContainer}>
                                    {dotInfo.dots.map((dot, i) => (
                                        <View
                                            key={i}
                                            style={[styles.dot, { backgroundColor: dot.color }]}
                                        />
                                    ))}
                                </View>
                            )}
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
        borderRadius: 30,
    },
    selectedDayText: {
        color: '#fff',
        fontSize: 20
    },
    dotContainer: {
        position: 'absolute',
        bottom: 2,
        flexDirection: 'row',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 1,
    },
});

export default CustomCalendar;
