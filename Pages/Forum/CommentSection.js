import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Parse from 'parse/react-native';
import getAvatarImage from '../General components/AvatarUtils';
import Modal from 'react-native-modal';
//import { useComments } from '../../Components/CommentContext';

const CommentSection = ({ comments, setComments, postId }) => {
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const avatarImageSource = getAvatarImage(avatar);


  useEffect(() => {
    async function getCurrentUser() {
      const currentUser = await Parse.User.currentAsync();
      setUsername(currentUser.getUsername());
      setAvatar(currentUser.get('avatar'));
    }
    getCurrentUser();
  }, []);

  const showModal = (commentId) => {
    setCurrentCommentId(commentId);
    setModalVisible(true);

  };

  const hideModal = () => {
    setModalVisible(false);
  };

  async function deleteComment() {
    try {
      await currentCommentId.destroy();
      updatePostCommentCount();
      handleDeleteComment();
    } catch (error) {
      console.error('Failed to delete the comment:', error);
    }
    hideModal();
  };

  async function updatePostCommentCount() {
    const postQuery = new Parse.Query('Post');
    const post = await postQuery.get(postId);
    console.log('post ' + postId);
    post.increment('numberOfComments', -1);
    await post.save();
  }

  const handleDeleteComment = () => {
    const updatedComments = comments.filter(
      comment => comment.id !== currentCommentId.id,
    );
    setComments(updatedComments);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={[styles.seperator, { backgroundColor: colors.dark }]}></View>
        <View style={styles.sectionContent}>
          {comments.length == 0 ? (
            <Text></Text>
          ) : (
            comments.map((comment, index) => (
              <View
                key={index}
                style={[
                  styles.commentContainer,
                  styles.shadowProp,
                  { backgroundColor: colors.dark },
                ]}>
                <View style={styles.upperDisplay}>
                  <View style={styles.userInfo}>
                    <Image
                      source={avatarImageSource}
                      style={styles.avatarImage}
                    />
                    <View>
                      <Text style={[styles.user, { color: colors.darkText }]}>
                        {comment.get('username')}
                      </Text>
                      <Text style={[styles.when, { color: colors.darkText }]}>
                        Tilføjet{' '}
                        {Math.round(
                          (new Date().getTime() -
                            new Date(comment.createdAt).getTime()) /
                          (1000 * 3600 * 24),
                        )}{' '}
                        dage siden
                      </Text>
                    </View>
                  </View>
                  {comment.get('username') == username ? (
                    <TouchableOpacity onPress={() => showModal(comment)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        size={15}
                        style={[styles.trashIcon, { color: 'white' }]}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Text></Text>
                  )}
                  <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={() => setModalVisible(false)}>
                    <View
                      style={{
                        backgroundColor: colors.light,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: colors.light,
                        borderRadius: 10,
                      }}>
                      <Text style={styles.modalTitle}>
                        Er du sikker på, at du vil slette din kommentar?
                      </Text>
                      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <TouchableOpacity
                          onPress={hideModal}
                          style={styles.modalTextContainer1}>
                          <Text style={styles.modalText}>
                            Nej, det var en fejl
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => deleteComment()}
                          style={styles.modalTextContainer2}>
                          <Text style={styles.modalText}>
                            Ja, slet min kommentar
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
                <View
                  style={[
                    styles.comment,
                    styles.shadowProp,
                    { backgroundColor: colors.middle },
                  ]}>
                  <Text style={[styles.commentText, { color: colors.darkText }]}>
                    {comment.get('commentContent')}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  user: {
    marginLeft: 10,
    fontSize: 15,
  },
  when: {
    marginLeft: 10,
    fontSize: 10,
  },
  upperDisplay: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  commentContainer: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  comment: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  commentText: {
    fontSize: 15,
    padding: 10,
  },
  seperator: {
    alignSelf: 'center',
    width: '90%',
    height: 1,
    marginBottom: 20,
    marginTop: 10,
  },
  shadowProp: {
    shadowColor: '#443939',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  trashIcon: {
    margin: 10,
  },
  modalContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTextContainer1: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'darkred',
    flex: 1,
    marginHorizontal: 10,
  },
  modalTextContainer2: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'green',
    flex: 1,
    marginHorizontal: 10,
  },
  modalTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatarImage: {
    width: 40,
    height: 40,
  },
});

export default CommentSection;
