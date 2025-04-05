import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions, ScrollView, Modal } from 'react-native';
import MyRoutines from './MyRoutines';
import RoutineTemplates from './RoutineTemplates';
import { useTheme } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddItem from './AddItem';

const Routines = ({ navigation }) => {

    const [enabled, setEnabled] = useState('my routines');
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [emoji, setEmoji] = useState();
    const [routineSteps, setRoutineSteps] = useState([]);

    async function saveNewRoutine() {
        try {
            const currentUser = await Parse.User.currentAsync();
            const newRoutine = new Parse.Object('Routine');

            newRoutine.set('name', name);
            newRoutine.set('user', currentUser);
            newRoutine.set('emoji', emoji);
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

    function clearInput() {
        setName('');
        setEmoji('');
        setRoutineSteps([]);
    }

    return (
        <ScrollView>
            <View style={{ alignItems: 'center', padding: 10 }}>
                <Text
                    style={{
                        fontSize: 28 * scaleFactor,
                        color: colors.lightText,
                        marginVertical: '2%',
                    }}>
                    Rutiner
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: '5%', justifyContent: 'center' }}>
                <TouchableOpacity style={{
                    backgroundColor: enabled == 'my routines' ? colors.dark : colors.light,
                    padding: '2%', borderWidth: 1, borderColor: colors.dark, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: '45%', alignItems: 'center'
                }}
                    onPress={() => setEnabled('my routines')}>
                    <Text style={{ fontSize: 18, color: enabled == 'my routines' ? colors.lightText : colors.darkText }}>Mine rutiner</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: enabled == 'routine templates' ? colors.dark : colors.light,
                    padding: '2%', borderWidth: 1, borderColor: colors.dark, borderTopRightRadius: 10, borderBottomRightRadius: 10, width: '45%', alignItems: 'center'
                }}
                    onPress={() => setEnabled('routine templates')}>
                    <Text style={{ fontSize: 18, color: enabled == 'routine templates' ? colors.lightText : colors.darkText }}>Rutine skabeloner</Text>
                </TouchableOpacity>
            </View>
            <View>
                {enabled == 'my routines' ?
                    <MyRoutines />
                    : <RoutineTemplates />}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    addButton: {
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
        borderBottomWidth: 4,
        width: '15%',
        height: '20%',
        alignSelf: 'flex-end',
        marginHorizontal: '5%',
        marginVertical: '5%'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        //padding: '2%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '80%'
    },
})

export default Routines;