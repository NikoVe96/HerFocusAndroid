import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@react-navigation/native';
import animals from '../../Components/AnimalAvatars';
import UploadImage from '../../Components/UploadImage';

export const SelectAvatar = ({ onSelect }) => {

    const [category, setCategory] = useState('animals');
    const { colors } = useTheme();

    const handleCategoryChange = (category) => {
        setCategory(category);
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', backgroundColor: colors.subButton }}>
                <TouchableOpacity style={styles.picturePickerImg}
                    onPress={() => handleCategoryChange('animals')}>
                    <Image source={require('../../Assets/images/Avatars/Animals/bat.png')} style={{
                        width: 40,
                        height: 40,
                    }} />
                    <Text>
                        Dyr
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.picturePickerImg}
                    onPress={() => handleCategoryChange('monsters')}>
                    <Image source={require('../../Assets/images/Avatars/Monsters/cyclops.png')} style={{
                        width: 40,
                        height: 40,
                    }} />
                    <Text>
                        Monstre
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.picturePickerImg}
                    onPress={() => handleCategoryChange('emoji')}>
                    <Image source={require('../../Assets/images/Avatars/Monsters/monster.png')} style={{
                        width: 40,
                        height: 40,
                    }} />
                    <Text>
                        Emojis
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.picturePickerImg}
                    onPress={() => handleCategoryChange('upload')}>
                    <Image source={require('../../Assets/images/Avatars/Animals/bat.png')} style={{
                        width: 40,
                        height: 40,
                    }} />
                    <Text>
                        Upload
                    </Text>
                </TouchableOpacity>
            </View>
            {category == 'animals' ?
                <FlatList
                    data={animals}
                    numColumns={4}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => onSelect(item)}
                            style={styles.avatarContainer}>
                            <Image
                                source={item}
                                style={styles.avatarListImage} />
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.avatarList}
                />
                : category == 'monsters' ?
                    <FlatList
                        data={animals}
                        numColumns={4}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => onSelect(item)}
                                style={styles.avatarContainer}>
                                <Image
                                    source={item}
                                    style={styles.avatarListImage} />
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.avatarList}
                    />
                    : category == 'emoji' ?
                        <FlatList
                            data={animals}
                            numColumns={4}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => onSelect(item)}
                                    style={styles.avatarContainer}>
                                    <Image
                                        source={item}
                                        style={styles.avatarListImage} />
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={styles.avatarList}
                        />
                        : <UploadImage />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    picturePickerImg: {
        alignItems: 'center',
        padding: '2%',
        marginHorizontal: '4%'
    },
    avatarList: {
        paddingVertical: 10,
    },
    avatarContainer: {
        marginHorizontal: '2%',
        padding: '1%'
    },
    avatarListImage: {
        width: 60,
        height: 60,
    },
})

export default SelectAvatar;