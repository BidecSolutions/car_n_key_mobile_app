import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constant/colors';
import { Primaryfonts } from '../../constant/fonts';

type HeaderProps = {
  onBackPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  onDrawerPress?: () => void;
  title?: string;
  showBack?: boolean;
  showLogo?: boolean;
  showTitle?: boolean;
  showNotification?: boolean;
  showProfile?: boolean;
  showDrawer?: boolean;
  backgroundColor?: string;
  iconColor?: string;
  titleColor?: string;
};

export const Header = ({
  onBackPress,
  onNotificationPress,
  onProfilePress,
  onDrawerPress,
  title = '',
  showBack = true,
  showLogo = false,
  showTitle = true,
  showNotification = true,
  showProfile = false,
  showDrawer = true,
  backgroundColor = colors.backgroundColor,
  iconColor = colors.black,
  titleColor = colors.black,
}: HeaderProps) => {
  return (
    <View style={[styles.headerContainer, { backgroundColor }]}>
      {/* Left side: Back OR Logo */}
      {showBack ? (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Icon name="chevron-left" size={moderateScale(28)} color={iconColor} />
        </TouchableOpacity>
      ) : showLogo ? (
        <Image
          source={require('../../assets/Images/CarnKeyLogo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.backButton} />
      )}

      {/* Title */}
      {showTitle && <Text style={[styles.title, { color: titleColor }]}>{title}</Text>}

      {/* Right side: Drawer + Notification/Profile */}
      <View style={styles.rightContainer}>
        {showDrawer && (
          <TouchableOpacity style={styles.iconButton} onPress={onDrawerPress}>
            <Icon name="menu" size={moderateScale(26)} color={iconColor} />
          </TouchableOpacity>
        )}

        {showNotification ? (
          <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
            <Icon name="bell-outline" size={moderateScale(24)} color={iconColor} />
          </TouchableOpacity>
        ) : showProfile ? (
          <TouchableOpacity style={styles.iconButton} onPress={onProfilePress}>
            <Icon name="account-circle" size={moderateScale(26)} color={iconColor} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: moderateScale(40),
  },
  backText: {
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-Regular',
    color: colors.black,
  },
  title: {
    fontSize: moderateScale(19),
    fontFamily: Primaryfonts.medium,
    color: colors.black,
    flex: 1,
    marginHorizontal: scale(10),
  },
  logo: {
    width: '110@ms',
    height: '40@vs',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: scale(12),
  },
});
