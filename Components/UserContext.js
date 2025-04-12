import React, { createContext, useContext, useState, useEffect } from 'react';
import Parse from 'parse/react-native';
import { Image } from 'react-native';
import { convertAvatar } from './ConvertAvatar';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const today = new Date();
  const currentDate = today.toISOString().slice(0, 10);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ID, setID] = useState('');
  const [age, setAge] = useState();
  const [avatar, setAvatar] = useState();
  const [savedEmail, setSavedEmail] = useState('');
  const [savedPassword, setSavedPassword] = useState('');
  const homeOrder = [
    "To-do status",
    "Næste to-do",
    "Dagligt overblik",
    "Streak",
    "ADHD fakta"
  ];

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await Parse.User.currentAsync();
      if (currentUser) {
        setUsername(currentUser.getUsername());
        setID(currentUser.id);
        setIsLoggedIn(true);
      } else {
        setUsername('');
        setID('');
        setIsLoggedIn(false);
      }
    };
    checkUser();
  }, []);

  const handleSignup = async (name, username, age, email, password, confirmPassword, avatar, type) => {
    setError('');
    const lowerCaseEmail = email.toLowerCase();
    const userNameExist = new Parse.Query(Parse.User);
    userNameExist.equalTo('username', username);
    const userExists = await userNameExist.first();

    if (userExists) {
      setError('Dette brugernavn er allerede i brug, vælg et nyt');
      return;
    }

    if (password !== confirmPassword) {
      setError('Kodeordene er ikke ens, prøv igen');
      return;
    }

    const user = new Parse.User();
    user.set('name', name);
    user.set('username', username);
    user.set('email', lowerCaseEmail);
    user.set('password', password);
    user.set('age', age);

    try {
      await user.signUp();

      const userSettings = new Parse.Object('Settings');
      userSettings.set('theme', 'yellow');
      userSettings.set('user', user);
      userSettings.set('modulesCompleted', []);
      userSettings.set('homeOrder', homeOrder);

      const userNotebook = new Parse.Object('Notebook');
      userNotebook.set('user', user);
      userNotebook.set('exercises', []);
      userNotebook.set('todo', []);
      userNotebook.set('notes', []);

      await userSettings.save();
      await userNotebook.save();

      if (type === 'avatar') {
        const assetSource = Image.resolveAssetSource(avatar);
        const newFile = await convertAvatar(assetSource);
        user.set('profilePicture', newFile);
      } else {
        user.set('profilePicture', avatar);
      }

      user.set('settings', userSettings);
      user.set('notebook', userNotebook);
      await user.save();

    } catch (error) {
      console.error('Error during signup:', error);
    }
    //setData(avatar, type);
    //handleLogin(savedEmail, savedPassword);
    setID(user.id);
    setUsername(user.getUsername());
    setIsLoggedIn(true);
  };

  const handleLogin = async (email, password) => {
    //setError('');
    const lowerCaseEmail = email.toLowerCase();

    try {
      const user = await Parse.User.logIn(lowerCaseEmail, password);
      setIsLoggedIn(true);
      setID(user.id);
      console.log('Success! User ID:', user.id);
      setUsername(user.getUsername());
    } catch (error) {
      console.error('Error while logging in user', error);
      //setError('Forkert email eller kodeord');
    }
  };

  const handleLogout = async (navigation) => {
    try {
      await Parse.User.logOut();
      setIsLoggedIn(false);
      setUsername('');
      setID('');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const updateUserProfile = async () => {
    const currentUser = await Parse.User.currentAsync();
    if (currentUser) {
      setUsername(currentUser.get('username'));
      setProfilePicture(currentUser.get('profilePicture'));
      setEmail(currentUser.get('email'));
      setName(currentUser.get('name'));
      setAge(currentUser.get('age'));
    }
  };

  return (
    <UserContext.Provider
      value={{
        username, email, name, error, profilePicture, isLoggedIn, ID, age,
        updateUserProfile, handleLogin, handleLogout, handleSignup,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);