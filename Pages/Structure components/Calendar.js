import React, { useEffect, useState, useMemo, useContext, useCallback } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import { LocaleConfig, CalendarContext } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCalendarXmark,
    faCircleXmark,
    faPlus,
    faListCheck,
    faClockRotateLeft,
    faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

import MonthlyCalendar from './MonthlyCalendar';
import WeeklyCalendar from './WeeklyCalendar';
import TaskSorter from './TaskSorter';
import CustomCalendar from './CustomCalendar';
// ... other imports like AccordionItem, DropDownPicker, etc.

const CalendarOverview = ({ navigation }) => {
    // (State variables and functions such as dayTasks, getMarkedDates, completeTask, etc.)
    // For brevity, these are not repeated here—assume you move your logic from your original file.

    const today = new Date();
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const [enabled, setEnabled] = useState('monthly');
    const context = useContext(CalendarContext);
    const [isModalVisible, setModalVisible] = useState(false);
    const [dayTasksArray, setDayTasksArray] = useState([]);
    const [tasksArray, setTasksArray] = useState([]);
    const [eventsArray, setEventsArray] = useState([]);
    const [routinesArray, setRoutinesArray] = useState([]);
    const [selectedId, setSelectedId] = useState('month');
    const [username, setUsername] = useState('');
    const [marked, setMarked] = useState({});
    const [sorting, setSorting] = useState('type');
    const [open, setOpen] = useState(false);
    const colorMarkings = {
        '#FAEDCB': { key: 'yellow', color: '#FAEDCB' },
        '#C9E4DE': { key: 'green', color: '#C9E4DE' },
        '#C6DEF1': { key: 'blue', color: '#C6DEF1' },
        '#DBCDF0': { key: 'purple', color: '#DBCDF0' },
        '#FFADAD': { key: 'red', color: '#FFADAD' },
        '#FFD6A5': { key: 'orange', color: '#FFD6A5' }
    }
    const [allDayArray, setAllDayArray] = useState([]);
    const [sortingOptions, setSortingOptions] = useState([
        { label: 'Tid', value: 'tid' },
        { label: 'Type', value: 'type' }
    ]);
    const [chosenDate, setChosenDate] = useState(today);
    const [ID, setID] = useState('');
    LocaleConfig.locales['da'] = {
        monthNames: [
            'Januar',
            'Februar',
            'Marts',
            'April',
            'Maj',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'December'
        ],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec'],
        dayNames: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag',],
        dayNamesShort: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør',],
        today: "I dag"
    }
    LocaleConfig.defaultLocale = 'da';

    async function showDayModal(day) {
        const formattedDate = `${day.year}-${day.month.toString().padStart(2, '0')}-${day.day.toString().padStart(2, '0')}`;
        setChosenDate(formattedDate);

        await getDayEvents(formattedDate);
        await allDayQuery(formattedDate);
        setModalVisible(true);
    }

    const completeTask = async (task) => {
        const isCompleted = task.get('completed');
        console.log(task.get('completed'))
        task.set('completed', !isCompleted);
        await task.save();

        getDayEvents(chosenDate);
    }

    function LightenDarkenColor(col, amt) {
        var usePound = false;
        if (col[0] === "#") {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col, 16);

        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }

    async function getDayEvents(day) {

        let taskQuery = new Parse.Query('Task');
        let eventQuery = new Parse.Query('Events');
        let routineQuery = new Parse.Query('Routine');

        taskQuery.equalTo('user', { __type: 'Pointer', className: '_User', objectId: ID });
        taskQuery.equalTo('date', day);
        taskQuery.ascending('startTime');

        eventQuery.equalTo('user', { __type: 'Pointer', className: '_User', objectId: ID });
        eventQuery.equalTo('date', day);
        eventQuery.notEqualTo('allDay', true);
        eventQuery.ascending('startTime');

        routineQuery.equalTo('user', { __type: 'Pointer', className: '_User', objectId: ID });
        routineQuery.equalTo('calendarDate', day);
        routineQuery.ascending('startTime');

        Promise.all([
            taskQuery.find(),
            eventQuery.find(),
            routineQuery.find()
        ]).then(([tResult, eResult, rResult]) => {
            setTasksArray(tResult);
            setEventsArray(eResult);
            setRoutinesArray(rResult);

            let allEvents = tResult.concat(eResult).concat(rResult);
            allEvents.sort((a, b) => {
                if (a.get('startTime') < b.get('startTime')) {
                    return -1;
                } else if (a.get('startTime') > b.get('startTime')) {
                    return 1;
                }
                return 0;
            });

            setDayTasksArray(allEvents);

        }).catch(error => {
            console.error('Error fetching data', error);
        });
    }

    async function allDayQuery(day) {
        let query = new Parse.Query('Events');
        query.equalTo('allDay', true);
        query.equalTo('date', day);
        query.equalTo('user', { __type: 'Pointer', className: '_User', objectId: ID });
        const result = await query.find();
        setAllDayArray(result);
        console.log('all day array: ' + result)
    }

    const calendarLayout = () => {
        if (enabled === 'monthly') {
            return (
                <CustomCalendar
                    onDayPress={showDayModal}
                    markedDates={marked}
                    scaleFactor={scaleFactor}
                    colors={colors}
                    calendarHeight={500}
                />
            );
        } else if (enabled === 'weekly') {
            return (
                <WeeklyCalendar
                    today={today}
                    onDateSelected={dayTasks}
                    sorting={sorting}
                    setSorting={setSorting}
                    sortingOptions={sortingOptions}
                    open={open}
                    setOpen={setOpen}
                    sortEventView={sortEventView}
                    colors={colors}
                />
            );
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: '1%' }}>
                    <Text style={{ fontSize: 26, marginTop: 15, color: 'white' }}>Kalender</Text>
                </View>
                <View style={{ flexDirection: 'row', top: '2%', justifyContent: 'center' }}>
                    <TouchableOpacity style={{
                        backgroundColor: enabled == 'daily' ? colors.mainButton : colors.subButton,
                        padding: '2%', borderWidth: 1, borderColor: colors.border, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: '30%', alignItems: 'center'
                    }}
                        onPress={() => setEnabled('daily')}>
                        <Text style={{ fontSize: 18 }}>I dag</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: enabled == 'weekly' ? colors.mainButton : colors.subButton,
                        padding: '2%', borderWidth: 1, borderColor: colors.border, width: '30%', alignItems: 'center'
                    }}
                        onPress={() => setEnabled('weekly')}>
                        <Text style={{ fontSize: 18 }}>Denne uge</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: enabled == 'monthly' ? colors.mainButton : colors.subButton,
                        padding: '2%', borderWidth: 1, borderColor: colors.border, borderTopRightRadius: 10, borderBottomRightRadius: 10, width: '30%', alignItems: 'center'
                    }}
                        onPress={() => setEnabled('monthly')}>
                        <Text style={{ fontSize: 18 }}>Måned</Text>
                    </TouchableOpacity>
                </View>
                {/* Calendar Layout */}
                <View>{calendarLayout()}</View>
                {/* Modal for Day Details */}
                <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
                    <View
                        style={{
                            backgroundColor: colors.background,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: colors.background,
                            borderRadius: 10,
                            height: '80%',
                        }}
                    >
                        <View style={{ width: '100%' }}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    size={30}
                                    style={{ alignSelf: 'flex-end', margin: '3%' }}
                                    color={colors.border}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                {/* Display chosen date */}
                            </Text>
                        </View>
                        <View
                            style={{
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderRadius: 10,
                                borderColor: 'white',
                                marginHorizontal: 10,
                                width: '90%',
                                height: '80%',
                            }}
                        >
                            <ScrollView style={{ height: 250 }}>
                                <TaskSorter
                                    dayTasksArray={dayTasksArray}
                                    allDayArray={allDayArray}
                                    completeTask={completeTask}
                                    colors={colors}
                                    LightenDarkenColor={LightenDarkenColor}
                                    sorting={sorting}
                                />
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // Move any shared styles here.
});

export default CalendarOverview;