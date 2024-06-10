import React, { createContext, useContext, useState, useEffect } from 'react';
import Parse from 'parse/react-native';

export const UserContext = createContext(null);


export const UserProvider = ({ children }) => {
  const today = new Date;
  const currentDate = today.toISOString().slice(0, 10);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [taskProgress, setTaskProgress] = useState(0);
  const [remainingTasks, setRemainingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     const currentUser = await Parse.User.currentAsync();
  //     if (currentUser) {
  //       setUsername(currentUser.getUsername());
  //       console.log('username success: ' + username);
  //     } else {
  //       setUsername(''); // Ensure username is empty if no user is logged in
  //       console.log('username fail: ' + username);
  //     }
  //   };
  //   checkUser();

  // }, []);


  const handleSignup = async (
    name,
    username,
    email,
    password,
    confirmPassword,
    navigation,
    avatar,
  ) => {
    setError('');

    const lowerCaseEmail = email.toLowerCase();

    const userNameExist = new Parse.Query('User');
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
    user.set('avatar', avatar);

    const userSettings = new Parse.Object('Settings');
    userSettings.set('theme', 'yellow');
    userSettings.set('user', user);
    userSettings.set('modulesCompleted', []);

    const userNotebook = new Parse.Object('Notebook');
    userNotebook.set('user', user);
    userNotebook.set('exercises', []);
    userNotebook.set('todo', []);
    userNotebook.set('notes', []);

    try {
      await user.signUp();
      await userSettings.save();
      await userNotebook.save();
      user.set('settings', userSettings);
      user.set('notebook', userNotebook);
      await user.save();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleLogin = async (email, password, navigation) => {
    setError('');

    const lowerCaseEmail = email.toLowerCase();

    try {
      const user = await Parse.User.logIn(lowerCaseEmail, password);
      setIsLoggedIn(true);
      console.log('Success! User ID:', user.id);
      navigation.navigate('Front page');
      setUsername(user.getUsername());
    } catch (error) {
      console.error('Error while logging in user', error);
      setError('Forkert email eller kodeord');
    }
  };

  const handleLogout = async (navigation) => {
    try {
      await Parse.User.logOut();
      setIsLoggedIn(false);
      setUsername('');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const updateUserProfile = async () => {
    const currentUser = await Parse.User.currentAsync();
    if (currentUser) {
      setUsername(currentUser.get('username'));
      setAvatar(currentUser.get('avatar'));
      setEmail(currentUser.get('email'));
      setName(currentUser.get('name'));
    }
  };

  const updateTaskProgress = async () => {
    const completed = await getCompletedTasks();
    const remaining = await getRemainingTasks();
    console.log('hej' + remaining.length);
    console.log('hej' + completed.length);
    const totalTasks = remainingTasks.length + completedTasks.length;
    const completedPercentage = totalTasks > 0 ? (completedTasks.length / totalTasks * 100).toFixed(0) : 0;
    setTaskProgress(completedPercentage);
  }

  const getRemainingTasks = async () => {
    const currentUser = Parse.User.current();
    let TaskQuery = new Parse.Query('Task');
    TaskQuery.contains('user', currentUser.id);
    TaskQuery.contains('date', currentDate);
    TaskQuery.equalTo('completed', false);
    TaskQuery.notEqualTo('futureTask', true);
    TaskQuery.ascending('startTime')
    let Results = await TaskQuery.find();
    setRemainingTasks(Results);
    console.log('remaining: ' + Results)
    return Results;
  }

  const getCompletedTasks = async () => {
    const currentUser = Parse.User.current();
    console.log('dateCompleted: ' + currentDate);
    let TaskQuery = new Parse.Query('Task');
    TaskQuery.contains('user', currentUser.id);
    TaskQuery.contains('date', currentDate);
    TaskQuery.equalTo('completed', true);
    TaskQuery.ascending('startTime')
    let Results = await TaskQuery.find();
    setCompletedTasks(Results);
    console.log('completed: ' + Results)
    return Results;
  }

  return (
    <UserContext.Provider
      value={{
        username, email, name, error, avatar, taskProgress, remainingTasks, completedTasks, isLoggedIn,
        updateUserProfile, handleLogin, handleLogout, handleSignup, updateTaskProgress, getRemainingTasks, getCompletedTasks
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);