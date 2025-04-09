import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const NavigationButtons = ({ scaleFactor, colors, onBack, onNext }) => {
    const buttonStyle = {
        marginTop: '2%',
        marginRight: '2%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        backgroundColor: colors.dark,
        borderColor: colors.dark,
    };

    const textStyle = { fontSize: 20 * scaleFactor, color: colors.darkText };

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'baseline',
            marginVertical: '3%'
        }}>
            <TouchableOpacity style={buttonStyle} onPress={onBack}>
                <Text style={textStyle}>Tilbage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttonStyle} onPress={onNext}>
                <Text style={textStyle}>Næste</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NavigationButtons;
