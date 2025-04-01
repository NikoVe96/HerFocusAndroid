import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Linking,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useTheme } from '@react-navigation/native';

export const ViewArticle = ({ route }) => {
  const { article } = route.params;
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  const goToLink = () => {
    Linking.openURL(article.get('website'));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={[styles.buttonGrad, { backgroundColor: colors.dark, marginTop: '15%' }]}>
          <Text
            style={[
              styles.title,
              { color: colors.lightText, fontSize: 25 * scaleFactor },
            ]}>
            {article.get('title')}
          </Text>
          <View
            style={[styles.seperator, { backgroundColor: colors.middle, borderColor: colors.middle }]}></View>
          <Text
            style={[
              styles.subTitle,
              { color: colors.lightText, fontSize: 17 * scaleFactor },
            ]}>
            {article.get('subHeader')}
          </Text>
        </View>
        <View style={styles.articleText}>
          <Markdown
            style={{
              paragraph: { fontSize: 18 * scaleFactor, color: colors.darkText },
              bullet_list: { fontSize: 18, color: colors.darkText },
              heading3: {
                color: colors.lightText,
                fontSize: 20 * scaleFactor,
                marginTop: 30,
                fontWeight: 'bold',
                alignSelf: 'center',
                backgroundColor: colors.dark,
                borderRadius: 8,
                padding: 15,
                elevation: 5,
                shadowColor: 'black',
                shadowOpacity: 0.5,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 2,
              },
              list_item: { marginVertical: 5 },
            }}>
            {article.get('text')}
          </Markdown>
          <View style={{ marginVertical: 30 }}>
            <View
              style={{
                borderWidth: 0.2,
                borderColor: 'grey',
                backgroundColor: 'grey',
                marginBottom: 30,
                width: 200,
                alignSelf: 'center',

              }}></View>
            <Text style={{ color: colors.darkText }}>
              Denne artikel er skrevet af
              <Text style={{ fontWeight: 'bold', color: colors.darkText }}>
                {' '}
                {article.get('author')}.
              </Text>
            </Text>
            <Text style={{ marginVertical: 10, color: colors.darkText }}>
              Hele artiklen samt mere info kan findes på
              <Text style={{ fontStyle: 'italic' }} onPress={goToLink}>
                {' '}
                {article.get('website')}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  subTitle: {
    fontSize: 19,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },

  buttonGrad: {
    marginTop: 15,
    width: '95%',
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
  seperator: {
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
  },
  articleText: {
    marginLeft: 15,
    marginRight: 15,
  },
});

export default ViewArticle;
