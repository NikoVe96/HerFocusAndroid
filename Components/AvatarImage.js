import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import Parse from 'parse/react-native';

const AvatarImage = ({ userId, style }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        async function fetchAvatar() {

            console.log('passed user: ' + userId);
            try {
                const query = new Parse.Query('User');
                query.equalTo('objectId', userId.id);
                const commentUser = await query.first();
                if (commentUser && commentUser.get('profilePicture')) {
                    const file = commentUser.get('profilePicture');
                    const url = file.url();
                    setAvatarUrl(url);
                } else {
                    console.log('No profile picture found');
                }
            } catch (error) {
                console.error('Error fetching avatar:', error);
            }
        }
        fetchAvatar();
    }, [userId]);

    return (
        <>
            {avatarUrl != null ? (
                <Image source={{ uri: avatarUrl }} style={style} />
            ) : (
                <View style={style} />
            )}
        </>
    );
};

export default AvatarImage;