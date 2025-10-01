import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  moderateScale,
  ms,
  s,
  ScaledSheet,
  verticalScale,
  vs,
} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../constant/colors';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Primaryfonts, Secondaryfonts} from '../constant/fonts';
import {Header} from '../Components/Header/Header';
import {Dealer, DrawerParamList} from '../types';

const priceHistory = [
  {id: '1', date: 'VIN', value: 'DKHSDJKHAS12312903'},
  {id: '2', date: 'Mileage', value: '85,000'},
  {id: '3', date: 'Transmission', value: 'Automatic'},
  {id: '4', date: 'Engine', value: 'V6 Petrol'},
  {id: '5', date: 'Option', value: 'Premium Package'},
  {id: '6', date: 'Exterior Color', value: 'Midnight Black'},
  {id: '7', date: 'Interior Color', value: 'Midnight Black'},
  {id: '8', date: 'Number of keys', value: '2'},
  {id: '9', date: 'Original Owner', value: 'Yes'},
  {id: '10', date: 'Accidents', value: 'No'},
  {id: '11', date: 'Clear history report', value: 'Verified'},
];

const dealers: Dealer[] = [
  {
    id: '1',
    name: 'Auto Hub',
    offerRange: '$33k - $35K',
    distance: '5mi',
    inspection: 'No',
    pickup: 'No',
  },
  {
    id: '2',
    name: 'Fast Motors',
    offerRange: '$31k - $34K',
    distance: '7mi',
    inspection: 'Yes',
    pickup: 'Yes',
  },
  {
    id: '3',
    name: 'Auto Hub',
    offerRange: '$32k - $34K',
    distance: '10mi',
    inspection: 'No',
    pickup: 'Yes',
  },
  {
    id: '4',
    name: 'Fast Motors',
    offerRange: '$30k - $33K',
    distance: '15mi',
    inspection: 'Yes',
    pickup: 'No',
  },
];

