import { useTheme } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import AccordionItem from '../../Components/AccordionItem';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Parse from 'parse/react-native';
import BottomNavigation from '../../Navigation/BottomNav';


export const CompletedModules = () => {
  const [moduleAnswers, setModuleAnswers] = useState([]);
  const [exercises, setExercises] = useState([]);
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  useFocusEffect(
    useCallback(() => {
      fetchModuleAnswers();
      return () => { };
    }, []),
  );

  async function fetchModuleAnswers() {
    const currentUser = await Parse.User.currentAsync();
    let ModuleAnswers = new Parse.Query('ModuleAnswers');
    ModuleAnswers.equalTo('user', currentUser);
    try {
      const result = await ModuleAnswers.find();
      setModuleAnswers(result);
      console.log('exercises:' + result);
    } catch (error) {
      console.log('Error while fecthing answers');
    }
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontSize: 22 * scaleFactor },
          ]}>
          Udførte øvelser
        </Text>
        <Text
          style={[
            styles.subTitle,
            { color: colors.text, fontSize: 16 * scaleFactor },
          ]}>
          Her kan du finde de øvelser du har fuldført i læringsmodulet
        </Text>
        {moduleAnswers.map((moduleAnswer, index) => (
          <AccordionItem
            key={moduleAnswer.id || index}
            title={moduleAnswer.get('module')}
            icon={null}>
            <View key={index}>
              <View
                style={[
                  styles.answerBox,
                  { backgroundColor: colors.subButton },
                ]}>
                <Text
                  style={[
                    styles.module,
                    { color: colors.text, fontSize: 18 * scaleFactor },
                  ]}>
                  {moduleAnswer.get('module')}
                </Text>
                <View
                  style={[
                    styles.seperator,
                    { backgroundColor: colors.text },
                  ]}></View>
                {moduleAnswer.get('answers').map((answer, idx) => (
                  <View key={idx}>
                    <View style={styles.answerView}>
                      <Text style={{ fontWeight: 'bold' }}>
                        {answer.exercise}
                      </Text>
                      <Text style={{ marginBottom: 10 }}>{answer.answer}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </AccordionItem>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonSmall: {
    justifyContent: 'center',
    padding: 5,
    height: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 5,
  },
  seperator: {
    width: '70%',
    height: 1,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
  },
  answerBox: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 35,
  },
  subTitle: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    marginBottom: 15,
  },
  module: {
    marginLeft: 10,
    marginTop: 10,
  },
  answerView: {
    marginLeft: 10,
  },
});

export default CompletedModules;
