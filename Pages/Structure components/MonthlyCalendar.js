import React, { useContext, useState, d } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Calendar, LocaleConfig, CalendarContext } from 'react-native-calendars';

const MonthlyCalendar = ({ }) => {

    const today = new Date;
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    LocaleConfig.locales['da'] = {
        monthNames: [
            'Januar',
            'Februar',
            'Marts',
            'April',
            'Maj',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'December'
        ],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec'],
        dayNames: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag',],
        dayNamesShort: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør',],
        today: "I dag"
    }

    LocaleConfig.defaultLocale = 'da';

    return (
        <Calendar
            firstDay={1}
            headerStyle={{
                backgroundColor: colors.dark,
                borderWidth: 1,
                borderColor: colors.dark,
                borderRadius: 10,
            }}
            enableSwipeMonths={true}
            onDayPress={onDayPress}
            style={{
                padding: 20,
                marginVertical: 20,
                borderWidth: 1,
                marginHorizontal: 5,
                borderRadius: 10,
                borderColor: 'white',
            }}
            markingType="multi-dot"
            theme={{
                selectedDayBackgroundColor: colors.dark,
                arrowColor: colors.dark,
                selectedDayTextColor: colors.light,
                dayTextColor: colors.dark,
                dotColor: 'black',
                indicatorColor: colors.dark,
                todayTextColor: colors.light,
                textMonthFontSize: 24 * scaleFactor,
                textDayFontSize: 18 * scaleFactor,
                textDayHeaderFontSize: 18 * scaleFactor,
                todayBackgroundColor: colors.dark,
            }}
            markedDates={markedDates}
        />
    );
};

export default MonthlyCalendar;
