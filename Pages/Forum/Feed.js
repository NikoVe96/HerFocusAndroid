import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Post from './Post';
import { useTheme } from '@react-navigation/native';

const Feed = ({ posts, setPosts }) => {
  const { colors } = useTheme();

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.view}>
        <View
          style={[
            styles.seperator,
            { backgroundColor: colors.border }]}></View>
        <View style={styles.feedContent}>
          {posts.length == 0 ? (
            <Text></Text>
          ) : (
            posts.map((post, index) => (
              <Post style={styles.postSize} key={post.id} postObject={post}
                onDelete={handleDeletePost}></Post>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  seperator: {
    width: '80%',
    alignSelf: 'center',
    height: 1,
    marginBottom: 20,
  },
});

export default Feed;
