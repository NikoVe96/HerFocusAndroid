import Parse from 'parse/react-native';
import CommentSection from './CommentSection';
import WriteComment from './WriteComment';
import Post from './Post';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';

function IndividualPost({ route }) {
  const { postObject } = route.params;
  const [postedBy, setPostedBy] = useState('');
  const [postContent, setPostContent] = useState('');
  const [numberOfComments, setCommentCount] = useState(0);
  const [allComments, setAllComments] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    fetchComments();
  }, [postObject.get('numberOfComments')]);

  async function fetchComments() {
    try {
      let query = new Parse.Query('Comment');
      query.equalTo('postIdentifier', postObject);
      query.descending('createdAt');
      const results = await query.find();
      console.log(results);
      setAllComments(results);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  function handleNewComment() {
    fetchComments();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.postContainer}>
          <Post
            style={styles.post}
            postObject={postObject}
            individualPostClickCallback={() =>
              handleAddCommentClick(postObject)
            }
          />
          <WriteComment postId={postObject} onNewComment={handleNewComment} />
          <CommentSection
            postId={postObject.id}
            comments={allComments}
            setComments={fetchComments}
            onNewComment={handleNewComment}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postContainer: {
    marginTop: 20,
    width: '98%',
    alignSelf: 'center',
  },
});

export default IndividualPost;
