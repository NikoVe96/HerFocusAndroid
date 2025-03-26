import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useTheme } from '@react-navigation/native';

export const TopNavigation = ({ navigation: { goBack } }) => {

  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 15,
      }}>
      <TouchableOpacity onPress={() => goBack()}>
        <FontAwesomeIcon icon={faCircleLeft} size={25} color={colors.lightText} />
      </TouchableOpacity>
      <View style={{ justifyContent: 'center' }}>
        <Image source={require('../Assets/images/logo_simple_dark.png')} style={{ width: 130, height: 30 }} />
      </View>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <FontAwesomeIcon icon={faBars} size={25} color={colors.lightText} />
      </TouchableOpacity>
    </View>
  );
};

export default TopNavigation;
