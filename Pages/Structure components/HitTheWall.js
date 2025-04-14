import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useTheme } from '@react-navigation/native';

const HitTheWall = ({
    wallTask,
    onClose
}) => {
    const { colors } = useTheme();
    const [todoTime, setTodoTime] = useState(0);
    const [openTodoTime, setOpenTodoTime] = useState(false);
    const todoTimes = [
        { label: '1 time', value: 1 },
        { label: '2 timer', value: 2 },
        { label: '3 timer', value: 3 },
        { label: '4 timer', value: 4 },
    ];

    const futureTodo = async function () {
        wallTask.set('futureTask', true);
        wallTask.set('date', '');
        await wallTask.save();
        onClose();
        Alert.alert(wallTask.get('name') + ' er nu blevet flyttet til fremtidige to-dos!');
    };

    async function postpone() {
        let startTimeHours = parseInt(wallTask.get('startTime').slice(0, 2));
        let endTimeHours = parseInt(wallTask.get('endTime').slice(0, 2));
        let startTimeMin = wallTask.get('startTime').slice(3, 5);
        let endTimeMin = wallTask.get('endTime').slice(3, 5);
        let newStartTime = startTimeHours + todoTime;
        let newEndTime = endTimeHours + todoTime;

        if (newStartTime < startTimeHours || newStartTime >= 24) {
            Alert.alert(`Start tiden vil gå over midnat. Ryk den istedet til fremtidige to-do's.`);
            setTodoTime('');
        } else {
            newStartTime = newStartTime + ':' + startTimeMin;
            newEndTime = newEndTime + ':' + endTimeMin;
            wallTask.set('startTime', newStartTime);
            wallTask.set('endTime', newEndTime);
            await wallTask.save();
            onClose();
            Alert.alert(wallTask.get('name') + " er blevet skubbet " + todoTime + " timer frem");
            setTodoTime('');
            remainingTasks();
        }
    }

    return (
        <View
            style={{
                //backgroundColor: colors.background,
                padding: '1%',
                //borderWidth: 1,
                //borderColor: colors.background,
                //borderRadius: 10,
                //height: '50%'
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
                        color: colors.darkText
                    }}>
                    {' '}
                    Har du ramt væggen?
                </Text>
                <TouchableOpacity onPress={() => onClose()}>
                    <FontAwesomeIcon icon={faCircleXmark} size={25} />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    //height: '40%',
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
                            color: colors.darkText
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
                            borderColor: colors.dark,
                            backgroundColor: colors.dark,
                            padding: '5%',
                            borderRadius: 10,
                            marginTop: '40%',
                            height: '20%',
                            justifyContent: 'center',
                            elevation: 10,
                        }}
                        onPress={() => postpone()}>
                        <Text style={{ textAlign: 'center', fontSize: 16, color: colors.darkText }}>
                            Udskyd din to-do
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: colors.dark,
                        width: '5%',
                        height: '100%',
                        marginHorizontal: '5%',
                        flex: 0.1,
                        backgroundColor: colors.dark,
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
                            color: colors.darkText
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
                            borderColor: colors.dark,
                            backgroundColor: colors.dark,
                            padding: '5%',
                            borderRadius: 10,
                            marginTop: '63%',
                            height: '20%',
                            justifyContent: 'center',
                            elevation: 10,
                        }}
                        onPress={() => futureTodo()}>
                        <Text style={{ textAlign: 'center', fontSize: 16, color: colors.darkText }}>
                            Flyt til fremtidige to-do's
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default HitTheWall;