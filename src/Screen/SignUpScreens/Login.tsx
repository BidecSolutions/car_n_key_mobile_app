import React, {useState} from 'react';
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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
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
        <Text style={styles.title}>Get Started</Text>

        {/* Input Fields */}

        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />

        {/* Checkbox + Text + Forgot Password */}
        <View style={styles.checkboxRow}>
          <BouncyCheckbox
            size={20}
            fillColor="#2E2A85"
            text="Remember Me"
            iconStyle={{borderColor: '#2E2A85'}}
            textStyle={styles.checkboxText}
            isChecked={rememberMe}
            onPress={isChecked => setRememberMe(isChecked)}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}
            style={{marginLeft: 'auto'}}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.signupText}>Login</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Don't have an account? <Text style={styles.link}>Sign Up</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Login;

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
   fontFamily: Secondaryfonts.semibold,
    color: colors.white,
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
    padding: '20@ms',
    alignItems: 'center',
  },
  title: {
    fontSize: '20@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.blue,
    marginBottom: '20@vs',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.hind,
    fontFamily: Secondaryfonts.medium,
    borderRadius: '8@ms',
    paddingVertical: '10@vs',
    paddingHorizontal: '12@s',
    fontSize: '13@ms',
    marginBottom: '12@vs',
    color: colors.black,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: '12@vs',
  },

  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkboxText: {
    fontSize: '12@ms',
    color: colors.black,
    textDecorationLine: 'none', 
    fontFamily: Secondaryfonts.medium,
    right: '7@s'
  },

  forgotText: {
    fontSize: '12@ms',
    color: colors.blue,
    fontFamily: Secondaryfonts.medium,
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
    fontFamily: Secondaryfonts.semibold,
    color: colors.white,
  },
  footerText: {
    marginTop: '15@vs',
    fontSize: '12@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
});
