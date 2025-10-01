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

const SignUp = () => {
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
        <TextInput placeholder="Your Name" style={styles.input} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Phone"
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
        />

        {/* Checkbox + Text */}
        <View style={styles.checkboxRow}>
          <View style={styles.checkbox} />
          <Text style={styles.checkboxText}>
            I agree to processing of{' '}
            <Text style={styles.link}>Personal Data</Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Already have an account?
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Log In</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SignUp;

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
  },
  title: {
    fontSize: '20@ms',
    fontWeight: '600',
    color: '#2E2A85',
    marginBottom: '20@vs',
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
  footerText: {
    marginTop: '15@vs',
    fontSize: '12@ms',
    color: '#444',
  },
});
