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
        <View style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
          <Text
            style={[
              styles.title,
              { color: colors.text, fontSize: 25 * scaleFactor },
            ]}>
            {article.get('title')}
          </Text>
          <View
            style={[styles.seperator, { backgroundColor: colors.border }]}></View>
          <Text
            style={[
              styles.subTitle,
              { color: colors.text, fontSize: 17 * scaleFactor },
            ]}>
            {article.get('subHeader')}
          </Text>
        </View>
        <View style={styles.articleText}>
          <Markdown
            style={{
              paragraph: { fontSize: 18 * scaleFactor, color: colors.text },
              bullet_list: { fontSize: 18, color: colors.text },
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
            <Text style={{ color: colors.text }}>
              Denne artikel er skrevet af
              <Text style={{ fontWeight: 'bold', color: colors.text }}>
                {' '}
                {article.get('author')}.
              </Text>
            </Text>
            <Text style={{ marginVertical: 10, color: colors.text }}>
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
