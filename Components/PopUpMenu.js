
import { StyleSheet } from "react-native";
import React from "react";
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";

const PopUpMenu = ({ navigation }) => {
    return (
        <MenuProvider style={styles.container}>
            <Menu>
                <MenuTrigger
                    text="Click for Option menu"
                    style={{ backgroundColor: 'grey' }}
                >
                </MenuTrigger>
                <MenuOptions
                    style={{ backgroundColor: 'blue' }}>
                    <MenuOption onSelect={() => navigation.navigate('Add task')} text="tilføj en ny to-do" />
                    <MenuOption onSelect={() => navigation.navigate('Add event')} text="tilføj et nyt event" />
                    <MenuOption onSelect={() => navigation.navigate('Add routine')} text="tilføj en ny rutine" />
                </MenuOptions>
            </Menu>
        </MenuProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 50,
        backgroundColor: "#fff",



    },
});

export default PopUpMenu;