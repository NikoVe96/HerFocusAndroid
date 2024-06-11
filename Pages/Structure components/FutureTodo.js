import { useTheme } from '@react-navigation/native';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Alert,
  Dimensions,
  TextInput
} from 'react-native';
import { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import AddTask from './AddTask';
import Parse from 'parse/react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import BottomNavigation from '../../Navigation/BottomNav';
import EmojiPicker from "rn-emoji-picker"
import DatePicker from "react-native-date-picker";
import { emojis } from "rn-emoji-picker/dist/data"

export const FutureTodo = ({ navigation }) => {
  const today = new Date;
  const currentDate = today.toISOString().slice(0, 10);
  const { colors } = useTheme();
  const [toDoList, setToDoList] = useState([]);
  const [toDoDate, setToDoDate] = useState('');
  const [todoStartTime, setTodoStartTime] = useState('');
  const [todoEndTime, setTodoEndTime] = useState('');
  const [todo, setTodo] = useState('');
  const [isToDoModalVisible, setToDoModalVisible] = useState(false);
  const [isNotesModalVisible, setNotesModalVisible] = useState(false);
  const [isToCalendarModalVisible, setToCalendarModalVisible] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskStartTime, setStartTime] = useState('');
  const [taskEndTime, setEndTime] = useState('');
  const [username, setUsername] = useState('');
  const [ID, setID] = useState('');
  const [taskColor, setTaskColor] = useState('');
  const [recent, setRecent] = useState([]);
  const [emojiModalVisible, setEmojiModalVisible] = useState(false);
  const [emoji, setEmoji] = useState();
  const [description, setDescription] = useState('');

  useEffect(() => {
    ToDoQuery();
  }, []);

  function handleMenuClick(page) {
    setPage(page);
  }

  function toggleMenu() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  const showToDoModal = () => {
    setToDoModalVisible(true);
  };

  const hideToDoModal = () => {
    setToDoModalVisible(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  function clearInput() {
    setTaskName('');
    setStartTime('');
    setEndTime('');
    setTaskDate('');
    setEmoji();
    setTaskColor('');
    setDescription('');
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

  async function ToDoQuery() {
    const currentUser = await Parse.User.currentAsync();

    let todoQuery = new Parse.Query('Task');
    todoQuery.equalTo('user', currentUser);
    todoQuery.equalTo('futureTask', true);
    const todoResult = await todoQuery.find();
    console.log('todos: ' + todoResult);

    setToDoList(todoResult);
  }

  const handleDateConfirm = date => {
    const formattedDate = date.toISOString().slice(0, 10);
    setToDoDate(formattedDate);
    console.log('Selected date:', formattedDate);
    setDatePickerVisibility(false);
  };

  const toCalendarModal = task => {
    console.log(task);
    setTodo(task);
    setToCalendarModalVisible(true);
  };

  async function moveToCalendar() {
    todo.set('startTime', todoStartTime);
    todo.set('endTime', todoEndTime);
    todo.set('date', toDoDate);
    todo.set('futureTask', false);
    await todo.save();

    ToDoQuery();

    setToCalendarModalVisible(false);
    Alert.alert(todo.get('name') + ' er blevet rykket til din kalender!');
  }

  const handleStartTimeConfirm = date => {
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (minutes < 10) {
      minutes = '0' + date.getMinutes();
    }

    if (hours < 10) {
      hours = '0' + date.getHours();
    }

    setTodoStartTime(hours + ':' + minutes);
    setStartTimePickerVisibility(false);
  };

  const handleEndTimeConfirm = date => {
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (minutes < 10) {
      minutes = '0' + date.getMinutes();
    }

    if (hours < 10) {
      hours = '0' + date.getHours();
    }

    setTodoEndTime(hours + ':' + minutes);

    setEndTimePickerVisibility(false);
  };

  async function newTask() {
    try {
      const newTask = new Parse.Object('Task');
      const currentUser = await Parse.User.currentAsync();

      newTask.set('name', taskName);
      newTask.set('emoji', emoji);
      newTask.set('user', currentUser);
      newTask.set('color', taskColor);
      newTask.set('type', 'task');
      newTask.set('description', description);
      // If time, add recurring option
      await newTask.save();
      console.log('Success: task saved')
      clearInput();
      Alert.alert('En ny to-do er blevet oprettet!');
      //clearInput();
    } catch (error) {
      console.log('Error saving new task: ', error);
      Alert.alert('Hovsa!',
        'Det ser ud til at du mangler at udfylde enten navn eller farve 😉')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontSize: 30 * scaleFactor },
          ]}>
          Fremtidige to-dos
        </Text>
        {toDoList.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row' }}>
            <BouncyCheckbox
              size={30}
              fillColor={colors.mainButton}
              unfillColor="#FFFFFF"
              iconStyle={{ borderColor: 'black' }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{ fontFamily: 'JosefinSans-Regular' }}
              onPress={isChecked => { }}
              style={{ marginHorizontal: 10, flex: 0.5 }}
            />
            <TouchableOpacity
              style={{
                flex: 7,
                alignItems: 'center',
                padding: 2,
                borderWidth: 1,
                padding: 5,
                marginVertical: 5,
                marginHorizontal: 15,
                flexDirection: 'row',
                backgroundColor: item.get('color'),
                borderRadius: 10,
                borderColor: item.get('color'),
                elevation: 10,
              }}
              onLongPress={() => toCalendarModal(item)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginRight: 10 }}>
                  {item.get('emoji')}
                </Text>
                <Text style={{ marginHorizontal: 1, fontSize: 14 }}>
                  {item.get('startTime')} - {item.get('endTime')}
                </Text>
              </View>
              <Text style={{ fontSize: 24, marginHorizontal: 5 }}>|</Text>
              <Text style={{ fontSize: 18 }}>{item.get('name')}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={[styles.addTodo, { backgroundColor: colors.mainButton }]}
          onPress={() => setToDoModalVisible(true)}>
          <Text style={{ fontSize: 18 }}>Tilføj en ny to-do</Text>
        </TouchableOpacity>

        <Modal
          isVisible={isToDoModalVisible}
          onBackdropPress={() => setToDoModalVisible(false)}>
          <View
            style={{
              backgroundColor: colors.background,
              padding: 10,
              borderWidth: 1,
              borderColor: colors.background,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              height: 500
            }}>
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
                      borderRadius: taskColor === '#FAEDCB' ? 30 : 20,
                      width: taskColor === '#FAEDCB' ? 45 : 40,
                      height: taskColor === '#FAEDCB' ? 45 : 40,
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
                      borderWidth: taskColor === '#C9E4DE' ? 1.5 : 1,
                      borderRadius: taskColor === '#C9E4DE' ? 30 : 20,
                      width: taskColor === '#C9E4DE' ? 45 : 40,
                      height: taskColor === '#C9E4DE' ? 45 : 40,
                      backgroundColor: '#C9E4DE',
                      borderColor: '#C9E4DE',
                      elevation: 5,
                      shadowColor: 'black',
                      shadowOpacity: 0.5,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 2,
                    }}
                    onPress={() => handleColorPick('#C9E4DE')}></TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: taskColor === '#C6DEF1' ? 1.5 : 1,
                      borderRadius: taskColor === '#C6DEF1' ? 30 : 20,
                      width: taskColor === '#C6DEF1' ? 45 : 40,
                      height: taskColor === '#C6DEF1' ? 45 : 40,
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
                      borderWidth: taskColor === '#DBCDF0' ? 1.5 : 1,
                      borderRadius: taskColor === '#DBCDF0' ? 30 : 20,
                      width: taskColor === '#DBCDF0' ? 45 : 40,
                      height: taskColor === '#DBCDF0' ? 45 : 40,
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
                      borderWidth: taskColor === '#FFADAD' ? 1.5 : 1,
                      borderRadius: taskColor === '#FFADAD' ? 30 : 20,
                      width: taskColor === '#FFADAD' ? 45 : 40,
                      height: taskColor === '#FFADAD' ? 45 : 40,
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
                      borderWidth: taskColor === '#FFD6A5' ? 1.5 : 1,
                      borderRadius: taskColor === '#FFD6A5' ? 30 : 20,
                      width: taskColor === '#FFD6A5' ? 45 : 40,
                      height: taskColor === '#FFD6A5' ? 45 : 40,
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
                      setDatePickerVisibility(true)
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
                    onPress={showDatePicker}>
                    <Text style={[styles.buttonText, { color: colors.text }]}>
                      Dato
                    </Text>
                  </TouchableOpacity>
                  <DatePicker
                    mode="date"
                    modal
                    open={isDatePickerVisible}
                    date={today}
                    title={'Dato'}
                    confirmText="Bekræft"
                    cancelText="Annuler"
                    buttonColor={colors.border}
                    dividerColor={colors.border}
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
                  <Text style={[styles.text, { fontWeight: 'bold', color: colors.text }]}>
                    {`${taskDate}`}
                  </Text>
                </View>
              </View>
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
              onPress={newTask}>
              <Text style={{ color: colors.text, fontSize: 18 * scaleFactor }}>
                Tilføj til kalender
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.border,
              alignItems: 'center',
              height: '7%',
              justifyContent: 'center',
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onPress={() => setToDoModalVisible(false)}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              LUK
            </Text>
          </TouchableOpacity>
        </Modal>

        <Modal
          isVisible={isToCalendarModalVisible}
          onBackdropPress={() => setToCalendarModalVisible(false)}>
          <View
            style={{
              backgroundColor: colors.background,
              padding: 10,
              borderWidth: 1,
              borderColor: colors.background,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <View>
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
                    onPress={() => setStartTimePickerVisibility(true)}>
                    <Text style={styles.buttonText}>Start tidspunkt</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={date => handleStartTimeConfirm(date)}
                    onCancel={() => setStartTimePickerVisibility(false)}
                  />
                </View>
                <View style={[styles.rowView, { alignItems: 'center' }]}>
                  <Text style={[styles.text, { fontWeight: 'bold' }]}>
                    {todoStartTime}
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
                    onPress={() => setEndTimePickerVisibility(true)}>
                    <Text style={styles.buttonText}>Slut tidspunkt</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isEndTimePickerVisible}
                    mode="time"
                    onConfirm={date => handleEndTimeConfirm(date)}
                    onCancel={() => setEndTimePickerVisibility(false)}
                  />
                </View>
                <View style={[styles.rowView, { alignItems: 'center' }]}>
                  <Text style={[styles.text, { fontWeight: 'bold' }]}>
                    {todoEndTime}
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
                    onPress={() => setDatePickerVisibility(true)}>
                    <Text style={styles.buttonText}>Dato</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={date => handleDateConfirm(date)}
                    onCancel={() => setDatePickerVisibility(false)}
                  />
                </View>
                <View style={[styles.rowView, { alignItems: 'center' }]}>
                  <Text style={[styles.text, { fontWeight: 'bold' }]}>
                    {toDoDate}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.buttonSmall,
                  {
                    backgroundColor: colors.subButton,
                    borderColor: colors.subButton,
                  },
                ]}
                onPress={() => moveToCalendar()}>
                <Text style={styles.buttonText}>Tilføj til kalender</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.border,
              alignItems: 'center',
              height: '7%',
              justifyContent: 'center',
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onPress={() => setToCalendarModalVisible(false)}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              LUK
            </Text>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 35,
  },
  rowView: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonSmall: {
    justifyContent: 'center',
    padding: 5,
    height: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  seperator: {
    width: 250,
    height: 1,
    marginBottom: 5,
    marginTop: 5,
  },
  addTodo: {
    width: '50%',
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    marginVertical: '20%',
    alignSelf: 'center',
    alignItems: 'center'
  },
});

export default FutureTodo;
