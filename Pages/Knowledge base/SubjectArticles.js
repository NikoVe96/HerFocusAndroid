import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import Parse from 'parse/react-native';
import Swiper from 'react-native-swiper';

export const ArticlesDiagnosed = ({ route }) => {
  const navigation = useNavigation();
  const [articlesList, setArticlesList] = useState([]);
  const { subject } = route.params;
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);


  useEffect(() => {
    try {
      articlesQuery();
    } catch (error) {
      console.error('Error fetching user theme:', error);
      Alert.alert('Could not load articles');
    }

    console.log(subject);
  }, [subject]);

  async function articlesQuery() {
    let articles = new Parse.Query('Articles');
    articles.contains('subject', subject);
    const Results = await articles.find();
    setArticlesList(Results);
  }

  const readArticle = article => {
    navigation.navigate('View article', { article: article });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Swiper showsPagination={true} loop={false}>
        {articlesList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.press}
            onPress={() => readArticle(item)}>
            <View
              style={[styles.buttonGrad, { backgroundColor: colors.dark }]}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center',
                  marginTop: 10,
                  color: colors.lightText,
                }}>
                {item.get('title')}
              </Text>
            </View>
            <View
              style={[styles.buttonGrad, { backgroundColor: colors.light }]}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center',
                  marginTop: 10,
                  color: colors.lightText,
                }}>
                {item.get('title')}
              </Text>
              <View
                style={[
                  styles.seperator,
                  { backgroundColor: colors.lightText },
                ]}></View>
              <Text
                numberOfLines={4}
                style={[styles.articleText, { color: colors.lightText }]}>
                {item.get('text').replaceAll(/#|-|>|/gi, '')}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
    marginBottom: 15,
    marginTop: 35,
  },
  title2: {
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
    marginBottom: 35,
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
  press: {
    marginBottom: 15,
  },
  articleText: {
    marginLeft: 10,
    marginRight: 10,
  },
  seperator: {
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    marginTop: 5,
  },
});

export default ArticlesDiagnosed;
