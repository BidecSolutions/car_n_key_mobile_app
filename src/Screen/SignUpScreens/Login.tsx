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
import {setAccessToken} from '../../utils/storage';
import {useUser} from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();
  const {user, updateUser} = useUser();
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const payload = {
        email: email,
        password: password,
        fcm_token: fcmToken,
      };

      const response = await api.public.post('/user/login', payload);

      if (response.data.success === true) {
        setShowAlert(true);
        const token = response.data.data.access_token;
        await setAccessToken(token);
        //@ts-ignore
        navigation.navigate('Home');

        const user = response.data.data.user;

        // Prepare user data to be saved
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          city: user.city,
          image: user.image,
          status: user.status
        };

         updateUser(userData);
      } else {
        Alert.alert(
          'Verification Failed',
          response.data.message || 'Invalid credentials',
        );
      }
    } catch (error: any) {
      if (error.response) {
        // API responded with an error
        const status = error.response.status;
        const errorMessage =
          error.response.data?.message || 'Login failed. Please try again.';

        Alert.alert('Login Failed', errorMessage);
        console.error('Login error response:', error.response.data);
      } else if (error.request) {
        // No response received
        Alert.alert(
          'Network Error',
          'No response from server. Please check your internet connection.',
        );
        console.error('No response received:', error.request);
      } else {
        // Something else happened
        Alert.alert('Error', error.message);
        console.error('Unexpected login error:', error.message);
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
