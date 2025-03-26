import { View, TouchableOpacity, Text, StyleSheet, Dimensions, } from "react-native";
import React, { useState } from 'react';
import { useTheme } from "@react-navigation/native";

export const ColorPicker = ({ onSelect }) => {

    const { colors } = useTheme();
    const [chosenColor, setChosenColor] = useState('');
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);

    function handleColorPick(color) {
        if (color == chosenColor) {
            setChosenColor('');
            onSelect('');
        } else {
            setChosenColor(color);
            onSelect(color);
        }
    }

    return (
        <View>
            <Text style={[styles.text, { color: colors.darkText }]}>
                Vælg en farve
            </Text>
            <View style={styles.colorOptions}>
                <TouchableOpacity
                    style={{
                        borderWidth: chosenColor === '#FAEDCB' ? 1.5 : 1,
                        borderRadius:
                            chosenColor === '#FAEDCB'
                                ? 30 * scaleFactor
                                : 20 * scaleFactor,
                        width:
                            chosenColor === '#FAEDCB'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        height:
                            chosenColor === '#FAEDCB'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        backgroundColor: '#FAEDCB',
                        borderColor: chosenColor === '#FAEDCB'
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
                        borderWidth: chosenColor === '#C9E4DE' ? 1.5 : 1,
                        borderRadius:
                            chosenColor === '#C9E4DE'
                                ? 30 * scaleFactor
                                : 20 * scaleFactor,
                        width:
                            chosenColor === '#C9E4DE'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        height:
                            chosenColor === '#C9E4DE'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        backgroundColor: '#C9E4DE',
                        borderColor: chosenColor === '#C9E4DE'
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
                        borderWidth: chosenColor === '#C6DEF1' ? 1.5 : 1,
                        borderRadius:
                            chosenColor === '#C6DEF1'
                                ? 30 * scaleFactor
                                : 20 * scaleFactor,
                        width:
                            chosenColor === '#C6DEF1'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        height:
                            chosenColor === '#C6DEF1'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        backgroundColor: '#C6DEF1',
                        borderColor: chosenColor === '#C6DEF1'
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
                        borderWidth: chosenColor === '#DBCDF0' ? 1.5 : 1,
                        borderRadius:
                            chosenColor === '#DBCDF0'
                                ? 30 * scaleFactor
                                : 20 * scaleFactor,
                        width:
                            chosenColor === '#DBCDF0'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        height:
                            chosenColor === '#DBCDF0'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        backgroundColor: '#DBCDF0',
                        borderColor: chosenColor === '#DBCDF0'
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
                        borderWidth: chosenColor === '#FFADAD' ? 1.5 : 1,
                        borderRadius:
                            chosenColor === '#FFADAD'
                                ? 30 * scaleFactor
                                : 20 * scaleFactor,
                        width:
                            chosenColor === '#FFADAD'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        height:
                            chosenColor === '#FFADAD'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        backgroundColor: '#FFADAD',
                        borderColor: chosenColor === '#FFADAD'
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
                        borderWidth: chosenColor === '#FFD6A5' ? 1.5 : 1,
                        borderRadius:
                            chosenColor === '#FFD6A5'
                                ? 30 * scaleFactor
                                : 20 * scaleFactor,
                        width:
                            chosenColor === '#FFD6A5'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        height:
                            chosenColor === '#FFD6A5'
                                ? 45 * scaleFactor
                                : 40 * scaleFactor,
                        backgroundColor: '#FFD6A5',
                        borderColor: chosenColor === '#FFD6A5'
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