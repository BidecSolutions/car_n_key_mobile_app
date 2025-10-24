import React, {useState} from 'react';
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
import {colors} from '../../constant/colors';
import {Primaryfonts, Secondaryfonts} from '../../constant/fonts';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';
import {
  removeAccessToken,
  removeUserData,
  setAccessToken,
  setUserData,
} from '../../utils/storage';
import {useUser} from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api';
import AwesomeAlert from 'react-native-awesome-alerts';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const {user, updateUser} = useUser();
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const hideAlert = () => {
    setShowAlert(false);
    navigation.navigate('Home');
  };

  const handleLogin = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');

    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const payload = {
        email: email.trim(),
        password: password,
        // fcm_token: fcmToken,
      };

      const response = await api.public.post('auth/user/login', payload);

      if (response.data.success === true) {
        setShowAlert(true);

        const token = response.data.data.token;
        const user = response.data.data.user;

        const userData = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          status: user.status,
          guard: user.guard,
          userType: user.userType,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

        updateUser(userData);

        await setAccessToken(token);
        await setUserData(userData);

        if (rememberMe) {
          await AsyncStorage.setItem('rememberMe', 'true');
        } else {
          await AsyncStorage.setItem('rememberMe', 'false');
        }

        //@ts-ignore
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Verification Failed',
          response.data.message || 'Invalid credentials.',
        );
      }
    } catch (error: any) {
      if (error.response) {
        console.error('Login error response:', error.response.data);
        Alert.alert(
          'Login Failed',
          error.response.data?.message || 'Something went wrong.',
        );
      } else if (error.request) {
        console.error('No response received:', error.request);
        Alert.alert(
          'Network Error',
          'No response from server. Please check your internet connection.',
        );
      } else {
        console.error('Unexpected login error:', error.message);
        Alert.alert('Error', error.message);
      }
    }
  };

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
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Checkbox + Text + Forgot Password */}
        <View style={styles.checkboxRow}>
          <BouncyCheckbox
            size={20}
            fillColor={colors.blue}
            text="Remember Me"
            iconStyle={{borderColor: colors.blue}}
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
        <TouchableOpacity style={styles.signupBtn} onPress={handleLogin}>
          <Text style={styles.signupText}>Login</Text>
        </TouchableOpacity>

        <AwesomeAlert
          show={showAlert}
          title="Success"
          message="Login successfully"
          closeOnTouchOutside
          showConfirmButton
          confirmButtonColor="#000"
          confirmText="Done"
          onConfirmPressed={hideAlert}
        />

        {/* Footer */}
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
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
    right: '7@s',
  },

  forgotText: {
    fontSize: '12@ms',
    color: colors.blue,
    fontFamily: Secondaryfonts.medium,
  },

  link: {
    color: colors.blue,
    fontFamily: Secondaryfonts.medium,
    top: '3@vs',
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
