import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStopwatch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getDayEvents, getAllDayEvents } from './DayEvents';
import { colorChange } from './ColorChange';
import Parse from 'parse/react-native';
import { useUser } from '../../Components/UserContext';
import AccordionItem from '../../Components/AccordionItem';

const TaskSorter = ({
    date,
    selectedWeekDays,
    completeTask
}) => {
    const { colors } = useTheme();
    const [open, setOpen] = useState(false);
    const [sorting, setSorting] = useState('type');
    const [sortingOptions, setSortingOptions] = useState([
        { label: 'Tid', value: 'tid' },
        { label: 'Type', value: 'type' }
    ]);
    const [allDayArray, setAllDayArray] = useState([]);
    const [dayTasksArray, setDayTasksArray] = useState([]);
    const { ID } = useUser();
    const [tasksArray, setTasksArray] = useState([]);
    const [eventsArray, setEventsArray] = useState([]);
    const [routinesArray, setRoutinesArray] = useState([]);

    useFocusEffect(
        useCallback(() => {
            async function fetchEvents() {
                let currentUser = Parse.User.current();
                const formattedDate = formatDate(date);
                console.log('formatted date: ' + formattedDate)
                if (!formattedDate) {
                    console.error('Invalid date format:', date);
                    return;
                }
                try {
                    const dayEvents = await getDayEvents(formattedDate, currentUser.id);
                    const allDayEvents = await getAllDayEvents(formattedDate, currentUser.id);
                    setDayTasksArray(dayEvents.allEvents);
                    setAllDayArray(allDayEvents);
                    setTasksArray(dayEvents.tasks);
                    setEventsArray(dayEvents.events);
                    setRoutinesArray(dayEvents.routines);
                    console.log(tasksArray)
                } catch (error) {
                    console.error('Error fetching events:', error);
                }
            }
            fetchEvents();
        }, [date, ID])
    );

    const formatDate = (date) => {
        if (date instanceof Date && date.getFullYear) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        if (date.year && date.month && date.day) {
            return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
        }
        return '';
    };

    function sortEventView() {
        if (sorting == 'tid') {
            return (
                <View>
                    {
                        dayTasksArray.length == 0 && allDayArray.length == 0 ?
                            <View style={{ marginHorizontal: 15, alignItems: 'center', marginVertical: '25%' }}>
                                <Text style={{ textAlign: 'center', fontSize: 18, color: colors.darkText }}>Der er ingen opgaver eller begivenheder i din kalender i dag!</Text>
                            </View>
                            :
                            <View>
                                <View>
                                    {allDayArray.map((item, index) => (
                                        <View key={index} style={{ alignItems: 'center', borderWidth: 1, padding: 5, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), }}>
                                            <Text style={{ fontSize: 20, marginRight: 10, marginLeft: 2, color: colors.lightText }}>{item.get('emoji')}</Text>
                                            <Text style={{ fontSize: 18, paddingRight: 5, color: colors.darkText }}>{item.get('name')}</Text>
                                        </View>
                                    ))}
                                    {allDayArray.length == 0 ?
                                        <View />
                                        :
                                        <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 20, backgroundColor: colors.darkText, width: 250, alignSelf: 'center', borderColor: colors.dark, borderRadius: 10 }}></View>

                                    }
                                </View>
                                <View style={{ marginBottom: '5%' }}>
                                    {dayTasksArray.map((item, index) => (
                                        <View key={index} style={{ flexDirection: 'row' }}>
                                            {item.get('type') == 'task' ?
                                                <BouncyCheckbox
                                                    size={30}
                                                    fillColor={colors.darkText}
                                                    unfillColor={colors.dark}
                                                    iconStyle={{ elevation: 5, }}
                                                    innerIconStyle={{ borderWidth: 15, borderColor: item.get('color') }}
                                                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                                    onPress={() => { completeTask(item) }}
                                                    isChecked={item.get('completed')}
                                                    style={{ marginHorizontal: 10, flex: 0.5 }}
                                                />
                                                : <View style={{ marginLeft: '11%' }} />
                                            }
                                            {item.get('type') == 'routine' ?
                                                <View style={{ flex: 1, alignItems: 'center', borderWidth: 1, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), elevation: 5 }}>
                                                    <AccordionItem
                                                        title={item.get('name')}
                                                        time={item.get('startTime') + ' - ' + item.get('endTime')}
                                                        icon={null}
                                                        emoji={item.get('emoji')}
                                                        titleStyle={{ fontSize: 18, color: 'black', fontWeight: 'normal' }}
                                                        emojiStyle={{ fontSize: 22 }}
                                                        toggleStyle={'black'}>
                                                        {item.get('routineSteps').map((step, index) => (
                                                            <View key={index} style={{ flexDirection: 'row' }}>
                                                                <View style={{ justifyContent: 'center' }}>
                                                                    <BouncyCheckbox
                                                                        size={30}
                                                                        fillColor={colors.darkText}
                                                                        unfillColor={colors.dark}
                                                                        iconStyle={{ elevation: 5, }}
                                                                        innerIconStyle={{ borderWidth: 15, borderColor: colorChange(item.get('color'), -30) }}
                                                                        textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                                                        onPress={() => { }}
                                                                        style={{ flex: 0.5, }}
                                                                    />
                                                                </View>
                                                                <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, marginVertical: 5, flexDirection: 'row', backgroundColor: colorChange(item.get('color'), -30), borderColor: colorChange(item.get('color'), -30), elevation: 5, justifyContent: 'space-between', width: '80%' }}>
                                                                    <View style={{ justifyContent: 'center' }}>
                                                                        <Text style={{ fontSize: 18, paddingRight: 5, color: colors.darkText }}>{step.stepName}</Text>
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
                                                : <View style={{ flex: 7, padding: '3%', borderWidth: 1, marginVertical: 5, marginHorizontal: 15, backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), elevation: 5, flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 22, marginRight: 10, color: colors.lightText }}>{item.get('emoji')}</Text>
                                                    <View>
                                                        <Text style={{ fontSize: 18, paddingRight: 5, color: colors.darkText }}>{item.get('name')}</Text>
                                                        <Text style={{ marginHorizontal: 1, fontSize: 14, color: colors.darkText }}>{item.get('startTime')} - {item.get('endTime')}</Text>
                                                    </View>
                                                </View>
                                            }
                                        </View>
                                    ))}
                                </View>
                            </View>
                    }
                </View>
            );
        } else {
            return (
                <View>
                    {
                        dayTasksArray.length == 0 && allDayArray.length == 0 ?
                            <View style={{ marginHorizontal: 15, alignItems: 'center', marginVertical: '25%' }}>
                                <Text style={{ textAlign: 'center', fontSize: 18, color: colors.darkText }}>Der er ingen opgaver eller begivenheder i din kalender i dag!</Text>
                            </View>
                            :
                            <View>
                                <View>
                                    {allDayArray.map((item, index) => (
                                        <View key={index} style={{ alignItems: 'center', borderWidth: 1, padding: 5, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), }}>
                                            <Text style={{ fontSize: 20, marginRight: 10, marginLeft: 2, color: colors.lightText }}>{item.get('emoji')}</Text>
                                            <Text style={{ fontSize: 18, paddingRight: 5, color: colors.darkText }}>{item.get('name')}</Text>
                                        </View>
                                    ))}
                                </View>
                                {tasksArray.length == 0 ?
                                    null
                                    : <View>
                                        <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: '2%', backgroundColor: colors.dark, width: 250, alignSelf: 'center', borderColor: colors.dark, borderRadius: 10 }}></View>
                                        <Text style={{ fontSize: 16, marginLeft: '2%', textAlign: 'center', marginTop: '5%' }}>To-do's</Text>
                                        {tasksArray.map((item, index) => (
                                            <View key={index} style={{ flexDirection: 'row', marginBottom: '5%' }}>
                                                <BouncyCheckbox
                                                    size={30}
                                                    fillColor={colors.dark}
                                                    unfillColor={colors.dark}
                                                    iconStyle={{ elevation: 5, }}
                                                    innerIconStyle={{ borderWidth: 15, borderColor: item.get('color') }}
                                                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                                    onPress={() => { completeTask(item) }}
                                                    isChecked={item.get('completed')}
                                                    style={{ marginHorizontal: 10, flex: 0.5 }}
                                                />
                                                <View style={{ flex: 7, padding: '3%', borderWidth: 1, marginVertical: 5, marginHorizontal: 15, backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), elevation: 5, flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 22, marginRight: 10, color: colors.lightText }}>{item.get('emoji')}</Text>
                                                    <View>
                                                        <Text style={{ fontSize: 18, paddingRight: 5, color: colors.darkText }}>{item.get('name')}</Text>
                                                        <Text style={{ marginHorizontal: 1, fontSize: 14, color: colors.darkText }}>{item.get('startTime')} - {item.get('endTime')}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                }
                                {eventsArray.length == 0 ?
                                    null
                                    : <View>
                                        <Text style={{ fontSize: 16, marginLeft: '2%', textAlign: 'center', marginTop: '5%' }}>Begivenheder</Text>
                                        {eventsArray.map((item, index) => (
                                            <View key={index}
                                                style={{ marginLeft: '15%', flex: 7, padding: '3%', borderWidth: 1, marginVertical: 5, marginHorizontal: 15, backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), elevation: 5, flexDirection: 'row' }}>
                                                <Text style={{ fontSize: 22, marginRight: 10, color: colors.lightText }}>{item.get('emoji')}</Text>
                                                <View>
                                                    <Text style={{ fontSize: 18, paddingRight: 5, color: colors.darkText }}>{item.get('name')}</Text>
                                                    <Text style={{ marginHorizontal: 1, fontSize: 14, color: colors.darkText }}>{item.get('startTime')} - {item.get('endTime')}</Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                }
                                {routinesArray.length == 0 ?
                                    null
                                    : <View>
                                        <Text style={{ fontSize: 16, marginLeft: '2%', textAlign: 'center', marginTop: '5%' }}>Rutiner</Text>
                                        {routinesArray.map((item, index) => (
                                            <View key={index}
                                                style={{ marginLeft: '15%', flex: 1, alignItems: 'center', borderWidth: 1, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), elevation: 5 }}>
                                                <AccordionItem
                                                    title={item.get('name')}
                                                    time={item.get('startTime') + ' - ' + item.get('endTime')}
                                                    icon={null}
                                                    emoji={item.get('emoji')}
                                                    titleStyle={{ fontSize: 18, color: 'black', fontWeight: 'normal' }}
                                                    emojiStyle={{ fontSize: 22 }}
                                                    toggleStyle={'black'}>
                                                    {item.get('routineSteps').map((step, index) => (
                                                        <View key={index} style={{ flexDirection: 'row', }}>
                                                            <View style={{ justifyContent: 'center' }}>
                                                                <BouncyCheckbox
                                                                    size={40}
                                                                    fillColor={colorChange(item.get('color'), -30)}
                                                                    unfillColor={colors.dark}
                                                                    iconStyle={{ elevation: 2, }}
                                                                    innerIconStyle={{ borderWidth: 20, borderColor: colorChange(item.get('color'), -30) }}
                                                                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                                                    style={{ flex: 0.1 }}
                                                                />
                                                            </View>
                                                            <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, marginVertical: 5, flexDirection: 'row', backgroundColor: colorChange(item.get('color'), -30), borderColor: colorChange(item.get('color'), -30), elevation: 5, justifyContent: 'space-between', width: '80%' }}>
                                                                <View style={{ justifyContent: 'center' }}>
                                                                    <Text style={{ fontSize: 18, paddingRight: 5, color: colors.darkText }}>{step.stepName}</Text>
                                                                </View>
                                                                {step.stepTime !== '' ?
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                        <FontAwesomeIcon icon={faStopwatch} style={{ marginHorizontal: 5 }} size={20} color={'white'} />
                                                                        <Text style={{ fontSize: 18, color: colors.darkText }}>{step.stepTime}</Text>
                                                                    </View>
                                                                    : <Text></Text>}
                                                            </View>
                                                        </View>
                                                    ))}
                                                </AccordionItem>
                                            </View>
                                        ))}
                                    </View>}
                            </View>
                    }
                </View>
            );
        }
    }

    return (
        <SafeAreaView style={{ marginHorizontal: '5%', marginBottom: '20%' }}>
            <View style={{ alignItems: 'center', marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 24, color: colors.darkText }}>Dagens planer</Text>
                <DropDownPicker
                    open={open}
                    value={sorting}
                    items={sortingOptions}
                    setOpen={setOpen}
                    setValue={setSorting}
                    setItems={setSortingOptions}
                    placeholder={
                        <FontAwesomeIcon icon={faFilter} size={20} color={colors.dark} />}
                    style={{ borderColor: colors.dark, elevation: 5 }}
                    containerStyle={{
                        width: '35%',

                    }}
                    textStyle={{ fontSize: 14 }}
                />

            </View>
            <View >
                {sortEventView()}
            </View>
        </SafeAreaView>
    );
}


export default TaskSorter;