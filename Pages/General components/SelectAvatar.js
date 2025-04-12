import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@react-navigation/native';
import animals from '../../Components/AnimalAvatars';
import emojis from '../../Components/EmojiAvatars';
import monsters from '../../Components/MonsterAvatars';
import plants from '../../Components/PlantAvatars';
import UploadImage from '../../Components/UploadImage';
import { convertAvatar } from '../../Components/ConvertAvatar';

export const SelectAvatar = ({ onSelect }) => {

    const [category, setCategory] = useState('animals');
    const { colors } = useTheme();

    const handleCategoryChange = (category) => {
        setCategory(category);
    }

    return (
        <View>
            <View style={{
                flexDirection: 'row', backgroundColor: colors.middle, borderWidth: 1, borderColor: colors.middle,
                borderTopLeftRadius: 20, borderTopRightRadius: 20
            }}>
                <TouchableOpacity style={styles.picturePickerImg}
                    onPress={() => handleCategoryChange('animals')}>
                    <Image source={require('../../Assets/images/Avatars/Animals/cow.png')} style={{
                        width: 40,
                        height: 40,
                    }} />
                    <Text>
                        Dyr
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.picturePickerImg}
                    onPress={() => handleCategoryChange('plants')}>
                    <Image source={require('../../Assets/images/Avatars/Plants/fern.png')} style={{
                        width: 40,
                        height: 40,
                    }} />
                    <Text>
                        Planter
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.picturePickerImg}
                    onPress={() => handleCategoryChange('monsters')}>
                    <Image source={require('../../Assets/images/Avatars/Monsters/monster12.png')} style={{
                        width: 40,
                        height: 40,
                    }} />
                    <Text>
                        Monstre
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.picturePickerImg}
                    onPress={() => handleCategoryChange('emoji')}>
                    <Image source={require('../../Assets/images/Avatars/Emojis/winking-face.png')} style={{
                        width: 40,
                        height: 40,
                    }} />
                    <Text>
                        Emojis
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.picturePickerImg}
                    onPress={() => handleCategoryChange('upload')}>
                    <Image source={require('../../Assets/images/camera.png')} style={{
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
                            onPress={() => onSelect(item, 'avatar')}
                            style={styles.avatarContainer}>
                            <Image
                                source={item}
                                style={styles.avatarListImage} />
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.avatarList}
                />
                : category == 'plants' ?
                    <FlatList
                        data={plants}
                        numColumns={4}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => onSelect(item, 'avatar')}
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
                            data={monsters}
                            numColumns={4}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => onSelect(item, 'avatar')}
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
                                data={emojis}
                                numColumns={4}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => onSelect(item, 'avatar')}
                                        style={styles.avatarContainer}>
                                        <Image
                                            source={item}
                                            style={styles.avatarListImage} />
                                    </TouchableOpacity>
                                )}
                                contentContainerStyle={styles.avatarList}
                            />
                            : <UploadImage
                                onSelect={onSelect} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    picturePickerImg: {
        alignItems: 'center',
        padding: '1%',
        marginHorizontal: '2%'
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