import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect, useContext, useCallback } from 'react';
import Animated from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Parse from 'parse/react-native';

export const PickModule = () => {
  const navigation = useNavigation();
  const [structureProgress, setStructureProgress] = useState('0');
  const [generalProgress, setGeneralProgress] = useState('0');
  const [relationsProgress, setRelationsProgress] = useState('0');
  const [womenProgress, setWomenProgress] = useState('0');
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const { colors } = useTheme();

  const moduleSubjects = [
    {
      subject: 'Struktur og planlægning',
      description: 'I dette modul vil du lære om forskellige værktøjer til at strukturere dit liv og din hverdag. For voksne med ADHD kan det være en fordel at have specifikke mål, tidsrammer og værktøjer til at opnå sine mål. Derfor har vi samlet nogle øvelser, der kan give dig de bedste chancer for success og forhåbentlig give mere overskud i hverdagen.',
      image: require('../../Assets/images/icons/schedule.png'),
    },
    {
      subject: 'Generel AD(H)D',
      description:
        'Dette emne fokuserer på at give en dybdegående forståelse af ADHD som tilstand. Du vil blive introduceret til de neurologiske aspekter bag ADHD og de dagligdags udfordringer, som følger med tilstanden. Emnet indeholder redskaber og strategier til at skabe struktur, sætte målbare delmål og udvikle personligt tilpassede løsninger, som kan reducere stress og øge produktiviteten i hverdagen.',
      image: require('../../Assets/images/icons/psychology(2).png'),
    },
    {
      subject: 'AD(H)D og relationer',
      description:
        'Dette emne undersøger, hvordan ADHD påvirker både private og professionelle relationer. Her lærer du at identificere og adressere kommunikationsudfordringer, håndtere konflikter og opbygge støttende netværk. Ved at arbejde med konkrete kommunikationsstrategier og selvrefleksion kan du opnå en bedre forståelse af, hvordan ADHD indvirker på dine interaktioner med andre – og dermed styrke dine relationer.',
      image: require('../../Assets/images/icons/relationship(1).png'),
    },
    {
      subject: 'Kvinder med AD(H)D',
      description:
        'Dette emne er specielt udviklet til kvinder med ADHD og fokuserer på de unikke aspekter ved, hvordan ADHD manifesterer sig hos kvinder. Emnet belyser, at kvinder ofte oplever mere subtile og indre symptomer, der kan have stor betydning for deres dagligdag. Indholdet dækker strategier for selvomsorg, håndtering af dagligdags udfordringer, udvikling af sunde relationer samt karriere- og personlig udvikling. Målet er at øge bevidstheden om de særlige udfordringer og styrker, som kvinder med ADHD møder, og at tilbyde redskaber til at fremme både personlig og professionel vækst.',
      image: require('../../Assets/images/icons/female.png'),
    },
  ];

  useEffect(() => {
    getProgress('Struktur og planlægning');
    getProgress('Generel AD(H)D');
    getProgress('AD(H)D og relationer');
    getProgress('Kvinder med AD(H)D');

  }, []);

  useFocusEffect(
    useCallback(() => {
      getProgress('Struktur og planlægning');
      getProgress('Generel AD(H)D');
      getProgress('AD(H)D og relationer');
      getProgress('Kvinder med AD(H)D');
    }, [])
  )

  async function getProgress(subject) {
    const currentUser = await Parse.User.currentAsync();

    let totalModulesQ = new Parse.Query('LearningModules');
    totalModulesQ.equalTo('subject', subject);
    const totalModulesResults = await totalModulesQ.find();

    let completedModulesQ = new Parse.Query('Settings');
    completedModulesQ.equalTo('user', currentUser);
    const completedResults = await completedModulesQ.find();

    let completedModules = 0;
    if (
      completedResults.length > 0 &&
      completedResults[0].get('modulesCompleted') != null
    ) {
      const modulesCompleted = completedResults[0].get('modulesCompleted');
      modulesCompleted.forEach(mod => {
        if (typeof mod === 'string' && mod.includes(subject)) {
          completedModules += 1;
        }
      });
    }

    const percentage =
      totalModulesResults.length > 0
        ? Math.floor((completedModules / totalModulesResults.length) * 100)
        : 0;

    switch (subject) {
      case 'Struktur og planlægning':
        setStructureProgress(percentage);
        break;
      case 'Generel AD(H)D':
        setGeneralProgress(percentage);
        break;
      case 'AD(H)D og relationer':
        setRelationsProgress(percentage);
        break;
      case 'Kvinder med AD(H)D':
        setWomenProgress(percentage);
        break;
      default:
        break;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView}>
        <Text
          style={[
            styles.title,
            { color: colors.darkText, fontSize: 22 * scaleFactor },
          ]}>
          Hvad vil du gerne lære om i dag?
        </Text>
        <View style={{ marginVertical: 20 }}>
          <View
            style={[
              styles.progessionBar,
              {
                backgroundColor: colors.light,
                borderColor: colors.lightShadow,
              },
            ]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 18 * scaleFactor },
              ]}>
              {structureProgress}%
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Module overview', {
                subject: moduleSubjects[0].subject,
                description: moduleSubjects[0].description,
                image: moduleSubjects[0].image,
              })
            }>
            <View
              style={[styles.buttonGrad, { backgroundColor: colors.middle }]}>
              <Animated.Image
                source={require('../../Assets/images/icons/schedule.png')}
                style={{ width: 100, height: 100, marginTop: 5 }}
                sharedTransitionTag="structure"></Animated.Image>
              <Text
                style={[
                  styles.text,
                  { color: colors.darkText, fontSize: 18 * scaleFactor },
                ]}>
                Planlægning og strukturering af hverdagen
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20 }}>
          <View
            style={[
              styles.progessionBar,
              {
                backgroundColor: colors.light,
                borderColor: colors.lightShadow,
              },
            ]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 18 * scaleFactor },
              ]}>
              {generalProgress}%
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Module overview', {
                subject: moduleSubjects[1].subject,
                description: moduleSubjects[1].description,
                image: moduleSubjects[1].image,
              })
            }>
            <View
              style={[styles.buttonGrad, { backgroundColor: colors.middle }]}>
              <Animated.Image
                source={require('../../Assets/images/icons/psychology(2).png')}
                style={{ width: 100, height: 100, marginTop: 5 }}
                sharedTransitionTag="ADHD"></Animated.Image>
              <Text
                style={[
                  styles.text,
                  { color: colors.darkText, fontSize: 18 * scaleFactor },
                ]}>
                Generel AD(H)D
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20 }}>
          <View
            style={[
              styles.progessionBar,
              {
                backgroundColor: colors.light,
                borderColor: colors.lightShadow,
              },
            ]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 18 * scaleFactor },
              ]}>
              {relationsProgress}%
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Module overview', {
                subject: moduleSubjects[2].subject,
                description: moduleSubjects[2].description,
                image: moduleSubjects[2].image,
              })
            }>
            <View
              style={[styles.buttonGrad, { backgroundColor: colors.middle }]}>
              <Animated.Image
                source={require('../../Assets/images/icons/relationship(1).png')}
                style={{ width: 100, height: 100, marginTop: 5 }}
                sharedTransitionTag="relationships"></Animated.Image>
              <Text
                style={[
                  styles.text,
                  { color: colors.darkText, fontSize: 18 * scaleFactor },
                ]}>
                AD(H)D og relationer
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20 }}>
          <View
            style={[
              styles.progessionBar,
              {
                backgroundColor: colors.light,
                borderColor: colors.lightShadow,
              },
            ]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 18 * scaleFactor },
              ]}>
              {womenProgress}%
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Module overview', {
                subject: moduleSubjects[3].subject,
                description: moduleSubjects[3].description,
                image: moduleSubjects[3].image,
              })
            }>
            <View
              style={[styles.buttonGrad, { backgroundColor: colors.middle, marginBottom: '10%' }]}>
              <Animated.Image
                source={require('../../Assets/images/icons/female.png')}
                style={{ width: 100, height: 100, marginTop: 5 }}
                sharedTransitionTag="women"></Animated.Image>
              <Text
                style={[
                  styles.text,
                  { color: colors.darkText, fontSize: 18 * scaleFactor },
                ]}>
                Kvinder med AD(H)D
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  scrollView: {
    paddingBottom: 20,
  },
  knowledgeView: {
    width: 330,
    height: 150,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 1,
    justifyContent: 'center',
    bottom: 10,
  },
  title: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
    marginBottom: '10%',
    marginTop: 35,
  },
  progessionBar: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 30,
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 5,
    elevation: 5,
    right: '3%',
    top: '-15%',
  },
  button: {
    width: 210,
    height: 30,
    backgroundColor: '#61646B',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonGrad: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    bottom: 5,
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  done: {
    width: '90%',
    height: 70,
    borderRadius: 10,
    paddingVertical: '2%',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    marginBottom: '10%'
  },
  doneText: {
    alignSelf: 'center',
    justifyContent: 'center',
  }
});

export default PickModule;
