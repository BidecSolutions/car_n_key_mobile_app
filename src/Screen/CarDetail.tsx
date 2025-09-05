import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from 'react-native';
import {
  ScaledSheet,
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../constant/colors';
import {fonts} from '../constant/fonts';
import {Review, Salesperson, VehicleInfoItem} from '../types';
import CustomizePayment from '../Components/modals/CustomizePayment';
import ContactDealer from '../Components/modals/ContactDealer';

const {width} = Dimensions.get('window');

const images = [
  require('../assets/Images/DetailCar.png'),
  require('../assets/Images/DetailCar.png'),
  require('../assets/Images/DetailCar.png'),
];

const vehicleInfo: VehicleInfoItem[] = [
  {id: '1', icon: 'speedometer-outline', label: 'Miles', value: '799'},
  {id: '2', icon: 'leaf-outline', label: 'MPG', value: '53.3'},
  {id: '3', icon: 'car-outline', label: 'Body', value: 'Audi'},
  {id: '4', icon: 'flame-outline', label: 'Fuel', value: 'Gasoline'},
  {id: '5', icon: 'settings-outline', label: 'Drivetrain', value: 'Four-wheel'},
  {
    id: '6',
    icon: 'git-compare-outline',
    label: 'Transmission',
    value: 'Automatic',
  },
  {id: '7', icon: 'color-palette-outline', label: 'Exterior', value: 'Red'},
  {id: '8', icon: 'color-fill-outline', label: 'Interior', value: 'Black'},
];

const carFeatures = [
  'Quattro All-Wheel Drive',
  'Matrix LED Headlights',
  'Executive Rear Seating Package',
  'Virtual Cockpit Plus with Dual Touchscreens',
  'Bang & Olufsen 3D Premium Sound System',
  'Air Suspension with Adaptive Damping',
];
const vehicleXray = [
  {id: '1', label: '1. Accident or Damage:', value: 'Not Reported'},
  {id: '2', label: '2. 1 Owner Vehicle:', value: 'Yes'},
  {id: '3', label: '3. Personal Use Only:', value: 'Yes'},
];
const priceHistory = [
  {id: '1', date: '5/8/25', value1: 'Listed', value2: '$31,000'},
  {id: '2', date: '5/8/25', value1: '-$500', value2: '$32,000'},
  {id: '3', date: '5/8/25', value1: '-$800', value2: '$35,000'},
];

const salespeople: Salesperson[] = [
  {
    id: 1,
    name: 'Anthony Delatorre',
    role: 'Sales',
    rating: 4.4,
    reviews: 235,
    image: require('../assets/Images/dealerImage.png'),
  },
  {
    id: 2,
    name: 'Anthony Delatorre',
    role: 'Sales',
    rating: 4.4,
    reviews: 235,
    image: require('../assets/Images/dealerImage.png'),
  },
  {
    id: 3,
    name: 'Anthony Delatorre',
    role: 'Sales',
    rating: 4.4,
    reviews: 235,
    image: require('../assets/Images/dealerImage.png'),
  },
];

const reviews: Review[] = [
  {
    id: 1,
    author: 'By Eddie',
    text: "As a daily driver this car can’t be beat. Fun acceleration from the start or during mid range driving. Really comfortable and beautiful inside. Exterior is also",
    rating: 5,
  },
  {
    id: 2,
    author: 'By John',
    text: 'Amazing car with top notch performance. Smooth handling and a luxury feel inside.',
    rating: 5,
  },
  {
    id: 3,
    author: 'By Alex',
    text: 'Great comfort and design. Acceleration is impressive for city and highway driving.',
    rating: 5,
  },
];


const CarDetail = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showVehicleInfo, setShowVehicleInfo] = useState(false);
  const [showCarFeatures, setShowCarFeatures] = useState(false);
  const [showVehicleXray, setShowVehicleXray] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCustomizePayment, setShowCustomizePayment] = useState(false);
  const [showContactDealer, setShowContactDealer] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: moderateScale(40)}}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style= {styles.headerIcons}>
          <Icon name="chevron-back" size={moderateScale(22)} color="#fff" style= {{marginTop: verticalScale(4), marginLeft: scale(2)}} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Car Detail</Text>
        <TouchableOpacity style= {styles.headerIcons}>
          <Icon name="heart-outline" size={moderateScale(20)} color="#fff" style= {{marginTop: verticalScale(4), marginLeft: scale(4)}}/>
        </TouchableOpacity>
      </View>

      {/* Car Images */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {images.map((img, index) => (
          <Image key={index} source={img} style={styles.carImage} />
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={styles.dots}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.dotActive]}
          />
        ))}
      </View>

      {/* Car Info */}
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.carName}>Audi A8</Text>
          <Text style={styles.carSub}>55 TFSI quattro L</Text>
        </View>
        <View>
          <Text style={styles.price}>$92,000</Text>
          <Text style={styles.priceDrop}>$500 price drop</Text>
        </View>
      </View>

      {/* VIN */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.vin}>Vin:</Text>
        <Text style={styles.vinValue}>WAUZZZF47JN012345</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.contactBtn}
         onPress={() => setShowContactDealer(true)}
          >
          <Text style={styles.contactText}>Contact Dealer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.customizeBtn}
        onPress={() => setShowCustomizePayment(true)}
        >
          <Text style={styles.customizeText}>Customize Payment</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionHeaderTitle}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setShowVehicleInfo(!showVehicleInfo)}>
          <Text style={styles.sectionTitle}>Vehicle info</Text>
          <Icon
            name={showVehicleInfo ? 'chevron-up' : 'chevron-down'}
            size={moderateScale(18)}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {showVehicleInfo && (
        <View style={styles.sectionBody}>
          {/* Info Grid */}
          <View style={styles.grid}>
            {vehicleInfo.map(item => (
              <View key={item.id} style={styles.gridItem}>
                <Icon
                  name={item.icon}
                  size={moderateScale(18)}
                  color={colors.blue}
                />
                <Text style={styles.gridLabel}>{item.label}</Text>
                <Text style={styles.gridValue}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* Engine Info */}
          <View style={styles.engineBox}>
            <Icon name="cog-outline" size={moderateScale(18)} color="#6c63ff" />
            <View style={{marginLeft: moderateScale(8)}}>
              <Text style={styles.gridLabel}>Engine</Text>
              <Text style={styles.gridValue}>
                3.0L Turbo V6 Mild-Hybrid, 335hp / 369 lb-ft
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Car Features Section */}
      <View style={styles.sectionHeaderTitle}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setShowCarFeatures(!showCarFeatures)}>
          <Text style={styles.sectionTitle}>Car Features</Text>
          <Icon
            name={showCarFeatures ? 'chevron-up' : 'chevron-down'}
            size={moderateScale(18)}
            color="#000"
          />
        </TouchableOpacity>

        {showCarFeatures && (
          <View style={styles.sectionBody}>
            {carFeatures.map((feature, idx) => (
              <View key={idx} style={styles.featureItem}>
                <Text style={styles.bullet}>{'\u2022'}</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <View style={styles.sectionHeaderTitle}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setShowVehicleXray(!showVehicleXray)}>
          <Text style={styles.sectionTitle}>Vehicle History X-Ray</Text>
          <Icon
            name={showVehicleXray ? 'chevron-up' : 'chevron-down'}
            size={moderateScale(18)}
            color="#000"
          />
        </TouchableOpacity>

        {showVehicleXray && (
          <View style={styles.sectionBody}>
            {vehicleXray.map((item, idx) => (
              <View key={item.id} style={styles.row}>
                <Text style={styles.featureText}>{item.label}</Text>
                <Text style={styles.valueText}>{item.value}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Deal Gauge</Text>
        <Text style={styles.cardSub}>
          We compared this car with similar 2023 BMW M550s based on price,
          mileage, features, condition, and{' '}
          <Text style={styles.link}>several other factors.</Text>
        </Text>

        {/* Price Range Bars */}
        <View style={styles.rangeRow}>
          <Text style={styles.rangeLabel}>$22,6K</Text>
          <View style={styles.rangeBar} />
        </View>
        <View style={styles.rangeRow}>
          <Text style={styles.rangeLabel}>$28,6K</Text>
          <View style={styles.rangeBar} />
        </View>

        {/* Current Price Indicator */}
        <View style={styles.rangeRow}>
          <Text style={styles.rangeLabel}>$20,0K</Text>
          <View style={styles.currentBar}>
            <Icon name="car-sport" size={moderateScale(16)} color="#000" />
          </View>
        </View>

        {/* Deal Price */}
        <Text style={styles.carPrice}>$20,0000</Text>
        <Text style={styles.greatDeal}>
          This is a <Text style={styles.bold}>Great deal.</Text>{' '}
          <Text style={styles.link}>why?</Text>
        </Text>
      </View>
      <View style={styles.sectionHeaderTitle}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setShowPriceHistory(!showPriceHistory)}>
          <Text style={styles.sectionTitle}>Price History</Text>
          <Icon
            name={showPriceHistory ? 'chevron-up' : 'chevron-down'}
            size={moderateScale(18)}
            color="#000"
          />
        </TouchableOpacity>

        {showPriceHistory && (
          <View style={styles.sectionBody}>
            {priceHistory.map(item => (
              <View key={item.id} style={styles.priceHistoryRow}>
                <Text style={[styles.featureText, styles.col]}>
                  {item.date}
                </Text>
                <Text style={[styles.valueText, styles.valueCol]}>
                  {item.value1}
                </Text>
                <Text style={[styles.valueText, styles.valueCol]}>
                  {item.value2}
                </Text>
              </View>
            ))}
            <Text style= {styles.listingText}>Listed 35 days ago. $966 total price reduction!</Text>
          </View>
        )}
      </View>
      <View style={styles.dealerProfileSection}>
      {/* Title */}
      <Text style={styles.dealerTitle}>Dealer Info</Text>

      {/* Profile Image */}
      <Image
        source={require('../assets/Images/dealerImage.png')} 
        style={styles.profileImage}
      />

      {/* Dealer Name */}
      <Text style={styles.dealerName}>Jordan Motorcars</Text>

      {/* Phone */}
      <View style = {{alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
      <View style={styles.dealerRow}>
        <Icon name="call-outline" size={moderateScale(18)} color="#5E4AE3" />
        <Text style={styles.dealerRowText}>(888) 422-5279</Text>
      </View>

      {/* Timing */}
      <View style={styles.dealerRow}>
        <Icon name="time-outline" size={moderateScale(18)} color="#5E4AE3" />
        <Text style={styles.dealerRowText}>10:00 am - 7:00 pm</Text>
      </View>
      </View>

      {/* Address */}
      <View style={styles.dealerRow}>
        <Icon name="home-outline" size={moderateScale(18)} color="#5E4AE3" />
        <Text style={styles.dealerRowText}>
          24 East 12300 South Draper, UT 84042
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.directionButton}>
        <Text style={styles.directionButtonText}>Get Direction</Text>
      </TouchableOpacity>
    </View>

     <View style={styles.salesPersonSection}>
      <Text style={styles.heading}>Select a Salesperson</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {salespeople.map((item) => {
          const isSelected = selected === item.id;
          return (
            <View key={item.id} style={styles.salesPersonCard}>
              {/* Checkbox */}
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setSelected(isSelected ? null : item.id)}>
                <Icon
                  name={isSelected ? 'checkbox' : 'square-outline'}
                  size={moderateScale(20)}
                  color={isSelected ? '#3228A6' : '#999'}
                />
              </TouchableOpacity>

              {/* Profile Image */}
              <Image source={item.image} style={styles.image} />

              {/* Name */}
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>

              {/* Rating */}
              <View style={styles.ratingRow}>
                <Text style={styles.rating}>{item.rating}</Text>
                <Icon
                  name="star"
                  size={moderateScale(14)}
                  color="#FFD700"
                  style={styles.starIcon}
                />
                <Icon
                  name="star"
                  size={moderateScale(14)}
                  color="#FFD700"
                  style={styles.starIcon}
                />
                <Icon
                  name="star"
                  size={moderateScale(14)}
                  color="#FFD700"
                  style={styles.starIcon}
                />
                <Icon
                  name="star-half"
                  size={moderateScale(14)}
                  color="#FFD700"
                  style={styles.starIcon}
                />
                <Text style={styles.review}>({item.reviews} review)</Text>
              </View>

              {/* Show Reviews */}
              <TouchableOpacity style={styles.reviewRow}>
                <Text style={styles.showReviews}>Show reviews</Text>
                <Icon
                  name="chevron-down"
                  size={moderateScale(14)}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
     <View style={styles.reviewsSection}>
      {/* Rating summary */}
      <View style={styles.reviewsRatingRow}>
        <Icon
          name="star"
          size={moderateScale(18)}
          color="#3228A6"
          style={{ marginRight: 5 }}
        />
        <Text style={styles.ratingNumber}>4.96</Text>
        <Text style={styles.reviewCount}> Based on 235 reviews</Text>
      </View>

      {/* Horizontal scrollable reviews */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reviewsScrollContainer}>
        {reviews.map((item) => (
          <View key={item.id} style={styles.reviewsCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.author}>{item.author}</Text>
              <View style={styles.starRow}>
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Icon
                    key={index}
                    name="star"
                    size={moderateScale(14)}
                    color="#3228A6"
                  />
                ))}
              </View>
            </View>
            <Text style={styles.reviewText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* View all reviews button */}
      <TouchableOpacity style={styles.outlineButton}>
        <Text style={styles.outlineButtonText}>View all Reviews</Text>
      </TouchableOpacity>

      {/* Bottom buttons */}
      <TouchableOpacity style={styles.outlineButtonWide}>
        <Text style={styles.outlineButtonText}>Customize Payment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.solidButton}>
        <Text style={styles.solidButtonText}>Contact Dealer</Text>
      </TouchableOpacity>
    </View>
    
      {/* Customize payment Modal */}
      <CustomizePayment
        isVisible={showCustomizePayment}
        onClose={() => setShowCustomizePayment(false)}
      />

      <ContactDealer
        isVisible={showContactDealer}
        onClose={() => setShowContactDealer(false)}
      />

    </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10@vs',
  },
  headerIcons: {
    backgroundColor: colors.hind,
    borderRadius: '15@ms',
    width: '30@ms',
    height: '30@ms',
  },
  headerTitle: {
    fontSize: '19@ms',
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  carImage: {
    width: width - moderateScale(38), // match ScrollView container width
    height: '200@vs',
    borderRadius: '12@ms',
    marginRight: '8@s',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '8@vs',
  },
  dot: {
    width: '8@ms',
    height: '8@ms',
    borderRadius: '4@ms',
    backgroundColor: colors.hind,
    marginHorizontal: '3@s',
  },
  dotActive: {
    backgroundColor: colors.black,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '12@vs',
    paddingHorizontal: '2@s',
  },
  carName: {
    fontSize: '18@ms',
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  carSub: {
    fontSize: '15@ms',
    fontFamily: fonts.regular,
    color: colors.black,
    marginTop: '2@vs',
  },
  price: {
    fontSize: '17@ms',
    fontFamily: fonts.medium,
    color: colors.blue,
    textAlign: 'right',
  },
  priceDrop: {
    fontSize: '14@ms',
    fontFamily: fonts.regular,
    color: colors.black,
    textAlign: 'right',
  },
  vin: {
    marginTop: '10@vs',
    fontSize: '15@ms',
    fontFamily: fonts.regular,
    color: colors.black,
  },
  vinValue: {
    marginTop: '10@ms',
    fontSize: '14@ms',
    fontFamily: fonts.medium,
    color: colors.black,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20@vs',
  },
  contactBtn: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingVertical: '11@vs',
    borderRadius: '25@ms',
    alignItems: 'center',
    marginRight: '6@s',
  },
  contactText: {
    color: colors.white,
    fontSize: '14@ms',
    fontFamily: fonts.semibold,
  },
  customizeBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.blue,
    paddingVertical: '12@vs',
    borderRadius: '25@s',
    alignItems: 'center',
    marginLeft: '6@s',
  },
  customizeText: {
    color: colors.blue,
    fontSize: '14@ms',
    fontFamily: fonts.medium,
  },
  section: {
    marginBottom: '12@vs',
    borderRadius: '8@ms',
    backgroundColor: '#f1f1f1',
    overflow: 'hidden',
    marginTop: '20@vs',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '7@ms',
    backgroundColor: '#f1f1f1',
    borderRadius: '12@s',
  },
  sectionHeaderTitle: {
    marginTop: '15@vs',
  },
  sectionTitle: {
    fontSize: '14@ms',
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  sectionBody: {
    backgroundColor: colors.backgroundColor,
    marginTop: '15@vs',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '6@s',
  },
  gridItem: {
    width: '22%',
    padding: '10@ms',
    borderRadius: '8@ms',
    backgroundColor: '#f1f1f1',
    marginBottom: '10@vs',
    height: '42%',
  },
  gridLabel: {
    fontSize: '10@ms',
    fontFamily: fonts.regular,
    color: colors.black,
    marginTop: '4@vs',
  },
  gridValue: {
    fontSize: '12@ms',
    fontFamily: fonts.medium,
    color: '#000',
    marginTop: '1@vs',
  },
  engineBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: '8@ms',
    padding: '10@ms',
    marginTop: '6@vs',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: '6@vs',
  },
  bullet: {
    fontSize: '12@ms',
    color: colors.blue,
    marginRight: '6@s',
    marginVertical: '7@vs',
  },
  featureText: {
    fontSize: '13@ms',
    fontFamily: fonts.medium,
    color: colors.black,
    marginVertical: '7@vs',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: moderateScale(6),
  },
  priceHistoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: verticalScale(4),
    borderBottomWidth: 1,
    borderBottomColor: colors.hind,
  },
  col: {
    flex: 1,
    marginLeft: '10@s',
  },
  valueCol: {
    flex: 1,
    textAlign: 'center',
  },

  valueText: {
    fontSize: moderateScale(12),
    fontFamily: fonts.regular,
    color: colors.black,
  },
  listingText: {
    marginTop: '10@vs',
    fontSize: '14@ms',
    fontFamily: fonts.semibold,
    color: colors.black,
    textAlign: 'center',
  },
  card: {
    marginTop: verticalScale(14),
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: scale(8),
    padding: moderateScale(12),
    backgroundColor: '#f1f1f1',
  },
  cardTitle: {
    fontSize: moderateScale(17),
    fontFamily: fonts.bold,
    marginBottom: verticalScale(6),
    color: colors.black,
  },
  cardSub: {
    fontSize: moderateScale(13),
    color: colors.black,
    marginBottom: verticalScale(10),
    fontFamily: fonts.regular,
  },
  link: {
    fontFamily: fonts.medium,
    color: colors.blue,
    textDecorationLine: 'underline',
    fontSize: '14@ms',
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(4),
  },
  rangeLabel: {
    width: moderateScale(55),
    fontSize: moderateScale(12),
    color: '#444',
  },
  rangeBar: {
    flex: 1,
    height: verticalScale(6),
    backgroundColor: '#ccc',
    borderRadius: scale(4),
  },
  currentBar: {
    flex: 1,
    height: verticalScale(6),
    backgroundColor: '#5a3fff',
    borderRadius: scale(4),
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: scale(4),
  },
  carPrice: {
    fontSize: moderateScale(18),
    fontFamily: fonts.semibold,
    color: colors.blue,
    marginTop: verticalScale(12),
  },
  greatDeal: {
    fontSize: moderateScale(13),
    fontFamily: fonts.regular,
    color: colors.black,
    marginTop: verticalScale(4),
  },
  bold: {
    fontWeight: '700',
  },
   dealerProfileSection: {
    backgroundColor: '#f1f1f1',
    borderRadius: '10@ms',
    padding: '15@ms',
    alignItems: 'center',
    marginTop: '15@vs'
  },
  dealerTitle: {
    fontSize: '15@ms',
    color: colors.black,
    fontFamily: fonts.semibold,
    alignSelf: 'flex-start',
    marginBottom: '10@vs',
  },
  profileImage: {
    width: '70@ms',
    height: '70@ms',
    borderRadius: '35@ms',
    marginBottom: '10@vs',
  },
  dealerName: {
    fontSize: '17@ms',
    fontFamily: fonts.semibold,
    color: colors.black,
    marginBottom: '15@vs',
  },
  dealerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8@vs',
    alignSelf: 'flex-start',
  },
  dealerRowText: {
    fontSize: '14@ms',
    fontFamily: fonts.medium,
    color: colors.black,
    marginLeft: '8@s',
    flexShrink: 1,
  },
  directionButton: {
    marginTop: '15@vs',
    backgroundColor: colors.blue,
    paddingVertical: '6@vs',
    paddingHorizontal: '20@s',
    borderRadius: '20@ms',
    width: '90%',
    alignItems: 'center',
  },
  directionButtonText: {
    color: colors.white,
    fontSize: '13@ms',
    fontFamily: fonts.medium,
  },
  salesPersonSection: {
    padding: '15@ms',
    backgroundColor: colors.white,
  },
  heading: {
    fontSize: '17@ms',
    fontFamily: fonts.semibold,
    marginBottom: '10@vs',
    color: colors.black,
  },
  scrollContainer: {
    paddingRight: '10@s',
  },
  salesPersonCard: {
    width: '170@ms',
    backgroundColor: '#f1f1f1',
    borderRadius: '10@ms',
    padding: '12@ms',
    marginRight: '12@s',
    position: 'relative',
    height: '160@vs',
  },
  checkbox: {
    position: 'absolute',
    top: '8@vs',
    right: '8@s',
    zIndex: 1,
  },
  image: {
    width: '60@ms',
    height: '60@ms',
    borderRadius: '30@ms',
    alignSelf: 'center',
    marginBottom: '10@vs',
  },
  name: {
    fontSize: '15@ms',
    fontFamily: fonts.semibold,
    color: colors.black,
    textAlign: 'left',
  },
  role: {
    fontSize: '13@ms',
    color: colors.black,
    fontFamily: fonts.medium,
    textAlign: 'left',
    marginBottom: '8@vs',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: '8@vs',
  },
  rating: {
    fontSize: '13@ms',
    fontFamily: fonts.medium,
    marginRight: '4@s',
    color: colors.black,
  },
  starIcon: {
    marginHorizontal: '1@s',
  },
  review: {
    fontSize: '12@ms',
    color: colors.black,
    marginLeft: '4@s',
    fontFamily: fonts.medium,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showReviews: {
    fontSize: '13@ms',
    fontFamily: fonts.medium,
    color: colors.black,
    
  },
   reviewsSection: {
    backgroundColor: colors.white,
    padding: '15@ms',
  },
  reviewsRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '15@vs',
    justifyContent: 'center',
  },
  ratingNumber: {
    fontSize: '18@ms',
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  reviewCount: {
    fontSize: '14@ms',
    color: colors.black,
    fontFamily: fonts.medium
  },
  reviewsScrollContainer: {
    paddingRight: '10@s',
  },
  reviewsCard: {
    width: '250@ms',
    backgroundColor: '#f1f1f1',
    borderRadius: '10@ms',
    padding: '12@ms',
    marginRight: '12@s',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8@vs',
  },
  author: {
    fontSize: '13@ms',
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  starRow: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: '13@ms',
    color: colors.black,
    lineHeight: '18@vs',
    fontFamily: fonts.regular,
  },
  outlineButton: {
    marginTop: '15@vs',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: '20@ms',
    paddingVertical: '4@vs',
    paddingHorizontal: '22@s',
  },
  outlineButtonWide: {
    marginTop: '30@vs',
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: '20@ms',
    paddingVertical: '10@vs',
    alignItems: 'center',
  },
  outlineButtonText: {
    fontSize: '13@ms',
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  solidButton: {
    marginTop: '10@vs',
    backgroundColor: colors.blue,
    borderRadius: '20@ms',
    paddingVertical: '12@vs',
    alignItems: 'center',
  },
  solidButtonText: {
    fontSize: '14@ms',
    fontFamily: fonts.semibold,
    color: colors.white,
  },
});

export default CarDetail;
