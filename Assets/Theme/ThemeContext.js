import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Parse from 'parse/react-native';
import { DefaultTheme } from '@react-navigation/native';
import { useUser } from '../../Components/UserContext';


const ThemeContext = createContext();

const themes = {
  pastel: {
    ...DefaultTheme,
    gradient: true,
    gradientColors: ['#d9b1f2', '#BBE7FE', '#FFF6ED', '#FFF6ED'],
    colors: {
      ...DefaultTheme.colors,
      light: '#FFF6ED',
      lightShadow: '#fce4ac',
      lightMiddle: '#FEF5F4',
      lightMiddleShadow: '#ffe1de',
      middle: '#BBE7FE',
      middleShadow: '#9fdcfc',
      dark: '#E3CEF0',
      darkShadow: '#d9b1f2',
      lightText: 'white',
      darkText: '#E3CEF0',
    },
  },
  purple: {
    ...DefaultTheme,
    gradient: true,
    gradientColors: ['#533440', '#965683', '#E8D5DE', '#E8D5DE', '#E8D5DE', '#E8D5DE'],
    colors: {
      ...DefaultTheme.colors,
      light: '#E8D5DE',
      lightShadow: '#CDA4B7',
      lightMiddle: '#ebb7cf',
      lightMiddleShadow: '#cc8ba9',
      middle: '#965683',
      middleShadow: '#693b5b',
      dark: '#533440',
      darkShadow: '#40252f',
      lightText: 'white',
      darkText: '#533440',
    },
  },
  red: {
    ...DefaultTheme,
    gradient: true,
    gradientColors: ['#B03F34', '#E28277', '#FFF0EE', '#FFF0EE', '#FFF0EE', '#FFF0EE'],
    colors: {
      ...DefaultTheme.colors,
      light: '#FFF0EE',
      lightShadow: '#f7c7c1',
      lightMiddle: '#FFEABF',
      lightMiddleShadow: '#f5d79a',
      middle: '#E28277',
      middleShadow: '#c2584c',
      dark: '#B03F34',
      darkShadow: '#8c291f',
      lightText: 'white',
      darkText: '#B03F34',
    },
  },
  yellow: {
    ...DefaultTheme,
    gradient: true,
    gradientColors: ['#DC9B18', '#F9C459', '#FFF6ED', '#FFF6ED', '#FFF6ED', '#FFF6ED', '#FFF6ED'],
    colors: {
      ...DefaultTheme.colors,
      light: '#FFF6ED',
      lightShadow: '#fce4ac',
      lightMiddle: '#FFEABF',
      lightMiddleShadow: '#f5d79a',
      middle: '#F9C459',
      middleShadow: '#e0a938',
      dark: '#DC9B18',
      darkShadow: '#bd7f04',
      lightText: 'white',
      darkText: '#DC9B18',
    },
  },
  brown: {
    ...DefaultTheme,
    gradient: true,
    gradientColors: ['#523A28', '#A47551', '#FFF6ED', '#E4D4C8', '#E4D4C8', '#E4D4C8'],
    colors: {
      ...DefaultTheme.colors,
      light: '#E4D4C8',
      lightShadow: '#d9baa3',
      lightMiddle: '#ebc5a9',
      lightMiddleShadow: '#deab85',
      middle: '#A47551',
      middleShadow: '#8f5e39',
      dark: '#523A28',
      darkShadow: '#402c1d',
      lightText: 'white',
      darkText: '#523A28',
    },
  },
  turqouise: {
    ...DefaultTheme,
    gradient: true,
    gradientColors: ['#0C6170', '#A4E5E0', '#DBF5F0', '#DBF5F0', '#DBF5F0'],
    colors: {
      ...DefaultTheme.colors,
      light: '#DBF5F0',
      lightShadow: '#fce4ac',
      lightMiddle: '#94ebe4',
      lightMiddleShadow: '#79d1ca',
      middle: '#A4E5E0',
      middleShadow: '#85c9c4',
      dark: '#0C6170',
      darkShadow: '#04515e',
      lightText: 'white',
      darkText: '#0C6170',
    },
  },
  beige: {
    ...DefaultTheme,
    gradient: true,
    gradientColors: ['#C6ABA2', '#F3D9C9', '#FDF7F3', '#FDF7F3', '#FDF7F3'],
    colors: {
      ...DefaultTheme.colors,
      light: '#FDF7F3',
      lightShadow: '#e8d6ca',
      lightMiddle: '#f0cdb6',
      lightMiddleShadow: '#c9a389',
      middle: '#F3D9C9',
      middleShadow: '#d9b29a',
      dark: '#C6ABA2',
      darkShadow: '#a88b82',
      lightText: 'white',
      darkText: '#C6ABA2',
    },
  },
  green: {
    ...DefaultTheme,
    gradient: true,
    gradientColors: ['#1A5319', '#508D4E', '#D6EFD8', '#D6EFD8', '#D6EFD8', '#D6EFD8'],
    colors: {
      ...DefaultTheme.colors,
      light: '#D6EFD8',
      lightShadow: '#b4d1b6',
      lightMiddle: '#80AF81',
      lightMiddleShadow: '#5f8c60',
      middle: '#508D4E',
      middleShadow: '#3b7039',
      dark: '#1A5319',
      darkShadow: '#0d330d',
      lightText: 'white',
      darkText: '#1A5319',
    },
  },
  blue: {
    ...DefaultTheme,
    gradient: true,
    gradientColors: ['#3B8BBB', '#CAE4F6', '#EEF8FF', '#EEF8FF'],
    colors: {
      ...DefaultTheme.colors,
      light: '#EEF8FF',
      lightShadow: '#c1e1f7',
      lightMiddle: '#b7ddf7',
      lightMiddleShadow: '#97c7e8',
      middle: '#CAE4F6',
      middleShadow: '#9dd1f5',
      dark: '#3B8BBB',
      darkShadow: '#2473a3',
      lightText: 'white',
      darkText: '#3B8BBB',
    },
  },
  darkblue: {
    ...DefaultTheme,
    gradient: true,
    gradientColors: ['#121212', '#1a1a2e', '#16213e', '#0f3460'],
    colors: {
      ...DefaultTheme.colors,
      light: '#1c1c1c',
      lightShadow: '#2a2a2a',
      lightMiddle: '#242424',
      lightMiddleShadow: '#2d2d2d',
      middle: '#323232',
      middleShadow: '#3a3a3a',
      dark: '#59586C',
      darkShadow: '#3b3a4f',
      lightText: '#FFFFFF',
      darkText: '#CCCCCC',
    },
  },
  earth: {
    ...DefaultTheme,
    gradient: true,
    gradientColors: ['#A45C40', '#E4B7A0', '#EEEEDD', '#EEEEDD', '#EEEEDD'],
    colors: {
      ...DefaultTheme.colors,
      light: '#EEEEDD',
      lightShadow: '#c2c2a5',
      lightMiddle: '#f5d4b8',
      lightMiddleShadow: '#f2dbc7',
      middle: '#E4B7A0',
      middleShadow: '#c79479',
      dark: '#A45C40',
      darkShadow: '#7d4028',
      lightText: 'white',
      darkText: '#A45C40',
    },
  },
  pink: {
    ...DefaultTheme,
    gradient: true,
    gradientColors: ['#E8B4B8', '#EED6D3', '#FEF5F4', '#FEF5F4', '#FEF5F4'],
    colors: {
      ...DefaultTheme.colors,
      light: '#FEF5F4',
      lightShadow: '#edd4d1',
      lightMiddle: '#fad8d4',
      lightMiddleShadow: '#e8bab5',
      middle: '#EED6D3',
      middleShadow: '#dbb4af',
      dark: '#E8B4B8',
      darkShadow: '#c48b90',
      lightText: 'white',
      darkText: '#E8B4B8',
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
        if (ID) {
          const themeQ = new Parse.Query('Settings');
          themeQ.contains('user', ID)
          const Result = await themeQ.find();
          const chosenTheme = Result[0].get('theme') || 'yellow';
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
      const query = new Parse.Query('Settings');
      query.equalTo('user', {
        __type: 'Pointer',
        className: '_User',
        objectId: ID,
      });
      const results = await query.find();
      if (results.length > 0) {
        results[0].set('theme', newThemeName);
        await results[0].save();
        setTheme(themes[newThemeName] || themes.yellow);
      } else {
        throw new Error("No settings found for this user.");
      }
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
