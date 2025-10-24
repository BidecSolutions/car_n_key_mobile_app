import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {colors} from '../../constant/colors';
import {Primaryfonts, Secondaryfonts} from '../../constant/fonts';
import {useNavigation} from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const ForgetPassword = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  return (
    <ImageBackground
      source={require('../../assets/Images/LoginsBackground.jpg')}
      style={styles.container}
      resizeMode="cover">
      {/* Top Blue Section */}
      <View style={styles.topSection}>
        <Image
          source={require('../../assets/Images/LoginsIcon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* White Card Section */}
      <View style={styles.card}>
        <Text style={styles.title}>Reset Your Password</Text>
        <Text style={styles.subtitle}>Enter your registered email address or phone number, {'\n'} and we’ll send you a link to reset your password.</Text>
        
        <TextInput
          placeholder="Enter Your Email"
          style={styles.input}
          secureTextEntry
          placeholderTextColor={'#666'}
        />


        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.signupText}>Send Reset Link</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backtologinBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backtologinBtnText}>Back To Login</Text>
        </TouchableOpacity>

        
      </View>
    </ImageBackground>
  );
};

export default ForgetPassword;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topSection: {
    backgroundColor: colors.blue,
    height: '200@vs',
    borderBottomRightRadius: '40@ms',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '30@vs',
  },
  logo: {
    width: '170@ms',
    height: '170@vs',
    marginBottom: '8@vs',
  },
  appName: {
    fontSize: '22@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.white,
  },
  tagline: {
    fontSize: '11@ms',
    color: colors.white,
    fontFamily: Secondaryfonts.medium,
    marginTop: '4@vs',
  },
  card: {
    flex: 1,
    marginTop: '-10@vs',
    backgroundColor: colors.white,
    borderTopLeftRadius: '30@ms',
    borderTopRightRadius: '30@ms',
    padding: '20@ms',
    alignItems: 'center',
    justifyContent:'center'
  },
  title: {
    fontSize: '25@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.blue,
    marginBottom: '10@vs',
  },
  subtitle: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginBottom: '20@vs',
    textAlign:'center'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.hind,
    borderRadius: '8@ms',
    paddingVertical: '10@vs',
    paddingHorizontal: '12@s',
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    marginBottom: '12@vs',
    color: colors.black,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '12@vs',
    alignSelf: 'flex-start',
  },
  checkbox: {
    width: '16@ms',
    height: '16@vs',
    borderWidth: 1,
    borderColor: colors.hind,
    marginRight: '8@s',
  },
  checkboxText: {
    fontSize: '12@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.semibold,
  },
  link: {
    color: colors.blue,
    fontFamily: Secondaryfonts.medium,
  },
  signupBtn: {
    width: '100%',
    backgroundColor: colors.blue,
    borderRadius: '30@ms',
    paddingVertical: '12@vs',
    alignItems: 'center',
    marginTop: '10@vs',
  },
  signupText: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.white,
  },
  backtologinBtn: {
    width: '100%',
    backgroundColor: colors.white,
    borderWidth:1,
    borderColor:colors.blue,
    borderRadius: '30@ms',
    paddingVertical: '12@vs',
    alignItems: 'center',
    marginTop: '10@vs',
  },
  backtologinBtnText: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  
});
