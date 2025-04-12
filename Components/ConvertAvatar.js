// AvatarUploadHelper.js
import { Image } from 'react-native';
import Parse from 'parse/react-native';

export async function convertAvatar(avatarAsset) {
    try {

        const response = await fetch(avatarAsset.uri);
        const blob = await response.blob();

        const base64data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

        const parseFile = new Parse.File('avatar.png', { base64: base64data }, 'image/png');
        await parseFile.save();
        return parseFile;
    } catch (error) {
        console.error("Error uploading avatar file:", error);
        throw error;
    }
}