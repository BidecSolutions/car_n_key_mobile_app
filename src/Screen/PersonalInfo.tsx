import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
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

const PersonalInfo = () => {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('Jack');
  const [lastName, setLastName] = useState('Warner');
  const [email, setEmail] = useState('jackwarner@gmail.com');
  const [phone, setPhone] = useState('(234) 7669 821');
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('+1');
  const [countryName, setCountryName] = useState('United States');
  const [visible, setVisible] = useState(false);

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
        <TouchableOpacity
          style={styles.editRow}
          onPress={() => setEditing(!editing)}>
          <Text style={styles.editText}>Edit your Details</Text>
          <Icon
            name="edit"
            size={moderateScale(14)}
            color={colors.black}
            style={{marginLeft: moderateScale(6)}}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Personal Information</Text>

        {/* Input Fields */}
        <View style={styles.inputRow}>
          <View
            style={[styles.inputContainer, {marginRight: moderateScale(6)}]}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.inputHalf}
              value={firstName}
              editable={editing}
              onChangeText={setFirstName}
              placeholder="First Name"
              placeholderTextColor="#999"
            />
          </View>
          <View style={[styles.inputContainer, {marginLeft: moderateScale(6)}]}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.inputHalf}
              value={lastName}
              editable={editing}
              onChangeText={setLastName}
              placeholder="Last Name"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            editable={editing}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#999"
          />
        </View>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone No</Text>
          <View style={styles.phoneRow}>
            <TouchableOpacity
              disabled={!editing}
              style={styles.countryContainer}
              onPress={() => setVisible(true)}>
              <CountryPicker
                visible={visible}
                withFilter
                withFlag
                withCallingCode
                withCountryNameButton={false}
                onSelect={country => {
                  setCountryCode(country.cca2);
                  setCallingCode('+' + country.callingCode[0]);
                  setCountryName(country.name);
                  setVisible(false);
                }}
                onClose={() => setVisible(false)}
                countryCode={countryCode}
                flatListProps={
                  {
                    initialNumToRender: 20,
                    maxToRenderPerBatch: 20,
                    windowSize: 50,
                    updateCellsBatchingPeriod: 50,
                  } as any
                }
              />

              <Text style={styles.countryCode}>{callingCode}</Text>
              <Icon
                name="chevron-down"
                size={moderateScale(14)}
                color="#555"
                style={{marginLeft: 4}}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.phoneInput}
              value={phone}
              editable={editing}
              onChangeText={setPhone}
              placeholder="(234) 7669 821"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Save Button */}
        {editing && (
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => setEditing(false)}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

export default PersonalInfo;

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
