import {
  SafeAreaView,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Swiper from 'react-native-swiper';
import LearningProgressHeader from '../../Components/LearningProgressHeader';
import {useNavigation, useTheme} from '@react-navigation/native';
import Parse from 'parse/react-native';
import Quiz from '../../Components/Quiz';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark, faCheck} from '@fortawesome/free-solid-svg-icons';
import Markdown from 'react-native-markdown-display';

export const Module = ({route}) => {
  const [progress, setProgress] = useState(new Animated.Value(1));
  const moduleLength = 7;
  const navigation = useNavigation();
  const {module, subject, description, image, onNewCompletion} = route.params;
  const [intro1, setIntro1] = useState('');
  const [intro2, setIntro2] = useState('');
  const [intro3, setIntro3] = useState('');
  const [questions, setQuestions] = useState([]);
  const [keyPoints, setKeyPoints] = useState([]);
  const [answer, setAnswers] = useState({});
  const [author, setAuthor] = useState('');
  const [book, setBook] = useState('');
  const swiperRef = useRef(null);
  const {colors} = useTheme();
  const moduleName = `${module.get('name')} ${module.get('subject')}`;
  const [expanded, setExpanded] = useState(-1);
  const {width, height} = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const [saved, setSaved] = useState({});
  const [notebookExercises, setNotebookExercises] = useState({});

  const handleSlide = index => {
    Animated.parallel([
      Animated.timing(progress, {
        toValue: index + 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.scrollTo(0);
    }
    setIntro1('');
    setKeyPoints([]);
    moduleContent();
    console.log(moduleName);
  }, [module]);

  async function moduleContent() {
    let query = new Parse.Query('LearningModuleContent');
    query.contains('module', module.id);
    const Results = await query.find();
    setIntro1(Results[0].get('intro1'));
    setIntro2(Results[0].get('intro2'));
    setIntro3(Results[0].get('intro3'));
    setKeyPoints(Results[0].get('keyPoints'));
    setAuthor(Results[0].get('author'));
    setBook(Results[0].get('book'));
  }

  async function handleCompletion() {
    const currentUser = await Parse.User.currentAsync();
    let query = new Parse.Query('Settings');
    query.contains('user', currentUser.id);
    const result = await query.first();

    const moduleName = `${module.get('name')} ${module.get('subject')}`;
    result.addUnique('modulesCompleted', moduleName);
    result.save();

    onNewCompletion();

    navigation.navigate('Module overview', {
      subject: subject,
      image: image,
      description: description,
    });
  }

  const handleAnswerChange = (exerciseName, answerText) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [exerciseName]: answerText,
    }));
  };

  async function saveAnswer(moduleName, exerciseName, answerText) {
    const currentUser = await Parse.User.currentAsync();
    if (!currentUser) {
      return;
    }

    const ModuleAnswers = Parse.Object.extend('ModuleAnswers');
    const query = new Parse.Query(ModuleAnswers);

    query.equalTo('user', currentUser);
    query.equalTo('module', moduleName);
    let moduleAnswers = await query.first();

    if (!moduleAnswers) {
      moduleAnswers = new ModuleAnswers();
      moduleAnswers.set('user', currentUser);
      moduleAnswers.set('module', moduleName);
      moduleAnswers.set('answers', []);
    }

    const answers = moduleAnswers.get('answers');
    answers.push({
      exercise: exerciseName,
      answer: answerText,
    });
    moduleAnswers.set('answers', answers);

    try {
      await moduleAnswers.save();
      setSaved(prevSaved => ({
        ...prevSaved,
        [exerciseName]: true,
      }));
      console.log('Answer saved successfully!');
      console.log(moduleName, exerciseName, answerText);
    } catch (error) {
      console.error('Error while saving answer: ', error);
    }
  }

  function exercises() {
    switch (moduleName) {
      case '1 Struktur og planlægning':
        const tænkefejl1 = 'Alt eller intet';
        const tænkefejl2 = 'Ignorer det gode';
        const tænkefejl3 = 'Tænkefejl';
        const tænkefejl4 = 'Gøre ting større end de er';
        const tænkefejl5 = 'Spår fremtiden';
        const tænkefejl6 = 'Følelses ræsonnement';

        return (
          <View style={{backgroundColor: colors.background, padding: '2%'}}>
            <Text
              style={[
                styles.title,
                {fontSize: 20 * scaleFactor, color: colors.text},
              ]}>
              Identificer dine egne tænkefejl
            </Text>
            <Text
              style={[
                styles.exercise,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              Øvelse
            </Text>
            <Text
              style={[
                styles.exerciseDesc,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              I denne øvelse skal du tjekke de bokse af, hvor du kan genkende
              dig selv i tankefejlen. I tekstfeltet skriver du derefter et
              eksempel på en situation, hvor du har oplevet at lave den
              tænkefejl
            </Text>
            <Text
              style={[
                styles.exerciseDesc,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              Udfyld kun de tekstfelter, der tilhører tænkefejl, som du kan
              genkende dig selv i.
            </Text>
            <Text
              style={[
                styles.exerciseDesc,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              Tryk på "gem" ikonet ved siden af tekstfeltet for at gemme øvelsen
              i din notesbog.
            </Text>
            <View style={styles.answerView}>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {tænkefejl1}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text => handleAnswerChange(tænkefejl1, text)}
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[tænkefejl1] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(moduleName, tænkefejl1, answer[tænkefejl1])
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.answerView}>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {tænkefejl2}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text => handleAnswerChange(tænkefejl2, text)}
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[tænkefejl2] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(moduleName, tænkefejl2, answer[tænkefejl2])
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.answerView}>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {tænkefejl3}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text => handleAnswerChange(tænkefejl3, text)}
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[tænkefejl3] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(moduleName, tænkefejl3, answer[tænkefejl3])
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.answerView}>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {tænkefejl4}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text => handleAnswerChange(tænkefejl4, text)}
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[tænkefejl4] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(moduleName, tænkefejl4, answer[tænkefejl4])
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.answerView}>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {tænkefejl5}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text => handleAnswerChange(tænkefejl5, text)}
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[tænkefejl5] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(moduleName, tænkefejl5, answer[tænkefejl5])
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.answerView}>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {tænkefejl6}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text => handleAnswerChange(tænkefejl6, text)}
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[tænkefejl6] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(moduleName, tænkefejl6, answer[tænkefejl6])
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        );
        break;
      case '2 Struktur og planlægning':
        const overspringshandling1 =
          'Hvilke(n) typer af overspringshandlinger kan du identificere dig med?';
        const overspringshandling2 =
          'Giv et eksempel på hvornår, du har lavet en overspringshandling af denne type';
        const overspringshandling3 =
          'Hvad kan du gøre for at lave færre overspringshandlinger af denne type?';
        return (
          <View style={{backgroundColor: colors.background, padding: '2%'}}>
            <Text
              style={[
                styles.title,
                {fontSize: 20 * scaleFactor, color: colors.text},
              ]}>
              Identificer typen af dine overspringshandlinger
            </Text>
            <Text
              style={[
                styles.exercise,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              Øvelse
            </Text>
            <Text
              style={[
                styles.exerciseDesc,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              I denne øvelse skal du udfylde felterne for at identificere og
              reflektere ove, hvilke typer af overspringshandlinger, du typisk
              har problemer med.
            </Text>
            <Text
              style={[
                styles.exerciseDesc,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              Tryk på "gem" ikonet ved siden af tekstfeltet for at gemme øvelsen
              i din notesbog.
            </Text>
            <View style={styles.answerView}>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {overspringshandling1}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text =>
                    handleAnswerChange(overspringshandling1, text)
                  }
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[overspringshandling1] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(
                        moduleName,
                        overspringshandling1,
                        answer[overspringshandling1],
                      )
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.answerView}>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {overspringshandling2}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text =>
                    handleAnswerChange(overspringshandling2, text)
                  }
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[overspringshandling2] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(
                        moduleName,
                        overspringshandling2,
                        answer[overspringshandling2],
                      )
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.answerView}>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {overspringshandling3}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text =>
                    handleAnswerChange(overspringshandling3, text)
                  }
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[overspringshandling3] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(
                        moduleName,
                        overspringshandling3,
                        answer[overspringshandling3],
                      )
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        );
        break;
      case '3 Struktur og planlægning':
        const rutine = '1. ';
        const steps1 = 'a. ';
        const steps2 = 'b. ';
        const steps3 = 'c. ';
        const steps4 = 'd. ';
        const steps5 = 'e. ';
        const steps6 = 'f.  ';
        const steps7 = 'g. ';
        return (
          <View style={{backgroundColor: colors.background, padding: '2%'}}>
            <Text
              style={[
                styles.title,
                {fontSize: 20 * scaleFactor, color: colors.text},
              ]}>
              Planlæg dine rutiner
            </Text>
            <Text
              style={[
                styles.exercise,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              Øvelse
            </Text>
            <Text
              style={[
                styles.exerciseDesc,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              I denne øvelse skal du tænke på en rutine, du har. Skriv hvilke
              steps rutinen indeholder. Du kan derefter skrive rutinen ind i din
              planlægger, for at gøre rutinen nemmere at klare næste gang.
            </Text>
            <Text
              style={[
                styles.exerciseDesc,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              Tryk på "gem" ikonet ved siden af tekstfeltet for at gemme øvelsen
              i din notesbog.
            </Text>
            <Text
              style={{fontWeight: 'bold', marginBottom: 5, color: colors.text}}>
              Rutine
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <View style={styles.rutineView}>
                  <Text
                    style={{fontSize: 14 * scaleFactor, color: colors.text}}>
                    {rutine}
                  </Text>
                  <TextInput
                    style={[styles.rutineText, {color: colors.text}]}
                    onChangeText={text => handleAnswerChange(rutine, text)}
                    value={answer}
                    multiline={true}
                    numberOfLines={5}></TextInput>
                  {saved[rutine] ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        saveAnswer(moduleName, rutine, answer[rutine])
                      }>
                      <FontAwesomeIcon
                        icon={faBookmark}
                        size={20}
                        style={{marginRight: 10, marginTop: 10}}
                        color={colors.border}></FontAwesomeIcon>
                    </TouchableOpacity>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        marginBottom: 5,
                        color: colors.text,
                      }}>
                      Steps
                    </Text>
                    <View style={styles.rutineView}>
                      <Text
                        style={{
                          fontSize: 14 * scaleFactor,
                          color: colors.text,
                        }}>
                        {steps1}
                      </Text>
                      <View style={styles.inputView}>
                        <TextInput
                          style={[styles.rutineText, {color: colors.text}]}
                          onChangeText={text =>
                            handleAnswerChange(steps1, text)
                          }
                          value={answer}
                          multiline={true}
                          numberOfLines={5}></TextInput>
                        {saved[steps1] ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            size={20}
                            style={{marginRight: 10, marginTop: 10}}
                            color={colors.border}></FontAwesomeIcon>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              saveAnswer(moduleName, steps1, answer[steps1])
                            }>
                            <FontAwesomeIcon
                              icon={faBookmark}
                              size={20}
                              style={{marginRight: 10, marginTop: 10}}
                              color={colors.border}></FontAwesomeIcon>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    <View style={styles.rutineView}>
                      <Text
                        style={{
                          fontSize: 14 * scaleFactor,
                          color: colors.text,
                        }}>
                        {steps2}
                      </Text>
                      <View style={styles.inputView}>
                        <TextInput
                          style={[styles.rutineText, {color: colors.text}]}
                          onChangeText={text =>
                            handleAnswerChange(steps2, text)
                          }
                          value={answer}
                          multiline={true}
                          numberOfLines={5}></TextInput>
                        {saved[steps2] ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            size={20}
                            style={{marginRight: 10, marginTop: 10}}
                            color={colors.border}></FontAwesomeIcon>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              saveAnswer(moduleName, steps2, answer[steps2])
                            }>
                            <FontAwesomeIcon
                              icon={faBookmark}
                              size={20}
                              style={{marginRight: 10, marginTop: 10}}
                              color={colors.border}></FontAwesomeIcon>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    <View style={styles.rutineView}>
                      <Text
                        style={{
                          fontSize: 14 * scaleFactor,
                          color: colors.text,
                        }}>
                        {steps3}
                      </Text>
                      <View style={styles.inputView}>
                        <TextInput
                          style={[styles.rutineText, {color: colors.text}]}
                          onChangeText={text =>
                            handleAnswerChange(steps3, text)
                          }
                          value={answer}
                          multiline={true}
                          numberOfLines={5}></TextInput>
                        {saved[steps3] ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            size={20}
                            style={{marginRight: 10, marginTop: 10}}
                            color={colors.border}></FontAwesomeIcon>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              saveAnswer(moduleName, steps3, answer[steps3])
                            }>
                            <FontAwesomeIcon
                              icon={faBookmark}
                              size={20}
                              style={{marginRight: 10, marginTop: 10}}
                              color={colors.border}></FontAwesomeIcon>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    <View style={styles.rutineView}>
                      <Text
                        style={{
                          fontSize: 14 * scaleFactor,
                          color: colors.text,
                        }}>
                        {steps4}
                      </Text>
                      <View style={styles.inputView}>
                        <TextInput
                          style={[styles.rutineText, {color: colors.text}]}
                          onChangeText={text =>
                            handleAnswerChange(steps4, text)
                          }
                          value={answer}
                          multiline={true}
                          numberOfLines={5}></TextInput>
                        {saved[steps4] ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            size={20}
                            style={{marginRight: 10, marginTop: 10}}
                            color={colors.border}></FontAwesomeIcon>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              saveAnswer(moduleName, steps4, answer[steps4])
                            }>
                            <FontAwesomeIcon
                              icon={faBookmark}
                              size={20}
                              style={{marginRight: 10, marginTop: 10}}
                              color={colors.border}></FontAwesomeIcon>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    <View style={styles.rutineView}>
                      <Text
                        style={{
                          fontSize: 14 * scaleFactor,
                          color: colors.text,
                        }}>
                        {steps5}
                      </Text>
                      <View style={styles.inputView}>
                        <TextInput
                          style={[styles.rutineText, {color: colors.text}]}
                          onChangeText={text =>
                            handleAnswerChange(steps5, text)
                          }
                          value={answer}
                          multiline={true}
                          numberOfLines={5}></TextInput>
                        {saved[steps5] ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            size={20}
                            style={{marginRight: 10, marginTop: 10}}
                            color={colors.border}></FontAwesomeIcon>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              saveAnswer(moduleName, steps5, answer[steps5])
                            }>
                            <FontAwesomeIcon
                              icon={faBookmark}
                              size={20}
                              style={{marginRight: 10, marginTop: 10}}
                              color={colors.border}></FontAwesomeIcon>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    <View style={styles.rutineView}>
                      <Text
                        style={{
                          fontSize: 14 * scaleFactor,
                          color: colors.text,
                        }}>
                        {steps6}
                      </Text>
                      <View style={styles.inputView}>
                        <TextInput
                          style={[styles.rutineText, {color: colors.text}]}
                          onChangeText={text =>
                            handleAnswerChange(steps6, text)
                          }
                          value={answer}
                          multiline={true}
                          numberOfLines={5}></TextInput>
                        {saved[steps6] ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            size={20}
                            style={{marginRight: 10, marginTop: 10}}
                            color={colors.border}></FontAwesomeIcon>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              saveAnswer(moduleName, steps6, answer[steps6])
                            }>
                            <FontAwesomeIcon
                              icon={faBookmark}
                              size={20}
                              style={{marginRight: 10, marginTop: 10}}
                              color={colors.border}></FontAwesomeIcon>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    <View style={styles.rutineView}>
                      <Text
                        style={{
                          fontSize: 14 * scaleFactor,
                          color: colors.text,
                        }}>
                        {steps7}
                      </Text>
                      <View style={styles.inputView}>
                        <TextInput
                          style={[styles.rutineText, {color: colors.text}]}
                          onChangeText={text =>
                            handleAnswerChange(steps7, text)
                          }
                          value={answer}
                          multiline={true}
                          numberOfLines={5}></TextInput>
                        {saved[steps7] ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            size={20}
                            style={{marginRight: 10, marginTop: 10}}
                            color={colors.border}></FontAwesomeIcon>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              saveAnswer(moduleName, steps7, answer[steps7])
                            }>
                            <FontAwesomeIcon
                              icon={faBookmark}
                              size={20}
                              style={{marginRight: 10, marginTop: 10}}
                              color={colors.border}></FontAwesomeIcon>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      case '4 Struktur og planlægning':
        const opgave1 = '1. Opgave';
        const opgave2 = '2. Opgave';
        const opgave3 = '3. Opgave';
        const beskriv1 = '1. Beskriv hvordan det gik';
        const beskriv2 = '2. Beskriv hvordan det gik';
        const beskriv3 = '3. Beskriv hvordan det gik';
        return (
          <View style={{backgroundColor: colors.background, padding: '2%'}}>
            <Text
              style={[
                styles.title,
                {fontSize: 20 * scaleFactor, color: colors.text},
              ]}>
              Reflekter over dine præstationer
            </Text>
            <Text
              style={[
                styles.exercise,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              Øvelse
            </Text>
            <Text
              style={[
                styles.exerciseDesc,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              I denne øvelse skal du udvælge nogle af de opgaver du har haft i
              løbet af ugen, og reflektere over dem.
            </Text>
            <Text
              style={[
                styles.exerciseDesc,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              Hvordan gik det med at klare opgaven? Oplevede du nogle tænkefejl
              undervejs? Hvordan kunne du vende de negative tanker til noget
              positivt istedet?
            </Text>
            <Text
              style={[
                styles.exerciseDesc,
                {fontSize: 16 * scaleFactor, color: colors.text},
              ]}>
              Tryk på "gem" ikonet ved siden af tekstfeltet for at gemme øvelsen
              i din notesbog.
            </Text>
            <View style={styles.answerView}>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {opgave1}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text => handleAnswerChange(opgave1, text)}
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[opgave1] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(moduleName, opgave1, answer[opgave1])
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {beskriv1}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text => handleAnswerChange(beskriv1, text)}
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[beskriv1] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(moduleName, beskriv1, answer[beskriv1])
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.answerView}>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {opgave2}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text => handleAnswerChange(opgave2, text)}
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[opgave2] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(moduleName, opgave2, answer[opgave2])
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {beskriv2}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text => handleAnswerChange(beskriv2, text)}
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[beskriv2] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(moduleName, beskriv2, answer[beskriv2])
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.answerView}>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {opgave3}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text => handleAnswerChange(opgave3, text)}
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[opgave3] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(moduleName, opgave3, answer[opgave3])
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
              <Text
                style={[
                  styles.exerciseText,
                  {fontSize: 16 * scaleFactor, color: colors.text},
                ]}>
                {beskriv3}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.inputText, {color: colors.text}]}
                  onChangeText={text => handleAnswerChange(beskriv3, text)}
                  value={answer}
                  multiline={true}
                  numberOfLines={5}></TextInput>
                {saved[beskriv3] ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={20}
                    style={{marginRight: 10, marginTop: 10}}
                    color={colors.border}></FontAwesomeIcon>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      saveAnswer(moduleName, beskriv3, answer[beskriv3])
                    }>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={20}
                      style={{marginRight: 10, marginTop: 10}}
                      color={colors.border}></FontAwesomeIcon>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        );
      default:
        break;
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <LearningProgressHeader
        progress={progress}
        moduleLength={moduleLength}
        subject={subject}
        description={description}
        image={image}
      />
      <View style={{flex: 8, backgroundColor: colors.background}}>
        <Swiper
          loop={false}
          showsPagination={false}
          onIndexChanged={index => handleSlide(index)}
          scrollEnabled={false}
          ref={swiperRef}>
          <ScrollView style={{flex: 1}}>
            <Image
              source={require('../../Assets/images/LearningFirst.png')}
              style={{
                width: 200 * scaleFactor,
                height: 200 * scaleFactor,
                alignSelf: 'center',
              }}></Image>
            <View style={styles.textContainer}>
              <Markdown
                style={{
                  paragraph: {fontSize: 18 * scaleFactor, color: colors.text},
                  bullet_list: {fontSize: 18, color: colors.text},
                  heading3: {
                    color: colors.text,
                    fontSize: 20 * scaleFactor,
                    marginTop: 30,
                    fontWeight: 'bold',
                  },
                  list_item: {marginVertical: 5},
                }}>
                {intro1}
              </Markdown>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: '3%',
              }}>
              <View style={{marginTop: '3%', marginRight: '5%'}}></View>
              <TouchableOpacity
                style={[
                  styles.swiperBtn,
                  {
                    backgroundColor: colors.mainButton,
                    borderColor: colors.mainButton,
                  },
                ]}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={{fontSize: 20 * scaleFactor, color: colors.text}}>
                  Næste
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView style={{flex: 1}}>
            <Image
              source={require('../../Assets/images/LearningSecond.png')}
              style={{
                width: 200 * scaleFactor,
                height: 200 * scaleFactor,
                alignSelf: 'center',
              }}></Image>
            <View style={styles.textContainer}>
              <Markdown
                style={{
                  paragraph: {fontSize: 18 * scaleFactor, color: colors.text},
                  bullet_list: {fontSize: 18, color: colors.text},
                  heading3: {
                    color: colors.text,
                    fontSize: 20 * scaleFactor,
                    marginTop: 30,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    backgroundColor: colors.mainButton,
                    borderRadius: 8,
                    paddingLeft: 15,
                    paddingRight: 15,
                    padding: 2,
                  },
                  list_item: {marginVertical: 5},
                }}>
                {intro2}
              </Markdown>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: '3%',
              }}>
              <TouchableOpacity
                style={[
                  styles.swiperBtn,
                  {
                    backgroundColor: colors.mainButton,
                    borderColor: colors.mainButton,
                  },
                ]}
                onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text style={{fontSize: 20 * scaleFactor, color: colors.text}}>
                  Tilbage
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.swiperBtn,
                  {
                    backgroundColor: colors.mainButton,
                    borderColor: colors.mainButton,
                  },
                ]}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={{fontSize: 20 * scaleFactor, color: colors.text}}>
                  Næste
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView style={{flex: 1}}>
            <Image
              source={require('../../Assets/images/LearningThird.png')}
              style={{
                width: 200 * scaleFactor,
                height: 200 * scaleFactor,
                alignSelf: 'center',
              }}></Image>
            <View style={styles.textContainer}>
              <Markdown
                style={{
                  paragraph: {fontSize: 18 * scaleFactor, color: colors.text},
                  bullet_list: {fontSize: 18, color: colors.text},
                  heading3: {
                    color: colors.text,
                    fontSize: 20 * scaleFactor,
                    marginTop: 30,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    backgroundColor: colors.mainButton,
                    borderRadius: 8,
                    paddingLeft: 15,
                    paddingRight: 15,
                    padding: 2,
                  },
                  list_item: {marginVertical: 5},
                }}>
                {intro3}
              </Markdown>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: '3%',
              }}>
              <TouchableOpacity
                style={[
                  styles.swiperBtn,
                  {
                    backgroundColor: colors.mainButton,
                    borderColor: colors.mainButton,
                  },
                ]}
                onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text style={{fontSize: 20 * scaleFactor, color: colors.text}}>
                  Tilbage
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.swiperBtn,
                  {
                    backgroundColor: colors.mainButton,
                    borderColor: colors.mainButton,
                  },
                ]}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={{fontSize: 20 * scaleFactor, color: colors.text}}>
                  Næste
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView style={{flex: 1}}>
            <View>
              <Image
                source={require('../../Assets/images/LearningQuiz.png')}
                style={{
                  width: 200 * scaleFactor,
                  height: 200 * scaleFactor,
                  alignSelf: 'center',
                }}></Image>
              <Text
                style={[
                  styles.takeawayHeader,
                  {fontSize: 22 * scaleFactor, color: colors.text},
                ]}>
                Lad os tage en quiz for at hjælpe dig med at huske, hvad du har
                lært!
              </Text>
              <Quiz
                key={module.id}
                subject={subject}
                module={module.get('name')}
                style={{color: colors.text}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'baseline',
                  marginVertical: '3%',
                }}>
                <TouchableOpacity
                  style={[
                    styles.swiperBtn,
                    {
                      backgroundColor: colors.mainButton,
                      borderColor: colors.mainButton,
                    },
                  ]}
                  onPress={() => swiperRef.current.scrollBy(-1)}>
                  <Text
                    style={{fontSize: 20 * scaleFactor, color: colors.text}}>
                    Tilbage
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.swiperBtn,
                    {
                      backgroundColor: colors.mainButton,
                      borderColor: colors.mainButton,
                    },
                  ]}
                  onPress={() => swiperRef.current.scrollBy(1)}>
                  <Text
                    style={{fontSize: 20 * scaleFactor, color: colors.text}}>
                    Næste
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <ScrollView style={{flex: 1}}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../Assets/images/LearningFourth.png')}
                style={{
                  width: 200 * scaleFactor,
                  height: 200 * scaleFactor,
                  alignSelf: 'center',
                }}></Image>
            </View>
            <View>{exercises()}</View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: '3%',
                marginBottom: 150,
              }}>
              <TouchableOpacity
                style={[
                  styles.swiperBtn,
                  {
                    backgroundColor: colors.mainButton,
                    borderColor: colors.mainButton,
                  },
                ]}
                onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text style={{fontSize: 20 * scaleFactor, color: colors.text}}>
                  Tilbage
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.swiperBtn,
                  {
                    backgroundColor: colors.mainButton,
                    borderColor: colors.mainButton,
                  },
                ]}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={{fontSize: 20 * scaleFactor, color: colors.text}}>
                  Næste
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView style={{flex: 1}}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../Assets/images/LearningFifth.png')}
                style={{
                  width: 200 * scaleFactor,
                  height: 200 * scaleFactor,
                  alignSelf: 'center',
                }}></Image>
              <Text
                style={[
                  styles.takeawayHeader,
                  {fontSize: 22 * scaleFactor, color: colors.text},
                ]}>
                Her er der {keyPoints.length} takeaways fra dette modul
              </Text>
              {keyPoints.map((item, index) => {
                return (
                  <View
                    style={[
                      styles.keyTakeaways,
                      {
                        backgroundColor: colors.subButton,
                        borderColor: colors.subButton,
                      },
                    ]}
                    key={index}>
                    <Text
                      style={[
                        styles.takeawayHeader,
                        {fontSize: 22 * scaleFactor, color: colors.text},
                      ]}>
                      Takeaway {index + 1}
                    </Text>
                    <Text style={styles.text}>{item}</Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'baseline',
                marginVertical: '3%',
              }}>
              <TouchableOpacity
                style={[
                  styles.swiperBtn,
                  {
                    backgroundColor: colors.mainButton,
                    borderColor: colors.mainButton,
                  },
                ]}
                onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text style={{fontSize: 20 * scaleFactor, color: colors.text}}>
                  Tilbage
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.swiperBtn,
                  {
                    backgroundColor: colors.mainButton,
                    borderColor: colors.mainButton,
                  },
                ]}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={{fontSize: 20 * scaleFactor, color: colors.text}}>
                  Næste
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image
                source={require('../../Assets/images/fireworks.png')}
                style={{
                  width: width,
                  height: 270 * scaleFactor,
                  alignSelf: 'center',
                }}></Image>
              <Text
                style={[
                  styles.takeawayHeader,
                  {fontSize: 22 * scaleFactor, color: colors.text},
                ]}>
                Tillykke!{' '}
              </Text>
              <Text style={[styles.text, {color: colors.text}]}>
                Du har færdiggjort et læringsmodul!
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontStyle: 'italic',
                  marginTop: '15%',
                  color: colors.text,
                }}>
                Materialet fra dette modul er fundet i bogen "{book}", som er
                skrevet af {author}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'baseline',
                  marginVertical: '3%',
                }}>
                <TouchableOpacity
                  style={[
                    styles.swiperBtn,
                    {
                      backgroundColor: colors.mainButton,
                      borderColor: colors.mainButton,
                    },
                  ]}
                  onPress={() => swiperRef.current.scrollBy(-1)}>
                  <Text
                    style={{fontSize: 20 * scaleFactor, color: colors.text}}>
                    Tilbage
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: colors.mainButton,
                      borderColor: colors.mainButton,
                    },
                  ]}
                  onPress={() => handleCompletion()}>
                  <Text
                    style={{fontSize: 20 * scaleFactor, color: colors.text}}>
                    Færdiggør modulet
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Swiper>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: '1%',
    width: '60%',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },
  keyTakeaways: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },
  takeawayHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    padding: 5,
  },
  textContainer: {
    margin: '3%',
  },
  swiperBtn: {
    marginTop: '2%',
    marginRight: '2%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },
  text: {
    fontSize: 18,
  },
  rutineView: {
    flexDirection: 'row',
    marginLeft: '5%',
  },
  rutineText1: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 5,
    width: '90%',
  },
  rutineText2: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 5,
    width: '90%',
  },
  rutineTime: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 5,
    width: '35%',
  },
  title: {
    textAlign: 'center',
    marginTop: '2%',
  },
  exercise: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '3%',
    marginTop: '2%',
  },
  exerciseDesc: {
    margin: '2%',
  },
  exerciseText: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputView: {
    flexDirection: 'row',
    marginBottom: '2%',
    justifyContent: 'space-between',
  },
  inputText: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '88%',
  },
  answerView: {
    marginBottom: 10,
    marginTop: 10,
  },
  rutineText: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '85%',
  },
});

export default Module;
