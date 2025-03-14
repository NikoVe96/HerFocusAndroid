import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DailyOverview from "./Widgets/DailyOverviewW";
import Mood from "./Widgets/MoodW";
import { useNavigation, useTheme } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFilter, faGear } from '@fortawesome/free-solid-svg-icons';

function Home() {

    const navigation = useNavigation();
    const { colors } = useTheme();
    const [sorting, setSorting] = useState('boxes');
    const [open, setOpen] = useState(false);
    const [sortingOptions, setSortingOptions] = useState([
        { label: 'Liste', value: 'list' },
        { label: 'Ruder', value: 'boxes' }
    ]);

    return (
        <SafeAreaView>
            <ScrollView>

                <Text style={styles.header}>
                    Hej Niko!
                </Text>
                <Text style={styles.text}>
                    Hvordan har du det i dag?
                    Er du klar til at tackle dagen?
                </Text>
                <View style={styles.divider} />
                <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: '5%', marginBottom: '5%' }}>
                    <FontAwesomeIcon
                        icon={faGear} size={25} />
                </TouchableOpacity>
                <View>
                    <TouchableOpacity style={styles.widget}>
                        <DailyOverview />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.widget}>
                        <Mood />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}

export default Home;

const styles = StyleSheet.create({
    header: {
        fontSize: 35,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: '5%',
    },
    text: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: '5%',
        textAlign: 'center'
    },
    divider: {
        borderWidth: 1,
        borderRadius: 10,
        width: '70%',
        alignSelf: 'center',
        marginVertical: '8%',
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: '2%',

    },
    widget: {
        flex: 1,
        marginHorizontal: '1%',
        padding: '2%'
    }
})