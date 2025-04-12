import React from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import Feed from './Feed';
import WritePost from './WritePost';
import Parse from 'parse/react-native';

export const Forum = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const { forumTitle, forumDescription } = route.params;
  const { colors } = useTheme();

  useEffect(() => {
    postQuery();
  }, [forumTitle, posts]);

  function handleNewPost() {
    postQuery();
  }

  async function postQuery() {
    let posts = new Parse.Query('Post');
    posts.contains('forumTitle', forumTitle);
    posts.descending('createdAt');
    const results = await posts.find();
    setPosts(results);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.darkText }]}>{forumTitle}</Text>
          <Text style={[styles.description, { color: colors.darkText }]}>
            {forumDescription}
          </Text>
        </View>
        <WritePost
          onNewPost={handleNewPost}
          forumTitle={forumTitle}></WritePost>
        <Feed forumTitle={forumTitle} posts={posts} setPosts={setPosts} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 35,
    marginTop: 25,
    alignSelf: 'center'
  },
  descContainer: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
  },
  description: {
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
    marginBottom: '5%'
  },
});

export default Forum;
