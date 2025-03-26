import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { useTheme } from '@react-navigation/native';
import Parse from 'parse/react-native';
import { useUser } from '../../../Components/UserContext';

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
        <View style={styles.container}>
            <DraggableFlatList
                data={data}
                keyExtractor={(item) => item}
                renderItem={renderItem}
                onDragEnd={({ data }) => setData(data)}
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.light }]}
                onPress={() =>
                    saveNewOrder()
                }>
                <Text style={styles.buttonText}>Gem</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '3%',
        marginVertical: '20%',
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
        justifyContent: 'center',
        width: '50%',
        alignSelf: 'center',
        marginTop: '20%'
    },
    buttonText: {
        fontSize: 22,
        textAlign: 'center',
    }
});

export default WidgetOrder;