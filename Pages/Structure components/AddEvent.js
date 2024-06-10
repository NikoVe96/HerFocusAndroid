import { View, TouchableOpacity, Image, Text, TextInput, Button, Alert, List, SafeAreaView, ScrollView, StyleSheet, Modal, Switch, Dimensions } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlusSquare, faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import EmojiPicker, { emojiFromUtf16 } from "rn-emoji-picker"
import { emojis } from "rn-emoji-picker/dist/data"
import { useTheme } from "@react-navigation/native";
import BottomNavigation from '../../Navigation/BottomNav';
import DateTimePicker from "react-native-modal-datetime-picker";
import DatePicker from "react-native-date-picker";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/'


export const AddEvent = () => {

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventStartTime, setStartTime] = useState('');
  const [eventEndTime, setEndTime] = useState('');
  const [username, setUsername] = useState('');
  const [ID, setID] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [recent, setRecent] = useState([]);
  const [emojiModalVisible, setEmojiModalVisible] = useState(false);
  const [emoji, setEmoji] = useState();
  const [eventColor, setEventColor] = useState('');
  const { colors } = useTheme();
  const [isAllDayEnabled, setIsAllDayEnabled] = useState(false);
  const [dayEvent, setDayEvent] = useState(false);
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const [description, setDescription] = useState('');
  const today = new Date;


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

  async function newEvent() {
    try {
      const newEvent = new Parse.Object('Events');
      const currentUser = await Parse.User.currentAsync();

      newEvent.set('name', eventName);
      newEvent.set('date', eventDate);
      newEvent.set('startTime', eventStartTime);
      newEvent.set('endTime', eventEndTime);
      newEvent.set('emoji', emoji);
      newEvent.set('user', currentUser);
      newEvent.set('color', eventColor);
      newEvent.set('type', 'event');
      newEvent.set('allDay', dayEvent);
      newEvent.set('description', description);
      // If time, add recurring option
      await newEvent.save();
      console.log('Success: event saved')
      Alert.alert('En ny begivenhed er blevet tilføjet til din kalender!')
      clearInput();
    } catch (error) {
      console.log('Error saving new event: ', error);
      Alert.alert('Hovsa!',
        'Det ser ud til at du har glemt at udfylde enten navn, farve, dato, start eller slut tidspunkt 😉')
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    setEventDate(formattedDate);
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
    hideStartTimePicker();
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
    hideEndTimePicker();
  };

  function clearInput() {
    setEventName('');
    setStartTime(null);
    setEndTime(null);
    setEventDate('');
    setEmoji('');
    setEventColor('');
    setDescription('');
    setDayEvent(false);
    setIsAllDayEnabled(false);
  }

  function showEmojiModal() {
    setEmojiModalVisible(true);
  }

  function hideEmojiModal() {
    setEmojiModalVisible(false);
  }

  function handleColorPick(color) {
    if (color == eventColor) {
      setEventColor('');
    } else {
      setEventColor(color);
    }
  }

  function allDayEvent() {
    setDayEvent(true);
    setIsAllDayEnabled(previousState => !previousState);
    setStartTime('00:00');
    setEndTime('00:00');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ alignItems: 'center', padding: '2%' }}>
          <Text
            style={{
              fontSize: 24 * scaleFactor,
              color: colors.text,
              marginTop: 15,
            }}>
            {' '}
            Tilføj en ny begivenhed
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
            paddingHorizontal: '5%',
          }}>
          <View>
            <Text
              style={[
                styles.text,
                { fontSize: 18 * scaleFactor },
                { color: colors.text },
              ]}>
              Hvad skal din begivenhed hedde?
            </Text>
            <TextInput
              style={[styles.textInput, { fontSize: 16 * scaleFactor }]}
              onChangeText={text => setEventName(text)}
              value={eventName}
            />
          </View>
          <View style={{ marginTop: '2%', marginBottom: '5%' }}>
            <Text
              style={[
                styles.text,
                { fontSize: 18 * scaleFactor },
                { color: colors.text },
              ]}>
              Vælg en farve
            </Text>
            <View style={styles.colorOptions}>
              <TouchableOpacity
                style={{
                  borderWidth: eventColor === '#FAEDCB' ? 1.5 : 1,
                  borderRadius:
                    eventColor === '#FAEDCB'
                      ? 30 * scaleFactor
                      : 20 * scaleFactor,
                  width:
                    eventColor === '#FAEDCB'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  height:
                    eventColor === '#FAEDCB'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  backgroundColor: '#FAEDCB',
                  borderColor: '#FAEDCB',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 2,
                }}
                onPress={() => handleColorPick('#FAEDCB')}></TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: eventColor === '#C9E4DE' ? 1.5 : 1,
                  borderRadius:
                    eventColor === '#C9E4DE'
                      ? 30 * scaleFactor
                      : 20 * scaleFactor,
                  width:
                    eventColor === '#C9E4DE'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  height:
                    eventColor === '#C9E4DE'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  backgroundColor: '#C9E4DE',
                  borderColor: '#C9E4DE',
                  elevation: 5,
                  shadowColor: 'grey',
                  shadowOffset: { width: 1, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 1,
                }}
                onPress={() => handleColorPick('#C9E4DE')}></TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: eventColor === '#C6DEF1' ? 1.5 : 1,
                  borderRadius:
                    eventColor === '#C6DEF1'
                      ? 30 * scaleFactor
                      : 20 * scaleFactor,
                  width:
                    eventColor === '#C6DEF1'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  height:
                    eventColor === '#C6DEF1'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  backgroundColor: '#C6DEF1',
                  borderColor: '#C6DEF1',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 2,
                }}
                onPress={() => handleColorPick('#C6DEF1')}></TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: eventColor === '#DBCDF0' ? 1.5 : 1,
                  borderRadius:
                    eventColor === '#DBCDF0'
                      ? 30 * scaleFactor
                      : 20 * scaleFactor,
                  width:
                    eventColor === '#DBCDF0'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  height:
                    eventColor === '#DBCDF0'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  backgroundColor: '#DBCDF0',
                  borderColor: '#DBCDF0',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 2,
                }}
                onPress={() => handleColorPick('#DBCDF0')}></TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: eventColor === '#FFADAD' ? 1.5 : 1,
                  borderRadius:
                    eventColor === '#FFADAD'
                      ? 30 * scaleFactor
                      : 20 * scaleFactor,
                  width:
                    eventColor === '#FFADAD'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  height:
                    eventColor === '#FFADAD'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  backgroundColor: '#FFADAD',
                  borderColor: '#FFADAD',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOpacity: 0.5,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 2,
                }}
                onPress={() => handleColorPick('#FFADAD')}></TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: eventColor === '#FFD6A5' ? 1.5 : 1,
                  borderRadius:
                    eventColor === '#FFD6A5'
                      ? 30 * scaleFactor
                      : 20 * scaleFactor,
                  width:
                    eventColor === '#FFD6A5'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  height:
                    eventColor === '#FFD6A5'
                      ? 45 * scaleFactor
                      : 40 * scaleFactor,
                  backgroundColor: '#FFD6A5',
                  borderColor: '#FFD6A5',
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
            }}>
            <Text
              style={{ flex: 6, fontSize: 18 * scaleFactor, color: colors.text }}>
              Hele dagen
            </Text>
            <Switch
              trackColor={{ false: colors.mainButton, true: colors.subButton }}
              thumbColor={isAllDayEnabled ? colors.border : colors.background}
              ios_backgroundColor={colors.mainButton}
              onValueChange={() => allDayEvent()}
              value={isAllDayEnabled}
            />
          </View>
          <View style={{ marginVertical: '4%', flexDirection: 'row' }}>
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
                      perLine={6 * scaleFactor}
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
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 24 * scaleFactor,
                        color: colors.text,
                      }}>
                      LUK
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
            <View style={[styles.rowView, { alignItems: 'center' }]}>
              <Text style={{ fontSize: 26 * scaleFactor, color: colors.text }}>
                {' '}
                {emoji}
              </Text>
            </View>
          </View>
          {isAllDayEnabled ? (
            <Text></Text>
          ) : (
            <View>
              <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
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
                    <Text
                      style={[
                        styles.buttonText,
                        { fontSize: 20 * scaleFactor },
                        { color: colors.text },
                      ]}>
                      Starttidspunkt
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
                      { fontWeight: 'bold', fontSize: 18 * scaleFactor },
                      { color: colors.text },
                    ]}>
                    {eventStartTime === null ? '' : `${eventStartTime}`}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
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
                    <Text
                      style={[
                        styles.buttonText,
                        { fontSize: 20 * scaleFactor },
                        { color: colors.text },
                      ]}>
                      Slut tidspunkt
                    </Text>
                  </TouchableOpacity>
                  <DatePicker
                    mode="time"
                    modal
                    open={isEndTimePickerVisible}
                    date={today}
                    onConfirm={(date) => {
                      setEndTimePickerVisibility(false)
                      handleEndTimeConfirm(date)
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
                      { fontWeight: 'bold', fontSize: 18 * scaleFactor },
                      { color: colors.text },
                    ]}>
                    {eventEndTime === null ? '' : `${eventEndTime}`}
                  </Text>
                </View>
              </View>
            </View>
          )}

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
                onPress={showDatePicker}>
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
                {`${eventDate}`}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignContent: 'center',
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
        </View>
        <TouchableOpacity
          style={[
            styles.Button,
            {
              backgroundColor: colors.mainButton,
              borderColor: colors.mainButton,
            },
          ]}
          onPress={newEvent}>
          <Text
            style={{
              fontSize: 18 * scaleFactor,
              color: colors.text,
            }}>
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
  },
});

export default AddEvent;