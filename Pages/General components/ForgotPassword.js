import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView
} from 'react-native';
import Parse from 'parse/react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  const handleResendPassword = async () => {
    const emailValue = email;
    Parse.User.requestPasswordReset(emailValue).then(() => {
      Alert.alert('Tjek din mail for at ændre password',
        'Der kan gå op til 10 minutter.',
        'Husk at tjekke dit spamfilter')
      console.log('ændre');
    }).catch((error) => {
      Alert.alert('Error: ' + error.message)
    })
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../Assets/images/logo-light-nb.png')}
          style={styles.image}></Image>
        <Text
          style={[
            styles.text,
            { color: colors.darkText, fontSize: 16 * scaleFactor },
          ]}>
          Har du glemt dit kodeord?
        </Text>
        <Text
          style={[
            styles.text,
            { color: colors.darkText, fontSize: 16 * scaleFactor },
          ]}>
          Pyt, det sker!
        </Text>
        <Text
          style={[
            styles.text1,
            { color: colors.darkText, fontSize: 16 * scaleFactor },
          ]}>
          Skriv din email i feltet, og så får du tilsendt en mail hvori, du kan
          ændre dit kodeord.
        </Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#8C8C8C"
          onChangeText={text => setEmail(text)}
          style={[styles.form, { fontSize: 18 * scaleFactor }]}></TextInput>
        <TouchableOpacity
          style={[styles.loginBtn, { backgroundColor: colors.dark, borderColor: colors.darkShadow }]}
          onPress={() => handleResendPassword()}
          titleColor="#000000">
          <Text style={[styles.btnText, { fontSize: 20 * scaleFactor, color: colors.lightText }]}>
            Ændre kodeord
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.createBtn, { backgroundColor: colors.middle, borderColor: colors.middleShadow }]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{ fontSize: 16 * scaleFactor, color: colors.lightText }}>
            Tilbage til Login
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginBottom: '60%',
  },
  image: {
    width: '90%',
    height: '24%',
    marginTop: 50,
    marginBottom: 30,
  },
  text: {
    textAlign: 'center',
  },
  text1: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    marginVertical: '10%',
  },
  form: {
    width: '80%',
    height: '10%',
    marginTop: 20,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  loginBtn: {
    width: '50%',
    height: '10%',
    borderRadius: 8,
    marginVertical: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    borderBottomWidth: 4,
    borderWidth: 1,
  },
  createBtn: {
    width: '40%',

    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    borderWidth: 1,
    borderBottomWidth: 4,
    padding: '2%'
  },
});

export default ForgotPassword;
