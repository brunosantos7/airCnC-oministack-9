import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-community/async-storage';

export default function LoggoutButton({navigation}) {
  const redirect = async () => {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  };
  Icon.loadFont();

  return (
    <Icon
      name="arrow-forward"
      size={20}
      color="#FFF"
      style={styles.loggout}
      onPress={redirect}
    />
  );
}

const styles = StyleSheet.create({
  loggout: {marginRight: 20, color: '#000'},
});
