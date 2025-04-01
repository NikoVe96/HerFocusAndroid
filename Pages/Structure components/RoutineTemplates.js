import { useTheme } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AccordionItem from '../../Components/AccordionItem';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar, faPlus, faRotateRight, faStopwatch, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const RoutineTemplates = () => {
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const templates = [
        {
            name: 'Morgen rutine',
            emoji: '',
            steps: [
                { name: 'Stå op', time: '5' },
                { name: 'Spis morgenmad', time: '20' },
                { name: 'Spis morgenmad', time: '' },
            ]
        },
    ]

    return (
        <ScrollView>
            <View>
                {templates.map((routine, index) => (
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
                                                    {step.name}
                                                </Text>
                                            </View>
                                            {step.time !== '' ? (
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
                                                        {step.time}
                                                    </Text>
                                                </View>
                                            ) : null}
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </AccordionItem>
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
})

export default RoutineTemplates;