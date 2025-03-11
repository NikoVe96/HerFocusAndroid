import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useTheme } from '@react-navigation/native';

export const TopNavigation = ({ navigation: { goBack } }) => {

  const navigation = useNavigation();
  const { colors } = useTheme();

  const logoSource =
    colors.border === '#131227' ||
      colors.border === '#000000'
      ? require('../Assets/images/logo_simple_dark.png')
      : require('../Assets/images/logo_simple_light.png');

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 15,
        backgroundColor: colors.background,
      }}>
      <TouchableOpacity onPress={() => goBack()}>
        <FontAwesomeIcon icon={faCircleLeft} size={25} color={colors.barText} />
      </TouchableOpacity>
      <View style={{ justifyContent: 'center' }}>
        <Image source={logoSource} style={{ width: 110, height: 30 }} />
      </View>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <FontAwesomeIcon icon={faBars} size={25} color={colors.barText} />
      </TouchableOpacity>
    </View>
  );
};

export default TopNavigation;
