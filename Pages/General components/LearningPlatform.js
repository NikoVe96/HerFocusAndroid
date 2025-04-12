import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Image } from "react-native";

const LearningPlatform = ({ navigation }) => {

    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);

    return (
        <View>
            <Text
                style={[
                    styles.title,
                    { color: colors.darkText, fontSize: 22 * scaleFactor },
                ]}>
                Igennem vores læringsplatform kan du lære en masse om kvinder og AD(H)D, og hvordan man kan blive bedre til at takle de tilhørende udfordringer.
            </Text>
            <TouchableOpacity
                style={styles.press}
                onPress={() => navigation.navigate('Pick module')}>
                <View
                    style={[styles.buttonContainer, { backgroundColor: colors.middle, borderColor: colors.middleShadow }]}>
                    <Text
                        style={[
                            styles.text,
                            { color: colors.darkText, fontSize: 20 * scaleFactor },
                        ]}>
                        Læringsmoduler
                    </Text>
                    <Image
                        source={require('../../Assets/images/icons/cap.png')}
                        style={[
                            styles.images,
                            {
                                width: 80 * scaleFactor,
                                height: 70 * scaleFactor,
                            },
                        ]}></Image>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.press}
                onPress={() => navigation.navigate('Pick topic')}>
                <View
                    style={[styles.buttonContainer, { backgroundColor: colors.middle, borderColor: colors.middleShadow }]}>
                    <Text
                        style={[
                            styles.text,
                            { color: colors.darkText, fontSize: 20 * scaleFactor },
                        ]}>
                        Artikler
                    </Text>
                    <Image
                        source={require('../../Assets/images/icons/newspaper.png')}
                        style={[
                            styles.images,
                            {
                                width: 80 * scaleFactor,
                                height: 70 * scaleFactor,
                            },
                        ]}></Image>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderWidth: 0.4,
        width: '85%',
        borderBottomWidth: 4,
        alignSelf: "center",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "#F8B52D",
        borderRadius: 15,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.10,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        flexDirection: 'row'

    },
    title: {
        paddingHorizontal: '2%',
        textAlign: 'center',
        marginTop: '7%',
        marginBottom: '15%'
    },
    images: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
    },
    text: {
        textAlign: 'center',
        marginLeft: 20,
    },
    press: {
        marginBottom: 15,
    },
})

export default LearningPlatform;