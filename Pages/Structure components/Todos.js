import { useTheme } from '@react-navigation/native';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Alert,
    Dimensions
} from 'react-native';
import { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import AddTask from './AddTask';
import Parse from 'parse/react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import BottomNavigation from '../../Navigation/BottomNav';
import CircularProgress from 'react-native-circular-progress-indicator';
import Swiper from 'react-native-swiper';

export const Todos = ({ navigation }) => {

    const { colors } = useTheme();
    const [toDoList, setToDoList] = useState([]);
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const [isToDoModalVisible, setToDoModalVisible] = useState(false);
    const [taskProgress, setTaskProgress] = useState(0);

    useEffect(() => {
        ToDoQuery();
    }, []);

    async function ToDoQuery() {
        const currentUser = await Parse.User.currentAsync();

        let todoQuery = new Parse.Query('Task');
        todoQuery.equalTo('user', currentUser);
        todoQuery.equalTo('futureTask', true);
        const todoResult = await todoQuery.find();
        console.log('todos: ' + todoResult);

        setToDoList(todoResult);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text
                    style={[
                        styles.title,
                        { color: colors.text, fontSize: 30 * scaleFactor },
                    ]}>
                    To-do's
                </Text>
                <View style={{ alignItems: 'center', marginBottom: '5%' }}>
                    <CircularProgress
                        value={taskProgress}
                        inActiveStrokeColor={colors.subButton}
                        inActiveStrokeOpacity={0.3}
                        progressValueColor={colors.mainButton}
                        valueSuffix={'%'}
                        activeStrokeColor={colors.border}
                        activeStrokeSecondaryColor={colors.subButton}
                        radius={60 * scaleFactor}
                    />
                </View>
                <View
                    style={[
                        styles.upNext,
                        {
                            shadowColor: colors.border,
                            borderColor: colors.subButton,
                            backgroundColor: colors.subButton,
                        },
                    ]}>
                    <Swiper
                        loop={false}
                        showsPagination={true}
                        dotStyle={{
                            backgroundColor: colors.mainButton,
                            width: '40%',
                            height: '100%',
                            borderRadius: 4,
                            marginHorizontal: 4,
                        }}
                        activeDotStyle={{
                            backgroundColor: colors.border,
                            width: '40%',
                            height: '100%',
                            borderRadius: 4,
                            marginHorizontal: 4,
                        }}
                        paginationStyle={{ bottom: 10 }}>
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Text style={{ fontSize: 30 }}>Todo 1</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Text style={{ fontSize: 30 }}>Todo 2</Text>
                        </View>
                    </Swiper>
                </View>
                {toDoList.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                        <BouncyCheckbox
                            size={30}
                            fillColor={colors.mainButton}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: 'black' }}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                            onPress={isChecked => { }}
                            style={{ marginHorizontal: 10, flex: 0.5 }}
                        />
                        <TouchableOpacity
                            style={{
                                flex: 7,
                                alignItems: 'center',
                                padding: 2,
                                borderWidth: 1,
                                padding: 5,
                                marginVertical: 5,
                                marginHorizontal: 15,
                                flexDirection: 'row',
                                backgroundColor: item.get('color'),
                                borderRadius: 10,
                                borderColor: item.get('color'),
                                elevation: 10,
                            }}
                            onLongPress={() => toCalendarModal(item)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, marginRight: 10 }}>
                                    {item.get('emoji')}
                                </Text>
                                <Text style={{ marginHorizontal: 1, fontSize: 14 }}>
                                    {item.get('startTime')} - {item.get('endTime')}
                                </Text>
                            </View>
                            <Text style={{ fontSize: 24, marginHorizontal: 5 }}>|</Text>
                            <Text style={{ fontSize: 18 }}>{item.get('name')}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity
                    style={[styles.addTodo, { backgroundColor: colors.mainButton }]}
                    onPress={() => setToDoModalVisible(true)}>
                    <Text style={{ fontSize: 18 }}>Tilføj en ny to-do</Text>
                </TouchableOpacity>
                <Modal
                    isVisible={isToDoModalVisible}
                    onBackdropPress={() => setToDoModalVisible(false)}>
                    <View
                        style={{
                            backgroundColor: colors.background,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: colors.background,
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            height: 500
                        }}>
                        <AddTask />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.border,
                            alignItems: 'center',
                            height: '7%',
                            justifyContent: 'center',
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                        }}
                        onPress={() => setToDoModalVisible(false)}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                            LUK
                        </Text>
                    </TouchableOpacity>
                </Modal>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        marginBottom: 15,
        marginTop: 35,
    },
    rowView: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonSmall: {
        justifyContent: 'center',
        padding: 5,
        height: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        elevation: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
    },
    seperator: {
        width: 250,
        height: 1,
        marginBottom: 5,
        marginTop: 5,
    },
    addTodo: {
        width: '50%',
        borderRadius: 10,
        padding: 10,
        elevation: 10,
        marginVertical: '20%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    upNext: {
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        elevation: 10,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        height: 200,
        marginBottom: '5%'
    },
});

export default Todos;