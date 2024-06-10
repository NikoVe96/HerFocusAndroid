import { faCalendar, faCirclePlus, faHouse, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Text, View, TouchableOpacity } from 'react-native';

export const BottomNavigation = () => {

  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        backgroundColor: colors.border,
      }}>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => navigation.navigate('Front page')}>
        <FontAwesomeIcon icon={faHouse} size={20} color={colors.barText} />
        <Text style={{ color: colors.barText, paddingTop: 5 }}>Hjem</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => navigation.navigate('Todos')}>
        <FontAwesomeIcon icon={faCirclePlus} size={20} color={colors.barText} />
        <Text style={{ color: colors.barText, paddingTop: 5 }}>To-do</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => navigation.navigate('Calendar')}>
        <FontAwesomeIcon icon={faCalendar} size={20} color={colors.barText} />
        <Text style={{ color: colors.barText, paddingTop: 5 }}>Kalender</Text>
      </TouchableOpacity>
    </View>
  );
}

export default BottomNavigation;