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
                    <Text style={{ fontSize: 24, color: colors.text, marginTop: 15 }}>
                        Tilføj en ny {enabled}
                    </Text>
                    <View style={{ flexDirection: 'row', top: '2%' }}>

                        <TouchableOpacity style={{
                            backgroundColor: enabled == 'to-do' ? colors.mainButton : colors.subButton,
                            padding: '2%', borderWidth: 1, borderColor: colors.border, borderTopLeftRadius: 10, borderBottomLeftRadius: 10
                        }}
                            onPress={() => setEnabled('to-do')}>
                            <Text style={{ fontSize: 18 }}>To-do</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: enabled == 'begivenhed' ? colors.mainButton : colors.subButton,
                            padding: '2%', borderWidth: 1, borderColor: colors.border,
                        }}
                            onPress={() => setEnabled('begivenhed')}>
                            <Text style={{ fontSize: 18 }}>Begivenhed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: enabled == 'rutine' ? colors.mainButton : colors.subButton,
                            padding: '2%', borderWidth: 1, borderColor: colors.border, borderTopRightRadius: 10, borderBottomRightRadius: 10
                        }}
                            onPress={() => setEnabled('rutine')}>
                            <Text style={{ fontSize: 18 }}>Rutine</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={[
                        styles.border,
                        { backgroundColor: colors.border, borderColor: colors.border },
                    ]}></View>
                <AddItem item={enabled} />
            </ScrollView>
        </SafeAreaView>
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