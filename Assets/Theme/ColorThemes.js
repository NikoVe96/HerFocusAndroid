import { DefaultTheme } from '@react-navigation/native';

const YellowTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#FFEABF',
        primary: '#DC9B18',
        background: '#FFF6ED',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const BlueTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#68669D',
        primary: '#131227',
        background: '#393751',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const GreenTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#71CA81',
        primary: '#0F9D58',
        background: '#C8E6C9',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const RedTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        light: '#F19C9B',
        primary: '#D33F49',
        background: '#FFEBEE',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const themes = {
    yellow: YellowTheme,
    blue: BlueTheme,
    green: GreenTheme,
    red: RedTheme,
    default: DefaultTheme,
};