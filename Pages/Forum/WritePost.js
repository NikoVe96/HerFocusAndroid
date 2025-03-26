import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import Parse from 'parse/react-native';
import { useTheme } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '../../Components/UserContext';

function WritePost({ forumTitle, onNewPost }) {
  const [post, setPost] = useState('');
  const { colors } = useTheme();
  const { username, avatar, updateUserProfile } = useUser();
  const { anonymousEnabled, setAnonymousEnabled } = useState(false);

  useFocusEffect(
    useCallback(() => {
      updateUserProfile();
      return () => { };
    }, []),
  );


  const handlePost = async () => {
    const Post = new Parse.Object('Post');
    Post.set('postContent', post);
    Post.set('userObjectId', Parse.User.current());
    Post.set('username', username);
    Post.set('forumTitle', forumTitle);
    Post.set('numberOfComments', 0);
    Post.set('avatar', avatar);
    console.log('avatar2: ' + avatar);

    try {
      const result = await Post.save();
      console.log('Post saved successfully!');
      onNewPost(result);
    } catch (error) {
      console.error('Error saving post:', error);
    }
    setPost('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        <TextInput
          style={styles.writePost}
          placeholder=" Skriv et opslag..."
          placeholderTextColor="#8C8C8C"
          multiline={true}
          value={post}
          inputStyle={{
            paddingHorizontal: 10,
            marginLeft: 10,
            textAlignVertical: 'top',
          }}
          onChangeText={setPost}></TextInput>
      </View>
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%',
        marginTop: '5%'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Anonym</Text>
          <Switch
            trackColor={{ false: colors.dark, true: colors.middle }}
            thumbColor={anonymousEnabled ? colors.border : colors.light}
            ios_backgroundColor={colors.dark}
            onValueChange={() => setAnonymousEnabled(previousState => !previousState)}
            value={anonymousEnabled}
            style={{ marginHorizontal: '3%' }}
          />
        </View>
        <TouchableOpacity
          onPress={() => handlePost()}
          style={[
            styles.postBtn,
            styles.shadowProp,
            { backgroundColor: colors.dark },
          ]}>
          <Text style={[styles.btnText, { color: 'white' }]}>Slå op</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
  },
  icon: {
    color: 'grey',
    marginTop: 15,
  },
  writePost: {
    width: '80%',
    height: 70,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  postBtn: {
    width: '25%',
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  btnText: {
    fontSize: 15,
  },
  postedText: {
    marginTop: 20,
  },
  avatarImage: {
    width: 10,
    height: 10,
    marginRight: 10,
  },
});

export default WritePost;
