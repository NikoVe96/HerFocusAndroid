import { View, Dimensions, Text, StyleSheet } from "react-native";
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';

export const TaskProgress = ({ taskProgress }) => {

    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const { colors } = useTheme();

    return (
        <View style={[styles.widget, { borderColor: colors.middle, backgroundColor: colors.light }]}>
            <CircularProgress
                value={taskProgress}
                inActiveStrokeColor={colors.middle}
                inActiveStrokeOpacity={0.3}
                progressValueColor={colors.darkText}
                valueSuffix={'%'}
                activeStrokeColor={colors.darkText}
                activeStrokeSecondaryColor={colors.middle}
                radius={70 * scaleFactor}
            />
            <View>
                {taskProgress == 0 ?
                    <Text style={[styles.text, { color: colors.darkText }]}>
                        Velkommen til en ny dag. Check din første to-do af for at få en
                        god start på dagen!
                    </Text>
                    : taskProgress == 100 ?
                        <Text
                            style={{ fontSize: 18, textAlign: 'center', marginVertical: 10 }}>
                            Du har klaret alle dine to-do's i dag. Godt arbejde! Nu kan du
                            holde fri med god samvittighed.
                        </Text>
                        :
                        <Text
                            style={{ fontSize: 18, textAlign: 'center', marginVertical: 10 }}>
                            Du har klaret {taskProgress}% af dine opgaver i dag. Godt arbejde!
                        </Text>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10
    },
    widget: {
        padding: 10,
        elevation: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
    }
});

export default TaskProgress;