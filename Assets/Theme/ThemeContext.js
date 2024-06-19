import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Parse from 'parse/react-native';
import { DefaultTheme } from '@react-navigation/native';
import { useUser } from '../../Components/UserContext';

const ThemeContext = createContext();

const themes = {
  pastel: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      bars: '#FFC1D4',
      background: '#FEEED4',
      text: 'black',
      barText: 'black',
      border: '#FFC1D4',
      notification: '#BEF0CD',
      iconLight: 'white',
      iconDark: 'black',
      mainButton: '#E7CCF7',
      subButton: '#BBE7FE',
    },
  },
  purple: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      bars: '#533440',
      background: '#E8D5DE',
      text: 'black',
      barText: 'white',
      border: '#533440',
      notification: '#B083A8',
      iconLight: 'white',
      iconDark: 'black',
      mainButton: '#8C5581',
      subButton: '#E7C1E0',
    },
  },
  red: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      bars: '#BF4C41',
      background: '#FFF8F7',
      text: 'black',
      barText: 'black',
      border: '#BF4C41',
      notification: '#FFD2CD',
      iconLight: 'white',
      iconDark: 'black',
      mainButton: '#F7A399',
      subButton: '#FFD2CD',
    },
  },
  yellow: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      bars: '#DC9B18',
      background: '#FFF6ED',
      text: 'black',
      barText: 'black',
      border: '#DC9B18',
      notification: '#FFEABF',
      iconLight: 'white',
      iconDark: 'black',
      mainButton: '#F2C56B',
      subButton: '#FFEABF',
    },
  },
  green: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      bars: '#69A046',
      background: '#E7F7ED',
      text: 'black',
      barText: 'black',
      border: '#69A046',
      notification: '#94C973',
      iconLight: 'white',
      iconDark: 'black',
      mainButton: '#94C973',
      subButton: '#C1E3B0',
    },
  },
  blue: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      bars: '#6AABD2',
      background: '#D9E4EC',
      text: 'black',
      barText: 'black',
      border: '#6AABD2',
      notification: '#5B77AC',
      iconLight: 'white',
      iconDark: 'black',
      mainButton: '#4C8BB0',
      subButton: '#A1C9E7',
    },
  },
  darkblue: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      bars: '#131227',
      background: '#393751',
      text: 'white',
      barText: 'white',
      border: '#131227',
      notification: '#414062',
      iconLight: '#E4BEED',
      iconDark: 'black',
      mainButton: '#131227',
      subButton: '#68669D',
    },
  },
  dark: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      bars: '#000000',
      background: '#252121',
      text: 'white',
      barText: 'white',
      border: '#000000',
      notification: '#4F4848',
      iconLight: 'white',
      iconDark: 'black',
      mainButton: '#000000',
      subButton: '#4F4848',
    },
  },
  neutral: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      bars: '#B7897C',
      background: '#EDE7DC',
      text: 'black',
      barText: 'black',
      border: '#B7897C',
      notification: '#E1A898',
      iconLight: 'white',
      iconDark: 'black',
      mainButton: '#E1A898',
      subButton: '#E7D2CC',
    },
  },
  default: DefaultTheme,
};

export function useThemeContext() {
  return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.default);
  const { isLoggedIn, ID } = useUser();

  useEffect(() => {
    const getTheme = async () => {
      try {
        if (isLoggedIn && ID) {
          const themeQ = new Parse.Query('Settings');
          themeQ.equalTo('user', {
            __type: 'Pointer',
            className: '_User',
            objectId: ID,
          });
          const Result = await themeQ.first();
          const chosenTheme = Result?.get('theme') || 'yellow';
          setTheme(themes[chosenTheme]);
        } else {
          setTheme(themes.yellow);
        }
      } catch (error) {
        console.error('Error fetching user theme:', error);
        setTheme(themes.yellow);
      }
    };
    getTheme();
  }, [isLoggedIn, ID]);

  const updateTheme = async newThemeName => {
    try {
      const currentUser = await Parse.User.currentAsync();
      const userSettings = currentUser.get('settings');
      await userSettings.fetch();
      userSettings.set('theme', newThemeName);
      await userSettings.save();
      setTheme(themes[newThemeName] || themes.yellow);
    } catch (error) {
      Alert.alert('Error:', error.message);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
