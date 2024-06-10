import React, { useEffect, useState, useMemo, useContext, useCallback } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import { Calendar, LocaleConfig, CalendarContext } from 'react-native-calendars';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarXmark, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faStopwatch, faPlus, faListCheck, faClockRotateLeft, faFilter, faCake } from '@fortawesome/free-solid-svg-icons';
import RadioGroup from 'react-native-radio-buttons-group';
import CalendarStrip from 'react-native-calendar-strip';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from '@react-navigation/native';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import AccordionItem from '../../Components/AccordionItem';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect } from '@react-navigation/native';

export const CalendarOverview = ({ navigation }) => {

  const today = new Date;
  const currentDate = today.toISOString().slice(0, 10);
  const context = useContext(CalendarContext);
  const { colors } = useTheme();
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
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
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

  useFocusEffect(
    useCallback(() => {
      dayTasks(today);
      getMarkedDates();
      return () => { };
    }, []),
  );

  useEffect(() => {
    async function getCurrentUser() {
      if (username === '') {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser !== null) {
          setUsername(currentUser.getUsername());
          setID(currentUser.id);
          setMarkedDays();
          await getMarkedDates();
        }
      }
    }

    getCurrentUser();
  }, []);

  async function showDayModal(day) {
    const formattedDate = `${day.year}-${day.month.toString().padStart(2, '0')}-${day.day.toString().padStart(2, '0')}`;
    setChosenDate(formattedDate);

    await getDayEvents(formattedDate);
    await allDayQuery(formattedDate);
    setModalVisible(true);
  }

  async function getDayEvents(day) {

    let taskQuery = new Parse.Query('Task');
    let eventQuery = new Parse.Query('Events');
    let routineQuery = new Parse.Query('Routine');

    taskQuery.contains('user', ID);
    taskQuery.equalTo('date', day);
    taskQuery.ascending('startTime');

    eventQuery.contains('user', ID);
    eventQuery.contains('date', day);
    eventQuery.notEqualTo('allDay', true);
    eventQuery.ascending('startTime');

    routineQuery.contains('user', ID);
    routineQuery.contains('calendarDate', day);
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
    const result = await query.find();
    setAllDayArray(result);
    console.log('all day array: ' + result)
  }

  const hideDayModel = () => {
    setModalVisible(false);
  }

  async function dayTasks(date) {
    const formattedDate = date.toISOString().slice(0, 10);
    setChosenDate(formattedDate);
    getDayEvents(formattedDate);
    allDayQuery(formattedDate);
  }

  const radioButtons = useMemo(
    () => [
      {
        id: 'month',
        label: 'Måned',
        labelStyle: { color: colors.text },
        value: 'month',
        size: 30,
        color: colors.text,
      },
      {
        id: 'day',
        label: 'Dag',
        labelStyle: { color: colors.text },
        value: 'day',
        size: 30,
        color: colors.text,
      },
    ],
    [],
  );

  async function getMarkedDates() {

    let taskDaysQuery = new Parse.Query('Task');
    taskDaysQuery.contains('user', ID);
    taskDaysQuery.ascending('date');


    let eventDaysQuery = new Parse.Query('Events');
    eventDaysQuery.contains('user', ID);
    eventDaysQuery.ascending('date');

    const routineDaysQuery = new Parse.Query('Routine');
    routineDaysQuery.equalTo('user', ID);
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
        const date = item.get('date')
        const color = item.get('color');
        if (!newMarked[date]) {
          newMarked[date] = { dots: [] };
        }

        const colorObject = colorMarkings[color];
        if (!newMarked[date].dots.includes(colorObject)) {
          newMarked[date].dots.push(colorObject);
        }
      });
    };

    processItems(taskResults);
    processItems(eventResults);
    processItems(routineResults);

    setMarked(newMarked);
    console.log(marked)
  }

  const completeTask = async (task) => {
    isCompleted = task.get('completed');
    console.log(task.get('completed'))
    task.set('completed', !isCompleted);
    await task.save();

    getDayEvents();

  }

  function LightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
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

  function sortEventView() {
    if (sorting == 'tid') {
      return (
        <View>
          {
            dayTasksArray.length == 0 && allDayArray.length == 0 ?
              <View style={{ marginHorizontal: 15, alignItems: 'center', marginVertical: '25%' }}>
                <Text style={{ textAlign: 'center', fontSize: 18, }}>Der er ingen opgaver eller begivenheder i din kalender i dag!</Text>
              </View>
              :
              <View>
                <View>
                  {allDayArray.map((item, index) => (
                    <View key={index} style={{ alignItems: 'center', borderWidth: 1, padding: 5, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), }}>
                      <Text style={{ fontSize: 20, marginRight: 10, marginLeft: 2, color: colors.text }}>{item.get('emoji')}</Text>
                      <Text style={{ fontSize: 18, paddingRight: 5, color: colors.text }}>{item.get('name')}</Text>
                    </View>
                  ))}
                  {dayTasksArray.length == 0 ?
                    null
                    : <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: 20, backgroundColor: colors.border, width: 250, alignSelf: 'center', borderColor: colors.border, borderRadius: 10 }}></View>
                  }
                </View>
                <View style={{ marginBottom: '5%' }}>
                  {dayTasksArray.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                      {item.get('type') == 'task' ?
                        <BouncyCheckbox
                          size={30}
                          fillColor={colors.mainButton}
                          unfillColor={colors.mainButton}
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
                                    fillColor={colors.mainButton}
                                    unfillColor={colors.mainButton}
                                    iconStyle={{ elevation: 5, }}
                                    innerIconStyle={{ borderWidth: 15, borderColor: LightenDarkenColor(item.get('color'), -30) }}
                                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                    onPress={() => { }}
                                    style={{ flex: 0.5 }}
                                  />
                                </View>
                                <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, marginVertical: 5, flexDirection: 'row', backgroundColor: LightenDarkenColor(item.get('color'), -30), borderColor: LightenDarkenColor(item.get('color'), -30), elevation: 5, justifyContent: 'space-between', width: '80%' }}>
                                  <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18, paddingRight: 5, color: colors.text }}>{step.stepName}</Text>
                                  </View>
                                  {step.stepTime !== '' ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                      <FontAwesomeIcon icon={faStopwatch} style={{ marginHorizontal: 5 }} size={20} color={'white'} />
                                      <Text style={{ fontSize: 18, color: colors.text }}>{step.stepTime}</Text>
                                    </View>
                                    : null}
                                </View>
                              </View>
                            ))}
                          </AccordionItem>
                        </View>
                        : <View style={{ flex: 7, padding: '3%', borderWidth: 1, marginVertical: 5, marginHorizontal: 15, backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), elevation: 5, flexDirection: 'row' }}>
                          <Text style={{ fontSize: 22, marginRight: 10, color: colors.text }}>{item.get('emoji')}</Text>
                          <View>
                            <Text style={{ fontSize: 18, paddingRight: 5, color: colors.text }}>{item.get('name')}</Text>
                            <Text style={{ marginHorizontal: 1, fontSize: 14, color: colors.text }}>{item.get('startTime')} - {item.get('endTime')}</Text>
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
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Der er ingen opgaver eller begivenheder i din kalender i dag!</Text>
              </View>
              :
              <View>
                <View>
                  {allDayArray.map((item, index) => (
                    <View key={index} style={{ alignItems: 'center', borderWidth: 1, padding: 5, marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), }}>
                      <Text style={{ fontSize: 20, marginRight: 10, marginLeft: 2, color: colors.text }}>{item.get('emoji')}</Text>
                      <Text style={{ fontSize: 18, paddingRight: 5, color: colors.text }}>{item.get('name')}</Text>
                    </View>
                  ))}
                </View>
                {tasksArray.length == 0 ?
                  null
                  : <View>
                    <View style={{ borderWidth: 1, marginHorizontal: 15, marginVertical: '2%', backgroundColor: colors.border, width: 250, alignSelf: 'center', borderColor: colors.border, borderRadius: 10 }}></View>
                    <Text style={{ fontSize: 16, marginLeft: '2%', textAlign: 'center', marginTop: '5%' }}>To-do's</Text>
                    {tasksArray.map((item, index) => (
                      <View key={index} style={{ flexDirection: 'row', marginBottom: '5%' }}>
                        <BouncyCheckbox
                          size={30}
                          fillColor={colors.mainButton}
                          unfillColor={colors.mainButton}
                          iconStyle={{ elevation: 5, }}
                          innerIconStyle={{ borderWidth: 15, borderColor: item.get('color') }}
                          textStyle={{ fontFamily: "JosefinSans-Regular" }}
                          onPress={() => { completeTask(item) }}
                          isChecked={item.get('completed')}
                          style={{ marginHorizontal: 10, flex: 0.5 }}
                        />
                        <View style={{ flex: 7, padding: '3%', borderWidth: 1, marginVertical: 5, marginHorizontal: 15, backgroundColor: item.get('color'), borderRadius: 10, borderColor: item.get('color'), elevation: 5, flexDirection: 'row' }}>
                          <Text style={{ fontSize: 22, marginRight: 10, color: colors.text }}>{item.get('emoji')}</Text>
                          <View>
                            <Text style={{ fontSize: 18, paddingRight: 5, color: colors.text }}>{item.get('name')}</Text>
                            <Text style={{ marginHorizontal: 1, fontSize: 14, color: colors.text }}>{item.get('startTime')} - {item.get('endTime')}</Text>
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
                        <Text style={{ fontSize: 22, marginRight: 10, color: colors.text }}>{item.get('emoji')}</Text>
                        <View>
                          <Text style={{ fontSize: 18, paddingRight: 5, color: colors.text }}>{item.get('name')}</Text>
                          <Text style={{ marginHorizontal: 1, fontSize: 14, color: colors.text }}>{item.get('startTime')} - {item.get('endTime')}</Text>
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
                                  fillColor={LightenDarkenColor(item.get('color'), -30)}
                                  unfillColor={colors.mainButton}
                                  iconStyle={{ elevation: 5, }}
                                  innerIconStyle={{ borderWidth: 20, borderColor: LightenDarkenColor(item.get('color'), -30) }}
                                  textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                  style={{ flex: 0.5 }}
                                />
                              </View>
                              <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, marginVertical: 5, flexDirection: 'row', backgroundColor: LightenDarkenColor(item.get('color'), -30), borderColor: LightenDarkenColor(item.get('color'), -30), elevation: 5, justifyContent: 'space-between', width: '80%' }}>
                                <View style={{ justifyContent: 'center' }}>
                                  <Text style={{ fontSize: 18, paddingRight: 5, color: colors.text }}>{step.stepName}</Text>
                                </View>
                                {step.stepTime !== '' ?
                                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faStopwatch} style={{ marginHorizontal: 5 }} size={20} color={'white'} />
                                    <Text style={{ fontSize: 18, color: colors.text }}>{step.stepTime}</Text>
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

  function calendarLayout() {
    if (selectedId === 'month') {
      return (
        <View>
          <Calendar

            firstDay={1}
            headerStyle={{ backgroundColor: colors.mainButton, borderWidth: 1, borderColor: colors.mainButton, borderRadius: 10, }}
            enableSwipeMonths={true}
            onDayPress={(day) => showDayModal(day)}
            style={styles.calendar}
            context={context}
            markingType='multi-dot'
            theme={{
              selectedDayBackgroundColor: colors.mainButton,
              arrowColor: colors.bars,
              selectedDayTextColor: colors.background,
              dayTextColor: colors.border,
              dotColor: 'black',
              indicatorColor: colors.border,
              todayTextColor: colors.background,
              textMonthFontSize: 24 * scaleFactor,
              textDayFontSize: 18 * scaleFactor,
              textDayHeaderFontSize: 18 * scaleFactor,
              todayBackgroundColor: colors.mainButton,

            }}
            markedDates={marked}
            calendarHeight={500}
          >
          </Calendar>
        </View>
      );
    } else if (selectedId === 'day') {
      return (
        <View>
          <CalendarStrip
            calendarAnimation={{ type: 'sequence', duration: 30 }}
            daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white', }}
            style={{ height: 100, padding: 5, marginTop: '2%', marginHorizontal: 10, borderWidth: 1, borderColor: colors.mainButton, borderTopRightRadius: 10, borderTopLeftRadius: 10, elevation: 5 }}
            calendarHeaderStyle={{ color: 'white', fontSize: 20 }}
            calendarColor={colors.mainButton}
            dateNumberStyle={{ color: 'white', fontSize: 18 }}
            dateNameStyle={{ color: 'white', fontSize: 12 }}
            highlightDateNumberStyle={{ color: colors.bars, fontSize: 16 }}
            highlightDateNameStyle={{ color: colors.bars, fontSize: 9 }}
            iconContainer={{ flex: 0.1 }}
            onDateSelected={Date => dayTasks(Date)}
            scrollable={true}
            selectedDate={today}>
          </CalendarStrip>
          <View style={{ backgroundColor: 'white', borderWidth: 1, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderColor: 'white', marginHorizontal: 10, elevation: 5 }}>
            <View style={{ alignItems: 'center', marginVertical: 10, flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10 }}>
              <View style={{ flex: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 24, color: colors.bars, flex: 6, marginLeft: '5%' }}>Dagens planer</Text>
                <DropDownPicker
                  open={open}
                  value={sorting}
                  items={sortingOptions}
                  setOpen={setOpen}
                  setValue={setSorting}
                  setItems={setSortingOptions}
                  placeholder={
                    <FontAwesomeIcon icon={faFilter} size={20} color={colors.bars} />}
                  style={{ width: '100%', borderColor: colors.border, elevation: 5 }}
                  containerStyle={{
                    width: '30%',
                  }}
                  textStyle={{ fontSize: 18 }}
                />
              </View>
            </View>
            <ScrollView style={{ height: 250 }}>
              {sortEventView()}
            </ScrollView>
          </View >
        </View >
      );
    }
  }



  return (
    <MenuProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2%',
            }}>
            <Text style={{ fontSize: 26, marginTop: 15, color: colors.text }}>
              Kalender
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              marginHorizontal: 15,
              marginBottom: 20,
              backgroundColor: colors.border,
              borderRadius: 10,
              borderColor: colors.border,
            }}></View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
              layout="row"
              containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
              size={30}
            />
            <Menu>
              <MenuTrigger
                style={{
                  backgroundColor: colors.mainButton,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: colors.mainButton,
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginLeft: 5,
                  elevation: 5,
                  marginTop: '2%',
                  elevation: 5,
                  shadowColor: 'grey',
                  shadowOffset: { width: 1, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 1,
                }}>
                <FontAwesomeIcon icon={faPlus} size={20} color={colors.text} />
              </MenuTrigger>
              <MenuOptions
                customStyles={{ optionsContainer: styles.menuOptionsContainer }}>
                <MenuOption
                  onSelect={() => navigation.navigate('Add task')}
                  style={[
                    styles.menuOptionStyle,
                    {
                      backgroundColor: colors.subButton,
                      borderColor: colors.subButton,
                    },
                  ]}>
                  <Text style={{ fontSize: 18, flex: 3, color: colors.text }}>
                    Tilføj en ny to-do
                  </Text>
                  <FontAwesomeIcon
                    icon={faListCheck}
                    style={{ flex: 1, marginHorizontal: 5, color: colors.text }}
                  />
                </MenuOption>
                <MenuOption
                  onSelect={() => navigation.navigate('Add routine')}
                  style={[
                    styles.menuOptionStyle,
                    {
                      backgroundColor: colors.subButton,
                      borderColor: colors.subButton,
                    },
                  ]}>
                  <Text style={{ fontSize: 18, flex: 3, color: colors.text }}>
                    Tilføj en ny rutine
                  </Text>
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    style={{ flex: 1, marginHorizontal: 5, color: colors.text }}
                  />
                </MenuOption>
                <MenuOption
                  onSelect={() => navigation.navigate('Add event')}
                  style={[
                    styles.menuOptionStyle,
                    {
                      backgroundColor: colors.subButton,
                      borderColor: colors.subButton,
                    },
                  ]}>
                  <Text style={{ fontSize: 18, flex: 3, color: colors.text }}>
                    Tilføj et nyt event
                  </Text>
                  <FontAwesomeIcon
                    icon={faCalendarXmark}
                    style={{ flex: 1, marginHorizontal: 5, color: colors.text }}
                  />
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <View>{calendarLayout()}</View>
          <View
            style={{
              alignItems: 'flex-end',
              backgroundColor: colors.background,
              marginRight: '5%',
              marginTop: '5%',
            }}></View>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}>
            <View
              style={{
                backgroundColor: colors.background,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.background,
                borderRadius: 10,
                height: '80%'
              }}>
              <View style={{ width: '100%' }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}>
                  <FontAwesomeIcon icon={faCircleXmark} size={30} style={{ alignSelf: 'flex-end', margin: '3%' }} color={colors.border} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                  {//chosenDate.substring(5, 7) + '-' + chosenDate.substring(5, 7) + '-' + chosenDate.substring(0, 4)
                  }
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
                  height: '80%'
                }}>
                <ScrollView style={{ height: 250 }}>{sortEventView()}</ScrollView>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </MenuProvider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuOptionStyle: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 10,
    flexDirection: 'row'
  },
  menuOptionsContainer: {
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  calendar: {
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    borderColor: 'white',
  },
  calendarTheme: {
    textSectionTitleColor: 'white',
  }
});

export default CalendarOverview;