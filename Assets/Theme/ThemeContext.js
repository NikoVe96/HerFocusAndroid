import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Parse from 'parse/react-native';
import { DefaultTheme } from '@react-navigation/native';
import { useUser } from '../../Components/UserContext';

const ThemeContext = createContext();

const PastelTheme = {
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
};

const PurpleTheme = {
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
};

const RedTheme = {
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
};

const YellowTheme = {
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
};

const GreenTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    Bars: '#69A046',
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
};

const BlueTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    Bars: '#6AABD2',
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
};

const DarkBlueTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    Bars: '#131227',
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
};

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    Bars: '#000000',
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
};

const NeutralTheme = {
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
};

const themes = {
  pastel: PastelTheme,
  purple: PurpleTheme,
  red: RedTheme,
  yellow: YellowTheme,
  green: GreenTheme,
  blue: BlueTheme,
  darkblue: DarkBlueTheme,
  dark: DarkTheme,
  neutral: NeutralTheme,
  default: DefaultTheme,
};

export function useThemeContext() {
  return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState();
  const [ID, setID] = useState('');
  const { isLoggedIn } = useUser();

  useEffect(() => {
    const getTheme = async () => {
      try {
        if (isLoggedIn) {
          let themeQ = new Parse.Query('Settings');
          themeQ.contains('user', ID);
          console.log(ID);
          const Result = await themeQ.find();
          const chosenTheme = Result[0].get('theme');
          setTheme(themes[chosenTheme] || themes.yellow);

        } else {
          setTheme(themes.yellow);
        }
      } catch (error) {
        console.error('Error fetching user theme:', error);
        setTheme(themes.yellow);
      }
    };
    getTheme();
  }, []);


  const updateTheme = async newThemeName => {
    const currentUser = await Parse.User.currentAsync();
    const userSettings = currentUser.get('settings');
    await userSettings.fetch();


    userSettings.set('theme', newThemeName);
    try {
      await userSettings.save();
    } catch (error) {
      Alert.alert('Error:', error.message);
    }
    setTheme(themes[newThemeName] || themes.yellow);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
