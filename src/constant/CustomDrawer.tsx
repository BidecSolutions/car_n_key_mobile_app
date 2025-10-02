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
import Icon from 'react-native-vector-icons/FontAwesome5';
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

const CustomDrawer = (props: any) => {
  const navigation = useNavigation();
  const {logout} = useUser();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        contentContainerStyle={{padding: scale(16)}}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Entypo
            name="chevron-left"
            size={moderateScale(20)}
            color={colors.black}
          />
        </TouchableOpacity>

        {/* User Info */}
        <View style={styles.profileContainer}>
          <Image
            source={
              profile?.image
                ? {uri: `${ASSET_URL}${profile.image}`}
                : require('../assets/Images/UserImage.png')
            }
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.userName}>{profile?.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Feather name="map-pin" size={moderateScale(10)} color={colors.hind} /> */}
              <Text style={styles.userSub}>{profile?.email}</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <DrawerButton
          label="Profile"
          icon={<Feather name="user" size={moderateScale(20)} color="#000" />}
          onPress={() =>
            navigation.navigate('BottomTabs', {
              screen: 'Profile',
            })
          }
        />
        {/* <DrawerButton
          label="Promo Code"
          icon={
            <MaterialIcon
              name="confirmation-number"
              size={moderateScale(20)}
              color="#000"
            />
          }
          onPress={() => navigation.navigate('Offers')}
        /> */}
        <DrawerButton
          label="Settings"
          icon={<Icon name="cog" size={moderateScale(20)} color="#000" />}
          onPress={() => navigation.navigate('Settings')}
        />

        {/* Divider */}
        <View style={styles.divider} />

        {/* <DrawerButton
          label="Payment Method"
          icon={
            <Feather name="credit-card" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('Wallet')}
        /> */}
        <DrawerButton
          label="My Garage"
          icon={
            <Icon name="calendar-check" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('MyGarage')}
        />
        <DrawerButton
          label="Car Detail"
          icon={
            <MaterialIcon name="star" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('CarDetail')}
        />
        <DrawerButton
          label="Car Listing"
          icon={
            <MaterialIcon name="star" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('CarListing')}
        />
        <DrawerButton
          label="Car Comparison"
          icon={
            <MaterialIcon name="star" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('CarComparison')}
        />
        <DrawerButton
          label="Financing"
          icon={
            <MaterialIcon name="star" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('Financing')}
        />
        <DrawerButton
          label="Sell Your Car"
          icon={
            <MaterialIcon name="star" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('SellYourCar')}
        />
        <DrawerButton
          label="Sell Your Car 2"
          icon={
            <MaterialIcon name="star" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('SellYourCar2')}
        />
        <DrawerButton
          label="Car Dealers"
          icon={
            <MaterialIcon name="star" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('FindADealer')}
        />
        <DrawerButton
          label="Trade In Today"
          icon={
            <MaterialIcon name="star" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('TradeInToday')}
        />
        <DrawerButton
          label="Car Valuation"
          icon={
            <MaterialIcon name="star" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('CarValuation')}
        />
        <DrawerButton
          label="Trade-In Process"
          icon={
            <MaterialIcon name="star" size={moderateScale(20)} color="#000" />
          }
          onPress={() => navigation.navigate('TradeInProcess')}
        />
        
        

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.logoutButton}>
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
    padding: moderateScale(16),
  },
  backButton: {
    width: BACK_CIRCLE,
    height: BACK_CIRCLE,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: BACK_CIRCLE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  profileImage: {
    width: PROFILE_CIRCLE,
    height: PROFILE_CIRCLE,
    borderRadius: PROFILE_CIRCLE / 2,
    marginRight: scale(10),
  },
  userName: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  userSub: {
    fontSize: moderateScale(10),
    fontFamily: 'Poppins-Regular',
    color: colors.hind,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  menuLabel: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Medium',
    marginLeft: scale(12),
    color: '#000',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: colors.hind,
    marginTop: verticalScale(5),
    marginBottom: verticalScale(20),
  },
  buttonContainer: {
    marginTop: '10@vs',
  },
  logoutButton: {
    width: '80%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    padding: '15@ms',
    borderRadius: '15@s',
    marginLeft: '15@s',
  },
  logoutText: {
    fontSize: '16@ms',
    fontFamily: 'Poppins-Medium',
    color: colors.white,
  },
});
