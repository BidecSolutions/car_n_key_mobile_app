import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Header} from '../../Components/Header/Header';
import {colors} from '../../constant/colors';
import {Primaryfonts, Secondaryfonts} from '../../constant/fonts';
import {ScaledSheet} from 'react-native-size-matters';
import LicensePlate from '../../Components/modals/LicensePlate';

type RootStackParamList = {
  Home: undefined;
  CarDetail: undefined;
  MyGarage: undefined;
  TradeInToday: undefined;
};

type RootDrawerParamList = {
  Tabs: undefined;
  CarListing: undefined;
  CarComparison: undefined;
};

type TradeInTodayNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'TradeInToday'>,
  DrawerNavigationProp<RootDrawerParamList>
>;

const steps = [
  {
    title: 'Enter Your Car’s Details',
    desc: 'Tell us a little about your current car — make, model, year, mileage, and condition.',
  },
  {
    title: 'Get a Value Instantly',
    desc: 'Tell us a little about your current car — make, model, year, mileage, and condition.',
  },
  {
    title: 'Select Your New Car',
    desc: 'Tell us a little about your current car — make, model, year, mileage, and condition.',
  },
  {
    title: 'Schedule an Inspection',
    desc: 'Choose a convenient time and location to get your car inspected by a verified dealer.',
  },
  {
    title: 'Confirm & Drive Away',
    desc: 'Accept the final offer and get behind the wheel of your next car — it’s that simple.',
  },
];

const TradeInToday = () => {
  const navigation = useNavigation<TradeInTodayNavProp>();
  const [licensePlateModal, setLicensePlateModal] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <Header
        showBack
        showDrawer
        onDrawerPress={() => navigation.openDrawer()}
        backgroundColor={colors.backgroundColor}
        iconColor={colors.black}
        titleColor={colors.black}
        onBackPress={navigation.goBack}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Upgrade Your Ride – Trade In Today</Text>

        <View style={styles.cardWrapper}>
          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trade In Your Car and Drive {'\n'}Something New</Text>
            <Text style={styles.cardSubtitle}>
              Get your car’s value instantly and upgrade in minutes.
            </Text>

            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setLicensePlateModal(true)}>
              <Text style={styles.buttonText}>Start your Trade-in</Text>
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
            source={require('../../assets/Images/GarageCar.png')}
            style={styles.fullImage}
          />
        </View>

        {/* How It Works Section */}
        <View style={styles.howItWorksContainer}>
          <Text style={styles.howItWorksTitle}>How It Works</Text>

          {steps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View
                style={[
                  styles.stepLine,
                  {
                    backgroundColor:
                      index % 2 === 0 ? colors.blue : colors.hind,
                  },
                ]}
              />
              <View style={styles.stepTextWrapper}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default TradeInToday;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  contentContainer: {
    paddingBottom: '40@vs',
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
    bottom: '6@vs',
  },
  signInLink: {
    fontFamily: Secondaryfonts.medium,
    color: colors.black,
  },
  howItWorksContainer: {
    marginTop: '95@vs',
    paddingHorizontal: '18@s',
  },
  howItWorksTitle: {
    fontSize: '17@ms',
    fontFamily: Secondaryfonts.medium,
    textAlign: 'center',
    marginBottom: '20@vs',
    color: colors.black,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: '18@vs',
    minHeight: '50@vs', // ensures vertical line is visible
    padding: '7@ms',
  },

  stepLine: {
    width: '3@s',
    borderRadius: '2@ms',
    height: '100%', // 🔥 make it fill the row vertically
    marginTop: '2@vs',
  },

  stepTextWrapper: {
    flex: 1,
    marginLeft: '10@s',
  },
  stepTitle: {
    fontSize: '13@ms',
    fontFamily: Secondaryfonts.semibold,
    color: colors.black,
    marginBottom: '3@vs',
  },
  stepDesc: {
    fontSize: '12@ms',
    fontFamily: Secondaryfonts.regular,
    color: colors.hind,
    lineHeight: '16@vs',
  },
});
