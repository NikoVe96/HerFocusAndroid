import { View, Dimensions } from "react-native";
import React, { useEffect, useState, useCallback, useFocusEffect } from 'react';

const TaskProgress = (
) => {

    const [taskProgress, setTaskProgress] = useState(0);
    const [remainingTasksArray, setRemainingTasks] = useState([]);
    const [completedTasksArray, setCompletedTasks] = useState([]);
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const [ID, setID] = useState('');


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
    }, []);

    useFocusEffect(
        useCallback(() => {
            remainingTasks();
            updateTaskProgress();
            return () => { };
        }, []),
    );

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
        //setRemainingTasks(Results);
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
        //setCompletedTasks(Results);
        return Results;
    }

    return (
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
    );

}

export default TaskProgress;