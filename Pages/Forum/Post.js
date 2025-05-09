import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import Parse from 'parse/react-native';
import Modal from 'react-native-modal';

const Post = ({ postObject, onDelete, navigation }) => {
  const [username, setUsername] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  let daysAgo = Math.round(
    (new Date().getTime() - new Date(postObject.get('createdAt')).getTime()) /
    (1000 * 3600 * 24),
  );
  const { colors } = useTheme();
  const [avatar, setAvatar] = useState();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);


  function handlePostClick() {
    navigation.navigate('IndividualPost', { postObject: postObject, onDelete });
  }

  useEffect(() => {
    async function getCurrentUser() {
      const currentUser = await Parse.User.currentAsync();
      setUsername(currentUser.getUsername());
      getAvatar();
    }
    getCurrentUser();
  }, []);

  const deletePost = async () => {
    try {
      await postObject.destroy();
      onDelete(postObject.id);
      setModalVisible(false);
    } catch (error) {
      console.error('Failed to delete the post:', error);
    }
  };

  useEffect(() => {
    console.log(postObject.get('numberOfComments'));
  }, [postObject.get('numberOfComments')]);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  async function getAvatar() {
    const postUser = postObject.get('userObjectId');

    const query = new Parse.Query('User');
    query.equalTo('objectId', postUser.id);
    const user = await query.first();
    setAvatar(user.get('profilePicture'));
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.postContainer,
          styles.shadowProp,
          { backgroundColor: colors.middle },
        ]}>
        <View style={styles.upperDisplay}>
          <View style={styles.userInfo}>
            {avatar ?
              (postObject.get('anonymous') ?
                <Image source={require('../../Assets/images/icons/anonymous-woman.png')} style={styles.avatarImage} />
                : <Image source={{ uri: avatar.url() }} style={styles.avatarImage} />)
              : <View style={styles.avatarImage} />
            }
            <View></View>
            <View style={styles.userText}>
              {postObject.get('anonymous') ?
                <Text style={[styles.user, { color: colors.darkText }]}>Anonym</Text>
                : <Text style={[styles.user, { color: colors.darkText }]}>
                  {postObject.get('username')}
                </Text>
              }
              <Text style={[styles.when, { color: colors.darkText }]}>
                Tilføjet {daysAgo} dage siden
              </Text>
            </View>
          </View>
          <View>
            {postObject.get('username') == username ? (
              <TouchableOpacity onPress={showModal}>
                <FontAwesomeIcon
                  icon={faTrash}
                  size={20 * scaleFactor}
                  style={[styles.trashIcon, { color: 'darkred' }]}
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
                <Text style={[styles.modalText, { color: colors.darkText }]}>
                  Er du sikker på, at du vil slette dit opslag?
                </Text>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                  <TouchableOpacity
                    onPress={hideModal}
                    style={styles.modalTextContainer1}>
                    <Text style={[styles.modalText, { color: colors.lightText }]}>
                      Nej, det var en fejl
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={deletePost}
                    style={styles.modalTextContainer2}>
                    <Text style={[styles.modalText, { color: colors.lightText }]}>
                      Ja, slet mit opslag
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <View
          style={[
            styles.post,
            styles.shadowProp,
            { backgroundColor: colors.light },
          ]}>
          <Text style={[styles.postText, { color: colors.darkText }]}>
            {postObject.get('postContent')}
          </Text>
        </View>
        <View style={styles.comments}>
          <View style={styles.addComment}>
            <TouchableOpacity onPress={() => handlePostClick()}>
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={[styles.icon2, { color: colors.light }]}
                size={15}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePostClick()}>
              <Text style={[styles.text, { color: colors.darkText }]}>kommenter</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handlePostClick()}>
            <View style={styles.numberComments}>
              <Text style={{ color: colors.darkText }}>
                {postObject.get('numberOfComments')} kommentarer
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  userText: {
    marginTop: 5,
    marginLeft: 5,
  },
  user: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  when: {
    fontSize: 12,
  },
  postContainer: {
    borderRadius: 8,
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 10,
  },
  post: {
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 10,
    width: '95%',
    borderRadius: 8,
  },
  postText: {
    fontSize: 16,
    padding: 10,
  },
  comments: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 20,
    marginBottom: 10,
  },
  upperDisplay: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  trashIcon: {
    margin: 10,
  },
  icon2: {
    transform: [{ rotate: '50deg' }],
    marginRight: 10,
  },
  addComment: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  modalContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
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
    width: 50,
    height: 50,
  },
});

export default Post;
