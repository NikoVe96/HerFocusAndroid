import { View, TouchableOpacity, Text, TextInput, Alert, SafeAreaView, ScrollView, StyleSheet, Modal, Dimensions, Switch } from "react-native";
import React, { useState, useEffect, useFocusEffect, useCallback } from 'react';
import Parse from 'parse/react-native';
import EmojiPicker from "rn-emoji-picker"
import { emojis } from "rn-emoji-picker/dist/data"
import { useTheme } from "@react-navigation/native";
import DatePicker from "react-native-date-picker";
import { Picker } from '@react-native-picker/picker';
import generateRecurringDates from "../../Components/RecurringDates";
import ColorPicker from "../../Components/ColorPicker";

export const AddItem = ({ item }) => {

    const { colors } = useTheme();
    const [itemName, setItemName] = useState('');
    const [itemDate, setItemDate] = useState('');
    const [itemStartTime, setStartTime] = useState('');
    const [itemEndTime, setEndTime] = useState('');
    const [username, setUsername] = useState('');
    const [ID, setID] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [itemColor, setItemColor] = useState('');
    const [recent, setRecent] = useState([]);
    const [emojiModalVisible, setEmojiModalVisible] = useState(false);
    const [emoji, setEmoji] = useState();
    const [description, setDescription] = useState('');
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const today = new Date;
    const [tStart, setTstart] = useState(null);
    const [recurrence, setRecurrence] = useState('daily');
    const [interval, setInterval] = useState(1);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isRecurringEnabled, setRecurringDayEnabled] = useState(false);
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [dayEvent, setDayEvent] = useState(false);

    useEffect(() => {
        // Lav til seperat funktion/component
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
        console.log(item)
    }, [username]);

    /* useFocusEffect(
         useCallback(() => {
             console.log(item);
             return () => { };
         }, []),
     );
     */

    async function newItem(date) {
        console.log('BEFORE IF STATEMENT')
        if (item == "to-do") {
            console.log('COMPLETED IF STATEMENT')
            try {
                const newTask = new Parse.Object('Task');
                const currentUser = await Parse.User.currentAsync();

                newTask.set('name', itemName);
                console.log(itemName);
                newTask.set('date', date);
                console.log(date);
                newTask.set('startTime', itemStartTime);
                console.log(itemStartTime);
                newTask.set('endTime', itemEndTime);
                console.log(itemEndTime);
                newTask.set('emoji', emoji);
                console.log(emoji);
                newTask.set('user', currentUser);
                console.log(currentUser);
                newTask.set('color', itemColor);
                console.log(itemColor);
                newTask.set('type', 'task');
                newTask.set('description', description);
                console.log(description);
                newTask.set('tStart', tStart);
                console.log(tStart);
                await newTask.save();
                console.log('Success: task saved')
            } catch (error) {
                console.log('Error saving new task: ', error);
                Alert.alert('Hovsa!',
                    'Det ser ud til at du mangler at udfylde enten navn, dato, farve, start eller sluttidspunkt 😉')
            }
        } else if (item == "begivenhed") {
            try {
                const newEvent = new Parse.Object('Events');
                const currentUser = await Parse.User.currentAsync();

                newEvent.set('name', itemName);
                newEvent.set('date', date);
                newEvent.set('startTime', itemStartTime);
                newEvent.set('endTime', itemEndTime);
                newEvent.set('emoji', emoji);
                newEvent.set('user', currentUser);
                newEvent.set('color', itemColor);
                newEvent.set('type', 'event');
                newEvent.set('allDay', dayEvent);
                newEvent.set('description', description);
                newEvent.set('tStart', tStart);
                await newEvent.save();
                console.log('Success: event saved');
            } catch (error) {
                console.log('Error saving new event: ', error);
                Alert.alert('Hovsa!',
                    'Det ser ud til at du har glemt at udfylde enten navn, farve, dato, start eller slut tidspunkt 😉')
            }
        } else {
            try {
                const currentUser = await Parse.User.currentAsync();
                const newRoutine = new Parse.Object('Routine');

                newRoutine.set('name', itemName);
                newRoutine.set('user', currentUser);
                newRoutine.set('emoji', emoji);
                newRoutine.set('color', itemColor);
                newRoutine.set('routineSteps', []);
                newRoutine.set('type', 'routine');
                await newRoutine.save();

                routines();
                hideRoutineModal();

                Alert.alert('En ny rutine er blevet tilføjet!')
                clearInput();
            } catch (error) {
                console.log('Error saving new routine: ', error);
                Alert.alert('Hovsa!',
                    'Det ser ud til at du har glemt at udfylde enten navn eller farve 😉')
            }
        }
    }

    async function saveItem() {
        console.log('funktionen er startet');
        console.log(isRecurringEnabled);
        console.log('recurring is enabled: ' + isRecurringEnabled);

        try {
            if (isRecurringEnabled) {
                const recurringDates = generateRecurringDates;
                for (const date of recurringDates) {
                    await newItem(date);
                }
                item == "to-do" ? Alert.alert("Dine to-do's er blevet tilføjet til din kalender!")
                    : item == "begivenhed" ? Alert.alert("Dine begivenheder er blevet tilføjet til din kalender!")
                        : Alert.alert("Dine rutiner er blevet tilføjet til din kalender!")
            } else {
                await newItem(itemDate);
                Alert.alert(`En ny ${item} er blevet tilføjet til din kalender!`);
            }
            clearInput();
        } catch (error) {
            console.log(`Error saving ${item}:`, error);
            Alert.alert('Error', `An error occurred while saving the item.`);
        }
    }

    const dateDisplay = (date) => {
        let month = date.getMonth() + 1;
        return date.getDate() + '/' + month + '/' + date.getFullYear();
    };

    const handleDateConfirm = (date) => {
        const formattedDate = date.toISOString().slice(0, 10);
        setItemDate(formattedDate);
        console.log('Selected date:', formattedDate);
        setDatePickerVisibility(false)
    };

    const recurringDates = (date) => {
        const dates = generateRecurringDates(date);
        return dates
        // test if it works properly or if it should be saved in state
    }

    function clearInput() {
        setItemName('');
        setStartTime('');
        setEndTime('');
        setItemDate('');
        setEmoji();
        setItemColor('');
        setDescription('');
        setInterval(1);
        setStartDate();
        setEndDate();
        setRecurringDayEnabled(false);
        setDayEvent(false);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View
                    style={{
                        alignContent: 'center',
                        paddingHorizontal: 16,
                    }}>
                    <View>
                        <Text style={[styles.text, { color: colors.text }]}>
                            Hvad skal din {item} hedde?
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => setItemName(text)}
                            value={itemName}
                        />
                    </View>
                    <View>
                        <ColorPicker />
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
                                onPress={() => setEmojiModalVisible(true)}
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
                                onRequestClose={() => setEmojiModalVisible(false)}>
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
                                                setEmoji(chosenEmoji.emoji);
                                                setEmojiModalVisible(false)
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
                                        onPress={() => setEmojiModalVisible(false)}>
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
                                onPress={() => setStartTimePickerVisibility(true)}>
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
                                    //recurringDates(date)
                                    setEndTimePickerVisibility(true)
                                }}
                                onCancel={() => {
                                    setStartTimePickerVisibility(false)
                                }}
                            />
                        </View>
                        <View style={[styles.rowView, { alignItems: 'center' }]}>
                            <Text style={[styles.text, { fontWeight: 'bold', color: colors.text }]}>
                                {itemStartTime == '' ? '' : `${itemStartTime}`}
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
                                onPress={() => isEndTimePickerVisible(true)}>
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
                                    //handleEndTimeConfirm(date)
                                    //setDatePickerVisibility(true)
                                }}
                                onCancel={() => {
                                    setEndTimePickerVisibility(false)
                                }}
                            />
                        </View>
                        <View style={[styles.rowView, { alignItems: 'center' }]}>
                            <Text style={[styles.text, { fontWeight: 'bold', color: colors.text }]}>
                                {itemEndTime == '' ? '' : `${itemEndTime}`}
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
                                    onPress={() => setDatePickerVisibility(true)}>
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
                                    {`${itemDate}`}
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
                        //numberOfLines={8}
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
                    onPress={() => saveItem()}>
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
        marginBottom: '20%',
        marginTop: '10%'
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

export default AddItem;