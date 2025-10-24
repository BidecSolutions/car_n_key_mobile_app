import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {ScaledSheet, ms, vs, s} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {Header} from '../../Components/Header/Header';
import {colors} from '../../constant/colors';
import {Primaryfonts, Secondaryfonts} from '../../constant/fonts';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const ListedSuccess: React.FC = () => {
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
      <Text style={styles.title}>Your Car Has Been Listed Successfully</Text>
      {/* <Text style={styles.title}>Successfully</Text> */}

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Dealers can now see your listing and may contact you soon. Keep an eye
        on your messages.
      </Text>

      {/* Image Placeholder */}
      <View style={styles.imagePlaceholder}>
        {/* Replace this with your Image */}
        <Image source={require('../../assets/Images/ListedSuccess.png')} style={styles.image} />
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate('MyCarListing')}>
        <Text style={styles.submitText}>View My Listings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: '16@ms',
    justifyContent: 'flex-start',
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
  imagePlaceholder: {
    width: '100%',
    height: '250@vs',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30@vs',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  submitBtn: {
    backgroundColor: colors.blue,
    borderRadius: '25@s',
    paddingVertical: '9@vs',
    alignItems: 'center',
  },
  submitText: {
    color: colors.white,
    fontSize: '15@ms',
    fontFamily: Secondaryfonts.medium,
  },
});

export default ListedSuccess;
