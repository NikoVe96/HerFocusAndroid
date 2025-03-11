import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faListCheck,
  faGraduationCap,
  faBrain,
  faUser,
  faComments,
  faUsers,
  faRightFromBracket,
  faClock,
  faCalendarDay,
  faClipboardCheck,
  faCalendar,
  faSpinner,
  faPeopleRoof,
  faHeart,
  faPills,
  faLightbulb,
  faRectangleList,
  faGear,
  faLandmark,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import AccordionItem from '../Components/AccordionItem';
import TopNavigation from './TopNav';
import AddRoutine from '../Pages/Structure components/AddRoutine';
import AddTask from '../Pages/Structure components/AddTask';
import CalendarOverview from '../Pages/Structure components/CalendarOverview';
import FrontPage from '../Pages/General components/FrontPage'
import Profile from '../Pages/General components/Profile';
import UserSettings from '../Pages/General components/UserSettings';
import PickTopics from '../Pages/Knowledge base/PickTopic';
import PickModule from '../Pages/Learning components/PickModule';
import DailyOverview from '../Pages/Structure components/DailyOverview';
import PickSubject from '../Pages/Forum/PickSubject';
import { FavoritePosts } from '../Pages/Forum/FavoritePosts';
import FavoriteArticles from '../Pages/Knowledge base/FavoriteArticles';
import AppHistory from '../Pages/General components/AppHistory';
import ContactInformation from '../Pages/General components/ContactInformation';
import { useTheme } from '@react-navigation/native';
import SubjectArticles from '../Pages/Knowledge base/SubjectArticles';
import ViewArticle from '../Pages/Knowledge base/ViewArticle';
import StructureFrontPage from '../Pages/Structure components/StructureFrontPage';
import AddEvent from '../Pages/Structure components/AddEvent';
import Module from '../Pages/Learning components/Module';
import ModulesOverview from '../Pages/Learning components/ModulesOverview';
import Forum from '../Pages/Forum/Forum';
import IndividualPost from '../Pages/Forum/IndividualPost';
import { useUser } from '../Components/UserContext';
import Notebook from '../Pages/Structure components/Notebook';
import FutureTodo from '../Pages/Structure components/FutureTodo';
import Calendar from '../Pages/Structure components/Calendar';
import CompletedModules from '../Pages/Learning components/CompletedModules';
import Home from '../Pages/Homepage/Home';
import Add from '../Pages/Structure components/Add';

const Drawer = createDrawerNavigator();

const moduleSubjects = [
  {
    subject: 'Struktur og planlægning',
    description:
      'I dette modul vil du lære om forskellige værktøjer til at strukturere dit liv og din hverdag. For voksne med ADHD kan det være en fordel at have specifikke mål, tidsrammer og værktøjer til at opnå sine mål. Derfor har vi samlet nogle øvelser, der kan give dig de bedste chancer for success og forhåbentlig give mere overskud i hverdagen.',
    image: require('../Assets/images/learning_notebook.png'),
  },
];


