import React from 'react';
import { View, Text } from 'react-native';
import AnswerInput from './AnswerInput';

const ExerciseSection = ({
    sectionTitle,
    description,
    exercises,
    answers,
    onAnswerChange,
    onSaveAnswer,
    savedFlags,
    scaleFactor,
    colors,
}) => {
    return (
        <View style={{ backgroundColor: colors.light, padding: '2%' }}>
            <Text style={{
                fontSize: 20 * scaleFactor,
                color: colors.darkText,
                textAlign: 'center',
                marginBottom: 10
            }}>
                {sectionTitle}
            </Text>
            {description && (
                <Text style={{ fontSize: 16 * scaleFactor, color: colors.darkText, marginBottom: 10 }}>
                    {description}
                </Text>
            )}
            {exercises.map((ex, index) => (
                <AnswerInput
                    key={index}
                    label={ex.label}
                    value={answers[ex.label] || ''}
                    onChange={(text) => onAnswerChange(ex.label, text)}
                    onSave={() => onSaveAnswer(ex.label)}
                    saved={savedFlags[ex.label]}
                    scaleFactor={scaleFactor}
                    colors={colors}
                />
            ))}
        </View>
    );
};

export default ExerciseSection;
