import { useTheme } from '@react-navigation/native';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import AddTask from './AddTask';
import Parse from 'parse/react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import BottomNavigation from '../../Navigation/BottomNav';

export const FutureTodo = ({ navigation }) => {
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
            <AddTask />
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
