const getAvatarImage = avatar => {
  const avatarMap = {
    Avatar1: require('../../Assets/images/Avatar1.png'),
    Avatar2: require('../../Assets/images/Avatar2.png'),
    Avatar3: require('../../Assets/images/Avatar3.png'),
    Avatar4: require('../../Assets/images/Avatar4.png'),
    Avatar5: require('../../Assets/images/Avatar5.png'),
    Avatar6: require('../../Assets/images/Avatar6.png'),
    Avatar7: require('../../Assets/images/Avatar7.png'),
    Avatar8: require('../../Assets/images/Avatar8.png'),
    Avatar9: require('../../Assets/images/Avatar9.png'),
    Avatar10: require('../../Assets/images/Avatar10.png'),
    Avatar11: require('../../Assets/images/Avatar11.png'),
    Avatar12: require('../../Assets/images/Avatar12.png'),
    Avatar13: require('../../Assets/images/Avatar13.png'),
    Avatar14: require('../../Assets/images/Avatar14.png'),
    Avatar15: require('../../Assets/images/Avatar15.png'),
    Avatar16: require('../../Assets/images/Avatar16.png'),
    Avatar17: require('../../Assets/images/Avatar17.png'),
    Avatar18: require('../../Assets/images/Avatar18.png'),
    Avatar19: require('../../Assets/images/Avatar19.png'),
  };

  return avatarMap[avatar];
};

export default getAvatarImage;
