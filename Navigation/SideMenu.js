import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View, StyleSheet, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faListCheck,
  faGraduationCap,
  faBrain,
  faComments,
  faUsers,
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
  faLandmark,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons';
import AccordionItem from '../Components/AccordionItem';
import TopNavigation from './TopNav';
import FrontPage from '../Pages/General components/FrontPage'
import Profile from '../Pages/General components/Profile';
import UserSettings from '../Pages/General components/UserSettings';
import PickTopics from '../Pages/Knowledge base/PickTopic';
import PickModule from '../Pages/Learning components/PickModule';
import PickSubject from '../Pages/Forum/PickSubject';
import { FavoritePosts } from '../Pages/Forum/FavoritePosts';
import FavoriteArticles from '../Pages/Knowledge base/FavoriteArticles';
import AppHistory from '../Pages/General components/AppHistory';
import ContactInformation from '../Pages/General components/ContactInformation';
import { useTheme } from '@react-navigation/native';
import SubjectArticles from '../Pages/Knowledge base/SubjectArticles';
import ViewArticle from '../Pages/Knowledge base/ViewArticle';
import StructureFrontPage from '../Pages/Structure components/StructureFrontPage';
import Module from '../Pages/Learning components/Module';
import ModulesOverview from '../Pages/Learning components/ModulesOverview';
import Forum from '../Pages/Forum/Forum';
import IndividualPost from '../Pages/Forum/IndividualPost';
import { useUser } from '../Components/UserContext';
import Notebook from '../Pages/Structure components/Notebook';
import Todos from '../Pages/Structure components/Todos';
import FutureTodo from '../Pages/Structure components/FutureTodo';
import Calendar from '../Pages/Structure components/Calendar';
import CompletedModules from '../Pages/Learning components/CompletedModules';
import Home from '../Pages/Homepage/Home';
import Add from '../Pages/Structure components/Add';
import EditProfile from '../Pages/General components/EditProfile';
import WidgetOrder from '../Pages/Homepage/Widgets/WidgetOrder';

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
  const { handleLogout, profilePicture, username } = useUser();

  return (
    <DrawerContentScrollView style={{ backgroundColor: colors.light }}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        {profilePicture && <Image source={{ uri: profilePicture.url() }} style={styles.avatarImage} />}
        <Text style={{ alignSelf: 'center', fontSize: 26, fontWeight: 'bold', marginTop: '2%' }}>{username}</Text>
        <View
          style={{
            borderWidth: 1,
            marginHorizontal: 15,
            marginBottom: 20,
            backgroundColor: colors.dark,
            borderRadius: 10,
            borderColor: colors.dark,
            marginTop: '5%'
          }}></View>
      </TouchableOpacity>
      <AccordionItem
        title="Planlægning"
        icon={faListCheck}
        titleStyle={[{ color: colors.darkText }]}>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.darkText, textColor: colors.darkText },
          ]}></View>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() => navigation.navigate('Calendar')}>
          <FontAwesomeIcon
            icon={faCalendar}
            size={15}
            color={colors.darkText}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.darkText }}>
            Kalender oversigt{' '}
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.darkText, textColor: colors.darkText },
          ]}></View>
      </AccordionItem>
      <AccordionItem
        title="Forum"
        icon={faComments}
        titleStyle={[{ color: colors.darkText }]}>
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
            color={colors.darkText}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.darkText }}>Familie </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.darkText, textColor: colors.darkText },
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
            color={colors.darkText}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.darkText }}>Relationer </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.darkText, textColor: colors.darkText },
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
            color={colors.darkText}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.darkText }}>Medicin </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.darkText, textColor: colors.darkText },
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
            color={colors.darkText}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.darkText }}>Gode tips </Text>
        </TouchableOpacity>
      </AccordionItem>
      <AccordionItem
        title="Læringsmoduler"
        icon={faGraduationCap}
        titleStyle={[{ color: colors.darkText }]}>
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
            color={colors.darkText}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', color: colors.darkText }}>
              Modul 1
            </Text>
            <Text style={{ fontSize: 18, color: colors.darkText, paddingRight: 5 }}>
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
              color={colors.darkText}
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.accordTitle, { color: colors.darkText }]}>
              Vidensbank
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <AccordionItem
        title="Om herfocus"
        icon={faUsers}
        titleStyle={[{ color: colors.darkText }]}>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() => navigation.navigate('App history')}>
          <FontAwesomeIcon
            icon={faLandmark}
            size={15}
            color={colors.darkText}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.darkText }}>
            Historien om herfocus
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.divider,
            { backgroundColor: colors.darkText, textColor: colors.darkText },
          ]}></View>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center' }}
          onPress={() => navigation.navigate('Contact information')}>
          <FontAwesomeIcon
            icon={faAddressCard}
            size={15}
            color={colors.darkText}
            style={{ marginRight: 10 }}></FontAwesomeIcon>
          <Text style={{ fontSize: 18, color: colors.darkText }}>Kontakt os</Text>
        </TouchableOpacity>
      </AccordionItem>
    </DrawerContentScrollView>
  );
}


function SideMenu() {

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={{
        drawerPosition: 'right',
        header: props => <TopNavigation {...props} />,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Front page" component={FrontPage}></Drawer.Screen>
      <Drawer.Screen name="App history" component={AppHistory}></Drawer.Screen>
      <Drawer.Screen name="Future todo" component={FutureTodo}></Drawer.Screen>
      <Drawer.Screen name="Todos" component={Todos}></Drawer.Screen>
      <Drawer.Screen
        name="Completed modules"
        component={CompletedModules}></Drawer.Screen>
      <Drawer.Screen name="Profile" component={Profile}></Drawer.Screen>
      <Drawer.Screen
        name="Contact information"
        component={ContactInformation}></Drawer.Screen>
      <Drawer.Screen name="Settings" component={UserSettings}></Drawer.Screen>
      <Drawer.Screen name="Pick topic" component={PickTopics}></Drawer.Screen>
      <Drawer.Screen name="Pick module" component={PickModule}></Drawer.Screen>
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
      <Drawer.Screen name="Notebook" component={Notebook}></Drawer.Screen>
      <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
      <Drawer.Screen name="Add" component={Add}></Drawer.Screen>
      <Drawer.Screen name="Calendar" component={Calendar}></Drawer.Screen>
      <Drawer.Screen name="Edit profile" component={EditProfile}></Drawer.Screen>
      <Drawer.Screen name="Home order" component={WidgetOrder}></Drawer.Screen>
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
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    marginTop: '2%'
  },
});

export default SideMenu;
