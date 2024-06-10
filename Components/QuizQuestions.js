import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

const Questions = ({ index, question }) => {

  const { colors } = useTheme();
  return (
    <View style={{ backgroundColor: colors.background }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            opacity: 0.6,
            marginRight: 2,
          }}>
          {index + 1}
        </Text>
        <Text style={{ color: colors.text, fontSize: 13, opacity: 0.6 }}>
          / {Questions.length}
        </Text>
      </View>
      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          textAlign: 'center',
        }}>
        {question}
      </Text>
    </View>
  );
};


export default Questions;