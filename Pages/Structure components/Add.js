import { useState } from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import { AddItem } from "./AddItem";
import { useTheme } from "@react-navigation/native";

export const Add = () => {

    const [enabled, setEnabled] = useState('to-do');
    const { colors } = useTheme();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ alignItems: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 24, color: 'white', marginTop: 15 }}>
                        Tilføj en ny {enabled}
                    </Text>
                    <View style={{ flexDirection: 'row', top: '2%' }}>

                        <TouchableOpacity style={{
                            backgroundColor: enabled == 'to-do' ? colors.dark : colors.light,
                            padding: '2%', borderWidth: 1, borderColor: colors.dark, borderTopLeftRadius: 10, borderBottomLeftRadius: 10
                        }}
                            onPress={() => setEnabled('to-do')}>
                            <Text style={{ fontSize: 18, color: enabled == 'to-do' ? colors.lightText : colors.darkText }}>To-do</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: enabled == 'begivenhed' ? colors.dark : colors.light,
                            padding: '2%', borderWidth: 1, borderColor: colors.dark,
                        }}
                            onPress={() => setEnabled('begivenhed')}>
                            <Text style={{ fontSize: 18, color: enabled == 'begivenhed' ? colors.lightText : colors.darkText }}>Begivenhed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: enabled == 'rutine' ? colors.dark : colors.light,
                            padding: '2%', borderWidth: 1, borderColor: colors.dark, borderTopRightRadius: 10, borderBottomRightRadius: 10
                        }}
                            onPress={() => setEnabled('rutine')}>
                            <Text style={{ fontSize: 18, color: enabled == 'rutine' ? colors.lightText : colors.darkText }}>Rutine</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <AddItem item={enabled} />
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        width: 300,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
    },
})

export default Add;