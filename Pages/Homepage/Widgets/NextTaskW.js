import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStopwatch, faFaceTired } from '@fortawesome/free-solid-svg-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useTheme } from '@react-navigation/native';
import HitTheWall from '../../Structure components/HitTheWall';
import Modal from "react-native-modal";

const NextTaskW = ({
    remainingTasksArray,
    checked,
    taskCompleted,
}) => {
    const { colors } = useTheme();
    const [isWallModalVisible, setWallModalVisible] = useState(false);
    const [wallTask, setWallTask] = useState();

    const showWallModal = (task) => {
        setWallTask(task);
        setWallModalVisible(true);
    };

    return (
        <View style={[styles.widget, { borderColor: colors.middle, backgroundColor: colors.light }]}>
            {remainingTasksArray.length < 1 ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 20, color: colors.darkText }}>
                        Du har ingen to-do's på din liste
                    </Text>
                </View>
            ) : (
                <>
                    <Text
                        style={{
                            fontSize: 28,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            marginVertical: 10,
                            marginBottom: 10,
                            color: colors.darkText
                        }}>
                        Næste to-do
                    </Text>
                    <View style={styles.rowView}>
                        <Text style={{ fontSize: 36, color: colors.darkText }}>
                            {remainingTasksArray[0].get('emoji')}
                        </Text>
                        <Text style={{ fontSize: 26, marginHorizontal: 10, color: colors.darkText }}>
                            {remainingTasksArray[0].get('name')}
                        </Text>
                    </View>
                    <View style={styles.rowView}>
                        <FontAwesomeIcon
                            icon={faStopwatch}
                            size={25}
                            style={{ marginHorizontal: 5 }}
                            color={colors.dark}
                        />
                        <Text style={{ fontSize: 18, color: colors.darkText }}>
                            Fra {remainingTasksArray[0].get('startTime')}
                            {' '}til {remainingTasksArray[0].get('endTime')}

                        </Text>
                    </View>
                    {remainingTasksArray[0].get('description') == '' ?
                        <Text style={{ marginBottom: '10%', color: colors.darkText }}></Text>
                        : <ScrollView
                            contentContainerStyle={{
                                borderWidth: 1,
                                borderColor: colors.dark,
                                borderRadius: 10,
                                padding: 10,
                                marginHorizontal: 10,
                                width: 250,
                                backgroundColor: colors.lightMiddle
                            }}>
                            <Text style={{ fontSize: 16, marginBottom: 20, color: colors.darkText }}>{remainingTasksArray[0].get('description')}</Text>
                        </ScrollView>
                    }
                    <View style={[styles.rowView, { paddingBottom: '5%' }]}>
                        <View
                            style={styles.rowView}>
                            <BouncyCheckbox
                                key={remainingTasksArray[0].id}
                                size={25}
                                fillColor={colors.dark}
                                unfillColor={colors.light}
                                iconStyle={{ borderColor: colors.middle }}
                                innerIconStyle={{ borderWidth: 2 }}
                                onPress={() => taskCompleted(remainingTasksArray[0])}
                                isChecked={checked}
                            />
                            <Text style={{ fontSize: 18, color: colors.darkText }}>Fuldført?</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.rowView, { marginLeft: 20, }]}
                            onPress={() => showWallModal(remainingTasksArray[0])}>
                            <FontAwesomeIcon
                                icon={faFaceTired}
                                size={25}
                                color={colors.dark}
                            />
                            <Text style={{ fontSize: 18, marginLeft: 12, color: colors.darkText }}>
                                Ramt væggen?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            <Modal
                isVisible={isWallModalVisible}
                onBackdropPress={() => setWallModalVisible(false)}
                backdropColor={colors.light}
                animationType="slide"
                style={{ backgroundColor: 'white', borderColor: 'white', borderRadius: 10, marginVertical: 100 }}
            >
                <HitTheWall
                    wallTask={wallTask}
                    onClose={() => setWallModalVisible(false)}

                />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 5,
        alignItems: 'center',
    },
    emoji: {
        fontSize: 36,
    },
    taskName: {
        fontSize: 26,
        marginHorizontal: 10,
    },
    taskTime: {
        fontSize: 18,
    },
    descriptionContainer: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    rowText: {
        fontSize: 18,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    widget: {
        padding: 10,
        backgroundColor: '#FFF6ED',
        elevation: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
    },
    upNext: {
        //margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        elevation: 10,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
    },
    rowView: {
        flexDirection: 'row',
        //alignContent: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        //marginVertical: 10
    },
});


export default NextTaskW;