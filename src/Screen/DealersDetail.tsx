import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Header} from '../Components/Header/Header';
import {colors} from '../constant/colors';
import {useNavigation} from '@react-navigation/native';
import {Primaryfonts, Secondaryfonts} from '../constant/fonts';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const DealersDetail = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const cars = [
    {id: 1, title: 'BMW 430d', subtitle: 'Coupe M Sport', price: '$ 20,000', image: require('../assets/Images/FinanceCar.png')},
    {id: 2, title: 'BMW 430d', subtitle: 'Coupe M Sport', price: '$ 20,000', image: require('../assets/Images/FinanceCar.png')},
    {id: 3, title: 'BMW 430d', subtitle: 'Coupe M Sport', price: '$ 20,000', image: require('../assets/Images/FinanceCar.png')},
  ];

  const renderCarCard = ({item}: {item: any}) => (
    <View style={styles.card}>
      {/* Car Image Placeholder */}
      <Image source={item.image} style={styles.carImage} />
    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.carTitle}>{item.title}</Text>
      <Text style={styles.carSubtitle}>{item.subtitle}</Text>
      </View>
    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.price}>{item.price}</Text>

      <View style={styles.starsRow}>
        {Array.from({length: 5}).map((_, idx) => (
          <Ionicons
            key={idx}
            name="star"
            size={moderateScale(14)}
            color="#FFD700"
          />
        ))}
      </View>
      </View>

      <TouchableOpacity style={styles.dealButton}>
        <Text style={styles.dealButtonText}>View Deal</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <Header
        showBack={true}
        showDrawer={true}
        backgroundColor={colors.backgroundColor}
        onBackPress={() => navigation.goBack()}
        iconColor={colors.black}
        titleColor={colors.black}
      />

      {/* Logo Placeholder */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/Images/DealerLogo.png')}
          style={styles.logoPlaceholder}
        />
      </View>

      {/* Dealer Info */}
      <Text style={styles.dealerName}>Polstar Short Hills</Text>
      <View style={styles.addressRow}>
        <Ionicons
          name="location-outline"
          size={moderateScale(16)}
          color="#000"
        />
        <Text style={styles.addressText}>
          1200 Morris Turnpike Suite B145, Millburn, NJ 07078
        </Text>
      </View>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <Text style={styles.ratingValue}>4.4</Text>
        <Ionicons name="star" size={moderateScale(16)} color="#FFD700" />
        <Ionicons name="star" size={moderateScale(16)} color="#FFD700" />
        <Ionicons name="star" size={moderateScale(16)} color="#FFD700" />
        <Ionicons name="star" size={moderateScale(16)} color="#FFD700" />
        <Ionicons name="star-half" size={moderateScale(16)} color="#FFD700" />
        <Text style={styles.reviewText}>(235 review)</Text>
      </View>

      {/* Support Info */}
      <Text style={styles.supportText}>
        <Text style={{fontWeight: '600'}}>Support</Text> (973) 474-9899
      </Text>

      {/* Inventory Section */}
      <Text style={styles.sectionTitle}>Inventory</Text>

      <FlatList
        data={cars}
        renderItem={renderCarCard}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardScroll}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: moderateScale(16),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  logoPlaceholder: {
    width: moderateScale(80),
    height: verticalScale(50),
    borderRadius: moderateScale(8),
    resizeMode: 'contain',
  },
  dealerName: {
    fontSize: moderateScale(20),
    fontFamily: Primaryfonts.semibold,
    textAlign: 'center',
    marginTop: verticalScale(8),
    color: colors.black
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(4),
    paddingHorizontal: scale(20),
  },
  addressText: {
    fontSize: moderateScale(12),
    color: colors.black,
    marginLeft: scale(4),
    textAlign: 'center',
    fontFamily: Secondaryfonts.medium,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(6),
  },
  ratingValue: {
    fontSize: moderateScale(14),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginRight: scale(4),
  },
  reviewText: {
    fontSize: moderateScale(12),
     fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginLeft: scale(4),
  },
  supportText: {
    textAlign: 'center',
    fontSize: moderateScale(13),
    marginTop: verticalScale(6),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  sectionTitle: {
    fontSize: moderateScale(19),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginTop: verticalScale(15),
    marginBottom: verticalScale(18),
  },
  cardScroll: {
    paddingRight: scale(10),
  },
  card: {
    width: moderateScale(190),
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: moderateScale(8),
    padding: moderateScale(8),
    marginRight: scale(12),
    maxHeight: '45%',
  },
  carImage: {
    width: '100%',
    height: verticalScale(90),
    resizeMode: 'contain',
    borderRadius: moderateScale(6),
    marginBottom: verticalScale(8),
  },
  carTitle: {
    fontSize: moderateScale(13),
     fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  carSubtitle: {
    fontSize: moderateScale(11),
     fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginBottom: verticalScale(6),
  },
  price: {
    fontSize: moderateScale(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.blue,
    marginBottom: verticalScale(6),
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(6),
  },
  dealButton: {
    backgroundColor: colors.blue,
    borderRadius: moderateScale(6),
    paddingVertical: verticalScale(6),
    alignItems: 'center',
  },
  dealButtonText: {
    fontSize: moderateScale(12),
    color: colors.white,
    fontFamily: Secondaryfonts.medium,
  },
});

export default DealersDetail;
