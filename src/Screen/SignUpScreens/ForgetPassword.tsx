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

const ForgetPassword = () => {
  const navigation = useNavigation();
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
        <Text style={styles.subtitle}>Enter your registered email address or phone number, and we’ll send you a link to reset your password.</Text>
        
        <TextInput
          placeholder="Enter Your Email"
          style={styles.input}
          secureTextEntry
        />


        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.signupText}>Send Reset Link</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backtologinBtn}>
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
    height: '170@ms',
    marginBottom: '8@vs',
  },
  appName: {
    fontSize: '22@ms',
    fontWeight: 'bold',
    color: '#fff',
  },
  tagline: {
    fontSize: '11@ms',
    color: colors.white,
    marginTop: '4@vs',
  },
  card: {
    flex: 1,
    marginTop: '-10@vs',
    backgroundColor: colors.white,
    borderTopLeftRadius: '30@ms',
    borderTopRightRadius: '30@ms',
    padding: '20@s',
    alignItems: 'center',
    justifyContent:'center'
  },
  title: {
    fontSize: '20@ms',
    fontWeight: '600',
    color: colors.blue,
    marginBottom: '10@vs',
  },
  subtitle: {
    fontSize: '12@ms',
    fontWeight: '600',
    color: colors.hind,
    marginBottom: '20@vs',
    textAlign:'center'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: '8@ms',
    paddingVertical: '10@vs',
    paddingHorizontal: '12@s',
    fontSize: '13@ms',
    marginBottom: '12@vs',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '12@vs',
    alignSelf: 'flex-start',
  },
  checkbox: {
    width: '16@ms',
    height: '16@ms',
    borderWidth: 1,
    borderColor: '#555',
    marginRight: '8@s',
  },
  checkboxText: {
    fontSize: '12@ms',
    color: '#444',
  },
  link: {
    color: '#2E2A85',
    fontWeight: '600',
  },
  signupBtn: {
    width: '100%',
    backgroundColor: '#2E2A85',
    borderRadius: '30@ms',
    paddingVertical: '12@vs',
    alignItems: 'center',
    marginTop: '10@vs',
  },
  signupText: {
    fontSize: '14@ms',
    fontWeight: '600',
    color: '#fff',
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
    fontWeight: '600',
    color: colors.black,
  },
  
});
