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
import { colorChange } from "./ColorChange";
import handleTimeConfirm from "../../Components/TimeConfirm";
import { KeyboardAvoidingView, Platform } from "react-native";

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
    const [isDetailsEnabled, setDetailsEnabled] = useState(false);
    const [startTimeDate, setStartTimeDate] = useState(null);
    const [endTimeDate, setEndTimeDate] = useState(new Date());

    async function newItem(date) {

        if (item == "to-do") {
            try {
                if (!itemColor) {
                    Alert.alert('Hovsa!', 'Du skal vælge en farve.');
                    return;
                }

                const newTask = new Parse.Object('Task');
                const currentUser = await Parse.User.currentAsync();

                newTask.set('name', itemName);
                newTask.set('date', date);
                newTask.set('startTime', itemStartTime);
                newTask.set('endTime', itemEndTime);
                newTask.set('emoji', emoji);
                newTask.set('user', currentUser);
                newTask.set('color', itemColor);
                newTask.set('type', 'task');
                newTask.set('description', description);
                newTask.set('tStart', tStart);
                await newTask.save();
            } catch (error) {
                console.log('Error saving new task: ', error);
                Alert.alert('Hovsa!',
                    'Det ser ud til at du mangler at udfylde enten navn, dato, farve, start eller sluttidspunkt 😉')
            }
        } else if (item == "begivenhed") {
            try {
                if (!itemColor) {
                    Alert.alert('Hovsa!', 'Du skal vælge en farve.');
                    return;
                }

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
                if (!itemColor) {
                    Alert.alert('Hovsa!', 'Du skal vælge en farve.');
                    return;
                }

                const currentUser = await Parse.User.currentAsync();
                const newRoutine = new Parse.Object('Routine');

                newRoutine.set('name', itemName);
                newRoutine.set('user', currentUser);
                newRoutine.set('emoji', emoji);
                newRoutine.set('color', itemColor);
                newRoutine.set('routineSteps', []);
                newRoutine.set('type', 'routine');
                await newRoutine.save();

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

        try {
            if (isRecurringEnabled) {
                const recurringDates = generateRecurringDates(startDate, endDate, interval, recurrence);
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
            Alert.alert('Der er sket en fejl.');
        }
    }

    const dateDisplay = (date) => {
        let month = date.getMonth() + 1;
        return date.getDate() + '/' + month + '/' + date.getFullYear();
    };

    const handleDateConfirm = (date) => {
        const formattedDate = date.toISOString().slice(0, 10);
        setItemDate(formattedDate);
        setDatePickerVisibility(false)
    };

    const recurringDates = (date) => {
        const dates = generateRecurringDates(date);
        return dates
        // test if it works properly or if it should be saved in state
    }

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    function setColor(color) {
        setItemColor(color);
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
            <KeyboardAvoidingView

                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
            >
                <ScrollView>
                    <View
                        style={{
                            alignContent: 'center',
                            paddingHorizontal: 16,
                        }}>
                        <View>
                            <Text style={[styles.text, { color: colors.darkText }]}>
                                Hvad skal din {item} hedde?
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => setItemName(text)}
                                value={itemName}
                            />
                        </View>
                        <View>
                            <ColorPicker
                                onSelect={setColor} />
                        </View>
                        <View style={[styles.buttonSmall, {
                            borderColor: colors.light, backgroundColor: colors.light,
                            marginVertical: '5%'
                        }]}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginVertical: '2%'
                                }}>
                                <Text
                                    style={{ flex: 6, fontSize: 18 * scaleFactor, color: colors.darkText }}>
                                    Tilbagevendene
                                </Text>
                                <Switch
                                    trackColor={{ false: colors.dark, true: colors.middle }}
                                    thumbColor={isRecurringEnabled ? colors.dark : colors.light}
                                    ios_backgroundColor={colors.dark}
                                    onValueChange={() => setRecurringDayEnabled(previousState => !previousState)}
                                    value={isRecurringEnabled}
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: '10%', flexDirection: 'row' }}>
                            <View style={styles.rowView}>
                                <TouchableOpacity
                                    onPress={() => setEmojiModalVisible(true)}
                                    style={[
                                        styles.buttonSmall,
                                        {
                                            backgroundColor: colors.middle,
                                            borderColor: colors.middleShadow,
                                        },
                                    ]}>
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            { fontSize: 20 * scaleFactor },
                                            { color: colors.darkText },
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
                                                { backgroundColor: colors.light },
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
                                                backgroundColor={colors.light}
                                            />
                                        </View>
                                        <TouchableOpacity
                                            style={[
                                                styles.modalButton,
                                                {
                                                    backgroundColor: colors.dark,
                                                    borderColor: colors.dark,
                                                },
                                            ]}
                                            onPress={() => setEmojiModalVisible(false)}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>LUK</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </View>
                            <View style={[styles.rowView, { alignItems: 'center', }]}>
                                <Text style={{ fontSize: 26, color: colors.darkText }}> {emoji}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                            <View style={styles.rowView}>
                                <TouchableOpacity
                                    style={[
                                        styles.buttonSmall,
                                        {
                                            backgroundColor: colors.middle,
                                            borderColor: colors.middleShadow,
                                        },
                                    ]}
                                    onPress={() => setStartTimePickerVisibility(true)}>
                                    <Text style={[styles.buttonText, { color: colors.darkText }]}>
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
                                    buttonColor={colors.dark}
                                    dividerColor={colors.dark}
                                    onConfirm={(date) => {
                                        setStartTimePickerVisibility(false)
                                        const time = formatTime(date);
                                        setStartTime(time);
                                        setStartTimeDate(date);
                                        const defaultEndTime = new Date(date.getTime() + 3600000);
                                        setEndTimeDate(defaultEndTime);
                                        setEndTimePickerVisibility(true);
                                    }}
                                    onCancel={() => {
                                        setStartTimePickerVisibility(false)
                                    }}
                                />
                            </View>
                            <View style={[styles.rowView, { alignItems: 'center' }]}>
                                <Text style={[styles.text, { fontWeight: 'bold', color: colors.darkText }]}>
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
                                            backgroundColor: colors.middle,
                                            borderColor: colors.middleShadow,
                                        },
                                    ]}
                                    onPress={() => setEndTimePickerVisibility(true)}>
                                    <Text style={[styles.buttonText, { color: colors.darkText }]}>
                                        Slut tidspunkt
                                    </Text>
                                </TouchableOpacity>
                                <DatePicker
                                    mode="time"
                                    modal
                                    open={isEndTimePickerVisible}
                                    date={endTimeDate || today}
                                    title={'Slut tid'}
                                    confirmText="Bekræft"
                                    cancelText="Annuler"
                                    buttonColor={colors.dark}
                                    dividerColor={colors.dark}
                                    onConfirm={(date) => {
                                        setEndTimePickerVisibility(false)
                                        const time = formatTime(date);
                                        setEndTime(time);
                                    }}
                                    onCancel={() => {
                                        setEndTimePickerVisibility(false)
                                    }}
                                />
                            </View>
                            <View style={[styles.rowView, { alignItems: 'center' }]}>
                                <Text style={[styles.text, { fontWeight: 'bold', color: colors.darkText }]}>
                                    {itemEndTime == '' ? '' : `${itemEndTime}`}
                                </Text>
                            </View>
                        </View>

                        {isRecurringEnabled ?
                            <View>
                                <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
                                    <View style={[styles.rowView, { alignItems: 'center', flex: 1, justifyContent: 'center' }]}>
                                        <Text style={[styles.text, { color: colors.darkText }]}>Gentages hver: </Text>
                                    </View>
                                    <View style={[styles.rowView, { alignItems: 'center', alignSelf: 'center', flex: 0.5 }]}>
                                        <TextInput style={[styles.textInput, {}]} keyboardType="numeric" onChangeText={(interval) => setInterval(parseInt(interval))} />
                                    </View>
                                    <View style={[styles.pickerContainer, { backgroundColor: colors.lightMiddle, borderColor: colors.lightMiddle }]}>
                                        <Picker
                                            selectedValue={recurrence}
                                            onValueChange={(value) => setRecurrence(value)}
                                            style={[styles.picker, { color: colors.darkText }]}
                                            dropdownIconColor={colors.darkText}
                                            mode="dropdown"
                                        >
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
                                                    backgroundColor: colors.middle,
                                                    borderColor: colors.middleShadow,
                                                },
                                            ]}
                                            onPress={() => setStartDatePickerVisibility(true)}>
                                            <Text
                                                style={[
                                                    styles.buttonText,
                                                    { fontSize: 20 * scaleFactor },
                                                    { color: colors.darkText },
                                                ]}>
                                                Start dato
                                            </Text>
                                        </TouchableOpacity>
                                        <DatePicker
                                            mode="date"
                                            modal
                                            title={'Start dato'}
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
                                                { color: colors.darkText },
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
                                                    backgroundColor: colors.middle,
                                                    borderColor: colors.middleShadow,
                                                },
                                            ]}
                                            onPress={() => setEndDatePickerVisibility(true)}>
                                            <Text
                                                style={[
                                                    styles.buttonText,
                                                    { fontSize: 20 * scaleFactor },
                                                    { color: colors.darkText },
                                                ]}>
                                                Slut dato
                                            </Text>
                                        </TouchableOpacity>
                                        <DatePicker
                                            mode="date"
                                            modal
                                            open={isEndDatePickerVisible}
                                            date={today}
                                            title={'Slut dato'}
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
                                                { color: colors.darkText },
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
                                                backgroundColor: colors.middle,
                                                borderColor: colors.middleShadow,
                                            },
                                        ]}
                                        onPress={() => setDatePickerVisibility(true)}>
                                        <Text
                                            style={[
                                                styles.buttonText,
                                                { fontSize: 20 * scaleFactor },
                                                { color: colors.darkText },
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
                                            { color: colors.darkText },
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
                        <Text style={[styles.text, { color: colors.darkText }]}>
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
                                backgroundColor: colors.dark,
                                borderColor: colors.darkShadow,
                            },
                        ]}
                        onPress={() => saveItem()}>
                        <Text style={{ color: colors.darkText, fontSize: 24 * scaleFactor }}>
                            Tilføj til kalender
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    Button: {
        borderRadius: 10,
        padding: '3%',
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
        marginTop: '10%',
        borderBottomWidth: 4
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
        borderBottomWidth: 4
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
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
        width: '40%'
    },
    picker: {
        height: 50,
        width: '100%',
        elevation: 5
    },
});

export default AddItem;