const Valuation = () => {
  const [miles, setMiles] = useState('');
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showDealersCard, setShowDealersCard] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>('1');
  const [selectedId, setSelectedId] = useState<string | null>('1');

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const data = [
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: verticalScale(150)}}>
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
      <Text style={styles.title}>
        {!showCard
          ? 'Ask For Valuation'
          : showDealersCard
          ? 'Choose the Best Offer from Our Verified Dealers'
          : "Your Car's Valuation"}
      </Text>

      {showDealersCard && (
        <Text style={styles.headerText}>
          We've received offers from trusted dealers near you. Select the one
          that works best for you.
        </Text>
      )}

      {showDealersCard && (
        <>
          {dealers.map(dealer => {
            const isExpanded = expandedId === dealer.id;
            const isSelected = selectedId === dealer.id;

            return (
              <View
                key={dealer.id}
                style={[
                  styles.dealerCardWrapper,
                  !isExpanded && styles.dealerCardCollapsed,
                ]}>
                {/* Header */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.cardHeader}
                  onPress={() => toggleExpand(dealer.id)}>
                  <Text
                    style={[
                      styles.dealersCardTitle,
                      isExpanded && {color: colors.blue}, // purple when expanded
                    ]}>
                    {dealer.name}
                  </Text>
                  <Icon
                    name={isExpanded ? 'chevron-down' : 'chevron-up'}
                    size={moderateScale(20)}
                    color={isExpanded ? colors.blue : '#333'}
                  />
                </TouchableOpacity>

                {/* Expanded Content */}
                {isExpanded && (
                  <View style={styles.detailsWrapper}>
                    <View style={styles.row}>
                      <Text style={styles.label}>Offer Range</Text>
                      <Text style={styles.value}>{dealer.offerRange}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>Distance</Text>
                      <Text style={styles.value}>{dealer.distance}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>Inspection Required</Text>
                      <Text style={styles.value}>{dealer.inspection}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>Pickup Option</Text>
                      <Text style={styles.value}>{dealer.pickup}</Text>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.selectButton,
                        isSelected && styles.selectedButton,
                      ]}
                      onPress={() => {
                        setSelectedId(dealer.id);
                        navigation.navigate('VehicleInspection', {
                          dealerId: dealer.id,
                        });
                      }}>
                      <Text style={styles.selectButtonText}>
                        {isSelected ? 'Selected' : 'Select'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </>
      )}

      {/* Car Image */}

      <View style={styles.imageWrapper}>
        <Image
          source={require('../assets/Images/ValuationCar.png')}
          style={styles.carImage}
          resizeMode="contain"
        />
      </View>

      {/* Car Details */}
      <Text style={styles.carTitle}>2020 Mercedes-Benz S-Class S 560</Text>
      <Text style={styles.carSubtitle}>
        This images is for reference only and may not match your car’s details.
      </Text>

      {/* Progress Section */}
      <Text style={styles.sectionTitle}>Complete your vehicle details</Text>

      {/* Progress Row */}
      <View style={styles.progressRow}>
        <Text style={styles.progressText}>Your Car Profile is Complete</Text>
        <Text style={styles.progressPercent}>10%</Text>
      </View>

      {/* Miles Input Row */}
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>How many miles on the odometer?</Text>
        <TextInput
          style={styles.input}
          value={miles}
          onChangeText={text => {
            const numericText = text.replace(/[^0-9]/g, '');
            if (numericText.length <= 7) {
              setMiles(numericText);
            }
          }}
          placeholder="---"
          placeholderTextColor={colors.blue}
          keyboardType="number-pad"
          maxLength={7}
        />
      </View>
      <View style={styles.sectionHeaderTitle}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setShowPriceHistory(!showPriceHistory)}>
          <Text style={styles.vehicleDetailsTitle}>Vehicle Details</Text>
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
                <Text style={styles.valueText}>{item.value}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <View style={styles.marketValueCard}>
        <Text style={styles.marketTitle}>Carnkey Market Value</Text>
        <Text style={styles.marketRange}>$47,885 - $53,472</Text>
        <Text style={styles.marketSubtitle}>Market value today</Text>
      </View>

      {/* Button */}
      {!showCard ? (
        <TouchableOpacity style={styles.valuationButton}>
          <Text style={styles.valuationButtonText}>Ask For Valuation</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.getInstantOfferCard}>
          <Text style={styles.getInstantRange}>$47,885 - $53,472</Text>
          <Text style={styles.getInstantSubtitle}>Get Instant Offer</Text>
        </View>
      )}

      {!showDealersCard && (
        <View style={styles.cardWrapper}>
          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardSubtitle}>Instant Offer</Text>
            <Text style={styles.cardTitle}>Ready to Sale</Text>
            {!showCard ? (
              <Text style={styles.valuationTitle}>Ask for Valuation</Text>
            ) : (
              <Text style={styles.valuationTitle}>$32,450 - $38,472</Text>
            )}
            <Text style={styles.cardSubtitle}>Expected Cash Offer Range.</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => console.log('Navigate to vehicle details')}>
                <Text style={styles.linkText}>
                  Complete your Vehicle details
                </Text>
              </TouchableOpacity>
              <Text style={styles.normalText}> To get exact valuation</Text>
            </View>

            {/* Button */}
            {!showCard ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowCard(true)}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowDealersCard(true)}>
                <Text style={styles.buttonText}>Get Instant Offer</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Full-width Car Image */}
          <Image
            source={require('../assets/Images/GreenCar.png')}
            style={styles.fullImage}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Valuation;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vs(15),
    padding: '16@ms',
  },
  title: {
    fontSize: '25@ms',
    fontFamily: Primaryfonts.medium,
    textAlign: 'center',
    color: '#000',
    marginBottom: '20@vs',
    padding: '16@ms',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginRight: s(12),
  },
  headerText: {
    fontSize: '13@ms',
    textAlign: 'center',
    color: colors.black,
    marginBottom: '16@vs',
    marginHorizontal: '16@s',
    fontFamily: Secondaryfonts.medium,
  },
  dealerCardWrapper: {
    borderRadius: '8@s',
    marginBottom: '10@vs',
    backgroundColor: colors.cardsBackgroundColor,
    overflow: 'hidden',
    margin: '16@ms',
    padding: '16@ms',
  },

  dealerCardCollapsed: {
    paddingVertical: '3@vs', // 👈 smaller vertical padding
    paddingHorizontal: '12@s', // 👈 lighter padding
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '2@vs',
    paddingHorizontal: '12@s',
  },
  dealersCardTitle: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
  },
  detailsWrapper: {
    padding: '12@ms',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '6@vs',
    borderBottomWidth: 0.2,
    borderBottomColor: colors.black,
  },
  label: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  value: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  selectButton: {
    marginTop: '14@vs',
    paddingVertical: '5@vs',
    borderRadius: '20@s',
    backgroundColor: colors.blue,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: colors.blue,
    paddingVertical: '5@vs',
  },
  selectButtonText: {
    color: colors.white,
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.semibold,
  },
  imageWrapper: {
    borderRadius: ms(10),
    overflow: 'hidden',
    marginBottom: vs(12),
    paddingHorizontal: '16@s',
  },
  carImage: {
    width: '100%',
    height: vs(160),
    borderRadius: ms(10),
    paddingHorizontal: '16@s',
  },
  carTitle: {
    fontSize: ms(16),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginBottom: vs(5),
    paddingHorizontal: '16@s',
  },
  carSubtitle: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginBottom: vs(20),
    paddingHorizontal: '16@s',
  },
  sectionTitle: {
    fontSize: ms(15),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginBottom: vs(15),
    textAlign: 'center',
  },
  inputRow: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(25),
    paddingVertical: vs(5),
    paddingHorizontal: s(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '16@s',
  },
  inputLabel: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginTop: '4@vs',
  },
  input: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.blue,
    paddingVertical: vs(2),
  },
  progressRow: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(25),
    paddingVertical: vs(10),
    paddingHorizontal: s(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vs(12),
    marginHorizontal: '16@s',
  },
  progressText: {
    fontSize: ms(12),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  progressPercent: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.blue,
  },
  placeholderStyle: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.blue,
  },
  selectedTextStyle: {
    fontSize: ms(13),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
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
    marginTop: '17@vs',
    marginHorizontal: '16@s',
  },
  vehicleDetailsTitle: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginHorizontal: '10@s',
  },
  sectionBody: {
    backgroundColor: colors.backgroundColor,
    marginTop: '15@vs',
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
    fontFamily: Secondaryfonts.regular,
    color: colors.black,
  },
  listingText: {
    marginTop: '10@vs',
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    textAlign: 'center',
  },
  featureText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginVertical: '7@vs',
    flex: 1,
  },
  marketValueCard: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '12@ms',
    paddingVertical: '16@vs',
    paddingHorizontal: '12@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '20@s',
    marginTop: '20@vs',
  },
  getInstantOfferCard: {
    backgroundColor: colors.blue,
    borderRadius: '12@ms',
    paddingVertical: '16@vs',
    paddingHorizontal: '12@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '20@s',
    marginTop: '20@vs',
  },
  getInstantSubtitle: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.white,
  },
  getInstantRange: {
    fontSize: '21@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.white,
    marginBottom: '6@vs',
  },
  marketTitle: {
    fontSize: '15@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
    marginBottom: '6@vs',
  },
  marketRange: {
    fontSize: '21@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginBottom: '6@vs',
  },
  marketSubtitle: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  valuationButton: {
    backgroundColor: colors.blue,
    borderRadius: '25@ms',
    paddingVertical: '10@vs',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '35@s',
    marginTop: '16@vs',
  },
  valuationButtonText: {
    fontSize: '15@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.white,
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    marginTop: '17@vs',
  },

  card: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderTopLeftRadius: '16@ms',
    borderTopRightRadius: '16@ms',
    borderBottomWidth: 0,
    padding: '16@ms',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    width: '86%',
    height: '275@vs',
  },

  fullImage: {
    position: 'absolute',
    top: '190@vs', // 👈 overlap card bottom
    left: 0,
    width: '100%', // 👈 full screen width
    height: '260@vs',
    resizeMode: 'cover',
  },

  cardTitle: {
    fontSize: '20@ms',
    color: colors.black,
    textAlign: 'center',
    marginBottom: '8@vs',
    fontFamily: Secondaryfonts.semibold,
  },
  valuationTitle: {
    fontSize: '16@ms',
    color: colors.blue,
    textAlign: 'center',
    marginBottom: '8@vs',
    fontFamily: Secondaryfonts.semibold,
  },
  cardSubtitle: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
    lineHeight: '20@vs',
    marginBottom: '6@vs',
  },
  button: {
    backgroundColor: colors.blue,
    paddingVertical: '7@vs',
    paddingHorizontal: '80@s',
    borderRadius: '20@ms',
    marginBottom: '12@vs',
    marginTop: '15@vs',
  },
  buttonText: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.white,
  },
  normalText: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  linkText: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    textDecorationLine: 'underline',
  },
});
