import { useTheme } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AccordionItem from '../../Components/AccordionItem';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar, faPlus, faRotateRight, faStopwatch, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Parse from 'parse/react-native';

const RoutineTemplates = () => {
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const templates = [
        {
            name: 'Morgen rutine',
            emoji: '',
            steps: [
                { stepName: 'Stå op', stepTime: '5', checked: false },
                { stepName: 'Spis morgenmad', stepTime: '10', checked: false },
            ],
            color: '#fkdjfg'
        },
    ]

    async function addRoutine(routine) {
        try {
            const currentUser = await Parse.User.currentAsync();
            const newRoutine = new Parse.Object('Routine');

            newRoutine.set('name', routine.name);
            newRoutine.set('user', currentUser);
            newRoutine.set('emoji', routine.emoji);
            newRoutine.set('color', routine.color);
            newRoutine.set('routineSteps', routine.steps);
            newRoutine.set('type', 'routine');
            await newRoutine.save();

            Alert.alert('Rutinen er blevet tilføjet til "Mine rutiner"!')
        } catch (error) {
            console.log('Error saving new routine: ', error);
            Alert.alert('Hovsa!',
                'Der skete en fejl.')
        }
    }

    return (
        <ScrollView>
            <View>
                <Text style={{ color: colors.darkText, fontSize: 16, textAlign: 'center' }}>
                    Her finder du en masse forslag til hvordan forskellige rutiner kunne se ud.
                    Du kan kopiere dem ind til dine egne rutiner og redigere i rutines steps, ved at
                    klikke på +'et.
                </Text>
                {templates.map((routine, index) => (
                    <View style={{ flexDirection: 'row' }}>
                        <AccordionItem
                            key={index}
                            title={routine.name}
                            //emoji={routine.get('emoji')}
                            icon={null}
                            emojiStyle={{ fontSize: 35 * scaleFactor }}
                            titleStyle={{ fontSize: 24 * scaleFactor, color: colors.darkText }}>
                            <View
                                style={[styles.outerView, {
                                    backgroundColor: colors.middle,
                                    borderColor: colors.middleShadow,

                                }]}>
                                <ScrollView
                                    style={{
                                        height:
                                            routine.steps.length > 4
                                                ? 250 * scaleFactor
                                                : null,
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => addRoutine(routine)}
                                        style={[
                                            styles.plusBtn,
                                            {
                                                backgroundColor: colors.lightMiddle,
                                                borderColor: colors.lightMiddleShadow,
                                            },
                                        ]}>
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            size={25 * scaleFactor}
                                            color={colors.darkText}
                                        />
                                    </TouchableOpacity>
                                    {routine.steps.map((step, index) => (
                                        <View key={index} style={{ flexDirection: 'row' }}>
                                            <View
                                                style={[styles.taskView, {
                                                    backgroundColor: colors.light,
                                                    borderColor: colors.lightShadow,
                                                }]}>
                                                <View style={{ justifyContent: 'center' }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 18 * scaleFactor,
                                                            color: colors.darkText,
                                                        }}>
                                                        {step.stepName}
                                                    </Text>
                                                </View>
                                                {step.stepTime !== '' ? (
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            width: '20%',
                                                            alignItems: 'center',
                                                            //marginLeft: '45%',
                                                            alignSelf: 'flex-end'
                                                        }}>
                                                        <FontAwesomeIcon
                                                            icon={faStopwatch}
                                                            style={{ marginHorizontal: 5 }}
                                                            size={20 * scaleFactor}
                                                            color={colors.dark}
                                                        />
                                                        <Text
                                                            style={{
                                                                fontSize: 18 * scaleFactor,
                                                                color: colors.darkText,
                                                            }}>
                                                            {step.stepTime}
                                                        </Text>
                                                    </View>
                                                ) : null}
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </AccordionItem>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    outerView: {
        borderWidth: 1,
        borderRadius: 10,
        padding: '2%',
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
    },
    taskView: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: '2%',
        marginHorizontal: '5%',
        flexDirection: 'row',
        elevation: 5,
        justifyContent: 'space-between',
        width: '90%',
    },
    plusBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'flex-end',
        padding: 10,
        marginVertical: '2%',
        //marginHorizontal: '5%',
        marginRight: '5%',
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        borderBottomWidth: 4
    },
})

export default RoutineTemplates;