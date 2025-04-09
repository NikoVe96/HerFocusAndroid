import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  Dimensions,
  Modal
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import PickAvatar from './PickAvatar';
import { useUser } from '../../Components/UserContext';
import SelectAvatar from './SelectAvatar';
import { convertAvatar } from '../../Components/ConvertAvatar';

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let [avatar, setAvatar] = useState();
  const [settings, setSettings] = useState('');
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { handleSignup, error, handleLogin } = useUser();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarFile, setAvatarFile] = useState();
  const [age, setAge] = useState('');

  const handleAvatarSelect = (avatar) => {
    setAvatar(avatar);
    setModalVisible(false);
  };

  async function signUp() {
    handleSignup(name, username, age, email, password, confirmPassword, avatar);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require('../../Assets/images/logo-light-nb.png')}
            style={styles.image}></Image>
          <TextInput
            placeholder="Navn"
            placeholderTextColor="#8C8C8C"
            value={name}
            onChangeText={text => setName(text)}
            style={[styles.form, { fontSize: 16 * scaleFactor, borderColor: colors.dark }]}></TextInput>
          <TextInput
            placeholder="Brugernavn"
            placeholderTextColor="#8C8C8C"
            value={username}
            onChangeText={text => setUsername(text)}
            style={[styles.form, { fontSize: 16 * scaleFactor, borderColor: colors.dark }]}></TextInput>
          <TextInput
            placeholder="Alder"
            placeholderTextColor="#8C8C8C"
            value={age}
            onChangeText={text => setAge(text)}
            style={[styles.form, { fontSize: 16 * scaleFactor, borderColor: colors.dark }]}></TextInput>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#8C8C8C"
            value={email}
            onChangeText={text => setEmail(text)}
            style={[styles.form, { fontSize: 16 * scaleFactor, borderColor: colors.dark }]}></TextInput>
          <TextInput
            placeholder="Kodeord"
            placeholderTextColor="#8C8C8C"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            style={[styles.form, { fontSize: 16 * scaleFactor, borderColor: colors.dark }]}></TextInput>
          <TextInput
            placeholder="Bekræft kodeord"
            placeholderTextColor="#8C8C8C"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry={true}
            style={[styles.form, { fontSize: 16 * scaleFactor, borderColor: colors.dark }]}></TextInput>
          <Text style={styles.errorText}>{error}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={[styles.signUpBtn, {
              backgroundColor: colors.middle, borderColor: colors.middleShadow,
              width: '35%', alignSelf: 'flex-start', height: '30%', marginRight: '8%', alignSelf: 'center'
            }]}
              onPress={() => setModalVisible(true)}>
              <Text style={[styles.btnText, { color: colors.lightText, fontSize: 16 * scaleFactor }]}>Vælg en avatar</Text>
            </TouchableOpacity>
            {avatar ?
              <Image source={avatar} style={styles.avatarImage} />
              :
              <View style={styles.noAvatarImage} />
            }
          </View>
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
          <TouchableOpacity
            style={[styles.signUpBtn, { backgroundColor: colors.dark, borderColor: colors.darkShadow }]}
            onPress={() => signUp()}
            title=" Sign up"
            titleColor="#000000">
            <Text style={[styles.btnText, { fontSize: 18 * scaleFactor, color: colors.lightText }]}>
              Lav en profil
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[styles.signUpBtn, { backgroundColor: colors.dark, borderColor: colors.darkShadow }]}>
            <Text style={[styles.btnText, { fontSize: 18 * scaleFactor, color: colors.lightText }]}>
              Tilbage til login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '90%',
  },
  image: {
    width: '80%',
    height: '20%',
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 10,
  },
  form: {
    width: '70%',
    height: '10%',
    marginTop: '2%',
    borderBottomWidth: 1,
  },
  avatar: {
    marginTop: 5,
    marginBottom: 10,
  },
  avatarMargin: {
    marginLeft: 30,
    marginRight: 20,
    padding: 3,
  },
  signUpBtn: {
    width: '60%',
    height: '8%',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    borderWidth: 1,
    borderBottomWidth: 4
  },
  errorText: {
    color: 'red',
  },
  avatarImage: {
    width: 100,
    height: 100,
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
  noAvatarImage: {
    width: 100,
    height: 100,
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
    //padding: '2%',
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

export default SignUp;
