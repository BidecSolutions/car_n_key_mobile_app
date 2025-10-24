import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {ScaledSheet, s, vs, ms} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constant/colors';
import {Header} from '../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {Primaryfonts, Secondaryfonts} from '../../constant/fonts';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const SellYourCar2: React.FC = () => {
  const [selected, setSelected] = useState(false);
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        showBack={true}
        showDrawer={true}
        onDrawerPress={() => navigation.openDrawer()}
        backgroundColor={colors.backgroundColor}
        onBackPress={() => navigation.goBack()}
        iconColor={colors.black}
        titleColor={colors.black}
      />

      {/* Title */}
      <Text style={styles.title}>You’re almost done</Text>
      <Text style={styles.subtitle}>All fields with * are required</Text>

      {/* Form */}
      <View style={styles.row}>
        <TextInput
          placeholder="First Name"
          style={styles.inputHalf}
          placeholderTextColor="#666"
        />
        <TextInput
          placeholder="Last Name"
          style={styles.inputHalf}
          placeholderTextColor="#666"
        />
      </View>

      <TextInput
        placeholder="Phone Number"
        style={styles.inputFull}
        placeholderTextColor="#666"
      />

      <Text style={styles.infoText}>
        We will send a code to your mobile to verify your phone number
      </Text>

      <View style={styles.row}>
        <TextInput
          placeholder="Code"
          style={styles.inputHalf}
          placeholderTextColor="#666"
        />
        <TextInput
          placeholder="Vin"
          style={styles.inputHalf}
          placeholderTextColor="#666"
        />
      </View>

      <TextInput
        placeholder="Email*"
        style={styles.inputFull}
        placeholderTextColor="#666"
        
      />

      {/* Radio + Terms */}
      <TouchableOpacity
        style={styles.radioRow}
        onPress={() => setSelected(!selected)}>
        <View style={styles.radioOuter}>
          {selected && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.terms}>
          By clicking the button below, you agree to the instant Offer Terms and
          conditions and Carnkey.com Privacy Statement
        </Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate('ListedSuccess')}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: '16@ms',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20@vs',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginRight: '15@s',
  },
  title: {
    fontSize: '25@ms',
    fontFamily: Primaryfonts.medium,
    textAlign: 'center',
    color: colors.black,
    padding: '16@ms',
  },
  subtitle: {
    fontSize: '13@ms',
    textAlign: 'center',
    color: colors.black,
    marginBottom: '16@vs',
    marginHorizontal: '16@s',
    fontFamily: Secondaryfonts.medium,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '12@vs',
  },
  inputHalf: {
    flex: 0.48,
    borderRadius: '8@s',
    paddingVertical: '10@vs',
    paddingHorizontal: '12@s',
    backgroundColor: colors.cardsBackgroundColor,
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  inputFull: {
    width: '100%',
    borderRadius: '8@s',
    paddingVertical: '10@vs',
    paddingHorizontal: '12@s',
    backgroundColor: colors.cardsBackgroundColor,
    fontSize: '14@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
    marginBottom: '12@vs',
  },
  infoText: {
    fontSize: '12@ms',
    color: colors.black,
    marginBottom: '12@vs',
    fontFamily: Secondaryfonts.medium,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: '20@vs',
  },
  radioOuter: {
    width: '18@s',
    height: '18@s',
    borderRadius: '9@s',
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10@s',
    marginTop: '3@vs',
  },
  radioInner: {
    width: '10@s',
    height: '10@s',
    borderRadius: '5@s',
    backgroundColor: '#000',
  },
  terms: {
    flex: 1,
    fontSize: '11@ms',
    color: '#000',
  },
  submitBtn: {
    backgroundColor: colors.blue,
    borderRadius: '25@s',
    paddingVertical: '9@vs',
    alignItems: 'center',
  },
  submitText: {
    color: colors.white,
    fontSize: '16@ms',
    fontFamily: Secondaryfonts.medium,
  },
});

export default SellYourCar2;
