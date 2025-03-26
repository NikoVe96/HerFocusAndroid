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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.title}>
          <Text
            style={[
              styles.textStyle,
              { color: colors.darkText, fontSize: 30 * scaleFactor },
            ]}>
            Indstillinger
          </Text>
        </View>
        <View style={[styles.colorView, { backgroundColor: colors.middle }]}>
          <Text
            style={{
              fontSize: 20 * scaleFactor,
              flex: 1,
              alignSelf: 'center',
              color: colors.darkText,
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
            { backgroundColor: colors.middle },
          ]}>
          <Text
            style={{
              fontSize: 20 * scaleFactor,
              flex: 1,
              alignSelf: 'center',
              color: colors.darkText,
            }}>
            Notifikationer
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ flex: 6, fontSize: 18, color: colors.darkText }}>
              To-do opgaver
            </Text>
            <Switch
              trackColor={{ false: colors.dark, true: colors.light }}
              thumbColor={isTasksEnabled ? colors.dark : colors.light}
              ios_backgroundColor={colors.dark}
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
            <Text style={{ flex: 6, fontSize: 18, color: colors.darkText }}>
              Kalender events
            </Text>
            <Switch
              trackColor={{ false: colors.dark, true: colors.light }}
              thumbColor={isEventsEnabled ? colors.dark : colors.light}
              ios_backgroundColor={colors.dark}
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
            <Text style={{ flex: 6, fontSize: 18, color: colors.darkText }}>
              Rutiner
            </Text>
            <Switch
              trackColor={{ false: colors.dark, true: colors.light }}
              thumbColor={
                isRoutinesEnabled ? colors.dark : colors.light
              }
              ios_backgroundColor={colors.dark}
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
              trackColor={{ false: colors.dark, true: colors.light }}
              thumbColor={isPostEnabled ? colors.dark : colors.light}
              ios_backgroundColor={colors.dark}
              onValueChange={postToggleSwitch}
              value={isPostEnabled}
              style={{ flex: 1 }}
            />
          </View>
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
    marginVertical: '5%',
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
