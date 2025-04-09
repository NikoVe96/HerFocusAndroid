import { useState, useEffect } from 'react';
import { useTheme } from "@react-navigation/native";
import { View, Dimensions, TouchableOpacity, Text } from "react-native";
import PickModule from './PickModule';
import CompletedModules from './CompletedModules';

const LearningOverview = () => {

    const [enabled, setEnabled] = useState('modules');
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);

    useEffect(() => {
        console.log('Current enabled state:', enabled);
    }, [enabled]);


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', marginVertical: '5%', justifyContent: 'center' }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: enabled === 'answers' ? colors.dark : colors.light,
                        padding: '2%',
                        borderWidth: 1,
                        borderColor: colors.dark,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        width: '45%',
                        alignItems: 'center',
                    }}
                    onPress={() => setEnabled('answers')}
                >
                    <Text style={{ fontSize: 18, color: enabled === 'answers' ? colors.lightText : colors.darkText }}>
                        Opgavesvar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: enabled === 'modules' ? colors.dark : colors.light,
                        padding: '2%',
                        borderWidth: 1,
                        borderColor: colors.dark,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        width: '45%',
                        alignItems: 'center',
                    }}
                    onPress={() => setEnabled('modules')}
                >
                    <Text style={{ fontSize: 18, color: enabled === 'modules' ? colors.lightText : colors.darkText }}>
                        Læringsmoduler
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                {enabled === 'answers' ? <CompletedModules /> : <PickModule />}
            </View>
        </View>
    );

}

export default LearningOverview;