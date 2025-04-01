import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { useTheme } from '@react-navigation/native';
import Parse from 'parse/react-native';
import { useUser } from '../../../Components/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const WidgetOrder = ({ navigation }) => {
    const { colors } = useTheme();
    const { ID, username, updateUserProfile, name } = useUser();
    const [data, setData] = useState([
        "TaskProgress",
        "NextTaskW",
        "Streak",
        "DailyOverviewW",
    ]);

    async function saveNewOrder() {
        try {
            let query = new Parse.Query("Settings");
            query.contains('user', ID);
            let results = await query.find();
            if (results.length > 0) {
                results[0].set('homeOrder', data);
                await results[0].save();
                navigation.navigate('Home')
                Alert.alert("Rækkefølgen er gemt!");
            } else {
                Alert.alert("Beklager, der skete en fejl.");
            }
        } catch (error) {
            console.error("Error saving new order:", error);
            Alert.alert("Beklager, der skete en fejl.");
        }
    }

    const renderItem = ({ item, drag, isActive }) => (

        <TouchableOpacity
            style={[
                styles.item,
                {
                    backgroundColor: isActive ? colors.middle : colors.light,
                    borderColor: isActive ? colors.middleShadow : colors.lightShadow
                },
            ]}
            onLongPress={drag}
        >
            <Text style={{ fontSize: 18, color: colors.darkText }}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.light, borderColor: colors.lightShadow }]}
                    onPress={() =>
                        saveNewOrder()
                    }>
                    <FontAwesomeIcon icon={faPlus} size={'60%'} color={colors.darkText} />
                    <Text style={[styles.smallButtonText, { color: colors.darkText }]}>Tilføj ny widget</Text>
                </TouchableOpacity>
                <DraggableFlatList
                    data={data}
                    keyExtractor={(item) => item}
                    renderItem={renderItem}
                    onDragEnd={({ data }) => setData(data)}
                />
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.middle, borderColor: colors.middleShadow }]}
                    onPress={() =>
                        saveNewOrder()
                    }>
                    <Text style={[styles.buttonText, { color: colors.darkText }]}>Gem</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '3%',
        marginVertical: '10%',
    },
    item: {
        padding: 10,
        elevation: 5,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: '3%',
        marginHorizontal: '3%'
    },
    button: {
        borderWidth: 1,
        alignContent: 'center',
        borderRadius: 10,
        borderWidth: 0.4,
        borderBottomWidth: 4,
        borderRadius: 15,
        justifyContent: 'center',

        padding: '5%',
        marginVertical: '3%',
        width: '50%',
        alignSelf: 'center',
        marginTop: '20%',

        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    addButton: {
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
        padding: '1%',
        borderWidth: 0.4,
        borderBottomWidth: 4,
        borderColor: "#F8B52D",
        borderRadius: 15,
        justifyContent: 'center',
        width: '25%',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '3%'
    },
    buttonText: {
        fontSize: 22,
        textAlign: 'center',
    },
    smallButtonText: {
        fontSize: 14,
        textAlign: 'center',
        marginLeft: -10,
        marginRight: 10
    }

});

export default WidgetOrder;