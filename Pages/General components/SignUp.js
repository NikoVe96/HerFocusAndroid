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
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import PickAvatar from './PickAvatar';
import { useUser } from '../../Components/UserContext';

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let [avatar, setAvatar] = useState('');
  const [settings, setSettings] = useState('');
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { handleSignup, error } = useUser();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);


  const handleAvatarSelect = selectedAvatar => {
    setAvatar(selectedAvatar);
  };

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
            style={[styles.form, { fontSize: 14 * scaleFactor }]}></TextInput>
          <TextInput
            placeholder="Brugernavn"
            placeholderTextColor="#8C8C8C"
            value={username}
            onChangeText={text => setUsername(text)}
            style={[styles.form, { fontSize: 14 * scaleFactor }]}></TextInput>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#8C8C8C"
            value={email}
            onChangeText={text => setEmail(text)}
            style={[styles.form, { fontSize: 14 * scaleFactor }]}></TextInput>
          <TextInput
            placeholder="Kodeord"
            placeholderTextColor="#8C8C8C"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            style={[styles.form, { fontSize: 14 * scaleFactor }]}></TextInput>
          <TextInput
            placeholder="Bekræft kodeord"
            placeholderTextColor="#8C8C8C"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry={true}
            style={[styles.form, { fontSize: 14 * scaleFactor }]}></TextInput>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={[styles.avatar, { fontSize: 17 * scaleFactor }]}>
            {' '}
            Vælg en avatar{' '}
          </Text>
          <View style={styles.avatarMargin}>
            <PickAvatar
              onAvatarSelect={handleAvatarSelect}
              picked={avatar}
              isSignUp={true}></PickAvatar>
          </View>
          <TouchableOpacity
            style={[styles.signUpBtn, { backgroundColor: colors.dark }]}
            onPress={() =>
              handleSignup(
                name,
                username,
                email,
                password,
                confirmPassword,
                navigation,
                avatar,
                settings
              )
            }
            title=" Sign up"
            titleColor="#000000">
            <Text style={[styles.btnText, { fontSize: 15 * scaleFactor }]}>
              Lav en profil
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[styles.signUpBtn, { backgroundColor: colors.dark }]}>
            <Text style={[styles.btnText, { fontSize: 15 * scaleFactor }]}>
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
    marginBottom: '40%',
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
    height: '5%',
    marginTop: 20,
    borderBottomColor: '#000000',
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
    height: 30,
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
  },
  errorText: {
    color: 'red',
  },
});

export default SignUp;
