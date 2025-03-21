import React, { useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme, useFocusEffect } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import NextTaskW from './Widgets/NextTaskW';
import { useUser } from '../../Components/UserContext';
import TaskProgress from '../Structure components/TaskProgress';
import Parse from 'parse/react-native';
import Streak from './Widgets/Streak';


function Home() {

    const today = new Date();
    const currentDate = today.toISOString().slice(0, 10);
    const { width, height, colors } = useTheme();
    const scaleFactor = Math.min(width / 375, height / 667);
    const navigation = useNavigation();
    const [sorting, setSorting] = useState('boxes');
    const [open, setOpen] = useState(false);
    const [sortingOptions, setSortingOptions] = useState([
        { label: 'Liste', value: 'list' },
        { label: 'Ruder', value: 'boxes' }
    ]);
    const [taskProgress, setTaskProgress] = useState(0);
    const { ID, username } = useUser();
    const [remainingTasksArray, setRemainingTasks] = useState([]);
    const [completedTasksArray, setCompletedTasks] = useState([]);
    const [checked, setChecked] = useState(false);

    useFocusEffect(
        useCallback(() => {
            remainingTasks();
            updateTaskProgress();
            return () => { };
        }, [])
    );

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
        TaskQuery.contains('user', ID);
        TaskQuery.contains('date', currentDate);
        TaskQuery.equalTo('completed', false);
        TaskQuery.notEqualTo('futureTask', true);
        TaskQuery.ascending('startTime');
        let Results = await TaskQuery.find();
        setRemainingTasks(Results);
        return Results;
    }

    async function completedTasks() {
        let TaskQuery = new Parse.Query('Task');
        TaskQuery.contains('user', ID);
        TaskQuery.contains('date', currentDate);
        TaskQuery.equalTo('completed', true);
        TaskQuery.ascending('startTime');
        let Results = await TaskQuery.find();
        setCompletedTasks(Results);
        return Results;
    }

    const taskCompleted = async function (task) {
        task.set('completed', true);
        await task.save();
        updateTaskProgress();
        setChecked(false);
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={styles.header}>
                    Hej Niko!
                </Text>
                <Text style={styles.text}>
                    Hvordan har du det i dag?
                    Er du klar til at tackle dagen?
                </Text>
                <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: '5%', marginBottom: '5%' }}>
                    <FontAwesomeIcon
                        icon={faGear} size={25} />
                </TouchableOpacity>
                <View style={{ marginBottom: '5%' }}>
                    <View style={styles.widget}>
                        <TaskProgress
                            taskProgress={taskProgress} />
                    </View>
                    <View style={styles.widget}>
                        <NextTaskW
                            remainingTasksArray={remainingTasksArray}
                            checked={checked}
                            taskCompleted={taskCompleted} />
                    </View>
                    <View style={styles.widget}>
                        <Streak />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}

export default Home;

const styles = StyleSheet.create({
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
        textAlign: 'center'
    },
    divider: {
        borderWidth: 1,
        borderRadius: 10,
        width: '70%',
        alignSelf: 'center',
        marginVertical: '8%',
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: '2%',

    },
    widget: {
        flex: 1,
        marginHorizontal: '1%',
        padding: '2%'
    }
})