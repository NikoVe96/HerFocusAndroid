import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation, useTheme, useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import NextTaskW from './Widgets/NextTaskW';
import { useUser } from '../../Components/UserContext';
import TaskProgress from '../Structure components/TaskProgress';
import Parse from 'parse/react-native';
import Streak from './Widgets/Streak';
import DailyOverviewW from './Widgets/DailyOverviewW';
import FunFact from './Widgets/FunFact';


function Home() {

    const today = new Date();
    const currentDate = today.toISOString().slice(0, 10);
    const { width, height, colors } = useTheme();
    const scaleFactor = Math.min(width / 375, height / 667);
    const navigation = useNavigation();
    const [taskProgress, setTaskProgress] = useState(0);
    const { ID, updateUserProfile, name } = useUser();
    const [remainingTasksArray, setRemainingTasks] = useState([]);
    const [completedTasksArray, setCompletedTasks] = useState([]);
    const [checked, setChecked] = useState(false);
    const [userComponentOrder, setUserComponentOrder] = useState([
        "To-do status",
        "Næste to-do",
        "Streak",
        "Dagligt overblik",
        "ADHD fakta",
    ]);

    useFocusEffect(
        useCallback(() => {
            remainingTasks();
            updateTaskProgress();
            getOrder();
            return () => { };
        }, [])
    );

    useEffect(() => {
        updateUserProfile();
    }, []);

    const taskPercentage = async function (completedTasks, remainingTasks) {
        const totalTasks = remainingTasks.length + completedTasks.length;
        const completedPercentage = totalTasks > 0 ? ((completedTasks.length / totalTasks) * 100).toFixed(0) : 0;
        setTaskProgress(completedPercentage);
    };

    const updateTaskProgress = async function () {
        const completed = await completedTasks();
        const remaining = await remainingTasks();
        taskPercentage(completed, remaining);
    };

    async function remainingTasks() {
        let TaskQuery = new Parse.Query('Task');
        let currentUser = Parse.User.current();
        TaskQuery.contains('user', currentUser.id);
        TaskQuery.contains('date', currentDate);
        TaskQuery.equalTo('completed', false);
        TaskQuery.notEqualTo('futureTask', true);
        TaskQuery.ascending('startTime');
        let Results = await TaskQuery.find();
        setRemainingTasks(Results);
        return Results;
    }

    async function completedTasks() {
        let currentUser = Parse.User.current();
        let TaskQuery = new Parse.Query('Task');
        TaskQuery.contains('user', currentUser.id);
        TaskQuery.contains('date', currentDate);
        TaskQuery.equalTo('completed', true);
        TaskQuery.ascending('startTime');
        let Results = await TaskQuery.find();
        setCompletedTasks(Results);
        return Results;
    }

    const completeTask = async (task) => {
        const isCompleted = task.get('completed');
        console.log(task.get('completed'))
        task.set('completed', !isCompleted);
        await task.save();
        updateTaskProgress()
    }

    async function getOrder() {
        try {
            let currentUser = Parse.User.current();
            let query = new Parse.Query("Settings");
            query.contains('user', currentUser.id);
            let results = await query.find();
            if (results.length > 0) {
                const order = results[0].get('homeOrder');
                if (Array.isArray(order)) {
                    setUserComponentOrder(order);
                } else {
                    console.warn("homeOrder field is not an array:", order);
                }
            } else {
                console.warn("No settings found for this user.");
            }
        } catch (error) {
            console.error("Error saving new order:", error);
            Alert.alert("Beklager, der skete en fejl.");
        }
    }

    const componentMap = {
        'To-do status': <TaskProgress taskProgress={taskProgress} key='To-do status' />,
        'Næste to-do': (
            <NextTaskW
                remainingTasksArray={remainingTasksArray}
                checked={checked}
                taskCompleted={(task) => {
                    completeTask(task);
                }}
                key='Næste to-do'
            />
        ),
        Streak: <Streak key='Streak' />,
        'Dagligt overblik': <DailyOverviewW completeTask={(task) => completeTask(task)} key='Dagligt overblik' />,
        'ADHD fakta': <FunFact key={'ADHD fakta'} />
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={[styles.header, { color: colors.darkText }]}>Hej {name}!</Text>
                <Text style={[styles.text, { color: colors.darkText }]}>Er du klar til at tackle dagen?</Text>
                <TouchableOpacity style={styles.gearBtn}
                    onPress={() => navigation.navigate('Home order')}>
                    <FontAwesomeIcon icon={faGear} size={25} color={colors.dark} />
                </TouchableOpacity>
                <View style={styles.widgetsContainer}>
                    {userComponentOrder.map((key) => (
                        <View style={styles.widgetWrapper} key={key}>
                            {componentMap[key]}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        fontSize: 35,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: '5%',
    },
    text: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: '5%',
        textAlign: 'center',
    },
    gearBtn: {
        alignSelf: 'flex-end',
        marginRight: '5%',
        marginTop: '10%'
    },
    widgetsContainer: {
        marginTop: '5%',
        marginBottom: '20%',
        marginHorizontal: '5%'
    },
    widgetWrapper: {
        marginVertical: 10,
    },
    button: {
        alignContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: '5%',
        marginVertical: '3%',
        borderWidth: 0.4,
        borderBottomWidth: 4,
        borderColor: "#F8B52D",
        borderRadius: 15,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        textAlign: 'center',
    }
})