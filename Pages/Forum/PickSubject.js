import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

export const PickSubject = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={[
            styles.title,
            { color: colors.darkText, fontSize: 26 * scaleFactor },
          ]}>
          Hvilket emne vil du dykke ned i?
        </Text>
        <TouchableOpacity
          style={styles.press}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Familie',
              forumDescription:
                'I dette forum kan vi alle dele erfaringer, udfordringer og triumfer relateret til familierelationer.',
            })
          }>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.middle, borderColor: colors.middleShadow }]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 22 * scaleFactor },
              ]}>
              Familie
            </Text>
            <Image
              source={require('../../Assets/images/icons/family.png')}
              style={[
                styles.images,
                {
                  width: 70 * scaleFactor,
                  height: 70 * scaleFactor,
                },
              ]}></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Relationer',
              forumDescription:
                'Relationer kan nogle gange være komplicerede, når man har ADHD. I dette forum kan du dele tips, frustrationer osv., der har med relationer at gøre.',
            })
          }>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.middle, borderColor: colors.middleShadow }]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 22 * scaleFactor },
              ]}>
              Relationer
            </Text>
            <Image
              source={require('../../Assets/images/icons/holding-hands.png')}
              style={[
                styles.images,
                {
                  width: 80 * scaleFactor,
                  height: 70 * scaleFactor,
                },
              ]}></Image>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.press}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Medicin',
              forumDescription:
                'Medicin kan være et svært emne at tale om. Hold venligst medicinensnakken til dette forum, og husk at kontakte en læge, hvis det er nødvendigt.',
            })
          }>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.middle, borderColor: colors.middleShadow }]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 22 * scaleFactor },
              ]}>
              Medicin
            </Text>
            <Image
              source={require('../../Assets/images/icons/medicine.png')}
              style={[
                styles.images,
                {
                  width: 70 * scaleFactor,
                  height: 70 * scaleFactor,
                },
              ]}></Image>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.press}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Gode tips',
              forumDescription:
                'Det er altid rart at lære af andres gode erfaringer. Her kan du dele dine gode tips, men også lære hvad der hjælper for andre.',
            })
          }>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.middle, borderColor: colors.middleShadow }]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 22 * scaleFactor },
              ]}>
              Gode tips
            </Text>
            <Image
              source={require('../../Assets/images/icons/idea.png')}
              style={[
                styles.images,
                {
                  width: 70 * scaleFactor,
                  height: 70 * scaleFactor,
                },
              ]}></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.press}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Den kvindelige cyklus',
              forumDescription:
                'Kvinders cyklus kan have stor påvirkning på vores humør og energiniveau. Her kan du dele tips, spørgsmål og erfaringer til hvordan den kvindelige cyklus kan håndteres',
            })
          }>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.middle, borderColor: colors.middleShadow }]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 22 * scaleFactor },
              ]}>
              Den kvindelige cyklus
            </Text>
            <Image
              source={require('../../Assets/images/icons/uterus.png')}
              style={[
                styles.images,
                {
                  width: 70 * scaleFactor,
                  height: 70 * scaleFactor,
                },
              ]}></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.press, { marginBottom: '15%' }]}
          onPress={() =>
            navigation.navigate('Forum', {
              forumTitle: 'Andet',
              forumDescription:
                'Her kan man skrive om alt det andet, som ikke falder ind under de andre emner.',
            })
          }>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.middle, borderColor: colors.middleShadow }]}>
            <Text
              style={[
                styles.text,
                { color: colors.darkText, fontSize: 22 * scaleFactor },
              ]}>
              Andet
            </Text>
            <Image
              source={require('../../Assets/images/icons/thinking(1).png')}
              style={[
                styles.images,
                {
                  width: 70 * scaleFactor,
                  height: 70 * scaleFactor,
                },
              ]}></Image>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 35,
    marginTop: 35,
    marginHorizontal: '5%'
  },
  text: {
    textAlign: 'center',
    marginLeft: 20,
  },
  buttonGrad: {
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    bottom: 5,
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    flexDirection: 'row',
    borderWidth: 0.4,
    borderBottomWidth: 4,
    justifyContent: 'space-between',
  },
  press: {
    marginBottom: 15,
  },
  images: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 20,
  },
});

export default PickSubject;
