import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useUser } from '../../Components/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import Parse from 'parse/react-native';
import Modal from "react-native-modal";

export const Profile = ({ navigation }) => {
  const { colors } = useTheme();
  const { username, name, email, updateUserProfile, ID, handleLogout, age, profilePicture } = useUser();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const [isModalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      updateUserProfile();
      return () => { };
    }, []),
  );

  async function deleteAccount() {
    try {
      await currentUser.destroy();
      Alert.alert('Your account has successfully been deleted')
      //Logout and return to login page
      navigation.navigate('Login');
      return true;
    } catch (error) {
      Alert.alert('Error deleting your account')
      return false;
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.userNameContainer}>
          {profilePicture ?
            <Image source={{ uri: profilePicture.url() }} style={styles.avatarImage} />
            : <View style={styles.avatarImage} />}
          <Text
            style={[
              styles.user,
              { color: colors.darkText, fontSize: 30 * scaleFactor, fontWeight: 'bold' },
            ]}>
            {name}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignContent: 'center', marginBottom: '10%', marginHorizontal: '2%', justifyContent: 'space-evenly' }}>
          <Text style={[styles.userData, { color: colors.dark }]}>
            {username}
          </Text>
          <Text style={{ color: colors.dark }} >|</Text>
          <Text style={[styles.userData, { color: colors.dark }]}>
            {email}
          </Text>
          <Text style={{ color: colors.dark }} >|</Text>
          <Text style={[styles.userData, { color: colors.dark }]}>
            {age}
          </Text>
        </View>
        <View style={{ marginHorizontal: '5%' }}>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.middle }]}
            onPress={() => navigation.navigate('Edit profile')}>
            <Text style={[styles.buttonText, { color: colors.dark }]}>Rediger profil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.middle }]}
            onPress={() => navigation.navigate('Settings')}>
            <Text style={[styles.buttonText, { color: colors.middle }]}>Indstillinger</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#a1271f', width: '48%', borderColor: '#751a14' }]}
              onPress={() => setModalVisible(true)}>
              <Text style={[styles.buttonText, { color: 'white' }]}>Slet profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.middle, width: '48%' }]}
              onPress={handleLogout}>
              <Text style={[styles.buttonText, { color: colors.dark }]}>Log ud</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          animationIn={'bounceIn'}
          animationOut={'bounceOut'}>
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
            <Text
              style={{
                color: colors.darkText,
                fontSize: 24 * scaleFactor,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Er du sikker på at du vil slette din konto?
            </Text>
            <Text
              style={{
                color: colors.darkText,
                fontSize: 20 * scaleFactor,
                textAlign: 'center',
                marginVertical: 10,
              }}>
              Handlingen kan ikke fortrydes og din data vil blive slettet
              permanent
            </Text>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  padding: 5,
                  borderWidth: 1,
                  backgroundColor: 'darkred',
                  flex: 1,
                  marginHorizontal: 10,
                  borderWidth: 1,
                  borderColor: 'darkred',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Hov, det her var vidst en fejl
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={deleteAccount}
                style={{
                  padding: 5,
                  borderWidth: 1,
                  backgroundColor: 'green',
                  flex: 1,
                  marginHorizontal: 10,
                  borderWidth: 1,
                  borderColor: 'green',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Ja tak, slet min konto
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView >
    </View >
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
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  user: {
    marginTop: 20,
  },
  userData: {
    fontSize: 16,
    marginHorizontal: '2%',
    //width: '30%',
    textAlign: 'center'
  },
  button: {
    alignContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: '5%',
    marginVertical: '3%',
    borderWidth: 0.4,
    borderBottomWidth: 4,
    borderColor: "#F8B52D",
    borderRadius: 15,

  },
  buttonText: {
    fontSize: 22,
    textAlign: 'center',
  }
});

export default Profile;
