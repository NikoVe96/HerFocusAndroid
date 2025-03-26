import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Parse from 'parse/react-native.js';
import { useNavigation, useTheme } from '@react-navigation/native';

const UploadImage = ({ onSelect }) => {
    const [image, setImage] = useState(null);
    const { colors } = useTheme();
    const { navigation } = useNavigation();

    async function upload() {
        if (!image || !image.base64) {
            Alert.alert('No image data available');
            return;
        }
        const { base64 } = image;
        const fileName = image.fileName || 'photo.jpg';

        const base64String = base64.startsWith('data:')
            ? base64
            : 'data:image/jpeg;base64,' + base64;

        const parseFile = new Parse.File(fileName, { base64: base64String }, 'image/jpeg');
        console.log(parseFile);

        try {
            const currentUser = await Parse.User.currentAsync();
            const responseFile = await parseFile.save();
            console.log('File saved:', responseFile);
            currentUser.set('profilePicture', responseFile);

            await currentUser.save();
            Alert.alert('Dit profilbillede er blevet gemt.');
            onSelect(responseFile);
        } catch (error) {
            console.log('Error saving file:', error);
            Alert.alert('Der skete en fejl. Vi kunne ikke gemme dit billede.');
        }
    }

    function pickImage() {
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: true,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    setImage(response.assets[0]);
                    console.log('Picked image:', response.assets[0]);
                }
            },
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={[styles.button, { backgroundColor: colors.light }]} >
                <Text style={styles.buttonText}>Vælg et billede fra dit galleri</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image.uri }} style={styles.avatarImage} />}
            {image && <TouchableOpacity style={[styles.button, { backgroundColor: colors.light }]} onPress={upload}>
                <Text style={styles.buttonText}>Gem billede</Text>
            </TouchableOpacity>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginVertical: 10,
    },
    button: {
        alignContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: '5%',
        marginVertical: '3%',
        borderWidth: 0.4,
        borderBottomWidth: 4,
        borderColor: "#F8B52D",
        borderRadius: 15,

    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
    },
    avatarImage: {
        width: 130,
        height: 130,
        borderRadius: 30,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default UploadImage;