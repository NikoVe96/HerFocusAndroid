import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import QuizQuestionsData from "../Assets/Quizzes/QuizQuestionsData";
import QuizQuestions from "./QuizQuestions";
import { useTheme } from "@react-navigation/native";

const Quiz = ({ navigation, subject, module }) => {
  const Questions = QuizQuestionsData[subject][module];

  const [selectedOptions, setSelectedOptions] = useState(Array(Questions.length).fill(null));
  const [isCorrect, setIsCorrect] = useState(Array(Questions.length).fill(false));
  const [score, setScore] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    const newScore = selectedOptions.reduce((acc, option, index) => (
      option === Questions[index]["correct_option"] ? acc + 1 : acc
    ), 0);
    setScore(newScore);
  }, [selectedOptions]);

  const validateAnswer = (selectedOption, questionIndex) => {
    if (selectedOptions[questionIndex] === null) {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[questionIndex] = selectedOption;
      setSelectedOptions(newSelectedOptions);

      const correct = selectedOption === Questions[questionIndex]["correct_option"];
      const newIsCorrect = [...isCorrect];
      newIsCorrect[questionIndex] = correct;
      setIsCorrect(newIsCorrect);
    }
  };

  const resetQuiz = () => {
    setSelectedOptions(Array(Questions.length).fill(null));
    setIsCorrect(Array(Questions.length).fill(false));
    setScore(0);
  };

  return (
    <View style={styles.container}>
      {Questions.map((question, questionIndex) => (
        <View
          key={questionIndex}
          style={[styles.subContainer, { backgroundColor: colors.light }]}>
          <QuizQuestions
            index={questionIndex}
            question={question.question}
            style={{ color: colors.darkText }}
          />
          <View style={{ marginVertical: '10%' }}>
            {question.options.map((option, optionIndex) => (
              <TouchableOpacity
                key={optionIndex}
                onPress={() => validateAnswer(option, questionIndex)}
                style={[
                  styles.optionsText,
                  {
                    backgroundColor:
                      selectedOptions[questionIndex] === option
                        ? isCorrect[questionIndex]
                          ? '#7be25b'
                          : '#f0222b'
                        : colors.middle,
                    elevation: 5,
                  },
                ]}>
                <Text style={[styles.optionText, { color: colors.darkText }]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
      <View style={{ alignItems: 'center' }}>
        <Text style={[styles.scoreText, { color: colors.darkText }]}>
          Du fik {score} ud af {Questions.length} spørgsmål korrekt
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.dark,
              borderColor: colors.dark,
            },
          ]}
          onPress={() => resetQuiz()}>
          <Text style={{ fontSize: 20, color: colors.darkText, alignSelf: 'center' }}>
            Tag quizzen igen
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    marginVertical: 10,
    padding: 5,
    backgroundColor: "white",
    alignItems: "center",
  },
  optionsText: {
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  optionText: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
  scoreText: {
    fontSize: 18,
    color: "#333",
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    width: '50%'
  },
});
export default Quiz;