function CustomDrawerContent({ navigation }) {
  const { colors } = useTheme();
  const { handleLogout } = useUser();

  return (
    <DrawerContentScrollView style={{ backgroundColor: colors.background }}>
      <AccordionItem
        title="Planlægning"
        icon={faListCheck}
        titleStyle={[{ color: colors.text }]}>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() => navigation.navigate('Add routine')}>
          <FontAwesomeIcon
            icon={faClock}
            size={15}
            style={{ marginRight: 10 }}
            color={colors.text}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.text }}>
            Tilføj en ny rutine{' '}
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.text, textColor: colors.text },
          ]}></View>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() => navigation.navigate('Add event')}>
          <FontAwesomeIcon
            icon={faCalendarDay}
            size={15}
            style={{ marginRight: 10 }}
            color={colors.text}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.text }}>
            Tilføj en ny begivenhed{' '}
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.text, textColor: colors.text },
          ]}></View>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() => navigation.navigate('Add task')}>
          <FontAwesomeIcon
            icon={faClipboardCheck}
            size={15}
            style={{ marginRight: 10 }}
            color={colors.text}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.text }}>
            Tilføj en ny todo{' '}
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.text, textColor: colors.text },
          ]}></View>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() => navigation.navigate('Calendar')}>
          <FontAwesomeIcon
            icon={faCalendar}
            size={15}
            color={colors.text}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.text }}>
            Kalender oversigt{' '}
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.text, textColor: colors.text },
          ]}></View>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() => navigation.navigate('Daily overview')}>
          <FontAwesomeIcon
            icon={faSpinner}
            size={15}
            color={colors.text}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.text }}>
            Dagligt overblik{' '}
          </Text>
        </TouchableOpacity>
      </AccordionItem>
      <AccordionItem
        title="Forum"
        icon={faComments}
        titleStyle={[{ color: colors.text }]}>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Familie',
              forumDescription:
                'I dette forum kan vi alle dele erfaringer, udfordringer og triumfer relateret til familierelationer.',
            })
          }>
          <FontAwesomeIcon
            icon={faPeopleRoof}
            size={15}
            color={colors.text}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.text }}>Familie </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.text, textColor: colors.text },
          ]}></View>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Relationer',
              forumDescription:
                'Relationer kan nogle gange være komplicerede, når man har ADHD. I dette forum kan du dele tips, frustrationer osv., der har med relationer at gøre.',
            })
          }>
          <FontAwesomeIcon
            icon={faHeart}
            size={15}
            color={colors.text}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.text }}>Relationer </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.text, textColor: colors.text },
          ]}></View>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Medicin',
              forumDescription:
                'Medicin kan være et svært emne at tale om. Hold venligst medicinensnakken til dette forum, og husk at kontakte en læge, hvis det er nødvendigt.',
            })
          }>
          <FontAwesomeIcon
            icon={faPills}
            size={15}
            color={colors.text}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.text }}>Medicin </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.text, textColor: colors.text },
          ]}></View>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Gode tips',
              forumDescription:
                'Det er altid rart at lære af andres gode erfaringer. Her kan du dele dine gode tips, men også lære hvad der hjælper for andre.',
            })
          }>
          <FontAwesomeIcon
            icon={faLightbulb}
            size={15}
            color={colors.text}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.text }}>Gode tips </Text>
        </TouchableOpacity>
      </AccordionItem>
      <AccordionItem
        title="Læringsmoduler"
        icon={faGraduationCap}
        titleStyle={[{ color: colors.text }]}>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() =>
            navigation.navigate('Module overview', {
              subject: moduleSubjects[0].subject,
              description: moduleSubjects[0].description,
              image: moduleSubjects[0].image,
            })
          }>
          <FontAwesomeIcon
            icon={faRectangleList}
            size={15}
            color={colors.text}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>
              Modul 1
            </Text>
            <Text style={{ fontSize: 18, color: colors.text, paddingRight: 5 }}>
              Strukturering og planlægning af dagligdagen{' '}
            </Text>
          </View>
        </TouchableOpacity>
      </AccordionItem>
      <View style={styles.accordContainer}>
        <TouchableOpacity
          style={styles.accordHeader}
          onPress={() => navigation.navigate('Pick topic')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon
              icon={faBrain}
              size={20}
              color={colors.text}
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.accordTitle, { color: colors.text }]}>
              Vidensbank
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.accordContainer}>
        <TouchableOpacity
          style={styles.accordHeader}
          onPress={() => navigation.navigate('Profile')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon
              icon={faUser}
              size={20}
              color={colors.text}
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.accordTitle, { color: colors.text }]}>
              Profil
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.accordContainer}>
        <TouchableOpacity
          style={styles.accordHeader}
          onPress={() => navigation.navigate('Settings')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon
              icon={faGear}
              size={20}
              color={colors.text}
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.accordTitle, { color: colors.text }]}>
              Indstillinger
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <AccordionItem
        title="Om herfocus"
        icon={faUsers}
        titleStyle={[{ color: colors.text }]}>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() => navigation.navigate('App history')}>
          <FontAwesomeIcon
            icon={faLandmark}
            size={15}
            color={colors.text}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.text }}>
            Historien om herfocus
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.text, textColor: colors.text },
          ]}></View>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() => navigation.navigate('Contact information')}>
          <FontAwesomeIcon
            icon={faAddressCard}
            size={15}
            color={colors.text}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.text }}>Kontakt os</Text>
        </TouchableOpacity>
      </AccordionItem>
      <View style={styles.accordContainer}>
        <TouchableOpacity
          style={styles.accordHeader}
          onPress={() => handleLogout(navigation)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size={20}
              color={colors.text}
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.accordTitle, { color: colors.text }]}>
              Log ud
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}


