import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';
import Parse from 'parse/react-native';

export const PickTopics = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  const [adhdArticles, setAdhdArticles] = useState([]);
  const [mentalArticles, setMentalArticles] = useState([]);
  const [womenArticles, setWomenArticles] = useState([]);
  const [relationshipsArticles, setRelationshipsArticles] = useState([]);

  useEffect(() => {
    fetchArticles('adhd', setAdhdArticles);
    fetchArticles('mental', setMentalArticles);
    fetchArticles('women', setWomenArticles);
    fetchArticles('relationships', setRelationshipsArticles);
  }, []);


  const fetchArticles = async (subject, setArticles) => {
    try {
      let articles = new Parse.Query('Articles');
      articles.contains('subject', subject);
      const results = await articles.find();
      setArticles(results);
    } catch (error) {
      console.error(`Error fetching ${subject} articles:`, error);
      Alert.alert('Could not load articles');
    }
  };

  const readArticle = article => {
    navigation.navigate('View article', { article: article });
  };

  const renderSwiper = articlesList => (
    <Swiper showsPagination={true} loop={false} activeDotColor={colors.border} dotColor={colors.subButton}>
      {articlesList.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.press}
          onPress={() => readArticle(item)}>
          <View style={[styles.articlesView, { backgroundColor: colors.subButton, borderColor: colors.subButton }]}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center',
                marginTop: 10,
                color: colors.text,
              }}>
              {item.get('title')}
            </Text>
            <View
              style={[styles.seperator, { backgroundColor: colors.text }]}></View>
            <Text
              numberOfLines={3}
              style={[styles.articleText, { color: colors.text }]}>
              {item.get('text').replaceAll(/#|-|>|/gi, '')}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </Swiper>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontSize: 20 * scaleFactor },
          ]}>
          Her kan du swipe igennem artiklerne og klikke på den, der fanger din
          interesse.
        </Text>
        <Text
          style={[
            styles.title2,
            { color: colors.text, fontSize: 20 * scaleFactor },
          ]}>
          God læsning!
        </Text>
        <View style={styles.press}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Hvad er ADHD?
            </Text>
            <View style={styles.st}>{renderSwiper(adhdArticles)}</View>
          </View>
        </View>
        <View style={styles.press}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Udfordringer med ADHD
            </Text>
            <View style={styles.st}>{renderSwiper(mentalArticles)}</View>
          </View>
        </View>
        <View style={styles.press}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Kvinder med ADHD/ADD
            </Text>
            <View style={styles.st}>{renderSwiper(womenArticles)}</View>
          </View>
        </View>
        <View style={styles.press}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              ADHD og Relationer
            </Text>
            <View style={styles.st}>{renderSwiper(relationshipsArticles)}</View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 35,
  },
  title2: {
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  text: {
    margin: 10,
    fontWeight: 'bold',
  },
  buttonGrad: {
    width: '90%',
    height: 190,
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  press: {
    marginBottom: 25,
  },
  articlesView: {
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    marginBottom: '5%'
  },
  articleText: {
    marginLeft: 10,
    marginRight: 10,
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 5,
  },
  st: {
    height: '82%',
  },
});

export default PickTopics;
