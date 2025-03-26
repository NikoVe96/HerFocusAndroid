import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDayEvents, getAllDayEvents } from './DayEvents';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useTheme } from '@react-navigation/native';
import AccordionItem from '../../Components/AccordionItem';

const WeeklyTaskView = ({ weekDates, userID }) => {
    const [weekTasks, setWeekTasks] = useState([]);
    const { colors } = useTheme();

    const formatDate = (date) => {
        if (date instanceof Date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return '';
    };

    useEffect(() => {
        async function fetchWeekTasks() {
            if (!weekDates || weekDates.length === 0 || !userID) return;
            const results = [];

            for (let date of weekDates) {
                const formattedDate = formatDate(date);
                try {
                    const dayEvents = await getDayEvents(formattedDate, userID);
                    const allDayEvents = await getAllDayEvents(formattedDate, userID);

                    if (
                        (dayEvents.tasks && dayEvents.tasks.length > 0) ||
                        (dayEvents.events && dayEvents.events.length > 0) ||
                        (dayEvents.routines && dayEvents.routines.length > 0) ||
                        (allDayEvents && allDayEvents.length > 0)
                    ) {
                        results.push({
                            date,
                            events: {
                                tasks: dayEvents.tasks || [],
                                events: dayEvents.events || [],
                                routines: dayEvents.routines || [],
                                allDay: allDayEvents || [],
                            },
                        });
                    }
                } catch (error) {
                    console.error('Error fetching events for date', formattedDate, error);
                }
            }
            setWeekTasks(results);
        }
        fetchWeekTasks();

        console.log('WeeklyTaskView received weekDates:', weekDates, 'and userID:', userID);
    }, [weekDates, userID]);

    return (
        <View style={styles.container}>
            {weekTasks.length == 0 ?
                <View style={styles.noTasksContainer}>
                    <Text style={styles.noTasksText}>
                        Der er ingen opgaver eller begivenheder i denne uge.
                    </Text>
                </View>
                :
                weekTasks.map((item, index) => (
                    <View key={index} style={styles.dayContainer}>
                        <Text style={styles.dateHeader}>{formatDate(item.date)}</Text>
                        {item.events.allDay.map((event, index) => (
                            <View key={index} style={{ alignItems: 'center', borderWidth: 1, padding: 5, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), }}>
                                <Text style={{ fontSize: 20, marginRight: 10, marginLeft: 2, color: colors.lightText }}>{item.get('emoji')}</Text>
                                <Text style={{ fontSize: 18, paddingRight: 5, color: colors.lightText }}>{item.get('name')}</Text>
                            </View>
                        ))}
                        {item.events.tasks.map((task, index) => (
                            <View key={index} style={{ flexDirection: 'row', marginBottom: '5%' }}>
                                <BouncyCheckbox
                                    size={30}
                                    fillColor={colors.dark}
                                    unfillColor={colors.dark}
                                    iconStyle={{ elevation: 5, }}
                                    innerIconStyle={{ borderWidth: 15, borderColor: task.get('color') }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                    onPress={() => { completeTask(task) }}
                                    isChecked={task.get('completed')}
                                    style={{ marginHorizontal: 10, flex: 0.5 }}
                                />
                                <View style={{ flex: 7, padding: '3%', borderWidth: 1, marginVertical: 5, marginHorizontal: 15, backgroundColor: task.get('color'), borderRadius: 10, borderColor: task.get('color'), elevation: 5, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 22, marginRight: 10, color: colors.lightText }}>{task.get('emoji')}</Text>
                                    <View>
                                        <Text style={{ fontSize: 18, paddingRight: 5, color: colors.lightText }}>{task.get('name')}</Text>
                                        <Text style={{ marginHorizontal: 1, fontSize: 14, color: colors.lightText }}>{task.get('startTime')} - {task.get('endTime')}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                        {item.events.events.map((event, index) => (
                            <View style={{ marginLeft: '11%' }}>
                                <View style={{ flex: 7, padding: '3%', borderWidth: 1, marginVertical: 5, marginHorizontal: 15, backgroundColor: event.get('color'), borderRadius: 10, borderColor: event.get('color'), elevation: 5, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 22, marginRight: 10, color: colors.lightText }}>{event.get('emoji')}</Text>
                                    <View>
                                        <Text style={{ fontSize: 18, paddingRight: 5, color: colors.lightText }}>{event.get('name')}</Text>
                                        <Text style={{ marginHorizontal: 1, fontSize: 14, color: colors.lightText }}>{event.get('startTime')} - {event.get('endTime')}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                        {item.events.routines.map((routine, index) => (
                            <View style={{ flex: 1, alignItems: 'center', borderWidth: 1, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: routine.get('color'), borderRadius: 10, borderColor: routine.get('color'), elevation: 5 }}>
                                <AccordionItem
                                    title={routine.get('name')}
                                    time={routine.get('startTime') + ' - ' + routine.get('endTime')}
                                    icon={null}
                                    emoji={routine.get('emoji')}
                                    titleStyle={{ fontSize: 18, color: 'black', fontWeight: 'normal' }}
                                    emojiStyle={{ fontSize: 22 }}
                                    toggleStyle={'black'}>
                                    {item.get('routineSteps').map((step, index) => (
                                        <View key={index} style={{ flexDirection: 'row' }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <BouncyCheckbox
                                                    size={30}
                                                    fillColor={colors.dark}
                                                    unfillColor={colors.dark}
                                                    iconStyle={{ elevation: 5, }}
                                                    innerIconStyle={{ borderWidth: 15, borderColor: LightenDarkenColor(routine.get('color'), -30) }}
                                                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                                    onPress={() => { }}
                                                    style={{ flex: 0.5 }}
                                                />
                                            </View>
                                            <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, marginVertical: 5, flexDirection: 'row', backgroundColor: LightenDarkenColor(routine.get('color'), -30), borderColor: LightenDarkenColor(routine.get('color'), -30), elevation: 5, justifyContent: 'space-between', width: '80%' }}>
                                                <View style={{ justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 18, paddingRight: 5, color: colors.lightText }}>{step.stepName}</Text>
                                                </View>
                                                {step.stepTime !== '' ?
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <FontAwesomeIcon icon={faStopwatch} style={{ marginHorizontal: 5 }} size={20} color={'white'} />
                                                        <Text style={{ fontSize: 18, color: colors.darkText }}>{step.stepTime}</Text>
                                                    </View>
                                                    : null}
                                            </View>
                                        </View>
                                    ))}
                                </AccordionItem>
                            </View>
                        ))}
                    </View>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    noTasksContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    noTasksText: {
        fontSize: 18,
        textAlign: 'center',
    },
    dayContainer: {
        marginBottom: 15,
        borderRadius: 10,
        padding: 10,
    },
    dateHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    eventText: {
        fontSize: 14,
        marginLeft: 10,
    },
});

export default WeeklyTaskView;