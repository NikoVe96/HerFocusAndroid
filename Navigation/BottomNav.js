import { faCalendar, faPlus, faHouse, faComments, faBrain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';

export const BottomNavigation = () => {

  const navigation = useNavigation();
  const { colors } = useTheme();
  const [addModalVisible, setAddModalVisible] = useState(false);

  function addModal() {
    setAddModalVisible(true);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.mainButton }]}>
      <TouchableOpacity style={styles.Button}
        onPress={() => navigation.navigate('Home')}>
        <FontAwesomeIcon icon={faHouse} size={30} color={colors.text} />
        <Text style={{ fontSize: 13, color: 'white' }}>Hjem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button}
        onPress={() => navigation.navigate('Calendar')}>
        <FontAwesomeIcon icon={faCalendar} size={30} color="white" />
        <Text style={{ fontSize: 13, color: 'white' }}>Kalender</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.floatButton, { backgroundColor: '#F2C56B', borderColor: '#F6BC47' }]}
        onPress={() => navigation.navigate('Add')}>
        <FontAwesomeIcon icon={faPlus} size={40} color="white" style={{ transform: [{ rotate: '-45deg' }], }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button}
        onPress={() => navigation.navigate('Pick subject')}>
        <FontAwesomeIcon icon={faComments} size={30} color="white" />
        <Text style={{ fontSize: 13, color: 'white' }}>Forum</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button}
        onPress={() => navigation.navigate('Pick topic')}>
        <FontAwesomeIcon icon={faBrain} size={30} color="white" />
        <Text style={{ fontSize: 13, color: 'white' }}>Vidensbase</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#DC9B18',
    flexDirection: 'row',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 15,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  floatButton: {
    borderWidth: 1,
    borderColor: '#F2C56B',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    bottom: 30,
    height: 60,
    //backgroundColor: '#F2C56B',
    borderRadius: 10,
    transform: [{ rotate: '45deg' }],
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    borderBottomWidth: 3,
    borderRightWidth: 3
  },
  Button: {
    width: '20%',
    alignItems: 'center',
    top: '2%',
  }
})

export default BottomNavigation;