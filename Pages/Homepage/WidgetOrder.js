import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Dimensions, Modal } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import Parse from 'parse/react-native';
import { useUser } from '../../Components/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const WidgetOrder = ({ navigation }) => {
    const { colors } = useTheme();
    const { ID, handleLogout } = useUser();
    const [data, setData] = useState([
        "To-do status",
        "Næste to-do",
        "Streak",
        "Dagligt overblik",
        'ADHD fakta'
    ]);
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const [modalVisible, setModalVisible] = useState(false);
    const availableWidgets = [
        "To-do status",
        "Næste to-do",
        "Streak",
        "Dagligt overblik",
        'ADHD fakta'
    ];

    useFocusEffect(
        useCallback(() => {
            getOrder();
        }, [])
    );



    async function getOrder() {
        const settings = new Parse.Query('Settings');
        settings.contains('user', ID);
        let result = await settings.find();
        console.log('result: ' + result[0].get('homeOrder'))
        setData(result[0].get('homeOrder'))
    }

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

    function addWidget(widget) {
        setData([...data, widget]);
        setModalVisible(false);
    }

    function removeWidget(widgetToRemove) {
        setData(prevData => prevData.filter(widget => widget !== widgetToRemove));
    }



    const renderItem = ({ item, index, drag, isActive }) => (

        <View style={styles.widgetView}>
            <TouchableOpacity
                style={[
                    styles.item,
                    {
                        backgroundColor: isActive ? colors.middle : colors.light,
                        borderColor: isActive ? colors.middleShadow : colors.dark
                    },
                ]}
                onLongPress={drag}
            >
                <Text style={{ fontSize: 18, color: colors.darkText }}>{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteView}
                onPress={() => removeWidget(item)}>
                <FontAwesomeIcon icon={faTrash} color={colors.lightText} />
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={[styles.headerText, { color: colors.darkText, fontSize: 16 * scaleFactor }]}>Ved at holde widget navnene inde kan du trække i dem og omrokere rækkefølgen
                    af din "Hjem" side, så den passer til lige netop dig!</Text>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.light, borderColor: colors.lightShadow }]}
                    onPress={() =>
                        setModalVisible(true)
                    }>
                    <FontAwesomeIcon icon={faPlus} size={25} color={colors.darkText} />
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
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalContent, { backgroundColor: colors.light }]}>
                            <Text style={[styles.modalTitle, { color: colors.darkText, fontSize: 26 * scaleFactor }]}>
                                Vælg en widget
                            </Text>
                            {availableWidgets.filter(widget => !data.includes(widget)).map((widget, idx) => (
                                <View key={idx} style={[styles.modalItem, { borderColor: colors.dark }]}>
                                    <Text style={{ fontSize: 16, color: colors.darkText }}>{widget}</Text>
                                    <TouchableOpacity onPress={() => addWidget(widget)}>
                                        <FontAwesomeIcon icon={faPlus} size={25} color={colors.darkText} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <TouchableOpacity style={[styles.closeButton]} onPress={() => setModalVisible(false)}>
                                <Text style={{ color: colors.darkText, fontSize: 22 * scaleFactor }}>Luk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '3%',
        marginVertical: '10%',
    },
    headerText: {
        textAlign: 'center',
        marginBottom: '5%'
    },
    widgetView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    item: {
        padding: '2%',
        elevation: 5,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: '3%',
        marginHorizontal: '3%',
        width: '70%'
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
        padding: '2%',
        borderWidth: 0.4,
        borderBottomWidth: 4,
        borderColor: "#F8B52D",
        borderRadius: 15,
        justifyContent: 'center',
        width: '15%',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '3%',
        marginVertical: '5%'
    },
    buttonText: {
        fontSize: 22,
        textAlign: 'center',
    },
    smallButtonText: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: '3%'
    },
    deleteView: {
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
        padding: '3%',
        marginVertical: '3%',
        borderWidth: 0.4,
        borderBottomWidth: 4,
        borderRadius: 15,
        backgroundColor: '#a1271f',
        borderColor: '#751a14',
        width: '18%',
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '80%',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '5%',
        borderBottomWidth: 0.5,
    },
    closeButton: {
        marginTop: 15,
        alignSelf: 'center',
    }

});

export default WidgetOrder;