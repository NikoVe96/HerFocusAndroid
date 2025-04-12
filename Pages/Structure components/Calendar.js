import React, { useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import WeeklyCalendar from './WeeklyCalendar';
import TaskSorter from './TaskSorter';
import CustomCalendar from './CustomCalendar';
import WeeklyTaskView from './WeeklyTaskView';
import { weekdays } from 'moment';
import { useUser } from '../../Components/UserContext';

const CalendarOverview = ({ navigation }) => {

    const today = new Date();
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const [enabled, setEnabled] = useState('daily');
    const [chosenDate, setChosenDate] = useState(today);
    const { ID } = useUser();
    const [selectedWeekDates, setSelectedWeekDates] = useState([]);

    const completeTask = async (task) => {
        const isCompleted = task.get('completed');
        console.log(task.get('completed'))
        task.set('completed', !isCompleted);
        await task.save();
    }

    const calendarLayout = () => {
        if (enabled === 'monthly') {
            return (
                <View>
                    <CustomCalendar
                        selectedDate={chosenDate}
                        onDayPress={handleSelectedDay}
                    />
                    <TaskSorter
                        date={chosenDate}
                        completeTask={completeTask}
                    />
                </View>
            );
        } else if (enabled === 'weekly') {
            return (
                <View>
                    <WeeklyCalendar
                        onWeekChange={handleWeekChange} />
                    <WeeklyTaskView
                        weekDates={selectedWeekDates}
                        userID={ID} />
                </View>
            );
        } else if (enabled == 'daily') {
            return (
                <TaskSorter
                    date={today}
                />
            );
        }
    };

    const handleWeekChange = (weekDates) => {
        setSelectedWeekDates(weekDates);
    };

    const handleSelectedDay = (date) => {
        setChosenDate(date);
    };

    return (
        <SafeAreaView >
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: '1%' }}>
                    <Text style={{ fontSize: 26, marginVertical: '5%', color: colors.darkText }}>Kalender</Text>
                </View>
                <View style={{ flexDirection: 'row', top: '2%', justifyContent: 'center' }}>
                    <TouchableOpacity style={{
                        backgroundColor: enabled == 'daily' ? colors.dark : colors.light,
                        padding: '2%', borderWidth: 1, borderColor: colors.dark, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: '30%', alignItems: 'center'
                    }}
                        onPress={() => setEnabled('daily')}>
                        <Text style={{ fontSize: 18, color: enabled == 'daily' ? colors.lightText : colors.darkText }}>I dag</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: enabled == 'weekly' ? colors.dark : colors.light,
                        padding: '2%', borderWidth: 1, borderColor: colors.dark, width: '30%', alignItems: 'center'
                    }}
                        onPress={() => setEnabled('weekly')}>
                        <Text style={{ fontSize: 18, color: enabled == 'weekly' ? colors.lightText : colors.darkText }}>Uge</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: enabled == 'monthly' ? colors.dark : colors.light,
                        padding: '2%', borderWidth: 1, borderColor: colors.dark, borderTopRightRadius: 10, borderBottomRightRadius: 10, width: '30%', alignItems: 'center'
                    }}
                        onPress={() => setEnabled('monthly')}>
                        <Text style={{ fontSize: 18, color: enabled == 'monthly' ? colors.lightText : colors.darkText }}>Måned</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: '5%' }}>
                    {calendarLayout()}</View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default CalendarOverview;