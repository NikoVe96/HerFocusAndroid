import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Parse from 'parse/react-native.js';

const UploadImage = () => {
    const [image, setImage] = useState(null);

    async function upload() {
        if (!image || !image.base64) {
            Alert.alert('No image data available');
            return;
        }
        const { base64 } = image;
        const fileName = image.fileName || 'photo.jpg';

        // Ensure the base64 string includes the MIME prefix
        const base64String = base64.startsWith('data:')
            ? base64
            : 'data:image/jpeg;base64,' + base64;

        // Create Parse.File with content type explicitly provided as the third argument.
        const parseFile = new Parse.File(fileName, { base64: base64String }, 'image/jpeg');
        console.log(parseFile);

        try {
            const currentUser = await Parse.User.currentAsync();
            const responseFile = await parseFile.save();
            console.log('File saved:', responseFile);
            //const Gallery = Parse.Object.extend('Gallery');
            //const gallery = new Gallery();
            currentUser.set('profilePicture', responseFile);

            await currentUser.save();

            // Optionally update the user profile
            // currentUser.set('profilePicture', gallery);
            Alert.alert('The file has been saved to Back4app.');
        } catch (error) {
            console.log('Error saving file:', error);
            Alert.alert('The file either could not be read, or could not be saved to Back4app.');
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
            <Button onPress={pickImage} title="Pick an image from gallery" color="#841584" />
            {image && <Image source={{ uri: image.uri }} style={styles.currentImage} />}
            {image && <Button title="Upload" color="green" onPress={upload} />}
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
});

export default UploadImage;