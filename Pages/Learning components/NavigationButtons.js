import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NavigationButtons = ({ scaleFactor, onBack, onNext }) => {
    const { colors } = useTheme();

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'baseline',
            marginTop: '5%',
            marginBottom: '20%'
        }}>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.dark, borderColor: colors.darkShadow }]} onPress={onBack}>
                <Text style={{ fontSize: 20 * scaleFactor, color: colors.lightText }}>Tilbage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.dark, borderColor: colors.darkShadow }]} onPress={onNext}>
                <Text style={{ fontSize: 20 * scaleFactor, color: colors.lightText }}>Næste</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: '2%',
        marginRight: '2%',
        borderWidth: 1,
        borderBottomWidth: 4,
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
    },
    text: {

    }
})

export default NavigationButtons;
