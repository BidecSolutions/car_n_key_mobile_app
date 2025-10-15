import React, {useState, version} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScaledSheet, ms, s, verticalScale, vs} from 'react-native-size-matters';
import {Header} from '../Components/Header/Header';
import {colors} from '../constant/colors';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Primaryfonts, Secondaryfonts} from '../constant/fonts';
import {ScrollView} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';
import {DrawerParamList} from '../types';
import LicensePlate from '../Components/modals/LicensePlate';

interface Props {
  valuationCar: boolean;
}

const cars = [
  {
    id: '1',
    title: 'BMW 430d',
    subtitle: 'Coupe M Sport',
    price: '$ 20,000',
    rating: 5,
    image: require('../assets/Images/GarageCar.png'), // replace with your image
  },
  {
    id: '2',
    title: 'BMW 430d',
    subtitle: 'Coupe M Sport',
    price: '$ 20,000',
    rating: 5,
    image: require('../assets/Images/GarageCar.png'),
  },
  {
    id: '3',
    title: 'BMW 430d',
    subtitle: 'Coupe M Sport',
    price: '$ 20,000',
    rating: 5,
    image: require('../assets/Images/GarageCar.png'),
  },
];

const MyGarage: React.FC<Props> = ({valuationCar}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [licensePlateModal, setLicensePlateModal] = useState(false);

  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const renderItem = ({item}: {item: (typeof cars)[0]}) => (
    <View style={styles.carCard}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardContent}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.carTitle}>{item.title}</Text>
          <Text style={styles.carSubtitle}>{item.subtitle}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.rating}>
            {[...Array(item.rating)].map((_, i) => (
              <Icon
                key={i}
                name="star"
                size={ms(14)}
                color="#FACC15"
                style={{marginRight: ms(2)}}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.dealButton}>
          <Text style={styles.dealButtonText}>View Deal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingBottom: verticalScale(20)}}
        showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
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
        <Text style={styles.title}>My Garage</Text>

        {/* Wrapper so card & image overlap */}

        <View style={styles.dealerReviewingSection}>
          {/* Dropdown Header */}
          <TouchableOpacity
            style={styles.dropdownWrapper}
            onPress={() => setIsExpanded(!isExpanded)}
            activeOpacity={0.7}>
            <Text style={styles.dropdownText}>
              2020 Mercedes-Benz S-Class S 560
            </Text>
            <Icon
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={22}
              color={colors.black}
            />
          </TouchableOpacity>

          {/* Expandable Card Content */}
          {isExpanded && (
            <View style={styles.valuatedCard}>
              {/* Car Image */}
              <View style={styles.imageBox}>
                <Image
                  source={require('../assets/Images/ValuationCar.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>

              {/* VIN */}
              <View style={styles.infoRow}>
                <Text style={styles.label}>VIN</Text>
                <Text style={styles.value}>DFKSJDFHS12341526</Text>
              </View>

              {/* Carnkey Market Value */}
              <View style={styles.infoRow}>
                <Text style={styles.label}>Carnkey Market Value</Text>
                <Text style={styles.value}>$47,885 - $53,472</Text>
              </View>

              {/* Instant Offer */}
              <View style={styles.infoRow}>
                <Text style={styles.label}>Get Instant Offer</Text>
                <Text style={styles.reviewing}>Dealer Reviewing</Text>
              </View>

              {/* Button */}
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => navigation.navigate('Valuation')}>
                <Text style={styles.detailButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.cardWrapper}>
          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Add your car. Track its value.</Text>
            <Text style={styles.cardSubtitle}>
              Add your car to Your Garage to track its market value and cash in
              when the time is right to sell.
            </Text>

            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setLicensePlateModal(true)}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            <LicensePlate
              isVisible={licensePlateModal}
              onClose={() => setLicensePlateModal(false)}
              onAction={(tab, values) => {
                console.log('Pressed:', tab, values);

                if (tab === 'LICENSE') {
                  // Do license plate lookup API
                } else if (tab === 'VIN') {
                  // Do VIN lookup
                } else {
                  // Do make/model/year/style lookup
                }
              }}
            />

            {/* Sign In Text */}
            <Text style={styles.signInText}>
              Already have an account?{' '}
              <Text style={styles.signInLink}>Sign in.</Text>
            </Text>
          </View>

          {/* Full-width Car Image */}
          <Image
            source={require('../assets/Images/GarageCar.png')}
            style={styles.fullImage}
          />
        </View>
        <View style={styles.unlockSection}>
          {/* Title */}
          <Text style={styles.unlockTitle}>Unlock Your Car’s Potential</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Add your car to track its value, get maintenance tips, and explore
            similar cars.
          </Text>

          {/* Features */}
          <View style={styles.featureCard}>
            <Icon
              name="trending-up"
              size={ms(20)}
              color={colors.blue}
              style={styles.icon}
            />
            <Text style={styles.featureText}>
              Track your car’s market value in real-time.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Icon
              name="car-outline"
              size={ms(20)}
              color={colors.blue}
              style={styles.icon}
            />
            <Text style={styles.featureText}>
              Discover similar cars in our inventory
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Icon
              name="notifications-outline"
              size={ms(20)}
              color={colors.blue}
              style={styles.icon}
            />
            <Text style={styles.featureText}>
              Receive personalized maintenance reminders.
            </Text>
          </View>
        </View>
        <View style={styles.inventorySection}>
          {/* Header */}
          <Text style={styles.inventoryHeading}>
            Discover CarnKey’s Inventory
          </Text>
          <Text style={styles.inventorySubheading}>
            Browse our wide selection of cars and{'\n'}find your perfect match.
          </Text>

          {/* Horizontal Cards */}
          <FlatList
            data={cars}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: s(10)}}
          />

          {/* More Button */}
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>22 Results More</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  dealerReviewingSection: {
    padding: '18@ms',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '12@ms',
    marginHorizontal: '16@ms',
    marginBottom: '15@s',
  },
  dropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '40@s',
  },
  dropdown: {
    borderWidth: 0,
    paddingHorizontal: '0@s',
  },
  dropdownText: {
    fontSize: '16@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  dropdownItem: {
    fontSize: '14@ms',
    color: '#000',
  },
  valuatedCard: {
    borderRadius: '12@ms',
    padding: '12@ms',
    marginTop: '14@vs',
  },
  imageBox: {
    alignItems: 'center',
    marginVertical: '12@vs',
    backgroundColor: colors.white,
    borderRadius: '12@s',
  },
  image: {
    width: '100%',
    height: '150@vs',
    borderRadius: '12@ms',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: '30@ms',
    paddingVertical: '10@vs',
    paddingHorizontal: '16@s',
    marginBottom: '10@vs',
  },
  label: {
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  value: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  reviewing: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  detailButton: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: '30@ms',
    paddingVertical: '7@vs',
    alignItems: 'center',
    marginTop: '10@vs',
    width: '50%',
    alignSelf: 'center',
  },
  detailButtonText: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  title: {
    fontSize: '25@ms',
    fontFamily: Primaryfonts.semibold,
    textAlign: 'center',
    color: colors.black,
    marginBottom: '20@vs',
    padding: '16@ms',
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    marginTop: '10@vs',
  },

  card: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderTopLeftRadius: '16@ms',
    borderTopRightRadius: '16@ms',
    borderBottomWidth: 0,
    padding: '16@ms',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    height: '280@vs',
  },

  fullImage: {
    position: 'absolute',
    top: '170@vs',
    left: 0,
    width: '100%',
    height: '220@vs',
    resizeMode: 'cover',
  },

  cardTitle: {
    fontSize: '17@ms',
    color: colors.black,
    textAlign: 'center',
    marginBottom: '8@vs',
    fontFamily: Secondaryfonts.semibold,
  },
  cardSubtitle: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
    textAlign: 'center',
    lineHeight: '20@vs',
    marginBottom: '16@vs',
  },
  button: {
    backgroundColor: colors.blue,
    paddingVertical: '7@vs',
    paddingHorizontal: '40@s',
    borderRadius: '20@ms',
    marginBottom: '12@vs',
  },
  buttonText: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.white,
  },
  signInText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
    marginBottom: '16@vs',
  },
  signInLink: {
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  unlockSection: {
    width: '100%',
    paddingHorizontal: '20@ms',
    marginTop: '120@vs',
  },
  unlockTitle: {
    fontSize: '20@ms',
    fontFamily: Secondaryfonts.semibold,
    textAlign: 'center',
    color: colors.black,
    marginBottom: '10@vs',
  },
  subtitle: {
    fontSize: '14@ms',
    color: colors.black,
    textAlign: 'center',
    lineHeight: '20@vs',
    marginBottom: '20@vs',
    paddingHorizontal: '10@ms',
    fontFamily: Secondaryfonts.medium,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '30@ms',
    paddingVertical: '10@vs',
    paddingHorizontal: '16@ms',
    marginBottom: '12@vs',
  },
  icon: {
    marginRight: '12@ms',
  },
  featureText: {
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  inventorySection: {
    marginTop: ms(20),
    alignItems: 'center',
  },
  inventoryHeading: {
    fontSize: ms(20),
    fontFamily: Secondaryfonts.semibold,
    textAlign: 'center',
    color: colors.black,
    marginBottom: vs(15),
  },
  inventorySubheading: {
    fontSize: ms(15),
    color: colors.hind,
    fontFamily: Secondaryfonts.medium,
    textAlign: 'center',
    marginBottom: vs(20),
    lineHeight: vs(20),
  },
  carCard: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(12),
    marginRight: s(12),
    width: ms(180),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: vs(100),
    resizeMode: 'cover',
  },
  cardContent: {
    padding: ms(10),
  },
  carTitle: {
    fontSize: ms(14),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  carSubtitle: {
    fontSize: ms(12),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginBottom: vs(6),
  },
  price: {
    fontSize: ms(15),
    fontFamily: Secondaryfonts.semibold,
    color: colors.blue,
    marginBottom: vs(6),
  },
  rating: {
    flexDirection: 'row',
    marginBottom: vs(8),
  },
  dealButton: {
    borderWidth: 1,
    borderColor: colors.blue,
    paddingVertical: vs(5),
    borderRadius: ms(20),
    alignItems: 'center',
  },
  dealButtonText: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.semibold,
    color: colors.blue,
  },
  moreButton: {
    backgroundColor: colors.blue,
    paddingVertical: vs(9),
    paddingHorizontal: s(40),
    borderRadius: ms(20),
    marginTop: vs(20),
  },
  moreButtonText: {
    color: colors.white,
    fontSize: ms(14),
    fontFamily: Secondaryfonts.semibold,
  },
});

export default MyGarage;
