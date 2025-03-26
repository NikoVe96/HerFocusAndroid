import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    Modal,
    FlatList,
    TextInput,
    SafeAreaView,
    Alert
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@react-navigation/native';
import { useUser } from '../../Components/UserContext';
import SelectAvatar from './SelectAvatar';
import Parse from 'parse/react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export const EditProfile = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const { colors } = useTheme();
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const [profilePicture, setProfilePicture] = useState();
    const [newAvatar, setNewAvatar] = useState();
    const { username, name, email, updateUserProfile, ID, age } = useUser();
    const [newName, setNewName] = useState(name);
    const [newAge, setNewAge] = useState(age);
    const [newEmail, setNewEmail] = useState(email);
    const [newUsername, setNewUsername] = useState(username);

    const handleAvatarSelect = (avatar) => {
        setNewAvatar(avatar);
        setModalVisible(false);
        console.log(newAvatar);
    };

    async function save() {
        const currentUser = await Parse.User.currentAsync();

        try {
            //currentUser.set('profilePicture', newAvatar);
            currentUser.set('name', newName);
            currentUser.set('username', newUsername);
            currentUser.set('email', newEmail);
            currentUser.set('age', newAge);
            currentUser.set('profilePicture', newAvatar);

            await currentUser.save();
            updateUserProfile();
            Alert.alert('Din profil er blevet opdateret!')

            navigation.navigate('Profile')
        } catch (error) {
            Alert.alert('Der opstod en fejl.');
            console.error(error);
        }
    }

    function setName(input) {
        setNewName(input);
        console.log(input);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <TouchableOpacity style={{
                    padding: '5%', backgroundColor: 'white', alignSelf: 'center', marginVertical: '5%',
                    width: '40%', height: '20%', borderColor: 'white', justifyContent: 'center', alignItems: 'center',
                    borderRadius: 100
                }}
                    onPress={() => setModalVisible(true)}>
                    <FontAwesomeIcon icon={faPen} color={colors.dark} size={40} />
                    <Text style={{ textAlign: 'center', marginTop: '10%' }}>Rediger profilbillede</Text>
                </TouchableOpacity>
                <View style={{ marginVertical: '2%', marginHorizontal: '5%', }}>
                    <Text style={{ fontSize: 16, marginBottom: '1%', color: colors.dark }}>Navn</Text>
                    <TextInput
                        onChangeText={(input) => setName(input)}
                        style={styles.textInput}
                        //value={name} 
                        placeholder={name}
                    />
                </View>
                <View style={{ marginVertical: '2%', marginHorizontal: '5%', }}>
                    <Text style={{ fontSize: 16, marginBottom: '1%', color: colors.dark }}>Brugernavn</Text>
                    <TextInput
                        onChangeText={(input) => setNewUsername(input)}
                        style={styles.textInput}
                        placeholder={username} />
                </View>
                <View style={{ marginVertical: '2%', marginHorizontal: '5%', }}>
                    <Text style={{ fontSize: 16, marginBottom: '1%', color: colors.dark }}>Alder</Text>
                    <TextInput
                        onChangeText={(input) => setNewAge(input)}
                        style={styles.textInput}
                        placeholder={age}
                    />
                </View>
                <View style={{ marginVertical: '2%', marginHorizontal: '5%', }}>
                    <Text style={{ fontSize: 16, marginBottom: '1%', color: colors.dark }}>Email</Text>
                    <TextInput
                        onChangeText={(input) => setNewEmail(input)}
                        style={styles.textInput}
                        placeholder={email} />
                </View>
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType='slide'
                    backdropColor='black'
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <SelectAvatar
                                onSelect={handleAvatarSelect} />
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.middle, marginBottom: 100, marginTop: '15%' }]}
                    onPress={() => save()}>
                    <Text styles={[styles.buttonText, { color: colors.dark }]}>Gem</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 0, 0, 0.9)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        //padding: '2%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '80%'
    },
    button: {
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: '5%',
        marginVertical: '3%',
        borderWidth: 0.4,
        borderBottomWidth: 4,
        borderColor: "#F8B52D",
        borderRadius: 15,
        justifyContent: 'center',
        marginHorizontal: '10%'
    },
    buttonText: {
        fontSize: 22,
        textAlign: 'center',
    },
    textInput: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        padding: '4%',
        fontSize: 18
    }
});

export default EditProfile;