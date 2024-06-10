import { Text, View, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { useTheme } from '@react-navigation/native';

export const ContactInformation = () => {
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
              { color: colors.text, fontSize: 30 * scaleFactor },
            ]}>
            Kontaktinformationer
          </Text>
        </View>
        <View
          style={[styles.seperator, { backgroundColor: colors.border }]}></View>
        <Text
          style={[
            styles.contactText,
            { color: colors.text, fontSize: 16 * scaleFactor },
          ]}>
          Har du har spørgsmål, problemer eller feedback, er du velkommen til at
          tage kontakt til os. Vi vil meget gerne høre fra dig!
        </Text>
        <View style={styles.contactContainer}>
          <View style={[styles.contact, { backgroundColor: colors.mainButton }]}>
            <View style={styles.phoneAndMail}>
              <FontAwesomeIcon icon={faPhone} style={styles.icons} size={25} />
              <Text
                style={[
                  styles.phoneAndMailText,
                  { color: colors.text, fontSize: 21 * scaleFactor },
                ]}>
                +45 31652107
              </Text>
            </View>
          </View>
          <View style={[styles.contact, { backgroundColor: colors.mainButton }]}>
            <View style={styles.phoneAndMail}>
              <FontAwesomeIcon
                icon={faEnvelope}
                style={styles.icons}
                size={25}
              />
              <Text
                style={[
                  styles.phoneAndMailText,
                  { color: colors.text, fontSize: 21 * scaleFactor },
                ]}>
                emhb@itu.dk
              </Text>
            </View>
          </View>
        </View>
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
    flexDirection: 'row',
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 25,
  },
  seperator: {
    height: 1,
    width: '75%',
    marginTop: 10,
    marginBottom: 30,
    alignSelf: 'center',
  },
  contactText: {
    fontSize: 15,
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 10,
  },
  contact: {
    borderRadius: 20,
    width: '75%',
    height: 50,
    marginTop: 30,
    alignSelf: 'center',
  },
  buttonParent: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    backgroundColor: '#DC9B18',
    alignSelf: 'center',
    elevation: 10,
    zIndex: 1,
  },
  icons: {
    margin: 13,
    marginLeft: 20,
  },
  phoneAndMail: {
    flexDirection: 'row',
  },
  phoneAndMailText: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
});

export default ContactInformation;
