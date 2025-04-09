import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar, faPlus, faRotateRight, faStopwatch, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Modal from "react-native-modal";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import AccordionItem from '../../Components/AccordionItem';
import EmojiPicker from "rn-emoji-picker"
import { emojis } from "rn-emoji-picker/dist/data"
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DatePicker from "react-native-date-picker";
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useUser } from '../../Components/UserContext';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'

export const MyRoutines = ({ navigation }) => {

  const [routineName, setRoutineName] = useState('');
  const [routineColor, setRoutineColor] = useState('');
  const [routineEmoji, setRoutineEmoji] = useState('');
  const [username, setUsername] = useState('');
  const [isAddStepModalVisible, setStepModalVisible] = useState(false);
  const [isRoutineModalVisible, setRoutineModalVisible] = useState(false);
  const [stepName, setStepName] = useState('');
  const [stepTime, setStepTime] = useState(null);
  const [routineSteps, setRoutineSteps] = useState([]);
  const [routineObject, setRoutineObject] = useState();
  const { colors } = useTheme();
  const [ID, setID] = useState('');
  const [allRoutines, setAllRoutines] = useState([]);
  const [emojiModalVisible, setEmojiModalVisible] = useState(false);
  const [recent, setRecent] = useState([]);
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isToCalendarModalVisible, setToCalendarModalVisible] = useState(false);
  const [routineDate, setRoutineDate] = useState('');
  const [routineStartTime, setRoutineStartTime] = useState('');
  const [routineEndTime, setRoutineEndTime] = useState('');
  const [checked, setChecked] = useState(true);
  const today = new Date;
  const [tStart, setTstart] = useState(null);
  const [isAllDayEnabled, setIsAllDayEnabled] = useState(false);
  const [isRecurringEnabled, setRecurringDayEnabled] = useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [recurrence, setRecurrence] = useState('none');
  const [interval, setInterval] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      if (username === '') {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser !== null) {
          setUsername(currentUser.getUsername());
        }
      }
    }
    getCurrentUser();
    routines();
  }, [checked]);

  const showAddStepeModal = (routine, steps) => {
    setRoutineSteps(steps);
    setRoutineObject(routine);
    setStepModalVisible(true);
  };

  const hideAddStepModal = () => {
    setStepModalVisible(false);
  };

  function showEmojiModal() {
    setEmojiModalVisible(true);
  }

  function hideEmojiModal() {
    setEmojiModalVisible(false);
  }

  const showRoutineModal = () => {
    setRoutineModalVisible(true);
  }

  const hideRoutineModal = () => {
    setRoutineModalVisible(false);
  }

  async function handleNewStepConfirm() {
    const newStep = { stepName, stepTime, checked: false };
    routineSteps.push(newStep);
    routineObject.set('routineSteps', routineSteps);
    await routineObject.save();

    setStepName('');
    setStepTime('');
    await routines();
    hideAddStepModal();
  };

  async function resetSteps(routine) {
    const steps = routine.get('routineSteps');
    const updatedSteps = steps.map(step => ({ ...step, checked: false }));
    routine.set('routineSteps', updatedSteps);
    await routine.save();
    await routines();
  }

  async function updateStepCheck(index, routine) {
    const steps = routine.get('routineSteps');
    steps[index].checked = !steps[index].checked;
    routine.set('routineSteps', steps);
    await routine.save();
    await routines();
  }

  function isStepChecked(index, routine) {
    const steps = routine.get('routineSteps');
    return steps[index].checked;
  }

  const handleDeleteStep = async (index, routine) => {

    const routinesArray = routine.get('routineSteps');
    const newStepsArray = routinesArray.splice(index, 1);
    routine.set('stepsArray', newStepsArray);
    await routine.save();

    await routines();
  }

  const deleteRoutine = async (routine) => {
    const name = routine.get('name');
    try {
      routine.destroy();
      Alert.alert(name + ' er blevet slettet.');
    } catch (error) {
      Alert.alert('Hovsa!',
        'Der opstod desværre en fejl.');
    }
    await routines();
  }

  function clearInput() {
    setRoutineName('');
    setRoutineSteps([]);
    setRoutineColor('');
    setRoutineEmoji('');
  }

  async function routines() {
    const currentUser = await Parse.User.currentAsync();
    let query = new Parse.Query('Routine');
    query.equalTo('user', currentUser);
    const results = await query.find();
    setAllRoutines(results);

  }

  function handleColorPick(color) {
    if (color == routineColor) {
      setRoutineColor('');
    } else {
      setRoutineColor(color);
    }
  }

  async function moveToCalendar() {

    try {
      routineObject.set('startTime', routineStartTime);
      routineObject.set('endTime', routineEndTime);
      routineObject.set('calendarDate', routineDate);
      routineObject.set('tStart', tStart);
      await routineObject.save();

      setToCalendarModalVisible(false);
      Alert.alert(routineObject.get('name') + ' er blevet tilføjet til din kalender!');

    } catch (error) {
      console.log(error);
      Alert.alert('Hovsa!',
        'Der opstod en fejl');
    }
  }

  const handleStartTimeConfirm = (date) => {
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (minutes < 10) {
      minutes = '0' + date.getMinutes();
    }

    if (hours < 10) {
      hours = '0' + date.getHours();
    }

    setRoutineStartTime(hours
      + ':' + minutes);
    setTstart(date);
    setStartTimePickerVisibility(false);
  };

  const handleEndTimeConfirm = (date) => {
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (minutes < 10) {
      minutes = '0' + date.getMinutes();
    }

    if (hours < 10) {
      hours = '0' + date.getHours();
    }

    setRoutineEndTime(hours
      + ':' + minutes);

    setEndTimePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    setRoutineDate(formattedDate);
    console.log('Selected date:', formattedDate);
    setDatePickerVisibility(false);
  };

  const toCalendarModal = (routine) => {
    console.log(routine);
    setRoutineObject(routine);
    setToCalendarModalVisible(true);
  }

  async function saveRoutine() {
    try {
      const currentUser = await Parse.User.currentAsync();
      const newRoutine = new Parse.Object('Routine');

      newRoutine.set('name', routineName);
      newRoutine.set('user', currentUser);
      newRoutine.set('emoji', routineEmoji);
      newRoutine.set('color', routineColor);
      newRoutine.set('routineSteps', []);
      newRoutine.set('type', 'routine');
      await newRoutine.save();

      routines();
      hideRoutineModal();

      Alert.alert('En ny rutine er blevet tilføjet!')
      clearInput();
    } catch (error) {
      console.log('Error saving new routine: ', error);
      Alert.alert('Hovsa!',
        'Det ser ud til at du har glemt at udfylde enten navn eller farve 😉')
    }
  }

  async function moveToCalendar() {

    try {
      routineObject.set('startTime', routineStartTime);
      routineObject.set('endTime', routineEndTime);
      routineObject.set('calendarDate', routineDate);
      routineObject.set('tStart', tStart);
      if (isRecurringEnabled == true) {
        routineObject.set('recurrence', generateRecurringDates());
      } else {
        routineObject.set('recurrence', []);
      }
      await routineObject.save();

      setToCalendarModalVisible(false);
      Alert.alert(routineObject.get('name') + ' er blevet tilføjet til din kalender!');

    } catch (error) {
      console.log(error);
      Alert.alert('Hovsa!',
        'Der opstod en fejl');
    }
  }

  const generateRecurringDates = () => {
    const dates = [];
    let currentDate = startDate;
    console.log('interval: ' + interval);

    while (isBefore(currentDate, endDate) || isEqual(currentDate, endDate)) {
      dates.push(format(currentDate, 'yyyy-MM-dd'));

      switch (recurrence) {
        case 'daily':
          currentDate = addDays(currentDate, interval);
          break;
        case 'weekly':
          currentDate = addWeeks(currentDate, interval);
          break;
        case 'monthly':
          currentDate = addMonths(currentDate, interval);
          break;
        default:
          break;
      }
    }

    return dates;
  }

  const dateDisplay = (date) => {
    let month = date.getMonth() + 1;
    return date.getDate() + '/' + month + '/' + date.getFullYear();
  };



  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => showRoutineModal()}
            style={[
              styles.plusBtn,
              {
                backgroundColor: colors.middle,
                borderColor: colors.middleShadow,
              },
            ]}>
            <FontAwesomeIcon
              icon={faPlus}
              size={25 * scaleFactor}
              color={colors.lightText}
            />
          </TouchableOpacity>
          {allRoutines.map((routine, index) => (
            <AccordionItem
              key={index}
              title={routine.get('name')}
              emoji={routine.get('emoji')}
              icon={null}
              emojiStyle={{ fontSize: 35 * scaleFactor }}
              titleStyle={{ fontSize: 24 * scaleFactor, color: colors.darkText }}>
              <View
                style={[styles.outerView, {
                  backgroundColor: colors.middle,
                  borderColor: colors.middleShadow,

                }]}>
                <View
                  style={styles.icons}>
                  <TouchableOpacity
                    style={{
                      marginHorizontal: '2%',
                      padding: 8,
                      alignItems: 'center',
                    }}
                    onPress={() => toCalendarModal(routine)}>
                    <FontAwesomeIcon
                      icon={faCalendar}
                      size={28 * scaleFactor}
                      color={colors.lightText}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginHorizontal: '2%',
                      padding: 8,
                      alignItems: 'center',
                    }}
                    onPress={() => resetSteps(routine)}>
                    <FontAwesomeIcon
                      icon={faRotateRight}
                      size={24 * scaleFactor}
                      color={colors.light}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginHorizontal: '2%',
                      padding: 8,
                      alignItems: 'center',
                    }}
                    onPress={() => deleteRoutine(routine)}>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      size={24 * scaleFactor}
                      color="#BF4C41"
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView
                  nestedScrollEnabled={true}
                  style={{
                    height:
                      routine.get('routineSteps').length > 4
                        ? 250 * scaleFactor
                        : undefined,
                  }}>
                  {routine.get('routineSteps').map((step, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <BouncyCheckbox
                          size={30 * scaleFactor}
                          fillColor={colors.middle}
                          unfillColor={colors.dark}
                          iconStyle={{ borderColor: 'black' }}
                          innerIconStyle={{ backgroundColor: colors.light, elevation: 5, marginLeft: '40%' }}
                          textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                          style={{ marginLeft: '2%' }}
                          isChecked={isStepChecked(index, routine)}
                          onPress={() => updateStepCheck(index, routine)}
                        />
                      </View>
                      <View
                        style={[styles.taskView, {
                          backgroundColor: colors.light,
                          borderColor: colors.lightShadow,
                        }]}>
                        <View style={{ justifyContent: 'center' }}>
                          <Text
                            style={{
                              fontSize: 18 * scaleFactor,
                              color: colors.darkText,
                            }}>
                            {step.stepName}
                          </Text>
                        </View>
                        {step.stepTime !== '' ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '20%',
                              alignItems: 'center',
                              marginLeft: '45%',
                            }}>
                            <FontAwesomeIcon
                              icon={faStopwatch}
                              style={{ marginHorizontal: 5 }}
                              size={20 * scaleFactor}
                              color={colors.dark}
                            />
                            <Text
                              style={{
                                fontSize: 18 * scaleFactor,
                                color: colors.darkText,
                              }}>
                              {step.stepTime}
                            </Text>
                          </View>
                        ) : null}
                        <TouchableOpacity
                          style={{ justifyContent: 'center' }}
                          onPress={() => handleDeleteStep(index, routine)}>
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            size={20 * scaleFactor}
                            color="#BF4C41"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: '2%',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      marginHorizontal: '2%',
                      padding: 8,
                      borderRadius: 10,
                      backgroundColor: colors.dark,
                      borderColor: colors.darkShadow,
                      flex: 1,
                      alignItems: 'center',
                      borderBottomWidth: 4
                    }}
                    onPress={() =>
                      showAddStepeModal(routine, routine.get('routineSteps'))
                    }>
                    <Text
                      style={{
                        fontSize: 18 * scaleFactor,
                        fontWeight: 'bold',
                        color: colors.lightText,
                      }}>
                      Tilføj et nyt step
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </AccordionItem>
          ))}
        </View>
        <Modal
          isVisible={isAddStepModalVisible}
          onBackdropPress={() => setStepModalVisible(false)}>
          <View
            style={{
              backgroundColor: colors.light,
              padding: 10,
              borderWidth: 1,
              borderColor: colors.light,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <View>
              <Text style={{ fontSize: 20 * scaleFactor, color: colors.darkText }}>
                Tilføj et navn til dit step
              </Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  fontSize: 16 * scaleFactor,
                  marginVertical: '2%',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 5,
                }}
                onChangeText={text => setStepName(text)}></TextInput>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 20 * scaleFactor,
                  color: colors.darkText,
                }}>
                Vil du tilføje hvor lang tid det tager at fuldføre steppet?
              </Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  fontSize: 16 * scaleFactor,
                  marginVertical: '2%',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 5,
                }}
                onChangeText={text => setStepTime(Number(text))}></TextInput>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.middle,
              padding: 5,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: colors.dark,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onPress={handleNewStepConfirm}>
            <Text style={{ fontSize: 26 * scaleFactor, color: colors.lightText }}>
              Tilføj et nyt step
            </Text>
          </TouchableOpacity>
        </Modal>
        <Modal
          isVisible={isToCalendarModalVisible}
          onBackdropPress={() => setToCalendarModalVisible(false)}>
          <View
            style={{
              backgroundColor: colors.light,
              padding: 10,
              borderWidth: 1,
              borderColor: colors.light,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => setToCalendarModalVisible(false)}>
              <FontAwesomeIcon icon={faCircleXmark} size={30} style={{ alignSelf: 'flex-end', marginBottom: '5%' }} />
            </TouchableOpacity>
            <View>
              <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                <View style={styles.rowView}>
                  <TouchableOpacity
                    style={[
                      styles.buttonSmall,
                      {
                        backgroundColor: colors.middle,
                        borderColor: colors.middle,
                      },
                    ]}
                    onPress={() => setStartTimePickerVisibility(true)}>
                    <Text style={[styles.buttonText, { color: colors.darkText }]}>
                      Start tidspunkt
                    </Text>
                  </TouchableOpacity>
                  <DatePicker
                    mode="time"
                    modal
                    open={isStartTimePickerVisible}
                    date={today}
                    onConfirm={(date) => {
                      setStartTimePickerVisibility(false)
                      handleStartTimeConfirm(date)
                      setEndTimePickerVisibility(true)
                    }}
                    onCancel={() => {
                      setStartTimePickerVisibility(false)
                    }}
                  />
                </View>
                <View style={[styles.rowView, { alignItems: 'center' }]}>
                  <Text
                    style={[
                      styles.text,
                      { fontWeight: 'bold' },
                      { color: colors.darkText },
                    ]}>
                    {routineStartTime}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                <View style={styles.rowView}>
                  <TouchableOpacity
                    style={[
                      styles.buttonSmall,
                      {
                        backgroundColor: colors.middle,
                        borderColor: colors.middle,
                      },
                    ]}
                    onPress={() => setEndTimePickerVisibility(true)}>
                    <Text style={styles.buttonText}>Slut tidspunkt</Text>
                  </TouchableOpacity>
                  <DatePicker
                    mode="time"
                    modal
                    open={isEndTimePickerVisible}
                    date={today}
                    onConfirm={(date) => {
                      setEndTimePickerVisibility(false)
                      handleEndTimeConfirm(date)
                      setDatePickerVisibility(true)
                    }}
                    onCancel={() => {
                      setEndTimePickerVisibility(false)
                    }}
                  />
                </View>
                <View style={[styles.rowView, { alignItems: 'center' }]}>
                  <Text
                    style={[
                      styles.text,
                      { fontWeight: 'bold' },
                      { color: colors.darkText },
                    ]}>
                    {routineEndTime}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                <View style={styles.rowView}>
                  <TouchableOpacity
                    style={[
                      styles.buttonSmall,
                      {
                        backgroundColor: colors.middle,
                        borderColor: colors.middle,
                      },
                    ]}
                    onPress={() => setDatePickerVisibility(true)}>
                    <Text style={styles.buttonText}>Dato</Text>
                  </TouchableOpacity>
                  <DatePicker
                    mode="date"
                    modal
                    open={isDatePickerVisible}
                    date={today}
                    onConfirm={(date) => {
                      setDatePickerVisibility(false)
                      handleDateConfirm(date)
                    }}
                    onCancel={() => {
                      setDatePickerVisibility(false)
                    }}
                  />
                </View>
                <View style={[styles.rowView, { alignItems: 'center' }]}>
                  <Text
                    style={[
                      styles.text,
                      { fontWeight: 'bold' },
                      { color: colors.darkText },
                    ]}>
                    {routineDate}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.dark,
              alignItems: 'center',
              height: '7%',
              justifyContent: 'center',
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onPress={() => moveToCalendar()}>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: colors.darkText }}>
              Tilføj til kalender
            </Text>
          </TouchableOpacity>
        </Modal>
        <Modal
          isVisible={isRoutineModalVisible}
          onBackdropPress={() => setRoutineModalVisible(false)}>
          <View
            style={{
              backgroundColor: colors.light,
              padding: 10,
              borderWidth: 1,
              borderColor: colors.light,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <View>
              <Text style={{ fontSize: 20 * scaleFactor, color: colors.darkText }}>
                Giv din rutine et navn
              </Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  fontSize: 16 * scaleFactor,
                  marginVertical: '2%',
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 10,
                  padding: 5,
                  elevation: 5
                }}
                onChangeText={text => setRoutineName(text)}></TextInput>
              <View style={{ marginVertical: '3%' }}>
                <Text
                  style={{
                    fontSize: 20 * scaleFactor,
                    marginVertical: '1%',
                    color: colors.darkText,
                  }}>
                  Vælg en farve
                </Text>
                <View style={styles.colorOptions}>
                  <TouchableOpacity
                    style={{
                      borderWidth: routineColor === '#FAEDCB' ? 1.5 : 1,
                      borderRadius:
                        routineColor === '#FAEDCB'
                          ? 30 * scaleFactor
                          : 20 * scaleFactor,
                      width:
                        routineColor === '#FAEDCB'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      height:
                        routineColor === '#FAEDCB'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      backgroundColor: '#FAEDCB',
                      borderColor: routineColor === '#FAEDCB'
                        ? 'grey'
                        : '#FAEDCB',
                      elevation: 5,
                      shadowColor: 'black',
                      shadowOpacity: 0.5,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 2,
                    }}
                    onPress={() => handleColorPick('#FAEDCB')}></TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: routineColor === '#C9E4DE' ? 1.5 : 1,
                      borderRadius:
                        routineColor === '#C9E4DE'
                          ? 30 * scaleFactor
                          : 20 * scaleFactor,
                      width:
                        routineColor === '#C9E4DE'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      height:
                        routineColor === '#C9E4DE'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      backgroundColor: '#C9E4DE',
                      borderColor: routineColor === '#C9E4DE'
                        ? 'grey'
                        : '#C9E4DE',
                      elevation: 5,
                      shadowColor: 'grey',
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 1,
                    }}
                    onPress={() => handleColorPick('#C9E4DE')}></TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: routineColor === '#C6DEF1' ? 1.5 : 1,
                      borderRadius:
                        routineColor === '#C6DEF1'
                          ? 30 * scaleFactor
                          : 20 * scaleFactor,
                      width:
                        routineColor === '#C6DEF1'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      height:
                        routineColor === '#C6DEF1'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      backgroundColor: '#C6DEF1',
                      borderColor: routineColor === '#C6DEF1'
                        ? 'grey'
                        : '#C6DEF1',
                      elevation: 5,
                      shadowColor: 'black',
                      shadowOpacity: 0.5,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 2,
                    }}
                    onPress={() => handleColorPick('#C6DEF1')}></TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: routineColor === '#DBCDF0' ? 1.5 : 1,
                      borderRadius:
                        routineColor === '#DBCDF0'
                          ? 30 * scaleFactor
                          : 20 * scaleFactor,
                      width:
                        routineColor === '#DBCDF0'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      height:
                        routineColor === '#DBCDF0'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      backgroundColor: '#DBCDF0',
                      borderColor: routineColor === '#DBCDF0'
                        ? 'grey'
                        : '#DBCDF0',
                      elevation: 5,
                      shadowColor: 'black',
                      shadowOpacity: 0.5,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 2,
                    }}
                    onPress={() => handleColorPick('#DBCDF0')}></TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: routineColor === '#FFADAD' ? 1.5 : 1,
                      borderRadius:
                        routineColor === '#FFADAD'
                          ? 30 * scaleFactor
                          : 20 * scaleFactor,
                      width:
                        routineColor === '#FFADAD'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      height:
                        routineColor === '#FFADAD'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      backgroundColor: '#FFADAD',
                      borderColor: routineColor === '#FFADAD'
                        ? 'grey'
                        : '#FFADAD',
                      elevation: 5,
                      shadowColor: 'black',
                      shadowOpacity: 0.5,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 2,
                    }}
                    onPress={() => handleColorPick('#FFADAD')}></TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: routineColor === '#FFD6A5' ? 1.5 : 1,
                      borderRadius:
                        routineColor === '#FFD6A5'
                          ? 30 * scaleFactor
                          : 20 * scaleFactor,
                      width:
                        routineColor === '#FFD6A5'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      height:
                        routineColor === '#FFD6A5'
                          ? 45 * scaleFactor
                          : 40 * scaleFactor,
                      backgroundColor: '#FFD6A5',
                      borderColor: routineColor === '#FFD6A5'
                        ? 'grey'
                        : '#FFD6A5',
                      elevation: 5,
                      shadowColor: 'black',
                      shadowOpacity: 0.5,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 2,
                    }}
                    onPress={() => handleColorPick('#FFD6A5')}></TouchableOpacity>
                </View>
              </View>
              <View style={{ marginVertical: '1%', flexDirection: 'row' }}>
                <View style={styles.rowView}>
                  <TouchableOpacity
                    onPress={showEmojiModal}
                    style={[
                      styles.buttonSmall,
                      {
                        backgroundColor: colors.middle,
                        borderColor: colors.middleShadow,
                      },
                    ]}>
                    <Text
                      style={{
                        fontSize: 18 * scaleFactor,
                        color: colors.lightText,
                      }}>
                      Emoji
                    </Text>
                  </TouchableOpacity>
                  <Modal
                    visible={emojiModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={hideEmojiModal}>
                    <View style={styles.modalContainer}>
                      <View
                        style={[
                          styles.emojiPickerContainer,
                          { backgroundColor: colors.light },
                        ]}>
                        <EmojiPicker
                          emojis={emojis}
                          recent={recent}
                          loading={false}
                          darkMode={false}
                          perLine={6 * scaleFactor}
                          onSelect={chosenEmoji => {
                            setRoutineEmoji(chosenEmoji.emoji);
                            hideEmojiModal();
                          }}
                          onChangeRecent={setRecent}
                          backgroundColor={colors.light}
                        />
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.modalButton,
                          {
                            backgroundColor: colors.dark,
                            borderColor: colors.dark,
                          },
                        ]}
                        onPress={hideEmojiModal}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 24 * scaleFactor,
                            color: colors.lightText,
                          }}>
                          LUK
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                </View>
                <View style={[styles.rowView, { alignItems: 'center' }]}>
                  <Text
                    style={{ fontSize: 30 * scaleFactor, color: colors.lightText }}>
                    {routineEmoji}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.dark,
              padding: 5,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: colors.darkShadow,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onPress={() => saveRoutine()}>
            <Text style={{ fontSize: 26 * scaleFactor, color: colors.lightText }}>
              Tilføj en ny rutine
            </Text>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    marginTop: '2%',
    borderRadius: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
  emojiPickerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    width: '95%',
    height: '95%',
  },
  buttonSmall: {
    justifyContent: 'center',
    padding: '2%',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'grey',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    marginVertical: '5%',
    borderBottomWidth: 4
  },
  modalButton: {
    backgroundColor: 'lightgrey',
    width: '95%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  plusBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'flex-end',
    padding: 10,
    marginVertical: '5%',
    marginHorizontal: '5%',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    borderBottomWidth: 4
  },
  outerView: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  icons:
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '2%',
  },
  taskView: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: '2%',
    flexDirection: 'row',
    elevation: 5,
    justifyContent: 'space-between',
    width: '80%',
  },
  text: {
    marginVertical: 10,
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    //padding: '2%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '80%'
  },
});

export default MyRoutines;
