import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import Parse from 'parse/react-native';

export const PickModule = () => {
  const navigation = useNavigation();
  const [structuringProgress, setStructuringProgress] = useState('0');
  const [procrastinationProgress, setProcrastinationProgress] = useState('0');
  const [relationsProgress, setRelationsProgress] = useState('0');
  const [goalProgress, setGoalProgress] = useState('0');
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const { colors } = useTheme();

  const moduleSubjects = [
    {
      subject: 'Opnå dine mål',
      description: 'I dette modul vil du lære om forskellige værktøjer til at opnå de mål du har sat dig i dit liv og din hverdag. For voksne med ADHD kan det være en fordel at have specifikke mål, tidsrammer og værktøjer til at opnå disse mål, og derfor har vi samlet nogle øvelser der kan give dig de bedste chancer for success og give mere overskud i hverdagen.',
      image: require('../../Assets/images/learning_notebook.png'),
    },
    {
      subject: 'Struktur og planlægning',
      description: 'I dette modul vil du lære om forskellige værktøjer til at strukturere dit liv og din hverdag. For voksne med ADHD kan det være en fordel at have specifikke mål, tidsrammer og værktøjer til at opnå sine mål. Derfor har vi samlet nogle øvelser, der kan give dig de bedste chancer for success og forhåbentlig give mere overskud i hverdagen.',
      image: require('../../Assets/images/learning_notebook.png'),
    },
    {
      subject: 'Overspringshandlinger',
      description:
        'In the time management learning module, you will learn how to...',
      image: require('../../Assets/images/learning_hourglass.png'),
    },
  ];

  useEffect(() => {
    getProgress('Struktur og planlægning');

  }, []);

  async function getProgress(subject) {
    const currentUser = await Parse.User.currentAsync();
    let totalModules = new Parse.Query('LearningModules');
    totalModules.equalTo('subject', subject);
    const totalModulesResults = await totalModules.find();

    let completedModulesQ = new Parse.Query('Settings');
    completedModulesQ.equalTo('user', currentUser);
    completedResults = await completedModulesQ.find();
    let completedModules = 0;
    if (completedResults[0].get('modulesCompleted') != null) {
      completedResults[0].get('modulesCompleted').forEach(module => {
        if (completedResults[0].get('modulesCompleted').filter(module => module.includes(subject))) {
          completedModules += 1;
        }
      });
    }


    switch (subject) {
      case 'Struktur og planlægning':
        if (completedModules.length !== 0) {
          setStructuringProgress((completedModules / totalModulesResults.length) * 100);
        }
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
            { color: colors.lightText, fontSize: 22 * scaleFactor },
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
              {structuringProgress}%
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
                source={require('../../Assets/images/learning_notebook.png')}
                style={{ width: 120, height: 100, marginTop: 5 }}
                sharedTransitionTag="structure"></Animated.Image>
              <Text
                style={[
                  styles.text,
                  { color: colors.lightText, fontSize: 18 * scaleFactor },
                ]}>
                Planlægning og strukturering af hverdagen
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Completed modules')}>
          <View style={[styles.done, { backgroundColor: colors.middle }]}>
            <FontAwesomeIcon
              icon={faCheck}
              size={35 * scaleFactor}
              color={colors.light}
            />
            <Text style={[styles.doneText, { color: colors.lightText, fontSize: 16 * scaleFactor }]}>
              Opgavesvar for fuldførte læringsmoduler
            </Text>
          </View>
        </TouchableOpacity>
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
