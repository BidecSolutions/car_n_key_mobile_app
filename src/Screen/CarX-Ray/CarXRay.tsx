import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  moderateScale,
  ms,
  s,
  scale,
  ScaledSheet,
  verticalScale,
  vs,
} from 'react-native-size-matters';
import {colors} from '../../constant/colors';
import {Header} from '../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Secondaryfonts} from '../../constant/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {Animated} from 'react-native';

const CarXRay = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'recent' | 'all' >(
    'recent',
  );

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleTabSwitch = (tab: 'recent' | 'all' ) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingBottom: verticalScale(40)}}
        showsVerticalScrollIndicator={false}>
        <Header
          showBack={true}
          title="Car X-Ray"
          showDrawer={true}
          onDrawerPress={() => navigation.openDrawer()}
          backgroundColor={colors.backgroundColor}
          onBackPress={() => navigation.goBack()}
          iconColor={colors.black}
          titleColor={colors.black}
        />
        <View style={styles.cardWrapper}>
          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Check Your Car's History</Text>
            <Text style={styles.cardSubtitle}>
              Enter VIN or scan instantly to uncover the full report.
            </Text>
            <TextInput
              placeholder="Enter VIN Number"
              style={styles.inputFull}
              placeholderTextColor="#666"
            />
            {/* Button */}
            <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('BuyReport')}>
              <Text style={styles.reportButtonText}>Get Report</Text>
            </TouchableOpacity>
          </View>

          {/* Full-width Car Image */}
          <Image
            source={require('../../assets/Images/GarageCar.png')}
            style={styles.fullImage}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            A Small Report Fee vs.{'\n'}Huge Repair Bills
          </Text>

          <View style={styles.cardContainer}>
            {/* With Report Card */}
            <View style={[styles.infoCard, styles.cardActive]}>
              <View style={[styles.leftBorder, styles.blueBorder]} />
              <View style={styles.cardContent}>
                <Text style={styles.cardHeading}>With Report</Text>
                <Text style={styles.cardText}>
                  One quick $29 report saved me from losing{'\n'}$3,000 to
                  hidden repair costs.
                </Text>
              </View>
            </View>

            {/* Without Report Card */}
            <View style={[styles.infoCard, styles.cardInactive]}>
              <View style={[styles.leftBorder, styles.grayBorder]} />
              <View style={styles.cardContent}>
                <Text style={styles.cardHeading}>Without Report</Text>
                <Text style={styles.cardText}>
                  Bought car, later found hidden accident,{'\n'}$3,000 repair.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bannerContainer}>
          {/* Background Image */}
          <Image
            source={require('../../assets/Images/reportImage.png')}
            style={styles.bannerBackground}
          />

          {/* Overlay Content */}
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>First Report Free Start Now!</Text>
            <Text style={styles.bannerSubtitle}>
              Check your car’s history in seconds{'\n'}with our trusted Car
              X-Ray reports.
            </Text>

            <TouchableOpacity style={styles.generateButton}>
              <Text style={styles.generateButtonText}>Generate Report</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.features}>
          <Text style={styles.trustSectionTitle}>Trust & Security</Text>
          <View style={styles.featureItem}>
            <Icon
              name="time-outline"
              size={ms(20)}
              color={colors.blue}
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>
              Your payment is 100% secure with SSL encryption
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Icon
              name="hourglass-outline"
              size={ms(20)}
              color={colors.blue}
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>
              We support Visa, Mastercard, PayPal, and others
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Icon
              name="shield-checkmark-outline"
              size={ms(20)}
              color="#4B4DED"
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>
              Your card details are never stored or shared.
            </Text>
          </View>
        </View>
        <View style={styles.vehicleContainer}>
          <Text style={styles.vehicleTitle}>My Vehicle Reports</Text>
          <Text style={styles.vehicleSubtitle}>
            All your VIN reports stored in one place — easy to access, download,
            or share anytime.
          </Text>

          {/* Tabs */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'recent' && styles.activeTabButton,
              ]}
              onPress={() => handleTabSwitch('recent')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'recent' && styles.activeTabText,
                ]}>
                Recent
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'all' && styles.activeTabButton,
              ]}
              onPress={() => handleTabSwitch('all')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'all' && styles.activeTabText,
                ]}>
                All Reports
              </Text>
            </TouchableOpacity>
          </View>

          {/* Card Content */}
          <Animated.View style={[styles.reportCard, {opacity: fadeAnim}]}>
            <Image
              source={require('../../assets/Images/reportCar.png')}
              style={styles.carImage}
              resizeMode="contain"
            />
            <Text style={styles.carTitle}>2020 Audi A8 Quattro</Text>
            <View style={styles.row}>
              <Text style={styles.label}>VIN:</Text>
              <Text style={styles.value}>WAULFAFR1AA123456</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>Jan 27, 2025</Text>
            </View>

            <View style={styles.buttonRow}>
              
                <TouchableOpacity style={styles.downloadBtn}>
                  <Text style={styles.downloadText}>Download PDF</Text>
                  <Icon name="download-outline" size={ms(16)} color="#fff" />
                </TouchableOpacity>
           
              <TouchableOpacity
                style={[
                  styles.viewBtn,
                ]}
                onPress={() => navigation.navigate('CarReport')}
                >
                <Text style={styles.viewText}>View Report</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CarXRay;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    marginTop: '30@vs',
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
    height: '260@vs',
  },

  fullImage: {
    position: 'absolute',
    top: '210@vs',
    left: 0,
    width: '100%',
    height: '220@vs',
    resizeMode: 'cover',
  },

  cardTitle: {
    fontSize: '18@ms',
    color: colors.black,
    textAlign: 'center',
    marginBottom: '8@vs',
    fontFamily: Secondaryfonts.semibold,
    marginTop: '12@vs',
  },
  cardSubtitle: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.hind,
    textAlign: 'center',
    lineHeight: '20@vs',
    marginBottom: '16@vs',
  },
  inputFull: {
    marginBottom: '15@vs',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(8),
    paddingHorizontal: scale(70),
    paddingVertical: verticalScale(8),
    fontSize: ms(12),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  reportButton: {
    backgroundColor: colors.blue,
    paddingVertical: '7@vs',
    paddingHorizontal: '75@s',
    borderRadius: '20@ms',
    marginBottom: '12@vs',
  },
  reportButtonText: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.medium,
    color: colors.white,
  },
  sectionContainer: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: scale(12),
    marginHorizontal: scale(15),
    marginTop: verticalScale(190),
    paddingVertical: verticalScale(18),
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: ms(15),
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginBottom: verticalScale(15),
  },
  cardContainer: {
    gap: scale(10),
  },

  infoCard: {
    backgroundColor: colors.white,
    borderRadius: scale(10),
    marginHorizontal: scale(15),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(10),
    position: 'relative', // important for absolute child positioning
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardActive: {},
  cardInactive: {},

  leftBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: moderateScale(3),
    borderTopLeftRadius: scale(10),
    borderBottomLeftRadius: scale(10),
  },

  blueBorder: {
    backgroundColor: colors.blue,
  },

  grayBorder: {
    backgroundColor: '#D1D5DB', 
  },

  cardContent: {
    flex: 1,
    marginLeft: scale(10),
  },

  cardHeading: {
    fontSize: ms(13.5),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    marginBottom: verticalScale(5),
    textAlign: 'center',
  },

  cardText: {
    fontSize: ms(12.5),
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
    lineHeight: verticalScale(17),
    textAlign: 'center',
  },

  bannerContainer: {
    borderRadius: scale(14),
    marginTop: verticalScale(25),
    marginHorizontal: scale(15),
    overflow: 'hidden',
    height: verticalScale(140),
    position: 'relative',
  },

  bannerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  bannerContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(18),
  },

  bannerTitle: {
    fontSize: ms(14),
    fontFamily: Secondaryfonts.semibold,
    color: colors.white,
    marginBottom: verticalScale(6),
  },

  bannerSubtitle: {
    fontSize: ms(10),
    color: colors.white,
    fontFamily: Secondaryfonts.medium,
    lineHeight: verticalScale(17),
    marginBottom: verticalScale(12),
  },

  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.4,
    borderColor: colors.black,
    borderRadius: scale(25),
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(14),
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
  },

  generateButtonText: {
    fontSize: ms(12.5),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  features: {
    marginTop: vs(20),
    paddingHorizontal: s(15),
  },
  trustSectionTitle: {
    fontSize: '18@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: '15@vs',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: ms(20),
    paddingVertical: vs(10),
    paddingHorizontal: s(12),
    marginBottom: vs(12),
  },
  featureIcon: {
    marginRight: s(12),
  },
  featureText: {
    fontSize: ms(12),
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
    flexShrink: 1,
  },
  vehicleContainer: {
    marginTop: verticalScale(30),
    paddingHorizontal: '16@s',
  },
  vehicleTitle: {
    fontSize: '18@ms',
    fontFamily: Secondaryfonts.semibold,
    textAlign: 'center',
    color: colors.black,
  },
  vehicleSubtitle: {
    fontSize: '12@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
    textAlign: 'center',
    marginTop: verticalScale(4),
    marginBottom: verticalScale(16),
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '10@s',
    marginBottom: verticalScale(16),
  },
  tabButton: {
    paddingVertical: '6@vs',
    paddingHorizontal: '50@s',
    borderRadius: '11@ms',
    backgroundColor: colors.cardsBackgroundColor,
  },
  activeTabButton: {
    backgroundColor: colors.blue,
  },
  tabText: {
    fontSize: '12@ms',
    color: colors.black,
    fontFamily: Secondaryfonts.medium,
  },
  activeTabText: {
    color: '#fff',
  },
  reportCard: {
    backgroundColor: colors.cardsBackgroundColor,
    borderRadius: '14@ms',
    padding: '14@ms',
  },
  carImage: {
    width: '100%',
    height: verticalScale(130),
    borderRadius: '12@ms',
    marginBottom: verticalScale(10),
    resizeMode: 'contain',
  },
  carTitle: {
    fontSize: '14@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginBottom: verticalScale(6),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(4),
  },
  label: {
    color: colors.black,
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
  },
  value: {
    color: colors.black,
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,   
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '10@s',
    marginTop: verticalScale(12),
  },
  downloadBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
    paddingVertical: '8@vs',
    borderRadius: '30@ms',
    gap: '6@s',
    paddingHorizontal: '30@s',
  },
  downloadText: {
    color: colors.white,
    fontSize: '11@ms',
    fontFamily: Secondaryfonts.medium,
  },
  viewBtn: {
    flex: 1,
    borderWidth: 0.3,
    borderColor: colors.hind,
    backgroundColor: colors.white,
    paddingVertical: '8@vs',
    borderRadius: '30@ms',
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: '35@s',
  },
  viewText: {
    color: colors.black,
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.medium,
  },
});
