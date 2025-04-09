import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from "react-native";
import facts from "../../../Assets/FunFacts";
import { useTheme } from '@react-navigation/native';

const FunFact = () => {

    const [fact, setFact] = useState(null);
    const { width, height, colors } = useTheme();
    const scaleFactor = Math.min(width / 375, height / 667);

    const hashString = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    };

    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10);

        const hash = hashString(today);

        const index = Math.abs(hash) % facts.length;

        setFact(facts[index]);
    }, []);

    if (!fact) return null;

    return (
        <View style={[styles.widget, { backgroundColor: colors.light, borderColor: colors.dark }]}>
            <Text style={[styles.header, { color: colors.darkText, }]}>Dagens fact</Text>
            <Text style={[styles.title, { color: colors.darkText }]}>{fact.title}</Text>
            <Text style={[styles.fact, { color: colors.darkText, fontSize: 18 }]}>{fact.fact}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    widget: {
        padding: 10,
        elevation: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: '5%'
    },
    fact: {
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'center'
    }
});

export default FunFact;