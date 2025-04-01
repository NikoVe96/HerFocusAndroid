import { Text, TouchableOpacity, View, Alert, SafeAreaView, ScrollView, Switch, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import Parse from 'parse/react-native';
import Modal from "react-native-modal";
import { useThemeContext } from "../../Assets/Theme/ThemeContext";

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
              { color: colors.lightText, fontSize: 30 * scaleFactor },
            ]}>
            Indstillinger
          </Text>
        </View>
        <View style={[styles.colorView, { backgroundColor: colors.light, borderColor: colors.lightShadow }]}>
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
              style={styles.turquoise}
              onPress={() => updateTheme('turquoise')}>
              <Text>Turkis</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.purple}
              onPress={() => updateTheme('purple')}>
              <Text>Lilla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.red}
              onPress={() => updateTheme('red')}>
              <Text>Rød</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.beige}
              onPress={() => updateTheme('beige')}>
              <Text>Beige</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.themeOption}>
            <TouchableOpacity
              style={styles.yellow}
              onPress={() => updateTheme('yellow')}>
              <Text>Gul</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.green}
              onPress={() => updateTheme('green')}>
              <Text>Grøn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.blue}
              onPress={() => updateTheme('blue')}>
              <Text>Blå</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pastel}
              onPress={() => updateTheme('pastel')}>
              <Text>Pastel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.themeOption}>
            <TouchableOpacity
              style={styles.darkBlue}
              onPress={() => updateTheme('darkblue')}>
              <Text>Mørk</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pink}
              onPress={() => updateTheme('pink')}>
              <Text>Lyserød</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.earth}
              onPress={() => updateTheme('earth')}>
              <Text>Jord</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.brown}
              onPress={() => updateTheme('brown')}>
              <Text>Brun</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.notificationView,
            { backgroundColor: colors.light, borderColor: colors.lightShadow },
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
              trackColor={{ false: colors.middle, true: colors.middle }}
              thumbColor={isTasksEnabled ? colors.dark : colors.lightMiddle}
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
              trackColor={{ false: colors.middle, true: colors.middle }}
              thumbColor={isEventsEnabled ? colors.dark : colors.lightMiddle}
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
              trackColor={{ false: colors.middle, true: colors.middle }}
              thumbColor={
                isRoutinesEnabled ? colors.dark : colors.lightMiddle
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
            <Text style={{ flex: 6, fontSize: 18, color: colors.darkText }}>
              Forum post kommentarer
            </Text>
            <Switch
              trackColor={{ false: colors.middle, true: colors.middle }}
              thumbColor={isPostEnabled ? colors.dark : colors.lightMiddle}
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
  turquoise: {
    borderWidth: 4,
    borderRadius: 50,
    width: '18%',
    height: '75%',
    borderColor: '#0C6170',
    backgroundColor: '#DBF5F0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  beige: {
    borderWidth: 4,
    borderRadius: 50,
    width: '18%',
    height: '75%',
    borderColor: '#C6ABA2',
    backgroundColor: '#FDF7F3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  purple: {
    borderWidth: 4,
    borderRadius: 50,
    width: '18%',
    height: '75%',
    backgroundColor: '#E8D5DE',
    borderColor: '#533440',
    alignItems: 'center',
    justifyContent: 'center'
  },
  red: {
    borderWidth: 4,
    borderRadius: 50,
    width: '18%',
    height: '75%',
    backgroundColor: '#FFF0EE',
    borderColor: '#B03F34',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pastel: {
    borderWidth: 4,
    borderRadius: 50,
    width: '18%',
    height: '75%',
    backgroundColor: '#E3CEF0',
    borderColor: '#BBE7FE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  yellow: {
    borderWidth: 4,
    borderRadius: 50,
    width: '18%',
    height: '75%',
    backgroundColor: '#FFEABF',
    borderColor: '#DC9B18',
    alignItems: 'center',
    justifyContent: 'center'
  },
  brown: {
    borderWidth: 4,
    borderRadius: 50,
    width: '18%',
    height: '75%',
    backgroundColor: '#E4D4C8',
    borderColor: '#523A28',
    alignItems: 'center',
    justifyContent: 'center'
  },
  green: {
    borderWidth: 4,
    borderRadius: 50,
    width: '18%',
    height: '75%',
    backgroundColor: '#E6F6E8',
    borderColor: '#427248',
    alignItems: 'center',
    justifyContent: 'center'
  },
  blue: {
    borderWidth: 4,
    borderRadius: 50,
    width: '18%',
    height: '75%',
    backgroundColor: '#EEF8FF',
    borderColor: '#3B8BBB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  darkBlue: {
    borderWidth: 4,
    borderRadius: 50,
    width: '18%',
    height: '75%',
    backgroundColor: '#59586C',
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pink: {
    borderWidth: 4,
    borderRadius: 50,
    width: '18%',
    height: '75%',
    backgroundColor: '#FEF5F4',
    borderColor: '#E8B4B8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  earth: {
    borderWidth: 4,
    borderRadius: 50,
    width: '18%',
    height: '75%',
    backgroundColor: '#EEEEDD',
    borderColor: '#A45C40',
    alignItems: 'center',
    justifyContent: 'center'
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
