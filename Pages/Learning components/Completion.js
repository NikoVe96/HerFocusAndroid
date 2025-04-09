import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

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
                source={require('../../Assets/images/fireworks.png')}
                style={{
                    width: width,
                    height: 270 * scaleFactor,
                    alignSelf: 'center',
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: '3%' }}>
                <TouchableOpacity onPress={onBack} style={{ /* button style here */ }}>
                    <Text style={{ fontSize: 20 * scaleFactor, color: colors.darkText }}>Tilbage</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onComplete} style={{ /* button style here */ }}>
                    <Text style={{ fontSize: 20 * scaleFactor, color: colors.darkText }}>Færdiggør modulet</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CompletionSlide;
