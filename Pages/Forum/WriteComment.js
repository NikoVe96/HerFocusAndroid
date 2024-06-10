import Parse from 'parse/react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

function WriteComment({ postId, onNewComment }) {
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const { colors } = useTheme();

  useEffect(() => {
    async function getCurrentUser() {
      const currentUser = Parse.User.current();
      if (currentUser !== null) {
        const username = currentUser.get('username');
        setUsername(username);
      } else {
        console.log('Error fetching user data');
      }
    }
    getCurrentUser();
  }, []);

  const handleComment = async () => {
    const newComment = new Parse.Object('Comment');

    newComment.set('commentContent', comment);
    newComment.set('userObjectId', Parse.User.current());
    newComment.set('username', username);
    newComment.set('postIdentifier', postId);
    newComment.set('avatar', avatar);

    try {
      const result = await newComment.save();
      onNewComment(result);
      postId.increment('numberOfComments');
      await postId.save();
    } catch (error) {
      console.error('Error saving comment:', error);
    }
    setComment('');
  };

  return (
    <View style={styles.commentContainer}>
      <TextInput
        style={styles.writeComment}
        placeholder="Skriv en kommentar..."
        placeholderTextColor="#8C8C8C"
        value={comment}
        multiline={true}
        inputStyle={{
          paddingHorizontal: 10,
          marginLeft: 10,
          textAlignVertical: 'top',
        }}
        onChangeText={setComment}></TextInput>
      <TouchableOpacity
        onPress={() => handleComment()}
        style={styles.createComment}>
        <FontAwesomeIcon
          icon={faPaperPlane}
          style={[styles.icon, { color: colors.iconDark }]}
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    transform: [{ rotate: '50deg' }],
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  writeComment: {
    height: 50,
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
  },
  createComment: {
    paddingLeft: 5,
    marginBottom: 5,
  },
});

export default WriteComment;
