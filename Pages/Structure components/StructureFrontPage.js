import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

export const StructureFrontPage = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width / 375, height / 667);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ paddingBottom: 20 }}>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontSize: 22 * scaleFactor },
          ]}>
          Hvad skal der planlægges i dag?
        </Text>
        <TouchableOpacity
          style={styles.press}
          onPress={() => navigation.navigate('Add task')}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}
            onPress={() => navigation.navigate('Add task')}>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Ny to-do
            </Text>
            <Image
              source={require('../../Assets/images/structure_todo.png')}
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
          onPress={() => navigation.navigate('Add event')}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Ny begivenhed
            </Text>
            <Image
              source={require('../../Assets/images/structure_event.png')}
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
          onPress={() => navigation.navigate('Add routine')}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Rutiner
            </Text>
            <Image
              source={require('../../Assets/images/structure_routine.png')}
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
          onPress={() => navigation.navigate('Future todo')}>
          <View
            style={[styles.buttonGrad, { backgroundColor: colors.mainButton }]}>
            <Text
              style={[
                styles.text,
                { color: colors.text, fontSize: 18 * scaleFactor },
              ]}>
              Fremtidige to-dos
            </Text>
            <Image
              source={require('../../Assets/images/CalenderMini.png')}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  helloUser: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    marginVertical: '5%',
  },
  text: {
    textAlign: 'center',
    marginLeft: 20,
  },
  buttonGrad: {
    width: '85%',
    borderRadius: 10,
    bottom: 5,
    backgroundColor: '#FFEABF',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    flexDirection: 'row',
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
  knowledgeViewSmall: {
    height: '40%',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    marginBottom: 60,
  }
});

export default StructureFrontPage;