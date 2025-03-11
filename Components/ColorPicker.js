import { View, TouchableOpacity, Text, TextInput, Alert, SafeAreaView, ScrollView, StyleSheet, Modal, Dimensions, Switch } from "react-native";
import React, { useState, useEffect } from 'react';
import { useTheme } from "@react-navigation/native";


export const ColorPicker = () => {

    const { colors } = useTheme();
    const [chosenColor, setchosenColor] = useState('');
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const [taskColor, setTaskColor] = useState('');

    function handleColorPick(color) {
        if (color == taskColor) {
            setTaskColor('');
        } else {
            setTaskColor(color);
        }
    }

    return (
        <View>
            <Text style={[styles.text, { color: colors.text }]}>
                Vælg en farve
            </Text>
            <View style={styles.colorOptions}>
                <TouchableOpacity
                    style={{
                        borderWidth: taskColor === '#FAEDCB' ? 1.5 : 1,
                        borderRadius:
                            taskColor === '#FAEDCB'
                                ? 30 * scaleFactor
                                : 20 * scaleFactor,
                        width:
                            taskColor === '#FAEDCB'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        height:
                            taskColor === '#FAEDCB'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        backgroundColor: '#FAEDCB',
                        borderColor: taskColor === '#FAEDCB'
                            ? 'grey'
                            : '#FAEDCB',
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
                        borderRadius:
                            taskColor === '#C9E4DE'
                                ? 30 * scaleFactor
                                : 20 * scaleFactor,
                        width:
                            taskColor === '#C9E4DE'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        height:
                            taskColor === '#C9E4DE'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        backgroundColor: '#C9E4DE',
                        borderColor: taskColor === '#C9E4DE'
                            ? 'grey'
                            : '#C9E4DE',
                        elevation: 5,
                        shadowColor: 'grey',
                        shadowOffset: { width: 1, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 1,
                    }}
                    onPress={() => handleColorPick('#C9E4DE')}></TouchableOpacity>
                <TouchableOpacity
                    style={{
                        borderWidth: taskColor === '#C6DEF1' ? 1.5 : 1,
                        borderRadius:
                            taskColor === '#C6DEF1'
                                ? 30 * scaleFactor
                                : 20 * scaleFactor,
                        width:
                            taskColor === '#C6DEF1'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        height:
                            taskColor === '#C6DEF1'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        backgroundColor: '#C6DEF1',
                        borderColor: taskColor === '#C6DEF1'
                            ? 'grey'
                            : '#C6DEF1',
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
                        borderRadius:
                            taskColor === '#DBCDF0'
                                ? 30 * scaleFactor
                                : 20 * scaleFactor,
                        width:
                            taskColor === '#DBCDF0'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        height:
                            taskColor === '#DBCDF0'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        backgroundColor: '#DBCDF0',
                        borderColor: taskColor === '#DBCDF0'
                            ? 'grey'
                            : '#DBCDF0',
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
                        borderRadius:
                            taskColor === '#FFADAD'
                                ? 30 * scaleFactor
                                : 20 * scaleFactor,
                        width:
                            taskColor === '#FFADAD'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        height:
                            taskColor === '#FFADAD'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        backgroundColor: '#FFADAD',
                        borderColor: taskColor === '#FFADAD'
                            ? 'grey'
                            : '#FFADAD',
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
                        borderRadius:
                            taskColor === '#FFD6A5'
                                ? 30 * scaleFactor
                                : 20 * scaleFactor,
                        width:
                            taskColor === '#FFD6A5'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        height:
                            taskColor === '#FFD6A5'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        backgroundColor: '#FFD6A5',
                        borderColor: taskColor === '#FFD6A5'
                            ? 'grey'
                            : '#FFD6A5',
                        elevation: 5,
                        shadowColor: 'black',
                        shadowOpacity: 0.5,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 2,
                    }}
                    onPress={() => handleColorPick('#FFD6A5')}></TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    colorOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    text: {
        marginVertical: 10,
        fontSize: 18,
    },
})

export default ColorPicker;