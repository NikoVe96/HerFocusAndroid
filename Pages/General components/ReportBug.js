import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from "react-native";
import Parse from 'parse/react-native';
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";


const ReportBug = () => {
    const [description, setDescription] = useState('');
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);


    async function addReport() {
        const report = new Parse.Object('Feedback');

        try {
            report.set('description', description);
            report.set('resolved', false);

            await report.save();

            Alert.alert('Din feedback er blevet sendt! Tak for hjælpen :-)');
            console.log('Report saved successfully')
            setDescription('');
        } catch (error) {
            console.log('Error, could not save report: ' + error);
            Alert.alert('Der skete en fejl.')
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
                <Text style={[styles.header, { color: colors.darkText, fontSize: 26 * scaleFactor }]}>
                    Feedback til app'en
                </Text>
                <Text style={[styles.text, { color: colors.darkText, fontSize: 16 * scaleFactor }]}>
                    Her kan du rapportere en fejl du finder i app'en, eller komme med ønsker og ideer til app'en.
                </Text>
                <Text style={[styles.text, { color: colors.darkText, fontSize: 16 * scaleFactor }]}>
                    Hvis du skal rapportere en fejl, så beskriv gerne i detaljer hvad fejlen er, hvordan den opstod og hvordan app'en
                    reagerede/så ud da fejlen opstod.
                </Text>
                <TextInput
                    style={styles.inputField}
                    onChangeText={(text) => setDescription(text)}
                    multiline={true}
                    value={description}
                />
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.dark, borderColor: colors.darkShadow }]}
                    onPress={() => addReport()}>
                    <Text style={[styles.text, { color: colors.darkText, fontSize: 20 * scaleFactor }]}>
                        Indsend
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );

}

export default ReportBug;

const styles = StyleSheet.create({
    header: {
        marginVertical: '8%',
        textAlign: 'center'
    },
    text: {
        marginVertical: '3%',
        textAlign: 'center',
        marginHorizontal: '5%'
    },
    inputField: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        padding: '4%',
        fontSize: 14,
        marginHorizontal: '5%',
        height: '40%',
        textAlignVertical: 'top'
    },
    button: {
        borderWidth: 1,
        borderBottomWidth: 4,
        borderRadius: 15,
        elevation: 5,
        width: '30%',
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '10%',
        marginBottom: 50
    },
})