function SideMenu() {

  // const { updateUserProfile, username } = useUser();

  // const initialRouteName = username != '' ? 'Front page' : 'Login';

  // useFocusEffect(
  //   useCallback(() => {
  //     updateUserProfile();
  //     return () => { };
  //   }, [username]),
  // );

  return (
    <Drawer.Navigator
      initialRouteName="Front page"
      backBehavior="history"
      screenOptions={{
        drawerPosition: 'right',
        header: props => <TopNavigation {...props} />,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Front page" component={FrontPage}></Drawer.Screen>
      <Drawer.Screen name="Add routine" component={AddRoutine}></Drawer.Screen>
      <Drawer.Screen name="Add task" component={AddTask}></Drawer.Screen>
      <Drawer.Screen name="App history" component={AppHistory}></Drawer.Screen>
      <Drawer.Screen name="Future todo" component={FutureTodo}></Drawer.Screen>
      <Drawer.Screen
        name="Completed modules"
        component={CompletedModules}></Drawer.Screen>
      <Drawer.Screen name="Profile" component={Profile}></Drawer.Screen>
      <Drawer.Screen
        name="Contact information"
        component={ContactInformation}></Drawer.Screen>
      <Drawer.Screen
        name="Calendar"
        component={CalendarOverview}></Drawer.Screen>
      <Drawer.Screen name="Settings" component={UserSettings}></Drawer.Screen>
      <Drawer.Screen name="Pick topic" component={PickTopics}></Drawer.Screen>
      <Drawer.Screen name="Pick module" component={PickModule}></Drawer.Screen>
      <Drawer.Screen
        name="Daily overview"
        component={DailyOverview}></Drawer.Screen>
      <Drawer.Screen
        name="Pick subject"
        component={PickSubject}></Drawer.Screen>
      <Drawer.Screen
        name="Favorite posts"
        component={FavoritePosts}></Drawer.Screen>
      <Drawer.Screen
        name="Favorite articles"
        component={FavoriteArticles}></Drawer.Screen>
      <Drawer.Screen
        name="Subject articles"
        component={SubjectArticles}></Drawer.Screen>
      <Drawer.Screen
        name="View article"
        component={ViewArticle}></Drawer.Screen>
      <Drawer.Screen
        name="Module overview"
        component={ModulesOverview}></Drawer.Screen>
      <Drawer.Screen name="Module" component={Module}></Drawer.Screen>
      <Drawer.Screen name="Forum" component={Forum}></Drawer.Screen>
      <Drawer.Screen
        name="IndividualPost"
        component={IndividualPost}></Drawer.Screen>
      <Drawer.Screen
        name="Structure"
        component={StructureFrontPage}></Drawer.Screen>
      <Drawer.Screen name="Add event" component={AddEvent}></Drawer.Screen>
      <Drawer.Screen name="Notebook" component={Notebook}></Drawer.Screen>
      <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
      <Drawer.Screen name="Add" component={Add}></Drawer.Screen>
      <Drawer.Screen name="CalendarTest" component={Calendar}></Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accordContainer: {
    paddingBottom: 4,
  },
  accordHeader: {
    padding: 12,
    color: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  accordBody: {
    padding: 12,
  },
  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
  divider: {
    textWidth: 1,
    marginHorizontal: 15,
    marginVertical: 10,
    textRadius: 10
  }
});

export default SideMenu;
