import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

const CompletionSlide = ({
    scaleFactor,
    colors,
    width,
    book,
    author,
    onBack,
    onComplete
}) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image
                source={require('../../Assets/images/icons/confetti(1).png')}
                style={{
                    width: 230 * scaleFactor,
                    height: 230 * scaleFactor,
                    alignSelf: 'center',
                    marginBottom: '8%'
                }}
            />
            <Text style={[{ fontSize: 22 * scaleFactor, color: colors.darkText, fontWeight: 'bold' }]}>
                Tillykke!
            </Text>
            <Text style={{ fontSize: 18, color: colors.darkText }}>
                Du har færdiggjort et læringsmodul!
            </Text>
            <Text style={{
                fontSize: 12,
                fontStyle: 'italic',
                marginTop: '15%',
                color: colors.darkText,
            }}>
                Materialet fra dette modul er fundet i bogen "{book}", som er skrevet af {author}
            </Text>
            <View style={{ flexDirection: 'row', marginVertical: '3%' }}>
                <TouchableOpacity
                    onPress={onBack}
                    style={[styles.button, { backgroundColor: colors.dark, borderColor: colors.darkShadow, marginRight: '20%' }]}>
                    <Text style={{ fontSize: 20 * scaleFactor, color: colors.darkText }}>Tilbage</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onComplete}
                    style={[styles.button, { backgroundColor: colors.dark, borderColor: colors.darkShadow }]}>
                    <Text style={{ fontSize: 20 * scaleFactor, color: colors.darkText }}>Fuldfør</Text>
                </TouchableOpacity>
            </View>
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
        //marginHorizontal: '10%'
    },
})

export default CompletionSlide;
