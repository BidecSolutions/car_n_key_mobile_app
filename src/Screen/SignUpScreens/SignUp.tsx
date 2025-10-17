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
import {
  moderateScale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {colors} from '../../constant/colors';
import {Primaryfonts, Secondaryfonts} from '../../constant/fonts';
import {CommonActions, useNavigation} from '@react-navigation/native';
import api from '../../api';
import {useUser} from '../../context/UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const {user, updateUser} = useUser();
  const [selectedGender, setSelectedGender] = useState<{
    label: string;
    value: number;
  } | null>(null);
  const [secureText, setSecureText] = useState(true);
  const [confirmPassword, setconfirmPasssword] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [secureConfirmText, setSecureConfirmText] = useState(true);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const [showAlert, setShowAlert] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // const isFormValid = passwordsMatch;

  const hideAlert = () => {
    setShowAlert(false);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Login',
      }),
    );
  };

  const handleRegister = async () => {
    // mark that user tried to submit — used to show red borders
    setSubmitted(true);

    // 1) Required fields
    if (
      !name.trim() ||
      !email.trim() ||
      !phoneNo.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    if (phoneNo.length < 10) {
      Alert.alert('Error', 'Phone number should contain atleast 10-15 digits');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (!isChecked) {
      Alert.alert(
        'Terms Required',
        'Please agree to the processing of personal data before signing up.',
      );
      return;
    }

    // if (!isFormValid) {
    //   Alert.alert(
    //     'Password Error',
    //     'Please make sure your password meets all requirements and that both passwords match.',
    //   );
    //   return;
    // }

    const payload = {
      firstName: name.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
      phone: phoneNo.trim(),
    };

    try {
      const response = await api.public.post('auth/user/register', payload);

      if (response.data.success === true) {
        setShowAlert(true);
      } else {
        Alert.alert(
          'Verification Failed',
          response.data.message || 'Invalid credentials',
        );
      }
    } catch (error: any) {
      if (error.response) {
        console.log('REGISTER ERROR RESPONSE:', error.response.data);
        Alert.alert(
          'Register Failed',
          error.response.data?.message || 'Something went wrong.',
        );
      } else if (error.request) {
        Alert.alert(
          'Network Error',
          'No response from server. Please check your internet connection.',
        );
      } else {
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
          placeholder="First Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Phone"
          style={styles.input}
          keyboardType="phone-pad"
          value={phoneNo}
          onChangeText={setPhoneNo}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setconfirmPasssword}
        />

        {/* Checkbox + Text */}
        <View style={styles.checkboxRow}>
          <TouchableOpacity
            onPress={() => setIsChecked(!isChecked)}
            activeOpacity={0.7}
            style={[
              styles.checkbox,
              isChecked && {
                backgroundColor: colors.blue,
                borderColor: colors.black,
              }, // blue background
            ]}>
            {isChecked && (
              <Icon
                name="checkmark"
                size={moderateScale(10)}
                color="#fff"
                style={{alignSelf: 'center'}}
              />
            )}
          </TouchableOpacity>

          <Text style={styles.checkboxText}>
            I agree to processing of{' '}
            <Text style={styles.link}>Personal Data</Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signupBtn} onPress={handleRegister}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <AwesomeAlert
          show={showAlert}
          title="Success"
          message="Registered successfully"
          closeOnTouchOutside
          showConfirmButton
          confirmButtonColor="#000"
          confirmText="Done"
          onConfirmPressed={hideAlert}
        />

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
    height: '170@vs',
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
    fontFamily: Secondaryfonts.medium,
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
    paddingVertical: '8@vs',
    paddingHorizontal: '12@s',
    fontSize: '13@ms',
    marginBottom: '12@vs',
    color: colors.black,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '4@vs',
    alignSelf: 'flex-start',
  },
  checkbox: {
    width: moderateScale(16),
    height: verticalScale(15),
    borderWidth: 1,
    borderColor: colors.black,
    marginRight: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  checkboxText: {
    fontSize: '12@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  link: {
    color: colors.blue,
    fontFamily: Secondaryfonts.medium,
    top: '2@vs',
  },
  signupBtn: {
    width: '100%',
    backgroundColor: colors.blue,
    borderRadius: '30@ms',
    paddingVertical: '9@vs',
    alignItems: 'center',
    marginTop: '10@vs',
  },
  signupText: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.white,
  },
  footerText: {
    marginTop: '10@vs',
    fontSize: '12@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
});
