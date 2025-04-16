// AvatarUploadHelper.js
import { Image } from 'react-native';
import Parse from 'parse/react-native';

export async function convertAvatar(avatarAsset) {
    const uri = getAssetUri(avatarAsset);
    const response = await fetch(uri);
    const blob = await response.blob();
    const parseFile = new Parse.File("avatar.png", blob);
    return parseFile;
}

const getAssetUri = (avatar) => {
    const asset = Image.resolveAssetSource(avatar);
    if (Platform.OS === 'android' && typeof asset.uri !== 'string') {
        return `android.resource://com.herfocus/${avatar}`;
    }
    return asset.uri;
};