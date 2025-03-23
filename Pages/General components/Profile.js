import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList
} from 'react-native';
import Parse from 'parse/react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faEnvelope,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@react-navigation/native';
import { useUser } from '../../Components/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import SelectAvatar from './SelectAvatar';


export const Profile = () => {
  const { colors } = useTheme();
  const { username, name, email, updateUserProfile, ID } = useUser();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const [profilePicture, setProfilePicture] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [newAvatar, setNewAvatar] = useState();

  useFocusEffect(
    useCallback(() => {
      updateUserProfile();
      return () => { };
    }, []),
  );

  useEffect(() => {
    async function getCurrentUser() {
      const currentUser = await Parse.User.currentAsync();
      if (currentUser !== null) {
        setProfilePicture(currentUser.get('profilePicture'));
        console.log('Profile picture: ' + profilePicture.url());
      }
    }
    getCurrentUser();
  }, [username]);

  const handleAvatarSelect = (avatar) => {
    setNewAvatar(avatar);
    setModalVisible(false);
    console.log(newAvatar);
  };

  async function save() {
    const currentUser = await Parse.User.currentAsync();
    currentUser.set('profilePicture', newAvatar)
    console.log('New profile picture has been set');
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.userNameContainer}>
          {profilePicture && <Image source={{ uri: profilePicture.url() }} style={styles.avatarImage} />}
          <Text
            style={[
              styles.user,
              { color: colors.text, fontSize: 25 * scaleFactor },
            ]}>
            {username}
          </Text>
        </View>
        <View style={styles.seperator}></View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesomeIcon
            icon={faUser}
            style={[styles.icons, { color: colors.text }]}
            size={20}
          />
          <Text
            style={[
              styles.userInfo,
              { color: colors.text, fontSize: 18 * scaleFactor },
            ]}>
            {' '}
            {name}{' '}
          </Text>
        </View>
        <View
          style={[
            styles.seperator,
            { backgroundColor: colors.mainButton },
          ]}></View>
        <View style={styles.userContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              icon={faEnvelope}
              style={[styles.icons, { color: colors.text }]}
              size={20}
            />
            <Text
              style={[
                styles.userInfo,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              {email}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.seperator,
            { backgroundColor: colors.mainButton },
          ]}></View>
        <TouchableOpacity style={{ padding: '5%', backgroundColor: 'white', marginHorizontal: '5%', marginBottom: '10%' }}
          onPress={() => setModalVisible(true)}>
          <Text>
            Change profile picture
          </Text>
        </TouchableOpacity>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType='slide'
          backdropColor='black'
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <SelectAvatar
                onSelect={handleAvatarSelect} />
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={{ backgroundColor: 'white', padding: '5%', marginHorizontal: '5%' }}
          onPress={() => save()}>
          <Text>Gem</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userNameContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  avatarImage: {
    width: 130,
    height: 130,
  },
  user: {
    marginTop: 20,
  },
  seperator: {
    width: '100%',
    height: 1,
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icons: {
    marginLeft: 30,
    marginBottom: 20,
  },
  iconEdit: {
    marginRight: 20,
    marginBottom: 20,
  },
  changeAvatar: {
    marginLeft: 10,
    marginBottom: '5%'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 0, 0, 0.9)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '2%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '80%'
  },
});

export default Profile;
