import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Button,
  Pressable
} from 'react-native';
import Parse from 'parse/react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

export const FrontPage = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const [username, setUsername] = useState('');
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    async function getCurrentUser() {
      if (username === '') {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser !== null) {
          setUsername(currentUser.getUsername());
        }
      }
    }
    getCurrentUser();
  }, [username]);

  async function sendNotification() {
    try {
      await Parse.Cloud.run('sendPush');
      console.log('Success!');
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  function onPress() {
    console.log('Button pressed');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text
          style={[
            styles.helloUser,
            { color: colors.darkText, fontSize: 22 * scaleFactor }
          ]}>
          Hej, {username}!
        </Text>
        <Text
          style={[
            styles.title,
            { color: colors.darkText, fontSize: 22 * scaleFactor },
          ]}>
          Hvad vil du gerne lave i dag?
        </Text>
        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Structure')}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.middle }]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 18 * scaleFactor },
              ]}>
              Planlægning
            </Text>
            <Image
              source={require('../../Assets/images/2-removebg-preview.png')}
              style={[
                styles.images,
                {
                  width: 80 * scaleFactor,
                  height: 70 * scaleFactor,
                },
              ]}></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Pick module')}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.middle }]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 18 * scaleFactor },
              ]}>
              Læringsmoduler
            </Text>
            <Image
              source={require('../../Assets/images/4-removebg-preview.png')}
              style={[
                styles.images,
                {
                  width: 70 * scaleFactor,
                  height: 70 * scaleFactor,
                },
              ]}></Image>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Pick subject')}>
          <View
            style={[styles.buttonContainer, { backgroundColor: colors.middle }]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 18 * scaleFactor },
              ]}>
              Forum
            </Text>
            <Image
              source={require('../../Assets/images/1-removebg-preview.png')}
              style={[
                styles.images,
                {
                  width: 80 * scaleFactor,
                  height: 70 * scaleFactor,
                },
              ]}></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Pick topic')}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.middle }]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 18 * scaleFactor },
              ]}>
              Vidensbank
            </Text>
            <Image
              source={require('../../Assets/images/3-removebg-preview.png')}
              style={[
                styles.images,
                {
                  width: 80 * scaleFactor,
                  height: 70 * scaleFactor,
                },
              ]}></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Notebook')}>
          <View
            style={[
              styles.buttonGrad,
              { backgroundColor: colors.dark },
            ]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 18 * scaleFactor },
              ]}>
              Notesbog
            </Text>
            <Image
              source={require('../../Assets/images/structure_notebook.png')}
              style={[
                styles.images,
                {
                  width: 100 * scaleFactor,
                  height: 70 * scaleFactor,
                },
              ]}></Image>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  helloUser: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    marginBottom: 35,
  },
  text: {
    textAlign: 'center',
    marginLeft: 20,
  },
  buttonGrad: {
    width: '85%',
    borderRadius: 10,
    bottom: 5,
    backgroundColor: '#FFEABF',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.50,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  press: {
    marginBottom: 15,
  },
  images: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 20,
  },
  buttonContainer: {
    borderWidth: 0.4,
    width: '85%',
    borderBottomWidth: 4,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#F8B52D",
    borderRadius: 15,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    flexDirection: 'row'

  },
});

export default FrontPage;
