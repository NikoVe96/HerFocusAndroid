import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Post from './Post';
import { useTheme, useNavigation } from '@react-navigation/native';

const Feed = ({ posts, setPosts }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleDeletePost = postId => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: '10%' }}>
        <View
          style={[styles.seperator, { backgroundColor: colors.dark }]}></View>
        <View style={styles.feedContent}>
          {posts.length == 0 ? (
            <Text></Text>
          ) : (
            posts.map((post, index) => (
              <Post
                style={styles.postSize}
                key={post.id}
                postObject={post}
                onDelete={handleDeletePost}
                navigation={navigation}></Post>
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
