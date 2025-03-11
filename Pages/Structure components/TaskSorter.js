import React from 'react';
import { View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';

const TaskSorter = ({
    dayTasksArray,
    allDayArray,
    completeTask,
    colors,
    LightenDarkenColor,
    sorting,
}) => {
    // Example: sorting by time (tid). You can expand this to handle other sorting types.
    if (sorting === 'tid') {
        return (
            <View>
                {dayTasksArray.length === 0 && allDayArray.length === 0 ? (
                    <View
                        style={{
                            marginHorizontal: 15,
                            alignItems: 'center',
                            marginVertical: '25%',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>
                            Der er ingen opgaver eller begivenheder i din kalender i dag!
                        </Text>
                    </View>
                ) : (
                    <View>
                        {/* Render all-day events */}
                        {allDayArray.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    padding: 5,
                                    marginVertical: 5,
                                    marginHorizontal: 15,
                                    flexDirection: 'row',
                                    backgroundColor: item.get('color'),
                                    borderRadius: 10,
                                    borderColor: item.get('color'),
                                }}
                            >
                                <Text style={{ fontSize: 20, marginRight: 10, marginLeft: 2, color: colors.text }}>
                                    {item.get('emoji')}
                                </Text>
                                <Text style={{ fontSize: 18, paddingRight: 5, color: colors.text }}>
                                    {item.get('name')}
                                </Text>
                            </View>
                        ))}
                        {dayTasksArray.length === 0 ? null : (
                            <View
                                style={{
                                    borderWidth: 1,
                                    marginHorizontal: 15,
                                    marginVertical: 20,
                                    backgroundColor: colors.border,
                                    width: 250,
                                    alignSelf: 'center',
                                    borderColor: colors.border,
                                    borderRadius: 10,
                                }}
                            />
                        )}
                        {/* Render day tasks */}
                        {dayTasksArray.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row' }}>
                                {item.get('type') === 'task' ? (
                                    <BouncyCheckbox
                                        size={30}
                                        fillColor={colors.mainButton}
                                        unfillColor={colors.mainButton}
                                        iconStyle={{ elevation: 5 }}
                                        innerIconStyle={{ borderWidth: 15, borderColor: item.get('color') }}
                                        textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                                        onPress={() => completeTask(item)}
                                        isChecked={item.get('completed')}
                                        style={{ marginHorizontal: 10, flex: 0.5 }}
                                    />
                                ) : (
                                    <View style={{ marginLeft: '11%' }} />
                                )}
                                {item.get('type') === 'routine' ? (
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            borderWidth: 1,
                                            marginVertical: 5,
                                            marginHorizontal: 15,
                                            flexDirection: 'row',
                                            backgroundColor: item.get('color'),
                                            borderRadius: 10,
                                            borderColor: item.get('color'),
                                            elevation: 5,
                                        }}
                                    >
                                        {/* You could also extract your AccordionItem as a separate component */}
                                        <Text style={{ fontSize: 18, color: colors.text }}>{item.get('name')}</Text>
                                    </View>
                                ) : (
                                    <View
                                        style={{
                                            flex: 7,
                                            padding: '3%',
                                            borderWidth: 1,
                                            marginVertical: 5,
                                            marginHorizontal: 15,
                                            backgroundColor: item.get('color'),
                                            borderRadius: 10,
                                            borderColor: item.get('color'),
                                            elevation: 5,
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Text style={{ fontSize: 22, marginRight: 10, color: colors.text }}>
                                            {item.get('emoji')}
                                        </Text>
                                        <View>
                                            <Text style={{ fontSize: 18, paddingRight: 5, color: colors.text }}>
                                                {item.get('name')}
                                            </Text>
                                            <Text style={{ marginHorizontal: 1, fontSize: 14, color: colors.text }}>
                                                {item.get('startTime')} - {item.get('endTime')}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </View>
        );
    } else {
        // Add alternative sorting view if needed.
        return <View>{/* Alternative sorted view here */}</View>;
    }
};

export default TaskSorter;