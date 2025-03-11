import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const WeeklyCalendar = ({
    today,
    onDateSelected,
    sorting,
    setSorting,
    sortingOptions,
    open,
    setOpen,
    sortEventView,
    colors,
}) => {
    return (
        <View>
            <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{
                    type: 'border',
                    duration: 200,
                    borderWidth: 1,
                    borderHighlightColor: 'white',
                }}
                style={{
                    height: 100,
                    padding: 5,
                    marginTop: '2%',
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: colors.mainButton,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    elevation: 5,
                }}
                calendarHeaderStyle={{ color: 'white', fontSize: 20 }}
                calendarColor={colors.mainButton}
                dateNumberStyle={{ color: 'white', fontSize: 18 }}
                dateNameStyle={{ color: 'white', fontSize: 12 }}
                highlightDateNumberStyle={{ color: colors.bars, fontSize: 16 }}
                highlightDateNameStyle={{ color: colors.bars, fontSize: 9 }}
                iconContainer={{ flex: 0.1 }}
                onDateSelected={onDateSelected}
                scrollable={true}
                selectedDate={today}
            />
            <View
                style={{
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderColor: 'white',
                    marginHorizontal: 10,
                    elevation: 5,
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        marginVertical: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginHorizontal: 10,
                    }}
                >
                    <View
                        style={{
                            flex: 6,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 24,
                                color: colors.bars,
                                flex: 6,
                                marginLeft: '5%',
                            }}
                        >
                            Dagens planer
                        </Text>
                        <DropDownPicker
                            open={open}
                            value={sorting}
                            items={sortingOptions}
                            setOpen={setOpen}
                            setValue={setSorting}
                            setItems={() => { }}
                            placeholder={<FontAwesomeIcon icon={faFilter} size={20} color={colors.bars} />}
                            style={{ width: '100%', borderColor: colors.border, elevation: 5 }}
                            containerStyle={{ width: '30%' }}
                            textStyle={{ fontSize: 18 }}
                        />
                    </View>
                </View>
                <ScrollView style={{ height: 250 }}>{sortEventView()}</ScrollView>
            </View>
        </View>
    );
};

export default WeeklyCalendar;
