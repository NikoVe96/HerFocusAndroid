import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, differenceInCalendarDays, addDays } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleCheck, faGear } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "@react-navigation/native";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

export const Streak = () => {

    const [streak, setStreak] = useState(0);
    const [streakDays, setStreakDays] = useState([]);
    const bobAnimation = useRef(new Animated.Value(1)).current;
    const { colors } = useTheme();

    useEffect(() => {
        initializeStreak();
    });

    const initializeStreak = async () => {
        const today = new Date();
        const lastOpened = await AsyncStorage.getItem("lastOpened");
        const storedStreak = parseInt(
            (await AsyncStorage.getItem("streak")) || "0",
            10
        );
        const startDay = new Date(
            (await AsyncStorage.getItem("startDay")) || today
        );

        let newStreak = storedStreak;
        let newStartDay = startDay;

        if (lastOpened) {
            const lastDate = new Date(lastOpened);
            const dayDifference = differenceInCalendarDays(today, lastDate);

            if (dayDifference === 1) {
                newStreak++; // Continue the streak
                bob();
            } else if (dayDifference > 1) {
                newStreak = 1; // Reset the streak
                newStartDay = today;
            }
        } else {
            newStreak = 1; // First-time initialization
        }

        await AsyncStorage.multiSet([
            ["streak", newStreak.toString()],
            ["startDay", newStartDay.toISOString()],
            ["lastOpened", today.toISOString()],
        ]);

        setStreak(newStreak);
        setStreakDays(generateStreakDays(newStartDay, newStreak));
    };

    const generateStreakDays = (startDay, streakCount) => {
        return Array.from({ length: 7 }, (_, i) => ({
            day: addDays(startDay, i),
            completed: i < (streakCount % 7 || 7),
        }));
    };

    const bob = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bobAnimation, {
                    toValue: 1.2,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(bobAnimation, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]),
            { iterations: 2 }
        ).start();
    };

    const renderDay = ({ item, index }) => {
        const isLastDayOfStreak = index === (streak - 1) % 7;

        return (
            <View style={styles.dayContainer}>
                <Animated.View
                    style={
                        isLastDayOfStreak
                            ? { transform: [{ scale: bobAnimation }] }
                            : null
                    }
                >
                    <FontAwesomeIcon
                        size={25}
                        color={colors.dark}
                        icon={item.completed ? faCircleCheck : faCircle}
                    />
                </Animated.View>
                <Text style={[styles.dayText, { color: colors.darkText }]}>{format(item.day, "EEE")}</Text>
            </View>
        );
    };

    return (
        <View style={[styles.widget, { borderColor: colors.white, backgroundColor: colors.white }]}>
            <Text style={[styles.title, { color: colors.darkText }]}>Streak: {streak} 🔥</Text>
            <FlatList
                data={streakDays}
                horizontal
                keyExtractor={(item) => item.day.toISOString()}
                renderItem={renderDay}
                contentContainerStyle={styles.daysContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    daysContainer: {
        flexDirection: "row",
    },
    dayContainer: {
        alignItems: "center",
        marginHorizontal: 8,
    },
    dayText: {
        marginTop: 4,
        fontSize: 16,
    },
    widget: {
        padding: 10,
        backgroundColor: '#FFF6ED',
        elevation: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
    }
});

export default Streak;