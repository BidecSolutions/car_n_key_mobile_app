import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import {colors} from '../constant/colors';
import {Primaryfonts, Secondaryfonts} from '../constant/fonts';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      //@ts-ignore
      navigation.navigate('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/Images/SplashScreen.png')}
      style={styles.container}
      resizeMode="cover"
      />
  );
};

export default Splash;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
