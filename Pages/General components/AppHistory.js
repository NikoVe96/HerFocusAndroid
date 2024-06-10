import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

export const AppHistory = () => {
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.title}>
          <Text
            style={[
              styles.textStyle,
              { color: colors.text, fontSize: 30 * scaleFactor }
            ]}>
            Om herfocus
          </Text>
        </View>
        <View style={[styles.seperator, { backgroundColor: colors.border }]}></View>
        <Text
          style={[
            styles.aboutText,
            { color: colors.text, fontSize: 16 * scaleFactor }
          ]}>
          herfocus er en app af kvinder, for kvinder med ADHD. Vi er to
          kvindelige IT-studerende fra IT-Universitetet i København, drevet af
          en personlig mission om at gøre hverdagen lettere for dem med ADHD.
        </Text>
        <Text
          style={[
            styles.aboutText,
            { color: colors.text, fontSize: 16 * scaleFactor }
          ]}>
          Vores rejse startede, da en af os så, hvordan hendes lillesøster
          kæmpede med de daglige udfordringer ADHD medførte. Dette inspirerede
          os til at udvikle en løsning, der ikke blot adresserer de unikke behov
          hos kvinder med ADHD, men også fejrer deres styrker og potentiale.
        </Text>
        <Text
          style={[
            styles.aboutText,
            { color: colors.text, fontSize: 16 * scaleFactor }
          ]}>
          I samarbejde med kvinder, der lever med ADHD, har vi designet herfocus
          til at være et støttende værktøj, hvor kvinder med ADHD kan finde
          forståelse, støtte og empowerment.
        </Text>
        <Text
          style={[
            styles.aboutText,
            { color: colors.text, fontSize: 16 * scaleFactor }
          ]}>
          Tak fordi du vælger at være en del af vores fællesskab. Sammen gør vi
          en forskel!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 40,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 25,
  },
  seperator: {
    height: 1,
    width: '60%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  icons: {
    marginRight: 10,
  },
  aboutText: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
});

export default AppHistory;
