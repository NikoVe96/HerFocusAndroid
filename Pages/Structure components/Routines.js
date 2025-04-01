import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions, ScrollView } from 'react-native';
import MyRoutines from './MyRoutines';
import RoutineTemplates from './RoutineTemplates';
import { useTheme } from '@react-navigation/native';

const Routines = () => {

    const [enabled, setEnabled] = useState('my routines');
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);

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

export default Routines;