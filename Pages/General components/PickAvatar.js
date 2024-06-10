import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Parse from 'parse/react-native';
import { useTheme } from '@react-navigation/native';

export const PickAvatar = ({ onAvatarSelect, isSignedUp, picked }) => {
  const { colors } = useTheme();


  const handleAvatarSelect = async avatarSelection => {
    onAvatarSelect(avatarSelection);
    if (!isSignedUp) {
      const currentUser = await Parse.User.currentAsync();
      if (currentUser) {
        currentUser.set('avatar', avatarSelection);
        try {
          await currentUser.save();
          onAvatarSelect(avatarSelection);
        } catch (error) {
          console.error('Failed to save avatar:', error);
        }
      }
    }
  };

  const pickedAvatar = avatarSelection => {
    return {
      ...styles.images,
      backgroundColor:
        avatarSelection === picked ? colors.border : 'transparent',
      borderRadius: avatarSelection === picked ? 30 : 0,
    };
  };

  return (
    <View style={styles.avatars}>
      <TouchableOpacity
        onPress={() => handleAvatarSelect('Avatar1')}
        style={pickedAvatar('Avatar1')}>
        <Image
          source={require('../../Assets/images/Avatar1.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar2');
        }}
        style={pickedAvatar('Avatar2')}>
        <Image
          source={require('../../Assets/images/Avatar2.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar3');
        }}
        style={pickedAvatar('Avatar3')}>
        <Image
          source={require('../../Assets/images/Avatar3.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar18');
        }}
        style={pickedAvatar('Avatar18')}>
        <Image
          source={require('../../Assets/images/Avatar18.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar4');
        }}
        style={pickedAvatar('Avatar4')}>
        <Image
          source={require('../../Assets/images/Avatar4.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar5');
        }}
        style={pickedAvatar('Avatar5')}>
        <Image
          source={require('../../Assets/images/Avatar5.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar6');
        }}
        style={pickedAvatar('Avatar6')}>
        <Image
          source={require('../../Assets/images/Avatar6.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar19');
        }}
        style={pickedAvatar('Avatar19')}>
        <Image
          source={require('../../Assets/images/Avatar19.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar7');
        }}
        style={pickedAvatar('Avatar7')}>
        <Image
          source={require('../../Assets/images/Avatar7.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar8');
        }}
        style={pickedAvatar('Avatar8')}>
        <Image
          source={require('../../Assets/images/Avatar8.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar9');
        }}
        style={pickedAvatar('Avatar9')}>
        <Image
          source={require('../../Assets/images/Avatar9.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar10');
        }}
        style={pickedAvatar('Avatar10')}>
        <Image
          source={require('../../Assets/images/Avatar10.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar11');
        }}
        style={pickedAvatar('Avatar11')}>
        <Image
          source={require('../../Assets/images/Avatar11.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar12');
        }}
        style={pickedAvatar('Avatar12')}>
        <Image
          source={require('../../Assets/images/Avatar12.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar13');
        }}
        style={pickedAvatar('Avatar13')}>
        <Image
          source={require('../../Assets/images/Avatar13.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar14');
        }}
        style={pickedAvatar('Avatar14')}>
        <Image
          source={require('../../Assets/images/Avatar14.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar15');
        }}
        style={pickedAvatar('Avatar15')}>
        <Image
          source={require('../../Assets/images/Avatar15.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar16');
        }}
        style={pickedAvatar('Avatar16')}>
        <Image
          source={require('../../Assets/images/Avatar16.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleAvatarSelect('Avatar17');
        }}
        style={pickedAvatar('Avatar17')}>
        <Image
          source={require('../../Assets/images/Avatar17.png')}
          style={styles.images}></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  avatars: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  images: {
    width: 50,
    height: 50,
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
});

export default PickAvatar;
