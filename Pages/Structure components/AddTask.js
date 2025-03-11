import { View, TouchableOpacity, Text, TextInput, Alert, SafeAreaView, ScrollView, StyleSheet, Modal, Dimensions, Switch } from "react-native";
import React, { useState, useEffect } from 'react';
import Parse from 'parse/react-native';
import EmojiPicker from "rn-emoji-picker"
import { emojis } from "rn-emoji-picker/dist/data"
import { useTheme } from "@react-navigation/native";
import DatePicker from "react-native-date-picker";
import { Picker } from '@react-native-picker/picker';
import { format, addDays, addWeeks, addMonths, isBefore, isEqual } from 'date-fns';

export const AddTask = () => {

  const { colors } = useTheme();
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskStartTime, setStartTime] = useState('');
  const [taskEndTime, setEndTime] = useState('');
  const [username, setUsername] = useState('');
  const [ID, setID] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [taskColor, setTaskColor] = useState('');
  const [recent, setRecent] = useState([]);
  const [emojiModalVisible, setEmojiModalVisible] = useState(false);
  const [emoji, setEmoji] = useState();
  const [description, setDescription] = useState('');
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const today = new Date;
  const [tStart, setTstart] = useState(null);
  const [recurrence, setRecurrence] = useState('none');
  const [interval, setInterval] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isRecurringEnabled, setRecurringDayEnabled] = useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  useEffect(() => {
    async function getCurrentUser() {
      if (username === '') {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser !== null) {
          setUsername(currentUser.getUsername());
          setID(currentUser.id);
        }
      }
    }
    getCurrentUser();
  }, [username]);

  async function newTask(date) {
    try {
      const newTask = new Parse.Object('Task');
      const currentUser = await Parse.User.currentAsync();

      newTask.set('name', taskName);
      newTask.set('date', date);
      newTask.set('startTime', taskStartTime);
      newTask.set('endTime', taskEndTime);
      newTask.set('emoji', emoji);
      newTask.set('user', currentUser);
      newTask.set('color', taskColor);
      newTask.set('type', 'task');
      newTask.set('description', description);
      newTask.set('tStart', tStart);
      // If time, add recurring option
      await newTask.save();
      console.log('Success: task saved')
      clearInput();
      //clearInput();
    } catch (error) {
      console.log('Error saving new task: ', error);
      Alert.alert('Hovsa!',
        'Det ser ud til at du mangler at udfylde enten navn, dato, farve, start eller sluttidspunkt 😉')
    }
  }

  async function saveTask() {
    if (isRecurringEnabled) {
      const recurringDates = generateRecurringDates();
      for (const date of recurringDates) {
        await newTask(date);
      }
      Alert.alert("Dine to-do's er blevet tilføjet til din kalender!");
    } else {
      await newTask(taskDate);
    }
    Alert.alert('En ny to-do er blevet tilføjet til din kalender!');
    clearInput();
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    setTaskDate(formattedDate);
    console.log('Selected date:', formattedDate);
    hideDatePicker();
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleStartTimeConfirm = (date) => {
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (minutes < 10) {
      minutes = '0' + date.getMinutes();
    }

    if (hours < 10) {
      hours = '0' + date.getHours();
    }

    setStartTime(hours
      + ':' + minutes);
    setTstart(date);
    hideStartTimePicker();
    console.log('Selected time:', hours + ':' + minutes);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
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

    setEndTime(hours
      + ':' + minutes);
    console.log('Selected time:', hours + ':' + minutes);

    hideEndTimePicker();
  };

  function clearInput() {
    setTaskName('');
    setStartTime('');
    setEndTime('');
    setTaskDate('');
    setEmoji();
    setTaskColor('');
    setDescription('');
    setInterval(1);
    setStartDate();
    setEndDate();
    setRecurringDayEnabled(false);
  }

  function showEmojiModal() {
    setEmojiModalVisible(true);
  }

  function hideEmojiModal() {
    setEmojiModalVisible(false);
  }

  function handleColorPick(color) {
    if (color == taskColor) {
      setTaskColor('');
    } else {
      setTaskColor(color);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ alignItems: 'center', padding: 10 }}>
          <Text style={{ fontSize: 24, color: colors.text, marginTop: 15 }}>
            {' '}
            Tilføj en ny to-do{' '}
          </Text>
          <View
            style={[
              styles.border,
              { backgroundColor: colors.border, borderColor: colors.border },
            ]}></View>
        </View>
        <View
          style={{
            alignContent: 'center',
            paddingHorizontal: 16,
          }}>
          <View>
            <Text style={[styles.text, { color: colors.text }]}>
              Hvad skal din to-do hedde?
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setTaskName(text)}
              value={taskName}
            />
          </View>
          <View>
            <Text style={[styles.text, { color: colors.text }]}>
              Vælg en farve
            </Text>
            <View style={styles.colorOptions}>
              <TouchableOpacity
                style={{
                  borderWidth: taskColor === '#FAEDCB' ? 1.5 : 1,
                  borderRadius:
                    taskColor === '#FAEDCB'
                      ? 30 * scaleFactor
                      : 20 * scaleFactor,
                  width:
                    taskColor === '#FAEDCB'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  height:
                    taskColor === '#FAEDCB'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  backgroundColor: '#FAEDCB',
                  borderColor: taskColor === '#FAEDCB'
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
                  borderWidth: taskColor === '#C9E4DE' ? 1.5 : 1,
                  borderRadius:
                    taskColor === '#C9E4DE'
                      ? 30 * scaleFactor
                      : 20 * scaleFactor,
                  width:
                    taskColor === '#C9E4DE'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  height:
                    taskColor === '#C9E4DE'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  backgroundColor: '#C9E4DE',
                  borderColor: taskColor === '#C9E4DE'
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
                  borderWidth: taskColor === '#C6DEF1' ? 1.5 : 1,
                  borderRadius:
                    taskColor === '#C6DEF1'
                      ? 30 * scaleFactor
                      : 20 * scaleFactor,
                  width:
                    taskColor === '#C6DEF1'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  height:
                    taskColor === '#C6DEF1'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  backgroundColor: '#C6DEF1',
                  borderColor: taskColor === '#C6DEF1'
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
                  borderWidth: taskColor === '#DBCDF0' ? 1.5 : 1,
                  borderRadius:
                    taskColor === '#DBCDF0'
                      ? 30 * scaleFactor
                      : 20 * scaleFactor,
                  width:
                    taskColor === '#DBCDF0'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  height:
                    taskColor === '#DBCDF0'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  backgroundColor: '#DBCDF0',
                  borderColor: taskColor === '#DBCDF0'
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
                  borderWidth: taskColor === '#FFADAD' ? 1.5 : 1,
                  borderRadius:
                    taskColor === '#FFADAD'
                      ? 30 * scaleFactor
                      : 20 * scaleFactor,
                  width:
                    taskColor === '#FFADAD'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  height:
                    taskColor === '#FFADAD'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  backgroundColor: '#FFADAD',
                  borderColor: taskColor === '#FFADAD'
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
                  borderWidth: taskColor === '#FFD6A5' ? 1.5 : 1,
                  borderRadius:
                    taskColor === '#FFD6A5'
                      ? 30 * scaleFactor
                      : 20 * scaleFactor,
                  width:
                    taskColor === '#FFD6A5'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  height:
                    taskColor === '#FFD6A5'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  backgroundColor: '#FFD6A5',
                  borderColor: taskColor === '#FFD6A5'
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: '2%'
            }}>
            <Text
              style={{ flex: 6, fontSize: 18 * scaleFactor, color: colors.text }}>
              Tilbagevendene begivenhed
            </Text>
            <Switch
              trackColor={{ false: colors.mainButton, true: colors.subButton }}
              thumbColor={isRecurringEnabled ? colors.border : colors.background}
              ios_backgroundColor={colors.mainButton}
              onValueChange={() => setRecurringDayEnabled(previousState => !previousState)}
              value={isRecurringEnabled}
            />
          </View>
          <View
            style={[
              styles.border,
              { backgroundColor: colors.border, borderColor: colors.border, marginTop: '5%' },
            ]}></View>
          <View style={{ marginTop: '10%', flexDirection: 'row' }}>
            <View style={styles.rowView}>
              <TouchableOpacity
                onPress={showEmojiModal}
                style={[
                  styles.buttonSmall,
                  {
                    backgroundColor: colors.subButton,
                    borderColor: colors.subButton,
                  },
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    { fontSize: 20 * scaleFactor },
                    { color: colors.text },
                  ]}>
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
                      { backgroundColor: colors.background },
                    ]}>
                    <EmojiPicker
                      emojis={emojis}
                      recent={recent}
                      loading={false}
                      darkMode={false}
                      perLine={6}
                      onSelect={chosenEmoji => {
                        console.log(chosenEmoji);
                        setEmoji(chosenEmoji.emoji);
                        hideEmojiModal();
                      }}
                      onChangeRecent={setRecent}
                      backgroundColor={colors.background}
                    />
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      {
                        backgroundColor: colors.mainButton,
                        borderColor: colors.mainButton,
                      },
                    ]}
                    onPress={hideEmojiModal}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24 }}>LUK</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
            <View style={[styles.rowView, { alignItems: 'center', }]}>
              <Text style={{ fontSize: 26, color: colors.text }}> {emoji}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 2 }}>
            <View style={styles.rowView}>
              <TouchableOpacity
                style={[
                  styles.buttonSmall,
                  {
                    backgroundColor: colors.subButton,
                    borderColor: colors.subButton,
                  },
                ]}
                onPress={showStartTimePicker}>
                <Text style={[styles.buttonText, { color: colors.text }]}>
                  Start tidspunkt
                </Text>
              </TouchableOpacity>
              <DatePicker
                mode="time"
                modal
                open={isStartTimePickerVisible}
                date={today}
                title={'Start tid'}
                confirmText="Bekræft"
                cancelText="Annuler"
                buttonColor={colors.border}
                dividerColor={colors.border}
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
              <Text style={[styles.text, { fontWeight: 'bold', color: colors.text }]}>
                {taskStartTime == '' ? '' : `${taskStartTime}`}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 2 }}>
            <View style={styles.rowView}>
              <TouchableOpacity
                style={[
                  styles.buttonSmall,
                  {
                    backgroundColor: colors.subButton,
                    borderColor: colors.subButton,
                  },
                ]}
                onPress={showEndTimePicker}>
                <Text style={[styles.buttonText, { color: colors.text }]}>
                  Slut tidspunkt
                </Text>
              </TouchableOpacity>
              <DatePicker
                mode="time"
                modal
                open={isEndTimePickerVisible}
                date={today}
                title={'Slut tid'}
                confirmText="Bekræft"
                cancelText="Annuler"
                buttonColor={colors.border}
                dividerColor={colors.border}
                onConfirm={(date) => {
                  setEndTimePickerVisibility(false)
                  handleEndTimeConfirm(date)
                  //setDatePickerVisibility(true)
                }}
                onCancel={() => {
                  setEndTimePickerVisibility(false)
                }}
              />
            </View>
            <View style={[styles.rowView, { alignItems: 'center' }]}>
              <Text style={[styles.text, { fontWeight: 'bold', color: colors.text }]}>
                {taskEndTime == '' ? '' : `${taskEndTime}`}
              </Text>
            </View>
          </View>

          {isRecurringEnabled ?
            <View>
              <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
                <View style={[styles.rowView, { alignItems: 'center', flex: 1, justifyContent: 'center' }]}>
                  <Text style={styles.text}>Gentages hver: </Text>
                </View>
                <View style={[styles.rowView, { alignItems: 'center', alignSelf: 'center', flex: 0.5 }]}>
                  <TextInput style={[styles.textInput, {}]} keyboardType="numeric" onChangeText={(interval) => setInterval(parseInt(interval))} />
                </View>
                <View style={[styles.rowView, { flex: 1, marginHorizontal: '2%' }]}>
                  <Picker selectedValue={recurrence} onValueChange={(recurrence) => setRecurrence(recurrence)} style={[
                    styles.buttonSmall,
                    {
                      backgroundColor: colors.subButton,
                      borderColor: colors.subButton,
                    },
                  ]}>
                    <Picker.Item label="Dag" value="daily" />
                    <Picker.Item label="Uge" value="weekly" />
                    <Picker.Item label="Måned" value="monthly" />
                  </Picker>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
                <View style={styles.rowView}>
                  <TouchableOpacity
                    style={[
                      styles.buttonSmall,
                      {
                        backgroundColor: colors.subButton,
                        borderColor: colors.subButton,
                      },
                    ]}
                    onPress={() => setStartDatePickerVisibility(true)}>
                    <Text
                      style={[
                        styles.buttonText,
                        { fontSize: 20 * scaleFactor },
                        { color: colors.text },
                      ]}>
                      Start dato
                    </Text>
                  </TouchableOpacity>
                  <DatePicker
                    mode="date"
                    modal
                    open={isStartDatePickerVisible}
                    date={today}
                    onConfirm={(date) => {
                      setStartDate(date)
                      setStartDatePickerVisibility(false)
                      setEndDatePickerVisibility(true)
                    }}
                    onCancel={() => {
                      setStartDatePickerVisibility(false)
                    }}
                  />
                </View>
                <View style={[styles.rowView, { alignItems: 'center' }]}>
                  <Text
                    style={[
                      styles.text,
                      { fontWeight: 'bold', fontSize: 18 * scaleFactor },
                      { color: colors.text },
                    ]}>
                    {startDate == null ? null : dateDisplay(startDate)}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
                <View style={styles.rowView}>
                  <TouchableOpacity
                    style={[
                      styles.buttonSmall,
                      {
                        backgroundColor: colors.subButton,
                        borderColor: colors.subButton,
                      },
                    ]}
                    onPress={() => setEndDatePickerVisibility(true)}>
                    <Text
                      style={[
                        styles.buttonText,
                        { fontSize: 20 * scaleFactor },
                        { color: colors.text },
                      ]}>
                      Slut dato
                    </Text>
                  </TouchableOpacity>
                  <DatePicker
                    mode="date"
                    modal
                    open={isEndDatePickerVisible}
                    date={today}
                    onConfirm={(date) => {
                      setEndDate(date)
                      setEndDatePickerVisibility(false)
                    }}
                    onCancel={() => {
                      setEndDatePickerVisibility(false)
                    }}
                  />
                </View>
                <View style={[styles.rowView, { alignItems: 'center' }]}>
                  <Text
                    style={[
                      styles.text,
                      { fontWeight: 'bold', fontSize: 18 * scaleFactor },
                      { color: colors.text },
                    ]}>
                    {endDate == null ? null : dateDisplay(endDate)}
                  </Text>
                </View>
              </View>
            </View>
            : <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={[
                    styles.buttonSmall,
                    {
                      backgroundColor: colors.subButton,
                      borderColor: colors.subButton,
                    },
                  ]}
                  onPress={() => showDatePicker}>
                  <Text
                    style={[
                      styles.buttonText,
                      { fontSize: 20 * scaleFactor },
                      { color: colors.text },
                    ]}>
                    Dato
                  </Text>
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
                    { fontWeight: 'bold', fontSize: 18 * scaleFactor },
                    { color: colors.text },
                  ]}>
                  {`${taskDate}`}
                </Text>
              </View>
            </View>
          }

        </View>
        <View
          style={{
            alignContent: 'center',
            paddingHorizontal: 16,
          }}>
          <Text style={[styles.text, { color: colors.text }]}>
            Tilføj en beskrivelse
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setDescription(text)}
            value={description}
            multiline={true}
            numberOfLines={8}
            textAlignVertical={'top'}></TextInput>
        </View>
        <TouchableOpacity
          style={[
            styles.Button,
            {
              backgroundColor: colors.mainButton,
              borderColor: colors.mainButton,
            },
          ]}
          onPress={() => saveTask()}>
          <Text style={{ color: colors.text, fontSize: 18 * scaleFactor }}>
            Tilføj til kalender
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Button: {
    borderRadius: 10,
    padding: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: '4%',
    paddingHorizontal: '3%',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  buttonSmall: {
    justifyContent: 'center',
    padding: '2%',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    marginBottom: 8,
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
  text: {
    marginVertical: 10,
    fontSize: 18,
  },
  textInput: {
    padding: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    borderColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  border: {
    borderWidth: 1,
    width: 300,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowView: {
    flex: 1,
  },
});

export default AddTask;