import { Text, TouchableOpacity, View, Alert, SafeAreaView, ScrollView, Switch, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import Parse from 'parse/react-native';
import { useThemeContext } from "../../Assets/Theme/ThemeContext";
import Modal from "react-native-modal";

export const UserSettings = ({ navigation }) => {

  const { updateTheme } = useThemeContext();
  const { colors } = useTheme();
  const [ID, setID] = useState('');
  const [colorTheme, setColorTheme] = useState('');
  const [isTasksEnabled, setIsTasksEnabled] = useState(false);
  const tasksToggleSwitch = () => setIsTasksEnabled(previousState => !previousState);
  const [isEventsEnabled, setIsEventsEnabled] = useState(false);
  const eventsToggleSwitch = () => setIsEventsEnabled(previousState => !previousState);
  const [isRoutinesEnabled, setIsRoutinesEnabled] = useState(false);
  const routinesToggleSwitch = () => setIsRoutinesEnabled(previousState => !previousState);
  const [isPostEnabled, setIsPostEnabled] = useState(false);
  const postToggleSwitch = () => setIsPostEnabled(previousState => !previousState);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser) {
          setID(currentUser.id);
          setCurrentUser(currentUser);
        }
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };

    getCurrentUser();
  }, []);

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

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.title}>
          <Text
            style={[
              styles.textStyle,
              { color: colors.text, fontSize: 30 * scaleFactor },
            ]}>
            Indstillinger
          </Text>
        </View>
        <View
          style={[styles.seperator, { backgroundColor: colors.border }]}></View>
        <View style={[styles.colorView, { backgroundColor: colors.subButton }]}>
          <Text
            style={{
              fontSize: 20 * scaleFactor,
              flex: 1,
              alignSelf: 'center',
              color: colors.text,
            }}>
            Skift farvetema
          </Text>
          <View style={styles.themeOption}>
            <TouchableOpacity
              style={styles.pastel}
              onPress={() => updateTheme('pastel')}></TouchableOpacity>
            <TouchableOpacity
              style={styles.purple}
              onPress={() => updateTheme('purple')}></TouchableOpacity>
            <TouchableOpacity
              style={styles.red}
              onPress={() => updateTheme('red')}></TouchableOpacity>
          </View>
          <View style={styles.themeOption}>
            <TouchableOpacity
              style={styles.yellow}
              onPress={() => updateTheme('yellow')}></TouchableOpacity>
            <TouchableOpacity
              style={styles.green}
              onPress={() => updateTheme('green')}></TouchableOpacity>
            <TouchableOpacity
              style={styles.blue}
              onPress={() => updateTheme('blue')}></TouchableOpacity>
          </View>
          <View style={styles.themeOption}>
            <TouchableOpacity
              style={styles.darkBlue}
              onPress={() => updateTheme('darkblue')}></TouchableOpacity>
            <TouchableOpacity
              style={styles.dark}
              onPress={() => updateTheme('dark')}></TouchableOpacity>
            <TouchableOpacity
              style={styles.neutral}
              onPress={() => updateTheme('neutral')}></TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.notificationView,
            { backgroundColor: colors.subButton },
          ]}>
          <Text
            style={{
              fontSize: 20 * scaleFactor,
              flex: 1,
              alignSelf: 'center',
              color: colors.text,
            }}>
            Notifikationer
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ flex: 6, fontSize: 18, color: colors.text }}>
              To-do opgaver
            </Text>
            <Switch
              trackColor={{ false: colors.mainButton, true: colors.background }}
              thumbColor={isTasksEnabled ? colors.border : colors.background}
              ios_backgroundColor={colors.mainButton}
              onValueChange={tasksToggleSwitch}
              value={isTasksEnabled}
              style={{ flex: 1 }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ flex: 6, fontSize: 18, color: colors.text }}>
              Kalender events
            </Text>
            <Switch
              trackColor={{ false: colors.mainButton, true: colors.background }}
              thumbColor={isEventsEnabled ? colors.border : colors.background}
              ios_backgroundColor={colors.mainButton}
              onValueChange={eventsToggleSwitch}
              value={isEventsEnabled}
              style={{ flex: 1 }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ flex: 6, fontSize: 18, color: colors.text }}>
              Rutiner
            </Text>
            <Switch
              trackColor={{ false: colors.mainButton, true: colors.background }}
              thumbColor={
                isRoutinesEnabled ? colors.border : colors.background
              }
              ios_backgroundColor={colors.mainButton}
              onValueChange={routinesToggleSwitch}
              value={isRoutinesEnabled}
              style={{ flex: 1 }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ flex: 6, fontSize: 18, color: colors.text }}>
              Forum post kommentarer
            </Text>
            <Switch
              trackColor={{ false: colors.mainButton, true: colors.background }}
              thumbColor={isPostEnabled ? colors.border : colors.background}
              ios_backgroundColor={colors.mainButton}
              onValueChange={postToggleSwitch}
              value={isPostEnabled}
              style={{ flex: 1 }}
            />
          </View>
        </View>
        <View
          style={[styles.deleteView, { backgroundColor: colors.subButton }]}>
          <TouchableOpacity
            onPress={showModal}
            style={[styles.deleteBtn, { backgroundColor: colors.mainButton, borderColor: colors.mainButton }]}>
            <Text
              style={{
                fontSize: 20 * scaleFactor,
                fontWeight: 'bold',
                color: colors.text,
              }}>
              Slet din konto
            </Text>
          </TouchableOpacity>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}>
            <View
              style={{
                backgroundColor: colors.background,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.background,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 24 * scaleFactor,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Er du sikker på at du vil slette din konto?
              </Text>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 20 * scaleFactor,
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                Handlingen kan ikke fortrydes og din data vil blive slettet
                permanent
              </Text>
              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <TouchableOpacity
                  onPress={hideModal}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 2,
  },
  title: {
    marginTop: 40,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 25,
  },
  seperator: {
    height: 1,
    width: '60%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  colorView: {
    marginTop: 15,
    width: '90%',
    height: 270,
    borderRadius: 10,
    bottom: 5,
    justifyContent: 'space-between',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  pastel: {
    borderWidth: 4,
    borderRadius: 50,
    width: '17%',
    height: '75%',
    borderColor: '#E7CCF7',
    backgroundColor: '#BBE7FE',
  },
  purple: {
    borderWidth: 4,
    borderRadius: 50,
    width: '17%',
    height: '75%',
    backgroundColor: '#A47786',
    borderColor: '#533440',
  },
  red: {
    borderWidth: 4,
    borderRadius: 50,
    width: '17%',
    height: '75%',
    backgroundColor: '#F7A399',
    borderColor: '#BF4C41',
  },
  yellow: {
    borderWidth: 4,
    borderRadius: 50,
    width: '17%',
    height: '75%',
    backgroundColor: '#FFEABF',
    borderColor: '#DC9B18',
  },
  green: {
    borderWidth: 4,
    borderRadius: 50,
    width: '17%',
    height: '75%',
    backgroundColor: '#94C973',
    borderColor: '#2F5233',
  },
  blue: {
    borderWidth: 4,
    borderRadius: 50,
    width: '17%',
    height: '75%',
    backgroundColor: '#6AABD2',
    borderColor: '#274472',
  },
  darkBlue: {
    borderWidth: 4,
    borderRadius: 50,
    width: '17%',
    height: '75%',
    backgroundColor: '#393751',
    borderColor: '#131227',
  },
  dark: {
    borderWidth: 4,
    borderRadius: 50,
    width: '17%',
    height: '75%',
    backgroundColor: '#252121',
    borderColor: '#000000',
  },
  neutral: {
    borderWidth: 4,
    borderRadius: 50,
    width: '17%',
    height: '75%',
    backgroundColor: '#EDE7DC',
    borderColor: '#B7897C',
  },
  notificationView: {
    marginTop: 15,
    width: '90%',
    borderRadius: 10,
    bottom: 5,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    padding: 5,
  },
  deleteView: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 90,
    borderRadius: 10,
    bottom: 5,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  deleteBtn: {
    borderWidth: 2,
    borderRadius: 10,
    width: '80%',
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
});

export default UserSettings;
