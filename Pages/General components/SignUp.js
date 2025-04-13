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
  const { handleSignup, error, handleLogin, setData } = useUser();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarFile, setAvatarFile] = useState();
  const [age, setAge] = useState('');
  const [type, setType] = useState('');

  const handleAvatarSelect = (avatar, type) => {
    setAvatar(avatar);
    setType(type);
    setModalVisible(false);
  };

  async function signUp() {
    handleSignup(name, username, age, email, password, confirmPassword, avatar, type);
    // setData(avatar, type);
    // handleLogin(email, password, navigation);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View style={styles.container}>
          <Image
            source={require('../../Assets/images/logo-light-nb.png')}
            style={styles.image}
          />
          <TextInput
            placeholder="Navn"
            placeholderTextColor="#8C8C8C"
            value={name}
            onChangeText={text => setName(text)}
            style={[styles.form, { fontSize: 16 * scaleFactor, borderColor: colors.dark }]}
          />
          <TextInput
            placeholder="Brugernavn"
            placeholderTextColor="#8C8C8C"
            value={username}
            onChangeText={text => setUsername(text)}
            style={[styles.form, { fontSize: 16 * scaleFactor, borderColor: colors.dark }]}
          />
          <TextInput
            placeholder="Alder"
            placeholderTextColor="#8C8C8C"
            value={age}
            onChangeText={text => setAge(text)}
            style={[styles.form, { fontSize: 16 * scaleFactor, borderColor: colors.dark }]}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#8C8C8C"
            value={email}
            onChangeText={text => setEmail(text)}
            style={[styles.form, { fontSize: 16 * scaleFactor, borderColor: colors.dark }]}
          />
          <TextInput
            placeholder="Kodeord"
            placeholderTextColor="#8C8C8C"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            style={[styles.form, { fontSize: 16 * scaleFactor, borderColor: colors.dark }]}
          />
          <TextInput
            placeholder="Bekræft kodeord"
            placeholderTextColor="#8C8C8C"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry={true}
            style={[styles.form, { fontSize: 16 * scaleFactor, borderColor: colors.dark }]}
          />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={[
              styles.signUpBtn,
              {
                backgroundColor: colors.middle,
                borderColor: colors.middleShadow,
                width: '35%',
                height: 50,
                alignSelf: 'center'
              }
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={[styles.btnText, { color: colors.darkText, fontSize: 16 * scaleFactor }]}>
              Vælg en avatar
            </Text>
          </TouchableOpacity>
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType='slide'
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <SelectAvatar onSelect={handleAvatarSelect} />
              </View>
            </View>
          </Modal>
          <View style={{ flexDirection: 'row', marginTop: '15%', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={[
                styles.signUpBtn,
                { backgroundColor: colors.dark, borderColor: colors.darkShadow, marginBottom: 50 }
              ]}
            >
              <Text style={[styles.btnText, {
                fontSize: 20 * scaleFactor, color: colors.darkText, fontWeight: 'bold'
              }]}>
                Tilbage til login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.signUpBtn,
                { backgroundColor: colors.dark, borderColor: colors.darkShadow }
              ]}
              onPress={() => signUp()}
            >
              <Text style={[styles.btnText, { fontSize: 20 * scaleFactor, color: colors.darkText, fontWeight: 'bold' }]}>
                Lav en profil
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: '50%',
  },
  image: {
    width: '80%',
    height: '20%',
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  form: {
    width: '80%',
    height: 50,
    marginTop: '2%',
    borderBottomWidth: 1,
    paddingHorizontal: 10
  },
  signUpBtn: {
    width: '40%',
    height: 50,
    borderRadius: 8,
    //marginBottom: 10,
    //marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    borderWidth: 1,
    borderBottomWidth: 4,
    marginHorizontal: '2%'
  },
  errorText: {
    color: 'red',
    marginTop: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    elevation: 5,
    height: '80%',
    width: '90%'
  }
});

export default SignUp;
