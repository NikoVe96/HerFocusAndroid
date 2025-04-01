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
  const [username, setUsername] = useState('');
  const [isAddStepModalVisible, setStepModalVisible] = useState(false);
  const [stepName, setStepName] = useState('');
  const [stepTime, setStepTime] = useState(null);
  const [routineSteps, setRoutineSteps] = useState([]);
  const [routineObject, setRoutineObject] = useState();
  const { colors } = useTheme();
  const [allRoutines, setAllRoutines] = useState([]);
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
  const { ID } = useUser();

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

    Alert.alert('Dit rutine step er blevet fjernet!');
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

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
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
                  style={{
                    height:
                      routine.get('routineSteps').length > 4
                        ? 250 * scaleFactor
                        : null,
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
});

export default MyRoutines;
