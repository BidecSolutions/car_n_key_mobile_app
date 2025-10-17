import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import {
  ScaledSheet,
  moderateScale,
  verticalScale,
} from 'react-native-size-matters';
import {colors} from '../constant/colors';
import {Secondaryfonts} from '../constant/fonts';
import Icon from 'react-native-vector-icons/Feather';
import CountryPicker from 'react-native-country-picker-modal';
import api from '../api';

const ChangePassword = () => {
  const [editing, setEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const validatePassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return false;
    }

    if (newPassword === currentPassword) {
      Alert.alert(
        'Error',
        'New password cannot be the same as current password.',
      );
      return false;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
      return false;
    }

    // const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    // if (!passwordRegex.test(newPassword)) {
    //   Alert.alert(
    //     'Error',
    //     'Password must include at least one number and one special character.'
    //   );
    //   return false;
    // }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;

    const payload = {currentPassword, newPassword, confirmNewPassword};

    try {
      const response = await api.protected.post('user/changePassword', payload);
      if (response.data.success) {
        Alert.alert('Success', 'Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error: any) {
      console.log(
        'Password change error:',
        error.response?.data?.message || error.message,
      );
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong.',
      );
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Images/LoginsBackground.jpg')}
      style={styles.container}
      resizeMode="cover">
      {/* Top Blue Section */}
      <View style={styles.topSection}>
        <Image
          source={require('../assets/Images/LoginsIcon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* White Card Section */}
      <View style={styles.card}>
        <Text style={styles.title}>Change Your Password</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter Current Password"
            placeholderTextColor="#666"
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter New Password"
            placeholderTextColor="#666"
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            placeholder="Confirm New Password"
            placeholderTextColor="#666"
            secureTextEntry
          />
        </View>

        {/* Save Button */}

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {
            setEditing(false), handleChangePassword;
          }}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ChangePassword;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topSection: {
    backgroundColor: colors.blue,
    height: '220@vs',
    borderBottomRightRadius: '40@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '160@ms',
    height: '160@ms',
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: '30@ms',
    borderTopRightRadius: '30@ms',
    marginTop: '-25@vs',
    paddingHorizontal: '20@ms',
    paddingTop: '16@vs',
  },
  editRow: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4@vs',
  },
  editText: {
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  title: {
    fontSize: '21@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.blue,
    textAlign: 'center',
    marginTop: '35@vs',
  },
  inputContainer: {
    width: '100%',
    marginBottom: '12@vs',
    top: '40@vs',
  },
  inputRow: {
    flexDirection: 'row',
    width: '48%',
  },
  label: {
    fontSize: '12@ms',
    color: colors.black,
    marginBottom: '4@vs',
    fontFamily: Secondaryfonts.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: '8@ms',
    paddingVertical: '8@vs',
    paddingHorizontal: '12@ms',
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.regular,
  },
  inputHalf: {
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: '8@ms',
    paddingVertical: '8@vs',
    paddingHorizontal: '6@ms',
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.regular,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: '8@ms',
    paddingHorizontal: '8@ms',
    paddingVertical: '8@vs',
    marginRight: '8@ms',
  },
  countryCode: {
    fontSize: '13@ms',
    color: '#000',
    marginLeft: '4@ms',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: '8@ms',
    paddingVertical: '8@vs',
    paddingHorizontal: '10@ms',
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.regular,
  },
  saveBtn: {
    width: '100%',
    backgroundColor: colors.blue,
    borderRadius: '25@ms',
    paddingVertical: '8@vs',
    alignItems: 'center',
    marginTop: '50@vs',
  },
  saveText: {
    color: colors.white,
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
  },
});
