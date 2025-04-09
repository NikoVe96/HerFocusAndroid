import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from './Navigation/BottomNav';
import SideMenu from './Navigation/SideMenu';
import LoginNav from './Navigation/LoginNav';
import { NavigationContainer } from '@react-navigation/native';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider, useThemeContext } from './Assets/Theme/ThemeContext';
import { UserProvider, useUser } from './Components/UserContext';
import { configurePushNotifications } from './Components/PushNotificationMethods';
import { PermissionsAndroid, Alert, StatusBar } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import LinearGradient from 'react-native-linear-gradient';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('JgIXR8AGoB3f1NzklRf0k9IlIWLORS7EzWRsFIUb', 'NBIxAIeWCONMHjJRL96JpIFh9pRKzJgb6t4lQUJD');
Parse.serverURL = 'https://parseapi.back4app.com/';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
configurePushNotifications();

export const getSessionToken = async () => {
  const sessionToken = await AsyncStorage.getItem('sessionToken');
  return sessionToken;
};

function App() {
  const { theme } = useThemeContext();
  const { isLoggedIn } = useUser();
  const gradientColors = theme.gradient
    ? theme.gradientColors
    : [theme.colors.background, theme.colors.background];


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
      />
      <LinearGradient colors={gradientColors} style={{ flex: 1 }} >
        <NavigationContainer theme={{
          ...theme,
          colors: {
            ...theme.colors,
            // Set background to transparent so the gradient shows
            background: 'transparent',

          },
        }}>
          {isLoggedIn ? (
            <SafeAreaView style={{ flex: 1 }}>
              <SideMenu />
              <BottomNavigation />
            </SafeAreaView>
          ) : (
            <SafeAreaView style={{ flex: 1 }}>
              <LoginNav />
            </SafeAreaView>
          )}
        </NavigationContainer>
      </LinearGradient>
    </GestureHandlerRootView >
  );
}

function AppWrapper() {
  return (
    <UserProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserProvider>
  );
}

export default AppWrapper;
