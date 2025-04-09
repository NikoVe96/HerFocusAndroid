import React from 'react';
import { View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark, faCheck } from '@fortawesome/free-solid-svg-icons';

const AnswerInput = ({
    label,
    value,
    onChange,
    onSave,
    saved,
    scaleFactor,
    colors
}) => {
    return (
        <View style={{ marginVertical: 10 }}>
            {/* Label */}
            <View>
                <TextInput
                    editable={false}
                    value={label}
                    style={{
                        fontSize: 16 * scaleFactor,
                        color: colors.darkText,
                        marginBottom: 5,
                        fontWeight: 'bold',
                    }}
                />
            </View>
            {/* Input with icon */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TextInput
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 10,
                        width: '88%',
                        color: colors.darkText
                    }}
                    multiline={true}
                    numberOfLines={5}
                    value={value}
                    onChangeText={onChange}
                />
                {saved ? (
                    <FontAwesomeIcon
                        icon={faCheck}
                        size={20}
                        style={{ marginRight: 10, marginTop: 10 }}
                        color={colors.dark}
                    />
                ) : (
                    <TouchableOpacity onPress={onSave}>
                        <FontAwesomeIcon
                            icon={faBookmark}
                            size={20}
                            style={{ marginRight: 10, marginTop: 10 }}
                            color={colors.dark}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default AnswerInput;
