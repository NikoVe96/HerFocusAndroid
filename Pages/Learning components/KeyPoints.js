import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, Text, ScrollView, Image, Dimensions } from "react-native";

const KeyPoints = ({ keyPoints }) => {

    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const { colors } = useTheme();

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ alignItems: 'center' }}>
                <Text
                    style={[
                        styles.takeawayHeader,
                        { fontSize: 22 * scaleFactor, color: colors.darkText },
                    ]}>
                    Her er der {keyPoints.length} takeaways fra dette modul
                </Text>
                {keyPoints.map((item, index) => {
                    return (
                        <View
                            style={[
                                styles.keyTakeaways,
                                {
                                    backgroundColor: colors.middle,
                                    borderColor: colors.middle,
                                },
                            ]}
                            key={index}>
                            <Text
                                style={[
                                    styles.takeawayHeader,
                                    { fontSize: 22 * scaleFactor, color: colors.darkText },
                                ]}>
                                Takeaway {index + 1}
                            </Text>
                            <Text style={[styles.text, { color: colors.darkText, fontSize: 16 * scaleFactor }]}>{item}</Text>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    keyTakeaways: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
    },
    takeawayHeader: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
        padding: 5,
    },
})

export default KeyPoints;