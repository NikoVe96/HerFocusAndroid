import ForgotPassword from '../Pages/General components/ForgotPassword';
import LogIn from '../Pages/General components/Login'
import SignUp from '../Pages/General components/SignUp';
import FrontPage from '../Pages/General components/FrontPage';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';


function LogInNav() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Login" component={LogIn}></Drawer.Screen>
      <Drawer.Screen
        name="Forgot password"
        component={ForgotPassword}></Drawer.Screen>
      <Drawer.Screen name="Sign up" component={SignUp}></Drawer.Screen>
      <Drawer.Screen name="Front page" component={FrontPage}></Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default LogInNav;
