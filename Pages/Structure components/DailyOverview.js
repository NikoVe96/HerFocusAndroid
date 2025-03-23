import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, Text, View, Dimensions, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFaceTired, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import Parse from 'parse/react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Swiper from 'react-native-swiper';
import { useTheme } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from "react-native-modal";
import { useFocusEffect } from '@react-navigation/native';

export const DailyOverview = () => {
  const today = new Date;
  const currentDate = today.toISOString().slice(0, 10);
  const { width, height } = Dimensions.get('window');
  const [username, setUsername] = useState('');
  const [taskProgress, setTaskProgress] = useState(0);
  const [ID, setID] = useState('');
  const [remainingTasksArray, setRemainingTasks] = useState([]);
  const [completedTasksArray, setCompletedTasks] = useState([]);
  const [checked, setChecked] = useState(false);
  const { colors } = useTheme();
  const [wallTask, setWallTask] = useState();
  const [isWallModalVisible, setWallModalVisible] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [todoTime, setTodoTime] = useState(0);
  const [openTodoTime, setOpenTodoTime] = useState(false);
  const scaleFactor = Math.min(width / 375, height / 667);
  const todoTimes = [
    { label: '1 time', value: 1 },
    { label: '2 timer', value: 2 },
    { label: '3 timer', value: 3 },
    { label: '4 timer', value: 4 },
  ];

  useFocusEffect(
    useCallback(() => {
      remainingTasks();
      updateTaskProgress();
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
        }
      }
    }
    getCurrentUser();
    console.log(remainingTasks)
  }, []);

  const taskCompleted = async function (task) {
    task.set('completed', true);
    await task.save();
    updateTaskProgress();
    setChecked(false);
  }

  const showWallModal = (task) => {
    setWallTask(task)
    setWallModalVisible(true);
  }

  const futureTodo = async function () {
    console.log('Wall task: ' + wallTask);
    /*const currentUser = await Parse.User.currentAsync();
    let notebook = new Parse.Query('Notebook');
    notebook.equalTo('user', currentUser);
    const notebookResult = await notebook.first();


    let newTodoList = notebookResult.get('todo');
    const taskExists = newTodoList.some(item => item.id === wallTask.id);
    if (!taskExists) {
        newTodoList.push(wallTask);
        console.log('New list: ' + newTodoList);
        notebookResult.set('todo', newTodoList);
        await notebookResult.save();
*/
    wallTask.set('futureTask', true);
    await wallTask.save();
    updateTaskProgress();

    setWallModalVisible(false);
    Alert.alert(wallTask.get('name') + ' er nu blevet flyttet til fremtidige to-dos!');
  }

  const taskPercentage = async function (completedTasks, remainingTasks) {
    const totalTasks = remainingTasks.length + completedTasks.length;
    const completedPercentage = totalTasks > 0 ? (completedTasks.length / totalTasks * 100).toFixed(0) : 0;
    setTaskProgress(completedPercentage);
  }

  const updateTaskProgress = async function () {
    const completed = await completedTasks();
    const remaining = await remainingTasks();
    taskPercentage(completed, remaining);
  }

  async function remainingTasks() {
    let TaskQuery = new Parse.Query('Task');
    TaskQuery.contains('user', ID);
    TaskQuery.contains('date', currentDate);
    TaskQuery.equalTo('completed', false);
    TaskQuery.notEqualTo('futureTask', true);
    TaskQuery.ascending('startTime')
    let Results = await TaskQuery.find();
    setRemainingTasks(Results);
    return Results;
  }

  async function completedTasks() {
    console.log('dateCompleted: ' + currentDate);
    let TaskQuery = new Parse.Query('Task');
    TaskQuery.contains('user', ID);
    TaskQuery.contains('date', currentDate);
    TaskQuery.equalTo('completed', true);
    TaskQuery.ascending('startTime')
    let Results = await TaskQuery.find();
    setCompletedTasks(Results);
    return Results;
  }

  async function postpone() {
    //console.log(wallTask.get('startTime'));
    //console.log(todoTime);

    let startTimeHours = parseInt(wallTask.get('startTime').slice(0, 2));
    let endTimeHours = parseInt(wallTask.get('endTime').slice(0, 2));
    let startTimeMin = wallTask.get('startTime').slice(3, 5);
    let endTimeMin = wallTask.get('endTime').slice(3, 5);
    let newStartTime = startTimeHours + todoTime;
    let newEndTime = endTimeHours + todoTime;

    console.log(startTimeHours + todoTime);

    if (newStartTime < startTimeHours || newStartTime >= 24) {
      Alert.alert(`Start tiden vil gå over midnat. Ryk den istedet til fremtidige to-do's.`)
      setTodoTime('');
    } else {
      newStartTime = newStartTime + ':' + startTimeMin;
      newEndTime = newEndTime + ':' + endTimeMin;
      console.log(newStartTime)
      wallTask.set('startTime', newStartTime);
      wallTask.set('endTime', newEndTime);
      await wallTask.save();

      setWallModalVisible(false);
      Alert.alert(wallTask.get('name') + " er blevet skubbet " + todoTime + " timer frem");
      setTodoTime('');
      remainingTasks();
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{}}>
        <Text style={{ fontSize: 24, textAlign: 'center', marginVertical: 10 }}>
          Hvordan har du det i dag {username}?
        </Text>
        <View style={{ alignItems: 'center' }}>
          <CircularProgress
            value={taskProgress}
            inActiveStrokeColor={colors.subButton}
            inActiveStrokeOpacity={0.3}
            progressValueColor={colors.mainButton}
            valueSuffix={'%'}
            activeStrokeColor={colors.border}
            activeStrokeSecondaryColor={colors.subButton}
            radius={90 * scaleFactor}
          />
        </View>
        {taskProgress == 0 ? (
          <Text style={styles.text}>
            Velkommen til en ny dag. Check din første to-do af for at få en
            god start på dagen!
          </Text>
        ) : taskProgress == 100 ? (
          <Text
            style={{ fontSize: 18, textAlign: 'center', marginVertical: 10 }}>
            Du har klaret alle dine to-do's i dag. Godt arbejde! Nu kan du
            holde fri med god samvittighed.
          </Text>
        ) : (
          <Text
            style={{ fontSize: 18, textAlign: 'center', marginVertical: 10 }}>
            Du har klaret {taskProgress}% af dine opgaver i dag. Godt arbejde!
          </Text>
        )}
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border, borderColor: colors.border },
          ]}></View>
      </View>
      <View
        style={[
          styles.upNext,
          {
            shadowColor: colors.border,
            borderColor: colors.subButton,
            backgroundColor: colors.subButton,
          },
        ]}>
        <Swiper
          loop={false}
          showsPagination={true}
          dotStyle={{
            backgroundColor: colors.mainButton,
            width: '40%',
            height: '100%',
            borderRadius: 4,
            marginHorizontal: 4,
          }}
          activeDotStyle={{
            backgroundColor: colors.border,
            width: '40%',
            height: '100%',
            borderRadius: 4,
            marginHorizontal: 4,
          }}
          paginationStyle={{ bottom: 10 }}>
          <View
            style={{
              flex: 1,
            }}>
            {remainingTasksArray.length < 1 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 20 }}>
                  Du har ingen to-do's på din liste
                </Text>
              </View>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    marginVertical: 10,
                    marginBottom: 10,
                  }}>
                  Næste to-do
                </Text>
                <View style={styles.rowView}>
                  <Text style={{ fontSize: 36, color: colors.text }}>
                    {remainingTasksArray[0].get('emoji')}
                  </Text>
                  <Text style={{ fontSize: 26, marginHorizontal: 10, color: colors.text }}>
                    {remainingTasksArray[0].get('name')}
                  </Text>
                </View>
                <View style={styles.rowView}>
                  <FontAwesomeIcon
                    icon={faStopwatch}
                    size={25}
                    style={{ marginHorizontal: 5 }}
                    color={colors.border}
                  />
                  <Text style={{ fontSize: 18, color: colors.text }}>
                    Fra {remainingTasksArray[0].get('startTime')}
                    {' '}til {remainingTasksArray[0].get('endTime')}

                  </Text>
                </View>
                {remainingTasksArray[0].get('description') == '' ?
                  <Text style={{ marginBottom: '10%', color: colors.text }}></Text>
                  : <ScrollView
                    contentContainerStyle={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 10,
                      padding: 10,
                      marginHorizontal: 10,
                    }}>
                    <Text style={{ fontSize: 16, marginBottom: 20, color: colors.text }}>{remainingTasksArray[0].get('description')}</Text>
                  </ScrollView>
                }
                <View style={[styles.rowView, { paddingBottom: '5%' }]}>
                  <View
                    style={[styles.rowView, { flex: 1 }]}>
                    <BouncyCheckbox
                      key={remainingTasksArray[0].id}
                      size={25}
                      fillColor={colors.mainButton}
                      unfillColor={colors.background}
                      iconStyle={{ borderColor: colors.subButton }}
                      innerIconStyle={{ borderWidth: 2 }}
                      onPress={() => taskCompleted(remainingTasksArray[0])}
                      isChecked={checked}
                    />
                    <Text style={{ fontSize: 18 }}>Fuldført?</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.rowView, { marginHorizontal: 15, flex: 1 }]}
                    onPress={() => showWallModal(remainingTasksArray[0])}>
                    <FontAwesomeIcon
                      icon={faFaceTired}
                      size={25}
                      color={colors.border}
                    />
                    <Text style={{ fontSize: 18, marginLeft: 12 }}>
                      Ramt væggen?
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          <View
            style={{
              flex: 1,
            }}>
            {remainingTasksArray.length < 2 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 20 }}>
                  Du har ingen to-do's på din liste
                </Text>
              </View>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    marginVertical: 10,
                    marginBottom: 10,
                  }}>
                  Næste to-do
                </Text>

                <View style={styles.rowView}>
                  <Text style={{ fontSize: 36, color: colors.text }}>
                    {remainingTasksArray[1].get('emoji')}
                  </Text>
                  <Text style={{ fontSize: 26, marginHorizontal: 10, color: colors.text }}>
                    {remainingTasksArray[1].get('name')}
                  </Text>
                </View>
                <View style={styles.rowView}>
                  <FontAwesomeIcon
                    icon={faStopwatch}
                    size={25}
                    style={{ marginHorizontal: 5 }}
                    color={colors.border}
                  />
                  <Text style={{ fontSize: 18, color: colors.text }}>
                    Fra {remainingTasksArray[1].get('startTime')}
                    {' '}til {remainingTasksArray[1].get('endTime')}
                  </Text>
                </View>
                {remainingTasksArray[1].get('description') == '' ?
                  <Text style={{ marginBottom: '10%', color: colors.text }}></Text>
                  : <ScrollView
                    contentContainerStyle={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 10,
                      padding: 10,
                      marginHorizontal: 10,
                    }}>
                    <Text style={{ fontSize: 16, marginBottom: 20, color: colors.text }}>{remainingTasksArray[1].get('description')}</Text>
                  </ScrollView>
                }
                <View style={[styles.rowView, { paddingBottom: '5%' }]}>
                  <View
                    style={[styles.rowView, { marginRight: 1, flex: 1 }]}>
                    <BouncyCheckbox
                      key={remainingTasksArray[0].id}
                      size={25}
                      fillColor={colors.border}
                      unfillColor={colors.background}
                      iconStyle={{ borderColor: 'black' }}
                      innerIconStyle={{ borderWidth: 2 }}
                      onPress={() => taskCompleted(remainingTasksArray[1])}
                      isChecked={checked}
                    />
                    <Text style={{ fontSize: 18 }}>Fuldført?</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.rowView, { marginHorizontal: 15, flex: 1 }]}
                    onPress={() => showWallModal(remainingTasksArray[1])}>
                    <FontAwesomeIcon
                      icon={faFaceTired}
                      size={25}
                      color={colors.border}
                    />
                    <Text style={{ fontSize: 18, marginLeft: 12 }}>
                      Ramt væggen?
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </Swiper>
        <Modal
          isVisible={isWallModalVisible}
          onBackdropPress={() => setWallModalVisible(false)}>
          <View
            style={{
              backgroundColor: colors.background,
              padding: 10,
              borderWidth: 1,
              borderColor: colors.background,
              borderRadius: 10,
              height: '50%'
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  marginLeft: '12%',
                  marginBottom: '10%',
                  color: colors.text
                }}>
                {' '}
                Har du ramt væggen?
              </Text>
              <TouchableOpacity onPress={() => setWallModalVisible(false)}>
                <FontAwesomeIcon icon={faCircleXmark} size={25} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: '40%',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flex: 7,
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginVertical: '10%',
                    color: colors.text
                  }}>
                  Udskyd
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 16 }}>
                  Hvor meget vil du udskyde din to-do?
                </Text>
                <DropDownPicker
                  open={openTodoTime}
                  value={todoTime}
                  items={todoTimes}
                  setOpen={setOpenTodoTime}
                  setValue={value => setTodoTime(value)}
                  placeholder="Vælg tid"
                  onChangeValue={value => {
                    setTodoTime(value);
                  }}
                  style={{ borderColor: 'white', marginTop: '15%' }}
                />
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.mainButton,
                    backgroundColor: colors.mainButton,
                    padding: '5%',
                    borderRadius: 10,
                    marginTop: '40%',
                    height: '40%',
                    justifyContent: 'center',
                    elevation: 10,
                  }}
                  onPress={() => postpone()}>
                  <Text style={{ textAlign: 'center', fontSize: 16, color: colors.text }}>
                    Udskyd din to-do
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  width: '5%',
                  height: '140%',
                  marginHorizontal: '5%',
                  flex: 0.1,
                  backgroundColor: colors.border,
                  borderRadius: 10,
                  alignSelf: 'flex-start',
                  elevation: 5,
                }}
              />
              <View
                style={{
                  alignItems: 'center',
                  flex: 7,
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginVertical: '10%',
                    textAlign: 'center',
                    color: colors.text
                  }}>
                  Fremtidig to-do
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 16 }}>
                  Du kan finde listen over dine fremtidige to-do's i din
                  notesbog
                </Text>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.mainButton,
                    backgroundColor: colors.mainButton,
                    padding: '5%',
                    borderRadius: 10,
                    marginTop: '63%',
                    height: '40%',
                    justifyContent: 'center',
                    elevation: 10,
                  }}
                  onPress={() => futureTodo()}>
                  <Text style={{ textAlign: 'center', fontSize: 16, color: colors.text }}>
                    Flyt til fremtidige to-do's
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  divider: {
    borderWidth: 1,
    borderRadius: 10,
    width: '70%',
    alignSelf: 'center',
    marginVertical: 10
  },
  upNext: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 10,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
  },
  rowView: {
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10
  },
})

export default DailyOverview;