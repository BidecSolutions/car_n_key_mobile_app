import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {
  ScaledSheet,
  scale,
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {colors} from './colors';
import {useUser} from '../context/UserContext';
import api from '../api';
import {ASSET_URL} from '.';
import {UserProfile} from '../types';
import {Loader} from '../Components/loader/Loader';
import {Secondaryfonts} from './fonts';

const CustomDrawer = (props: any) => {
  const navigation = useNavigation();
  const {logout} = useUser();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      const response = await api.protected.post('auth/user/logout');

      if (response?.data?.success) {
        logout();
        Alert.alert('Logout Successful');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      } else {
        console.warn('⚠️ Logout failed:', response?.data);
        Alert.alert(
          'Logout Failed',
          response?.data?.message ||
            'An error occurred during logout. Please try again.',
        );
      }
    } catch (error) {
      console.error(
        '❌ Logout Error:',
        error?.response?.data || error?.message || error,
      );
      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          'An unexpected error occurred. Check logs for details.',
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  const DrawerButton = ({label, icon, onPress}: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      {icon}
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: moderateScale(16)}}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/Images/CarnKeyLogo.png')}
            style={styles.logoContainer}
            resizeMode="contain"
          />

          {/* Right arrow button */}
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={moderateScale(16)}
              color={colors.black}
              style={{alignSelf: 'center', right: scale(1)}}
            />
          </TouchableOpacity>

          {/* User Avatar */}
          <View style={styles.avatarContainer}>
            <Image
              source={
                profile?.image
                  ? {uri: `${ASSET_URL}${profile.image}`}
                  : require('../assets/Images/UserImage.png')
              }
              style={styles.avatar}
            />
          </View>

          {/* Username */}
          <Text style={styles.usernameText}>
            {profile?.name || 'Jack Warner'}
          </Text>
        </View>

        {/* Menu Items */}
        {/* <DrawerButton
          label="Profile"
          icon={
            <Icon name="person-outline" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('BottomTabs', {screen: 'Profile'})}
        /> */}

        <DrawerButton
          label="My Garage"
          icon={
            <Icon name="car-outline" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('MyGarage')}
        />

        <DrawerButton
          label="Buy a Car"
          icon={
            <Icon name="list-outline" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('CarListing')}
        />

        <DrawerButton
          label="Compare Cars"
          icon={
            <Icon
              name="git-compare-outline"
              size={moderateScale(20)}
              color="#000"
            />
          }
          onPress={() => navigation.navigate('CarComparison')}
        />

        <DrawerButton
          label="Financing"
          icon={
            <Icon name="card-outline" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('Financing')}
        />

        <DrawerButton
          label="Sell Your Car"
          icon={
            <Icon
              name="pricetag-outline"
              size={moderateScale(20)}
              color="#000"
            />
          }
          onPress={() => navigation.navigate('SellYourCar')}
        />

        <DrawerButton
          label="Find a Dealer"
          icon={
            <Icon
              name="business-outline"
              size={moderateScale(20)}
              color="#000"
            />
          }
          onPress={() => navigation.navigate('FindADealer')}
        />

        <DrawerButton
          label="Trade In Today"
          icon={
            <Icon
              name="swap-horizontal-outline"
              size={moderateScale(20)}
              color="#000"
            />
          }
          onPress={() => navigation.navigate('TradeInToday')}
        />

        <DrawerButton
          label="Car Valuation"
          icon={
            <Icon
              name="speedometer-outline"
              size={moderateScale(20)}
              color="#000"
            />
          }
          onPress={() => navigation.navigate('CarValuation')}
        />

        <DrawerButton
          label="Trade In"
          icon={
            <Icon name="repeat-outline" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('TradeInProcess')}
        />
        <DrawerButton
          label="Personal Information"
          icon={
            <Icon name="person-outline" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('PersonalInfo')}
        />
        <DrawerButton
          label="Change Password"
          icon={
            <Icon
              name="lock-closed-outline"
              size={moderateScale(20)}
              color="#000"
            />
          }
          onPress={() => navigation.navigate('ChangePassword')}
        />

        {/* <DrawerButton
          label="Car X-Ray"
          icon={
            <Icon name="eye-outline" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('CarXRay')}
        /> */}

        {/* Logout Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const PROFILE_CIRCLE = moderateScale(50);
const BACK_CIRCLE = moderateScale(35);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: colors.blue,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    paddingVertical: verticalScale(40),
    paddingHorizontal: scale(16),
    alignItems: 'center',

    marginBottom: verticalScale(20),
    bottom: '5@vs',
    width: '100%',
  },

  logoContainer: {
    position: 'absolute',
    top: verticalScale(10),
    right: scale(130),
    width: moderateScale(110),
    height: verticalScale(40),
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },

  arrowButton: {
    position: 'absolute',
    top: verticalScale(20),
    right: scale(15),
    backgroundColor: colors.white,
    borderRadius: moderateScale(12.5),
    padding: moderateScale(5),
    width: '25@ms',
    height: '25@ms',
  },

  avatarContainer: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    overflow: 'hidden',
    top: verticalScale(25),
  },

  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(35),
  },

  usernameText: {
    fontSize: moderateScale(17),
    fontFamily: Secondaryfonts.medium,
    color: colors.white,
    textAlign: 'center',
    top: verticalScale(25),
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
    paddingHorizontal: '16@s',
  },
  menuLabel: {
    fontSize: moderateScale(14),
    fontFamily: Secondaryfonts.medium,
    marginLeft: scale(12),
    color: colors.black,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: colors.hind,
    marginTop: verticalScale(5),
    marginBottom: verticalScale(20),
  },
  buttonContainer: {
    marginTop: '10@vs',
    paddingHorizontal: '16@s',
  },
  logoutButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
    padding: '15@ms',
    borderRadius: '20@s',
    paddingVertical: '5@vs',
    paddingHorizontal: '30@s',
  },
  logoutText: {
    fontSize: '16@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.white,
  },
});
